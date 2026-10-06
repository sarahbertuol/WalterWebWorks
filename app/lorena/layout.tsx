import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import { content } from "@/lib/lorena/content";
import { palette } from "@/lib/lorena/tokens";
import "./lorena.css";

const body = Cormorant_Garamond({
  variable: "--font-lw-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const script = Pinyon_Script({
  variable: "--font-lw-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Address guests receive — temporary vercel.app until LORENA_HOST is set (docs/lorena/README.md) */
const host = process.env.LORENA_HOST || "convitelorena.vercel.app";

/** Share preview (WhatsApp, iMessage, Instagram DM): the card itself. */
const shareImage = {
  url: "/lorena/og.jpg",
  width: 1200,
  height: 630,
  alt: "Save the date — Brunch de Fraldas da Lorena, 21 de Novembro",
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${host}`),
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    type: "website",
    locale: "pt_BR",
    url: "/",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: [shareImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: palette.burgundy,
};

export default function LorenaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${body.variable} ${script.variable}`}>{children}</div>;
}
