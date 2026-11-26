import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { matchesAnyAnswer } from "../../../utils/text";
import "./likeIngGrammarBox.css";

type GapItem = {
  id: string;
  /** Preferred book key shown by “Show answers” */
  answer: string;
  /** Accepted spellings / sensible alternatives */
  answers?: readonly string[];
};

type Props = {
  boxTitle?: string;
  gaps?: GapItem[];
};

function accepted(item: GapItem): readonly string[] {
  return item.answers && item.answers.length > 0 ? item.answers : [item.answer];
}

function gapClass(checked: boolean, value: string, item: GapItem): string {
  if (!checked || !value.trim()) return "lig-gap";
  return matchesAnyAnswer(value, accepted(item))
    ? "lig-gap is-ok"
    : "lig-gap is-err";
}

function Gap({
  index,
  item,
  value,
  checked,
  onChange,
}: {
  index: number;
  item: GapItem;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  const n = index + 1;
  return (
    <>
      <span className="lig-n" aria-hidden="true">
        {n}
      </span>
      <input
        type="text"
        className={gapClass(checked, value, item)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Gap ${n}`}
        autoComplete="off"
        spellCheck={false}
      />
    </>
  );
}

/**
 * Interactive Roadmap grammar box: like/enjoy/love/hate + -ing
 * with 8 typed gaps + spelling rules for the -ing form.
 */
export function LikeIngGrammarBoxSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const boxTitle = props.boxTitle ?? "like / enjoy / love / hate + -ing";
  const gaps = props.gaps ?? [];
  const [ans, setAns] = useState(() => Array(gaps.length).fill(""));
  const [checked, setChecked] = useState(false);

  const setGap = (index: number, value: string) => {
    setChecked(false);
    const next = [...ans];
    next[index] = value;
    setAns(next);
  };

  const score = gaps.filter((item, i) =>
    matchesAnyAnswer(ans[i] ?? "", accepted(item)),
  ).length;

  const g = (i: number) => gaps[i];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="lig-box">
        <div className="lig-label">{boxTitle}</div>

        <div className="lig-block">
          <h3 className="lig-heading">Statements</h3>
          <div className="lig-scroll">
            <table className="lig-table">
              <tbody>
                <tr>
                  <td className="lig-sign lig-sign--pos">+</td>
                  <td className="lig-subj" rowSpan={2}>
                    I / You / We / They
                  </td>
                  <td className="lig-verb">like / enjoy / love / hate</td>
                  <td className="lig-gap-cell">
                    {g(0) ? (
                      <Gap
                        index={0}
                        item={g(0)}
                        value={ans[0] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(0, v)}
                      />
                    ) : null}{" "}
                    the dog.
                  </td>
                </tr>
                <tr>
                  <td className="lig-sign lig-sign--neg">−</td>
                  <td className="lig-verb">don&apos;t like</td>
                  <td className="lig-gap-cell">
                    {g(1) ? (
                      <Gap
                        index={1}
                        item={g(1)}
                        value={ans[1] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(1, v)}
                      />
                    ) : null}{" "}
                    TV.
                  </td>
                </tr>
                <tr>
                  <td className="lig-sign lig-sign--pos">+</td>
                  <td className="lig-subj" rowSpan={2}>
                    He / She / It
                  </td>
                  <td className="lig-verb">likes / enjoys / loves / hates</td>
                  <td className="lig-gap-cell">
                    {g(2) ? (
                      <Gap
                        index={2}
                        item={g(2)}
                        value={ans[2] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(2, v)}
                      />
                    ) : null}{" "}
                    books.
                  </td>
                </tr>
                <tr>
                  <td className="lig-sign lig-sign--neg">−</td>
                  <td className="lig-verb">doesn&apos;t like</td>
                  <td className="lig-gap-cell">
                    {g(3) ? (
                      <Gap
                        index={3}
                        item={g(3)}
                        value={ans[3] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(3, v)}
                      />
                    ) : null}{" "}
                    in the park.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lig-block">
          <h3 className="lig-heading">Yes / No questions</h3>
          <div className="lig-scroll">
            <table className="lig-table">
              <tbody>
                <tr>
                  <td className="lig-verb">Do</td>
                  <td className="lig-subj">I / you / we / they like</td>
                  <td className="lig-gap-cell">
                    {g(4) ? (
                      <Gap
                        index={4}
                        item={g(4)}
                        value={ans[4] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(4, v)}
                      />
                    ) : null}{" "}
                    books?
                  </td>
                </tr>
                <tr>
                  <td className="lig-verb">Does</td>
                  <td className="lig-subj">he / she / it like</td>
                  <td className="lig-gap-cell">
                    {g(5) ? (
                      <Gap
                        index={5}
                        item={g(5)}
                        value={ans[5] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(5, v)}
                      />
                    ) : null}{" "}
                    exercise?
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lig-block">
          <h3 className="lig-heading">Wh- questions</h3>
          <div className="lig-scroll">
            <table className="lig-table">
              <tbody>
                <tr>
                  <td className="lig-subj" rowSpan={2}>
                    What
                  </td>
                  <td className="lig-verb">do you like</td>
                  <td className="lig-gap-cell">
                    {g(6) ? (
                      <Gap
                        index={6}
                        item={g(6)}
                        value={ans[6] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(6, v)}
                      />
                    ) : null}{" "}
                    at the weekend?
                  </td>
                </tr>
                <tr>
                  <td className="lig-verb">does she like</td>
                  <td className="lig-gap-cell">
                    {g(7) ? (
                      <Gap
                        index={7}
                        item={g(7)}
                        value={ans[7] ?? ""}
                        checked={checked}
                        onChange={(v) => setGap(7, v)}
                      />
                    ) : null}{" "}
                    at the weekend?
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lig-block">
          <h3 className="lig-heading">-ing form</h3>
          <div className="lig-scroll">
            <table className="lig-table lig-ing-table">
              <tbody>
                <tr>
                  <td>
                    do <span className="lig-arrow">→</span> doing
                  </td>
                  <td className="lig-rule">
                    verb + <strong>-ing</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    make <span className="lig-arrow">→</span> making
                  </td>
                  <td className="lig-rule">
                    Drop the final <strong>-e</strong> in verbs ending in{" "}
                    <strong>-e</strong>.
                  </td>
                </tr>
                <tr>
                  <td>
                    trave<span className="lig-u">l</span>{" "}
                    <span className="lig-arrow">→</span> travelling
                  </td>
                  <td className="lig-rule">
                    Double the final consonant in verbs ending in consonant +
                    vowel + consonant. BUT visit → visit<strong>ing</strong>
                  </td>
                </tr>
              </tbody>
            </table>
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
          <span className="lw-muted" aria-hidden="true">
            {score} / {gaps.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(gaps.map((item) => item.answer));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(Array(gaps.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked
          ? `${score} correct, ${gaps.length - score} incorrect.`
          : ""}
      </p>
    </section>
  );
}
