"use server";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import { getCurrentUser } from "../auth/auth.queries";
import { revalidatePath } from "next/cache";
import { CheckOutPageDataType } from "@/components/user/CheckoutComp";
import { CartItemWithProduct } from "@/components/user/CartPage";

export const addProductToCart = async (
  productId: string,
  quantity: number,
  color?: string | undefined,
  size?: string | undefined,
) => {
  const user = await getCurrentUser();
  if (!user) return { status: "error", message: "User not authenticated." };

  const finalSize = size || "NONE";
  const finalColor = color || "NONE";

  try {
    await prisma.cartItem.upsert({
      where: {
        userId_productId_size_color: {
          userId: user.id,
          productId,
          size: finalSize,
          color: finalColor,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: user.id,
        productId,
        quantity,
        size: finalSize,
        color: finalColor,
      },
    });

    return { status: "success", message: "Product added to cart." };
  } catch (error) {
    console.error("UPSERT ERROR:", error);
    return { status: "error", message: "Failed to add to cart." };
  }
};

export const updateCartQuantity = async (
  cartId: string,
  newQuantity: number,
) => {
  try {
    await prisma.cartItem.update({
      where: { id: cartId },
      data: {
        quantity: newQuantity,
      },
    });
    revalidatePath("/cart");
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = async (cartId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { status: "error", message: "Not authenticated" };
  }

  try {
    await prisma.cartItem.delete({
      where: {
        id: cartId,
        userId: user.id,
      },
    });

    revalidatePath("/cart");
    return { status: "success", message: "Item removed" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { status: "error", message: "Failed to remove item" };
  }
};

export const createOrderAction = async (
  data: CheckOutPageDataType,
  cartItems: CartItemWithProduct[],
  subtotal: number,
  deliveryCharge: number,
  serviceCharge: number,
  total: number,
  userId: string,
  isPaid: boolean,
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          buyerId: userId,
          productTotal: subtotal,
          deliveryCharge,
          serviceCharge,
          totalAmount: total,
          paymentMethod: data.paymentMethod,
          isPaid,
          address: {
            name: data.name,
            phone: data.phone,
            address: data.address,
            city: data.city,
            pincode: data.pincode,
          },
          items: {
            create: cartItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
              color: item.color,
            })),
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          userId: userId,
        },
      });

      return newOrder;
    });

    return {
      success: true,
      orderId: result.id,
    };
  } catch (error) {
    console.error("ORDER_ACTION_ERROR:", error);
    return {
      success: false,
      error: "Could not process order. Please try again.",
    };
  }
};

export const cancelOrderAction = async (
  orderId: string,
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "returned"
    | "cancelled",
  price: number,
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: status,
        canceledAt: new Date(),
        returnedAmount: price,
      },
    });
    revalidatePath("/vendor/orders");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const updateUserDetails = async ({
  userId,
  name,
  phone,
  imgUrl,
}: {
  userId: string;
  name?: string;
  phone?: string;
  imgUrl?: string;
}) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
        image: imgUrl,
      },
    });
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const seetingPageAction = async (userId: string) => {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    return { status: "success", password: res?.password };
  } catch (error) {
    console.error(error);
  }
};

export const updatePasswordAction = async ({
  userId,
  oldPassword,
  newPassword,
}: {
  userId: string;
  oldPassword?: string;
  newPassword: string;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { status: "error", message: "User not found" };

    if (user.password) {
      if (!oldPassword)
        return { status: "error", message: "Old password required" };

      const isMatch = await argon2.verify(user.password, oldPassword);
      if (!isMatch)
        return { status: "error", message: "Incorrect old password" };
    }

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { status: "success", message: "Password updated successfully" };
  } catch (error) {
    console.error(error);
  }
};

export const updateUserNotifications = async (
  userId: string,
  orderNotification?: boolean,
  promotionalEmails?: boolean,
) => {
  try {
    // Only pass the fields that are actually defined
    const data: { orderNotification?: boolean; promotionalEmails?: boolean } =
      {};
    if (orderNotification !== undefined)
      data.orderNotification = orderNotification;
    if (promotionalEmails !== undefined)
      data.promotionalEmails = promotionalEmails;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Notification Update Error:", error);
    return null;
  }
};

export const rateProductAction = async ({
  productId,
  rating,
  comment,
}: {
  productId: string;
  rating: string;
  comment: string;
}) => {
  try {
    const user = await getCurrentUser();

    if (!user) return { status: "error", message: "User not authenticated." };

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        reviews: {
          userId: user.id,
          userName: user.name,
          rating: parseInt(rating),
          comment,
        },
      },
    });

    return { status: "success", message: "Thank you for your review!" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong." };
  }
};
