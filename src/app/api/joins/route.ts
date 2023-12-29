import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/server";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const JoinPostSchema = z.object({
  room_code: z.string(),
});
type JoinReq = z.infer<typeof JoinPostSchema>;

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const {
    room_code
  } = data as JoinReq;

  try {
    await pusherServer.trigger(`private-${room_code}`, "room:join", {
      username: session?.user?.username ?? "undefined",
    })
  } catch(error) {
    return NextResponse.json({ error: "Bad" }, { status: 400 });
  }

  return new NextResponse("OK", { status: 200 });
}