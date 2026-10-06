import { useState } from "react";

import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  endingSoundItems,
  heSheGaps,
  iToSheGaps,
  IMG45,
  habitMatchSentences,
  habitPhotoMatch,
  timeExpressions,
  timeExprGaps,
} from "../content/lessons/lesson-45/activities";
import { timeFlashcards } from "../content/lessons/lesson-45/vocabulary";
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

/** Homework for Lesson 45 — Good and bad habits. */
export default function HW45() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(timeFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [matchAns, setMatchAns] = useState(() =>
    Array(habitPhotoMatch.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);
  const matchScore = habitPhotoMatch.filter(
    (p, i) => matchAns[i] === p.answer,
  ).length;

  const [timeAns, setTimeAns] = useState<Record<string, string>>({});
  const [timeChecked, setTimeChecked] = useState(false);
  const timeScore = timeExprGaps.filter((g) =>
    textOk(timeAns[g.id] ?? "", g.answers),
  ).length;

  const [sheAns, setSheAns] = useState<Record<string, string>>({});
  const [sheChecked, setSheChecked] = useState(false);
  const sheScore = iToSheGaps.filter((g) =>
    textOk(sheAns[g.id] ?? "", g.answers),
  ).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = heSheGaps.filter((g) =>
    textOk(gapAns[g.id] ?? "", g.answers),
  ).length;

  const [soundAns, setSoundAns] = useState<Record<string, string>>({});
  const [soundChecked, setSoundChecked] = useState(false);
  const soundScore = endingSoundItems.filter(
    (item) => (soundAns[item.id] ?? "") === item.answer,
  ).length;

  const [writeGood, setWriteGood] = useState("");
  const [writeBad, setWriteBad] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 45</p>
        <h1>Good and bad habits</h1>
        <p className="lead">
          Time expressions · he / she + -s · write about a friend.
        </p>

        <section className="panel" id="hw45-cards">
          <h2>1 · Time expressions</h2>
          <p className="muted">Tap: Ukrainian → English.</p>
          <div className="l22-vocab-grid">
            {timeFlashcards.map((card, idx) => {
              const open = flip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${open ? " is-flipped" : ""}`}
                  onClick={() => toggleFlip(idx)}
                  aria-pressed={open}
                >
                  <span className="l22-vocab-front">{card.front}</span>
                  <span className="l22-vocab-back">{card.back}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel" id="hw45-match">
          <h2>2 · Match the pictures</h2>
          <p className="muted">
            Choose the sentence for each picture (time words).
          </p>
          <div className="l42-pic-grid l42-travel-pic-grid">
            {habitPhotoMatch.map((pic, i) => {
              const value = matchAns[i] ?? "";
              const ok = value === pic.answer;
              return (
                <figure key={pic.id} className="l42-pic-card">
                  <img
                    src={IMG45(pic.file)}
                    alt={pic.alt}
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>{pic.id}</strong>
                    <select
                      value={value}
                      onChange={(e) => {
                        setMatchChecked(false);
                        const next = [...matchAns];
                        next[i] = e.target.value;
                        setMatchAns(next);
                      }}
                      className={drillSelClass(
                        matchChecked,
                        value,
                        pic.answer,
                      )}
                      aria-label={`Photo ${pic.id}`}
                    >
                      <option value="">—</option>
                      {habitMatchSentences.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {matchChecked ? (
                      <span className={ok ? "ok" : "err"}>
                        {ok ? "✓" : `→ ${pic.answer}`}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <CheckBar
            checked={matchChecked}
            score={matchScore}
            total={habitPhotoMatch.length}
            onCheck={() => setMatchChecked(true)}
            onReset={() => {
              setMatchAns(Array(habitPhotoMatch.length).fill(""));
              setMatchChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw45-time">
          <h2>3 · Complete with a time expression</h2>
          <p className="muted">
            Use: {timeExpressions.join(" · ")}. Answers true for you.
          </p>
          <div className="l22-gap-list">
            {timeExprGaps.map((g) => {
              const value = timeAns[g.id] ?? "";
              const ok = textOk(value, g.answers);
              return (
                <label key={g.id} className="l22-gap-row">
                  <span>
                    {g.before}{" "}
                    <input
                      type="text"
                      className={inputCls(timeChecked, value, ok)}
                      value={value}
                      onChange={(e) => {
                        setTimeChecked(false);
                        setTimeAns((prev) => ({
                          ...prev,
                          [g.id]: e.target.value,
                        }));
                      }}
                      aria-label={g.id}
                    />{" "}
                    {g.after}
                  </span>
                </label>
              );
            })}
          </div>
          <CheckBar
            checked={timeChecked}
            score={timeScore}
            total={timeExprGaps.length}
            onCheck={() => setTimeChecked(true)}
            onReset={() => {
              setTimeAns({});
              setTimeChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw45-she">
          <h2>4 · I → she</h2>
          <p className="muted">Change each sentence to she.</p>
          <div className="l22-gap-list">
            {iToSheGaps.map((g) => {
              const value = sheAns[g.id] ?? "";
              const ok = textOk(value, g.answers);
              return (
                <label key={g.id} className="l22-gap-row">
                  <span>
                    {g.before}{" "}
                    <input
                      type="text"
                      className={inputCls(sheChecked, value, ok)}
                      value={value}
                      onChange={(e) => {
                        setSheChecked(false);
                        setSheAns((prev) => ({
                          ...prev,
                          [g.id]: e.target.value,
                        }));
                      }}
                      aria-label={g.id}
                    />
                    {g.after}
                  </span>
                </label>
              );
            })}
          </div>
          <CheckBar
            checked={sheChecked}
            score={sheScore}
            total={iToSheGaps.length}
            onCheck={() => setSheChecked(true)}
            onReset={() => {
              setSheAns({});
              setSheChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw45-gaps">
          <h2>5 · he / she gaps</h2>
          <p className="muted">
            Write the correct Present Simple form (doesn’t + verb when
            negative).
          </p>
          <div className="l22-gap-list">
            {heSheGaps.map((g) => {
              const value = gapAns[g.id] ?? "";
              const ok = textOk(value, g.answers);
              return (
                <label key={g.id} className="l22-gap-row">
                  <span>
                    {g.before}{" "}
                    <input
                      type="text"
                      className={inputCls(gapChecked, value, ok)}
                      value={value}
                      onChange={(e) => {
                        setGapChecked(false);
                        setGapAns((prev) => ({
                          ...prev,
                          [g.id]: e.target.value,
                        }));
                      }}
                      aria-label={g.id}
                    />{" "}
                    {g.after}
                  </span>
                </label>
              );
            })}
          </div>
          <CheckBar
            checked={gapChecked}
            score={gapScore}
            total={heSheGaps.length}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapAns({});
              setGapChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw45-sounds">
          <h2>6 · Ending sounds</h2>
          <p className="muted">Choose /s/, /z/ or /ɪz/ for each verb.</p>
          <div className="l22-gap-list">
            {endingSoundItems.map((item) => {
              const value = soundAns[item.id] ?? "";
              return (
                <label key={item.id} className="l22-gap-row">
                  <span>
                    <strong>{item.prompt}</strong>{" "}
                    <select
                      value={value}
                      onChange={(e) => {
                        setSoundChecked(false);
                        setSoundAns((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }));
                      }}
                      className={drillSelClass(
                        soundChecked,
                        value,
                        item.answer,
                      )}
                      aria-label={item.prompt}
                    >
                      <option value="">—</option>
                      {item.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              );
            })}
          </div>
          <CheckBar
            checked={soundChecked}
            score={soundScore}
            total={endingSoundItems.length}
            onCheck={() => setSoundChecked(true)}
            onReset={() => {
              setSoundAns({});
              setSoundChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw45-write">
          <h2>7 · Write about a friend</h2>
          <p className="muted">
            Use he / she + -s and doesn’t + verb. At least 3 good and 3 bad
            habits.
          </p>
          <label className="l26-block">
            <span className="l26-label">Good habits</span>
            <textarea
              className="l26-textarea"
              rows={5}
              value={writeGood}
              onChange={(e) => setWriteGood(e.target.value)}
              placeholder="She walks to work. She drinks water…"
            />
          </label>
          <label className="l26-block">
            <span className="l26-label">Bad habits</span>
            <textarea
              className="l26-textarea"
              rows={5}
              value={writeBad}
              onChange={(e) => setWriteBad(e.target.value)}
              placeholder="He watches TV every night. He never studies…"
            />
          </label>
        </section>

        <HomeworkSubmit
          lessonId="45"
          writing={[writeGood, writeBad].filter(Boolean).join("\n\n")}
          quizDone={
            matchChecked &&
            timeChecked &&
            sheChecked &&
            gapChecked &&
            soundChecked
          }
          quizScore={
            matchScore + timeScore + sheScore + gapScore + soundScore
          }
          showListeningCheck={false}
          title="HW45 · Good and bad habits"
        />
      </div>
    </div>
  );
}
