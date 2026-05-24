"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { Sun, Moon, TerminalSquare } from "lucide-react";
import FlowBackground from "@/components/FlowBackground";
import Hero from "@/components/Hero";
import LandsatName from "@/components/LandsatName";
import About from "@/components/About";
import Journey from "@/components/Journey";
import KineticText from "@/components/KineticText";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "About",       id: "about" },
  { label: "Journey",     id: "journey" },
  { label: "Work",        id: "projects" },
  { label: "Open Source", id: "opensource" },
  { label: "Skills",      id: "skills" },
  { label: "Awards",      id: "achievements" },
  { label: "Contact",     id: "contact" },
];

const THEME_TOKENS = [
  { name: "--bg",            light: "#f8f8f5", dark: "#0f0f0e" },
  { name: "--fg",            light: "#0f0f0e", dark: "#f8f8f5" },
  { name: "--bg-elevated",   light: "#ffffff", dark: "#161614" },
  { name: "--fg-muted",      light: "#6b6b66", dark: "#888880" },
  { name: "--border-color",  light: "#e2e2dc", dark: "#2a2a26" },
  { name: "--accent",        light: "#0f0f0e", dark: "#f8f8f5" },
];

function ThemeRevampPanel({ to, onApply, onDone }: {
  to: "light" | "dark";
  onApply: () => void;
  onDone: () => void;
}) {
  const [morphed, setMorphed] = useState(false);
  const [closing, setClosing] = useState(false);
  const fromKey: "light" | "dark" = to === "dark" ? "light" : "dark";

  // Hold latest callbacks in refs so the timer sequence runs ONCE on mount,
  // regardless of parent re-renders (theme change re-renders Nav, which would
  // otherwise restart the timers and create a flip-flop loop).
  const onApplyRef = useRef(onApply);
  const onDoneRef  = useRef(onDone);
  onApplyRef.current = onApply;
  onDoneRef.current  = onDone;

  useEffect(() => {
    const t1 = setTimeout(() => setMorphed(true), 280);
    const t2 = setTimeout(() => {
      // Apply theme with native View Transitions for the circular reveal
      // happening underneath the panel.
      const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
      if (typeof doc.startViewTransition === "function") {
        doc.startViewTransition(() => onApplyRef.current());
      } else {
        onApplyRef.current();
      }
    }, 580);
    const t3 = setTimeout(() => setClosing(true), 900);
    const t4 = setTimeout(() => onDoneRef.current(), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MONO = "'JetBrains Mono', ui-monospace, monospace";

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
      style={{
        background: "rgba(8,8,10,0.62)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: closing ? 0 : 1,
        transition: "opacity 0.36s ease-in-out",
        animation: "trv-fade-in 0.28s ease-out",
      }}
    >
      <div
        style={{
          background: "#0b0b0e",
          border: "1px solid #232328",
          borderRadius: 12,
          minWidth: "min(560px, 94vw)",
          maxWidth: "94vw",
          fontFamily: MONO,
          boxShadow: "0 32px 80px -16px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden",
          transform: closing ? "scale(0.97) translateY(-4px)" : "scale(1) translateY(0)",
          opacity: closing ? 0 : 1,
          transition: "transform 0.34s ease-in, opacity 0.3s ease-in",
          animation: "trv-panel-in 0.42s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px",
            background: "#070708",
            borderBottom: "1px solid #1d1d22",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57", opacity: 0.85 }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e", opacity: 0.85 }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840", opacity: 0.85 }} />
          </div>
          <span style={{ flex: 1, textAlign: "center", fontSize: 11.5, color: "#6b6b75", letterSpacing: "0.04em" }}>
            ~/src/app/globals.css
          </span>
          <span style={{
            fontSize: 9.5, fontWeight: 700, color: "#fbbf24",
            padding: "1px 6px", border: "1px solid rgba(251,191,36,0.35)",
            borderRadius: 3, letterSpacing: "0.08em",
          }}>M</span>
        </div>

        {/* Code body */}
        <div style={{ padding: "14px 0", background: "#0b0b0e", fontSize: 13, lineHeight: 1.85 }}>
          {/* Selector line */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 18px" }}>
            <span style={lineNumStyle}>1</span>
            <span style={{ color: "#c084fc" }}>:root</span>
            <span style={{ color: "#5a5a62" }}>.</span>
            <span style={{ color: "#c084fc" }}>{fromKey}</span>
            <span style={{ color: "#5a5a62" }}> {"{"}</span>
          </div>

          {/* Token lines */}
          {THEME_TOKENS.map((tok, i) => {
            const fromVal = tok[fromKey];
            const toVal   = tok[to];
            return (
              <div
                key={tok.name}
                style={{
                  display: "flex", alignItems: "center", padding: "0 18px",
                  opacity: 0,
                  animation: `trv-line-in 0.22s cubic-bezier(0.16,1,0.3,1) ${60 + i * 55}ms forwards`,
                }}
              >
                <span style={lineNumStyle}>{i + 2}</span>
                <span style={{ color: "#60a5fa" }}>{tok.name}</span>
                <span style={{ color: "#5a5a62" }}>: </span>
                <span style={{
                  position: "relative",
                  display: "inline-block",
                  width: 80,
                  height: "1.2em",
                  lineHeight: 1.2,
                }}>
                  <span style={{
                    position: "absolute", top: 0, left: 0,
                    color: "#f87171", fontWeight: 500,
                    opacity: morphed ? 0 : 1,
                    transform: morphed ? "translateY(-7px)" : "translateY(0)",
                    transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                  }}>{fromVal}</span>
                  <span style={{
                    position: "absolute", top: 0, left: 0,
                    color: "#34d399", fontWeight: 500,
                    opacity: morphed ? 1 : 0,
                    transform: morphed ? "translateY(0)" : "translateY(7px)",
                    transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                  }}>{toVal}</span>
                </span>
                <span style={{
                  display: "inline-block",
                  width: 12, height: 12,
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.12)",
                  marginLeft: 8, marginRight: 2,
                  verticalAlign: "middle",
                  background: morphed ? toVal : fromVal,
                  transition: `background 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 40}ms`,
                }} />
                <span style={{ color: "#5a5a62" }}>;</span>
              </div>
            );
          })}

          {/* Closing brace */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 18px" }}>
            <span style={lineNumStyle}>{THEME_TOKENS.length + 2}</span>
            <span style={{ color: "#5a5a62" }}>{"}"}</span>
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "7px 16px",
            background: "#070708",
            borderTop: "1px solid #1d1d22",
            fontSize: 10.5, color: "#8b8b95", letterSpacing: "0.05em",
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: morphed ? "#34d399" : "#fbbf24",
            boxShadow: morphed
              ? "0 0 10px rgba(52,211,153,0.65)"
              : "0 0 8px rgba(251,191,36,0.55)",
            transition: "background 0.3s, box-shadow 0.3s",
          }} />
          <span style={{ flex: 1 }}>
            {morphed ? `applied · theme=${to}` : `compiling · theme=${to}`}
          </span>
          <span style={{ color: "#4a4a52" }}>CSS · UTF-8 · LF</span>
        </div>
      </div>
    </div>
  );
}

const lineNumStyle: React.CSSProperties = {
  color: "#2f2f36",
  width: 26,
  textAlign: "right",
  paddingRight: 14,
  fontSize: 11,
  userSelect: "none",
};

function Nav() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [revamp, setRevamp] = useState<{ id: number; to: "light" | "dark" } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY > 60) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (revamp) return; // ignore clicks while a transition is active
    const rect = e.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty("--theme-x", `${rect.left + rect.width  / 2}px`);
    document.documentElement.style.setProperty("--theme-y", `${rect.top  + rect.height / 2}px`);
    const next: "light" | "dark" = theme === "dark" ? "light" : "dark";
    setRevamp({ id: Date.now(), to: next });
  };

  return (
    <>
      {revamp && (
        <ThemeRevampPanel
          to={revamp.to}
          onApply={toggle}
          onDone={() => setRevamp(null)}
        />
      )}
      <nav
        className="site-nav px-6 md:px-16"
        style={{ borderBottomColor: scrolled ? "var(--border-subtle)" : "transparent" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between" style={{ height: 60 }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono transition-opacity hover:opacity-60"
            style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--fg)", cursor: "inherit" }}
            data-testid="button-nav-logo"
          >
            NILESH.SH
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => scrollTo(item.id)}
                className="cursor-none transition-all duration-150 hover:opacity-100"
                style={{
                  fontFamily: "var(--app-font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  color: "var(--fg-muted)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              aria-label="Toggle theme"
              className="theme-icon-toggle"
              style={{ cursor: "inherit" }}
            >
              <span className="theme-icon-sun"><Sun size={16} strokeWidth={2} /></span>
              <span className="theme-icon-moon"><Moon size={16} strokeWidth={2} /></span>
            </button>
            <div className="hidden md:block">
              <button
                data-testid="button-nav-terminal"
                onClick={() => router.push("/dev")}
                className="btn-outline flex items-center gap-1.5"
                style={{ fontSize: "0.68rem", padding: "0.4rem 1rem" }}
              >
                <TerminalSquare size={13} strokeWidth={2} />
                Terminal
              </button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{ cursor: "inherit" }}
            >
              <span
                className="block w-5 h-px transition-all duration-300 origin-center"
                style={{
                  background: "var(--fg)",
                  transform: mobileOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--fg)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300 origin-center"
                style={{
                  background: "var(--fg)",
                  transform: mobileOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col"
          style={{ background: "var(--bg)", top: 60 }}
        >
          <div className="flex flex-col px-6 pt-4 pb-10 h-full overflow-y-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="py-5 text-left border-b"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--fg)",
                  fontFamily: "var(--app-font-serif)",
                  fontSize: "1.75rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                  cursor: "inherit",
                }}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-8">
              <button
                onClick={() => { router.push("/dev"); setMobileOpen(false); }}
                className="btn-outline"
                style={{ cursor: "inherit" }}
              >
                Terminal →
              </button>
            </div>
            <div className="mt-auto pt-8">
              <p className="section-label">Belgaum, Karnataka · technil6436@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function VisualMode() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative" style={{ background: "var(--bg)" }}>
      <FlowBackground />
      <Nav />

      <div style={{ paddingTop: 60 }}>
        <main>
          <Hero />
          <LandsatName />
          <About />
          <Journey />
          <Projects />
          <OpenSource />
          <Skills />
          <Achievements />
          <KineticText />
          <Contact />
        </main>
      </div>
    </div>
  );
}
