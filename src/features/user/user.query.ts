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

    // Query the Order model directly
    const orders = await prisma.order.findMany({
      where: {
        buyerId: user.id, // Only get orders for THIS user
      },
      include: {
        items: {
          include: {
            product: true, // Gets title, images, etc. for each item
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Latest orders at the top
      },
    });

    return orders;
  } catch (error) {
    console.error("GET_ALL_ORDERS_ERROR:", error);
    return []; // Return empty array on error to prevent frontend crash
  }
};

export const getProductByCategory = async (category: string) => {
  try {
    return await prisma.product.findMany({
      where: {
        category,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProductsBySearch = async (
  query?: string,
  minPrice?: number | undefined,
  maxPrice?: number | undefined,
  rating?: number | undefined,
  freeDelivery?: string,
) => {
  const safeMax = isNaN(Number(maxPrice)) ? undefined : Number(maxPrice);
  const finalMax = safeMax === 100000 ? undefined : safeMax;
  return await prisma.product.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { category: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        {
          price: {
            gte: minPrice || 0,
            lte: finalMax,
          },
        },
        freeDelivery ? { freeDelivery: true } : {},
        rating
          ? {
              reviews: {
                some: {
                  rating: { gte: rating },
                },
              },
            }
          : {},
      ],
    },
  });
};

export const getDetailsOfUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      cart: true,
      order: true,
    },
  });
};
