import type { Content } from "@/lib/lorena/content";
import { C } from "@/lib/lorena/tokens";
import { Illustration } from "../Illustration";
import { DecorativeDivider, InvitationSection, ScriptWord, SectionTitle, StationeryButton } from "../Type";
import { SunSmall } from "../illustrations/Sun";
import { FlowerBouquet, Garland, FlowerBlossom, FlowerCosmos, FlowerDaisy, FlowerRanunculus, WildBells, WildYarrow } from "../illustrations/Flowers";
import { BranchOlive, BranchRound, CitrusSlice, LemonBranch } from "../illustrations/Botanicals";
import { Rattle, TinyBow, Pacifier } from "../illustrations/Baby";
import { Blob, DotTrail, Heart, Sparkle, Squiggle, Star, StarCluster } from "../illustrations/Decor";

/* ------------------------------------------------------------------ 02 */

export function Invitation({ content }: { content: Content }) {
  const c = content.invitation;
  return (
    <InvitationSection id="convite" className="lw-invite" labelledBy="convite-t">
      <Illustration reveal="drift-r" depth={0.07} hover="turn" at={{ top: "4%", right: "-6%", w: "clamp(240px, 26vw, 400px)", rot: 12 }} mobile={{ top: "-6%", right: "-30%", w: "54vw", rot: 18 }}>
        <FlowerRanunculus />
      </Illustration>
      <Illustration reveal="drift-l" depth={0.04} at={{ bottom: "6%", left: "-3%", w: "clamp(200px, 24vw, 360px)", rot: -8 }} mobile={{ bottom: "-2%", left: "-18%", w: "62vw" }}>
        <BranchOlive />
      </Illustration>
      <Illustration delay={300} depth={-0.04} at={{ top: "18%", left: "16%", w: "clamp(70px, 7vw, 110px)", rot: -14 }} hideMobile>
        <StarCluster />
      </Illustration>

      <div className="lw-inner lw-invite__inner">
        <SectionTitle as="h2">
          <span id="convite-t">{c.label}</span>
        </SectionTitle>
        <p className="lw-invite__lead lw-reveal lw-reveal--text" data-reveal="">
          {c.lead}
        </p>
        <div className="lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "200ms" }}>
          <ScriptWord size="lg" className="lw-invite__name">
            {c.name}
          </ScriptWord>
        </div>
        <DecorativeDivider variant="heart" />
        <p className="lw-prose lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "300ms" }}>
          {c.body}
        </p>
      </div>
    </InvitationSection>
  );
}

/* ------------------------------------------------------------------ 03 */

export function TheDate({ content }: { content: Content }) {
  const c = content.date;
  return (
    <InvitationSection id="data" className="lw-date" labelledBy="data-t">
      <Illustration behind reveal="bloom" depth={0.03} at={{ top: "16%", left: "calc(50% - min(23vw, 300px))", w: "min(46vw, 600px)" }} mobile={{ top: "20%", left: "-4%", w: "108%" }}>
        <Blob fill={C.sun} opacity={0.28} seed={575} />
      </Illustration>
      <Illustration reveal="bloom" depth={-0.05} hover="turn" at={{ top: "14%", left: "calc(50% + min(12vw, 150px))", w: "clamp(80px, 9vw, 130px)" }} mobile={{ top: "13%", left: "auto", right: "8%", w: "24vw" }}>
        <SunSmall />
      </Illustration>
      <Illustration delay={200} depth={-0.08} at={{ top: "26%", left: "16%", w: "clamp(120px, 14vw, 200px)" }} mobile={{ top: "8%", left: "4%", w: "34vw" }}>
        <StarCluster
          items={[
            { kind: "star", x: 30, y: 40, s: 15, d: 0 },
            { kind: "sparkle", x: 90, y: 22, s: 10, fill: C.ink, d: 1.2 },
            { kind: "dot", x: 70, y: 70, s: 3, d: 0.4 },
            { kind: "star", x: 140, y: 60, s: 9, d: 2 },
            { kind: "dot", x: 180, y: 30, s: 2.4, d: 1.6 },
            { kind: "sparkle", x: 120, y: 112, s: 13, d: 0.8 },
          ]}
        />
      </Illustration>
      <Illustration delay={300} depth={-0.06} at={{ bottom: "18%", right: "15%", w: "clamp(120px, 13vw, 190px)", rot: 160 }} mobile={{ bottom: "8%", right: "4%", w: "32vw" }}>
        <StarCluster />
      </Illustration>
      <Illustration reveal="drift-l" depth={0.05} hideMobile at={{ bottom: "-8%", left: "4%", w: "clamp(120px, 11vw, 170px)", rot: -6 }}>
        <FlowerCosmos />
      </Illustration>
      <Illustration delay={200} hideMobile at={{ top: "38%", right: "8%", w: "160px", rot: 8 }}>
        <DotTrail />
      </Illustration>

      <div className="lw-inner lw-date__inner">
        <SectionTitle as="h2">
          <span id="data-t">{c.label}</span>
        </SectionTitle>
        <p className="lw-date__big lw-reveal" data-reveal="">
          <span className="lw-date__day">{c.day}</span>
          <ScriptWord size="md" className="lw-date__de">
            de
          </ScriptWord>
          <span className="lw-date__month">{c.month}</span>
        </p>
        <p className="lw-date__note lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "250ms" }}>
          {c.note}
        </p>
        <p className="lw-date__time lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "400ms" }}>
          {c.time}
        </p>
      </div>
    </InvitationSection>
  );
}

/* ------------------------------------------------------------------ 04 */

export function Details({ content }: { content: Content }) {
  const c = content.details;
  return (
    <InvitationSection id="brunch" className="lw-details" labelledBy="brunch-t">
      <Illustration reveal="drift-l" depth={0.06} hover="turn" at={{ top: "10%", left: "3%", w: "clamp(220px, 23vw, 340px)", rot: -12 }} mobile={{ top: "auto", bottom: "-3%", left: "-6%", w: "36vw", rot: -10 }}>
        <FlowerBouquet />
      </Illustration>
      <Illustration reveal="drift-r" depth={0.03} at={{ bottom: "2%", right: "-2%", w: "clamp(160px, 16vw, 240px)", rot: 8 }} mobile={{ bottom: "-3%", right: "-14%", w: "44vw" }}>
        <BranchRound />
      </Illustration>
      <Illustration delay={200} depth={-0.04} hover="turn" hideMobile at={{ top: "30%", right: "11%", w: "clamp(70px, 6vw, 96px)", rot: 18 }}>
        <FlowerDaisy seed={58} />
      </Illustration>

      <div className="lw-inner lw-details__inner">
        <SectionTitle as="p">{c.label}</SectionTitle>
        <h2 id="brunch-t" className="lw-display lw-details__title lw-reveal lw-reveal--text" data-reveal="">
          {c.title}
        </h2>

        <div className="lw-card lw-reveal" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
          <div className="lw-card__corner lw-card__corner--tl" aria-hidden="true">
            <FlowerBlossom />
          </div>
          <dl className="lw-details__list">
            {c.items.map((it) => (
              <div key={it.term} className="lw-details__row">
                <dt>{it.term}</dt>
                <dd>{it.value}</dd>
              </div>
            ))}
          </dl>
          {c.mapUrl && (
            <div className="lw-card__cta">
              <StationeryButton href={c.mapUrl} variant="outline">
                {c.mapLabel}
              </StationeryButton>
            </div>
          )}
          <div className="lw-card__corner lw-card__corner--br" aria-hidden="true">
            <Heart />
          </div>
        </div>
      </div>
    </InvitationSection>
  );
}

/* ------------------------------------------------------------------ 05 */

export function TheDay({ content }: { content: Content }) {
  const c = content.day;
  return (
    <InvitationSection id="o-dia" className="lw-day" labelledBy="dia-t">
      <Illustration behind reveal="bloom" depth={0.04} at={{ top: "8%", right: "4%", w: "clamp(260px, 32vw, 460px)" }} mobile={{ top: "2%", right: "-18%", w: "80vw" }}>
        <Blob fill={C.blush} opacity={0.26} seed={590} />
      </Illustration>
      <Illustration reveal="drift-r" depth={0.06} hover="turn" at={{ top: "4%", right: "-5%", w: "clamp(320px, 38vw, 560px)", rot: 6 }} mobile={{ top: "-2%", right: "-30%", w: "92vw", rot: 10 }}>
        <LemonBranch />
      </Illustration>
      <Illustration delay={200} depth={-0.05} hover="lift" at={{ bottom: "14%", left: "8%", w: "clamp(90px, 9vw, 130px)", rot: -12 }} mobile={{ bottom: "2%", left: "6%", w: "26vw" }}>
        <CitrusSlice />
      </Illustration>
      <Illustration delay={350} hideMobile at={{ bottom: "26%", left: "20%", w: "200px", rot: -4 }}>
        <Squiggle />
      </Illustration>
      <Illustration delay={500} depth={-0.07} at={{ top: "30%", left: "10%", w: "30px", rot: 10 }} mobile={{ top: "30%", left: "6%", w: "24px" }}>
        <Sparkle />
      </Illustration>

      <div className="lw-inner lw-day__inner">
        <SectionTitle as="h2">
          <span id="dia-t">{c.label}</span>
        </SectionTitle>
        <blockquote className="lw-day__quote lw-reveal lw-reveal--text" data-reveal="">
          <p>{c.quote}</p>
        </blockquote>
        <DecorativeDivider variant="sprig" />
        <p className="lw-prose lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "200ms" }}>
          {c.body}
        </p>
      </div>
    </InvitationSection>
  );
}

/* ------------------------------------------------------------------ 06 */

export function Gifts({ content }: { content: Content }) {
  const c = content.gifts;
  return (
    <InvitationSection id="fraldas" className="lw-gifts" labelledBy="fraldas-t">
      <Illustration reveal="bloom" depth={0.05} hover="lift" at={{ top: "12%", left: "8%", w: "clamp(140px, 14vw, 210px)", rot: -18 }} mobile={{ top: "0%", left: "-4%", w: "38vw", rot: -22 }}>
        <Pacifier ribbon="blush" />
      </Illustration>
      <Illustration reveal="bloom" delay={150} depth={-0.04} hover="turn" at={{ bottom: "8%", right: "9%", w: "clamp(100px, 10vw, 150px)", rot: 16 }} mobile={{ bottom: "-2%", right: "4%", w: "26vw" }}>
        <Rattle />
      </Illustration>
      <Illustration delay={250} depth={-0.06} at={{ top: "16%", right: "16%", w: "clamp(60px, 6vw, 90px)", rot: 10 }} mobile={{ top: "6%", right: "8%", w: "18vw" }}>
        <TinyBow color="ink" />
      </Illustration>
      <Illustration delay={300} hideMobile at={{ bottom: "20%", left: "14%", w: "28px" }}>
        <Heart seed={524} />
      </Illustration>
      <Illustration delay={420} hideMobile at={{ top: "46%", right: "6%", w: "24px" }}>
        <Star seed={505} />
      </Illustration>

      <div className="lw-inner lw-gifts__inner">
        <SectionTitle as="p">{c.label}</SectionTitle>
        <h2 id="fraldas-t" className="lw-gifts__title lw-reveal lw-reveal--text" data-reveal="">
          <ScriptWord size="md">{c.title}</ScriptWord>
        </h2>
        <p className="lw-prose lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
          {c.body}
        </p>
        <p className="lw-gifts__sizes lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "300ms" }}>
          <span className="lw-gifts__sizes-label">{c.sizesLabel}</span>
          <span className="lw-gifts__sizes-value">{c.sizes}</span>
        </p>
        {c.listUrl && (
          <div className="lw-gifts__cta">
            <StationeryButton href={c.listUrl} variant="outline">
              {c.listLabel}
            </StationeryButton>
          </div>
        )}
      </div>
    </InvitationSection>
  );
}

/* ------------------------------------------------------------------ 08 */

export function Closing({ content }: { content: Content }) {
  const c = content.closing;
  return (
    <footer className="lw-section lw-closing" id="ate-la">
      <Illustration reveal="drift-l" depth={0.06} at={{ bottom: "-4%", left: "-4%", w: "clamp(200px, 22vw, 320px)", rot: 8 }} mobile={{ bottom: "-6%", left: "-20%", w: "54vw" }}>
        <WildBells />
      </Illustration>
      <Illustration reveal="drift-r" depth={0.04} at={{ bottom: "-4%", right: "-2%", w: "clamp(160px, 16vw, 230px)", rot: -6 }} mobile={{ bottom: "-6%", right: "-12%", w: "42vw" }}>
        <WildYarrow />
      </Illustration>
      <Illustration delay={300} depth={-0.05} hideMobile at={{ top: "56%", left: "14%", w: "clamp(60px, 6vw, 90px)", rot: -12 }}>
        <FlowerBlossom />
      </Illustration>
      <Illustration delay={500} depth={-0.07} at={{ top: "24%", right: "16%", w: "clamp(110px, 12vw, 180px)" }} mobile={{ top: "26%", right: "2%", w: "32vw" }}>
        <StarCluster />
      </Illustration>

      <div className="lw-inner lw-closing__inner">
        <div className="lw-closing__crown lw-reveal lw-reveal--bloom" data-reveal="" aria-hidden="true">
          <Garland />
          <div className="lw-closing__sun">
            <SunSmall />
          </div>
        </div>
        <p className="lw-closing__line lw-reveal lw-reveal--text" data-reveal="">
          {c.line}
        </p>
        <div className="lw-reveal lw-reveal--text" data-reveal="" style={{ ["--delay" as string]: "250ms" }}>
          <ScriptWord size="xl" signature className="lw-closing__name">
            {c.name}
          </ScriptWord>
        </div>
        <DecorativeDivider variant="stars" />
      </div>
    </footer>
  );
}
