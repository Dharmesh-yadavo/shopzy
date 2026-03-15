import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { refreshTokens, verifyJWTToken } from "./session";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && refreshToken) {
    try {
      const result = await refreshTokens(refreshToken);
      if (result) {
        // Update our local variable so the rest of the function works
        accessToken = result.newAccessToken;

        // Note: Setting cookies here ensures the NEXT request is authenticated.
        // In Next.js 15, cookieStore.set() works in Server Components.
        cookieStore.set("access_token", result.newAccessToken, {
          httpOnly: true,
          secure: true,
        });
        cookieStore.set("refresh_token", result.newRefreshToken, {
          httpOnly: true,
          secure: true,
        });
      }
    } catch (error) {
      console.error("Auto-refresh failed in getCurrentUser:", error);
    }
  }

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
