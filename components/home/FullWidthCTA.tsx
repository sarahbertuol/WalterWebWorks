"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

export default function FullWidthCTA() {
  const { lang } = useLang();
  const _ = (en: string, pt: string) => lang === "en" ? en : pt;

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ background: "var(--navy)", padding: "7rem clamp(1.5rem, 6vw, 6rem)" }}
    >
      {/* Background photo */}
      <img
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&auto=format&fit=crop&q=80"
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }}
      />
      {/* Vignette overlay */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(20,40,24,0.5) 0%, rgba(20,40,24,0.92) 100%)" }} />

      <div className="relative z-10" style={{ maxWidth: "820px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block font-bold uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--indigo)" }}
        >
          {_("Next step", "Próximo passo")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-black text-white"
          style={{ fontFamily: "var(--font-bricolage)", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 0.97, letterSpacing: "-0.01em", textTransform: "uppercase" }}
        >
          {lang === "en"
            ? <>Ready to stop being <span style={{ color: "var(--indigo)" }}>the bottleneck</span>?</>
            : <>Pronta pra parar de ser <span style={{ color: "var(--indigo)" }}>o gargalo</span>?</>}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <Link
            href="/contato"
            className="inline-flex items-center justify-center font-bold rounded-full uppercase hover:opacity-90 transition-all active:scale-[0.97]"
            style={{ fontSize: "0.95rem", letterSpacing: "0.07em", padding: "1.15rem 3.5rem", background: "var(--indigo)", color: "var(--navy)", boxShadow: "0 8px 40px rgba(241,182,201,0.55)" }}
          >
            {_("Start the conversation →", "Começar conversa →")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
