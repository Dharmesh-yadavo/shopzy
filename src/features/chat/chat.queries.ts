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
                  role: true,
                  chatsCreated: {
                    where: { participantId: userId },
                    select: {
                      id: true,
                      unreadCount: true,
                      lastMessageText: true,
                      lastMessageBy: true,
                      updatedAt: true,
                    },
                  },
                  chatsAsParticipant: {
                    where: { creatorId: userId },
                    select: {
                      id: true,
                      unreadCount: true,
                      lastMessageText: true,
                      lastMessageBy: true,
                      updatedAt: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const formatedOrderItems = orderItems.map((user) => {
        // Flattening the relationship into a single 'chat' object
        const chat =
          user.product.vendor.chatsCreated[0] ||
          user.product.vendor.chatsAsParticipant[0] ||
          null;

        return {
          vendor: {
            id: user.product.vendor.id,
            name: user.product.vendor.name,
            image: user.product.vendor.image,
            role: user.product.vendor.role,
            chat: chat,
          },
        };
      });

      // Use a Map to ensure unique vendors (by ID)
      const uniqueVendors = new Map();

      formatedOrderItems.forEach((item) => {
        const vendor = item.vendor;
        if (vendor) {
          uniqueVendors.set(vendor.id, item.vendor);
        }
      });

      return Array.from(uniqueVendors.values());
    }

    if (role === "vendor") {
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
                  chatsCreated: {
                    where: { participantId: userId },
                    select: {
                      id: true,
                      unreadCount: true,
                      lastMessageText: true,
                      lastMessageBy: true,
                      updatedAt: true,
                    },
                  },
                  chatsAsParticipant: {
                    where: { creatorId: userId },
                    select: {
                      id: true,
                      unreadCount: true,
                      lastMessageText: true,
                      lastMessageBy: true,
                      updatedAt: true,
                    },
                  },
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

      const formatedOrders = orders.map((user) => {
        // Flattening the relationship into a single 'chat' object
        const chat =
          user.order.buyer.chatsCreated[0] ||
          user.order.buyer.chatsAsParticipant[0] ||
          null;

        return {
          order: {
            id: user.order.buyer.id,
            name: user.order.buyer.name,
            image: user.order.buyer.image,
            role: user.order.buyer.role,
            chat: chat,
          },
        };
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
          chatsCreated: {
            where: { participantId: userId },
            select: {
              id: true,
              unreadCount: true,
              lastMessageText: true,
              lastMessageBy: true,
              updatedAt: true,
            },
          },
          chatsAsParticipant: {
            where: { creatorId: userId },
            select: {
              id: true,
              unreadCount: true,
              lastMessageText: true,
              lastMessageBy: true,
              updatedAt: true,
            },
          },
        },
      });

      const finalChat =
        admin?.chatsCreated[0] || admin?.chatsAsParticipant[0] || null;

      const finalAdmin = {
        id: admin?.id,
        name: admin?.name,
        image: admin?.image,
        role: admin?.role,
        chat: finalChat,
      };

      uniqueUsers.set(finalAdmin?.id, finalAdmin);

      formatedOrders.forEach((item) => {
        const user = item.order;
        if (user) {
          uniqueUsers.set(user.id, user);
        }
      });

      return Array.from(uniqueUsers.values());
    }

    if (role === "admin") {
      const res = await prisma.user.findMany({
        where: { role: "vendor" },
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
          chatsCreated: {
            where: { participantId: userId },
            select: {
              id: true,
              unreadCount: true,
              lastMessageText: true,
              lastMessageBy: true,
              updatedAt: true,
            },
          },
          chatsAsParticipant: {
            where: { creatorId: userId },
            select: {
              id: true,
              unreadCount: true,
              lastMessageText: true,
              lastMessageBy: true,
              updatedAt: true,
            },
          },
        },
      });

      const formatedRes = res.map((user) => {
        // Flattening the relationship into a single 'chat' object
        const chat = user.chatsCreated[0] || user.chatsAsParticipant[0] || null;

        return {
          id: user.id,
          name: user.name,
          image: user.image,
          role: user.role,
          chat: chat,
        };
      });

      return formatedRes;
    }
  } catch (error) {
    console.error("Error fetching support users:", error);
    return [];
  }
};
