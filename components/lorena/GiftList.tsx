"use client";

import { useCallback, useEffect, useState } from "react";
import type { GiftItem } from "@/lib/lorena/gifts";

type Diapers = { id: string; name: string; unit: string; total: number; note: string };
type Claims = Record<string, number>;
type Load = "loading" | "ready" | "offline";

const MINE_KEY = "lorena-presentes-meus";

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

/**
 * The shared, anonymous gift list.
 * Regular items: tap = bought (struck through). Diapers: pick how many
 * packs you bought and the remaining total goes down.
 */
export function GiftList({ diapers, items }: { diapers: Diapers; items: readonly GiftItem[] }) {
  const [claims, setClaims] = useState<Claims>({});
  const [mine, setMine] = useState<Claims>({});
  const [load, setLoad] = useState<Load>("loading");
  const [busy, setBusy] = useState<string | null>(null);
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
    if (busy || load !== "ready") return;
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
        const next = { ...readMine(), [id]: Math.max(0, (readMine()[id] ?? 0) + delta) };
        writeMine(next);
        setMine(next);
        setToast(okMsg);
      } else if (data.error === "conflict") {
        setToast(delta > 0 ? "Alguém marcou antes de você — a lista foi atualizada." : "Esse item já estava desmarcado.");
      } else {
        throw new Error();
      }
    } catch {
      setClaims((c) => ({ ...c, [id]: before }));
      setToast("Não conseguimos salvar agora. Tente de novo em instantes.");
    } finally {
      setBusy(null);
    }
  }

  function toggleItem(item: GiftItem) {
    const bought = (claims[item.id] ?? 0) > 0;
    if (!bought) return mark(item.id, 1, `“${item.name}” marcado. Obrigada pelo carinho!`);
    if ((mine[item.id] ?? 0) > 0) return mark(item.id, -1, `“${item.name}” desmarcado.`);
    if (window.confirm(`“${item.name}” já foi marcado por outra pessoa. Desmarcar mesmo assim? (Use só se foi engano.)`)) {
      return mark(item.id, -1, `“${item.name}” desmarcado.`);
    }
  }

  const ready = load === "ready";
  const given = claims[diapers.id] ?? 0;
  const left = Math.max(0, diapers.total - given);
  const myPacks = mine[diapers.id] ?? 0;
  const pick = Math.min(Math.max(1, qty), Math.max(1, left));

  return (
    <div className="lw-gl" aria-busy={load === "loading"}>
      {load === "offline" && (
        <p className="lw-gl__notice" role="status">
          A lista está sendo preparada. Volte em instantes para marcar seu presente.
        </p>
      )}

      {/* Fraldas: one line, a running total */}
      <section className="lw-card lw-gl__diapers" aria-labelledby="gl-fraldas">
        <h2 id="gl-fraldas" className="lw-gl__h">{diapers.name}</h2>
        {diapers.note && <p className="lw-gl__note">{diapers.note}</p>}
        <p className="lw-gl__count" aria-live="polite">
          {ready ? (
            left > 0 ? (
              <>
                Faltam <strong>{left}</strong> de {diapers.total} {diapers.unit}
              </>
            ) : (
              <>Meta de fraldas completa — obrigada!</>
            )
          ) : (
            <>Meta: {diapers.total} {diapers.unit}</>
          )}
        </p>
        <div className="lw-gl__bar" aria-hidden="true">
          <span style={{ width: `${ready ? Math.min(100, (given / diapers.total) * 100) : 0}%` }} />
        </div>

        {left > 0 && (
          <div className="lw-gl__buy">
            <span className="lw-gl__buy-label" id="gl-qtd">Quantos {diapers.unit} você comprou?</span>
            <div className="lw-gl__stepper" role="group" aria-labelledby="gl-qtd">
              <button type="button" onClick={() => setQty(Math.max(1, pick - 1))} disabled={!ready || pick <= 1} aria-label="Menos um">
                −
              </button>
              <output aria-live="polite">{pick}</output>
              <button type="button" onClick={() => setQty(Math.min(left, pick + 1))} disabled={!ready || pick >= left} aria-label="Mais um">
                +
              </button>
            </div>
            <button
              type="button"
              className="lw-btn lw-btn--fill"
              disabled={!ready || busy !== null}
              onClick={() => mark(diapers.id, pick, `${pick} ${pick === 1 ? diapers.unit.replace(/s$/, "") : diapers.unit} anotado${pick === 1 ? "" : "s"}. Obrigada!`).then(() => setQty(1))}
            >
              <span>Comprei</span>
            </button>
          </div>
        )}
        {myPacks > 0 && (
          <p className="lw-gl__mine">
            Você marcou {myPacks} {myPacks === 1 ? diapers.unit.replace(/s$/, "") : diapers.unit}.{" "}
            <button type="button" className="lw-link" disabled={busy !== null} onClick={() => mark(diapers.id, -myPacks, "Fraldas desmarcadas.")}>
              Desfazer
            </button>
          </p>
        )}
      </section>

      {/* Everything else: tap to strike through */}
      <section className="lw-card lw-gl__items" aria-labelledby="gl-itens">
        <h2 id="gl-itens" className="lw-gl__h">Presentes</h2>
        <p className="lw-gl__note">Toque no item que você comprou. Ele fica riscado para ninguém repetir.</p>
        <ul className="lw-gl__list">
          {items.map((item) => {
            const bought = (claims[item.id] ?? 0) > 0;
            const byMe = (mine[item.id] ?? 0) > 0;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`lw-gl__item${bought ? " is-bought" : ""}`}
                  aria-pressed={bought}
                  disabled={!ready || busy !== null}
                  onClick={() => toggleItem(item)}
                >
                  <span className="lw-gl__check" aria-hidden="true" />
                  <span className="lw-gl__text">
                    <span className="lw-gl__name">{item.name}</span>
                    {item.note && <span className="lw-gl__item-note">{item.note}</span>}
                  </span>
                  <span className="lw-gl__state">{bought ? (byMe ? "você marcou · desfazer" : "comprado") : ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="lw-gl__toast" role="status" aria-live="polite">
        {toast}
      </p>
    </div>
  );
}
