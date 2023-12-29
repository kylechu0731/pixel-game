export default function RoomButton({
  id,
}: {
  id: number;
}) {
  return (
    <div className="border-2 border-white p-2">
      #{id}
    </div>
  )
}