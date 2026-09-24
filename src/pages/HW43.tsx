import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import Unit5AudioBlock from "../components/Unit5AudioBlock";
import {
  transportPick42,
  transportStabilizeChunks42,
  u5Scripts,
} from "../data/lesson42";
import {
  travelChunks,
  travelGaps2b,
} from "../content/lessons/lesson-43/activities";
import {
  pastIrregularVerbs,
  pastRegularVerbs,
} from "../content/lessons/lesson-43/pastSimple";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
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

function U5ListTranscript({ lines }: { lines: readonly string[] }) {
  return (
    <ol>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ol>
  );
}

/** Homework for Lesson 43 — travel practice moved from HW42. */
export default function HW43() {
  const [travelFlip, setTravelFlip] = useState<number[]>([]);
  const toggleTravelFlip = (idx: number) => {
    setTravelFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(travelChunks[idx].en);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [regularFlip, setRegularFlip] = useState<number[]>([]);
  const toggleRegularFlip = (idx: number) => {
    setRegularFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(pastRegularVerbs[idx][1]);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [irregularFlip, setIrregularFlip] = useState<number[]>([]);
  const toggleIrregularFlip = (idx: number) => {
    setIrregularFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) {
        const past = pastIrregularVerbs[idx][1].split(" / ")[0];
        speakEnglish(past);
      }
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [gap2bAns, setGap2bAns] = useState(() =>
    Array(travelGaps2b.length).fill(""),
  );
  const [gap2bChecked, setGap2bChecked] = useState(false);
  const gap2bScore = travelGaps2b.filter((g, i) =>
    textOk(gap2bAns[i], g.answers),
  ).length;

  const [transportFlip, setTransportFlip] = useState<number[]>([]);
  const toggleTransportFlip = (idx: number) => {
    setTransportFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(transportStabilizeChunks42[idx].en);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [transportPick, setTransportPick] = useState(() =>
    Array(transportPick42.length).fill(""),
  );
  const [transportChecked, setTransportChecked] = useState(false);
  const transportScore = transportPick42.filter(
    (item, i) => transportPick[i] === item.answer,
  ).length;

  const [draft, setDraft] = useState("");
  const allDone =
    gap2bChecked &&
    gap2bScore === travelGaps2b.length &&
    transportChecked &&
    transportScore === transportPick42.length;

  const submitText = [
    draft.trim() || "(no extra notes)",
    "",
    "=== Travel gaps ===",
    ...gap2bAns.map((s, i) => `${i + 1}. ${s || "(empty)"}`),
    "",
    "=== Transport chunks ===",
    ...transportPick.map((s, i) => `${i + 1}. ${s || "(empty)"}`),
  ].join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework 43</p>
            <h1>A long journey</h1>
            <p className="lesson22-subtitle">
              Travel phrases, transport chunks, and Past Simple verb flashcards.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link className="lesson22-back-link" to="/lessons/43">
              ← Lesson 43
            </Link>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw43-travel">1–3 Travel</a>
          <a href="#hw43-transport">4 Transport</a>
          <a href="#hw43-past">5 Past Simple</a>
          <a href="#hw43-submit">Submit</a>
        </div>
      </section>

      <section id="hw43-travel" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1–3 · Travel</p>
          <h2>A long journey</h2>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Listen and repeat.
        </p>
        <Unit5AudioBlock
          r={4}
          exercise="HW43 · 1"
          title="Travel sentences · listen and repeat"
          transcript={<U5ListTranscript lines={u5Scripts[4]} />}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.15rem" }}>
          <strong className="l31-ex-num">2</strong> Flip UA → English
        </p>
        <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
          {travelChunks.map((c, idx) => {
            const isFlipped = travelFlip.includes(idx);
            return (
              <button
                key={c.en}
                type="button"
                className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleTravelFlip(idx)}
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
                    <em>{c.example}</em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">3</strong> Complete the sentences.
        </p>
        <div className="l42-gap-list">
          {travelGaps2b.map((g, i) => {
            const ok = textOk(gap2bAns[i], g.answers);
            return (
              <div key={g.id} className="l42-gap-row">
                <span className="l42-gap-num">{g.id}</span>
                <p className="l42-gap-line">
                  {g.before}{" "}
                  <input
                    type="text"
                    value={gap2bAns[i]}
                    onChange={(e) => {
                      setGap2bChecked(false);
                      const next = [...gap2bAns];
                      next[i] = e.target.value;
                      setGap2bAns(next);
                    }}
                    className={inputCls(gap2bChecked, gap2bAns[i], ok)}
                    style={{ width: "6.5rem" }}
                    aria-label={`Travel gap ${g.id}`}
                  />{" "}
                  {g.after}
                </p>
                {gap2bChecked && !ok ? (
                  <span className="hw35-tip">{g.answers[0]}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={gap2bChecked}
          score={gap2bScore}
          total={travelGaps2b.length}
          onCheck={() => setGap2bChecked(true)}
          onReset={() => {
            setGap2bAns(Array(travelGaps2b.length).fill(""));
            setGap2bChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setGap2bAns(travelGaps2b.map((g) => g.answers[0]));
            setGap2bChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      <section id="hw43-transport" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Chunks</p>
          <h2>Transport · 8 fixed phrases</h2>
          <p className="lesson22-section-desc">
            Спочатку запам&apos;ятай ці 8 фраз. Потім обери правильний варіант.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">A</strong> Learn &amp; say
        </p>
        <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
          {transportStabilizeChunks42.map((c, idx) => {
            const isFlipped = transportFlip.includes(idx);
            return (
              <button
                key={c.en}
                type="button"
                className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleTransportFlip(idx)}
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

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">B</strong> Fix the mistake — choose
          the correct chunk
        </p>
        <div className="l42-pick-list">
          {transportPick42.map((item, i) => (
            <div key={item.id} className="l42-pick-item">
              <p className="l42-pick-tip">
                {item.id}. <span>{item.tip}</span>
              </p>
              <div className="l42-pick-options" role="group">
                {item.options.map((opt) => {
                  const selected = transportPick[i] === opt;
                  const isOk = transportChecked && opt === item.answer;
                  const isErr =
                    transportChecked && selected && opt !== item.answer;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={[
                        "l42-pick-btn",
                        selected ? "is-selected" : "",
                        isOk ? "is-ok" : "",
                        isErr ? "is-err" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setTransportChecked(false);
                        const next = [...transportPick];
                        next[i] = opt;
                        setTransportPick(next);
                        speakEnglish(opt);
                      }}
                      aria-pressed={selected}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <CheckBar
          checked={transportChecked}
          score={transportScore}
          total={transportPick42.length}
          onCheck={() => setTransportChecked(true)}
          onReset={() => {
            setTransportPick(Array(transportPick42.length).fill(""));
            setTransportChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setTransportPick(transportPick42.map((item) => item.answer));
            setTransportChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      <section id="hw43-past" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Past Simple</p>
          <h2>Regular &amp; irregular verbs</h2>
          <p className="lesson22-section-desc">
            Підготовка до наступних уроків. Tap: українською → Present → Past.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">A</strong> Regular verbs · add{" "}
          <em>-ed</em>
        </p>
        <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
          {pastRegularVerbs.map(([present, past, ua], idx) => {
            const isFlipped = regularFlip.includes(idx);
            return (
              <button
                key={present}
                type="button"
                className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleRegularFlip(idx)}
                aria-pressed={isFlipped}
                aria-label={`${ua} · ${present} → ${past}`}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Українською</span>
                    <strong>{ua}</strong>
                    <span className="l22-vocab-hint">tap → Past</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">Present → Past</span>
                    <strong>
                      {present} → {past}
                    </strong>
                    <em>I {past}.</em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">B</strong> Irregular verbs · remember
          the form
        </p>
        <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
          {pastIrregularVerbs.map(([present, past, ua], idx) => {
            const isFlipped = irregularFlip.includes(idx);
            return (
              <button
                key={present}
                type="button"
                className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleIrregularFlip(idx)}
                aria-pressed={isFlipped}
                aria-label={`${ua} · ${present} → ${past}`}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Українською</span>
                    <strong>{ua}</strong>
                    <span className="l22-vocab-hint">tap → Past</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">Present → Past</span>
                    <strong>
                      {present} → {past}
                    </strong>
                    <em>
                      I {past.includes(" / ") ? past.split(" / ")[0] : past}.
                    </em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="hw43-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send to your teacher</h2>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw43-notes">
          Notes (optional):
        </label>
        <textarea
          id="hw43-notes"
          className="hw27-textarea"
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно?"
        />
        <HomeworkSubmit
          lessonId="43"
          writing={submitText}
          quizDone={allDone}
          quizScore={gap2bScore + transportScore}
          showListeningCheck={false}
          title="HW43 · A long journey"
        />
      </section>
    </div>
  );
}
