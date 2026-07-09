"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quizQuestions } from "@/lib/quiz-data";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Answers = Record<number, string[]>;

export default function OrcamentoModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ nome: "", whatsapp: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const total = quizQuestions.length;
  const question = quizQuestions[step];
  const progress = Math.round((step / total) * 100);

  function reset() {
    setStep(0);
    setAnswers({});
    setContact({ nome: "", whatsapp: "", email: "" });
    setSubmitted(false);
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  function selectSingle(label: string) {
    setAnswers((a) => ({ ...a, [question.id]: [label] }));
    setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 150);
  }

  function toggleMulti(label: string) {
    setAnswers((a) => {
      const current = a[question.id] ?? [];
      const next = current.includes(label)
        ? current.filter((l) => l !== label)
        : [...current, label];
      return { ...a, [question.id]: next };
    });
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    if (!contact.nome || (!contact.whatsapp && !contact.email)) return;
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 md:p-7"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <p className="text-3xl" aria-hidden>🎉</p>
                <h3 className="mt-3 font-display text-2xl text-ink">
                  Recebemos, {contact.nome.split(" ")[0]}!
                </h3>
                <p className="mt-2 text-sm text-ink/60">
                  A gente te chama em até 24h com uma estimativa personalizada.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-green px-6 py-3 text-sm font-medium text-cream"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-ink/40">
                    Pergunta {step + 1} de {total}
                  </span>
                  <button
                    onClick={handleClose}
                    aria-label="Fechar"
                    className="text-ink/40 transition hover:text-ink"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-5 h-1 overflow-hidden rounded-full bg-cream-2">
                  <motion.div
                    className="h-full bg-pink"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-1 font-display text-lg text-ink md:text-xl">
                      {question.question}
                    </p>
                    {"helper" in question && question.helper ? (
                      <p className="mb-4 text-xs text-ink/45">{question.helper}</p>
                    ) : (
                      <div className="mb-4" />
                    )}

                    {question.type === "single" && (
                      <div className="grid grid-cols-2 gap-2">
                        {question.options.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => selectSingle(opt.label)}
                            className="flex items-center gap-2 rounded-xl border border-cream-2 bg-cream px-3 py-2.5 text-left text-[13px] text-ink transition hover:border-pink"
                          >
                            <span aria-hidden>{opt.emoji}</span>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === "multi" && (
                      <>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {question.options.map((opt) => {
                            const selected = answers[question.id]?.includes(opt.label) ?? false;
                            return (
                              <button
                                key={opt.label}
                                onClick={() => toggleMulti(opt.label)}
                                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[13px] transition ${
                                  selected
                                    ? "border-pink bg-pink text-ink"
                                    : "border-cream-2 bg-cream text-ink hover:border-pink"
                                }`}
                              >
                                <span aria-hidden>{opt.emoji}</span>
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={goNext}
                          className="w-full rounded-xl bg-green py-3 text-sm font-medium text-cream"
                        >
                          Próximo →
                        </button>
                      </>
                    )}

                    {question.type === "contact" && (
                      <>
                        <div className="mb-4 flex flex-col gap-2">
                          <input
                            value={contact.nome}
                            onChange={(e) => setContact((c) => ({ ...c, nome: e.target.value }))}
                            placeholder="Seu nome *"
                            className="rounded-xl border border-cream-2 bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-pink"
                          />
                          <input
                            value={contact.whatsapp}
                            onChange={(e) => setContact((c) => ({ ...c, whatsapp: e.target.value }))}
                            placeholder="WhatsApp"
                            className="rounded-xl border border-cream-2 bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-pink"
                          />
                          <input
                            value={contact.email}
                            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                            placeholder="E-mail"
                            className="rounded-xl border border-cream-2 bg-cream px-3.5 py-2.5 text-sm text-ink outline-none focus:border-pink"
                          />
                        </div>
                        <button
                          onClick={handleSubmit}
                          disabled={!contact.nome || (!contact.whatsapp && !contact.email)}
                          className="w-full rounded-xl bg-pink py-3 text-sm font-medium text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Enviar e receber estimativa →
                        </button>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {step > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-4 text-xs text-ink/40 transition hover:text-ink/70"
                  >
                    ← Voltar
                  </button>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
