import prisma from "@/lib/prisma";
import { getCurrentUser } from "../auth/auth.queries";

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

export const getVendorsOrders = async () => {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "vendor") {
      return null;
    }

    const orderItems = await prisma.orderItem.findMany({
      where: {
        product: {
          vendorId: user.id,
        },
      },
      include: {
        product: true,
        order: true,
      },
      orderBy: {
        order: {
          createdAt: "desc",
        },
      },
    });

    return orderItems.map((item) => ({
      id: item.id,
      actualOrderId: item.order.id,
      buyer: item.order.address.name,
      phone: item.order.address.phone,
      product: item.product.title,
      payment: item.order.paymentMethod,
      status: item.order.orderStatus,
      total: item.price * item.quantity,
      date: item.order.createdAt,
    }));
  } catch (error) {
    console.error("GET_VENDOR_ORDERS_ERROR:", error);
    return [];
  }
};
