"use client";

import useState from "react-usestateref";
import JoinRoomDialog from "./_components/JoinRoomDialog";
import WaitingDialog from "./_components/WaitingDialog";
import { useRoom } from "../hooks/useRoom";

export default function DocsPage() {
  const [screen, setScreen] = useState(0); // 0: menu 1: join 2: create
  const [code, setCode, codeRef] = useState("");
  const { createRoom } = useRoom();

  const handleCreate = () => {
    setCode(() => String.fromCharCode(
      Math.floor(Math.random() * 25) + 65,
      Math.floor(Math.random() * 25) + 65,
      Math.floor(Math.random() * 25) + 65,
      Math.floor(Math.random() * 25) + 65,
      Math.floor(Math.random() * 25) + 65,
    ));
    createRoom(codeRef.current);
    setScreen(2);
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center text-xl">
      { screen === 0 &&
        <>
          <div className="text-gray-400 hover:text-white hover:cursor-pointer" onClick={() => setScreen(1)}>- Join a Room -</div>
          <div>or</div>
          <button className="text-gray-400 hover:text-white hover:cursor-pointer" onClick={handleCreate}>- Create a new Room -</button>
        </>
      }
      { screen === 1 &&
        <JoinRoomDialog handleBack={() => setScreen(0)}/>
      }
      { screen === 2 &&
        <WaitingDialog handleBack={() => setScreen(0)} room_code={code} />
      }
    </div>
  );
}
