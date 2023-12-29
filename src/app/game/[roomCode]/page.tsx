"use client";

import { useRoom } from "@/app/hooks/useRoom";
import Board from "./_components/Board";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function RoomPage({
  params: { roomCode },
  searchParams: { match },
}: {
  params: {
    roomCode: string;
  };
  searchParams: {
    match?: string;
  }
}) {
  const [equal, setEqual] = useState(false);
  const [end, setEnd] = useState(false);
  const { checkRooms, deleteRoom } = useRoom();
  const router = useRouter();

  checkRooms(roomCode).then((host) => {
    setEqual(host === match)
  });

  const handleLeave = () => {
    deleteRoom(roomCode);
    router.push("/menu");
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex gap-1">
            <div className="px-1 bg-white text-black rounded">Room</div>
            {roomCode.split('').map((char, i) => (
              <div key={i} className="w-5 bg-yellow-300 text-black rounded self-center text-center">{char}</div>
            ))}
        </div>
        <div className="flex gap-1">
            <div className="px-1 bg-white text-black rounded">Match</div>
            <div className="px-2 border border-white rounded text-center">{match?? "undefined"}</div>
        </div>
        <div className="flex gap-1">
            <div className="px-1 bg-white text-black rounded">Game</div>
            <div className="px-2 border border-white rounded text-center">Connect Four</div>
        </div>
      </div>
      <div 
        className={cn("mt-2 -mb-4 text-black", end && "text-gray-300 hover:text-white cursor-pointer")}
        onClick={() => {
          if(end) handleLeave();
        }}
      >Click here to return to menu...</div>
      <Board room_code={roomCode} match={match?? "undefined"} equal={equal} handleEnd={() => setEnd(true)}/>
    </div>
  );
}

export default RoomPage;