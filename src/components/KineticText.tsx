"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { word: "BUILD",  fill: true  },
  { word: "SHIP",   fill: false },
  { word: "WIN",    fill: true  },
  { word: "REPEAT", fill: false },
] as const;

const ROW_VH  = 120;
const OVER_VH = 32;

export default function KineticText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      LINES.forEach((_, li) => {
        const row        = sectionRef.current!.querySelector<HTMLElement>(`.kt-row-${li}`)!;
        const mainChars  = gsap.utils.toArray<HTMLElement>(".kt-main",   row);
        const dripInners = gsap.utils.toArray<HTMLElement>(".kt-drip-i", row);

        gsap.set(mainChars,  { scaleY: 1, transformOrigin: "50% 0%", immediateRender: true });
        gsap.set(dripInners, { scaleY: 0, opacity: 0, transformOrigin: "50% 0%", immediateRender: true });

        const n       = mainChars.length;
        const step    = n > 1 ? 0.55 / (n - 1) : 0;
        const charDur = 0.30;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start:   "top top",
            end:     "bottom top",
            scrub:   1,
            invalidateOnRefresh: true,
          },
        });

        mainChars.forEach((char, i) => {
          const t0 = i * step;
          tl.to(char,         { scaleY: 0,    ease: "none", duration: charDur }, t0);
          tl.to(dripInners[i],{ scaleY: 0.9, opacity: 0.7, ease: "none", duration: charDur + 0.05 }, t0);
        });
      });

      /* Refresh after layout settles so triggers register at correct positions
         (section was moved between Achievements and Contact). */
      const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(refreshTimer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    /*
     * IMPORTANT: do NOT set overflow: hidden on this section.
     * overflow: hidden makes the section a scroll container which
     * breaks position: sticky on child rows (sticky needs to track
     * the nearest scrollable ancestor - the page, not this section).
     */
    <section
      ref={sectionRef}
      aria-label="Kinetic type"
      style={{ background: "var(--bg)", position: "relative" }}
    >
      {/* ── floating label ── */}
      <div style={{
        position: "absolute", top: "5vh", left: "clamp(1.5rem, 5vw, 4rem)", zIndex: 25,
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--app-font-mono)", fontSize: "0.5rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--fg-subtle)",
        }}>
          Builder · Mantra
        </span>
      </div>

      {/* ── rows ── */}
      {LINES.map((line, li) => {
        const isLast = li === LINES.length - 1;
        const isFill = line.fill;
        const chars  = line.word.split("");

        return (
          <div
            key={li}
            className={`kt-row-${li}`}
            style={{
              position:     "relative",
              height:       `${ROW_VH}vh`,
              marginBottom: isLast ? 0 : `-${OVER_VH}vh`,
              zIndex:       li + 1,
            }}
          >
            {/* Sticky panel - visible for the full ROW_VH scroll range */}
            <div style={{
              position:       "sticky",
              top:            0,
              height:         "100vh",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     "var(--bg)",
              /* clip horizontal bleed without breaking sticky */
              overflowX:      "clip",
              overflowY:      "visible",
            }}>
              {/* row counter */}
              <span style={{
                position: "absolute", left: "clamp(1.5rem, 5vw, 4rem)", bottom: "10vh",
                fontFamily: "var(--app-font-mono)", fontSize: "0.5rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--fg-subtle)",
              }}>
                0{li + 1}
              </span>

              <div style={{ display: "flex", letterSpacing: "-0.03em", userSelect: "none" }}>
                {chars.map((char, ci) => (
                  <div key={ci} style={{ position: "relative", display: "inline-block" }}>

                    {/* ── Main char - squishes from its top edge downward ── */}
                    <span
                      className="kt-main"
                      style={{
                        display:         "block",
                        transformOrigin: "50% 0%",
                        willChange:      "transform",
                        fontFamily:      "var(--app-font-serif)",
                        fontSize:        "clamp(4.5rem, 18vw, 16rem)",
                        fontWeight:      isFill ? 900 : 100,
                        fontStyle:       isFill ? "normal" : "italic",
                        lineHeight:      0.88,
                        color:           isFill ? "var(--fg)" : "transparent",
                        WebkitTextStroke: isFill ? undefined : "1.5px var(--fg)",
                      }}
                    >
                      {char}
                    </span>

                    {/* ── Drip - grows downward below the collapsing char ── */}
                    {/*
                     * No React-controlled transform here.
                     * GSAP fully owns scaleY + opacity via gsap.set() + tl.to()
                     * so there is no inline-style vs GSAP conflict.
                     */}
                    <span
                      className="kt-drip-i"
                      style={{
                        /* layout: sit right below char baseline */
                        position:        "absolute",
                        top:             "100%",
                        left:            0,
                        display:         "block",
                        willChange:      "transform, opacity",
                        /* same font metrics as main char */
                        fontFamily:      "var(--app-font-serif)",
                        fontSize:        "clamp(4.5rem, 18vw, 16rem)",
                        fontWeight:      isFill ? 900 : 100,
                        fontStyle:       isFill ? "normal" : "italic",
                        lineHeight:      0.88,
                        /* drip colour - strong enough to read on light bg */
                        color: isFill
                          ? "color-mix(in srgb, var(--fg) 65%, transparent)"
                          : "transparent",
                        WebkitTextStroke: isFill
                          ? undefined
                          : "1.2px color-mix(in srgb, var(--fg) 55%, transparent)",
                        /* fade out toward the bottom so it reads as a drip */
                        maskImage:       "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 75%)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 75%)",
                        /* GSAP sets scaleY / opacity - no transform here */
                      }}
                    >
                      {char}
                    </span>

                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

    </section>
  );
}

