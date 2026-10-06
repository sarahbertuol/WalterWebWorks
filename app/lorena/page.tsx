import type { CSSProperties } from "react";
import { cssTokens } from "@/lib/lorena/tokens";
import { IllustrationDefs } from "@/components/lorena/illustrations/primitives";
import { FixedScallopedFrame, StripeBackground, PaperGrain } from "@/components/lorena/Frame";
import { MotionController } from "@/components/lorena/MotionController";
import { Hero } from "@/components/lorena/sections/Hero";
import { Invitation, TheDate, Details, TheDay, Gifts, Closing } from "@/components/lorena/sections/Story";
import { RSVP } from "@/components/lorena/sections/RSVP";
import { content } from "@/lib/lorena/content";

export default function LorenaPage() {
  return (
    <div className="lw" style={cssTokens as CSSProperties}>
      {content.showDetails && (
        <a className="lw-skip" href="#rsvp">
          Pular para o RSVP
        </a>
      )}
      <IllustrationDefs />
      <StripeBackground />

      <main className="lw-sheet">
        <Hero more={content.showDetails} />
        {content.showDetails && (
          <>
            <Invitation />
            <TheDate />
            <Details />
            <TheDay />
            <Gifts />
            <RSVP />
            <Closing />
          </>
        )}
      </main>

      <PaperGrain />
      <FixedScallopedFrame />
      <MotionController />
    </div>
  );
}
