import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cursor from "@/components/Cursor";
import ModeSelect from "@/pages/ModeSelect";
import DevMode from "@/pages/DevMode";
import VisualMode from "@/pages/VisualMode";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center font-mono">
        <div className="text-[#00d4ff] text-6xl font-bold mb-4">404</div>
        <div className="text-[#a0aec0]">Page not found</div>
        <a href="/" className="mt-4 inline-block text-[#00d4ff] hover:underline cursor-none">
          Return home
        </a>
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

function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#0a0a0f";
    document.body.style.color = "#e2e8f0";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        {/* Custom cursor */}
        <Cursor />

        {/* Noise grain overlay */}
        <div className="noise-overlay" />

        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
