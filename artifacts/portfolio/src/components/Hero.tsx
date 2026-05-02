import { useEffect, useRef, useState } from "react";

const roles = ["Full Stack Developer", "GenAI Engineer", "Agentic AI Builder", "Hackathon Champion", "Founder & Builder"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const tickRef = useRef<ReturnType<typeof setTimeout>>();

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

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 pt-32 px-6 md:px-16 overflow-hidden">

      {/* Section index */}
      <div
        className="absolute top-28 right-6 md:right-16 flex flex-col items-end gap-1 anim-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="section-label">01 / 05</span>
        <span className="section-label" style={{ color: "var(--fg-subtle)" }}>Introduction</span>
      </div>

      <div className="max-w-7xl w-full">
        {/* Availability badge */}
        <div className="flex items-center gap-2 mb-10 anim-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="status-dot" />
          <span className="section-label" style={{ color: "var(--fg-muted)" }}>
            Available for work — Belgaum, Karnataka
          </span>
        </div>

        {/* Hero headline */}
        <h1
          className="hero-headline anim-fade-up"
          style={{
            fontSize: "clamp(3.2rem, 8.5vw, 9rem)",
            animationDelay: "0.2s",
          }}
        >
          Building the<br />
          <strong>internet's</strong>
          <br />
          <em>next layer.</em>
        </h1>

        {/* Typewriter */}
        <div className="mt-10 anim-fade-up" style={{ animationDelay: "0.4s" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
              color: "var(--fg-muted)",
              letterSpacing: "0.06em",
            }}
          >
            {displayed}
            <span
              style={{
                display: "inline-block",
                width: 1.5,
                height: "1em",
                background: "var(--fg-muted)",
                marginLeft: 3,
                verticalAlign: "middle",
                animation: "blink 1.1s step-end infinite",
              }}
            />
          </span>
        </div>

        {/* Divider + stats */}
        <div
          className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 anim-fade-up"
          style={{ borderTop: "1px solid var(--border-color)", animationDelay: "0.5s" }}
        >
          {[
            { n: "19+", label: "Projects shipped" },
            { n: "8×",  label: "Hackathon wins" },
            { n: "₹2L", label: "Government funded" },
            { n: "2+",  label: "Years building" },
          ].map(({ n, label }) => (
            <div key={label}>
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  color: "var(--fg)",
                  lineHeight: 1,
                }}
              >
                {n}
              </p>
              <p className="section-label mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-3 anim-fade-up" style={{ animationDelay: "0.65s" }}>
          <a href="#projects" className="btn-primary">View work</a>
          <a href="#contact" className="btn-outline">Get in touch</a>
          <a
            href="https://github.com/nileshpatil6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 anim-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="section-label" style={{ letterSpacing: "0.22em" }}>scroll</span>
        <div
          style={{
            width: 1,
            height: 44,
            background: `linear-gradient(to bottom, var(--fg-muted), transparent)`,
          }}
        />
      </div>
    </section>
  );
}
