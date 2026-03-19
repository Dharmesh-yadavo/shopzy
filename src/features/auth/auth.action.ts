"use server";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import {
  loginUserSchema,
  RegisterUserData,
  RegisterUserSchema,
  UpdatePhoneAndRoleData,
  updatePhoneAndRoleSchema,
} from "./auth.schema";
import { getCurrentUser } from "./auth.queries";
import { signIn } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const RegisterUserAction = async (data: RegisterUserData) => {
  const { data: validatedData, error } = RegisterUserSchema.safeParse(data);

  if (error) return { status: "error", message: error.issues[0].message };

  const { fullName, email, password, role } = validatedData;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return { status: "error", message: "Email already in use." };
  }

  const hashPassword = await argon2.hash(password);

  await prisma.user.create({
    data: {
      name: fullName,
      email,
      password: hashPassword,
      role,
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
};

export const loginUserAction = async (data: {
  email: string;
  password: string;
}) => {
  const { data: validatedData, error } = loginUserSchema.safeParse(data);

  if (error) return { status: "error", message: error.issues[0].message };
  const { email, password } = validatedData;

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
};

export const EditPhoneAndRoleAction = async (data: UpdatePhoneAndRoleData) => {
  try {
    const { data: validatedData, error } =
      updatePhoneAndRoleSchema.safeParse(data);

    if (error || !validatedData) {
      return {
        status: "error",
        message: error?.issues[0].message || "Validation failed",
      };
    }

    const { phone, role } = validatedData;

    const user = await getCurrentUser();

    if (!user) {
      return { status: "error", message: "User not authenticated." };
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        phone,
        role,
      },
    });

    revalidatePath("/");

    return {
      status: "success",
      message: "Phone and role updated successfully",
    };
  } catch (error) {
    console.error("Edit Phone and Role Error:", error);
    return {
      status: "error",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};
