import { useState } from "react";
import { Link } from "react-router-dom";
import {
  articleGapsB,
  grammarGapsB,
  photoQsB,
} from "../data/lesson31";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

function drillSelClass(
  checked: boolean,
  value: string,
  answer: string,
): string {
  if (!checked) return "l25-cr-sel";
  if (value === answer) return "l25-cr-sel l25-cr-sel--ok";
  if (value) return "l25-cr-sel l25-cr-sel--err";
  return "l25-cr-sel";
}

export default function HW33() {
  const [gramAns, setGramAns] = useState(() =>
    Array(grammarGapsB.length).fill(""),
  );
  const [gramChecked, setGramChecked] = useState(false);
  const [photoAns, setPhotoAns] = useState(() =>
    Array(photoQsB.length).fill(""),
  );
  const [photoChecked, setPhotoChecked] = useState(false);
  const [articleAns, setArticleAns] = useState(() =>
    Array(articleGapsB.length).fill(""),
  );
  const [articleChecked, setArticleChecked] = useState(false);

  const [draft, setDraft] = useState("");

  const gramScore = grammarGapsB.filter(
    (d, i) => gramAns[i] === d.answer,
  ).length;
  const photoScore = photoQsB.filter((d, i) => photoAns[i] === d.answer).length;
  const articleScore = articleGapsB.filter(
    (d, i) => articleAns[i] === d.answer,
  ).length;

  const task1Done = gramChecked;
  const task1Score = gramScore;
  const task1Total = grammarGapsB.length;

  const task2Done = photoChecked && articleChecked;
  const task2Score = photoScore + articleScore;
  const task2Total = photoQsB.length + articleGapsB.length;

  const allDone = task1Done && task2Done;
  const totalScore = task1Score + task2Score;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 33</p>
            <h1>Is there wifi?</h1>
            <p className="lesson22-subtitle">
              Підсумок уроку: <strong>Is there / Are there</strong>,{" "}
              <strong>There is / There are</strong> і квартира в Brighton.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-33">
              ← Lesson 33
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Is there a …?</span>
          <span>Are there any …?</span>
          <span>a / an</span>
          <span>Lesson 33 recap</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Grammar</p>
          <h2>Is there / Are there · There is / There are</h2>
          <p className="lesson22-section-desc">
            Повтори grammar box з уроку 33. Обери правильне слово.
          </p>
        </div>
        <div className="l26-drill-list">
          {grammarGapsB.map((d, i) => (
            <div key={d.prompt} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.prompt}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={gramAns[i]}
                onChange={(e) => {
                  setGramChecked(false);
                  const next = [...gramAns];
                  next[i] = e.target.value;
                  setGramAns(next);
                }}
                className={drillSelClass(gramChecked, gramAns[i], d.answer)}
                aria-label={d.prompt}
              >
                <option value="">___</option>
                {d.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setGramChecked(true)}
          >
            Check
          </button>
          {gramChecked && (
            <span className="l22-score">
              {gramScore} / {grammarGapsB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGramAns(Array(grammarGapsB.length).fill(""));
              setGramChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Flat in Brighton</p>
          <h2>Answer about the flat · a / an</h2>
          <p className="lesson22-section-desc">
            Згадай квартиру з уроку 33 (photos A–D). Відповідай на питання, потім
            обери <strong>a</strong> або <strong>an</strong>.
          </p>
        </div>

        <h3 className="l22-listen-subtitle">2a · Answer the questions</h3>
        <div className="l26-drill-list">
          {photoQsB.map((d, i) => (
            <div key={d.q} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.q}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={photoAns[i]}
                onChange={(e) => {
                  setPhotoChecked(false);
                  const next = [...photoAns];
                  next[i] = e.target.value;
                  setPhotoAns(next);
                }}
                className={drillSelClass(photoChecked, photoAns[i], d.answer)}
                aria-label={d.q}
              >
                <option value="">___</option>
                {d.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPhotoChecked(true)}
          >
            Check 2a
          </button>
          {photoChecked && (
            <span className="l22-score">
              {photoScore} / {photoQsB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPhotoAns(Array(photoQsB.length).fill(""));
              setPhotoChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.35rem" }}>
          2b · a or an?
        </h3>
        <div className="l26-drill-list">
          {articleGapsB.map((d, i) => (
            <div key={d.blank} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.blank}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={articleAns[i]}
                onChange={(e) => {
                  setArticleChecked(false);
                  const next = [...articleAns];
                  next[i] = e.target.value;
                  setArticleAns(next);
                }}
                className={drillSelClass(
                  articleChecked,
                  articleAns[i],
                  d.answer,
                )}
                aria-label={d.blank}
              >
                <option value="">___</option>
                {d.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setArticleChecked(true)}
          >
            Check 2b
          </button>
          {articleChecked && (
            <span className="l22-score">
              {articleScore} / {articleGapsB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setArticleAns(Array(articleGapsB.length).fill(""));
              setArticleChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Speak (optional).</strong> Скажи викладачу 3 речення про
            свою квартиру: <em>There is a …</em> / <em>There are …</em> /{" "}
            <em>Is there a …?</em>
          </p>
        </blockquote>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Напиши коротко, що було складно. Потім надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw33-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw33-writing"
          className="hw27-textarea"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Task 1 grammar: ${task1Done ? `${task1Score}/${task1Total}` : "not finished"}
Task 2 flat: ${task2Done ? `${task2Score}/${task2Total}` : "not finished"}
What was hard: …`}
        />
        <HomeworkSubmit
          lessonId="33"
          writing={[
            draft.trim() || "(no extra notes)",
            `Task 1 · Is/Are there: ${task1Done ? `${task1Score}/${task1Total}` : "not finished"}`,
            `Task 2 · Flat: ${task2Done ? `${task2Score}/${task2Total}` : "not finished"}`,
            `  2a questions: ${photoChecked ? `${photoScore}/${photoQsB.length}` : "—"}`,
            `  2b a/an: ${articleChecked ? `${articleScore}/${articleGapsB.length}` : "—"}`,
          ].join("\n")}
          quizDone={allDone}
          quizScore={allDone ? totalScore : undefined}
          showListeningCheck={false}
          description="Після перевірки вправ натисни «Надіслати». Додай ім'я."
        />
      </section>
    </div>
  );
}
