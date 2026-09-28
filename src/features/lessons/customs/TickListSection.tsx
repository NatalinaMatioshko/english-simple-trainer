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
  /** Shuffle item order once on mount (listening tick lists) */
  shuffle?: boolean;
};

function shuffleItems<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Tick / checkbox list with check feedback (listening “what do you hear”). */
export function TickListSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const tipCorrect = props.tipCorrect ?? "You hear this";
  const tipWrong = props.tipWrong ?? "Not in the audio";
  const [items] = useState(() => {
    const source = props.items ?? [];
    return props.shuffle ? shuffleItems(source) : source;
  });
  const [tick, setTick] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);

  const score = items.filter(
    (item) => Boolean(tick[item.id]) === item.correct,
  ).length;
  const incorrectCount = items.length - score;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div
        className={`l42-heard-list${items.length > 8 ? " l42-heard-list--cols" : ""}`}
        role="group"
        aria-label={section.title}
      >
        {items.map((item) => {
          const on = Boolean(tick[item.id]);
          const match = on === item.correct;
          const wrong = checked && !match;
          const ok = checked && match;
          const statusId = `${section.id}-tick-${item.id}-status`;
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
                aria-describedby={checked ? statusId : undefined}
              />
              <span>
                {/^\d+$/.test(item.id) ? `${item.id}. ` : ""}
                {item.label}
              </span>
              {checked ? (
                <span
                  id={statusId}
                  className={
                    match ? "lw-item-status is-ok" : "lw-item-status is-err"
                  }
                >
                  {match ? "Correct" : "Incorrect"}
                  {!match ? (
                    <>
                      {" · "}
                      {item.correct ? tipCorrect : tipWrong}
                    </>
                  ) : null}
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
          <span className="lw-muted" aria-hidden="true">
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
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked
          ? `${score} correct, ${incorrectCount} incorrect.`
          : ""}
      </p>
    </section>
  );
}
