"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "../auth/auth.queries";
import { revalidatePath } from "next/cache";

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
