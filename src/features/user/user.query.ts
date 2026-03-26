import prisma from "@/lib/prisma";
import { getCurrentUser } from "../auth/auth.queries";
import { redirect } from "next/navigation";

export const getAllProducts = async () => {
  try {
    const res = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllCartProducts = async (userId: string) => {
  try {
    const res = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return redirect("/");
    }

    const orderItems = await prisma.orderItem.findMany({
      select: {
        id: true,
        order: true,
        product: true,
        quantity: true,
        price: true,
      },
      orderBy: {
        order: {
          createdAt: "desc",
        },
      },
    });

    return orderItems;
  } catch (error) {
    console.log(error);
  }
};
