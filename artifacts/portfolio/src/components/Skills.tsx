import { useEffect, useRef, useState } from "react";
import { skillCategories } from "@/data/skills";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Skills() {
  const { ref, visible } = useReveal();

  const extraTech = [
    "Swagger/OpenAPI", "JWT", "MinIO", "Playwright", "Jest", "GitHub Actions",
    "Google ML Kit", "OpenAI TTS", "Whisper STT", "ReactFlow", "Zustand",
    "Riverpod", "Web3.js", "Hardhat", "Supabase RLS", "Edge Functions",
  ];

  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 overflow-hidden">
      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">04 / 05</span>
          <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">Skills</span>
        </div>

        <h2
          className="font-serif mb-16"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--fg)",
            lineHeight: 1.1,
          }}
        >
          What I <strong style={{ fontStyle: "normal", fontWeight: 800 }}>know.</strong>
        </h2>

        {/* Category cards */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.category}
              className={`p-6 rounded-lg ${visible ? "anim-fade-up" : "opacity-0"}`}
              style={{
                border: "1px solid var(--border-color)",
                background: "var(--bg-elevated)",
                animationDelay: `${ci * 0.07}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  style={{
                    width: 3,
                    height: 20,
                    borderRadius: 99,
                    background: "var(--fg)",
                    opacity: 0.4,
                  }}
                />
                <h3
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.65rem", color: "var(--fg-muted)" }}
                >
                  {cat.category}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{skill.name}</span>
                      <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>{skill.level}%</span>
                    </div>
                    <div
                      className="h-px w-full rounded-full overflow-hidden"
                      style={{ background: "var(--border-color)" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "var(--fg)",
                          width: visible ? `${skill.level}%` : "0%",
                          transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${ci * 0.07 + si * 0.05}s`,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra tech cloud */}
        <div
          className="mt-12 p-8 rounded-lg"
          style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}
        >
          <p className="section-label mb-5">Also experienced with</p>
          <div className="flex flex-wrap gap-2">
            {extraTech.map(t => (
              <span key={t} className="skill-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
