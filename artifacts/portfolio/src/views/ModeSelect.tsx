"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FlowBackground from "@/components/FlowBackground";
import { useTheme } from "@/lib/theme";

export default function ModeSelect() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up from 0 to 100 then reveal
    let n = 0;
    const t = setInterval(() => {
      n += Math.floor(Math.random() * 4) + 1;
      if (n >= 100) { n = 100; clearInterval(t); setTimeout(() => setLoaded(true), 300); }
      setCount(n);
    }, 22);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "var(--bg)" }}>
      <FlowBackground />
      <div className="noise" />

      {/* Loading counter (375.studio style) */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-10" style={{ background: "var(--bg)" }}>
          <FlowBackground />
          <span
            className="font-serif select-none"
            style={{
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: 1,
              color: "var(--fg)",
              fontVariantNumeric: "tabular-nums",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            {count}%
          </span>
        </div>
      )}

      {/* Theme toggle */}
      <div className={`fixed top-6 right-6 z-40 flex items-center gap-2 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <span className="section-label">{theme === "light" ? "light" : "dark"}</span>
        <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
          <div className="theme-toggle-thumb" />
        </button>
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Label */}
        <p className="section-label mb-8 tracking-[0.22em]">nilesh s. patil — portfolio</p>

        {/* Big headline */}
        <div className="text-center mb-6 max-w-4xl">
          <h1
            className="hero-headline"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
          >
            Full Stack<br />
            <strong>Engineer</strong>{" "}
            <em>&</em>
            <br />GenAI Builder
          </h1>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-16">
          {["8× Hackathon Winner", "NASA SpaceApps 1st", "IIT Bombay", "₹2L Funded"].map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>

        {/* Mode cards */}
        <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
          <button
            onClick={() => router.push("/dev")}
            className="group text-left p-8 border transition-all duration-300 cursor-none rounded-lg"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-elevated)",
            }}
          >
            <div className="mb-4 font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
              <span style={{ color: "var(--fg-muted)" }}>$</span> ./portfolio --mode dev
            </div>
            <h2 className="font-serif text-2xl mb-2" style={{ color: "var(--fg)" }}>
              <em>Terminal</em>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Linux shell interface. Browse with ls, read with nano, explore.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: "var(--fg)" }}>
              <span>Enter</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </button>

          <button
            onClick={() => router.push("/visual")}
            className="group text-left p-8 border transition-all duration-300 cursor-none rounded-lg"
            style={{
              borderColor: "var(--fg)",
              background: "var(--fg)",
              color: "var(--bg)",
            }}
          >
            <div className="mb-4 font-mono text-xs opacity-50">
              → visual_mode.tsx
            </div>
            <h2 className="font-serif text-2xl mb-2">
              <em>Portfolio</em>
            </h2>
            <p className="text-sm leading-relaxed opacity-70">
              Editorial portfolio. Projects, skills, story — all in one scroll.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium">
              <span>Enter</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 flex items-center gap-6">
          <span className="section-label">Belgaum, Karnataka</span>
          <span className="section-label opacity-40">·</span>
          <span className="section-label">technil6436@gmail.com</span>
        </div>
      </div>

      {/* Circular rotating text (wisprflow style) */}
      <div
        className={`fixed bottom-8 left-8 z-10 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ width: 120, height: 120 }}
      >
        <svg viewBox="0 0 120 120" className="spin-slow w-full h-full">
          <defs>
            <path id="circle-path" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
          </defs>
          <text fontSize="10" fontFamily="var(--app-font-mono)" fill="var(--fg-subtle)" letterSpacing="3">
            <textPath href="#circle-path">
              FULL STACK · GENAI · BUILDER · 
            </textPath>
          </text>
        </svg>
        <div
          className="absolute inset-0 m-auto flex items-center justify-center"
          style={{ width: 32, height: 32, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <div className="status-dot" />
        </div>
      </div>
    </div>
  );
}
