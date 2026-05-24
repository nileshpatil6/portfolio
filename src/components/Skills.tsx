"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

const extraTech = [
  "Swagger/OpenAPI", "JWT", "MinIO", "Playwright", "Jest", "GitHub Actions",
  "Google ML Kit", "OpenAI TTS", "Whisper STT", "ReactFlow", "Zustand",
  "Riverpod", "Web3.js", "Hardhat", "Supabase RLS", "Edge Functions",
  "LangGraph", "MCP Protocol", "Vertex AI", "HuggingFace", "Pinecone",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header dramatic scale entrance
      gsap.from(".skills-headline", {
        scale: 0.5,
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".skills-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      // Category cards: even ones from left, odd from right — extreme positions
      gsap.utils.toArray<HTMLElement>(".skill-cat-card").forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(card, {
          x: fromLeft ? -300 : 300,
          opacity: 0,
          rotation: fromLeft ? -12 : 12,
          scale: 0.8,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // Skill bars fill in on scroll
      gsap.utils.toArray<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const targetW = bar.getAttribute("data-level") + "%";
        gsap.fromTo(bar, { width: "0%" }, {
          width: targetW,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // Extra tech cloud: items fly in from random positions
      gsap.utils.toArray<HTMLElement>(".extra-tech-tag").forEach((tag, i) => {
        const angle = (i / extraTech.length) * Math.PI * 2;
        const radius = 400 + Math.random() * 200;
        gsap.from(tag, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          opacity: 0,
          scale: 0.3,
          rotation: (Math.random() - 0.5) * 90,
          duration: 1.2,
          ease: "expo.out",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: ".extra-tech-cloud",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });

      // Background shape morphing on scroll
      gsap.to(".skills-bg-shape", {
        borderRadius: "50% 50% 30% 70% / 70% 30% 50% 50%",
        rotation: 45,
        scale: 1.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-40 px-6 md:px-16 overflow-hidden">

      {/* Background morphing shape */}
      <div className="skills-bg-shape absolute pointer-events-none" style={{
        width: "min(80vw, 700px)", height: "min(80vw, 700px)",
        top: "10%", right: "-25%",
        background: "var(--fg)", opacity: 0.03,
        borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%",
        willChange: "transform, border-radius",
      }} />

      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">06 / 08</span>
          <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">Skills</span>
        </div>

        <h2 className="skills-headline font-serif mb-20" style={{
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "var(--fg)", lineHeight: 1.05,
        }}>
          What I <strong style={{ fontStyle: "normal", fontWeight: 800 }}>know.</strong>
        </h2>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.category}
              className="skill-cat-card p-7 rounded-2xl"
              data-cursor-text={cat.category}
              style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div style={{
                  width: 4, height: 24, borderRadius: 99,
                  background: cat.color, opacity: 0.7,
                }} />
                <h3 className="font-mono uppercase tracking-widest" style={{ fontSize: "0.65rem", color: "var(--fg-muted)" }}>
                  {cat.category}
                </h3>
              </div>

              <div className="space-y-5">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{skill.name}</span>
                      <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>{skill.level}%</span>
                    </div>
                    <div className="h-0.5 w-full rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
                      <div
                        className="skill-bar-fill h-full rounded-full"
                        data-level={skill.level}
                        style={{ width: "0%", background: cat.color, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra tech cloud — items fly in from all directions */}
        <div className="extra-tech-cloud mt-16 p-10 rounded-2xl" style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}>
          <p className="section-label mb-6">Also experienced with</p>
          <div className="flex flex-wrap gap-2.5">
            {extraTech.map(t => (
              <span key={t} className="extra-tech-tag skill-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

