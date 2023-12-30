"use client";

import { useState } from "react";
import AuthForm from "./_components/AuthForm";
import { cn } from "@/lib/utils";

export default function Home() {
  const [login, setLogin] = useState(false);

  return (
    <>
      <div className={cn("flex flex-col items-center gap-3 justify-between py-24 text-white", !login && "border border-white w-[580px] h-[500px]")}>
        { login? <AuthForm /> :
          <>
            <div className="text-2xl">Welcome to PixelGame.</div>
            <button 
              className="text-xl animate-bounce"
              onClick={() => setLogin(true)}
            >Go!</button>
            <div>Press &quot;Go!&quot; to get started!</div>
            <div className="-mt-20 text-yellow-300">!! Please adjust your window size to fit the white border !!</div>
          </>
        }
      </div>
      {!login && <div className="text-red-500">You should NOT see this, please adjust your window size.</div>}
    </>
  )
}
