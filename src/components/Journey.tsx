"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2022",
    title: "First Line of Code",
    desc: "Picked up Python and HTML/CSS out of curiosity. Built first projects. Realized software was something I could obsess over.",
    tags: ["Python", "HTML/CSS", "JavaScript"],
    side: "left",
  },
  {
    year: "2023",
    title: "First Hackathon Win",
    desc: "Entered first competition and won. Enrolled in B.E. AI & Data Science at SGBIT. Started shipping real React + Node apps.",
    tags: ["React", "Node.js", "AI/ML"],
    side: "right",
  },
  {
    year: "2024",
    title: "Government Funded",
    desc: "Co-founded MediAssist AI and received ₹2L NAIN 2.0 grant from Govt. of Karnataka. Built real-world healthcare AI for actual patients.",
    tags: ["MediAssist AI", "Flutter", "RAG", "Healthcare AI"],
    side: "left",
  },
  {
    year: "2024",
    title: "8× Hackathon Champion",
    desc: "Dominated competitions: GDG, NASA SpaceApps 1st place, CodeBharat (₹50K prize), ONEST (₹25K prize), and 4 more. Proved concepts work in competitive real-world settings.",
    tags: ["NASA SpaceApps", "GenAI", "Agentic AI", "Web3"],
    side: "right",
  },
  {
    year: "2025",
    title: "7 Products in Production",
    desc: "TripOnBuddy, Unyfiny, DataVerseAI, Text2DB, AK Car Rentals, CMN Services, Prasan Hom — all live. Freelancing globally across India, USA, and Japan.",
    tags: ["Production", "Freelance", "Global", "AI Agents"],
    side: "left",
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the timeline line as user scrolls
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );

      // Milestone items alternate left/right with dramatic entrance
      gsap.utils.toArray<HTMLElement>(".journey-item-left").forEach((el) => {
        gsap.from(el, {
          x: -200,
          opacity: 0,
          rotation: -8,
          scale: 0.85,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".journey-item-right").forEach((el) => {
        gsap.from(el, {
          x: 200,
          opacity: 0,
          rotation: 8,
          scale: 0.85,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // Year numbers pop in
      gsap.utils.toArray<HTMLElement>(".journey-year").forEach((el) => {
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // Background float shapes
      gsap.to(".journey-bg-shape", {
        y: -200,
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
    <section id="journey" ref={sectionRef} className="relative py-40 px-6 md:px-16 overflow-hidden">

      {/* Floating background blob */}
      <div className="journey-bg-shape absolute pointer-events-none" style={{
        width: "min(70vw, 600px)", height: "min(70vw, 600px)",
        bottom: "10%", right: "-20%",
        background: "var(--fg)", opacity: 0.03,
        borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
      }} />

      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">03 / 07</span>
          <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">Journey</span>
        </div>

        <h2 className="font-serif mb-20" style={{
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "var(--fg)", lineHeight: 1.05,
        }}>
          How I got <strong style={{ fontStyle: "normal", fontWeight: 800 }}>here.</strong>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "var(--border-color)", transformOrigin: "top center" }}
          />

          <div className="space-y-16">
            {milestones.map((m, i) => (
              <div key={i} className={`journey-item-${m.side} relative flex items-start gap-8 md:gap-0`}>

                {/* Mobile layout: straight list */}
                <div className="md:hidden flex-1">
                  <div className="p-6 rounded-2xl" style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>{m.year}</span>
                      <div className="w-2 h-2 rounded-full" style={{ background: "var(--fg)" }} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2" style={{ color: "var(--fg)" }}>{m.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>{m.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.tags.map(t => <span key={t} className="skill-tag" style={{ fontSize: "0.6rem" }}>{t}</span>)}
                    </div>
                  </div>
                </div>

                {/* Desktop: alternating layout */}
                <div className="hidden md:grid md:grid-cols-2 w-full gap-16 items-center">
                  {m.side === "left" ? (
                    <>
                      <div className="p-7 rounded-2xl" style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>{m.year}</span>
                          <div className="w-2 h-2 rounded-full" style={{ background: "var(--fg)" }} />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold mb-3" style={{ color: "var(--fg)" }}>{m.title}</h3>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>{m.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {m.tags.map(t => <span key={t} className="skill-tag" style={{ fontSize: "0.62rem" }}>{t}</span>)}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <span className="journey-year font-serif" style={{ fontSize: "clamp(4rem, 8vw, 8rem)", fontWeight: 900, color: "var(--fg)", opacity: 0.06, userSelect: "none" }}>{m.year}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center items-center">
                        <span className="journey-year font-serif" style={{ fontSize: "clamp(4rem, 8vw, 8rem)", fontWeight: 900, color: "var(--fg)", opacity: 0.06, userSelect: "none" }}>{m.year}</span>
                      </div>
                      <div className="p-7 rounded-2xl" style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>{m.year}</span>
                          <div className="w-2 h-2 rounded-full" style={{ background: "var(--fg)" }} />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold mb-3" style={{ color: "var(--fg)" }}>{m.title}</h3>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>{m.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {m.tags.map(t => <span key={t} className="skill-tag" style={{ fontSize: "0.62rem" }}>{t}</span>)}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

