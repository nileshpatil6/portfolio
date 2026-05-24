"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const USERNAME = "nileshpatil6";
const API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ApiResp = {
  total: Record<string, number>;
  contributions: Day[];
};

const LEVEL_COLORS = [
  "var(--border-color)",
  "rgba(16,163,127,0.30)",
  "rgba(16,163,127,0.55)",
  "rgba(16,163,127,0.80)",
  "#10a37f",
];

export default function GitHubActivity() {
  const [data, setData] = useState<ApiResp | null>(null);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(API)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((d: ApiResp) => { if (!cancelled) setData(d); })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!data || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".gh-cell", {
        opacity: 0,
        scale: 0.4,
        duration: 0.6,
        stagger: { each: 0.0015, from: "start" },
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });

      gsap.from(".gh-meta", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });

      if (numRef.current) {
        const target = data.total.lastYear ?? 0;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = Math.round(obj.v).toLocaleString();
          },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [data]);

  // Build weeks (columns) from contributions array. GitHub aligns to weeks starting Sunday.
  const days = data?.contributions ?? [];
  const weeks: Day[][] = [];
  if (days.length) {
    let week: Day[] = [];
    const firstDow = new Date(days[0].date).getUTCDay();
    for (let i = 0; i < firstDow; i++) {
      week.push({ date: "", count: -1, level: 0 });
    }
    for (const d of days) {
      week.push(d);
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length) weeks.push(week);
  }

  const total = data?.total.lastYear ?? 0;
  const peakDay = days.reduce<Day | null>((a, b) => (b.count > (a?.count ?? -1) ? b : a), null);
  const activeDays = days.filter(d => d.count > 0).length;
  const longestStreak = (() => {
    let max = 0, cur = 0;
    for (const d of days) {
      if (d.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0;
    }
    return max;
  })();

  return (
    <div ref={ref} className="gh-activity mt-10 md:mt-14">
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          border: "1px solid var(--border-color)",
          background: "var(--bg-elevated)",
        }}
      >
        {/* Top row: title + live badge + GitHub link */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="font-mono inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  background: "rgba(16,163,127,0.10)",
                  color: "#10a37f",
                  border: "1px solid rgba(16,163,127,0.35)",
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: 999,
                    background: "#10a37f",
                    animation: "gh-pulse 1.6s ease-in-out infinite",
                  }}
                />
                LIVE · GitHub API
              </span>
            </div>
            <h3 className="font-serif" style={{
              fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
              fontWeight: 600, color: "var(--fg)", lineHeight: 1.15,
            }}>
              Always shipping.
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
              Live contribution graph from @{USERNAME}. Updates automatically.
            </p>
          </div>

          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="View on GitHub ↗"
            className="btn-outline"
            style={{ fontSize: "0.72rem" }}
          >
            github.com/{USERNAME} →
          </a>
        </div>

        {/* Heatmap */}
        <div
          className="relative w-full overflow-x-auto"
          style={{ scrollbarWidth: "thin" }}
        >
          {error && (
            <p className="text-sm py-8 text-center" style={{ color: "var(--fg-muted)" }}>
              Could not load contribution data. <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "underline" }}>View on GitHub →</a>
            </p>
          )}
          {!data && !error && (
            <div className="py-10 flex items-center justify-center">
              <div className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
                Fetching live data from GitHub...
              </div>
            </div>
          )}
          {data && (
            <div className="flex gap-[3px] min-w-fit pb-2">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((d, di) => (
                    <div
                      key={di}
                      className="gh-cell"
                      title={d.date ? `${d.date}: ${d.count} contribution${d.count === 1 ? "" : "s"}` : ""}
                      style={{
                        width: "clamp(8px, 1vw, 12px)",
                        height: "clamp(8px, 1vw, 12px)",
                        borderRadius: 2,
                        background: d.count < 0 ? "transparent" : LEVEL_COLORS[d.level],
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        {data && (
          <div className="mt-3 flex items-center justify-end gap-1.5">
            <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--fg-subtle)" }}>Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <span key={i} style={{
                width: 10, height: 10, borderRadius: 2, background: c,
              }} />
            ))}
            <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--fg-subtle)" }}>More</span>
          </div>
        )}

        {/* Stats row */}
        {data && (
          <div
            className="mt-6 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <div className="gh-meta">
              <p className="font-serif" style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                fontWeight: 700, color: "var(--fg)", lineHeight: 1,
              }}>
                <span ref={numRef}>0</span>
              </p>
              <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--fg)" }}>Contributions</p>
              <p className="mt-0.5 section-label" style={{ fontSize: "0.55rem" }}>last 365 days</p>
            </div>
            <div className="gh-meta">
              <p className="font-serif" style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                fontWeight: 700, color: "var(--fg)", lineHeight: 1,
              }}>{activeDays}</p>
              <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--fg)" }}>Active days</p>
              <p className="mt-0.5 section-label" style={{ fontSize: "0.55rem" }}>
                {((activeDays / Math.max(days.length, 1)) * 100).toFixed(0)}% of year
              </p>
            </div>
            <div className="gh-meta">
              <p className="font-serif" style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                fontWeight: 700, color: "var(--fg)", lineHeight: 1,
              }}>{longestStreak}</p>
              <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--fg)" }}>Longest streak</p>
              <p className="mt-0.5 section-label" style={{ fontSize: "0.55rem" }}>consecutive days</p>
            </div>
            <div className="gh-meta">
              <p className="font-serif" style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                fontWeight: 700, color: "var(--fg)", lineHeight: 1,
              }}>{peakDay?.count ?? 0}</p>
              <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--fg)" }}>Peak day</p>
              <p className="mt-0.5 section-label" style={{ fontSize: "0.55rem" }}>
                {peakDay?.date ? new Date(peakDay.date).toLocaleDateString("en", { month: "short", day: "numeric" }) : "-"}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Compact note */}
      <p className="mt-3 text-center font-mono" style={{ fontSize: "0.6rem", color: "var(--fg-subtle)", letterSpacing: "0.06em" }}>
        {data ? `${total.toLocaleString()} contributions in the last 365 days · fetched in real time` : "Fetching live data..."}
      </p>
    </div>
  );
}
