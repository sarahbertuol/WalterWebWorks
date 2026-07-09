export type PortfolioItem = {
  name: string;
  image: string;
  url: string | null;
};

export const portfolioItems: PortfolioItem[] = [
  {
    name: "RUMOSEG",
    image: "/images/portfolio/rumoseg.jpg",
    url: "https://rumoseg-nine.vercel.app",
  },
  {
    name: "Suzano Institucional",
    image: "/images/portfolio/suzano.jpg",
    url: null,
  },
  {
    name: "Letícia Pierucci",
    image: "/images/portfolio/leticia.jpg",
    url: null,
  },
];
