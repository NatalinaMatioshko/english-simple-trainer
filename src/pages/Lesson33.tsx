import {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import {
  articleGapsB,
  dialogueGapsB,
  flatCompareRows,
  flatsB,
  flatsBCorrectId,
  flatBoxRooms,
  flatBoxThings,
  flatMatchB,
  flatTickSentencesB,
  flatWordsB,
  grammarBoxB,
  homeVocab,
  intonationB,
  lesson31Images,
  photoQsB,
  speakB,
  warmUpB,
  wordOrderB,
} from "../data/lesson31";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

const IMG31 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson31/${file}`;

const SOUND_U3 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_3/RM_A1_SB_U3_R${r}.mp3`;

function AudioBlock({
  r,
  exercise,
  title,
  transcript,
}: {
  r: number;
  exercise: string;
  title: string;
  transcript?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const src = SOUND_U3(r);
  return (
    <div className="l25-audio-item" style={{ marginTop: "0.85rem" }}>
      <div className="l25-audio-meta">
        <span className="l25-audio-num">R{r}</span>
        <div className="l25-audio-info">
          <span className="l25-audio-ex">{exercise}</span>
          <span className="l25-audio-title">{title}</span>
        </div>
      </div>
      <audio
        key={src}
        controls
        className="l25-audio-ctrl"
        src={src}
        preload="metadata"
        onError={() =>
          setErr(`Audio failed to load (R${r}). Check the file is available.`)
        }
        onCanPlay={() => setErr(null)}
      >
        <source src={src} type="audio/mpeg" />
      </audio>
      {err && (
        <p
          style={{
            margin: "0.35rem 0 0",
            color: "var(--color-danger, #b91c1c)",
            fontSize: "0.9rem",
          }}
        >
          {err}
        </p>
      )}
      {transcript && (
        <>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide transcript" : "Transcript"}
          </button>
          {open && <div className="l25-details-body">{transcript}</div>}
        </>
      )}
    </div>
  );
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
  variant?: "default" | "map" | "photo";
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

function VocabFlipGrid({
  items,
  flipped,
  toggle,
}: {
  items: readonly { en: string; ua: string }[];
  flipped: number[];
  toggle: (idx: number) => void;
}) {
  return (
    <div className="l22-vocab-grid">
      {items.map((item, idx) => {
        const isFlipped = flipped.includes(idx);
        return (
          <button
            key={item.en}
            type="button"
            className={`l22-vocab-card ${isFlipped ? "l22-vocab-card--flipped" : ""}`}
            onClick={() => toggle(idx)}
            aria-pressed={isFlipped}
          >
            <div className="l22-vocab-inner">
              <div className="l22-vocab-face l22-vocab-front">
                <span className="l22-vocab-label">Українською</span>
                <strong>{item.ua}</strong>
                <span className="l22-vocab-hint">tap to flip</span>
              </div>
              <div className="l22-vocab-face l22-vocab-back">
                <span className="l22-vocab-label">English</span>
                <strong>{item.en}</strong>
              </div>
            </div>
          </button>
        );
      })}
    </div>
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


export default function Lesson33() {
  const [vocabB, setVocabB] = useState<number[]>([]);

  const [photoAns, setPhotoAns] = useState(() =>
    Array(photoQsB.length).fill(""),
  );
  const [photoChecked, setPhotoChecked] = useState(false);
  const [flatAns, setFlatAns] = useState<Record<string, string>>({});
  const [flatChecked, setFlatChecked] = useState(false);
  const [flatPick, setFlatPick] = useState<
    | { side: "word"; word: string }
    | { side: "letter"; letter: string }
    | null
  >(null);
  const [flatShowAll, setFlatShowAll] = useState(false);
  const flatLetterOrder = flatMatchB.map((p) => p.letter);
  const [chosenFlat, setChosenFlat] = useState("");
  const [flatChoiceChecked, setFlatChoiceChecked] = useState(false);
  const [flatTick, setFlatTick] = useState<Record<number, boolean>>({});
  const [flatTickChecked, setFlatTickChecked] = useState(false);
  const [articleAns, setArticleAns] = useState(() =>
    Array(articleGapsB.length).fill(""),
  );
  const [articleChecked, setArticleChecked] = useState(false);
  const [gramBAns, setGramBAns] = useState(() =>
    Array(grammarBoxB.length).fill(""),
  );
  const [gramBChecked, setGramBChecked] = useState(false);
  const [intonAns, setIntonAns] = useState(() =>
    Array(intonationB.length).fill(""),
  );
  const [intonChecked, setIntonChecked] = useState(false);
  const [dialogueAns, setDialogueAns] = useState(() =>
    Array(dialogueGapsB.length).fill(""),
  );
  const [dialogueChecked, setDialogueChecked] = useState(false);
  const [orderBRows, setOrderBRows] = useState(() =>
    initWordOrderRows(wordOrderB),
  );
  const [orderBChecked, setOrderBChecked] = useState(false);

  const toggle = (setter: Dispatch<SetStateAction<number[]>>, idx: number) =>
    setter((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );

  const wordToFlatLetter = Object.fromEntries(
    Object.entries(flatAns).map(([letter, word]) => [word, letter]),
  ) as Record<string, string>;

  const pairFlat = (word: string, letter: string) => {
    setFlatChecked(false);
    setFlatShowAll(false);
    setFlatAns((prev) => {
      const next = { ...prev };
      for (const [l, w] of Object.entries(next)) {
        if (w === word || l === letter) delete next[l];
      }
      next[letter] = word;
      return next;
    });
    setFlatPick(null);
  };

  const onFlatWord = (word: string) => {
    const linked = wordToFlatLetter[word];
    if (linked) {
      setFlatAns((prev) => {
        const next = { ...prev };
        delete next[linked];
        return next;
      });
      setFlatChecked(false);
      setFlatShowAll(false);
      setFlatPick(null);
      return;
    }
    if (flatPick?.side === "letter") {
      pairFlat(word, flatPick.letter);
      return;
    }
    setFlatPick(
      flatPick?.side === "word" && flatPick.word === word
        ? null
        : { side: "word", word },
    );
  };

  const onFlatLetter = (letter: string) => {
    if (flatAns[letter]) {
      setFlatAns((prev) => {
        const next = { ...prev };
        delete next[letter];
        return next;
      });
      setFlatChecked(false);
      setFlatShowAll(false);
      setFlatPick(null);
      return;
    }
    if (flatPick?.side === "word") {
      pairFlat(flatPick.word, letter);
      return;
    }
    setFlatPick(
      flatPick?.side === "letter" && flatPick.letter === letter
        ? null
        : { side: "letter", letter },
    );
  };

  const flatScore = flatMatchB.filter((p) => flatAns[p.letter] === p.word)
    .length;
  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={33} />
            <h1>Is there wifi?</h1>
            <p className="lesson22-topic-pill">
              rooms · Is there…? · Are there any…? · How many…?
            </p>
            <p className="lesson22-subtitle">
              Unit 3B. Talk about a flat with{" "}
              <strong>Is there / Are there</strong> and{" "}
              <strong>How many</strong>.
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
              to="/lesson-32"
            >
              ← Lesson 32
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-34"
            >
              Lesson 34 →
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
          <span>Is there wifi?</span>
          <span>Are there any hotels?</span>
          <span>How many rooms?</span>
          <span>There is / There are</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l33-part-b">B Wifi</a>
          <a href="#l33b-vocab">Vocab</a>
          <a href="#l33b-flats">Listen 5</a>
          <a href="#l33b-grammar">Grammar 6–7</a>
          <a href="#l33b-dialogue">Practice 8–11</a>
          <a href="#l33-exit">Exit</a>
        </div>
      </section>

      {/* ═══════════════ PART B ═══════════════ */}
      <PartBanner
        id="l33-part-b"
        part="Part B · 3B"
        title="Is there wifi?"
        desc="Rooms & things in a home · Is there a/an…? · Are there any…? · How many…?"
      />

      <section id="l33b-warmup" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">B1 · Warm-up</p>
          <h2>Your home</h2>
        </div>
        <div className="lesson22-prompt-grid">
          {warmUpB.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
        <div className="l25-wordbox" style={{ marginTop: "1rem" }}>
          <span className="l25-wordbox-item">Is there a …?</span>
          <span className="l25-wordbox-item">Are there any …?</span>
          <span className="l25-wordbox-item">Yes, there is.</span>
          <span className="l25-wordbox-item">No, there isn&apos;t.</span>
        </div>
      </section>

      <section id="l33b-vocab" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">B2 · Vocabulary</p>
          <h2>Rooms and things in a home</h2>
          <p className="lesson22-section-desc">
            City flat, Brighton · £80 per night. Фото A–D → зістав A–K зі
            словами → послухай і повтори (3.4) → питання про квартиру.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Look at photos A–D. What
          objects can you see?
        </p>
        <p className="lesson22-section-desc">
          <em>There is a table.</em>
        </p>

        <LessonFigure
          src={IMG31(lesson31Images.brightonRoomsAd)}
          alt="City Flat Brighton — room photos A–D"
          caption="CITY FLAT, BRIGHTON **** · £80 per night · rooms A–D"
          variant="photo"
          wide
        />

        <LessonFigure
          src={IMG31(lesson31Images.brightonIconsEk)}
          alt="In this flat — amenity icons E–K"
          caption="In this flat: icons E–K"
          variant="photo"
          wide
        />

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">2a</strong> Match A–K with the words in
          the box.
        </p>
        <div className="l31-vocab-box" aria-label="Words in the box">
          <p className="l31-vocab-box-row">
            <span className="l31-vocab-box-label">Rooms:</span>
            <span className="l31-vocab-box-words">
              {flatBoxRooms.join(", ")}
            </span>
          </p>
          <p className="l31-vocab-box-row">
            <span className="l31-vocab-box-label">Things:</span>
            <span className="l31-vocab-box-words">
              {flatBoxThings.join(", ")}
            </span>
          </p>
        </div>

        <div className="l31-pair-match">
          <div className="l31-pair-col" aria-label="Words in the box">
            {flatWordsB.map((word) => {
              const linked = wordToFlatLetter[word];
              const key = flatMatchB.find((p) => p.word === word);
              const selected =
                flatPick?.side === "word" && flatPick.word === word;
              const matched = Boolean(linked);
              const correct = matched && key?.letter === linked;
              const wrong = flatChecked && matched && !correct;
              const ok = flatChecked && matched && correct;
              const cls = [
                "l31-pair-card",
                selected ? "is-selected" : "",
                matched ? "is-matched" : "",
                ok ? "is-ok" : "",
                wrong ? "is-err" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={word}
                  type="button"
                  className={cls}
                  onClick={() => onFlatWord(word)}
                  aria-pressed={selected || matched}
                >
                  <span className="l31-pair-text">{word}</span>
                  {matched && (
                    <span className="l31-pair-badge">{linked}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="l31-pair-col" aria-label="Letters A–K">
            {flatLetterOrder.map((letter) => {
              const word = flatAns[letter];
              const key = flatMatchB.find((p) => p.letter === letter);
              const selected =
                flatPick?.side === "letter" && flatPick.letter === letter;
              const matched = Boolean(word);
              const correct = matched && key?.word === word;
              const wrong = flatChecked && matched && !correct;
              const ok = flatChecked && matched && correct;
              const cls = [
                "l31-pair-card",
                selected ? "is-selected" : "",
                matched ? "is-matched" : "",
                ok ? "is-ok" : "",
                wrong ? "is-err" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={letter}
                  type="button"
                  className={cls}
                  onClick={() => onFlatLetter(letter)}
                  aria-pressed={selected || matched}
                >
                  <span className="l31-pair-key">{letter}.</span>
                  {matched && (
                    <span className="l31-pair-text">{word}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {flatShowAll && (
          <div className="l31-fix-reveal" style={{ marginTop: "0.85rem" }}>
            <span className="l31-fix-answer">
              {flatMatchB.map((p) => `${p.letter} → ${p.word}`).join(" · ")}
            </span>
          </div>
        )}
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setFlatChecked(true)}
          >
            Check
          </button>
          {flatChecked && (
            <span className="l22-score">
              {flatScore} / {flatMatchB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !flatShowAll;
              setFlatShowAll(next);
              if (next) {
                setFlatAns(
                  Object.fromEntries(
                    flatMatchB.map((p) => [p.letter, p.word]),
                  ),
                );
                setFlatPick(null);
                setFlatChecked(true);
              }
            }}
          >
            {flatShowAll ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFlatAns({});
              setFlatChecked(false);
              setFlatPick(null);
              setFlatShowAll(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">2b</strong> Listen and repeat.
        </p>
        <VocabFlipGrid
          items={homeVocab}
          flipped={vocabB}
          toggle={(i) => toggle(setVocabB, i)}
        />
        <AudioBlock
          r={4}
          exercise="3B · 2b"
          title="Rooms & things — listen & repeat"
          transcript={
            <div>
              <p>
                <strong>Rooms:</strong> bathroom, bedroom, kitchen, living room
              </p>
              <p>
                <strong>Things:</strong> beds, lift, oven, shower, toilet, TV,
                wifi
              </p>
            </div>
          }
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">3</strong> Read the questions aloud
          and answer them about the flat in Exercise 1.
        </p>
        <L31SelectDrill
          items={photoQsB}
          answers={photoAns}
          setAnswers={setPhotoAns}
          checked={photoChecked}
          setChecked={setPhotoChecked}
          labelKey={(d) => d.q ?? ""}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">4</strong> From memory, make sentences
          about the flat.
        </p>
        <p className="lesson22-section-desc">
          <em>There are two beds in the bedroom.</em>
        </p>
      </section>

      <section id="l33b-flats" className="lesson22-block panel">
        <h2 className="l31-skill-title">Listening</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5a</strong> Listen to a conversation
          between two friends, Jakub and William. Choose the correct flat.
        </p>
        <AudioBlock
          r={5}
          exercise="3B · Listening 5"
          title="Jakub & William — choose the flat"
        />
        <div className="l31-vocab-box" style={{ marginTop: "0.85rem" }}>
          <div className="lesson22-prompt-grid">
            {flatsB.map((f) => {
              const selected = chosenFlat === f.id;
              const ok =
                flatChoiceChecked && selected && f.id === flatsBCorrectId;
              const wrong =
                flatChoiceChecked && selected && f.id !== flatsBCorrectId;
              const revealOk =
                flatChoiceChecked && f.id === flatsBCorrectId && !selected;
              const cls = [
                "lesson22-prompt-card",
                selected ? "lesson22-prompt-card--task" : "",
                ok || revealOk ? "is-ok" : "",
                wrong ? "is-err" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={f.id}
                  type="button"
                  className={cls}
                  onClick={() => {
                    setFlatChoiceChecked(false);
                    setChosenFlat(f.id);
                  }}
                  aria-pressed={selected}
                >
                  <strong>{f.label}</strong>
                  <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.1rem" }}>
                    {f.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setFlatChoiceChecked(true)}
          >
            Check
          </button>
          {flatChoiceChecked && (
            <span className="l22-score">
              {chosenFlat === flatsBCorrectId ? "1" : "0"} / 1
              {chosenFlat === flatsBCorrectId
                ? " · Flat 3"
                : chosenFlat
                  ? " · try again"
                  : " · choose a flat"}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setChosenFlat("");
              setFlatChoiceChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">5b</strong> Listen again. Tick the
          sentences you hear.
        </p>
        <ul className="l29-phrases-ticklist">
          {flatTickSentencesB.map((s) => {
            const on = Boolean(flatTick[s.id]);
            let cls = "l29-phrases-tick";
            if (flatTickChecked) {
              if (s.heard && on) cls += " is-ok";
              else if (!s.heard && on) cls += " is-err";
              else if (s.heard && !on) cls += " is-miss";
            }
            return (
              <li key={s.id} className={cls}>
                <label>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => {
                      setFlatTickChecked(false);
                      setFlatTick((prev) => ({
                        ...prev,
                        [s.id]: !prev[s.id],
                      }));
                    }}
                  />
                  <span>
                    {s.id}. {s.text}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setFlatTickChecked(true)}
          >
            Check
          </button>
          {flatTickChecked && (
            <span className="l22-score">
              {
                flatTickSentencesB.filter(
                  (s) => Boolean(flatTick[s.id]) === s.heard,
                ).length
              }{" "}
              / {flatTickSentencesB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFlatTick(
                Object.fromEntries(
                  flatTickSentencesB
                    .filter((s) => s.heard)
                    .map((s) => [s.id, true]),
                ),
              );
              setFlatTickChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFlatTick({});
              setFlatTickChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">5c</strong> Look at Exercises 5a and 5b
          again. Complete the sentences with <em>a</em> and <em>an</em>.
        </p>
        <p className="lesson22-section-desc">
          There is ______ bathroom, ______ shower and ______ TV. There isn&apos;t
          ______ oven.
        </p>
        <L31SelectDrill
          items={articleGapsB}
          answers={articleAns}
          setAnswers={setArticleAns}
          checked={articleChecked}
          setChecked={setArticleChecked}
          labelKey={(d) => d.blank ?? ""}
        />
      </section>

      <section id="l33b-grammar" className="lesson22-block panel">
        <h2 className="l31-skill-title">Grammar</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">6</strong> Read and complete the
          grammar box. Use Exercises 5b and 5c to help you.
        </p>

        <div className="l31-there-box">
          <div className="l31-there-head">
            Is there a/an …? / Are there any …?
          </div>
          <div className="l31-there-cols">
            <div className="l31-there-col-h">Singular</div>
            <div className="l31-there-col-h">Plural</div>
          </div>

          <div className="l31-there-row">
            <div className="l31-there-sign">?</div>
            <div className="l31-there-cell">
              <p>
                <strong className="l31-ab-n">1</strong>{" "}
                <select
                  value={gramBAns[0]}
                  onChange={(e) => {
                    setGramBChecked(false);
                    const next = [...gramBAns];
                    next[0] = e.target.value;
                    setGramBAns(next);
                  }}
                  className={drillSelClass(
                    gramBChecked,
                    gramBAns[0],
                    grammarBoxB[0].answer,
                  )}
                  aria-label="Gap 1"
                >
                  <option value="">______</option>
                  {grammarBoxB[0].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>{" "}
                there a shower?
              </p>
            </div>
            <div className="l31-there-cell">
              <p>
                <strong className="l31-ab-n">2</strong>{" "}
                <select
                  value={gramBAns[1]}
                  onChange={(e) => {
                    setGramBChecked(false);
                    const next = [...gramBAns];
                    next[1] = e.target.value;
                    setGramBAns(next);
                  }}
                  className={drillSelClass(
                    gramBChecked,
                    gramBAns[1],
                    grammarBoxB[1].answer,
                  )}
                  aria-label="Gap 2"
                >
                  <option value="">______</option>
                  {grammarBoxB[1].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>{" "}
                there any flats?
              </p>
            </div>
          </div>

          <div className="l31-there-row">
            <div className="l31-there-sign l31-there-sign--pos">+</div>
            <div className="l31-there-cell">
              <p>
                Yes, there <strong className="l31-ab-n">3</strong>{" "}
                <select
                  value={gramBAns[2]}
                  onChange={(e) => {
                    setGramBChecked(false);
                    const next = [...gramBAns];
                    next[2] = e.target.value;
                    setGramBAns(next);
                  }}
                  className={drillSelClass(
                    gramBChecked,
                    gramBAns[2],
                    grammarBoxB[2].answer,
                  )}
                  aria-label="Gap 3"
                >
                  <option value="">______</option>
                  {grammarBoxB[2].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .
              </p>
            </div>
            <div className="l31-there-cell">
              <p>Yes, there are.</p>
            </div>
          </div>

          <div className="l31-there-row">
            <div className="l31-there-sign l31-there-sign--neg">−</div>
            <div className="l31-there-cell">
              <p>
                No, there <strong className="l31-ab-n">4</strong>{" "}
                <select
                  value={gramBAns[3]}
                  onChange={(e) => {
                    setGramBChecked(false);
                    const next = [...gramBAns];
                    next[3] = e.target.value;
                    setGramBAns(next);
                  }}
                  className={drillSelClass(
                    gramBChecked,
                    gramBAns[3],
                    grammarBoxB[3].answer,
                  )}
                  aria-label="Gap 4"
                >
                  <option value="">______</option>
                  {grammarBoxB[3].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .{" "}
                <span className="l31-there-note">(= No, there is not.)</span>
              </p>
            </div>
            <div className="l31-there-cell">
              <p>
                No, there <strong className="l31-ab-n">5</strong>{" "}
                <select
                  value={gramBAns[4]}
                  onChange={(e) => {
                    setGramBChecked(false);
                    const next = [...gramBAns];
                    next[4] = e.target.value;
                    setGramBAns(next);
                  }}
                  className={drillSelClass(
                    gramBChecked,
                    gramBAns[4],
                    grammarBoxB[4].answer,
                  )}
                  aria-label="Gap 5"
                >
                  <option value="">______</option>
                  {grammarBoxB[4].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .{" "}
                <span className="l31-there-note">(= No, there are not.)</span>
              </p>
            </div>
          </div>

          <p className="l31-there-but">BUT <em>Is there wifi?</em></p>

          <div className="l31-there-how">
            <strong>with How many</strong>
            <p>
              How many bedrooms <strong className="l31-ab-n">6</strong>{" "}
              <select
                value={gramBAns[5]}
                onChange={(e) => {
                  setGramBChecked(false);
                  const next = [...gramBAns];
                  next[5] = e.target.value;
                  setGramBAns(next);
                }}
                className={drillSelClass(
                  gramBChecked,
                  gramBAns[5],
                  grammarBoxB[5].answer,
                )}
                aria-label="Gap 6"
              >
                <option value="">______</option>
                {grammarBoxB[5].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              there?
            </p>
            <p>
              There <strong className="l31-ab-n">7</strong>{" "}
              <select
                value={gramBAns[6]}
                onChange={(e) => {
                  setGramBChecked(false);
                  const next = [...gramBAns];
                  next[6] = e.target.value;
                  setGramBAns(next);
                }}
                className={drillSelClass(
                  gramBChecked,
                  gramBAns[6],
                  grammarBoxB[6].answer,
                )}
                aria-label="Gap 7"
              >
                <option value="">______</option>
                {grammarBoxB[6].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              one. / There <strong className="l31-ab-n">8</strong>{" "}
              <select
                value={gramBAns[7]}
                onChange={(e) => {
                  setGramBChecked(false);
                  const next = [...gramBAns];
                  next[7] = e.target.value;
                  setGramBAns(next);
                }}
                className={drillSelClass(
                  gramBChecked,
                  gramBAns[7],
                  grammarBoxB[7].answer,
                )}
                aria-label="Gap 8"
              >
                <option value="">______</option>
                {grammarBoxB[7].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              two.
            </p>
          </div>
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setGramBChecked(true)}
          >
            Check
          </button>
          {gramBChecked && (
            <span className="l22-score">
              {
                grammarBoxB.filter((g, i) => gramBAns[i] === g.answer).length
              }{" "}
              / {grammarBoxB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGramBAns(grammarBoxB.map((g) => g.answer));
              setGramBChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGramBAns(Array(grammarBoxB.length).fill(""));
              setGramBChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          <strong className="l31-ex-num">7a</strong> Listen. Does the voice go
          up (↑) or down (↓) at the end?
        </p>
        <AudioBlock
          r={6}
          exercise="3B · 7a"
          title="Is there / Are there — intonation"
        />
        <div className="l26-drill-list">
          {intonationB.map((item, i) => (
            <div key={item.n} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {item.n}. {item.text}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={intonAns[i]}
                onChange={(e) => {
                  setIntonChecked(false);
                  const next = [...intonAns];
                  next[i] = e.target.value;
                  setIntonAns(next);
                }}
                className={drillSelClass(
                  intonChecked,
                  intonAns[i],
                  item.answer,
                )}
                aria-label={`Intonation ${item.n}`}
              >
                <option value="">↑ / ↓</option>
                <option value="↑">↑</option>
                <option value="↓">↓</option>
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setIntonChecked(true)}
          >
            Check
          </button>
          {intonChecked && (
            <span className="l22-score">
              {
                intonationB.filter((item, i) => intonAns[i] === item.answer)
                  .length
              }{" "}
              / {intonationB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setIntonAns(intonationB.map((item) => item.answer));
              setIntonChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setIntonAns(Array(intonationB.length).fill(""));
              setIntonChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">7b</strong> Listen again and repeat.
        </p>
      </section>

      <section id="l33b-dialogue" className="lesson22-block panel">
        <h2 className="l31-skill-title">Practice &amp; speaking</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">8</strong> Complete the conversation.
        </p>
        <blockquote className="l23-rule-quote" style={{ marginBottom: "1rem" }}>
          <p>
            <strong>William:</strong> Look. This flat is £60 per night!
            <br />
            <strong>Jakub:</strong> Great! …
          </p>
        </blockquote>
        <div className="l26-drill-list">
          {dialogueGapsB.map((d, i) => (
            <div key={`${d.who}-${d.prompt}`} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {d.who}: {d.prompt}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={dialogueAns[i]}
                onChange={(e) => {
                  setDialogueChecked(false);
                  setDialogueAns((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  });
                }}
                className={drillSelClass(
                  dialogueChecked,
                  dialogueAns[i],
                  d.answer,
                )}
                aria-label={`${d.who}: ${d.prompt}`}
              >
                <option value="">___</option>
                {d.options.map((o) => (
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
            onClick={() => setDialogueChecked(true)}
          >
            Check
          </button>
          {dialogueChecked && (
            <span className="l22-score">
              {
                dialogueGapsB.filter((d, i) => dialogueAns[i] === d.answer)
                  .length
              }{" "}
              / {dialogueGapsB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setDialogueAns(Array(dialogueGapsB.length).fill(""));
              setDialogueChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          <strong className="l31-ex-num">9a</strong> Put the words in the
          correct order to make questions.
        </p>
        <WordOrderBoard
          items={wordOrderB}
          rows={orderBRows}
          setRows={setOrderBRows}
          checked={orderBChecked}
          setChecked={setOrderBChecked}
        />
        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">9b</strong> Answer the questions about
          your home (to your teacher).
        </p>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          <strong className="l31-ex-num">10</strong> PREPARE · Look at Flat 1–3
          (Listening 5a). Write questions about the flats.
        </p>
        <div className="l25-wordbox">
          {flatCompareRows.map((r) => (
            <span key={r} className="l25-wordbox-item">
              {r}
            </span>
          ))}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          <strong className="l31-ex-num">11</strong> SPEAK · Викладач ставить
          питання українською. Відповідай повними реченнями англійською:
          спочатку про Flat 3, потім про своє житло та свій вибір.
        </p>
        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          {speakB.map((p) => (
            <div
              key={p.ua}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              <span
                style={{
                  display: "block",
                  marginBottom: "0.35rem",
                  color: "var(--color-primary)",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {p.topic} · відповідай англійською
              </span>
              {p.ua}
            </div>
          ))}
        </div>
      </section>

      {/* ── Exit ─────────────────────────────────────────────── */}
      <section id="l33-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
          <p className="lesson22-section-desc">
            rooms · Is there…? · How many…?
          </p>
        </div>
        <ul className="l22-goals-list">
          <li>Ask: Is there a/an …? / Are there any …?</li>
          <li>Name 4 rooms + 4 things in a home.</li>
          <li>Talk about a flat with There is / There are.</li>
          <li>Choose a flat for a holiday and say why.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/hw-31">
            HW31 crossword
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-32">
            ← Lesson 32
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-34">
            Lesson 34 →
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
