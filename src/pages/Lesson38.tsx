import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { WordMap } from "../components/lesson38/WordMap";
import Unit4AudioBlock from "../components/Unit4AudioBlock";
import {
  contractionListen,
  descMatch,
  grammarPlusMinus,
  hasHaveChoose,
  homeworkFixGroups,
  homeworkFixLines,
  IMG38,
  labelBank,
  lucaText,
  makeQuestions,
  matchPhotos,
  packSuggest,
  photoLabels,
  profilePhotos,
  questionGrammar,
  roseLines,
  samHasGot,
  samWhere,
  sofiaSentences,
  speakBagPrompts,
  speakPrepare,
  travelObjects,
  tripLabels,
  tripScenes,
  whoIsWho,
  wordMapExtra,
} from "../data/lesson38";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson38.css";

function ImgOrFace({
  file,
  emoji,
  label,
}: {
  file: string;
  emoji: string;
  label: string;
}) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <span className="l38-obj-face" aria-hidden="true">
        {emoji}
      </span>
    );
  }
  return (
    <img src={IMG38(file)} alt={label} onError={() => setBroken(true)} />
  );
}

function PhotoCard({
  file,
  emoji,
  caption,
  note,
  wide,
}: {
  file: string;
  emoji: string;
  caption: string;
  note?: string;
  wide?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className={`l38-photo-card${wide ? " l38-photo-card--wide" : ""}`}>
      {broken ? (
        <div className="l38-photo-face">
          <span aria-hidden="true">{emoji}</span>
          <strong>{caption}</strong>
          {note && <small>{note}</small>}
        </div>
      ) : (
        <img
          src={IMG38(file)}
          alt={caption}
          onError={() => setBroken(true)}
        />
      )}
      <figcaption>
        {caption}
        {note ? ` · ${note}` : ""}
      </figcaption>
    </figure>
  );
}

function altClass(
  checked: boolean,
  value: string,
  opt: string,
  answer: string,
) {
  const on = value === opt;
  if (!checked) return `l38-alt${on ? " is-on" : ""}`;
  if (on && opt === answer) return "l38-alt is-ok";
  if (on) return "l38-alt is-err";
  if (opt === answer) return "l38-alt is-key";
  return "l38-alt";
}

function CheckBar({
  checked,
  score,
  total,
  onCheck,
}: {
  checked: boolean;
  score: number;
  total: number;
  onCheck: () => void;
}) {
  return (
    <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
      <button type="button" className="l22-check-btn" onClick={onCheck}>
        Check
      </button>
      {checked && (
        <span>
          {score} / {total}
        </span>
      )}
    </div>
  );
}

function normalizeFix(
  s: string,
  keepCase = false,
  keepPunct = false,
): string {
  let base = s
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

const VIDEO_ID = "UANUTB1GsVU";

export default function Lesson38() {
  const [whoAns, setWhoAns] = useState<Record<string, string>>({});
  const [whoChecked, setWhoChecked] = useState(false);
  const [labelAns, setLabelAns] = useState(() =>
    Array(photoLabels.length).fill(""),
  );
  const [labelChecked, setLabelChecked] = useState(false);
  const [descAns, setDescAns] = useState<Record<string, string>>({});
  const [descChecked, setDescChecked] = useState(false);
  const [mapPick, setMapPick] = useState<string | null>(null);
  const [mapBins, setMapBins] = useState<Record<string, "colours" | "body">>(
    {},
  );
  const [mapChecked, setMapChecked] = useState(false);
  const [mapPlay, setMapPlay] = useState(0);
  const [plusAns, setPlusAns] = useState(() =>
    Array(grammarPlusMinus.length).fill(""),
  );
  const [plusChecked, setPlusChecked] = useState(false);
  const [chooseAns, setChooseAns] = useState(() =>
    Array(hasHaveChoose.length).fill(""),
  );
  const [chooseChecked, setChooseChecked] = useState(false);
  const [sofiaRows, setSofiaRows] = useState(() =>
    initWordOrderRows(sofiaSentences),
  );
  const [sofiaChecked, setSofiaChecked] = useState(false);
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
  const [friendNotes, setFriendNotes] = useState(["", "", ""]);
  const [hwFixAns, setHwFixAns] = useState(() =>
    Object.fromEntries(homeworkFixLines.map((l) => [l.id, l.wrong])),
  );
  const [hwFixChecked, setHwFixChecked] = useState(false);
  const [hwFixHints, setHwFixHints] = useState<Record<string, boolean>>({});
  const [hwFixShowKey, setHwFixShowKey] = useState(false);

  const whoScore = whoIsWho.filter((item) => whoAns[item.id] === item.answer)
    .length;
  const labelScore = photoLabels.filter((item, i) => labelAns[i] === item.answer)
    .length;
  const descScore = descMatch.filter((item) => descAns[item.id] === item.answer)
    .length;
  const mapScore = wordMapExtra.filter((item) => mapBins[item.word] === item.bin)
    .length;
  const plusScore = grammarPlusMinus.filter(
    (item, i) => plusAns[i] === item.answer,
  ).length;
  const chooseScore = hasHaveChoose.filter(
    (item, i) => chooseAns[i] === item.answer,
  ).length;
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
  const hwFixScore = homeworkFixLines.filter((line) =>
    isHwFixOk(
      hwFixAns[line.id] ?? "",
      line.answers,
      "keepCase" in line && line.keepCase === true,
      "keepPunct" in line && line.keepPunct === true,
    ),
  ).length;

  const putMap = (bin: "colours" | "body") => {
    if (!mapPick) return;
    setMapChecked(false);
    setMapBins((prev) => ({ ...prev, [mapPick]: bin }));
    setMapPick(null);
  };

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
            <LessonNumberKicker number={38} />
            <h1>You&apos;ve got a friend · Have you got it?</h1>
            <p className="lesson22-topic-pill">
              Unit 4A–4B · have / has got · describe people · pack for a trip
            </p>
            <p className="lesson22-subtitle">
              Describe people with <strong>have / has got</strong>, then ask
              questions and pack a bag.
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
              to="/lesson-37"
            >
              ← Lesson 37
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/hw-38"
            >
              HW38 →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>have got / has got</span>
          <span>hair · eyes · age</span>
          <span>Have you got…?</span>
          <span>passport · tickets</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l38-hwfix">Fix HW</a>
          <a href="#l38-read">1 Friends</a>
          <a href="#l38-labels">2 Labels</a>
          <a href="#l38-match">3 Photos</a>
          <a href="#l38-map">4 Word map</a>
          <a href="#l38-grammar">5 Grammar</a>
          <a href="#l38-listen">6 Listen</a>
          <a href="#l38-choose">7 Choose</a>
          <a href="#l38-sofia">8 Sofia</a>
          <a href="#l38-speak1">9 Speak</a>
          <a href="#l38-video">4B Video</a>
          <a href="#l38-objects">4B Pack</a>
          <a href="#l38-trips">9 Trips</a>
          <a href="#l38-sam">10 Sam</a>
          <a href="#l38-ask">11 Questions</a>
          <a href="#l38-rose">12 Dialogue</a>
          <a href="#l38-speak2">13 Bag</a>
          <a href="#l38-exit">Exit</a>
        </div>
      </section>

      <section id="l38-hwfix" className="lesson22-block panel">
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
        {homeworkFixGroups.map((g) => (
          <div key={g.id} className="l31-fix-group">
            <h3 className="l31-fix-group-title">
              {g.title}{" "}
              <span style={{ fontWeight: 500, color: "var(--color-text-muted)" }}>
                · {g.desc}
              </span>
            </h3>
            {homeworkFixLines
              .filter((line) => line.group === g.id)
              .map((line) => {
                const value = hwFixAns[line.id] ?? "";
                const keepCase = "keepCase" in line && line.keepCase === true;
                const keepPunct = "keepPunct" in line && line.keepPunct === true;
                const ok = isHwFixOk(value, line.answers, keepCase, keepPunct);
                const showState = hwFixChecked;
                const showHint = hwFixShowKey || !!hwFixHints[line.id];
                return (
                  <div key={line.id} className="l31-fix-line">
                    <p className="l38-hwfix-uk">
                      {line.id}. {line.uk}
                    </p>
                    <label
                      className="l31-fix-wrong"
                      htmlFor={`l38-hwfix-${line.id}`}
                    >
                      <span className="l31-fix-wrong-text">{line.wrong}</span>
                    </label>
                    <div className="l31-fix-row">
                      <input
                        id={`l38-hwfix-${line.id}`}
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

      <section id="l38-read" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · 4A Reading</p>
          <h2>You&apos;ve got a friend</h2>
          <p className="lesson22-section-desc">
            Read the profile and look at the photos. Which person is Luca?
            Which person is Mehmet?
          </p>
        </div>
        <div className="l25-conf-card">
          <div className="l25-conf-header">Luca&apos;s profile</div>
          <div className="l25-conf-fields">
            {lucaText.map((line) => (
              <p key={line} style={{ margin: "0 0 0.55rem" }}>
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="l38-photo-grid l38-photo-grid--wide" style={{ marginTop: "1rem" }}>
          {profilePhotos.map((p) => (
            <PhotoCard
              key={p.id}
              file={p.file}
              emoji={p.emoji}
              caption={p.caption}
              note={p.note}
            />
          ))}
        </div>
        <div className="l26-drill-list" style={{ marginTop: "1rem" }}>
          {whoIsWho.map((item) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">{item.prompt}</strong>
              <select
                value={whoAns[item.id] ?? ""}
                onChange={(e) => {
                  setWhoChecked(false);
                  setWhoAns((prev) => ({ ...prev, [item.id]: e.target.value }));
                }}
                className={drillSelClass(
                  whoChecked,
                  whoAns[item.id] ?? "",
                  item.answer,
                )}
              >
                <option value="">Photo</option>
                {profilePhotos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <CheckBar
          checked={whoChecked}
          score={whoScore}
          total={whoIsWho.length}
          onCheck={() => setWhoChecked(true)}
        />
      </section>

      <section id="l38-labels" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Vocabulary</p>
          <h2>Match the labels</h2>
          <p className="lesson22-section-desc">
            Look at the numbers on the photos. Match 1–7 with the words in the
            box.
          </p>
        </div>
        <div className="l38-chip-bank" aria-label="Word box">
          {labelBank.map((word) => (
            <span key={word} className="l38-chip">
              {word}
            </span>
          ))}
        </div>
        {photoLabels.map((item, i) => (
          <div key={item.n} className="l38-label-row">
            <span className="l38-label-n">{item.n}</span>
            <select
              value={labelAns[i]}
              onChange={(e) => {
                setLabelChecked(false);
                const next = [...labelAns];
                next[i] = e.target.value;
                setLabelAns(next);
              }}
              className={drillSelClass(
                labelChecked,
                labelAns[i],
                item.answer,
              )}
              aria-label={`Label ${item.n}, ${item.hint}`}
            >
              <option value="">Photo {item.photo} · {item.hint}</option>
              {labelBank.map((word) => (
                <option key={word} value={word}>
                  {word}
                </option>
              ))}
            </select>
          </div>
        ))}
        <CheckBar
          checked={labelChecked}
          score={labelScore}
          total={photoLabels.length}
          onCheck={() => setLabelChecked(true)}
        />
      </section>

      <section id="l38-match" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3a · Photos A–D</p>
          <h2>Match descriptions 1–4</h2>
          <p className="lesson22-section-desc">
            Match descriptions 1–4 with photos A–D. Then listen and repeat the
            words in bold.
          </p>
        </div>
        <div className="l38-photo-grid">
          {matchPhotos.map((p) => (
            <PhotoCard
              key={p.id}
              file={p.file}
              emoji={p.emoji}
              caption={p.caption}
            />
          ))}
        </div>
        <div className="l26-drill-list" style={{ marginTop: "1rem" }}>
          {descMatch.map((item) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {item.id}. {item.text}
              </strong>
              <select
                value={descAns[item.id] ?? ""}
                onChange={(e) => {
                  setDescChecked(false);
                  setDescAns((prev) => ({ ...prev, [item.id]: e.target.value }));
                }}
                className={drillSelClass(
                  descChecked,
                  descAns[item.id] ?? "",
                  item.answer,
                )}
                aria-label={`Description ${item.id}`}
              >
                <option value="">Photo</option>
                {matchPhotos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <CheckBar
          checked={descChecked}
          score={descScore}
          total={descMatch.length}
          onCheck={() => setDescChecked(true)}
        />
        <Unit4AudioBlock
          r={1}
          exercise="3b · 4.1"
          title="Listen and repeat the words in bold: blonde hair, blue eyes, in her 50s…"
        />
      </section>

      <section id="l38-map" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3c · Word map</p>
          <h2>Add more words</h2>
          <p className="lesson22-section-desc">
            Watch the map appear. Then tap a new word and tap{" "}
            <strong>colours</strong> or <strong>the body</strong>. Discuss extra
            words with your teacher.
          </p>
        </div>
        <WordMap
          pick={mapPick}
          bins={mapBins}
          playKey={mapPlay}
          onPickHub={putMap}
        />
        <div className="l38-chip-bank">
          {wordMapExtra.map((item) => (
            <button
              key={item.word}
              type="button"
              className={`l38-chip${mapPick === item.word ? " is-on" : ""}${
                mapBins[item.word] ? " is-used" : ""
              }`}
              onClick={() => setMapPick(item.word)}
            >
              {item.word}
            </button>
          ))}
        </div>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setMapPlay((n) => n + 1)}
          >
            Play animation
          </button>
        </div>
        <CheckBar
          checked={mapChecked}
          score={mapScore}
          total={wordMapExtra.length}
          onCheck={() => setMapChecked(true)}
        />
      </section>

      <section id="l38-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar</p>
          <h2>have / has got</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5</strong> Read and complete the
          grammar box.
        </p>
        <div className="l25-grammar-box">
          <div className="l25-grammar-label">have / has got</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+</span>
              <div className="l38-have-lines">
                <p>
                  <span className="l38-have-subj">I / You / We / They</span>
                  <select
                    aria-label="1 have or has"
                    value={plusAns[0]}
                    onChange={(e) => {
                      setPlusChecked(false);
                      const next = [...plusAns];
                      next[0] = e.target.value;
                      setPlusAns(next);
                    }}
                    className={drillSelClass(
                      plusChecked,
                      plusAns[0],
                      grammarPlusMinus[0].answer,
                    )}
                  >
                    <option value="">1 ______</option>
                    {grammarPlusMinus[0].options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span>got brown hair.</span>
                </p>
                <p>
                  <span className="l38-have-subj">He / She / It</span>
                  <select
                    aria-label="2 have or has"
                    value={plusAns[1]}
                    onChange={(e) => {
                      setPlusChecked(false);
                      const next = [...plusAns];
                      next[1] = e.target.value;
                      setPlusAns(next);
                    }}
                    className={drillSelClass(
                      plusChecked,
                      plusAns[1],
                      grammarPlusMinus[1].answer,
                    )}
                  >
                    <option value="">2 ______</option>
                    {grammarPlusMinus[1].options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span>got green eyes.</span>
                </p>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--neg">
              <span className="l25-gr-sign">−</span>
              <div className="l38-have-lines">
                <p>
                  <span className="l38-have-subj">I / You / We / They</span>
                  <span>
                    <strong>haven&apos;t</strong> got blue eyes.
                  </span>
                </p>
                <p>
                  <span className="l38-have-subj">He / She / It</span>
                  <select
                    aria-label="3 hasn't or haven't"
                    value={plusAns[2]}
                    onChange={(e) => {
                      setPlusChecked(false);
                      const next = [...plusAns];
                      next[2] = e.target.value;
                      setPlusAns(next);
                    }}
                    className={drillSelClass(
                      plusChecked,
                      plusAns[2],
                      grammarPlusMinus[2].answer,
                    )}
                  >
                    <option value="">3 ______</option>
                    {grammarPlusMinus[2].options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span>got red hair.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <CheckBar
          checked={plusChecked}
          score={plusScore}
          total={grammarPlusMinus.length}
          onCheck={() => setPlusChecked(true)}
        />

        <p id="l38-listen" className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">6a</strong> Listen to the sentences.
          Notice the pronunciation of the words in blue.
        </p>
        <ol className="l38-contract-list">
          {contractionListen.map((item) => (
            <li key={item.contraction}>
              <span className="l38-blue">{item.contraction}</span> {item.rest}
            </li>
          ))}
        </ol>
        <Unit4AudioBlock
          r={2}
          exercise="4A · 4.2"
          title="I've / You've / We've / They've / He's / She's"
          transcript={
            <ol>
              {contractionListen.map((item) => (
                <li key={item.contraction}>
                  {item.contraction} {item.rest}
                </li>
              ))}
            </ol>
          }
        />
        <p className="l31-ex-line">
          <strong className="l31-ex-num">6b</strong> Listen again and repeat.
        </p>

        <p id="l38-choose" className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">7</strong> Choose the correct
          alternatives.
        </p>
        <ol className="l38-alt-list">
          {hasHaveChoose.map((item, i) => (
            <li key={item.id}>
              {item.before}{" "}
              {item.options.map((opt, oi) => (
                <span key={opt}>
                  {oi > 0 ? <span className="l38-alt-slash"> / </span> : null}
                  <button
                    type="button"
                    className={altClass(
                      chooseChecked,
                      chooseAns[i],
                      opt,
                      item.answer,
                    )}
                    onClick={() => {
                      setChooseChecked(false);
                      const next = [...chooseAns];
                      next[i] = opt;
                      setChooseAns(next);
                    }}
                  >
                    {opt}
                  </button>
                </span>
              ))}{" "}
              {item.after}
            </li>
          ))}
        </ol>
        <CheckBar
          checked={chooseChecked}
          score={chooseScore}
          total={hasHaveChoose.length}
          onCheck={() => setChooseChecked(true)}
        />
      </section>

      <section id="l38-sofia" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · Sentences</p>
          <h2>Sofia and Jules</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">8</strong> Look at the picture and
          make sentences using the prompts.
        </p>
        <PhotoCard
          file="sofia-jules.png"
          emoji="👨‍👩‍👦"
          caption="Sofia and Jules · Paris"
          note="office worker · son · 30s"
          wide
        />
        <div style={{ marginTop: "1rem" }}>
          <WordOrderBoard
            items={sofiaSentences}
            rows={sofiaRows}
            setRows={setSofiaRows}
            checked={sofiaChecked}
            setChecked={setSofiaChecked}
          />
        </div>
      </section>

      <section id="l38-speak1" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Talk about a friend</h2>
        </div>
        <p className="l38-speak-banner l38-speak-banner--prep">Prepare</p>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">9</strong> You&apos;re going to talk
          about a friend. Think about:
        </p>
        <ul className="l22-goals-list">
          {speakPrepare.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
        <div className="l26-drill-list">
          {speakPrepare.map((item, i) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">{item.label}</strong>
              <input
                className="l22-gap-input"
                value={friendNotes[i]}
                onChange={(e) => {
                  const next = [...friendNotes];
                  next[i] = e.target.value;
                  setFriendNotes(next);
                }}
                aria-label={item.label}
              />
            </div>
          ))}
        </div>
        <p className="l38-speak-banner">Speak</p>
        <PhotoCard
          file="friends-street.png"
          emoji="👫"
          caption="A friend"
          wide
        />
        <p id="l38-speak10" className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">10a</strong> Describe yourself. Then
          describe your friend from Exercise 9. Talk with your teacher.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <em>
              OK, my name is Piotr. My friend&apos;s name is Basia. We&apos;re
              from Poland. I&apos;m a teacher. I&apos;ve got …
            </em>
          </p>
        </blockquote>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">10b</strong> Tell your teacher: are
          you very different from your friend?
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <em>
              Piotr is very different from his friend Basia. Piotr is a
              teacher, but Basia is …
            </em>
          </p>
        </blockquote>
      </section>

      <section id="l38-video" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Video · 4B</p>
          <h2>Listening quiz · adjectives</h2>
          <p className="lesson22-section-desc">
            Watch the video with your teacher. Then do the 4B vocabulary.
          </p>
        </div>
        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Beginner English Listening Quiz — Adjectives"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section id="l38-objects" className="lesson22-block panel">
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

      <section id="l38-trips" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">9 · Situations</p>
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

      <section id="l38-sam" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">10 · Listening</p>
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

      <section id="l38-ask" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">11 · Grammar</p>
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

      <section id="l38-rose" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">12 · Dialogue</p>
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

      <section id="l38-speak2" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">13 · Speaking</p>
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

      <section id="l38-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Describe a person: He&apos;s got brown hair. She&apos;s in her 30s.</li>
          <li>Say + and −: I&apos;ve got / I haven&apos;t got / She hasn&apos;t got.</li>
          <li>Ask: Have you got your tickets? Has she got a camera?</li>
          <li>Pack a bag and tell your teacher what you have got.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/hw-38">
            HW38
          </Link>
          <Link className="l25-cr-mini-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-37">
            ← Lesson 37
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
