import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { projects } from "@/data/projects";

interface HistoryEntry {
  input?: string;
  output: string | string[];
  type?: "error" | "success" | "info" | "system";
}

type NanoState = { open: false } | { open: true; project: typeof projects[0] };

const PROMPT_BASE = "nilesh@portfolio";
let currentDir = "~";

const getPrompt = () => `${PROMPT_BASE}:${currentDir}$`;

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

export default function DevMode() {
  const [, setLocation] = useLocation();
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      output: [
        " ███╗   ██╗██╗██╗     ███████╗███████╗██╗  ██╗",
        " ████╗  ██║██║██║     ██╔════╝██╔════╝██║  ██║",
        " ██╔██╗ ██║██║██║     █████╗  ███████╗███████║",
        " ██║╚██╗██║██║██║     ██╔══╝  ╚════██║██╔══██║",
        " ██║ ╚████║██║███████╗███████╗███████║██║  ██║",
        " ╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝",
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
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [nano, setNano] = useState<NanoState>({ open: false });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addHistory = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => [...prev, entry]);
  }, []);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistIdx(-1);

    addHistory({ input: trimmed, output: [] });

    // Handle commands
    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "exit" || command === "quit") {
      setLocation("/");
      return;
    }

    if (command === "help") {
      addHistory({
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
      const arg = args[0];
      const isLa = args.includes("-la") || args.includes("-l");
      const effectiveArg = (!arg || arg === "-la" || arg === "-l") ? null : arg;
      const resolvedDir = effectiveArg ?? currentDir;

      const isHome     = resolvedDir === "~" || resolvedDir === "/home/nilesh";
      const isProjects = resolvedDir === "~/projects" || resolvedDir === "projects" || resolvedDir === "projects/";
      const isSkills   = resolvedDir === "~/skills"   || resolvedDir === "skills"   || resolvedDir === "skills/";

      if (isHome) {
        if (isLa) {
          addHistory({
            output: [
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
            ],
          });
        } else {
          addHistory({
            output: ["README.md  contact.md  projects/  skills/  achievements/  education/  portfolio.sh"],
          });
        }
        return;
      }

      if (isProjects) {
        if (isLa) {
          addHistory({
            output: [
              `total ${projects.length}`,
              ...projects.map((p) =>
                `drwxr-xr-x  1 nilesh portfolio  4096 May 02 2026 ${p.id}/`
              ),
            ],
          });
        } else {
          addHistory({
            output: projects.map((p) => `${p.id}/    — ${p.tagline}`),
          });
        }
        return;
      }

      if (isSkills) {
        addHistory({
          output: ["languages/  frontend/  backend/  ai-ml/  databases/  infrastructure/  blockchain/"],
        });
        return;
      }

      if (effectiveArg) {
        addHistory({ output: [`ls: cannot access '${effectiveArg}': No such file or directory`], type: "error" });
      } else {
        addHistory({ output: [`ls: cannot access '${currentDir}': No such file or directory`], type: "error" });
      }
      return;
    }

    if (command === "cd") {
      const dir = args[0];
      if (!dir || dir === "~" || dir === "/home/nilesh") {
        currentDir = "~";
        addHistory({ output: [] });
      } else if (dir === "projects" || dir === "projects/") {
        currentDir = "~/projects";
        addHistory({ output: [] });
      } else if (dir === "skills" || dir === "skills/") {
        currentDir = "~/skills";
        addHistory({ output: [] });
      } else if (dir === "..") {
        currentDir = "~";
        addHistory({ output: [] });
      } else {
        addHistory({ output: [`cd: ${dir}: No such file or directory`], type: "error" });
      }
      return;
    }

    if (command === "cat") {
      const file = args[0];
      if (file === "README.md" || file === "~/README.md") {
        addHistory({
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
      addHistory({ output: [`cat: ${file}: No such file or directory`], type: "error" });
      return;
    }

    if (command === "nano") {
      const projectName = args.join(" ").toLowerCase().replace(/\//g, "").trim();
      if (!projectName) {
        addHistory({ output: ["Usage: nano <project-name>", "Try: nano triponbuddy"], type: "error" });
        return;
      }
      const project = projects.find(
        (p) => p.id === projectName || p.name.toLowerCase().includes(projectName) || p.id.includes(projectName)
      );
      if (project) {
        setNano({ open: true, project });
        return;
      }
      addHistory({ output: [`nano: ${projectName}: No such file`, "Available projects:", ...projects.map((p) => `  ${p.id}`).slice(0, 10), "  ...and more. Run: ls projects/"], type: "error" });
      return;
    }

    if (command === "git") {
      const sub = args[0];
      if (sub === "log" || sub === "log\x00--oneline") {
        addHistory({
          output: [
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
          ],
        });
        return;
      }
      if (sub === "status") {
        addHistory({
          output: [
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
          ],
        });
        return;
      }
      addHistory({ output: [`git: '${sub}' is not a git command. Try: git log, git status`], type: "error" });
      return;
    }

    if (command === "neofetch") {
      addHistory({
        output: [
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
        ],
        type: "system",
      });
      return;
    }

    if (command === "curl") {
      if (args.join(" ").includes("nilesh.dev/skills")) {
        addHistory({
          output: [
            '{"skills": {',
            '  "languages": ["TypeScript","JavaScript","Python","Dart","Kotlin","Go","Solidity","SQL"],',
            '  "frontend": ["React","Next.js","Flutter","Tailwind CSS","ReactFlow","Three.js"],',
            '  "backend": ["Node.js","NestJS","FastAPI","Flask","Express.js"],',
            '  "ai_ml": ["Gemini AI","OpenAI API","LangChain","RAG","Agentic AI","MCP"],',
            '  "databases": ["PostgreSQL","Supabase","Firebase","Redis","Prisma"],',
            '  "infrastructure": ["Docker","GitHub Actions","Vercel","Render"],',
            '  "blockchain": ["Solidity","Ethereum","Hardhat","Web3.js"]',
            "}}",
          ],
          type: "success",
        });
        return;
      }
      addHistory({ output: [`curl: (6) Could not resolve host: ${args[0]}`], type: "error" });
      return;
    }

    if (command === "ping") {
      if (args[0] === "google.com" || args[0] === "google") {
        addHistory({
          output: [
            `PING ${args[0]} (142.250.182.46): 56 data bytes`,
            "64 bytes from 142.250.182.46: icmp_seq=0 ttl=64 time=1ms",
            "64 bytes from 142.250.182.46: icmp_seq=1 ttl=64 time=1ms",
            "64 bytes from 142.250.182.46: icmp_seq=2 ttl=64 time=1ms",
            "",
            "--- google.com ping statistics ---",
            "3 packets transmitted, 3 received, 0% packet loss",
            "round-trip min/avg/max = 1/1/1 ms (he's too fast)",
          ],
          type: "success",
        });
        return;
      }
      addHistory({ output: [`ping: ${args[0]}: Name or service not known`], type: "error" });
      return;
    }

    if (command === "ssh") {
      if (args[0] && args[0].includes("nilesh")) {
        addHistory({
          output: [
            "Connecting to nilesh@portfolio.dev...",
            "Authenticating with public key...",
            "",
            "Connection established. Welcome to the mainframe.",
            "Access level: GOD MODE",
            "",
            "Warning: You have entered the mind of a serial builder.",
            "Proceed with awe.",
          ],
          type: "success",
        });
        return;
      }
      addHistory({ output: [`ssh: connect to host ${args[0]} port 22: Connection refused`], type: "error" });
      return;
    }

    /* ── portfolio.sh easter egg ── */
    if (
      trimmed === "./portfolio.sh" ||
      trimmed === "bash portfolio.sh" ||
      trimmed === "sh portfolio.sh" ||
      trimmed === "./portfolio.sh --run"
    ) {
      addHistory({
        output: [
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
        ],
        type: "success",
      });
      return;
    }

    if (trimmed.includes("sudo rm -rf") && trimmed.includes("boring-portfolio")) {
      addHistory({
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
      addHistory({ output: ["[sudo] password for nilesh:", "Sorry, try again.", "sudo: 3 incorrect password attempts"], type: "error" });
      return;
    }

    addHistory({
      output: [`${command}: command not found`, "Type 'help' for available commands."],
      type: "error",
    });
  }, [addHistory, setLocation]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
        const match = projects.find((p) => p.id.startsWith(partial));
        if (match) {
          const words = input.split(" ");
          words[words.length - 1] = match.id;
          setInput(words.join(" "));
        }
      }
    }
  };

  const getLineColor = (type?: string) => {
    if (type === "error") return "text-red-400";
    if (type === "success") return "text-[#00ff88]";
    if (type === "system") return "text-[#00d4ff]";
    if (type === "info") return "text-[#a0aec0]";
    return "text-[#e2e8f0]";
  };

  return (
    <div className="relative h-screen w-full terminal-body flex flex-col overflow-hidden">
      <div className="terminal-scanlines" />
      <div className="scanline-sweep" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#00ff88]/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#00ff88]/50 text-xs font-mono">NILESH.SH — TERMINAL</span>
        <button
          data-testid="button-back-mode"
          onClick={() => setLocation("/")}
          className="text-[#a0aec0] hover:text-[#00d4ff] text-xs font-mono transition-colors cursor-none"
        >
          [X] EXIT
        </button>
      </div>

      {nano.open && (
        <NanoViewer project={nano.project} onClose={() => setNano({ open: false })} />
      )}

      {/* Terminal output */}
      <div
        className="relative z-10 flex-1 overflow-y-auto p-4 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input !== undefined && (
              <div className="text-[#00ff88] font-mono text-sm">
                <span className="text-[#00d4ff]">{getPrompt()}</span>{" "}
                <span className="text-white">{entry.input}</span>
              </div>
            )}
            {Array.isArray(entry.output)
              ? entry.output.map((line, j) => (
                  <div key={j} className={`font-mono text-sm whitespace-pre ${getLineColor(entry.type)}`}>
                    {line}
                  </div>
                ))
              : (
                <div className={`font-mono text-sm ${getLineColor(entry.type)}`}>{entry.output}</div>
              )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-t border-[#00ff88]/10 bg-[#0d0d0d]">
        <span className="text-[#00d4ff] font-mono text-sm whitespace-nowrap">{getPrompt()}</span>
        <input
          ref={inputRef}
          data-testid="input-terminal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white font-mono text-sm outline-none caret-[#00ff88] cursor-none"
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
        <span className="cursor-blink text-[#00ff88] font-mono">_</span>
      </div>
    </div>
  );
}
