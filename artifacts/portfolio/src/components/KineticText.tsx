import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Word definitions ── */
const LINES = [
  { word: "BUILD",  fill: true  },
  { word: "SHIP",   fill: false },
  { word: "WIN",    fill: true  },
  { word: "REPEAT", fill: false },
] as const;

/* How much scroll each word occupies before the next overlaps */
const ROW_VH  = 120; // total scroll range per row
const OVER_VH = 32;  // negative overlap between rows (cinematic stack)

export default function KineticText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      LINES.forEach((_, li) => {
        const row         = sectionRef.current!.querySelector<HTMLElement>(`.kt-row-${li}`)!;
        const mainChars   = gsap.utils.toArray<HTMLElement>(".kt-main",   row);
        const drips       = gsap.utils.toArray<HTMLElement>(".kt-drip",   row);
        const dripInners  = gsap.utils.toArray<HTMLElement>(".kt-drip-i", row);

        /* initialise drip at 0 scale */
        gsap.set(dripInners, { scaleY: 0, opacity: 0 });

        /* One scrubbed timeline that covers the full ROW_VH of scroll */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start:   "top top",
            end:     "bottom top",   /* = ROW_VH of scroll */
            scrub:   1.2,
          },
        });

        /* Anchor total timeline duration = 2 units */
        tl.to({}, { duration: 2 }, 0);

        const n = mainChars.length;
        mainChars.forEach((char, i) => {
          /* Second half of scroll, staggered per character */
          const t0 = 1.0 + (n > 1 ? (i / (n - 1)) * 0.48 : 0);

          /* Main char squishes from top (transform-origin set in CSS) */
          tl.to(char, { scaleY: 0, ease: "none", duration: 0.28 }, t0);

          /* Drip clipping box appears first */
          tl.to(drips[i], { height: "0.65em", ease: "none", duration: 0.12 }, t0);

          /* Drip inner grows downward */
          tl.to(dripInners[i], { scaleY: 0.9, opacity: 0.32, ease: "none", duration: 0.28 }, t0);
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Kinetic type"
      style={{ background: "var(--fg)", position: "relative", overflow: "hidden" }}
    >
      {/* ── fade from page bg ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 90, zIndex: 20,
        background: "linear-gradient(to bottom, var(--bg), transparent)", pointerEvents: "none",
      }} />

      {/* ── floating label ── */}
      <div style={{
        position: "absolute", top: "5vh", left: "clamp(1.5rem, 5vw, 4rem)", zIndex: 25,
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--app-font-mono)", fontSize: "0.5rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "color-mix(in srgb, var(--bg) 20%, transparent)",
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
            <div style={{
              position:        "sticky",
              top:             0,
              height:          "100vh",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              background:      "var(--fg)",
              overflow:        "visible",
            }}>
              {/* Row counter */}
              <span style={{
                position: "absolute", left: "clamp(1.5rem, 5vw, 4rem)", bottom: "10vh",
                fontFamily: "var(--app-font-mono)", fontSize: "0.5rem",
                letterSpacing: "0.2em", color: "color-mix(in srgb, var(--bg) 18%, transparent)",
                textTransform: "uppercase",
              }}>
                0{li + 1}
              </span>

              <div style={{ display: "flex", letterSpacing: "-0.03em", userSelect: "none" }}>
                {chars.map((char, ci) => (
                  <div key={ci} style={{ position: "relative", display: "inline-block" }}>

                    {/* ── Main character — squishes from top ── */}
                    <span
                      className="kt-main"
                      style={{
                        display:         "block",
                        transformOrigin: "50% 0%",
                        willChange:      "transform",
                        fontFamily:  "var(--app-font-serif)",
                        fontSize:    "clamp(4.5rem, 18vw, 16rem)",
                        fontWeight:  isFill ? 900 : 100,
                        fontStyle:   isFill ? "normal" : "italic",
                        lineHeight:  0.88,
                        color:           isFill ? "var(--bg)" : "transparent",
                        WebkitTextStroke: isFill ? undefined : "1.5px var(--bg)",
                      }}
                    >
                      {char}
                    </span>

                    {/* ── Drip shadow — grows below the collapsing char ── */}
                    <div
                      className="kt-drip"
                      style={{
                        position:   "absolute",
                        top:        "86%",
                        left:       0,
                        right:      0,
                        height:     0,           /* GSAP expands this */
                        overflow:   "hidden",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        className="kt-drip-i"
                        style={{
                          display:         "block",
                          transformOrigin: "50% 0%",
                          willChange:      "transform, opacity",
                          fontFamily:  "var(--app-font-serif)",
                          fontSize:    "clamp(4.5rem, 18vw, 16rem)",
                          fontWeight:  isFill ? 900 : 100,
                          fontStyle:   isFill ? "normal" : "italic",
                          lineHeight:  0.88,
                          /* mirror the char — drip reads as pressed liquid */
                          transform:   "scaleY(-1)",
                          color: isFill
                            ? "color-mix(in srgb, var(--bg) 35%, transparent)"
                            : "transparent",
                          WebkitTextStroke: isFill
                            ? undefined
                            : "1px color-mix(in srgb, var(--bg) 30%, transparent)",
                          maskImage:       "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
                          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
                        }}
                      >
                        {char}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── fade to page bg ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 90, zIndex: 20,
        background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none",
      }} />
    </section>
  );
}
