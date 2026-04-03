import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) return new NextResponse("Order not found", { status: 404 });

    // Build Line Items for Stripe
    const line_items = order.items.map((item) => {
      // 1. Default to the main product image
      let stripeImageUrl = item.product.images[0];

      // 2. If a specific color was chosen, find that variant image
      if (item.color && item.color !== "NONE") {
        const variant = item.product.variants.find(
          (v: { colorName: string; imageUrl: string }) => v.colorName === item.color,
        );
        if (variant) {
          stripeImageUrl = variant.imageUrl; // Use the color-specific image
        }
      }

      // 3. Return the formatted Stripe line item
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${item.product.title}${item.color !== "NONE" ? ` (${item.color})` : ""}`,
            images: [stripeImageUrl],
          },
          unit_amount: item.product.price * 100, // INR Paise
        },
        quantity: item.quantity,
      };
    });

    // Add Shipping/Service charges as separate line items
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery & Service Charges",
          images: [],
        },
        unit_amount: (order.deliveryCharge + order.serviceCharge) * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success?orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: { orderId },
    });

    // Optional: Update order with Session ID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentDetails: { stripeSessionId: session.id },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
