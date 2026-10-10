import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import {
  bridgeGaps,
  yesterdayTranslate,
  hwPastQuestions,
} from "../content/lessons/lesson-49/activities";
import { yesterdayFlashcards } from "../content/lessons/lesson-49/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
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

/** Homework for Lesson 49 — Yesterday speaking project. */
export default function HW49() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(yesterdayFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [bridgeAns, setBridgeAns] = useState<Record<string, string>>({});
  const [bridgeChecked, setBridgeChecked] = useState(false);
  const bridgeScore = bridgeGaps.filter((g) =>
    textOk(bridgeAns[g.id] ?? "", g.answers),
  ).length;

  const [trAns, setTrAns] = useState<Record<string, string>>({});
  const [trChecked, setTrChecked] = useState(false);
  const trScore = yesterdayTranslate.filter((g) =>
    textOk(trAns[g.id] ?? "", g.answers),
  ).length;

  const [writeStory, setWriteStory] = useState("");
  const [writeAnswers, setWriteAnswers] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 49</p>
        <h1>Yesterday</h1>
        <p className="lead">
          6–8 sentences · underline Past verbs · voice ~45s · answer 5 questions.
        </p>

        <section id="hw49-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Yesterday phrases</h2>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {yesterdayFlashcards.map((card, idx) => {
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

        <section id="hw49-bridge" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Bridge</p>
            <h2>Today → yesterday</h2>
          </div>
          <ol className="l22-gap-list">
            {bridgeGaps.map((g) => {
              const val = bridgeAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  <span>{g.before} </span>
                  <input
                    className={inputCls(bridgeChecked, val, ok)}
                    value={val}
                    list={`hw49-b-${g.id}`}
                    onChange={(e) => {
                      setBridgeChecked(false);
                      setBridgeAns((prev) => ({
                        ...prev,
                        [g.id]: e.target.value,
                      }));
                    }}
                  />{" "}
                  {g.after}
                  <datalist id={`hw49-b-${g.id}`}>
                    {g.options.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={bridgeChecked}
            score={bridgeScore}
            total={bridgeGaps.length}
            onCheck={() => setBridgeChecked(true)}
            onReset={() => {
              setBridgeAns({});
              setBridgeChecked(false);
            }}
          />
        </section>

        <section id="hw49-tr" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Write</p>
            <h2>Yesterday · 6–8 sentences</h2>
          </div>
          <p className="lesson22-section-desc">
            Practice lines (optional check). Then write your full story below and
            underline Past Simple verbs in your notebook / message.
          </p>
          <ol className="l22-gap-list">
            {yesterdayTranslate.map((g) => {
              const val = trAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  <span className="l26-label" style={{ display: "block" }}>
                    {g.ua}
                  </span>
                  <input
                    className={inputCls(trChecked, val, ok)}
                    style={{ width: "min(100%, 28rem)", marginTop: "0.35rem" }}
                    value={val}
                    onChange={(e) => {
                      setTrChecked(false);
                      setTrAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                  />
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={trChecked}
            score={trScore}
            total={yesterdayTranslate.length}
            onCheck={() => setTrChecked(true)}
            onReset={() => {
              setTrAns({});
              setTrChecked(false);
            }}
          />
          <label className="l26-block" style={{ marginTop: "1rem" }}>
            <span className="l26-label">
              Your full “Yesterday” (6–8 sentences). Use was, got up, had, went,
              worked…
            </span>
            <textarea
              className="l26-textarea"
              rows={7}
              value={writeStory}
              onChange={(e) => setWriteStory(e.target.value)}
              placeholder="Yesterday I got up at… I had breakfast…"
            />
          </label>
        </section>

        <section id="hw49-qs" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Answer + voice</p>
            <h2>Five questions</h2>
          </div>
          <label className="l26-block">
            <span className="l26-label">
              Answer in writing:{" "}
              {hwPastQuestions.map((q, i) => (
                <span key={q}>
                  {i + 1}) {q}{" "}
                </span>
              ))}
            </span>
            <textarea
              className="l26-textarea"
              rows={6}
              value={writeAnswers}
              onChange={(e) => setWriteAnswers(e.target.value)}
              placeholder="1) I got up at…&#10;2) I had…&#10;…"
            />
          </label>
          <p className="lead" style={{ marginTop: "0.75rem" }}>
            Record a voice message: “My yesterday” — about 45 seconds. Sequence
            matters more than perfect forms. Send to your teacher.
          </p>
        </section>

        <HomeworkSubmit
          lessonId="49"
          writing={[writeStory, writeAnswers].filter(Boolean).join("\n\n")}
          quizDone={bridgeChecked && trChecked}
          quizScore={bridgeScore + trScore}
          showListeningCheck={false}
          title="HW49 · Yesterday"
        />
      </div>
    </div>
  );
}
