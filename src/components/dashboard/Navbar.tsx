import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { Button } from "../ui/button";
import { LogOut, Mail, ChevronDown, PlusCircle, User, UserPlus, PlaneTakeoff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logout from "./logout";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed backdrop-blur-xl top-0 w-full z-50 left-0 h-auto bg-opacity-50 flex justify-between text-2xl border-b text-black p-4 pr-8 bg-white shadow-lg'>
      <div className="text-blue-700 font-bold ml-4 flex items-center justify-between">
        <div><PlaneTakeoff/></div>
        <div className="ml-4">TIRPOLOGY</div>
      </div>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className="bg-slate-200 flex items-center space-x-2 md:text-lg sm:mr-8">
              <ChevronDown />
              <span>Welcome, {session.user.fullname || session.user.name }</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2" />
                  <span>Invite Users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut className="mr-2" />
              <Logout/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (<></>)}
    </div>
  );
}

export default Navbar