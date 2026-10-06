import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, School } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AvatarBadge } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import DarkMode from "./DarkMode";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import {
  useLoadUserQuery,
  useLogoutUserMutation,
} from "@/features/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/features/authSlice";

const Navbar = () => {
  const [logoutUser, { data }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // yeh hmne isliye fetch kiya hai, kyoki profile photo change hogi to userprofile ka avatar bhi change krna hoga
  const { data: profileData, isLoading } = useLoadUserQuery();

  const logoutHandler = async () => {
    try {
        await logoutUser().unwrap();

        dispatch(userLoggedOut());
        toast.success(data.message || "User LogOut successfully.");
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
};

  const { user } = useSelector((state) => state.auth);

  function handleLogoClick() {
    if (user) {
      navigate("/");
    }
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-4 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1
            className="font-extrabold text-2xl cursor-pointer"
            onClick={handleLogoClick}
          >
            E-Learning
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" className="cursor-pointer" />}
              >
                <Avatar>
                  <AvatarImage
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuItem>
                    <Link to="my-learning" className="cursor-pointer">
                      My Learning
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link to="profile">Edit profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuItem onClick={logoutHandler}>
                  Log Out
                </DropdownMenuItem>
                { user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </>
                )}                
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-xl">E-Learning</h1>

        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="icon" className="rounded-full" variant="outline">
            <Menu />
          </Button>
        }
      />

      <SheetContent className="w-[#190px] px-4 flex flex-col">
        {/* Header */}
        <SheetHeader className="p-0 pt-2 pb-2 flex flex-row items-center justify-between mt-9">
          <SheetTitle className="text-base">E-Learning</SheetTitle>

          <DarkMode />
        </SheetHeader>

        <Separator />

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <span className="px-0 py-1.5 text-sm cursor-pointer hover:text-primary">
            My Learning
          </span>

          <span className="px-0 py-1.5 text-sm cursor-pointer hover:text-primary">
            Edit Profile
          </span>

          <span className="px-0 py-1.5 text-sm cursor-pointer hover:text-primary">
            Log out
          </span>
        </nav>

        {/* Dashboard */}
        {role === "instructor" && (
          <SheetFooter className="p-0 mt-2">
            <Button className="w-full h-7 text-xs">Dashboard</Button>

            <SheetClose
              render={
                <Button variant="outline" className="w-full h-7 text-xs">
                  Close
                </Button>
              }
            />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
