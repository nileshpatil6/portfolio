import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { techLogos } from "@/data/skills";

const flipWords = ["BUILDER.", "HACKER.", "FOUNDER.", "CREATOR.", "ENGINEER."];

function FlipBoard({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="relative overflow-hidden h-20 md:h-28 flex items-center">
      <motion.div
        key={index}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
        className="text-5xl md:text-7xl font-black gradient-text-blue"
      >
        {words[index]}
      </motion.div>
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-[#00d4ff]/30" />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-[#00d4ff]" />
          <span className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase">About</span>
        </motion.div>

        {/* Flip board */}
        <FlipBoard words={flipWords} />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          {/* Left — text */}
          <div className="space-y-6">
            {[
              "Third-year B.E. (AI & DS) student and serial builder with 3+ years of production development experience.",
              "Co-founded MediAssist AI — Rs.2L funded by Government of Karnataka NAIN 2.0. Shipped TripOnBuddy serving live users. Won 8 hackathon competitions including GDG and NASA SpaceApps 1st place.",
              "Deep experience in Agentic AI, RAG pipelines, and MCP. Passionate about building AI-native products at the intersection of LLMs, blockchain, and mobile.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-[#a0aec0] leading-relaxed text-base"
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 pt-4"
            >
              <a
                href="https://github.com/nileshpatil6"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
                className="flex items-center gap-2 text-sm font-mono text-[#00d4ff] border border-[#00d4ff]/30 px-4 py-2 rounded-full hover:bg-[#00d4ff]/10 transition-all cursor-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/nileshpatil6"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
                className="flex items-center gap-2 text-sm font-mono text-[#7c3aed] border border-[#7c3aed]/30 px-4 py-2 rounded-full hover:bg-[#7c3aed]/10 transition-all cursor-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🏆", label: "Hackathon Wins", value: 8, suffix: "x", color: "#f59e0b" },
              { icon: "⚡", label: "Years Experience", value: 3, suffix: "+", color: "#00d4ff" },
              { icon: "🚀", label: "Live Projects", value: 20, suffix: "+", color: "#00ff88" },
              { icon: "🧠", label: "AI Projects", value: 10, suffix: "+", color: "#7c3aed" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, borderColor: stat.color }}
                className="relative p-6 rounded-2xl border border-[#1e1e2e] bg-[#111118] transition-all cursor-none overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(ellipse at center, ${stat.color}08 0%, transparent 70%)` }} />
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[#a0aec0] text-xs font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden">
          <div className="text-[#a0aec0]/40 text-xs font-mono uppercase tracking-widest mb-4">Tech I work with</div>
          <div className="flex overflow-hidden">
            <div className="marquee-track flex gap-6 whitespace-nowrap">
              {[...techLogos, ...techLogos].map((tech, i) => (
                <span
                  key={i}
                  className="text-sm font-mono text-[#a0aec0]/60 border border-[#1e1e2e] bg-[#111118] px-4 py-2 rounded-full hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-colors cursor-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
