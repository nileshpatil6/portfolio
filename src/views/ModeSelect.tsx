"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export default function ModeSelect() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="theme-icon-toggle"
          style={{ cursor: "auto" }}
        >
          <span className="theme-icon-sun"><Sun size={15} strokeWidth={2} /></span>
          <span className="theme-icon-moon"><Moon size={15} strokeWidth={2} /></span>
        </button>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col flex-1 px-6 md:px-16 transition-all duration-500 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ paddingTop: "clamp(64px, 14vh, 120px)", paddingBottom: 40 }}
      >
        {/* Name */}
        <p
          className="font-mono mb-2"
          style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)" }}
        >
          Nilesh S. Patil
        </p>

        {/* Question */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(2rem, 7vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.12,
            color: "var(--fg)",
            marginBottom: "clamp(40px, 7vh, 72px)",
          }}
        >
          How do you want<br />
          to explore?
        </h1>

        {/* Cards - vertical stack, visual on top */}
        <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 540 }}>

          {/* Visual / Portfolio - primary */}
          <button
            onClick={() => router.push("/visual")}
            className="group text-left rounded-2xl transition-all duration-200 active:scale-[0.98]"
            style={{
              padding: "clamp(24px, 4vw, 36px)",
              background: "var(--fg)",
              color: "var(--bg)",
              cursor: "auto",
              border: "none",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-mono mb-2"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.5 }}
                >
                  Recommended
                </p>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 600, marginBottom: 8 }}
                >
                  Browse the Portfolio
                </h2>
                <p style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.95rem)", lineHeight: 1.55, opacity: 0.65, maxWidth: 360 }}>
                  See my work, skills, and story in a clean visual layout. Best place to start.
                </p>
              </div>
              <span
                className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200 mt-1"
                style={{ fontSize: "1.4rem", opacity: 0.7 }}
              >
                →
              </span>
            </div>
          </button>

          {/* Terminal - secondary */}
          <button
            onClick={() => router.push("/dev")}
            className="group text-left rounded-2xl transition-all duration-200 active:scale-[0.98]"
            style={{
              padding: "clamp(24px, 4vw, 36px)",
              border: "1.5px solid var(--border-color)",
              background: "var(--bg-elevated)",
              color: "var(--fg)",
              cursor: "auto",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-mono mb-2"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-subtle)" }}
                >
                  For the curious
                </p>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 600, marginBottom: 8 }}
                >
                  Open the Terminal
                </h2>
                <p style={{ fontSize: "clamp(0.82rem, 2.2vw, 0.95rem)", lineHeight: 1.55, color: "var(--fg-muted)", maxWidth: 360 }}>
                  A real Linux-style terminal. Type commands, explore, see what happens.
                </p>
              </div>
              <span
                className="flex-shrink-0 font-mono group-hover:translate-x-1 transition-transform duration-200 mt-1"
                style={{ fontSize: "1rem", color: "var(--fg-subtle)" }}
              >
                →
              </span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="section-label">Belgaum, Karnataka</span>
          <span className="section-label opacity-30">·</span>
          <span className="section-label">technil6436@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
