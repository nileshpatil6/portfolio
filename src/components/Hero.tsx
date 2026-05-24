"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const roles = ["Full Stack Developer", "GenAI Engineer", "Agentic AI Builder", "Hackathon Champion", "Founder & Builder"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const tickRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const target = roles[roleIdx];
    if (!deleting) {
      if (displayed.length < target.length) {
        tickRef.current = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        tickRef.current = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        tickRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(tickRef.current);
  }, [displayed, deleting, roleIdx]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-word", { autoAlpha: 0 });

      const offsets = [
        { x: -700, y: -180, rotation: -22, scale: 0.4 },
        { x: 600, y: -300, rotation: 18, scale: 0.5 },
        { x: -350, y: 350, rotation: -14, scale: 0.6 },
        { x: 800, y: 250, rotation: 20, scale: 0.4 },
      ];

      gsap.utils.toArray<HTMLElement>(".hero-word").forEach((word, i) => {
        const off = offsets[i % offsets.length];
        gsap.fromTo(word, { ...off, autoAlpha: 0 }, {
          x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1,
          duration: 1.8,
          ease: "expo.out",
          delay: 0.05 + i * 0.2,
        });
      });

      gsap.to(".hb1", {
        borderRadius: "28% 72% 72% 28% / 28% 28% 72% 72%",
        x: 100, scale: 1.18,
        duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
      gsap.to(".hb2", {
        borderRadius: "72% 28% 28% 72% / 72% 72% 28% 28%",
        x: -60, y: 80, scale: 0.82,
        duration: 11, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
      gsap.to(".hb3", {
        x: 50, y: -70, scale: 1.4,
        duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
      gsap.to(".hb4", {
        y: -40, x: -30, scale: 1.2,
        duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true,
      });

      gsap.to(".hb1", {
        y: -700, x: -400, scale: 3.5, opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
      });
      gsap.to(".hb2", {
        y: -300, x: 700, opacity: 0, scale: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2 }
      });
      gsap.to(".hb3", {
        y: -900, x: 200, opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(".hb4", {
        y: 500, x: -200, opacity: 0, scale: 4,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.2 }
      });

      gsap.fromTo(".hero-name-first", { y: 80, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1.4, ease: "expo.out", delay: 0,
      });
      gsap.fromTo(".hero-name-last", { y: 80, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1.4, ease: "expo.out", delay: 0.14,
      });

      gsap.to(".hero-inner", {
        y: -250,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 }
      });

      gsap.to(".hero-scroll-line", {
        scaleY: 6,
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "60% top", end: "bottom top", scrub: 1 }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] flex flex-col justify-end pb-16 pt-24 md:pb-20 md:pt-28 px-6 md:px-16 overflow-hidden">

      {/* Giant blob 1 */}
      <div className="hb1 absolute pointer-events-none" style={{
        width: "min(110vw, 1000px)", height: "min(110vw, 1000px)",
        top: "-30%", right: "-25%",
        background: "var(--fg)", opacity: 0.055,
        borderRadius: "62% 38% 38% 62% / 62% 62% 38% 38%",
        willChange: "transform, border-radius, opacity",
      }} />

      {/* Medium blob 2 */}
      <div className="hb2 absolute pointer-events-none" style={{
        width: "min(60vw, 600px)", height: "min(60vw, 600px)",
        bottom: "-15%", left: "-20%",
        background: "var(--fg)", opacity: 0.04,
        borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
        willChange: "transform, border-radius, opacity",
      }} />

      {/* Small outline circle */}
      <div className="hb3 absolute pointer-events-none" style={{
        width: "min(25vw, 280px)", height: "min(25vw, 280px)",
        top: "32%", left: "18%",
        border: "1px solid var(--fg)", opacity: 0.1,
        borderRadius: "50%",
        willChange: "transform, opacity",
      }} />

      {/* Tiny filled circle */}
      <div className="hb4 absolute pointer-events-none" style={{
        width: "min(10vw, 100px)", height: "min(10vw, 100px)",
        top: "18%", right: "30%",
        background: "var(--fg)", opacity: 0.06,
        borderRadius: "50%",
        willChange: "transform, opacity",
      }} />

      {/* Dot grid decorative */}
      <div className="absolute top-28 left-6 md:left-16 grid gap-2 opacity-25 anim-fade-in" style={{ gridTemplateColumns: "repeat(4, 4px)", animationDelay: "2.5s" }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fg)" }} />
        ))}
      </div>

      {/* Section index */}
      <div className="absolute top-28 right-6 md:right-16 flex flex-col items-end gap-1 anim-fade-in" style={{ animationDelay: "2.2s" }}>
        <span className="section-label">01 / 08</span>
        <span className="section-label" style={{ color: "var(--fg-subtle)" }}>Introduction</span>
      </div>

      <div className="hero-inner max-w-7xl w-full relative z-10">

        {/* ── NAME - dramatic stacked display ── */}
        <div className="mb-8 select-none" style={{ overflow: "hidden" }}>
          <div style={{ lineHeight: 0.86, letterSpacing: "-0.045em" }}>
            {/* NILESH - ultra-light italic, outlined */}
            <div
              className="hero-name-first font-serif block"
              style={{
                fontSize: "clamp(5rem, 14vw, 13rem)",
                fontWeight: 100,
                fontStyle: "italic",
                color: "transparent",
                WebkitTextStroke: "1.5px var(--fg)",
                opacity: 0.88,
              }}
            >
              Nilesh
            </div>
            {/* PATIL - ultra-bold filled */}
            <div
              className="hero-name-last font-serif block"
              style={{
                fontSize: "clamp(5rem, 14vw, 13rem)",
                fontWeight: 900,
                color: "var(--fg)",
                marginTop: "-0.06em",
              }}
            >
              Patil.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 anim-fade-in" style={{ animationDelay: "2.2s" }}>
          <div className="status-dot" />
          <span className="section-label" style={{ color: "var(--fg-muted)" }}>
            Available for work - Belgaum, Karnataka
          </span>
        </div>

        <h1 className="hero-headline" style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)" }}>
          <span className="hero-word inline-block">Building</span>{" "}
          <span className="hero-word inline-block">the</span>{" "}
          <strong className="hero-word inline-block">internet's</strong>{" "}
          <em className="hero-word inline-block">next layer.</em>
        </h1>

        <div className="mt-10 anim-fade-in" style={{ animationDelay: "2.4s" }}>
          <span className="font-mono" style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)", color: "var(--fg-muted)", letterSpacing: "0.06em" }}>
            {displayed}
            <span style={{ display: "inline-block", width: 1.5, height: "1em", background: "var(--fg-muted)", marginLeft: 3, verticalAlign: "middle", animation: "blink 1.1s step-end infinite" }} />
          </span>
        </div>

        <div className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 anim-fade-up" style={{ borderTop: "1px solid var(--border-color)", animationDelay: "2s" }}>
          {[
            { n: "19+", label: "Projects shipped",   cursor: "Built & shipped" },
            { n: "7",   label: "Live in production", cursor: "Real users" },
            { n: "3",   label: "Countries served",   cursor: "India · USA · Japan" },
            { n: "2+",  label: "Years building",     cursor: "And counting" },
          ].map(({ n, label, cursor }) => (
            <div key={label} data-cursor-text={cursor}>
              <p className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}>{n}</p>
              <p className="section-label mt-2">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 anim-fade-up" style={{ animationDelay: "2.3s" }}>
          <a href="#projects" className="btn-primary" data-cursor-text="Explore →">View work</a>
          <a href="#contact" className="btn-outline" data-cursor-text="Say hi ✦">Get in touch</a>
          <a href="https://github.com/nileshpatil6" target="_blank" rel="noopener noreferrer" className="btn-outline" data-cursor-text="Open source">GitHub ↗</a>
        </div>
      </div>

      <div className="hero-scroll-line absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 anim-fade-in" style={{ animationDelay: "2.8s" }}>
        <span className="section-label" style={{ letterSpacing: "0.22em" }}>scroll</span>
        <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, var(--fg-muted), transparent)`, transformOrigin: "top center" }} />
      </div>
    </section>
  );
}

