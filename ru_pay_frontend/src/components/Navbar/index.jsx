import {
  CircleUser,
  HomeIcon,
  Menu,
  Package2,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/lib/components/ui/sheet";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import logo from "@/assets/rupay-logo.png";

export default function Navbar({ children }) {
  const { setAuth, setUser } = useContext(AuthContext);

  async function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    setAuth(false);
  }

  const location = useLocation();

  function getClassToActivePage(pathname) {
    return location.pathname === pathname ? "text-primary bg-muted" : "";
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a
              href="/"
              className="flex m-auto items-center gap-2 font-semibold"
            >
              <img src={logo} width="60px" className="m-auto" alt="" />
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${getClassToActivePage("/")}`}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </a>
              <a
                href="/my-tickets"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${getClassToActivePage("/my-tickets")}`}
              >
                <ShoppingCart className="h-4 w-4" />
                Meus Tickets
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="/"
                  className="flex items-center gap-2 mb-3 text-lg font-semibold"
                >
                  <img src={logo} width="60px" className="m-auto" alt="" />
                  <span className="sr-only">RU Pay</span>
                </a>
                <a
                  href="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Home
                </a>
                <a
                  href="/my-tickets"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Meus Tickets
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full ml-auto"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLogout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
