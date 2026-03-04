import { google } from "@/lib/google";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/features/auth/server/session";
import {
  createUserWithOauth,
  getUserWithOauthId,
  linkUserWithOauth,
} from "@/features/auth/server/auth.services";

interface GoogleClaims {
  sub: string;
  name: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
}

export async function GET(request: Request) {
  console.log("Google callback hit");
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value;

  // 1. Validation Logic
  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    // Instead of flash, we use query params for simple error handling in Next.js
    return redirect("/login?error=invalid_state");
  }

  try {
    // 2. Validate Authorization Code
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const claims = decodeIdToken(tokens.idToken()) as GoogleClaims;

    const { sub: googleUserId, name, email } = claims;

    // 3. User Resolution Logic
    let user = await getUserWithOauthId({
      provider: "google",
      providerId: googleUserId,
      email,
    });

    // Condition: User exists but not linked
    if (user && !user.providerId) {
      await linkUserWithOauth({
        userId: user.id,
        provider: "google",
        providerId: googleUserId,
      });
    }

    // Condition: New user
    if (!user) {
      user = await createUserWithOauth({
        name,
        email,
        provider: "google",
        providerId: googleUserId,
      });
    }

    // 4. Create Session
    if (user) {
      await authenticateUser({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      });
    }

    console.log("User authenticated:", user?.id);

    // 5. Cleanup OAuth Cookies
    cookieStore.delete("google_oauth_state");
    cookieStore.delete("google_code_verifier");
  } catch (error) {
    console.error("OAuth Error:", error);
    return redirect("/login?error=auth_failed");
  }

  // Final Redirect
  return redirect("/");
}
