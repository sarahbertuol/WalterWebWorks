"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

const containerStyle = {
  maxWidth: "1280px",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
  paddingRight: "clamp(1.5rem, 6vw, 6rem)",
};

export default function Hero() {
  const { lang } = useLang();
  const _ = (en: string, pt: string) => lang === "en" ? en : pt;

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      <div
        className="relative z-10 flex-1 flex flex-col justify-center"
        style={{ ...containerStyle, paddingTop: "calc(5rem + 73px)", paddingBottom: "5rem" }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="block font-bold uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--indigo)", marginBottom: "1.5rem" }}
        >
          {_("AI automation for your business", "Automação com IA para seu negócio")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-white"
          style={{
            fontFamily: "var(--font-bricolage)",
            fontSize: "clamp(2.8rem, 7vw, 4.8rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            maxWidth: "22ch",
          }}
        >
          {lang === "en"
            ? <>Stop running your<br /><span style={{ color: "var(--indigo)" }}>business</span> by hand.</>
            : <>Pare de tocar seu<br /><span style={{ color: "var(--indigo)" }}>negócio</span> na mão.</>}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", maxWidth: "42ch", marginTop: "2.25rem", lineHeight: 1.65, color: "rgba(255,255,255,0.78)" }}
        >
          {_(
            "We plug straightforward AI automation into the business you already have — your site, your inbox, your billing, your WhatsApp — so the parts that don't need you finally stop needing you.",
            "A gente encaixa automação com IA direto no negócio que você já tem — site, e-mail, cobrança, WhatsApp — pra que as partes que não precisam de você parem de precisar de você."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "3rem" }}
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center font-bold rounded-full transition-all hover:opacity-90 active:scale-[0.97] whitespace-nowrap uppercase"
            style={{ fontSize: "0.88rem", letterSpacing: "0.06em", padding: "1rem 2.5rem", background: "var(--indigo)", color: "var(--navy)", boxShadow: "0 6px 28px rgba(241,182,201,0.55)" }}
          >
            {_("See the 6 things we automate", "Veja o que automatizamos")}
          </a>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center font-bold rounded-full text-white hover:bg-white hover:text-[var(--navy)] transition-all active:scale-[0.97] whitespace-nowrap uppercase"
            style={{ fontSize: "0.88rem", letterSpacing: "0.06em", padding: "1rem 2.5rem", border: "2px solid rgba(255,255,255,0.7)" }}
          >
            {_("Talk to a human →", "Falar com um humano →")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
