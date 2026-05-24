"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { index: "01", title: "8× Hackathon Winner", body: "GDG, CodeBharat (₹50K), ONEST (₹25K), and 5 more competitions." },
  { index: "02", title: "NASA SpaceApps 1st Place", body: "Local round champion - competed globally with top engineers worldwide." },
  { index: "03", title: "₹2L Government Funded", body: "NAIN 2.0 Grant by Govt. of Karnataka. Co-founded MediAssist AI for real patients." },
  { index: "04", title: "7 Live Production Products", body: "TripOnBuddy, Unyfiny, CMN Services, Prasan Hom, AK Car Rentals, DataVerseAI, Text2DB." },
  { index: "05", title: "Freelance - India, USA, Japan", body: "Clients across 3 countries. Real-world impact in multiple domains." },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline dramatic entrance
      gsap.from(".ach-headline", {
        y: 100,
        opacity: 0,
        scale: 0.7,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".ach-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      // Each achievement row: clip-path wipe + slide-in with scrub
      gsap.utils.toArray<HTMLElement>(".ach-row").forEach((row, i) => {
        // The entire row slides in from the right with a scrub
        gsap.fromTo(row, {
          x: 180,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 60%",
            scrub: 0.6,
          }
        });

        // The big index number scales up then down
        const num = row.querySelector(".ach-num");
        if (num) {
          gsap.from(num, {
            scale: 4,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          });
        }
      });

      // Background shape morphs + parallaxes
      gsap.to(".ach-bg-shape", {
        y: -300,
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        rotation: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });

      // Education card slides up
      gsap.from(".ach-edu-card", {
        y: 60,
        opacity: 0,
        scale: 0.93,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".ach-edu-card",
          start: "top 88%",
          toggleActions: "play none none reverse",
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-24 md:py-28 px-6 md:px-16 overflow-hidden">

      {/* Background shape */}
      <div className="ach-bg-shape absolute pointer-events-none" style={{
        width: "min(70vw, 600px)", height: "min(70vw, 600px)",
        bottom: "0%", left: "-20%",
        background: "var(--fg)", opacity: 0.035,
        borderRadius: "50% 50% 40% 60% / 40% 60% 50% 50%",
        willChange: "transform, border-radius",
      }} />

      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">07 / 08</span>
          <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">Recognition</span>
        </div>

        <h2 className="ach-headline font-serif mb-16" style={{
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "var(--fg)", lineHeight: 1.05,
        }}>
          The <strong style={{ fontStyle: "normal", fontWeight: 800 }}>receipts.</strong>
        </h2>

        <div>
          {achievements.map((ach) => (
            <div
              key={ach.index}
              className="ach-row group flex gap-8 py-10 cursor-default"
              style={{ borderTop: "1px solid var(--border-color)" }}
            >
              <span
                className="ach-num font-mono flex-shrink-0"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                  paddingTop: "0.1rem",
                  minWidth: "2.5rem",
                }}
              >
                {ach.index}
              </span>
              <div className="flex-1">
                <h3 className="font-serif transition-all duration-300 group-hover:translate-x-2" style={{
                  fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                  fontWeight: 600, color: "var(--fg)", lineHeight: 1.2,
                }}>
                  {ach.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>{ach.body}</p>
              </div>
              <span className="self-center text-2xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" style={{ color: "var(--fg-subtle)" }}>
                →
              </span>
            </div>
          ))}
          <div className="divider" />
        </div>

        {/* Education */}
        <div className="ach-edu-card mt-16 p-10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}>
          <div>
            <p className="section-label mb-3">Education</p>
            <h3 className="font-serif text-2xl" style={{ color: "var(--fg)", fontWeight: 600 }}>B.E. in AI & Data Science</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>S.G. Balekundari Institute of Technology · 2023 – 2027</p>
          </div>
          <span className="font-mono text-xs px-5 py-2.5 rounded-full flex-shrink-0" style={{ border: "1px solid var(--border-color)", color: "var(--fg-muted)", background: "var(--bg)" }}>
            In Progress
          </span>
        </div>
      </div>
    </section>
  );
}

