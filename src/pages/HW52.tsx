import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  hwDates,
  hwWasWere,
  wasWereOptions,
} from "../content/lessons/lesson-52/activities";
import { goodDayFlashcards } from "../content/lessons/lesson-52/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

/** Homework for Lesson 52 — months & ordinals · was/were · dates · writing. */
export default function HW52() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(goodDayFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [wwAns, setWwAns] = useState<Record<string, string>>({});
  const [wwChecked, setWwChecked] = useState(false);
  const wwScore = hwWasWere.filter((q) => (wwAns[q.id] ?? "") === q.answer).length;

  const [dateAns, setDateAns] = useState<Record<string, string>>({});
  const [dateChecked, setDateChecked] = useState(false);
  const dateScore = hwDates.filter((d) =>
    matchesAnyAnswer(dateAns[d.id] ?? "", d.answers),
  ).length;

  const [writing, setWriting] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 52</p>
        <h1>A good day</h1>
        <p className="lead">
          Months & ordinal numbers · was / were · dates in words · write about
          your good days.
        </p>

        <section id="hw52-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Months and ordinal numbers</h2>
            <p className="lead">Say the English word first, then tap to check.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {goodDayFlashcards.map((card, idx) => {
              const isFlipped = flip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => toggleFlip(idx)}
                  aria-pressed={isFlipped}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <span className="l22-vocab-label">Українською</span>
                      <strong>{card.front}</strong>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.back}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw52-was-were" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · was / were</p>
            <h2>Choose was, wasn’t, were or weren’t</h2>
          </div>
          <ol className="l22-gap-list">
            {hwWasWere.map((q) => {
              const value = wwAns[q.id] ?? "";
              return (
                <li key={q.id}>
                  <label>
                    <span>{q.before} </span>
                    <select
                      value={value}
                      className={drillSelClass(wwChecked, value, q.answer)}
                      onChange={(e) => {
                        setWwChecked(false);
                        setWwAns((prev) => ({ ...prev, [q.id]: e.target.value }));
                      }}
                      aria-label={`${q.before} … ${q.after}`}
                    >
                      <option value="">—</option>
                      {wasWereOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <span> {q.after}</span>
                  </label>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={wwChecked}
            score={wwScore}
            total={hwWasWere.length}
            onCheck={() => setWwChecked(true)}
            onReset={() => {
              setWwAns({});
              setWwChecked(false);
            }}
          />
        </section>

        <section id="hw52-dates" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Dates</p>
            <h2>Write the dates in words</h2>
            <p className="lead">
              Format: <strong>12th March → the twelfth of March</strong>
            </p>
          </div>
          <ol className="l22-gap-list">
            {hwDates.map((d) => {
              const val = dateAns[d.id] ?? "";
              const ok = matchesAnyAnswer(val, d.answers);
              return (
                <li key={d.id}>
                  <span>{d.date} → </span>
                  <input
                    className={gapInputClass(dateChecked, val, ok)}
                    style={{ width: "min(100%, 20rem)" }}
                    value={val}
                    onChange={(e) => {
                      setDateChecked(false);
                      setDateAns((prev) => ({ ...prev, [d.id]: e.target.value }));
                    }}
                    placeholder="the … of …"
                    aria-label={`${d.date} in words`}
                  />
                  {dateChecked && val.trim() && !ok ? (
                    <p className="l22-muted">→ {d.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={dateChecked}
            score={dateScore}
            total={hwDates.length}
            onCheck={() => setDateChecked(true)}
            onReset={() => {
              setDateAns({});
              setDateChecked(false);
            }}
          />
        </section>

        <section id="hw52-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Write</p>
            <h2>Two or three good days</h2>
            <p className="lead">
              Write about 2–3 good days from last year — 5–7 sentences in
              total. Say when, where, who with and what it was like. Use was /
              were and there was / there were.
            </p>
          </div>
          <textarea
            className="l22-textarea"
            rows={7}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder={
              "On the fifth of April, I was at a party with my friends. There was great music.\nIt was amazing!"
            }
          />
        </section>

        <HomeworkSubmit
          lessonId="52"
          writing={writing}
          quizDone={wwChecked && dateChecked}
          quizScore={wwScore + dateScore}
        />
      </div>
    </div>
  );
}
