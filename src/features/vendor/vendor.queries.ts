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

export const getAllProduct = async (vendorId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: { vendorId },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("All Products: ", products);
    return products;
  } catch {
    return [];
  }
};

export const productById = async (productId: string) => {
  try {
    const [products] = await prisma.product.findMany({
      where: { id: productId },
    });
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const vendorById = async (vendorId: string) => {
  try {
    const [vendors] = await prisma.user.findMany({
      where: { id: vendorId },
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
    });
    return vendors;
  } catch (error) {
    console.error(error);
  }
};
