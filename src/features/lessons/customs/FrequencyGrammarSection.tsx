import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "../../../styles/lesson25.css";

type ExampleLine = {
  id: string;
  /** Full example; mark the frequency adverb with *word* */
  text: string;
};

type ChoiceItem = {
  id: string;
  before: string;
  after: string;
  options: string[];
  answer: string;
};

type Props = {
  boxTitle?: string;
  examples?: ExampleLine[];
  questions?: ExampleLine[];
  choices?: ChoiceItem[];
};

function renderStarBold(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <strong key={i} className="lw-freq-bold">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
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

/**
 * Interactive frequency-adverb grammar box:
 * examples + tap before/after · How often / How many.
 */
export function FrequencyGrammarSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const boxTitle = props.boxTitle ?? "Present simple with frequency adverbs";
  const examples = props.examples ?? [];
  const questions = props.questions ?? [];
  const choices = props.choices ?? [];
  const [ans, setAns] = useState(() => Array(choices.length).fill(""));
  const [checked, setChecked] = useState(false);
  const score = choices.filter((item, i) => ans[i] === item.answer).length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="l25-grammar-box lw-freq-grammar-box">
        <div className="l25-grammar-label">{boxTitle}</div>
        <ul className="lw-freq-grammar-examples">
          {examples.map((ex) => (
            <li key={ex.id}>{renderStarBold(ex.text)}</li>
          ))}
        </ul>
        {questions.length > 0 ? (
          <ul className="lw-freq-grammar-examples lw-freq-grammar-qs">
            {questions.map((q) => (
              <li key={q.id}>{renderStarBold(q.text)}</li>
            ))}
          </ul>
        ) : null}

        <ol className="lw-alt-list lw-freq-grammar-choices">
          {choices.map((item, i) => {
            const val = ans[i] ?? "";
            return (
              <li key={item.id}>
                <span className="lw-freq-choice-n">{i + 1}</span> {item.before}{" "}
                {item.options.map((opt, oi) => (
                  <span key={opt}>
                    {oi > 0 ? <span className="lw-alt-slash"> / </span> : null}
                    <button
                      type="button"
                      className={altClass(checked, val, opt, item.answer)}
                      onClick={() => {
                        setChecked(false);
                        const next = [...ans];
                        next[i] = opt;
                        setAns(next);
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
            {score} / {choices.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(choices.map((c) => c.answer));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(Array(choices.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked ? `${score} correct, ${choices.length - score} incorrect.` : ""}
      </p>
    </section>
  );
}
