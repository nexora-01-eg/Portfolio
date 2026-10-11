/*
  NEXORA — Theme system
  Design philosophy:
  - Dark luxury is default
  - Light is cream + gold
  - Hybrid is dark surfaces with brighter cream ambience
*/

import * as React from "react";

export type Theme = "dark" | "light" | "hybrid";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

const THEMES: Theme[] = ["dark", "hybrid", "light"]; // intentional order

export function ThemeProvider({ children, defaultTheme = "dark", switchable = true }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const saved = (localStorage.getItem("nexora_theme") as Theme | null) ?? null;
    return saved && THEMES.includes(saved) ? saved : defaultTheme;
  });

  React.useEffect(() => {
    localStorage.setItem("nexora_theme", theme);
    const html = document.documentElement;
    html.classList.remove("light", "dark", "hybrid");
    html.classList.add(theme);
  }, [theme]);

  const setTheme = (t: Theme) => {
    if (!switchable) return;
    setThemeState(t);
  };

  const cycleTheme = () => {
    if (!switchable) return;
    setThemeState((prev) => {
      const idx = THEMES.indexOf(prev);
      return THEMES[(idx + 1) % THEMES.length];
    });
  };

  return <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
