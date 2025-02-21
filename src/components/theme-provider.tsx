"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const useTheme = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useNextTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { theme: "light", setTheme: () => {} };
  }

  return { theme, setTheme };
};
