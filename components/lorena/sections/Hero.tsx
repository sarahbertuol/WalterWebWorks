import type { CSSProperties } from "react";
import { content } from "@/lib/lorena/content";
import { Illustration } from "../Illustration";
import { ScriptWord } from "../Type";
import { Sun } from "../illustrations/Sun";
import { FlowerAnemone, FlowerRanunculus, FlowerCosmos, FlowerDaisy, FlowerForgetMeNot } from "../illustrations/Flowers";
import { BranchLeafy } from "../illustrations/Botanicals";
import { Pacifier } from "../illustrations/Baby";
import { StarCluster, Medallion, Sparkle, Star } from "../illustrations/Decor";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** 01 — the invitation itself, recomposed for the screen. */
export function Hero() {
  const h = content.hero;
  return (
    <header className="lw-hero" id="topo">
      {/* far layer: soft plates & big flowers entering from the edges */}
      <Illustration behind reveal="load" delay={500} at={{ top: "37%", left: "calc(50% - min(16vw, 230px))", w: "min(32vw, 460px)" }} mobile={{ top: "50%", left: "12%", w: "76%" }}>
        <Medallion opacity={0.16} />
      </Illustration>

      <Illustration reveal="load" delay={700} depth={0.06} hover="turn" at={{ top: "16%", left: "-5%", w: "clamp(220px, 23vw, 360px)", rot: -16 }} mobile={{ top: "1%", left: "-15%", w: "40vw", rot: -20 }}>
        <FlowerAnemone />
      </Illustration>

      <Illustration reveal="load" delay={800} depth={0.04} flip at={{ top: "3%", right: "-7%", w: "clamp(280px, 32vw, 500px)", rot: -6 }} mobile={{ top: "auto", bottom: "8%", right: "-30%", w: "78vw", rot: -28 }}>
        <BranchLeafy />
      </Illustration>

      <Illustration reveal="load" delay={900} depth={0.08} hover="turn" at={{ bottom: "6%", right: "5%", w: "clamp(150px, 15vw, 240px)", rot: 8 }} mobile={{ bottom: "-4%", right: "-8%", w: "34vw" }}>
        <FlowerRanunculus />
      </Illustration>

      <Illustration reveal="load" delay={1000} depth={0.05} hideMobile at={{ bottom: "-16%", left: "11%", w: "clamp(120px, 11vw, 180px)", rot: 10 }}>
        <FlowerCosmos />
      </Illustration>

      {/* near layer: small things around the type */}
      <Illustration reveal="load" delay={1100} depth={-0.03} hover="lift" at={{ top: "47%", right: "15%", w: "clamp(110px, 10.5vw, 160px)", rot: 16 }} mobile={{ top: "auto", bottom: "4%", left: "3%", right: "auto", w: "25vw", rot: -14 }}>
        <Pacifier />
      </Illustration>

      <Illustration reveal="load" delay={950} depth={-0.02} hover="turn" at={{ top: "9%", left: "27%", w: "clamp(48px, 4.6vw, 72px)", rot: -22 }} mobile={{ top: "14%", left: "auto", right: "8%", w: "12vw", rot: 14 }}>
        <FlowerDaisy seed={57} />
      </Illustration>

      <Illustration reveal="load" delay={1050} depth={-0.04} hideMobile hover="turn" at={{ top: "34%", left: "17%", w: "clamp(80px, 8vw, 120px)", rot: -8 }}>
        <FlowerForgetMeNot />
      </Illustration>

      <Illustration reveal="load" delay={2300} depth={-0.05} at={{ top: "13%", left: "34%", w: "clamp(90px, 9vw, 140px)" }} mobile={{ top: "20%", left: "3%", w: "26vw" }}>
        <StarCluster />
      </Illustration>
      <Illustration reveal="load" delay={2500} depth={-0.06} at={{ top: "70%", right: "27%", w: "clamp(80px, 8vw, 120px)", rot: 180 }} mobile={{ top: "auto", bottom: "17%", right: "6%", w: "22vw" }}>
        <StarCluster />
      </Illustration>
      <Illustration reveal="load" delay={2600} hideMobile at={{ top: "60%", left: "24%", w: "26px" }}>
        <Sparkle />
      </Illustration>
      <Illustration reveal="load" delay={2700} hideMobile at={{ top: "24%", right: "31%", w: "22px", rot: 12 }}>
        <Star />
      </Illustration>

      {/* type layer */}
      <div className="lw-hero__type">
        <div className="lw-hero__sun lw-load" style={d(200)}>
          <Sun className="lw-sun" />
        </div>

        <h1 className="lw-hero__title">
          <span className="lw-hero__std lw-load" style={d(900)}>
            <span>{h.eyebrow[0]}</span>
            <span>{h.eyebrow[1]}</span>
          </span>
          <span className="lw-hero__event lw-load" style={d(1150)}>
            {h.title}
          </span>
          <ScriptWord size="sm" className="lw-hero__da">
            <span style={d(1350)} className="lw-load">{h.connector}</span>
          </ScriptWord>
          <ScriptWord size="xl" signature className="lw-hero__name">
            <span className="lw-sign" style={d(1550)}>
              {h.name}
            </span>
          </ScriptWord>
        </h1>

        <p className="lw-hero__date lw-load" style={d(2100)}>
          <span className="lw-hero__rule" aria-hidden="true" />
          <span>
            <span className="lw-hero__day">{h.day}</span> {h.month}
          </span>
          <span className="lw-hero__rule" aria-hidden="true" />
        </p>
      </div>

      <a href="#convite" className="lw-scroll-cue lw-load" style={d(2900)}>
        <span className="lw-visually-hidden">Continuar para o convite</span>
        <svg viewBox="0 0 24 40" aria-hidden="true">
          <path d="M12 4C11 14 13 22 12 34M5 27c3 3 5 5 7 8 2-3 4-5 7-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}
