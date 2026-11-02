import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  hwMiniDialogues,
  hwOpposites,
  hwQuestions,
  withQuestionMark,
} from "../content/lessons/lesson-53/activities";
import { adjectiveFlashcards } from "../content/lessons/lesson-53/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

/** Homework for Lesson 53 — adjectives · opposites · was/were · questions · writing. */
export default function HW53() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(adjectiveFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [oppAns, setOppAns] = useState<Record<string, string>>({});
  const [oppChecked, setOppChecked] = useState(false);
  const oppScore = hwOpposites.filter((o) =>
    matchesAnyAnswer(oppAns[o.id] ?? "", [o.answer]),
  ).length;

  const [dlgAns, setDlgAns] = useState<Record<string, string>>({});
  const [dlgChecked, setDlgChecked] = useState(false);
  const dlgScore = hwMiniDialogues.filter((d) => (dlgAns[d.id] ?? "") === d.answer).length;

  const [qAns, setQAns] = useState<Record<string, string>>({});
  const [qChecked, setQChecked] = useState(false);
  const qScore = hwQuestions.filter((q) =>
    matchesAnyAnswer(qAns[q.id] ?? "", withQuestionMark(q.answers)),
  ).length;

  const [writing, setWriting] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 53</p>
        <h1>How was it?</h1>
        <p className="lead">
          Adjectives · opposites · was / were questions and answers · write
          about your weekend or holiday.
        </p>

        <section id="hw53-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Adjectives</h2>
            <p className="lead">Say the English word first, then tap to check.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {adjectiveFlashcards.map((card, idx) => {
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

        <section id="hw53-opposites" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Opposites</p>
            <h2>Write the opposite</h2>
            <p className="lead">Write one adjective in each gap.</p>
          </div>
          <ol className="l22-gap-list">
            {hwOpposites.map((o) => {
              const val = oppAns[o.id] ?? "";
              const ok = matchesAnyAnswer(val, [o.answer]);
              return (
                <li key={o.id}>
                  <span>{o.before} </span>
                  <input
                    className={gapInputClass(oppChecked, val, ok)}
                    style={{ width: "min(100%, 9rem)" }}
                    value={val}
                    onChange={(e) => {
                      setOppChecked(false);
                      setOppAns((prev) => ({ ...prev, [o.id]: e.target.value }));
                    }}
                    aria-label={`${o.before} … ${o.after}`}
                  />
                  <span>{o.after}</span>
                  {oppChecked && val.trim() && !ok ? (
                    <p className="l22-muted">→ {o.answer}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={oppChecked}
            score={oppScore}
            total={hwOpposites.length}
            onCheck={() => setOppChecked(true)}
            onReset={() => {
              setOppAns({});
              setOppChecked(false);
            }}
          />
        </section>

        <section id="hw53-dialogues" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · was / were</p>
            <h2>Complete the mini-dialogues</h2>
            <p className="lead">Read the whole dialogue first — the answer tells you the word.</p>
          </div>
          <ol className="l22-gap-list">
            {hwMiniDialogues.map((d) => {
              const value = dlgAns[d.id] ?? "";
              return (
                <li key={d.id}>
                  <label>
                    <span>{d.before} </span>
                    <select
                      value={value}
                      className={drillSelClass(dlgChecked, value, d.answer)}
                      onChange={(e) => {
                        setDlgChecked(false);
                        setDlgAns((prev) => ({ ...prev, [d.id]: e.target.value }));
                      }}
                      aria-label={`${d.before} … ${d.after}`}
                    >
                      <option value="">—</option>
                      {d.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <span> {d.after}</span>
                  </label>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={dlgChecked}
            score={dlgScore}
            total={hwMiniDialogues.length}
            onCheck={() => setDlgChecked(true)}
            onReset={() => {
              setDlgAns({});
              setDlgChecked(false);
            }}
          />
        </section>

        <section id="hw53-questions" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Questions</p>
            <h2>Make questions using the prompts</h2>
            <p className="lead">
              Example: <strong>it / hot / yesterday? → Was it hot yesterday?</strong>
            </p>
          </div>
          <ol className="l22-gap-list">
            {hwQuestions.map((q) => {
              const val = qAns[q.id] ?? "";
              const ok = matchesAnyAnswer(val, withQuestionMark(q.answers));
              return (
                <li key={q.id}>
                  <span>{q.prompt} → </span>
                  <input
                    className={gapInputClass(qChecked, val, ok)}
                    style={{ width: "min(100%, 22rem)" }}
                    value={val}
                    onChange={(e) => {
                      setQChecked(false);
                      setQAns((prev) => ({ ...prev, [q.id]: e.target.value }));
                    }}
                    aria-label={`Question: ${q.prompt}`}
                  />
                  {qChecked && val.trim() && !ok ? (
                    <p className="l22-muted">→ {q.answers[0]}?</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={qChecked}
            score={qScore}
            total={hwQuestions.length}
            onCheck={() => setQChecked(true)}
            onReset={() => {
              setQAns({});
              setQChecked(false);
            }}
          />
        </section>

        <section id="hw53-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Write</p>
            <h2>How was your last weekend or holiday?</h2>
            <p className="lead">
              Write 5–7 sentences. Say where you were, who you were with and
              what it was like. Use was / were, there was / there were and
              adjectives from the lesson.
            </p>
          </div>
          <textarea
            className="l22-textarea"
            rows={7}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder={
              "My last weekend was great. I was at the lake with my friends.\nIt was hot and sunny. There weren’t many people there…"
            }
          />
        </section>

        <HomeworkSubmit
          lessonId="53"
          writing={writing}
          quizDone={oppChecked && dlgChecked && qChecked}
          quizScore={oppScore + dlgScore + qScore}
        />
      </div>
    </div>
  );
}
