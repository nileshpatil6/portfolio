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
}
type NanoState = { open: false } | { open: true; project: typeof projects[0] };

/* ══════════════════════════════════════════════════════════
   GlitchAscii — logo corrupts random chars periodically
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
   AnimatedOutput — lines appear one-by-one with stagger
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
   LoadingDots — animated spinner for async commands
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
   MatrixRain — very subtle falling char canvas background
══════════════════════════════════════════════════════════ */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const FS = 11;
    const CHARS = "01アイウエカキクサシスタチツナニハヒフ10ヲン";
    let drops: number[] = [];
    const initDrops = () => {
      const cols = Math.max(1, Math.floor((canvas.width || 1) / FS));
      drops = Array(cols).fill(0).map(() => -Math.floor(Math.random() * 70));
    };
    initDrops();
    ctx.font = `${FS}px "JetBrains Mono", monospace`;

    const tick = () => {
      ctx.fillStyle = "rgba(10,10,9,0.042)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,136,0.52)";
      drops.forEach((y, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(ch, i * FS, y * FS);
        if (y * FS > canvas.height && Math.random() > 0.974) drops[i] = 0;
        drops[i] += 0.38;
      });
    };

    const id = setInterval(tick, 55);
    return () => { clearInterval(id); window.removeEventListener("resize", setSize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.14, mixBlendMode: "screen", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   NanoViewer
══════════════════════════════════════════════════════════ */
function NanoViewer({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.ctrlKey && e.key === "x")) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col nano-editor">
      <div className="nano-header px-4 py-1 text-sm flex items-center justify-between">
        <span>GNU nano 6.2 — {project.name}.md</span>
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
      <div className="nano-footer px-2 py-1 text-xs flex flex-wrap gap-4">
        <span><span className="bg-[#00d4ff] text-[#0a0a0f] px-1">^X</span> Exit</span>
        <span><span className="bg-[#00d4ff] text-[#0a0a0f] px-1">ESC</span> Close</span>
        <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^G</span> Help</span>
        <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^O</span> Write Out</span>
        <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^R</span> Read File</span>
        <span><span className="bg-[#a0aec0] text-[#0a0a0f] px-1">^W</span> Where Is</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DevMode — main terminal component
══════════════════════════════════════════════════════════ */
export default function DevMode() {
  const router = useRouter();

  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      output: [
        "",
        "SYSTEM://NILESH.SH — Terminal v3.0.0",
        "Last login: " + new Date().toLocaleString() + " from 192.168.1.1",
        "",
        "┌─────────────────────────────────────────────────────────┐",
        "│  HOW TO USE                                             │",
        "│  · Type a command below and press  Enter  to run it    │",
        "│  · Press  ↑ / ↓  to cycle through command history      │",
        "│  · Press  Tab    to autocomplete project names          │",
        "│  · Click anywhere in the terminal to focus the input   │",
        "├─────────────────────────────────────────────────────────┤",
        "│  QUICK START                                            │",
        "│    whoami         →  Who is Nilesh?                    │",
        "│    ls projects/   →  Browse all 19 projects            │",
        "│    nano <name>    →  Open a project (ESC to close)     │",
        "│    git log        →  View commit history               │",
        "│    ./portfolio.sh →  Run the easter egg 🚀             │",
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
  const [histIdx, setHistIdx]     = useState(-1);
  const [nano, setNano]           = useState<NanoState>({ open: false });
  const [loadingCmd, setLoadingCmd] = useState<{ message: string } | null>(null);
  const [booting, setBooting]     = useState(true);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history, loadingCmd]);
  /* Focus input on mount */
  useEffect(() => { inputRef.current?.focus(); }, []);
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

    setCmdHistory(prev => [trimmed, ...prev]);
    setHistIdx(-1);

    /* Helper: run a command that needs a loading delay */
    const runAsync = (message: string, delayMs: number, output: string[], type?: HistoryEntry["type"]) => {
      addHistory({ input: trimmed, output: [] });
      setLoadingCmd({ message });
      setTimeout(() => resolveLastEntry(output, type), delayMs);
    };

    /* ── Instant commands ─────────────────────────────── */
    if (command === "clear") { setHistory([]); return; }
    if (command === "exit" || command === "quit") { router.push("/"); return; }

    if (command === "help") {
      addHistory({
        input: trimmed,
        output: [
          "╔═════════════════════════════════════════════════════════╗",
          "║  NILESH.SH — TERMINAL REFERENCE                        ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  HOW TO USE                                            ║",
          "║  · Type a command and press  Enter  to execute         ║",
          "║  · Press  ↑ / ↓  arrow keys to scroll command history  ║",
          "║  · Press  Tab    to autocomplete project names         ║",
          "║  · Click anywhere in the window to focus the input     ║",
          "║  · Type  clear   to wipe the screen                   ║",
          "║  · Type  exit    to return to the mode select screen   ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  IDENTITY                                              ║",
          "║    whoami                — credentials & bio           ║",
          "║    neofetch              — system info panel           ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  FILESYSTEM                                            ║",
          "║    ls                    — list current directory      ║",
          "║    ls projects/          — list all 19 projects        ║",
          "║    ls -la                — detailed listing            ║",
          "║    cd projects           — change into projects/       ║",
          "║    cd ..                 — go up one level             ║",
          "║    cat README.md         — read about section          ║",
          "║    cat contact.md        — read contact info           ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  PROJECTS                                              ║",
          "║    nano <project-name>   — open project in editor      ║",
          "║    nano triponbuddy      — (example)    ESC to close   ║",
          "║    nano mediassist       — (example)    ESC to close   ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  GIT & NETWORK                                         ║",
          "║    git log               — view commit history         ║",
          "║    git status            — view working tree status    ║",
          "║    curl nilesh.dev/skills — fetch skills JSON          ║",
          "║    ssh nilesh@portfolio.dev — remote access            ║",
          "║    ping google.com       — network latency test        ║",
          "╠═════════════════════════════════════════════════════════╣",
          "║  EASTER EGGS                                           ║",
          "║    ./portfolio.sh        — run the portfolio script 🚀 ║",
          "║    bash portfolio.sh     — same as above               ║",
          "║    sudo rm -rf boring-portfolio/   — try it ;)         ║",
          "╚═════════════════════════════════════════════════════════╝",
        ],
        type: "info",
      });
      return;
    }

    if (command === "whoami") {
      addHistory({
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
          "│  > IIT Bombay Intern                        │",
          "│  > Rs.2L Funded Founder                     │",
          "│  > NASA SpaceApps 1st Place (Local)         │",
          "│  > B.E. AI & DS (2023–2027)                 │",
          "└─────────────────────────────────────────────┘",
        ],
        type: "success",
      });
      return;
    }

    if (command === "ls") {
      const arg       = args[0];
      const isLa      = args.includes("-la") || args.includes("-l");
      const effectiveArg = (!arg || arg === "-la" || arg === "-l") ? null : arg;
      const resolvedDir  = effectiveArg ?? currentDir;

      const isHome     = resolvedDir === "~" || resolvedDir === "/home/nilesh";
      const isProjects = ["~/projects","projects","projects/"].includes(resolvedDir);
      const isSkills   = ["~/skills","skills","skills/"].includes(resolvedDir);

      if (isHome) {
        addHistory({
          input: trimmed,
          output: isLa
            ? [
                "total 47",
                "drwxr-xr-x  7 nilesh portfolio  4096 May 02 2026 .",
                "drwxr-xr-x  3 nilesh portfolio  4096 May 02 2026 ..",
                "-rw-r--r--  1 nilesh portfolio  2048 May 02 2026 README.md",
                "-rw-r--r--  1 nilesh portfolio   512 May 02 2026 contact.md",
                "drwxr-xr-x 19 nilesh portfolio  4096 May 02 2026 projects/",
                "drwxr-xr-x  7 nilesh portfolio  4096 May 02 2026 skills/",
                "drwxr-xr-x  5 nilesh portfolio  4096 May 02 2026 achievements/",
                "drwxr-xr-x  3 nilesh portfolio  4096 May 02 2026 education/",
                "-rwxr-xr-x  1 nilesh portfolio  8192 May 02 2026 portfolio.sh*",
              ]
            : ["README.md  contact.md  projects/  skills/  achievements/  education/  portfolio.sh"],
        });
        return;
      }
      if (isProjects) {
        addHistory({
          input: trimmed,
          output: isLa
            ? [`total ${projects.length}`, ...projects.map(p => `drwxr-xr-x  1 nilesh portfolio  4096 May 02 2026 ${p.id}/`)]
            : projects.map(p => `${p.id}/    — ${p.tagline}`),
        });
        return;
      }
      if (isSkills) {
        addHistory({ input: trimmed, output: ["languages/  frontend/  backend/  ai-ml/  databases/  infrastructure/  blockchain/"] });
        return;
      }
      addHistory({ input: trimmed, output: [`ls: cannot access '${effectiveArg ?? currentDir}': No such file or directory`], type: "error" });
      return;
    }

    if (command === "cd") {
      const dir = args[0];
      if (!dir || dir === "~" || dir === "/home/nilesh") { currentDir = "~"; addHistory({ input: trimmed, output: [] }); }
      else if (dir === "projects" || dir === "projects/") { currentDir = "~/projects"; addHistory({ input: trimmed, output: [] }); }
      else if (dir === "skills"   || dir === "skills/")   { currentDir = "~/skills";   addHistory({ input: trimmed, output: [] }); }
      else if (dir === "..") { currentDir = "~"; addHistory({ input: trimmed, output: [] }); }
      else addHistory({ input: trimmed, output: [`cd: ${dir}: No such file or directory`], type: "error" });
      return;
    }

    if (command === "cat") {
      const file = args[0];
      if (file === "README.md" || file === "~/README.md") {
        addHistory({
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
        addHistory({
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
      addHistory({ input: trimmed, output: [`cat: ${file}: No such file or directory`], type: "error" });
      return;
    }

    if (command === "nano") {
      const projectName = args.join(" ").toLowerCase().replace(/\//g, "").trim();
      if (!projectName) {
        addHistory({ input: trimmed, output: ["Usage: nano <project-name>", "Try: nano triponbuddy"], type: "error" });
        return;
      }
      const project = projects.find(p =>
        p.id === projectName || p.name.toLowerCase().includes(projectName) || p.id.includes(projectName)
      );
      if (project) { addHistory({ input: trimmed, output: [] }); setNano({ open: true, project }); return; }
      addHistory({
        input: trimmed,
        output: [`nano: ${projectName}: No such file`, "Available projects:", ...projects.map(p => `  ${p.id}`).slice(0, 10), "  ...and more. Run: ls projects/"],
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
          "b2c3d4e feat: ship mediassist ai v2.0",
          "c3d4e5f feat: yukti-ai — 1000+ science components",
          "d4e5f6a feat: triponbuddy v3 with gemini integration",
          "e5f6a7b feat: college erp — full RBAC system",
          "f6a7b8c feat: nasa spaceapps project — 1st place",
          "a7b8c9d feat: ai social media automation pipeline",
          "b8c9d0e feat: roofvision ai satellite detection",
          "c9d0e1f feat: detox ai android launcher",
          "d0e1f2a feat: 8th hackathon win — codebharat rs.50k",
          "e1f2a3b feat: iit bombay internship complete",
          "f2a3b4c init: repository initialized",
        ]);
        return;
      }
      if (sub === "status") {
        runAsync("Checking working tree", 280, [
          "On branch main",
          "Your branch is 47 commits ahead of 'origin/master'",
          "",
          "Working on: next product",
          "",
          "Changes to be committed:",
          "  (use 'git restore --staged <file>' to unstage)",
          "        new file: projects/next-big-thing.md",
          "        modified: achievements/hackathon-wins.md",
          "",
          "nothing to commit (working tree clean)",
        ]);
        return;
      }
      addHistory({ input: trimmed, output: [`git: '${sub}' is not a git command. Try: git log, git status`], type: "error" });
      return;
    }

    if (command === "neofetch") {
      runAsync("Gathering system information", 380, [
        "         _  _         nilesh@portfolio",
        "        (_)(_)        ────────────────",
        "     _  _  _ _       OS: FullStack Linux v3.0",
        "    | || || | |      Kernel: GenAI-4.2-agentic",
        "    | || || | |      Uptime: 3+ years",
        "    |_||_||_|_|      Shell: React/Next.js",
        "     _ _ _ _ _       Resolution: 1920x1080",
        "    | | | | | |      DE: Component-Based",
        "    |_|_|_|_|_|      WM: Tailwind CSS",
        "                     Terminal: JetBrains Mono",
        " [nilesh@portfolio]  CPU: Brain @ 200GHz",
        "                     Memory: 128GB Projects",
        "                     Packages: React, Flutter, Python,",
        "                              Node.js, TypeScript, Solidity,",
        "                              Docker, PostgreSQL, Supabase",
        "                     Colors: ██████████████████",
      ], "system");
      return;
    }

    if (command === "curl") {
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
      addHistory({ input: trimmed, output: [`curl: (6) Could not resolve host: ${args[0]}`], type: "error" });
      return;
    }

    if (command === "ping") {
      if (args[0] === "google.com" || args[0] === "google") {
        runAsync(`Pinging ${args[0]}`, 680, [
          `PING ${args[0]} (142.250.182.46): 56 data bytes`,
          "64 bytes from 142.250.182.46: icmp_seq=0 ttl=64 time=1ms",
          "64 bytes from 142.250.182.46: icmp_seq=1 ttl=64 time=1ms",
          "64 bytes from 142.250.182.46: icmp_seq=2 ttl=64 time=1ms",
          "",
          "--- google.com ping statistics ---",
          "3 packets transmitted, 3 received, 0% packet loss",
          "round-trip min/avg/max = 1/1/1 ms (he's too fast)",
        ], "success");
        return;
      }
      addHistory({ input: trimmed, output: [`ping: ${args[0]}: Name or service not known`], type: "error" });
      return;
    }

    if (command === "ssh") {
      if (args[0] && args[0].includes("nilesh")) {
        runAsync("Authenticating with public key", 850, [
          "Connecting to nilesh@portfolio.dev...",
          "Authenticating with public key...",
          "",
          "Connection established. Welcome to the mainframe.",
          "Access level: GOD MODE",
          "",
          "Warning: You have entered the mind of a serial builder.",
          "Proceed with awe.",
        ], "success");
        return;
      }
      addHistory({ input: trimmed, output: [`ssh: connect to host ${args[0]} port 22: Connection refused`], type: "error" });
      return;
    }

    if (
      trimmed === "./portfolio.sh" || trimmed === "bash portfolio.sh" ||
      trimmed === "sh portfolio.sh" || trimmed === "./portfolio.sh --run"
    ) {
      runAsync("Loading Nilesh Patil OS", 1400, [
        "#!/bin/bash",
        "# portfolio.sh — Nilesh Patil v3.0.0",
        "",
        "Initializing Nilesh Patil OS...",
        "",
        "[██████████████████████████████] 100%",
        "",
        "✓ Loading 19 projects         … done",
        "✓ Importing 8 hackathon wins  … done",
        "✓ Mounting IIT Bombay creds   … done",
        "✓ Spinning up AI pipelines    … done",
        "✓ Connecting to portfolio.dev … done",
        "",
        "┌──────────────────────────────────────────────────┐",
        "│  NILESH PATIL — Full Stack & GenAI Engineer       │",
        "│  Status: Building the internet's next layer 🚀    │",
        "│  Mode:   GOD MODE ACTIVATED                       │",
        "└──────────────────────────────────────────────────┘",
        "",
        "Run 'whoami' to see credentials, or 'ls projects/' to",
        "browse 19 production-grade projects.",
      ], "success");
      return;
    }

    if (trimmed.includes("sudo rm -rf") && trimmed.includes("boring-portfolio")) {
      addHistory({
        input: trimmed,
        output: [
          "sudo: Permission denied",
          "This portfolio is too good to delete.",
          "Access denied. You cannot delete excellence.",
        ],
        type: "error",
      });
      return;
    }

    if (command === "sudo") {
      addHistory({ input: trimmed, output: ["[sudo] password for nilesh:", "Sorry, try again.", "sudo: 3 incorrect password attempts"], type: "error" });
      return;
    }

    addHistory({ input: trimmed, output: [`${command}: command not found`, "Type 'help' for available commands."], type: "error" });
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
      const partial = input.split(" ").pop()?.toLowerCase() || "";
      if (partial) {
        const match = projects.find(p => p.id.startsWith(partial));
        if (match) {
          const words = input.split(" ");
          words[words.length - 1] = match.id;
          setInput(words.join(" "));
        }
      }
    }
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <div className={`relative h-screen w-full terminal-body flex flex-col overflow-hidden ${booting ? "terminal-boot" : ""}`}>
      {/* Matrix rain */}
      <MatrixRain />
      {/* CRT overlays */}
      <div className="terminal-scanlines" />
      <div className="scanline-sweep" />
      <div className="terminal-vignette" />

      {/* Title bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2 bg-[#111]/90 border-b border-[#00ff88]/12 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#00ff88]/50 text-xs font-mono tracking-widest"
              style={{ textShadow: "0 0 8px rgba(0,255,136,0.4)" }}>
          NILESH.SH — TERMINAL
        </span>
        <button
          data-testid="button-back-mode"
          onClick={() => router.push("/")}
          className="text-[#a0aec0] hover:text-[#00d4ff] text-xs font-mono transition-colors cursor-none"
        >
          [X] EXIT
        </button>
      </div>

      {nano.open && <NanoViewer project={nano.project} onClose={() => setNano({ open: false })} />}

      {/* Output area */}
      <div
        className="relative z-10 flex-1 overflow-y-auto p-4 space-y-0.5"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Glitchy ASCII logo — always at top */}
        <GlitchAscii />

        {/* History entries */}
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input !== undefined && (
              <div className="font-mono text-sm flex gap-1 mt-1">
                <span
                  className="text-[#00d4ff] whitespace-nowrap select-none"
                  style={{ textShadow: "0 0 8px rgba(0,212,255,0.45)" }}
                >
                  {getPrompt()}
                </span>
                {" "}
                <span className="text-white">{entry.input}</span>
              </div>
            )}
            <AnimatedOutput
              lines={entry.output}
              type={entry.type}
              speed={i === 0 ? 12 : 22}
            />
          </div>
        ))}

        {/* Loading indicator */}
        {loadingCmd && <LoadingDots message={loadingCmd.message} />}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        ref={inputBarRef}
        className="relative z-10 flex items-center gap-2 px-4 py-3 border-t border-[#00ff88]/10 bg-[#0a0a09]/95"
      >
        <span
          className="text-[#00d4ff] font-mono text-sm whitespace-nowrap select-none"
          style={{ textShadow: "0 0 8px rgba(0,212,255,0.45)" }}
        >
          {getPrompt()}
        </span>
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
    </div>
  );
}
