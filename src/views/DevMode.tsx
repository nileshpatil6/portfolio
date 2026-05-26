"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

/* ── ASCII art ───────────────────────────────────────────── */
const ASCII_ART = [
  " ███╗   ██╗██╗██╗     ███████╗███████╗██╗  ██╗",
  " ████╗  ██║██║██║     ██╔════╝██╔════╝██║  ██║",
  " ██╔██╗ ██║██║██║     █████╗  ███████╗███████║",
  " ██║╚██╗██║██║██║     ██╔══╝  ╚════██║██╔══██║",
  " ██║ ╚████║██║███████╗███████╗███████║██║  ██║",
  " ╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝",
];
const GLITCH_CHARS = "!@#%^&*<>▓▒░█▄▀╔╗╚╝║═╠╣╦╩╬~`";

/* ── Prompt state (module-level, shared with getPrompt) ──── */
const PROMPT_BASE = "nilesh@portfolio";
let currentDir = "~";
const getPrompt = () => `${PROMPT_BASE}:${currentDir}$`;

/* ── Types ───────────────────────────────────────────────── */
interface HistoryEntry {
  input?: string;
  output: string[];
  type?: "error" | "success" | "info" | "system";
  prompt?: string; // snapshot of prompt at the moment the command was entered
}

/* ── Filesystem map (drives cd/ls correctness) ───────────────── */
const FS_TREE: Record<string, string[]> = {
  "~":              ["projects","skills","achievements","education"],
  "~/projects":     [], // populated dynamically from projects data
  "~/skills":       ["languages","frontend","backend","ai-ml","databases","infrastructure","blockchain"],
  "~/achievements": [],
  "~/education":    [],
};
const ACHIEVEMENTS_LIST = [
  "8x-hackathon-winner.md",
  "nasa-spaceapps-1st-place.md",
  "nain-2.0-grant-rs2L.md",
  "7-live-production-products.md",
  "freelance-india-usa-japan.md",
];
const EDUCATION_LIST = ["sgbit-be-ai-ds.md"];

const ACHIEVEMENT_CONTENT: Record<string, string[]> = {
  "8x-hackathon-winner.md": [
    "# 8x Hackathon Winner",
    "",
    "Won 8 hackathon competitions across national and international events.",
    "",
    "## Wins",
    "  1. NASA SpaceApps Challenge     - 1st Place (Local Round)",
    "  2. GDG Solution Challenge        - Winner",
    "  3. CodeBharat Hackathon          - 1st Place (Rs.50,000 prize)",
    "  4. ONEST Hackathon               - Winner (Rs.25,000 prize)",
    "  5. Smart India Hackathon         - Finalist",
    "  6–8. 3 more regional/college level competitions",
    "",
    "Every win had a working, deployed demo - not just a pitch.",
  ],
  "nasa-spaceapps-1st-place.md": [
    "# NASA SpaceApps Challenge - 1st Place",
    "",
    "Won the local round of NASA International SpaceApps Challenge 2024.",
    "",
    "## Project",
    "  Satellite data visualization platform using NASA open datasets.",
    "  Real-time orbital tracking with AI-powered anomaly analysis.",
    "",
    "## Result",
    "  1st place, local round. Nominated for global judging.",
    "",
    "## Stack",
    "  React, Python, NASA EarthData API, Three.js, Gemini AI",
  ],
  "nain-2.0-grant-rs2L.md": [
    "# NAIN 2.0 Grant - Rs.2,00,000",
    "",
    "Received Rs.2 Lakh funding from Government of Karnataka",
    "under the NAIN 2.0 (National AI Innovation) program.",
    "",
    "## Project funded",
    "  MediAssist AI - Healthcare AI assistant for rural patients.",
    "  RAG-based symptom checker with multilingual voice interface.",
    "",
    "## Impact",
    "  Deployed in 2 clinics in rural Karnataka.",
    "  Processed 500+ patient queries during beta.",
    "",
    "## Stack",
    "  Flutter, FastAPI, RAG pipeline, Gemini, PostgreSQL",
  ],
  "7-live-production-products.md": [
    "# 7 Live Production Products",
    "",
    "All seven are live and serving real users.",
    "",
    "## Products",
    "  1. TripOnBuddy     - AI travel planner (triponbuddy.in)",
    "  2. Unyfiny         - B2B SaaS dashboard platform",
    "  3. DataVerseAI     - Data analytics copilot",
    "  4. Text2DB         - Natural language to SQL engine",
    "  5. AK Car Rentals  - Vehicle rental management system",
    "  6. CMN Services    - Services marketplace",
    "  7. Prasan Hom      - Hospitality booking platform",
    "",
    "Run 'ls projects/' or 'nano <project>' for full details.",
  ],
  "freelance-india-usa-japan.md": [
    "# Freelance Work - India, USA, Japan",
    "",
    "Delivered freelance software projects across 3 countries.",
    "",
    "## Scope",
    "  Full-stack web apps, mobile apps, AI integrations,",
    "  dashboard systems, and REST API development.",
    "",
    "## Client types",
    "  Startups, small businesses, individual founders.",
    "",
    "## Stack",
    "  Next.js, Flutter, FastAPI, Node.js, Supabase, Firebase",
  ],
};

const EDUCATION_CONTENT: Record<string, string[]> = {
  "sgbit-be-ai-ds.md": [
    "# B.E. in Artificial Intelligence & Data Science",
    "",
    "Institution: S.G. Balekundari Institute of Technology (SGBIT)",
    "Location:    Belgaum, Karnataka, India",
    "Duration:    2023 - 2027",
    "Status:      Currently enrolled (3rd year)",
    "",
    "## Coursework",
    "  Machine Learning, Deep Learning, Computer Vision,",
    "  Data Structures & Algorithms, Database Systems,",
    "  Natural Language Processing, Cloud Computing.",
    "",
    "## Achievements during degree",
    "  8 hackathon wins, Rs.2L govt. grant, 7 production products.",
    "  See ~/achievements/ for the full breakdown.",
  ],
};
type TextFile = { name: string; lines: string[] };
type NanoState = { open: false } | { open: true; project: typeof projects[0] } | { open: true; textFile: TextFile };

/* ══════════════════════════════════════════════════════════
   GlitchAscii - logo corrupts random chars periodically
══════════════════════════════════════════════════════════ */
function GlitchAscii() {
  const [lines, setLines] = useState(ASCII_ART);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setLines(
          ASCII_ART.map(line =>
            Math.random() > 0.55 ? line :
            line.split("").map(ch =>
              ch !== " " && Math.random() < 0.08
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : ch
            ).join("")
          )
        );
        setTimeout(() => { setLines(ASCII_ART); schedule(); }, 90);
      }, 1600 + Math.random() * 3400);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-1 select-none terminal-ascii overflow-x-auto">
      {lines.map((line, i) => (
        <div
          key={i}
          className="font-mono text-sm whitespace-pre text-[#00d4ff]"
          style={{ textShadow: "0 0 10px rgba(0,212,255,0.4), 0 0 3px rgba(0,212,255,0.7)" }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   AnimatedOutput - lines appear one-by-one with stagger
══════════════════════════════════════════════════════════ */
function AnimatedOutput({
  lines, type, speed = 22,
}: { lines: string[]; type?: string; speed?: number }) {
  const [shown, setShown] = useState(0);

  /* Reset when lines change (async command resolved) */
  useEffect(() => { setShown(0); }, [lines]);

  /* Increment one line per tick */
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), speed);
    return () => clearTimeout(t);
  }, [shown, lines.length, speed]);

  const colorClass =
    type === "error"   ? "text-red-400"   :
    type === "success" ? "text-[#00ff88]" :
    type === "system"  ? "text-[#00d4ff]" :
    type === "info"    ? "text-[#a0aec0]" :
    "text-[#e2e8f0]";

  return (
    <>
      {lines.slice(0, shown).map((line, j) => (
        <div key={j} className={`font-mono text-sm whitespace-pre term-line-in ${colorClass}`}>
          {line || "\u00A0"}
        </div>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   LoadingDots - animated spinner for async commands
══════════════════════════════════════════════════════════ */
function LoadingDots({ message }: { message: string }) {
  const [frame, setFrame] = useState(0);
  const FRAMES = ["[·  ]", "[·· ]", "[···]", "[ ··]", "[  ·]", "[   ]"];

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), 120);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-sm mt-0.5">
      <span className="text-[#00ff88]" style={{ textShadow: "0 0 6px rgba(0,255,136,0.5)" }}>
        {FRAMES[frame]}
      </span>
      <span className="text-[#a0aec0] animate-pulse">{message}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NanoViewer
══════════════════════════════════════════════════════════ */
function NanoFooter() {
  return (
    <div className="nano-footer px-2 py-1 text-xs flex flex-wrap gap-4">
      <span><span className="bg-[#00d4ff] text-[#0a0a0f] px-1">^X</span> Exit</span>
      <span><span className="bg-[#00d4ff] text-[#0a0a0f] px-1">ESC</span> Close</span>
      <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^G</span> Help</span>
      <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^O</span> Write Out</span>
      <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^W</span> Where Is</span>
    </div>
  );
}

function NanoViewer({ state, onClose }: { state: Exclude<NanoState, { open: false }>; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.ctrlKey && e.key === "x")) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Text file view (README.md, contact.md, achievement files, etc.) */
  if ("textFile" in state) {
    const { name, lines } = state.textFile;
    return (
      <div className="absolute inset-0 z-50 flex flex-col nano-editor">
        <div className="nano-header px-4 py-1 text-sm flex items-center justify-between">
          <span>GNU nano 6.2 - {name}</span>
          <span>[ Read Only ]</span>
        </div>
        <div className="flex-1 p-6 overflow-auto font-mono text-sm space-y-0.5">
          {lines.map((line, i) => {
            const isH1 = line.startsWith("# ");
            const isH2 = line.startsWith("## ");
            const isCode = line.startsWith("  ");
            return (
              <div
                key={i}
                className={
                  isH1 ? "text-[#00d4ff] font-bold text-lg" :
                  isH2 ? "text-[#00ff88] font-semibold mt-3" :
                  isCode ? "text-[#a0aec0]" :
                  line === "" ? "h-2" :
                  "text-[#e2e8f0]"
                }
              >
                {line || " "}
              </div>
            );
          })}
        </div>
        <NanoFooter />
      </div>
    );
  }

  /* Project file view */
  const { project } = state;
  return (
    <div className="absolute inset-0 z-50 flex flex-col nano-editor">
      <div className="nano-header px-4 py-1 text-sm flex items-center justify-between">
        <span>GNU nano 6.2 - {project.name}.md</span>
        <span>[ Modified ]</span>
      </div>
      <div className="flex-1 p-6 overflow-auto text-sm">
        <div className="text-[#00d4ff] font-bold text-xl mb-2"># {project.name}</div>
        <div className="text-[#a0aec0] mb-4 text-xs">{">"} {project.tagline}</div>
        <div className="mb-4">
          <div className="text-[#00ff88] mb-1">## Description</div>
          <div className="text-[#e2e8f0] leading-relaxed">{project.description}</div>
        </div>
        <div className="mb-4">
          <div className="text-[#00ff88] mb-2">## Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/20 px-2 py-0.5 rounded text-xs">{t}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[#00ff88] mb-1">## Category</div>
          <div className="text-[#f59e0b]">{project.category}</div>
        </div>
        {project.highlight && (
          <div className="mb-4 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded p-3">
            <div className="text-[#00ff88] font-bold text-sm">{project.highlight}</div>
          </div>
        )}
        <div className="mb-4">
          <div className="text-[#00ff88] mb-2">## Links</div>
          {project.liveUrl && (
            <div className="text-[#00d4ff]">
              <span className="text-[#a0aec0]">LIVE:   </span>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline">{project.liveUrl}</a>
            </div>
          )}
          {project.githubUrl && (
            <div className="text-[#7c3aed]">
              <span className="text-[#a0aec0]">GITHUB: </span>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="underline">{project.githubUrl}</a>
            </div>
          )}
        </div>
      </div>
      <NanoFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DevMode - main terminal component
══════════════════════════════════════════════════════════ */
export default function DevMode() {
  const router = useRouter();

  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      output: [
        "",
        "SYSTEM://NILESH.SH - Terminal v3.0.0",
        "Last login: " + new Date().toLocaleString() + " from 192.168.1.1",
        "",
        "┌─────────────────────────────────────────────────────────┐",
        "│  HOW TO USE                                             │",
        "│  · Type a command below and press  Enter  to run it    │",
        "│  · Press  ↑ / ↓  to cycle through command history      │",
        "│  · Press  Tab    to autocomplete commands/dirs          │",
        "│  · Click anywhere in the terminal to focus the input   │",
        "├─────────────────────────────────────────────────────────┤",
        "│  QUICK START                                            │",
        "│    whoami         →  Who is Nilesh?                    │",
        "│    ls projects/   →  Browse all 20 projects            │",
        "│    nano <name>    →  Open a project (ESC to close)     │",
        "│    git log        →  View commit history               │",
        "│    ./portfolio.sh →  Run the portfolio script          │",
        "└─────────────────────────────────────────────────────────┘",
        "",
        "Type  'help'  for the full command reference.",
        "",
      ],
      type: "system",
    },
  ]);

  const [input, setInput]         = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const cmdHistoryRef = useRef<string[]>([]);
  const [histIdx, setHistIdx]     = useState(-1);
  const [nano, setNano]           = useState<NanoState>({ open: false });
  const [loadingCmd, setLoadingCmd] = useState<{ message: string } | null>(null);
  const [booting, setBooting]     = useState(true);

  const latestEntryRef    = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  /* Scroll so the latest command prompt sits ~20% from the top of the viewport */
  useEffect(() => {
    const el = latestEntryRef.current;
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    container.scrollTop = el.offsetTop - container.clientHeight * 0.2;
  }, [history]);
  /* Focus input on mount - skip on touch devices so keyboard doesn't pop on load */
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouch) inputRef.current?.focus();
  }, []);

  /* Detect touch device for mobile-specific UI */
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  /* Insert text into input at cursor position (for mobile quick-commands) */
  const insertCommand = (cmd: string) => {
    setInput(cmd);
    inputRef.current?.focus();
  };

  /* Trigger Tab autocomplete from mobile button */
  const triggerTab = () => {
    const evt = { key: "Tab", preventDefault: () => {}, ctrlKey: false } as unknown as React.KeyboardEvent<HTMLInputElement>;
    handleKeyDown(evt);
    inputRef.current?.focus();
  };

  /* Trigger history nav from mobile buttons */
  const triggerHistory = (dir: "up" | "down") => {
    const evt = { key: dir === "up" ? "ArrowUp" : "ArrowDown", preventDefault: () => {}, ctrlKey: false } as unknown as React.KeyboardEvent<HTMLInputElement>;
    handleKeyDown(evt);
    inputRef.current?.focus();
  };

  /* Submit current input from mobile (when no virtual Enter on numeric kbd) */
  const triggerEnter = () => {
    const evt = { key: "Enter", preventDefault: () => {}, ctrlKey: false } as unknown as React.KeyboardEvent<HTMLInputElement>;
    handleKeyDown(evt);
    inputRef.current?.focus();
  };
  /* Boot flicker: remove class after animation */
  useEffect(() => { const t = setTimeout(() => setBooting(false), 750); return () => clearTimeout(t); }, []);

  /* Add a complete new history entry */
  const addHistory = useCallback((entry: HistoryEntry) => {
    setHistory(prev => [...prev, entry]);
  }, []);

  /* Resolve a pending async command: fill in the last entry's output */
  const resolveLastEntry = useCallback((output: string[], type?: HistoryEntry["type"]) => {
    setLoadingCmd(null);
    setHistory(prev => {
      if (!prev.length) return prev;
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], output, type };
      return copy;
    });
  }, []);

  /* Input-bar flash on Enter */
  const triggerFlash = useCallback(() => {
    const el = inputBarRef.current;
    if (!el) return;
    el.style.animation = "none";
    void el.offsetHeight; // force repaint so animation restarts
    el.style.animation = "input-flash 0.38s ease-out";
  }, []);

  /* ── processCommand ───────────────────────────────────── */
  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts   = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args    = parts.slice(1);

    setCmdHistory(prev => {
      const next = [trimmed, ...prev];
      cmdHistoryRef.current = next;
      return next;
    });
    setHistIdx(-1);

    /* Snapshot the prompt at the moment the command was entered.
       cd updates currentDir mid-flight, so without this snapshot all
       prior prompts would re-render with the *new* directory. */
    const promptSnapshot = getPrompt();

    /* Wrapper: auto-attaches the prompt snapshot */
    const add = (e: HistoryEntry) => addHistory({ ...e, prompt: e.prompt ?? promptSnapshot });

    /* Helper: run a command that needs a loading delay */
    const runAsync = (message: string, delayMs: number, output: string[], type?: HistoryEntry["type"]) => {
      add({ input: trimmed, output: [] });
      setLoadingCmd({ message });
      setTimeout(() => resolveLastEntry(output, type), delayMs);
    };

    /* ── Instant commands ─────────────────────────────── */
    if (command === "clear") { setHistory([]); return; }
    if (command === "exit" || command === "quit") { router.push("/"); return; }

    if (command === "pwd") {
      add({ input: trimmed, output: [currentDir === "~" ? "/home/nilesh" : `/home/nilesh/${currentDir.replace("~/", "")}`] });
      return;
    }

    if (command === "echo") {
      add({ input: trimmed, output: [args.join(" ")] });
      return;
    }

    if (command === "history") {
      const ordered = [...cmdHistoryRef.current].reverse();
      add({ input: trimmed, output: ordered.slice(-20).map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`) });
      return;
    }

    if (command === "man" || command === "info") {
      add({ input: trimmed, output: ["Use 'help' for the full command reference."], type: "info" });
      return;
    }

    if (command === "uname") {
      const flag = args[0];
      if (flag === "-a") add({ input: trimmed, output: ["Linux portfolio 6.6.36-microsoft-standard #1 SMP x86_64 GNU/Linux"] });
      else add({ input: trimmed, output: ["Linux"] });
      return;
    }

    if (command === "help") {
      add({
        input: trimmed,
        output: [
          "╔═════════════════════════════════════════════════════════╗",
          "║  NILESH.SH - TERMINAL REFERENCE                        ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  HOW TO USE                                            ║",
          "║  · Type a command and press  Enter  to execute         ║",
          "║  · Press  ↑ / ↓  arrow keys to scroll command history  ║",
          "║  · Press  Tab    to autocomplete commands/dirs/projects║",
          "║  · Click anywhere in the window to focus the input     ║",
          "║  · Type  clear   to wipe the screen                   ║",
          "║  · Type  exit    to return to the mode select screen   ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  IDENTITY                                              ║",
          "║    whoami                - credentials & bio           ║",
          "║    neofetch              - system info panel           ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  FILESYSTEM                                            ║",
          "║    ls                    - list current directory      ║",
          "║    ls projects/          - list all 20 projects        ║",
          "║    ls -la                - detailed listing            ║",
          "║    cd projects           - change into projects/       ║",
          "║    cd ..                 - go up one level             ║",
          "║    pwd                   - print working directory     ║",
          "║    cat README.md         - read about section          ║",
          "║    cat contact.md        - read contact info           ║",
          "║    echo <text>           - print text                  ║",
          "║    history               - show command history        ║",
          "║    uname -a              - system information          ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  PROJECTS                                              ║",
          "║    nano <project-name>   - open project in editor      ║",
          "║    nano triponbuddy      - (example)    ESC to close   ║",
          "║    nano mediassist       - (example)    ESC to close   ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  GIT & NETWORK                                         ║",
          "║    git log               - view commit history         ║",
          "║    git status            - view working tree status    ║",
          "║    curl nilesh.dev/skills - fetch skills JSON          ║",
          "║    ssh nilesh@portfolio.dev - remote access            ║",
          "║    ping google.com       - network latency test        ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  EASTER EGGS                                           ║",
          "║    ./portfolio.sh        - run the portfolio script    ║",
          "║    bash portfolio.sh     - same as above               ║",
          "║    sudo rm -rf boring-portfolio/   - try it            ║",
          "╚═════════════════════════════════════════════════════════╝",
        ],
        type: "info",
      });
      return;
    }

    if (command === "whoami") {
      add({
        input: trimmed,
        output: [
          "┌─────────────────────────────────────────────┐",
          "│  NILESH S. PATIL                            │",
          "│  Full Stack Developer | GenAI Engineer      │",
          "│  Mobile App Developer                       │",
          "├─────────────────────────────────────────────┤",
          "│  Location: Belgaum, Karnataka, India        │",
          "│  Phone:    +91 8431496045                   │",
          "│  Email:    technil6436@gmail.com            │",
          "│  GitHub:   github.com/nileshpatil6          │",
          "│  LinkedIn: linkedin.com/in/nileshpatil6     │",
          "├─────────────────────────────────────────────┤",
          "│  CREDENTIALS:                               │",
          "│  > 8x Hackathon Winner                      │",
          "│  > NASA SpaceApps 1st Place (Local)         │",
          "│  > Rs.2L Funded Founder (NAIN 2.0)          │",
          "│  > 7 Live Production Products               │",
          "│  > B.E. AI & DS (2023–2027)                 │",
          "└─────────────────────────────────────────────┘",
        ],
        type: "success",
      });
      return;
    }

    if (command === "ls") {
      const arg       = args.find(a => !a.startsWith("-"));
      const isLa      = args.some(a => a === "-la" || a === "-l" || a === "-a");
      const snap      = promptSnapshot;

      // Resolve target directory
      let target = currentDir;
      if (arg) {
        const clean = arg.replace(/\/$/, "");
        if (clean === "~" || clean === "/home/nilesh") target = "~";
        else if (clean.startsWith("~/")) target = clean;
        else if (FS_TREE[currentDir]?.includes(clean)) {
          target = currentDir === "~" ? `~/${clean}` : `${currentDir}/${clean}`;
        } else {
          add({ input: trimmed, output: [`ls: cannot access '${arg}': No such file or directory`], type: "error", prompt: snap });
          return;
        }
      }

      if (target === "~") {
        add({
          input: trimmed,
          output: isLa
            ? [
                "total 47",
                "drwxr-xr-x  7 nilesh portfolio  4096 May 02 2026 .",
                "drwxr-xr-x  3 nilesh portfolio  4096 May 02 2026 ..",
                "-rw-r--r--  1 nilesh portfolio  2048 May 02 2026 README.md",
                "-rw-r--r--  1 nilesh portfolio   512 May 02 2026 contact.md",
                "drwxr-xr-x 20 nilesh portfolio  4096 May 02 2026 projects/",
                "drwxr-xr-x  7 nilesh portfolio  4096 May 02 2026 skills/",
                "drwxr-xr-x  5 nilesh portfolio  4096 May 02 2026 achievements/",
                "drwxr-xr-x  3 nilesh portfolio  4096 May 02 2026 education/",
                "-rwxr-xr-x  1 nilesh portfolio  8192 May 02 2026 portfolio.sh*",
              ]
            : ["README.md  contact.md  projects/  skills/  achievements/  education/  portfolio.sh"],
          prompt: snap,
        });
        return;
      }
      if (target === "~/projects") {
        add({
          input: trimmed,
          output: isLa
            ? [`total ${projects.length}`, ...projects.map(p => `-rw-r--r--  1 nilesh portfolio  4096 May 02 2026 ${p.id}.md`)]
            : projects.map(p => `${p.id}.md    - ${p.tagline}`),
          prompt: snap,
        });
        return;
      }
      if (target === "~/skills") {
        add({ input: trimmed, output: ["languages/  frontend/  backend/  ai-ml/  databases/  infrastructure/  blockchain/"], prompt: snap });
        return;
      }
      if (target === "~/achievements") {
        add({ input: trimmed, output: ACHIEVEMENTS_LIST.join("  ").length > 0 ? [ACHIEVEMENTS_LIST.join("  ")] : ["(empty)"], prompt: snap });
        return;
      }
      if (target === "~/education") {
        add({ input: trimmed, output: [EDUCATION_LIST.join("  ")], prompt: snap });
        return;
      }
      // Skills subdirs - just say no entries (we don't drill into them)
      if (target.startsWith("~/skills/")) {
        add({ input: trimmed, output: ["(no further entries - run 'cd ..' to go back)"], prompt: snap });
        return;
      }
      add({ input: trimmed, output: [`ls: cannot access '${target}': No such file or directory`], type: "error", prompt: snap });
      return;
    }

    if (command === "cd") {
      const dir = args[0];
      const snap = promptSnapshot;

      // No arg / home / absolute home
      if (!dir || dir === "~" || dir === "/home/nilesh") {
        currentDir = "~";
        add({ input: trimmed, output: [], prompt: snap });
        return;
      }
      // Parent
      if (dir === "..") {
        const parts = currentDir.split("/");
        parts.pop();
        currentDir = parts.length <= 1 ? "~" : parts.join("/");
        add({ input: trimmed, output: [], prompt: snap });
        return;
      }
      // Subdir of current dir (matches FS_TREE)
      const clean = dir.replace(/\/$/, "");
      const children = FS_TREE[currentDir] ?? [];
      if (children.includes(clean)) {
        currentDir = currentDir === "~" ? `~/${clean}` : `${currentDir}/${clean}`;
        add({ input: trimmed, output: [], prompt: snap });
        return;
      }
      add({ input: trimmed, output: [`cd: ${dir}: No such file or directory`], type: "error", prompt: snap });
      return;
    }

    if (command === "cat") {
      const file = args[0];
      if (!file) {
        add({ input: trimmed, output: ["Usage: cat <file>", "Available: README.md, contact.md"], type: "error" });
        return;
      }
      if (file === "README.md" || file === "~/README.md") {
        add({
          input: trimmed,
          output: [
            "# About Nilesh Patil",
            "",
            "Third-year B.E. (AI & DS) student and serial builder with 3+ years",
            "of production development experience.",
            "",
            "Co-founded MediAssist AI (Rs.2L funded by Government of Karnataka),",
            "shipped triponbuddy.com serving live users, and won 8 hackathon",
            "competitions including GDG and NASA SpaceApps 1st place.",
            "",
            "Proficient across the full stack: React, Next.js, Node.js,",
            "Python (Flask/FastAPI), Flutter, and cloud-native infrastructure.",
            "",
            "Deep experience in Agentic AI, RAG pipelines, and MCP; passionate",
            "about building AI-native products at the intersection of LLMs,",
            "blockchain, and mobile.",
          ],
          type: "info",
        });
        return;
      }
      if (file === "contact.md") {
        add({
          input: trimmed,
          output: [
            "# Contact",
            "",
            "Email:    technil6436@gmail.com",
            "Phone:    +91 8431496045",
            "GitHub:   https://github.com/nileshpatil6",
            "LinkedIn: https://linkedin.com/in/nileshpatil6",
            "HF:       https://huggingface.co/Mr66",
            "Location: Belgaum, Karnataka, India",
          ],
          type: "info",
        });
        return;
      }
      // Achievement files
      if (ACHIEVEMENT_CONTENT[file]) {
        add({ input: trimmed, output: ACHIEVEMENT_CONTENT[file], type: "info" });
        return;
      }
      // Education files
      if (EDUCATION_CONTENT[file]) {
        add({ input: trimmed, output: EDUCATION_CONTENT[file], type: "info" });
        return;
      }
      // Project files (id.md or just id)
      const projectId = file.replace(/\.md$/, "");
      const proj = projects.find(p => p.id === projectId || p.name.toLowerCase() === projectId);
      if (proj) {
        add({
          input: trimmed,
          output: [
            `# ${proj.name}`,
            "",
            `> ${proj.tagline}`,
            "",
            proj.description,
            "",
            "## Tech Stack",
            `  ${proj.tech.join(", ")}`,
            "",
            ...(proj.highlight ? ["## Highlight", `  ${proj.highlight}`, ""] : []),
            "## Links",
            ...(proj.liveUrl   ? [`  LIVE:   ${proj.liveUrl}`]   : []),
            ...(proj.githubUrl ? [`  GITHUB: ${proj.githubUrl}`] : []),
            "",
            `(Run 'nano ${proj.id}' to open the full interactive view)`,
          ],
          type: "info",
        });
        return;
      }
      add({ input: trimmed, output: [`cat: ${file}: No such file or directory`], type: "error" });
      return;
    }

    if (command === "nano") {
      const rawArg = args.join(" ").trim();
      const fileName = rawArg.replace(/\//g, "").trim();
      const projectName = fileName.replace(/\.md$/, "").toLowerCase();
      if (!fileName) {
        add({ input: trimmed, output: ["Usage: nano <file>", "Try: nano contact.md  or  nano triponbuddy"], type: "error" });
        return;
      }
      // Text files: README.md, contact.md
      if (fileName === "README.md" || fileName === "readme.md") {
        add({ input: trimmed, output: [] });
        setNano({ open: true, textFile: { name: "README.md", lines: [
          "# About Nilesh Patil",
          "",
          "Third-year B.E. (AI & DS) student and serial builder with 3+ years",
          "of production development experience.",
          "",
          "Co-founded MediAssist AI (Rs.2L funded by Government of Karnataka),",
          "shipped triponbuddy.com serving live users, and won 8 hackathon",
          "competitions including GDG and NASA SpaceApps 1st place.",
          "",
          "Proficient across the full stack: React, Next.js, Node.js,",
          "Python (Flask/FastAPI), Flutter, and cloud-native infrastructure.",
          "",
          "Deep experience in Agentic AI, RAG pipelines, and MCP.",
        ]}});
        return;
      }
      if (fileName === "contact.md") {
        add({ input: trimmed, output: [] });
        setNano({ open: true, textFile: { name: "contact.md", lines: [
          "# Contact",
          "",
          "Email:    technil6436@gmail.com",
          "Phone:    +91 8431496045",
          "GitHub:   https://github.com/nileshpatil6",
          "LinkedIn: https://linkedin.com/in/nileshpatil6",
          "HF:       https://huggingface.co/Mr66",
          "Location: Belgaum, Karnataka, India",
        ]}});
        return;
      }
      // Achievement files
      if (ACHIEVEMENT_CONTENT[fileName]) {
        add({ input: trimmed, output: [] });
        setNano({ open: true, textFile: { name: fileName, lines: ACHIEVEMENT_CONTENT[fileName] } });
        return;
      }
      // Education files
      if (EDUCATION_CONTENT[fileName]) {
        add({ input: trimmed, output: [] });
        setNano({ open: true, textFile: { name: fileName, lines: EDUCATION_CONTENT[fileName] } });
        return;
      }
      // Project files
      const project = projects.find(p =>
        p.id === projectName || p.name.toLowerCase().includes(projectName) || p.id.includes(projectName)
      );
      if (project) { add({ input: trimmed, output: [] }); setNano({ open: true, project }); return; }
      add({
        input: trimmed,
        output: [`nano: ${fileName}: No such file`, "Available: README.md, contact.md, or any project name.", "Run: ls  or  ls projects/"],
        type: "error",
      });
      return;
    }

    /* ── Async commands ──────────────────────────────────── */
    if (command === "git") {
      const sub = args[0];
      if (sub === "log") {
        runAsync("Reading repository history", 420, [
          "a1b2c3d (HEAD -> main) feat: add agentic commerce protocol",
          "b2c3d4e feat: ship mediassist ai v2.0 with rag pipeline",
          "c3d4e5f feat: yukti-ai - 1000+ science q&a components",
          "d4e5f6a feat: triponbuddy v3 with gemini live integration",
          "e5f6a7b feat: college erp - full rbac multi-tenant system",
          "f6a7b8c feat: nasa spaceapps - 1st place local round",
          "a7b8c9d feat: ai social media automation pipeline",
          "b8c9d0e feat: roofvision ai - satellite roof detection",
          "c9d0e1f feat: detox ai android launcher",
          "d0e1f2a feat: 8th hackathon win - codebharat rs.50k",
          "e1f2a3b feat: nain 2.0 grant approved - rs.2l funded",
          "f2a3b4c init: repository initialized",
        ]);
        return;
      }
      if (sub === "status") {
        runAsync("Checking working tree", 280, [
          "On branch main",
          "Your branch is up to date with 'origin/main'",
          "",
          "Changes not staged for commit:",
          "  (use 'git add <file>' to update what will be committed)",
          "",
          "        modified: src/components/Projects.tsx",
          "        modified: src/data/projects.ts",
          "",
          "no changes added to commit (use 'git add' and/or 'git commit -a')",
        ]);
        return;
      }
      const gitSub = sub ?? "";
      add({ input: trimmed, output: [`git: '${gitSub}' is not a git command. Try: git log, git status`], type: "error" });
      return;
    }

    if (command === "neofetch") {
      runAsync("Gathering system information", 380, [
        "         _  _         nilesh@portfolio",
        "        (_)(_)        ────────────────────────────────────",
        "     _  _  _ _       OS: Ubuntu 24.04 LTS (WSL2)",
        "    | || || | |      Kernel: 6.6.36-microsoft-standard",
        "    | || || | |      Uptime: 3 years, 4 months",
        "    |_||_||_|_|      Shell: zsh 5.9",
        "     _ _ _ _ _       Resolution: 1920x1080",
        "    | | | | | |      DE: Next.js 15 / React 19",
        "    |_|_|_|_|_|      WM: Tailwind CSS v4",
        "                     Terminal: JetBrains Mono 13",
        " [nilesh@portfolio]  CPU: AMD Ryzen 5 5600H (12) @ 3.3GHz",
        "                     Memory: 2.1GiB / 16.0GiB",
        "                     Packages: 847 (npm)",
        "                     Languages: TS, Python, Dart, Go, Solidity",
        "                     Colors: ██████████████████",
      ], "system");
      return;
    }

    if (command === "curl") {
      if (!args[0]) {
        add({ input: trimmed, output: ["curl: try 'curl nilesh.dev/skills'"], type: "error" });
        return;
      }
      if (args.join(" ").includes("nilesh.dev/skills")) {
        runAsync("Fetching nilesh.dev/skills", 500, [
          '{"skills": {',
          '  "languages": ["TypeScript","JavaScript","Python","Dart","Kotlin","Go","Solidity","SQL"],',
          '  "frontend": ["React","Next.js","Flutter","Tailwind CSS","ReactFlow","Three.js"],',
          '  "backend": ["Node.js","NestJS","FastAPI","Flask","Express.js"],',
          '  "ai_ml": ["Gemini AI","OpenAI API","LangChain","RAG","Agentic AI","MCP"],',
          '  "databases": ["PostgreSQL","Supabase","Firebase","Redis","Prisma"],',
          '  "infrastructure": ["Docker","GitHub Actions","Vercel","Render"],',
          '  "blockchain": ["Solidity","Ethereum","Hardhat","Web3.js"]',
          "}}",
        ], "success");
        return;
      }
      add({ input: trimmed, output: [`curl: (6) Could not resolve host: ${args[0]}`], type: "error" });
      return;
    }

    if (command === "ping") {
      if (!args[0]) {
        add({ input: trimmed, output: ["Usage: ping <host>", "Example: ping google.com"], type: "error" });
        return;
      }
      if (args[0] === "google.com" || args[0] === "google") {
        runAsync(`Pinging ${args[0]}`, 680, [
          `PING ${args[0]} (142.250.182.46): 56 data bytes`,
          "64 bytes from 142.250.182.46: icmp_seq=0 ttl=64 time=11.2 ms",
          "64 bytes from 142.250.182.46: icmp_seq=1 ttl=64 time=12.4 ms",
          "64 bytes from 142.250.182.46: icmp_seq=2 ttl=64 time=13.1 ms",
          "",
          "--- google.com ping statistics ---",
          "3 packets transmitted, 3 received, 0% packet loss",
          "round-trip min/avg/max/stddev = 11.2/12.2/13.1/0.8 ms",
        ], "success");
        return;
      }
      add({ input: trimmed, output: [`ping: ${args[0]}: Name or service not known`], type: "error" });
      return;
    }

    if (command === "ssh") {
      if (!args[0]) {
        add({ input: trimmed, output: ["Usage: ssh <user>@<host>", "Example: ssh nilesh@portfolio.dev"], type: "error" });
        return;
      }
      if (args[0].includes("nilesh")) {
        runAsync("Authenticating with public key", 850, [
          `Connecting to ${args[0]}...`,
          "Authenticating with public key...",
          "",
          "Connection established.",
          "Authenticated as: nilesh (uid=1000)",
          "",
          "Welcome to portfolio.dev - type 'help' to get started.",
        ], "success");
        return;
      }
      add({ input: trimmed, output: [`ssh: connect to host ${args[0]} port 22: Connection refused`], type: "error" });
      return;
    }

    if (
      trimmed === "./portfolio.sh" || trimmed === "bash portfolio.sh" ||
      trimmed === "sh portfolio.sh" || trimmed === "./portfolio.sh --run"
    ) {
      runAsync("Loading Nilesh Patil OS", 1400, [
        "#!/bin/bash",
        "# portfolio.sh - Nilesh Patil v3.0.0",
        "",
        "Initializing...",
        "",
        "[████████████████████████████████] 100%",
        "",
        "  loading projects          ... done (20 entries)",
        "  loading skills            ... done (7 categories)",
        "  loading achievements      ... done (8 hackathon wins)",
        "  mounting ai pipelines     ... done",
        "  connecting to portfolio   ... done",
        "",
        "┌────────────────────────────────────────────────────┐",
        "│  NILESH PATIL - Full Stack & GenAI Engineer        │",
        "│  Status: Available for Hire                        │",
        "└────────────────────────────────────────────────────┘",
        "",
        "Run 'whoami' for credentials, 'ls projects/' to browse.",
      ], "success");
      return;
    }

    if (trimmed.includes("sudo rm -rf") && trimmed.includes("boring-portfolio")) {
      add({
        input: trimmed,
        output: [
          "sudo: Permission denied.",
          "rm: cannot remove 'boring-portfolio/': No such file or directory",
        ],
        type: "error",
      });
      return;
    }

    if (command === "sudo") {
      add({ input: trimmed, output: ["[sudo] password for nilesh:", "Sorry, try again.", "sudo: 3 incorrect password attempts"], type: "error" });
      return;
    }

    add({ input: trimmed, output: [`${command}: command not found`, "Type 'help' for available commands."], type: "error" });
  }, [addHistory, router, resolveLastEntry]);

  /* ── Keyboard handler ─────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerFlash();
      processCommand(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx] || "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx] || "");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(" ");
      const partial = (parts[parts.length - 1] || "").toLowerCase();
      if (!partial) return;

      const firstWord  = (parts[0] || "").toLowerCase();
      const isFirstWord = parts.length === 1;

      const COMMANDS = [
        "help","whoami","ls","cd","cat","pwd","echo","history","uname",
        "clear","exit","nano","git","neofetch","curl","ssh","ping","sudo",
        "./portfolio.sh",
      ];
      const HOME_DIRS = ["projects/","skills/","achievements/","education/"];

      let match: string | undefined;

      if (isFirstWord) {
        match = COMMANDS.find(c => c.startsWith(partial));
      } else if (firstWord === "nano") {
        // Context-aware: projects always available, plus files in current dir
        const projectMatch = projects.find(p => p.id.startsWith(partial))?.id;
        let fileMatch: string | undefined;
        if (currentDir === "~") {
          fileMatch = ["README.md","contact.md"].find(f => f.toLowerCase().startsWith(partial));
        } else if (currentDir === "~/achievements") {
          fileMatch = ACHIEVEMENTS_LIST.find(f => f.toLowerCase().startsWith(partial));
        } else if (currentDir === "~/education") {
          fileMatch = EDUCATION_LIST.find(f => f.toLowerCase().startsWith(partial));
        } else if (currentDir === "~/projects") {
          fileMatch = projects.map(p => `${p.id}.md`).find(f => f.toLowerCase().startsWith(partial));
        }
        match = fileMatch ?? projectMatch;
      } else if (firstWord === "cd" || firstWord === "ls") {
        let dirs: string[];
        if (currentDir === "~") {
          dirs = [...HOME_DIRS.map(d => d.replace(/\/$/, "")), ".."];
        } else if (currentDir === "~/skills") {
          dirs = [...(FS_TREE["~/skills"] ?? []), ".."];
        } else {
          dirs = [".."];
        }
        match = dirs.find(d => d.startsWith(partial));
      } else if (firstWord === "cat") {
        let availableFiles: string[];
        if (currentDir === "~/achievements") {
          availableFiles = ACHIEVEMENTS_LIST;
        } else if (currentDir === "~/education") {
          availableFiles = EDUCATION_LIST;
        } else if (currentDir === "~/projects") {
          availableFiles = projects.map(p => `${p.id}.md`);
        } else {
          availableFiles = ["README.md", "contact.md", "portfolio.sh"];
        }
        match = availableFiles.find(f => f.toLowerCase().startsWith(partial));
      }

      if (match) {
        parts[parts.length - 1] = match;
        setInput(parts.join(" "));
      }
    }
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <div className={`relative w-full terminal-body flex flex-col overflow-hidden ${booting ? "terminal-boot" : ""}`}
      style={{ height: "100dvh" }}
    >
      <div className="terminal-vignette" />

      {/* Title bar */}
      <div className="relative z-10 flex items-center justify-between px-4 bg-[#111]/90 border-b border-[#00ff88]/12 backdrop-blur-sm flex-shrink-0"
        style={{ height: 44 }}
      >
        {/* Back button - more tappable on mobile */}
        <button
          data-testid="button-back-mode"
          onClick={() => router.push("/")}
          className="text-[#a0aec0] text-xs font-mono transition-colors"
          style={{ padding: "8px 0", minWidth: 44 }}
        >
          ← back
        </button>
        <span className="text-[#00ff88]/50 text-xs font-mono tracking-widest"
              style={{ textShadow: "0 0 8px rgba(0,255,136,0.4)" }}>
          NILESH.SH
        </span>
        <div className="flex items-center gap-1.5" style={{ minWidth: 44, justifyContent: "flex-end" }}>
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="text-[#00ff88]/40 text-xs font-mono">live</span>
        </div>
      </div>

      {nano.open && <NanoViewer state={nano} onClose={() => setNano({ open: false })} />}

      {/* Output area - scrollable */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 overflow-y-auto space-y-0.5"
        style={{ padding: isTouch ? "12px 14px" : "16px" }}
        onClick={() => !isTouch && inputRef.current?.focus()}
      >
        {/* ASCII logo - hidden on mobile to save space */}
        {!isTouch && <GlitchAscii />}

        {/* Mobile compact header */}
        {isTouch && (
          <div className="mb-3 pb-2 border-b border-[#00ff88]/10">
            <div className="font-mono text-[#00ff88]/70 text-xs" style={{ textShadow: "0 0 8px rgba(0,255,136,0.4)" }}>
              NILESH.SH v1.0 · type a command or tap below
            </div>
            <div className="font-mono text-[#a0aec0]/40 text-xs mt-0.5">try: help · ls · whoami · neofetch</div>
          </div>
        )}

        {/* History entries */}
        {history.map((entry, i) => {
          const isLast = i === history.length - 1;
          return (
            <div key={i} ref={isLast && entry.input !== undefined ? latestEntryRef : null}>
              {entry.input !== undefined && (
                <div className="font-mono flex gap-1 mt-1" style={{ fontSize: isTouch ? "0.8rem" : "0.875rem" }}>
                  <span
                    className="text-[#00d4ff] whitespace-nowrap select-none"
                    style={{ textShadow: "0 0 8px rgba(0,212,255,0.45)" }}
                  >
                    {entry.prompt ?? getPrompt()}
                  </span>
                  {" "}
                  <span className="text-white break-all">{entry.input}</span>
                </div>
              )}
              <AnimatedOutput
                lines={entry.output}
                type={entry.type}
                speed={i === 0 ? 12 : 22}
              />
            </div>
          );
        })}

        {/* Loading indicator */}
        {loadingCmd && <LoadingDots message={loadingCmd.message} />}

        {/* Desktop: inline input prompt at bottom of scroll area */}
        {!isTouch && !loadingCmd && (
          <div
            ref={inputBarRef}
            className="flex items-center gap-1 mt-1"
          >
            <span
              className="text-[#00d4ff] font-mono text-sm whitespace-nowrap select-none"
              style={{ textShadow: "0 0 8px rgba(0,212,255,0.45)" }}
            >
              {getPrompt()}
            </span>
            {" "}
            <input
              ref={inputRef}
              data-testid="input-terminal"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white font-mono text-sm outline-none cursor-none caret-transparent"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            <span
              className="term-cursor"
              style={{ boxShadow: "0 0 7px rgba(0,255,136,0.7)" }}
            />
          </div>
        )}

        {/* Bottom spacer - desktop only */}
        {!isTouch && <div aria-hidden style={{ minHeight: "60vh" }} />}
        {/* Mobile: small spacer so last line isn't right at bottom bar edge */}
        {isTouch && <div aria-hidden style={{ height: 8 }} />}
      </div>

      {/* ── MOBILE BOTTOM BAR ─────────────────────────────── */}
      {isTouch && (
        <div className="relative z-20 flex-shrink-0 bg-[#0d0d12] border-t border-[#00ff88]/12">

          {/* Quick command chips */}
          <div className="flex gap-1.5 px-3 pt-2 pb-1.5 overflow-x-auto scrollbar-none">
            {["help", "ls", "whoami", "neofetch", "cat README.md", "cd projects", "git log", "history", "clear"].map(cmd => (
              <button
                key={cmd}
                onPointerDown={e => { e.preventDefault(); insertCommand(cmd); inputRef.current?.focus(); }}
                className="shrink-0 font-mono bg-[#1a1a22] border border-[#00ff88]/20 text-[#00ff88]/80 rounded-md active:bg-[#00ff88]/15 active:border-[#00ff88]/50 transition-colors"
                style={{ fontSize: "0.7rem", padding: "5px 10px", letterSpacing: "0.03em" }}
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-center gap-2 px-3 pb-3 pt-1">
            {/* Prompt + input */}
            <div
              className="flex-1 flex items-center gap-2 rounded-lg border border-[#00ff88]/20 bg-[#131318] px-3"
              style={{ height: 44 }}
              onClick={() => inputRef.current?.focus()}
            >
              <span
                className="text-[#00d4ff] font-mono whitespace-nowrap select-none flex-shrink-0"
                style={{ fontSize: "0.72rem", textShadow: "0 0 8px rgba(0,212,255,0.4)" }}
              >
                $
              </span>
              <input
                ref={inputRef}
                data-testid="input-terminal"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white font-mono outline-none min-w-0"
                style={{ fontSize: "0.85rem", caretColor: "#00ff88" }}
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="type a command..."
              />
              {loadingCmd && (
                <div className="w-3 h-3 rounded-full border border-[#00ff88]/50 border-t-[#00ff88] animate-spin flex-shrink-0" />
              )}
            </div>

            {/* Send button */}
            <button
              onPointerDown={e => { e.preventDefault(); triggerEnter(); }}
              className="flex-shrink-0 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] font-mono font-bold active:bg-[#00ff88]/25 transition-colors flex items-center justify-center"
              style={{ width: 44, height: 44, fontSize: "1.1rem" }}
            >
              ↵
            </button>
          </div>

          {/* Aux key row: history nav + tab */}
          <div className="flex gap-2 px-3 pb-2">
            <button
              onPointerDown={e => { e.preventDefault(); triggerHistory("up"); }}
              className="flex-1 font-mono rounded border border-[#ffffff]/10 text-[#a0aec0]/70 bg-[#1a1a22] active:bg-[#2a2a32] transition-colors"
              style={{ fontSize: "0.7rem", padding: "5px 0" }}
            >
              ↑ prev
            </button>
            <button
              onPointerDown={e => { e.preventDefault(); triggerHistory("down"); }}
              className="flex-1 font-mono rounded border border-[#ffffff]/10 text-[#a0aec0]/70 bg-[#1a1a22] active:bg-[#2a2a32] transition-colors"
              style={{ fontSize: "0.7rem", padding: "5px 0" }}
            >
              ↓ next
            </button>
            <button
              onPointerDown={e => { e.preventDefault(); triggerTab(); }}
              className="flex-1 font-mono rounded border border-[#00d4ff]/20 text-[#00d4ff]/70 bg-[#1a1a22] active:bg-[#00d4ff]/10 transition-colors"
              style={{ fontSize: "0.7rem", padding: "5px 0" }}
            >
              TAB
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
