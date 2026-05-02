import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: -300, y: -300 });
  const aura    = useRef({ x: -300, y: -300 });
  const prev    = useRef({ x: -300, y: -300 });
  const hover   = useRef(false);
  const down    = useRef(false);
  const raf     = useRef(0);

  useEffect(() => {
    const dot = dotRef.current!;
    const auraEl = auraRef.current!;

    /* ── position tracking ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    /* ── click pulse ── */
    const onDown = () => {
      down.current = true;
      dot.classList.add("cursor-down");
      auraEl.classList.add("cursor-down");
    };
    const onUp = () => {
      down.current = false;
      dot.classList.remove("cursor-down");
      auraEl.classList.remove("cursor-down");
    };

    /* ── rAF loop ── */
    const loop = () => {
      const lf = hover.current ? 0.16 : 0.1;
      aura.current.x += (mouse.current.x - aura.current.x) * lf;
      aura.current.y += (mouse.current.y - aura.current.y) * lf;

      const vx = mouse.current.x - prev.current.x;
      const vy = mouse.current.y - prev.current.y;
      const speed  = Math.sqrt(vx * vx + vy * vy);
      const angle  = Math.atan2(vy, vx) * (180 / Math.PI);
      prev.current = { ...mouse.current };

      /* dot — exact */
      dot.style.transform =
        `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%,-50%)`;

      /* aura — spring + velocity stretch */
      const stretch = Math.min(speed * 0.09, 0.75);
      const sx = 1 + stretch;
      const sy = Math.max(0.52, 1 - stretch * 0.38);
      const rot = speed > 1.5 ? `rotate(${angle}deg) scaleX(${sx}) scaleY(${sy})` : "";

      auraEl.style.transform =
        `translate(${aura.current.x}px, ${aura.current.y}px) translate(-50%,-50%) ${rot}`;

      raf.current = requestAnimationFrame(loop);
    };
    loop();

    /* ── hover detection ── */
    const onEnter = () => { hover.current = true;  auraEl.classList.add("cursor-hover"); };
    const onLeave = () => { hover.current = false; auraEl.classList.remove("cursor-hover"); };

    const attach = () => {
      document.querySelectorAll("a,button,.magnetic,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot"  />
      <div ref={auraRef} className="c-aura" />
    </>
  );
}
