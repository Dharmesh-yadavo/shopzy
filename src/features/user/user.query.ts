import prisma from "@/lib/prisma";

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
