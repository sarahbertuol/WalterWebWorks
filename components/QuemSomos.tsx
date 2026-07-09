"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function QuemSomos() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest text-pink">
        Quem somos
      </p>
      <h3 className="max-w-sm font-display text-3xl leading-tight text-ink md:text-4xl">
        O Walter é o motivo do nosso nome
      </h3>

      <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-pink md:h-48 md:w-48"
        >
          <Image
            src="/images/walter-photo.png"
            alt="Walter, o cachorro mascote da Walter Web Works, usando óculos"
            width={320}
            height={320}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md text-sm leading-relaxed text-ink/70 md:text-base"
        >
          Nasceu da sigla WWW e de um cachorro real que dorme do lado da mesa
          enquanto a gente trabalha. Hoje ele é o mascote oficial da marca —
          e, aparentemente, também usa óculos.
        </motion.p>
      </div>
    </section>
  );
}
