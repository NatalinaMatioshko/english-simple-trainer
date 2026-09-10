import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { makeQuestions, speakBagPrompts } from "../data/lesson39";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson35.css";

const exampleQuestion = makeQuestions[0];
const writeQuestions = makeQuestions.slice(1);

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function answersFor(item: (typeof makeQuestions)[number]): string[] {
  const main = item.answer;
  const noYour = main.replace("Has your ", "Has ");
  return noYour === main ? [main] : [main, noYour];
}

function textOk(value: string, item: (typeof makeQuestions)[number]): boolean {
  const v = normText(value);
  return v !== "" && answersFor(item).some((a) => normText(a) === v);
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

export default function HW39() {
  const [qAns, setQAns] = useState(() =>
    Array(writeQuestions.length).fill(""),
  );
  const [qChecked, setQChecked] = useState(false);
  const [bagText, setBagText] = useState("");

  const qScore = writeQuestions.filter((item, i) =>
    textOk(qAns[i] ?? "", item),
  ).length;

  const checks = useMemo(
    () => ({
      questions: qChecked,
      writing: bagText.trim().length > 20,
    }),
    [bagText, qChecked],
  );
  const allDone = Object.values(checks).every(Boolean);

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 39</p>
            <h1>Have you got it?</h1>
            <p className="lesson22-subtitle">
              Write the questions, then write what you have got in your bag.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-39">
              ← Lesson 39
            </Link>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Questions</p>
          <h2>Have you got…?</h2>
          <p className="lesson22-section-desc">
            Write the full question. Number 1 is an example.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">7a</strong> Make questions using the
          prompts.
        </p>
        <div className="l26-drill-list">
          <div className="hw35-fix-row">
            <p className="hw35-fix-wrong">
              <strong>1.</strong> {exampleQuestion.scramble}
            </p>
            <p className="hw39-example">{exampleQuestion.answer}</p>
          </div>
          {writeQuestions.map((item, i) => {
            const val = qAns[i] ?? "";
            const ok = qChecked && textOk(val, item);
            return (
              <div key={item.scramble} className="hw35-fix-row">
                <p className="hw35-fix-wrong">
                  <strong>{i + 2}.</strong> {item.scramble}
                </p>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setQChecked(false);
                    const next = [...qAns];
                    next[i] = e.target.value;
                    setQAns(next);
                  }}
                  className={inputCls(qChecked, val, ok)}
                  placeholder="Have / Has … got …?"
                  aria-label={`Question ${i + 2}`}
                />
                {qChecked && !ok && (
                  <span className="hw35-tip">{item.answer}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setQChecked(true)}
          >
            Check
          </button>
          {qChecked && (
            <span className="l22-score">
              {qScore} / {writeQuestions.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setQAns(writeQuestions.map((item) => item.answer));
              setQChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setQAns(Array(writeQuestions.length).fill(""));
              setQChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1.1rem" }}>
          <strong className="l31-ex-num">7b</strong> Ask your teacher the
          questions and answer them.
        </p>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Writing</p>
          <h2>What&apos;s in your bag?</h2>
          <p className="lesson22-section-desc">
            Choose a trip. Write what you have got / haven&apos;t got. Send the
            text to your teacher.
          </p>
        </div>
        <ul className="l22-goals-list">
          {speakBagPrompts.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <label className="lesson22-section-desc" htmlFor="hw39-bag">
          My bag
        </label>
        <textarea
          id="hw39-bag"
          className="l22-gap-input"
          rows={7}
          value={bagText}
          onChange={(e) => setBagText(e.target.value)}
          placeholder="This is my bag for a holiday. I've got my passport. I haven't got a coat…"
          style={{ width: "100%", margin: "0.4rem 0 0" }}
        />
      </section>

      <section className="lesson22-block panel">
        <HomeworkSubmit
          lessonId="39"
          writing={bagText}
          quizDone={allDone}
          quizScore={qChecked ? qScore : 0}
          showListeningCheck={false}
        />
      </section>
    </div>
  );
}
