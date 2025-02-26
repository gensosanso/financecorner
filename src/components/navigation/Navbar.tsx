import React from "react";
import { MoonIcon, SunIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTheme } from "@/components/theme-provider";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  isAuthenticated?: boolean;
}

const Navbar = ({
  onLoginClick = () => {},
  onSignUpClick = () => {},
  isAuthenticated = false,
}: NavbarProps) => {
  const { setTheme, theme } = useTheme() || {
    setTheme: () => {},
    theme: "light",
  };

  return (
    <nav className="w-full h-[72px] px-6 border-b bg-background flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-6">
        <a href="/" className="text-2xl font-bold text-primary">
          CryptoEx
        </a>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/trading")}
                  >
                    <div className="font-medium">Trading</div>
                    <p className="text-sm text-muted-foreground">
                      Buy and sell cryptocurrencies
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/lending")}
                  >
                    <div className="font-medium">Lending</div>
                    <p className="text-sm text-muted-foreground">
                      Earn interest on your assets
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/learn")}
                  >
                    <div className="font-medium">Learn</div>
                    <p className="text-sm text-muted-foreground">
                      Educational resources
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/support")}
                  >
                    <div className="font-medium">Support</div>
                    <p className="text-sm text-muted-foreground">
                      Help center and documentation
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>

        {!isAuthenticated ? (
          <>
            <Button variant="ghost" onClick={onLoginClick}>
              Login
            </Button>
            <Button onClick={onSignUpClick}>Sign Up</Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                window.location.href = "/";
              }}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
