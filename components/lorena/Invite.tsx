import type { CSSProperties } from "react";
import { cssTokens } from "@/lib/lorena/tokens";
import type { Content } from "@/lib/lorena/content";
import { IllustrationDefs } from "./illustrations/primitives";
import { FixedScallopedFrame, StripeBackground, PaperGrain } from "./Frame";
import { MotionController } from "./MotionController";
import { Hero } from "./sections/Hero";
import { Invitation, TheDate, Details, TheDay, Gifts, Closing } from "./sections/Story";
import { RSVP } from "./sections/RSVP";

/** The whole invitation for one city edition. */
export function Invite({ content }: { content: Content }) {
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
        <Hero content={content} more={content.showDetails} />
        {content.showDetails && (
          <>
            <Invitation content={content} />
            <TheDate content={content} />
            <Details content={content} />
            <TheDay content={content} />
            <Gifts content={content} />
            <RSVP content={content} />
            <Closing content={content} />
          </>
        )}
      </main>

      <PaperGrain />
      <FixedScallopedFrame />
      <MotionController />
    </div>
  );
}
