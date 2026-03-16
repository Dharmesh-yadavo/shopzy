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

  if (!accessToken && !refreshToken) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

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
        // 1. Get the tokens
        const { accessToken, refreshToken } = await refreshRes.json();

        // 2. Modify the REQUEST headers so getCurrentUser() sees the new tokens NOW
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set(
          "cookie",
          `access_token=${accessToken}; refresh_token=${refreshToken}`,
        );

        // 3. Create the response by passing the updated request headers
        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        // 4. Set cookies for the BROWSER so they are saved for LATER
        response.cookies.set("access_token", accessToken, {
          httpOnly: true,
          secure: true,
          path: "/", // Always include path: "/" to avoid scope issues
        });
        response.cookies.set("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        // 5. Tell Next.js not to cache this specific middleware decision
        response.headers.set("x-middleware-cache", "no-cache");

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

  console.log(
    `[AUTH-DEBUG] Refreshed at: ${new Date().toISOString()} | URL: ${req.nextUrl.pathname}`,
  );

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|\\..*|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)",
  ],
};
