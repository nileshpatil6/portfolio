import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTheme } from "@/App";
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

function Nav() {
  const [, setLocation] = useLocation();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
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
            <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
              <div className="theme-toggle-thumb" />
            </button>
            <div className="hidden md:block">
              <button
                data-testid="button-nav-terminal"
                onClick={() => setLocation("/dev")}
                className="btn-outline"
                style={{ fontSize: "0.68rem", padding: "0.4rem 1rem" }}
              >
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
                onClick={() => { setLocation("/dev"); setMobileOpen(false); }}
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
          <KineticText />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
      </div>
    </div>
  );
}
