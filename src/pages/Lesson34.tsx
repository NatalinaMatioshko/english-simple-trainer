import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import Unit3AudioBlock from "../components/Unit3AudioBlock";
import {
  adjSentences,
  adjStressC,
  lesson31Images,
  northNorfolk,
  northNorfolkAdjTap,
  oppositeGaps,
  oppositePairs,
  photoMatchC,
  prepareTownsC,
  presentContinuousDoing,
  presentContinuousWordBank,
  questionGapsC,
  tfItems,
  warmUpC,
  wordOrderC,
} from "../data/lesson31";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

const IMG31 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson31/${file}`;

const IMG34 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson34/${file}`;

function normIngAnswer(raw: string): string {
  return raw.trim().toLowerCase().replace(/[.!?]+$/, "");
}

function ingAnswerOk(raw: string, answer: string): boolean {
  const n = normIngAnswer(raw);
  if (!n) return false;
  const base = answer.replace(/ing$/, "");
  return n === answer || n === base;
}

function LessonFigure({
  src,
  alt,
  caption,
  wide,
  variant = "default",
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
  variant?: "default" | "map" | "photo" | "worksheet";
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);
  const cls = [
    "l31-figure",
    wide ? "l31-figure--wide" : "",
    variant === "map" ? "l31-figure--map" : "",
    variant === "photo" ? "l31-figure--photo" : "",
    variant === "worksheet" ? "l31-figure--worksheet" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <figure className={cls}>
        {caption && <figcaption className="l31-figure-cap">{caption}</figcaption>}
        <button
          type="button"
          className="l31-figure-zoom"
          onClick={() => setOpen(true)}
          aria-label={`Open larger: ${alt}`}
        >
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </button>
      </figure>
      {open && (
        <div
          className="l31-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="l31-lightbox-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className="l31-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function drillSelClass(
  checked: boolean,
  value: string,
  answer: string,
): string {
  if (!checked) return "l25-cr-sel";
  if (value === answer) return "l25-cr-sel l25-cr-sel--ok";
  if (value) return "l25-cr-sel l25-cr-sel--err";
  return "l25-cr-sel";
}

type L31DrillItem = {
  prompt?: string;
  cue?: string;
  scramble?: string;
  blank?: string;
  q?: string;
  options: readonly string[];
  answer: string;
};

function L31SelectDrill({
  items,
  answers,
  setAnswers,
  checked,
  setChecked,
  labelKey,
}: {
  items: readonly L31DrillItem[];
  answers: string[];
  setAnswers: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
  labelKey: (d: L31DrillItem, i: number) => string;
}) {
  const score = items.filter((d, i) => answers[i] === d.answer).length;
  return (
    <>
      <div className="l26-drill-list">
        {items.map((d, i) => {
          const prompt =
            d.prompt ?? d.cue ?? d.scramble ?? d.blank ?? d.q ?? labelKey(d, i);
          return (
            <div key={`${prompt}-${i}`} className="l26-drill-row">
              <strong className="l26-drill-prompt">{prompt}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={answers[i]}
                onChange={(e) => {
                  setChecked(false);
                  const next = [...answers];
                  next[i] = e.target.value;
                  setAnswers(next);
                }}
                className={drillSelClass(checked, answers[i], d.answer)}
                aria-label={prompt}
              >
                <option value="">___</option>
                {d.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="l22-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked && (
          <span className="l22-score">
            {score} / {items.length}
          </span>
        )}
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAnswers(Array(items.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

function AdjFlipLabel({
  en,
  ua,
  flipped,
  onToggle,
}: {
  en: string;
  ua: string;
  flipped: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`l22-vocab-card l31-adj-flip ${flipped ? "l22-vocab-card--flipped" : ""}`}
      onClick={onToggle}
      aria-pressed={flipped}
      aria-label={`${ua} · ${en}`}
    >
      <div className="l22-vocab-inner">
        <div className="l22-vocab-face l22-vocab-front">
          <span className="l22-vocab-label">Українською</span>
          <strong>{ua}</strong>
          <span className="l22-vocab-hint">tap → English</span>
        </div>
        <div className="l22-vocab-face l22-vocab-back">
          <span className="l22-vocab-label">English</span>
          <strong>{en}</strong>
        </div>
      </div>
    </button>
  );
}

function shuffleParts(parts: readonly string[]): string[] {
  const arr = [...parts];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function joinWordOrder(parts: readonly string[]): string {
  return parts
    .join(" ")
    .replace(/\s+\?/g, "?")
    .replace(/\s+\./g, ".")
    .trim();
}

type WordOrderRow = {
  pool: string[];
  built: string[];
};

function initWordOrderRows(
  items: readonly { parts: readonly string[] }[],
): WordOrderRow[] {
  return items.map((item) => ({
    pool: shuffleParts(item.parts),
    built: [],
  }));
}

type DragPayload =
  | { row: number; from: "pool"; index: number }
  | { row: number; from: "built"; index: number };

function WordOrderBoard({
  items,
  rows,
  setRows,
  checked,
  setChecked,
}: {
  items: readonly {
    scramble: string;
    parts: readonly string[];
    answer: string;
  }[];
  rows: WordOrderRow[];
  setRows: Dispatch<SetStateAction<WordOrderRow[]>>;
  checked: boolean;
  setChecked: (v: boolean) => void;
}) {
  const [drag, setDrag] = useState<DragPayload | null>(null);

  const updateRow = (rowIdx: number, next: WordOrderRow) => {
    setChecked(false);
    setRows((prev) => prev.map((r, i) => (i === rowIdx ? next : r)));
  };

  const moveToBuilt = (rowIdx: number, poolIndex: number, at?: number) => {
    const row = rows[rowIdx];
    if (!row) return;
    const token = row.pool[poolIndex];
    if (token == null) return;
    const pool = row.pool.filter((_, i) => i !== poolIndex);
    const built = [...row.built];
    const insertAt =
      at == null || at < 0 || at > built.length ? built.length : at;
    built.splice(insertAt, 0, token);
    updateRow(rowIdx, { pool, built });
  };

  const moveToPool = (rowIdx: number, builtIndex: number) => {
    const row = rows[rowIdx];
    if (!row) return;
    const token = row.built[builtIndex];
    if (token == null) return;
    const built = row.built.filter((_, i) => i !== builtIndex);
    updateRow(rowIdx, { pool: [...row.pool, token], built });
  };

  const reorderBuilt = (rowIdx: number, from: number, to: number) => {
    const row = rows[rowIdx];
    if (!row || from === to) return;
    const built = [...row.built];
    const [token] = built.splice(from, 1);
    if (token == null) return;
    const insertAt = to > from ? to - 1 : to;
    built.splice(Math.max(0, insertAt), 0, token);
    updateRow(rowIdx, { ...row, built });
  };

  const onDropBuilt = (rowIdx: number, at: number) => {
    if (!drag || drag.row !== rowIdx) return;
    if (drag.from === "pool") moveToBuilt(rowIdx, drag.index, at);
    else reorderBuilt(rowIdx, drag.index, at);
    setDrag(null);
  };

  const score = items.filter((item, i) => {
    const built = rows[i]?.built ?? [];
    return joinWordOrder(built) === item.answer && (rows[i]?.pool.length ?? 0) === 0;
  }).length;

  return (
    <>
      <p className="l31-wo-hint">
        Tap a word to place it · tap again to return · or drag to reorder.
      </p>
      <div className="l31-wo-list">
        {items.map((item, rowIdx) => {
          const row = rows[rowIdx] ?? { pool: [], built: [] };
          const joined = joinWordOrder(row.built);
          const complete = row.pool.length === 0 && row.built.length > 0;
          const ok = checked && complete && joined === item.answer;
          const err = checked && complete && joined !== item.answer;
          const miss = checked && !complete;
          return (
            <div
              key={item.answer}
              className={[
                "l31-wo-card",
                ok ? "is-ok" : "",
                err ? "is-err" : "",
                miss ? "is-miss" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="l31-wo-scramble">
                <strong>{rowIdx + 1}.</strong> {item.scramble}
              </p>
              <div
                className="l31-wo-built"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onDropBuilt(rowIdx, row.built.length);
                }}
                aria-label={`Answer line ${rowIdx + 1}`}
              >
                {row.built.length === 0 && (
                  <span className="l31-wo-placeholder">Drop words here →</span>
                )}
                {row.built.map((tok, bi) => (
                  <button
                    key={`b-${rowIdx}-${bi}-${tok}`}
                    type="button"
                    className="l31-wo-chip l31-wo-chip--built"
                    draggable
                    onDragStart={() =>
                      setDrag({ row: rowIdx, from: "built", index: bi })
                    }
                    onDragEnd={() => setDrag(null)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDropBuilt(rowIdx, bi);
                    }}
                    onClick={() => moveToPool(rowIdx, bi)}
                  >
                    {tok}
                  </button>
                ))}
              </div>
              <div className="l31-wo-pool" aria-label={`Word bank ${rowIdx + 1}`}>
                {row.pool.map((tok, pi) => (
                  <button
                    key={`p-${rowIdx}-${pi}-${tok}`}
                    type="button"
                    className="l31-wo-chip"
                    draggable
                    onDragStart={() =>
                      setDrag({ row: rowIdx, from: "pool", index: pi })
                    }
                    onDragEnd={() => setDrag(null)}
                    onClick={() => moveToBuilt(rowIdx, pi)}
                  >
                    {tok}
                  </button>
                ))}
              </div>
              {checked && ok && (
                <p className="l31-wo-feedback is-ok">✓ {item.answer}</p>
              )}
              {checked && (err || miss) && (
                <p className="l31-wo-feedback is-err">Answer: {item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="l22-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked && (
          <span className="l22-score">
            {score} / {items.length}
          </span>
        )}
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setRows(
              items.map((item) => ({
                pool: [],
                built: [...item.parts],
              })),
            );
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setRows(initWordOrderRows(items));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

function PartBanner({
  id,
  part,
  title,
  desc,
}: {
  id: string;
  part: string;
  title: string;
  desc: string;
}) {
  return (
    <section id={id} className="lesson22-block panel">
      <div className="lesson22-section-head">
        <p className="page-kicker">{part}</p>
        <h2>{title}</h2>
        <p className="lesson22-section-desc">{desc}</p>
      </div>
    </section>
  );
}

export default function Lesson34() {
  const [adjPicFlip, setAdjPicFlip] = useState<Record<string, boolean>>({});
  const [oppAns, setOppAns] = useState(() =>
    Array(oppositeGaps.length).fill(""),
  );
  const [oppChecked, setOppChecked] = useState(false);
  const [matchC, setMatchC] = useState<Record<string, string>>({});
  const [matchCChecked, setMatchCChecked] = useState(false);
  const [tfAns, setTfAns] = useState<Record<number, "T" | "F" | "">>({});
  const [tfChecked, setTfChecked] = useState(false);
  const [orderCRows, setOrderCRows] = useState(() =>
    initWordOrderRows(wordOrderC),
  );
  const [orderCChecked, setOrderCChecked] = useState(false);
  const [stressCSel, setStressCSel] = useState<number[][]>(() =>
    adjStressC.map(() => []),
  );
  const [stressCChecked, setStressCChecked] = useState(false);
  const [adjTapSel, setAdjTapSel] = useState<Record<string, boolean>>({});
  const [adjTapChecked, setAdjTapChecked] = useState(false);
  const [qGapAns, setQGapAns] = useState<Record<string, string>>({});
  const [townNotes, setTownNotes] = useState(["", "", ""]);
  const [showReading, setShowReading] = useState(true);
  const [pcDoingAns, setPcDoingAns] = useState<Record<number, string>>({});
  const [pcDoingChecked, setPcDoingChecked] = useState(false);

  const toggleAdjPic = (key: string) =>
    setAdjPicFlip((prev) => ({ ...prev, [key]: !prev[key] }));

  const matchCScore = photoMatchC.filter((p) => matchC[p.photo] === p.place)
    .length;
  const tfScore = tfItems.filter((item, i) => tfAns[i] === item.answer).length;
  const stressCScore = adjStressC.filter((item, i) => {
    const sel = stressCSel[i] ?? [];
    if (sel.length !== item.stressed.length) return false;
    return item.stressed.every((idx, k) => sel[k] === idx);
  }).length;

  const adjTapKeys = northNorfolkAdjTap.flatMap((block) =>
    block.tokens.map((tok, ti) => ({
      key: `${block.place}-${ti}`,
      adj: tok.adj,
    })),
  );
  const adjTapScore = adjTapKeys.filter((t) => {
    const on = Boolean(adjTapSel[t.key]);
    return t.adj ? on : !on;
  }).length;
  const adjTapTotal = adjTapKeys.length;

  const pcDoingScore = presentContinuousDoing.filter((item) =>
    ingAnswerOk(pcDoingAns[item.n] ?? "", item.answer),
  ).length;

  const toggleStressC = (rowIdx: number, wordIdx: number) => {
    setStressCChecked(false);
    setStressCSel((prev) => {
      const next = prev.map((row) => [...row]);
      const row = next[rowIdx] ?? [];
      next[rowIdx] = row.includes(wordIdx)
        ? row.filter((i) => i !== wordIdx)
        : [...row, wordIdx].sort((a, b) => a - b);
      return next;
    });
  };

  const toggleAdjTap = (key: string) => {
    setAdjTapChecked(false);
    setAdjTapSel((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={34} />
            <h1>It&apos;s expensive! · Present continuous</h1>
            <p className="lesson22-topic-pill">
              Unit 3C · opposite adjectives · Present continuous
            </p>
            <p className="lesson22-subtitle">
              Describe places with opposite adjectives, then practise{" "}
              <strong>am / is / are + -ing</strong> with picture exercises.
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
              to="/lesson-33"
            >
              ← Lesson 33
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-35"
            >
              Lesson 35 →
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
          <span>a quiet town</span>
          <span>It&apos;s expensive</span>
          <span>North Norfolk</span>
          <span>adj + noun</span>
          <span>Present continuous</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l34-part-c">C Expensive</a>
          <a href="#l34c-opposites">Vocab 1–4</a>
          <a href="#l34c-reading">Reading 5–6</a>
          <a href="#l34c-grammar">Grammar 7–12</a>
          <a href="#l34-present-continuous">Present continuous</a>
          <a href="#l34-exit">Exit</a>
        </div>
      </section>

      {/* ═══════════════ PART C ═══════════════ */}
      <PartBanner
        id="l34-part-c"
        part="Part C · 3C"
        title="It's expensive!"
        desc="Opposite adjectives · North Norfolk · adjective position"
      />

      <section id="l34c-warmup" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">C1 · Warm-up</p>
          <h2>Your town — adjectives</h2>
        </div>
        <div className="lesson22-prompt-grid">
          {warmUpC.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
      </section>

      <section id="l34c-opposites" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">C2 · Vocabulary</p>
          <h2>Describing places · opposites</h2>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Look at the pictures. Study
          the opposite adjectives.
        </p>
        <p className="lesson22-section-desc">
          Натисни слово під картинкою — спочатку українською, потім англійською.
        </p>
        <div>
          {oppositePairs.map((p, pi) => (
            <div key={p.a} className="l31-adj-row">
              <div className="l31-adj-card">
                <img
                  src={IMG31(p.imgA)}
                  alt={`${p.a} place`}
                  loading="lazy"
                />
                <AdjFlipLabel
                  en={p.a}
                  ua={p.uaA}
                  flipped={Boolean(adjPicFlip[`${pi}-a`])}
                  onToggle={() => toggleAdjPic(`${pi}-a`)}
                />
              </div>
              <div className="l31-adj-card">
                <img
                  src={IMG31(p.imgB)}
                  alt={`${p.b} place`}
                  loading="lazy"
                />
                <AdjFlipLabel
                  en={p.b}
                  ua={p.uaB}
                  flipped={Boolean(adjPicFlip[`${pi}-b`])}
                  onToggle={() => toggleAdjPic(`${pi}-b`)}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">2</strong> Listen and repeat the
          sentences in Exercise 1.
        </p>
        <Unit3AudioBlock
          r={12}
          exercise="3C · 2"
          title="It's busy / quiet / big… — listen & repeat"
          transcript={
            <ol>
              {adjSentences.map((s) => (
                <li key={s.en}>{s.en}</li>
              ))}
            </ol>
          }
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">3</strong> Complete the sentences.
        </p>
        <L31SelectDrill
          items={oppositeGaps}
          answers={oppAns}
          setAnswers={setOppAns}
          checked={oppChecked}
          setChecked={setOppChecked}
          labelKey={(d) => d.prompt ?? ""}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">4</strong> Make sentences about places
          you know. Say them to your teacher.
        </p>
        <p className="lesson22-section-desc">
          <em>There&apos;s a big train station in my city.</em>
          <br />
          <em>The café in my town is expensive.</em>
        </p>
        <div className="l25-wordbox">
          {oppositePairs.map((p) => (
            <span key={p.a} className="l25-wordbox-item">
              {p.a} / {p.b}
            </span>
          ))}
        </div>
      </section>

      <section id="l34c-reading" className="lesson22-block panel">
        <h2 className="l31-skill-title">Reading</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5</strong> Read the text and match
          places 1–3 with photos A–C.
        </p>
        <p className="lesson22-section-desc">
          Натисни на картинку, щоб відкрити її в повному розмірі.
        </p>
        <div className="l31-figure-row">
          <LessonFigure
            src={IMG31(lesson31Images.northNorfolk)}
            alt="Welcome to North Norfolk — map and town descriptions"
            caption="WELCOME TO North Norfolk! · tap to zoom"
            variant="photo"
          />
          <LessonFigure
            src={IMG31(lesson31Images.norfolkPhotosAbc)}
            alt="North Norfolk photos A–C and Cromer on the map"
            caption="Photos A–C · match with places 1–3 · tap to zoom"
            variant="photo"
          />
        </div>
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => setShowReading((v) => !v)}
          style={{ marginBottom: "0.75rem" }}
        >
          {showReading ? "Hide text" : "Show text"}
        </button>
        {showReading && (
          <div className="lesson22-prompt-grid" style={{ marginBottom: "1rem" }}>
            {northNorfolk.map((t, i) => (
              <div key={t.place} className="lesson22-prompt-card">
                <strong>
                  {i + 1}. {t.place}
                </strong>
                <p style={{ margin: "0.5rem 0 0" }}>{t.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="l26-drill-list">
          {photoMatchC.map((p) => (
            <div key={p.photo} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                Photo {p.photo}
                <span
                  style={{
                    display: "block",
                    fontWeight: 500,
                    color: "var(--color-text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  {p.hint}
                </span>
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={matchC[p.photo] ?? ""}
                onChange={(e) => {
                  setMatchCChecked(false);
                  setMatchC((prev) => ({ ...prev, [p.photo]: e.target.value }));
                }}
                className={drillSelClass(
                  matchCChecked,
                  matchC[p.photo] ?? "",
                  p.place,
                )}
                aria-label={`Photo ${p.photo}`}
              >
                <option value="">___</option>
                {northNorfolk.map((t) => (
                  <option key={t.place} value={t.place}>
                    {t.place}
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
            onClick={() => setMatchCChecked(true)}
          >
            Check
          </button>
          {matchCChecked && (
            <span className="l22-score">
              {matchCScore} / {photoMatchC.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setMatchC({});
              setMatchCChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">6</strong> Read the text again. Are the
          sentences true (T) or false (F)?
        </p>
        <div className="l26-drill-list">
          {tfItems.map((item, i) => {
            const selected = tfAns[i] ?? "";
            const show = tfChecked && selected;
            const ok = selected === item.answer;
            return (
              <div
                key={item.statement}
                className="l26-drill-row"
                style={{ flexWrap: "wrap" }}
              >
                <strong
                  className="l26-drill-prompt"
                  style={{ flex: "1 1 220px" }}
                >
                  {i + 1}. {item.statement}
                </strong>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {(["T", "F"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`l22-choice-btn ${selected === opt ? "selected" : ""} ${
                        show && selected === opt
                          ? ok
                            ? "correct"
                            : "wrong"
                          : ""
                      }`}
                      onClick={() => {
                        setTfChecked(false);
                        setTfAns((prev) => ({ ...prev, [i]: opt }));
                      }}
                    >
                      {opt === "T" ? "True" : "False"}
                    </button>
                  ))}
                </div>
                {show && !ok && (
                  <span
                    style={{
                      flex: "1 1 100%",
                      color: "var(--color-text-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Correct: {item.answer}. {item.tip}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setTfChecked(true)}
          >
            Check
          </button>
          {tfChecked && (
            <span className="l22-score">
              {tfScore} / {tfItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setTfAns({});
              setTfChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l34c-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">C3 · Grammar · speaking</p>
          <h2>Position of adjectives</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">7</strong> Read the grammar box. Tap
          each adjective in the North Norfolk text (Exercise 5).
        </p>
        <div className="l25-grammar-box">
          <div className="l25-grammar-label">Position of adjectives</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">be</span>
              <div className="l25-gr-cells">
                <span>
                  It&apos;s <strong>big</strong>.
                </span>
                <span>
                  It isn&apos;t <strong>expensive</strong>.
                </span>
                <span>
                  This town is <strong>busy</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+N</span>
              <div className="l25-gr-cells">
                <span>
                  This is a <strong>quiet</strong> town.
                </span>
                <span>
                  There&apos;s an <strong>old</strong> cinema.
                </span>
                <span>
                  There are <strong>cheap</strong> shops and restaurants.
                </span>
              </div>
            </div>
          </div>
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Пояснення.</strong> Прикметник описує місце / річ.
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>1. Після be</strong> (<em>is / are / isn&apos;t / aren&apos;t</em>
            ):{" "}
            <em>
              It&apos;s <u>big</u>. This town is <u>busy</u>.
            </em>
            <br />
            <span style={{ color: "var(--color-text-muted)" }}>
              Формула: subject + be + adjective.
            </span>
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>2. Перед іменником</strong>:{" "}
            <em>
              a <u>quiet</u> town · an <u>old</u> cinema · cheap shops
            </em>
            .
            <br />
            <span style={{ color: "var(--color-text-muted)" }}>
              Формула: a/an/the + adjective + noun. <em>a</em> →{" "}
              <em>an</em> перед голосним звуком (<em>an old…</em>).
            </span>
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>Не так:</strong>{" "}
            <em style={{ textDecoration: "line-through" }}>a town quiet</em> /{" "}
            <em style={{ textDecoration: "line-through" }}>
              It&apos;s a expensive
            </em>
            .
          </p>
        </blockquote>
        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          {northNorfolkAdjTap.map((block) => (
            <div key={block.place} className="lesson22-prompt-card">
              <strong>
                {block.n}. {block.place}
              </strong>
              <p
                style={{
                  margin: "0.65rem 0 0",
                  lineHeight: 1.85,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.2rem 0.25rem",
                }}
              >
                {block.tokens.map((tok, ti) => {
                  const key = `${block.place}-${ti}`;
                  const on = Boolean(adjTapSel[key]);
                  let cls = "l26-stress-syl";
                  if (on) cls += " l26-stress-syl--on";
                  if (adjTapChecked) {
                    if (tok.adj && on) cls += " l26-stress-syl--ok";
                    else if (on && !tok.adj) cls += " l26-stress-syl--err";
                    else if (tok.adj && !on) cls += " l26-stress-syl--miss";
                  }
                  return (
                    <button
                      key={key}
                      type="button"
                      className={cls}
                      onClick={() => toggleAdjTap(key)}
                      aria-pressed={on}
                    >
                      {tok.t}
                    </button>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setAdjTapChecked(true)}
          >
            Check
          </button>
          {adjTapChecked && (
            <span className="l22-score">
              {adjTapScore} / {adjTapTotal}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<string, boolean> = {};
              for (const block of northNorfolkAdjTap) {
                block.tokens.forEach((tok, ti) => {
                  if (tok.adj) next[`${block.place}-${ti}`] = true;
                });
              }
              setAdjTapSel(next);
              setAdjTapChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAdjTapSel({});
              setAdjTapChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">8a</strong> Listen and underline the
          stressed words.
        </p>
        <Unit3AudioBlock
          r={13}
          exercise="3C · 8a"
          title="Adjective + noun — sentence stress"
          transcript={
            <ol>
              {adjStressC.map((s) => (
                <li key={s.n}>{s.words.join(" ")}</li>
              ))}
            </ol>
          }
        />
        <p className="lesson22-section-desc" style={{ marginTop: "0.75rem" }}>
          Натисни наголосні слова — як підкреслення в підручнику.
        </p>
        <div className="l26-stress-list">
          {adjStressC.map((item, ji) => {
            const sel = stressCSel[ji] ?? [];
            const ok =
              sel.length === item.stressed.length &&
              item.stressed.every((v, k) => sel[k] === v);
            return (
              <div key={item.n} className="l26-stress-row">
                <span className="l26-stress-letter">{item.n}</span>
                <div className="l26-stress-parts">
                  {item.words.map((word, wi) => {
                    const on = sel.includes(wi);
                    const should = item.stressed.includes(wi);
                    let cls = "l26-stress-syl";
                    if (on) cls += " l26-stress-syl--on";
                    if (stressCChecked) {
                      if (should && on) cls += " l26-stress-syl--ok";
                      else if (on && !should) cls += " l26-stress-syl--err";
                      else if (should && !on) cls += " l26-stress-syl--miss";
                    }
                    return (
                      <span key={`${item.n}-${wi}`} className="l26-stress-chunk">
                        <button
                          type="button"
                          className={cls}
                          onClick={() => toggleStressC(ji, wi)}
                          aria-pressed={on}
                        >
                          {word}
                        </button>
                        {wi < item.words.length - 1 ? (
                          <span className="l26-stress-gap"> </span>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
                {stressCChecked && (
                  <span
                    className={
                      ok
                        ? "l26-stress-mark l26-stress-mark--ok"
                        : "l26-stress-mark"
                    }
                    aria-hidden="true"
                  >
                    {ok ? "✓" : "✗"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setStressCChecked(true)}
          >
            Check
          </button>
          {stressCChecked && (
            <span className="l22-score">
              {stressCScore} / {adjStressC.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setStressCSel(adjStressC.map((s) => [...s.stressed]));
              setStressCChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setStressCSel(adjStressC.map(() => []));
              setStressCChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">8b</strong> Listen again and repeat —
          use the player in <strong>8a</strong>.
        </p>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">9</strong> Put the words in the correct
          order to make sentences.
        </p>
        <WordOrderBoard
          items={wordOrderC}
          rows={orderCRows}
          setRows={setOrderCRows}
          checked={orderCChecked}
          setChecked={setOrderCChecked}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">10a</strong> Complete the questions about
          places in your town. Use adjectives.
        </p>
        <div className="l26-drill-list">
          {questionGapsC.map((q, i) => {
            const two = "twoBlanks" in q && q.twoBlanks;
            const mid = "mid" in q ? q.mid : undefined;
            return (
              <div
                key={q.id}
                className="l26-drill-row"
                style={{ flexWrap: "wrap", alignItems: "center", gap: "0.35rem" }}
              >
                <strong className="l26-drill-prompt" style={{ flex: "0 0 auto" }}>
                  {i + 1}.
                </strong>
                <span>{q.before}</span>
                <input
                  type="text"
                  value={qGapAns[`${q.id}-a`] ?? ""}
                  onChange={(e) =>
                    setQGapAns((prev) => ({
                      ...prev,
                      [`${q.id}-a`]: e.target.value,
                    }))
                  }
                  className="l22-gap-input"
                  placeholder="______"
                  aria-label={`Question ${i + 1} blank 1`}
                  style={{ minWidth: "8rem", flex: "1 1 8rem" }}
                />
                {two && mid != null && (
                  <>
                    <span>{mid}</span>
                    <input
                      type="text"
                      value={qGapAns[`${q.id}-b`] ?? ""}
                      onChange={(e) =>
                        setQGapAns((prev) => ({
                          ...prev,
                          [`${q.id}-b`]: e.target.value,
                        }))
                      }
                      className="l22-gap-input"
                      placeholder="______"
                      aria-label={`Question ${i + 1} blank 2`}
                      style={{ minWidth: "6rem", flex: "1 1 6rem" }}
                    />
                  </>
                )}
                <span>{q.after}</span>
                <span
                  style={{
                    flex: "1 1 100%",
                    color: "var(--color-text-muted)",
                    fontSize: "0.85rem",
                  }}
                >
                  e.g. {q.example}
                </span>
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<string, string> = {};
              for (const q of questionGapsC) {
                if ("twoBlanks" in q && q.twoBlanks) {
                  const [a, b] = q.example.split("·").map((s) => s.trim());
                  next[`${q.id}-a`] = a ?? q.example;
                  next[`${q.id}-b`] = b ?? "";
                } else {
                  next[`${q.id}-a`] = q.example;
                }
              }
              setQGapAns(next);
            }}
          >
            Show examples
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setQGapAns({})}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">10b</strong> Ask your teacher the
          questions from <strong>10a</strong> and answer theirs.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>Model.</strong> Teacher: <em>Is there a big hotel?</em> You:{" "}
            <em>Yes, the City Hotel is big. / No, there are no big hotels.</em>
            <br />
            Teacher: <em>Is the cinema good?</em> You:{" "}
            <em>Yes, it is. / No, it isn&apos;t.</em>
          </p>
        </blockquote>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">11</strong> Prepare. Choose three towns
          or cities and make notes. Use Exercise 5 to help you.
        </p>
        <div className="l25-wordbox" style={{ marginBottom: "0.85rem" }}>
          {prepareTownsC.map((t) => (
            <span key={t} className="l25-wordbox-item">
              {t}
            </span>
          ))}
        </div>
        <div className="lesson22-prompt-grid">
          {[0, 1, 2].map((i) => (
            <label key={i} className="lesson22-prompt-card">
              <strong>Town / city {i + 1}</strong>
              <textarea
                value={townNotes[i] ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setTownNotes((prev) => {
                    const next = [...prev];
                    next[i] = v;
                    return next;
                  });
                }}
                rows={4}
                placeholder="shops · restaurants · parks · hotels…"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  resize: "vertical",
                  font: "inherit",
                }}
              />
            </label>
          ))}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">12</strong> Speak. Describe your three
          towns or cities to your teacher.
        </p>
        <LessonFigure
          src={IMG31(lesson31Images.tokyoFuji)}
          alt="Tokyo skyline with Mount Fuji"
          caption="Speaking cue · describe towns / cities"
          variant="photo"
        />
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Ideas.</strong>{" "}
            <em>This town is quiet. There is a small train station…</em> /{" "}
            <em>It&apos;s busy. There are cheap shops and a good market…</em>
          </p>
        </blockquote>
      </section>

      {/* ── Present continuous ───────────────────────────────── */}
      <section id="l34-present-continuous" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar · preview</p>
          <h2>Present continuous</h2>
          <p className="lesson22-section-desc">
            <strong>am / is / are + verb-ing</strong> — дія зараз, у момент
            мовлення.
          </p>
        </div>

        <div className="l25-grammar-box">
          <div className="l25-grammar-label">Present continuous</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+</span>
              <div className="l25-gr-cells">
                <span>
                  I&apos;m <strong>working</strong>.
                </span>
                <span>
                  She&apos;s <strong>studying</strong> English.
                </span>
                <span>
                  They&apos;re <strong>watching</strong> TV.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--neg">
              <span className="l25-gr-sign">−</span>
              <div className="l25-gr-cells">
                <span>
                  I&apos;m <strong>not working</strong>.
                </span>
                <span>
                  He <strong>isn&apos;t sleeping</strong>.
                </span>
                <span>
                  We <strong>aren&apos;t listening</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Are you listening</strong>?
                </span>
                <span className="l25-gr-answer">
                  Yes, <strong>I am</strong>. / No, <strong>I&apos;m not</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--where">
              <span className="l25-gr-sign">what</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>What are you doing</strong>?
                </span>
                <span className="l25-gr-answer">
                  I&apos;m <strong>cooking</strong> dinner.
                </span>
              </div>
            </div>
          </div>
          <div className="l25-short-forms">
            <span className="l25-sf-label">Short forms:</span>
            <span>
              <strong>I&apos;m</strong> = I am
            </span>
            <span>
              <strong>She&apos;s</strong> = She is
            </span>
            <span>
              <strong>They&apos;re</strong> = They are
            </span>
            <span>
              <strong>isn&apos;t</strong> = is not
            </span>
            <span>
              <strong>aren&apos;t</strong> = are not
            </span>
          </div>
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Пояснення.</strong> Present Continuous описує те, що
            відбувається <em>зараз</em> — у момент, коли ми говоримо.
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>Формула:</strong>{" "}
            <em>am / is / are + verb-ing</em>
            <br />
            <span style={{ color: "var(--color-text-muted)" }}>
              I → <em>am</em> · he / she / it → <em>is</em> · you / we / they →{" "}
              <em>are</em>
            </span>
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>Коли використовуємо:</strong> дія в процесі зараз.
            <br />
            <em>
              I&apos;m <u>studying</u> now. She&apos;s <u>working</u> at the
              moment.
            </em>
            <br />
            <span style={{ color: "var(--color-text-muted)" }}>
              Часті слова: <em>now</em>, <em>at the moment</em>, <em>today</em>.
            </span>
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>−ing:</strong>{" "}
            <em>work → working</em> · <em>live → living</em> ·{" "}
            <em>run → running</em> · <em>study → studying</em>
            <br />
            <span style={{ color: "var(--color-text-muted)" }}>
              Прибираємо <em>-e</em> (<em>live → living</em>). Podvojujemo
              приголосну після короткого голосного (<em>run → running</em>).
            </span>
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>Не так:</strong>{" "}
            <em style={{ textDecoration: "line-through" }}>I working</em> /{" "}
            <em style={{ textDecoration: "line-through" }}>He is work</em> /{" "}
            <em style={{ textDecoration: "line-through" }}>
              She is read now
            </em>
            .
          </p>
        </blockquote>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.25rem" }}>
          Present Simple vs Present Continuous
        </h3>
        <div className="l31-tense-compare">
          <div className="l31-tense-card">
            <h4>Present Simple</h4>
            <p>
              <strong>Формула:</strong> <em>verb</em> / <em>verb + s</em> (he,
              she, it)
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Коли:</strong> звичка, регулярна дія, факт, розклад.
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <em>I work</em> every day.
              <br />
              <em>She works</em> in an office.
              <br />
              <em>He plays</em> football on Saturdays.
            </p>
            <p
              style={{
                marginTop: "0.5rem",
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Маркери: <em>every day</em>, <em>usually</em>, <em>often</em>,{" "}
              <em>on Mondays</em>
            </p>
          </div>
          <div className="l31-tense-card l31-tense-card--pc">
            <h4>Present Continuous</h4>
            <p>
              <strong>Формула:</strong> <em>am / is / are + verb-ing</em>
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Коли:</strong> дія <em>зараз</em>, у процесі, у момент
              мовлення.
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <em>I&apos;m working</em> now.
              <br />
              <em>She&apos;s studying</em> at the moment.
              <br />
              <em>They&apos;re watching</em> TV.
            </p>
            <p
              style={{
                marginTop: "0.5rem",
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Маркери: <em>now</em>, <em>at the moment</em>, <em>today</em>
            </p>
          </div>
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Як відрізнити?</strong> Запитай: це <em>зазвичай</em> чи{" "}
            <em>саме зараз</em>?
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <em>I drink coffee every morning.</em> — звичка (Present Simple)
            <br />
            <em>I&apos;m drinking coffee now.</em> — зараз, у цей момент
            (Present Continuous)
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <em>She works in Kyiv.</em> — постійна робота / факт (PS)
            <br />
            <em>She&apos;s working at home today.</em> — сьогодні, тимчасово
            (PC)
          </p>
          <p style={{ marginTop: "0.65rem" }}>
            <strong>Пам&apos;ятай:</strong> state verbs (like, know, want,
            need…) зазвичай <em>не</em> вживають у Continuous:{" "}
            <em style={{ textDecoration: "line-through" }}>
              I&apos;m liking
            </em>{" "}
            → <em>I like</em> coffee.
          </p>
        </blockquote>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">Practise</strong> What are they doing?
        </p>
        <p className="lesson22-section-desc">
          Complete the sentences using the verbs from the word bank in present
          continuous. Натисни на картинку, щоб відкрити її в повному розмірі.
        </p>
        <LessonFigure
          src={IMG34("what-are-they-doing.png")}
          alt="What are they doing? — house scene with numbered actions"
          caption="What are they doing? · tap to zoom"
          wide
          variant="worksheet"
        />
        <div className="l25-wordbox" style={{ marginTop: "1rem" }}>
          {presentContinuousWordBank.map((w) => (
            <span key={w} className="l25-wordbox-item">
              {w}
            </span>
          ))}
        </div>
        <div className="l31-pc-doing-grid">
          {presentContinuousDoing.map((item) => {
            const val = pcDoingAns[item.n] ?? "";
            const ok =
              pcDoingChecked && ingAnswerOk(val, item.answer);
            const err = pcDoingChecked && val.trim() && !ok;
            const inputCls = [
              "l22-gap-input",
              ok ? "is-ok" : "",
              err ? "is-err" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <p key={item.n} className="l31-pc-doing-row">
                <strong>{item.n}.</strong>
                <span>{item.before}</span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setPcDoingChecked(false);
                    setPcDoingAns((prev) => ({
                      ...prev,
                      [item.n]: e.target.value,
                    }));
                  }}
                  className={inputCls}
                  placeholder="…ing"
                  aria-label={`Sentence ${item.n}`}
                />
                <span>{item.after}</span>
              </p>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPcDoingChecked(true)}
          >
            Check
          </button>
          {pcDoingChecked && (
            <span className="l22-score">
              {pcDoingScore} / {presentContinuousDoing.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcDoingAns(
                Object.fromEntries(
                  presentContinuousDoing.map((item) => [
                    item.n,
                    item.answer,
                  ]),
                ),
              );
              setPcDoingChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcDoingAns({});
              setPcDoingChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">Speak</strong> Describe the pictures.
        </p>
        <p className="lesson22-section-desc">
          What is everyone doing? Say sentences in present continuous — to your
          teacher. Натисни на картинку, щоб відкрити її в повному розмірі.
        </p>
        <div className="l31-figure-row">
          <LessonFigure
            src={IMG34("describe-the-picture.png")}
            alt="Describe the picture — busy town street with named people"
            caption="Describe the picture · tap to zoom"
            variant="worksheet"
          />
          <LessonFigure
            src={IMG34("summer-in-the-park.png")}
            alt="Summer in the park — children doing activities"
            caption="Summer in the Park · tap to zoom"
            variant="worksheet"
          />
        </div>
      </section>

      {/* ── Exit ─────────────────────────────────────────────── */}
      <section id="l34-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
          <p className="lesson22-section-desc">
            opposite adjectives · Present continuous · describe a town
          </p>
        </div>
        <ul className="l22-goals-list">
          <li>Say 5 opposite adjective pairs.</li>
          <li>be + adj / adj + noun — one example each.</li>
          <li>Make 3 Present continuous sentences about a picture.</li>
          <li>Describe a town with adjectives.</li>
          <li>Ask and answer about places in your town.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/hw-34">
            HW34
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-33">
            ← Lesson 33
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
