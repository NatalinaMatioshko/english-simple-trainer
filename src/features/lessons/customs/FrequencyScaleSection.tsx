import { useState, type ReactNode } from "react";
import type { CustomSection } from "../../../types/lesson";
import { drillSelClass } from "../../../components/lesson31/drillSelClass";

type GapStep = {
  type: "gap";
  id: string;
  /** Shown under the select, e.g. "0%" */
  percent?: string;
  answer: string;
};

type FixedStep = { type: "fixed"; label: string };

type ScaleSentence = {
  id: string;
  text: string;
  /** Words to bold in the sentence (gap answers on the page) */
  bold?: string[];
};

type Props = {
  /** Left-to-right markers; use type gap | fixed */
  steps?: Array<GapStep | FixedStep>;
  options?: string[];
  /** Sentences a–d shown under the diagram (same exercise) */
  sentences?: ScaleSentence[];
};

function renderWithBold(text: string, bold: string[] = []): ReactNode {
  if (bold.length === 0) return text;
  const escaped = bold
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!escaped) return text;
  const re = new RegExp(`\\b(${escaped})\\b`, "gi");
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <strong key={`b-${key++}`} className="lw-freq-bold">
        {m[0]}
      </strong>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Visual 0–100% frequency adverb scale with select gaps + source sentences. */
export function FrequencyScaleSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const steps = props.steps ?? [];
  const sentences = props.sentences ?? [];
  const options = props.options ?? [
    "never",
    "sometimes",
    "often",
    "usually",
    "always",
  ];
  const gaps = steps.filter((s): s is GapStep => s.type === "gap");
  const [ans, setAns] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const score = gaps.filter((g) => (ans[g.id] ?? "") === g.answer).length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="lw-freq-scale" role="group" aria-label="Frequency scale">
        <div className="lw-freq-scale-bar" aria-hidden="true" />
        <div className="lw-freq-scale-steps">
          {steps.map((step) => {
            if (step.type === "fixed") {
              return (
                <div key={`fixed-${step.label}`} className="lw-freq-step is-fixed">
                  <strong>{step.label}</strong>
                </div>
              );
            }
            const val = ans[step.id] ?? "";
            return (
              <div key={step.id} className="lw-freq-step">
                {step.percent ? (
                  <span className="lw-freq-percent">{step.percent}</span>
                ) : (
                  <span className="lw-freq-percent lw-freq-percent--spacer">
                    &nbsp;
                  </span>
                )}
                <span className="lw-freq-gap-n" aria-hidden="true">
                  {step.id}
                </span>
                <select
                  value={val}
                  onChange={(e) => {
                    setChecked(false);
                    setAns((prev) => ({ ...prev, [step.id]: e.target.value }));
                  }}
                  className={drillSelClass(checked, val, step.answer)}
                  aria-label={`Frequency gap ${step.id}${step.percent ? ` (${step.percent})` : ""}`}
                >
                  <option value="">—</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {checked ? (
                  <span
                    className={
                      val === step.answer
                        ? "lw-item-status is-ok"
                        : "lw-item-status is-err"
                    }
                  >
                    {val === step.answer ? "Correct" : step.answer}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {sentences.length > 0 ? (
        <ol className="lw-freq-sentences" aria-label="Sentences from the radio programme">
          {sentences.map((s) => (
            <li key={s.id}>
              <span className="lw-freq-sent-id">{s.id}</span>{" "}
              {renderWithBold(s.text, s.bold)}
            </li>
          ))}
        </ol>
      ) : null}

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
            {score} / {gaps.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            const next: Record<string, string> = {};
            for (const g of gaps) next[g.id] = g.answer;
            setAns(next);
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
        {checked ? `You got ${score} out of ${gaps.length} correct.` : ""}
      </p>
    </section>
  );
}
