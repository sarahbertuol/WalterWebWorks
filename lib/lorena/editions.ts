/**
 * Lorena — uma edição do convite por cidade.
 * Tudo que muda entre as cidades fica aqui; o resto (design, textos) é
 * compartilhado em content.ts. Para criar uma nova cidade, copie um bloco,
 * troque o slug (vira a URL: convitelorena.vercel.app/<slug>) e os dados.
 */
export const editions = {
  "caxias-dos-sul": {
    city: "Caxias do Sul",
    day: "14",
    month: "Novembro",
    time: "11h às 16h",
    /** data e horário da agenda (fuso de Brasília) */
    date: "2026-11-14",
    start: "11:00",
    end: "16:00",
    venue: "Salão de festas",
    address: "Rua Hermes João Webber, 444 · Sanvitto",
    /** endereço usado no mapa e na agenda */
    mapQuery: "Rua Hermes João Webber, 444 - Sanvitto, Caxias do Sul - RS",
    rsvpDeadline: "7 de Novembro",
  },
  "novo-hamburgo": {
    city: "Novo Hamburgo",
    day: "12",
    month: "Dezembro",
    time: "11h às 16h",
    date: "2026-12-12",
    start: "11:00",
    end: "16:00",
    venue: "Salão de festas",
    address: "Rua Silveira Martins, 374",
    mapQuery: "Rua Silveira Martins, 374, Novo Hamburgo - RS",
    rsvpDeadline: "5 de Dezembro",
  },
} as const;

export type EditionSlug = keyof typeof editions;
export type Edition = (typeof editions)[EditionSlug];

/** A raiz do convite (convitelorena.vercel.app) mostra esta edição. */
export const defaultEdition: EditionSlug = "caxias-dos-sul";

export const editionSlugs = Object.keys(editions) as EditionSlug[];

/** Google Maps link for an edition ("" while the address isn't known). */
export const mapUrl = (e: Edition) => (e.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}` : "");

export function isEditionSlug(v: unknown): v is EditionSlug {
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(editions, v);
}
