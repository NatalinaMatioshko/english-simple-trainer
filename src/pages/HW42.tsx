import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { CheckBar } from "../components/lesson38/L38Ui";
import Unit5AudioBlock from "../components/Unit5AudioBlock";
import {
  everydaySentences,
  grammarOnAt42,
  IMG42,
  orderWrite42,
  partDayQuiz,
  personalizePromptsUa,
  psIForms,
  travelChunks,
  travelGaps2b,
  u5Scripts,
  weekGaps,
} from "../data/lesson42";
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

function U5ListTranscript({ lines }: { lines: readonly string[] }) {
  return (
    <ol>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ol>
  );
}

export default function HW42() {
  const [pdIndex, setPdIndex] = useState(0);
  const [pdSelected, setPdSelected] = useState<string | null>(null);
  const [pdWrong, setPdWrong] = useState<string | null>(null);
  const pdItem = partDayQuiz[pdIndex];
  const pdDone = pdSelected === pdItem.answer;
  const pdFinished = pdIndex >= partDayQuiz.length - 1 && pdDone;

  const handlePartDayPick = (opt: string) => {
    if (pdDone) return;
    if (opt === pdItem.answer) {
      setPdWrong(null);
      setPdSelected(opt);
      speakEnglish(opt);
      return;
    }
    setPdWrong(opt);
    window.setTimeout(() => setPdWrong(null), 450);
  };

  const [dayWrite, setDayWrite] = useState(() => Array(5).fill(""));
  const [weekWrite, setWeekWrite] = useState(() => Array(3).fill(""));

  const [gapAns, setGapAns] = useState(() => Array(weekGaps.length).fill(""));
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = weekGaps.filter((g, i) =>
    textOk(gapAns[i], g.answers),
  ).length;

  const [meWrite, setMeWrite] = useState(() =>
    Array(personalizePromptsUa.length).fill(""),
  );

  const [onAtAns, setOnAtAns] = useState(() =>
    Array(grammarOnAt42.length).fill(""),
  );
  const [onAtChecked, setOnAtChecked] = useState(false);
  const onAtScore = grammarOnAt42.filter((g, i) => onAtAns[i] === g.answer)
    .length;

  const [orderAns, setOrderAns] = useState(() =>
    Array(orderWrite42.length).fill(""),
  );
  const [orderChecked, setOrderChecked] = useState(false);
  const orderScore = orderWrite42.filter((item, i) =>
    textOk(orderAns[i], item.answers),
  ).length;

  const [travelFlip, setTravelFlip] = useState<number[]>([]);
  const toggleTravelFlip = (idx: number) => {
    setTravelFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(travelChunks[idx].en);
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

  const [draft, setDraft] = useState("");

  const dayDone = dayWrite.filter((t) => t.trim().length > 5).length >= 5;
  const weekDone = weekWrite.filter((t) => t.trim().length > 5).length >= 3;
  const meDone = meWrite.filter((t) => t.trim().length > 3).length >= 6;
  const checks = {
    parts: pdFinished,
    day: dayDone,
    gaps: gapChecked && gapScore === weekGaps.length,
    week: weekDone,
    me: meDone,
    grammar: onAtChecked && onAtScore === grammarOnAt42.length,
    order: orderChecked && orderScore >= Math.ceil(orderWrite42.length * 0.75),
    travelGaps: gap2bChecked && gap2bScore === travelGaps2b.length,
  };
  const allDone = Object.values(checks).every(Boolean);

  const submitText = [
    draft.trim() || "(no extra notes)",
    "",
    "=== My day ===",
    ...dayWrite.map((s, i) => `${i + 1}. ${s}`),
    "",
    "=== My week (3 sentences) ===",
    ...weekWrite.map((s, i) => `${i + 1}. ${s}`),
    "",
    "=== True for me (Mari → me) ===",
    ...meWrite.map((s, i) => `${personalizePromptsUa[i]} → ${s}`),
    "",
    "=== Word order ===",
    ...orderAns.map((s, i) => `${i + 1}. ${s}`),
  ].join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework 42</p>
            <h1>My week · travel</h1>
            <p className="lesson22-topic-pill">
              Parts of the day · routine · Present Simple · travel
            </p>
            <p className="lesson22-subtitle">
              Повтори урок 42: частини доби, свій день і тиждень, граматика on/at,
              travel phrases.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-42"
            >
              ← Lesson 42
            </Link>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw42-parts">1 Parts of day</a>
          <a href="#hw42-day">2 My day</a>
          <a href="#hw42-gaps">3 Gaps</a>
          <a href="#hw42-week">4 My week</a>
          <a href="#hw42-me">5 True for you</a>
          <a href="#hw42-grammar">6 Grammar</a>
          <a href="#hw42-order">7 Order</a>
          <a href="#hw42-travel">8–10 Travel</a>
          <a href="#hw42-submit">Submit</a>
        </div>
      </section>

      {/* 1 · Parts of the day mini-test */}
      <section id="hw42-parts" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Mini-test</p>
          <h2>Parts of the day</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку і обери правильне слово.
          </p>
        </div>
        <div className="l42-pd-card">
          <p className="l42-pd-prompt">Обери правильне слово</p>
          <p className="l42-pd-progress">
            {pdIndex + 1} / {partDayQuiz.length}
          </p>
          <div className="l42-pd-visual">
            <img
              key={pdItem.id}
              src={IMG42(pdItem.file)}
              alt={pdItem.alt}
              loading="lazy"
            />
          </div>
          <div className="l42-pd-options" role="group" aria-label="Choose the word">
            {pdItem.options.map((opt) => {
              const isCorrectPick = pdDone && opt === pdItem.answer;
              const isWrongPick = pdWrong === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  className={[
                    "l42-pd-opt",
                    isCorrectPick ? "is-correct" : "",
                    isWrongPick ? "is-wrong" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handlePartDayPick(opt)}
                  disabled={pdDone}
                  aria-pressed={pdSelected === opt}
                >
                  <span>{opt}</span>
                  {isCorrectPick ? (
                    <span className="l42-pd-check" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <div className="l42-pd-nav">
            {pdDone && !pdFinished ? (
              <button
                type="button"
                className="l25-cr-mini-btn"
                onClick={() => {
                  setPdIndex((i) => i + 1);
                  setPdSelected(null);
                  setPdWrong(null);
                }}
              >
                Next →
              </button>
            ) : null}
            {pdDone ? (
              <button
                type="button"
                className="l25-cr-mini-btn"
                onClick={() => speakEnglish(pdItem.answer)}
              >
                🔊 Hear again
              </button>
            ) : null}
            {pdFinished || pdIndex > 0 ? (
              <button
                type="button"
                className="l25-cr-mini-btn"
                onClick={() => {
                  setPdIndex(0);
                  setPdSelected(null);
                  setPdWrong(null);
                }}
              >
                Restart
              </button>
            ) : null}
          </div>
          {pdFinished ? (
            <p className="l42-pd-done">Nice! All six parts of the day.</p>
          ) : null}
        </div>
      </section>

      {/* 2 · Write five sentences about your day */}
      <section id="hw42-day" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Writing</p>
          <h2>Write five sentences about your day</h2>
          <p className="lesson22-section-desc">
            Використай дієслова з вправи 1. Приклад:{" "}
            <em>I get up at 7 o&apos;clock.</em> Потім прочитай їх учителю.
          </p>
        </div>
        <p className="lesson22-section-desc" style={{ marginBottom: "0.65rem" }}>
          Verbs:{" "}
          {everydaySentences.map((s) => s.verb).join(" · ")}
        </p>
        <div className="l42-q-list">
          {dayWrite.map((val, i) => (
            <label key={i} className="l42-q-row">
              <span>{i + 1}.</span>
              <input
                type="text"
                className="l22-gap-input"
                value={val}
                onChange={(e) => {
                  const next = [...dayWrite];
                  next[i] = e.target.value;
                  setDayWrite(next);
                }}
                placeholder="I … at …"
                aria-label={`My day sentence ${i + 1}`}
              />
            </label>
          ))}
        </div>
      </section>

      {/* 3b · Gaps */}
      <section id="hw42-gaps" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Complete</p>
          <h2>On Mondays, I …</h2>
          <p className="lesson22-section-desc">
            Look at the table again. Complete the sentences with the verbs in
            bold in exercise 1.
          </p>
        </div>
        <div className="l42-gap-list">
          {weekGaps.map((g, i) => {
            const ok = textOk(gapAns[i], g.answers);
            return (
              <div key={g.day} className="l42-gap-row">
                <span className="l42-gap-num">{i + 1}</span>
                <p className="l42-gap-line">
                  <strong>{g.dayLabel}</strong> I{" "}
                  <input
                    type="text"
                    value={gapAns[i]}
                    onChange={(e) => {
                      setGapChecked(false);
                      const next = [...gapAns];
                      next[i] = e.target.value;
                      setGapAns(next);
                    }}
                    className={inputCls(gapChecked, gapAns[i], ok)}
                    style={{ width: "7.5rem" }}
                    aria-label={`Gap ${i + 1}`}
                  />{" "}
                  {g.after}
                </p>
                {gapChecked && !ok ? (
                  <span className="hw35-tip">{g.answers[0]}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={gapChecked}
          score={gapScore}
          total={weekGaps.length}
          onCheck={() => setGapChecked(true)}
          onReset={() => {
            setGapAns(Array(weekGaps.length).fill(""));
            setGapChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setGapAns(weekGaps.map((g) => g.answers[0]));
            setGapChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* 4 · Write three about your week */}
      <section id="hw42-week" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Writing</p>
          <h2>Write three sentences about your week</h2>
          <p className="lesson22-section-desc">
            Приклад: <em>On Mondays, I work in a café.</em> Потім прочитай їх
            учителю.
          </p>
        </div>
        <div className="l42-q-list">
          {weekWrite.map((val, i) => (
            <label key={i} className="l42-q-row">
              <span>{i + 1}.</span>
              <input
                type="text"
                className="l22-gap-input"
                value={val}
                onChange={(e) => {
                  const next = [...weekWrite];
                  next[i] = e.target.value;
                  setWeekWrite(next);
                }}
                placeholder="On …days, I …"
                aria-label={`My week sentence ${i + 1}`}
              />
            </label>
          ))}
        </div>
      </section>

      {/* 5b · True for you */}
      <section id="hw42-me" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Writing + speak</p>
          <h2>Change the text — true for you</h2>
          <p className="lesson22-section-desc">
            Прочитай українською і напиши англійською про <strong>себе</strong>{" "}
            (мінімум 6 речень). Потім розкажи вчителю свій тиждень.
          </p>
        </div>
        <div className="l42-q-list">
          {personalizePromptsUa.map((prompt, i) => (
            <label key={prompt} className="l42-q-row">
              <span>{i + 1}.</span>
              <div style={{ flex: 1, display: "grid", gap: "0.25rem" }}>
                <em className="l42-ua">{prompt}</em>
                <input
                  type="text"
                  className="l22-gap-input"
                  value={meWrite[i]}
                  onChange={(e) => {
                    const next = [...meWrite];
                    next[i] = e.target.value;
                    setMeWrite(next);
                  }}
                  placeholder="Write in English…"
                  aria-label={`UA→EN sentence ${i + 1}`}
                />
              </div>
            </label>
          ))}
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "0.85rem" }}>
          Teacher questions: <em>What time do you get up?</em> ·{" "}
          <em>What do you do on Saturdays?</em> ·{" "}
          <em>Do you work at the weekend?</em>
        </p>
      </section>

      {/* 6 · Grammar on/at */}
      <section id="hw42-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Grammar</p>
          <h2>Present simple: I / you / we / they</h2>
          <p className="lesson22-section-desc">
            Read the grammar box and choose the correct alternatives.
          </p>
        </div>
        <div className="l42-grammar-box">
          <p className="l42-grammar-lead">
            Use the present simple to talk about routines.
          </p>
          <div className="l42-grammar-grid">
            {psIForms.map((row) => (
              <article key={row.form} className="l42-grammar-card">
                <span className="l42-grammar-form">{row.form}</span>
                <p>{row.example}</p>
              </article>
            ))}
          </div>
          <div className="l42-onat-rules">
            <p>
              Use{" "}
              <select
                value={onAtAns[0]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[0] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[0],
                  grammarOnAt42[0].answer,
                )}
                aria-label="Gap 1 on or at"
              >
                <option value="">—</option>
                {grammarOnAt42[0].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              + times: I go to work{" "}
              <select
                value={onAtAns[1]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[1] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[1],
                  grammarOnAt42[1].answer,
                )}
                aria-label="Gap 2 on or at"
              >
                <option value="">—</option>
                {grammarOnAt42[1].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              8 o&apos;clock.
            </p>
            <p>
              Use{" "}
              <select
                value={onAtAns[2]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[2] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[2],
                  grammarOnAt42[2].answer,
                )}
                aria-label="Gap 3 on or at"
              >
                <option value="">—</option>
                {grammarOnAt42[2].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              + days:{" "}
              <select
                value={onAtAns[3]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[3] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[3],
                  grammarOnAt42[3].answer,
                )}
                aria-label="Gap 4 On or At"
              >
                <option value="">—</option>
                {grammarOnAt42[3].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              Saturdays, I get up at 10 o&apos;clock.
            </p>
            <p>
              Use <em>from … to …</em> for days and times:
            </p>
            <ul className="l42-from-to">
              <li>
                <strong>From</strong> Monday <strong>to</strong> Friday, I get
                up at 7 o&apos;clock.
              </li>
              <li>
                On Wednesdays, I work <strong>from</strong> 2 o&apos;clock{" "}
                <strong>to</strong> 10 o&apos;clock.
              </li>
            </ul>
          </div>
        </div>
        <CheckBar
          checked={onAtChecked}
          score={onAtScore}
          total={grammarOnAt42.length}
          onCheck={() => setOnAtChecked(true)}
          onReset={() => {
            setOnAtAns(Array(grammarOnAt42.length).fill(""));
            setOnAtChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setOnAtAns(grammarOnAt42.map((g) => g.answer));
            setOnAtChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* 8 · Word order write */}
      <section id="hw42-order" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Writing</p>
          <h2>Put the words in the correct order</h2>
          <p className="lesson22-section-desc">
            Склади речення зі слів і <strong>напиши його сам</strong> у полі.
            Приклад: <em>I get up at six on Mondays.</em> /{" "}
            <em>On Mondays, I get up at six.</em>
          </p>
        </div>
        <div className="l42-q-list">
          {orderWrite42.map((item, i) => {
            const val = orderAns[i];
            const ok = textOk(val, item.answers);
            return (
              <label key={item.scramble} className="l42-q-row">
                <span>
                  {i + 1}. {item.scramble}
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
                  placeholder="Write the full sentence…"
                  aria-label={`Sentence ${i + 1}`}
                />
                {orderChecked && !ok ? (
                  <span className="hw35-tip">{item.answers[0]}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={orderChecked}
          score={orderScore}
          total={orderWrite42.length}
          onCheck={() => setOrderChecked(true)}
          onReset={() => {
            setOrderAns(Array(orderWrite42.length).fill(""));
            setOrderChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setOrderAns(orderWrite42.map((item) => item.answers[0]));
            setOrderChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* Travel · 1b + vocab + 2b */}
      <section id="hw42-travel" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8–10 · Travel</p>
          <h2>A long journey</h2>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">8</strong> Listen and repeat.
        </p>
        <Unit5AudioBlock
          r={4}
          exercise="HW42 · 8"
          title="Travel sentences · listen and repeat"
          transcript={<U5ListTranscript lines={u5Scripts[4]} />}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.15rem" }}>
          <strong className="l31-ex-num">9</strong> Flip UA → English
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
          <strong className="l31-ex-num">10</strong> Complete the sentences.
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

      <section id="hw42-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Зроби Check там, де є, напиши свої речення і надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw42-notes">
          Notes (optional):
        </label>
        <textarea
          id="hw42-notes"
          className="hw27-textarea"
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно?"
        />
        <HomeworkSubmit
          lessonId="42"
          writing={submitText}
          quizDone={allDone}
          quizScore={
            (pdFinished ? partDayQuiz.length : pdIndex) +
            gapScore +
            onAtScore +
            orderScore +
            gap2bScore
          }
          quizTotal={
            partDayQuiz.length +
            weekGaps.length +
            grammarOnAt42.length +
            orderWrite42.length +
            travelGaps2b.length
          }
        />
      </section>
    </div>
  );
}
