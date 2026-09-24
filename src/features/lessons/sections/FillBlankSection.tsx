import { useState } from "react";
import type { FillBlankSection as FillBlankType } from "../../../types/lesson";

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ");
}

function selClass(checked: boolean, value: string, ok: boolean): string {
  if (!checked || !value) return "lw-select";
  if (ok) return "lw-select is-ok";
  return "lw-select is-err";
}

function altClass(
  checked: boolean,
  value: string,
  opt: string,
  answer: string,
): string {
  const on = value === opt;
  if (!checked) return `lw-alt${on ? " is-on" : ""}`;
  if (on && opt === answer) return "lw-alt is-ok";
  if (on) return "lw-alt is-err";
  if (opt === answer) return "lw-alt is-key";
  return "lw-alt";
}

export function FillBlankSection({ section }: { section: FillBlankType }) {
  const [answers, setAnswers] = useState(() =>
    Array(section.items.length).fill(""),
  );
  const [checked, setChecked] = useState(false);

  const score = section.items.filter((item, i) =>
    item.correctAnswers.some((a) => norm(a) === norm(answers[i] ?? "")),
  ).length;

  const useButtons = section.items.some(
    (item) => item.choiceMode === "buttons",
  );

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      {useButtons ? (
        <ol className="lw-alt-list">
          {section.items.map((item, i) => {
            const val = answers[i] ?? "";
            const answer = item.correctAnswers[0] ?? "";
            return (
              <li key={item.id}>
                {item.before}{" "}
                {(item.options ?? []).map((opt, oi) => (
                  <span key={opt}>
                    {oi > 0 ? <span className="lw-alt-slash"> / </span> : null}
                    <button
                      type="button"
                      className={altClass(checked, val, opt, answer)}
                      onClick={() => {
                        setChecked(false);
                        const next = [...answers];
                        next[i] = opt;
                        setAnswers(next);
                      }}
                    >
                      {opt}
                    </button>
                  </span>
                ))}{" "}
                {item.after}
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="lw-gap-list">
          {section.items.map((item, i) => {
            const val = answers[i] ?? "";
            const ok = item.correctAnswers.some((a) => norm(a) === norm(val));
            const useSelect = Boolean(item.options?.length);
            let inputCls = "lw-gap-input";
            if (checked && ok) inputCls += " is-ok";
            if (checked && val.trim() && !ok) inputCls += " is-err";
            return (
              <label key={item.id} className="lw-gap-row">
                <span className="lw-gap-line">
                  <strong>
                    {i + 1}. {item.before}
                  </strong>{" "}
                  {useSelect ? (
                    <select
                      value={val}
                      onChange={(e) => {
                        setChecked(false);
                        const next = [...answers];
                        next[i] = e.target.value;
                        setAnswers(next);
                      }}
                      className={selClass(checked, val, ok)}
                      aria-label={`Gap ${i + 1}`}
                    >
                      <option value="">___</option>
                      {item.options!.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className={inputCls}
                      value={val}
                      onChange={(e) => {
                        setChecked(false);
                        const next = [...answers];
                        next[i] = e.target.value;
                        setAnswers(next);
                      }}
                      aria-label={`Gap ${i + 1}`}
                    />
                  )}{" "}
                  {item.after}
                </span>
                {checked && !ok ? (
                  <span className="lw-tip">{item.correctAnswers[0]}</span>
                ) : null}
              </label>
            );
          })}
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
        {section.items.some((item) => item.options?.length) ? (
          <button
            type="button"
            className="lw-mini-btn"
            onClick={() => {
              setAnswers(
                section.items.map((item) => item.correctAnswers[0] ?? ""),
              );
              setChecked(true);
            }}
          >
            Show answers
          </button>
        ) : null}
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
