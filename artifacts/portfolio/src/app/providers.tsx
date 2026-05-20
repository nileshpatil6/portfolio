"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/lib/theme";
import Cursor from "@/components/Cursor";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Cursor />
        <div className="noise" />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
