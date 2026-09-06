import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import {
  descMatch,
  grammarPlusMinus,
  hasHaveChoose,
  IMG38,
  labelBank,
  lucaText,
  makeQuestions,
  packSuggest,
  peoplePhotos,
  photoLabels,
  questionGrammar,
  roseLines,
  samHasGot,
  samWhere,
  sofiaSentences,
  SOUND_U4,
  speakBagPrompts,
  speakFriendPrompts,
  travelObjects,
  tripLabels,
  tripScenes,
  wordMapItems,
} from "../data/lesson38";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson38.css";

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
  const src = SOUND_U4(r);
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
}: {
  file: string;
  emoji: string;
  caption: string;
  note?: string;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className="l38-photo-card">
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

export default function Lesson38() {
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

  const labelScore = photoLabels.filter((item, i) => labelAns[i] === item.answer)
    .length;
  const descScore = descMatch.filter((item) => descAns[item.id] === item.answer)
    .length;
  const mapScore = wordMapItems.filter((item) => mapBins[item.word] === item.bin)
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
          <a href="#l38-read">1 Friends</a>
          <a href="#l38-labels">2 Labels</a>
          <a href="#l38-match">3 Photos</a>
          <a href="#l38-map">4 Word map</a>
          <a href="#l38-grammar">5 Grammar</a>
          <a href="#l38-sofia">6 Sofia</a>
          <a href="#l38-speak1">7 Speak</a>
          <a href="#l38-objects">8 Pack</a>
          <a href="#l38-trips">9 Trips</a>
          <a href="#l38-sam">10 Sam</a>
          <a href="#l38-ask">11 Questions</a>
          <a href="#l38-rose">12 Dialogue</a>
          <a href="#l38-speak2">13 Bag</a>
          <a href="#l38-exit">Exit</a>
        </div>
      </section>

      <section id="l38-read" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · 4A Reading</p>
          <h2>You&apos;ve got a friend</h2>
          <p className="lesson22-section-desc">
            Read about Luca and Mehmet. Then look at the photos.
          </p>
        </div>
        <p className="l38-note">
          Textbook photos can go in <code>public/images/lesson38/</code> (
          <code>luca.jpg</code>, <code>mehmet.jpg</code>, …). Until then the
          cards show a label so every task still works.
        </p>
        <div className="l25-conf-card">
          <div className="l25-conf-header">Luca &amp; Mehmet</div>
          <div className="l25-conf-fields">
            {lucaText.map((line) => (
              <p key={line} style={{ margin: "0 0 0.55rem" }}>
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="l38-photo-grid" style={{ marginTop: "1rem" }}>
          {peoplePhotos.slice(0, 2).map((p) => (
            <PhotoCard
              key={p.id}
              file={p.file}
              emoji={p.emoji}
              caption={p.caption}
              note={p.note}
            />
          ))}
        </div>
      </section>

      <section id="l38-labels" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Vocabulary</p>
          <h2>Match the labels</h2>
          <p className="lesson22-section-desc">
            Choose a phrase for numbers 1–7 on the photos.
          </p>
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
          <p className="page-kicker">3 · Photos A–D</p>
          <h2>Who is it?</h2>
          <p className="lesson22-section-desc">
            Match each description to a photo. Then listen and repeat.
          </p>
        </div>
        <div className="l38-photo-grid">
          {peoplePhotos.map((p) => (
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
                {peoplePhotos.map((p) => (
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
        <AudioBlock
          r={1}
          exercise="4A · R1"
          title="Listen and repeat: hair, eyes, beard, in his 20s / 30s"
        />
      </section>

      <section id="l38-map" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Word map</p>
          <h2>Colours or the body?</h2>
          <p className="lesson22-section-desc">
            Tap a word, then tap a box.
          </p>
        </div>
        <div className="l38-chip-bank">
          {wordMapItems.map((item) => (
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
        <div className="l38-bins">
          <button
            type="button"
            className={`l38-bin${mapChecked ? " is-ok" : ""}`}
            onClick={() => putMap("colours")}
          >
            <h3>Colours</h3>
            {wordMapItems
              .filter((item) => mapBins[item.word] === "colours")
              .map((item) => (
                <span key={item.word} className="l38-chip is-on">
                  {item.word}
                </span>
              ))}
          </button>
          <button
            type="button"
            className={`l38-bin${mapChecked ? " is-ok" : ""}`}
            onClick={() => putMap("body")}
          >
            <h3>The body</h3>
            {wordMapItems
              .filter((item) => mapBins[item.word] === "body")
              .map((item) => (
                <span key={item.word} className="l38-chip is-on">
                  {item.word}
                </span>
              ))}
          </button>
        </div>
        <CheckBar
          checked={mapChecked}
          score={mapScore}
          total={wordMapItems.length}
          onCheck={() => setMapChecked(true)}
        />
      </section>

      <section id="l38-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Grammar</p>
          <h2>have / has got</h2>
          <p className="lesson22-section-desc">
            Complete the table, then choose the correct form.
          </p>
        </div>
        <blockquote className="l23-rule-quote">
          <p>
            I / you / we / they <strong>have got</strong> ·{" "}
            <strong>haven&apos;t got</strong>. He / she / it{" "}
            <strong>has got</strong> · <strong>hasn&apos;t got</strong>.
          </p>
        </blockquote>
        {grammarPlusMinus.map((item, i) => (
          <div key={item.id} className="l38-label-row">
            <span className="l38-label-n">{i + 1}</span>
            <div>
              <p style={{ margin: "0 0 0.35rem" }}>{item.prompt}</p>
              <select
                value={plusAns[i]}
                onChange={(e) => {
                  setPlusChecked(false);
                  const next = [...plusAns];
                  next[i] = e.target.value;
                  setPlusAns(next);
                }}
                className={drillSelClass(plusChecked, plusAns[i], item.answer)}
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
          checked={plusChecked}
          score={plusScore}
          total={grammarPlusMinus.length}
          onCheck={() => setPlusChecked(true)}
        />
        <AudioBlock
          r={2}
          exercise="4A · R2"
          title="I've / You've / We've / They've / He's / She's"
          transcript={
            <p>
              I&apos;ve got brown hair. You&apos;ve got blue eyes. We&apos;ve
              got a daughter. They&apos;ve got a son. He&apos;s got a beard.
              She&apos;s got blonde hair.
            </p>
          }
        />
        <div className="l26-drill-list" style={{ marginTop: "1rem" }}>
          {hasHaveChoose.map((item, i) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {item.prompt}
              </strong>
              <select
                value={chooseAns[i]}
                onChange={(e) => {
                  setChooseChecked(false);
                  const next = [...chooseAns];
                  next[i] = e.target.value;
                  setChooseAns(next);
                }}
                className={drillSelClass(
                  chooseChecked,
                  chooseAns[i],
                  item.answer,
                )}
              >
                <option value="">___</option>
                {item.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <CheckBar
          checked={chooseChecked}
          score={chooseScore}
          total={hasHaveChoose.length}
          onCheck={() => setChooseChecked(true)}
        />
      </section>

      <section id="l38-sofia" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Sentences</p>
          <h2>Sofia and Jakub</h2>
          <p className="lesson22-section-desc">
            Build sentences about the photo. Tap words to place them.
          </p>
        </div>
        <PhotoCard
          file="sofia-jakub.jpg"
          emoji="👨‍👩‍👦"
          caption="Sofia and Jakub · Paris"
          note="office worker · son · 30s"
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
          <p className="page-kicker">7 · Speaking</p>
          <h2>Describe yourself and a friend</h2>
          <p className="lesson22-section-desc">
            Ask your teacher and answer the questions. Then describe a friend.
          </p>
        </div>
        <ul className="l22-goals-list">
          {speakFriendPrompts.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            Example: <em>OK, my name is Piotr. I&apos;ve got brown hair and
            brown eyes. I&apos;m in my 20s. My friend&apos;s name is Basia…</em>
          </p>
        </blockquote>
      </section>

      <section id="l38-objects" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · 4B Vocabulary</p>
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
        <AudioBlock
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
        <AudioBlock
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
        <AudioBlock
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
