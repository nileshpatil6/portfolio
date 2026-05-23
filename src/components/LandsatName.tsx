"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const BASE = "https://science.nasa.gov/specials/your-name-in-landsat/images/";

/* ── Exact variant counts per letter (verified via HTTP) ── */
const VARIANTS: Record<string, number> = {
  n: 3, i: 5, l: 4, e: 4, s: 3, h: 2, p: 2, a: 5, t: 2,
};

const ROWS = ["NILESH", "PATIL"] as const;
const ALL_LETTERS = ROWS.join(""); // NILESHPATIL

type TxKind = "zoom" | "slideUp" | "slideRight" | "blur" | "iris";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TX: Record<TxKind, { initial: any; exit: any; transition: any }> = {
  zoom: {
    initial:    { opacity: 0, scale: 0.65 },
    exit:       { opacity: 0, scale: 1.4, filter: "brightness(2.8)" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  slideUp: {
    initial:    { opacity: 0, y: "108%" },
    exit:       { opacity: 0, y: "-108%" },
    transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
  },
  slideRight: {
    initial:    { opacity: 0, x: "-108%" },
    exit:       { opacity: 0, x: "108%" },
    transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
  },
  blur: {
    initial:    { opacity: 0, filter: "blur(20px)", scale: 1.06 },
    exit:       { opacity: 0, filter: "blur(20px)", scale: 0.94 },
    transition: { duration: 0.55, ease: "easeInOut" },
  },
  iris: {
    initial:    { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    exit:       { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
const TX_KINDS = Object.keys(TX) as TxKind[];

function pickTx(): TxKind { return TX_KINDS[Math.floor(Math.random() * TX_KINDS.length)]; }

/* ── Fake telemetry labels ── */
const BANDS   = ["B4-3-2", "B5-4-3", "B7-5-4", "B6-5-2", "B4-5-3"];
const REGIONS = ["37.4°N 122.1°W", "40.7°N 74.0°W", "51.5°N 0.1°W", "35.7°N 139.7°E", "28.6°N 77.2°E",
                 "48.9°N 2.3°E", "55.8°N 37.6°E", "1.3°N 103.8°E", "19.4°N 99.1°W", "23.1°S 43.2°W", "-33.9°S 18.4°E"];

/* ── Per-letter state ── */
interface LetterState {
  variant:  number;
  tx:       TxKind;
  glowing:  boolean;
  band:     string;
  region:   string;
  rotation: number; // subtle ±1.5° tilt
}

function initStates(): LetterState[] {
  return ALL_LETTERS.split("").map((l) => {
    const count = VARIANTS[l.toLowerCase()] ?? 3;
    return {
      variant:  Math.floor(Math.random() * count),
      tx:       pickTx(),
      glowing:  false,
      band:     BANDS[Math.floor(Math.random() * BANDS.length)],
      region:   REGIONS[Math.floor(Math.random() * REGIONS.length)],
      rotation: (Math.random() - 0.5) * 2.4,
    };
  });
}

/* ── Blink dot ── */
function BlinkDot({ color = "rgba(120,255,120,0.85)" }: { color?: string }) {
  return (
    <motion.div
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }}
    />
  );
}

/* ── Tile ── */
function Tile({
  letter, state, reveal, index,
}: { letter: string; state: LetterState; reveal: boolean; index: number }) {
  const url = `${BASE}${letter.toLowerCase()}_${state.variant}.jpg`;
  const { initial, exit, transition } = TX[state.tx];

  return (
    <motion.div
      data-cursor-text={state.region}
      initial={{ opacity: 0, y: 48, rotate: state.rotation }}
      animate={reveal ? { opacity: 1, y: 0, rotate: state.rotation } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      style={{
        position:    "relative",
        width:       "clamp(40px, 8.5vw, 118px)",
        aspectRatio: "1 / 1",
        overflow:    "hidden",
        borderRadius: 6,
        flexShrink:  0,
        border:      state.glowing
          ? "1.5px solid rgba(120,255,120,0.7)"
          : "1.5px solid rgba(255,255,255,0.1)",
        boxShadow:   state.glowing
          ? "0 0 0 3px rgba(120,255,120,0.12), 0 0 28px rgba(120,255,120,0.18), inset 0 0 12px rgba(0,0,0,0.4)"
          : "inset 0 0 12px rgba(0,0,0,0.35)",
        transition:  "border-color 0.12s, box-shadow 0.12s",
      }}
    >
      {/* image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={url}
          src={url}
          alt={letter}
          initial={initial}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, filter: "none", clipPath: "circle(100% at 50% 50%)" }}
          exit={exit}
          transition={transition}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </AnimatePresence>

      {/* CRT scan overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
      }} />

      {/* scan-line sweep on change */}
      {state.glowing && (
        <motion.div
          initial={{ top: "-4px", opacity: 1 }}
          animate={{ top: "110%",  opacity: 0.7 }}
          transition={{ duration: 0.3, ease: "linear" }}
          style={{
            position: "absolute", left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, rgba(120,255,120,0.95), transparent)",
            boxShadow: "0 0 14px 4px rgba(120,255,120,0.6)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* top-left crosshair corner */}
      <div style={{
        position: "absolute", top: 4, left: 4, width: 8, height: 8, pointerEvents: "none",
        borderTop:  state.glowing ? "1.5px solid rgba(120,255,120,0.9)" : "1px solid rgba(255,255,255,0.2)",
        borderLeft: state.glowing ? "1.5px solid rgba(120,255,120,0.9)" : "1px solid rgba(255,255,255,0.2)",
        transition: "border-color 0.12s",
      }} />
      <div style={{
        position: "absolute", bottom: 4, right: 4, width: 8, height: 8, pointerEvents: "none",
        borderBottom: state.glowing ? "1.5px solid rgba(120,255,120,0.9)" : "1px solid rgba(255,255,255,0.2)",
        borderRight:  state.glowing ? "1.5px solid rgba(120,255,120,0.9)" : "1px solid rgba(255,255,255,0.2)",
        transition: "border-color 0.12s",
      }} />

      {/* band label */}
      <div style={{
        position: "absolute", top: 4, right: 4, fontFamily: "var(--app-font-mono)",
        fontSize: "clamp(0.38rem, 0.7vw, 0.5rem)", fontWeight: 700, letterSpacing: "0.05em",
        color: state.glowing ? "rgba(120,255,120,0.85)" : "rgba(255,255,255,0.25)",
        lineHeight: 1, transition: "color 0.12s",
      }}>
        {state.band}
      </div>

      {/* letter label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
        padding: "14px 5px 5px", textAlign: "center", pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--app-font-mono)", fontWeight: 700,
          fontSize: "clamp(0.6rem, 1.1vw, 0.82rem)",
          color: state.glowing ? "rgba(120,255,120,1)" : "rgba(255,255,255,0.65)",
          letterSpacing: "0.06em", transition: "color 0.12s",
        }}>{letter}</span>
      </div>
    </motion.div>
  );
}

/* ── Scrolling coordinate ticker ── */
function CoordTicker({ active }: { active: boolean }) {
  const [coord, setCoord] = useState(REGIONS[0]);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setCoord(REGIONS[Math.floor(Math.random() * REGIONS.length)]), 2200);
    return () => clearInterval(id);
  }, [active]);
  return (
    <span style={{ fontFamily: "var(--app-font-mono)", fontSize: "0.5rem",
      color: "rgba(120,255,120,0.45)", letterSpacing: "0.12em" }}>
      {coord}
    </span>
  );
}

/* ── Main ── */
export default function LandsatName() {
  const [states, setStates]   = useState<LetterState[]>(initStates);
  const [scanActive, setScan] = useState(false);
  const sectionRef            = useRef<HTMLDivElement>(null);
  const reveal                = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  /* ── Tile cycling ── */
  useEffect(() => {
    const indices = Array.from({ length: ALL_LETTERS.length }, (_, i) => i);

    const cycle = () => {
      const count    = Math.random() < 0.3 ? 2 : 1;
      const shuffled = [...indices].sort(() => Math.random() - 0.5);
      const picks    = shuffled.slice(0, count);
      const newTx    = pickTx();

      setScan(true);
      setTimeout(() => setScan(false), 320);

      /* glow on */
      setStates(prev => prev.map((s, i) =>
        picks.includes(i) ? { ...s, glowing: true, tx: newTx } : s
      ));

      /* swap image + metadata */
      setTimeout(() => {
        setStates(prev => prev.map((s, i) => {
          if (!picks.includes(i)) return s;
          const letter = ALL_LETTERS[i].toLowerCase();
          const count  = VARIANTS[letter] ?? 3;
          let v: number;
          do { v = Math.floor(Math.random() * count); } while (v === s.variant);
          return {
            ...s,
            variant: v,
            glowing: false,
            band:    BANDS[Math.floor(Math.random() * BANDS.length)],
            region:  REGIONS[Math.floor(Math.random() * REGIONS.length)],
          };
        }));
      }, 260);
    };

    const init = setTimeout(cycle, 900);
    const id   = setInterval(cycle, 2600);
    return () => { clearTimeout(init); clearInterval(id); };
  }, []);

  const renderRow = (row: string, baseOffset: number) => (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "clamp(5px, 0.8vw, 11px)" }}>
      {row.split("").map((letter, j) => {
        const idx = baseOffset + j;
        return <Tile key={idx} letter={letter} state={states[idx]} reveal={reveal} index={idx} />;
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* ── Orbital arc decoration ── */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.07 }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 600"
      >
        <ellipse cx="720" cy="300" rx="680" ry="220" fill="none" stroke="rgba(120,255,120,1)" strokeWidth="1" />
        <ellipse cx="720" cy="300" rx="480" ry="145" fill="none" stroke="rgba(120,255,120,1)" strokeWidth="0.6" strokeDasharray="4 8" />
        <line x1="720" y1="0"   x2="720" y2="600" stroke="rgba(120,255,120,0.5)" strokeWidth="0.4" />
        <line x1="0"   y1="300" x2="1440" y2="300" stroke="rgba(120,255,120,0.5)" strokeWidth="0.4" />
        {/* satellite dot */}
        <circle cx="1292" cy="158" r="3" fill="rgba(120,255,120,0.6)" />
        <circle cx="1292" cy="158" r="7" fill="none" stroke="rgba(120,255,120,0.3)" strokeWidth="1" />
      </svg>

      {/* ── Noise grain texture ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }} />

      <div style={{ padding: "72px 0 84px", position: "relative" }}>

        {/* ── HUD header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 1280, margin: "0 auto 40px",
            padding: "0 clamp(1.5rem, 5vw, 4rem)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          }}
        >
          {/* left label */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BlinkDot />
              <span style={{
                fontFamily: "var(--app-font-mono)", fontSize: "0.62rem",
                fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(120,255,120,0.7)",
              }}>
                LANDSAT 8 · LIVE FEED
              </span>
            </div>
            <span style={{
              fontFamily: "var(--app-font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em",
              color: "var(--fg-muted)", textTransform: "uppercase",
            }}>
              OLI / TIRS · Surface Reflectance
            </span>
          </div>

          {/* right: scanning status + coordinates */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <AnimatePresence>
              {scanActive && (
                <motion.span
                  key="scanning"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "var(--app-font-mono)", fontSize: "0.5rem",
                    letterSpacing: "0.14em", color: "rgba(120,255,120,0.7)",
                    textTransform: "uppercase",
                  }}
                >
                  ◈ REACQUIRING
                </motion.span>
              )}
            </AnimatePresence>
            <CoordTicker active={reveal} />
          </div>
        </motion.div>

        {/* ── Tiles ── */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.4vw, 16px)" }}>
            {renderRow(ROWS[0], 0)}
            {renderRow(ROWS[1], ROWS[0].length)}
          </div>
        </div>

        {/* ── Footer bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={reveal ? { opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.9 }}
          style={{
            maxWidth: 1280, margin: "32px auto 0",
            padding: "0 clamp(1.5rem, 5vw, 4rem)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: 16,
          }}
        >
          <span style={{
            fontFamily: "var(--app-font-mono)", fontSize: "0.46rem",
            color: "var(--fg-subtle)", letterSpacing: "0.1em",
          }}>
            Each tile is a real landscape photographed from orbit
          </span>
          <span style={{
            fontFamily: "var(--app-font-mono)", fontSize: "0.46rem",
            color: "var(--fg-subtle)", letterSpacing: "0.1em",
          }}>
            NASA / USGS · Landsat Science
          </span>
        </motion.div>
      </div>
    </section>
  );
}

