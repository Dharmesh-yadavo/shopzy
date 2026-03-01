import { refreshTokens, verifyJWTToken } from "@/features/auth/server/session";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const accessToken = cookieStore.get("access_token")?.value;

  if (!refreshToken && !accessToken) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  if (accessToken) {
    try {
      const decodedToken = verifyJWTToken(accessToken);

      if (typeof decodedToken === "string" || !("sessionId" in decodedToken)) {
        throw new Error("Invalid token structure");
      }

      const session = await prisma.sessionTable.findUnique({
        where: { id: decodedToken.sessionId },
      });

      if (!session || session.expiresAt < new Date()) {
        throw new Error("Invalid session");
      }

      return NextResponse.json({ authenticated: true });
    } catch (error) {
      console.error("Access token invalid:", error);
    }
  }

  if (refreshToken) {
    try {
      const result = await refreshTokens(refreshToken);

      if (!result) {
        return NextResponse.json({ error: "Invalid session" }, { status: 401 });
      }

      const { newAccessToken, newRefreshToken } = result;

      cookieStore.set("access_token", newAccessToken, {
        secure: true,
        httpOnly: true,
        maxAge: 15 * 60,
        sameSite: "lax",
        path: "/",
      });

      const SESSION_LIFETIME = 7 * 24 * 60 * 60;

      cookieStore.set("refresh_token", newRefreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: SESSION_LIFETIME,
        sameSite: "lax",
        path: "/",
      });
    } catch (error) {
      console.error("Refresh token invalid:", error);
    }
  }
}
