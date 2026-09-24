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

  const toggle = (idx: number) => {
    const open = flipped.includes(idx);
    if (!open && cards[idx]?.speak) speakEnglish(cards[idx].speak!);
    setFlipped((prev) =>
      open ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
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
              aria-label={`${c.front} · ${c.back}`}
            >
              <div className="l22-vocab-inner">
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
    </section>
  );
}
