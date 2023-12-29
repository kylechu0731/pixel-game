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

  return {
    sendWin,
  }
}