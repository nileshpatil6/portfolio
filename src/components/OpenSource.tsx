"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitMerge } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Merge = {
  org: string;
  orgLogo: string;        // unicode/glyph or short tag rendered in a chip
  repo: string;
  pr: number;
  title: string;
  url: string;
  impact: string;
  weight: "flagship" | "major";  // visual emphasis
  stack: string[];
};

const merges: Merge[] = [
  {
    org: "OpenAI",
    orgLogo: "◉",
    repo: "openai/openai-agents-python",
    pr: 2931,
    title: "Surface run-loop exceptions after stream_events() completes",
    url: "https://github.com/openai/openai-agents-python/pull/2931",
    impact: "Patched silent error suppression in OpenAI's official Python Agents SDK. Errors thrown inside the run loop after streaming now propagate correctly to the caller instead of disappearing.",
    weight: "flagship",
    stack: ["Python", "asyncio", "Agents SDK"],
  },
  {
    org: "Google",
    orgLogo: "G",
    repo: "google/osv-scanner",
    pr: 2762,
    title: "Skip packages with short commit hashes instead of aborting scan",
    url: "https://github.com/google/osv-scanner/pull/2762",
    impact: "Made Google's open-source vulnerability scanner resilient to malformed commit hashes. Previously a single short hash would crash the entire dependency scan; now the offending package is skipped and the scan continues.",
    weight: "flagship",
    stack: ["Go", "Security", "SBOM"],
  },
  {
    org: "Hugging Face",
    orgLogo: "🤗",
    repo: "huggingface/transformers",
    pr: 46006,
    title: "Fix owned_by field in GET /v1/models returns list instead of string",
    url: "https://github.com/huggingface/transformers/pull/46006",
    impact: "Repaired the OpenAI-compatible /v1/models endpoint in transformers-serve. Was returning a list and breaking every client SDK that follows the OpenAI spec.",
    weight: "flagship",
    stack: ["Python", "FastAPI", "transformers-serve"],
  },
  {
    org: "SchemaStore",
    orgLogo: "{ }",
    repo: "SchemaStore/schemastore",
    pr: 5707,
    title: "Allow wildcard-only args like Read(*) and Skill(*) in claude-code-settings",
    url: "https://github.com/SchemaStore/schemastore/pull/5707",
    impact: "Extended the Claude Code settings JSON schema consumed by VS Code, JetBrains, Sublime, and every editor that imports SchemaStore. Wildcard tool args no longer trigger false validation errors.",
    weight: "major",
    stack: ["JSON Schema", "DX"],
  },
  {
    org: "SchemaStore",
    orgLogo: "{ }",
    repo: "SchemaStore/schemastore",
    pr: 5643,
    title: "Add missing ES2022.Regexp and ES2023.Intl lib entries to tsconfig",
    url: "https://github.com/SchemaStore/schemastore/pull/5643",
    impact: "Updated the TypeScript config schema with missing modern lib entries. Powers autocomplete and validation for every tsconfig.json across the JS/TS ecosystem.",
    weight: "major",
    stack: ["TypeScript", "JSON Schema"],
  },
];

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".os-headline", {
        y: 60, opacity: 0, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ".os-headline", start: "top 85%", once: true },
      });

      gsap.from(".os-stat", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".os-stats", start: "top 88%", once: true },
      });

      gsap.from(".os-logo-chip", {
        y: 40, opacity: 0, scale: 0.85, duration: 0.7, stagger: 0.08, ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".os-logos", start: "top 88%", once: true },
      });

      gsap.from(".os-card", {
        y: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".os-cards", start: "top 85%", once: true },
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
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
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
        <p className="max-w-2xl mb-12 md:mb-16 leading-relaxed"
           style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", color: "var(--fg-muted)" }}>
          Not just opened. <span style={{ color: "var(--fg)", fontWeight: 600 }}>Merged.</span>{" "}
          Code I&apos;ve written that now ships inside the toolchains of OpenAI, Google,
          Hugging Face, and the JSON schemas every IDE on earth consumes.
        </p>

        {/* Stats banner */}
        <div className="os-stats grid grid-cols-2 md:grid-cols-4 gap-px mb-12 md:mb-14"
             style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}>
          {[
            { n: "5+",  label: "PRs merged",     sub: "in 2026 alone" },
            { n: "4",   label: "Major orgs",     sub: "OpenAI · Google · HF · SchemaStore" },
            { n: "3",   label: "Languages",      sub: "Python · Go · TypeScript" },
            { n: "100%", label: "Merge rate",    sub: "on production codebases" },
          ].map(s => (
            <div key={s.label}
                 className="os-stat p-5 md:p-6"
                 style={{ background: "var(--bg)" }}>
              <p className="font-serif" style={{
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                fontWeight: 700, color: "var(--fg)", lineHeight: 1,
              }}>{s.n}</p>
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
              { name: "OpenAI",       glyph: "◉",   accent: "#10a37f" },
              { name: "Google",       glyph: "G",   accent: "#4285f4" },
              { name: "Hugging Face", glyph: "🤗",  accent: "#ffaa00" },
              { name: "SchemaStore",  glyph: "{ }", accent: "#7c3aed" },
            ].map(org => (
              <div key={org.name}
                   className="os-logo-chip flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full"
                   style={{
                     border: "1px solid var(--border-color)",
                     background: "var(--bg-elevated)",
                   }}>
                <span className="font-mono text-base md:text-lg leading-none"
                      style={{ color: org.accent }}>{org.glyph}</span>
                <span className="text-xs md:text-sm font-medium" style={{ color: "var(--fg)" }}>
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
                  className="absolute left-0 top-5 md:top-7 bottom-5 md:bottom-7 w-[3px] rounded-full"
                  style={{ background: "var(--fg)" }}
                />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                {/* Left: org + repo */}
                <div className="md:w-56 flex-shrink-0 mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-lg leading-none" style={{ color: "var(--fg)" }}>
                      {m.orgLogo}
                    </span>
                    <span className="font-serif font-semibold" style={{ color: "var(--fg)", fontSize: "1.05rem" }}>
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
