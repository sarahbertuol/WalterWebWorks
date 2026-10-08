"use client";

import { useCallback, useEffect, useState } from "react";
import type { Gift, GiftGroup } from "@/lib/lorena/gifts";

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
 * The shared, anonymous gift list.
 * Single items: tap = bought (struck through for everyone).
 * Items with a goal (diapers per size, wipes…): open the row, pick how many
 * you bought, and "faltam X de Y" goes down.
 */
export function GiftList({ groups }: { groups: readonly GiftGroup[] }) {
  const [claims, setClaims] = useState<Claims>({});
  const [mine, setMine] = useState<Claims>({});
  const [load, setLoad] = useState<Load>("loading");
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

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

  function toggleSingle(g: Gift) {
    const bought = (claims[g.id] ?? 0) > 0;
    if (!bought) return mark(g.id, 1, `“${g.name}” marcado. Obrigada pelo carinho!`);
    if ((mine[g.id] ?? 0) > 0) return mark(g.id, -1, `“${g.name}” desmarcado.`);
    if (window.confirm(`“${g.name}” já foi marcado por outra pessoa. Desmarcar mesmo assim? (Use só se foi engano.)`)) {
      return mark(g.id, -1, `“${g.name}” desmarcado.`);
    }
  }

  function openRow(id: string) {
    setOpen((o) => (o === id ? null : id));
    setQty(1);
  }

  const ready = load === "ready";
  const label = (g: Gift, groupTitle: string) => (groupTitle === "Fraldas" ? `Fraldas ${g.name}` : g.name);

  return (
    <div className="lw-gl" aria-busy={load === "loading"}>
      {load === "offline" && (
        <p className="lw-gl__notice" role="status">
          A lista está sendo preparada. Volte em instantes para marcar seu presente.
        </p>
      )}

      {groups.map((group) => (
        <section key={group.id} className="lw-card lw-gl__group" aria-labelledby={`gl-${group.id}`}>
          <h2 id={`gl-${group.id}`} className="lw-gl__h">
            {group.title}
          </h2>
          {group.note && <p className="lw-gl__note">{group.note}</p>}

          <ul className="lw-gl__list">
            {group.items.map((g) => {
              const total = g.total ?? 1;
              const given = Math.min(total, claims[g.id] ?? 0);
              const left = total - given;
              const myCount = mine[g.id] ?? 0;
              const done = left === 0;

              if (total === 1) {
                return (
                  <li key={g.id}>
                    <button
                      type="button"
                      className={`lw-gl__item${done ? " is-bought" : ""}`}
                      aria-pressed={done}
                      disabled={!ready || busy !== null}
                      onClick={() => toggleSingle(g)}
                    >
                      <span className="lw-gl__check" aria-hidden="true" />
                      <span className="lw-gl__text">
                        <span className="lw-gl__name">{g.name}</span>
                        {g.note && <span className="lw-gl__item-note">{g.note}</span>}
                      </span>
                      <span className="lw-gl__state">{done ? (myCount > 0 ? "você marcou · desfazer" : "comprado") : ""}</span>
                    </button>
                  </li>
                );
              }

              const isOpen = open === g.id;
              const pick = Math.min(Math.max(1, qty), Math.max(1, left));
              const panelId = `gl-panel-${g.id}`;
              return (
                <li key={g.id} className={isOpen ? "is-open" : undefined}>
                  <button
                    type="button"
                    className={`lw-gl__item lw-gl__item--count${done ? " is-bought" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    disabled={!ready}
                    onClick={() => openRow(g.id)}
                  >
                    <span className="lw-gl__check lw-gl__check--count" aria-hidden="true">
                      {done ? "" : left}
                    </span>
                    <span className="lw-gl__text">
                      <span className="lw-gl__name">{g.name}</span>
                      {g.note && <span className="lw-gl__item-note">{g.note}</span>}
                      <span className="lw-gl__count-line">
                        {ready ? (done ? "completo" : `faltam ${left} de ${total} ${unitOf(g, total)}`) : `meta: ${total} ${unitOf(g, total)}`}
                      </span>
                      <span className="lw-gl__progress" aria-hidden="true">
                        <span style={{ width: `${ready ? (given / total) * 100 : 0}%` }} />
                      </span>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="lw-gl__panel" id={panelId}>
                      {!done && (
                        <>
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
                                const ok = await mark(g.id, pick, `${label(g, group.title)}: ${pick} ${unitOf(g, pick)} anotado${pick === 1 ? "" : "s"}. Obrigada!`);
                                if (ok) setQty(1);
                              }}
                            >
                              <span>Comprei</span>
                            </button>
                          </div>
                        </>
                      )}
                      {done && myCount === 0 && <p className="lw-gl__mine">Esse já está completo — obrigada a todos!</p>}
                      {myCount > 0 && (
                        <p className="lw-gl__mine">
                          Você marcou {myCount} {unitOf(g, myCount)}.{" "}
                          <button
                            type="button"
                            className="lw-link"
                            disabled={busy !== null}
                            onClick={() => mark(g.id, -myCount, `${label(g, group.title)}: desmarcado.`)}
                          >
                            Desfazer
                          </button>
                        </p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <p className="lw-gl__toast" role="status" aria-live="polite">
        {toast}
      </p>
    </div>
  );
}
