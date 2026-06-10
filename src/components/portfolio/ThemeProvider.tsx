import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const THEMES = [
  { id: "aurora", name: "Aurora Dream", swatch: ["#b56cff", "#5fb7ff"] },
  { id: "rose", name: "Rose Gold", swatch: ["#f6c1a8", "#d98876"] },
  { id: "lavender", name: "Lavender Mist", swatch: ["#c9a8ff", "#9a8bff"] },
  { id: "midnight", name: "Midnight Black", swatch: ["#1a1a1a", "#d4af37"] },
  { id: "ocean", name: "Ocean Blue", swatch: ["#5fb7ff", "#6fe7d8"] },
  { id: "sunset", name: "Sunset Glow", swatch: ["#ff9c5b", "#ff5fa2"] },
  { id: "light", name: "Light", swatch: ["#ffffff", "#cbb6ff"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

interface Ctx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}
const ThemeCtx = createContext<Ctx>({ theme: "aurora", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "aurora";
    return (localStorage.getItem("ms-theme") as ThemeId) || "aurora";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ms-theme", theme);
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
