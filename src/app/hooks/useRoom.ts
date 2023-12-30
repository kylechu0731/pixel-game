export const useRoom = () => {
  const checkRooms = async (room_code: string) => {
    console.log("[checkRooms]");
    const res = await fetch("/api/rooms");
    const data = await res.json();
    if(!data.rooms) {
      console.log("Something Wrong.");
      return;
    }

    return data.rooms.filter((room: { room_code: string }) => room.room_code === room_code);

    // if(data.rooms.filter((room: { room_code: string }) => room.room_code === room_code).length > 0)
    //   return (data.rooms.filter((room: { room_code: string }) => room.room_code === room_code)[0].host_name);
    // else
    //   return "";
  }

  const createRoom = async (room_code: string) => {
    console.log("[createRoom]");
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code }),
    })
    if(!res.ok) {
      return;
    }
  }

  const deleteRoom = async (room_code: string) => {
    console.log("[deleteRoom]");
    const res = await fetch("/api/rooms", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code }),
    })
    if(!res.ok) {
      return;
    }
  }

  return {
    checkRooms,
    createRoom,
    deleteRoom,
  }
}