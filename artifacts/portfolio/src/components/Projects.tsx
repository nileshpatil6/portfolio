import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

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
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Illustration ── */}
      <div
        className="relative overflow-hidden flex-1"
        style={{ borderRadius: 18, minHeight: 0, background: "#0a0a0a" }}
      >
        <ProjectMockup projectId={active.id} className="w-full h-full" />

        {/* Color accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: active.color, opacity: 0.9 }} />

        {/* Bottom gradient scrim */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }} />

        {/* Floating category badge */}
        <div className="absolute top-4 right-4">
          <span
            className="font-mono"
            style={{
              fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 999,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.7)",
            }}
          >{active.category}</span>
        </div>

        {/* Live badge */}
        {active.liveUrl && (
          <div className="absolute top-4 left-4">
            <span className="font-mono flex items-center gap-1.5"
              style={{
                fontSize: "0.6rem", padding: "4px 10px", borderRadius: 999,
                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                color: "#4ade80",
              }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Live
            </span>
          </div>
        )}
      </div>

      {/* ── Info strip ── */}
      <div className="pt-5 space-y-3">
        {/* Name + tagline */}
        <div>
          <div className="flex items-start gap-3">
            <div
              className="mt-1 flex-shrink-0"
              style={{ width: 3, height: "100%", minHeight: 28, borderRadius: 2, background: active.color }}
            />
            <div>
              <h3
                className="font-serif leading-tight"
                style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", fontWeight: 600, color: "var(--fg)" }}
              >
                {active.name}
              </h3>
              <p
                className="font-mono mt-0.5"
                style={{ fontSize: "0.68rem", color: "var(--fg-muted)", letterSpacing: "0.04em" }}
              >
                {active.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Highlight */}
        {active.highlight && (
          <div
            className="font-mono"
            style={{
              fontSize: "0.62rem", padding: "6px 12px", borderRadius: 8,
              background: "var(--bg-elevated)", border: `1px solid ${active.color}40`,
              color: "var(--fg-muted)",
            }}
          >
            ★ {active.highlight}
          </div>
        )}

        {/* Description */}
        <p style={{
          fontSize: "0.78rem", lineHeight: 1.65, color: "var(--fg-muted)",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {active.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5">
          {active.tech.slice(0, 5).map(t => (
            <span
              key={t}
              className="font-mono"
              style={{
                fontSize: "0.58rem", padding: "3px 8px", borderRadius: 999,
                border: "1px solid var(--border-color)", color: "var(--fg-muted)",
              }}
            >{t}</span>
          ))}
          {active.tech.length > 5 && (
            <span
              className="font-mono"
              style={{ fontSize: "0.58rem", color: "var(--fg-subtle)", alignSelf: "center" }}
            >+{active.tech.length - 5}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-1">
          {active.liveUrl && (
            <a
              href={active.liveUrl} target="_blank" rel="noopener noreferrer"
              className="cursor-none font-mono flex items-center gap-2 group/link"
              style={{
                fontSize: "0.72rem", color: active.color,
                textDecoration: "none",
              }}
            >
              <span
                className="group-hover/link:scale-110 transition-transform"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 24, height: 24, borderRadius: "50%",
                  border: `1.5px solid ${active.color}`, fontSize: "0.7rem",
                }}
              >↗</span>
              Live site
            </a>
          )}
          {active.githubUrl && (
            <a
              href={active.githubUrl} target="_blank" rel="noopener noreferrer"
              className="cursor-none font-mono flex items-center gap-2"
              style={{ fontSize: "0.72rem", color: "var(--fg-muted)", textDecoration: "none" }}
            >
              <span
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 24, height: 24, borderRadius: "50%",
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
  project, globalIndex, isActive, onHover,
}: { project: Project; globalIndex: number; isActive: boolean; onHover: () => void }) {
  return (
    <motion.div
      onMouseEnter={onHover}
      className="relative overflow-hidden"
      style={{ borderBottom: "1px solid var(--border-color)", cursor: "none" }}
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

/* ─── Main ─────────────────────────────────────────────── */
export default function Projects() {
  const [activeId, setActiveId] = useState(PROJ_ROWS[0].project.id);
  const active = projects.find(p => p.id === activeId)!;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

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
    const els = listRef.current.querySelectorAll<HTMLElement>("[data-pid]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId((e.target as HTMLElement).dataset.pid!); });
    }, { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <div className="pt-24 pb-12 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="divider mb-20" />

        <div className="flex items-end justify-between gap-8 flex-wrap mb-2">
          {/* Headline */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-label">04 / 07</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </div>
            <div className="proj-headline" style={{ overflow: "hidden" }}>
              {["Things", "I've", "built."].map((w, i) => (
                <span
                  key={i}
                  className={`font-serif inline-block ${i > 0 ? "ml-4" : ""}`}
                  style={{
                    fontSize: "clamp(3rem, 7vw, 6rem)",
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
              style={{ fontSize: "clamp(4rem, 9vw, 7rem)", fontWeight: 900, color: "var(--border-color)", lineHeight: 1, letterSpacing: "-0.05em" }}
            >{projects.length}</div>
            <p className="section-label">shipped projects</p>
          </div>
        </div>
      </div>

      {/* ── Split ── */}
      <div
        className="px-6 md:px-16 pb-28 max-w-7xl mx-auto"
        style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: "clamp(24px, 4vw, 56px)", alignItems: "start" }}
      >
        {/* LEFT */}
        <div ref={listRef}>
          {ROWS.map((row, i) => {
            if (row.type === "bucket") {
              return (
                <div
                  key={row.label + i}
                  className="flex items-center gap-4"
                  style={{
                    paddingTop: i === 0 ? 0 : "2.5rem",
                    paddingBottom: "0.5rem",
                    marginBottom: "0",
                    borderTop: i === 0 ? "none" : "none",
                  }}
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
                  onHover={() => setActiveId(row.project.id)}
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div
          style={{
            position: "sticky",
            top: "calc(60px + 24px)",
            height: "calc(100vh - 108px)",
            minHeight: 400,
          }}
        >
          <AnimatePresence mode="wait">
            <PreviewPanel key={activeId} active={active} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
