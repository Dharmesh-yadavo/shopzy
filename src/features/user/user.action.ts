"use server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "../auth/auth.queries";

export const addProductToCart = async (
  productId: string,
  quantity: number,
  color?: string | undefined,
  size?: string | undefined,
) => {
  const user = await getCurrentUser();

  if (!user)
    return {
      status: "error",
      message: "User not authinticated.",
    };

  const userId = user?.id;

  try {
    const res = await prisma.cartItem.upsert({
      where: {
        userId_productId_size_color: {
          userId,
          productId,
          size: size ?? "",
          color: color ?? "",
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId,
        productId,
        quantity,
        size,
        color,
      },
    });
    console.log("Response: ", res);
    return {
      status: "success",
      message: "Product added successfully to cart.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Product failed to add in cart.",
    };
  }
};
