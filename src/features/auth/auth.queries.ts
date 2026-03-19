"use server";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { auth } from "@/lib/auth";

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  image: true,
  role: true,
  cart: true,
  shopName: true,
  shopAddress: true,
  gstNumber: true,
  isApproved: true,
  verificationStatus: true,
  requestedAt: true,
  approvedAt: true,
  rejectedReason: true,
  createdAt: true,
  updatedAt: true,
};

export const getCurrentUser = cache(async () => {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: safeUserSelect,
  });

  return user || null;
});

export const isAdminExist = async () => {
  const adminUser = await prisma.user.findFirst({
    where: { role: "admin" },
  });
  return !!adminUser;
};
