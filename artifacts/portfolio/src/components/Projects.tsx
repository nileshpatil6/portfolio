import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

/* ─── Featured projects for the tunnel ─── */
const FEATURED_IDS = ["triponbuddy", "mediassist", "yukti-ai", "college-erp", "detox-ai", "agentic-commerce"];
const featuredProjects = FEATURED_IDS.map(id => projects.find(p => p.id === id)!).filter(Boolean);

/* ─── Category buckets ─── */
const BUCKETS = [
  { label: "AI & Web Platforms", ids: ["triponbuddy","yukti-ai","roofvision","ai-social","dataverseai","text2db","finadvise"] },
  { label: "Mobile & Machine Learning", ids: ["mediassist","detox-ai","mindread","promptinject","multiagent-rag","rag-pinecone"] },
  { label: "Blockchain & Enterprise", ids: ["agentic-commerce","college-erp"] },
  { label: "Freelance & Production", ids: ["prasanhom","unyfiny","akcarrentals","cmn"] },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
          <button onClick={onClose} data-testid="button-close-modal"
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

/* ─── Tunnel Section ─────────────────────────────────── */
function TunnelProjects({ onSelect }: { onSelect: (p: Project) => void }) {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const SCROLL_PER_CARD = 700;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".tunnel-card");
      const totalScroll = SCROLL_PER_CARD * cards.length;

      // Start all invisible + tiny
      gsap.set(cards, { scale: 0.06, autoAlpha: 0, borderRadius: "50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tunnelRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: `+=${totalScroll}`,
        },
      });

      cards.forEach((card) => {
        tl
          // Zoom in from tiny dot → full card (tunnel dive-in)
          .to(card, {
            scale: 1,
            autoAlpha: 1,
            borderRadius: "16px",
            duration: 0.38,
            ease: "power3.in",
          })
          // Hold visible briefly
          .to(card, { duration: 0.08 })
          // Punch through — continue zooming past (exit through the card)
          .to(card, {
            scale: 2.8,
            autoAlpha: 0,
            duration: 0.28,
            ease: "power3.in",
          });
      });

      // Overlay darkens as each card zooms in
      gsap.to(overlayRef.current, {
        opacity: 0.6,
        scrollTrigger: {
          trigger: tunnelRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: 1,
        },
      });

    }, tunnelRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={tunnelRef} className="relative overflow-hidden" style={{ height: "100vh", background: "#050508" }}>
      {/* Dark tunnel overlay */}
      <div ref={overlayRef} className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #000 100%)", opacity: 0 }} />

      {/* Tunnel rings (decorative depth cue) */}
      {[0,1,2,3,4].map(i => (
        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" style={{ transform: `scale(${0.3+i*0.18})`, opacity: 0.06-i*0.01 }}>
          <div style={{ width: "70vw", height: "70vw", maxWidth: 700, maxHeight: 700, border: "1px solid white", borderRadius: "50%" }} />
        </div>
      ))}

      {/* Project cards — stacked in center */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {featuredProjects.map((project) => (
          <button
            key={project.id}
            className="tunnel-card absolute cursor-none"
            style={{
              width: "min(75vw, 680px)",
              aspectRatio: "16/10",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
            }}
            onClick={() => onSelect(project)}
          >
            <ProjectMockup projectId={project.id} className="w-full h-full" />
            {/* Card overlay info */}
            <div className="absolute bottom-0 left-0 right-0 p-5"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)" }}>
              <h3 className="font-serif text-2xl font-semibold text-white">{project.name}</h3>
              <p className="text-sm mt-1 opacity-70 text-white">{project.tagline}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="skill-tag" style={{ fontSize: "0.6rem", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", background: "transparent" }}>{project.category}</span>
                {project.liveUrl && <span className="skill-tag" style={{ fontSize: "0.6rem", color: "#22c55e", borderColor: "#22c55e50", background: "transparent" }}>Live</span>}
                {project.highlight && <span className="skill-tag" style={{ fontSize: "0.6rem", color: "#f59e0b", borderColor: "#f59e0b50", background: "transparent" }}>★ Featured</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
        <p className="section-label" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>scroll to explore</p>
      </div>
    </div>
  );
}

/* ─── Bucket Section ─────────────────────────────────── */
function ProjectBuckets({ onSelect }: { onSelect: (p: Project) => void }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bucket-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".bucket-card"), {
          y: 50,
          opacity: 0,
          scale: 0.93,
          stagger: 0.07,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="py-24 px-6 md:px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto space-y-24">
        {BUCKETS.map((bucket) => {
          const bucketProjects = bucket.ids.map(id => projects.find(p => p.id === id)!).filter(Boolean);
          return (
            <div key={bucket.label} className="bucket-section">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="font-serif" style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 300, fontStyle: "italic",
                  color: "var(--fg)",
                }}>
                  {bucket.label}
                </h3>
                <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
                <span className="section-label">{bucketProjects.length} projects</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bucketProjects.map((p) => (
                  <button
                    key={p.id}
                    className="bucket-card project-card group text-left rounded-xl overflow-hidden cursor-none w-full"
                    onClick={() => onSelect(p)}
                  >
                    <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <ProjectMockup projectId={p.id} className="w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm leading-tight" style={{ color: "var(--fg)" }}>{p.name}</h4>
                        <div className="flex flex-col gap-1 items-end flex-shrink-0">
                          {p.liveUrl && <span className="skill-tag" style={{ fontSize: "0.55rem", color: "#22c55e", borderColor: "#22c55e40" }}>Live</span>}
                        </div>
                      </div>
                      <p className="section-label mb-2" style={{ fontSize: "0.6rem" }}>{p.tagline}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.tech.slice(0, 3).map(t => <span key={t} className="skill-tag" style={{ fontSize: "0.55rem", padding: "0.15rem 0.45rem" }}>{t}</span>)}
                        {p.tech.length > 3 && <span className="skill-tag" style={{ fontSize: "0.55rem", padding: "0.15rem 0.45rem" }}>+{p.tech.length - 3}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-top-header", {
        y: 80, opacity: 0, scale: 0.85,
        duration: 1.4, ease: "expo.out",
        scrollTrigger: {
          trigger: ".projects-top-header",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">

      {/* Section header */}
      <div className="py-20 px-6 md:px-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="divider mb-20" />
          <div className="projects-top-header">
            <div className="flex items-center gap-4 mb-4">
              <span className="section-label">04 / 07</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--fg)", lineHeight: 1.05,
            }}>
              Things I've <strong style={{ fontStyle: "normal", fontWeight: 800 }}>shipped.</strong>
            </h2>
            <p className="mt-4 text-sm" style={{ color: "var(--fg-muted)" }}>
              {projects.length} projects across AI, mobile, blockchain, enterprise & freelance — most live in production.
              Scroll through the spotlight below, then browse all projects by category.
            </p>
          </div>
        </div>
      </div>

      {/* Tunnel spotlight */}
      <TunnelProjects onSelect={setSelected} />

      {/* All projects by bucket */}
      <ProjectBuckets onSelect={setSelected} />

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
