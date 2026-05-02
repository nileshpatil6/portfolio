import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

/* ─── Buckets ────────────────────────────────────────── */
const BUCKETS = [
  { label: "AI & Web",       ids: ["triponbuddy","yukti-ai","roofvision","ai-social","dataverseai","text2db","finadvise"] },
  { label: "Mobile & ML",    ids: ["mediassist","detox-ai","mindread","promptinject","multiagent-rag","rag-pinecone"] },
  { label: "Blockchain",     ids: ["agentic-commerce","college-erp"] },
  { label: "Freelance",      ids: ["prasanhom","unyfiny","akcarrentals","cmn"] },
];

/* ─── Typewriter ─────────────────────────────────────── */
function useTypewriter(text: string, active: boolean, speed = 10) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) { setOut(""); return; }
    setOut(""); let i = 0;
    const id = setInterval(() => { i++; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(id); }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

/* ─── Single Row ─────────────────────────────────────── */
function ProjectRow({
  project, rowIndex, globalIndex,
}: { project: Project; rowIndex: number; globalIndex: number }) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "0px 0px -60px 0px" });

  const previewText = project.description.length > 160
    ? project.description.slice(0, 157) + "…"
    : project.description;
  const typed = useTypewriter(previewText, open, 8);

  const handleEnter = useCallback(() => setOpen(true), []);
  const handleLeave = useCallback(() => setOpen(false), []);

  return (
    <motion.div
      ref={rowRef}
      initial={{ x: -48, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: -48, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: rowIndex * 0.055 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ borderBottom: "1px solid var(--border-color)", cursor: "none" }}
    >
      {/* ── Collapsed row header ── */}
      <motion.div
        className="flex items-center gap-0 relative overflow-hidden"
        animate={{ paddingTop: open ? "20px" : "16px", paddingBottom: open ? "20px" : "16px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingLeft: "0", paddingRight: "24px" }}
      >
        {/* Hover fill bg */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: open ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "var(--fg)", transformOrigin: "left", zIndex: 0 }}
        />

        {/* Index */}
        <motion.span
          className="relative z-10 font-mono flex-shrink-0 text-right"
          animate={{ color: open ? "rgba(255,255,255,0.2)" : "var(--border-color)" }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: "0.7rem", width: "56px", paddingRight: "12px", letterSpacing: "0.05em" }}
        >
          {String(globalIndex + 1).padStart(2, "0")}
        </motion.span>

        {/* Name */}
        <motion.span
          className="relative z-10 font-serif flex-1 min-w-0 truncate"
          animate={{ color: open ? "var(--bg)" : "var(--fg)" }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
            fontWeight: 500, lineHeight: 1.1,
          }}
        >
          {project.name}
        </motion.span>

        {/* Right meta */}
        <div className="relative z-10 flex items-center gap-4 flex-shrink-0 ml-6">
          <motion.span
            className="font-mono hidden md:block"
            animate={{ color: open ? "rgba(255,255,255,0.45)" : "var(--fg-muted)" }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            {project.category}
          </motion.span>

          {project.liveUrl && (
            <motion.span
              animate={{ color: open ? "#4ade80" : "#22c55e" }}
              className="font-mono"
              style={{ fontSize: "0.65rem" }}
            >
              ● Live
            </motion.span>
          )}

          <motion.span
            animate={{
              rotate: open ? 45 : 0,
              color: open ? "rgba(255,255,255,0.5)" : "var(--fg-muted)",
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "1.4rem", display: "inline-block", lineHeight: 1 }}
          >
            +
          </motion.span>
        </div>
      </motion.div>

      {/* ── Expanded panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", background: "var(--fg)" }}
          >
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "1fr clamp(200px, 28vw, 360px)",
                padding: "24px 24px 32px calc(56px + 8px)",
              }}
            >
              {/* Left: text */}
              <div className="space-y-5">
                <p
                  className="font-mono leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", minHeight: "4.5em" }}
                >
                  {typed}
                  {typed.length < previewText.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.55 }}
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >▋</motion.span>
                  )}
                </p>

                <motion.div
                  className="flex flex-wrap gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                >
                  {project.tech.slice(0, 6).map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                      style={{
                        fontSize: "0.6rem", padding: "0.2rem 0.65rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                  {project.tech.length > 6 && (
                    <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)", alignSelf: "center" }}>
                      +{project.tech.length - 6} more
                    </span>
                  )}
                </motion.div>

                <motion.div
                  className="flex items-center gap-6"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontSize: "0.75rem", color: "#4ade80", fontFamily: "var(--font-mono)", textDecoration: "none", cursor: "none" }}
                    >
                      Live site ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)", textDecoration: "none", cursor: "none" }}
                    >
                      GitHub →
                    </a>
                  )}
                  {project.highlight && (
                    <span style={{ fontSize: "0.65rem", color: "#fbbf24", fontFamily: "var(--font-mono)" }}>
                      ★ {project.highlight}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Right: SVG illustration — clips in from the right */}
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0 round 12px)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0 round 12px)", opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                style={{ borderRadius: 12, overflow: "hidden", alignSelf: "start" }}
              >
                <ProjectMockup projectId={project.id} className="w-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Projects Section ───────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inViewHeader = useInView(headerRef, { once: true });

  // Running index across all buckets
  let globalIdx = 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-num-bg", {
        scale: 0.7, opacity: 0, duration: 1.5, ease: "expo.out",
        scrollTrigger: {
          trigger: ".proj-num-bg",
          start: "top 85%", toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ background: "var(--bg)" }}>
      {/* ── Section header ── */}
      <div className="pt-24 pb-12 px-6 md:px-16 max-w-7xl mx-auto" ref={headerRef}>
        <div className="divider mb-20" />

        <div className="flex items-end justify-between gap-8 flex-wrap mb-4">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={inViewHeader ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label">04 / 07</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-serif"
                initial={{ y: 80, opacity: 0 }}
                animate={inViewHeader ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  fontWeight: 800, color: "var(--fg)", lineHeight: 0.95,
                }}
              >
                Things I've<br />
                <span style={{ fontWeight: 300, fontStyle: "italic" }}>built.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inViewHeader ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="proj-num-bg text-right"
          >
            <div className="font-mono" style={{
              fontSize: "clamp(4rem, 10vw, 8rem)",
              fontWeight: 900,
              color: "var(--border-color)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {projects.length}
            </div>
            <p className="section-label">projects shipped</p>
          </motion.div>
        </div>

        <motion.p
          className="text-sm max-w-lg"
          initial={{ opacity: 0 }}
          animate={inViewHeader ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ color: "var(--fg-muted)" }}
        >
          Hover any row to expand. Most are in production with real users.
        </motion.p>
      </div>

      {/* ── Project list ── */}
      <div className="px-6 md:px-16 pb-32 max-w-7xl mx-auto">
        {BUCKETS.map((bucket) => {
          const bucketProjects = bucket.ids
            .map(id => projects.find(p => p.id === id)!)
            .filter(Boolean);

          return (
            <div key={bucket.label} className="mb-16">
              {/* Bucket label */}
              <div className="flex items-center gap-4 mb-0 py-4"
                style={{ borderTop: "2px solid var(--fg)" }}>
                <span className="font-mono" style={{
                  fontSize: "0.65rem", color: "var(--fg)", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                }}>
                  {bucket.label}
                </span>
                <span className="font-mono" style={{
                  fontSize: "0.6rem", color: "var(--fg-muted)",
                  letterSpacing: "0.1em",
                }}>
                  — {bucketProjects.length}
                </span>
              </div>

              {/* Rows */}
              <div>
                {bucketProjects.map((p, rowIdx) => {
                  const gi = globalIdx++;
                  return (
                    <ProjectRow
                      key={p.id}
                      project={p}
                      rowIndex={rowIdx}
                      globalIndex={gi}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
