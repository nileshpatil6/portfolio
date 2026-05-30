"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export default function ModeSelect() {
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-20">
        <button onClick={toggle} aria-label="Toggle theme" className="theme-icon-toggle" style={{ cursor: "auto" }}>
          <span className="theme-icon-sun"><Sun size={15} strokeWidth={2} /></span>
          <span className="theme-icon-moon"><Moon size={15} strokeWidth={2} /></span>
        </button>
      </div>

      <div className={`transition-all duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>

        {/* ── DESKTOP layout ── */}
        <div className="hidden md:grid min-h-screen" style={{ gridTemplateColumns: "1fr 1fr" }}>

          {/* Left: heading */}
          <div
            className="flex flex-col justify-between px-16 py-16"
            style={{ borderRight: "1px solid var(--border-color)" }}
          >
            <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
              Nilesh S. Patil
            </p>

            <div>
              <h1
                className="font-serif"
                style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: 28 }}
              >
                How do you<br />want to<br />explore?
              </h1>
              <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: 360 }}>
                Choose how you'd like to see this portfolio. Both show the same work, just a different experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <span className="section-label">Belgaum, Karnataka</span>
              <span className="section-label" style={{ opacity: 0.3 }}>·</span>
              <span className="section-label">technil6436@gmail.com</span>
            </div>
          </div>

          {/* Right: cards split */}
          <div className="flex flex-col">
            <Link
              href="/visual"
              className="group flex-1 text-left flex flex-col justify-between p-16 transition-colors duration-200"
              style={{ background: "var(--fg)", color: "var(--bg)", cursor: "auto", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-start justify-between">
                <p className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.45 }}>
                  01 — Recommended
                </p>
                <span className="group-hover:translate-x-1 transition-transform duration-200" style={{ opacity: 0.55, fontSize: "1.2rem" }}>→</span>
              </div>
              <div>
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: 10 }}>
                  Browse the<br />Portfolio
                </h2>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.6, opacity: 0.55, maxWidth: 280 }}>
                  Projects, skills, and story in one clean scroll.
                </p>
              </div>
            </Link>

            <Link
              href="/dev"
              className="group flex-1 text-left flex flex-col justify-between p-16 transition-colors duration-200 hover:bg-[var(--bg-elevated)]"
              style={{ background: "var(--bg-elevated)", color: "var(--fg)", cursor: "auto" }}
            >
              <div className="flex items-start justify-between">
                <p className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
                  02 — For the curious
                </p>
                <span className="group-hover:translate-x-1 transition-transform duration-200" style={{ fontSize: "1.2rem", color: "var(--fg-subtle)" }}>→</span>
              </div>
              <div>
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: 10 }}>
                  Open the<br />Terminal
                </h2>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--fg-muted)", maxWidth: 280 }}>
                  A real Linux-style shell. Type commands, explore.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="md:hidden flex flex-col min-h-screen px-6 pt-14 pb-10">
          <p className="font-mono mb-2" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
            Nilesh S. Patil
          </p>
          <h1 className="font-serif mb-8" style={{ fontSize: "clamp(2.2rem, 10vw, 3.2rem)", fontWeight: 300, lineHeight: 1.1 }}>
            How do you want<br />to explore?
          </h1>

          <div className="flex flex-col gap-3">
            <Link
              href="/visual"
              className="group text-left rounded-2xl active:scale-[0.98] transition-transform"
              style={{ padding: 24, background: "var(--fg)", color: "var(--bg)", cursor: "auto" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono mb-2" style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.45 }}>Recommended</p>
                  <h2 className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>Browse the Portfolio</h2>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.55, opacity: 0.6 }}>See my work, skills, and story. Best place to start.</p>
                </div>
                <span className="flex-shrink-0 group-hover:translate-x-1 transition-transform mt-1" style={{ fontSize: "1.2rem", opacity: 0.6 }}>→</span>
              </div>
            </Link>

            <Link
              href="/dev"
              className="group text-left rounded-2xl active:scale-[0.98] transition-transform"
              style={{ padding: 24, background: "var(--bg-elevated)", color: "var(--fg)", border: "1.5px solid var(--border-color)", cursor: "auto" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono mb-2" style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>For the curious</p>
                  <h2 className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>Open the Terminal</h2>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "var(--fg-muted)" }}>A real Linux-style shell. Type commands, explore.</p>
                </div>
                <span className="flex-shrink-0 group-hover:translate-x-1 transition-transform mt-1" style={{ fontSize: "1.2rem", color: "var(--fg-subtle)" }}>→</span>
              </div>
            </Link>
          </div>

          <div className="mt-auto pt-10 flex flex-wrap gap-x-4 gap-y-1">
            <span className="section-label">Belgaum, Karnataka</span>
            <span className="section-label" style={{ opacity: 0.3 }}>·</span>
            <span className="section-label">technil6436@gmail.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}
