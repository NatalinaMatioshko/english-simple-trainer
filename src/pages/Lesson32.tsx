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
  beOrDoDrill,
  beChartRows,
  coreQuestions,
  doChartRows,
  doDoesPairs,
  exitChecks,
  fixWhLines,
  howAdjExamples,
  interviewGrid,
  matchAnswerQ,
  qBuilderExamples,
  qBuilderRows,
  qBuilderVerbs,
  qBuilderWh,
  questionWordCards,
  qwasiExamples,
  scrambleQs,
  speakPrompts,
  wasWereDrill,
  wasWereExamples,
  wasWereMatch,
  wasWereScramble,
  wasWereSpeakPrompts,
  whatNounExamples,
  whWords,
  yesNoExamples,
} from "../data/lesson32";
import {
  adjSentences,
  articleGapsB,
  dialogueGapsB,
  exitQs,
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
  northNorfolk,
  oppositeGaps,
  oppositePairs,
  photoMatchC,
  photoQsB,
  questionStartersC,
  speakB,
  speakC,
  tfItems,
  warmUpB,
  warmUpC,
  wordOrderB,
  wordOrderC,
} from "../data/lesson31";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson32.css";

type DrillItem = {
  prompt?: string;
  scramble?: string;
  answer?: string;
  options: readonly string[];
  correct?: string;
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[?.!,]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isFixOk(value: string, answers: readonly string[]): boolean {
  const n = normalize(value);
  return answers.some((a) => normalize(a) === n);
}

function selClass(checked: boolean, value: string, answer: string): string {
  if (!checked || !value) return "l26-drill-select";
  return value === answer
    ? "l26-drill-select is-ok"
    : "l26-drill-select is-err";
}

function SelectDrill({
  items,
  answers,
  setAnswers,
  checked,
  setChecked,
  getPrompt,
  getAnswer,
}: {
  items: readonly DrillItem[];
  answers: string[];
  setAnswers: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
  getPrompt: (d: DrillItem, i: number) => string;
  getAnswer: (d: DrillItem) => string;
}) {
  const score = items.filter((d, i) => answers[i] === getAnswer(d)).length;
  return (
    <>
      <div className="l26-drill-list">
        {items.map((d, i) => {
          const prompt = getPrompt(d, i);
          const answer = getAnswer(d);
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
                className={selClass(checked, answers[i], answer)}
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
        controls
        className="l25-audio-ctrl"
        src={SOUND_U3(r)}
        preload="none"
      />
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
  return parts.join(" ").replace(/\s+\?/g, "?").trim();
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

export default function Lesson32() {
  const [beDoAns, setBeDoAns] = useState(() =>
    Array(beOrDoDrill.length).fill(""),
  );
  const [beDoChecked, setBeDoChecked] = useState(false);
  const [scrambleAns, setScrambleAns] = useState(() =>
    Array(scrambleQs.length).fill(""),
  );
  const [scrambleChecked, setScrambleChecked] = useState(false);
  const [matchAns, setMatchAns] = useState(() =>
    Array(matchAnswerQ.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);
  const [fixAns, setFixAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(fixWhLines.map((l) => [l.id, l.wrong])),
  );
  const [fixChecked, setFixChecked] = useState(false);
  const [fixShow, setFixShow] = useState(false);

  const [wwAns, setWwAns] = useState(() =>
    Array(wasWereDrill.length).fill(""),
  );
  const [wwChecked, setWwChecked] = useState(false);
  const [wwScrambleAns, setWwScrambleAns] = useState(() =>
    Array(wasWereScramble.length).fill(""),
  );
  const [wwScrambleChecked, setWwScrambleChecked] = useState(false);
  const [wwMatchAns, setWwMatchAns] = useState(() =>
    Array(wasWereMatch.length).fill(""),
  );
  const [wwMatchChecked, setWwMatchChecked] = useState(false);

  const fixScore = fixWhLines.filter((l) =>
    isFixOk(fixAns[l.id] ?? "", l.answers),
  ).length;


  const [vocabB, setVocabB] = useState<number[]>([]);
  const [vocabC, setVocabC] = useState<number[]>([]);

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

  const [oppAns, setOppAns] = useState(() =>
    Array(oppositeGaps.length).fill(""),
  );
  const [oppChecked, setOppChecked] = useState(false);
  const [matchC, setMatchC] = useState<Record<string, string>>({});
  const [matchCChecked, setMatchCChecked] = useState(false);
  const [tfAns, setTfAns] = useState<Record<number, "T" | "F" | "">>({});
  const [tfChecked, setTfChecked] = useState(false);
  const [orderCAns, setOrderCAns] = useState(() =>
    Array(wordOrderC.length).fill(""),
  );
  const [orderCChecked, setOrderCChecked] = useState(false);
  const [showReading, setShowReading] = useState(true);

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
  const matchCScore = photoMatchC.filter((p) => matchC[p.photo] === p.place)
    .length;
  const tfScore = tfItems.filter((item, i) => tfAns[i] === item.answer).length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={32} />
            <h1>WH-questions · was / were</h1>
            <p className="lesson22-topic-pill">
              Who · What · Where · When · Why · How often · do / does / to be ·
              was / were
            </p>
            <p className="lesson22-subtitle">
              Частина 1: WH-питання з <strong>to be</strong> або{" "}
              <strong>do / does</strong>. Частина 2: минулий час{" "}
              <strong>to be</strong> — <strong>was / were</strong>.
            </p>
            <p className="lesson22-subtitle">
              Далі — Unit 3 B–C: <strong>Is there…? / Are there any…?</strong> і
              протилежні прикметники.
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
              to="/lesson-31"
            >
              ← Lesson 31
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
          <span>Who is he?</span>
          <span>What does she do?</span>
          <span>I was tired yesterday.</span>
          <span>Where were you yesterday?</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l32-rules">Правила</a>
          <a href="#l32-core">1 WH core</a>
          <a href="#l32-rule">2 WH rule</a>
          <a href="#l32-practice">3 WH practice</a>
          <a href="#l32-fix">4 Fix</a>
          <a href="#l32-speak">5 WH speaking</a>
          <a href="#l32-was">6 Was/were</a>
          <a href="#l32-was-practice">7 Practice</a>
          <a href="#l32-was-speak">8 Speaking</a>
          <a href="#l32-part-b">B Wifi</a>
          <a href="#l32b-flats">Listen 5</a>
          <a href="#l32b-grammar">Grammar 6–7</a>
          <a href="#l32b-dialogue">Practice 8–11</a>
          <a href="#l32-part-c">C Expensive</a>
          <a href="#l32c-reading">Reading</a>
          <a href="#l32-exit">Exit</a>
        </div>
      </section>

      {/* ── Правила · порядок слів у питаннях ───────────────── */}
      <section id="l32-rules" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Start here · Правила</p>
          <h2>Порядок слів у питаннях Present Simple</h2>
          <p className="lesson22-section-desc">
            Формула <strong>QWASI</strong> і дві схеми: питання з{" "}
            <strong>be</strong> та з <strong>do / does</strong>.
          </p>
        </div>

        <div className="l32r-stack">
          <div>
            <p className="l32r-lead">
              Порядок слів в англійському питанні в Present Simple —{" "}
              <strong>QWASI</strong>:{" "}
              <strong>(питальне слово)</strong> +{" "}
              <strong>допоміжне дієслово</strong> + <strong>підмет</strong> +{" "}
              <strong>інфінітив</strong>.
            </p>
            <div className="l32r-formula" aria-label="Формула QWASI">
              <span className="l32r-chip l32r-qw">
                <b>Q</b>
                <small>питальне слово</small>
              </span>
              <span className="l32r-chip l32r-aux">
                <b>A</b>
                <small>допоміжне</small>
              </span>
              <span className="l32r-chip l32r-subj">
                <b>S</b>
                <small>підмет</small>
              </span>
              <span className="l32r-chip l32r-tail">
                <b>I</b>
                <small>інфінітив</small>
              </span>
            </div>
            <div className="l32r-ex">
              {qwasiExamples.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="l32r-lead">
              У <strong>так / ні</strong> питаннях (загальних){" "}
              <strong>немає</strong> питального слова — починаємо з do / does.
            </p>
            <div className="l32r-ex">
              {yesNoExamples.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </div>
          </div>

          <div className="l32r-chart-box">
            <p className="l32r-chart-title">
              Present Simple questions ·{" "}
              <span>питання з be</span>
            </p>
            <div className="l32r-chart" role="table" aria-label="Питання з be">
              <div className="l32r-chart-head" role="row">
                <span className="l32r-col l32r-qw">Питальне слово</span>
                <span className="l32r-col l32r-aux">Допоміжне be</span>
                <span className="l32r-col l32r-subj">Підмет</span>
                <span className="l32r-col l32r-tail">Прикм. · іменник тощо</span>
              </div>
              {beChartRows.map((row) => (
                <div
                  key={`${row.aux}-${row.subject}-${row.tail}`}
                  className="l32r-row"
                  role="row"
                >
                  <span
                    className={`l32r-cell l32r-qw${row.qw ? "" : " is-empty"}`}
                    data-label="Питальне"
                  >
                    {row.qw || "—"}
                  </span>
                  <span className="l32r-cell l32r-aux" data-label="Be">
                    {row.aux}
                  </span>
                  <span className="l32r-cell l32r-subj" data-label="Підмет">
                    {row.subject}
                  </span>
                  <span
                    className={`l32r-cell l32r-tail${row.tail ? "" : " is-empty"}`}
                    data-label="Далі"
                  >
                    {row.tail || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="l32r-chart-box">
            <p className="l32r-chart-title">
              Present Simple questions ·{" "}
              <span>питання з do</span>
            </p>
            <div className="l32r-chart" role="table" aria-label="Питання з do">
              <div className="l32r-chart-head" role="row">
                <span className="l32r-col l32r-qw">Питальне слово</span>
                <span className="l32r-col l32r-aux">Допоміжне дієслово</span>
                <span className="l32r-col l32r-subj">Підмет</span>
                <span className="l32r-col l32r-tail">Інфінітив</span>
              </div>
              {doChartRows.map((row) => (
                <div
                  key={`${row.aux}-${row.subject}-${row.tail}`}
                  className="l32r-row"
                  role="row"
                >
                  <span
                    className={`l32r-cell l32r-qw${row.qw ? "" : " is-empty"}`}
                    data-label="Питальне"
                  >
                    {row.qw || "—"}
                  </span>
                  <span className="l32r-cell l32r-aux" data-label="Do/does">
                    {row.aux}
                  </span>
                  <span className="l32r-cell l32r-subj" data-label="Підмет">
                    {row.subject}
                  </span>
                  <span className="l32r-cell l32r-tail" data-label="Інфінітив">
                    {row.tail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="l32q-box">
            <p className="l32r-chart-title">
              Збери питання · <span>крок за кроком</span>
            </p>
            <div className="l32q-table">
              <span className="l32q-head l32r-qw">
                Wh-питання
                <small>wh- question</small>
              </span>
              <span className="l32q-head l32r-aux">
                Допоміжне
                <small>helping verb</small>
              </span>
              <span className="l32q-head l32r-subj">
                Підмет
                <small>subject</small>
              </span>
              <span className="l32q-head l32r-tail">
                Основне дієслово
                <small>main verb</small>
              </span>
              <span className="l32q-head l32r-c4">?</span>

              <div
                className="l32q-cell l32q-cell--wh l32r-qw"
                data-label="Wh-питання"
              >
                {qBuilderWh.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>

              {qBuilderRows.map((row, i) => (
                <div
                  key={`aux-${row.aux}${row.auxTail}-${i}`}
                  className={`l32q-cell l32q-cell--aux l32q-r${i + 1} l32r-aux`}
                  data-label="Допоміжне"
                >
                  <span>
                    {row.aux}
                    {row.auxTail && (
                      <span className="l32q-hl">{row.auxTail}</span>
                    )}
                  </span>
                </div>
              ))}

              {qBuilderRows.map((row, i) => (
                <div
                  key={`subj-${row.subjects.join("-")}`}
                  className={`l32q-cell l32q-cell--subj l32q-r${i + 1} l32r-subj`}
                  data-label="Підмет"
                >
                  {row.subjects.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              ))}

              <div
                className="l32q-cell l32q-cell--main l32r-tail"
                data-label="Основне дієслово"
              >
                {qBuilderVerbs.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>

              <div
                className="l32q-cell l32q-cell--q l32r-c4"
                data-label="Знак питання"
                aria-hidden="true"
              >
                ?
              </div>
            </div>

            <div className="l32q-examples">
              <span className="l32q-examples-label">Приклади</span>
              <ul>
                {qBuilderExamples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>

            <p className="l32r-note" style={{ marginTop: "0.85rem" }}>
              Читай зліва направо: береш слово з кожної колонки — і питання
              готове. <strong>Do</strong> для <strong>I / you / we / they</strong>,{" "}
              <strong>Does</strong> для <strong>he / she / it</strong>. Основне
              дієслово завжди в початковій формі.
            </p>
          </div>

          <div>
            <h3 className="l32r-sub">
              Питання з <em>am / is / are</em>
            </h3>
            <p className="l32r-note">
              Коли основне дієслово — <strong>be</strong>, ми ставимо{" "}
              <strong>am / is / are</strong> як допоміжне{" "}
              <strong>перед</strong> підметом. Порядок тоді{" "}
              <strong>QWAS</strong>: (питальне слово) + am/is/are + підмет.
              Інфінітива немає.
            </p>
          </div>

          <div>
            <h3 className="l32r-sub">
              Питання з <em>do / does</em>
            </h3>
            <p className="l32r-lead">
              Якщо дієслово <strong>не</strong> be — беремо{" "}
              <strong>do / does</strong>.{" "}
              <strong>does</strong> з <strong>he / she / it</strong>,{" "}
              <strong>do</strong> з <strong>I / you / we / they</strong>. Після
              підмета — основне дієслово в{" "}
              <strong>початковій формі</strong> (без{" "}
              <strong>-s / -es</strong>).
            </p>
            <div className="l32r-vs">
              {doDoesPairs.map((pair) => (
                <div key={pair.ok} style={{ display: "contents" }}>
                  <div className="l32r-vs-item is-ok">
                    <span className="l32r-vs-mark" aria-hidden="true">
                      ✓
                    </span>
                    <span>{pair.ok}</span>
                  </div>
                  <div className="l32r-vs-item is-err">
                    <span className="l32r-vs-mark" aria-hidden="true">
                      ✗
                    </span>
                    <span>{pair.err}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="l32r-sub">Питальні слова · граматична таблиця</h3>
            <div className="l32r-qw-grid">
              {questionWordCards.map((card, i) => (
                <article
                  key={card.word}
                  className={`l32r-qw-card l32r-c${(i % 4) + 1}`}
                >
                  <div className="l32r-qw-top">
                    <span className="l32r-qw-word">{card.word}</span>
                    <span className="l32r-qw-tag">{card.cat}</span>
                  </div>
                  <span className="l32r-qw-ua">{card.ua}</span>
                  <p className="l32r-qw-qa">
                    <b>A:</b> {card.q}
                    <br />
                    <b>B:</b> {card.a}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="l32r-pair-grid">
            <div className="l32r-pair-card l32r-c1">
              <h3>What + іменник</h3>
              <p>
                Часто ставимо <strong>what + іменник</strong>: what time, what
                colour, what size…
              </p>
              <ul className="l32r-pair-list">
                {whatNounExamples.map((item) => (
                  <li key={item.q}>
                    <b>{item.hl}</b>
                    {item.q.slice(item.hl.length)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="l32r-pair-card l32r-c2">
              <h3>How + прикметник / прислівник</h3>
              <p>
                Також <strong>how + adj / adv</strong>: how often, how old, how
                tall…
              </p>
              <ul className="l32r-pair-list">
                {howAdjExamples.map((item) => (
                  <li key={item.q}>
                    <b>{item.hl}</b>
                    {item.q.slice(item.hl.length)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Part 1 · WH-questions ─────────────────────────────── */}
      <section id="l32-core" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Start here</p>
          <h2>WH-questions</h2>
          <p className="lesson22-section-desc">
            WH-questions + <strong>do / does / to be</strong> — не новий час.
          </p>
        </div>

        <div className="l32-core-list">
          {coreQuestions.map((item) => (
            <div key={item.q} className="l32-core-item">
              <p className="l32-core-q">{item.q}</p>
              <span className="l32-core-tag">
                {item.kind === "be" ? "to be" : "do / does"}
              </span>
              <p className="l32-core-a">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="l22-vocab-grid" style={{ marginTop: "1.25rem" }}>
          {whWords.map((w) => (
            <div key={w.en} className="l22-vocab-card" style={{ cursor: "default" }}>
              <strong>{w.en}</strong>
              <span style={{ color: "var(--color-text-muted)" }}>{w.ua}</span>
              <span style={{ fontSize: "0.85rem" }}>{w.example}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="l32-rule" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Grammar</p>
          <h2>to be · або · do / does</h2>
        </div>
        <div className="l32-rule-grid">
          <div className="l32-rule-card">
            <h3>to be</h3>
            <p>
              <code>Who / What / Where + am / is / are …?</code>
              <br />
              Who <strong>is</strong> he?
              <br />
              What <strong>is</strong> your job?
              <br />
              Where <strong>are</strong> you?
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>do / does + verb</h3>
            <p>
              <code>WH + do/does + subject + verb …?</code>
              <br />
              What <strong>does</strong> she <strong>do</strong>?
              <br />
              Where <strong>does</strong> he <strong>live</strong>?
              <br />
              Why <strong>do</strong> you <strong>study</strong> English?
              <br />
              How often <strong>do</strong> you <strong>work</strong>?
            </p>
          </div>
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          <strong>he / she / it</strong> → <em>does</em> + інфінітив (do, live,
          start). <strong>I / you / we / they</strong> → <em>do</em> + інфінітив.
        </p>
      </section>

      <section id="l32-practice" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Practice</p>
          <h2>Choose · order · match</h2>
        </div>

        <h3 className="l22-listen-subtitle">is / do / does</h3>
        <SelectDrill
          items={beOrDoDrill}
          answers={beDoAns}
          setAnswers={setBeDoAns}
          checked={beDoChecked}
          setChecked={setBeDoChecked}
          getPrompt={(d) => d.prompt ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Put the words in order</h3>
        <SelectDrill
          items={scrambleQs}
          answers={scrambleAns}
          setAnswers={setScrambleAns}
          checked={scrambleChecked}
          setChecked={setScrambleChecked}
          getPrompt={(d) => d.scramble ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Match the answer → question</h3>
        <SelectDrill
          items={matchAnswerQ}
          answers={matchAns}
          setAnswers={setMatchAns}
          checked={matchChecked}
          setChecked={setMatchChecked}
          getPrompt={(d) => `Answer: ${d.answer ?? ""}`}
          getAnswer={(d) => d.correct ?? ""}
        />
      </section>

      <section id="l32-fix" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Fix the mistakes</p>
          <h2>Correct the questions</h2>
        </div>
        {fixWhLines.map((line) => {
          const value = fixAns[line.id] ?? "";
          const ok = isFixOk(value, line.answers);
          const showState = fixChecked;
          return (
            <div key={line.id} className="l32-fix-line">
              <label className="l32-fix-wrong" htmlFor={`l32-${line.id}`}>
                {line.wrong}
              </label>
              <input
                id={`l32-${line.id}`}
                type="text"
                className={`l32-fix-input${
                  showState ? (ok ? " is-ok" : " is-err") : ""
                }`}
                value={value}
                onChange={(e) => {
                  setFixChecked(false);
                  setFixAns((prev) => ({ ...prev, [line.id]: e.target.value }));
                }}
                spellCheck={false}
              />
              {fixShow && (
                <div>
                  <span className="l32-fix-tip">{line.tipUa}</span>
                  <div className="l32-fix-answer">✓ {line.answers[0]}</div>
                </div>
              )}
            </div>
          );
        })}
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setFixChecked(true)}
          >
            Check
          </button>
          {fixChecked && (
            <span className="l22-score">
              {fixScore} / {fixWhLines.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setFixShow((v) => !v)}
          >
            {fixShow ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFixAns(
                Object.fromEntries(fixWhLines.map((l) => [l.id, l.wrong])),
              );
              setFixChecked(false);
              setFixShow(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l32-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Speaking</p>
          <h2>Ask and answer</h2>
          <p className="lesson22-section-desc">
            Став викладачу WH-питання та відповідай на його питання. Використовуй{" "}
            <strong>is/are</strong> або <strong>do/does</strong>.
          </p>
        </div>

        <div className="l32-interview">
          {interviewGrid.map((w) => (
            <div key={w} className="l32-interview-card">
              {w}
            </div>
          ))}
        </div>

        <div className="lesson22-prompt-grid" style={{ marginTop: "1.25rem" }}>
          {speakPrompts.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Model.</strong> A: Who is he? — B: He&apos;s my brother.
            <br />
            A: What does he do? — B: He&apos;s a driver. / He drives a truck.
            <br />
            A: Where does he live? — B: He lives in Odesa.
            <br />
            A: How often do you work? — B: I work five days a week.
          </p>
        </blockquote>
      </section>

      {/* ── Part 2 · Was / Were ───────────────────────────────── */}
      <section id="l32-was" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Was / were</p>
          <h2>Past of to be</h2>
          <p className="lesson22-section-desc">
            <strong>was / were</strong> — минулий час дієслова{" "}
            <em>to be</em> (am / is / are → was / were).
          </p>
        </div>

        <div className="l32-rule-grid">
          <div className="l32-rule-card">
            <h3>was</h3>
            <p>
              <code>I / he / she / it → was</code>
              <br />
              I <strong>was</strong> tired yesterday.
              <br />
              She <strong>was</strong> at work.
              <br />
              He <strong>was</strong> at the gym.
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>were</h3>
            <p>
              <code>you / we / they → were</code>
              <br />
              You <strong>were</strong> at home.
              <br />
              They <strong>were</strong> at home.
              <br />
              We <strong>were</strong> late last week.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Forms</h3>
        <div className="l32-rule-grid">
          <div className="l32-rule-card">
            <h3>+</h3>
            <p>
              I <strong>was</strong> tired.
              <br />
              They <strong>were</strong> at home.
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>? Yes / No</h3>
            <p>
              <strong>Was</strong> he at the gym?
              <br />
              <strong>Were</strong> you at work?
            </p>
          </div>
        </div>
        <div className="l32-rule-grid" style={{ marginTop: "0.85rem" }}>
          <div className="l32-rule-card">
            <h3>? WH + was / were</h3>
            <p>
              Where <strong>were</strong> you yesterday?
              <br />
              Where <strong>was</strong> she last week?
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>Час</h3>
            <p>
              yesterday · last week · last night
              <br />
              at home · at work · at the gym
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Key examples</h3>
        <div className="l32-core-list">
          {wasWereExamples.map((item) => (
            <div key={item.en} className="l32-core-item">
              <p className="l32-core-q">{item.en}</p>
              <span className="l32-core-tag">
                {item.form === "affirmative"
                  ? "+"
                  : item.form === "yesno"
                    ? "Yes/No"
                    : "WH"}
              </span>
              <p className="l32-core-a">{item.ua}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="l32-was-practice" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Practice</p>
          <h2>was / were · order · match</h2>
        </div>

        <h3 className="l22-listen-subtitle">Choose was or were</h3>
        <SelectDrill
          items={wasWereDrill}
          answers={wwAns}
          setAnswers={setWwAns}
          checked={wwChecked}
          setChecked={setWwChecked}
          getPrompt={(d) => d.prompt ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Put the words in order</h3>
        <SelectDrill
          items={wasWereScramble}
          answers={wwScrambleAns}
          setAnswers={setWwScrambleAns}
          checked={wwScrambleChecked}
          setChecked={setWwScrambleChecked}
          getPrompt={(d) => d.scramble ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Match the answer → question</h3>
        <SelectDrill
          items={wasWereMatch}
          answers={wwMatchAns}
          setAnswers={setWwMatchAns}
          checked={wwMatchChecked}
          setChecked={setWwMatchChecked}
          getPrompt={(d) => `Answer: ${d.answer ?? ""}`}
          getAnswer={(d) => d.correct ?? ""}
        />
      </section>

      <section id="l32-was-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Speaking</p>
          <h2>Yesterday · last week</h2>
          <p className="lesson22-section-desc">
            Говори про минуле з <strong>was / were</strong>: at home, at work,
            at the gym, yesterday, last week.
          </p>
        </div>

        <div className="lesson22-prompt-grid">
          {wasWereSpeakPrompts.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Model.</strong> A: Where were you yesterday? — B: I was at
            home. / I was at work.
            <br />
            A: Was he at the gym? — B: Yes, he was. / No, he wasn&apos;t.
            <br />
            A: Were they at home last week? — B: Yes, they were.
            <br />
            A: I was tired yesterday. — B: Me too. / I wasn&apos;t tired.
          </p>
        </blockquote>
      </section>

      {/* ═══════════════ PART B ═══════════════ */}
      <PartBanner
        id="l32-part-b"
        part="Part B · 3B"
        title="Is there wifi?"
        desc="Rooms & things in a home · Is there a/an…? · Are there any…? · How many…?"
      />

      <section id="l32b-warmup" className="lesson22-block panel">
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

      <section id="l32b-vocab" className="lesson22-block panel">
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

      <section id="l32b-flats" className="lesson22-block panel">
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

      <section id="l32b-grammar" className="lesson22-block panel">
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

      <section id="l32b-dialogue" className="lesson22-block panel">
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

      {/* ═══════════════ PART C ═══════════════ */}
      <PartBanner
        id="l32-part-c"
        part="Part C · 3C"
        title="It's expensive!"
        desc="Opposite adjectives · position of adjectives · North Norfolk reading"
      />

      <section id="l32c-warmup" className="lesson22-block panel">
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

      <section id="l32c-opposites" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">C2 · Vocabulary</p>
          <h2>Describing places · opposites</h2>
          <p className="lesson22-section-desc">
            Listen &amp; repeat (R12), then study the picture pairs.
          </p>
        </div>
        <AudioBlock
          r={12}
          exercise="3C · Vocab"
          title="It's busy / quiet / big… — listen & repeat"
          transcript={
            <ol>
              {adjSentences.map((s) => (
                <li key={s.en}>{s.en}</li>
              ))}
            </ol>
          }
        />
        <VocabFlipGrid
          items={adjSentences}
          flipped={vocabC}
          toggle={(i) => toggle(setVocabC, i)}
        />
        <h3 className="l22-listen-subtitle">Opposite pairs · pictures</h3>
        <div>
          {oppositePairs.map((p) => (
            <div key={p.a} className="l31-adj-row">
              <div className="l31-adj-row-label">
                {p.a} ↔ {p.b}{" "}
                <span style={{ fontWeight: 500 }}>
                  ({p.uaA} ↔ {p.uaB})
                </span>
              </div>
              <div className="l31-adj-card">
                <strong>{p.a}</strong>
                <img
                  src={IMG31(p.imgA)}
                  alt={`${p.a} place`}
                  loading="lazy"
                />
              </div>
              <div className="l31-adj-card">
                <strong>{p.b}</strong>
                <img
                  src={IMG31(p.imgB)}
                  alt={`${p.b} place`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <h3 className="l22-listen-subtitle">Complete with the opposite</h3>
        <L31SelectDrill
          items={oppositeGaps}
          answers={oppAns}
          setAnswers={setOppAns}
          checked={oppChecked}
          setChecked={setOppChecked}
          labelKey={(d) => d.prompt ?? ""}
        />
        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Speak.</strong>{" "}
            <em>There&apos;s a big train station in my city.</em> /{" "}
            <em>The café in my town is expensive.</em>
          </p>
        </blockquote>
      </section>

      <section id="l32c-reading" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">C3 · Reading</p>
          <h2>Welcome to North Norfolk!</h2>
          <p className="lesson22-section-desc">
            Read · match photos A–C · True / False.
          </p>
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

        <h3 className="l22-listen-subtitle">True or False?</h3>
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

      <section id="l32c-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">C4 · Grammar · word order · speaking</p>
          <h2>Position of adjectives</h2>
        </div>
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
                  There are <strong>cheap</strong> shops.
                </span>
              </div>
            </div>
          </div>
        </div>
        <h3 className="l22-listen-subtitle">Stress · notice</h3>
        <AudioBlock
          r={13}
          exercise="3C · Pronunciation"
          title="Adjective + noun — sentence stress"
          transcript={
            <ol>
              <li>This is a quiet town.</li>
              <li>There are six small shops.</li>
              <li>There are no hotels.</li>
              <li>This town is busy.</li>
              <li>There&apos;s a small cinema.</li>
            </ol>
          }
        />
        <div className="l25-wordbox">
          <span className="l25-wordbox-item">
            This is a <strong>quiet</strong> town.
          </span>
          <span className="l25-wordbox-item">
            There are <strong>six small</strong> shops.
          </span>
          <span className="l25-wordbox-item">
            There are <strong>no</strong> hotels.
          </span>
          <span className="l25-wordbox-item">
            This town is <strong>busy</strong>.
          </span>
          <span className="l25-wordbox-item">
            There&apos;s a <strong>small</strong> cinema.
          </span>
        </div>
        <h3 className="l22-listen-subtitle">Put the words in order</h3>
        <L31SelectDrill
          items={wordOrderC}
          answers={orderCAns}
          setAnswers={setOrderCAns}
          checked={orderCChecked}
          setChecked={setOrderCChecked}
          labelKey={(d) => d.scramble ?? ""}
        />
        <h3 className="l22-listen-subtitle">Speak · your town</h3>
        <LessonFigure
          src={IMG31(lesson31Images.tokyoFuji)}
          alt="Tokyo skyline with Mount Fuji"
          caption="Speaking cue · describe a city"
          variant="photo"
        />
        <div className="l25-wordbox" style={{ marginBottom: "1rem" }}>
          {questionStartersC.map((q) => (
            <span key={q} className="l25-wordbox-item">
              {q}
            </span>
          ))}
        </div>
        <div className="lesson22-prompt-grid">
          {speakC.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Model.</strong> Teacher: <em>Is there a big hotel?</em> You:{" "}
            <em>Yes, the City Hotel is big. / No, there are no big hotels.</em>{" "}
            Teacher: <em>Is the cinema good?</em> You:{" "}
            <em>Yes, it is. / No, it isn&apos;t.</em>
          </p>
        </blockquote>
      </section>

      {/* ── Exit ─────────────────────────────────────────────── */}
      <section id="l32-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          {exitChecks.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h3 className="l22-listen-subtitle">Unit 3 B–C</h3>
        <ul className="l22-goals-list">
          {exitQs.map((q) => (
            <li key={q}>{q}</li>
          ))}
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
          <Link className="l25-cr-mini-btn" to="/lesson-31">
            ← Lesson 31
          </Link>
        </div>
      </section>
    </div>
  );
}
