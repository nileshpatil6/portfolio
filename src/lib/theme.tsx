"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
interface ThemeCtx { theme: Theme; toggle: () => void }

export const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
  }, [theme]);

  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
