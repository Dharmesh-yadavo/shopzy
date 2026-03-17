"use server";
import prisma from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { verifyJWTToken } from "./session";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const headerList = await headers(); // Add this

  // 1. Try to get token from standard cookies
  let accessToken = cookieStore.get("access_token")?.value;

  // 2. CRITICAL: If token looks expired or is missing,
  // check if Middleware just injected a fresh one into the headers
  if (!accessToken) {
    const rawCookie = headerList.get("cookie");
    if (rawCookie) {
      // Manually extract access_token from the raw header string
      const match = rawCookie.match(/access_token=([^;]+)/);
      if (match) accessToken = match[1];
    }
  }

  if (!accessToken) return null;

  try {
    // 3. Verify the token (This will still throw if it's the OLD one)
    const payload = verifyJWTToken(accessToken);

    if (!payload || typeof payload === "string") {
      // If this fails, it means the injected token was ALSO bad (unlikely)
      // or we are still hitting the old one.
      return null;
    }

    const session = await prisma.sessionTable.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });

    return session?.user || null;
  } catch (error) {
    // Don't console.log(error) here to keep your terminal clean
    return null;
  }
};

export const isAdminExist = async () => {
  const adminUser = await prisma.user.findFirst({
    where: { role: "admin" },
  });
  return !!adminUser;
};
