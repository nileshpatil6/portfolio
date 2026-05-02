import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTheme } from "@/App";
import FlowBackground from "@/components/FlowBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

const navItems = [
  { label: "About",    id: "about" },
  { label: "Work",     id: "projects" },
  { label: "Skills",   id: "skills" },
  { label: "Awards",   id: "achievements" },
  { label: "Contact",  id: "contact" },
];

function Nav() {
  const [, setLocation] = useLocation();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="site-nav px-6 md:px-16"
      style={{
        borderBottomColor: scrolled ? "var(--border-subtle)" : "transparent",
      }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between"
        style={{ height: 60 }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono cursor-none transition-opacity hover:opacity-60"
          style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--fg)" }}
          data-testid="button-nav-logo"
        >
          NILESH.SH
        </button>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
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

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <div className="theme-toggle-thumb" />
          </button>

          {/* Terminal */}
          <button
            data-testid="button-nav-terminal"
            onClick={() => setLocation("/dev")}
            className="btn-outline"
            style={{ fontSize: "0.68rem", padding: "0.4rem 1rem" }}
          >
            Terminal
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function VisualMode() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <FlowBackground />
      <Nav />

      {/* Offset for fixed nav */}
      <div style={{ paddingTop: 60 }}>
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
      </div>
    </div>
  );
}
