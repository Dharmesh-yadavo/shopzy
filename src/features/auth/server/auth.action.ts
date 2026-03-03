"use server";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import {
  loginUserSchema,
  RegisterUserData,
  RegisterUserSchema,
  UpdatePhoneAndRoleData,
  updatePhoneAndRoleSchema,
} from "../auth.schema";
import { authenticateUser } from "./session";
import { get } from "http";
import { getCurrentUser } from "./auth.queries";

export const RegisterUserAction = async (data: RegisterUserData) => {
  try {
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

    const res = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashPassword,
        role,
      },
    });

    await authenticateUser({
      userId: res.id,
      userName: res.name,
      userEmail: res.email,
    });

    return {
      status: "success",
      message: "Registration Completed Successfully",
    };
  } catch (error) {
    console.error("Registration Error:", error);
    return {
      status: "ERROR",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};

export const loginUserAction = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const { data: validatedData, error } = loginUserSchema.safeParse(data);

    if (error) return { status: "error", message: error.issues[0].message };
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: "error", message: "Invalid email or password." };
    }

    const userPassword = user.password || "";

    const isPasswordValid = await argon2.verify(userPassword, password);

    if (!isPasswordValid) {
      return { status: "error", message: "Invalid email or password." };
    }

    await authenticateUser({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    });

    return {
      status: "success",
      message: "Login Successful",
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      status: "ERROR",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
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
