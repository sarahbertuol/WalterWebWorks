"use client";

import { useEffect, useRef } from "react";
import type { Gift } from "@/lib/lorena/gifts";

/** "Ver exemplos" popup for one gift (native <dialog>: focus trap and Esc for free). */
export function ExamplesDialog({ gift, onClose }: { gift: Gift | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (gift && d && !d.open) d.showModal();
  }, [gift]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="lw-pp"
      aria-labelledby="lw-pp-title"
      onClose={onClose}
      // tap on the dimmed backdrop closes it
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {gift && (
        <div className="lw-pp__sheet">
          <button type="button" className="lw-pp__x" onClick={close} aria-label="Fechar">
            ×
          </button>
          <p className="lw-gl__h">Exemplos</p>
          <h2 id="lw-pp-title" className="lw-pp__title">
            {gift.name}
          </h2>
          {gift.examplesNote && <p className="lw-gl__note">{gift.examplesNote}</p>}

          <ul className="lw-pp__list">
            {gift.examples?.map((p) => (
              <li key={p.name}>
                <span className="lw-gl__name">{p.name}</span>
                {p.note && <span className="lw-gl__item-note">{p.note}</span>}
                <span className="lw-pp__links">
                  {p.links.map((l) => (
                    <a key={l.url} className="lw-link" href={l.url} target="_blank" rel="noopener noreferrer">
                      link · {l.label}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <p className="lw-pp__foot">
            <button type="button" className="lw-btn lw-btn--fill" onClick={close}>
              <span>Voltar à lista</span>
            </button>
          </p>
        </div>
      )}
    </dialog>
  );
}
