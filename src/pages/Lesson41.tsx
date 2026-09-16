import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { CheckBar } from "../components/lesson38/L38Ui";
import Unit4AudioBlock from "../components/Unit4AudioBlock";
import {
  clockLetterOptions,
  daysFlashcards,
  dialogueGaps,
  digitalClocks,
  IMG41,
  listenMatch,
  phraseMatch,
  speakClocks,
  usefulPhrases,
  writeTimes,
} from "../data/lesson41";
import { shuffle } from "../utils/array";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson38.css";
import "../styles/lesson41.css";

const VIDEO_ID = "pSRbZkQH04A";

type DayCard = (typeof daysFlashcards)[number];

function setAt(list: string[], index: number, value: string): string[] {
  const next = [...list];
  next[index] = value;
  return next;
}

function normTime(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function answerOk(value: string, answers: readonly string[]): boolean {
  const v = normTime(value);
  return v !== "" && answers.some((a) => normTime(a) === v);
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

export default function Lesson41() {
  const [revealSpoken, setRevealSpoken] = useState(false);

  const [matchAns, setMatchAns] = useState(() =>
    Array(listenMatch.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);
  const matchScore = listenMatch.filter(
    (item, i) => matchAns[i] === item.answer,
  ).length;

  const [gapAns, setGapAns] = useState(() =>
    Array(dialogueGaps.length).fill(""),
  );
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = dialogueGaps.filter((item, i) => {
    const gapLine = item.lines.find((l) => "gap" in l && l.gap);
    if (!gapLine || !("answers" in gapLine)) return false;
    return answerOk(gapAns[i] ?? "", gapLine.answers);
  }).length;

  const [phraseAns, setPhraseAns] = useState(() =>
    Array(phraseMatch.length).fill(""),
  );
  const [phraseChecked, setPhraseChecked] = useState(false);
  const phraseScore = phraseMatch.filter(
    (item, i) => phraseAns[i] === item.answer,
  ).length;

  const [writeAns, setWriteAns] = useState(() =>
    Array(writeTimes.length).fill(""),
  );
  const [writeChecked, setWriteChecked] = useState(false);
  const writeScore = writeTimes.filter((item, i) =>
    answerOk(writeAns[i] ?? "", item.answers),
  ).length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={41} />
            <h1>What&apos;s the time?</h1>
            <p className="lesson22-topic-pill">
              Unit 4D · English in action · tell the time
            </p>
            <p className="lesson22-subtitle">
              Ask <strong>What time is it?</strong> and say the time:{" "}
              <em>o&apos;clock · past · to · quarter · half</em>.
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
              to="/lesson-40"
            >
              ← Lesson 40
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>What time is it?</span>
          <span>quarter past / to</span>
          <span>half past</span>
          <span>o&apos;clock</span>
        </div>
        <div className="l41-hero-visual">
          <img
            src={IMG41("big-ben.jpg")}
            alt="Close-up of Big Ben clock face in London"
          />
          <img
            src={IMG41("clock-towers.png")}
            alt="Clock towers with Roman numerals"
          />
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l41-clocks">1 Clocks</a>
          <a href="#l41-listen">2 Match</a>
          <a href="#l41-dialogues">3 Dialogues</a>
          <a href="#l41-phrases">4 Phrases</a>
          <a href="#l41-speak">5 Speak</a>
          <a href="#l41-write">6 Write</a>
          <a href="#l41-days">7 Days</a>
          <a href="#l41-video">8 Video</a>
          <a href="#l41-exit">Exit</a>
        </div>
      </section>

      {/* 1 · Digital clocks */}
      <section id="l41-clocks" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Vocabulary</p>
          <h2>Read the times on the clocks</h2>
          <p className="lesson22-section-desc">
            Прочитай час на цифрових годинниках. A — приклад. Потім розкрий
            підказки і порівняй зі своїми відповідями.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Read the times on the
          clocks.
        </p>
        <div className="l41-clock-grid">
          {digitalClocks.map((c) => {
            const showSpoken = c.example || revealSpoken;
            return (
              <div key={c.id} className="l41-clock-wrap">
                <p
                  className={`l41-clock-spoken${showSpoken ? "" : " is-empty"}`}
                >
                  {showSpoken ? c.spoken : "\u00a0"}
                </p>
                <div className="l41-clock-card">
                  <span className="l41-clock-letter">{c.id}</span>
                  <div className="l41-clock-digits" aria-label={c.time}>
                    {c.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setRevealSpoken((v) => !v)}
          >
            {revealSpoken ? "Hide answers" : "Show answers"}
          </button>
        </div>
      </section>

      {/* 2 · Listen & match */}
      <section id="l41-listen" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Listening</p>
          <h2>Match conversations with clocks</h2>
          <p className="lesson22-section-desc">
            Послухай діалоги 1–4 і обери букву годинника з вправи 1.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">2</strong> Listen and match
          conversations 1–4 with the correct clocks from Exercise 1.
        </p>
        <Unit4AudioBlock
          r={11}
          exercise="4D · 4.11"
          title="What time is it? — four short conversations"
        />
        <div className="l26-drill-list l41-select-list l41-select-list--clock" style={{ marginTop: "1rem" }}>
          {listenMatch.map((item, i) => (
            <div key={item.n} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {item.n}. Conversation {item.n} → clock
              </strong>
              <select
                value={matchAns[i]}
                onChange={(e) => {
                  setMatchChecked(false);
                  setMatchAns((prev) => setAt(prev, i, e.target.value));
                }}
                className={drillSelClass(
                  matchChecked,
                  matchAns[i],
                  item.answer,
                )}
                aria-label={`Conversation ${item.n} clock`}
              >
                <option value="">___</option>
                {clockLetterOptions.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              {matchChecked && matchAns[i] !== item.answer && (
                <span className="hw35-tip">
                  Hint: {item.hint} → <strong>{item.answer}</strong>
                </span>
              )}
            </div>
          ))}
        </div>
        <CheckBar
          checked={matchChecked}
          score={matchScore}
          total={listenMatch.length}
          onCheck={() => setMatchChecked(true)}
          onReset={() => {
            setMatchAns(Array(listenMatch.length).fill(""));
            setMatchChecked(false);
          }}
        />
      </section>

      {/* 3 · Complete dialogues */}
      <section id="l41-dialogues" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Listening</p>
          <h2>Complete the conversations</h2>
          <p className="lesson22-section-desc">
            Послухай ще раз і заповни пропуски. Потім прочитай діалоги вголос з
            учителем.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">3</strong> Listen again and complete
          the conversations.
        </p>
        <Unit4AudioBlock
          r={11}
          exercise="4D · 4.11"
          title="Same audio — complete the gaps"
        />
        {dialogueGaps.map((conv, i) => {
          const gapLine = conv.lines.find((l) => "gap" in l && l.gap);
          const answers =
            gapLine && "answers" in gapLine ? gapLine.answers : [];
          const ok = gapChecked && answerOk(gapAns[i] ?? "", answers);
          return (
            <div key={conv.n} className="l41-dialogue">
              <p className="l41-dialogue-title">Conversation {conv.n}</p>
              {conv.lines.map((line, li) => {
                if ("gap" in line && line.gap) {
                  return (
                    <div key={li} className="l41-dialogue-line">
                      <span className="l41-dialogue-who">{line.who}:</span>
                      <span className="l41-dialogue-gap">
                        {line.before}{" "}
                        <input
                          type="text"
                          value={gapAns[i]}
                          onChange={(e) => {
                            setGapChecked(false);
                            setGapAns((prev) =>
                              setAt(prev, i, e.target.value),
                            );
                          }}
                          className={inputCls(
                            gapChecked,
                            gapAns[i],
                            ok,
                          )}
                          placeholder="…"
                          aria-label={`Conversation ${conv.n} gap`}
                        />{" "}
                        {line.after}
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={li} className="l41-dialogue-line">
                    <span className="l41-dialogue-who">{line.who}:</span>
                    <span>{"text" in line ? line.text : ""}</span>
                  </div>
                );
              })}
              {gapChecked && !ok && answers[0] && (
                <span className="hw35-tip">✓ {answers[0]}</span>
              )}
            </div>
          );
        })}
        <CheckBar
          checked={gapChecked}
          score={gapScore}
          total={dialogueGaps.length}
          onCheck={() => setGapChecked(true)}
          onReset={() => {
            setGapAns(Array(dialogueGaps.length).fill(""));
            setGapChecked(false);
          }}
        />
      </section>

      {/* 4 · Useful phrases */}
      <section id="l41-phrases" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Useful phrases</p>
          <h2>Find the times in the box</h2>
          <p className="lesson22-section-desc">
            Знайди фрази для часу 1–7 у боксі. Послухай і повтори з учителем.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">4</strong> Find times 1–7 in the Useful
          phrases box. Then listen and repeat.
        </p>

        <div className="l41-phrases-box">
          <h3>Useful phrases</h3>
          <h4>Asking for the time</h4>
          <ul>
            {usefulPhrases.askTime.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h4>Saying the time</h4>
          <ul>
            {usefulPhrases.sayTime.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h4>Asking for the time of things</h4>
          <ul>
            {usefulPhrases.askEvent.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h4>Saying the time of things</h4>
          <ul>
            {usefulPhrases.sayEvent.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <Unit4AudioBlock
          r={12}
          exercise="4D · 4.12"
          title="Useful phrases — listen and repeat"
        />

        <div className="l26-drill-list l41-select-list" style={{ marginTop: "1rem" }}>
          {phraseMatch.map((item, i) => (
            <div key={item.n} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {item.n}. {item.digital} →
              </strong>
              <select
                value={phraseAns[i]}
                onChange={(e) => {
                  setPhraseChecked(false);
                  setPhraseAns((prev) => setAt(prev, i, e.target.value));
                }}
                className={drillSelClass(
                  phraseChecked,
                  phraseAns[i],
                  item.answer,
                )}
                aria-label={`Phrase for ${item.digital}`}
              >
                <option value="">___</option>
                {item.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <CheckBar
          checked={phraseChecked}
          score={phraseScore}
          total={phraseMatch.length}
          onCheck={() => setPhraseChecked(true)}
          onReset={() => {
            setPhraseAns(Array(phraseMatch.length).fill(""));
            setPhraseChecked(false);
          }}
        />
      </section>

      {/* 5 · Speak */}
      <section id="l41-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Speaking</p>
          <h2>Ask and answer about the clocks</h2>
          <p className="lesson22-section-desc">
            Запитай учителя про годинники A–H і відповідай сам. Використай
            Useful phrases.
          </p>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">5</strong> Ask your teacher and answer
          the questions about the clocks in Exercise 1.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>A:</strong> <em>What time is it?</em>
            <br />
            <strong>B:</strong> <em>It&apos;s quarter to seven.</em>
          </p>
        </blockquote>
        <div className="l41-speak-grid">
          {speakClocks.map((c) => (
            <div key={c.id} className="l41-speak-card">
              <strong>
                {c.id} · {c.time}
              </strong>
              <p>{c.model}</p>
            </div>
          ))}
        </div>
        <p className="l38-speak-banner" style={{ marginTop: "1rem" }}>
          Speak with your teacher
        </p>
        <p className="l31-ex-line">
          Also ask: <em>What time is your English lesson?</em> /{" "}
          <em>What time do you get up?</em>
        </p>
      </section>

      {/* 6 · Write */}
      <section id="l41-write" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Writing</p>
          <h2>Write the time</h2>
          <p className="lesson22-section-desc">
            Напиши повне речення: <em>It&apos;s quarter past six.</em> або{" "}
            <em>It&apos;s three o&apos;clock.</em>
          </p>
        </div>
        <div className="l26-drill-list">
          {writeTimes.map((item, i) => {
            const val = writeAns[i] ?? "";
            const ok = writeChecked && answerOk(val, item.answers);
            return (
              <div key={item.id} className="hw35-fix-row">
                <p className="hw35-fix-wrong">
                  <strong>{i + 1}.</strong> {item.digital}
                </p>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setWriteChecked(false);
                    setWriteAns((prev) => setAt(prev, i, e.target.value));
                  }}
                  className={inputCls(writeChecked, val, ok)}
                  placeholder="It's …"
                  aria-label={`Write time ${item.digital}`}
                />
                {writeChecked && !ok && (
                  <span className="hw35-tip">{item.answers[0]}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setWriteChecked(true)}
          >
            Check
          </button>
          {writeChecked && (
            <span className="l22-score">
              {writeScore} / {writeTimes.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWriteAns(writeTimes.map((item) => item.answers[0]));
              setWriteChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWriteAns(Array(writeTimes.length).fill(""));
              setWriteChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l41-days" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Days of the week</p>
          <h2>Flashcards · check the days</h2>
          <p className="lesson22-section-desc">
            Перед відео перевір дні тижня. Переверни картку (Space / Enter),
            потім <strong>Знаю</strong> / <strong>Ще раз</strong>.
          </p>
        </div>
        <div
          className="l25-conf-card"
          style={{ maxWidth: 520, marginBottom: "1rem" }}
        >
          <div className="l25-conf-header">Remember</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              <strong>on</strong> + day: <em>on Monday</em>,{" "}
              <em>on Friday</em>.
              <br />
              Weekdays = Monday–Friday · the weekend = Saturday + Sunday.
            </p>
          </div>
        </div>
        <DaysFlashcards />
      </section>

      <section id="l41-video" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · Video</p>
          <h2>Days of the week</h2>
          <p className="lesson22-section-desc">
            Подивись відео про дні тижня. Повтори назви вголос, потім скажи
            вчителю свій тиждень.
          </p>
        </div>
        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Days of the week — English video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="l38-speak-banner" style={{ marginTop: "1rem" }}>
          After the video
        </p>
        <p className="l31-ex-line">
          Tell your teacher:{" "}
          <em>
            On Monday I… On Friday I… At the weekend I…
          </em>
        </p>
      </section>

      <section id="l41-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>
            Ask <em>What time is it?</em> and answer with o&apos;clock / past /
            to.
          </li>
          <li>
            Say <em>quarter past</em>, <em>half past</em>,{" "}
            <em>quarter to</em>, <em>five to</em>.
          </li>
          <li>
            Ask about a train or lesson: <em>What time is the…?</em> —{" "}
            <em>It&apos;s at…</em>
          </li>
          <li>
            Say the days Monday–Sunday and use <em>on Monday</em> /{" "}
            <em>at the weekend</em>.
          </li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/lesson-40">
            ← Lesson 40
          </Link>
          <Link className="l25-cr-mini-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}

function DaysFlashcards() {
  const [queue, setQueue] = useState<DayCard[]>(() =>
    shuffle([...daysFlashcards]),
  );
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.focus();
  }, [queue.length, flipped]);

  const total = daysFlashcards.length;
  const current = queue[0] ?? null;
  const done = queue.length === 0;
  const knownCount = known.size;
  const progress = total ? Math.round((knownCount / total) * 100) : 0;

  const flip = () => setFlipped((f) => !f);

  const handleKnow = () => {
    if (!current) return;
    setKnown((prev) => new Set([...prev, current.id]));
    setQueue((prev) => prev.slice(1));
    setFlipped(false);
  };

  const handleReview = () => {
    setQueue((prev) => [...prev.slice(1), prev[0]!]);
    setFlipped(false);
  };

  const handleRestart = () => {
    setQueue(shuffle([...daysFlashcards]));
    setKnown(new Set());
    setFlipped(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (done) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!flipped) flip();
    }
    if (flipped) {
      if (e.key === "ArrowRight" || e.key === "k" || e.key === "K")
        handleKnow();
      if (e.key === "ArrowLeft" || e.key === "r" || e.key === "R")
        handleReview();
    }
  };

  if (done) {
    return (
      <div className="fc-done panel" style={{ marginTop: "0.5rem" }}>
        <div className="fc-done-icon">🎉</div>
        <h3 className="fc-done-title">Дні тижня пройдено!</h3>
        <p className="fc-done-score">
          Знаєш <strong>{knownCount}</strong> з <strong>{total}</strong> карток
        </p>
        <div className="fc-done-bar-wrap">
          <div className="fc-done-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="fc-done-actions">
          <button className="btn" type="button" onClick={handleRestart}>
            Почати знову
          </button>
          {knownCount < total && (
            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                const reviewItems = daysFlashcards.filter(
                  (c) => !known.has(c.id),
                );
                setQueue(shuffle([...reviewItems]));
                setKnown(new Set());
                setFlipped(false);
              }}
            >
              Повторити невідомі ({total - knownCount})
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fc-wrapper">
      <div className="fc-top" style={{ marginTop: "0.25rem" }}>
        <div className="fc-progress-wrap">
          <div className="fc-progress-bar">
            <div
              className="fc-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="fc-counter muted">
            {knownCount} / {total} знаю
          </span>
        </div>
        <button
          type="button"
          className="btn secondary fc-shuffle-btn"
          onClick={() => {
            setQueue((prev) => shuffle(prev));
            setFlipped(false);
          }}
        >
          ⇄ Перемішати
        </button>
      </div>

      <div
        className="fc-scene"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={cardRef}
        aria-label={`Картка: ${current?.front ?? ""}. Space — перевернути.`}
      >
        <div
          key={current?.id ?? "empty"}
          className={`fc-card ${flipped ? "fc-flipped" : ""}`}
          onClick={!flipped ? flip : undefined}
        >
          <div className="fc-face fc-front">
            <span className="fc-front-label muted">UA</span>
            <p className="fc-front-word">{current?.front}</p>
            <span className="fc-flip-hint muted">
              натисни або <kbd>Space</kbd>
            </span>
          </div>
          <div className="fc-face fc-back">
            <span className="fc-back-label">English</span>
            <p className="fc-back-word">{current?.back}</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="fc-actions">
          <button
            type="button"
            className="fc-btn-review"
            onClick={handleReview}
          >
            ↺ Ще раз
          </button>
          <button type="button" className="fc-btn-know" onClick={handleKnow}>
            ✓ Знаю
          </button>
        </div>
      )}

      <div className="fc-keyboard-hint muted">
        {flipped ? (
          <>
            <kbd>←</kbd> Ще раз &nbsp;·&nbsp; <kbd>→</kbd> Знаю
          </>
        ) : (
          <>
            <kbd>Space</kbd> / <kbd>Enter</kbd> — перевернути
          </>
        )}
      </div>
      <div className="fc-remaining muted">Залишилось: {queue.length}</div>
    </div>
  );
}
