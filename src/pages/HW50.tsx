import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import {
  requestDialogueGaps,
  requestMatchPhrases,
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

/** Homework for Lesson 50 — Make requests. */
export default function HW50() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(requestFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = requestDialogueGaps.filter((g) =>
    textOk(gapAns[g.id] ?? "", [g.answer]),
  ).length;

  const [writeReq, setWriteReq] = useState("");
  const [writeAns, setWriteAns] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 50</p>
        <h1>Make requests</h1>
        <p className="lead">
          Flashcards · dialogues · 6 written requests · voice 40–60s.
        </p>

        <section id="hw50-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Request chunks</h2>
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
                  <span className="l22-vocab-front">{card.front}</span>
                  <span className="l22-vocab-back">{card.back}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw50-jobs" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Jobs</p>
            <h2>Remember the six jobs</h2>
          </div>
          <ol className="l22-list">
            {requestMatchPhrases.map((p) => (
              <li key={p.value}>{p.label}</li>
            ))}
          </ol>
        </section>

        <section id="hw50-gaps" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Dialogues</p>
            <h2>Complete the phrases</h2>
          </div>
          <div className="l22-gap-list">
            {requestDialogueGaps.map((g) => {
              const value = gapAns[g.id] ?? "";
              const ok = textOk(value, [g.answer]);
              return (
                <label key={g.id} className="l22-gap-row">
                  <span>
                    {g.before}
                    <input
                      className={inputCls(gapChecked, value, ok)}
                      value={value}
                      onChange={(e) => {
                        setGapChecked(false);
                        setGapAns((prev) => ({
                          ...prev,
                          [g.id]: e.target.value,
                        }));
                      }}
                      placeholder="…"
                      aria-label={`Gap ${g.id}`}
                    />
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

        <section id="hw50-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Write</p>
            <h2>Six requests</h2>
          </div>
          <p className="lead">
            Write 3× Can you…, please? and 3× Can I…, please?
          </p>
          <textarea
            className="l22-textarea"
            rows={6}
            value={writeReq}
            onChange={(e) => setWriteReq(e.target.value)}
            placeholder={"Can you wash the dishes, please?\nCan I use your pen, please?"}
          />
          <p className="lead" style={{ marginTop: "0.85rem" }}>
            Write answers to these two requests:
          </p>
          <p className="l22-muted">
            1) Can you walk the dog, please? · 2) Can I watch TV at 8 o’clock?
          </p>
          <textarea
            className="l22-textarea"
            rows={3}
            value={writeAns}
            onChange={(e) => setWriteAns(e.target.value)}
            placeholder={"1) Sure. / I’m sorry, I can’t.\n2) Yes, you can. / I’m sorry, you can’t."}
          />
        </section>

        <section id="hw50-voice" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Voice</p>
            <h2>Ask for help at home (40–60s)</h2>
          </div>
          <p className="lead">
            Record: three Can you…? requests about housework, and two Can I…?
            requests. Then imagine answers.
          </p>
        </section>

        <HomeworkSubmit
          lessonId="50"
          writing={[writeReq, writeAns].filter(Boolean).join("\n\n")}
          quizDone={gapChecked}
        />
      </div>
    </div>
  );
}
