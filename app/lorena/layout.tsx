import type { Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script } from "next/font/google";
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

export const viewport: Viewport = {
  themeColor: palette.burgundy,
};

export default function LorenaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${body.variable} ${script.variable}`}>{children}</div>;
}
