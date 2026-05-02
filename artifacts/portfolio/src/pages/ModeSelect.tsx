import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import ThreeCanvas from "@/components/ThreeCanvas";

export default function ModeSelect() {
  const [, setLocation] = useLocation();
  const [hoveredMode, setHoveredMode] = useState<"dev" | "visual" | null>(null);
  const [booted, setBooted] = useState(false);
  const bootLines = [
    "BIOS v2.6.0 — Nilesh.SH System",
    "Checking memory... 128GB OK",
    "Loading kernel modules... [AI/ML] [BLOCKCHAIN] [FULLSTACK]",
    "Mounting filesystem... /projects /skills /achievements",
    "Starting portfolio daemon...",
    "System ready. Choose your interface.",
  ];
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < bootLines.length) {
        setVisibleLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setBooted(true), 600);
      }
    }, 280);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden">
      <ThreeCanvas />

      {/* Noise */}
      <div className="noise-overlay" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Boot sequence */}
      {!booted && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#0a0a0f]">
          <div className="terminal-body p-8 max-w-2xl w-full rounded-lg border border-[#00ff88]/20">
            <div className="text-[#00ff88] text-xs mb-4">
              <pre className="text-[#00d4ff] mb-4 text-sm leading-tight">{`
 ███╗   ██╗██╗██╗     ███████╗███████╗██╗  ██╗
 ████╗  ██║██║██║     ██╔════╝██╔════╝██║  ██║
 ██╔██╗ ██║██║██║     █████╗  ███████╗███████║
 ██║╚██╗██║██║██║     ██╔══╝  ╚════██║██╔══██║
 ██║ ╚████║██║███████╗███████╗███████║██║  ██║
 ╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝`}</pre>
            </div>
            {visibleLines.map((line, i) => (
              <div key={i} className="text-[#00ff88] font-mono text-sm flex items-center gap-2 mb-1">
                <span className="text-[#00d4ff]">{">"}</span>
                <span>{line}</span>
              </div>
            ))}
            <span className="cursor-blink text-[#00ff88]">_</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className={`relative z-10 w-full max-w-6xl px-6 transition-all duration-700 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono text-[#00d4ff] tracking-[0.3em] uppercase border border-[#00d4ff]/30 px-4 py-1.5 rounded-full">
              SYSTEM://NILESH.SH — v3.0
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="glitch-text gradient-text-blue" data-text="NILESH PATIL">
              NILESH PATIL
            </span>
          </h1>
          <p className="text-[#a0aec0] text-lg md:text-xl font-mono">
            Full Stack Dev &nbsp;•&nbsp; GenAI Engineer &nbsp;•&nbsp; 8x Hackathon Winner
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            {["NASA SpaceApps 1st Place", "IIT Bombay Intern", "Rs.2L Funded Founder", "8x Hackathon Winner"].map((tag) => (
              <span key={tag} className="text-xs font-mono text-[#00ff88] border border-[#00ff88]/30 bg-[#00ff88]/5 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Mode cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Developer Mode */}
          <button
            data-testid="button-dev-mode"
            onClick={() => setLocation("/dev")}
            onMouseEnter={() => setHoveredMode("dev")}
            onMouseLeave={() => setHoveredMode(null)}
            className={`relative group text-left p-8 rounded-2xl border transition-all duration-300 cursor-none overflow-hidden
              ${hoveredMode === "dev"
                ? "border-[#00ff88] bg-[#00ff88]/5 shadow-[0_0_40px_rgba(0,255,136,0.2)]"
                : "border-[#1e1e2e] bg-[#111118] hover:border-[#00ff88]/50"
              }`}
          >
            <div className="absolute inset-0 terminal-scanlines opacity-30" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mb-6 font-mono text-xs text-[#00ff88]/70 bg-[#0d0d0d] rounded-lg p-4 border border-[#00ff88]/10">
              <div className="text-[#00ff88]/50 mb-2">nilesh@portfolio:~$</div>
              <div className="text-[#00ff88]">ls projects/</div>
              <div className="text-[#a0aec0] mt-1">triponbuddy/ mediassist/ yukti-ai/ ...</div>
              <div className="text-[#00d4ff] mt-1">nano triponbuddy</div>
              <div className="text-[#a0aec0] mt-1 text-[11px]">AI Travel Platform | React • Node.js • Gemini</div>
              <span className="cursor-blink text-[#00ff88]">_</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00ff88" strokeWidth="1.5" />
                  <path d="M7 8l3 3-3 3" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 14h4" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-[#00ff88] font-mono text-sm font-semibold tracking-wider mb-1">DEVELOPER_MODE</div>
                <h3 className="text-white text-xl font-bold mb-2">Terminal Interface</h3>
                <p className="text-[#a0aec0] text-sm leading-relaxed">
                  Full Linux-like shell. Browse projects with <code className="text-[#00d4ff] bg-[#00d4ff]/10 px-1 rounded">ls</code>, 
                  view details with <code className="text-[#00d4ff] bg-[#00d4ff]/10 px-1 rounded">nano</code>, 
                  explore the system. For those who speak terminal.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["ls", "nano", "git log", "neofetch", "ssh"].map((cmd) => (
                    <span key={cmd} className="text-[11px] font-mono text-[#00ff88]/70 bg-[#00ff88]/5 border border-[#00ff88]/20 px-2 py-0.5 rounded">
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#00ff88] font-mono text-sm">
              <span>$ ./enter-terminal</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredMode === "dev" ? "translate-x-2" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Visual Mode */}
          <button
            data-testid="button-visual-mode"
            onClick={() => setLocation("/visual")}
            onMouseEnter={() => setHoveredMode("visual")}
            onMouseLeave={() => setHoveredMode(null)}
            className={`relative group text-left p-8 rounded-2xl border transition-all duration-300 cursor-none overflow-hidden
              ${hoveredMode === "visual"
                ? "border-[#00d4ff] bg-[#00d4ff]/5 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
                : "border-[#1e1e2e] bg-[#111118] hover:border-[#00d4ff]/50"
              }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute w-64 h-64 rounded-full blur-[80px] -top-16 -right-16 transition-opacity duration-500
                ${hoveredMode === "visual" ? "opacity-15 bg-[#00d4ff]" : "opacity-5 bg-[#7c3aed]"}`} />
              <div className={`absolute w-48 h-48 rounded-full blur-[60px] -bottom-8 -left-8 transition-opacity duration-500
                ${hoveredMode === "visual" ? "opacity-10 bg-[#7c3aed]" : "opacity-5 bg-[#00d4ff]"}`} />
            </div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* SVG preview animation */}
            <div className="mb-6 h-24 relative overflow-hidden rounded-lg bg-[#0a0a0f] border border-[#00d4ff]/10 flex items-center justify-center">
              <svg viewBox="0 0 300 80" className="w-full h-full">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#00d4ff", stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>
                <rect x="10" y="30" width="80" height="8" rx="4" fill="url(#grad1)" opacity="0.6" />
                <rect x="10" y="44" width="120" height="4" rx="2" fill="#a0aec0" opacity="0.3" />
                <rect x="10" y="54" width="90" height="4" rx="2" fill="#a0aec0" opacity="0.2" />
                <circle cx="220" cy="40" r="20" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <circle cx="220" cy="40" r="12" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.4" />
                <circle cx="220" cy="40" r="5" fill="#00ff88" opacity="0.7" />
                <path d="M 160 20 Q 180 10 200 20 Q 220 30 240 20" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.5">
                  <animate attributeName="d" dur="3s" repeatCount="indefinite"
                    values="M 160 20 Q 180 10 200 20 Q 220 30 240 20;M 160 25 Q 180 15 200 25 Q 220 15 240 25;M 160 20 Q 180 10 200 20 Q 220 30 240 20" />
                </path>
                <circle cx="50" cy="65" r="3" fill="#00ff88" opacity="0.8">
                  <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="65" r="2" fill="#00d4ff" opacity="0.6">
                  <animate attributeName="r" values="1;3;1" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="90" cy="65" r="3" fill="#7c3aed" opacity="0.7">
                  <animate attributeName="r" values="2;4;2" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[#00d4ff] font-mono text-sm font-semibold tracking-wider mb-1">VISUAL_MODE</div>
                <h3 className="text-white text-xl font-bold mb-2">Immersive Portfolio</h3>
                <p className="text-[#a0aec0] text-sm leading-relaxed">
                  Animated showcase with 3D effects, scroll-triggered reveals, and interactive project cards. 
                  Full portfolio experience.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["3D Canvas", "Scroll Fx", "Animations", "Projects", "Skills"].map((tag) => (
                    <span key={tag} className="text-[11px] font-mono text-[#00d4ff]/70 bg-[#00d4ff]/5 border border-[#00d4ff]/20 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#00d4ff] font-mono text-sm">
              <span>{"-> launch_experience()"}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredMode === "visual" ? "translate-x-2" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <p className="text-center text-[#a0aec0]/40 text-xs font-mono mt-8">
          BELGAUM, KARNATAKA, INDIA &nbsp;•&nbsp; technil6436@gmail.com &nbsp;•&nbsp; github.com/nileshpatil6
        </p>
      </div>
    </div>
  );
}
