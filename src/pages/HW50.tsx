import { useMemo, useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  requestDialogueGaps,
  requestR17Transcript,
  tomAnaWhoAgrees,
  SOUND_U6,
} from "../content/lessons/lesson-50/activities";
import { requestFlashcards } from "../content/lessons/lesson-50/vocabulary";
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
    .replace(/[.!?…]+$/g, "")
    .replace(/\s*\/\s*/g, " / ");
}

function textOk(value: string, answers: readonly string[]): boolean {
  const v = normText(value);
  if (!v) return false;
  return answers.some((a) => {
    const n = normText(a);
    if (n === v) return true;
    // Accept either side of "Sure. / No problem."
    const parts = n.split(" / ").map((p) => p.trim()).filter(Boolean);
    return parts.includes(v);
  });
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

function shuffle<T>(items: readonly T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Homework for Lesson 50 — chunks + Tom/Ana + dialogues 5a. */
export default function HW50() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(requestFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const quizCards = useMemo(() => shuffle(requestFlashcards), []);
  const [quizAns, setQuizAns] = useState<Record<string, string>>({});
  const [quizChecked, setQuizChecked] = useState(false);
  const quizScore = quizCards.filter((c) =>
    textOk(quizAns[c.back] ?? "", [c.back]),
  ).length;

  const [taAns, setTaAns] = useState<Record<string, string>>({});
  const [taChecked, setTaChecked] = useState(false);
  const [taScriptOpen, setTaScriptOpen] = useState(false);
  const taScore = tomAnaWhoAgrees.filter(
    (q) => (taAns[q.id] ?? "") === q.correctAnswer,
  ).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = requestDialogueGaps.filter((g) =>
    textOk(gapAns[g.id] ?? "", [g.answer]),
  ).length;

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 50</p>
        <h1>Make requests</h1>
        <p className="lead">
          Chunks · Tom / Ana · complete the conversations (5a).
        </p>

        <section id="hw50-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Chunks</p>
            <h2>Request language</h2>
            <p className="lead">
              Tap UA → EN if you need extra support.
            </p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {requestFlashcards.map((card, idx) => {
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

        <section id="hw50-quiz" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Test</p>
            <h2>UA → EN</h2>
            <p className="lead">
              Write the English chunk. Check with the flashcards if you need to.
            </p>
          </div>
          <ol className="l22-gap-list">
            {quizCards.map((card) => {
              const val = quizAns[card.back] ?? "";
              const ok = textOk(val, [card.back]);
              return (
                <li key={card.back}>
                  <span>{card.front} → </span>
                  <input
                    className={inputCls(quizChecked, val, ok)}
                    style={{ width: "min(100%, 22rem)" }}
                    value={val}
                    onChange={(e) => {
                      setQuizChecked(false);
                      setQuizAns((prev) => ({
                        ...prev,
                        [card.back]: e.target.value,
                      }));
                    }}
                    aria-label={`English for: ${card.front}`}
                  />
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={quizChecked}
            score={quizScore}
            total={quizCards.length}
            onCheck={() => setQuizChecked(true)}
            onReset={() => {
              setQuizAns({});
              setQuizChecked(false);
            }}
          />
        </section>

        <section id="hw50-tom-ana" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Who agrees — Tom or Ana?</p>
            <h2>Listen again</h2>
            <p className="lead">
              Who agrees to do the jobs? Write T (Tom) or A (Ana).
            </p>
          </div>
          <div className="l25-audio-item" style={{ marginBottom: "0.85rem" }}>
            <div className="l25-audio-meta">
              <span className="l25-audio-num">6.17</span>
              <div className="l25-audio-info">
                <span className="l25-audio-ex">3</span>
                <span className="l25-audio-title">Tom and Ana · requests</span>
              </div>
            </div>
            <audio
              controls
              className="l25-audio-ctrl"
              src={SOUND_U6(17)}
              preload="none"
              aria-label="6.17 Tom and Ana requests"
            />
            <button
              type="button"
              className="l25-cr-mini-btn"
              onClick={() => setTaScriptOpen((v) => !v)}
            >
              {taScriptOpen ? "Hide transcript" : "Transcript"}
            </button>
            {taScriptOpen ? (
              <div className="l25-details-body">
                <ol>
                  {requestR17Transcript.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
          <ol className="l22-gap-list">
            {tomAnaWhoAgrees.map((q) => {
              const value = taAns[q.id] ?? "";
              return (
                <li key={q.id}>
                  <label>
                    <span>{q.prompt} → </span>
                    <select
                      value={value}
                      className={drillSelClass(
                        taChecked,
                        value,
                        q.correctAnswer,
                      )}
                      onChange={(e) => {
                        setTaChecked(false);
                        setTaAns((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }));
                      }}
                      aria-label={q.prompt}
                    >
                      <option value="">—</option>
                      {q.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={taChecked}
            score={taScore}
            total={tomAnaWhoAgrees.length}
            onCheck={() => setTaChecked(true)}
            onReset={() => {
              setTaAns({});
              setTaChecked(false);
            }}
          />
        </section>

        <section id="hw50-gaps" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5a</p>
            <h2>Complete the conversations</h2>
            <p className="lead">
              Use phrases from the Useful phrases box.
            </p>
          </div>
          <p className="l22-muted" style={{ marginBottom: "0.65rem" }}>
            Can I · Can you · Sure · Yes, you can · I’m sorry, I can’t · I’m
            sorry, you can’t
          </p>
          <div className="l22-gap-list">
            {requestDialogueGaps.map((g) => {
              const value = gapAns[g.id] ?? "";
              return (
                <label key={g.id} className="l22-gap-row">
                  <span>
                    {g.before}
                    <select
                      className={drillSelClass(gapChecked, value, g.answer)}
                      value={value}
                      onChange={(e) => {
                        setGapChecked(false);
                        setGapAns((prev) => ({
                          ...prev,
                          [g.id]: e.target.value,
                        }));
                      }}
                      aria-label={`Gap ${g.id}`}
                    >
                      <option value="">—</option>
                      {g.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {g.after}
                  </span>
                </label>
              );
            })}
          </div>
          <CheckBar
            checked={gapChecked}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapChecked(false);
              setGapAns({});
            }}
            score={gapScore}
            total={requestDialogueGaps.length}
          />
        </section>

        <HomeworkSubmit
          lessonId="50"
          writing={[
            `Tom/Ana: ${tomAnaWhoAgrees
              .map((q) => `${q.id}=${taAns[q.id] || "—"}`)
              .join(", ")}`,
            `Chunks quiz: ${quizScore}/${quizCards.length}`,
            `Dialogues 5a: ${gapScore}/${requestDialogueGaps.length}`,
          ].join("\n")}
          quizDone={quizChecked && taChecked && gapChecked}
          quizScore={quizScore + taScore + gapScore}
        />
      </div>
    </div>
  );
}
