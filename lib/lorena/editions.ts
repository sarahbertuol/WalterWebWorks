/**
 * Lorena — uma edição do convite por cidade.
 * Tudo que muda entre as cidades fica aqui; o resto (design, textos) é
 * compartilhado em content.ts. Para criar uma nova cidade, copie um bloco,
 * troque o slug (vira a URL: convitelorena.vercel.app/<slug>) e os dados.
 */
export const editions = {
  "caxias-dos-sul": {
    city: "Caxias do Sul",
    day: "21",
    month: "Novembro",
    time: "A confirmar",
    venue: "[Nome do local]",
    address: "[Endereço completo]",
    mapUrl: "", // ex.: "https://maps.google.com/?q=..."
    rsvpDeadline: "[data a definir]",
  },
  "novo-hamburgo": {
    city: "Novo Hamburgo",
    day: "12",
    month: "Dezembro",
    time: "A confirmar",
    venue: "[Nome do local]",
    address: "[Endereço completo]",
    mapUrl: "",
    rsvpDeadline: "[data a definir]",
  },
} as const;

export type EditionSlug = keyof typeof editions;
export type Edition = (typeof editions)[EditionSlug];

/** A raiz do convite (convitelorena.vercel.app) mostra esta edição. */
export const defaultEdition: EditionSlug = "caxias-dos-sul";

export const editionSlugs = Object.keys(editions) as EditionSlug[];

export function isEditionSlug(v: unknown): v is EditionSlug {
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(editions, v);
}
