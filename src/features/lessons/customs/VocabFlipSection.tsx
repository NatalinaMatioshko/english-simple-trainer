import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { speakEnglish } from "../../../utils/speech";
import "../../../styles/lesson22.css";

type Card = {
  front: string;
  back: string;
  example?: string;
  speak?: string;
};

type Props = {
  cards?: Card[];
  frontLabel?: string;
  backLabel?: string;
};

/** UA↔EN flip cards (reusable vocab warm-up). */
export function VocabFlipSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const cards = props.cards ?? [];
  const frontLabel = props.frontLabel ?? "Українською";
  const backLabel = props.backLabel ?? "English";
  const [flipped, setFlipped] = useState<number[]>([]);
  const [announce, setAnnounce] = useState("");

  const toggle = (idx: number) => {
    const open = flipped.includes(idx);
    if (!open && cards[idx]?.speak) speakEnglish(cards[idx].speak!);
    const next = open
      ? flipped.filter((i) => i !== idx)
      : [...flipped, idx];
    setFlipped(next);
    const card = cards[idx];
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
              key={`${c.front}-${c.back}`}
              type="button"
              className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
              onClick={() => toggle(idx)}
              aria-pressed={isFlipped}
              aria-label={
                isFlipped
                  ? `${backLabel}: ${c.back}. Press to hide.`
                  : `${frontLabel}: ${c.front}. Press to reveal.`
              }
            >
              <div className="l22-vocab-inner" aria-hidden="true">
                <div className="l22-vocab-face l22-vocab-front">
                  <span className="l22-vocab-label">{frontLabel}</span>
                  <strong>{c.front}</strong>
                  <span className="l22-vocab-hint">tap → English</span>
                </div>
                <div className="l22-vocab-face l22-vocab-back">
                  <span className="l22-vocab-label">{backLabel}</span>
                  <strong>{c.back}</strong>
                  {c.example ? <em>{c.example}</em> : null}
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
