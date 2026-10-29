"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Content } from "@/lib/lorena/content";
import { RSVPForm } from "./RSVPForm";

/** Stationery popup (native <dialog>: focus trap, Esc, tap outside to close). */
function Popup({ open, onClose, title, kicker, children }: { open: boolean; onClose: () => void; title: string; kicker?: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="lw-pp lw-pp--card" aria-label={title} onClose={onClose} onClick={(e) => e.target === e.currentTarget && ref.current?.close()}>
      {open && (
        <div className="lw-pp__sheet">
          <button type="button" className="lw-pp__x" onClick={() => ref.current?.close()} aria-label="Fechar">
            ×
          </button>
          {kicker && <p className="lw-gl__h">{kicker}</p>}
          <h2 className="lw-pp__title">{title}</h2>
          {children}
        </div>
      )}
    </dialog>
  );
}

/**
 * The card's buttons: RSVP (form in a popup), gift list, save to calendar.
 * Lives on the locked save-the-date card, so everything opens in place.
 */
export function CardActions({ content }: { content: Content }) {
  const h = content.hero;
  const [popup, setPopup] = useState<"" | "rsvp" | "agenda">("");
  const close = () => setPopup("");

  return (
    <>
      <div className="lw-hero__actions">
        <button type="button" className="lw-btn lw-btn--fill lw-hero__rsvp" onClick={() => setPopup("rsvp")}>
          <span>{h.rsvpLabel}</span>
        </button>
        <p className="lw-hero__deadline">{h.rsvpDeadline}</p>
        <div className="lw-hero__more">
          {h.giftsUrl && (
            <a className="lw-btn lw-btn--outline" href={h.giftsUrl}>
              <span>{h.giftsLabel}</span>
            </a>
          )}
          <button type="button" className="lw-btn lw-btn--outline" onClick={() => setPopup("agenda")}>
            <span>{h.calendarLabel}</span>
          </button>
        </div>
      </div>

      <Popup open={popup === "rsvp"} onClose={close} kicker={`${content.city} · ${h.day} de ${h.month}`} title={content.rsvp.title}>
        <p className="lw-gl__note">{content.rsvp.deadline}</p>
        <div className="lw-pp__form">
          <RSVPForm rsvp={content.rsvp} edition={content.slug} city={content.city} />
        </div>
      </Popup>

      <Popup open={popup === "agenda"} onClose={close} kicker="Salvar na agenda" title={`${h.day} de ${h.month} · ${h.time}`}>
        <p className="lw-gl__note">Escolha a agenda do seu celular — o lembrete chega um dia antes.</p>
        <div className="lw-pp__choices">
          <a className="lw-btn lw-btn--fill" href={h.calendar.google} target="_blank" rel="noopener noreferrer">
            <span>Google Agenda</span>
          </a>
          <a className="lw-btn lw-btn--outline" href={h.calendar.ics}>
            <span>iPhone / Outlook</span>
          </a>
        </div>
      </Popup>
    </>
  );
}
