"use client";

import { useId, useState, type FormEvent } from "react";
import { content } from "@/lib/lorena/content";
import { StationeryButton } from "./Type";

type Status = "idle" | "yes" | "no";
type Reply = { nome: string; vem: string; pessoas: string; obs: string };

/** WhatsApp link with the reply pre-written — plan B if the sheet is unreachable. */
function whatsappLink(number: string, r: Reply) {
  const msg =
    `RSVP — Brunch de Fraldas da Lorena\n` +
    `Nome: ${r.nome}\nVem: ${r.vem === "sim" ? "Sim" : "Não"}\n` +
    (r.vem === "sim" ? `Pessoas: ${r.pessoas}\n` : "") +
    (r.obs ? `Obs.: ${r.obs}` : "");
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

/**
 * RSVP written like a reply card.
 * Replies are posted to /api/lorena/rsvp, which appends them to the Google
 * Sheet (see docs/lorena/README.md). If that fails and content.rsvp.whatsapp
 * is set, the guest gets a one-tap WhatsApp fallback instead.
 */
export function RSVPForm() {
  const c = content.rsvp;
  const f = c.fields;
  const uid = useId();
  const [attending, setAttending] = useState<"" | "sim" | "nao">("");
  const [status, setStatus] = useState<Status>("idle");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const reply: Reply = {
      nome: String(fd.get("nome") || "").trim(),
      vem: String(fd.get("vem") || ""),
      pessoas: String(fd.get("pessoas") || "1"),
      obs: String(fd.get("obs") || "").trim(),
    };
    if (!reply.nome) return setError("Escreva seu nome, por favor.");
    if (!reply.vem) return setError("Conte pra gente se você vem.");
    setError("");
    setFallback("");
    setSending(true);
    try {
      const res = await fetch("/api/lorena/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reply, website: String(fd.get("website") || "") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus(reply.vem === "sim" ? "yes" : "no");
    } catch {
      setError(c.error);
      if (c.whatsapp) setFallback(whatsappLink(c.whatsapp, reply));
    } finally {
      setSending(false);
    }
  }

  if (status !== "idle") {
    return (
      <div className="lw-rsvp__thanks" role="status">
        <p className="lw-script lw-script--md">Com carinho</p>
        <p className="lw-prose">{status === "yes" ? c.thanksYes : c.thanksNo}</p>
        <button type="button" className="lw-link" onClick={() => setStatus("idle")}>
          Editar resposta
        </button>
      </div>
    );
  }

  return (
    <form className="lw-form" onSubmit={onSubmit} noValidate aria-describedby={error ? `${uid}-err` : undefined} aria-busy={sending}>
      <div className="lw-hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Não preencha</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="lw-field">
        <label htmlFor={`${uid}-nome`}>{f.name}</label>
        <input id={`${uid}-nome`} name="nome" type="text" autoComplete="name" required />
      </div>

      <fieldset className="lw-field lw-field--choice">
        <legend>{f.attending}</legend>
        <div className="lw-choices">
          <label className="lw-choice">
            <input type="radio" name="vem" value="sim" checked={attending === "sim"} onChange={() => setAttending("sim")} required />
            <span className="lw-choice__mark" aria-hidden="true" />
            <span>{f.yes}</span>
          </label>
          <label className="lw-choice">
            <input type="radio" name="vem" value="nao" checked={attending === "nao"} onChange={() => setAttending("nao")} />
            <span className="lw-choice__mark" aria-hidden="true" />
            <span>{f.no}</span>
          </label>
        </div>
      </fieldset>

      <div className={`lw-field lw-field--short ${attending === "nao" ? "is-muted" : ""}`}>
        <label htmlFor={`${uid}-pessoas`}>{f.guests}</label>
        <select id={`${uid}-pessoas`} name="pessoas" defaultValue="1" disabled={attending === "nao"}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="lw-field">
        <label htmlFor={`${uid}-obs`}>{f.notes}</label>
        <textarea id={`${uid}-obs`} name="obs" rows={3} placeholder={f.notesHint} />
      </div>

      <p id={`${uid}-err`} className="lw-form__error" role="alert" aria-live="assertive">
        {error}
      </p>
      {fallback && (
        <p className="lw-form__fallback">
          <a className="lw-link" href={fallback} target="_blank" rel="noopener noreferrer">
            Enviar a resposta pelo WhatsApp
          </a>
        </p>
      )}

      <div className="lw-form__submit">
        <StationeryButton type="submit" disabled={sending}>
          {sending ? c.sending : c.submit}
        </StationeryButton>
      </div>
    </form>
  );
}
