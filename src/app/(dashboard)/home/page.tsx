import SessionHomepage from "@/components/dashboard/priceInput";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link";

const HOMEPAGE = async () => {
  const session = await getServerSession(authOptions);
  if(session?.user)
  {
    return (
      <SessionHomepage/>
    )
  }
  else{
    return (
      <Link href='/login' className="text-6xl h-auto flex items-center mt-40 underline justify-center text-black">LOGIN TO VIEW THIS PAGE</Link>
    )
  }
}

export default HOMEPAGE

