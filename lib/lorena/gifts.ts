/**
 * Lorena — lista de presentes (convitelorena.vercel.app/lista-de-presentes).
 *
 * Edite aqui. Regras:
 *  - `id` identifica o item no banco: depois de publicado, NÃO mude o id
 *    (nome, nota e meta podem mudar). Ids: letras minúsculas, números e hífen.
 *  - `total` = meta. Sem `total` (ou 1): tocar risca o item.
 *    Com `total` > 1: cada pessoa informa quantos comprou e a meta desconta.
 *  - `unit` = [singular, plural], usado em "faltam 4 de 6 pacotes".
 */
export type Gift = {
  id: string;
  name: string;
  note?: string;
  total?: number;
  unit?: readonly [string, string];
};
export type GiftGroup = { id: string; title: string; note?: string; items: readonly Gift[] };

const PACOTE = ["pacote", "pacotes"] as const;
const UNIDADE = ["unidade", "unidades"] as const;
const CAIXA = ["caixa", "caixas"] as const;
const FRASCO = ["frasco", "frascos"] as const;

export const giftList: { examples: boolean; groups: readonly GiftGroup[] } = {
  /** true mostra o aviso "Itens de exemplo" na página */
  examples: false,

  groups: [
    {
      id: "fraldas",
      title: "Fraldas",
      note: "Pampers Premium Care · pacote Jumbo, por favor — assim a conta fecha certinho.",
      items: [
        { id: "fralda-rn", name: "Tamanho RN", total: 3, unit: PACOTE },
        { id: "fralda-p", name: "Tamanho P", total: 8, unit: PACOTE },
        { id: "fralda-m", name: "Tamanho M", total: 12, unit: PACOTE },
        { id: "fralda-g", name: "Tamanho G", total: 7, unit: PACOTE },
      ],
    },
    {
      id: "banho",
      title: "Banho e troca",
      items: [
        { id: "pomada-zinco", name: "Pomada para assaduras (barreira)", note: "Óxido de zinco — Hipoglós Original ou Desitin", total: 2, unit: UNIDADE },
        { id: "pomada-bepantol", name: "Pomada para assaduras (prevenção)", note: "Bepantol Baby", total: 2, unit: UNIDADE },
        { id: "algodao", name: "Algodão em quadradinhos", note: "Pacote grande", total: 4, unit: PACOTE },
        { id: "lencos", name: "Lenços umedecidos", note: "Sem perfume, linha sensitive", total: 6, unit: PACOTE },
        { id: "sabonete", name: "Sabonete líquido de bebê", note: "Hipoalergênico, sem perfume forte", total: 2, unit: FRASCO },
        { id: "hidratante", name: "Hidratante de bebê", note: "Sem perfume" },
        { id: "termometro-banho", name: "Termômetro de banho" },
      ],
    },
    {
      id: "saude",
      title: "Saúde",
      items: [
        { id: "termometro-digital", name: "Termômetro digital", note: "De axila" },
        { id: "soro", name: "Soro fisiológico 0,9%", note: "Caixinha de flaconetes", total: 3, unit: CAIXA },
        { id: "aspirador-nasal", name: "Aspirador nasal" },
        { id: "alcool-70", name: "Álcool 70% líquido", note: "Para o coto umbilical" },
        { id: "kit-unhas", name: "Kit unhas", note: "Tesourinha ponta redonda ou cortador + lixa" },
        { id: "escova-cabelo", name: "Escova de cabelo", note: "Cerdas bem macias" },
      ],
    },
    {
      id: "alimentacao",
      title: "Alimentação",
      items: [
        { id: "mamadeira", name: "Mamadeira anticólica", total: 2, unit: UNIDADE },
        { id: "escova-mamadeira", name: "Escova para limpar mamadeira" },
      ],
    },
    {
      id: "mamae",
      title: "Para a mamãe",
      items: [
        { id: "garrafa-agua", name: "Garrafa de água com canudo", note: "Cerca de 1 litro" },
        { id: "lanolina", name: "Pomada de lanolina para mamilos", note: "Tipo Lansinoh" },
        { id: "absorvente-seios", name: "Absorvente para seios", total: 2, unit: CAIXA },
        { id: "absorvente-pos-parto", name: "Absorvente pós-parto", note: "Noturno", total: 3, unit: PACOTE },
      ],
    },
  ],
};

export const allGifts: readonly Gift[] = giftList.groups.flatMap((g) => g.items);

/** Meta of `id` (1 for regular items), or null if it isn't on the list. */
export function giftMax(id: string): number | null {
  const g = allGifts.find((i) => i.id === id);
  return g ? (g.total ?? 1) : null;
}
