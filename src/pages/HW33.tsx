import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  dialogueGapsB,
  grammarBoxB,
  intonationB,
  lesson31Images,
  photoQsB,
  wordOrderB,
} from "../data/lesson31";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import Unit3AudioBlock from "../components/Unit3AudioBlock";
import FlatPairMatchB, {
  type FlatMatchProgress,
} from "../components/lesson31/FlatPairMatchB";
import GrammarBoxThereB from "../components/lesson31/GrammarBoxThereB";
import L31SelectDrill from "../components/lesson31/L31SelectDrill";
import Lesson31Figure from "../components/lesson31/Lesson31Figure";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

const IMG31 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson31/${file}`;

function wordOrderScore(
  items: typeof wordOrderB,
  rows: ReturnType<typeof initWordOrderRows>,
) {
  return items.filter((item, i) => {
    const built = rows[i]?.built ?? [];
    const joined = built
      .join(" ")
      .replace(/\s+\?/g, "?")
      .replace(/\s+\./g, ".")
      .trim();
    return joined === item.answer && (rows[i]?.pool.length ?? 0) === 0;
  }).length;
}

export default function HW33() {
  const [flatProgress, setFlatProgress] = useState<FlatMatchProgress>({
    checked: false,
    score: 0,
    total: 11,
  });
  const onFlatProgress = useCallback((p: FlatMatchProgress) => {
    setFlatProgress(p);
  }, []);

  const [photoAns, setPhotoAns] = useState(() =>
    Array(photoQsB.length).fill(""),
  );
  const [photoChecked, setPhotoChecked] = useState(false);

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

  const [orderRows, setOrderRows] = useState(() =>
    initWordOrderRows(wordOrderB),
  );
  const [orderChecked, setOrderChecked] = useState(false);

  const [draft, setDraft] = useState("");

  const photoScore = photoQsB.filter((d, i) => photoAns[i] === d.answer).length;
  const gramScore = grammarBoxB.filter((g, i) => gramBAns[i] === g.answer).length;
  const intonScore = intonationB.filter(
    (item, i) => intonAns[i] === item.answer,
  ).length;
  const dialogueScore = dialogueGapsB.filter(
    (d, i) => dialogueAns[i] === d.answer,
  ).length;
  const orderScore = wordOrderScore(wordOrderB, orderRows);

  const checks = useMemo(
    () => ({
      flat: flatProgress.checked,
      photo: photoChecked,
      grammar: gramBChecked,
      intonation: intonChecked,
      dialogue: dialogueChecked,
      wordOrder: orderChecked,
    }),
    [
      flatProgress.checked,
      photoChecked,
      gramBChecked,
      intonChecked,
      dialogueChecked,
      orderChecked,
    ],
  );

  const allDone = Object.values(checks).every(Boolean);
  const totalScore =
    flatProgress.score +
    photoScore +
    gramScore +
    intonScore +
    dialogueScore +
    orderScore;
  const totalItems =
    flatProgress.total +
    photoQsB.length +
    grammarBoxB.length +
    intonationB.length +
    dialogueGapsB.length +
    wordOrderB.length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 33</p>
            <h1>Is there wifi?</h1>
            <p className="lesson22-subtitle">
              Практика з уроку 33: Brighton flat,{" "}
              <strong>Is there / Are there</strong>, intonation, conversation.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-33">
              ← Lesson 33
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Brighton flat</span>
          <span>Is there…?</span>
          <span>Grammar box</span>
          <span>Word order</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Photos</p>
          <h2>Look at photos A–D</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Look at photos A–D. What
          objects can you see?
        </p>
        <p className="lesson22-section-desc">
          <em>There is a table.</em> Натисни на картинку, щоб відкрити її в
          повному розмірі.
        </p>
        <div className="l31-figure-row">
          <Lesson31Figure
            src={IMG31(lesson31Images.brightonRoomsAd)}
            alt="City Flat Brighton — room photos A–D"
            caption="CITY FLAT, BRIGHTON **** · £80 per night · rooms A–D"
            variant="photo"
          />
          <Lesson31Figure
            src={IMG31(lesson31Images.brightonIconsEk)}
            alt="In this flat — amenity icons E–K"
            caption="In this flat: icons E–K"
            variant="photo"
          />
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Speak.</strong> Name 3 objects you see. Say full sentences
            to your teacher: <em>There is a …</em> / <em>There are …</em>
          </p>
        </blockquote>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2a · Match</p>
          <h2>Match A–K with the words</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">2a</strong> Match A–K with the words in
          the box.
        </p>
        <FlatPairMatchB onProgressChange={onFlatProgress} />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Questions</p>
          <h2>Answer about the flat</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">3</strong> Read the questions aloud and
          answer them about the flat in Exercise 1.
        </p>
        <L31SelectDrill
          items={photoQsB}
          answers={photoAns}
          setAnswers={setPhotoAns}
          checked={photoChecked}
          setChecked={setPhotoChecked}
          labelKey={(d) => d.q ?? ""}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Grammar box</p>
          <h2>Is there / Are there</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">6</strong> Read and complete the
          grammar box. Use Exercises 5b and 5c from the lesson to help you.
        </p>
        <GrammarBoxThereB
          answers={gramBAns}
          setAnswers={setGramBAns}
          checked={gramBChecked}
          setChecked={setGramBChecked}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7a · Listening</p>
          <h2>Intonation ↑ / ↓</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">7a</strong> Listen. Does the voice go up
          (↑) or down (↓) at the end?
        </p>
        <Unit3AudioBlock
          r={6}
          exercise="3B · 7a"
          title="Is there / Are there — intonation"
        />
        <div className="l26-drill-list" style={{ marginTop: "0.85rem" }}>
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
              {intonScore} / {intonationB.length}
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
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          <strong>7b</strong> Listen again and repeat — use the player above.
        </p>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · Conversation</p>
          <h2>Complete the dialogue</h2>
        </div>
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
                aria-label={`${d.who} line ${i + 1}`}
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
              {dialogueScore} / {dialogueGapsB.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setDialogueAns(dialogueGapsB.map((d) => d.answer));
              setDialogueChecked(true);
            }}
          >
            Show answers
          </button>
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
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">9a · Word order</p>
          <h2>Make questions</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">9a</strong> Put the words in the
          correct order to make questions.
        </p>
        <WordOrderBoard
          items={wordOrderB}
          rows={orderRows}
          setRows={setOrderRows}
          checked={orderChecked}
          setChecked={setOrderChecked}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Перевір усі вправи (Check), потім надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw33-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw33-writing"
          className="hw27-textarea"
          rows={6}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`2a match: ${checks.flat ? `${flatProgress.score}/${flatProgress.total}` : "—"}
3 questions: ${checks.photo ? `${photoScore}/${photoQsB.length}` : "—"}
6 grammar box: ${checks.grammar ? `${gramScore}/${grammarBoxB.length}` : "—"}
7a intonation: ${checks.intonation ? `${intonScore}/${intonationB.length}` : "—"}
8 dialogue: ${checks.dialogue ? `${dialogueScore}/${dialogueGapsB.length}` : "—"}
9a word order: ${checks.wordOrder ? `${orderScore}/${wordOrderB.length}` : "—"}`}
        />
        <HomeworkSubmit
          lessonId="33"
          writing={[
            draft.trim() || "(no extra notes)",
            `2a · Match A–K: ${checks.flat ? `${flatProgress.score}/${flatProgress.total}` : "not finished"}`,
            `3 · Flat questions: ${checks.photo ? `${photoScore}/${photoQsB.length}` : "not finished"}`,
            `6 · Grammar box: ${checks.grammar ? `${gramScore}/${grammarBoxB.length}` : "not finished"}`,
            `7a · Intonation: ${checks.intonation ? `${intonScore}/${intonationB.length}` : "not finished"}`,
            `8 · Dialogue: ${checks.dialogue ? `${dialogueScore}/${dialogueGapsB.length}` : "not finished"}`,
            `9a · Word order: ${checks.wordOrder ? `${orderScore}/${wordOrderB.length}` : "not finished"}`,
            allDone ? `Total: ${totalScore}/${totalItems}` : "Total: incomplete",
          ].join("\n")}
          quizDone={allDone}
          quizScore={allDone ? totalScore : undefined}
          showListeningCheck={false}
          description="Після перевірки всіх вправ натисни «Надіслати». Додай ім'я."
        />
      </section>
    </div>
  );
}
