import { useEffect } from "react";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

function Nav() {
  const [, setLocation] = useLocation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          data-testid="button-nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-[#00d4ff] font-bold text-sm tracking-wider cursor-none hover:text-glow-blue transition-all"
        >
          NILESH.SH
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "About", id: "about" },
            { label: "Projects", id: "projects" },
            { label: "Skills", id: "skills" },
            { label: "Achievements", id: "achievements" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className="text-[#a0aec0] hover:text-[#00d4ff] text-sm font-mono transition-colors cursor-none"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Terminal button */}
        <button
          data-testid="button-nav-terminal"
          onClick={() => setLocation("/dev")}
          className="text-xs font-mono text-[#00ff88] border border-[#00ff88]/30 px-3 py-1.5 rounded-full hover:bg-[#00ff88]/10 transition-all cursor-none"
        >
          &gt; Terminal
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="relative border-t border-[#1e1e2e] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[#a0aec0]/40 text-xs font-mono">
          Built by Nilesh Patil &nbsp;•&nbsp; 2026 &nbsp;•&nbsp; SYSTEM://NILESH.SH
        </div>
        <button
          data-testid="button-footer-terminal"
          onClick={() => setLocation("/dev")}
          className="text-xs font-mono text-[#00d4ff]/50 hover:text-[#00d4ff] transition-colors cursor-none"
        >
          &gt; switch to terminal view
        </button>
      </div>
    </footer>
  );
}

export default function VisualMode() {
  useEffect(() => {
    // Lenis smooth scroll — basic version without the library for compatibility
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="relative bg-[#0a0a0f] min-h-screen">
      {/* Nav bar background blur */}
      <div className="fixed top-0 left-0 right-0 h-16 z-40 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />

      <Nav />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
