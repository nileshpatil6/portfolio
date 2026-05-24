"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitMerge } from "lucide-react";
import GitHubActivity from "@/components/GitHubActivity";

gsap.registerPlugin(ScrollTrigger);

const getOrgChipStyle = (org: string, accent: string): React.CSSProperties => {
  if (org === "OpenAI") {
    return {
      background: "linear-gradient(135deg, rgba(120,120,120,0.18) 0%, rgba(0,0,0,0.04) 100%)",
      border: "1px solid rgba(0,0,0,0.18)",
    };
  }
  if (org === "Google") {
    return {
      background:
        "linear-gradient(135deg, rgba(66,133,244,0.14) 0%, rgba(52,168,83,0.12) 35%, rgba(251,188,5,0.14) 65%, rgba(234,67,53,0.14) 100%)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderImage:
        "linear-gradient(135deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%) 1",
    };
  }
  if (org === "SchemaStore") {
    return {
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(120,120,120,0.10) 50%, rgba(0,0,0,0.04) 100%)",
      border: "1px solid rgba(0,0,0,0.25)",
    };
  }
  return {
    background: `${accent}14`,
    border: `1px solid ${accent}55`,
  };
};

const getOrgTextColor = (org: string, accent: string): string => {
  if (org === "OpenAI" || org === "SchemaStore" || org === "Google") return "var(--fg)";
  return accent;
};

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
    <svg width={size} height={size} viewBox="0 0 95 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path fill="#FFD21E" d="M47.21 76.5a34.75 34.75 0 1 0 0-69.5 34.75 34.75 0 0 0 0 69.5Z" />
      <path fill="#FF9D0B" d="M81.96 41.75a34.75 34.75 0 1 0-69.5 0 34.75 34.75 0 0 0 69.5 0Zm-73.5 0a38.75 38.75 0 1 1 77.5 0 38.75 38.75 0 0 1-77.5 0Z" />
      <path fill="#3A3B45" d="M58.5 32.3c1.28.44 1.78 3.06 3.07 2.38a5 5 0 1 0-6.76-2.07c.61 1.15 2.55-.72 3.7-.32ZM34.95 32.3c-1.28.44-1.79 3.06-3.07 2.38a5 5 0 1 1 6.76-2.07c-.61 1.15-2.56-.72-3.7-.32Z" />
      <path fill="#FF323D" d="M46.96 56.29c9.83 0 13-8.76 13-13.26 0-2.34-1.57-1.6-4.09-.36-2.33 1.15-5.46 2.74-8.9 2.74-7.19 0-13-6.88-13-2.38s3.16 13.26 13 13.26Z" />
      <path fill="#3A3B45" fillRule="evenodd" clipRule="evenodd" d="M39.43 54a8.7 8.7 0 0 1 5.3-4.49c.4-.12.81.57 1.24 1.28.4.68.82 1.37 1.24 1.37.45 0 .9-.68 1.33-1.35.45-.7.89-1.38 1.32-1.25a8.61 8.61 0 0 1 5 4.17c3.73-2.94 5.1-7.74 5.1-10.7 0-2.34-1.57-1.6-4.09-.36l-.14.07c-2.31 1.15-5.39 2.67-8.77 2.67s-6.45-1.52-8.77-2.67c-2.6-1.29-4.23-2.1-4.23.29 0 3.05 1.46 8.06 5.47 10.97Z" />
      <path fill="#FF9D0B" d="M70.71 37a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM24.21 37a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM17.52 48c-1.62 0-3.06.66-4.07 1.87a5.97 5.97 0 0 0-1.33 3.76 7.1 7.1 0 0 0-1.94-.3c-1.55 0-2.95.59-3.94 1.66a5.8 5.8 0 0 0-.8 7 5.3 5.3 0 0 0-1.79 2.82c-.24.9-.48 2.8.8 4.74a5.22 5.22 0 0 0-.37 5.02c1.02 2.32 3.57 4.14 8.52 6.1 3.07 1.22 5.89 2 5.91 2.01a44.33 44.33 0 0 0 10.93 1.6c5.86 0 10.05-1.8 12.46-5.34 3.88-5.69 3.33-10.9-1.7-15.92-2.77-2.78-4.62-6.87-5-7.77-.78-2.66-2.84-5.62-6.25-5.62a5.7 5.7 0 0 0-4.6 2.46c-1-1.26-1.98-2.25-2.86-2.82A7.4 7.4 0 0 0 17.52 48Zm0 4c.51 0 1.14.22 1.82.65 2.14 1.36 6.25 8.43 7.76 11.18.5.92 1.37 1.31 2.14 1.31 1.55 0 2.75-1.53.15-3.48-3.92-2.93-2.55-7.72-.68-8.01.08-.02.17-.02.24-.02 1.7 0 2.45 2.93 2.45 2.93s2.2 5.52 5.98 9.3c3.77 3.77 3.97 6.8 1.22 10.83-1.88 2.75-5.47 3.58-9.16 3.58-3.81 0-7.73-.9-9.92-1.46-.11-.03-13.45-3.8-11.76-7 .28-.54.75-.76 1.34-.76 2.38 0 6.7 3.54 8.57 3.54.41 0 .7-.17.83-.6.79-2.85-12.06-4.05-10.98-8.17.2-.73.71-1.02 1.44-1.02 3.14 0 10.2 5.53 11.68 5.53.11 0 .2-.03.24-.1.74-1.2.33-2.04-4.9-5.2-5.21-3.16-8.88-5.06-6.8-7.33.24-.26.58-.38 1-.38 3.17 0 10.66 6.82 10.66 6.82s2.02 2.1 3.25 2.1c.28 0 .52-.1.68-.38.86-1.46-8.06-8.22-8.56-11.01-.34-1.9.24-2.85 1.31-2.85Z" />
      <path fill="#FFD21E" d="M38.6 76.69c2.75-4.04 2.55-7.07-1.22-10.84-3.78-3.77-5.98-9.3-5.98-9.3s-.82-3.2-2.69-2.9c-1.87.3-3.24 5.08.68 8.01 3.91 2.93-.78 4.92-2.29 2.17-1.5-2.75-5.62-9.82-7.76-11.18-2.13-1.35-3.63-.6-3.13 2.2.5 2.79 9.43 9.55 8.56 11-.87 1.47-3.93-1.71-3.93-1.71s-9.57-8.71-11.66-6.44c-2.08 2.27 1.59 4.17 6.8 7.33 5.23 3.16 5.64 4 4.9 5.2-.75 1.2-12.28-8.53-13.36-4.4-1.08 4.11 11.77 5.3 10.98 8.15-.8 2.85-9.06-5.38-10.74-2.18-1.7 3.21 11.65 6.98 11.76 7.01 4.3 1.12 15.25 3.49 19.08-2.12Z" />
      <path fill="#FF9D0B" d="M77.4 48c1.62 0 3.07.66 4.07 1.87a5.97 5.97 0 0 1 1.33 3.76 7.1 7.1 0 0 1 1.95-.3c1.55 0 2.95.59 3.94 1.66a5.8 5.8 0 0 1 .8 7 5.3 5.3 0 0 1 1.78 2.82c.24.9.48 2.8-.8 4.74a5.22 5.22 0 0 1 .37 5.02c-1.02 2.32-3.57 4.14-8.51 6.1-3.08 1.22-5.9 2-5.92 2.01a44.33 44.33 0 0 1-10.93 1.6c-5.86 0-10.05-1.8-12.46-5.34-3.88-5.69-3.33-10.9 1.7-15.92 2.78-2.78 4.63-6.87 5.01-7.77.78-2.66 2.83-5.62 6.24-5.62a5.7 5.7 0 0 1 4.6 2.46c1-1.26 1.98-2.25 2.87-2.82A7.4 7.4 0 0 1 77.4 48Zm0 4c-.51 0-1.13.22-1.82.65-2.13 1.36-6.25 8.43-7.76 11.18a2.43 2.43 0 0 1-2.14 1.31c-1.54 0-2.75-1.53-.14-3.48 3.91-2.93 2.54-7.72.67-8.01a1.54 1.54 0 0 0-.24-.02c-1.7 0-2.45 2.93-2.45 2.93s-2.2 5.52-5.97 9.3c-3.78 3.77-3.98 6.8-1.22 10.83 1.87 2.75 5.47 3.58 9.15 3.58 3.82 0 7.73-.9 9.93-1.46.1-.03 13.45-3.8 11.76-7-.29-.54-.75-.76-1.34-.76-2.38 0-6.71 3.54-8.57 3.54-.42 0-.71-.17-.83-.6-.8-2.85 12.05-4.05 10.97-8.17-.19-.73-.7-1.02-1.44-1.02-3.14 0-10.2 5.53-11.68 5.53-.1 0-.19-.03-.23-.1-.74-1.2-.34-2.04 4.88-5.2 5.23-3.16 8.9-5.06 6.8-7.33-.23-.26-.57-.38-.98-.38-3.18 0-10.67 6.82-10.67 6.82s-2.02 2.1-3.24 2.1a.74.74 0 0 1-.68-.38c-.87-1.46 8.05-8.22 8.55-11.01.34-1.9-.24-2.85-1.31-2.85Z" />
      <path fill="#FFD21E" d="M56.33 76.69c-2.75-4.04-2.56-7.07 1.22-10.84 3.77-3.77 5.97-9.3 5.97-9.3s.82-3.2 2.7-2.9c1.86.3 3.23 5.08-.68 8.01-3.92 2.93.78 4.92 2.28 2.17 1.51-2.75 5.63-9.82 7.76-11.18 2.13-1.35 3.64-.6 3.13 2.2-.5 2.79-9.42 9.55-8.55 11 .86 1.47 3.92-1.71 3.92-1.71s9.58-8.71 11.66-6.44c2.08 2.27-1.58 4.17-6.8 7.33-5.23 3.16-5.63 4-4.9 5.2.75 1.2 12.28-8.53 13.36-4.4 1.08 4.11-11.76 5.3-10.97 8.15.8 2.85 9.05-5.38 10.74-2.18 1.69 3.21-11.65 6.98-11.76 7.01-4.31 1.12-15.26 3.49-19.08-2.12Z" />
    </svg>
  );
  // SchemaStore - official JSON logo
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
    weight: "flagship",
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
    weight: "flagship",
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
      className="relative py-20 md:py-28 px-6 md:px-16 overflow-hidden"
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
                   style={getOrgChipStyle(org.name, org.accent)}>
                <OrgLogo org={org.name} size={18} />
                <span className="text-sm font-semibold" style={{ color: getOrgTextColor(org.name, org.accent) }}>
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
                  style={{
                    background:
                      m.org === "OpenAI"
                        ? "var(--fg)"
                        : m.org === "Google"
                        ? "linear-gradient(180deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)"
                        : m.org === "SchemaStore"
                        ? "linear-gradient(180deg, #000 0%, #888 50%, #000 100%)"
                        : m.accent,
                  }}
                />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                {/* Left: org logo + name + repo */}
                <div className="md:w-52 flex-shrink-0 mb-4 md:mb-0">
                  <div
                    className="os-card-orglogo inline-flex items-center gap-2.5 px-3 py-2 rounded-xl mb-2.5"
                    style={getOrgChipStyle(m.org, m.accent)}
                  >
                    <OrgLogo org={m.org} size={22} />
                    <span className="font-semibold text-sm" style={{ color: getOrgTextColor(m.org, m.accent) }}>
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

        {/* Live GitHub contribution heatmap */}
        <GitHubActivity />

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
