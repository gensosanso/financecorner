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
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

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
  const { t } = useLanguage();

  return (
    <nav className="w-full h-[72px] px-6 border-b border-gray-border bg-white/95 backdrop-blur-sm flex items-center justify-between fixed top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <a href="/" className="text-2xl font-bold text-blue-deep">
          CryptoEx
        </a>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav.products")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/trading")}
                  >
                    <div className="font-medium">{t("nav.trading")}</div>
                    <p className="text-sm text-muted-foreground">
                      {t("nav.trading.desc")}
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/lending")}
                  >
                    <div className="font-medium">{t("nav.lending")}</div>
                    <p className="text-sm text-muted-foreground">
                      {t("nav.lending.desc")}
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {t("nav.resources")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/learn")}
                  >
                    <div className="font-medium">{t("nav.learn")}</div>
                    <p className="text-sm text-muted-foreground">
                      {t("nav.learn.desc")}
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => (window.location.href = "/support")}
                  >
                    <div className="font-medium">{t("nav.support")}</div>
                    <p className="text-sm text-muted-foreground">
                      {t("nav.support.desc")}
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
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
              {t("nav.login")}
            </Button>
            <Button onClick={onSignUpClick}>{t("nav.signup")}</Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => {
                // Preserve language when navigating
                const currentLang = localStorage.getItem("language") || "en";
                window.location.href = `/dashboard?lang=${currentLang}`;
              }}
            >
              {t("nav.dashboard")}
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
              {t("nav.signout")}
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
