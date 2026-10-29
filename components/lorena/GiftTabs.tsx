"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky category tabs for the gift list — anchor links to each group,
 * the current one highlighted while scrolling.
 */
export function GiftTabs({ groups }: { groups: readonly { id: string; title: string }[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const barRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = groups.map((g) => document.getElementById(g.id)).filter((el): el is HTMLElement => el !== null);
    // a group is "current" once its top passes the band just under the tabs
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-130px 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [groups]);

  // keep the active tab visible when the bar scrolls sideways (mobile)
  useEffect(() => {
    const bar = barRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !tab) return;
    const left = tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2;
    bar.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="lw-gt" aria-label="Categorias da lista">
      <ul ref={barRef} className="lw-gt__bar">
        {groups.map((g) => (
          <li key={g.id}>
            <a
              href={`#${g.id}`}
              data-tab={g.id}
              className={`lw-gt__tab${active === g.id ? " is-active" : ""}`}
              aria-current={active === g.id ? "location" : undefined}
              onClick={() => setActive(g.id)}
            >
              {g.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
