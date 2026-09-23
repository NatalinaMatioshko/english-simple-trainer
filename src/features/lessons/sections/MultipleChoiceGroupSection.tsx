import { useState } from "react";
import type { MultipleChoiceGroupSection as GroupType } from "../../../types/lesson";

function selClass(checked: boolean, value: string, answer: string): string {
  if (!checked || !value) return "lw-select";
  if (value === answer) return "lw-select is-ok";
  return "lw-select is-err";
}

export function MultipleChoiceGroupSection({
  section,
}: {
  section: GroupType;
}) {
  const [answers, setAnswers] = useState(() =>
    Array(section.items.length).fill(""),
  );
  const [checked, setChecked] = useState(false);
  const score = section.items.filter((item, i) => answers[i] === item.correctAnswer)
    .length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      {section.chips && section.chips.length > 0 ? (
        <div className="lw-chip-bank" aria-label="Word box">
          {section.chips.map((word) => (
            <span key={word} className="lw-chip">
              {word}
            </span>
          ))}
        </div>
      ) : null}
      <div className="lw-drill-list">
        {section.items.map((item, i) => (
          <div key={item.id} className="lw-drill-row">
            <strong className="lw-drill-prompt">
              {i + 1}. {item.prompt}
            </strong>
            <span className="lw-drill-arrow" aria-hidden="true">
              →
            </span>
            <select
              value={answers[i]}
              onChange={(e) => {
                setChecked(false);
                const next = [...answers];
                next[i] = e.target.value;
                setAnswers(next);
              }}
              className={selClass(checked, answers[i], item.correctAnswer)}
              aria-label={item.prompt}
            >
              <option value="">___</option>
              {item.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        ))}
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
          <span className="lw-muted">
            {score} / {section.items.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAnswers(section.items.map((item) => item.correctAnswer));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAnswers(Array(section.items.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
