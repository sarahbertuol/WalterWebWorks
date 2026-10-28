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
        { id: "fralda-p", name: "Tamanho P", total: 8, unit: PACOTE },
        { id: "fralda-m", name: "Tamanho M", total: 12, unit: PACOTE },
        { id: "fralda-g", name: "Tamanho G", total: 7, unit: PACOTE },
      ],
    },
    {
      id: "banho",
      title: "Banho e troca",
      items: [
        { id: "algodao", name: "Algodão em quadradinhos", note: "Pacote grande", total: 4, unit: PACOTE },
        { id: "lencos", name: "Lenços umedecidos", note: "Sem perfume, linha sensitive", total: 6, unit: PACOTE },
        { id: "sabonete", name: "Sabonete líquido de bebê", note: "Hipoalergênico, sem perfume forte", total: 2, unit: FRASCO },
        { id: "shampoo", name: "Shampoo de bebê", note: "Natura Mamãe e Bebê ou Mustela recém-nascido" },
        { id: "condicionador", name: "Condicionador de bebê", note: "Natura Mamãe e Bebê" },
        { id: "hidratante", name: "Hidratante de bebê", note: "Natura Mamãe e Bebê ou Mustela Hydra Bebê" },
      ],
    },
    {
      id: "saude",
      title: "Saúde",
      items: [
        { id: "aspirador-nasal", name: "Aspirador nasal" },
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

/**
 * "Produtos de preferência" — popup na lista, com links para ver o produto.
 * Links de produto de farmácia podem sair do ar quando a loja troca o cadastro:
 * se um quebrar, troque a URL ou use uma busca do Google (googleLink).
 */
export type PreferredLink = { label: string; url: string };
export type PreferredProduct = { name: string; note?: string; links: readonly PreferredLink[] };
export type PreferredGroup = { title: string; note?: string; items: readonly PreferredProduct[] };

const googleLink = (q: string): PreferredLink => ({ label: "Google", url: `https://www.google.com/search?q=${encodeURIComponent(q)}` });

export const preferred: { title: string; intro: string; groups: readonly PreferredGroup[] } = {
  title: "Produtos de preferência",
  intro: "Se for comprar algum destes, estas são as marcas que a gente prefere. Toque no link para ver o produto.",
  groups: [
    {
      title: "Fraldas",
      items: [{ name: "Pampers Premium Care", note: "Pacote Jumbo", links: [googleLink("Pampers Premium Care Jumbo")] }],
    },
    {
      title: "Shampoo, condicionador e hidratante",
      note: "Natura Mamãe e Bebê ou Mustela, linha recém-nascido.",
      items: [
        { name: "Natura Mamãe e Bebê · Shampoo", note: "Vendido pela Natura e consultoras", links: [googleLink("Natura Mamãe e Bebê shampoo")] },
        { name: "Natura Mamãe e Bebê · Condicionador", links: [googleLink("Natura Mamãe e Bebê condicionador")] },
        { name: "Natura Mamãe e Bebê · Hidratante", links: [googleLink("Natura Mamãe e Bebê hidratante")] },
        {
          name: "Mustela · Shampoo Espuma Recém-Nascido",
          links: [
            { label: "Drogasil", url: "https://www.drogasil.com.br/shampoo-espuma-recem-nascido-mustela-150ml-1384032.html" },
            { label: "Droga Raia", url: "https://www.drogaraia.com.br/shampoo-espuma-recem-nascido-mustela-150ml-1384032.html" },
          ],
        },
        {
          name: "Mustela · Hidratante Hydra Bebê",
          links: [
            { label: "Panvel", url: "https://www.panvel.com/panvel/locao-hidratante-corporal-mustela-hydra-bebe-300ml/p-541520" },
            { label: "Drogasil", url: "https://www.drogasil.com.br/mustela-hydra-bebe-300ml-647474.html" },
          ],
        },
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
