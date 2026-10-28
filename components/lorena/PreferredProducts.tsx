"use client";

import { useRef } from "react";
import type { preferred as Preferred } from "@/lib/lorena/gifts";

/** "Produtos de preferência" button + popup (native <dialog>: focus trap, Esc and back-drop for free). */
export function PreferredProducts({ data }: { data: typeof Preferred }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" className="lw-btn lw-btn--outline lw-pp__open" onClick={() => ref.current?.showModal()}>
        <span>{data.title}</span>
      </button>

      <dialog
        ref={ref}
        className="lw-pp"
        aria-labelledby="lw-pp-title"
        // tap on the dimmed backdrop closes it
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="lw-pp__sheet">
          <button type="button" className="lw-pp__x" onClick={close} aria-label="Fechar">
            ×
          </button>
          <h2 id="lw-pp-title" className="lw-gl__h">
            {data.title}
          </h2>
          <p className="lw-gl__note">{data.intro}</p>

          {data.groups.map((group) => (
            <section key={group.title} className="lw-pp__group">
              <h3 className="lw-pp__h">{group.title}</h3>
              {group.note && <p className="lw-pp__gnote">{group.note}</p>}
              <ul className="lw-pp__list">
                {group.items.map((p) => (
                  <li key={p.name}>
                    <span className="lw-gl__text">
                      <span className="lw-gl__name">{p.name}</span>
                      {p.note && <span className="lw-gl__item-note">{p.note}</span>}
                    </span>
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
            </section>
          ))}

          <p className="lw-pp__foot">
            <button type="button" className="lw-btn lw-btn--fill" onClick={close}>
              <span>Voltar à lista</span>
            </button>
          </p>
        </div>
      </dialog>
    </>
  );
}
