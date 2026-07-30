"use client";

import { motion } from "framer-motion";

const values = [
  { label: "Site no ar em dias", sub: "não semanas" },
  { label: "Sem contrato longo", sub: "você decide quando parar" },
  { label: "IA que você entende", sub: "sem aprender ferramenta nova" },
];

export default function Sobre() {
  return (
    <section id="sobre" className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mb-4 font-mono text-[11px] font-bold uppercase tracking-widest text-green"
      >
        Sobre
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="max-w-xs font-display text-3xl leading-tight text-ink md:max-w-md md:text-4xl"
      >
        Nascemos pra tirar
        <br />
        <span className="italic text-pink">tarefas do seu caminho.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base"
      >
        Somos uma agência pequena por escolha. Cada projeto passa pelas
        mesmas mãos do começo ao fim — sem terceirizar, sem sumir depois
        da entrega. Trabalhamos com negócios que não têm tempo a perder
        e precisam de resultado essa semana, não esse trimestre.
      </motion.p>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {values.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-ink/8 bg-white px-5 py-5"
          >
            <p className="font-display text-lg leading-snug text-ink md:text-xl">
              {v.label}
            </p>
            <p className="mt-1 font-mono text-[11px] text-ink/45">{v.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
