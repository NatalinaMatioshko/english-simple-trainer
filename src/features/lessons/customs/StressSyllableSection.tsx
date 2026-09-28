import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "../../../styles/lesson26.css";

type StressItem = {
  id: string;
  /** Text before the blue word */
  before: string;
  /** Syllable chunks of the blue word (tappable) */
  syllables: string[];
  /** Indexes of stressed syllables (0-based) */
  stressed: number[];
  /** Text after the blue word */
  after: string;
};

type Props = {
  items?: StressItem[];
};

/** Tap stressed syllables in blue words (underline-stress exercises). */
export function StressSyllableSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
  const [sel, setSel] = useState<number[][]>(() => items.map(() => []));
  const [checked, setChecked] = useState(false);

  const score = items.filter((item, i) => {
    const picked = [...(sel[i] ?? [])].sort((a, b) => a - b);
    const want = [...item.stressed].sort((a, b) => a - b);
    return (
      picked.length === want.length &&
      picked.every((v, k) => v === want[k])
    );
  }).length;

  function toggle(row: number, syl: number) {
    setChecked(false);
    setSel((prev) => {
      const next = prev.map((r) => [...r]);
      const cur = next[row] ?? [];
      next[row] = cur.includes(syl)
        ? cur.filter((x) => x !== syl)
        : [...cur, syl].sort((a, b) => a - b);
      return next;
    });
  }

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="l26-stress-list" role="group" aria-label={section.title}>
        {items.map((item, i) => {
          const picked = sel[i] ?? [];
          const ok =
            picked.length === item.stressed.length &&
            [...picked]
              .sort((a, b) => a - b)
              .every(
                (v, k) =>
                  v === [...item.stressed].sort((a, b) => a - b)[k],
              );
          return (
            <div key={item.id} className="l26-stress-row lw-stress-sent">
              <span className="l26-stress-letter">{item.id}</span>
              <div className="l26-stress-parts">
                {item.before ? (
                  <span className="lw-stress-plain">{item.before}</span>
                ) : null}
                {item.syllables.map((part, pi) => {
                  const on = picked.includes(pi);
                  const should = item.stressed.includes(pi);
                  let cls = "l26-stress-syl lw-stress-blue";
                  if (on) cls += " l26-stress-syl--on";
                  if (checked) {
                    if (should && on) cls += " l26-stress-syl--ok";
                    else if (on && !should) cls += " l26-stress-syl--err";
                    else if (should && !on) cls += " l26-stress-syl--miss";
                  }
                  return (
                    <span key={`${item.id}-${pi}`} className="l26-stress-chunk">
                      <button
                        type="button"
                        className={cls}
                        onClick={() => toggle(i, pi)}
                        aria-pressed={on}
                        aria-label={`${item.id} syllable ${part}`}
                      >
                        {part}
                      </button>
                    </span>
                  );
                })}
                {item.after ? (
                  <span className="lw-stress-plain">{item.after}</span>
                ) : null}
              </div>
              {checked ? (
                <span
                  className={
                    ok
                      ? "l26-stress-mark l26-stress-mark--ok"
                      : "l26-stress-mark"
                  }
                  aria-hidden="true"
                >
                  {ok ? "✓" : "✗"}
                </span>
              ) : null}
            </div>
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
            setSel(items.map((item) => [...item.stressed]));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setSel(items.map(() => []));
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
