import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects, categories, type Project, type ProjectCategory } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}
      >
        <div className="aspect-[16/7] overflow-hidden rounded-t-2xl">
          <ProjectMockup category={project.category} className="w-full h-full" />
        </div>
        <div className="p-8">
          <button
            onClick={onClose}
            data-testid="button-close-modal"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border cursor-none text-sm font-mono"
            style={{ border: "1px solid var(--border-color)", color: "var(--fg-muted)", background: "var(--bg-elevated)" }}
          >✕</button>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-3xl" style={{ color: "var(--fg)", fontWeight: 600 }}>{project.name}</h2>
              <p className="section-label mt-1">{project.tagline}</p>
            </div>
            <span className="skill-tag flex-shrink-0">{project.category}</span>
          </div>
          {project.highlight && (
            <div className="mb-5 px-4 py-2.5 rounded-lg text-sm font-mono" style={{ background: "var(--bg)", border: "1px solid var(--border-color)", color: "var(--fg-muted)" }}>
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
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">View live ↗</a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub ↗</a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCat, setActiveCat] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = activeCat === "All" ? projects : projects.filter(p => p.category === activeCat);

  // Horizontal scroll for featured projects
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const getScrollDist = () => track.scrollWidth - pin.offsetWidth;

      const st = ScrollTrigger.create({
        trigger: pin,
        pin: true,
        start: "top top",
        end: () => `+=${getScrollDist()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * getScrollDist() });
        },
      });

      // Cards stagger in on first enter
      gsap.from(".hscroll-card", {
        y: 60,
        opacity: 0,
        rotation: 5,
        scale: 0.9,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: pin,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      });

      return () => st.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Header / grid section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(".project-grid-card", {
        y: 60,
        opacity: 0,
        scale: 0.94,
        stagger: 0.07,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".project-grid-card",
          start: "top 90%",
          toggleActions: "play none none none",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">

      {/* Pinned horizontal scroll — featured */}
      <div ref={pinRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-16 pt-12 pb-6 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, var(--bg) 60%, transparent)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <span className="section-label">04 / 07</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight: 300, fontStyle: "italic",
              color: "var(--fg)", lineHeight: 1.1,
            }}>
              Things I've <strong style={{ fontStyle: "normal", fontWeight: 800 }}>shipped.</strong>
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
              {projects.length} projects · drag to scroll →
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex gap-6 items-center absolute left-0 top-0 bottom-0 pl-6 md:pl-16" style={{ paddingTop: "180px", paddingRight: "8vw", width: "max-content" }}>
          {projects.map((p) => (
            <button
              key={p.id}
              className="hscroll-card cursor-none text-left flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: "min(80vw, 380px)",
                height: "calc(100vh - 220px)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-elevated)",
                transition: "border-color 0.2s, transform 0.3s",
              }}
              onClick={() => setSelected(p)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
            >
              <div className="aspect-[4/3] overflow-hidden w-full" style={{ background: "var(--bg)" }}>
                <ProjectMockup category={p.category} className="w-full h-full" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-base leading-tight" style={{ color: "var(--fg)" }}>{p.name}</h3>
                    <p className="section-label mt-1" style={{ fontSize: "0.62rem" }}>{p.tagline}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end flex-shrink-0">
                    <span className="skill-tag" style={{ fontSize: "0.6rem" }}>{p.category}</span>
                    {p.liveUrl && (
                      <span className="skill-tag" style={{ fontSize: "0.6rem", color: "#22c55e", borderColor: "#22c55e50" }}>Live</span>
                    )}
                  </div>
                </div>
                {p.highlight && (
                  <div className="px-2.5 py-1.5 rounded text-xs font-mono" style={{ background: "var(--bg)", color: "var(--fg-muted)", border: "1px solid var(--border-color)" }}>
                    ★ {p.highlight}
                  </div>
                )}
                <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--fg-muted)" }}>{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map(t => (
                    <span key={t} className="skill-tag" style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}>{t}</span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="skill-tag" style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}>+{p.tech.length - 3}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
      </div>

      {/* Filter + grid section below */}
      <div className="py-24 px-6 md:px-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="projects-header mb-10">
            <p className="section-label mb-3">Filter by category</p>
            <div className="flex flex-wrap gap-2">
              {(["All", ...categories] as (ProjectCategory | "All")[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  data-testid={`filter-${cat}`}
                  className="cursor-none transition-all duration-200"
                  style={{
                    fontFamily: "var(--app-font-mono)", fontSize: "0.68rem",
                    letterSpacing: "0.06em", padding: "0.35rem 0.9rem",
                    borderRadius: "100px",
                    border: activeCat === cat ? "1px solid var(--fg)" : "1px solid var(--border-color)",
                    background: activeCat === cat ? "var(--fg)" : "transparent",
                    color: activeCat === cat ? "var(--bg)" : "var(--fg-muted)",
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.93, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 30 }}
                  transition={{ duration: 0.3 }}
                  className="project-grid-card"
                >
                  <button
                    onClick={() => setSelected(p)}
                    className="project-card group text-left rounded-xl overflow-hidden cursor-none w-full"
                  >
                    <div className="aspect-[16/9] overflow-hidden" style={{ background: "var(--bg)" }}>
                      <ProjectMockup category={p.category} className="w-full h-full" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-medium text-base leading-tight" style={{ color: "var(--fg)" }}>{p.name}</h3>
                          <p className="section-label mt-1" style={{ fontSize: "0.62rem" }}>{p.tagline}</p>
                        </div>
                        <div className="flex flex-col gap-1 items-end flex-shrink-0">
                          <span className="skill-tag" style={{ fontSize: "0.6rem" }}>{p.category}</span>
                          {p.liveUrl && (
                            <span className="skill-tag" style={{ fontSize: "0.6rem", color: "#22c55e", borderColor: "#22c55e50" }}>Live</span>
                          )}
                        </div>
                      </div>
                      {p.highlight && (
                        <div className="mb-3 px-2.5 py-1.5 rounded text-xs font-mono" style={{ background: "var(--bg)", color: "var(--fg-muted)", border: "1px solid var(--border-color)" }}>
                          ★ {p.highlight}
                        </div>
                      )}
                      <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--fg-muted)" }}>{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech.slice(0, 4).map(t => <span key={t} className="skill-tag" style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}>{t}</span>)}
                        {p.tech.length > 4 && <span className="skill-tag" style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}>+{p.tech.length - 4}</span>}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--fg)" }}>
                        View details <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
