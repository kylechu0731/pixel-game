import { UserName } from "../menu/_components/UserName"

export default function GameLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="text-white flex-rows fixed top-0 flex-row h-screen w-full overflow-hidden">
      <div className="mt-2 flex flex-row">
        <div className="ml-4 text-2xl font-semibold">Pixel Game</div>
      </div>
      <div className="ml-4 text-lg">Welcome! @<UserName /></div>
      <div className="w-full mt-5">{children}</div>
    </div>
  )
}