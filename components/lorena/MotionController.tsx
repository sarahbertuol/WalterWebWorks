"use client";

import { useEffect } from "react";

/**
 * The only always-on script on the page:
 *  - reveals [data-reveal] elements as they enter the viewport
 *  - drifts [data-speed] illustrations a few pixels (subtle parallax)
 * Both are skipped entirely under prefers-reduced-motion.
 */
export function MotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lw");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    root.classList.add("lw-js");

    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]")).map((el) => ({
      el,
      speed: Number(el.dataset.speed) || 0,
      visible: false,
    }));
    const vis = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const l = layers.find((x) => x.el === e.target);
          if (l) l.visible = e.isIntersecting;
        }
      },
      { rootMargin: "25% 0px" },
    );
    layers.forEach((l) => vis.observe(l.el));

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const l of layers) {
        if (!l.visible) continue;
        const parent = l.el.offsetParent as HTMLElement | null;
        const r = (parent ?? l.el).getBoundingClientRect();
        const offset = r.top + r.height / 2 - vh / 2;
        // clamp so nothing ever floats far from where it was composed
        const y = Math.max(-60, Math.min(60, -offset * l.speed));
        l.el.style.setProperty("--py", `${y.toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      vis.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
