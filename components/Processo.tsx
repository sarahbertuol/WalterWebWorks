"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

const STEPS = [
  {
    n: "01",
    label: "Contato",
    title: "Você manda uma mensagem",
    desc: "WhatsApp ou formulário. Respondemos em até 24 h com disponibilidade e as primeiras perguntas.",
  },
  {
    n: "02",
    label: "Proposta",
    title: "A proposta chega no dia seguinte",
    desc: "Escopo, prazo e valor em um documento direto. Sem surpresas e sem letras miúdas.",
  },
  {
    n: "03",
    label: "Confirmação",
    title: "Você aprova e assinamos",
    desc: "Contrato simples, pagamento inicial e você já ganha acesso ao painel do projeto.",
  },
  {
    n: "04",
    label: "Kickoff",
    title: "Reunião rápida de alinhamento",
    desc: "30 min para afinar referências, cronograma real e o que precisamos de você.",
  },
  {
    n: "05",
    label: "Entrega",
    title: "Seu site vai ao ar",
    desc: "Você revisa, aprova e publicamos. Suporte pós-entrega incluso nos primeiros 30 dias.",
  },
];

const CARD_OFFSET = 285;

export default function Processo() {
  const [active, setActive] = useState(0);

  function next() {
    setActive((a) => Math.min(a + 1, STEPS.length - 1));
  }
  function prev() {
    setActive((a) => Math.max(a - 1, 0));
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -45) next();
    else if (info.offset.x > 45) prev();
  }

  return (
    <section className="overflow-hidden bg-green-dark px-5 pb-16 pt-16 md:pb-24 md:pt-24">
      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mb-4 font-mono text-[11px] font-bold uppercase tracking-widest text-cream/50"
      >
        Processo
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="mb-14 max-w-xs font-display text-3xl leading-tight text-cream md:max-w-sm md:text-4xl"
      >
        Do contato à entrega,
        <br />
        <span className="italic text-pink">sem mistério.</span>
      </motion.h2>

      {/* Carousel */}
      <div className="relative flex h-[300px] items-center justify-center md:h-[280px]">
        {STEPS.map((step, i) => {
          const offset = i - active;
          const isActive = offset === 0;

          return (
            <motion.div
              key={step.n}
              className="absolute w-[240px] select-none md:w-[260px]"
              animate={{
                x: offset * CARD_OFFSET,
                rotate: offset * 7,
                scale: 1 - Math.abs(offset) * 0.07,
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.18,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              onClick={() => !isActive && setActive(i)}
              style={{ cursor: isActive ? "grab" : "pointer" }}
              whileDrag={{ cursor: "grabbing" }}
            >
              <div
                className={`h-full rounded-2xl border p-6 transition-colors ${
                  isActive
                    ? "border-pink/30 bg-cream"
                    : "border-cream/5 bg-cream/75"
                }`}
              >
                {/* Step number */}
                <span className="font-display text-5xl font-bold leading-none text-green">
                  {step.n}
                </span>

                {/* Label */}
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-pink">
                  {step.label}
                </p>

                {/* Title */}
                <h3 className="mt-3 font-display text-[1.05rem] leading-snug text-ink md:text-lg">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-ink/55">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots nav */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Etapa ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-pink" : "w-1.5 bg-cream/25 hover:bg-cream/45"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-cream/30">
        Arraste ou toque para navegar
      </p>
    </section>
  );
}
