import { useState } from "react";

import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  foodWords,
  frequencyScaleGaps,
  howOftenWordOrder,
  personalFrequencyStems,
} from "../content/lessons/lesson-44/activities";
import { foodUa } from "../content/lessons/lesson-44/vocabulary";
import {
  daysOfWeek,
  foodOddOneOut,
  foodUnscramble,
  freqWordOrder,
  makeNegative,
  reflectStatements44,
  routineMatchItems,
  routineMatchOptions,
  travelCrossword,
  travelFixItems,
  travelSpeakQs,
  travelVerbBox,
  travelVerbGaps,
  weekWordOrder,
} from "../data/hw44";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson35.css";
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

function initFilled<T extends { id: string; example?: boolean; answer: string }>(
  items: readonly T[],
): Record<string, string> {
  const init: Record<string, string> = {};
  for (const item of items) {
    if (item.example) init[item.id] = item.answer;
  }
  return init;
}

/** Homework for Lesson 44 — Food and drink · frequency · Check and reflect. */
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

  const [daysAns, setDaysAns] = useState<Record<string, string>>({});
  const [daysChecked, setDaysChecked] = useState(false);
  const daysScore = daysOfWeek.filter((d) =>
    textOk(daysAns[d.id] ?? "", [d.answer]),
  ).length;

  const [matchAns, setMatchAns] = useState<Record<string, string>>({});
  const [matchChecked, setMatchChecked] = useState(false);
  const matchScore = routineMatchItems.filter(
    (m) => (matchAns[m.id] ?? "") === m.answer,
  ).length;

  const [weekAns, setWeekAns] = useState(() => initFilled(weekWordOrder));
  const [weekChecked, setWeekChecked] = useState(false);
  const weekScore = weekWordOrder.filter((q) =>
    textOk(weekAns[q.id] ?? "", [q.answer]),
  ).length;

  const [negAns, setNegAns] = useState(() => initFilled(makeNegative));
  const [negChecked, setNegChecked] = useState(false);
  const negScore = makeNegative.filter((q) =>
    textOk(negAns[q.id] ?? "", [q.answer]),
  ).length;

  const [crossAns, setCrossAns] = useState<Record<string, string>>({});
  const [crossChecked, setCrossChecked] = useState(false);
  const crossScore = travelCrossword.filter((c) =>
    textOk(crossAns[c.id] ?? "", [c.answer]),
  ).length;

  const [travelAns, setTravelAns] = useState(() => initFilled(travelVerbGaps));
  const [travelChecked, setTravelChecked] = useState(false);
  const travelScore = travelVerbGaps.filter((g) =>
    textOk(travelAns[g.id] ?? "", [g.answer]),
  ).length;

  const [fixAns, setFixAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(travelFixItems.map((x) => [x.id, x.wrong])),
  );
  const [fixChecked, setFixChecked] = useState(false);
  const fixScore = travelFixItems.filter((x) =>
    textOk(fixAns[x.id] ?? "", [x.answer]),
  ).length;

  const [foodAns, setFoodAns] = useState<Record<string, string>>({});
  const [foodChecked, setFoodChecked] = useState(false);
  const foodScore = foodUnscramble.filter((f) =>
    textOk(foodAns[f.id] ?? "", [f.answer]),
  ).length;

  const [oddAns, setOddAns] = useState<Record<string, string>>({});
  const [oddChecked, setOddChecked] = useState(false);
  const oddScore = foodOddOneOut.filter(
    (o) => (oddAns[o.id] ?? "") === o.wrong,
  ).length;

  const [freqOrderAns, setFreqOrderAns] = useState<Record<string, string>>({});
  const [freqOrderChecked, setFreqOrderChecked] = useState(false);
  const freqOrderScore = freqWordOrder.filter((q) =>
    textOk(freqOrderAns[q.id] ?? "", q.answers),
  ).length;

  const [reflect, setReflect] = useState(() =>
    Array(reflectStatements44.length).fill(""),
  );
  const [draft, setDraft] = useState("");

  const crScore =
    daysScore +
    matchScore +
    weekScore +
    negScore +
    crossScore +
    travelScore +
    fixScore +
    foodScore +
    oddScore +
    freqOrderScore;
  const crTotal =
    daysOfWeek.length +
    routineMatchItems.length +
    weekWordOrder.length +
    makeNegative.length +
    travelCrossword.length +
    travelVerbGaps.length +
    travelFixItems.length +
    foodUnscramble.length +
    foodOddOneOut.length +
    freqWordOrder.length;

  const checksDone =
    daysChecked &&
    matchChecked &&
    weekChecked &&
    negChecked &&
    crossChecked &&
    travelChecked &&
    fixChecked &&
    foodChecked &&
    oddChecked &&
    freqOrderChecked;

  const allDone =
    scaleChecked &&
    scaleScore === frequencyScaleGaps.length &&
    orderChecked &&
    orderScore === howOftenWordOrder.length &&
    checksDone &&
    crScore === crTotal &&
    reflect.every((r) => r !== "");

  const submitText = [
    "HW44 · Food and drink + Check and reflect",
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
    `Check and reflect score: ${crScore}/${crTotal}`,
    "",
    "Reflect (1–5):",
    ...reflectStatements44.map((s, i) => `  ${s} — ${reflect[i] || "—"}`),
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
              Flashcards · frequency · How often…? · Check and reflect (week,
              travel, food)
            </p>
          </div>

        </div>
        <div className="lesson22-flow" style={{ marginTop: "1rem" }}>
          <a href="#hw44-cards">Flashcards</a>
          <a href="#hw44-scale">Scale</a>
          <a href="#hw44-write">Write</a>
          <a href="#hw44-how">How often</a>
          <a href="#hw44-cr">Check &amp; reflect</a>
          <a href="#hw44-submit">Submit</a>
        </div>
      </section>

      <section id="hw44-cards" className="lesson22-block panel">
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

      <section id="hw44-scale" className="lesson22-block panel">
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

      <section id="hw44-write" className="lesson22-block panel">
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

      <section id="hw44-how" className="lesson22-block panel">
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

      {/* ── Check and reflect ───────────────────────────────── */}
      <section id="hw44-cr" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check and reflect</p>
          <h2>Week · travel · food</h2>
          <p className="lesson22-section-desc">
            Підсумкова перевірка: дні тижня, routine, travel і food + frequency.
            Після Check заповни Reflect і надішли вчителю.
          </p>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR1 · Days</p>
          <h2>Complete the days of the week</h2>
        </div>
        <div className="l42-gap-list">
          {daysOfWeek.map((d) => {
            const val = daysAns[d.id] ?? "";
            const ok = textOk(val, [d.answer]);
            return (
              <div key={d.id} className="l42-gap-row">
                <span className="l42-gap-num">{d.id}</span>
                <label className="l42-gap-line">
                  {d.hint}{" "}
                  <input
                    type="text"
                    className={inputCls(daysChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setDaysChecked(false);
                      setDaysAns((p) => ({ ...p, [d.id]: e.target.value }));
                    }}
                    placeholder="Monday…"
                    aria-label={`Day ${d.id}`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                {daysChecked && !ok ? (
                  <span className="hw35-tip">{d.answer}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={daysChecked}
          score={daysScore}
          total={daysOfWeek.length}
          onCheck={() => setDaysChecked(true)}
          onReset={() => {
            setDaysAns({});
            setDaysChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR2 · Match</p>
          <h2>Match 1–6 with a–f</h2>
        </div>
        <ul className="l31-ex-line" style={{ marginBottom: "0.75rem" }}>
          {routineMatchOptions.map((o) => (
            <li key={o.id}>
              <strong>{o.id}</strong> {o.text}
            </li>
          ))}
        </ul>
        <div className="l42-gap-list">
          {routineMatchItems.map((m) => (
            <div key={m.id} className="l42-gap-row">
              <span className="l42-gap-num">{m.id}</span>
              <label className="l42-gap-line">
                {m.verb}{" "}
                <select
                  value={matchAns[m.id] ?? ""}
                  onChange={(e) => {
                    setMatchChecked(false);
                    setMatchAns((p) => ({ ...p, [m.id]: e.target.value }));
                  }}
                  className={drillSelClass(
                    matchChecked,
                    matchAns[m.id] ?? "",
                    m.answer,
                  )}
                  aria-label={`Match ${m.verb}`}
                >
                  <option value="">—</option>
                  {routineMatchOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </div>
        <CheckBar
          checked={matchChecked}
          score={matchScore}
          total={routineMatchItems.length}
          onCheck={() => setMatchChecked(true)}
          onReset={() => {
            setMatchAns({});
            setMatchChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR3 · Word order</p>
          <h2>Put the words in the correct order</h2>
          <p className="lesson22-section-desc">
            Sentence 1 is an example.
          </p>
        </div>
        <div className="l42-q-list">
          {weekWordOrder.map((q) => {
            const val = weekAns[q.id] ?? "";
            const ok = textOk(val, [q.answer]);
            return (
              <label key={q.id} className="l42-q-row">
                <span>
                  {q.id}. {q.scramble}
                  {"example" in q && q.example ? " · example" : ""}
                </span>
                <input
                  type="text"
                  className={inputCls(weekChecked, val, ok)}
                  value={val}
                  disabled={"example" in q && Boolean(q.example)}
                  onChange={(e) => {
                    setWeekChecked(false);
                    setWeekAns((p) => ({ ...p, [q.id]: e.target.value }));
                  }}
                  placeholder="Write the sentence…"
                  aria-label={`Week order ${q.id}`}
                />
                {weekChecked && !ok ? (
                  <span className="hw35-tip">{q.answer}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={weekChecked}
          score={weekScore}
          total={weekWordOrder.length}
          onCheck={() => setWeekChecked(true)}
          onReset={() => {
            setWeekAns(initFilled(weekWordOrder));
            setWeekChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR4 · Negatives</p>
          <h2>Make the sentences negative</h2>
          <p className="lesson22-section-desc">Sentence 1 is an example.</p>
        </div>
        <div className="l42-q-list">
          {makeNegative.map((q) => {
            const val = negAns[q.id] ?? "";
            const ok = textOk(val, [q.answer]);
            return (
              <label key={q.id} className="l42-q-row">
                <span>
                  {q.id}. {q.positive}
                  {"example" in q && q.example ? " · example" : ""}
                </span>
                <input
                  type="text"
                  className={inputCls(negChecked, val, ok)}
                  value={val}
                  disabled={"example" in q && Boolean(q.example)}
                  onChange={(e) => {
                    setNegChecked(false);
                    setNegAns((p) => ({ ...p, [q.id]: e.target.value }));
                  }}
                  placeholder="They don't…"
                  aria-label={`Negative ${q.id}`}
                />
                {negChecked && !ok ? (
                  <span className="hw35-tip">{q.answer}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={negChecked}
          score={negScore}
          total={makeNegative.length}
          onCheck={() => setNegChecked(true)}
          onReset={() => {
            setNegAns(initFilled(makeNegative));
            setNegChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR5 · Crossword</p>
          <h2>Travel and transport words</h2>
          <p className="lesson22-section-desc">
            Write seven travel words. Use the letter hints.
          </p>
        </div>
        <div className="l42-gap-list">
          {travelCrossword.map((c) => {
            const val = crossAns[c.id] ?? "";
            const ok = textOk(val, [c.answer]);
            return (
              <div key={c.id} className="l42-gap-row">
                <span className="l42-gap-num">{c.id}</span>
                <label className="l42-gap-line">
                  {c.clue} · <code>{c.hint}</code>{" "}
                  <input
                    type="text"
                    className={inputCls(crossChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setCrossChecked(false);
                      setCrossAns((p) => ({ ...p, [c.id]: e.target.value }));
                    }}
                    placeholder={c.hint}
                    aria-label={`Crossword ${c.id}: ${c.clue}`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                {crossChecked && !ok ? (
                  <span className="hw35-tip">{c.answer}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={crossChecked}
          score={crossScore}
          total={travelCrossword.length}
          onCheck={() => setCrossChecked(true)}
          onReset={() => {
            setCrossAns({});
            setCrossChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR6 · Travel verbs</p>
          <h2>Complete the sentences</h2>
          <p className="lesson22-section-desc">
            Use: {travelVerbBox.join(", ")}. Sentence 1 is an example.
          </p>
        </div>
        <div className="l42-q-list">
          {travelVerbGaps
            .filter((g) => g.id !== "4b")
            .map((g) => {
              if (g.id === "4a") {
                const leave = travelAns["4a"] ?? "";
                const arrive = travelAns["4b"] ?? "";
                const leaveOk = textOk(leave, ["leave"]);
                const arriveOk = textOk(arrive, ["arrive"]);
                return (
                  <label key="4" className="l42-q-row">
                    <span>4.</span>
                    <span style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", alignItems: "center" }}>
                      I{" "}
                      <input
                        type="text"
                        className={inputCls(travelChecked, leave, leaveOk)}
                        value={leave}
                        onChange={(e) => {
                          setTravelChecked(false);
                          setTravelAns((p) => ({ ...p, "4a": e.target.value }));
                        }}
                        style={{ width: "6.5rem" }}
                        aria-label="Travel gap 4 leave"
                      />{" "}
                      home at 8 o&apos;clock and{" "}
                      <input
                        type="text"
                        className={inputCls(travelChecked, arrive, arriveOk)}
                        value={arrive}
                        onChange={(e) => {
                          setTravelChecked(false);
                          setTravelAns((p) => ({ ...p, "4b": e.target.value }));
                        }}
                        style={{ width: "6.5rem" }}
                        aria-label="Travel gap 4 arrive"
                      />{" "}
                      at the office at eight forty-five.
                    </span>
                    {travelChecked && (!leaveOk || !arriveOk) ? (
                      <span className="hw35-tip">leave · arrive</span>
                    ) : null}
                  </label>
                );
              }
              const val = travelAns[g.id] ?? "";
              const ok = textOk(val, [g.answer]);
              return (
                <label key={g.id} className="l42-q-row">
                  <span>
                    {g.id}. {g.before}{" "}
                    <input
                      type="text"
                      className={inputCls(travelChecked, val, ok)}
                      value={val}
                      disabled={"example" in g && Boolean(g.example)}
                      onChange={(e) => {
                        setTravelChecked(false);
                        setTravelAns((p) => ({ ...p, [g.id]: e.target.value }));
                      }}
                      style={{ width: "7rem" }}
                      aria-label={`Travel gap ${g.id}`}
                    />{" "}
                    {g.after}
                    {"example" in g && g.example ? " · example" : ""}
                  </span>
                  {travelChecked && !ok ? (
                    <span className="hw35-tip">{g.answer}</span>
                  ) : null}
                </label>
              );
            })}
        </div>
        <CheckBar
          checked={travelChecked}
          score={travelScore}
          total={travelVerbGaps.length}
          onCheck={() => setTravelChecked(true)}
          onReset={() => {
            setTravelAns(initFilled(travelVerbGaps));
            setTravelChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR7 · Questions</p>
          <h2>Correct the mistakes</h2>
          <p className="lesson22-section-desc">
            Five sentences have a mistake — rewrite them. Three are already
            correct (leave them as they are). Then answer the speaking questions
            with your teacher.
          </p>
        </div>
        <div className="l42-q-list">
          {travelFixItems.map((x) => {
            const val = fixAns[x.id] ?? "";
            const ok = textOk(val, [x.answer]);
            return (
              <label key={x.id} className="l42-q-row">
                <span>
                  {x.id}. {x.wrong}
                </span>
                <input
                  type="text"
                  className={inputCls(fixChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setFixChecked(false);
                    setFixAns((p) => ({ ...p, [x.id]: e.target.value }));
                  }}
                  aria-label={`Fix question ${x.id}`}
                />
                {fixChecked && !ok ? (
                  <span className="hw35-tip">{x.answer}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={fixChecked}
          score={fixScore}
          total={travelFixItems.length}
          onCheck={() => setFixChecked(true)}
          onReset={() => {
            setFixAns(
              Object.fromEntries(travelFixItems.map((x) => [x.id, x.wrong])),
            );
            setFixChecked(false);
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          <p className="l31-ex-line">
            <strong>b</strong> Ask your teacher and answer:
          </p>
          <ul>
            {travelSpeakQs.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR8 · Food</p>
          <h2>Food words</h2>
          <p className="lesson22-section-desc">
            a) Put the letters in order. b) Tap the incorrect alternative.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong>a</strong> Unscramble
        </p>
        <div className="l42-gap-list">
          {foodUnscramble.map((f) => {
            const val = foodAns[f.id] ?? "";
            const ok = textOk(val, [f.answer]);
            return (
              <div key={f.id} className="l42-gap-row">
                <span className="l42-gap-num">{f.id}</span>
                <label className="l42-gap-line">
                  {f.letters} → {f.start}____{" "}
                  <input
                    type="text"
                    className={inputCls(foodChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setFoodChecked(false);
                      setFoodAns((p) => ({ ...p, [f.id]: e.target.value }));
                    }}
                    placeholder={`${f.start}…`}
                    aria-label={`Food word ${f.id}`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                {foodChecked && !ok ? (
                  <span className="hw35-tip">{f.answer}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={foodChecked}
          score={foodScore}
          total={foodUnscramble.length}
          onCheck={() => setFoodChecked(true)}
          onReset={() => {
            setFoodAns({});
            setFoodChecked(false);
          }}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong>b</strong> Cross out the incorrect alternative
        </p>
        <div className="l42-pick-list">
          {foodOddOneOut.map((item) => (
            <div key={item.id} className="l42-pick-item">
              <p className="l42-pick-tip">
                {item.id}. Tap the odd one out
              </p>
              <div className="l42-pick-options" role="group">
                {item.options.map((opt) => {
                  const selected = oddAns[item.id] === opt;
                  const isOk = oddChecked && opt === item.wrong;
                  const isErr =
                    oddChecked && selected && opt !== item.wrong;
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
                        setOddChecked(false);
                        setOddAns((p) => ({ ...p, [item.id]: opt }));
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
          checked={oddChecked}
          score={oddScore}
          total={foodOddOneOut.length}
          onCheck={() => setOddChecked(true)}
          onReset={() => {
            setOddAns({});
            setOddChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">CR9 · Frequency</p>
          <h2>Put the words in the correct order</h2>
          <p className="lesson22-section-desc">
            Then ask your teacher the questions (4–7) and answer them.
          </p>
        </div>
        <div className="l42-q-list">
          {freqWordOrder.map((q) => {
            const val = freqOrderAns[q.id] ?? "";
            const ok = textOk(val, q.answers);
            return (
              <label key={q.id} className="l42-q-row">
                <span>
                  {q.id}. {q.scramble}
                </span>
                <input
                  type="text"
                  className={inputCls(freqOrderChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setFreqOrderChecked(false);
                    setFreqOrderAns((p) => ({ ...p, [q.id]: e.target.value }));
                  }}
                  placeholder="Write the sentence / question…"
                  aria-label={`Frequency order ${q.id}`}
                />
                {freqOrderChecked && !ok ? (
                  <span className="hw35-tip">{q.answers[0]}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={freqOrderChecked}
          score={freqOrderScore}
          total={freqWordOrder.length}
          onCheck={() => setFreqOrderChecked(true)}
          onReset={() => {
            setFreqOrderAns({});
            setFreqOrderChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident do you feel?</h2>
          <p className="lesson22-section-desc">
            Оціни себе від 1 до 5 (1 — зовсім не впевнено, 5 — дуже впевнено).
          </p>
        </div>
        <div className="hw35-reflect-list">
          {reflectStatements44.map((s, i) => (
            <label key={s} className="hw35-reflect-row">
              <span>{s}</span>
              <select
                className="l25-cr-sel"
                value={reflect[i]}
                onChange={(e) => {
                  const next = [...reflect];
                  next[i] = e.target.value;
                  setReflect(next);
                }}
              >
                <option value="">–</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={String(v)}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section id="hw44-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send to your teacher</h2>
          <p className="lesson22-section-desc">
            Перевір Check and reflect (Check), заповни Reflect і надішли.
          </p>
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
          quizScore={scaleScore + orderScore + crScore}
          showListeningCheck={false}
          title="HW44 · Food and drink"
        />
      </section>
    </div>
  );
}
