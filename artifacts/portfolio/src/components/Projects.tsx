import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories, type Project, type ProjectCategory } from "@/data/projects";

const categoryColors: Record<string, string> = {
  "AI/Web": "#00d4ff",
  "AI/Mobile": "#00ff88",
  "Blockchain": "#f59e0b",
  "Freelance": "#7c3aed",
  "Enterprise": "#a78bfa",
  "AI/ML": "#f472b6",
  "AI/RAG": "#34d399",
  "AI/Finance": "#fbbf24",
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const color = categoryColors[project.category] || "#00d4ff";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      data-testid={`card-project-${project.id}`}
      className="relative group p-6 rounded-2xl border border-[#1e1e2e] bg-[#111118] cursor-none overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,212,255,0.12)] hover:border-[#00d4ff]/30"
      style={{ "--project-color": color } as React.CSSProperties}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* BG gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${color}06 0%, transparent 60%)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {/* SVG icon placeholder */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
        >
          {project.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ color, background: `${color}10`, border: `1px solid ${color}20` }}
          >
            {project.category}
          </span>
          {project.liveUrl && (
            <span className="text-[10px] font-mono text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-2 py-0.5 rounded-full">
              LIVE
            </span>
          )}
        </div>
      </div>

      {project.highlight && (
        <div className="mb-3 text-[10px] font-mono text-[#f59e0b] bg-[#f59e0b]/5 border border-[#f59e0b]/20 px-3 py-1.5 rounded-lg">
          {project.highlight}
        </div>
      )}

      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#00d4ff] transition-colors">
        {project.name}
      </h3>
      <p className="text-[#a0aec0] text-sm mb-4 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono text-[#a0aec0]/70 bg-[#1e1e2e] px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-[10px] font-mono text-[#a0aec0]/40 px-1">+{project.tech.length - 4}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs font-mono">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors cursor-none"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[#7c3aed] hover:text-[#7c3aed]/80 transition-colors cursor-none"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
        <span className="ml-auto text-[#a0aec0]/30 group-hover:text-[#00d4ff]/50 transition-colors">
          View details →
        </span>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const color = categoryColors[project.category] || "#00d4ff";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border bg-[#111118] p-8"
        style={{ borderColor: `${color}40` }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${color}08 0%, transparent 60%)` }}
        />

        <button
          data-testid="button-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a0aec0] hover:text-white transition-colors cursor-none font-mono text-sm"
        >
          [ESC]
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold font-mono"
            style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
          >
            {project.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{project.name}</h2>
            <p className="text-[#a0aec0] text-sm">{project.tagline}</p>
          </div>
        </div>

        {project.highlight && (
          <div className="mb-4 flex items-center gap-2 text-[#f59e0b] bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl p-3 text-sm font-mono">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {project.highlight}
          </div>
        )}

        <p className="text-[#a0aec0] leading-relaxed mb-6">{project.description}</p>

        <div className="mb-6">
          <div className="text-[#a0aec0]/60 text-xs font-mono uppercase tracking-wider mb-3">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1.5 rounded-lg"
                style={{ color, background: `${color}10`, border: `1px solid ${color}20` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold transition-all cursor-none"
              style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1e1e2e] text-[#a0aec0] border border-[#2a2a3e] rounded-xl font-mono text-sm font-semibold hover:text-white hover:border-[#7c3aed]/40 transition-all cursor-none"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-px bg-[#00d4ff]" />
          <span className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase">Projects</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Things I've <span className="gradient-text-blue">shipped.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#a0aec0] mb-10 max-w-2xl"
        >
          {projects.length} projects across AI, mobile, blockchain, and web. Most are live in production.
        </motion.p>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {(["All", ...categories] as (ProjectCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              data-testid={`filter-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-4 py-2 rounded-full border transition-all cursor-none ${
                activeCategory === cat
                  ? "bg-[#00d4ff] text-[#0a0a0f] border-[#00d4ff] font-semibold"
                  : "border-[#1e1e2e] text-[#a0aec0] hover:border-[#00d4ff]/30 hover:text-[#00d4ff]"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60">
                  ({projects.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#a0aec0]/50 font-mono">
            No projects in this category yet.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
