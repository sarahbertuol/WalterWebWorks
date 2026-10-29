import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { cssTokens } from "@/lib/lorena/tokens";
import { editions, editionSlugs } from "@/lib/lorena/editions";
import { giftStoreConfigured, rsvpAll, type RsvpEntry } from "@/lib/lorena/giftStore";
import { adminKeyOk, formatWhen } from "@/lib/lorena/rsvpAdmin";
import { StripeBackground, FixedScallopedFrame } from "@/components/lorena/Frame";

/**
 * convitelorena.vercel.app/confirmados?chave=<LORENA_ADMIN_KEY>
 * Private: who confirmed, per city, with totals and a CSV download.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Confirmados · Brunch da Lorena", robots: { index: false, follow: false } };

const key = (r: RsvpEntry) => `${r.cidade}|${r.nome.toLocaleLowerCase("pt-BR").replace(/\s+/g, " ").trim()}`;

export default async function Confirmados({ searchParams }: { searchParams: Promise<{ chave?: string }> }) {
  const { chave } = await searchParams;
  const ok = adminKeyOk(chave);

  let rows: RsvpEntry[] = [];
  let error = "";
  if (ok) {
    if (!giftStoreConfigured()) error = "Banco não conectado.";
    else
      try {
        rows = await rsvpAll();
      } catch {
        error = "Não foi possível ler as respostas agora.";
      }
  }

  // a guest who answers twice: the latest reply counts
  const latest = new Map<string, RsvpEntry>();
  for (const r of rows) latest.set(key(r), r);
  const current = new Set(latest.values());

  return (
    <div className="lw lw--list" style={cssTokens as CSSProperties}>
      <StripeBackground />
      <main className="lw-sheet lw-gl-page lw-adm">
        <h1 className="lw-adm__title">Confirmados</h1>
        {!ok ? (
          <p className="lw-gl__note">Página privada. Abra pelo link com a chave.</p>
        ) : error ? (
          <p className="lw-gl__note">{error}</p>
        ) : (
          <>
            <p className="lw-adm__actions">
              <a className="lw-btn lw-btn--fill" href={`/api/lorena/rsvp?chave=${encodeURIComponent(chave ?? "")}`}>
                <span>Baixar planilha (CSV)</span>
              </a>
            </p>
            {editionSlugs.map((slug) => {
              const city = editions[slug].city;
              const all = rows.filter((r) => r.cidade === city).reverse();
              const now = all.filter((r) => current.has(r));
              const pessoas = now.filter((r) => r.vem === "sim").reduce((n, r) => n + r.pessoas, 0);
              const nao = now.filter((r) => r.vem === "nao").length;
              return (
                <section key={slug} className="lw-card lw-adm__city">
                  <h2 className="lw-gl__h">
                    {city} · {editions[slug].day} de {editions[slug].month}
                  </h2>
                  <p className="lw-adm__totals">
                    <strong>{pessoas}</strong> pessoas confirmadas · {nao} não {nao === 1 ? "vem" : "vêm"} · {now.length} respostas
                  </p>
                  {all.length === 0 ? (
                    <p className="lw-gl__note">Nenhuma resposta ainda.</p>
                  ) : (
                    <div className="lw-adm__scroll">
                      <table className="lw-adm__table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Vem?</th>
                            <th>Pessoas</th>
                            <th>Observações</th>
                            <th>Quando</th>
                          </tr>
                        </thead>
                        <tbody>
                          {all.map((r, i) => (
                            <tr key={i} className={current.has(r) ? undefined : "is-old"} title={current.has(r) ? undefined : "Resposta substituída por uma mais recente"}>
                              <td>{r.nome}</td>
                              <td>{r.vem === "sim" ? "Sim" : "Não"}</td>
                              <td>{r.pessoas || "—"}</td>
                              <td>{r.obs}</td>
                              <td>{formatWhen(r.em)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              );
            })}
          </>
        )}
      </main>
      <FixedScallopedFrame />
    </div>
  );
}
