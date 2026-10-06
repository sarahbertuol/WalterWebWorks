import type { Content } from "@/lib/lorena/content";
import { Illustration } from "../Illustration";
import { InvitationSection, SectionTitle } from "../Type";
import { RSVPForm } from "../RSVPForm";
import { WildMeadow, FlowerForgetMeNot, WildBells } from "../illustrations/Flowers";
import { Sparkle, Heart } from "../illustrations/Decor";

/** 07 — RSVP: a reply card tucked into a meadow of small wildflowers. */
export function RSVP({ content }: { content: Content }) {
  const c = content.rsvp;
  return (
    <InvitationSection id="rsvp" className="lw-rsvp" labelledBy="rsvp-t">
      <Illustration reveal="rise" depth={0.03} at={{ bottom: "1%", left: "calc(50% - min(32vw, 420px))", w: "min(64vw, 840px)" }} mobile={{ bottom: "0.5%", left: "-6%", w: "112%" }}>
        <WildMeadow />
      </Illustration>
      <Illustration reveal="drift-l" depth={0.05} hideMobile at={{ top: "18%", left: "2%", w: "clamp(130px, 13vw, 190px)", rot: -4 }}>
        <WildBells />
      </Illustration>
      <Illustration reveal="drift-r" depth={-0.04} hover="turn" at={{ top: "12%", right: "8%", w: "clamp(90px, 9vw, 130px)", rot: 14 }} mobile={{ top: "2%", right: "-2%", w: "28vw" }}>
        <FlowerForgetMeNot />
      </Illustration>
      <Illustration delay={300} depth={-0.06} at={{ top: "40%", right: "14%", w: "30px" }} hideMobile>
        <Sparkle seed={514} />
      </Illustration>
      <Illustration delay={400} depth={-0.05} at={{ top: "8%", left: "18%", w: "26px", rot: -10 }} mobile={{ top: "3%", left: "8%", w: "22px" }}>
        <Heart seed={526} />
      </Illustration>

      <div className="lw-inner lw-rsvp__inner">
        <SectionTitle as="p">{c.label}</SectionTitle>
        <h2 id="rsvp-t" className="lw-display lw-rsvp__title lw-reveal lw-reveal--text" data-reveal="">
          {c.title}
        </h2>
        <p className="lw-rsvp__deadline lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
          {c.deadline}
        </p>
        <div className="lw-card lw-card--form lw-reveal" data-reveal="" style={{ ["--delay" as string]: "250ms" }}>
          <RSVPForm rsvp={c} edition={content.slug} city={content.city} />
        </div>
      </div>
    </InvitationSection>
  );
}
