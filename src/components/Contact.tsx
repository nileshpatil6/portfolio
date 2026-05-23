"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Email", value: "technil6436@gmail.com", href: "mailto:technil6436@gmail.com" },
  { label: "GitHub", value: "github.com/nileshpatil6", href: "https://github.com/nileshpatil6" },
  { label: "LinkedIn", value: "linkedin.com/in/nileshpatil6", href: "https://linkedin.com/in/nileshpatil6" },
  { label: "HuggingFace", value: "huggingface.co/Mr66", href: "https://huggingface.co/Mr66" },
  { label: "Phone", value: "+91 8431496045", href: "tel:+918431496045" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const copy = () => {
    navigator.clipboard.writeText("technil6436@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".contact-word");
      const positions = [
        { x: -600, y: -200, rotation: -18, scale: 0.4 },
        { x: 600, y: -300, rotation: 15, scale: 0.5 },
        { x: -400, y: 300, rotation: -10, scale: 0.6 },
        { x: 500, y: 200, rotation: 12, scale: 0.5 },
      ];
      words.forEach((w, i) => {
        const off = positions[i % positions.length];
        gsap.from(w, {
          ...off,
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".contact-headline",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        });
      });

      gsap.fromTo(".cb1", { x: "-60vw", opacity: 0 }, {
        x: 0, opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
        }
      });
      gsap.fromTo(".cb2", { x: "60vw", opacity: 0 }, {
        x: 0, opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
        }
      });

      gsap.to([".cb1", ".cb2"], {
        borderRadius: "50%",
        scale: 0.3,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "center center",
          scrub: 1,
        }
      });

      gsap.from(".contact-link", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 88%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(".contact-cta", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".contact-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-16 overflow-hidden">

      {/* Blob left */}
      <div className="cb1 absolute pointer-events-none" style={{
        width: "min(70vw, 600px)", height: "min(70vw, 600px)",
        top: "5%", left: "-30%",
        background: "var(--fg)", opacity: 0.04,
        borderRadius: "55% 45% 40% 60% / 60% 40% 55% 45%",
        willChange: "transform, border-radius, opacity",
      }} />

      {/* Blob right */}
      <div className="cb2 absolute pointer-events-none" style={{
        width: "min(60vw, 500px)", height: "min(60vw, 500px)",
        bottom: "10%", right: "-25%",
        background: "var(--fg)", opacity: 0.04,
        borderRadius: "45% 55% 60% 40% / 40% 60% 45% 55%",
        willChange: "transform, border-radius, opacity",
      }} />

      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="mb-24">
          <p className="section-label mb-6">07 / 07 · Let's talk</p>
          <h2 className="contact-headline font-serif" style={{
            fontSize: "clamp(2.4rem, 9vw, 8rem)",
            fontWeight: 300, fontStyle: "italic",
            color: "var(--fg)", lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}>
            <span className="contact-word inline-block">Got a</span>{" "}
            <span className="contact-word inline-block">project?</span>
            <br />
            <strong className="contact-word inline-block" style={{ fontStyle: "normal", fontWeight: 800 }}>Let's</strong>{" "}
            <strong className="contact-word inline-block" style={{ fontStyle: "normal", fontWeight: 800 }}>build it.</strong>
          </h2>
          <p className="mt-10 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Open to freelance, collaborations, and full-time roles.
            Building remotely from Belgaum, Karnataka.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={copy} data-testid="button-copy-email" className="contact-cta btn-primary" data-cursor-text="Copy to clipboard">
              {copied ? "Copied ✓" : "Copy email"}
            </button>
            <a href="mailto:technil6436@gmail.com" className="contact-cta btn-outline" data-cursor-text="Send email ✦">Send message →</a>
          </div>
        </div>

        {/* Links */}
        <div className="contact-links">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-testid={`link-contact-${link.label.toLowerCase()}`}
              data-cursor-text={link.label + " ↗"}
              className="contact-link group block py-5 transition-all duration-200"
              style={{
                borderTop: "1px solid var(--border-color)",
                borderBottom: i === links.length - 1 ? "1px solid var(--border-color)" : "none",
              }}
            >
              <div className="flex items-start sm:items-center justify-between gap-2">
                {/* Label + value — stacked on mobile, row on sm+ */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 min-w-0 flex-1">
                  <span
                    className="section-label flex-shrink-0 sm:w-28 mb-0.5 sm:mb-0"
                    style={{ display: "block" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-sm sm:text-base font-medium transition-all duration-200 group-hover:translate-x-2 truncate"
                    style={{ color: "var(--fg)" }}
                  >
                    {link.value}
                  </span>
                </div>
                <span
                  className="text-xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 self-center"
                  style={{ color: "var(--fg-subtle)" }}
                >↗</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3" style={{ borderTop: "1px solid var(--border-color)" }}>
          <p className="section-label">© {new Date().getFullYear()} Nilesh S. Patil · Belgaum, India</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            <a href="https://github.com/nileshpatil6" target="_blank" rel="noopener noreferrer" className="section-label hover:text-[var(--fg)] transition-colors" data-cursor-text="GitHub ↗">GitHub</a>
            <span className="section-label opacity-30">/</span>
            <a href="https://linkedin.com/in/nileshpatil6" target="_blank" rel="noopener noreferrer" className="section-label hover:text-[var(--fg)] transition-colors" data-cursor-text="LinkedIn ↗">LinkedIn</a>
            <span className="section-label opacity-30">/</span>
            <a href="mailto:technil6436@gmail.com" className="section-label hover:text-[var(--fg)] transition-colors" data-cursor-text="Email ↗">Email</a>
            <span className="section-label opacity-30">·</span>
            <p className="section-label">Built with Next.js · GSAP · Fraunces</p>
          </div>
        </div>
      </div>
    </section>
  );
}

