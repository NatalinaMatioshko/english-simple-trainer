import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { drillSelClass } from "../../../components/lesson31/drillSelClass";
import "../../../styles/lesson42.css";

type Pair = {
  id: string;
  a: string;
  b: string;
  blueA: string;
  blueB: string;
  answer: "same" | "different";
};

type Props = {
  items?: Pair[];
  tip?: string;
};

function highlightBlue(text: string, blue: string) {
  const parts = text.split(blue);
  return parts.map((part, pi, arr) =>
    pi < arr.length - 1 ? (
      <span key={`${blue}-${pi}`}>
        {part}
        <span className="l42-blue">{blue}</span>
      </span>
    ) : (
      <span key={`${blue}-end-${pi}`}>{part}</span>
    ),
  );
}

/** Pronunciation same/different with blue-highlighted words (reusable). */
export function SameOrDifferentSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
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
      <div className="l42-do-sound-list">
        {items.map((item, i) => {
          const val = ans[i] ?? "";
          const attempted = val.trim().length > 0;
          return (
            <div key={item.id} className="l42-do-sound-card">
              <p>
                <strong>{item.id}.</strong> A:{" "}
                {highlightBlue(item.a, item.blueA)}
              </p>
              <p>B: {highlightBlue(item.b, item.blueB)}</p>
              <label className="l42-do-sound-pick">
                <select
                  value={val}
                  onChange={(e) => {
                    setChecked(false);
                    const next = [...ans];
                    next[i] = e.target.value;
                    setAns(next);
                  }}
                  className={drillSelClass(checked, val, item.answer)}
                  aria-label={`Same or different ${item.id}`}
                >
                  <option value="">—</option>
                  <option value="same">same</option>
                  <option value="different">different</option>
                </select>
              </label>
              {checked && attempted && val !== item.answer ? (
                <span className="lw-tip">{item.answer}</span>
              ) : null}
            </div>
          );
        })}
      </div>
      {props.tip ? <p className="lw-section-desc">{props.tip}</p> : null}
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
            setAns(items.map((g) => g.answer));
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
    </section>
  );
}
