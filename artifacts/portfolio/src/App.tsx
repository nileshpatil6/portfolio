import { createContext, useContext, useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cursor from "@/components/Cursor";
import ModeSelect from "@/pages/ModeSelect";
import DevMode from "@/pages/DevMode";
import VisualMode from "@/pages/VisualMode";

const queryClient = new QueryClient();

/* ── Theme context ────────────────────────────────────── */
type Theme = "light" | "dark";
interface ThemeCtx { theme: Theme; toggle: () => void }
export const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
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

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="text-center">
        <p className="font-serif text-8xl" style={{ color: "var(--fg)" }}>404</p>
        <p className="mt-4 text-sm" style={{ color: "var(--fg-muted)" }}>Page not found</p>
        <a href="/" className="mt-6 inline-block btn-outline">Go home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={ModeSelect} />
      <Route path="/dev" component={DevMode} />
      <Route path="/visual" component={VisualMode} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Cursor />
          <div className="noise" />
          <Router />
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
