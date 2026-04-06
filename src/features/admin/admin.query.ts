import prisma from "@/lib/prisma";

export const pendingRequestProducts = async () => {
  return await prisma.product.findMany({
    // where: { verificationStatus: "pending" },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAdminAllOrders = async () => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      include: {
        product: {
          include: {
            vendor: true,
          },
        },
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
      buyer: { name: item.order.address.name, phone: item.order.address.phone },
      vendor: {
        name: item.product.vendor.name,
        email: item.product.vendor.email,
      },
      buyerId: item.order.buyerId,
      product: item.product.title,
      total: item.price * item.quantity,
      payment: item.order.paymentMethod,
      status: item.order.orderStatus,
      date: item.order.createdAt,
    }));
  } catch (error) {
    console.error("GET_ORDERS_ERROR:", error);
    return [];
  }
};
