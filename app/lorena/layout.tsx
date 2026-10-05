import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import { content } from "@/lib/lorena/content";
import { palette } from "@/lib/lorena/tokens";
import "./lorena.css";

const display = Bodoni_Moda({
  variable: "--font-lw-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Cormorant_Garamond({
  variable: "--font-lw-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const script = Pinyon_Script({
  variable: "--font-lw-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: palette.burgundy,
};

export default function LorenaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} ${script.variable}`}>{children}</div>;
}
