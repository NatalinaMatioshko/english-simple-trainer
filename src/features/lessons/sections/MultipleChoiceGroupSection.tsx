import { useState } from "react";
import type { MultipleChoiceGroupSection as GroupType } from "../../../types/lesson";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function selClass(checked: boolean, value: string, answer: string): string {
  if (!checked || !value) return "lw-select";
  if (value === answer) return "lw-select is-ok";
  return "lw-select is-err";
}

function optionLetter(index: number): string {
  return LETTERS[index] ?? String(index + 1);
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
  const useAb = section.choiceMode === "ab";

  const setAnswer = (index: number, value: string) => {
    setChecked(false);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
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
      {section.chips && section.chips.length > 0 ? (
        <div className="lw-chip-bank" aria-label="Word box">
          {section.chips.map((word) => (
            <span key={word} className="lw-chip">
              {word}
            </span>
          ))}
        </div>
      ) : null}
      {useAb ? (
        <ol className="lw-ab-list">
          {section.items.map((item, i) => {
            const selected = answers[i];
            return (
              <li key={item.id} className="lw-ab-item">
                <p className="lw-ab-prompt">
                  <span className="lw-ab-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  {item.prompt}
                </p>
                <div
                  className="lw-ab-options"
                  role="radiogroup"
                  aria-label={`${i + 1}. ${item.prompt}`}
                >
                  {item.options.map((opt, oi) => {
                    const letter = optionLetter(oi);
                    const on = selected === opt;
                    const isCorrect = opt === item.correctAnswer;
                    let cls = "lw-ab-btn";
                    if (on) cls += " is-selected";
                    if (checked && isCorrect) cls += " is-ok";
                    if (checked && on && !isCorrect) cls += " is-err";
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        className={cls}
                        onClick={() => setAnswer(i, opt)}
                      >
                        <span className="lw-ab-letter" aria-hidden="true">
                          {letter}
                        </span>
                        <span className="lw-ab-text">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
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
                onChange={(e) => setAnswer(i, e.target.value)}
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
      )}
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
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked ? `${score} correct, ${section.items.length - score} incorrect.` : ""}
      </p>
    </section>
  );
}
