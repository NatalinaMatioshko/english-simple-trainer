import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "../../../styles/lesson25.css";
import "../../../styles/lesson31.css";
import "../../../styles/lesson38.css";

type FixGroup = { id: string; title: string; desc: string };
type FixLine = {
  id: string;
  group: string;
  uk: string;
  wrong: string;
  answers: readonly string[];
  tipUa: string;
  keepCase?: boolean;
  keepPunct?: boolean;
};

type Props = {
  groups?: FixGroup[];
  lines?: FixLine[];
};

function normalizeFix(
  s: string,
  keepCase = false,
  keepPunct = false,
): string {
  let base = s
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (!keepPunct) base = base.replace(/[?.!,]+$/g, "");
  if (!keepCase) base = base.toLowerCase();
  return base;
}

function isHwFixOk(
  value: string,
  answers: readonly string[],
  keepCase = false,
  keepPunct = false,
): boolean {
  const n = normalizeFix(value, keepCase, keepPunct);
  return (
    n !== "" &&
    answers.some((a) => normalizeFix(a, keepCase, keepPunct) === n)
  );
}

export function HomeworkFixSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const groups = props.groups ?? [];
  const lines = props.lines ?? [];

  const [ans, setAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(lines.map((l) => [l.id, l.wrong])),
  );
  const [checked, setChecked] = useState(false);
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [showKey, setShowKey] = useState(false);

  const score = lines.filter((line) =>
    isHwFixOk(
      ans[line.id] ?? "",
      line.answers,
      line.keepCase === true,
      line.keepPunct === true,
    ),
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
      {groups.map((g) => (
        <div key={g.id} className="l31-fix-group">
          <h3 className="l31-fix-group-title">
            {g.title}{" "}
            <span style={{ fontWeight: 500, color: "var(--color-text-muted)" }}>
              · {g.desc}
            </span>
          </h3>
          {lines
            .filter((line) => line.group === g.id)
            .map((line) => {
              const value = ans[line.id] ?? "";
              const ok = isHwFixOk(
                value,
                line.answers,
                line.keepCase === true,
                line.keepPunct === true,
              );
              const showHint = showKey || !!hints[line.id];
              return (
                <div key={line.id} className="l31-fix-line">
                  <p className="l38-hwfix-uk">
                    {line.id}. {line.uk}
                  </p>
                  <label
                    className="l31-fix-wrong"
                    htmlFor={`${section.id}-${line.id}`}
                  >
                    <span className="l31-fix-wrong-text">{line.wrong}</span>
                  </label>
                  <div className="l31-fix-row">
                    <input
                      id={`${section.id}-${line.id}`}
                      type="text"
                      className={`l31-fix-input${
                        checked ? (ok ? " is-ok" : " is-err") : ""
                      }`}
                      value={value}
                      onChange={(e) => {
                        setChecked(false);
                        setAns((prev) => ({
                          ...prev,
                          [line.id]: e.target.value,
                        }));
                      }}
                      spellCheck={false}
                      aria-label={`Correct: ${line.wrong}`}
                    />
                    <button
                      type="button"
                      className={`l31-fix-hint-btn${showHint ? " is-on" : ""}`}
                      onClick={() =>
                        setHints((prev) => ({
                          ...prev,
                          [line.id]: !prev[line.id],
                        }))
                      }
                      aria-pressed={showHint}
                    >
                      {showHint ? "Hide" : "Hint"}
                    </button>
                  </div>
                  {showHint ? (
                    <div className="l31-fix-reveal">
                      <span className="l31-fix-tip">{line.tipUa}</span>
                      <span className="l31-fix-answer">
                        ✓ {line.answers[0]}
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      ))}
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
            {score} / {lines.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            const next = !showKey;
            setShowKey(next);
            setHints(
              next
                ? Object.fromEntries(lines.map((l) => [l.id, true]))
                : {},
            );
          }}
        >
          {showKey ? "Hide answers" : "Show answers"}
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setChecked(false);
            setShowKey(false);
            setHints({});
            setAns(Object.fromEntries(lines.map((l) => [l.id, l.wrong])));
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
