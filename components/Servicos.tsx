"use client";

import { motion } from "framer-motion";

export default function Servicos() {
  return (
    <section className="grid grid-cols-1 gap-3 bg-cream px-5 pb-16 md:grid-cols-[1.3fr_1fr] md:px-8 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-green p-7 text-cream md:translate-y-4 md:p-9"
      >
        <span className="text-2xl" aria-hidden>
          🌐
        </span>
        <h3 className="mt-4 font-display text-2xl md:text-3xl">Site rápido</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/75">
          Webflow ou código, no ar em dias, com SEO de verdade.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl bg-pink p-7 text-ink md:p-9"
      >
        <span className="text-2xl" aria-hidden>
          🤖
        </span>
        <h3 className="mt-4 font-display text-2xl md:text-3xl">Automação IA</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          WhatsApp e CRM rodando sozinhos.
        </p>
      </motion.div>
    </section>
  );
}
