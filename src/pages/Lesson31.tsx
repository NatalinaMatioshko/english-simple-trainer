import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import {
  fixMistakeGroups,
  fixMistakeLines,
  gapDrillA,
  lesson31Images,
  mapPlacesA,
  matchSpeakersA,
  listenChooseA,
  grammarBoxA,
  placesListA,
  placeStressItems,
  noticeSoundsA,
  speakA,
  uvoGaps,
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

export default function Lesson31() {
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
    placeStressItems.map(() => [] as number[]),
  );
  const [placeStressChecked, setPlaceStressChecked] = useState(false);
  const [showWriteSample, setShowWriteSample] = useState(false);


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
  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={31} />
            <h1>My town</h1>
            <p className="lesson22-topic-pill">
              places · there is/are · There&apos;s / There are
            </p>
            <p className="lesson22-subtitle">
              Unit 3A. Describe your town. Grammar —{" "}
              <strong>There is / There are</strong>,{" "}
              <strong>isn&apos;t / aren&apos;t</strong>, no / any.
            </p>
            <ul className="l22-goals-list">
              <li>
                <strong>A My town</strong> — places + There&apos;s / There are.
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
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-32"
            >
              Lesson 32 →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>There&apos;s a park</span>
          <span>There are two cafés</span>
          <span>There isn&apos;t a station</span>
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

      {/* ═══════════════ EXIT ═══════════════ */}
      <section id="l31-review" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
          <p className="lesson22-section-desc">
            places · there is/are · isn&apos;t / aren&apos;t
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {[
            "Name 5 places in a town.",
            "There's / There are / isn't / aren't",
            "Ask about places with There is / There are.",
            "Describe your town in 4–6 sentences.",
          ].map((q) => (
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
          <Link className="lesson22-back-link" to="/lesson-32">
            Lesson 32 →
          </Link>
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
