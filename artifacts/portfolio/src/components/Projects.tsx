import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

const BUCKETS = [
  { label: "AI & Web",          ids: ["triponbuddy","yukti-ai","roofvision","ai-social","dataverseai","text2db","finadvise"] },
  { label: "Mobile & ML",       ids: ["mediassist","detox-ai","mindread","promptinject","multiagent-rag","rag-pinecone"] },
  { label: "Blockchain",        ids: ["agentic-commerce","college-erp"] },
  { label: "Freelance",         ids: ["prasanhom","unyfiny","akcarrentals","cmn"] },
];

/* build ordered list with bucket separators */
type Row = { type: "project"; project: Project; globalIndex: number } | { type: "bucket"; label: string };
function buildRows(): Row[] {
  const rows: Row[] = [];
  let gi = 0;
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
const PROJECT_ROWS = ROWS.filter(r => r.type === "project") as Extract<Row, { type: "project" }>[];

/* ─── Preview Panel ───────────────────────────────────── */
function PreviewPanel({ active }: { active: Project }) {
  return (
    <div key={active.id} className="h-full flex flex-col">
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 overflow-hidden"
        style={{ borderRadius: 16, minHeight: 0 }}
      >
        <ProjectMockup projectId={active.id} className="w-full h-full" />
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="pt-6 space-y-3"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif" style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 600, color: "var(--fg)", lineHeight: 1.1,
            }}>{active.name}</h3>
            <p className="font-mono mt-1" style={{ fontSize: "0.7rem", color: "var(--fg-muted)", letterSpacing: "0.06em" }}>
              {active.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-end flex-shrink-0">
            {active.liveUrl && (
              <span style={{ fontSize: "0.6rem", color: "#22c55e", fontFamily: "var(--font-mono)" }}>● Live</span>
            )}
            <span className="skill-tag" style={{ fontSize: "0.6rem" }}>{active.category}</span>
          </div>
        </div>

        {active.highlight && (
          <p className="font-mono" style={{ fontSize: "0.65rem", color: "var(--fg-muted)", background: "var(--bg)", padding: "6px 10px", borderRadius: 6, border: "1px solid var(--border-color)" }}>
            ★ {active.highlight}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {active.tech.slice(0, 5).map(t => (
            <span key={t} className="skill-tag" style={{ fontSize: "0.58rem" }}>{t}</span>
          ))}
          {active.tech.length > 5 && (
            <span className="skill-tag" style={{ fontSize: "0.58rem" }}>+{active.tech.length - 5}</span>
          )}
        </div>

        <div className="flex items-center gap-5 pt-1">
          {active.liveUrl && (
            <a href={active.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary cursor-none" style={{ fontSize: "0.7rem", padding: "6px 16px" }}>
              Live ↗
            </a>
          )}
          {active.githubUrl && (
            <a href={active.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn-outline cursor-none" style={{ fontSize: "0.7rem", padding: "6px 16px" }}>
              GitHub →
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Project List Row ────────────────────────────────── */
function ProjectListRow({
  project, globalIndex, isActive, onHover,
}: {
  project: Project; globalIndex: number; isActive: boolean; onHover: () => void;
}) {
  return (
    <motion.div
      className="project-list-row group relative"
      onMouseEnter={onHover}
      style={{
        borderBottom: "1px solid var(--border-color)",
        cursor: "none",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (globalIndex % 6) * 0.04 }}
    >
      {/* Active bg sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "var(--fg)", transformOrigin: "left", zIndex: 0 }}
      />

      <div className="relative z-10 flex items-center gap-3 py-3.5 px-0 pr-4">
        {/* Index */}
        <motion.span
          animate={{ color: isActive ? "rgba(255,255,255,0.2)" : "var(--border-color)" }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "0.6rem", width: 36, textAlign: "right", fontFamily: "var(--font-mono)", flexShrink: 0 }}
        >
          {String(globalIndex + 1).padStart(2, "0")}
        </motion.span>

        {/* Name */}
        <motion.span
          animate={{ color: isActive ? "var(--bg)" : "var(--fg)" }}
          transition={{ duration: 0.2 }}
          className="font-serif flex-1 truncate"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)", fontWeight: 500 }}
        >
          {project.name}
        </motion.span>

        {/* Live dot */}
        {project.liveUrl && (
          <motion.span
            animate={{ color: isActive ? "#4ade80" : "#22c55e" }}
            style={{ fontSize: "0.6rem", flexShrink: 0 }}
          >●</motion.span>
        )}

        {/* Arrow */}
        <motion.span
          animate={{
            x: isActive ? 4 : 0,
            color: isActive ? "rgba(255,255,255,0.4)" : "var(--fg-muted)",
          }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "0.9rem", flexShrink: 0 }}
        >→</motion.span>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────── */
export default function Projects() {
  const [activeId, setActiveId] = useState(PROJECT_ROWS[0].project.id);
  const activeProject = projects.find(p => p.id === activeId)!;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-hdr", {
        y: 60, opacity: 0, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ".projects-hdr", start: "top 88%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Intersection-based auto-activate while scrolling the list */
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll<HTMLElement>("[data-project-id]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveId(e.target.getAttribute("data-project-id")!);
      });
    }, { root: listRef.current, threshold: 0.6 });
    rows.forEach(r => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <div className="pt-24 pb-10 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="divider mb-20" />
        <div className="projects-hdr flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="section-label">04 / 07</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800, lineHeight: 0.95, color: "var(--fg)",
            }}>
              Things I've<br />
              <span style={{ fontWeight: 300, fontStyle: "italic" }}>built.</span>
            </h2>
          </div>
          <p className="section-label text-right" style={{ maxWidth: 220 }}>
            Hover any row.<br />
            {projects.length} projects — most live.
          </p>
        </div>
      </div>

      {/* ── Split view ── */}
      <div
        className="px-6 md:px-16 pb-24 max-w-7xl mx-auto"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}
      >
        {/* LEFT: scrollable list */}
        <div ref={listRef}>
          {ROWS.map((row, i) => {
            if (row.type === "bucket") {
              return (
                <div key={row.label + i} className="flex items-center gap-3 pt-8 pb-3"
                  style={{ borderTop: i === 0 ? "2px solid var(--fg)" : "none" }}>
                  <span className="font-mono" style={{
                    fontSize: "0.6rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "var(--fg)", fontWeight: 700,
                  }}>{row.label}</span>
                  <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
                </div>
              );
            }
            return (
              <div key={row.project.id} data-project-id={row.project.id}>
                <ProjectListRow
                  project={row.project}
                  globalIndex={row.globalIndex}
                  isActive={activeId === row.project.id}
                  onHover={() => setActiveId(row.project.id)}
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT: sticky preview */}
        <div style={{ position: "sticky", top: 24, height: "calc(100vh - 48px)" }}>
          <AnimatePresence mode="wait">
            <PreviewPanel key={activeId} active={activeProject} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
