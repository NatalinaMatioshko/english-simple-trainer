import { useState } from "react";
import { Link } from "react-router-dom";
import {
  beOrDoDrill,
  matchAnswerQ,
  wasWereDrill,
  wasWereScramble,
} from "../data/lesson32";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson32.css";

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

export default function HW32() {
  const [beDoAns, setBeDoAns] = useState(() =>
    Array(beOrDoDrill.length).fill(""),
  );
  const [beDoChecked, setBeDoChecked] = useState(false);
  const [matchAns, setMatchAns] = useState(() =>
    Array(matchAnswerQ.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);

  const [wasAns, setWasAns] = useState(() =>
    Array(wasWereDrill.length).fill(""),
  );
  const [wasChecked, setWasChecked] = useState(false);
  const [scrambleAns, setScrambleAns] = useState(() =>
    Array(wasWereScramble.length).fill(""),
  );
  const [scrambleChecked, setScrambleChecked] = useState(false);

  const [draft, setDraft] = useState("");

  const beDoScore = beOrDoDrill.filter((d, i) => beDoAns[i] === d.answer).length;
  const matchScore = matchAnswerQ.filter(
    (d, i) => matchAns[i] === d.correct,
  ).length;
  const wasScore = wasWereDrill.filter((d, i) => wasAns[i] === d.answer).length;
  const scrambleScore = wasWereScramble.filter(
    (d, i) => scrambleAns[i] === d.answer,
  ).length;

  const task1Done = beDoChecked && matchChecked;
  const task1Score = beDoScore + matchScore;
  const task1Total = beOrDoDrill.length + matchAnswerQ.length;

  const task2Done = wasChecked && scrambleChecked;
  const task2Score = wasScore + scrambleScore;
  const task2Total = wasWereDrill.length + wasWereScramble.length;

  const allDone = task1Done && task2Done;
  const totalScore = task1Score + task2Score;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 32</p>
            <h1>WH-questions · was / were</h1>
            <p className="lesson22-subtitle">
              Підсумок уроку: <strong>be / do / does</strong> у WH-питаннях і{" "}
              <strong>was / were</strong> у минулому.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-32">
              ← Lesson 32
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Who · What · Where</span>
          <span>do / does / is</span>
          <span>was / were</span>
          <span>Lesson 32 recap</span>
        </div>
      </section>

      {/* Task 1 · WH-questions */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · WH-questions</p>
          <h2>be or do / does · match the answer</h2>
          <p className="lesson22-section-desc">
            Повтори Part 1 з уроку 32. Спочатку обери <strong>is / are / do / does</strong>,
            потім знайди питання для відповіді.
          </p>
        </div>

        <h3 className="l22-listen-subtitle">1a · Choose the word</h3>
        <div className="l26-drill-list">
          {beOrDoDrill.map((d, i) => (
            <div key={d.prompt} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.prompt}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={beDoAns[i]}
                onChange={(e) => {
                  setBeDoChecked(false);
                  const next = [...beDoAns];
                  next[i] = e.target.value;
                  setBeDoAns(next);
                }}
                className={drillSelClass(beDoChecked, beDoAns[i], d.answer)}
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
            onClick={() => setBeDoChecked(true)}
          >
            Check 1a
          </button>
          {beDoChecked && (
            <span className="l22-score">
              {beDoScore} / {beOrDoDrill.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setBeDoAns(Array(beOrDoDrill.length).fill(""));
              setBeDoChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.35rem" }}>
          1b · Which question matches the answer?
        </h3>
        <div className="l26-drill-list">
          {matchAnswerQ.map((d, i) => (
            <div key={d.answer} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.answer}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={matchAns[i]}
                onChange={(e) => {
                  setMatchChecked(false);
                  const next = [...matchAns];
                  next[i] = e.target.value;
                  setMatchAns(next);
                }}
                className={drillSelClass(matchChecked, matchAns[i], d.correct)}
                aria-label={`Match: ${d.answer}`}
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
            onClick={() => setMatchChecked(true)}
          >
            Check 1b
          </button>
          {matchChecked && (
            <span className="l22-score">
              {matchScore} / {matchAnswerQ.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setMatchAns(Array(matchAnswerQ.length).fill(""));
              setMatchChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Task 2 · was / were */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · was / were</p>
          <h2>Past of to be · choose &amp; order</h2>
          <p className="lesson22-section-desc">
            Повтори Part 2 з уроку 32. Обери <strong>was / were</strong>, потім
            склади речення зі слів.
          </p>
        </div>

        <h3 className="l22-listen-subtitle">2a · was or were?</h3>
        <div className="l26-drill-list">
          {wasWereDrill.map((d, i) => (
            <div key={d.prompt} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.prompt}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={wasAns[i]}
                onChange={(e) => {
                  setWasChecked(false);
                  const next = [...wasAns];
                  next[i] = e.target.value;
                  setWasAns(next);
                }}
                className={drillSelClass(wasChecked, wasAns[i], d.answer)}
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
            onClick={() => setWasChecked(true)}
          >
            Check 2a
          </button>
          {wasChecked && (
            <span className="l22-score">
              {wasScore} / {wasWereDrill.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWasAns(Array(wasWereDrill.length).fill(""));
              setWasChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.35rem" }}>
          2b · Put the words in order
        </h3>
        <div className="l26-drill-list">
          {wasWereScramble.map((d, i) => (
            <div key={d.scramble} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.scramble}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={scrambleAns[i]}
                onChange={(e) => {
                  setScrambleChecked(false);
                  const next = [...scrambleAns];
                  next[i] = e.target.value;
                  setScrambleAns(next);
                }}
                className={drillSelClass(
                  scrambleChecked,
                  scrambleAns[i],
                  d.answer,
                )}
                aria-label={`Order: ${d.scramble}`}
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
            onClick={() => setScrambleChecked(true)}
          >
            Check 2b
          </button>
          {scrambleChecked && (
            <span className="l22-score">
              {scrambleScore} / {wasWereScramble.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setScrambleAns(Array(wasWereScramble.length).fill(""));
              setScrambleChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Speak (optional).</strong> Скажи викладачу 3 речення: одне
            WH-питання з <em>do/does</em>, одне з <em>was/were</em>, одну
            відповідь на питання про вчора.
          </p>
        </blockquote>
      </section>

      {/* Submit */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Напиши коротко, що було складно. Потім надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw32-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw32-writing"
          className="hw27-textarea"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Task 1 WH: ${task1Done ? `${task1Score}/${task1Total}` : "not finished"}
Task 2 was/were: ${task2Done ? `${task2Score}/${task2Total}` : "not finished"}
What was hard: …`}
        />
        <HomeworkSubmit
          lessonId="32"
          writing={[
            draft.trim() || "(no extra notes)",
            `Task 1 · be/do + match: ${task1Done ? `${task1Score}/${task1Total}` : "not finished"}`,
            `  1a be/do: ${beDoChecked ? `${beDoScore}/${beOrDoDrill.length}` : "—"}`,
            `  1b match: ${matchChecked ? `${matchScore}/${matchAnswerQ.length}` : "—"}`,
            `Task 2 · was/were: ${task2Done ? `${task2Score}/${task2Total}` : "not finished"}`,
            `  2a was/were: ${wasChecked ? `${wasScore}/${wasWereDrill.length}` : "—"}`,
            `  2b order: ${scrambleChecked ? `${scrambleScore}/${wasWereScramble.length}` : "—"}`,
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
