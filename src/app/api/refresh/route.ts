import { refreshTokens } from "@/features/auth/server/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // 1. If there's no refresh token, we can't do anything.
  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    // 2. Run your database logic to verify the session and rotation
    const result = await refreshTokens(refreshToken);

    if (!result) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { newAccessToken, newRefreshToken } = result;

    // 3. Set the New Access Token
    cookieStore.set("access_token", newAccessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 15 * 60, // 15 mins
      sameSite: "lax",
      path: "/",
    });

    // 4. Set the New Refresh Token (Rotation)
    cookieStore.set("refresh_token", newRefreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "lax",
      path: "/",
    });

    // 5. CRITICAL: You MUST return a response for the browser to receive the cookies
    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Refresh logic failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
