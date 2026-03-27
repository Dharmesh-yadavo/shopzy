"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "../auth/auth.queries";
import { revalidatePath } from "next/cache";
import { CheckOutPageDataType } from "@/components/user/CheckoutComp";
import { CartItemWithProduct } from "@/components/user/CartPage";

export const addProductToCart = async (
  productId: string,
  quantity: number,
  color?: string | undefined,
  size?: string | undefined,
) => {
  const user = await getCurrentUser();
  if (!user) return { status: "error", message: "User not authenticated." };

  const finalSize = size || "NONE";
  const finalColor = color || "NONE";

  try {
    await prisma.cartItem.upsert({
      where: {
        userId_productId_size_color: {
          userId: user.id,
          productId,
          size: finalSize,
          color: finalColor,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: user.id,
        productId,
        quantity,
        size: finalSize,
        color: finalColor,
      },
    });

    return { status: "success", message: "Product added to cart." };
  } catch (error) {
    console.error("UPSERT ERROR:", error);
    return { status: "error", message: "Failed to add to cart." };
  }
};

export const updateCartQuantity = async (
  cartId: string,
  newQuantity: number,
) => {
  try {
    await prisma.cartItem.update({
      where: { id: cartId },
      data: {
        quantity: newQuantity,
      },
    });
    revalidatePath("/cart");
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = async (cartId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { status: "error", message: "Not authenticated" };
  }

  try {
    await prisma.cartItem.delete({
      where: {
        id: cartId,
        userId: user.id,
      },
    });

    revalidatePath("/cart");
    return { status: "success", message: "Item removed" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { status: "error", message: "Failed to remove item" };
  }
};

export const createOrderAction = async (
  data: CheckOutPageDataType,
  cartItems: CartItemWithProduct[],
  subtotal: number,
  deliveryCharge: number,
  serviceCharge: number,
  total: number,
  userId: string,
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          buyerId: userId,
          productTotal: subtotal,
          deliveryCharge,
          serviceCharge,
          totalAmount: total,
          paymentMethod: data.paymentMethod,
          address: {
            name: data.name,
            phone: data.phone,
            address: data.address,
            city: data.city,
            pincode: data.pincode,
          },
          items: {
            create: cartItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          userId: userId,
        },
      });

      return newOrder;
    });

    return {
      success: true,
      orderId: result.id,
      paymentMethod: result.paymentMethod,
    };
  } catch (error) {
    console.error("ORDER_ACTION_ERROR:", error);
    return {
      success: false,
      error: "Could not process order. Please try again.",
    };
  }
};

export const cancelOrderAction = async (
  orderId: string,
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "returned"
    | "cancelled",
  price: number,
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: status,
        canceledAt: new Date(),
        returnedAmount: price,
      },
    });
    revalidatePath("/vendor/orders");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
