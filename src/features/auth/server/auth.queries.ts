import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJWTToken } from "./session";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return null;

  try {
    const payload = verifyJWTToken(accessToken);

    if (!payload || typeof payload === "string") return null;

    const session = await prisma.sessionTable.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    if (!session) return null;

    return session.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const isAdminExist = async () => {
  const adminUser = await prisma.user.findFirst({
    where: { role: "admin" },
  });
  return !!adminUser;
};
