export default function Position({
  setHover,
  setLeave,
  handlePlace,
  state,
  guest,
}: {
  setHover: () => void,
  setLeave: () => void,
  handlePlace: () => void,
  state: number,
  guest: boolean,
}) {
  return (
    <div 
      className="w-12 h-12 border-4 border-white mx-[-2.5px] my-[-2.5px] text-center"
      onMouseOver={setHover}
      onMouseLeave={setLeave}
      onClick={handlePlace}
    >
      { state === 1 && guest && <div className="h-6 bg-red-600 border-2 border-red-900 rounded-full mx-2 mt-[9px]"/>}
      { state === 2 && guest && <div className="h-6 bg-yellow-300 border-2 border-yellow-500 rounded-full mx-2 mt-[9px]"/>}
      { state === 2 && !guest && <div className="h-6 bg-red-600 border-2 border-red-900 rounded-full mx-2 mt-[9px]"/>}
      { state === 1 && !guest && <div className="h-6 bg-yellow-300 border-2 border-yellow-500 rounded-full mx-2 mt-[9px]"/>}
    </div>
  );
}