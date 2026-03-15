import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicRoute = [
    "/login",
    "/register",
    "/api/auth",
    "/favicon.ico",
    "/_next",
  ];

  if (publicRoute.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  const refreshToken = cookiesStore.get("refresh_token")?.value;

  if (!accessToken && refreshToken) {
    try {
      // Call your API route internally
      const refreshRes = await fetch(new URL("/api/refresh", req.url), {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (refreshRes.ok) {
        const response = NextResponse.next();

        // Get tokens from your API response (assuming they are in the JSON body)
        const { accessToken, refreshToken } = await refreshRes.json();

        // 1. For the BROWSER (so it's saved in the Application tab)
        response.cookies.set("access_token", accessToken, {
          httpOnly: true,
          secure: true,
        });
        response.cookies.set("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
        });

        // 2. For the PAGE (so getCurrentUser() sees it RIGHT NOW)
        // We have to modify the REQUEST headers specifically
        response.headers.set(
          "cookie",
          `access_token=${accessToken}; refresh_token=${refreshToken}`,
        );

        return response;
      } else {
        // Refresh token was invalid or expired!
        // Kick them out so they don't get stuck in a loop.
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.error("Middleware refresh failed:", error);
    }
  }

  if (!accessToken && !refreshToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)",
  ],
};
