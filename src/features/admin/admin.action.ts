"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateVendorStatusAction = async ({
  vendorId,
  data,
  reason,
}: {
  vendorId: string;
  data: "pending" | "approved" | "rejected";
  reason?: string;
}) => {
  try {
    const result = await prisma.user.update({
      where: { id: vendorId },
      data: {
        isApproved: data === "approved",
        verificationStatus: data,
        rejectedReason: data === "rejected" ? reason : null,
        approvedAt: data === "approved" ? new Date() : null,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/vendor-approval");

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update vendor:", error);
    return { success: false, error: "Database update failed" };
  }
};

export const updateProductStatusAction = async ({
  productId,
  data,
  reason,
}: {
  productId: string;
  data: "pending" | "approved" | "rejected";
  reason?: string;
}) => {
  try {
    const result = await prisma.product.update({
      where: { id: productId },
      data: {
        isActive: data === "approved",
        verificationStatus: data,
        rejectedReason: data === "rejected" ? reason : null,
        approvedAt: data === "approved" ? new Date() : null,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/requests");

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update vendor:", error);
    return { success: false, error: "Database update failed" };
  }
};
