import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function LogOut() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  return (
    <Link href="/auth/signout" className="ml-auto mr-4 self-center text-gray-400 hover:text-white border-2 border-gray-400 px-2 rounded hover:cursor-pointer hover:border-white">
      <button>Log Out</button>
    </Link>
  )
}