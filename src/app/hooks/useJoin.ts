//import { auth } from "@/lib/auth";

export const useJoin = () => {
  
  const joinRoom = async (room_code: string) => {
    // const session = await auth();
    
    console.log("[joinRoom]");
    const res = await fetch("/api/joins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code })
    })
    if(!res.ok) {
      return;
    }
  }

  return {
    joinRoom,
  }
}