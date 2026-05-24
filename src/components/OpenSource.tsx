"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitMerge } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OrgLogo = ({ org, size = 20 }: { org: string; size?: number }) => {
  if (org === "OpenAI") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--fg)", flexShrink: 0 }}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
  if (org === "Google") return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
  if (org === "Hugging Face") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFD21E" style={{ flexShrink: 0 }}>
      <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624" />
    </svg>
  );
  // SchemaStore — official JSON logo
  return (
    <img
      src="/logos/schemastore.png"
      alt="SchemaStore"
      width={size}
      height={size}
      style={{ flexShrink: 0, display: "block", objectFit: "contain" }}
    />
  );
};

type Merge = {
  org: string;
  repo: string;
  pr: number;
  title: string;
  url: string;
  impact: string;
  weight: "flagship" | "major";
  stack: string[];
  accent: string;
};

const merges: Merge[] = [
  {
    org: "OpenAI",
    repo: "openai/openai-agents-python",
    pr: 2931,
    title: "Surface run-loop exceptions after stream_events() completes",
    url: "https://github.com/openai/openai-agents-python/pull/2931",
    impact: "Patched silent error suppression in OpenAI's official Python Agents SDK. Errors thrown inside the run loop after streaming now propagate correctly to the caller instead of disappearing.",
    weight: "flagship",
    stack: ["Python", "asyncio", "Agents SDK"],
    accent: "#10a37f",
  },
  {
    org: "Google",
    repo: "google/osv-scanner",
    pr: 2762,
    title: "Skip packages with short commit hashes instead of aborting scan",
    url: "https://github.com/google/osv-scanner/pull/2762",
    impact: "Made Google's open-source vulnerability scanner resilient to malformed commit hashes. Previously a single short hash would crash the entire dependency scan; now the offending package is skipped and the scan continues.",
    weight: "flagship",
    stack: ["Go", "Security", "SBOM"],
    accent: "#4285f4",
  },
  {
    org: "Hugging Face",
    repo: "huggingface/transformers",
    pr: 46006,
    title: "Fix owned_by field in GET /v1/models returns list instead of string",
    url: "https://github.com/huggingface/transformers/pull/46006",
    impact: "Repaired the OpenAI-compatible /v1/models endpoint in transformers-serve. Was returning a list and breaking every client SDK that follows the OpenAI spec.",
    weight: "flagship",
    stack: ["Python", "FastAPI", "transformers-serve"],
    accent: "#ffaa00",
  },
  {
    org: "SchemaStore",
    repo: "SchemaStore/schemastore",
    pr: 5707,
    title: "Allow wildcard-only args like Read(*) and Skill(*) in claude-code-settings",
    url: "https://github.com/SchemaStore/schemastore/pull/5707",
    impact: "Extended the Claude Code settings JSON schema consumed by VS Code, JetBrains, Sublime, and every editor that imports SchemaStore. Wildcard tool args no longer trigger false validation errors.",
    weight: "major",
    stack: ["JSON Schema", "DX"],
    accent: "#7c3aed",
  },
  {
    org: "SchemaStore",
    repo: "SchemaStore/schemastore",
    pr: 5643,
    title: "Add missing ES2022.Regexp and ES2023.Intl lib entries to tsconfig",
    url: "https://github.com/SchemaStore/schemastore/pull/5643",
    impact: "Updated the TypeScript config schema with missing modern lib entries. Powers autocomplete and validation for every tsconfig.json across the JS/TS ecosystem.",
    weight: "major",
    stack: ["TypeScript", "JSON Schema"],
    accent: "#7c3aed",
  },
];

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline: dramatic scale + slide
      gsap.from(".os-headline", {
        scale: 0.6, y: 100, opacity: 0, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: ".os-headline", start: "top 85%", once: true },
      });

      // Subhead fade
      gsap.from(".os-subhead", {
        y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "expo.out",
        scrollTrigger: { trigger: ".os-headline", start: "top 85%", once: true },
      });

      // Stats: each pops in from a different direction with rotation
      gsap.utils.toArray<HTMLElement>(".os-stat").forEach((stat, i) => {
        gsap.from(stat, {
          y: i % 2 === 0 ? -120 : 120,
          x: i === 0 ? -80 : i === 3 ? 80 : 0,
          opacity: 0,
          scale: 0.5,
          rotation: (i - 1.5) * 8,
          duration: 1.1,
          delay: i * 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: ".os-stats", start: "top 90%", once: true },
        });
      });

      // Stat numbers count up
      gsap.utils.toArray<HTMLElement>(".os-stat-num").forEach((el) => {
        const target = el.getAttribute("data-target");
        if (!target) return;
        const num = parseInt(target, 10);
        if (isNaN(num)) return;
        const suffix = el.getAttribute("data-suffix") ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: num,
          duration: 1.6,
          delay: 0.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".os-stats", start: "top 90%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      });

      // Logo chips: fly in from radial positions with rotation
      gsap.utils.toArray<HTMLElement>(".os-logo-chip").forEach((chip, i) => {
        const angle = (i / 4) * Math.PI * 2;
        gsap.from(chip, {
          x: Math.cos(angle) * 300,
          y: Math.sin(angle) * 200,
          rotation: (Math.random() - 0.5) * 90,
          opacity: 0,
          scale: 0.3,
          duration: 1.2,
          delay: i * 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".os-logos", start: "top 88%", once: true },
        });
      });

      // Cards: alternate sides with rotation + scale, dramatic stagger
      gsap.utils.toArray<HTMLElement>(".os-card").forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(card,
          {
            x: fromLeft ? -250 : 250,
            opacity: 0,
            rotation: fromLeft ? -6 : 6,
            scale: 0.85,
          },
          {
            x: 0, opacity: 1, rotation: 0, scale: 1,
            duration: 1.2,
            delay: i * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: ".os-cards", start: "top 92%", once: true },
            immediateRender: false,
            clearProps: "transform",
          }
        );

        // Org logo inside card pops with bounce
        const logo = card.querySelector(".os-card-orglogo");
        if (logo) {
          gsap.from(logo, {
            scale: 0,
            rotation: -180,
            duration: 0.9,
            delay: i * 0.12 + 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: ".os-cards", start: "top 92%", once: true },
          });
        }

        // Accent line draws in
        const accent = card.querySelector(".os-card-accent");
        if (accent) {
          gsap.from(accent, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.8,
            delay: i * 0.12 + 0.3,
            ease: "expo.out",
            scrollTrigger: { trigger: ".os-cards", start: "top 92%", once: true },
          });
        }
      });

      // Background grid parallax + opacity pulse
      gsap.to(".os-bg-grid", {
        y: -150,
        opacity: 0.045,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Background morph blob
      gsap.to(".os-bg-blob", {
        y: -200,
        rotation: 60,
        borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
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
    <section
      id="opensource"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      {/* Subtle code-pattern background */}
      <div
        className="os-bg-grid absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Morphing blob */}
      <div
        className="os-bg-blob absolute pointer-events-none"
        style={{
          width: "min(70vw, 600px)", height: "min(70vw, 600px)",
          top: "20%", right: "-25%",
          background: "var(--fg)", opacity: 0.035,
          borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
          willChange: "transform, border-radius",
        }}
      />

      <div className="divider mb-16 md:mb-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header strip */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">05 / 08</span>
          <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">Open Source</span>
        </div>

        {/* Headline */}
        <h2
          className="os-headline font-serif mb-4"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            fontWeight: 300, fontStyle: "italic",
            color: "var(--fg)", lineHeight: 1.02,
            letterSpacing: "-0.015em",
          }}
        >
          Merged into the tools{" "}
          <strong style={{ fontStyle: "normal", fontWeight: 800 }}>
            developers actually use.
          </strong>
        </h2>
        <p className="os-subhead max-w-2xl mb-12 md:mb-16 leading-relaxed"
           style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", color: "var(--fg-muted)" }}>
          Not just opened. <span style={{ color: "var(--fg)", fontWeight: 600 }}>Merged.</span>{" "}
          Code I&apos;ve written that now ships inside the toolchains of OpenAI, Google,
          Hugging Face, and the JSON schemas every IDE on earth consumes.
        </p>

        {/* Stats banner */}
        <div className="os-stats grid grid-cols-2 md:grid-cols-4 gap-px mb-12 md:mb-14"
             style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}>
          {[
            { target: 5,   suffix: "+", label: "PRs merged",  sub: "in 2026 alone" },
            { target: 4,   suffix: "",  label: "Major orgs",  sub: "OpenAI · Google · HF · SchemaStore" },
            { target: 3,   suffix: "",  label: "Languages",   sub: "Python · Go · TypeScript" },
            { target: 100, suffix: "%", label: "Merge rate",  sub: "on production codebases" },
          ].map(s => (
            <div key={s.label}
                 className="os-stat p-5 md:p-6"
                 style={{ background: "var(--bg)" }}>
              <p className="os-stat-num font-serif"
                 data-target={s.target}
                 data-suffix={s.suffix}
                 style={{
                   fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                   fontWeight: 700, color: "var(--fg)", lineHeight: 1,
                 }}>0{s.suffix}</p>
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--fg)" }}>{s.label}</p>
              <p className="mt-1 section-label" style={{ fontSize: "0.6rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Logo chips strip */}
        <div className="os-logos mb-12 md:mb-14">
          <p className="section-label mb-4">Code shipped into</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {[
              { name: "OpenAI",       accent: "#10a37f" },
              { name: "Google",       accent: "#4285f4" },
              { name: "Hugging Face", accent: "#ffaa00" },
              { name: "SchemaStore",  accent: "#7c3aed" },
            ].map(org => (
              <div key={org.name}
                   className="os-logo-chip flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                   style={{
                     border: `1px solid ${org.accent}40`,
                     background: `${org.accent}0d`,
                   }}>
                <OrgLogo org={org.name} size={18} />
                <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {org.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Merge cards */}
        <div className="os-cards space-y-3 md:space-y-4">
          {merges.map(m => (
            <a
              key={m.url}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="View PR on GitHub ↗"
              className={`os-card block group relative p-5 md:p-7 rounded-2xl transition-all duration-200 hover:translate-y-[-2px]`}
              style={{
                border: "1px solid var(--border-color)",
                background: "var(--bg-elevated)",
              }}
            >
              {/* Flagship accent line */}
              {m.weight === "flagship" && (
                <span
                  className="os-card-accent absolute left-0 top-5 md:top-7 bottom-5 md:bottom-7 w-[3px] rounded-full"
                  style={{ background: m.accent }}
                />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                {/* Left: org logo + name + repo */}
                <div className="md:w-52 flex-shrink-0 mb-4 md:mb-0">
                  <div
                    className="os-card-orglogo inline-flex items-center gap-2.5 px-3 py-2 rounded-xl mb-2.5"
                    style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}30` }}
                  >
                    <OrgLogo org={m.org} size={22} />
                    <span className="font-semibold text-sm" style={{ color: m.accent }}>
                      {m.org}
                    </span>
                  </div>
                  <p className="font-mono text-xs break-all" style={{ color: "var(--fg-subtle)" }}>
                    {m.repo}
                  </p>
                </div>

                {/* Middle: title + impact + stack */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="font-serif font-medium leading-snug"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                        color: "var(--fg)",
                      }}
                    >
                      {m.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: "var(--fg)" }}
                    />
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                    {m.impact}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* MERGED badge */}
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        background: "rgba(139, 92, 246, 0.1)",
                        color: "#8b5cf6",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      <GitMerge size={10} strokeWidth={2.5} />
                      MERGED · #{m.pr}
                    </span>
                    {m.stack.map(t => (
                      <span key={t} className="skill-tag" style={{ fontSize: "0.6rem" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
             style={{ borderTop: "1px solid var(--border-color)" }}>
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
            Every merge above is verifiable. Click any card to see the diff, the review thread, and the commit.
          </p>
          <a
            href="https://github.com/nileshpatil6"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="GitHub profile ↗"
            className="btn-outline"
            style={{ fontSize: "0.75rem" }}
          >
            See all on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
