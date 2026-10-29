import type { ReactNode } from "react";
import type { CustomSection } from "../../../types/lesson";
import { speakEnglish } from "../../../utils/speech";
import "./highlightSentences.css";

type Sentence = {
  id: string;
  text: string;
  /** Words or phrases to highlight (exact substrings of text) */
  highlight: string[];
};

type Props = {
  sentences?: Sentence[];
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Split text into plain parts and tappable highlighted words. */
function renderSentence(s: Sentence): ReactNode[] {
  if (s.highlight.length === 0) return [s.text];
  const re = new RegExp(`(${s.highlight.map(escapeRegExp).join("|")})`, "g");
  return s.text.split(re).map((part, i) =>
    s.highlight.includes(part) ? (
      <button
        key={`${s.id}-${i}`}
        type="button"
        className="hs-word"
        onClick={() => speakEnglish(part)}
        aria-label={`${part} — listen`}
      >
        {part}
      </button>
    ) : (
      <span key={`${s.id}-${i}`}>{part}</span>
    ),
  );
}

/** Numbered sentences with highlighted words; tap a word (or 🔊) to hear it. */
export function HighlightSentencesSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const sentences = props.sentences ?? [];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <ol className="hs-list">
        {sentences.map((s) => (
          <li key={s.id} className="hs-row">
            <span className="hs-text">{renderSentence(s)}</span>
            <button
              type="button"
              className="hs-say"
              onClick={() => speakEnglish(s.text)}
              aria-label={`Listen: ${s.text}`}
              title="Listen to the sentence"
            >
              🔊
            </button>
          </li>
        ))}
      </ol>
      {section.note ? <p className="lw-section-desc">{section.note}</p> : null}
    </section>
  );
}
