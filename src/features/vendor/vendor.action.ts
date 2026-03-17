"use server"; // CRITICAL: Required for Server Actions

import prisma from "@/lib/prisma";
import { getCurrentUser } from "../auth/server/auth.queries";
import {
  vendorUpdateDetailsData,
  vendorUpdateDetailsSchema,
} from "./vendor.schema";
// Ensure file extension matches

export const EditVendorDetailsAction = async (
  data: vendorUpdateDetailsData,
) => {
  try {
    // 1. Correct Zod parsing logic
    const result = vendorUpdateDetailsSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: result.error.issues[0].message || "Validation failed",
      };
    }

    const { shopName, shopAddress, gstNumber } = result.data;

    // 2. Auth check
    const user = await getCurrentUser();

    if (!user || !user.email) {
      return {
        status: "error",
        message: "User not authenticated or email missing.",
      };
    }

    // 3. Database Update
    await prisma.user.update({
      where: { email: user.email },
      data: {
        shopName,
        shopAddress,
        gstNumber,
        verificationStatus: "pending",
        requestedAt: new Date(),
        // Note: Ensure your Prisma schema has these fields!
      },
    });

    return {
      status: "success",
      message: "Vendor details updated successfully.",
    };
  } catch (error) {
    console.error("Vendor details update Error:", error);
    return {
      status: "error",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};
