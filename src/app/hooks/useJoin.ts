//import { auth } from "@/lib/auth";

export const useJoin = () => {
  
  const joinRoom = async (room_code: string) => {
    // const session = await auth();
    
    console.log("[joinRoom]");
    const res1 = await fetch("/api/joins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code })
    })
    if(!res1.ok) {
      return;
    }
    const res2 = await fetch("/api/rooms", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code })
    })
    if(!res2.ok) {
      return;
    }
  }

  return {
    joinRoom,
  }
}