import { db } from "@/db";
import { roomsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RoomPostSchema = z.object({
  room_code: z.string(),
});
type RoomReq = z.infer<typeof RoomPostSchema>;

export async function GET() {
  try {
    const rooms = await db
      .select({ 
        room_code: roomsTable.roomCode,
        host_name: roomsTable.hostName,
        joined: roomsTable.joined,
      })
      .from(roomsTable)
      .execute();
    return NextResponse.json({ rooms: rooms }, { status: 200 });
  } catch(error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const {
    room_code
  } = data as RoomReq;

  try {
    await db
      .insert(roomsTable)
      .values({ 
        roomCode: room_code,
        hostId: session.user.id,
        hostName: session.user.username
      })
      .onConflictDoNothing()
      .execute();
  } catch(error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const {
    room_code
  } = data as RoomReq;

  try {
    await db
      .update(roomsTable)
      .set({ joined: true })
      .where(eq(roomsTable.roomCode, room_code))
      .execute();
  } catch(error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();

  const {
    room_code
  } = data as RoomReq;

  try {
    await db
      .delete(roomsTable)
      .where(eq(roomsTable.roomCode, room_code))
      .execute();
  } catch(error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return new NextResponse("OK", { status: 200 });
}