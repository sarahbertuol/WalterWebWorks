"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StepType = "single" | "multi" | "site" | "contact";

type Step = {
  id: string;
  question: string;
  hint?: string;
  type: StepType;
  options?: { label: string; icon: string }[];
};

const steps: Step[] = [
  {
    id: "atividade",
    question: "Qual é a sua principal atividade?",
    type: "single",
    options: [
      { label: "Personal trainer / Coach", icon: "💪" },
      { label: "Terapeuta / Psicólogo", icon: "🧠" },
      { label: "Advogado / Contador", icon: "⚖️" },
      { label: "Designer / Fotógrafo", icon: "🎨" },
      { label: "Prestador de serviços", icon: "🔧" },
      { label: "Outro", icon: "✨" },
    ],
  },
  {
    id: "dores",
    question: "O que mais toma o seu tempo hoje?",
    hint: "Pode marcar mais de uma",
    type: "multi",
    options: [
      { label: "Agendamento de clientes", icon: "📅" },
      { label: "Cobranças e pagamentos", icon: "💸" },
      { label: "Responder WhatsApp", icon: "💬" },
      { label: "Organizar e-mails", icon: "📧" },
      { label: "Postar nas redes sociais", icon: "📱" },
      { label: "Atualizar meu site", icon: "🌐" },
      { label: "Controlar tarefas e projetos", icon: "📋" },
    ],
  },
  {
    id: "clientes",
    question: "Quantos clientes você atende por mês?",
    type: "single",
    options: [
      { label: "Menos de 10", icon: "👤" },
      { label: "Entre 10 e 30", icon: "👥" },
      { label: "Entre 30 e 100", icon: "🏃" },
      { label: "Mais de 100", icon: "🚀" },
    ],
  },
  {
    id: "ferramentas",
    question: "Quais ferramentas você já usa?",
    hint: "Pode marcar mais de uma",
    type: "multi",
    options: [
      { label: "WhatsApp", icon: "💬" },
      { label: "Google Agenda", icon: "📅" },
      { label: "Instagram / TikTok", icon: "📸" },
      { label: "Gmail / Outlook", icon: "📧" },
      { label: "Planilha (Sheets / Excel)", icon: "📊" },
      { label: "Nenhuma específica", icon: "🤷" },
    ],
  },
  {
    id: "gargalo",
    question: "Qual frase descreve seu maior problema?",
    type: "single",
    options: [
      { label: "Passo tempo demais respondendo as mesmas perguntas", icon: "🔁" },
      { label: "Esqueço de cobrar clientes em dia", icon: "💰" },
      { label: "Não consigo manter as redes sociais ativas", icon: "📉" },
      { label: "Minha agenda vira bagunça com facilidade", icon: "🗂️" },
      { label: "Perco clientes por demorar no retorno", icon: "⏰" },
    ],
  },
  {
    id: "prazo",
    question: "Quando você quer resolver isso?",
    type: "single",
    options: [
      { label: "Agora — tenho urgência!", icon: "🔥" },
      { label: "Nos próximos 30 dias", icon: "📆" },
      { label: "Só estou explorando por enquanto", icon: "🔍" },
    ],
  },
  {
    id: "site",
    question: "Você já tem um site?",
    type: "site",
    options: [
      { label: "Sim, tenho", icon: "✅" },
      { label: "Tenho mas está abandonado", icon: "🕸️" },
      { label: "Não tenho", icon: "❌" },
    ],
  },
  {
    id: "contato",
    question: "Por fim, como a gente te encontra?",
    hint: "Preencha pelo menos nome + WhatsApp ou e-mail",
    type: "contact",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function QuizForm() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [contact, setContact] = useState({ nome: "", whatsapp: "", email: "" });
  const [siteUrl, setSiteUrl] = useState("");
  const [done, setDone] = useState(false);

  const step = steps[current];
  const progressPct = (current / steps.length) * 100;

  function goNext() {
    if (current < steps.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  }

  function goBack() {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }

  function pickSingle(label: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: label }));
    setTimeout(goNext, 320);
  }

  function pickSite(label: string) {
    setAnswers((prev) => ({ ...prev, site: label }));
    if (label !== "Sim, tenho") setTimeout(goNext, 320);
  }

  function toggleMulti(label: string) {
    setAnswers((prev) => {
      const cur = (prev[step.id] as string[]) ?? [];
      return {
        ...prev,
        [step.id]: cur.includes(label) ? cur.filter((l) => l !== label) : [...cur, label],
      };
    });
  }

  function handleSubmit() {
    const siteInfo = answers["site"] === "Sim, tenho" && siteUrl
      ? `${answers["site"]} (${siteUrl})`
      : answers["site"] ?? "";
    const displayAnswers = { ...answers, site: siteInfo };
    const msg = encodeURIComponent(
      `Olá! Acabei de preencher o questionário da WWW.\n\nNome: ${contact.nome}\nWhatsApp: ${contact.whatsapp}\nE-mail: ${contact.email}\n\nRespostas:\n${Object.entries(displayAnswers).map(([, v]) => `• ${Array.isArray(v) ? v.join(", ") : v}`).join("\n")}`
    );
    window.open(`https://wa.me/5551999999999?text=${msg}`, "_blank");
    setDone(true);
  }

  const multiSelected = (answers[step.id] as string[] | undefined) ?? [];
  const canSubmitContact = contact.nome.trim() && (contact.whatsapp.trim() || contact.email.trim());

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "3rem 0" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🎉</div>
        <h3
          className="font-black text-[var(--navy)]"
          style={{ fontFamily: "var(--font-bricolage)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.1, marginBottom: "1rem" }}
        >
          Recebemos tudo!
        </h3>
        <p
          className="text-[var(--text-mid)]"
          style={{ fontSize: "1rem", maxWidth: "42ch", marginBottom: "2.5rem", lineHeight: 1.65 }}
        >
          Com base nas suas respostas, vamos montar uma estimativa personalizada. Retorno em até 24h.
        </p>
        <a
          href="https://wa.me/5551999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold rounded-full text-white hover:opacity-90 transition-all active:scale-[0.97]"
          style={{ padding: "1rem 2.2rem", background: "#25D366", fontSize: "1rem", boxShadow: "0 6px 28px rgba(37,211,102,0.35)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.28 7.04L.787 23.426a.75.75 0 00.787.574l4.48-1.164A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-4.963-1.353l-.355-.213-3.695.96.986-3.607-.232-.371A9.75 9.75 0 1112 21.75z" />
          </svg>
          Continuar pelo WhatsApp →
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span
            className="font-bold uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--indigo)", opacity: 0.75 }}
          >
            Pergunta {current + 1} de {steps.length}
          </span>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-mid)", opacity: 0.55 }}>
            {Math.round(progressPct)}% concluído
          </span>
        </div>
        <div style={{ height: "5px", borderRadius: "99px", background: "var(--border)", overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              height: "100%",
              borderRadius: "99px",
              background: "linear-gradient(90deg, var(--indigo), var(--indigo-2))",
            }}
          />
        </div>
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3
            className="font-black text-[var(--navy)]"
            style={{
              fontFamily: "var(--font-bricolage)",
              fontSize: "clamp(1.35rem, 3vw, 1.9rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: step.hint ? "0.5rem" : "1.75rem",
            }}
          >
            {step.question}
          </h3>

          {step.hint && (
            <p style={{ fontSize: "0.82rem", color: "var(--text-mid)", opacity: 0.65, marginBottom: "1.75rem" }}>
              {step.hint}
            </p>
          )}

          {/* Single choice */}
          {step.type === "single" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "0.7rem" }}>
              {step.options!.map((opt) => {
                const selected = answers[step.id] === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => pickSingle(opt.label)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.85rem 1.1rem",
                      borderRadius: "0.875rem",
                      border: `2px solid ${selected ? "var(--indigo)" : "var(--border)"}`,
                      background: selected ? "rgba(241,182,201,0.18)" : "var(--bg-card)",
                      color: selected ? "var(--indigo)" : "var(--text-mid)",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      lineHeight: 1.3,
                    }}
                  >
                    <span style={{ fontSize: "1.15rem", lineHeight: 1, flexShrink: 0 }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Site question */}
          {step.type === "site" && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: answers["site"] === "Sim, tenho" ? "1.5rem" : "0" }}>
                {step.options!.map((opt) => {
                  const selected = answers["site"] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => pickSite(opt.label)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1.1rem",
                        borderRadius: "0.875rem",
                        border: `2px solid ${selected ? "var(--indigo)" : "var(--border)"}`,
                        background: selected ? "rgba(241,182,201,0.18)" : "var(--bg-card)",
                        color: selected ? "var(--indigo)" : "var(--text-mid)",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        lineHeight: 1.3,
                      }}
                    >
                      <span style={{ fontSize: "1.15rem", lineHeight: 1, flexShrink: 0 }}>{opt.icon}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {answers["site"] === "Sim, tenho" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.5rem", maxWidth: "400px" }}
                >
                  <label
                    className="font-bold uppercase"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "var(--text-mid)" }}
                  >
                    Endereço do site (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://meunegocio.com.br"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "0.75rem",
                      border: "2px solid var(--border)",
                      background: "var(--bg-card)",
                      fontSize: "0.95rem",
                      color: "var(--navy)",
                      outline: "none",
                      width: "100%",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--indigo)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                  <button
                    onClick={goNext}
                    style={{
                      marginTop: "0.5rem",
                      alignSelf: "flex-start",
                      padding: "0.9rem 2.2rem",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, var(--indigo), var(--indigo-2))",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(241,182,201,0.5)",
                    }}
                  >
                    Próximo →
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* Multi choice */}
          {step.type === "multi" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "0.7rem", marginBottom: "2rem" }}>
                {step.options!.map((opt) => {
                  const selected = multiSelected.includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      onClick={() => toggleMulti(opt.label)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1.1rem",
                        borderRadius: "0.875rem",
                        border: `2px solid ${selected ? "var(--indigo)" : "var(--border)"}`,
                        background: selected ? "rgba(241,182,201,0.18)" : "var(--bg-card)",
                        color: selected ? "var(--indigo)" : "var(--text-mid)",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        lineHeight: 1.3,
                      }}
                    >
                      <span style={{ fontSize: "1.15rem", lineHeight: 1, flexShrink: 0 }}>{opt.icon}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={goNext}
                disabled={multiSelected.length === 0}
                style={{
                  padding: "0.9rem 2.2rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, var(--indigo), var(--indigo-2))",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: multiSelected.length > 0 ? "pointer" : "not-allowed",
                  opacity: multiSelected.length > 0 ? 1 : 0.38,
                  border: "none",
                  transition: "opacity 0.15s ease",
                  boxShadow: multiSelected.length > 0 ? "0 4px 20px rgba(67,97,238,0.3)" : "none",
                }}
              >
                Próximo →
              </button>
            </>
          )}

          {/* Contact */}
          {step.type === "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", maxWidth: "480px" }}>
              {(
                [
                  { key: "nome", label: "Seu nome *", placeholder: "Maria Silva", type: "text" },
                  { key: "whatsapp", label: "WhatsApp", placeholder: "(51) 99999-9999", type: "tel" },
                  { key: "email", label: "E-mail", placeholder: "maria@seusite.com", type: "email" },
                ] as const
              ).map((field) => (
                <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  <label
                    className="font-bold uppercase"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "var(--text-mid)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={contact[field.key]}
                    onChange={(e) => setContact((p) => ({ ...p, [field.key]: e.target.value }))}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "0.75rem",
                      border: "2px solid var(--border)",
                      background: "var(--bg-card)",
                      fontSize: "0.95rem",
                      color: "var(--navy)",
                      outline: "none",
                      width: "100%",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--indigo)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={!canSubmitContact}
                style={{
                  marginTop: "0.75rem",
                  padding: "1rem 2.5rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, var(--indigo), var(--indigo-2))",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: canSubmitContact ? "pointer" : "not-allowed",
                  border: "none",
                  opacity: canSubmitContact ? 1 : 0.38,
                  boxShadow: canSubmitContact ? "0 6px 28px rgba(67,97,238,0.35)" : "none",
                  alignSelf: "flex-start",
                  transition: "opacity 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                Enviar e receber estimativa →
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Back */}
      {current > 0 && (
        <button
          onClick={goBack}
          style={{
            marginTop: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--text-mid)",
            opacity: 0.55,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Voltar
        </button>
      )}
    </div>
  );
}
