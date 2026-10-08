import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { speakEnglish } from "../../../utils/speech";
import "../../../styles/lesson22.css";

type Card = {
  /** Image URL (usually under public/) */
  src: string;
  /** Accessible description of the picture */
  alt: string;
  /** English word shown on the back */
  back: string;
  /** Spoken on reveal (defaults to back) */
  speak?: string;
};

type Props = {
  cards?: Card[];
  backLabel?: string;
};

/** Picture → English flip cards (reusable image vocab warm-up). */
export function ImageVocabFlipSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const cards = props.cards ?? [];
  const backLabel = props.backLabel ?? "English";
  const [flipped, setFlipped] = useState<number[]>([]);
  const [announce, setAnnounce] = useState("");

  const toggle = (idx: number) => {
    const open = flipped.includes(idx);
    const card = cards[idx];
    if (!open && card) {
      speakEnglish(card.speak ?? card.back);
    }
    const next = open
      ? flipped.filter((i) => i !== idx)
      : [...flipped, idx];
    setFlipped(next);
    if (!card) return;
    if (open) {
      setAnnounce(
        `Card closed. ${next.length} of ${cards.length} cards revealed.`,
      );
    } else {
      setAnnounce(
        `Revealed: ${card.back}. ${next.length} of ${cards.length} cards revealed.`,
      );
    }
  };

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="l22-vocab-grid">
        {cards.map((c, idx) => {
          const isFlipped = flipped.includes(idx);
          return (
            <button
              key={`${c.src}-${c.back}`}
              type="button"
              className={`l22-vocab-card l22-vocab-card--photo${isFlipped ? " l22-vocab-card--flipped" : ""}`}
              onClick={() => toggle(idx)}
              aria-pressed={isFlipped}
              aria-label={
                isFlipped
                  ? `${backLabel}: ${c.back}. Press to hide.`
                  : `Picture: ${c.alt}. Press to reveal.`
              }
            >
              <div className="l22-vocab-inner" aria-hidden="true">
                <div className="l22-vocab-face l22-vocab-front">
                  <img src={c.src} alt="" loading="lazy" />
                  <span className="l22-vocab-hint">tap → English</span>
                </div>
                <div className="l22-vocab-face l22-vocab-back">
                  <span className="l22-vocab-label">{backLabel}</span>
                  <strong>{c.back}</strong>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <p className="lw-a11y-feedback lw-visually-hidden" role="status" aria-live="polite">
        {announce}
      </p>
    </section>
  );
}
