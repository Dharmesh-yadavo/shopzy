import { getCurrentUser } from "@/features/auth/auth.queries";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const participantId = searchParams.get("participantId");

    if (!user || !participantId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { AND: [{ creatorId: user.id }, { participantId: participantId }] },
          { AND: [{ creatorId: participantId }, { participantId: user.id }] },
        ],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return NextResponse.json([]);
    }

    return NextResponse.json(chat.messages);
  } catch (error) {
    console.error("[CHAT_HISTORY_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
