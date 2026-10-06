import type { Metadata } from "next";
import { getContent } from "./content";
import type { EditionSlug } from "./editions";

/** Address guests receive — temporary vercel.app until LORENA_HOST is set (docs/lorena/README.md) */
const host = process.env.LORENA_HOST || "convitelorena.vercel.app";

/**
 * Title, description and share preview (WhatsApp, iMessage, Instagram DM)
 * for one city edition. `path` is the address on the invitation host.
 */
export function inviteMetadata(slug: EditionSlug, path: string): Metadata {
  const { meta, hero } = getContent(slug);
  const image = {
    url: `/lorena/og-${slug}.jpg`,
    width: 1200,
    height: 630,
    alt: `Save the date — Brunch de Fraldas da Lorena, ${hero.day} de ${hero.month}`,
  };
  return {
    metadataBase: new URL(`https://${host}`),
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    robots: { index: false, follow: false },
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: "pt_BR", url: path, images: [image] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image.url] },
  };
}
