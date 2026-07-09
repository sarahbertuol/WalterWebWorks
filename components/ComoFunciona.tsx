"use client";

import { motion } from "framer-motion";

const steps = [
  { n: "01", text: "Conversa rápida no WhatsApp" },
  { n: "02", text: "Construímos com IA, no ar em dias" },
  { n: "03", text: "Você cresce, a gente cuida do resto" },
];

export default function ComoFunciona() {
  return (
    <section className="bg-cream px-5 py-16 md:px-8 md:py-20">
      <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-widest text-green">
        Como funciona
      </p>
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`flex items-baseline gap-5 border-t border-ink/10 py-5 ${
              i === steps.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="w-10 font-display text-2xl text-pink md:text-3xl">
              {step.n}
            </span>
            <p className="text-base text-ink md:text-lg">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
