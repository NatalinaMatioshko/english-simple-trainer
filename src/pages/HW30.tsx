import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson30.css";
import {
  correctionItems,
  reflectItems,
  topicStations,
} from "../data/lesson30Review";
import { hw30GoFlashcards, type Hw30GoCard } from "../data/hw30Review";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { shuffle } from "../utils/array";

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

export default function HW30() {
  const [topicId, setTopicId] = useState(topicStations[0]!.id);
  const [topicAns, setTopicAns] = useState<Record<string, string>>({});
  const [topicChecked, setTopicChecked] = useState(false);
  const [topicsDone, setTopicsDone] = useState<Set<string>>(new Set());
  const [corrAns, setCorrAns] = useState<Record<number, string>>({});
  const [corrChecked, setCorrChecked] = useState(false);
  const [draft, setDraft] = useState("");
  const [reflect, setReflect] = useState<Record<number, number>>({});

  const activeTopic = useMemo(
    () => topicStations.find((t) => t.id === topicId)!,
    [topicId],
  );

  const topicScore = activeTopic.quiz.filter(
    (q) => topicAns[`${topicId}-${q.id}`] === q.answer,
  ).length;

  const corrScore = correctionItems.filter(
    (q) => corrAns[q.id] === q.answer,
  ).length;

  const stationsDone = topicsDone.size === topicStations.length;
  const correctionDone =
    corrChecked && corrScore === correctionItems.length;

  const reflectRated = reflectItems.filter((_, i) => reflect[i] != null).length;
  const reflectDone = reflectRated === reflectItems.length;
  const reflectAvg = reflectDone
    ? Math.round(
        (reflectItems.reduce((sum, _, i) => sum + (reflect[i] ?? 0), 0) /
          reflectItems.length) *
          10,
      ) / 10
    : undefined;

  const reflectWriting = [
    "How confident are you? (1 = not very · 5 = very)",
    "",
    ...reflectItems.map((text, i) => {
      const n = reflect[i];
      return `${i + 1}. ${text} — ${n != null ? n : "—"}`;
    }),
    "",
    reflectDone
      ? `Average: ${reflectAvg} / 5 · rated ${reflectRated}/${reflectItems.length}`
      : `Rated ${reflectRated}/${reflectItems.length} (not finished)`,
  ].join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 30</p>
            <h1>Check &amp; Reflect practice</h1>
            <p className="lesson22-subtitle">
              Flashcards with <strong>go</strong> · Topic stations (L1–29) ·
              Quick correction · Reflect (confidence 1–5).
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-30">
              ← Lesson 30
            </Link>
            <Link className="lesson22-back-link" to="/a1-level-test">
              A1 Level Test →
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>go phrases</span>
          <span>{topicStations.length} topic stations</span>
          <span>quick correction</span>
          <span>reflect 1–5</span>
        </div>
      </section>

      {/* 1 · Go flashcards */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Flashcards</p>
          <h2>Phrases with go</h2>
          <p className="lesson22-section-desc">
            Повтори фрази з <strong>go</strong> з уроку 30 (routine · do/does ·
            days). Переверни картку → <strong>Знаю</strong> /{" "}
            <strong>Ще раз</strong>.
          </p>
        </div>

        <div
          className="l25-conf-card"
          style={{ maxWidth: 640, marginBottom: "1.25rem" }}
        >
          <div className="l25-conf-header">Rule · go to … / go home</div>
          <div className="l25-conf-fields">
            <p
              style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}
            >
              З місцем зазвичай кажемо <strong>go to + місце</strong>:{" "}
              <em>go to work</em>, <em>go to school</em>, <em>go to the park</em>
              , <em>go to bed</em>.
              <br />
              Але з <strong>home</strong> — <strong>без to</strong>:{" "}
              <em>go home</em> (не <em>go to home</em>).
              <br />
              Також без <em>to</em>: <em>go shopping</em>, <em>go out</em>,{" "}
              <em>go for a walk</em>, <em>go by bus</em>, <em>go on foot</em>.
            </p>
            <p
              style={{
                margin: "0.75rem 0 0",
                fontSize: "var(--text-sm)",
                lineHeight: 1.55,
              }}
            >
              <strong>He / she / it</strong> → <em>goes</em>:{" "}
              <em>She goes to work every day.</em>
            </p>
          </div>
        </div>

        <Hw30GoFlashcards />
      </section>

      {/* 2 · Topic stations */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · All topics · Lessons 1–29</p>
          <h2>Topic stations</h2>
          <p className="lesson22-section-desc">
            Обери тему → speaking prompts → mini quiz. Пройди{" "}
            <strong>усі {topicStations.length} станції</strong> — повна
            перевірка фундаменту A1 (як у Lesson 30).
          </p>
        </div>

        <div className="l30-topic-map" role="tablist" aria-label="A1 topics">
          {topicStations.map((t) => {
            const done = topicsDone.has(t.id);
            const active = topicId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`l30-topic-pill${active ? " is-active" : ""}${done ? " is-done" : ""}`}
                onClick={() => {
                  setTopicId(t.id);
                  setTopicChecked(false);
                }}
              >
                <span className="l30-topic-pill-title">{t.title}</span>
                <span className="l30-topic-pill-lessons">{t.lessons}</span>
              </button>
            );
          })}
        </div>

        <p className="l30-topic-progress">
          Stations done: {topicsDone.size} / {topicStations.length}
        </p>

        <div className="l30-topic-panel">
          <div className="l30-topic-panel-head">
            <h3>{activeTopic.title}</h3>
            <span className="l30-topic-badge">{activeTopic.lessons}</span>
          </div>

          <h4 className="l22-listen-subtitle">Speak</h4>
          <div className="lesson22-prompt-grid">
            {activeTopic.speak.map((q) => (
              <div key={q} className="lesson22-prompt-card">
                {q}
              </div>
            ))}
          </div>

          <h4 className="l22-listen-subtitle">Quick check</h4>
          <div className="l26-drill-list">
            {activeTopic.quiz.map((q) => {
              const key = `${topicId}-${q.id}`;
              return (
                <div key={key} className="l26-drill-row">
                  <strong className="l26-drill-prompt">
                    {q.id}. {q.prompt}
                  </strong>
                  <select
                    value={topicAns[key] ?? ""}
                    onChange={(e) => {
                      setTopicChecked(false);
                      setTopicAns((p) => ({ ...p, [key]: e.target.value }));
                    }}
                    className={drillSelClass(
                      topicChecked,
                      topicAns[key] ?? "",
                      q.answer,
                    )}
                    aria-label={q.prompt}
                  >
                    <option value="">___</option>
                    {q.options.map((o) => (
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
              onClick={() => {
                setTopicChecked(true);
                const allOk = activeTopic.quiz.every(
                  (q) => topicAns[`${topicId}-${q.id}`] === q.answer,
                );
                if (allOk) {
                  setTopicsDone((prev) => new Set([...prev, topicId]));
                }
              }}
            >
              Check station
            </button>
            {topicChecked && (
              <span className="l22-score">
                {topicScore} / {activeTopic.quiz.length}
                {topicScore === activeTopic.quiz.length ? " · station ✓" : ""}
              </span>
            )}
            <button
              type="button"
              className="l25-cr-mini-btn"
              onClick={() =>
                setTopicsDone((prev) => new Set([...prev, topicId]))
              }
            >
              Mark spoken ✓
            </button>
          </div>
        </div>
      </section>

      {/* 3 · Quick correction */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Quick correction</p>
          <h2>Common A1 mistakes</h2>
          <p className="lesson22-section-desc">
            their / they're · your / you're · its / it's · is / are · a / an ·
            jobs · nationality · go / goes (як у Lesson 30 · вправа 7).
          </p>
        </div>

        <ol className="l25-cr-ol">
          {correctionItems.map((item) => {
            const picked = corrAns[item.id] ?? "";
            return (
              <li key={item.id} className="l25-cr-ex8-row">
                <span className="l25-cr-sentence">{item.wrong}</span>
                <span className="l25-cr-choice-group">
                  {item.options.map((opt) => {
                    const isCorrect = opt === item.answer;
                    const isPicked = opt === picked;
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`l25-cr-chip${
                          corrChecked && isPicked && isCorrect
                            ? " l25-cr-chip--ok"
                            : corrChecked && isPicked && !isCorrect
                              ? " l25-cr-chip--err"
                              : corrChecked && !isPicked && isCorrect
                                ? " l25-cr-chip--missed"
                                : !corrChecked && isPicked
                                  ? " l30-chip-picked"
                                  : ""
                        }`}
                        onClick={() => {
                          setCorrChecked(false);
                          setCorrAns((p) => ({ ...p, [item.id]: opt }));
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </span>
                {corrChecked && picked === item.answer && (
                  <span className="l25-cr-hint-text"> · {item.tip}</span>
                )}
              </li>
            );
          })}
        </ol>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setCorrChecked(true)}
          >
            Check answers
          </button>
          {corrChecked && (
            <span className="l22-score">
              {corrScore} / {correctionItems.length}
            </span>
          )}
        </div>
      </section>

      {/* Submit */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Напиши коротко, що було складно / що повториш. Потім надішли
            вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw30-writing">
          Reflection (optional notes):
        </label>
        <textarea
          id="hw30-writing"
          className="hw27-textarea"
          rows={6}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Stations done: ${topicsDone.size}/${topicStations.length}
Correction: ${corrChecked ? `${corrScore}/${correctionItems.length}` : "not checked yet"}
What was hard: …`}
        />
        <HomeworkSubmit
          lessonId="30"
          writing={[
            draft.trim() || "(no extra notes)",
            `Topic stations: ${topicsDone.size}/${topicStations.length}`,
            `Quick correction: ${corrChecked ? `${corrScore}/${correctionItems.length}` : "not finished"}`,
          ].join("\n")}
          quizDone={stationsDone || correctionDone}
          quizScore={corrChecked ? corrScore : undefined}
          showListeningCheck={false}
        />
      </section>

      {/* 4 · Reflect — separate submit to teacher */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Reflect</p>
          <h2>How confident are you?</h2>
          <p className="lesson22-section-desc">
            1 = not very confident · 5 = very confident. Це покаже, що вже можна
            «закривати», а що повторити в наступному циклі. Окремо надішли
            вчителю.
          </p>
        </div>

        <ul className="l30-reflect-list">
          {reflectItems.map((text, i) => (
            <li key={text} className="l30-reflect-row">
              <span>{text}</span>
              <span className="l25-cr-btns" role="group" aria-label={text}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`l25-cr-is-btn${
                      reflect[i] === n ? " l25-cr-is-btn--ok" : ""
                    }`}
                    onClick={() =>
                      setReflect((prev) => ({ ...prev, [i]: n }))
                    }
                  >
                    {n}
                  </button>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <p className="lesson22-section-desc" style={{ marginTop: "0.85rem" }}>
          Rated: <strong>{reflectRated}</strong> / {reflectItems.length}
          {reflectDone && typeof reflectAvg === "number"
            ? ` · average ${reflectAvg} / 5`
            : ""}
        </p>

        <HomeworkSubmit
          lessonId="30-reflect"
          writing={reflectWriting}
          quizDone={reflectDone}
          quizScore={
            reflectDone && typeof reflectAvg === "number"
              ? Math.round(reflectAvg)
              : undefined
          }
          showListeningCheck={false}
          title="Надіслати Reflect вчителю"
          description="Оціни всі пункти (1–5), вкажи ім’я і натисни «Надіслати». Це окрема форма — не змішується з основним ДЗ 30."
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After homework</p>
          <h2>Done?</h2>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-30"
          >
            ← Lesson 30
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/a1-level-test"
          >
            A1 Level Test →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/vocab"
          >
            Vocab →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Hw30GoFlashcards() {
  const [queue, setQueue] = useState<Hw30GoCard[]>(() =>
    shuffle(hw30GoFlashcards),
  );
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.focus();
  }, [queue.length, flipped]);

  const total = hw30GoFlashcards.length;
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
    setQueue(shuffle(hw30GoFlashcards));
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
      <div className="fc-done panel" style={{ marginTop: "1rem" }}>
        <div className="fc-done-icon">🎉</div>
        <h3 className="fc-done-title">Колоду пройдено!</h3>
        <p className="fc-done-score">
          Знаєш <strong>{knownCount}</strong> з <strong>{total}</strong> фраз з{" "}
          <em>go</em>
        </p>
        <div className="fc-done-bar-wrap">
          <div className="fc-done-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="fc-done-actions">
          <button className="btn" type="button" onClick={handleRestart}>
            Почати знову
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fc-wrapper">
      <div className="fc-top" style={{ marginTop: "1rem" }}>
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
            <span className="fc-front-label muted">UA · go phrase</span>
            <p className="fc-front-word">{current?.front}</p>
            <span className="fc-flip-hint muted">
              натисни або <kbd>Space</kbd>
            </span>
          </div>
          <div className="fc-face fc-back">
            <span className="fc-back-label">English</span>
            <p className="fc-back-word">{current?.back}</p>
            <p className="muted" style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
              {current?.example}
            </p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="fc-actions">
          <button type="button" className="fc-btn-review" onClick={handleReview}>
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
