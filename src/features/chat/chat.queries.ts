import prisma from "@/lib/prisma";

export const getSupportUsers = async (
  userId: string,
  role: "user" | "vendor" | "admin",
) => {
  try {
    // 1. If the logged-in person is a regular USER
    if (role === "user") {
      const orderItems = await prisma.orderItem.findMany({
        where: {
          order: { buyerId: userId },
        },
        select: {
          product: {
            select: {
              vendor: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      // Use a Map to ensure unique vendors (by ID)
      const uniqueVendors = new Map();

      orderItems.forEach((item) => {
        const vendor = item.product.vendor;
        if (vendor) {
          uniqueVendors.set(vendor.id, vendor);
        }
      });

      return Array.from(uniqueVendors.values());
    }

    // 2. If the logged-in person is a VENDOR
    if (role === "vendor") {
      // Logic: Find all Users who bought their products + Admins
      // (I can help you write this query next if you need it!)

      const orders = await prisma.orderItem.findMany({
        where: {
          product: {
            vendorId: userId,
          },
        },
        include: {
          order: {
            include: {
              buyer: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  role: true,
                },
              },
            },
          },
        },
        orderBy: {
          order: {
            createdAt: "desc",
          },
        },
      });

      const uniqueUsers = new Map();

      const admin = await prisma.user.findFirst({
        where: {
          role: "admin",
        },
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      });

      uniqueUsers.set(admin?.id, admin);

      orders.forEach((item) => {
        const user = item.order.buyer;
        if (user) {
          uniqueUsers.set(user.id, user);
        }
      });

      return Array.from(uniqueUsers.values());
    }
  } catch (error) {
    console.error("Error fetching support users:", error);
    return [];
  }
};
