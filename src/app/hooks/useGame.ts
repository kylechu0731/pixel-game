export const useGame = () => {
  
  const sendWin = async (room_code: string) => {
    // const session = await auth();
    
    console.log("[sendWin]");
    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code, col: -1 })
    })
    if(!res.ok) {
      return;
    }
  }

  const sendLeave = async (room_code: string) => {
    // const session = await auth();
    
    console.log("[sendLeave]");
    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code, col: -2 })
    })
    if(!res.ok) {
      return;
    }
  }

  const sendTie = async (room_code: string) => {
    // const session = await auth();
    
    console.log("[sendTie]");
    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code, col: -3 })
    })
    if(!res.ok) {
      return;
    }
  }

  return {
    sendWin,
    sendLeave,
    sendTie,
  }
}