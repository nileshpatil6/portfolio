"use client";
import { useEffect } from "react";

export function useMobileReveal(selector = ".mob-reveal, .mob-reveal-left, .mob-stagger") {
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouch) return;

    const els = document.querySelectorAll<HTMLElement>(selector);
    if (!els.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("mob-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}
