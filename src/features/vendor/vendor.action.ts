"use server";

import prisma from "@/lib/prisma";
import {
  VendorProfileData,
  VendorProfileSchema,
  vendorUpdateDetailsData,
  vendorUpdateDetailsSchema,
} from "./vendor.schema";
import { getCurrentUser } from "../auth/auth.queries";
import { revalidatePath } from "next/cache";
import { AddProductType } from "@/components/vendor/AddProductPage";

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
      },
    });

    revalidatePath("/vendor");

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

export const vendorProfileEditAction = async (data: VendorProfileData) => {
  try {
    const result = VendorProfileSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: result.error.issues[0].message || "Validation failed",
      };
    }

    const { shopName, shopAddress, gstNumber, phone, email, image } =
      result.data;

    await prisma.user.update({
      where: { email },
      data: {
        shopName,
        shopAddress,
        gstNumber,
        phone,
        image,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/vendor");

    return {
      status: "success",
      message: "Vendor profile updated successfully.",
    };
  } catch (error) {
    console.error("Vendor details update Error:", error);
    return {
      status: "error",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};

export const addProductAction = async (
  data: AddProductType,
  vendorId: string,
) => {
  try {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: parseInt(data.price),
        stock: parseInt(data.stock),
        // images: data.images.filter((img: string) => img !== ""),
        images: data.images,
        vendorId: vendorId,
        hasColours: data.hasColours,
        isWearable: data.isWearable,
        freeDelivery: data.freeDelivery,
        payOnDelivery: data.payOnDelivery,
        size: data.size
          ? data.size.split(",").map((s: string) => s.trim())
          : [],
        variants: data.variants,
        detailsPoints: data.detailsPoints,
        warranty: data.warranty || "No Warranty",
        replacementDays: data.replacementDays || 0,
        verificationStatus: "pending",
        createdAt: new Date(),
      },
    });
    console.log("Product: ", product);
    revalidatePath("/vendor/products");
    return { success: true, id: product.id };
  } catch (error) {
    console.error("PRISMA_CREATE_ERROR:", error);
    return { success: false, error: "Database connection failed" };
  }
};
