"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const differentiators = [
  "Nada novo pra aprender — funciona dentro do que você já usa",
  "Construído pro seu negócio, não um template genérico",
  "No ar em dias, não em meses",
  "Seus dados e ferramentas continuam seus, sempre",
  "A gente só te avisa quando realmente precisa de um humano",
  "Preço por entrega, nunca por hora",
];

export default function InstitucionalBlock() {
  return (
    <section className="bg-[var(--navy)] min-h-screen flex flex-col justify-center overflow-hidden relative">
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(241,182,201,0.2) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[var(--saffron)] opacity-70 mb-5 block">
            Por que isso não é só mais um app
          </span>
          <h2
            className="font-black text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-white mb-8"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Automação que cabe<br />no negócio que<br />você já tem.
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-white/55 max-w-[38ch] mb-10">
            Não te pedimos pra aprender novo sistema. Não vendemos promessa de
            meses de consultoria. Encaixamos automação no que você já usa e
            entregamos resultado em dias.
          </p>
          <Link
            href="/sobre"
            className="inline-flex items-center justify-center text-sm font-semibold px-8 py-4 rounded-full text-[var(--navy)] hover:opacity-90 transition-all active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg, var(--saffron), var(--saffron-2))", boxShadow: "0 4px 18px rgba(241,182,201,0.5)" }}
          >
            Conheça a gente →
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          {differentiators.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[0.6rem] font-black text-[var(--navy)]"
                style={{ background: "linear-gradient(135deg, var(--saffron), var(--saffron-2))" }}
              >
                +
              </span>
              <span className="text-[0.95rem] text-white/65 leading-relaxed">{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
