"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

/* ─── Mobile detection hook ───────────────────────────── */
function useMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

/* ─── TypeWriter ───────────────────────────────────────── */
function TypeWriter({
  text, speed = 14, delay = 0, className, style,
}: {
  text: string; speed?: number; delay?: number;
  className?: string; style?: React.CSSProperties;
}) {
  const [shown, setShown] = useState("");
  const [done, setDone]   = useState(false);
  useEffect(() => {
    setShown(""); setDone(false);
    let i = 0;
    const id = setTimeout(() => {
      const tick = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) { clearInterval(tick); setDone(true); }
      }, speed);
      return () => clearInterval(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [text, speed, delay]);
  return (
    <span className={className} style={style}>
      {shown}
      {!done && (
        <span
          style={{ display: "inline-block", width: "1px", height: "0.85em",
            background: "currentColor", verticalAlign: "middle",
            marginLeft: 2, animation: "blink 0.6s step-end infinite" }}
        />
      )}
    </span>
  );
}

const BUCKETS = [
  { label: "AI & Web",     ids: ["triponbuddy","yukti-ai","roofvision","ai-social","dataverseai","text2db","finadvise"] },
  { label: "Mobile & ML", ids: ["mediassist","detox-ai","mindread","promptinject","multiagent-rag","rag-pinecone"] },
  { label: "Blockchain",  ids: ["agentic-commerce","college-erp"] },
  { label: "Freelance",   ids: ["prasanhom","unyfiny","akcarrentals","cmn"] },
];

type Row =
  | { type: "project"; project: Project; globalIndex: number }
  | { type: "bucket";  label: string };

function buildRows(): Row[] {
  const rows: Row[] = []; let gi = 0;
  for (const b of BUCKETS) {
    rows.push({ type: "bucket", label: b.label });
    for (const id of b.ids) {
      const p = projects.find(x => x.id === id);
      if (p) rows.push({ type: "project", project: p, globalIndex: gi++ });
    }
  }
  return rows;
}
const ROWS = buildRows();
const PROJ_ROWS = ROWS.filter(r => r.type === "project") as Extract<Row,{type:"project"}>[];

/* ─── Preview Panel ────────────────────────────────────── */
function PreviewPanel({ active }: { active: Project }) {
  return (
    <motion.div
      key={active.id}
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Illustration — fixed 220px ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: 220, borderRadius: 14, background: "#0a0a0a" }}
      >
        <ProjectMockup projectId={active.id} className="w-full h-full" />

        {/* top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: active.color }} />

        {/* scrim */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 100%)" }} />

        {/* category */}
        <div className="absolute top-3 right-3">
          <span className="font-mono" style={{
            fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: 999,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.65)",
          }}>{active.category}</span>
        </div>

        {/* live */}
        {active.liveUrl && (
          <div className="absolute top-3 left-3">
            <span className="font-mono flex items-center gap-1.5" style={{
              fontSize: "0.55rem", padding: "3px 9px", borderRadius: 999,
              background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "#4ade80",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Live
            </span>
          </div>
        )}
      </div>

      {/* ── Info — scrollable remainder ── */}
      <div className="flex-1 overflow-y-auto pt-4 space-y-2.5" style={{ scrollbarWidth: "none" }}>

        {/* Name */}
        <div className="flex items-start gap-2.5">
          <div className="flex-shrink-0 mt-1" style={{ width: 3, minHeight: 22, borderRadius: 2, background: active.color }} />
          <div>
            <h3 className="font-serif leading-tight" style={{
              fontSize: "clamp(1.2rem, 2vw, 1.55rem)", fontWeight: 600, color: "var(--fg)",
            }}>
              <TypeWriter text={active.name} speed={22} />
            </h3>
            <p className="font-mono mt-0.5" style={{ fontSize: "0.65rem", color: "var(--fg-muted)", letterSpacing: "0.04em" }}>
              <TypeWriter text={active.tagline} speed={12} delay={80} />
            </p>
          </div>
        </div>

        {/* Highlight */}
        {active.highlight && (
          <div className="font-mono" style={{
            fontSize: "0.6rem", padding: "5px 10px", borderRadius: 7,
            background: "var(--bg-elevated)", border: `1px solid ${active.color}40`,
            color: "var(--fg-muted)",
          }}>
            ★ <TypeWriter text={active.highlight} speed={10} delay={160} />
          </div>
        )}

        {/* Description */}
        <p style={{ fontSize: "0.76rem", lineHeight: 1.6, color: "var(--fg-muted)" }}>
          <TypeWriter text={active.description} speed={8} delay={active.highlight ? 220 : 160} />
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {active.tech.slice(0, 6).map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + ti * 0.04, duration: 0.3 }}
              className="font-mono"
              style={{
                fontSize: "0.57rem", padding: "3px 8px", borderRadius: 999,
                border: "1px solid var(--border-color)", color: "var(--fg-muted)",
              }}
            >{t}</motion.span>
          ))}
          {active.tech.length > 6 && (
            <span className="font-mono" style={{ fontSize: "0.57rem", color: "var(--fg-subtle)", alignSelf: "center" }}>
              +{active.tech.length - 6}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-1">
          {active.liveUrl && (
            <a href={active.liveUrl} target="_blank" rel="noopener noreferrer"
              className="font-mono flex items-center gap-2"
              style={{ fontSize: "0.7rem", color: active.color, textDecoration: "none" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 22, height: 22, borderRadius: "50%",
                border: `1.5px solid ${active.color}`, fontSize: "0.65rem",
              }}>↗</span>
              Live site
            </a>
          )}
          {active.githubUrl && (
            <a href={active.githubUrl} target="_blank" rel="noopener noreferrer"
              className="font-mono flex items-center gap-2"
              style={{ fontSize: "0.7rem", color: "var(--fg-muted)", textDecoration: "none" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 22, height: 22, borderRadius: "50%",
                  border: "1.5px solid var(--border-color)", fontSize: "0.7rem",
                  color: "var(--fg-muted)",
                }}
              >→</span>
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── List Row ─────────────────────────────────────────── */
function ProjectRow({
  project, globalIndex, isActive, onHover, onClick,
}: { project: Project; globalIndex: number; isActive: boolean; onHover: () => void; onClick?: () => void }) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={onClick}
      className="relative overflow-hidden"
      data-cursor-text={project.liveUrl ? "Open live ↗" : "View project"}
      style={{ borderBottom: "1px solid var(--border-color)", cursor: "inherit" }}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (globalIndex % 7) * 0.035 }}
    >
      {/* Ink fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "var(--fg)", transformOrigin: "left", zIndex: 0 }}
      />

      {/* Ghost index */}
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 font-mono pointer-events-none select-none z-0"
        style={{
          fontSize: "3.5rem", fontWeight: 900, lineHeight: 1,
          color: isActive ? "rgba(255,255,255,0.04)" : "var(--border-subtle)",
          transition: "color 0.3s",
        }}
      >
        {String(globalIndex + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 px-2 py-4">

        {/* Color dot */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
          style={{ width: 7, height: 7, borderRadius: "50%", background: project.color }}
        />

        {/* Left: name + tagline */}
        <div className="flex-1 min-w-0">
          <motion.p
            animate={{ color: isActive ? "var(--bg)" : "var(--fg)" }}
            transition={{ duration: 0.2 }}
            className="font-serif leading-tight truncate"
            style={{ fontSize: "clamp(1.15rem, 2.8vw, 1.9rem)", fontWeight: 500 }}
          >
            {project.name}
          </motion.p>

          {/* Tagline expands when active */}
          <motion.div
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 2 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="font-mono" style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>
              {project.tagline}
            </p>
          </motion.div>
        </div>

        {/* Right: live + arrow */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {project.liveUrl && (
            <motion.span
              animate={{ color: isActive ? "#4ade80" : "var(--fg-subtle)" }}
              style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)" }}
            >● LIVE</motion.span>
          )}
          <motion.span
            animate={{ x: isActive ? 5 : 0, color: isActive ? "rgba(255,255,255,0.35)" : "var(--border-color)" }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: "1rem" }}
          >→</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Inline Preview ────────────────────────────── */
function MobileExpandedPanel({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div
        className="p-4"
        style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-color)" }}
      >
        <PreviewPanel active={project} />
      </div>
    </motion.div>
  );
}

/* ─── Main ─────────────────────────────────────────────── */
export default function Projects() {
  const [activeId, setActiveId] = useState(PROJ_ROWS[0].project.id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const active = projects.find(p => p.id === activeId)!;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const isMobile   = useMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-headline > span", {
        y: 90, opacity: 0, stagger: 0.08, duration: 1.3, ease: "expo.out",
        scrollTrigger: { trigger: ".proj-headline", start: "top 88%", toggleActions: "play none none none" },
      });
      gsap.from(".proj-meta-line", {
        x: 50, opacity: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".proj-meta-line", start: "top 90%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const els = Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-pid]"));
    let raf = 0;
    const update = () => {
      const trigger = window.innerHeight * 0.22;
      let candidate: HTMLElement | null = null;
      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        if (top <= trigger) candidate = el;
        else break;
      }
      if (candidate) setActiveId(candidate.dataset.pid!);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleRowClick = (id: string) => {
    if (!isMobile) return;
    setExpandedId(prev => prev === id ? null : id);
    setActiveId(id);
  };

  return (
    <section id="projects" ref={sectionRef} style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <div className="pt-24 pb-12 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="divider mb-20" />

        <div className="flex items-end justify-between gap-8 flex-wrap mb-2">
          {/* Headline */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-label">04 / 08</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </div>
            <div className="proj-headline" style={{ overflow: "hidden" }}>
              {["Things", "I've", "built."].map((w, i) => (
                <span
                  key={i}
                  className={`font-serif inline-block ${i > 0 ? "ml-4" : ""}`}
                  style={{
                    fontSize: "clamp(2.2rem, 7vw, 6rem)",
                    fontWeight: i === 2 ? 800 : 300,
                    fontStyle: i !== 2 ? "italic" : "normal",
                    color: "var(--fg)", lineHeight: 0.95,
                    display: "inline-block",
                  }}
                >{w}</span>
              ))}
            </div>
          </div>

          {/* Big count */}
          <div className="proj-meta-line text-right">
            <div
              className="font-mono"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 900, color: "var(--border-color)", lineHeight: 1, letterSpacing: "-0.05em" }}
            >{projects.length}</div>
            <p className="section-label">shipped projects</p>
          </div>
        </div>
      </div>

      {/* ── Split / List ── */}
      <div
        className="px-6 md:px-16 pb-28 max-w-7xl mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "5fr 4fr",
          gap: "clamp(24px, 4vw, 56px)",
        }}
      >
        {/* LEFT — project list */}
        <div ref={listRef}>
          {ROWS.map((row, i) => {
            if (row.type === "bucket") {
              return (
                <div
                  key={row.label + i}
                  className="flex items-center gap-4"
                  style={{ paddingTop: i === 0 ? 0 : "2.5rem", paddingBottom: "0.5rem" }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.58rem", letterSpacing: "0.25em",
                      textTransform: "uppercase", color: "var(--fg-subtle)", fontWeight: 700,
                    }}
                  >{row.label}</span>
                  <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                </div>
              );
            }
            return (
              <div key={row.project.id} data-pid={row.project.id}>
                <ProjectRow
                  project={row.project}
                  globalIndex={row.globalIndex}
                  isActive={activeId === row.project.id}
                  onHover={() => !isMobile && setActiveId(row.project.id)}
                  onClick={() => handleRowClick(row.project.id)}
                />
                {/* Mobile: inline expanded preview */}
                <AnimatePresence>
                  {isMobile && expandedId === row.project.id && (
                    <MobileExpandedPanel key={row.project.id + "-panel"} project={row.project} />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* RIGHT — sticky preview (desktop only) */}
        {!isMobile && (
          <div style={{ alignSelf: "stretch", position: "relative" }}>
            <div
              style={{
                position: "sticky",
                top: "10vh",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
            >
              <AnimatePresence mode="wait">
                <PreviewPanel key={activeId} active={active} />
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Mobile hint */}
      {isMobile && (
        <p className="px-6 pb-6 section-label" style={{ textAlign: "center" }}>
          Tap any project to expand details
        </p>
      )}
    </section>
  );
}

