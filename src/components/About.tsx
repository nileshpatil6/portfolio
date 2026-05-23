"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techLogos } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

const words = ["Builder.", "Engineer.", "Founder.", "Creator.", "Hacker."];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        }
      });

      tl.fromTo(".about-morph-shape", {
        borderRadius: "50%",
        width: "min(80vw, 700px)",
        height: "min(80vw, 700px)",
        x: "30vw",
        opacity: 0.07,
        scale: 1,
      }, {
        borderRadius: "12px",
        width: "min(40vw, 320px)",
        height: "min(40vw, 320px)",
        x: "45vw",
        y: "20vh",
        opacity: 0.04,
        scale: 0.5,
        duration: 1,
      });

      tl.to(".about-morph-shape", {
        borderRadius: "50%",
        x: "55vw",
        y: "50vh",
        scale: 0.2,
        opacity: 0,
        duration: 0.5,
      });

      gsap.from(".about-text-block", {
        x: -120,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-text-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(".about-stat-card", {
        y: 80,
        opacity: 0,
        rotation: 6,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-stat-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(".about-big-word", {
        y: 120,
        opacity: 0,
        scale: 0.6,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-big-word",
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-40 px-6 md:px-16 overflow-hidden">

      {/* Morphing background shape */}
      <div className="about-morph-shape absolute pointer-events-none top-10 right-0" style={{
        background: "var(--fg)",
        opacity: 0.07,
        borderRadius: "50%",
        willChange: "transform, border-radius, opacity, width, height",
        zIndex: 0,
      }} />

      <div className="divider mb-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">02 / 07</span>
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">About</span>
        </div>

        {/* Big rotating word */}
        <div className="overflow-hidden mb-20" style={{ height: "clamp(5rem, 10vw, 8rem)" }}>
          <p
            key={wordIdx}
            className="about-big-word font-serif"
            style={{
              fontSize: "clamp(4rem, 9vw, 7rem)",
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--fg)",
              animation: "fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {words[wordIdx]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <div className="space-y-6">
              {[
                "Third-year B.E. (AI & DS) student and serial builder — 3+ years shipping production software that real people use every day.",
                "Co-founded MediAssist AI, funded ₹2L by the Government of Karnataka NAIN 2.0 program. Shipped TripOnBuddy with real live users. Won 8 hackathon competitions including GDG and NASA SpaceApps 1st place.",
                "Deep experience in Agentic AI, RAG pipelines, and MCP. Building AI-native products at the intersection of LLMs, blockchain, and mobile — pushing the envelope of what software can do.",
              ].map((para, i) => (
                <p
                  key={i}
                  className="about-text-block leading-relaxed"
                  style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-12">
              {[
                { label: "GitHub ↗", href: "https://github.com/nileshpatil6" },
                { label: "LinkedIn ↗", href: "https://linkedin.com/in/nileshpatil6" },
                { label: "HuggingFace ↗", href: "https://huggingface.co/Mr66" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.75rem" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "19+", label: "Projects",       sub: "Most live in production" },
              { n: "7",   label: "In production",  sub: "Real users, real impact" },
              { n: "3",   label: "Countries",      sub: "India · USA · Japan" },
              { n: "2+",  label: "Years building", sub: "Fullstack & AI/ML" },
            ].map(({ n, label, sub }) => (
              <div
                key={label}
                className="about-stat-card p-6 rounded-2xl"
                style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}
              >
                <p className="font-serif" style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}>{n}</p>
                <p className="mt-2 text-sm font-medium" style={{ color: "var(--fg)" }}>{label}</p>
                <p className="mt-1 section-label" style={{ fontSize: "0.62rem" }}>{sub}</p>
              </div>
            ))}

            <div className="about-stat-card col-span-2 p-6 rounded-2xl" style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}>
              <span className="section-label">Education</span>
              <p className="mt-2 font-medium" style={{ color: "var(--fg)" }}>B.E. in Artificial Intelligence & Data Science</p>
              <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>S.G. Balekundari Institute of Technology · 2023 – 2027</p>
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div className="mt-28 overflow-hidden">
          <p className="section-label mb-4">Technologies</p>
          <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="marquee-track flex gap-3 shrink-0">
              {[...techLogos, ...techLogos].map((tech, i) => (
                <span key={i} className="skill-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

