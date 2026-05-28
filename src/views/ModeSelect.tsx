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

      {/* ── Full-screen split layout ── */}
      <div
        className={`flex-1 flex flex-col md:flex-row transition-all duration-500 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* LEFT: heading */}
        <div
          className="flex flex-col justify-between px-8 md:px-16 pt-16 pb-8 md:py-0 md:justify-center"
          style={{ flex: "0 0 auto", width: "100%", maxWidth: "100%" }}
        >
          {/* Mobile: inline layout */}
          <div className="md:hidden">
            <p
              className="font-mono mb-2"
              style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)" }}
            >
              Nilesh S. Patil
            </p>
            <h1
              className="font-serif"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}
            >
              How do you want<br />to explore?
            </h1>

            {/* Mobile cards - stacked */}
            <div className="flex flex-col gap-3">
              <ModeCard
                label="Recommended"
                title="Browse the Portfolio"
                desc="See my work, skills, and story in a clean visual layout. Best place to start."
                primary
                onClick={() => router.push("/visual")}
              />
              <ModeCard
                label="For the curious"
                title="Open the Terminal"
                desc="A real Linux-style terminal. Type commands, explore, see what happens."
                onClick={() => router.push("/dev")}
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-1">
              <span className="section-label">Belgaum, Karnataka</span>
              <span className="section-label opacity-30">·</span>
              <span className="section-label">technil6436@gmail.com</span>
            </div>
          </div>
        </div>

        {/* DESKTOP: two-column grid */}
        <div
          className="hidden md:grid w-full min-h-screen"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Left col: heading */}
          <div
            className="flex flex-col justify-between px-16 py-16 border-r"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p
              className="font-mono"
              style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)" }}
            >
              Nilesh S. Patil
            </p>

            <div>
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(3rem, 5.5vw, 6rem)",
                  fontWeight: 300,
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                  marginBottom: 32,
                }}
              >
                How do you<br />want to<br />explore?
              </h1>
              <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 380 }}>
                Choose how you'd like to navigate this portfolio. Both show the same work, different experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <span className="section-label">Belgaum, Karnataka</span>
              <span className="section-label opacity-30">·</span>
              <span className="section-label">technil6436@gmail.com</span>
            </div>
          </div>

          {/* Right col: cards */}
          <div className="flex flex-col">
            {/* Portfolio card - top half */}
            <button
              onClick={() => router.push("/visual")}
              className="group flex-1 text-left flex flex-col justify-between p-16 border-b transition-all duration-200 hover:bg-[var(--fg)] hover:[color:var(--bg)]"
              style={{
                borderColor: "var(--border-color)",
                background: "var(--fg)",
                color: "var(--bg)",
                cursor: "auto",
              }}
            >
              <div className="flex items-start justify-between">
                <p
                  className="font-mono"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.45 }}
                >
                  01 — Recommended
                </p>
                <span
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  style={{ fontSize: "1.2rem", opacity: 0.6 }}
                >
                  →
                </span>
              </div>
              <div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: 12 }}
                >
                  Browse the<br />Portfolio
                </h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.6, maxWidth: 300 }}>
                  Projects, skills, and story in one clean scroll.
                </p>
              </div>
            </button>

            {/* Terminal card - bottom half */}
            <button
              onClick={() => router.push("/dev")}
              className="group flex-1 text-left flex flex-col justify-between p-16 transition-all duration-200 hover:bg-[var(--bg-elevated)]"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg)",
                cursor: "auto",
                border: "none",
              }}
            >
              <div className="flex items-start justify-between">
                <p
                  className="font-mono"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-subtle)" }}
                >
                  02 — For the curious
                </p>
                <span
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  style={{ fontSize: "1.2rem", color: "var(--fg-subtle)" }}
                >
                  →
                </span>
              </div>
              <div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: 12 }}
                >
                  Open the<br />Terminal
                </h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--fg-muted)", maxWidth: 300 }}>
                  A real Linux-style shell. Type commands, explore, hack around.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeCard({
  label, title, desc, primary, onClick,
}: {
  label: string; title: string; desc: string; primary?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl transition-all duration-200 active:scale-[0.98]"
      style={{
        padding: "24px",
        background: primary ? "var(--fg)" : "var(--bg-elevated)",
        color: primary ? "var(--bg)" : "var(--fg)",
        border: primary ? "none" : "1.5px solid var(--border-color)",
        cursor: "auto",
        width: "100%",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="font-mono mb-2"
            style={{
              fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",
              opacity: primary ? 0.45 : undefined, color: primary ? undefined : "var(--fg-subtle)",
            }}
          >
            {label}
          </p>
          <h2 className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 6 }}>
            {title}
          </h2>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.55, opacity: primary ? 0.6 : undefined, color: primary ? undefined : "var(--fg-muted)" }}>
            {desc}
          </p>
        </div>
        <span
          className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200 mt-1"
          style={{ fontSize: "1.2rem", opacity: 0.6 }}
        >
          →
        </span>
      </div>
    </button>
  );
}
