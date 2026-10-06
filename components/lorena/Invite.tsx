import type { CSSProperties } from "react";
import { cssTokens } from "@/lib/lorena/tokens";
import type { Content } from "@/lib/lorena/content";
import { IllustrationDefs } from "./illustrations/primitives";
import { FixedScallopedFrame, StripeBackground, PaperGrain } from "./Frame";
import { MotionController } from "./MotionController";
import { Hero, type CityChoice } from "./sections/Hero";
import { Invitation, TheDate, Details, TheDay, Gifts, Closing } from "./sections/Story";
import { RSVP } from "./sections/RSVP";

/**
 * The whole invitation for one city edition — or, with `choices`, the root
 * card that sends guests to their city.
 */
export function Invite({ content, choices }: { content: Content; choices?: CityChoice[] }) {
  const details = content.showDetails && !choices;
  return (
    // only the card (save the date / city chooser) → the sheet doesn't scroll
    <div className={details ? "lw" : "lw lw--locked"} style={cssTokens as CSSProperties}>
      {details && (
        <a className="lw-skip" href="#rsvp">
          Pular para o RSVP
        </a>
      )}
      <IllustrationDefs />
      <StripeBackground />

      <main className="lw-sheet">
        <Hero content={content} more={details} choices={choices} />
        {details && (
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
