"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

export default function ContatoHero() {
  const { lang } = useLang();
  const _ = (en: string, pt: string) => lang === "en" ? en : pt;

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-[var(--bg)]" style={{ paddingBottom: "5rem" }}>
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="blob-1 absolute rounded-full"
          style={{
            width: 640, height: 580, top: -160, right: -100,
            background: "radial-gradient(ellipse at center, rgba(241,182,201,0.28) 0%, rgba(241,182,201,0.08) 45%, transparent 72%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="blob-2 absolute rounded-full"
          style={{
            width: 500, height: 450, bottom: -120, left: -80,
            background: "radial-gradient(ellipse at center, rgba(241,182,201,0.22) 0%, rgba(241,182,201,0.07) 45%, transparent 72%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div
        className="relative z-10"
        style={{
          maxWidth: "1280px", width: "100%",
          marginLeft: "auto", marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          paddingRight: "clamp(1.5rem, 6vw, 6rem)",
          paddingTop: "calc(5rem + 73px)",
          paddingBottom: "5rem",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="block font-bold uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.14em", color: "var(--indigo)", opacity: 0.75, marginBottom: "1.5rem" }}
        >
          {_("Get in touch", "Fale com a gente")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-[var(--navy)]"
          style={{
            fontFamily: "var(--font-bricolage)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 0.97, letterSpacing: "-0.01em",
            textTransform: "uppercase",
            maxWidth: "18ch", marginBottom: "1.5rem",
          }}
        >
          {_("Let's solve this", "Vamos resolver isso")}{" "}
          <span style={{ color: "var(--indigo)" }}>{_("together.", "juntos.")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7 }}
          className="text-[var(--text-mid)]"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", maxWidth: "44ch", marginBottom: "3rem", lineHeight: 1.65 }}
        >
          {_(
            "Tell us what's taking most of your time. We reply within 24h with a concrete proposal — no fluff.",
            "Conta o que tá te tomando mais tempo. A gente responde em até 24h com uma proposta concreta — sem enrolação."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
        >
          <a
            href="https://wa.me/5551999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-semibold rounded-full text-white hover:opacity-90 active:scale-[0.97] transition-all"
            style={{ fontSize: "1rem", padding: "1rem 2rem", background: "#25D366", boxShadow: "0 6px 28px rgba(37,211,102,0.35)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.28 7.04L.787 23.426a.75.75 0 00.787.574l4.48-1.164A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-4.963-1.353l-.355-.213-3.695.96.986-3.607-.232-.371A9.75 9.75 0 1112 21.75z" />
            </svg>
            {_("Chat on WhatsApp", "Chamar no WhatsApp")}
          </a>

          <a
            href="mailto:hello@wehelpflow.com"
            className="inline-flex items-center gap-3 font-semibold rounded-full border-2 text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-all active:scale-[0.97]"
            style={{ fontSize: "1rem", padding: "1rem 2rem", borderColor: "var(--navy)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            hello@wehelpflow.com
          </a>
        </motion.div>
      </div>

      {/* Scroll anchor */}
      <motion.a
        href="#quiz"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-bold uppercase no-underline group"
        style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--indigo)", opacity: 0.65, textDecoration: "none" }}
      >
        {_("Quick quote", "Orçamento rápido")}
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ display: "block", lineHeight: 1 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}
