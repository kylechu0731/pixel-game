import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/server";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GamePostSchema = z.object({
  room_code: z.string(),
  col: z.number(),
});
type GameReq = z.infer<typeof GamePostSchema>;

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const {
    room_code,
    col
  } = data as GameReq;

  try {
    if(col >= 0)
      await pusherServer.trigger(`private-${room_code}`, "game:place", { 
        col,
        sender: session?.user?.username ?? "undefined"
      })
    if(col === -1)
      await pusherServer.trigger(`private-${room_code}`, "game:win", { 
        sender: session?.user?.username ?? "undefined"
      })
    if(col === -2)
      await pusherServer.trigger(`private-${room_code}`, "game:leave", { 
        sender: session?.user?.username ?? "undefined"
      })
    if(col === -3)
      await pusherServer.trigger(`private-${room_code}`, "game:tie", { 
        sender: session?.user?.username ?? "undefined"
      })
  } catch(error) {
    return NextResponse.json({ error: "Bad" }, { status: 400 });
  }

  return new NextResponse("OK", { status: 200 });
}