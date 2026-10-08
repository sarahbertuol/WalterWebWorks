import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { cssTokens } from "@/lib/lorena/tokens";
import { giftList } from "@/lib/lorena/gifts";
import { inviteMetadata } from "@/lib/lorena/metadata";
import { defaultEdition } from "@/lib/lorena/editions";
import { IllustrationDefs } from "@/components/lorena/illustrations/primitives";
import { FixedScallopedFrame, StripeBackground, PaperGrain } from "@/components/lorena/Frame";
import { DecorativeDivider, ScriptWord, SectionTitle } from "@/components/lorena/Type";
import { Sun } from "@/components/lorena/illustrations/Sun";
import { SparkleLine } from "@/components/lorena/illustrations/Invitation";
import { GiftList } from "@/components/lorena/GiftList";

/** convitelorena.vercel.app/lista-de-presentes */
const title = "Lista de presentes · Brunch de Fraldas da Lorena";
const description = "Marque o que você comprou para a Lorena — assim ninguém repete.";
const base = inviteMetadata(defaultEdition, "/lista-de-presentes");
const image = { url: "/lorena/og-lista.jpg", width: 1200, height: 630, alt: "Lista de presentes da Lorena" };

export const metadata: Metadata = {
  ...base,
  title,
  description,
  openGraph: { ...base.openGraph, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] },
};

export default function GiftListPage() {
  return (
    <div className="lw lw--list" style={cssTokens as CSSProperties}>
      <IllustrationDefs />
      <StripeBackground />
      <main className="lw-sheet lw-gl-page">
        <header className="lw-gl__head">
          <div className="lw-hero__sunrow" aria-hidden="true">
            <SparkleLine className="lw-gl__spark" />
            <Sun className="lw-gl__sun" />
            <SparkleLine className="lw-gl__spark lw-gl__spark--low" />
          </div>
          <SectionTitle as="p">Brunch de Fraldas</SectionTitle>
          <h1 className="lw-gl__title">
            Lista de presentes <span className="lw-gl__da">da</span>
            <ScriptWord className="lw-gl__lorena">Lorena</ScriptWord>
          </h1>
          <p className="lw-prose lw-gl__intro">
            Sua presença já é o presente mais bonito. Se quiser trazer um mimo, marque aqui o que você comprou — não precisa se
            identificar, é só para ninguém repetir.
          </p>
          {giftList.examples && <p className="lw-gl__notice">Itens de exemplo — a lista oficial entra em breve.</p>}
          <DecorativeDivider variant="heart" reveal={false} />
        </header>

        <GiftList diapers={giftList.diapers} items={giftList.items} />

        <p className="lw-gl__back">
          {/* plain <a>: "/" is the invitation only on the convitelorena host (rewrite) */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="lw-link" href="/">
            Voltar ao convite
          </a>
        </p>
      </main>
      <PaperGrain />
      <FixedScallopedFrame />
    </div>
  );
}
