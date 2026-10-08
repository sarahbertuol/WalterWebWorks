"use client";

import { useEffect } from "react";

/**
 * Pins the page for card-only views (save the date, city chooser).
 * CSS alone (.lw--locked) isn't enough on every phone — iOS Safari still
 * rubber-bands the body — so this also locks <html>/<body> inline and
 * swallows one-finger drags and wheel scrolls. Two-finger pinch-zoom
 * still works (accessibility).
 */
export function ScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyHeight: body.style.height,
    };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.height = "100%";
    window.scrollTo(0, 0);

    const stopDrag = (e: TouchEvent) => {
      if (e.touches.length === 1) e.preventDefault();
    };
    const stopWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) e.preventDefault(); // ctrl+wheel = zoom, leave it
    };
    const keepTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    document.addEventListener("touchmove", stopDrag, { passive: false });
    document.addEventListener("wheel", stopWheel, { passive: false });
    window.addEventListener("scroll", keepTop, { passive: true });

    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      body.style.height = prev.bodyHeight;
      document.removeEventListener("touchmove", stopDrag);
      document.removeEventListener("wheel", stopWheel);
      window.removeEventListener("scroll", keepTop);
    };
  }, []);

  return null;
}
