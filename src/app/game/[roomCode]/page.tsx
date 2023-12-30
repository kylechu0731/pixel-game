"use client";

import { useRoom } from "@/app/hooks/useRoom";
import Board from "./_components/Board";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher/client";
import { useGame } from "@/app/hooks/useGame";
import RuleDialog from "./_components/RuleDialog";

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
  const [equal, setEqual] = useState(true);
  const [end, setEnd] = useState(false);
  const [leave, setLeave] = useState(false);
  const [ruleDialog, setRuleDialog] = useState(false);
  const { checkRooms, deleteRoom } = useRoom();
  const { sendLeave } = useGame();
  const router = useRouter();

  checkRooms(roomCode).then((arr) => {
    if(arr.length === 0) return;
    setEqual(arr[0].host_name === match)
  });

  const handleLeave = () => {
    deleteRoom(roomCode);
    sendLeave(roomCode);
    pusherClient.unsubscribe(`private-${roomCode}`);
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
            <div className={cn("px-2 border border-white rounded text-center", leave && "text-gray-300")}>{leave? "Has left":(match?? "undefined")}</div>
        </div>
        <div className="flex gap-1">
            <div className="px-1 bg-white text-black rounded">Game</div>
            <div className="px-2 border border-white rounded text-center">Connect Four</div>
            { !leave &&
            <button 
              className="ml-1 px-2 border border-white bg-black text-white rounded hover:bg-white hover:text-black"
              onClick={() => setRuleDialog(true)}
            >?</button>
            }
        </div>
      </div>
      <div 
        className="mt-2 -mb-4 text-gray-300 hover:text-white cursor-pointer"
        onClick={handleLeave}
      >Click here to return to menu...</div>
      <Board 
        room_code={roomCode}
        match={match?? "undefined"}
        equal={equal}
        handleEnd={() => setEnd(true)}
        handleLeave={() => setLeave(true)}
        stop={leave || end}
      />
      {ruleDialog && <RuleDialog handleClose={() => setRuleDialog(false)} guest={equal}/>}
    </div>
  );
}

export default RoomPage;