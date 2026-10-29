import { timingSafeEqual } from "node:crypto";
import type { RsvpEntry } from "./giftStore";

/** The private "confirmados" page and CSV export need ?chave=<LORENA_ADMIN_KEY>. */
export function adminKeyOk(given: string | null | undefined): boolean {
  const key = process.env.LORENA_ADMIN_KEY ?? "";
  if (key.length < 8 || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const formatWhen = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

/** Excel/Sheets-friendly CSV (BOM + ";" — what pt-BR spreadsheets expect). */
export function rsvpCsv(rows: RsvpEntry[]): string {
  // a leading = + - @ would become a formula in the spreadsheet
  const cell = (v: string | number) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const head = ["Recebido em", "Cidade", "Nome", "Vem?", "Pessoas", "Observações"];
  const lines = rows.map((r) => [formatWhen(r.em), r.cidade, r.nome, r.vem === "sim" ? "Sim" : "Não", r.pessoas, r.obs].map(cell).join(";"));
  return "﻿" + [head.map(cell).join(";"), ...lines].join("\r\n") + "\r\n";
}
