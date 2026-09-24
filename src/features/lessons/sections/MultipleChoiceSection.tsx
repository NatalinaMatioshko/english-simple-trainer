import { useState } from "react";
import type { MultipleChoiceSection as MCType } from "../../../types/lesson";

export function MultipleChoiceSection({ section }: { section: MCType }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const ok = selected === section.correctAnswer;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <p className="lw-mc-prompt">{section.prompt}</p>
      <div className="lw-mc-options" role="group">
        {section.options.map((opt) => {
          const on = selected === opt;
          let cls = "lw-mc-btn";
          if (on) cls += " is-selected";
          if (checked && opt === section.correctAnswer) cls += " is-ok";
          if (checked && on && !ok) cls += " is-err";
          return (
            <button
              key={opt}
              type="button"
              className={cls}
              onClick={() => {
                setChecked(false);
                setSelected(opt);
              }}
              aria-pressed={on}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className="lw-actions">
        <button
          type="button"
          className="lw-check-btn"
          onClick={() => setChecked(true)}
          disabled={!selected}
        >
          Check
        </button>
        {checked ? (
          <span className="lw-muted">
            {ok ? "Correct" : `Answer: ${section.correctAnswer}`}
          </span>
        ) : null}
      </div>
      {checked && section.explanation ? (
        <blockquote className="lw-note">
          <p>{section.explanation}</p>
        </blockquote>
      ) : null}
    </section>
  );
}
