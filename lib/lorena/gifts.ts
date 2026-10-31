/**
 * Lorena — lista de presentes (convitelorena.vercel.app/lista-de-presentes).
 *
 * Edite aqui. Regras:
 *  - `id` identifica o item no banco: depois de publicado, NÃO mude o id
 *    (nome, nota e quantidade podem mudar). Ids: letras minúsculas, números e hífen.
 *  - `total` = quantas unidades precisamos (sem `total` = 1).
 *    Cada "Comprei" desconta da coluna "Faltam"; o item só é riscado quando chega a 0.
 *  - `unit` = [singular, plural], usado em "Quantos pacotes você comprou?".
 *  - `examples` = produtos que aparecem no botão "ver exemplos" (com links).
 */
export type ExampleLink = { label: string; url: string };
export type Example = { name: string; note?: string; links: readonly ExampleLink[] };
export type Gift = {
  id: string;
  name: string;
  note?: string;
  total?: number;
  unit?: readonly [string, string];
  /** texto no topo da popup de exemplos */
  examplesNote?: string;
  examples?: readonly Example[];
};
/** `tab` = nome curto na barra de categorias (opcional; senão usa `title`) */
export type GiftGroup = { id: string; title: string; tab?: string; note?: string; items: readonly Gift[] };

const PACOTE = ["pacote", "pacotes"] as const;
const UNIDADE = ["unidade", "unidades"] as const;
const CAIXA = ["caixa", "caixas"] as const;
const FRASCO = ["frasco", "frascos"] as const;
const LIVRO = ["livrinho", "livrinhos"] as const;

/**
 * Links de produto de farmácia podem sair do ar quando a loja troca o cadastro:
 * se um quebrar, troque a URL ou use uma busca do Google (google()).
 */
const google = (q: string): ExampleLink => ({ label: "Google", url: `https://www.google.com/search?q=${encodeURIComponent(q)}` });

const pampers = (size: string): Example[] => [
  { name: `Pampers Premium Care · ${size}`, note: "Pacote Jumbo", links: [google(`Pampers Premium Care Jumbo ${size}`)] },
];

const ex = {
  naturaShampoo: { name: "Natura Mamãe e Bebê · Shampoo", note: "Vendido pela Natura e consultoras", links: [google("Natura Mamãe e Bebê shampoo")] },
  naturaCondicionador: { name: "Natura Mamãe e Bebê · Condicionador", note: "Vendido pela Natura e consultoras", links: [google("Natura Mamãe e Bebê condicionador")] },
  naturaHidratante: { name: "Natura Mamãe e Bebê · Hidratante", note: "Vendido pela Natura e consultoras", links: [google("Natura Mamãe e Bebê hidratante")] },
  cremerAlgodao: {
    name: "Cremer · Algodão quadrado bebê, sem perfume",
    links: [
      { label: "Drogasil", url: "https://www.drogasil.com.br/algodao-quadrado-bebe-cremer-sem-perfume-200-unidades-1080843.html" },
      { label: "Droga Raia", url: "https://www.drogaraia.com.br/algodao-quadrado-bebe-cremer-sem-perfume-200-unidades-1080843.html" },
      { label: "Panvel", url: "https://www.panvel.com/panvel/algodao-quadrado-cremer-100-unidades/p-89375" },
    ],
  },
  mustelaShampoo: {
    name: "Mustela · Shampoo Espuma Recém-Nascido",
    links: [
      { label: "Drogasil", url: "https://www.drogasil.com.br/shampoo-espuma-recem-nascido-mustela-150ml-1384032.html" },
      { label: "Droga Raia", url: "https://www.drogaraia.com.br/shampoo-espuma-recem-nascido-mustela-150ml-1384032.html" },
    ],
  },
  mustelaHidratante: {
    name: "Mustela · Hidratante Hydra Bebê",
    links: [
      { label: "Panvel", url: "https://www.panvel.com/panvel/locao-hidratante-corporal-mustela-hydra-bebe-300ml/p-541520" },
      { label: "Drogasil", url: "https://www.drogasil.com.br/mustela-hydra-bebe-300ml-647474.html" },
    ],
  },
} satisfies Record<string, Example>;

const NATURA_OU_MUSTELA = "Natura Mamãe e Bebê ou Mustela, linha recém-nascido.";

export const giftList: { examples: boolean; groups: readonly GiftGroup[] } = {
  /** true mostra o aviso "Itens de exemplo" na página */
  examples: false,

  groups: [
    {
      id: "fraldas",
      title: "Fraldas",
      items: [
        { id: "fralda-p", name: "Fralda tamanho P", total: 8, unit: PACOTE, examples: pampers("P") },
        { id: "fralda-m", name: "Fralda tamanho M", total: 12, unit: PACOTE, examples: pampers("M") },
        { id: "fralda-g", name: "Fralda tamanho G", total: 7, unit: PACOTE, examples: pampers("G") },
      ],
    },
    {
      id: "pano",
      title: "Fraldas de pano",
      tab: "De pano",
      items: [
        { id: "fralda-boca", name: "Fralda de boca", note: "Limpar boquinha e saliva · 100% algodão, macio e absorvente", total: 12, unit: UNIDADE },
        { id: "fralda-ombro", name: "Fralda de ombro", note: "Apoiar o bebê ao arrotar · algodão duplo ou tecido fralda", total: 6, unit: UNIDADE },
        { id: "fralda-pano", name: "Fralda de pano tradicional", note: "Forrar e proteger superfícies · 100% algodão", total: 6, unit: UNIDADE },
        { id: "toalha-fralda", name: "Toalha fralda", note: "Secar a pele delicada · tecido fralda macio", total: 2, unit: UNIDADE },
        { id: "cueiro-musselina", name: "Cueiro de musselina", note: "Enrolar o bebê no banho · 100% algodão, musselina leve", total: 2, unit: UNIDADE },
      ],
    },
    {
      id: "banho",
      title: "Banho e troca",
      tab: "Banho",
      items: [
        { id: "algodao", name: "Algodão em quadradinhos", note: "Pacote grande · Cremer", total: 4, unit: PACOTE, examples: [ex.cremerAlgodao] },
        { id: "garrafa-termica", name: "Garrafa térmica de pressão", note: "Para esquentar a água dos algodões" },
        { id: "lencos", name: "Lenços umedecidos", note: "Sem perfume, linha sensitive", total: 6, unit: PACOTE },
        { id: "toalha", name: "Toalha de banho de algodão", total: 2, unit: UNIDADE },
        { id: "trocador-portatil", name: "Trocador portátil", note: "Para levar na bolsa", total: 2, unit: UNIDADE },
        { id: "sabonete", name: "Sabonete líquido de bebê", note: "Hipoalergênico, sem perfume forte", total: 2, unit: FRASCO },
        { id: "shampoo", name: "Shampoo de bebê", note: "Natura ou Mustela", examplesNote: NATURA_OU_MUSTELA, examples: [ex.naturaShampoo, ex.mustelaShampoo] },
        { id: "condicionador", name: "Condicionador de bebê", note: "Natura Mamãe e Bebê", examples: [ex.naturaCondicionador] },
        { id: "hidratante", name: "Hidratante de bebê", note: "Natura ou Mustela", examplesNote: NATURA_OU_MUSTELA, examples: [ex.naturaHidratante, ex.mustelaHidratante] },
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
        { id: "chupeta", name: "Chupeta / bico anticólica" },
        { id: "clipe-chupeta", name: "Clipe para bico", note: "Prendedor de chupeta" },
        { id: "escova-mamadeira", name: "Escova para limpar mamadeira" },
        { id: "babadores", name: "Babador" },
        { id: "leite-materno", name: "Saquinhos para leite materno", note: "Para congelar o leite", total: 2, unit: CAIXA },
      ],
    },
    {
      id: "sono",
      title: "Sono e passeio",
      tab: "Sono",
      items: [
        { id: "saco-dormir", name: "Saco de dormir ou cueiro", note: "Algodão, para recém-nascido" },
        { id: "manta", name: "Manta leve de algodão" },
        { id: "mosquiteiro", name: "Mosquiteiro para carrinho" },
      ],
    },
    {
      id: "brincar",
      title: "Brincar e descobrir",
      tab: "Brincar",
      items: [
        { id: "mordedor", name: "Mordedor", note: "Silicone, sem BPA" },
        { id: "livrinhos", name: "Livrinhos de bebê", total: 2, unit: LIVRO },
        { id: "brinquedo-educativo", name: "Brinquedo educativo", note: "Para 0 a 6 meses — chocalho, cores e texturas", total: 3, unit: UNIDADE },
        { id: "tapete-atividades", name: "Tapete de atividades", note: "Com arco de brinquedos (ginásio)" },
        { id: "mobile", name: "Móbile para o berço" },
        { id: "chocalho", name: "Chocalho", total: 2, unit: UNIDADE },
      ],
    },
    {
      id: "mamae",
      title: "Para a mamãe",
      tab: "Mamãe",
      items: [
        { id: "garrafa-agua", name: "Garrafa de água com canudo", note: "Cerca de 1 litro" },
        { id: "pijama-amamentacao", name: "Pijama de amamentação", note: "Para o pós-parto" },
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
