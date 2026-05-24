"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitMerge } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OrgLogo = ({ org, size = 20 }: { org: string; size?: number }) => {
  if (org === "OpenAI") return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="currentColor" style={{ color: "#10a37f", flexShrink: 0 }}>
      <path d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.51 7.064 7.064 0 0 0-7.626-3.38A7.025 7.025 0 0 0 12.64.116a7.064 7.064 0 0 0-6.738 4.875 7.036 7.036 0 0 0-4.708 3.393 7.064 7.064 0 0 0 .88 8.273 6.889 6.889 0 0 0 .607 5.51 7.065 7.065 0 0 0 7.627 3.38 7.028 7.028 0 0 0 5.28 2.453 7.065 7.065 0 0 0 6.74-4.877 7.036 7.036 0 0 0 4.707-3.393 7.065 7.065 0 0 0-.88-8.27zm-9.801 13.548a5.266 5.266 0 0 1-3.37-1.219c.042-.023.116-.063.165-.094l5.594-3.205a.91.91 0 0 0 .462-.793V13.25l2.363 1.356a.085.085 0 0 1 .046.064v6.48c-.002 2.9-2.363 5.257-5.26 5.258zM4.26 20.278a5.235 5.235 0 0 1-.636-3.531c.042.026.115.07.165.099l5.594 3.205a.916.916 0 0 0 .925 0l6.83-3.918V18.5a.087.087 0 0 1-.034.072l-5.657 3.245a5.261 5.261 0 0 1-7.187-1.54zm-1.699-12.14a5.24 5.24 0 0 1 2.75-2.31V12.5a.91.91 0 0 0 .461.793l6.83 3.916-2.363 1.356a.086.086 0 0 1-.08.009L4.5 15.333a5.261 5.261 0 0 1-1.939-7.195zm19.393 4.503l-6.83-3.918 2.363-1.354a.085.085 0 0 1 .08-.009l5.659 3.24a5.254 5.254 0 0 1-.814 9.47V14.25a.91.91 0 0 0-.458-.81zm2.35-3.547c-.043-.026-.116-.07-.166-.099l-5.593-3.205a.916.916 0 0 0-.926 0L10.789 9.71V7.5a.087.087 0 0 1 .034-.072l5.657-3.242a5.26 5.26 0 0 1 7.823 5.449v.008zm-14.82 4.844L7.12 12.58a.086.086 0 0 1-.046-.065V6.034a5.26 5.26 0 0 1 8.63-4.027 4.75 4.75 0 0 0-.165.094l-5.594 3.205a.91.91 0 0 0-.461.793v7.838L7.484 13.938zm1.284-2.759l3.04-1.742 3.04 1.74v3.481l-3.04 1.742-3.04-1.742V11.18z" />
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="11" r="8.5" fill="#ffcc4d" />
      <circle cx="9.2" cy="10" r="1.15" fill="#664500" />
      <circle cx="14.8" cy="10" r="1.15" fill="#664500" />
      <path d="M8.5 13.8c.8 1.5 2.2 2.2 3.5 2.2s2.7-.7 3.5-2.2" stroke="#664500" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M7 6.5c-.5-1.4-2.2-1.8-3-0.6" stroke="#ffaa00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M17 6.5c.5-1.4 2.2-1.8 3-0.6" stroke="#ffaa00" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
  // SchemaStore
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="3" width="20" height="18" rx="3" stroke="#7c3aed" strokeWidth="1.8" />
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8l-2 8" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
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
                  className="absolute left-0 top-5 md:top-7 bottom-5 md:bottom-7 w-[3px] rounded-full"
                  style={{ background: m.accent }}
                />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                {/* Left: org logo + name + repo */}
                <div className="md:w-52 flex-shrink-0 mb-4 md:mb-0">
                  <div
                    className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl mb-2.5"
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
