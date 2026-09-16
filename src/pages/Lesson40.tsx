import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { CheckBar } from "../components/lesson38/L38Ui";
import Unit4AudioBlock from "../components/Unit4AudioBlock";
import {
  adviceTexts,
  buildStressSegments,
  citySpeakHints,
  IMG40,
  imperativeGaps,
  lydiaOpening,
  londonDoTicks,
  londonPlaces,
  lydiaWhy,
  phraseBank,
  phrasePics,
  romeTrip,
  stressPatterns,
  verbGaps,
} from "../data/lesson40";
import {
  cuttingHairMeanings,
  cuttingHairOptions,
  homeworkFixGroups,
  homeworkFixLines,
} from "../data/lesson40HwFix";
import {
  homeworkFixGroups as l38HomeworkFixGroups,
  homeworkFixLines as l38HomeworkFixLines,
} from "../data/lesson38";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson38.css";
import "../styles/lesson40.css";

function setAt(list: string[], index: number, value: string): string[] {
  const next = [...list];
  next[index] = value;
  return next;
}

function setSlot(
  rows: string[][],
  row: number,
  slot: number,
  value: string,
): string[][] {
  return rows.map((line, i) =>
    i === row ? line.map((cell, j) => (j === slot ? value : cell)) : line,
  );
}

function normPhrase(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function romeOk(value: string, answers: readonly string[]): boolean {
  const v = normPhrase(value);
  return v !== "" && answers.some((a) => normPhrase(a) === v);
}

function normalizeFix(
  value: string,
  keepCase = false,
  keepPunct = false,
): string {
  let base = value
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (!keepPunct) base = base.replace(/[?.!,]+$/g, "");
  if (!keepCase) base = base.toLowerCase();
  return base;
}

function isHwFixOk(
  value: string,
  answers: readonly string[],
  keepCase = false,
  keepPunct = false,
): boolean {
  const n = normalizeFix(value, keepCase, keepPunct);
  return (
    n !== "" &&
    answers.some((a) => normalizeFix(a, keepCase, keepPunct) === n)
  );
}

function GrammarGap({
  n,
  value,
  answer,
  options,
  checked,
  onChange,
}: {
  n: number;
  value: string;
  answer: string;
  options: readonly string[];
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <span className="l39-gap">
      <span className="l39-gap-n">{n}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={drillSelClass(checked, value, answer)}
        aria-label={`Gap ${n}`}
      >
        <option value="">______</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </span>
  );
}

export default function Lesson40() {
  const [hwFixAns, setHwFixAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(homeworkFixLines.map((l) => [l.id, l.wrong])),
  );
  const [hwFixChecked, setHwFixChecked] = useState(false);
  const [hwFixHints, setHwFixHints] = useState<Record<string, boolean>>({});
  const [hwFixShowKey, setHwFixShowKey] = useState(false);
  const [l38FixAns, setL38FixAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(l38HomeworkFixLines.map((l) => [l.id, l.wrong])),
  );
  const [l38FixChecked, setL38FixChecked] = useState(false);
  const [l38FixHints, setL38FixHints] = useState<Record<string, boolean>>({});
  const [l38FixShowKey, setL38FixShowKey] = useState(false);
  const [hairAns, setHairAns] = useState<Record<string, string>>({});
  const [hairChecked, setHairChecked] = useState(false);
  const [whyAns, setWhyAns] = useState("");
  const [whyChecked, setWhyChecked] = useState(false);
  const [verbAns, setVerbAns] = useState<string[][]>(() =>
    verbGaps.map((row) =>
      row.slots.map((slot) => (row.example ? slot.answer : "")),
    ),
  );
  const [verbChecked, setVerbChecked] = useState(false);
  const [picAns, setPicAns] = useState<Record<number, string>>({
    1: "drink tea",
  });
  const [picChecked, setPicChecked] = useState(false);
  const [broken40, setBroken40] = useState<Record<string, boolean>>({});
  const [londonTick, setLondonTick] = useState<Record<string, boolean>>({});
  const [londonTickChecked, setLondonTickChecked] = useState(false);
  const [impAns, setImpAns] = useState(() =>
    Array(imperativeGaps.length).fill(""),
  );
  const [impChecked, setImpChecked] = useState(false);
  const [stressAns, setStressAns] = useState<string[]>(() =>
    Array(stressPatterns.length).fill(""),
  );
  const [stressChecked, setStressChecked] = useState(false);
  const [romeAns, setRomeAns] = useState<Record<number, string>>({
    1: "Drink coffee.",
  });
  const [romeChecked, setRomeChecked] = useState(false);
  const [myDos, setMyDos] = useState(["", "", "", ""]);
  const [myDonts, setMyDonts] = useState(["", "", "", ""]);

  const hwFixScore = homeworkFixLines.filter((line) =>
    isHwFixOk(hwFixAns[line.id] ?? "", line.answers),
  ).length;
  const l38FixScore = l38HomeworkFixLines.filter((line) => {
    const keepCase = "keepCase" in line && line.keepCase === true;
    const keepPunct = "keepPunct" in line && line.keepPunct === true;
    return isHwFixOk(
      l38FixAns[line.id] ?? "",
      line.answers,
      keepCase,
      keepPunct,
    );
  }).length;
  const hairScore = cuttingHairMeanings.filter(
    (item) => hairAns[item.id] === item.en,
  ).length;
  const verbItems = verbGaps.filter((row) => !row.example);
  const verbScore = verbGaps.filter(
    (row, i) =>
      !row.example &&
      row.slots.every((slot, j) => verbAns[i]?.[j] === slot.answer),
  ).length;
  const picItems = phrasePics.filter((item) => !item.example);
  const picScore = picItems.filter((item) => picAns[item.n] === item.phrase)
    .length;
  const londonTickScore = londonDoTicks.filter(
    (item) => Boolean(londonTick[item.id]) === item.tick,
  ).length;
  const impScore = imperativeGaps.filter((item, i) => impAns[i] === item.answer)
    .length;
  const stressScore = stressPatterns.filter(
    (item, i) => stressAns[i] === item.answer,
  ).length;
  const romeItems = romeTrip.filter((item) => !item.example);
  const romeScore = romeItems.filter((item) =>
    romeOk(romeAns[item.n] ?? "", item.answers),
  ).length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={40} />
            <h1>Dos and don&apos;ts</h1>
            <p className="lesson22-topic-pill">
              Unit 4C · Imperatives · give advice
            </p>
            <p className="lesson22-subtitle">
              Fix Petro&apos;s writing, then give advice with{" "}
              <strong>Visit…</strong> / <strong>Don&apos;t go…</strong>
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-39"
            >
              ← Lesson 39
            </Link>
            <Link className="lesson22-back-link" to="/hw-40">
              HW40 →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Fix HW writing</span>
          <span>Visit / Don&apos;t go</span>
          <span>London · Rome</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l40-hwfix">Fix Petro</a>
          <a href="#l40-l38fix">Fix L38</a>
          <a href="#l40-hair">Cutting hair</a>
          <a href="#l40-imp">Imperatives</a>
          <a href="#l40-london">London</a>
          <a href="#l40-lydia">Messages</a>
          <a href="#l40-verbs">Verbs</a>
          <a href="#l40-pics">Photos</a>
          <a href="#l40-ticks">4 Tick</a>
          <a href="#l40-impbox">5 Grammar</a>
          <a href="#l40-stress">6 Stress</a>
          <a href="#l40-rome">7 Rome</a>
          <a href="#l40-city">8–9 City</a>
          <a href="#l40-exit">Exit</a>
        </div>
      </section>

      <section id="l40-hwfix" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up · Homework</p>
          <h2>Fix Petro&apos;s writing</h2>
          <p className="lesson22-section-desc">
            Текст з ДЗ до Lesson 38 (опис себе й друзів). Відредагуй →{" "}
            <strong>Check</strong>. <strong>Hint</strong> показує пояснення і
            правильне речення. Потім прочитай вголос із учителем.
          </p>
        </div>
        {homeworkFixGroups.map((g) => (
          <div key={g.id} className="l31-fix-group">
            <h3 className="l31-fix-group-title">
              {g.title}{" "}
              <span
                style={{ fontWeight: 500, color: "var(--color-text-muted)" }}
              >
                · {g.desc}
              </span>
            </h3>
            {homeworkFixLines
              .filter((line) => line.group === g.id)
              .map((line) => {
                const value = hwFixAns[line.id] ?? "";
                const ok = isHwFixOk(value, line.answers);
                const showState = hwFixChecked;
                const showHint = hwFixShowKey || !!hwFixHints[line.id];
                return (
                  <div key={line.id} className="l31-fix-line">
                    <p className="l38-hwfix-uk">
                      {line.id}. {line.uk}
                    </p>
                    <label
                      className="l31-fix-wrong"
                      htmlFor={`l40-hwfix-${line.id}`}
                    >
                      <span className="l31-fix-wrong-text">{line.wrong}</span>
                    </label>
                    <div className="l31-fix-row">
                      <input
                        id={`l40-hwfix-${line.id}`}
                        type="text"
                        className={`l31-fix-input${
                          showState ? (ok ? " is-ok" : " is-err") : ""
                        }`}
                        value={value}
                        onChange={(e) => {
                          setHwFixChecked(false);
                          setHwFixAns((prev) => ({
                            ...prev,
                            [line.id]: e.target.value,
                          }));
                        }}
                        spellCheck={false}
                        aria-label={`Correct: ${line.wrong}`}
                      />
                      <button
                        type="button"
                        className={`l31-fix-hint-btn${showHint ? " is-on" : ""}`}
                        onClick={() =>
                          setHwFixHints((prev) => ({
                            ...prev,
                            [line.id]: !prev[line.id],
                          }))
                        }
                        aria-pressed={showHint}
                      >
                        {showHint ? "Hide" : "Hint"}
                      </button>
                    </div>
                    {showHint && (
                      <div className="l31-fix-reveal">
                        <span className="l31-fix-tip">{line.tipUa}</span>
                        <span className="l31-fix-answer">
                          ✓ {line.answers[0]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setHwFixChecked(true)}
          >
            Check
          </button>
          {hwFixChecked && (
            <span className="l22-score">
              {hwFixScore} / {homeworkFixLines.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !hwFixShowKey;
              setHwFixShowKey(next);
              setHwFixHints(
                next
                  ? Object.fromEntries(
                      homeworkFixLines.map((l) => [l.id, true]),
                    )
                  : {},
              );
            }}
          >
            {hwFixShowKey ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setHwFixChecked(false);
              setHwFixShowKey(false);
              setHwFixHints({});
              setHwFixAns(
                Object.fromEntries(
                  homeworkFixLines.map((l) => [l.id, l.wrong]),
                ),
              );
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l40-l38fix" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up · Homework</p>
          <h2>Fix the mistakes</h2>
          <p className="lesson22-section-desc">
            Усі речення з ДЗ, які треба поправити. Відредагуй рядок →{" "}
            <strong>Check</strong>. <strong>Hint</strong> показує підказку.
            Потім прочитай правильні речення вголос із учителем. 34, 38 і 42
            уже правильні — їх немає тут.
          </p>
        </div>
        {l38HomeworkFixGroups.map((g) => (
          <div key={g.id} className="l31-fix-group">
            <h3 className="l31-fix-group-title">
              {g.title}{" "}
              <span
                style={{ fontWeight: 500, color: "var(--color-text-muted)" }}
              >
                · {g.desc}
              </span>
            </h3>
            {l38HomeworkFixLines
              .filter((line) => line.group === g.id)
              .map((line) => {
                const value = l38FixAns[line.id] ?? "";
                const keepCase =
                  "keepCase" in line && line.keepCase === true;
                const keepPunct =
                  "keepPunct" in line && line.keepPunct === true;
                const ok = isHwFixOk(
                  value,
                  line.answers,
                  keepCase,
                  keepPunct,
                );
                const showState = l38FixChecked;
                const showHint = l38FixShowKey || !!l38FixHints[line.id];
                return (
                  <div key={line.id} className="l31-fix-line">
                    <p className="l38-hwfix-uk">
                      {line.id}. {line.uk}
                    </p>
                    <label
                      className="l31-fix-wrong"
                      htmlFor={`l40-l38fix-${line.id}`}
                    >
                      <span className="l31-fix-wrong-text">{line.wrong}</span>
                    </label>
                    <div className="l31-fix-row">
                      <input
                        id={`l40-l38fix-${line.id}`}
                        type="text"
                        className={`l31-fix-input${
                          showState ? (ok ? " is-ok" : " is-err") : ""
                        }`}
                        value={value}
                        onChange={(e) => {
                          setL38FixChecked(false);
                          setL38FixAns((prev) => ({
                            ...prev,
                            [line.id]: e.target.value,
                          }));
                        }}
                        spellCheck={false}
                        aria-label={`Correct: ${line.wrong}`}
                      />
                      <button
                        type="button"
                        className={`l31-fix-hint-btn${showHint ? " is-on" : ""}`}
                        onClick={() =>
                          setL38FixHints((prev) => ({
                            ...prev,
                            [line.id]: !prev[line.id],
                          }))
                        }
                        aria-pressed={showHint}
                      >
                        {showHint ? "Hide" : "Hint"}
                      </button>
                    </div>
                    {showHint && (
                      <div className="l31-fix-reveal">
                        <span className="l31-fix-tip">{line.tipUa}</span>
                        <span className="l31-fix-answer">
                          ✓ {line.answers[0]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setL38FixChecked(true)}
          >
            Check
          </button>
          {l38FixChecked && (
            <span className="l22-score">
              {l38FixScore} / {l38HomeworkFixLines.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !l38FixShowKey;
              setL38FixShowKey(next);
              setL38FixHints(
                next
                  ? Object.fromEntries(
                      l38HomeworkFixLines.map((l) => [l.id, true]),
                    )
                  : {},
              );
            }}
          >
            {l38FixShowKey ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setL38FixChecked(false);
              setL38FixShowKey(false);
              setL38FixHints({});
              setL38FixAns(
                Object.fromEntries(
                  l38HomeworkFixLines.map((l) => [l.id, l.wrong]),
                ),
              );
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l40-hair" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up · Meaning</p>
          <h2>Cutting hair — choose the sentence</h2>
          <p className="lesson22-section-desc">
            Прочитай українське значення й обери правильне англійське речення.
            Зверни увагу на <strong>hair</strong> /{" "}
            <strong>my / a / the client&apos;s hair</strong>.
          </p>
        </div>
        <div className="l40-hair-quiz">
          {cuttingHairMeanings.map((item) => {
            const chosen = hairAns[item.id] ?? "";
            return (
              <div key={item.id} className="l40-hair-item">
                <p className="l40-hair-ua">{item.ua}</p>
                <div className="l40-hair-opts" role="group" aria-label={item.ua}>
                  {cuttingHairOptions.map((opt) => {
                    const on = chosen === opt;
                    const ok = hairChecked && on && opt === item.en;
                    const bad = hairChecked && on && opt !== item.en;
                    const miss =
                      hairChecked && !on && opt === item.en && chosen !== "";
                    const cls = [
                      "l40-hair-opt",
                      on ? "is-on" : "",
                      ok ? "is-ok" : "",
                      bad ? "is-err" : "",
                      miss ? "is-miss" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={cls}
                        aria-pressed={on}
                        onClick={() => {
                          setHairChecked(false);
                          setHairAns((prev) => ({ ...prev, [item.id]: opt }));
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={hairChecked}
          score={hairScore}
          total={cuttingHairMeanings.length}
          onCheck={() => setHairChecked(true)}
          onReset={() => {
            setHairChecked(false);
            setHairAns({});
          }}
        />
      </section>

      <section id="l40-imp" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Unit 4C</p>
          <h2>Dos and don&apos;ts · Imperatives</h2>
          <p className="lesson22-section-desc">
            Наказовий спосіб потрібен, щоб давати поради, інструкції або
            говорити, що робити чи не робити.
          </p>
        </div>
        <div className="l40-imp-box">
          <div className="l40-imp-pair">
            <p>
              <span className="l40-imp-plus">+</span> Visit the museum. Drink
              tea. Take a coat.
            </p>
            <p>
              <span className="l40-imp-minus">−</span> Don&apos;t go to Oxford
              Street. Don&apos;t take taxis.
            </p>
          </div>
          <p>
            No <em>to</em>. No <em>I / you / we</em>. Just the verb:{" "}
            <strong>Go!</strong> <strong>Don&apos;t go!</strong>
          </p>
        </div>
      </section>

      <section id="l40-london" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Reading and vocabulary</p>
          <h2>Places in London</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> What places in London do you
          know? Tell your teacher.
        </p>
        <div className="l40-places">
          {londonPlaces.map((place) => (
            <span key={place} className="l38-chip">
              {place}
            </span>
          ))}
        </div>
      </section>

      <section id="l40-lydia" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2a · Messages</p>
          <h2>Dos and don&apos;ts for London</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">2a</strong> Read the text messages. Why
          is Lydia going to London?
        </p>
        <div className="l40-chat">
          <div className="l40-lydia">
            <p className="l40-lydia-msg">{lydiaOpening}</p>
            {broken40.lydia ? (
              <span className="l40-lydia-face" aria-hidden="true">
                👩
              </span>
            ) : (
              <img
                src={IMG40("lydia.png")}
                alt="Lydia"
                onError={() =>
                  setBroken40((prev) => ({ ...prev, lydia: true }))
                }
              />
            )}
          </div>
          <div className="l40-texts">
            {adviceTexts.map((item) => (
              <p key={item.who} className="l40-bubble">
                <strong>{item.who}:</strong>{" "}
                {item.parts.map((part, i) =>
                  "bold" in part && part.bold ? (
                    <strong key={i} className="l40-verb">
                      {part.t}
                    </strong>
                  ) : (
                    <span key={i}>{part.t}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
        <div className="l38-label-row" style={{ marginTop: "0.9rem" }}>
          <span className="l38-label-n">?</span>
          <select
            value={whyAns}
            onChange={(e) => {
              setWhyChecked(false);
              setWhyAns(e.target.value);
            }}
            className={drillSelClass(whyChecked, whyAns, lydiaWhy.answer)}
            aria-label={lydiaWhy.question}
          >
            <option value="">{lydiaWhy.question}</option>
            {lydiaWhy.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <CheckBar
          checked={whyChecked}
          score={whyAns === lydiaWhy.answer ? 1 : 0}
          total={1}
          onCheck={() => setWhyChecked(true)}
          onReset={() => {
            setWhyAns("");
            setWhyChecked(false);
          }}
        />
      </section>

      <section id="l40-verbs" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2b–2c · Verbs</p>
          <h2>try · go to · visit · take · drink · see</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">2b</strong> Read the text messages
          again. Complete 1–5 with the verbs in bold. Number 1 is an example.
        </p>
        {verbGaps.map((row, i) => (
          <p key={row.n} className="l40-gap-row">
            <strong>{row.n}</strong>
            {row.example ? (
              <span className="l40-ex">
                {row.slots[0].answer}
                {row.after}
              </span>
            ) : (
              <>
                {row.slots.map((slot, j) => (
                  <span key={`${row.n}-${j}`}>
                    {j > 0 ? " / " : null}
                    <select
                      value={verbAns[i]?.[j] ?? ""}
                      onChange={(e) => {
                        setVerbChecked(false);
                        setVerbAns((prev) =>
                          setSlot(prev, i, j, e.target.value),
                        );
                      }}
                      className={drillSelClass(
                        verbChecked,
                        verbAns[i]?.[j] ?? "",
                        slot.answer,
                      )}
                      aria-label={`Gap ${row.n}${row.slots.length > 1 ? `-${j + 1}` : ""}`}
                    >
                      <option value="">______</option>
                      {slot.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </span>
                ))}
                {row.after}
              </>
            )}
          </p>
        ))}
        <CheckBar
          checked={verbChecked}
          score={verbScore}
          total={verbItems.length}
          onCheck={() => setVerbChecked(true)}
          onReset={() => {
            setVerbAns(
              verbGaps.map((row) =>
                row.slots.map((slot) => (row.example ? slot.answer : "")),
              ),
            );
            setVerbChecked(false);
          }}
        />
        <p className="l31-ex-line" style={{ marginTop: "1.1rem" }}>
          <strong className="l31-ex-num">2c</strong> Listen and repeat the
          verbs in Exercise 2b.
        </p>
        <Unit4AudioBlock
          r={9}
          exercise="4C · 4.9"
          title="try, go to, visit, take, drink, see"
        />
      </section>

      <section id="l40-pics" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Photos</p>
          <h2>Complete 1–6</h2>
          <p className="lesson22-section-desc">
            Use phrases from Exercise 2b. Number 1 is an example.
          </p>
        </div>
        <div className="l40-pic-grid">
          {phrasePics.map((item) => (
            <figure key={item.n} className="l40-pic">
              {broken40[item.file] ? (
                <div className="l40-pic-face" aria-hidden="true">
                  {item.emoji}
                </div>
              ) : (
                <img
                  src={IMG40(item.file)}
                  alt=""
                  onError={() =>
                    setBroken40((prev) => ({ ...prev, [item.file]: true }))
                  }
                />
              )}
              <figcaption>
                <strong>{item.n}</strong>{" "}
                {item.example ? (
                  <span className="l40-ex">{item.phrase}</span>
                ) : (
                  <select
                    value={picAns[item.n] ?? ""}
                    onChange={(e) => {
                      setPicChecked(false);
                      setPicAns((prev) => ({
                        ...prev,
                        [item.n]: e.target.value,
                      }));
                    }}
                    className={drillSelClass(
                      picChecked,
                      picAns[item.n] ?? "",
                      item.phrase,
                    )}
                    aria-label={`Photo ${item.n}`}
                  >
                    <option value="">______</option>
                    {phraseBank
                      .filter((p) => p !== "drink tea")
                      .map((phrase) => (
                        <option key={phrase} value={phrase}>
                          {phrase}
                        </option>
                      ))}
                  </select>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
        <CheckBar
          checked={picChecked}
          score={picScore}
          total={picItems.length}
          onCheck={() => setPicChecked(true)}
          onReset={() => {
            setPicAns({ 1: "drink tea" });
            setPicChecked(false);
          }}
        />
      </section>

      <section id="l40-ticks" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Grammar</p>
          <h2>Good things in London</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">4</strong> Read the messages in
          Exercise 2a again. Tick the things that are good to do in London.
        </p>
        <div className="l38-check-list">
          {londonDoTicks.map((item) => {
            const on = Boolean(londonTick[item.id]);
            const rowCls =
              londonTickChecked && on !== item.tick ? "is-err" : "";
            return (
              <div key={item.id} className={`l40-tick-row${rowCls ? ` ${rowCls}` : ""}`}>
                <label
                  className={
                    londonTickChecked
                      ? on === item.tick
                        ? "is-ok"
                        : "is-err"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => {
                      setLondonTickChecked(false);
                      setLondonTick((prev) => ({
                        ...prev,
                        [item.id]: !on,
                      }));
                    }}
                  />
                  <span>
                    {item.id}. {item.label}
                  </span>
                </label>
                {londonTickChecked && on !== item.tick && (
                  <p className="l40-tick-hint">{item.hint}</p>
                )}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={londonTickChecked}
          score={londonTickScore}
          total={londonDoTicks.length}
          onCheck={() => setLondonTickChecked(true)}
          onReset={() => {
            setLondonTick({});
            setLondonTickChecked(false);
          }}
        />
      </section>

      <section id="l40-impbox" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Grammar box</p>
          <h2>Imperatives</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5</strong> Read and complete the
          grammar box. Use Exercise 2a to help you.
        </p>
        <div className="l40-imp-table-wrap">
          <p className="l40-imp-table-title">Imperatives</p>
          <table className="l40-imp-table">
            <tbody>
              <tr>
                <td>
                  <span className="l40-imp-plus">+</span> Visit Greenwich.
                </td>
                <td>
                  <span className="l40-imp-minus">−</span>{" "}
                  <GrammarGap
                    n={1}
                    value={impAns[0]}
                    answer={imperativeGaps[0].answer}
                    options={imperativeGaps[0].options}
                    checked={impChecked}
                    onChange={(v) => {
                      setImpChecked(false);
                      setImpAns((prev) => setAt(prev, 0, v));
                    }}
                  />{" "}
                  visit Greenwich.
                </td>
              </tr>
              <tr>
                <td>
                  <span className="l40-imp-plus">+</span> Take photos.
                </td>
                <td>
                  <span className="l40-imp-minus">−</span>{" "}
                  <GrammarGap
                    n={2}
                    value={impAns[1]}
                    answer={imperativeGaps[1].answer}
                    options={imperativeGaps[1].options}
                    checked={impChecked}
                    onChange={(v) => {
                      setImpChecked(false);
                      setImpAns((prev) => setAt(prev, 1, v));
                    }}
                  />{" "}
                  take photos.
                </td>
              </tr>
              <tr>
                <td>
                  <span className="l40-imp-plus">+</span>{" "}
                  <GrammarGap
                    n={3}
                    value={impAns[2]}
                    answer={imperativeGaps[2].answer}
                    options={imperativeGaps[2].options}
                    checked={impChecked}
                    onChange={(v) => {
                      setImpChecked(false);
                      setImpAns((prev) => setAt(prev, 2, v));
                    }}
                  />{" "}
                  a show.
                </td>
                <td>
                  <span className="l40-imp-minus">−</span> Don&apos;t see a
                  show.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CheckBar
          checked={impChecked}
          score={impScore}
          total={imperativeGaps.length}
          onCheck={() => setImpChecked(true)}
          onReset={() => {
            setImpAns(Array(imperativeGaps.length).fill(""));
            setImpChecked(false);
          }}
        />
      </section>

      <section id="l40-stress" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Pronunciation</p>
          <h2>Sentence stress</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">6a</strong> Listen and choose the
          correct stress pattern. Tap the stressed part in each sentence.
        </p>
        <Unit4AudioBlock
          r={10}
          exercise="4C · 4.10"
          title="Don't go… / Try… / Drink… — sentence stress"
        />
        <div className="l40-stress-list">
          {stressPatterns.map((item, i) => {
            const [optA, optB] = item.options;
            const picked = stressAns[i] ?? "";
            const segments = buildStressSegments(item.words, optA, optB);
            const rowOk = stressChecked && picked === item.answer;
            const rowErr = stressChecked && picked !== "" && picked !== item.answer;
            return (
              <div
                key={item.n}
                className={[
                  "l40-stress-item",
                  rowOk ? "is-ok" : "",
                  rowErr ? "is-err" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <strong>{item.n}</strong>
                <p className="l40-stress-line">
                  {segments.map((seg, si) =>
                    seg.kind === "mid" ? (
                      <span key={`${item.n}-m-${si}`}>{seg.text} </span>
                    ) : (
                      <button
                        key={`${item.n}-p-${si}`}
                        type="button"
                        className={[
                          "l40-stress-chunk",
                          picked === seg.optionId ? "is-on" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-pressed={picked === seg.optionId}
                        onClick={() => {
                          setStressChecked(false);
                          setStressAns((prev) => setAt(prev, i, seg.optionId));
                        }}
                      >
                        <span
                          className={
                            picked === seg.optionId ? "l40-stress-u" : undefined
                          }
                        >
                          {seg.text}
                        </span>
                      </button>
                    ),
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={stressChecked}
          score={stressScore}
          total={stressPatterns.length}
          onCheck={() => setStressChecked(true)}
          onReset={() => {
            setStressAns(Array(stressPatterns.length).fill(""));
            setStressChecked(false);
          }}
        />
        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">6b</strong> Listen again and repeat.
        </p>
      </section>

      <section id="l40-rome" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Writing</p>
          <h2>A trip to Rome</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">7</strong> Look at the pictures and the
          symbols. Make sentences about a trip to Rome. Number 1 is an example.
        </p>
        <div className="l40-rome-grid">
          {romeTrip.map((item) => {
            const val = romeAns[item.n] ?? "";
            const ok = romeChecked && romeOk(val, item.answers);
            return (
              <figure key={item.n} className="l40-rome-card">
                <div className="l40-rome-media">
                  {broken40[item.file] ? (
                    <div className="l40-pic-face" aria-hidden="true">
                      {item.emoji}
                    </div>
                  ) : (
                    <img
                      src={IMG40(item.file)}
                      alt=""
                      onError={() =>
                        setBroken40((prev) => ({
                          ...prev,
                          [item.file]: true,
                        }))
                      }
                    />
                  )}
                  <span
                    className={`l40-rome-mark${item.doIt ? " is-do" : " is-dont"}`}
                    aria-label={item.doIt ? "do" : "don't"}
                  >
                    {item.doIt ? "✓" : "✗"}
                  </span>
                </div>
                <figcaption>
                  <strong>{item.n}</strong>{" "}
                  {item.example ? (
                    <span className="l40-ex">{item.answers[0]}</span>
                  ) : (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => {
                        setRomeChecked(false);
                        setRomeAns((prev) => ({
                          ...prev,
                          [item.n]: e.target.value,
                        }));
                      }}
                      className={
                        !romeChecked
                          ? "l22-gap-input"
                          : ok
                            ? "l22-gap-input is-ok"
                            : val.trim()
                              ? "l22-gap-input is-err"
                              : "l22-gap-input"
                      }
                      placeholder={
                        item.doIt ? "Visit / Try / See …" : "Don't …"
                      }
                      aria-label={`Rome sentence ${item.n}`}
                    />
                  )}
                  {romeChecked && !item.example && !ok && (
                    <span className="hw35-tip">{item.answers[0]}</span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
        <CheckBar
          checked={romeChecked}
          score={romeScore}
          total={romeItems.length}
          onCheck={() => setRomeChecked(true)}
          onReset={() => {
            setRomeAns({ 1: "Drink coffee." });
            setRomeChecked(false);
          }}
        />
      </section>

      <section id="l40-city" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8–9 · Speaking</p>
          <h2>Dos and don&apos;ts for your city</h2>
        </div>
        <p className="l38-speak-banner l38-speak-banner--prep">Prepare</p>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">8</strong> Your friend wants to visit
          your city. Complete the table of dos and don&apos;ts.
        </p>
        <div className="l40-city-hints">
          {citySpeakHints.map((h) => (
            <span key={h} className="l38-chip">
              {h}
            </span>
          ))}
        </div>
        <div className="l40-city-table">
          <div>
            <h3>Dos</h3>
            {myDos.map((line, i) => (
              <input
                key={`do-${i}`}
                type="text"
                className="l22-gap-input"
                value={line}
                onChange={(e) => {
                  const next = [...myDos];
                  next[i] = e.target.value;
                  setMyDos(next);
                }}
                placeholder={`${i + 1}. Visit …`}
                aria-label={`My do ${i + 1}`}
              />
            ))}
          </div>
          <div>
            <h3>Don&apos;ts</h3>
            {myDonts.map((line, i) => (
              <input
                key={`dont-${i}`}
                type="text"
                className="l22-gap-input"
                value={line}
                onChange={(e) => {
                  const next = [...myDonts];
                  next[i] = e.target.value;
                  setMyDonts(next);
                }}
                placeholder={`${i + 1}. Don't …`}
                aria-label={`My don't ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <p className="l38-speak-banner">Speak</p>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">9</strong> Tell your teacher your dos
          and don&apos;ts for your city. Then ask about the teacher&apos;s city.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <em>
              Go to the Eiffel Tower. Take photos. Don&apos;t have coffee there.
              It&apos;s expensive!
            </em>
          </p>
        </blockquote>
      </section>

      <section id="l40-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Correct spelling and grammar in a short people description.</li>
          <li>
            Explain <em>cutting hair</em> vs <em>my / a / the client&apos;s hair</em>.
          </li>
          <li>Give advice: Visit the museum. Don&apos;t take taxis.</li>
          <li>
            Write dos and don&apos;ts for a trip (Drink coffee. Don&apos;t take a
            coat.).
          </li>
          <li>Tell your teacher dos and don&apos;ts for your city.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/hw-40">
            HW40
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-41">
            Lesson 41 →
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-39">
            ← Lesson 39
          </Link>
          <Link className="l25-cr-mini-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
