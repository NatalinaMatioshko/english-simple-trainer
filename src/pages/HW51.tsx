import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  hwMakeQuestions,
  hwQuestionWordOptions,
  hwQuestionWords,
} from "../content/lessons/lesson-51/activities";
import { placeFlashcards } from "../content/lessons/lesson-51/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[‘’ʼ']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?…]+$/g, "");
}

function textOk(value: string, answers: readonly string[]): boolean {
  const v = normText(value);
  return v !== "" && answers.some((a) => normText(a) === v);
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

/** Homework for Lesson 51 — places · question words · questions · writing. */
export default function HW51() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(placeFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [wordAns, setWordAns] = useState<Record<string, string>>({});
  const [wordChecked, setWordChecked] = useState(false);
  const wordScore = hwQuestionWords.filter(
    (q) => (wordAns[q.id] ?? "") === q.answer,
  ).length;

  const [qAns, setQAns] = useState<Record<string, string>>({});
  const [qChecked, setQChecked] = useState(false);
  const qScore = hwMakeQuestions.filter((q) =>
    textOk(qAns[q.id] ?? "", q.answers),
  ).length;

  const [writing, setWriting] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 51</p>
        <h1>A nice place</h1>
        <p className="lead">
          Place words · question words · make questions · write about a nice
          place.
        </p>

        <section id="hw51-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Places and directions</h2>
            <p className="lead">Say the English word first, then tap to check.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {placeFlashcards.map((card, idx) => {
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

        <section id="hw51-words" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Question words</p>
            <h2>Choose the question word</h2>
            <p className="lead">Read the answer. Which question word is correct?</p>
          </div>
          <ol className="l22-gap-list">
            {hwQuestionWords.map((q) => {
              const value = wordAns[q.id] ?? "";
              return (
                <li key={q.id}>
                  <label>
                    <select
                      value={value}
                      className={drillSelClass(wordChecked, value, q.answer)}
                      onChange={(e) => {
                        setWordChecked(false);
                        setWordAns((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }));
                      }}
                      aria-label={`Question word for: ${q.after}`}
                    >
                      <option value="">—</option>
                      {hwQuestionWordOptions.map((o) => (
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
            checked={wordChecked}
            score={wordScore}
            total={hwQuestionWords.length}
            onCheck={() => setWordChecked(true)}
            onReset={() => {
              setWordAns({});
              setWordChecked(false);
            }}
          />
        </section>

        <section id="hw51-questions" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Questions</p>
            <h2>Make questions for the answers</h2>
            <p className="lead">Write a question for the part in [brackets].</p>
          </div>
          <ol className="l22-gap-list">
            {hwMakeQuestions.map((q) => {
              const val = qAns[q.id] ?? "";
              const ok = textOk(val, q.answers);
              return (
                <li key={q.id}>
                  <input
                    className={inputCls(qChecked, val, ok)}
                    style={{ width: "min(100%, 22rem)" }}
                    value={val}
                    onChange={(e) => {
                      setQChecked(false);
                      setQAns((prev) => ({ ...prev, [q.id]: e.target.value }));
                    }}
                    placeholder="…?"
                    aria-label={`Question for: ${q.after}`}
                  />
                  <span> {q.after}</span>
                  {qChecked && !ok ? (
                    <p className="l22-muted">→ {q.answers[0]}?</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={qChecked}
            score={qScore}
            total={hwMakeQuestions.length}
            onCheck={() => setQChecked(true)}
            onReset={() => {
              setQAns({});
              setQChecked(false);
            }}
          />
        </section>

        <section id="hw51-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Write</p>
            <h2>A nice place in your country</h2>
            <p className="lead">
              Write 5–7 sentences: the name, where it is, what there is, when
              you go, who you go with, what you like about it.
            </p>
          </div>
          <textarea
            className="l22-textarea"
            rows={7}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder={
              "My nice place is … It’s in the … of Ukraine.\nThere are … and …\nI usually go there in … with …"
            }
          />
        </section>

        <HomeworkSubmit
          lessonId="51"
          writing={writing}
          quizDone={wordChecked && qChecked}
          quizScore={wordScore + qScore}
        />
      </div>
    </div>
  );
}
