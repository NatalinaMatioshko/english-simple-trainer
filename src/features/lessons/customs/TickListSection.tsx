import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "../../../styles/lesson42.css";

type TickItem = {
  id: string;
  label: string;
  /** Whether the item should be ticked (e.g. heard in audio) */
  correct: boolean;
};

type Props = {
  items?: TickItem[];
  tipCorrect?: string;
  tipWrong?: string;
};

/** Tick / checkbox list with check feedback (listening “what do you hear”). */
export function TickListSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
  const tipCorrect = props.tipCorrect ?? "You hear this";
  const tipWrong = props.tipWrong ?? "Not in the audio";
  const [tick, setTick] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);

  const score = items.filter(
    (item) => Boolean(tick[item.id]) === item.correct,
  ).length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="l42-heard-list">
        {items.map((item) => {
          const on = Boolean(tick[item.id]);
          const wrong = checked && on !== item.correct;
          const ok = checked && on === item.correct && item.correct;
          return (
            <label
              key={item.id}
              className={`l42-heard-row${wrong ? " is-err" : ""}${
                ok ? " is-ok" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => {
                  setChecked(false);
                  setTick((prev) => ({
                    ...prev,
                    [item.id]: !prev[item.id],
                  }));
                }}
              />
              <span>
                {item.id}. {item.label}
              </span>
              {checked && wrong ? (
                <span className="lw-tip">
                  {item.correct ? tipCorrect : tipWrong}
                </span>
              ) : null}
            </label>
          );
        })}
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
            {score} / {items.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            const next: Record<string, boolean> = {};
            for (const item of items) next[item.id] = item.correct;
            setTick(next);
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setTick({});
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
