import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { drillSelClass } from "../../../components/lesson31/drillSelClass";

type MatchItem = {
  id: string;
  prompt: string;
  answer: string;
};

type MatchOption = {
  id: string;
  label: string;
};

type Props = {
  items?: MatchItem[];
  options?: MatchOption[];
  leftHeading?: string;
  rightHeading?: string;
};

/** Match numbered prompts (1–n) with lettered replies (a–e). */
export function PhraseMatchSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
  const options = props.options ?? [];
  const [ans, setAns] = useState(() => Array(items.length).fill(""));
  const [checked, setChecked] = useState(false);
  const score = items.filter((item, i) => ans[i] === item.answer).length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="lw-phrase-match">
        <div className="lw-phrase-col">
          {props.leftHeading ? (
            <p className="lw-phrase-heading">{props.leftHeading}</p>
          ) : null}
          <ol className="lw-phrase-list">
            {items.map((item, i) => {
              const val = ans[i] ?? "";
              return (
                <li key={item.id}>
                  <span className="lw-phrase-prompt">
                    <strong>{item.id}.</strong> {item.prompt}
                  </span>{" "}
                  <select
                    value={val}
                    onChange={(e) => {
                      setChecked(false);
                      const next = [...ans];
                      next[i] = e.target.value;
                      setAns(next);
                    }}
                    className={drillSelClass(checked, val, item.answer)}
                    aria-label={`Match for ${item.id}`}
                  >
                    <option value="">—</option>
                    {options.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.id}
                      </option>
                    ))}
                  </select>
                  {checked && val && val !== item.answer ? (
                    <span className="lw-tip">{item.answer}</span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="lw-phrase-col">
          {props.rightHeading ? (
            <p className="lw-phrase-heading">{props.rightHeading}</p>
          ) : null}
          <ul className="lw-phrase-options">
            {options.map((opt) => (
              <li key={opt.id}>
                <strong>{opt.id}.</strong> {opt.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lw-actions">
        <button
          type="button"
          className="lw-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked ? (
          <span className="lw-muted" aria-hidden="true">
            {score} / {items.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(items.map((item) => item.answer));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(Array(items.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked ? `${score} correct, ${items.length - score} incorrect.` : ""}
      </p>
    </section>
  );
}
