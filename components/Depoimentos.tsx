"use client";

import { motion } from "framer-motion";

export default function Depoimentos() {
  return (
    <section className="bg-green-dark px-5 py-16 md:px-8 md:py-20">
      <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-widest text-cream/60">
        Depoimentos
      </p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="max-w-sm rounded-2xl bg-green p-4"
      >
        <div className="mb-3 flex items-center gap-2 border-b border-cream/10 pb-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink text-[10px] font-bold text-ink">
            RC
          </div>
          <div>
            <p className="text-[11px] font-medium text-cream">Cliente real</p>
            <p className="text-[9px] text-cream/50">conversa de WhatsApp, editada</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-pink px-3 py-2 text-[11px] text-ink">
            gente, o site já está no ar??
          </p>
          <p className="mr-auto max-w-[85%] rounded-xl rounded-tl-sm bg-green-dark px-3 py-2 text-[11px] text-cream">
            já sim, publicamos ontem à noite
          </p>
          <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-pink px-3 py-2 text-[11px] text-ink">
            em duas semanas? vocês são rápidos demais
          </p>
        </div>
      </motion.div>
    </section>
  );
}
