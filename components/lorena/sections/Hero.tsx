import type { CSSProperties } from "react";
import { content } from "@/lib/lorena/content";
import { Illustration } from "../Illustration";
import { ScriptWord, DecorativeDivider } from "../Type";
import { Sun } from "../illustrations/Sun";
import { SparkleLine, PacifierBow, FanFlower, TulipFlower, Flourish } from "../illustrations/Invitation";
import { FlowerBlossom } from "../illustrations/Flowers";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** "Save the Date" with swash capitals on the first and last word, as printed. */
function SwashTitle({ words }: { words: readonly string[] }) {
  const all = words.join(" ").split(" ");
  const last = all.length - 1;
  const render = (w: string, i: number) =>
    i === 0 || i === last ? (
      <span key={i} className="lw-swash-word">
        <span className="lw-swash">{w[0].toUpperCase()}</span>
        {w.slice(1).toUpperCase()}
      </span>
    ) : (
      <span key={i}>{w.toUpperCase()}</span>
    );
  return (
    <>
      <span className="lw-std__line">{render(all[0], 0)}</span>
      <span className="lw-std__line">
        {all.slice(1).map((w, i) => (
          <span key={i}>
            {i > 0 && " "}
            {render(w, i + 1)}
          </span>
        ))}
      </span>
    </>
  );
}

/** 01 — the printed invitation, faithfully recomposed for the screen. */
export function Hero() {
  const h = content.hero;
  return (
    <header className="lw-hero" id="topo">
      {/* desktop only: the sheet is wider than the card, so a little more garden at the edges */}
      <Illustration reveal="load" delay={1200} depth={0.05} hideMobile hover="turn" at={{ bottom: "6%", left: "4%", w: "clamp(150px, 15vw, 240px)", rot: -10 }}>
        <FanFlower />
      </Illustration>
      <Illustration reveal="load" delay={1300} depth={0.04} hideMobile hover="turn" at={{ top: "8%", right: "8%", w: "clamp(80px, 7vw, 110px)", rot: 14 }}>
        <FlowerBlossom />
      </Illustration>
      <Illustration reveal="load" delay={1400} depth={0.06} hideMobile hover="turn" at={{ bottom: "8%", right: "6%", w: "clamp(120px, 12vw, 190px)", rot: 8 }}>
        <TulipFlower />
      </Illustration>
      <Illustration reveal="load" delay={2400} hideMobile at={{ top: "30%", left: "14%", w: "26px" }}>
        <SparkleLine className="lw-twinkle" />
      </Illustration>
      <Illustration reveal="load" delay={2500} hideMobile at={{ top: "18%", left: "8%", w: "18px" }}>
        <SparkleLine className="lw-twinkle" />
      </Illustration>
      <Illustration reveal="load" delay={2600} hideMobile at={{ top: "52%", right: "16%", w: "24px" }}>
        <SparkleLine className="lw-twinkle" />
      </Illustration>

      <div className="lw-card-face">
        {/* sun flanked by two sparkles */}
        <div className="lw-hero__sunrow lw-load" style={d(200)} aria-hidden="true">
          <SparkleLine className="lw-hero__spark lw-twinkle" />
          <Sun className="lw-sun" />
          <SparkleLine className="lw-hero__spark lw-hero__spark--low lw-twinkle" />
        </div>

        <h1 className="lw-hero__title">
          <span className="lw-std lw-load" style={d(700)}>
            <SwashTitle words={h.eyebrow} />
            <Flourish className="lw-std__flourish" />
          </span>

          {/* pacifier between the two flowers */}
          <span className="lw-hero__vignette lw-load" style={d(1000)} aria-hidden="true">
            <SparkleLine className="lw-vig__spark lw-vig__spark--a lw-twinkle" />
            <span className="lw-vig__flower lw-vig__flower--l lw-hover lw-hover--turn">
              <FanFlower />
            </span>
            <span className="lw-vig__pacifier lw-hover lw-hover--lift">
              <PacifierBow />
            </span>
            <span className="lw-vig__flower lw-vig__flower--r lw-hover lw-hover--turn">
              <TulipFlower />
            </span>
            <SparkleLine className="lw-vig__spark lw-vig__spark--b lw-twinkle" />
          </span>

          <span className="lw-hero__event lw-load" style={d(1300)}>
            {h.title[0]} <em>{h.title[1]}</em> {h.title[2]}
          </span>
          <ScriptWord className="lw-hero__da">
            <span className="lw-load" style={d(1500)}>
              {h.connector}
            </span>
          </ScriptWord>
          <ScriptWord signature className="lw-hero__name">
            <span className="lw-sign" style={d(1700)}>
              {h.name}
            </span>
          </ScriptWord>
        </h1>

        <div className="lw-load" style={d(2300)}>
          <DecorativeDivider variant="heart" reveal={false} className="lw-hero__divider" />
        </div>
        <p className="lw-hero__date lw-load" style={d(2450)}>
          {h.day} {h.month}
        </p>
        <p className="lw-hero__note lw-load" style={d(2650)}>
          {h.note}
        </p>
      </div>

      <a href="#convite" className="lw-scroll-cue lw-load" style={d(3200)}>
        <span className="lw-visually-hidden">Continuar para o convite</span>
        <svg viewBox="0 0 24 40" aria-hidden="true">
          <path d="M12 4C11 14 13 22 12 34M5 27c3 3 5 5 7 8 2-3 4-5 7-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}
