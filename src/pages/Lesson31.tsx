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
  adjSentences,
  articleGapsB,
  dialogueGapsB,
  exitQs,
  fixMistakeGroups,
  fixMistakeLines,
  flatCompareRows,
  flatsB,
  flatsBCorrectId,
  flatBoxRooms,
  flatBoxThings,
  flatMatchB,
  flatTickSentencesB,
  flatWordsB,
  gapDrillA,
  grammarBoxB,
  homeVocab,
  intonationB,
  lesson31Images,
  mapPlacesA,
  matchSpeakersA,
  listenChooseA,
  grammarBoxA,
  placesListA,
  placeStressItems,
  northNorfolk,
  noticeSoundsA,
  oppositeGaps,
  oppositePairs,
  photoMatchC,
  photoQsB,
  questionStartersC,
  speakA,
  speakB,
  speakC,
  tfItems,
  uvoGaps,
  warmUpB,
  warmUpC,
  wordOrderB,
  wordOrderC,
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

function normalizeFix(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[?.!,]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isFixOk(value: string, answers: readonly string[]): boolean {
  const n = normalizeFix(value);
  return answers.some((a) => normalizeFix(a) === n);
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

type DrillItem = {
  prompt?: string;
  cue?: string;
  scramble?: string;
  blank?: string;
  q?: string;
  options: readonly string[];
  answer: string;
};

function SelectDrill({
  items,
  answers,
  setAnswers,
  checked,
  setChecked,
  labelKey,
}: {
  items: readonly DrillItem[];
  answers: string[];
  setAnswers: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
  labelKey: (d: DrillItem, i: number) => string;
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

export default function Lesson31() {
  const [vocabB, setVocabB] = useState<number[]>([]);
  const [vocabC, setVocabC] = useState<number[]>([]);

  const [fixAns, setFixAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(fixMistakeLines.map((l) => [l.id, l.wrong])),
  );
  const [fixChecked, setFixChecked] = useState(false);
  const [fixShowKey, setFixShowKey] = useState(false);
  const [fixHints, setFixHints] = useState<Record<string, boolean>>({});

  const [grammarBoxAns, setGrammarBoxAns] = useState(() =>
    Array(grammarBoxA.length).fill(""),
  );
  const [grammarBoxChecked, setGrammarBoxChecked] = useState(false);
  const [gapAns, setGapAns] = useState(() => Array(gapDrillA.length).fill(""));
  const [gapChecked, setGapChecked] = useState(false);
  const [uvoAns, setUvoAns] = useState(() => Array(uvoGaps.length).fill(""));
  const [uvoChecked, setUvoChecked] = useState(false);
  const [mapAns, setMapAns] = useState<Record<string, string>>({});
  const [mapChecked, setMapChecked] = useState(false);
  const [mapPick, setMapPick] = useState<
    | { side: "place"; place: string }
    | { side: "letter"; letter: string }
    | null
  >(null);
  const [mapShowAll, setMapShowAll] = useState(false);
  const mapLetterOrder = mapPlacesA.map((p) => p.letter);
  const [matchA, setMatchA] = useState<Record<string, string>>({});
  const [matchAChecked, setMatchAChecked] = useState(false);
  const [matchAPick, setMatchAPick] = useState<
    | { side: "speaker"; id: string }
    | { side: "photo"; photo: string }
    | null
  >(null);
  const [matchAShowAll, setMatchAShowAll] = useState(false);
  const matchPhotoOrder = ["A", "B", "C"] as const;
  const [listen4Ans, setListen4Ans] = useState(() =>
    Array(listenChooseA.length).fill(""),
  );
  const [listen4Checked, setListen4Checked] = useState(false);
  const [listen4Hints, setListen4Hints] = useState<Record<number, boolean>>({});
  const [listen4ShowAll, setListen4ShowAll] = useState(false);
  const [placeStressSel, setPlaceStressSel] = useState<number[][]>(() =>
    placeStressItems.map(() => []),
  );
  const [placeStressChecked, setPlaceStressChecked] = useState(false);
  const [showWriteSample, setShowWriteSample] = useState(false);

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

  const placeToLetter = Object.fromEntries(
    Object.entries(mapAns).map(([letter, place]) => [place, letter]),
  ) as Record<string, string>;

  const pairMap = (place: string, letter: string) => {
    setMapChecked(false);
    setMapShowAll(false);
    setMapAns((prev) => {
      const next = { ...prev };
      for (const [l, p] of Object.entries(next)) {
        if (p === place || l === letter) delete next[l];
      }
      next[letter] = place;
      return next;
    });
    setMapPick(null);
  };

  const onMapPlace = (place: string) => {
    const linked = placeToLetter[place];
    if (linked) {
      setMapAns((prev) => {
        const next = { ...prev };
        delete next[linked];
        return next;
      });
      setMapChecked(false);
      setMapShowAll(false);
      setMapPick(null);
      return;
    }
    if (mapPick?.side === "letter") {
      pairMap(place, mapPick.letter);
      return;
    }
    setMapPick(
      mapPick?.side === "place" && mapPick.place === place
        ? null
        : { side: "place", place },
    );
  };

  const onMapLetter = (letter: string) => {
    if (mapAns[letter]) {
      setMapAns((prev) => {
        const next = { ...prev };
        delete next[letter];
        return next;
      });
      setMapChecked(false);
      setMapShowAll(false);
      setMapPick(null);
      return;
    }
    if (mapPick?.side === "place") {
      pairMap(mapPick.place, letter);
      return;
    }
    setMapPick(
      mapPick?.side === "letter" && mapPick.letter === letter
        ? null
        : { side: "letter", letter },
    );
  };

  const speakerToPhoto = matchA;
  const photoToSpeaker = Object.fromEntries(
    Object.entries(matchA).map(([id, photo]) => [photo, id]),
  ) as Record<string, string>;

  const pairSpeaker = (id: string, photo: string) => {
    setMatchAChecked(false);
    setMatchAShowAll(false);
    setMatchA((prev) => {
      const next = { ...prev };
      for (const [sid, ph] of Object.entries(next)) {
        if (sid === id || ph === photo) delete next[sid];
      }
      next[id] = photo;
      return next;
    });
    setMatchAPick(null);
  };

  const onSpeaker = (id: string) => {
    if (speakerToPhoto[id]) {
      setMatchA((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setMatchAChecked(false);
      setMatchAShowAll(false);
      setMatchAPick(null);
      return;
    }
    if (matchAPick?.side === "photo") {
      pairSpeaker(id, matchAPick.photo);
      return;
    }
    setMatchAPick(
      matchAPick?.side === "speaker" && matchAPick.id === id
        ? null
        : { side: "speaker", id },
    );
  };

  const onPhoto = (photo: string) => {
    const linked = photoToSpeaker[photo];
    if (linked) {
      setMatchA((prev) => {
        const next = { ...prev };
        delete next[linked];
        return next;
      });
      setMatchAChecked(false);
      setMatchAShowAll(false);
      setMatchAPick(null);
      return;
    }
    if (matchAPick?.side === "speaker") {
      pairSpeaker(matchAPick.id, photo);
      return;
    }
    setMatchAPick(
      matchAPick?.side === "photo" && matchAPick.photo === photo
        ? null
        : { side: "photo", photo },
    );
  };

  const togglePlaceStress = (wordIdx: number, sylIdx: number) => {
    setPlaceStressChecked(false);
    setPlaceStressSel((prev) => {
      const next = prev.map((row) => [...row]);
      const row = next[wordIdx] ?? [];
      next[wordIdx] = row.includes(sylIdx)
        ? row.filter((i) => i !== sylIdx)
        : [...row, sylIdx].sort((a, b) => a - b);
      return next;
    });
  };

  const fixScored = fixMistakeLines.filter((l) => !l.okAsIs);
  const fixScore = fixScored.filter((l) =>
    isFixOk(fixAns[l.id] ?? "", l.answers),
  ).length;
  const mapScore = mapPlacesA.filter((p) => mapAns[p.letter] === p.place)
    .length;
  const matchAScore = matchSpeakersA.filter((p) => matchA[p.id] === p.photo)
    .length;
  const listen4Score = listenChooseA.filter(
    (d, i) => listen4Ans[i] === d.answer,
  ).length;
  const placeStressScore = placeStressItems.filter((j, i) => {
    const sel = placeStressSel[i] ?? [];
    if (sel.length !== j.stressed.length) return false;
    return sel.every((v, k) => v === j.stressed[k]);
  }).length;
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
            <LessonNumberKicker number={31} />
            <h1>Town &amp; home</h1>
            <p className="lesson22-topic-pill">
              places · there is/are · rooms · Is there…? · adjectives
            </p>
            <p className="lesson22-subtitle">
              Unit 3 A–C · one student. Describe your town, talk about a flat,
              use adjectives. Grammar —{" "}
              <strong>There is / There are</strong>,{" "}
              <strong>Is there / Are there</strong>, adjective position.
            </p>
            <ul className="l22-goals-list">
              <li>
                <strong>A My town</strong> — places + There&apos;s / There are;
              </li>
              <li>
                <strong>B Is there wifi?</strong> — rooms &amp; Is there…?;
              </li>
              <li>
                <strong>C It&apos;s expensive!</strong> — opposite adjectives +
                reading.
              </li>
            </ul>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/vocab"
            >
              Vocab →
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/trainer"
            >
              Trainer →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>There&apos;s a park</span>
          <span>Is there wifi?</span>
          <span>a quiet town</span>
          <span>It&apos;s expensive</span>
          <span>Are there any hotels?</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l31-fix">Fix mistakes</a>
          <a href="#l31-part-a">A My town</a>
          <a href="#l31a-vocab">Vocab</a>
          <a href="#l31a-listen">Listen</a>
          <a href="#l31a-grammar">Grammar</a>
          <a href="#l31a-practice">Practice</a>
          <a href="#l31a-speak">Speak</a>
          <a href="#l31-part-b">B Wifi</a>
          <a href="#l31b-flats">Listen 5</a>
          <a href="#l31b-grammar">Grammar 6–7</a>
          <a href="#l31b-dialogue">Practice 8–11</a>
          <a href="#l31-part-c">C Expensive</a>
          <a href="#l31c-reading">Reading</a>
          <a href="#l31-review">Exit</a>
        </div>
      </section>

      {/* ═══════════════ Warm-up · Fix mistakes (ДЗ учня) ═══════════════ */}
      <section id="l31-fix" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up · Fix the mistakes</p>
          <h2>Friend &amp; family</h2>
          <p className="lesson22-section-desc">
            Виправ помилки в текстах. Редагуй рядок → <strong>Check</strong>.
            Кнопка <strong>Hint</strong> біля рядка показує підказку й
            правильну відповідь. Або відкрий усі через{" "}
            <strong>Show answers</strong>.
          </p>
        </div>

        {fixMistakeGroups.map((g) => (
          <div key={g.id} className="l31-fix-group">
            <h3 className="l31-fix-group-title">
              {g.title}{" "}
              <span style={{ fontWeight: 500, color: "var(--color-text-muted)" }}>
                · {g.titleUa}
              </span>
            </h3>
            {fixMistakeLines
              .filter((l) => l.group === g.id)
              .map((line) => {
                const value = fixAns[line.id] ?? "";
                const scored = !line.okAsIs;
                const ok = isFixOk(value, line.answers);
                const showState = fixChecked && scored;
                const showHint = fixShowKey || !!fixHints[line.id];
                return (
                  <div key={line.id} className="l31-fix-line">
                    <label className="l31-fix-wrong" htmlFor={`fix-${line.id}`}>
                      <span className="l31-fix-wrong-text">{line.wrong}</span>
                      {line.okAsIs && (
                        <span style={{ marginLeft: "0.4rem" }}>(OK)</span>
                      )}
                    </label>
                    <div className="l31-fix-row">
                      <input
                        id={`fix-${line.id}`}
                        type="text"
                        className={`l31-fix-input${
                          showState ? (ok ? " is-ok" : " is-err") : ""
                        }`}
                        value={value}
                        onChange={(e) => {
                          setFixChecked(false);
                          setFixAns((prev) => ({
                            ...prev,
                            [line.id]: e.target.value,
                          }));
                        }}
                        spellCheck={false}
                        aria-label={`Correct: ${line.wrong}`}
                      />
                      {scored && (
                        <button
                          type="button"
                          className={`l31-fix-hint-btn${showHint ? " is-on" : ""}`}
                          onClick={() =>
                            setFixHints((prev) => ({
                              ...prev,
                              [line.id]: !prev[line.id],
                            }))
                          }
                          aria-pressed={showHint}
                          aria-label={
                            showHint
                              ? `Hide hint for: ${line.wrong}`
                              : `Show hint for: ${line.wrong}`
                          }
                        >
                          {showHint ? "Hide" : "Hint"}
                        </button>
                      )}
                    </div>
                    {showHint && scored && (
                      <div className="l31-fix-reveal">
                        {line.tipUa && (
                          <span className="l31-fix-tip">{line.tipUa}</span>
                        )}
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
            onClick={() => setFixChecked(true)}
          >
            Check
          </button>
          {fixChecked && (
            <span className="l22-score">
              {fixScore} / {fixScored.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !fixShowKey;
              setFixShowKey(next);
              if (next) {
                setFixHints(
                  Object.fromEntries(
                    fixMistakeLines
                      .filter((l) => !l.okAsIs)
                      .map((l) => [l.id, true]),
                  ),
                );
              } else {
                setFixHints({});
              }
            }}
          >
            {fixShowKey ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFixAns(
                Object.fromEntries(
                  fixMistakeLines.map((l) => [l.id, l.wrong]),
                ),
              );
              setFixChecked(false);
              setFixShowKey(false);
              setFixHints({});
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ═══════════════ PART A · 3A My town ═══════════════ */}
      <section id="l31-part-a" className="lesson22-block panel">
        <div className="l31-unit-head">
          <span className="l31-unit-badge" aria-label="Unit 3A">
            3A
          </span>
          <h2 className="l31-unit-title">My town</h2>
        </div>
        <div className="l31-book-goals l31-book-goals--stack">
          <p>
            <strong>Goal:</strong> say what&apos;s in a town
          </p>
          <p>
            <strong>Grammar:</strong> There is / There are
          </p>
          <p>
            <strong>Vocabulary:</strong> places in town
          </p>
        </div>
      </section>

      <section id="l31a-vocab" className="lesson22-block panel">
        <h2 className="l31-skill-title">Vocabulary</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">1a</strong> Look at the picture. Match
          A–L with places 1–12.
        </p>

        <div className="l31-map-pair">
          <LessonFigure
            src={IMG31(lesson31Images.townMapAg)}
            alt="Town map with labels A, B, G, H"
            variant="map"
          />
          <LessonFigure
            src={IMG31(lesson31Images.townStreetCl)}
            alt="Town street with labels C–F and I–L"
            variant="map"
          />
        </div>

        <div className="l31-pair-match">
          <div className="l31-pair-col" aria-label="Places 1–12">
            {placesListA.map((place, i) => {
              const linked = placeToLetter[place];
              const key = mapPlacesA.find((p) => p.place === place);
              const selected =
                mapPick?.side === "place" && mapPick.place === place;
              const matched = Boolean(linked);
              const correct = matched && key?.letter === linked;
              const wrong = mapChecked && matched && !correct;
              const ok = mapChecked && matched && correct;
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
                  key={place}
                  type="button"
                  className={cls}
                  onClick={() => onMapPlace(place)}
                  aria-pressed={selected || matched}
                >
                  <span className="l31-pair-key">{i + 1}.</span>
                  <span className="l31-pair-text">{place}</span>
                  {matched && (
                    <span className="l31-pair-badge">{linked}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="l31-pair-col" aria-label="Map letters A–L">
            {mapLetterOrder.map((letter) => {
              const place = mapAns[letter];
              const key = mapPlacesA.find((p) => p.letter === letter);
              const selected =
                mapPick?.side === "letter" && mapPick.letter === letter;
              const matched = Boolean(place);
              const correct = matched && key?.place === place;
              const wrong = mapChecked && matched && !correct;
              const ok = mapChecked && matched && correct;
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
                  onClick={() => onMapLetter(letter)}
                  aria-pressed={selected || matched}
                >
                  <span className="l31-pair-key">{letter}.</span>
                  {matched && (
                    <span className="l31-pair-text">{place}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {mapShowAll && (
          <div className="l31-fix-reveal" style={{ marginTop: "0.85rem" }}>
            <span className="l31-fix-answer">
              {mapPlacesA.map((p) => `${p.letter} → ${p.place}`).join(" · ")}
            </span>
          </div>
        )}
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setMapChecked(true)}
          >
            Check
          </button>
          {mapChecked && (
            <span className="l22-score">
              {mapScore} / {mapPlacesA.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !mapShowAll;
              setMapShowAll(next);
              if (next) {
                setMapAns(
                  Object.fromEntries(
                    mapPlacesA.map((p) => [p.letter, p.place]),
                  ),
                );
                setMapPick(null);
                setMapChecked(true);
              }
            }}
          >
            {mapShowAll ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setMapAns({});
              setMapChecked(false);
              setMapPick(null);
              setMapShowAll(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          <strong className="l31-ex-num">1b</strong> Listen and underline the
          stressed syllables. Listen again and repeat.
        </p>
        <AudioBlock
          r={1}
          exercise="3A · 1b"
          title="Places in town"
          transcript={
            <ol>
              {placesListA.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          }
        />
        <div className="l26-stress-list">
          {placeStressItems.map((j, ji) => {
            const sel = placeStressSel[ji] ?? [];
            const ok =
              sel.length === j.stressed.length &&
              sel.every((v, k) => v === j.stressed[k]);
            return (
              <div key={j.en} className="l26-stress-row">
                <span className="l26-stress-letter">{j.n}</span>
                <div className="l26-stress-parts">
                  {j.parts.map((part, pi) => {
                    const on = sel.includes(pi);
                    const should = j.stressed.includes(pi);
                    let cls = "l26-stress-syl";
                    if (on) cls += " l26-stress-syl--on";
                    if (placeStressChecked) {
                      if (should && on) cls += " l26-stress-syl--ok";
                      else if (on && !should) cls += " l26-stress-syl--err";
                      else if (should && !on) cls += " l26-stress-syl--miss";
                    }
                    return (
                      <span key={`${j.en}-${pi}`} className="l26-stress-chunk">
                        <button
                          type="button"
                          className={cls}
                          onClick={() => togglePlaceStress(ji, pi)}
                          aria-pressed={on}
                        >
                          {part}
                        </button>
                        {j.breakAfter.includes(pi) ? (
                          <span className="l26-stress-gap"> </span>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
                {placeStressChecked && (
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
            onClick={() => setPlaceStressChecked(true)}
          >
            Check
          </button>
          {placeStressChecked && (
            <span className="l22-score">
              {placeStressScore} / {placeStressItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPlaceStressSel(
                placeStressItems.map((j) => [...j.stressed]),
              );
              setPlaceStressChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPlaceStressSel(placeStressItems.map(() => []));
              setPlaceStressChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">2</strong> How do you say / spell…?
        </p>
        <div className="l31-dialogue">
          <p>
            A: How do you say this in English?
            <br />
            B: That&apos;s a cinema.
            <br />
            A: How do you spell that?
            <br />
            B: C-I-N-E-M-A.
          </p>
        </div>
      </section>

      <section id="l31a-listen" className="lesson22-block panel">
        <h2 className="l31-skill-title">Listening</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">3</strong> Listen. Match speakers 1–3
          with photos A–C.
        </p>

        <AudioBlock
          r={2}
          exercise="3A · 3"
          title="Jack · Diana · Yuki"
          transcript={
            <div>
              <p>
                <strong>1 Jack:</strong> My town is great. There are three cafés
                and two restaurants… There is a supermarket and a bookshop.
              </p>
              <p>
                <strong>2 Diana:</strong> In my town, there are three hotels, two
                restaurants and a cinema. There aren&apos;t any supermarkets.
                There&apos;s a market.
              </p>
              <p>
                <strong>3 Yuki:</strong> There aren&apos;t any shops… There
                isn&apos;t a bank. There&apos;s a train station, a park and a
                café.
              </p>
            </div>
          }
        />

        <LessonFigure
          src={IMG31(lesson31Images.photosAbc)}
          alt="Photos A, B and C"
          variant="photo"
        />

        <div className="l31-pair-match l31-pair-match--compact">
          <div className="l31-pair-col" aria-label="Speakers">
            {matchSpeakersA.map((p) => {
              const linked = speakerToPhoto[p.id];
              const selected =
                matchAPick?.side === "speaker" && matchAPick.id === p.id;
              const matched = Boolean(linked);
              const correct = matched && linked === p.photo;
              const wrong = matchAChecked && matched && !correct;
              const ok = matchAChecked && matched && correct;
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
                  key={p.id}
                  type="button"
                  className={cls}
                  onClick={() => onSpeaker(p.id)}
                  aria-pressed={selected || matched}
                >
                  <span className="l31-pair-key">{p.id}.</span>
                  <span className="l31-pair-text">{p.speaker}</span>
                  {matched && (
                    <span className="l31-pair-badge">{linked}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="l31-pair-col" aria-label="Photos">
            {matchPhotoOrder.map((photo) => {
              const linked = photoToSpeaker[photo];
              const key = matchSpeakersA.find((p) => p.photo === photo);
              const selected =
                matchAPick?.side === "photo" && matchAPick.photo === photo;
              const matched = Boolean(linked);
              const correct = matched && key?.id === linked;
              const wrong = matchAChecked && matched && !correct;
              const ok = matchAChecked && matched && correct;
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
                  key={photo}
                  type="button"
                  className={cls}
                  onClick={() => onPhoto(photo)}
                  aria-pressed={selected || matched}
                >
                  <span className="l31-pair-key">{photo}.</span>
                  {matched && key && (
                    <span className="l31-pair-text">{key.speaker}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {matchAShowAll && (
          <div className="l31-fix-reveal" style={{ marginTop: "0.85rem" }}>
            <span className="l31-fix-answer">
              {matchSpeakersA
                .map((p) => `${p.id} ${p.speaker} → Photo ${p.photo}`)
                .join(" · ")}
            </span>
          </div>
        )}
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setMatchAChecked(true)}
          >
            Check
          </button>
          {matchAChecked && (
            <span className="l22-score">
              {matchAScore} / {matchSpeakersA.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !matchAShowAll;
              setMatchAShowAll(next);
              if (next) {
                setMatchA(
                  Object.fromEntries(
                    matchSpeakersA.map((p) => [p.id, p.photo]),
                  ),
                );
                setMatchAPick(null);
                setMatchAChecked(true);
              }
            }}
          >
            {matchAShowAll ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setMatchA({});
              setMatchAChecked(false);
              setMatchAPick(null);
              setMatchAShowAll(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          <strong className="l31-ex-num">4</strong> Listen again. What do the
          people say? Choose a or b.
        </p>
        <div className="l31-ab-list">
          {(["Jack", "Diana", "Yuki"] as const).map((who) => (
            <div key={who} className="l31-ab-group">
              <h3 className="l31-ab-who">{who}</h3>
              {listenChooseA
                .filter((d) => d.who === who)
                .map((d) => {
                  const i = listenChooseA.findIndex((x) => x.id === d.id);
                  const chosen = listen4Ans[i];
                  const showHint = listen4ShowAll || !!listen4Hints[i];
                  return (
                    <div key={d.id} className="l31-ab-item">
                      <div className="l31-ab-head">
                        <strong className="l31-ab-n">{d.n}</strong>
                        <button
                          type="button"
                          className={`l31-fix-hint-btn${showHint ? " is-on" : ""}`}
                          onClick={() =>
                            setListen4Hints((prev) => ({
                              ...prev,
                              [i]: !prev[i],
                            }))
                          }
                        >
                          {showHint ? "Hide" : "Hint"}
                        </button>
                      </div>
                      <div className="l31-ab-options" role="group" aria-label={`Question ${d.n}`}>
                        {d.options.map((opt) => {
                          const selected = chosen === opt.key;
                          const ok =
                            listen4Checked && selected && opt.key === d.answer;
                          const err =
                            listen4Checked && selected && opt.key !== d.answer;
                          const revealOk = showHint && opt.key === d.answer;
                          const cls = [
                            "l31-ab-opt",
                            selected ? "is-selected" : "",
                            ok || revealOk ? "is-ok" : "",
                            err ? "is-err" : "",
                          ]
                            .filter(Boolean)
                            .join(" ");
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              className={cls}
                              onClick={() => {
                                setListen4Checked(false);
                                const next = [...listen4Ans];
                                next[i] = opt.key;
                                setListen4Ans(next);
                              }}
                              aria-pressed={selected}
                            >
                              <span className="l31-ab-key">{opt.key}</span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setListen4Checked(true)}
          >
            Check
          </button>
          {listen4Checked && (
            <span className="l22-score">
              {listen4Score} / {listenChooseA.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next = !listen4ShowAll;
              setListen4ShowAll(next);
              setListen4Hints(
                next
                  ? Object.fromEntries(listenChooseA.map((_, i) => [i, true]))
                  : {},
              );
              if (next) {
                setListen4Ans(listenChooseA.map((d) => d.answer));
                setListen4Checked(true);
              }
            }}
          >
            {listen4ShowAll ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setListen4Ans(Array(listenChooseA.length).fill(""));
              setListen4Checked(false);
              setListen4Hints({});
              setListen4ShowAll(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l31a-grammar" className="lesson22-block panel">
        <h2 className="l31-skill-title">Grammar</h2>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5</strong> Complete the grammar box with{" "}
          <em>There is</em> and <em>There are</em>.
        </p>

        <div className="l31-there-box">
          <div className="l31-there-head">There is / There are</div>
          <div className="l31-there-cols">
            <div className="l31-there-col-h">Singular</div>
            <div className="l31-there-col-h">Plural</div>
          </div>

          <div className="l31-there-row">
            <div className="l31-there-sign l31-there-sign--pos">+</div>
            <div className="l31-there-cell">
              <p>
                There&apos;s a park.
                <br />
                <span className="l31-there-gap">
                  <strong className="l31-ab-n">1</strong>
                  <select
                    value={grammarBoxAns[0]}
                    onChange={(e) => {
                      setGrammarBoxChecked(false);
                      const next = [...grammarBoxAns];
                      next[0] = e.target.value;
                      setGrammarBoxAns(next);
                    }}
                    className={drillSelClass(
                      grammarBoxChecked,
                      grammarBoxAns[0],
                      grammarBoxA[0].answer,
                    )}
                    aria-label="Gap 1"
                  >
                    <option value="">______</option>
                    {grammarBoxA[0].options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  a park.
                </span>
              </p>
            </div>
            <div className="l31-there-cell">
              <p>
                <span className="l31-there-gap">
                  <strong className="l31-ab-n">2</strong>
                  <select
                    value={grammarBoxAns[1]}
                    onChange={(e) => {
                      setGrammarBoxChecked(false);
                      const next = [...grammarBoxAns];
                      next[1] = e.target.value;
                      setGrammarBoxAns(next);
                    }}
                    className={drillSelClass(
                      grammarBoxChecked,
                      grammarBoxAns[1],
                      grammarBoxA[1].answer,
                    )}
                    aria-label="Gap 2"
                  >
                    <option value="">______</option>
                    {grammarBoxA[1].options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  three cafés.
                </span>
              </p>
            </div>
          </div>

          <div className="l31-there-row">
            <div className="l31-there-sign l31-there-sign--neg">−</div>
            <div className="l31-there-cell">
              <p>There isn&apos;t a bank.</p>
            </div>
            <div className="l31-there-cell">
              <p>
                There aren&apos;t any supermarkets.
                <br />
                <span className="l31-there-gap">
                  <strong className="l31-ab-n">3</strong>
                  <select
                    value={grammarBoxAns[2]}
                    onChange={(e) => {
                      setGrammarBoxChecked(false);
                      const next = [...grammarBoxAns];
                      next[2] = e.target.value;
                      setGrammarBoxAns(next);
                    }}
                    className={drillSelClass(
                      grammarBoxChecked,
                      grammarBoxAns[2],
                      grammarBoxA[2].answer,
                    )}
                    aria-label="Gap 3"
                  >
                    <option value="">______</option>
                    {grammarBoxA[2].options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  no supermarkets.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setGrammarBoxChecked(true)}
          >
            Check
          </button>
          {grammarBoxChecked && (
            <span className="l22-score">
              {
                grammarBoxA.filter((g, i) => grammarBoxAns[i] === g.answer)
                  .length
              }{" "}
              / {grammarBoxA.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGrammarBoxAns(grammarBoxA.map((g) => g.answer));
              setGrammarBoxChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGrammarBoxAns(Array(grammarBoxA.length).fill(""));
              setGrammarBoxChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.5rem" }}>
          Listen and notice <em>there&apos;s</em>, <em>there isn&apos;t</em>,{" "}
          <em>there are</em>, <em>there aren&apos;t</em>. Then repeat.
        </p>
        <AudioBlock
          r={3}
          exercise="3A · Pronunciation"
          title="There's / There are"
          transcript={
            <ol>
              {noticeSoundsA.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          }
        />
      </section>

      <section id="l31a-practice" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">A5 · Practice</p>
          <h2>There&apos;s / There are · Uvo</h2>
        </div>
        <SelectDrill
          items={gapDrillA}
          answers={gapAns}
          setAnswers={setGapAns}
          checked={gapChecked}
          setChecked={setGapChecked}
          labelKey={(d) => d.prompt ?? ""}
        />
        <h3 className="l22-listen-subtitle">Uvo is a good town</h3>
        <p className="lesson22-section-desc">
          Gap-fill with <strong>are / a / There&apos;s / there / no</strong>.
        </p>
        <SelectDrill
          items={uvoGaps}
          answers={uvoAns}
          setAnswers={setUvoAns}
          checked={uvoChecked}
          setChecked={setUvoChecked}
          labelKey={(d) => d.prompt ?? ""}
        />
      </section>

      <section id="l31a-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">A6 · Speaking · writing</p>
          <h2>Talk about your town</h2>
          <p className="lesson22-section-desc">
            Скажи вчителю 4–6 речень (+ і −) про своє місто. Потім напиши 6
            речень.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {speakA.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Model.</strong> I live in Lviv. <em>There&apos;s</em> a big
            park near my flat. <em>There are</em> many cafés in the centre.{" "}
            <em>There isn&apos;t</em> a train station in my street.{" "}
            <em>There aren&apos;t any</em> hotels near my house.
          </p>
        </blockquote>
        <h3 className="l22-listen-subtitle">Write six sentences</h3>
        <div className="l25-wordbox">
          <span className="l25-wordbox-item">I live in …</span>
          <span className="l25-wordbox-item">There&apos;s a …</span>
          <span className="l25-wordbox-item">There are …</span>
          <span className="l25-wordbox-item">There isn&apos;t a …</span>
          <span className="l25-wordbox-item">There aren&apos;t any …</span>
          <span className="l25-wordbox-item">My favourite place is …</span>
        </div>
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "1rem" }}
          onClick={() => setShowWriteSample((v) => !v)}
        >
          {showWriteSample ? "Hide sample" : "Show sample"}
        </button>
        {showWriteSample && (
          <div className="l25-details-body" style={{ marginTop: "0.75rem" }}>
            <p>
              I live in Kyiv. There&apos;s a park near my house. There are three
              cafés in my street. There isn&apos;t a cinema near me. There
              aren&apos;t any hotels here. My favourite place is the
              supermarket — it&apos;s big!
            </p>
          </div>
        )}
      </section>

      {/* ═══════════════ PART B ═══════════════ */}
      <PartBanner
        id="l31-part-b"
        part="Part B · 3B"
        title="Is there wifi?"
        desc="Rooms & things in a home · Is there a/an…? · Are there any…? · How many…?"
      />

      <section id="l31b-warmup" className="lesson22-block panel">
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

      <section id="l31b-vocab" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">B2 · Vocabulary</p>
          <h2>Rooms and things in a home</h2>
          <p className="lesson22-section-desc">
            City flat, Brighton · £80 per night. Flip cards, look at the photos,
            listen (R4), then match A–K with the words in the box.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> CITY FLAT, BRIGHTON · £80 per
          night · rooms A–D · icons E–K — flip the cards.
        </p>
        <VocabFlipGrid
          items={homeVocab}
          flipped={vocabB}
          toggle={(i) => toggle(setVocabB, i)}
        />

        <LessonFigure
          src={IMG31(lesson31Images.brightonRoomsAd)}
          alt="City Flat Brighton — room photos A–D"
          caption="CITY FLAT, BRIGHTON **** · £80 per night · rooms A–D"
          variant="photo"
          wide
        />

        <AudioBlock
          r={4}
          exercise="3B · Vocab"
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
          <strong className="l31-ex-num">2b</strong> Look at photos A–D again.
          Answer the questions.
        </p>
        <AudioBlock
          r={9}
          exercise="3B · 2b"
          title="What is there…? / How many rooms…?"
        />
        <SelectDrill
          items={photoQsB}
          answers={photoAns}
          setAnswers={setPhotoAns}
          checked={photoChecked}
          setChecked={setPhotoChecked}
          labelKey={(d) => d.q ?? ""}
        />
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Make sentences: <em>There are two beds in the bedroom.</em>
        </p>
      </section>

      <section id="l31b-flats" className="lesson22-block panel">
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
        <SelectDrill
          items={articleGapsB}
          answers={articleAns}
          setAnswers={setArticleAns}
          checked={articleChecked}
          setChecked={setArticleChecked}
          labelKey={(d) => d.blank ?? ""}
        />
      </section>

      <section id="l31b-grammar" className="lesson22-block panel">
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

      <section id="l31b-dialogue" className="lesson22-block panel">
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
          <strong className="l31-ex-num">11</strong> SPEAK · Answer your
          questions about Flat 3 (or your flat). Then choose a flat for your
          holiday and say why.
        </p>
        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          {speakB.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ PART C ═══════════════ */}
      <PartBanner
        id="l31-part-c"
        part="Part C · 3C"
        title="It's expensive!"
        desc="Opposite adjectives · position of adjectives · North Norfolk reading"
      />

      <section id="l31c-warmup" className="lesson22-block panel">
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

      <section id="l31c-opposites" className="lesson22-block panel">
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
        <SelectDrill
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

      <section id="l31c-reading" className="lesson22-block panel">
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

      <section id="l31c-grammar" className="lesson22-block panel">
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
        <SelectDrill
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

      {/* ═══════════════ EXIT ═══════════════ */}
      <section id="l31-review" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
          <p className="lesson22-section-desc">
            places · there is/are · rooms · Is there…? · adjectives
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {exitQs.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <Link className="lesson22-back-link" to="/hw-31">
            HW31 crossword →
          </Link>
          <Link className="lesson22-back-link" to="/vocab">
            Vocab →
          </Link>
          <Link className="lesson22-back-link" to="/trainer">
            Trainer →
          </Link>
          <Link
            className="lesson22-back-link lesson22-back-link--ghost"
            to="/lesson-30"
          >
            ← Lesson 30
          </Link>
          <Link
            className="lesson22-back-link lesson22-back-link--ghost"
            to="/lessons"
          >
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
