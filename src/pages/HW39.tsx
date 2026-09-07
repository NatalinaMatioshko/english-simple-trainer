import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { makeQuestions, speakBagPrompts } from "../data/lesson39";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson31.css";

export default function HW39() {
  const [qRows, setQRows] = useState(() => initWordOrderRows(makeQuestions));
  const [qChecked, setQChecked] = useState(false);
  const [bagText, setBagText] = useState("");

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
              Make questions, then write what you have got in your bag.
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
        </div>
        <WordOrderBoard
          items={makeQuestions}
          rows={qRows}
          setRows={setQRows}
          checked={qChecked}
          setChecked={setQChecked}
        />
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
          quizScore={qChecked ? makeQuestions.length : 0}
          showListeningCheck={false}
        />
      </section>
    </div>
  );
}
