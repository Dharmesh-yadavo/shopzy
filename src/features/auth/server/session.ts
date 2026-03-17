import { cookies, headers } from "next/headers";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { getIPAddress } from "./location";

const createUserSession = async ({
  userId,
  userAgent,
  ip,
}: {
  userId: string;
  userAgent: string;
  ip: string;
}) => {
  return await prisma.sessionTable.upsert({
    where: {
      userId_userAgent: { userId, userAgent },
    },
    update: {
      ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    create: {
      userId,
      userAgent,
      ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
};

const createAccessToken = ({
  id,
  name,
  email,
  sessionId,
}: {
  id: string;
  name: string;
  email: string;
  sessionId: string;
}) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (sessionId: string) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d",
  });
};

export const verifyJWTToken = (token: string) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  console.log("verify: ", verify);
  if (!verify) return null;
  return verify;
  // try {
  //   return jwt.verify(token, process.env.JWT_SECRET_KEY!);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // } catch (e) {
  //   console.log(e);
  //   return null;
  // }
};

const findSessionById = async (sessionId: string) => {
  return await prisma.sessionTable.findUnique({
    where: { id: sessionId },
  });
};

const findUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const decodedToken = verifyJWTToken(refreshToken);

    if (!decodedToken || typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }

    const currentSession = await findSessionById(decodedToken.sessionId);

    if (!currentSession || currentSession.expiresAt < new Date()) {
      throw new Error("Invalid session");
    }

    const user = await findUserById(currentSession.userId);

    if (!user) throw new Error("Invalid User");

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      sessionId: currentSession.id,
    };

    const newAccessToken = createAccessToken(userInfo);

    const newRefreshToken = createRefreshToken(currentSession.id);

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    console.error("Error refreshing tokens:", error);
  }
};

export const authenticateUser = async ({
  userId,
  userName,
  userEmail,
}: {
  userId: string;
  userName: string;
  userEmail: string;
}) => {
  const headersList = await headers();
  const ip = await getIPAddress();

  const session = await createUserSession({
    userId,
    userAgent: headersList.get("user-agent") || "",
    ip: ip,
  });

  const accessToken = createAccessToken({
    id: userId,
    name: userName,
    email: userEmail,
    sessionId: session.id,
  });

  const refreshToken = createRefreshToken(session.id);

  const cookieStore = await cookies();

  const SESSION_LIFETIME = 7 * 24 * 60 * 60;

  console.log("authenticateUser: ", accessToken, " ", refreshToken);

  cookieStore.set("access_token", accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: 15 * 60,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh_token", refreshToken, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
    sameSite: "lax",
    path: "/",
  });
};
