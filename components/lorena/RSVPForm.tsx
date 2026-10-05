"use client";

import { useId, useState, type FormEvent } from "react";
import { content } from "@/lib/lorena/content";
import { StationeryButton } from "./Type";

type Status = "idle" | "yes" | "no";

/**
 * RSVP written like a reply card.
 * Destination: if content.rsvp.whatsapp is set, the reply opens WhatsApp
 * with a pre-filled message; otherwise it confirms on screen only.
 * (Swap `deliver` for Formspree / Google Sheets / Webflow when ready.)
 */
export function RSVPForm() {
  const c = content.rsvp;
  const f = c.fields;
  const uid = useId();
  const [attending, setAttending] = useState<"" | "sim" | "nao">("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function deliver(data: { nome: string; vem: string; pessoas: string; obs: string }) {
    if (!c.whatsapp) return;
    const msg =
      `RSVP — Brunch de Fraldas da Lorena\n` +
      `Nome: ${data.nome}\nVem: ${data.vem === "sim" ? "Sim" : "Não"}\n` +
      (data.vem === "sim" ? `Pessoas: ${data.pessoas}\n` : "") +
      (data.obs ? `Obs.: ${data.obs}` : "");
    window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") || "").trim();
    const vem = String(fd.get("vem") || "");
    if (!nome) return setError("Escreva seu nome, por favor.");
    if (!vem) return setError("Conte pra gente se você vem.");
    setError("");
    deliver({ nome, vem, pessoas: String(fd.get("pessoas") || "1"), obs: String(fd.get("obs") || "").trim() });
    setStatus(vem === "sim" ? "yes" : "no");
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
    <form className="lw-form" onSubmit={onSubmit} noValidate aria-describedby={error ? `${uid}-err` : undefined}>
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

      <div className="lw-form__submit">
        <StationeryButton type="submit">{c.submit}</StationeryButton>
      </div>
    </form>
  );
}
