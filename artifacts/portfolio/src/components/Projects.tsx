import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, categories, type Project, type ProjectCategory } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="project-card group text-left rounded-lg overflow-hidden cursor-none w-full"
      data-testid={`card-project-${project.id}`}
    >
      {/* Mockup image area */}
      <div className="aspect-[16/9] overflow-hidden" style={{ background: "var(--bg)" }}>
        <ProjectMockup category={project.category} className="w-full h-full" />
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3
              className="font-medium text-base leading-tight"
              style={{ color: "var(--fg)" }}
            >
              {project.name}
            </h3>
            <p className="section-label mt-1" style={{ fontSize: "0.62rem" }}>{project.tagline}</p>
          </div>
          <div className="flex flex-col gap-1 items-end flex-shrink-0">
            <span className="skill-tag" style={{ fontSize: "0.6rem" }}>{project.category}</span>
            {project.liveUrl && (
              <span className="skill-tag" style={{ fontSize: "0.6rem", color: "#22c55e", borderColor: "#22c55e50" }}>
                Live
              </span>
            )}
          </div>
        </div>

        {project.highlight && (
          <div className="mb-3 px-2.5 py-1.5 rounded text-xs font-mono" style={{ background: "var(--muted-foreground, #f0f0ec)", color: "var(--fg-muted)", border: "1px solid var(--border-color)" }}>
            ★ {project.highlight}
          </div>
        )}

        <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--fg-muted)" }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="skill-tag" style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}>{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="skill-tag" style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}>+{project.tech.length - 4}</span>
          )}
        </div>

        <div
          className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--fg)" }}
        >
          View details <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
        </div>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-xl"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Mockup header */}
        <div className="aspect-[16/7] overflow-hidden rounded-t-xl">
          <ProjectMockup category={project.category} className="w-full h-full" />
        </div>

        <div className="p-8">
          <button
            onClick={onClose}
            data-testid="button-close-modal"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border cursor-none text-sm font-mono transition-colors"
            style={{ border: "1px solid var(--border-color)", color: "var(--fg-muted)", background: "var(--bg-elevated)" }}
          >
            ✕
          </button>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-3xl" style={{ color: "var(--fg)", fontWeight: 600 }}>
                {project.name}
              </h2>
              <p className="section-label mt-1">{project.tagline}</p>
            </div>
            <span className="skill-tag flex-shrink-0">{project.category}</span>
          </div>

          {project.highlight && (
            <div className="mb-5 px-4 py-2.5 rounded-lg text-sm font-mono" style={{ background: "var(--bg)", border: "1px solid var(--border-color)", color: "var(--fg-muted)" }}>
              ★ {project.highlight}
            </div>
          )}

          <p className="leading-relaxed mb-6" style={{ color: "var(--fg-muted)", fontSize: "0.95rem" }}>
            {project.description}
          </p>

          <div className="mb-6">
            <p className="section-label mb-3">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                GitHub ↗
              </a>
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

  const filtered = activeCat === "All" ? projects : projects.filter(p => p.category === activeCat);

  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 overflow-hidden">
      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="section-label">03 / 05</span>
              <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
              <span className="section-label">Work</span>
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--fg)",
                lineHeight: 1.1,
              }}
            >
              Things I've <strong style={{ fontStyle: "normal", fontWeight: 800 }}>shipped.</strong>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>
              {projects.length} projects · AI, mobile, blockchain, web · most live in production
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {(["All", ...categories] as (ProjectCategory | "All")[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              data-testid={`filter-${cat}`}
              className="cursor-none transition-all duration-200"
              style={{
                fontFamily: "var(--app-font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
                border: activeCat === cat ? "1px solid var(--fg)" : "1px solid var(--border-color)",
                background: activeCat === cat ? "var(--fg)" : "transparent",
                color: activeCat === cat ? "var(--bg)" : "var(--fg-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={p} onClick={() => setSelected(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
