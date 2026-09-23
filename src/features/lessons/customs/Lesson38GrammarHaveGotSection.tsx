import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "../../../styles/lesson25.css";
import "../../../styles/lesson38.css";

type GrammarItem = {
  id: string;
  prompt: string;
  options: readonly string[];
  answer: string;
};

type Props = {
  items?: GrammarItem[];
};

function selClass(checked: boolean, value: string, answer: string): string {
  if (!checked || !value) return "lw-select";
  if (value === answer) return "lw-select is-ok";
  return "lw-select is-err";
}

/**
 * L38-specific interactive have/has got grammar box (+ / − rows).
 * Not a generic table — layout is tied to this textbook box.
 */
export function Lesson38GrammarHaveGotSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
  const [ans, setAns] = useState(() => Array(items.length).fill(""));
  const [checked, setChecked] = useState(false);
  const score = items.filter((item, i) => ans[i] === item.answer).length;

  const g0 = items[0];
  const g1 = items[1];
  const g2 = items[2];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="l38-grammar-scroll">
        <div className="l25-grammar-box">
          <div className="l25-grammar-label">have / has got</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+</span>
              <div className="l38-have-lines">
                {g0 ? (
                  <p>
                    <span className="l38-have-subj">I / You / We / They</span>
                    <select
                      aria-label="1 have or has"
                      value={ans[0]}
                      onChange={(e) => {
                        setChecked(false);
                        const next = [...ans];
                        next[0] = e.target.value;
                        setAns(next);
                      }}
                      className={selClass(checked, ans[0], g0.answer)}
                    >
                      <option value="">1 ______</option>
                      {g0.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span>got brown hair.</span>
                  </p>
                ) : null}
                {g1 ? (
                  <p>
                    <span className="l38-have-subj">He / She / It</span>
                    <select
                      aria-label="2 have or has"
                      value={ans[1]}
                      onChange={(e) => {
                        setChecked(false);
                        const next = [...ans];
                        next[1] = e.target.value;
                        setAns(next);
                      }}
                      className={selClass(checked, ans[1], g1.answer)}
                    >
                      <option value="">2 ______</option>
                      {g1.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span>got green eyes.</span>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--neg">
              <span className="l25-gr-sign">−</span>
              <div className="l38-have-lines">
                <p>
                  <span className="l38-have-subj">I / You / We / They</span>
                  <span>
                    <strong>haven&apos;t</strong> got blue eyes.
                  </span>
                </p>
                {g2 ? (
                  <p>
                    <span className="l38-have-subj">He / She / It</span>
                    <select
                      aria-label="3 hasn't or haven't"
                      value={ans[2]}
                      onChange={(e) => {
                        setChecked(false);
                        const next = [...ans];
                        next[2] = e.target.value;
                        setAns(next);
                      }}
                      className={selClass(checked, ans[2], g2.answer)}
                    >
                      <option value="">3 ______</option>
                      {g2.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span>got red hair.</span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
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
