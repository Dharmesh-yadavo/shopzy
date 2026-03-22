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
