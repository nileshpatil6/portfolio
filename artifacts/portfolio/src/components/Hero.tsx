import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import ThreeCanvas from "@/components/ThreeCanvas";

const roles = [
  "Full Stack Developer",
  "GenAI Engineer",
  "Mobile App Developer",
  "AI Systems Architect",
  "Serial Builder",
];

function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`relative inline-block ${glitching ? "glitch-text" : ""}`}
      data-text={text}
    >
      {text}
    </span>
  );
}

function TypeWriter({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const word = words[currentWord];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && currentChar <= word.length) {
      setText(word.slice(0, currentChar));
      timeout = setTimeout(() => setCurrentChar((c) => c + 1), 80);
    } else if (!deleting && currentChar > word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && currentChar > 0) {
      setText(word.slice(0, currentChar));
      timeout = setTimeout(() => setCurrentChar((c) => c - 1), 40);
    } else {
      setDeleting(false);
      setCurrentWord((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [currentChar, deleting, currentWord, words]);

  return (
    <span className="typing-cursor">
      <span className="gradient-text-blue">{text}</span>
    </span>
  );
}

export default function Hero() {
  const [, setLocation] = useLocation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersStarted(true);
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ThreeCanvas />
      <div className="noise-overlay" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00ff88]/5 rounded-full blur-[80px]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]" />
          </span>
          <span className="text-xs font-mono text-[#00ff88] tracking-[0.3em] uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tight leading-none"
        >
          <GlitchText text="NILESH" />
          <br />
          <span className="gradient-text-blue">PATIL</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl font-mono mb-4 h-8"
        >
          <TypeWriter words={roles} />
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {[
            { label: "8x Hackathon Winner", color: "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/5" },
            { label: "NASA SpaceApps 1st", color: "text-[#00d4ff] border-[#00d4ff]/30 bg-[#00d4ff]/5" },
            { label: "IIT Bombay Intern", color: "text-[#7c3aed] border-[#7c3aed]/30 bg-[#7c3aed]/5" },
            { label: "Rs.2L Funded Founder", color: "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/5" },
          ].map((tag) => (
            <span key={tag.label} className={`text-xs font-mono border px-3 py-1.5 rounded-full ${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            data-testid="button-view-work"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="magnetic-btn px-8 py-3.5 bg-[#00d4ff] text-[#0a0a0f] font-bold text-sm rounded-full hover:bg-[#00d4ff]/90 transition-all cursor-none"
          >
            View Work
          </motion.button>
          <motion.button
            data-testid="button-enter-terminal"
            whileHover={{ scale: 1.05, borderColor: "rgba(0,255,136,0.8)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation("/dev")}
            className="magnetic-btn px-8 py-3.5 border border-[#00ff88]/40 text-[#00ff88] font-bold text-sm rounded-full hover:bg-[#00ff88]/5 transition-all font-mono cursor-none"
          >
            &gt; Enter Terminal
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-[#1e1e2e]"
        >
          {[
            { value: "8x", label: "Hackathon Wins", color: "#f59e0b" },
            { value: "3+", label: "Years Building", color: "#00d4ff" },
            { value: "20+", label: "Live Projects", color: "#00ff88" },
            { value: "Rs.2L", label: "Govt. Funded", color: "#7c3aed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[#a0aec0] text-xs font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#a0aec0]/60 text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-[#a0aec0]/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#00d4ff] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
