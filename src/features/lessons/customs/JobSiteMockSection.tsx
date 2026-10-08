import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "./jobSiteMock.css";

type TipPair = {
  en: string;
  ua: string;
};

type Props = {
  siteName?: string;
  steps?: string[];
  tipLabel?: string;
  tipNote?: string;
  tipPairs?: TipPair[];
};

/** Book-style website mockup for ChooseYourJob.com (Lesson 47 · 2a). */
export function JobSiteMockSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const siteName = props.siteName ?? "ChooseYourJob.com";
  const steps = props.steps ?? [
    "Add your personal details (e.g. name, email address, etc.).",
    "Answer the questions.",
    "See which jobs we think are right for you!",
  ];
  const tipLabel = props.tipLabel ?? "Підказка";
  const tipNote = props.tipNote;
  const tipPairs = props.tipPairs ?? [];
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="l47-jobsite" aria-label={siteName}>
        <div className="l47-jobsite-brand">
          <span className="l47-jobsite-badge" aria-hidden="true">
            {/* Handshake mark — book-style logo in a white circle */}
            <svg
              className="l47-jobsite-handshake"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
              <path d="m21 3 1 11h-2" />
              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
              <path d="M3 4h8" />
            </svg>
          </span>
          <strong className="l47-jobsite-name">{siteName}</strong>
        </div>
        <ol className="l47-jobsite-steps">
          {steps.map((step, i) => (
            <li key={i}>
              <span className="l47-jobsite-n">{i + 1}.</span>
              <span className="l47-jobsite-step">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {tipPairs.length > 0 ? (
        <div className="l47-jobsite-tip">
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setTipOpen((v) => !v)}
            aria-expanded={tipOpen}
          >
            {tipOpen ? `Hide · ${tipLabel}` : tipLabel}
          </button>
          {tipOpen ? (
            <div className="l25-details-body l47-jobsite-tip-body">
              {tipNote ? <p className="l47-jobsite-tip-note">{tipNote}</p> : null}
              <ul className="l47-jobsite-tip-list">
                {tipPairs.map((pair) => (
                  <li key={pair.en}>
                    <p className="l47-jobsite-tip-en">{pair.en}</p>
                    <p className="l47-jobsite-tip-ua">{pair.ua}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
