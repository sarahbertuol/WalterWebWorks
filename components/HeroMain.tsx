"use client";

import { motion } from "framer-motion";

type Props = {
  onOpenPortfolio: () => void;
};

export default function HeroMain({ onOpenPortfolio }: Props) {
  return (
    <section className="relative overflow-hidden bg-green px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <motion.span
        initial={{ opacity: 0, rotate: 0, y: -10 }}
        animate={{ opacity: 1, rotate: 6, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute right-5 top-6 rounded-full bg-pink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-ink md:right-10 md:top-10"
      >
        Vagas abertas para julho
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-display text-[15vw] font-bold leading-[0.92] tracking-tight text-cream sm:text-[9vw] lg:text-[7.5rem]"
      >
        Site
        <br />
        pronto.
        <br />
        <span className="ml-6 italic text-pink md:ml-16">Rápido.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 max-w-md text-base leading-relaxed text-cream/80 md:text-lg"
      >
        A Walter Web Works cria seu site em dias e conecta IA para tirar
        tarefa repetitiva da sua mão.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="#contato"
          className="rounded-full border-2 border-pink px-6 py-3 text-sm font-medium text-cream transition hover:bg-pink hover:text-ink"
        >
          Começar meu site
        </a>
        <button
          onClick={onOpenPortfolio}
          className="rounded-full border-2 border-cream/40 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wide text-cream transition hover:border-cream"
        >
          Ver portfólio
        </button>
      </motion.div>
    </section>
  );
}
