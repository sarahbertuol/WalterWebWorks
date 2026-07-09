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
      <Link href="/" className="flex items-center gap-2.5 group" aria-label="Página inicial">
        <svg width="39" height="35" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="40" cy="58" r="16" fill="#F1B6C9"/>
          <circle cx="100" cy="76" r="16" fill="#F1B6C9"/>
          <circle cx="160" cy="58" r="16" fill="#F1B6C9"/>
          <path d="M40,58 L70,138 L100,76 L130,138 L160,58" fill="none" stroke={isLight ? "#24402F" : "white"} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span
          className="hidden sm:block font-black transition-colors"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", color: isLight ? "var(--navy)" : "white" }}
        >
          &lt;walter<span style={{ color: "var(--indigo)" }}>.</span>web<span style={{ color: "var(--indigo)" }}>.</span>works/&gt;
        </span>
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
          {lang === "en" ? "Quick quote" : "Orçamento rápido"}
        </Link>
      </div>
    </header>
  );
}
