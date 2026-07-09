"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioItems } from "@/lib/portfolio-data";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PortfolioModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-cream p-6 md:p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-ink/50">
                Portfólio
              </span>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="text-ink/40 transition hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="snap-track flex gap-4 overflow-x-auto pb-3">
              {portfolioItems.map((item) => (
                <div key={item.name} className="w-56 shrink-0">
                  <div className="relative h-36 w-56 overflow-hidden rounded-xl bg-green">
                    <Image
                      src={item.image}
                      alt={`Tela inicial do projeto ${item.name}`}
                      fill
                      className="object-cover"
                      sizes="224px"
                    />
                  </div>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-[13px] font-medium text-ink transition hover:text-pink"
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    <p className="mt-2 text-[13px] font-medium text-ink/40">
                      {item.name} — em breve
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-ink/40">
              Arraste para o lado para ver mais projetos
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
