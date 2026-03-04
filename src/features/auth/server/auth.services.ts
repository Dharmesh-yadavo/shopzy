import prisma from "@/lib/prisma";

export const getUserWithOauthId = async ({
  provider,
  providerId,
  email,
}: {
  provider: string;
  providerId: string;
  email: string;
}) => {
  //  First check if OAuth account already exists
  const existingOAuth = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerId: {
        provider,
        providerId,
      },
    },
    include: { user: true },
  });

  // If OAuth exists → return linked user
  if (existingOAuth) {
    return {
      id: existingOAuth.user.id,
      name: existingOAuth.user.name,
      email: existingOAuth.user.email,
      provider: existingOAuth.provider,
      providerId: existingOAuth.providerId,
    };
  }

  // If OAuth does not exist → check by email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      provider: null,
      providerId: null,
    };
  }

  // Completely new user
  return null;
};

export const linkUserWithOauth = async ({
  userId,
  provider,
  providerId,
}: {
  userId: string;
  provider: string;
  providerId: string;
}) => {
  return await prisma.oAuthAccount.create({
    data: {
      userId,
      provider,
      providerId,
    },
  });
};

export const createUserWithOauth = async ({
  name,
  email,
  provider,
  providerId,
}: {
  name: string;
  email: string;
  provider: string;
  providerId: string;
}) => {
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { name, email },
    });

    await tx.oAuthAccount.create({
      data: {
        userId: newUser.id,
        provider,
        providerId,
      },
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: provider,
      providerId: providerId,
    };
  });
  return user;
};
