// "use client";

// import React from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { User } from "next-auth";
// import { Button } from "./ui/button";

// const Navbar = () => {
//   const { data: session } = useSession();

//   const user: User = session?.user as User;

//   //TODO: add css classes later for ui
//   return (
//     <nav>
//       <div>
//         <a href="#">Feedback Matters</a>
//         {session ? (
//           <>
//             <span>Welcome , {user?.username || user?.email}</span>
//             <Button onClick={() => signOut()}>Logout</Button>
//           </>
//         ) : (
//           <Link href='/sign-in'>
//             <Button>Login</Button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { MessageSquare, LogOut, LogIn } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  //TODO: add css classes later for ui
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <MessageSquare className="h-7 w-7 text-blue-600" />
              Feedback Matters
            </a>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-700">
                      Welcome,{" "}
                      <span className="text-blue-600">
                        {user?.username || user?.email}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile welcome message */}
                <div className="sm:hidden flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 truncate max-w-24">
                    {user?.username || user?.email}
                  </span>
                </div>

                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-700 transition-all duration-200 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link href="/sign-in">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center gap-2 shadow-sm">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
