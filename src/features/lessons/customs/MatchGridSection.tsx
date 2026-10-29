import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { matchesAnyAnswer } from "../../../utils/text";
import "./matchGrid.css";

type GridItem = {
  /** Letter shown in bold (a, b, …) */
  id: string;
  /** What to match, e.g. a number */
  label: string;
  answer: string;
};

type Props = {
  /** Word box, shown above the grid and used as select options */
  box?: string[];
  items?: GridItem[];
  /** Columns on wide screens (items fill each column top to bottom) */
  columns?: number;
  /** "select" = choose from the box (default), "type" = write the word */
  mode?: "select" | "type";
};

function selClass(checked: boolean, value: string, answer: string): string {
  if (!checked || !value) return "lw-select";
  return value === answer ? "lw-select is-ok" : "lw-select is-err";
}

/** Typed answers: case / spaces / final full stop ignored; "twenty first" = "twenty-first". */
function typedOk(value: string, answer: string): boolean {
  return matchesAnyAnswer(value, [answer, answer.replace(/-/g, " ")]);
}

function inputClass(checked: boolean, value: string, ok: boolean): string {
  if (!checked || !value.trim()) return "lw-gap-input";
  return ok ? "lw-gap-input is-ok" : "lw-gap-input is-err";
}

/** Compact grid: letter + prompt + select per cell, filled column by column. */
export function MatchGridSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const box = props.box ?? [];
  const items = props.items ?? [];
  const columns = Math.max(1, props.columns ?? 4);
  const typed = props.mode === "type";
  const perColumn = Math.ceil(items.length / columns);
  const chunks = Array.from({ length: columns }, (_, c) =>
    items.slice(c * perColumn, (c + 1) * perColumn),
  ).filter((col) => col.length > 0);

  const [ans, setAns] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const isOk = (it: GridItem) => {
    const val = ans[it.id] ?? "";
    return typed ? typedOk(val, it.answer) : val === it.answer;
  };
  const score = items.filter(isOk).length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      {box.length > 0 ? (
        <div className="mg-box" aria-label="Word box">
          {box.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      ) : null}

      <div className="mg-grid">
        {chunks.map((col, c) => (
          <ul key={c} className="mg-col">
            {col.map((it) => {
              const val = ans[it.id] ?? "";
              return (
                <li key={it.id} className="mg-cell">
                  <span className="mg-id">{it.id}</span>
                  <span className="mg-label">{it.label}</span>
                  {typed ? (
                    <input
                      type="text"
                      value={val}
                      className={inputClass(checked, val, isOk(it))}
                      onChange={(e) => {
                        setChecked(false);
                        setAns((prev) => ({ ...prev, [it.id]: e.target.value }));
                      }}
                      placeholder="…"
                      autoComplete="off"
                      spellCheck={false}
                      aria-label={`${it.id} ${it.label} in words`}
                    />
                  ) : (
                    <select
                      value={val}
                      className={selClass(checked, val, it.answer)}
                      onChange={(e) => {
                        setChecked(false);
                        setAns((prev) => ({ ...prev, [it.id]: e.target.value }));
                      }}
                      aria-label={`${it.id} ${it.label}`}
                    >
                      <option value="">—</option>
                      {box.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      <div className="lw-actions">
        <button type="button" className="lw-check-btn" onClick={() => setChecked(true)}>
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
            setAns(Object.fromEntries(items.map((it) => [it.id, it.answer])));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns({});
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked ? `${score} correct, ${items.length - score} not correct yet.` : ""}
      </p>
    </section>
  );
}
