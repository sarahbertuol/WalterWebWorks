/**
 * Lorena — lista de presentes (convitelorena.vercel.app/lista-de-presentes).
 *
 * Edite aqui. Regras:
 *  - `id` identifica o item no banco: depois de publicado, NÃO mude o id
 *    (mudar o nome pode). Ids: só letras minúsculas, números e hífen.
 *  - Fraldas: um item só, com quantidade total; cada pessoa informa
 *    quantos pacotes comprou e a lista desconta do total.
 */
export const giftList = {
  /** true enquanto os itens abaixo forem exemplos — mostra um aviso na página */
  examples: true,

  diapers: {
    id: "fraldas",
    name: "Fraldas",
    unit: "pacotes",
    total: 50,
    note: "Tamanhos sugeridos: a confirmar",
  },

  /* EXEMPLOS — substituir pela lista real */
  items: [
    { id: "banheira", name: "Banheira com suporte", note: "" },
    { id: "toalhas-capuz", name: "Kit de toalhas com capuz", note: "" },
    { id: "bodies-rn", name: "Bodies manga longa", note: "Tamanho RN" },
    { id: "mantas", name: "Mantas de algodão", note: "" },
    { id: "termometro-banho", name: "Termômetro de banho", note: "" },
    { id: "baba-eletronica", name: "Babá eletrônica", note: "" },
  ],
} as const;

export type GiftItem = { id: string; name: string; note: string };

/** Most units of `id` that can be marked as bought (1 for regular items). */
export function giftMax(id: string): number | null {
  if (id === giftList.diapers.id) return giftList.diapers.total;
  return giftList.items.some((i) => i.id === id) ? 1 : null;
}
