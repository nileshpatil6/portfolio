import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

/* ─── Category buckets ─── */
const BUCKETS = [
  { label: "AI & Web Platforms",     emoji: "◈", ids: ["triponbuddy","yukti-ai","roofvision","ai-social","dataverseai","text2db","finadvise"] },
  { label: "Mobile & Machine Learning", emoji: "◉", ids: ["mediassist","detox-ai","mindread","promptinject","multiagent-rag","rag-pinecone"] },
  { label: "Blockchain & Enterprise", emoji: "⬡", ids: ["agentic-commerce","college-erp"] },
  { label: "Freelance & Production",  emoji: "◎", ids: ["prasanhom","unyfiny","akcarrentals","cmn"] },
];

/* ─── Typewriter hook ─────────────────────────────────── */
function useTypewriter(text: string, active: boolean, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);
  return displayed;
}

/* ─── Hover Popup ─────────────────────────────────────── */
function HoverPopup({ project, visible }: { project: Project; visible: boolean }) {
  const name     = useTypewriter(project.name,    visible, 28);
  const tagline  = useTypewriter(project.tagline, visible, 18);
  const desc     = useTypewriter(project.description.slice(0, 130) + "…", visible && name.length === project.name.length, 9);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex flex-col justify-end z-20 pointer-events-none"
      style={{ borderRadius: "inherit" }}
    >
      {/* Frosted overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 55%, transparent 100%)",
        borderRadius: "inherit",
      }} />

      <div className="relative z-10 p-5 space-y-2">
        {/* Name typewriter */}
        <h3 className="font-serif text-white leading-tight" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 600, minHeight: "1.5em" }}>
          {name}
          {name.length < project.name.length && visible && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: "var(--fg-muted)" }}>|</motion.span>
          )}
        </h3>

        {/* Tagline */}
        <p className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", minHeight: "1.2em" }}>
          {tagline}
          {tagline.length < project.tagline.length && name.length === project.name.length && visible && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: "var(--fg-muted)" }}>|</motion.span>
          )}
        </p>

        {/* Description */}
        {desc && (
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {desc}
          </p>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tech.slice(0, 4).map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.2 }}
              style={{
                fontSize: "0.55rem", padding: "0.15rem 0.5rem",
                borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)",
                fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
              }}
            >{t}</motion.span>
          ))}
          {project.tech.length > 4 && (
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: visible ? 0.5 : 0 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", alignSelf: "center", fontFamily: "var(--font-mono)" }}
            >+{project.tech.length - 4}</motion.span>
          )}
        </div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 pt-1 pointer-events-auto"
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-mono cursor-none"
              style={{ color: "#22c55e", textDecoration: "none" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-mono cursor-none"
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
            >
              ⌥ Repo
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Project Card ────────────────────────────────────── */
function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = useCallback(() => {
    hoverTimer.current = setTimeout(() => setPopupVisible(true), 450);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setPopupVisible(false);
  }, []);

  return (
    <motion.div
      className="project-card group relative overflow-hidden rounded-2xl cursor-none"
      style={{
        gridRow: index % 5 === 0 ? "span 2" : "span 1",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-color)",
      }}
      whileHover={{ scale: 1.012, transition: { duration: 0.25 } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* SVG illustration */}
      <div style={{
        aspectRatio: index % 5 === 0 ? "16/9" : "4/3",
        overflow: "hidden",
      }}>
        <ProjectMockup
          projectId={project.id}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Default info (bottom strip) */}
      <div className="p-4" style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate" style={{ color: "var(--fg)" }}>{project.name}</p>
            <p className="font-mono text-xs truncate mt-0.5" style={{ color: "var(--fg-muted)", fontSize: "0.6rem" }}>{project.tagline}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {project.liveUrl && (
              <span style={{
                fontSize: "0.55rem", padding: "0.1rem 0.5rem", borderRadius: "999px",
                border: "1px solid #22c55e40", color: "#22c55e",
                fontFamily: "var(--font-mono)", whiteSpace: "nowrap",
              }}>● Live</span>
            )}
            <span style={{
              fontSize: "0.55rem", padding: "0.1rem 0.5rem", borderRadius: "999px",
              border: "1px solid var(--border-color)", color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}>{project.category}</span>
          </div>
        </div>
      </div>

      {/* Hover popup overlay */}
      <HoverPopup project={project} visible={popupVisible} />
    </motion.div>
  );
}

/* ─── Full-screen Modal ───────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.88 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}
      >
        <div className="aspect-[16/8] overflow-hidden rounded-t-2xl">
          <ProjectMockup projectId={project.id} className="w-full h-full" />
        </div>
        <div className="p-8">
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border cursor-none text-sm font-mono"
            style={{ border: "1px solid var(--border-color)", color: "var(--fg-muted)", background: "var(--bg-elevated)" }}>✕</button>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-3xl" style={{ color: "var(--fg)", fontWeight: 600 }}>{project.name}</h2>
              <p className="section-label mt-1">{project.tagline}</p>
            </div>
            <span className="skill-tag flex-shrink-0">{project.category}</span>
          </div>
          {project.highlight && (
            <div className="mb-5 px-4 py-2.5 rounded-lg text-sm font-mono"
              style={{ background: "var(--bg)", border: "1px solid var(--border-color)", color: "var(--fg-muted)" }}>
              ★ {project.highlight}
            </div>
          )}
          <p className="leading-relaxed mb-6" style={{ color: "var(--fg-muted)", fontSize: "0.95rem" }}>{project.description}</p>
          <div className="mb-6">
            <p className="section-label mb-3">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => <span key={t} className="skill-tag">{t}</span>)}
            </div>
          </div>
          <div className="flex gap-3">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">View live ↗</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub ↗</a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Bucket Section ─────────────────────────────────── */
function ProjectBuckets({ onSelect }: { onSelect: (p: Project) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bucket label slides in
      gsap.utils.toArray<HTMLElement>(".bucket-label").forEach(el => {
        gsap.from(el, {
          x: -60, opacity: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        });
      });

      // Cards stagger with alternating directions
      gsap.utils.toArray<HTMLElement>(".bucket-row").forEach(row => {
        const cards = row.querySelectorAll(".project-card-wrap");
        gsap.from(cards, {
          y: 60, opacity: 0, scale: 0.9, rotateX: 6,
          stagger: { each: 0.08, from: "start" },
          duration: 1, ease: "expo.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-20 px-6 md:px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto space-y-28">
        {BUCKETS.map((bucket, bi) => {
          const bucketProjects = bucket.ids.map(id => projects.find(p => p.id === id)!).filter(Boolean);
          return (
            <div key={bucket.label}>
              {/* Bucket header */}
              <div className="bucket-label flex items-baseline gap-5 mb-10">
                <span className="font-mono" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--border-color)", lineHeight: 1 }}>
                  {String(bi + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif" style={{
                    fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                    fontWeight: 300, fontStyle: "italic",
                    color: "var(--fg)", lineHeight: 1.1,
                  }}>
                    {bucket.label}
                  </h3>
                  <p className="section-label mt-1">{bucketProjects.length} projects</p>
                </div>
                <div className="flex-1 h-px ml-4" style={{ background: "var(--border-color)" }} />
              </div>

              {/* Masonry-ish grid */}
              <div
                className="bucket-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gridAutoRows: "200px",
                  gap: "12px",
                }}
              >
                {bucketProjects.map((p, i) => (
                  <div
                    key={p.id}
                    className="project-card-wrap"
                    style={{
                      gridRow: i % 5 === 0 ? "span 2" : "span 1",
                    }}
                  >
                    <ProjectCard project={p} index={i} onSelect={onSelect} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".projects-headline span", {
        y: 80, opacity: 0,
        stagger: 0.1, duration: 1.2, ease: "expo.out",
        scrollTrigger: {
          trigger: ".projects-headline",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
      // Counter
      gsap.from(".projects-counter", {
        x: 60, opacity: 0, duration: 1, ease: "expo.out",
        scrollTrigger: {
          trigger: ".projects-counter",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative">
      {/* Section header */}
      <div className="pt-24 pb-16 px-6 md:px-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="divider mb-20" />
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="section-label">04 / 07</span>
                <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
                <span className="section-label">Work</span>
              </div>
              <div className="projects-headline" style={{ overflow: "hidden" }}>
                {["Things", "I've", "shipped."].map((word, i) => (
                  <span
                    key={i}
                    className="font-serif inline-block mr-4"
                    style={{
                      fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                      fontWeight: i === 2 ? 800 : 300,
                      fontStyle: i !== 2 ? "italic" : "normal",
                      color: "var(--fg)",
                      lineHeight: 1.05,
                      display: "inline-block",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="projects-counter text-right">
              <div className="font-mono" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 700, color: "var(--border-color)", lineHeight: 1 }}>
                {projects.length}
              </div>
              <p className="section-label">projects total</p>
              <p className="section-label mt-1">most in production</p>
            </div>
          </div>
        </div>
      </div>

      {/* All projects bucketed */}
      <ProjectBuckets onSelect={setSelected} />

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
