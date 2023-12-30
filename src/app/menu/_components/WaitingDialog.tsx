import { pusherClient } from "@/lib/pusher/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRoom } from "@/app/hooks/useRoom";
import { useToast } from "@/components/toast/use-toast";

export default function WaitingDialog({
  room_code,
  handleBack,
}: {
  room_code: string;
  handleBack: () => void;
}) {
  const router = useRouter();
  const { deleteRoom } = useRoom();
  const [joined, setJoined] = useState(false);
  const [joinedUser, setJoinedUser] = useState("");

  useEffect(() => {
    if(!room_code) return;
    try {
      const channel = pusherClient.subscribe(`private-${room_code}`);
      
      channel.bind("room:join", ({ username }: { username: string }) => {
        setJoined(true);
        setJoinedUser(username);

        const params = new URLSearchParams();
        params.set("match", username);
        router.push(`/game/${room_code}?${params.toString()}`);
      })
    } catch(error) {
      console.log(error);
      router.push("/menu");
    }
    // return () => {
    //   pusherClient.unsubscribe(`private-${room_code}`);
    // };
  })

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-2xl">Room Code:{" "} 
        <span className="text-yellow-300">#{room_code}</span>
      </div>
      { joined?
        <div>
          <span className="text-blue-300">@{joinedUser}</span>
          {" "}joined!
        </div>
        :<div className="text-gray-300 animate-bounce">Waiting for others to join...</div>
      }
      { joined?
        <div
          className="mt-10 border-2 border-white px-2 rounded-sm hover:bg-white hover:text-black animate-pulse cursor-wait"
        >Game is about to start...</div>
        :<button
          className="mt-10 border-2 border-white px-2 rounded-sm hover:bg-white hover:text-black"
          onClick={() => {
            deleteRoom(room_code);
            pusherClient.unsubscribe(`private-${room_code}`);
            handleBack();
          }}
        >Back</button>
      }
    </div>
  )
}