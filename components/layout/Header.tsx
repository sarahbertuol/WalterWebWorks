"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/context";

export default function Header() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = scrolled; // after hero = light bg sections

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
      style={{
        padding: "1.25rem clamp(1.5rem, 6vw, 6rem)",
        background: scrolled
          ? "rgba(245,239,226,0.92)"
          : "linear-gradient(to bottom, rgba(13,12,10,0.52) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <Link href="/" className="flex items-baseline gap-0.5 group">
        <span
          className="font-black tracking-[-0.025em] transition-colors"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em", color: isLight ? "var(--navy)" : "white" }}
        >
          wehelpflow
        </span>
        <span className="w-[0.3rem] h-[0.3rem] rounded-full bg-[var(--saffron)] mb-0.5 transition-transform group-hover:scale-125" />
      </Link>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 text-sm font-bold uppercase" style={{ letterSpacing: "0.05em" }}>
          <button
            onClick={() => setLang("en")}
            className="transition-colors"
            style={{ color: isLight ? (lang === "en" ? "var(--navy)" : "var(--border)") : (lang === "en" ? "white" : "rgba(255,255,255,0.4)") }}
          >
            EN
          </button>
          <span style={{ color: isLight ? "var(--border)" : "rgba(255,255,255,0.3)" }}>/</span>
          <button
            onClick={() => setLang("pt")}
            className="transition-colors"
            style={{ color: isLight ? (lang === "pt" ? "var(--navy)" : "var(--border)") : (lang === "pt" ? "white" : "rgba(255,255,255,0.4)") }}
          >
            PT
          </button>
        </div>
        <Link
          href="/contato"
          className="inline-flex items-center justify-center font-bold rounded-full transition-all active:scale-[0.97] whitespace-nowrap uppercase hover:opacity-90"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.07em",
            padding: "0.65rem 1.5rem",
            background: scrolled ? "var(--navy)" : "rgba(255,255,255,0.15)",
            color: "white",
            border: scrolled ? "none" : "1px solid rgba(255,255,255,0.5)",
            backdropFilter: scrolled ? "none" : "blur(8px)",
          }}
        >
          {lang === "en" ? "Let's talk" : "Vamos conversar"}
        </Link>
      </div>
    </header>
  );
}
