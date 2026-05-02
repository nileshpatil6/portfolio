import { useEffect, useRef, useState } from "react";
import { techLogos } from "@/data/skills";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const words = ["Builder.", "Engineer.", "Founder.", "Creator.", "Hacker."];

export default function About() {
  const { ref, visible } = useReveal();
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="about" className="relative py-32 px-6 md:px-16 overflow-hidden">
      {/* Top divider */}
      <div className="divider mb-20" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">02 / 05</span>
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">About</span>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — big word + description */}
          <div ref={ref}>
            {/* Rotating word */}
            <div
              className="overflow-hidden mb-8"
              style={{ height: "clamp(4rem, 8vw, 7rem)" }}
            >
              <p
                key={wordIdx}
                className="font-serif"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "var(--fg)",
                  animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
                }}
              >
                {words[wordIdx]}
              </p>
            </div>

            <div className="space-y-5 mt-6">
              {[
                "Third-year B.E. (AI & DS) student and serial builder — 3+ years shipping production software.",
                "Co-founded MediAssist AI, funded ₹2L by the Government of Karnataka NAIN 2.0 program. Shipped TripOnBuddy with real live users. Won 8 hackathon competitions including GDG and NASA SpaceApps 1st place.",
                "Deep experience in Agentic AI, RAG pipelines, and MCP. Building AI-native products at the intersection of LLMs, blockchain, and mobile.",
              ].map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${visible ? "anim-fade-up" : "opacity-0"}`}
                  style={{
                    fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                    color: "var(--fg-muted)",
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-10">
              <a
                href="https://github.com/nileshpatil6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.75rem" }}
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/nileshpatil6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.75rem" }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://huggingface.co/Mr66"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.75rem" }}
              >
                HuggingFace ↗
              </a>
            </div>
          </div>

          {/* Right — facts */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "8×",   label: "Hackathon wins", sub: "GDG, NASA, CodeBharat…" },
              { n: "19+",  label: "Projects",        sub: "Most live in production" },
              { n: "₹2L",  label: "Govt. funded",    sub: "Karnataka NAIN 2.0" },
              { n: "2+",   label: "Years building",  sub: "Fullstack & AI/ML" },
            ].map(({ n, label, sub }) => (
              <div
                key={label}
                className="p-6 rounded-lg"
                style={{
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-elevated)",
                }}
              >
                <p
                  className="font-serif"
                  style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}
                >
                  {n}
                </p>
                <p className="mt-2 text-sm font-medium" style={{ color: "var(--fg)" }}>{label}</p>
                <p className="mt-1 section-label" style={{ fontSize: "0.62rem" }}>{sub}</p>
              </div>
            ))}

            {/* Education card */}
            <div
              className="col-span-2 p-6 rounded-lg"
              style={{
                border: "1px solid var(--border-color)",
                background: "var(--bg-elevated)",
              }}
            >
              <span className="section-label">Education</span>
              <p className="mt-2 font-medium" style={{ color: "var(--fg)" }}>
                B.E. in Artificial Intelligence & Data Science
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
                S.G. Balekundari Institute of Technology · 2023 – 2027
              </p>
            </div>
          </div>
        </div>

        {/* Marquee tech */}
        <div className="mt-24 overflow-hidden">
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
