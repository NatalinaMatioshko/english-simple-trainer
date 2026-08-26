import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import Unit3AudioBlock from "../components/Unit3AudioBlock";
import Lesson31Figure from "../components/lesson31/Lesson31Figure";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  conversations,
  directionPhraseOptions,
  directionPics,
  lesson35Images,
  listenWhere,
  mapPlaces,
  mapStreets,
  myTownFacts,
  phraseGapBank,
  phraseGaps,
  speakingPlaces,
  usefulPhrases,
} from "../data/lesson35";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson35.css";

const PROMOVA_URL =
  "https://promova.com/uk/my-plan/appBJb23Byfy5g6CE/20070?unit=appBJb23Byfy5g6CE9";

const IMG35 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson35/${file}`;

const NEXT_LESSON_VIDEO_ID = "YZKCS60loaQ";

const norm = (s: string) => s.trim().toLowerCase().replace(/[.!?]+$/, "");

export default function Lesson35() {
  const [picked, setPicked] = useState<string[]>([]);
  const [placesChecked, setPlacesChecked] = useState(false);

  const [whereAns, setWhereAns] = useState(() =>
    Array(listenWhere.length).fill(""),
  );
  const [whereChecked, setWhereChecked] = useState(false);

  const [picAns, setPicAns] = useState(() =>
    Array(directionPics.length).fill(""),
  );
  const [picChecked, setPicChecked] = useState(false);

  const [gapAns, setGapAns] = useState(() => Array(phraseGaps.length).fill(""));
  const [gapChecked, setGapChecked] = useState(false);

  const [convAns, setConvAns] = useState<Record<string, string>>({});
  const [convChecked, setConvChecked] = useState(false);

  const [speakPlace, setSpeakPlace] = useState("");
  const [speakNotes, setSpeakNotes] = useState("");

  const placesScore = mapPlaces.filter(
    (p) => picked.includes(p.en) === p.onMap,
  ).length;
  const whereScore = listenWhere.filter(
    (q, i) => whereAns[i] === q.answer,
  ).length;
  const picScore = directionPics.filter(
    (p, i) => picAns[i] === p.answer,
  ).length;
  const gapScore = phraseGaps.filter(
    (g, i) => norm(gapAns[i] ?? "") === norm(g.answer),
  ).length;

  const convGaps = useMemo(
    () =>
      conversations.flatMap((c) =>
        c.lines.flatMap((l) =>
          l.segs.filter((s): s is Extract<typeof s, { kind: "gap" }> =>
            s.kind === "gap",
          ),
        ),
      ),
    [],
  );
  const convScore = convGaps.filter((g) => convAns[g.id] === g.answer).length;

  const toggleChip = (en: string) => {
    setPlacesChecked(false);
    setPicked((prev) =>
      prev.includes(en) ? prev.filter((p) => p !== en) : [...prev, en],
    );
  };

  const chipClass = (en: string, onMap: boolean) => {
    const on = picked.includes(en);
    if (!placesChecked) return `l35-chip${on ? " is-on" : ""}`;
    if (on && onMap) return "l35-chip is-ok";
    if (on && !onMap) return "l35-chip is-err";
    if (!on && onMap) return "l35-chip is-miss";
    return "l35-chip";
  };

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={35} />
            <h1>English in action · Directions</h1>
            <p className="lesson22-topic-pill">
              Unit 3D · ask for and give directions
            </p>
            <p className="lesson22-subtitle">
              Goal: <strong>ask for and give directions</strong> — Excuse me,
              where&apos;s the …? · Go straight on · Turn left / right · Go past
              the …
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
              to="/lesson-34"
            >
              ← Lesson 34
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-36"
            >
              Lesson 36 →
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/vocab"
            >
              Vocab →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Excuse me…</span>
          <span>Go straight on</span>
          <span>Turn left / right</span>
          <span>Go past the…</span>
          <span>It&apos;s on the right</span>
        </div>
      </section>

      {/* ── Promova ──────────────────────────────────────────── */}
      <section id="l35-promova" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Practice</p>
          <h2>Promova · unit practice</h2>
          <p className="lesson22-section-desc">
            Почни з Promova: відкрий урок і виконай вправи. Потім повернись сюди
            й розкажи викладачу, що було складно.
          </p>
        </div>
        <a
          className="l22-external-link"
          href={PROMOVA_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити урок у Promova →
        </a>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l35-promova">Promova</a>
          <a href="#l35-map">1 Map</a>
          <a href="#l35-listen">2 Listening</a>
          <a href="#l35-phrases">3 Useful phrases</a>
          <a href="#l35-conv">4 Conversations</a>
          <a href="#l35-speak">5 Speaking</a>
          <a href="#l35-town">My Town</a>
          <a href="#l35-exit">Exit</a>
          <a href="#l35-next">Next lesson</a>
        </div>
      </section>

      {/* ── 1 · Map ──────────────────────────────────────────── */}
      <section id="l35-map" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Map</p>
          <h2>What buildings can you see?</h2>
          <p className="lesson22-section-desc">
            Натисни на картинку, щоб відкрити мапу у великому розмірі.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Look at the map. What
          buildings can you see?
        </p>
        <Lesson31Figure
          src={IMG35(lesson35Images.townMap)}
          alt="Town map with Market Street, Bank Road, Station Road, Main Street and Park Street"
          caption="You are here · train station on Park Street"
          wide
          variant="map"
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">1b</strong> Tap only the places that are
          on the map.
        </p>
        <div className="l35-chip-box">
          {mapPlaces.map((p) => (
            <button
              key={p.en}
              type="button"
              className={chipClass(p.en, p.onMap)}
              onClick={() => toggleChip(p.en)}
              aria-pressed={picked.includes(p.en)}
            >
              {p.en}
            </button>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPlacesChecked(true)}
          >
            Check
          </button>
          {placesChecked && (
            <span className="l22-score">
              {placesScore} / {mapPlaces.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPicked(mapPlaces.filter((p) => p.onMap).map((p) => p.en));
              setPlacesChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPicked([]);
              setPlacesChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Streets on the map:
        </p>
        <div className="l25-wordbox">
          {mapStreets.map((s) => (
            <span key={s} className="l25-wordbox-item">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── 2 · Listening ────────────────────────────────────── */}
      <section id="l35-listen" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Listening</p>
          <h2>Where are they?</h2>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">2a</strong> Listen and answer the
          questions.
        </p>
        <Unit3AudioBlock
          r={14}
          exercise="3D · 2a"
          title="Asking for directions — where are they?"
        />
        <div className="l26-drill-list" style={{ marginTop: "0.85rem" }}>
          {listenWhere.map((q, i) => (
            <div
              key={q.id}
              className="l26-drill-row"
              style={{ flexWrap: "wrap", gap: "0.35rem" }}
            >
              <strong className="l26-drill-prompt">
                {i + 1}. {q.q}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={whereAns[i]}
                onChange={(e) => {
                  setWhereChecked(false);
                  const next = [...whereAns];
                  next[i] = e.target.value;
                  setWhereAns(next);
                }}
                className={drillSelClass(whereChecked, whereAns[i], q.answer)}
                aria-label={q.q}
              >
                <option value="">___</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setWhereChecked(true)}
          >
            Check
          </button>
          {whereChecked && (
            <span className="l22-score">
              {whereScore} / {listenWhere.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWhereAns(listenWhere.map((q) => q.answer));
              setWhereChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWhereAns(Array(listenWhere.length).fill(""));
              setWhereChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">2b</strong> Listen again and number the
          pictures in the order that you hear them. Then choose the phrase for
          each picture.
        </p>
        <p className="lesson22-section-desc">
          Слухай R14 і скажи викладачу порядок (1–6). Потім обери фразу під
          кожною картинкою й натисни <strong>Check</strong>.
        </p>
        <div className="l35-dir-grid">
          {directionPics.map((p, i) => (
            <div key={p.letter} className="l35-dir-card">
              <div className="l35-dir-head">
                <span className="l35-dir-letter">{p.letter}</span>
                <span className="l35-dir-ua">{p.ua}</span>
              </div>
              <Lesson31Figure src={IMG35(p.file)} alt={p.alt} />
              <select
                value={picAns[i]}
                onChange={(e) => {
                  setPicChecked(false);
                  const next = [...picAns];
                  next[i] = e.target.value;
                  setPicAns(next);
                }}
                className={drillSelClass(picChecked, picAns[i], p.answer)}
                aria-label={`Picture ${p.letter}`}
              >
                <option value="">Choose a phrase…</option>
                {directionPhraseOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPicChecked(true)}
          >
            Check
          </button>
          {picChecked && (
            <span className="l22-score">
              {picScore} / {directionPics.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPicAns(directionPics.map((p) => p.answer));
              setPicChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPicAns(Array(directionPics.length).fill(""));
              setPicChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">2c</strong> Trace the woman&apos;s route
          on the map in Exercise 1 and describe it to your teacher.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>Model.</strong>{" "}
            <em>
              She goes down Station Road, goes past the hotel, goes straight on
              and turns right onto Market Street.
            </em>
          </p>
        </blockquote>
      </section>

      {/* ── 3 · Useful phrases ───────────────────────────────── */}
      <section id="l35-phrases" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Useful phrases</p>
          <h2>Ask for and give directions</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">3</strong> Listen and repeat the
          phrases.
        </p>
        <Unit3AudioBlock
          r={15}
          exercise="3D · 3"
          title="Useful phrases — directions"
        />
        <div className="l35-phrase-box">
          {usefulPhrases.map((g) => (
            <div key={g.group} className="l35-phrase-group">
              <p className="l35-phrase-label">{g.group}</p>
              <ul className="l35-phrase-list">
                {g.items.map((it) => (
                  <li key={it.en}>
                    <strong>{it.en}</strong>
                    <span className="l35-phrase-ua">{it.ua}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">3b</strong> Complete the phrases with
          one word.
        </p>
        <div className="l25-wordbox" style={{ marginBottom: "0.85rem" }}>
          {phraseGapBank.map((w) => (
            <span key={w} className="l25-wordbox-item">
              {w}
            </span>
          ))}
        </div>
        <div className="l31-pc-doing-grid">
          {phraseGaps.map((g, i) => {
            const val = gapAns[i] ?? "";
            const ok = gapChecked && norm(val) === norm(g.answer);
            const err = gapChecked && val.trim() !== "" && !ok;
            return (
              <p key={g.id} className="l31-pc-doing-row">
                <strong>{i + 1}.</strong>
                {g.before && <span>{g.before}</span>}
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setGapChecked(false);
                    const next = [...gapAns];
                    next[i] = e.target.value;
                    setGapAns(next);
                  }}
                  className={[
                    "l22-gap-input",
                    ok ? "is-ok" : "",
                    err ? "is-err" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  placeholder="______"
                  aria-label={`Phrase ${i + 1}`}
                />
                <span>{g.after}</span>
              </p>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setGapChecked(true)}
          >
            Check
          </button>
          {gapChecked && (
            <span className="l22-score">
              {gapScore} / {phraseGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGapAns(phraseGaps.map((g) => g.answer));
              setGapChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGapAns(Array(phraseGaps.length).fill(""));
              setGapChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 4 · Conversations ────────────────────────────────── */}
      <section id="l35-conv" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4a · Conversations</p>
          <h2>Complete the conversations</h2>
          <p className="lesson22-section-desc">
            Дивись на мапу в Exercise 1. Використай <strong>Useful phrases</strong>.
            Потім послухай і перевір себе.
          </p>
        </div>
        <Unit3AudioBlock
          r={16}
          exercise="3D · 4a"
          title="Directions — three conversations"
        />
        {conversations.map((c) => (
          <div key={c.id} className="l35-conv">
            <p className="l35-conv-title">{c.place}</p>
            {c.lines.map((line, li) => (
              <p key={`${c.id}-${li}`} className="l35-conv-line">
                <span
                  className={`l35-conv-who${line.cont ? " l35-conv-who--empty" : ""}`}
                >
                  {line.who}:
                </span>
                {line.segs.map((seg, si) =>
                  seg.kind === "text" ? (
                    <span key={`${c.id}-${li}-${si}`}>{seg.text}</span>
                  ) : (
                    <select
                      key={seg.id}
                      value={convAns[seg.id] ?? ""}
                      onChange={(e) => {
                        setConvChecked(false);
                        setConvAns((prev) => ({
                          ...prev,
                          [seg.id]: e.target.value,
                        }));
                      }}
                      className={drillSelClass(
                        convChecked,
                        convAns[seg.id] ?? "",
                        seg.answer,
                      )}
                      aria-label={`Gap ${seg.id}`}
                    >
                      <option value="">___</option>
                      {seg.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ),
                )}
              </p>
            ))}
          </div>
        ))}
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setConvChecked(true)}
          >
            Check
          </button>
          {convChecked && (
            <span className="l22-score">
              {convScore} / {convGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<string, string> = {};
              for (const g of convGaps) next[g.id] = g.answer;
              setConvAns(next);
              setConvChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setConvAns({});
              setConvChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">4b</strong> Read the conversations aloud
          with your teacher. Take turns: one asks, one gives directions.
        </p>
      </section>

      {/* ── 5 · Speaking ─────────────────────────────────────── */}
      <section id="l35-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Speaking</p>
          <h2>Give directions from the station</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5a</strong> Look at the map in Exercise
          1. Choose a place. You are at this place now. Prepare to give
          directions from the station to this place.
        </p>
        <label className="lesson22-section-desc" htmlFor="l35-place">
          My place:
        </label>
        <select
          id="l35-place"
          className="l25-cr-sel"
          value={speakPlace}
          onChange={(e) => setSpeakPlace(e.target.value)}
          style={{ marginBottom: "0.85rem" }}
        >
          <option value="">Choose a place…</option>
          {speakingPlaces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <textarea
          className="hw27-textarea"
          rows={5}
          value={speakNotes}
          onChange={(e) => setSpeakNotes(e.target.value)}
          placeholder="Go down Station Road. Go past the hotel. Turn right onto Market Street. It's on the right."
          aria-label="My directions"
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">5b</strong> Take turns with your teacher
          giving directions. Can your teacher guess where you are?
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>A:</strong>{" "}
            <em>Go down Station Road and turn right at the hotel.</em>
            <br />
            <strong>B:</strong> <em>Turn right at the hotel?</em>
          </p>
        </blockquote>
      </section>

      {/* ── Welcome to My Town ───────────────────────────────── */}
      <section id="l35-town" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Wrap-up · Speaking</p>
          <h2>Welcome to My Town!</h2>
          <p className="lesson22-section-desc">
            Подивись на дві картинки і опиши місто викладачу:{" "}
            <strong>There is / There are</strong> — і скажи, куди там можна
            піти.
          </p>
        </div>
        <div className="l31-figure-row">
          <Lesson31Figure
            src={IMG35(lesson35Images.welcomeToMyTown)}
            alt="Welcome to My Town poster: 4 parks, 6 cafés, 1 hospital, not many schools, no stadium, a lot of shops, 1 river, 2 bridges, no airport"
            caption="Welcome to My Town! · tap to zoom"
            variant="worksheet"
          />
          <Lesson31Figure
            src={IMG35(lesson35Images.pixelTownMap)}
            alt="Pixel town map with airport, gym, hospital, coffee shop, cinema, park, mall, parking, bus station, hotel, bank, house and public restrooms"
            caption="Town map · tap to zoom"
            variant="worksheet"
          />
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">6</strong> Describe the town. Make nine
          sentences.
        </p>
        <div className="l35-town-grid">
          {myTownFacts.map((f) => (
            <div key={f.place} className="l35-town-card">
              <span className="l35-town-place">{f.place}</span>
              <span className="l35-town-note">{f.note}</span>
            </div>
          ))}
        </div>
        <details className="l25-details" style={{ marginTop: "1rem" }}>
          <summary className="l25-details-toggle">Model sentences</summary>
          <div className="l25-details-body">
            <ul className="l22-goals-list">
              {myTownFacts.map((f) => (
                <li key={f.model}>{f.model}</li>
              ))}
            </ul>
          </div>
        </details>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Then give directions.</strong> Your teacher chooses a place
            on the poster. Say how to get there:{" "}
            <em>Go straight on, turn left and it&apos;s on the right.</em>
          </p>
        </blockquote>
      </section>

      {/* ── Exit ─────────────────────────────────────────────── */}
      <section id="l35-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Ask: Excuse me, where&apos;s the …, please?</li>
          <li>Ask: Is there a … near here?</li>
          <li>Give three directions: go straight on · turn left · go past…</li>
          <li>Say where a place is: It&apos;s on the right / next to a …</li>
          <li>Give directions from the station to one place on the map.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/hw-35">
            HW35
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-36">
            Lesson 36 →
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-34">
            ← Lesson 34
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>

      <section id="l35-next" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Preview · next lesson</p>
          <h2>Watch this video</h2>
          <p className="lesson22-section-desc">
            Це відео для <strong>наступного уроку</strong> (Lesson 36).
            Подивись його вдома: Present Simple — morning, work, lunch,
            weekend. На уроці зробимо listening quiz і speaking.
          </p>
        </div>
        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${NEXT_LESSON_VIDEO_ID}`}
            title="Places in town — preview for the next lesson"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
