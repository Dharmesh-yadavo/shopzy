import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!, // Get this from Stripe CLI or Dashboard
    );
  } catch (err) {
    console.error(err);
    return new Response(`Webhook Error`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // This is where the magic happens
    await prisma.order.update({
      where: { id: session.metadata?.orderId },
      data: {
        isPaid: true,
        orderStatus: "confirmed",
        paymentDetails: {
          stripePaymentId: session.payment_intent as string,
          stripeSessionId: session.id,
        },
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
