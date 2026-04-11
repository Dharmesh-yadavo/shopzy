"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(
  senderId: string,
  receiverId: string,
  text: string,
) {
  try {
    // 1. Find or Create a Chat room between these two users
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { AND: [{ creatorId: senderId }, { participantId: receiverId }] },
          { AND: [{ creatorId: receiverId }, { participantId: senderId }] },
        ],
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          creatorId: senderId,
          participantId: receiverId,
          updatedAt: new Date(),
        },
      });
    }

    // 2. Save the message to that chat
    const newMessage = await prisma.$transaction([
      prisma.message.create({
        data: { text, senderId, chatId: chat.id },
      }),
      prisma.chat.update({
        where: { id: chat.id },
        data: {
          lastMessageText: text,
          lastMessageBy: senderId,
          unreadCount: 1,
          updatedAt: new Date(),
        },
      }),
    ]);

    revalidatePath("/support");
    return { success: true, message: newMessage };
  } catch (error) {
    console.error("DB_SAVE_ERROR", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function markAsRead(chatId: string) {
  try {
    await prisma.chat.update({
      where: { id: chatId },
      data: { unreadCount: 0 },
    });
    revalidatePath("/support");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
