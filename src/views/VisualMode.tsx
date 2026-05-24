"use client";
import { useEffect, useState } from "react";
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
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "About",    id: "about" },
  { label: "Journey",  id: "journey" },
  { label: "Work",     id: "projects" },
  { label: "Skills",   id: "skills" },
  { label: "Awards",   id: "achievements" },
  { label: "Contact",  id: "contact" },
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
  const fromKey = to === "dark" ? "light" : "dark";

  useEffect(() => {
    const tMorph = setTimeout(() => setMorphed(true), 380);
    const tApply = setTimeout(() => onApply(),       760);
    const tOut   = setTimeout(() => setClosing(true), 1320);
    const tDone  = setTimeout(() => onDone(),         1700);
    return () => { clearTimeout(tMorph); clearTimeout(tApply); clearTimeout(tOut); clearTimeout(tDone); };
  }, [onApply, onDone]);

  return (
    <div className={`theme-revamp-overlay ${closing ? "is-closing" : ""}`}>
      <div className="theme-revamp-panel">
        <div className="theme-revamp-titlebar">
          <div className="theme-revamp-dots">
            <span style={{ background: "#ff5f57" }} />
            <span style={{ background: "#febc2e" }} />
            <span style={{ background: "#28c840" }} />
          </div>
          <span className="theme-revamp-path">~/src/app/globals.css</span>
          <span className="theme-revamp-badge">M</span>
        </div>

        <div className="theme-revamp-code">
          <div className="theme-revamp-line">
            <span className="theme-revamp-num">1</span>
            <span><span className="trv-keyword">:root</span><span className="trv-mute">.</span><span className="trv-keyword">{fromKey === "dark" ? "dark" : "light"}</span> <span className="trv-mute">{"{"}</span></span>
          </div>
          {THEME_TOKENS.map((tok, i) => {
            const fromVal = tok[fromKey as "light" | "dark"];
            const toVal   = tok[to as "light" | "dark"];
            const stagger = 60 + i * 55;
            return (
              <div key={tok.name} className="theme-revamp-line theme-revamp-line-stagger" style={{ animationDelay: `${stagger}ms` }}>
                <span className="theme-revamp-num">{i + 2}</span>
                <span className="trv-prop">{tok.name}</span>
                <span className="trv-mute">: </span>
                <span className="trv-hex-stack">
                  <span className={`trv-hex trv-hex-from ${morphed ? "is-gone" : ""}`}>{fromVal}</span>
                  <span className={`trv-hex trv-hex-to ${morphed ? "is-here" : ""}`}>{toVal}</span>
                </span>
                <span
                  className="trv-swatch"
                  style={{ background: morphed ? toVal : fromVal, transitionDelay: `${i * 40}ms` }}
                />
                <span className="trv-mute">;</span>
              </div>
            );
          })}
          <div className="theme-revamp-line">
            <span className="theme-revamp-num">{THEME_TOKENS.length + 2}</span>
            <span className="trv-mute">{"}"}</span>
          </div>
        </div>

        <div className="theme-revamp-statusbar">
          <span className={`trv-status-dot ${morphed ? "is-done" : ""}`} />
          <span className="trv-status-text">
            {morphed ? `applied · theme=${to}` : `compiling · theme=${to}`}
          </span>
          <span className="trv-status-right">CSS · UTF-8 · LF</span>
        </div>
      </div>
    </div>
  );
}

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

  const handleToggle = () => {
    if (revamp) return; // ignore clicks while transition active
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
          <Skills />
          <Achievements />
          <KineticText />
          <Contact />
        </main>
      </div>
    </div>
  );
}
