import { useJoin } from "@/app/hooks/useJoin";
import { useRoom } from "@/app/hooks/useRoom";
import { useToast } from "@/components/toast/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoomDialog({
  handleBack,
}: {
  handleBack: () => void;
}) {
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const { checkRooms } = useRoom();
  const { joinRoom } = useJoin();
  const router = useRouter();

  const handleJoin = () => {
    checkRooms(code.toUpperCase()).then((arr) => {
      if(!arr[0].joined && arr[0].host_name !== "") {
        joinRoom(code.toUpperCase());
        router.push(`/game/${code.toUpperCase()}?match=${arr[0].host_name}`);
      } else {
        toast({
          variant: "destructive",
          description: "Room doesn't exist"
        })
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 border-2 border-white items-center">
      <div className="self-start bg-white text-black px-2 cursor-pointer" onClick={handleBack}>X</div>
      <div>Enter the Room Code</div>
      <div className="flex text-lg p-6">
        <div className="bg-white text-black pl-[8px] pr-[6px] pt-[2px]">#</div>
        <input
          placeholder="Room Code"
          className="pl-2 bg-black border-2 border-white outline-none w-[150px]"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button 
          className="border-2 border-white px-1 -ml-[1px] self-center hover:bg-white hover:text-black"
          onClick={handleJoin}
        >JOIN</button>
      </div>
    </div>
  )  
}