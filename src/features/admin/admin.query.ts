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
      quantity: item.quantity,
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

export const getAllVendors = async () => {
  try {
    return await prisma.user.findMany({
      where: {
        role: "vendor",
      },
      include: { products: true, order: true },
    });
  } catch (error) {
    console.error(error);
  }
};

export const adminDashboardContent = async () => {
  try {
    const totalVendors = await getAllVendors();

    const pendingVendors = await prisma.user.findMany({
      where: { role: "vendor", verificationStatus: "pending" },
    });

    const totalProducts = totalVendors?.reduce(
      (acc, data) => acc + data.products.length,
      0,
    );

    const pendingProducts = await prisma.product.findMany({
      where: { verificationStatus: "pending" },
    });

    const totalOrders = await getAdminAllOrders();

    const totalRevenue = totalOrders.reduce((acc, data) => acc + data.total, 0);

    const orders = totalOrders.reduce(
      (acc: Record<string, { name: string; orders: number }>, data) => {
        const vendor = data.vendor.name;

        if (!acc[vendor]) {
          acc[vendor] = { name: vendor, orders: 0 };
        }

        acc[vendor].orders += data.quantity;

        return acc;
      },
      {},
    );

    const finalOrders = Object.values(orders);

    const orderStatus = totalOrders.reduce(
      (acc: Record<string, { status: string; count: number }>, item) => {
        const status = item.status;

        if (!acc[status]) {
          acc[status] = { status, count: 0 };
        }

        acc[status].count += item.quantity;
        return acc;
      },
      {},
    );

    const finalStatus = Object.values(orderStatus);

    return {
      totalVendors: totalVendors?.length,
      pendingVendors: pendingVendors.length,
      totalProducts,
      pendingProducts: pendingProducts.length,
      totalOrders: totalOrders.length,
      totalRevenue,
      vendorData: finalOrders,
      orderStatusData: finalStatus,
    };
  } catch (error) {
    console.error(error);
  }
};
