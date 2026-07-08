"use client";

import { useLang } from "@/lib/i18n/context";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer
      className="bg-[var(--navy)] text-center"
      style={{ padding: "1.5rem clamp(1.5rem, 6vw, 6rem)" }}
    >
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
        {lang === "en"
          ? "© 2026 WWW. Automation with a human still in charge."
          : "© 2026 WWW. Automação com um humano ainda no comando."}
      </p>
    </footer>
  );
}
