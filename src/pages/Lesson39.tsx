import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { CheckBar, ImgOrFace, PhotoCard } from "../components/lesson38/L38Ui";
import Unit4AudioBlock from "../components/Unit4AudioBlock";
import { shuffle } from "../utils/array";
import {
  makeQuestions,
  packSuggest,
  questionGrammar,
  roseLines,
  sameOrDifferent,
  samHasGot,
  samWhere,
  speakBagPrompts,
  travelObjects,
  tripLabels,
  tripScenes,
  underlineDialogue,
} from "../data/lesson39";
import {
  adviceTexts,
  citySpeakHints,
  IMG40,
  imperativeGaps,
  londonDoTicks,
  londonPlaces,
  lydiaWhy,
  phraseBank,
  phrasePics,
  romeTrip,
  stressPatterns,
  verbGaps,
} from "../data/lesson40";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson38.css";
import "../styles/lesson40.css";

const underlineTaps = underlineDialogue.flatMap((line) =>
  line.parts.filter(
    (part): part is { id: string; text: string; question: boolean } =>
      "id" in part,
  ),
);

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

export default function Lesson39() {
  const [objPick, setObjPick] = useState<string | null>(null);
  const [objAns, setObjAns] = useState<Record<string, string>>({});
  const [objChecked, setObjChecked] = useState(false);
  const [objectWords] = useState(() => shuffle([...travelObjects]));
  const [objectPics] = useState(() => shuffle([...travelObjects]));
  const [tripAns, setTripAns] = useState<Record<string, string>>({});
  const [tripChecked, setTripChecked] = useState(false);
  const [packTrip, setPackTrip] = useState<(typeof tripLabels)[number]>(
    "a holiday in a hot country",
  );
  const [packSel, setPackSel] = useState<string[]>([]);
  const [packChecked, setPackChecked] = useState(false);
  const [samWhereAns, setSamWhereAns] = useState("");
  const [samWhereChecked, setSamWhereChecked] = useState(false);
  const [samTick, setSamTick] = useState<Record<string, boolean>>({});
  const [samTickChecked, setSamTickChecked] = useState(false);
  const [underSel, setUnderSel] = useState<Record<string, boolean>>({});
  const [underChecked, setUnderChecked] = useState(false);
  const [qAns, setQAns] = useState(() => Array(questionGrammar.length).fill(""));
  const [qChecked, setQChecked] = useState(false);
  const [sdAns, setSdAns] = useState<string[]>(() =>
    Array(sameOrDifferent.length).fill(""),
  );
  const [sdChecked, setSdChecked] = useState(false);
  const [qRows, setQRows] = useState(() => initWordOrderRows(makeQuestions));
  const [qRowsChecked, setQRowsChecked] = useState(false);
  const [roseOrder, setRoseOrder] = useState<string[]>(["e"]);
  const [roseChecked, setRoseChecked] = useState(false);
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

  const objScore = travelObjects.filter((item) => objAns[item.id] === item.word)
    .length;
  const tripScore = tripScenes.filter((item) => tripAns[item.id] === item.answer)
    .length;
  const suggest = packSuggest[packTrip] ?? [];
  const packScore = travelObjects.filter((item) => {
    const want = suggest.includes(item.word);
    const got = packSel.includes(item.word);
    return want === got;
  }).length;
  const samTickScore = samHasGot.filter(
    (item) => Boolean(samTick[item.id]) === item.answer,
  ).length;
  const underScore = underlineTaps.filter(
    (part) => Boolean(underSel[part.id]) === part.question,
  ).length;
  const qScore = questionGrammar.filter((item, i) => qAns[i] === item.answer)
    .length;
  const sdScore = sameOrDifferent.filter((item, i) => sdAns[i] === item.answer)
    .length;
  const roseScore = roseLines.filter(
    (line) => roseOrder[line.order - 1] === line.id,
  ).length;
  const roseById = Object.fromEntries(roseLines.map((line) => [line.id, line]));
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
    (item) => Boolean(londonTick[item.id]) === item.good,
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

  const clickObject = (id: string) => {
    setObjChecked(false);
    if (objAns[id]) {
      setObjAns((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      return;
    }
    if (!objPick) return;
    setObjAns((prev) => ({ ...prev, [id]: objPick }));
    setObjPick(null);
  };

  const clickRose = (id: string) => {
    setRoseChecked(false);
    setRoseOrder((prev) => {
      if (id === "e") return prev.includes("e") ? prev : ["e", ...prev];
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= roseLines.length) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={39} />
            <h1>Have you got it?</h1>
            <p className="lesson22-topic-pill">
              Unit 4B–4C · Have / Has … got? · imperatives
            </p>
            <p className="lesson22-subtitle">
              Pack a bag and ask <strong>Have you got…?</strong> Then give
              advice with imperatives: <strong>Visit…</strong> /{" "}
              <strong>Don&apos;t go…</strong>
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
              to="/lesson-38"
            >
              ← Lesson 38
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/hw-39"
            >
              HW39 →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Have you got…?</span>
          <span>Visit / Don&apos;t go</span>
          <span>London advice</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l39-objects">1 Pack</a>
          <a href="#l39-trips">2 Trips</a>
          <a href="#l39-sam">3 Sam</a>
          <a href="#l39-ask">4 Grammar</a>
          <a href="#l39-pron">6 Sounds</a>
          <a href="#l39-makeq">7 Questions</a>
          <a href="#l39-rose">8 Rose</a>
          <a href="#l39-speak">Bag</a>
          <a href="#l39-imp">Part 2 · Imperatives</a>
          <a href="#l39-london">London</a>
          <a href="#l39-lydia">Messages</a>
          <a href="#l39-verbs">Verbs</a>
          <a href="#l39-pics">Photos</a>
          <a href="#l39-ticks">4 Tick</a>
          <a href="#l39-impbox">5 Grammar</a>
          <a href="#l39-stress">6 Stress</a>
          <a href="#l39-rome">7 Rome</a>
          <a href="#l39-city">8–9 City</a>
          <a href="#l39-exit">Exit</a>
        </div>
      </section>

      <section id="l39-objects" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · 4B Vocabulary</p>
          <h2>Have you got it?</h2>
          <p className="lesson22-section-desc">
            Tap a word, then tap the picture.
          </p>
        </div>
        <div className="l38-chip-bank">
          {objectWords.map((item) => (
            <button
              key={item.word}
              type="button"
              className={`l38-chip${objPick === item.word ? " is-on" : ""}${
                Object.values(objAns).includes(item.word) ? " is-used" : ""
              }`}
              onClick={() => setObjPick(item.word)}
            >
              {item.word}
            </button>
          ))}
        </div>
        <div className="l38-obj-grid">
          {objectPics.map((item) => {
            const chosen = objAns[item.id];
            const cls = [
              "l38-obj",
              objPick && !chosen ? "is-on" : "",
              objChecked && chosen === item.word ? "is-ok" : "",
              objChecked && chosen && chosen !== item.word ? "is-err" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={item.id}
                type="button"
                className={cls}
                onClick={() => clickObject(item.id)}
              >
                <ImgOrFace
                  file={item.file}
                  emoji={item.emoji}
                  label={item.word}
                />
                <small>{chosen || "?"}</small>
              </button>
            );
          })}
        </div>
        <CheckBar
          checked={objChecked}
          score={objScore}
          total={travelObjects.length}
          onCheck={() => setObjChecked(true)}
          onReset={() => {
            setObjPick(null);
            setObjAns({});
            setObjChecked(false);
          }}
        />
        <Unit4AudioBlock
          r={3}
          exercise="4B · R3"
          title="Listen and repeat: bag, passport, tickets, sunglasses…"
        />
      </section>

      <section id="l39-trips" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Situations</p>
          <h2>What do you need?</h2>
          <p className="lesson22-section-desc">
            Match the photos, then tick things for one trip. Discuss your list
            with your teacher.
          </p>
        </div>
        <div className="l38-photo-grid">
          {tripScenes.map((p) => (
            <div key={p.id}>
              <PhotoCard file={p.file} emoji={p.emoji} caption={p.caption} />
              <select
                value={tripAns[p.id] ?? ""}
                onChange={(e) => {
                  setTripChecked(false);
                  setTripAns((prev) => ({ ...prev, [p.id]: e.target.value }));
                }}
                className={drillSelClass(
                  tripChecked,
                  tripAns[p.id] ?? "",
                  p.answer,
                )}
                style={{ width: "100%", marginTop: "0.45rem" }}
              >
                <option value="">This is…</option>
                {tripLabels.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <CheckBar
          checked={tripChecked}
          score={tripScore}
          total={tripScenes.length}
          onCheck={() => setTripChecked(true)}
          onReset={() => {
            setTripAns({});
            setTripChecked(false);
          }}
        />
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Choose a trip and tick the things you need.
        </p>
        <select
          value={packTrip}
          onChange={(e) => {
            setPackChecked(false);
            setPackSel([]);
            setPackTrip(e.target.value as (typeof tripLabels)[number]);
          }}
          className="l25-cr-sel"
        >
          {tripLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <div className="l38-check-list" style={{ marginTop: "0.75rem" }}>
          {travelObjects.map((item) => {
            const on = packSel.includes(item.word);
            const want = suggest.includes(item.word);
            return (
              <label
                key={item.word}
                className={
                  packChecked ? (on === want ? "is-ok" : "is-err") : ""
                }
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => {
                    setPackChecked(false);
                    setPackSel((prev) =>
                      prev.includes(item.word)
                        ? prev.filter((w) => w !== item.word)
                        : [...prev, item.word],
                    );
                  }}
                />
                {item.emoji} {item.word}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={packChecked}
          score={packScore}
          total={travelObjects.length}
          onCheck={() => setPackChecked(true)}
          onReset={() => {
            setPackSel([]);
            setPackChecked(false);
          }}
        />
      </section>

      <section id="l39-sam" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Listening</p>
          <h2>Sam is ready</h2>
          <p className="lesson22-section-desc">
            Listen. Where is Sam going? Then tick the things he has got.
          </p>
        </div>
        <Unit4AudioBlock
          r={4}
          exercise="4B · R4"
          title="Zara and Sam · Have you got your camera?"
          transcript={
            <>
              <p>
                <strong>Zara:</strong> OK … Have you got your camera?
              </p>
              <p>
                <strong>Sam:</strong> No, I haven&apos;t — but I&apos;ve got my
                phone. And Fifi has got a good camera.
              </p>
              <p>
                <strong>Zara:</strong> OK. You&apos;re ready. Oh, have you got
                your tickets?
              </p>
              <p>
                <strong>Sam:</strong> Tickets, tickets …
              </p>
              <p>
                <strong>Zara:</strong> Has Fifi got your tickets?
              </p>
              <p>
                <strong>Sam:</strong> Oh, yes, she has! Phew!
              </p>
            </>
          }
        />
        <div className="l38-label-row" style={{ marginTop: "0.85rem" }}>
          <span className="l38-label-n">?</span>
          <select
            value={samWhereAns}
            onChange={(e) => {
              setSamWhereChecked(false);
              setSamWhereAns(e.target.value);
            }}
            className={drillSelClass(
              samWhereChecked,
              samWhereAns,
              samWhere.answer,
            )}
          >
            <option value="">Where is Sam going?</option>
            {samWhere.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <CheckBar
          checked={samWhereChecked}
          score={samWhereAns === samWhere.answer ? 1 : 0}
          total={1}
          onCheck={() => setSamWhereChecked(true)}
          onReset={() => {
            setSamWhereAns("");
            setSamWhereChecked(false);
          }}
        />
        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">3b</strong> Tick the things Sam has
          got.
        </p>
        <div className="l39-pad" role="group" aria-label="Sam's list">
          <div className="l39-pad-sheet">
            <div className="l39-pad-rings" aria-hidden="true">
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i} className="l39-pad-ring" />
              ))}
            </div>
            {samHasGot.map((item) => {
              const on = Boolean(samTick[item.id]);
              const cls = [
                "l39-pad-item",
                on ? "is-on" : "",
                samTickChecked && on && item.answer ? "is-ok" : "",
                samTickChecked && on !== item.answer ? "is-err" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={item.id}
                  type="button"
                  className={cls}
                  aria-pressed={on}
                  onClick={() => {
                    setSamTickChecked(false);
                    setSamTick((prev) => ({ ...prev, [item.id]: !on }));
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <CheckBar
          checked={samTickChecked}
          score={samTickScore}
          total={samHasGot.length}
          onCheck={() => setSamTickChecked(true)}
          onReset={() => {
            setSamTick({});
            setSamTickChecked(false);
          }}
        />
      </section>

      <section id="l39-ask" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4–5 · Grammar</p>
          <h2>have / has got: questions</h2>
          <p className="lesson22-section-desc">
            First underline the questions, then complete the grammar box.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">4</strong> Read part of the conversation
          from Exercise 3a. Tap the questions to underline them.
        </p>
        <div className="l39-dial">
          {underlineDialogue.map((line, li) => (
            <p key={`${line.who}-${li}`} className="l39-dial-line">
              <strong>{line.who}:</strong>{" "}
              {line.parts.map((part, pi) => {
                if (!("id" in part)) {
                  return <span key={pi}>{part.text}</span>;
                }
                const on = Boolean(underSel[part.id]);
                const cls = [
                  "l39-dial-tap",
                  on ? "is-on" : "",
                  underChecked && part.question && on ? "is-ok" : "",
                  underChecked && on !== part.question ? "is-err" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <button
                    key={part.id}
                    type="button"
                    className={cls}
                    aria-pressed={on}
                    onClick={() => {
                      setUnderChecked(false);
                      setUnderSel((prev) => ({
                        ...prev,
                        [part.id]: !on,
                      }));
                    }}
                  >
                    {part.text}
                  </button>
                );
              })}
            </p>
          ))}
        </div>
        <CheckBar
          checked={underChecked}
          score={underScore}
          total={underlineTaps.length}
          onCheck={() => setUnderChecked(true)}
          onReset={() => {
            setUnderSel({});
            setUnderChecked(false);
          }}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.15rem" }}>
          <strong className="l31-ex-num">5</strong> Read and complete the grammar
          box. Use Exercise 4 to help you.
        </p>
        <div className="l39-qbox">
          <p className="l39-qbox-title">have/has got: questions</p>
          <table className="l39-qbox-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Short answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={2}>
                  <GrammarGap
                    n={1}
                    value={qAns[0]}
                    answer={questionGrammar[0].answer}
                    options={questionGrammar[0].options}
                    checked={qChecked}
                    onChange={(v) => {
                      setQChecked(false);
                      setQAns((prev) => setAt(prev, 0, v));
                    }}
                  />{" "}
                  I/we/you/they got a ticket?
                </td>
                <td>
                  <span className="l39-qbox-sign">+</span> Yes, I/we/you/they{" "}
                  <GrammarGap
                    n={2}
                    value={qAns[1]}
                    answer={questionGrammar[1].answer}
                    options={questionGrammar[1].options}
                    checked={qChecked}
                    onChange={(v) => {
                      setQChecked(false);
                      setQAns((prev) => setAt(prev, 1, v));
                    }}
                  />
                  .
                </td>
              </tr>
              <tr>
                <td>
                  <span className="l39-qbox-sign">−</span> No, I/we/you/they{" "}
                  <span className="l39-qbox-fill">haven&apos;t</span>.
                </td>
              </tr>
              <tr>
                <td rowSpan={2}>
                  <GrammarGap
                    n={3}
                    value={qAns[2]}
                    answer={questionGrammar[2].answer}
                    options={questionGrammar[2].options}
                    checked={qChecked}
                    onChange={(v) => {
                      setQChecked(false);
                      setQAns((prev) => setAt(prev, 2, v));
                    }}
                  />{" "}
                  he/she/it got a phone?
                </td>
                <td>
                  <span className="l39-qbox-sign">+</span> Yes, he/she/it{" "}
                  <GrammarGap
                    n={4}
                    value={qAns[3]}
                    answer={questionGrammar[3].answer}
                    options={questionGrammar[3].options}
                    checked={qChecked}
                    onChange={(v) => {
                      setQChecked(false);
                      setQAns((prev) => setAt(prev, 3, v));
                    }}
                  />
                  .
                </td>
              </tr>
              <tr>
                <td>
                  <span className="l39-qbox-sign">−</span> No, he/she/it{" "}
                  <GrammarGap
                    n={5}
                    value={qAns[4]}
                    answer={questionGrammar[4].answer}
                    options={questionGrammar[4].options}
                    checked={qChecked}
                    onChange={(v) => {
                      setQChecked(false);
                      setQAns((prev) => setAt(prev, 4, v));
                    }}
                  />
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CheckBar
          checked={qChecked}
          score={qScore}
          total={questionGrammar.length}
          onCheck={() => setQChecked(true)}
          onReset={() => {
            setQAns(Array(questionGrammar.length).fill(""));
            setQChecked(false);
          }}
        />
      </section>

      <section id="l39-pron" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Pronunciation</p>
          <h2>Have / has — same or different?</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">6a</strong> Listen to two
          conversations. Do the words in blue sound the same or different?
        </p>
        <Unit4AudioBlock
          r={5}
          exercise="4B · 4.5"
          title="Have you got…? Yes, I have. / Has it got…? Yes, it has."
        />
        <div className="l39-sd">
          {sameOrDifferent.map((item, i) => {
            const val = sdAns[i] ?? "";
            return (
              <div key={item.n} className="l39-sd-item">
                <p className="l39-sd-line">
                  <strong>{item.n}</strong>{" "}
                  <strong>A:</strong>{" "}
                  <span className="l38-blue">{item.aBlue}</span>
                  {item.aRest}
                </p>
                <p className="l39-sd-line">
                  <strong>B:</strong> {item.bBefore}
                  <span className="l38-blue">{item.bBlue}</span>
                  {item.bRest}
                </p>
                <div className="l39-sd-opts">
                  {(["same", "different"] as const).map((opt) => {
                    const on = val === opt;
                    const cls = [
                      "l38-chip",
                      on ? "is-on" : "",
                      sdChecked && on && opt === item.answer ? "is-ok" : "",
                      sdChecked && on && opt !== item.answer ? "is-err" : "",
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
                          setSdChecked(false);
                          setSdAns((prev) => setAt(prev, i, opt));
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
          checked={sdChecked}
          score={sdScore}
          total={sameOrDifferent.length}
          onCheck={() => setSdChecked(true)}
          onReset={() => {
            setSdAns(Array(sameOrDifferent.length).fill(""));
            setSdChecked(false);
          }}
        />
        {sdChecked && (
          <p className="lesson22-section-desc" style={{ marginTop: "0.55rem" }}>
            They sound <strong>different</strong>: weak in the question{" "}
            <em>/həv/, /həz/</em>, strong in the short answer{" "}
            <em>/hæv/, /hæz/</em>.
          </p>
        )}
        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">6b</strong> Listen again and repeat.
        </p>
      </section>

      <section id="l39-makeq" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Questions</p>
          <h2>Make questions</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">7a</strong> Make questions using the
          prompts. Number 1 is an example.
        </p>
        <WordOrderBoard
          items={makeQuestions}
          rows={qRows}
          setRows={setQRows}
          checked={qRowsChecked}
          setChecked={setQRowsChecked}
        />
        <p className="l31-ex-line" style={{ marginTop: "0.85rem" }}>
          <strong className="l31-ex-num">7b</strong> Ask your teacher the
          questions and answer them.
        </p>
      </section>

      <section id="l39-rose" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · Dialogue</p>
          <h2>Rose and her mum</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">8</strong> Put the conversation in the
          correct order.
        </p>
        <div className="l38-order">
          {[...roseLines]
            .sort((a, b) => a.id.localeCompare(b.id))
            .map((line) => {
            const pos = roseOrder.indexOf(line.id);
            const expected = roseById[line.id]?.order;
            const cls = [
              "l38-order-btn",
              "l39-order-btn",
              pos >= 0 ? "is-on" : "",
              roseChecked && pos + 1 === expected ? "is-ok" : "",
              roseChecked && pos >= 0 && pos + 1 !== expected ? "is-err" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={line.id}
                type="button"
                className={cls}
                onClick={() => clickRose(line.id)}
              >
                <span className="l38-order-n">{line.id}</span>
                <span>
                  <strong>{line.who}:</strong> {line.text}
                </span>
                <span className="l39-rose-pos" aria-hidden="true">
                  {pos >= 0 ? pos + 1 : ""}
                </span>
              </button>
            );
          })}
        </div>
        <CheckBar
          checked={roseChecked}
          score={roseScore}
          total={roseLines.length}
          onCheck={() => setRoseChecked(true)}
          onReset={() => {
            setRoseOrder(["e"]);
            setRoseChecked(false);
          }}
        />
      </section>

      <section id="l39-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>What&apos;s in your bag?</h2>
          <p className="lesson22-section-desc">
            Take turns with your teacher. Ask and answer.
          </p>
        </div>
        <ul className="l22-goals-list">
          {speakBagPrompts.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            A: <em>OK, this is my bag for Canada.</em>
            <br />
            B: <em>Have you got your passport?</em>
            <br />
            A: <em>Yes, I have.</em>
          </p>
        </blockquote>
      </section>

      <section id="l39-imp" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Unit 4C</p>
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

      <section id="l39-london" className="lesson22-block panel">
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

      <section id="l39-lydia" className="lesson22-block panel">
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
            <p className="l40-lydia-msg">
              I have a work trip to London next week! Have you got any{" "}
              <em>dos</em> and <em>don&apos;ts</em> for London? Lydia xx
            </p>
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
                  part.bold ? (
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

      <section id="l39-verbs" className="lesson22-block panel">
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

      <section id="l39-pics" className="lesson22-block panel">
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

      <section id="l39-ticks" className="lesson22-block panel">
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
            return (
              <label
                key={item.id}
                className={
                  londonTickChecked
                    ? on === item.good
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

      <section id="l39-impbox" className="lesson22-block panel">
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

      <section id="l39-stress" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Pronunciation</p>
          <h2>Sentence stress</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">6a</strong> Listen and choose the
          correct stress pattern. Underlined words are stressed.
        </p>
        <Unit4AudioBlock
          r={10}
          exercise="4C · 4.10"
          title="Don't go… / Try… / Drink… — sentence stress"
        />
        <div className="l40-stress-list">
          {stressPatterns.map((item, i) => (
            <div key={item.n} className="l40-stress-item">
              <strong>{item.n}</strong>
              <div className="l40-stress-opts">
                {item.options.map((opt) => {
                  const on = stressAns[i] === opt.id;
                  const cls = [
                    "l40-stress-btn",
                    on ? "is-on" : "",
                    stressChecked && on && opt.id === item.answer
                      ? "is-ok"
                      : "",
                    stressChecked && on && opt.id !== item.answer
                      ? "is-err"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={cls}
                      aria-pressed={on}
                      onClick={() => {
                        setStressChecked(false);
                        setStressAns((prev) => setAt(prev, i, opt.id));
                      }}
                    >
                      {opt.words.map((w, wi) => (
                        <span
                          key={`${opt.id}-${wi}`}
                          className={
                            opt.stress.includes(wi) ? "l40-stress-u" : undefined
                          }
                        >
                          {w}
                          {wi < opt.words.length - 1 ? " " : ""}
                        </span>
                      ))}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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

      <section id="l39-rome" className="lesson22-block panel">
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

      <section id="l39-city" className="lesson22-block panel">
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

      <section id="l39-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Ask: Have you got your tickets? Has she got a camera?</li>
          <li>Answer: Yes, I have. / No, I haven&apos;t. Yes, she has.</li>
          <li>Give advice: Visit the museum. Don&apos;t take taxis.</li>
          <li>Write dos and don&apos;ts for a trip (Drink coffee. Don&apos;t take a coat.).</li>
          <li>Tell your teacher dos and don&apos;ts for your city.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/hw-39">
            HW39
          </Link>
          <Link className="l25-cr-mini-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-38">
            ← Lesson 38
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
