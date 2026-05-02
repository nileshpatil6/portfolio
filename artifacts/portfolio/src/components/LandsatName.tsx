import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const BASE = "https://science.nasa.gov/specials/your-name-in-landsat/images/";

const ROWS = ["NILESH", "PATIL"] as const;
const ALL_LETTERS = ROWS.join(""); // 11 letters

type TxKind = "zoom" | "slideUp" | "slideRight" | "blur" | "iris";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TX: Record<TxKind, { initial: any; exit: any; transition: any }> = {
  zoom: {
    initial:    { opacity: 0, scale: 0.7 },
    exit:       { opacity: 0, scale: 1.35, filter: "brightness(2.5)" },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  slideUp: {
    initial:    { opacity: 0, y: "105%" },
    exit:       { opacity: 0, y: "-105%" },
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  slideRight: {
    initial:    { opacity: 0, x: "-105%" },
    exit:       { opacity: 0, x: "105%" },
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  blur: {
    initial:    { opacity: 0, filter: "blur(18px)", scale: 1.06 },
    exit:       { opacity: 0, filter: "blur(18px)", scale: 0.94 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  iris: {
    initial:    { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    exit:       { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};
const TX_KINDS = Object.keys(TX) as TxKind[];

function pickTx(): TxKind {
  return TX_KINDS[Math.floor(Math.random() * TX_KINDS.length)];
}

/* ── Per-letter state ───────────────────────────────────── */
interface LetterState { variant: number; tx: TxKind; glowing: boolean }

function initStates(): LetterState[] {
  return ALL_LETTERS.split("").map(() => ({
    variant: Math.floor(Math.random() * 5),
    tx:      pickTx(),
    glowing: false,
  }));
}

/* ── Tile ───────────────────────────────────────────────── */
function Tile({
  letter, state, reveal, index,
}: { letter: string; state: LetterState; reveal: boolean; index: number }) {
  const url = `${BASE}${letter.toLowerCase()}_${state.variant}.jpg`;
  const { initial, exit, transition } = TX[state.tx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.055 }}
      style={{
        position: "relative",
        width:  "clamp(54px, 8vw, 115px)",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        borderRadius: 8,
        flexShrink: 0,
        border: state.glowing
          ? "2px solid rgba(255,255,255,0.9)"
          : "2px solid rgba(255,255,255,0.08)",
        boxShadow: state.glowing
          ? "0 0 0 4px rgba(255,255,255,0.15), 0 0 24px rgba(255,255,255,0.2)"
          : "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={url}
          src={url}
          alt={letter}
          initial={initial}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, filter: "none", clipPath: "circle(100% at 50% 50%)" }}
          exit={exit}
          transition={transition}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
          }}
        />
      </AnimatePresence>

      {/* Scan line on change */}
      {state.glowing && (
        <motion.div
          initial={{ top: "0%", opacity: 1 }}
          animate={{ top: "110%", opacity: 0.6 }}
          transition={{ duration: 0.28, ease: "linear" }}
          style={{
            position: "absolute", left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)",
            boxShadow: "0 0 12px rgba(255,255,255,0.9)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Letter label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, textAlign: "center",
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        padding: "10px 4px 5px",
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--app-font-mono)", fontWeight: 700,
          fontSize: "clamp(0.55rem, 1.1vw, 0.78rem)",
          color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em",
        }}>{letter}</span>
      </div>

      {/* Variant dot */}
      <div style={{
        position: "absolute", top: 5, right: 5, width: 5, height: 5, borderRadius: "50%",
        background: state.glowing ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
        transition: "background 0.15s",
      }} />
    </motion.div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
export default function LandsatName() {
  const [states, setStates] = useState<LetterState[]>(initStates);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reveal = useInView(sectionRef, { once: true, margin: "0px 0px -120px 0px" });

  /* cycle 1-2 random tiles every ~2.3s */
  useEffect(() => {
    const indices = Array.from({ length: ALL_LETTERS.length }, (_, i) => i);

    const cycle = () => {
      const count = Math.random() < 0.35 ? 2 : 1;
      const shuffled = [...indices].sort(() => Math.random() - 0.5);
      const picks = shuffled.slice(0, count);
      const newTx = pickTx();

      /* glow on */
      setStates(prev => prev.map((s, i) =>
        picks.includes(i) ? { ...s, glowing: true, tx: newTx } : s
      ));

      /* swap variant */
      setTimeout(() => {
        setStates(prev => prev.map((s, i) => {
          if (!picks.includes(i)) return s;
          let v: number;
          do { v = Math.floor(Math.random() * 5); } while (v === s.variant);
          return { ...s, variant: v, glowing: false };
        }));
      }, 240);
    };

    /* stagger start so not all fire at once after mount */
    const init = setTimeout(cycle, 800);
    const id = setInterval(cycle, 2400);
    return () => { clearTimeout(init); clearInterval(id); };
  }, []);

  /* ── Render ── */
  const renderRow = (row: string, baseOffset: number) => (
    <div className="flex items-center justify-center flex-wrap" style={{ gap: "clamp(4px, 0.8vw, 10px)" }}>
      {row.split("").map((letter, j) => {
        const idx = baseOffset + j;
        return <Tile key={idx} letter={letter} state={states[idx]} reveal={reveal} index={idx} />;
      })}
    </div>
  );

  return (
    <div ref={sectionRef} style={{ background: "var(--fg)", overflow: "hidden", position: "relative" }}>

      {/* top fade from bg */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 80, pointerEvents: "none",
        background: "linear-gradient(to bottom, var(--bg), transparent)",
      }} />

      <div style={{ padding: "80px 0 90px", position: "relative" }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={reveal ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-16 mb-10 flex items-center justify-between gap-6"
        >
          <div>
            <p className="font-mono" style={{
              fontSize: "0.58rem", letterSpacing: "0.24em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
            }}>
              My name — in Earth's landscapes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
            </div>
            <span className="font-mono" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em" }}>
              NASA LANDSAT
            </span>
          </div>
        </motion.div>

        {/* ── Tiles ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col" style={{ gap: "clamp(6px, 1.2vw, 14px)" }}>
          {renderRow(ROWS[0], 0)}
          {renderRow(ROWS[1], ROWS[0].length)}
        </div>

        {/* ── Caption ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={reveal ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-mono text-center mt-10"
          style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.16)", letterSpacing: "0.12em" }}
        >
          Each tile is a real terrain photographed from orbit — 1-2 variants cycle randomly every few seconds
        </motion.p>
      </div>

      {/* bottom fade to bg */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 80, pointerEvents: "none",
        background: "linear-gradient(to top, var(--bg), transparent)",
      }} />
    </div>
  );
}
