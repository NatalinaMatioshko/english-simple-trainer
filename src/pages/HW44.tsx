import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import {
  foodWords,
  frequencyScaleGaps,
  howOftenWordOrder,
  personalFrequencyStems,
} from "../content/lessons/lesson-44/activities";
import { foodUa } from "../content/lessons/lesson-44/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson42.css";

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

/** Homework for Lesson 44 — Food and drink · frequency. */
export default function HW44() {
  const cards = foodWords.map((en) => ({ en, ua: foodUa[en] }));
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(cards[idx].en);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [scaleAns, setScaleAns] = useState<Record<string, string>>({});
  const [scaleChecked, setScaleChecked] = useState(false);
  const scaleScore = frequencyScaleGaps.filter((g) =>
    textOk(scaleAns[g.id] ?? "", [g.answer]),
  ).length;

  const [freqWrite, setFreqWrite] = useState(() =>
    Array(personalFrequencyStems.length).fill(""),
  );

  const [orderAns, setOrderAns] = useState(() =>
    Array(howOftenWordOrder.length).fill(""),
  );
  const [orderChecked, setOrderChecked] = useState(false);
  const orderScore = howOftenWordOrder.filter((q, i) =>
    textOk(orderAns[i], [q.answer]),
  ).length;

  const [draft, setDraft] = useState("");
  const allDone =
    scaleChecked &&
    scaleScore === frequencyScaleGaps.length &&
    orderChecked &&
    orderScore === howOftenWordOrder.length;

  const submitText = [
    "HW44 · Food and drink",
    "",
    "Frequency scale:",
    ...frequencyScaleGaps.map(
      (g) => `  ${g.id} (${g.percent || "—"}) → ${scaleAns[g.id] ?? ""}`,
    ),
    "",
    "True for you:",
    ...personalFrequencyStems.map(
      (stem, i) => `  ${i + 1}. ${stem} → ${freqWrite[i] ?? ""}`,
    ),
    "",
    "How often…?",
    ...howOftenWordOrder.map((q, i) => `  ${q.id}. ${orderAns[i] ?? ""}`),
    "",
    draft ? `Notes:\n${draft}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework 44</p>
            <h1>Food and drink</h1>
            <p className="lesson22-subtitle">
              Flashcards · frequency scale · How often…? · write about you
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lessons/44">
              ← Lesson 44
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/homework"
            >
              ← Homework list
            </Link>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Flashcards</p>
          <h2>Food and drink</h2>
          <p className="lesson22-section-desc">
            Tap a card to flip UA → EN. Hear the English word.
          </p>
        </div>
        <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
          {cards.map((c, idx) => {
            const isFlipped = flip.includes(idx);
            return (
              <button
                key={c.en}
                type="button"
                className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleFlip(idx)}
                aria-pressed={isFlipped}
                aria-label={`${c.ua} · ${c.en}`}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Українською</span>
                    <strong>{c.ua}</strong>
                    <span className="l22-vocab-hint">tap → English</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">English</span>
                    <strong>{c.en}</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Frequency scale</p>
          <h2>never → always</h2>
          <p className="lesson22-section-desc">
            Write all five frequency adverbs from 0% to 100% (never → always).
          </p>
        </div>
        <div className="l42-gap-list">
          {frequencyScaleGaps.map((g) => {
            const val = scaleAns[g.id] ?? "";
            const ok = textOk(val, [g.answer]);
            return (
              <div key={g.id} className="l42-gap-row">
                <span className="l42-gap-num">{g.id}</span>
                <label className="l42-gap-line">
                  {g.percent}:{" "}
                  <input
                    type="text"
                    className={inputCls(scaleChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setScaleChecked(false);
                      setScaleAns((prev) => ({
                        ...prev,
                        [g.id]: e.target.value,
                      }));
                    }}
                    placeholder="write the adverb…"
                    aria-label={`Scale ${g.percent}`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                {scaleChecked && !ok ? (
                  <span className="hw35-tip">{g.answer}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={scaleChecked}
          score={scaleScore}
          total={frequencyScaleGaps.length}
          onCheck={() => setScaleChecked(true)}
          onReset={() => {
            setScaleAns({});
            setScaleChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Writing</p>
          <h2>True for you</h2>
          <p className="lesson22-section-desc">
            Complete each sentence with a frequency adverb (always / usually /
            often / sometimes / never). Write the full sentence.
          </p>
        </div>
        <div className="l42-q-list">
          {personalFrequencyStems.map((stem, i) => (
            <label key={stem} className="l42-q-row">
              <span>{i + 1}.</span>
              <input
                type="text"
                className="l22-gap-input"
                value={freqWrite[i]}
                onChange={(e) => {
                  const next = [...freqWrite];
                  next[i] = e.target.value;
                  setFreqWrite(next);
                }}
                placeholder={stem}
                aria-label={`Frequency sentence ${i + 1}: ${stem}`}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Word order</p>
          <h2>How often…?</h2>
          <p className="lesson22-section-desc">
            Put the words in order. Write the full question.
          </p>
        </div>
        <div className="l42-q-list">
          {howOftenWordOrder.map((q, i) => {
            const val = orderAns[i];
            const ok = textOk(val, [q.answer]);
            return (
              <label key={q.id} className="l42-q-row">
                <span>
                  {q.id}. {q.scramble}
                </span>
                <input
                  type="text"
                  className={inputCls(orderChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setOrderChecked(false);
                    const next = [...orderAns];
                    next[i] = e.target.value;
                    setOrderAns(next);
                  }}
                  placeholder="Write the full question…"
                  aria-label={`How often question ${q.id}`}
                />
                {orderChecked && !ok ? (
                  <span className="hw35-tip">{q.answer}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={orderChecked}
          score={orderScore}
          total={howOftenWordOrder.length}
          onCheck={() => setOrderChecked(true)}
          onReset={() => {
            setOrderAns(Array(howOftenWordOrder.length).fill(""));
            setOrderChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send to your teacher</h2>
        </div>
        <label
          className="lesson22-section-desc"
          htmlFor="hw44-notes"
          style={{ display: "block" }}
        >
          Notes (optional):
        </label>
        <textarea
          id="hw44-notes"
          className="hw27-textarea"
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно?"
        />
        <HomeworkSubmit
          lessonId="44"
          writing={submitText}
          quizDone={allDone}
          quizScore={scaleScore + orderScore}
          showListeningCheck={false}
          title="HW44 · Food and drink"
        />
      </section>
    </div>
  );
}
