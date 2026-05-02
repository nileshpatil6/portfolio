import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const auraRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const mouse     = useRef({ x: -300, y: -300 });
  const auraPos   = useRef({ x: -300, y: -300 });
  const labelPos  = useRef({ x: -300, y: -300 });
  const prev      = useRef({ x: -300, y: -300 });
  const hover     = useRef(false);
  const labelText = useRef<string | null>(null);
  const raf       = useRef(0);

  useEffect(() => {
    /* Skip entirely on touch-only devices — they have no hover/mouse */
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const dot     = dotRef.current!;
    const auraEl  = auraRef.current!;
    const labelEl = labelRef.current!;

    /* ── position tracking ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    /* ── click pulse ── */
    const onDown = () => {
      dot.classList.add("cursor-down");
      auraEl.classList.add("cursor-down");
    };
    const onUp = () => {
      dot.classList.remove("cursor-down");
      auraEl.classList.remove("cursor-down");
    };

    /* ── rAF loop ── */
    const loop = () => {
      /* aura — spring */
      const lf = hover.current ? 0.16 : 0.1;
      auraPos.current.x += (mouse.current.x - auraPos.current.x) * lf;
      auraPos.current.y += (mouse.current.y - auraPos.current.y) * lf;

      /* label — slightly different lag so it floats behind uniquely */
      const ll = 0.14;
      labelPos.current.x += (mouse.current.x - labelPos.current.x) * ll;
      labelPos.current.y += (mouse.current.y - labelPos.current.y) * ll;

      /* velocity */
      const vx    = mouse.current.x - prev.current.x;
      const vy    = mouse.current.y - prev.current.y;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      prev.current = { ...mouse.current };

      /* dot — exact */
      dot.style.transform =
        `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%,-50%)`;

      /* aura — spring + velocity blob */
      const stretch = Math.min(speed * 0.09, 0.75);
      const sx  = 1 + stretch;
      const sy  = Math.max(0.52, 1 - stretch * 0.38);
      const rot = speed > 1.5 ? `rotate(${angle}deg) scaleX(${sx}) scaleY(${sy})` : "";
      auraEl.style.transform =
        `translate(${auraPos.current.x}px, ${auraPos.current.y}px) translate(-50%,-50%) ${rot}`;

      /* label — offset top-right of cursor tip */
      labelEl.style.transform =
        `translate(${labelPos.current.x + 16}px, ${labelPos.current.y - 40}px)`;

      raf.current = requestAnimationFrame(loop);
    };
    loop();

    /* ── hover + label detection ── */
    const onEnter = (e: Event) => {
      hover.current = true;
      auraEl.classList.add("cursor-hover");

      const target = e.currentTarget as HTMLElement;
      const text   = target.getAttribute("data-cursor-text");
      if (text && text !== labelText.current) {
        labelText.current   = text;
        labelEl.textContent = text;
        labelEl.classList.add("c-label--show");
      }
    };

    const onLeave = () => {
      hover.current = false;
      auraEl.classList.remove("cursor-hover");
      labelText.current = null;
      labelEl.classList.remove("c-label--show");
    };

    const attach = () => {
      document.querySelectorAll(
        "a, button, .magnetic, [data-cursor], [data-cursor-text]"
      ).forEach(el => {
        /* identical fn refs are de-duped by the browser — safe to call repeatedly */
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
      <div ref={dotRef}   className="c-dot"   />
      <div ref={auraRef}  className="c-aura"  />
      <div ref={labelRef} className="c-label" />
    </>
  );
}
