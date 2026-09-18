import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  chooseAlt41,
  haveGotGaps,
  holidayPics,
  IMG_HW41,
  reflect41,
  trueForYou,
  vocabGaps,
  wordMapAnswers,
  wordMapBank,
  wordMapHubMeta,
  wordOrder41,
  writeGrammar41,
  writeGrammarTopicLabel,
  scheduleTranslate41,
  type Hw41MapBin,
  type Hw41WriteTopic,
} from "../data/hw41";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson35.css";
import "../styles/hw41.css";

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

/** Slot positions (% of map) — match textbook: arrows out from each hub */
const SLOT_POS: Record<Hw41MapBin, { x: number; y: number }[]> = {
  colours: [
    { x: 8, y: 10 },
    { x: 48, y: 10 },
    { x: 8, y: 52 },
    { x: 48, y: 52 },
  ],
  age: [
    { x: 92, y: 8 },
    { x: 92, y: 48 },
  ],
  body: [
    { x: 22, y: 55 },
    { x: 22, y: 92 },
    { x: 78, y: 92 },
  ],
};

/** Hub centres — colours TL, age TR, the body bottom */
const HUB_POS: Record<Hw41MapBin, { x: number; y: number }> = {
  colours: { x: 28, y: 31 },
  age: { x: 72, y: 28 },
  body: { x: 50, y: 73 },
};

/** Shorten a line so it starts outside the hub and ends before the slot */
function mapArrow(
  hub: { x: number; y: number },
  slot: { x: number; y: number },
  startPad = 12,
  endPad = 6,
) {
  const dx = slot.x - hub.x;
  const dy = slot.y - hub.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: hub.x + ux * startPad,
    y1: hub.y + uy * startPad,
    x2: slot.x - ux * endPad,
    y2: slot.y - uy * endPad,
  };
}

type MapPlacement = Partial<
  Record<(typeof wordMapBank)[number], { bin: Hw41MapBin; slot: number }>
>;

export default function HW41() {
  const [mapPick, setMapPick] = useState<(typeof wordMapBank)[number] | null>(
    null,
  );
  const [mapPlace, setMapPlace] = useState<MapPlacement>({});
  const [mapChecked, setMapChecked] = useState(false);

  const [vocabAns, setVocabAns] = useState(() =>
    Array(vocabGaps.length).fill(""),
  );
  const [vocabChecked, setVocabChecked] = useState(false);

  const [haveAns, setHaveAns] = useState<string[]>(() =>
    haveGotGaps.map((g) => (g.example ? g.answer : "")),
  );
  const [haveChecked, setHaveChecked] = useState(false);

  const [trueAns, setTrueAns] = useState(() =>
    Array(trueForYou.length).fill(""),
  );

  const [orderAns, setOrderAns] = useState(() =>
    Array(wordOrder41.length).fill(""),
  );
  const [orderChecked, setOrderChecked] = useState(false);

  const [altAns, setAltAns] = useState(() =>
    Array(chooseAlt41.length).fill(""),
  );
  const [altChecked, setAltChecked] = useState(false);

  const [holidayAns, setHolidayAns] = useState<Record<number, string>>({
    1: "Take your passport.",
  });
  const [holidayChecked, setHolidayChecked] = useState(false);

  const [writeAns, setWriteAns] = useState(() =>
    Array(writeGrammar41.length).fill(""),
  );
  const [writeChecked, setWriteChecked] = useState(false);

  const [schedAns, setSchedAns] = useState(() =>
    Array(scheduleTranslate41.length).fill(""),
  );
  const [schedChecked, setSchedChecked] = useState(false);

  const [reflect, setReflect] = useState(() =>
    Array(reflect41.length).fill(""),
  );
  const [draft, setDraft] = useState("");

  const mapScore = useMemo(() => {
    return wordMapBank.filter((w) => {
      const placed = mapPlace[w];
      return placed && placed.bin === wordMapAnswers[w];
    }).length;
  }, [mapPlace]);

  const vocabScore = vocabGaps.filter(
    (g, i) => vocabAns[i] === g.answer,
  ).length;
  const haveItems = haveGotGaps.filter((g) => !g.example);
  const haveScore = haveGotGaps.filter(
    (g, i) => !g.example && haveAns[i] === g.answer,
  ).length;
  const orderScore = wordOrder41.filter((item, i) =>
    textOk(orderAns[i], [item.answer]),
  ).length;
  const altScore = chooseAlt41.filter((g, i) => altAns[i] === g.answer).length;
  const holidayItems = holidayPics.filter((p) => !p.example);
  const holidayScore = holidayItems.filter((p) =>
    textOk(holidayAns[p.n] ?? "", p.answers),
  ).length;
  const writeScore = writeGrammar41.filter((item, i) =>
    textOk(writeAns[i], item.answers),
  ).length;
  const schedScore = scheduleTranslate41.filter((item, i) =>
    textOk(schedAns[i], item.answers),
  ).length;
  const reflectDone = reflect.every((v) => v !== "");
  const trueDone = trueAns.filter((t) => t.trim().length > 3).length >= 4;

  const checks = {
    map: mapChecked && mapScore === wordMapBank.length,
    vocab: vocabChecked && vocabScore === vocabGaps.length,
    have: haveChecked && haveScore === haveItems.length,
    trueYou: trueDone,
    order: orderChecked && orderScore >= Math.ceil(wordOrder41.length * 0.7),
    alt: altChecked && altScore === chooseAlt41.length,
    holiday:
      holidayChecked && holidayScore === holidayItems.length,
    write:
      writeChecked && writeScore >= Math.ceil(writeGrammar41.length * 0.7),
    schedule:
      schedChecked &&
      schedScore >= Math.ceil(scheduleTranslate41.length * 0.7),
    reflect: reflectDone,
  };
  const allDone = Object.values(checks).every(Boolean);

  const slotWord = (bin: Hw41MapBin, slot: number) =>
    (Object.entries(mapPlace) as [
      (typeof wordMapBank)[number],
      { bin: Hw41MapBin; slot: number },
    ][]).find(([, v]) => v.bin === bin && v.slot === slot)?.[0];

  const placeOnSlot = (bin: Hw41MapBin, slot: number) => {
    if (!mapPick) return;
    setMapChecked(false);
    setMapPlace((prev) => {
      const next = { ...prev };
      // clear word if already placed elsewhere
      delete next[mapPick];
      // clear slot occupant
      for (const [w, place] of Object.entries(next) as [
        (typeof wordMapBank)[number],
        { bin: Hw41MapBin; slot: number },
      ][]) {
        if (place.bin === bin && place.slot === slot) delete next[w];
      }
      next[mapPick] = { bin, slot };
      return next;
    });
    setMapPick(null);
  };

  const submitText = [
    draft.trim() || "(no extra notes)",
    "",
    `1 · Word map: ${mapChecked ? `${mapScore}/${wordMapBank.length}` : "not finished"}`,
    `2 · Vocab gaps: ${vocabChecked ? `${vocabScore}/${vocabGaps.length}` : "not finished"}`,
    `3 · have got: ${haveChecked ? `${haveScore}/${haveItems.length}` : "not finished"}`,
    "4 · True for you:",
    ...trueForYou.map((p, i) => `  ${p} → ${trueAns[i]?.trim() || "—"}`),
    `5 · Questions: ${orderChecked ? `${orderScore}/${wordOrder41.length}` : "not finished"}`,
    ...wordOrder41.map(
      (item, i) => `  ${item.scramble} → ${orderAns[i]?.trim() || "—"}`,
    ),
    `6 · Alternatives: ${altChecked ? `${altScore}/${chooseAlt41.length}` : "not finished"}`,
    `7 · Holiday UK: ${holidayChecked ? `${holidayScore}/${holidayItems.length}` : "not finished"}`,
    `8 · Translate UA→EN: ${writeChecked ? `${writeScore}/${writeGrammar41.length}` : "not finished"}`,
    ...writeGrammar41.map(
      (item, i) =>
        `  [${item.topic}] ${item.ua} → ${writeAns[i]?.trim() || "—"}`,
    ),
    `9 · Schedule UA→EN: ${schedChecked ? `${schedScore}/${scheduleTranslate41.length}` : "not finished"}`,
    ...scheduleTranslate41.map(
      (item, i) => `  ${item.ua} → ${schedAns[i]?.trim() || "—"}`,
    ),
    "Reflect (1–5):",
    ...reflect41.map((s, i) => `  ${s} — ${reflect[i] || "—"}`),
  ].join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 41</p>
            <h1>Check and reflect</h1>
            <p className="lesson22-subtitle">
              Unit 4 review: people · have got · advice · holiday UK · UA→EN ·
              schedule · reflect.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-41">
              ← Lesson 41
            </Link>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>word map</span>
          <span>have got</span>
          <span>dos and don&apos;ts</span>
          <span>PS / PC / articles</span>
          <span>schedule UA→EN</span>
          <span>reflect 1–5</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw41-1">1 Map</a>
          <a href="#hw41-2">2 Vocab</a>
          <a href="#hw41-3">3 have got</a>
          <a href="#hw41-4">4 You</a>
          <a href="#hw41-5">5 Questions</a>
          <a href="#hw41-6">6 Choose</a>
          <a href="#hw41-7">7 Photos</a>
          <a href="#hw41-8">8 Translate</a>
          <a href="#hw41-9">9 Schedule</a>
          <a href="#hw41-reflect">Reflect</a>
          <a href="#hw41-submit">Submit</a>
        </div>
      </section>

      {/* 1 · Word map */}
      <section id="hw41-1" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Vocabulary</p>
          <h2>Complete the word map</h2>
          <p className="lesson22-section-desc">
            Обери слово в банку, потім натисни порожній слот біля{" "}
            <strong>colours</strong>, <strong>the body</strong> або{" "}
            <strong>age</strong>.
          </p>
        </div>
        <div className="hw41-bank">
          {wordMapBank.map((w) => (
            <button
              key={w}
              type="button"
              className={`hw41-chip${mapPick === w ? " is-on" : ""}${
                mapPlace[w] ? " is-used" : ""
              }`}
              onClick={() => setMapPick(w)}
            >
              {w}
            </button>
          ))}
        </div>
        <div className="hw41-map" aria-label="Word map">
          <svg className="hw41-map-svg" viewBox="0 0 100 100" aria-hidden>
            <defs>
              <marker
                id="hw41-arrow"
                markerWidth="4"
                markerHeight="4"
                refX="3.5"
                refY="2"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M0,0 L4,2 L0,4 Z" fill="#4a5568" />
              </marker>
            </defs>
            {(Object.keys(HUB_POS) as Hw41MapBin[]).flatMap((bin) =>
              SLOT_POS[bin].map((slot, i) => {
                const a = mapArrow(HUB_POS[bin], slot);
                return (
                  <line
                    key={`${bin}-${i}`}
                    className="hw41-map-line"
                    x1={a.x1}
                    y1={a.y1}
                    x2={a.x2}
                    y2={a.y2}
                    markerEnd="url(#hw41-arrow)"
                  />
                );
              }),
            )}
          </svg>
          {wordMapHubMeta.map((hub) => (
            <div
              key={hub.id}
              className={`hw41-hub${mapPick ? " is-target" : ""}`}
              style={{
                left: `${HUB_POS[hub.id].x}%`,
                top: `${HUB_POS[hub.id].y}%`,
              }}
            >
              {hub.label}
            </div>
          ))}
          {(Object.keys(SLOT_POS) as Hw41MapBin[]).map((bin) =>
            SLOT_POS[bin].map((pos, slot) => {
              const word = slotWord(bin, slot);
              const ok =
                mapChecked &&
                word != null &&
                wordMapAnswers[word] === bin;
              const err =
                mapChecked &&
                word != null &&
                wordMapAnswers[word] !== bin;
              return (
                <button
                  key={`${bin}-${slot}`}
                  type="button"
                  className={[
                    "hw41-slot",
                    word ? "is-filled" : "",
                    mapPick && !word ? "is-target" : "",
                    ok ? "is-ok" : "",
                    err ? "is-err" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={() => placeOnSlot(bin, slot)}
                  aria-label={`${bin} slot ${slot + 1}`}
                >
                  {word ?? ""}
                </button>
              );
            }),
          )}
        </div>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setMapChecked(true)}
          >
            Check
          </button>
          {mapChecked && (
            <span className="l22-score">
              {mapScore} / {wordMapBank.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const auto: MapPlacement = {};
              const used: Record<Hw41MapBin, number> = {
                colours: 0,
                body: 0,
                age: 0,
              };
              for (const w of wordMapBank) {
                const bin = wordMapAnswers[w];
                auto[w] = { bin, slot: used[bin] };
                used[bin] += 1;
              }
              setMapPlace(auto);
              setMapChecked(true);
              setMapPick(null);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setMapPlace({});
              setMapChecked(false);
              setMapPick(null);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* 2 · Vocab gaps */}
      <section id="hw41-2" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Vocabulary</p>
          <h2>Complete the sentences</h2>
          <p className="lesson22-section-desc">
            Обери слово з боксу:{" "}
            <em>a beard · blonde · eyes · in his 80s · in her 20s</em>
          </p>
        </div>
        <div className="l26-drill-list">
          {vocabGaps.map((g, i) => (
            <div key={g.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {g.id}. {g.before}{" "}
                <select
                  value={vocabAns[i]}
                  onChange={(e) => {
                    setVocabChecked(false);
                    const next = [...vocabAns];
                    next[i] = e.target.value;
                    setVocabAns(next);
                  }}
                  className={drillSelClass(
                    vocabChecked,
                    vocabAns[i],
                    g.answer,
                  )}
                  aria-label={`Gap ${g.id}`}
                >
                  <option value="">___</option>
                  {g.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>{" "}
                {g.after}
              </strong>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setVocabChecked(true)}
          >
            Check
          </button>
          {vocabChecked && (
            <span className="l22-score">
              {vocabScore} / {vocabGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setVocabAns(vocabGaps.map((g) => g.answer));
              setVocabChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setVocabAns(Array(vocabGaps.length).fill(""));
              setVocabChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* 3 · have got */}
      <section id="hw41-3" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Grammar</p>
          <h2>have got / hasn&apos;t got</h2>
          <p className="lesson22-section-desc">
            Доповни (+) або (−) форму <strong>have got</strong>. 1–2 —
            приклади.
          </p>
        </div>
        <div className="l26-drill-list">
          {haveGotGaps.map((g, i) => (
            <div key={g.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {g.id}. {g.before}{" "}
                {g.example ? (
                  <em>{g.answer}</em>
                ) : (
                  <select
                    value={haveAns[i]}
                    onChange={(e) => {
                      setHaveChecked(false);
                      const next = [...haveAns];
                      next[i] = e.target.value;
                      setHaveAns(next);
                    }}
                    className={drillSelClass(
                      haveChecked,
                      haveAns[i],
                      g.answer,
                    )}
                    aria-label={`have got ${g.id}`}
                  >
                    <option value="">___</option>
                    {g.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                )}{" "}
                {g.after}
              </strong>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setHaveChecked(true)}
          >
            Check
          </button>
          {haveChecked && (
            <span className="l22-score">
              {haveScore} / {haveItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setHaveAns(haveGotGaps.map((g) => g.answer));
              setHaveChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setHaveAns(haveGotGaps.map((g) => (g.example ? g.answer : "")));
              setHaveChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* 4 · True for you */}
      <section id="hw41-4" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Writing</p>
          <h2>Complete so they are true for you</h2>
          <p className="lesson22-section-desc">
            Напиши правду про себе (мінімум 4 речення).
          </p>
        </div>
        <div className="hw41-true-list">
          {trueForYou.map((p, i) => (
            <label key={p} className="hw41-true-row">
              <span>
                {i + 1}. {p}
              </span>
              <input
                type="text"
                className="l22-gap-input"
                value={trueAns[i]}
                onChange={(e) => {
                  const next = [...trueAns];
                  next[i] = e.target.value;
                  setTrueAns(next);
                }}
                placeholder="…"
                aria-label={`True for you ${i + 1}`}
              />
            </label>
          ))}
        </div>
      </section>

      {/* 5 · Questions */}
      <section id="hw41-5" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Questions</p>
          <h2>Write the questions</h2>
          <p className="lesson22-section-desc">
            Напиши повне питання. Слова в підказці — не в тому порядку. Потім
            запитай учителя і відповідай сам.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5a</strong> Write the questions. Use
          the words to help you.
        </p>
        <div className="hw41-true-list">
          {wordOrder41.map((item, i) => {
            const val = orderAns[i];
            const ok = textOk(val, [item.answer]);
            return (
              <label key={item.answer} className="hw41-true-row">
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
                  placeholder="Write the full question…"
                  aria-label={`Question ${i + 1}`}
                />
                {orderChecked && !ok && (
                  <span className="hw35-tip">{item.answer}</span>
                )}
              </label>
            );
          })}
        </div>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setOrderChecked(true)}
          >
            Check
          </button>
          {orderChecked && (
            <span className="l22-score">
              {orderScore} / {wordOrder41.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setOrderAns(wordOrder41.map((item) => item.answer));
              setOrderChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setOrderAns(Array(wordOrder41.length).fill(""));
              setOrderChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">5b</strong> Ask your teacher the
          questions and answer them.
        </p>
      </section>

      {/* 6 · Alternatives */}
      <section id="hw41-6" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Vocabulary</p>
          <h2>Choose the correct alternatives</h2>
          <p className="lesson22-section-desc">
            Обери правильний дієслівний варіант (dos and don&apos;ts).
          </p>
        </div>
        <div className="l26-drill-list">
          {chooseAlt41.map((g, i) => (
            <div key={g.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {g.id}.{" "}
                <select
                  value={altAns[i]}
                  onChange={(e) => {
                    setAltChecked(false);
                    const next = [...altAns];
                    next[i] = e.target.value;
                    setAltAns(next);
                  }}
                  className={drillSelClass(altChecked, altAns[i], g.answer)}
                  aria-label={`Alternative ${g.id}`}
                >
                  <option value="">___</option>
                  {g.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>{" "}
                {g.after}
              </strong>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setAltChecked(true)}
          >
            Check
          </button>
          {altChecked && (
            <span className="l22-score">
              {altScore} / {chooseAlt41.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAltAns(chooseAlt41.map((g) => g.answer));
              setAltChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAltAns(Array(chooseAlt41.length).fill(""));
              setAltChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* 7 · Holiday photos */}
      <section id="hw41-7" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Writing</p>
          <h2>Holiday to the UK</h2>
          <p className="lesson22-section-desc">
            Подивись фото і символи ✓ / ✗. Напиши поради для поїздки до UK. 1 —
            приклад.
          </p>
        </div>
        <div className="hw41-holiday-grid">
          {holidayPics.map((pic) => {
            const val = holidayAns[pic.n] ?? "";
            const ok =
              pic.example ||
              (holidayChecked && textOk(val, pic.answers));
            const showErr =
              !pic.example &&
              holidayChecked &&
              !textOk(val, pic.answers);
            return (
              <div key={pic.n} className="hw41-holiday-card">
                <div className="hw41-holiday-media">
                  <img
                    src={IMG_HW41(pic.file)}
                    alt={pic.label}
                    loading="lazy"
                  />
                  <span
                    className={`hw41-holiday-mark${
                      pic.doIt ? " is-do" : " is-dont"
                    }`}
                    aria-label={pic.doIt ? "Do" : "Don't"}
                  >
                    {pic.doIt ? "✓" : "✗"}
                  </span>
                </div>
                <div className="hw41-holiday-body">
                  <span className="hw41-holiday-n">{pic.n}.</span>
                  {pic.example ? (
                    <em>{pic.answers[0]}</em>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => {
                          setHolidayChecked(false);
                          setHolidayAns((prev) => ({
                            ...prev,
                            [pic.n]: e.target.value,
                          }));
                        }}
                        className={inputCls(holidayChecked, val, ok)}
                        placeholder={pic.doIt ? "Take / Try / Go to…" : "Don't…"}
                        aria-label={`Holiday tip ${pic.n}`}
                      />
                      {showErr && (
                        <span className="hw35-tip">{pic.answers[0]}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setHolidayChecked(true)}
          >
            Check
          </button>
          {holidayChecked && (
            <span className="l22-score">
              {holidayScore} / {holidayItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<number, string> = {};
              for (const p of holidayPics) next[p.n] = p.answers[0];
              setHolidayAns(next);
              setHolidayChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setHolidayAns({ 1: "Take your passport." });
              setHolidayChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* 8 · Grammar translate */}
      <section id="hw41-8" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · Grammar</p>
          <h2>UA → EN</h2>
          <p className="lesson22-section-desc">
            Переклади речення англійською.{" "}
            <strong>Present Simple</strong> ·{" "}
            <strong>Present Continuous</strong> ·{" "}
            <strong>articles</strong> (a / an / the / —).
          </p>
        </div>

        {(["ps", "pc", "articles"] as Hw41WriteTopic[]).map((topic) => (
          <div key={topic} style={{ marginBottom: "1.15rem" }}>
            <h3 className="l22-listen-subtitle">
              {writeGrammarTopicLabel[topic]}
            </h3>
            <div className="l26-drill-list">
              {writeGrammar41.map((item, i) => {
                if (item.topic !== topic) return null;
                const val = writeAns[i] ?? "";
                const ok = textOk(val, item.answers);
                return (
                  <div key={item.id} className="hw35-fix-row">
                    <p className="hw35-fix-wrong">
                      <strong>{i + 1}.</strong> {item.ua}
                    </p>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => {
                        setWriteChecked(false);
                        const next = [...writeAns];
                        next[i] = e.target.value;
                        setWriteAns(next);
                      }}
                      className={inputCls(writeChecked, val, ok)}
                      placeholder="English…"
                      aria-label={`Translate ${item.id}`}
                    />
                    {writeChecked && !ok && (
                      <span className="hw35-tip">{item.answers[0]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setWriteChecked(true)}
          >
            Check
          </button>
          {writeChecked && (
            <span className="l22-score">
              {writeScore} / {writeGrammar41.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWriteAns(writeGrammar41.map((g) => g.answers[0]));
              setWriteChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWriteAns(Array(writeGrammar41.length).fill(""));
              setWriteChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* 9 · Schedule translate */}
      <section id="hw41-9" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">9 · Schedule</p>
          <h2>UA → EN · days · time · routine</h2>
          <p className="lesson22-section-desc">
            12 змішаних речень без підказок: дні, розклад, час. Уважніше до
            останнього речення — чи природно так казати про потяг?
          </p>
        </div>
        <div className="l26-drill-list">
          {scheduleTranslate41.map((item, i) => {
            const val = schedAns[i] ?? "";
            const ok = textOk(val, item.answers);
            return (
              <div key={item.id} className="hw35-fix-row">
                <p className="hw35-fix-wrong">
                  <strong>{item.id}.</strong> {item.ua}
                </p>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setSchedChecked(false);
                    const next = [...schedAns];
                    next[i] = e.target.value;
                    setSchedAns(next);
                  }}
                  className={inputCls(schedChecked, val, ok)}
                  placeholder="English…"
                  aria-label={`Schedule translate ${item.id}`}
                />
                {schedChecked && !ok && (
                  <span className="hw35-tip">
                    {item.note ? `${item.note} → ` : ""}
                    {item.answers[0]}
                    {item.answers[2] ? ` / ${item.answers[2]}` : ""}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setSchedChecked(true)}
          >
            Check
          </button>
          {schedChecked && (
            <span className="l22-score">
              {schedScore} / {scheduleTranslate41.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setSchedAns(scheduleTranslate41.map((g) => g.answers[0]));
              setSchedChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setSchedAns(Array(scheduleTranslate41.length).fill(""));
              setSchedChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Reflect */}
      <section id="hw41-reflect" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident do you feel?</h2>
          <p className="lesson22-section-desc">
            Оціни себе від 1 до 5 (1 — не дуже впевнено, 5 — дуже впевнено).
          </p>
        </div>
        <div className="hw41-reflect-list">
          {reflect41.map((s, i) => (
            <label key={s} className="hw41-reflect-row">
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

      <section id="hw41-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Перевір вправи (Check), заповни Reflect і надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw41-notes">
          Notes (optional):
        </label>
        <textarea
          id="hw41-notes"
          className="hw27-textarea"
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно?"
        />
        <HomeworkSubmit
          lessonId="41"
          writing={submitText}
          quizDone={allDone}
          quizScore={
            mapScore +
            vocabScore +
            haveScore +
            orderScore +
            altScore +
            holidayScore +
            writeScore +
            schedScore
          }
          showListeningCheck={false}
        />
      </section>
    </div>
  );
}
