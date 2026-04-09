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
        },
      });
    }

    // 2. Save the message to that chat
    const newMessage = await prisma.message.create({
      data: {
        text,
        senderId: senderId,
        chatId: chat.id,
      },
    });

    revalidatePath("/support");
    return { success: true, message: newMessage };
  } catch (error) {
    console.error("DB_SAVE_ERROR", error);
    return { success: false, error: "Failed to send message" };
  }
}
