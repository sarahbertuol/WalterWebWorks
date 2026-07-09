import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Walter Web Works — Site pronto. Rápido.",
  description:
    "A Walter Web Works cria seu site em dias e conecta IA para tirar tarefa repetitiva da sua mão.",
  openGraph: {
    title: "Walter Web Works — Site pronto. Rápido.",
    description: "Site no ar em dias. Automação IA encaixada no seu negócio.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
