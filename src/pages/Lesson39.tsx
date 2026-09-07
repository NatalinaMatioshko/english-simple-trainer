import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { CheckBar, ImgOrFace, PhotoCard } from "../components/lesson38/L38Ui";
import Unit4AudioBlock from "../components/Unit4AudioBlock";
import {
  makeQuestions,
  packSuggest,
  questionGrammar,
  roseLines,
  samHasGot,
  samWhere,
  speakBagPrompts,
  travelObjects,
  tripLabels,
  tripScenes,
} from "../data/lesson39";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson38.css";

export default function Lesson39() {
  const [objPick, setObjPick] = useState<string | null>(null);
  const [objAns, setObjAns] = useState<Record<string, string>>({});
  const [objChecked, setObjChecked] = useState(false);
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
  const [qAns, setQAns] = useState(() => Array(questionGrammar.length).fill(""));
  const [qChecked, setQChecked] = useState(false);
  const [qRows, setQRows] = useState(() => initWordOrderRows(makeQuestions));
  const [qRowsChecked, setQRowsChecked] = useState(false);
  const [roseOrder, setRoseOrder] = useState<string[]>([]);
  const [roseChecked, setRoseChecked] = useState(false);

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
  const qScore = questionGrammar.filter((item, i) => qAns[i] === item.answer)
    .length;
  const roseScore = roseLines.filter(
    (line) => roseOrder[line.order - 1] === line.id,
  ).length;
  const roseById = Object.fromEntries(roseLines.map((line) => [line.id, line]));

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
              Unit 4B · pack for a trip · Have / Has … got?
            </p>
            <p className="lesson22-subtitle">
              Name travel things, pack a bag, then ask{" "}
              <strong>Have you got…?</strong> with your teacher.
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
          <span>passport · tickets</span>
          <span>bag · camera · keys</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l39-objects">1 Pack</a>
          <a href="#l39-trips">2 Trips</a>
          <a href="#l39-sam">3 Sam</a>
          <a href="#l39-ask">4 Questions</a>
          <a href="#l39-rose">5 Dialogue</a>
          <a href="#l39-speak">6 Bag</a>
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
          {travelObjects.map((item) => (
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
          {travelObjects.map((item) => {
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
                <small>
                  {item.id}. {chosen || "?"}
                </small>
              </button>
            );
          })}
        </div>
        <CheckBar
          checked={objChecked}
          score={objScore}
          total={travelObjects.length}
          onCheck={() => setObjChecked(true)}
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
        />
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Tick the things Sam has got.
        </p>
        <div className="l38-check-list">
          {samHasGot.map((item) => {
            const on = Boolean(samTick[item.id]);
            return (
              <label
                key={item.id}
                className={
                  samTickChecked
                    ? on === item.answer
                      ? "is-ok"
                      : "is-err"
                    : ""
                }
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => {
                    setSamTickChecked(false);
                    setSamTick((prev) => ({ ...prev, [item.id]: !on }));
                  }}
                />
                {item.label}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={samTickChecked}
          score={samTickScore}
          total={samHasGot.length}
          onCheck={() => setSamTickChecked(true)}
        />
      </section>

      <section id="l39-ask" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Grammar</p>
          <h2>Have / Has … got?</h2>
          <p className="lesson22-section-desc">
            Complete the question forms, then make questions.
          </p>
        </div>
        {questionGrammar.map((item, i) => (
          <div key={item.id} className="l38-label-row">
            <span className="l38-label-n">{i + 1}</span>
            <div>
              <p style={{ margin: "0 0 0.35rem" }}>{item.prompt}</p>
              <select
                value={qAns[i]}
                onChange={(e) => {
                  setQChecked(false);
                  const next = [...qAns];
                  next[i] = e.target.value;
                  setQAns(next);
                }}
                className={drillSelClass(qChecked, qAns[i], item.answer)}
              >
                <option value="">___</option>
                {item.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <CheckBar
          checked={qChecked}
          score={qScore}
          total={questionGrammar.length}
          onCheck={() => setQChecked(true)}
        />
        <Unit4AudioBlock
          r={5}
          exercise="4B · R5"
          title="Have you got…? Yes, I have. / Has it got…? Yes, it has."
        />
        <div style={{ marginTop: "1rem" }}>
          <WordOrderBoard
            items={makeQuestions}
            rows={qRows}
            setRows={setQRows}
            checked={qRowsChecked}
            setChecked={setQRowsChecked}
          />
        </div>
      </section>

      <section id="l39-rose" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Dialogue</p>
          <h2>Rose and her mum</h2>
          <p className="lesson22-section-desc">
            Tap the lines in the correct order.
          </p>
        </div>
        <div className="l38-order">
          {roseLines.map((line) => {
            const pos = roseOrder.indexOf(line.id);
            const expected = roseById[line.id]?.order;
            const cls = [
              "l38-order-btn",
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
                <span className="l38-order-n">{pos >= 0 ? pos + 1 : "·"}</span>
                <span>
                  <strong>{line.who}:</strong> {line.text}
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
        />
      </section>

      <section id="l39-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Speaking</p>
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

      <section id="l39-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Ask: Have you got your tickets? Has she got a camera?</li>
          <li>Answer: Yes, I have. / No, I haven&apos;t. Yes, she has.</li>
          <li>Pack a bag and tell your teacher what you have got.</li>
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
