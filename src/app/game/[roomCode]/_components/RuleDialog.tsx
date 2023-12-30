import { cn } from "@/lib/utils";

export default function RuleDialog({
  handleClose,
  guest,
}: {
  handleClose: () => void,
  guest: boolean,
}) {
  return (
    <div className="absolute h-screen w-screen bg-black bg-opacity-80">
      <div className="mt-[100px] text-center ml-[-30px]"><span className="px-1 border rounded mr-1">Connect Four</span> is a 2-player game. Players alternate taking turns.</div>
      <div className="text-center ml-[-30px]">Your color is <span className={cn("ml-1 px-1 rounded pb-[1px]", guest? "bg-red-600":"bg-yellow-300 text-black")}>{guest? "red":"yellow"}</span></div>
      <div className="mt-10 text-center ml-[-30px]">The goal of Connect Four is to get <span className="underline">4 of your color checkers in a row.</span></div>
      <div className="text-center ml-[-30px]">Horizontally, vertically, or diagonally!</div>
      <div className="mt-5 text-center ml-[-30px]">
        <span 
          className="border-2 rounded px-1 hover:bg-white hover:text-black cursor-pointer"
          onClick={handleClose}
        >X</span>
      </div>
    </div>
  );
}