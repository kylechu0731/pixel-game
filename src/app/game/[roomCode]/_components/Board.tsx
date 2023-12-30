import { useEffect } from "react";
import useState from "react-usestateref";
import Position from "./Position";
import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher/client";
import { useRouter } from "next/navigation";
import { useGame } from "@/app/hooks/useGame";

export default function Board({
  room_code,
  match,
  equal,
  handleEnd,
  handleLeave,
  stop,
}: {
  room_code: string,
  match: string,
  equal: boolean,
  handleEnd: () => void,
  handleLeave: () => void,
  stop: boolean,
}) {
  const [board, setBoard, boardRef] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]); // 0: empty 1: self 2: match
  const [guest, setGuest] = useState(equal);
  const [turn, setTurn, turnRef] = useState(false);
  const [hover, setHover] = useState(0);
  const [result, setResult, resultRef] = useState(0);
  const router = useRouter();
  const { sendWin, sendTie } = useGame();

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const placeToken = async (col: number) => {
    if(board[0][col]) return;
    if(!turn) return;
    if(result) return;
    setTurn(false);
    const board_copy = board;
    var i = 5;
    while(true) {
      if(board_copy[i][col])
        i -= 1;
      else
        break;
    }
    board_copy[i][col] = 1;
    setBoard(board_copy);

    console.log("[placeToken]");
    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_code, col })
    })
    if(!res.ok) {
      return;
    }
  }

  useEffect(() => {
    if(stop) {
      setTurn(false);
      return;
    }
    sleep(5000).then(() => {
      setTurn(!equal);
      setGuest(equal);
    })
  }, [equal]);

  useEffect(() => {
    try {
      const channel = pusherClient.subscribe(`private-${room_code}`);
      channel.bind("game:place", ({ col, sender }: { col: number, sender: string }) => {
        console.log("[receive]");
        if(turnRef.current) return;
        if(resultRef.current) return;
        if(sender !== match) return;

        const board_copy = boardRef.current;
        var i = 5;
        while(true) {
          if(board_copy[i][col])
            i -= 1;
          else
            break;
        }
        board_copy[i][col] = 2;
        setBoard(board_copy);

        var fail = false;
        if(i < 3) { // down
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col] === 2 &&
             board_copy[i+2][col] === 2 &&
             board_copy[i+3][col] === 2) fail = true;
        }
        if(col >= 3) { // xooo
          if(board_copy[i][col] === 2 &&
             board_copy[i][col-1] === 2 &&
             board_copy[i][col-2] === 2 &&
             board_copy[i][col-3] === 2) fail = true;
        }
        if(col >= 1 && col+2 < 7) { // oxoo
          if(board_copy[i][col] === 2 &&
             board_copy[i][col-1] === 2 &&
             board_copy[i][col+1] === 2 &&
             board_copy[i][col+2] === 2) fail = true;
        }
        if(col >= 2 && col+1 < 7) { // ooxo
          if(board_copy[i][col] === 2 &&
             board_copy[i][col-2] === 2 &&
             board_copy[i][col-1] === 2 &&
             board_copy[i][col+1] === 2) fail = true;
        }
        if(col <= 3) { // ooox
          if(board_copy[i][col] === 2 &&
             board_copy[i][col+1] === 2 &&
             board_copy[i][col+2] === 2 &&
             board_copy[i][col+3] === 2) fail = true;
        }
        if(i < 3 && col >= 3) { // down-left
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col-1] === 2 &&
             board_copy[i+2][col-2] === 2 &&
             board_copy[i+3][col-3] === 2) fail = true;
        }
        if(i+2 < 6 && col >= 2 && i >= 1 && col+1 < 7) { //
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col-1] === 2 &&
             board_copy[i+2][col-2] === 2 &&
             board_copy[i-1][col+1] === 2) fail = true;
        }
        if(i+1 < 6 && col >= 1 && i >= 2 && col+2 < 7) { //
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col-1] === 2 &&
             board_copy[i-1][col+1] === 2 &&
             board_copy[i-2][col+2] === 2) fail = true;
        }
        if(i >= 3 && col <= 3) { // up-right
          if(board_copy[i][col] === 2 &&
             board_copy[i-1][col+1] === 2 &&
             board_copy[i-2][col+2] === 2 &&
             board_copy[i-3][col+3] === 2) fail = true;
        }
        if(i < 3 && col <= 3) { // down-right
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col+1] === 2 &&
             board_copy[i+2][col+2] === 2 &&
             board_copy[i+3][col+3] === 2) fail = true;
        }
        if(i+2 < 6 && col+2 < 7 && i >= 1 && col >= 1) { //
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col+1] === 2 &&
             board_copy[i+2][col+2] === 2 &&
             board_copy[i-1][col-1] === 2) fail = true;
        }
        if(i+1 < 6 && col+1 < 7 && i >= 2 && col >= 2) { //
          if(board_copy[i][col] === 2 &&
             board_copy[i+1][col+1] === 2 &&
             board_copy[i-1][col-1] === 2 &&
             board_copy[i-2][col-2] === 2) fail = true;
        }
        if(i >= 3 && col >= 3) { // up-left
          if(board_copy[i][col] === 2 &&
             board_copy[i-1][col-1] === 2 &&
             board_copy[i-2][col-2] === 2 &&
             board_copy[i-3][col-3] === 2) fail = true;
        }
  
        if(fail) {
          setResult(-1);
          sendWin(room_code);
          handleEnd();
        }
        else {
          var full = true;
          for(var c=0; c<7; c+=1) {
            if(!board_copy[0][c]) {
              full = false;
              break;
            }
          }
          if(full) {
            setResult(2);
            sendTie(room_code);
            handleEnd();
          } else setTurn(true);
        }
      })
      channel.bind("game:win", ({ sender }: { sender: string }) => {
        if(sender !== match) return;
        setResult(1);
        handleEnd();
      })
      channel.bind("game:leave", ({ sender }: { sender: string }) => {
        if(sender !== match) return;
        handleLeave();
        if(resultRef.current === 0)
          setResult(-2);
        pusherClient.unsubscribe(`private-${room_code}`);
      })
      channel.bind("game:tie", ({ sender }: { sender: string }) => {
        if(sender !== match) return;
        setResult(2);
        handleEnd();
      })
    } catch(error) {
      console.log(error);
      router.push("/menu");
    }

  });

  return (
    <div className="mt-[20px] self-center flex flex-col">
      <div className="flex -my-2">
        {[1,2,3,4,5,6,7].map((pos) => (
          <div 
            key={pos}
            className={cn(
              "w-12 h-12 mx-[-2.5px] text-center text-2xl",
              guest? "text-red-600": "text-yellow-300",
              pos !== hover && "text-black",
              !turn && "text-black",
              board[0][hover-1] && "text-black"
            )}>{"v"}</div>
        ))}
      </div>
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((entry, j) => (
            <Position 
              key={j}
              setHover={() => setHover(j+1)}
              setLeave={() => setHover(0)}
              handlePlace={() => placeToken(j)}
              state={entry}
              guest={guest} />
          ))}
        </div>
      ))}
      { !result && <>
        { turn?
          <div className="w-full text-center mt-3 text-lg animate-bounce">It&apos;s your turn!</div>
          :
          <div className="w-full text-center mt-3 text-lg text-gray-400">Waiting for <span className="text-yellow-200">{match}</span>...</div>
        }
      </>
      }
      { result === 1 && <div className="w-full text-center mt-3 text-lg text-yellow-300">You win!!!</div>}
      { result === -1 && <div className="w-full text-center mt-3 text-lg"><span className="text-yellow-200">{match}</span> win.</div>}
      { result === 2 && <div className="w-full text-center mt-3 text-lg">Tie!</div>}
      { result === -2 && <div className="w-full text-center mt-3 text-lg"><span className="text-yellow-200">{match}</span> left.</div>}
    </div>
  );
}