import { useState } from "react";

import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { CheckBar } from "../components/lesson38/L38Ui";
import {
  chorePhotoFlashcards,
  collocationGaps,
  doesGrammarGaps,
  goMakeDoArticleGaps,
  goMakeDoArticleNotes,
  goMakeDoArticleOptions,
  goMakeDoChoose,
  goMakeDoVerbGaps,
  IMG46,
  listenQuestionGaps,
  posterChoreFlashcards,
  posterChoreMatch,
  posterChorePhrases,
} from "../content/lessons/lesson-46/activities";
import { choreFlashcards } from "../content/lessons/lesson-46/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson42.css";

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function textOk(value: string, answers: readonly string[]): boolean {
  const v = normText(value);
  return v !== "" && answers.some((a) => normText(a) === v);
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

type SurveyDifficulty = "easy" | "ok" | "hard";

const HW46_SURVEY_TASKS = [
  { id: "1", title: "1 · Flashcards — Housework phrases" },
  { id: "2", title: "2 · Picture flashcards — What job is this?" },
  { id: "3", title: "3 · Poster flashcards — Household chores" },
  { id: "4", title: "4 · Picture test — Household chores poster" },
  { id: "5", title: "5 · Phrases — Complete the phrases" },
  { id: "6", title: "6 · go / make / do — Collocations and articles" },
  { id: "7", title: "7 · Grammar — Do / does / doesn’t" },
  { id: "8", title: "8 · Write — Jobs at home" },
] as const;

const SURVEY_OPTIONS: {
  value: SurveyDifficulty;
  label: string;
}[] = [
  { value: "easy", label: "Легко" },
  { value: "ok", label: "Нормально" },
  { value: "hard", label: "Складно" },
];

function formatSurveyForTeacher(
  ratings: Record<string, SurveyDifficulty | undefined>,
): string {
  const lines = HW46_SURVEY_TASKS.map((task) => {
    const rating = ratings[task.id];
    return `${task.title}: ${rating ?? "—"}`;
  });
  return `Survey (difficulty):\n${lines.join("\n")}`;
}

/** Homework for Lesson 46 — Jobs around the house. */
export default function HW46() {
  const [uaFlip, setUaFlip] = useState<number[]>([]);
  const [picFlip, setPicFlip] = useState<number[]>([]);
  const [posterFlip, setPosterFlip] = useState<number[]>([]);

  const flipCard = (
    setFlip: (fn: (prev: number[]) => number[]) => void,
    idx: number,
    speak?: string,
  ) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open && speak) speakEnglish(speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [posterAns, setPosterAns] = useState(() =>
    Array(posterChoreMatch.length).fill(""),
  );
  const [posterChecked, setPosterChecked] = useState(false);
  const posterScore = posterChoreMatch.filter(
    (p, i) => posterAns[i] === p.answer,
  ).length;

  const [colAns, setColAns] = useState<Record<string, string>>({});
  const [colChecked, setColChecked] = useState(false);
  const colScore = collocationGaps.filter((g) =>
    textOk(colAns[g.id] ?? "", g.answers),
  ).length;

  const [artAns, setArtAns] = useState(() =>
    Array(goMakeDoArticleGaps.length).fill(""),
  );
  const [artChecked, setArtChecked] = useState(false);
  const artScore = goMakeDoArticleGaps.filter(
    (g, i) => artAns[i] === g.answer,
  ).length;

  const [gmdAns, setGmdAns] = useState<Record<string, string>>({});
  const [gmdChecked, setGmdChecked] = useState(false);
  const gmdScore = goMakeDoVerbGaps.filter((g) =>
    textOk(gmdAns[g.id] ?? "", g.answers),
  ).length;

  const [chooseAns, setChooseAns] = useState(() =>
    Array(goMakeDoChoose.length).fill(""),
  );
  const [chooseChecked, setChooseChecked] = useState(false);
  const chooseScore = goMakeDoChoose.filter(
    (g, i) => chooseAns[i] === g.answer,
  ).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapItems = [...listenQuestionGaps, ...doesGrammarGaps.slice(0, 4)];
  const gapScore = gapItems.filter((g) =>
    textOk(gapAns[g.id] ?? "", g.answers),
  ).length;

  const [writeJobs, setWriteJobs] = useState("");
  const [writeQs, setWriteQs] = useState("");
  const [surveyRatings, setSurveyRatings] = useState<
    Record<string, SurveyDifficulty | undefined>
  >({});

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 46</p>
        <h1>Jobs around the house</h1>
        <p className="lead">
          Housework phrases · go / make / do · a / the · Does he/she…? · write
          about home jobs.
        </p>

        <section id="hw46-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Housework phrases</h2>
            <p className="lesson22-section-desc">
              Tap a card to flip UA → EN. Hear the English phrase.
            </p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {choreFlashcards.map((card, idx) => {
              const isFlipped = uaFlip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => flipCard(setUaFlip, idx, card.speak)}
                  aria-pressed={isFlipped}
                  aria-label={`${card.front} · ${card.back}`}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <span className="l22-vocab-label">Українською</span>
                      <strong>{card.front}</strong>
                      <span className="l22-vocab-hint">tap → English</span>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.back}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw46-pics" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Picture flashcards</p>
            <h2>What job is this?</h2>
            <p className="lesson22-section-desc">
              Tap a picture to flip. Say the English phrase.
            </p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {chorePhotoFlashcards.map((card, idx) => {
              const isFlipped = picFlip.includes(idx);
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`l22-vocab-card l22-vocab-card--photo${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => flipCard(setPicFlip, idx, card.speak)}
                  aria-pressed={isFlipped}
                  aria-label={`${card.alt} · ${card.phrase}`}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <img
                        src={IMG46(card.file)}
                        alt={card.alt}
                        loading="lazy"
                      />
                      <span className="l22-vocab-hint">tap → English</span>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.phrase}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw46-poster-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Poster flashcards</p>
            <h2>Household chores</h2>
            <p className="lesson22-section-desc">
              Tap a poster picture to flip. Learn the English phrase.
            </p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {posterChoreFlashcards.map((card, idx) => {
              const isFlipped = posterFlip.includes(idx);
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`l22-vocab-card l22-vocab-card--photo${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => flipCard(setPosterFlip, idx, card.speak)}
                  aria-pressed={isFlipped}
                  aria-label={`${card.alt} · ${card.phrase}`}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <img
                        src={IMG46(card.file)}
                        alt={card.alt}
                        loading="lazy"
                      />
                      <span className="l22-vocab-hint">tap → English</span>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.phrase}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw46-the-tip" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">Порада</p>
            <h2>the чи a?</h2>
            <p className="lesson22-section-desc">
              Чому в домашніх справах часто <strong>the</strong>.
            </p>
          </div>
          <blockquote className="l23-rule-quote" style={{ marginTop: "0.65rem" }}>
            <p>
              У домашніх справах часто кажемо <strong>the</strong>, бо це
              звичайна / конкретна річ у домі — <em>the bed</em> (ліжко, на
              якому спиш), <em>the dishes</em> (посуд після вечері),{" "}
              <em>the floor</em> (підлога в домі).
            </p>
            <p>
              <strong>a</strong> — якийсь / один / неконкретний:{" "}
              <em>I need a bed</em> · <em>There is a dog in the park</em>.
              <br />
              <strong>the</strong> — обидва знають, про що мова:{" "}
              <em>Feed the dog</em> (наша собака) · <em>Wash the dishes</em>{" "}
              (цей посуд).
              <br />
              Деякі фрази фіксовані з <strong>the</strong>:{" "}
              <em>make the bed</em>, <em>do the laundry</em>,{" "}
              <em>take out the rubbish</em>.
            </p>
            <p>
              <strong>Порівняй:</strong>
              <br />
              make <strong>the</strong> bed (твоє ліжко вдома) · buy{" "}
              <strong>a</strong> bed (якесь ліжко в магазині)
              <br />
              feed <strong>the</strong> dog (наша собака) · I saw{" "}
              <strong>a</strong> dog (якась собака)
              <br />
              wash <strong>the</strong> dishes · wash <strong>a</strong> plate
            </p>
          </blockquote>
        </section>

        <section id="hw46-poster" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Picture test</p>
            <h2>Household chores poster</h2>
            <p className="lesson22-section-desc">
              Look at each picture. Choose the correct English phrase.
            </p>
          </div>
          <div className="l42-pic-grid l42-travel-pic-grid hw46-poster-grid">
            {posterChoreMatch.map((pic, i) => {
              const value = posterAns[i] ?? "";
              const ok = value === pic.answer;
              return (
                <figure key={pic.id} className="l42-pic-card">
                  <img
                    src={IMG46(pic.file)}
                    alt={pic.alt}
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>{pic.id}</strong>
                    <select
                      value={value}
                      onChange={(e) => {
                        setPosterChecked(false);
                        const next = [...posterAns];
                        next[i] = e.target.value;
                        setPosterAns(next);
                      }}
                      className={drillSelClass(
                        posterChecked,
                        value,
                        pic.answer,
                      )}
                      aria-label={`Chore picture ${pic.id}`}
                    >
                      <option value="">—</option>
                      {posterChorePhrases.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {posterChecked ? (
                      <span className={ok ? "ok" : "err"}>
                        {ok ? "✓" : `→ ${pic.answer}`}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <CheckBar
            checked={posterChecked}
            score={posterScore}
            total={posterChoreMatch.length}
            onCheck={() => setPosterChecked(true)}
            onReset={() => {
              setPosterAns(Array(posterChoreMatch.length).fill(""));
              setPosterChecked(false);
            }}
          />
        </section>

        <section id="hw46-col" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Phrases</p>
            <h2>Complete the phrases</h2>
            <p className="lesson22-section-desc">
              Use verbs from Lesson 46: clean, cook, feed, wash.
            </p>
          </div>
          <ol className="l22-gap-list">
            {collocationGaps.map((g) => {
              const val = colAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  <input
                    className={inputCls(colChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setColChecked(false);
                      setColAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                    aria-label={`Verb for ${g.after}`}
                  />{" "}
                  {g.after}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={colChecked}
            score={colScore}
            total={collocationGaps.length}
            onCheck={() => setColChecked(true)}
            onReset={() => {
              setColAns({});
              setColChecked(false);
            }}
          />
        </section>

        <section id="hw46-gmd" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">6 · go / make / do</p>
            <h2>Collocations and articles</h2>
            <p className="lesson22-section-desc">
              Learn when to use <strong>a</strong>, <strong>the</strong>, or no
              article (—). Then practise go / make / do phrases.
            </p>
          </div>

          <div
            className="l25-conf-card"
            style={{ maxWidth: 720, marginBottom: "1.1rem" }}
          >
            <div className="l25-conf-header">Запам’ятай · a / the / —</div>
            <div className="l25-conf-fields">
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.15rem",
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.55,
                }}
              >
                {goMakeDoArticleNotes.map((note) => (
                  <li key={note.label} style={{ marginBottom: "0.45rem" }}>
                    <strong>{note.label}:</strong> {note.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="l22-listen-subtitle">6a · Choose a / the / —</h3>
          <ol className="l22-gap-list">
            {goMakeDoArticleGaps.map((g, i) => {
              const value = artAns[i] ?? "";
              const ok = value === g.answer;
              return (
                <li key={g.id}>
                  {g.before}{" "}
                  <select
                    value={value}
                    onChange={(e) => {
                      setArtChecked(false);
                      const next = [...artAns];
                      next[i] = e.target.value;
                      setArtAns(next);
                    }}
                    className={drillSelClass(artChecked, value, g.answer)}
                    aria-label={`Article gap ${g.id}`}
                  >
                    <option value="">___</option>
                    {goMakeDoArticleOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>{" "}
                  {g.after}
                  {artChecked && !ok ? (
                    <span className="err" style={{ marginLeft: "0.4rem" }}>
                      → {g.answer}
                      {g.tipUa ? ` (${g.tipUa})` : ""}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={artChecked}
            score={artScore}
            total={goMakeDoArticleGaps.length}
            onCheck={() => setArtChecked(true)}
            onReset={() => {
              setArtAns(Array(goMakeDoArticleGaps.length).fill(""));
              setArtChecked(false);
            }}
          />

          <h3 className="l22-listen-subtitle" style={{ marginTop: "1.35rem" }}>
            6b · Complete with go / make / do
          </h3>
          <ol className="l22-gap-list">
            {goMakeDoVerbGaps.map((g) => {
              const val = gmdAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  <input
                    className={inputCls(gmdChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setGmdChecked(false);
                      setGmdAns((prev) => ({
                        ...prev,
                        [g.id]: e.target.value,
                      }));
                    }}
                    aria-label={`Verb for ${g.after}`}
                    placeholder="go / make / do"
                  />{" "}
                  {g.after}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={gmdChecked}
            score={gmdScore}
            total={goMakeDoVerbGaps.length}
            onCheck={() => setGmdChecked(true)}
            onReset={() => {
              setGmdAns({});
              setGmdChecked(false);
            }}
          />

          <h3 className="l22-listen-subtitle" style={{ marginTop: "1.35rem" }}>
            6c · Choose the phrase
          </h3>
          <ol className="l22-gap-list">
            {goMakeDoChoose.map((g, i) => {
              const value = chooseAns[i] ?? "";
              const ok = value === g.answer;
              return (
                <li key={g.id}>
                  <span style={{ display: "block", marginBottom: "0.25rem" }}>
                    {g.prompt}
                  </span>
                  <select
                    value={value}
                    onChange={(e) => {
                      setChooseChecked(false);
                      const next = [...chooseAns];
                      next[i] = e.target.value;
                      setChooseAns(next);
                    }}
                    className={drillSelClass(chooseChecked, value, g.answer)}
                    aria-label={`Choose phrase ${g.id}`}
                  >
                    <option value="">—</option>
                    {g.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {chooseChecked && !ok ? (
                    <span className="err" style={{ marginLeft: "0.4rem" }}>
                      → {g.answer}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={chooseChecked}
            score={chooseScore}
            total={goMakeDoChoose.length}
            onCheck={() => setChooseChecked(true)}
            onReset={() => {
              setChooseAns(Array(goMakeDoChoose.length).fill(""));
              setChooseChecked(false);
            }}
          />
        </section>

        <section id="hw46-gaps" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">7 · Grammar</p>
            <h2>Do / does / doesn’t</h2>
            <p className="lesson22-section-desc">
              Complete the questions and short answers.
            </p>
          </div>
          <ol className="l22-gap-list">
            {gapItems.map((g) => {
              const val = gapAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  {g.before ? <span>{g.before} </span> : null}
                  <input
                    className={inputCls(gapChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setGapChecked(false);
                      setGapAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                    aria-label={`Gap ${g.id}`}
                  />{" "}
                  {g.after}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={gapChecked}
            score={gapScore}
            total={gapItems.length}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapAns({});
              setGapChecked(false);
            }}
          />
        </section>

        <section id="hw46-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">8 · Write</p>
            <h2>Jobs at home</h2>
          </div>
          <label className="l26-block">
            <span className="l26-label">
              Write 4–6 sentences about jobs around the house in your family
              (he/she + -s).
            </span>
            <textarea
              className="l26-textarea"
              rows={5}
              value={writeJobs}
              onChange={(e) => setWriteJobs(e.target.value)}
              placeholder="My mum cooks dinner. My dad walks the dog…"
            />
          </label>
          <label className="l26-block">
            <span className="l26-label">
              Write 3 questions with Does…? about a friend.
            </span>
            <textarea
              className="l26-textarea"
              rows={4}
              value={writeQs}
              onChange={(e) => setWriteQs(e.target.value)}
              placeholder="Does she clean the bathroom? Does he cook dinner?"
            />
          </label>
        </section>

        <section id="hw46-survey" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">Міні-опитування</p>
            <h2>Наскільки складно було?</h2>
            <p className="lesson22-section-desc">
              Оціни кожне завдання: Легко · Нормально · Складно. Відповіді
              підуть вчителю разом із текстом.
            </p>
          </div>
          <ul className="hw46-survey-list">
            {HW46_SURVEY_TASKS.map((task) => {
              const selected = surveyRatings[task.id];
              return (
                <li key={task.id} className="hw46-survey-row">
                  <span className="hw46-survey-title">{task.title}</span>
                  <div
                    className="hw46-survey-options"
                    role="group"
                    aria-label={task.title}
                  >
                    {SURVEY_OPTIONS.map((opt) => {
                      const isOn = selected === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`hw46-survey-btn${isOn ? " is-selected" : ""}`}
                          aria-pressed={isOn}
                          onClick={() =>
                            setSurveyRatings((prev) => ({
                              ...prev,
                              [task.id]: opt.value,
                            }))
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <HomeworkSubmit
          lessonId="46"
          writing={[writeJobs, writeQs].filter(Boolean).join("\n\n")}
          appendix={formatSurveyForTeacher(surveyRatings)}
          quizDone={
            posterChecked &&
            colChecked &&
            artChecked &&
            gmdChecked &&
            chooseChecked &&
            gapChecked
          }
          quizScore={
            posterScore + colScore + artScore + gmdScore + chooseScore + gapScore
          }
          showListeningCheck={false}
          title="HW46 · Jobs around the house"
        />
      </div>
    </div>
  );
}
