import prisma from "@/lib/prisma";

export const pendingRequestProducts = async () => {
  return await prisma.product.findMany({
    // where: { verificationStatus: "pending" },
    orderBy: {
      createdAt: "desc",
    },
  });
};
