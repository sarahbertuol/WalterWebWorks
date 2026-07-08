"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

const team = {
  pt: [
    {
      initial: "S",
      name: "Sarah Bertuol",
      role: "Fundadora & Estratégia",
      bio: "Obcecada em reduzir o que não precisa de você. Antes de qualquer automação, a gente garante que está resolvendo o problema certo.",
    },
    {
      initial: "R",
      name: "Rafael Duarte",
      role: "Automação & Integrações",
      bio: "Conecta sistemas que não foram feitos pra conversar. Se algo pode rodar sozinho, ele encontra o jeito — e se não pode, inventa um.",
    },
    {
      initial: "A",
      name: "Ana Lemos",
      role: "Produto & Design",
      bio: "Garante que o que a gente entrega faz sentido pra quem usa — não só pra quem construiu. Se ficou difícil, ela simplifica.",
    },
  ],
  en: [
    {
      initial: "S",
      name: "Sarah Bertuol",
      role: "Founder & Strategy",
      bio: "Obsessed with removing what doesn't need you. Before any automation, we make sure we're solving the right problem.",
    },
    {
      initial: "R",
      name: "Rafael Duarte",
      role: "Automation & Integrations",
      bio: "Connects systems that weren't built to talk to each other. If something can run by itself, he makes it happen — if it can't, he invents a way.",
    },
    {
      initial: "A",
      name: "Ana Lemos",
      role: "Product & Design",
      bio: "Makes sure what we deliver makes sense to the person using it — not just to the person who built it. If it's too complex, she simplifies it.",
    },
  ],
};

export default function TeamSection() {
  const { lang } = useLang();

  return (
    <section className="min-h-screen flex flex-col justify-center bg-[var(--bg)]">
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          paddingRight: "clamp(1.5rem, 6vw, 6rem)",
          paddingTop: "7rem",
          paddingBottom: "7rem",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block font-bold uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--indigo)", marginBottom: "1rem" }}
        >
          {lang === "en" ? "The people behind it" : "Quem faz isso acontecer"}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-black text-[var(--navy)]"
          style={{ fontFamily: "var(--font-bricolage)", fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 0.97, letterSpacing: "-0.01em", textTransform: "uppercase", maxWidth: "24ch", marginBottom: "1.25rem" }}
        >
          {lang === "en"
            ? <>Humans behind <span style={{ color: "var(--indigo)" }}>the WWW</span></>
            : <>Humanos por trás <span style={{ color: "var(--indigo)" }}>da WWW</span></>}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-[var(--text-mid)]"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", maxWidth: "48ch", marginBottom: "4rem", lineHeight: 1.65 }}
        >
          {lang === "en"
            ? "Small and focused — the way we like it. Every delivery passes through people who understand what you're going through."
            : "Pequena e focada — do jeito que a gente gosta. Cada entrega passa por pessoas que entendem o que você passa."}
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {team[lang].map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                background: "var(--bg-card)",
                borderTop: "3px solid var(--navy)",
                padding: "1.75rem",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "var(--indigo)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-bricolage)",
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  color: "var(--navy)",
                  marginBottom: "1.25rem",
                }}
              >
                {person.initial}
              </div>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--indigo)",
                  marginBottom: "0.35rem",
                }}
              >
                {person.role}
              </span>
              <h3
                className="font-black text-[var(--navy)]"
                style={{ fontFamily: "var(--font-bricolage)", fontSize: "1.25rem", letterSpacing: "-0.01em", marginBottom: "0.85rem", lineHeight: 1.1, textTransform: "uppercase" }}
              >
                {person.name}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-mid)", lineHeight: 1.65 }}>
                {person.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
