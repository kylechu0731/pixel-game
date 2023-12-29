function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-4">
      {children}
    </div>
  )
}

export default RoomLayout;