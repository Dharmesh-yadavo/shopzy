import prisma from "@/lib/prisma";

export const getAllVendors = async () => {
  try {
    const vendors = await prisma.user.findMany({
      where: { role: "vendor" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        shopName: true,
        shopAddress: true,
        gstNumber: true,
        isApproved: true,
        verificationStatus: true,
        requestedAt: true,
        approvedAt: true,
        rejectedReason: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return vendors;
  } catch (error) {
    console.error(error);
    return [];
  }
};
