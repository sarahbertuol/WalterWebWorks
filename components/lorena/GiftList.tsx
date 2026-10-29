"use client";

import { useCallback, useEffect, useState } from "react";
import type { Gift, GiftGroup } from "@/lib/lorena/gifts";
import { ExamplesDialog } from "./ExamplesDialog";

type Claims = Record<string, number>;
type Load = "loading" | "ready" | "offline";

const MINE_KEY = "lorena-presentes-meus";
const DEFAULT_UNIT = ["unidade", "unidades"] as const;

/** What this device marked — lets a guest undo their own taps. */
function readMine(): Claims {
  try {
    return JSON.parse(localStorage.getItem(MINE_KEY) || "{}") as Claims;
  } catch {
    return {};
  }
}
function writeMine(m: Claims) {
  try {
    localStorage.setItem(MINE_KEY, JSON.stringify(m));
  } catch {
    /* private mode: undo just won't survive a reload */
  }
}

const unitOf = (g: Gift, n: number) => (g.unit ?? DEFAULT_UNIT)[n === 1 ? 0 : 1];

/**
 * The shared, anonymous gift list — three columns per row:
 *   Faltam (how many are still needed) · Produto (+ "ver exemplos") · Comprei.
 * "Comprei" takes 1 off (or asks how many, for items with a quantity);
 * the row is struck through for everyone only when it reaches 0.
 * Whoever marked something can undo it from the same phone.
 */
export function GiftList({ groups }: { groups: readonly GiftGroup[] }) {
  const [claims, setClaims] = useState<Claims>({});
  const [mine, setMine] = useState<Claims>({});
  const [load, setLoad] = useState<Load>("loading");
  const [busy, setBusy] = useState<string | null>(null);
  const [picking, setPicking] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");
  const [examples, setExamples] = useState<Gift | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/lorena/presentes", { cache: "no-store" });
      const data = (await res.json()) as { ok: boolean; claims?: Claims };
      if (!res.ok || !data.ok) throw new Error();
      setClaims(data.claims ?? {});
      setMine(readMine());
      setLoad("ready");
    } catch {
      setLoad((l) => (l === "ready" ? l : "offline"));
    }
  }, []);

  useEffect(() => {
    const first = window.setTimeout(refresh, 0); // first load, outside the render pass
    // someone else may have marked things while the tab was in the background
    const onVisible = () => document.visibilityState === "visible" && refresh();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(first);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  async function mark(id: string, delta: number, okMsg: string) {
    if (busy || load !== "ready") return false;
    setBusy(id);
    const before = claims[id] ?? 0;
    setClaims((c) => ({ ...c, [id]: before + delta })); // optimistic
    try {
      const res = await fetch("/api/lorena/presentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, delta }),
      });
      const data = (await res.json()) as { ok: boolean; value?: number; error?: string };
      if (typeof data.value === "number") setClaims((c) => ({ ...c, [id]: data.value as number }));
      if (res.ok && data.ok) {
        const stored = readMine();
        const next = { ...stored, [id]: Math.max(0, (stored[id] ?? 0) + delta) };
        writeMine(next);
        setMine(next);
        setToast(okMsg);
        return true;
      }
      if (data.error === "conflict") {
        setToast(delta > 0 ? "Alguém marcou antes de você — a lista foi atualizada." : "Esse item já estava desmarcado.");
        return false;
      }
      throw new Error();
    } catch {
      setClaims((c) => ({ ...c, [id]: before }));
      setToast("Não conseguimos salvar agora. Tente de novo em instantes.");
      return false;
    } finally {
      setBusy(null);
    }
  }

  function buy(g: Gift, left: number) {
    // one left (or a single item): no question to ask
    if (left === 1) return mark(g.id, 1, `“${g.name}” anotado. Obrigada pelo carinho!`);
    setPicking((p) => (p === g.id ? null : g.id));
    setQty(1);
  }

  function undo(g: Gift, n: number) {
    return mark(g.id, -n, `“${g.name}”: desfeito.`);
  }

  /** Someone else's mark on a single item: allowed, but only on purpose. */
  function undoOther(g: Gift) {
    if (window.confirm(`“${g.name}” foi marcado por outra pessoa. Desmarcar mesmo assim? (Use só se foi engano.)`)) {
      return mark(g.id, -1, `“${g.name}” desmarcado.`);
    }
  }

  const ready = load === "ready";

  return (
    <div className="lw-gl" aria-busy={load === "loading"}>
      {groups.map((group) => (
        <section key={group.id} id={group.id} className="lw-card lw-gl__group" aria-labelledby={`gl-${group.id}`}>
          <h2 id={`gl-${group.id}`} className="lw-gl__h">
            {group.title}
          </h2>
          {group.note && <p className="lw-gl__note">{group.note}</p>}

          <div className="lw-gl__cols" aria-hidden="true">
            <span>Faltam</span>
            <span>Produto</span>
            <span />
          </div>

          <ul className="lw-gl__list">
            {group.items.map((g) => {
              const total = g.total ?? 1;
              const given = Math.min(total, claims[g.id] ?? 0);
              const left = ready ? total - given : total;
              const myCount = Math.min(mine[g.id] ?? 0, given);
              const done = ready && left === 0;
              const isPicking = picking === g.id && !done;
              const pick = Math.min(Math.max(1, qty), Math.max(1, left));
              const panelId = `gl-panel-${g.id}`;

              return (
                <li key={g.id} className={`lw-gl__row${done ? " is-done" : ""}${isPicking ? " is-open" : ""}`}>
                  <span className="lw-gl__qty" aria-label={done ? "Completo" : `Faltam ${left} de ${total}`}>
                    {done ? (
                      <span className="lw-gl__tick" aria-hidden="true" />
                    ) : (
                      <>
                        <strong>{left}</strong>
                        {total > 1 && <small>de {total}</small>}
                      </>
                    )}
                  </span>

                  <span className="lw-gl__text">
                    <span className="lw-gl__name">{g.name}</span>
                    {g.note && <span className="lw-gl__item-note">{g.note}</span>}
                    {myCount > 0 && !done && total > 1 && (
                      <span className="lw-gl__mine-line">
                        você marcou {myCount} {unitOf(g, myCount)}
                      </span>
                    )}
                    {g.examples && g.examples.length > 0 && (
                      <button type="button" className="lw-gl__ex" onClick={() => setExamples(g)}>
                        ver exemplos
                      </button>
                    )}
                  </span>

                  <span className="lw-gl__act">
                    {!done && (
                      <button
                        type="button"
                        className="lw-gl__buy-btn"
                        disabled={!ready || busy !== null}
                        aria-expanded={total > 1 && left > 1 ? isPicking : undefined}
                        aria-controls={total > 1 && left > 1 ? panelId : undefined}
                        onClick={() => buy(g, left)}
                      >
                        Comprei
                      </button>
                    )}
                    {done && myCount === 0 && total === 1 && (
                      <button type="button" className="lw-gl__state" disabled={busy !== null} onClick={() => undoOther(g)}>
                        comprado
                      </button>
                    )}
                    {done && myCount === 0 && total > 1 && <span className="lw-gl__state">completo</span>}
                    {myCount > 0 && (
                      <button type="button" className="lw-gl__undo" disabled={busy !== null} onClick={() => undo(g, myCount)}>
                        desfazer
                      </button>
                    )}
                  </span>

                  {isPicking && (
                    <div className="lw-gl__panel" id={panelId}>
                      <span className="lw-gl__buy-label" id={`${panelId}-q`}>
                        Quantos {unitOf(g, 2)} você comprou?
                      </span>
                      <div className="lw-gl__buy">
                        <div className="lw-gl__stepper" role="group" aria-labelledby={`${panelId}-q`}>
                          <button type="button" onClick={() => setQty(Math.max(1, pick - 1))} disabled={pick <= 1} aria-label="Menos um">
                            −
                          </button>
                          <output aria-live="polite">{pick}</output>
                          <button type="button" onClick={() => setQty(Math.min(left, pick + 1))} disabled={pick >= left} aria-label="Mais um">
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="lw-btn lw-btn--fill"
                          disabled={busy !== null}
                          onClick={async () => {
                            const ok = await mark(g.id, pick, `${g.name}: ${pick} ${unitOf(g, pick)} anotado${pick === 1 ? "" : "s"}. Obrigada!`);
                            if (ok) setPicking(null);
                          }}
                        >
                          <span>Confirmar</span>
                        </button>
                      </div>
                      <button type="button" className="lw-link" onClick={() => setPicking(null)}>
                        cancelar
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <ExamplesDialog gift={examples} onClose={() => setExamples(null)} />

      <p className="lw-gl__toast" role="status" aria-live="polite">
        {toast}
      </p>
    </div>
  );
}
