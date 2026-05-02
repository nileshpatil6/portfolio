import { useRef } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#e2e8f0] font-medium">{name}</span>
        </div>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1.0, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-[#00d4ff]/20 to-transparent -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-px bg-[#00d4ff]" />
          <span className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase">Skills</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          What I <span className="gradient-text-green">know.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#a0aec0] mb-16 max-w-2xl"
        >
          Full-stack proficiency across languages, frameworks, AI/ML, mobile, and infrastructure.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl border border-[#1e1e2e] bg-[#111118] hover:border-opacity-50 transition-all"
              style={{ "--cat-color": cat.color } as React.CSSProperties}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: `linear-gradient(to bottom, ${cat.color}, ${cat.color}44)` }}
                />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">{cat.category}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={catIdx * 0.1 + skillIdx * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-[#1e1e2e] bg-[#111118]"
        >
          <div className="text-center mb-8">
            <span className="text-[#a0aec0]/60 text-xs font-mono uppercase tracking-widest">
              Also experienced with
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Swagger/OpenAPI", "JWT", "MinIO", "Playwright", "Jest", "GitHub Actions CI/CD",
              "Google ML Kit", "OpenAI TTS", "Whisper STT", "ReactFlow", "Zustand", "Riverpod",
              "Web3.js", "Hardhat", "Supabase RLS", "Edge Functions", "pnpm workspaces",
            ].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05, color: "#00d4ff" }}
                className="text-xs font-mono text-[#a0aec0]/60 bg-[#1e1e2e] border border-[#2a2a3e] px-3 py-1.5 rounded-full cursor-none transition-colors hover:border-[#00d4ff]/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
