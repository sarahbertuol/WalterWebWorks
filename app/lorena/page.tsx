import type { Metadata } from "next";
import { Invite } from "@/components/lorena/Invite";
import { getContent } from "@/lib/lorena/content";
import { defaultEdition, editions, editionSlugs } from "@/lib/lorena/editions";
import { inviteMetadata } from "@/lib/lorena/metadata";

/**
 * convitelorena.vercel.app (root) — the card with one button per city.
 * Paths are the short ones served on the invitation host (/caxias-dos-sul …).
 */
const choices = editionSlugs.map((slug) => ({ label: editions[slug].city, href: `/${slug}` }));

const title = "Brunch de Fraldas da Lorena";
const description = `Save the date — ${editionSlugs.map((s) => `${editions[s].city}, ${editions[s].day} de ${editions[s].month}`).join(" · ")}.`;
const base = inviteMetadata(defaultEdition, "/");
const image = { url: "/lorena/og-cidades.jpg", width: 1200, height: 630, alt: "Save the date — Brunch de Fraldas da Lorena" };

export const metadata: Metadata = {
  ...base,
  title,
  description,
  openGraph: { ...base.openGraph, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] },
};

export default function LorenaPage() {
  return <Invite content={getContent(defaultEdition)} choices={choices} />;
}
