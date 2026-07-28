import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import {
  cardsForDeck,
  hw27DeckMeta,
  hw27TestMeta,
  tasksForTest,
  type Hw27DeckId,
  type Hw27Flashcard,
  type Hw27TestId,
} from "../data/hw27Review";
import { useScoredQuiz } from "../hooks/useScoredQuiz";
import { ScoredQuizCard } from "../components/practice/ScoredQuizCard";
import { shuffle } from "../utils/array";

const writingPrompts = [
  "My name is… I'm from…",
  "I'm a… / I'm a student. I work in / at…",
  "This is my family.",
  "My father / mother is a… He/She works…",
  "My brother / sister / husband / wife…",
  "Their names are…",
];

export default function HW27() {
  const [draft, setDraft] = useState("");
  const [testId, setTestId] = useState<Hw27TestId>("all");
  const testTasks = useMemo(() => tasksForTest(testId), [testId]);
  const testMeta = hw27TestMeta.find((t) => t.id === testId)!;
  const test = useScoredQuiz(testTasks, `hw27-test-${testId}`);

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 27</p>
            <h1>About you &amp; your family</h1>
            <p className="lesson22-subtitle">
              Writing · Listening · Flashcards L25–27 · Test L25–27.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-27">
              ← Lesson 27
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>countries</span>
          <span>jobs · to be</span>
          <span>family · possessives</span>
          <span>L25–27 review</span>
        </div>
      </section>

      {/* Task 1 · Writing */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Writing</p>
          <h2>Write about yourself and your family</h2>
          <p className="lesson22-section-desc">
            Напиши <strong>6–10 речень</strong> про себе і свою сім'ю. Використай
            мову з уроку: name, from, job/student, family members, jobs, place of
            work, <em>my / his / her / their</em>, possessive <em>'s</em>.
          </p>
        </div>

        <div
          className="l25-conf-card"
          style={{ maxWidth: 640, marginBottom: "1rem" }}
        >
          <div className="l25-conf-header">Include</div>
          <div className="l25-conf-fields">
            <p
              style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}
            >
              1) You: name, where you are from, job or student, place of work /
              study.
              <br />
              2) Family: 2–3 people (mother, father, brother, sister…).
              <br />
              3) For each person: job + where they work (if you know).
            </p>
          </div>
        </div>

        <div className="lesson22-prompt-grid" style={{ marginBottom: "1rem" }}>
          {writingPrompts.map((p) => (
            <div
              key={p}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {p}
            </div>
          ))}
        </div>

        <label className="lesson22-section-desc" htmlFor="hw27-writing">
          Твій текст (чернетка):
        </label>
        <textarea
          id="hw27-writing"
          className="hw27-textarea"
          rows={10}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={
            "Hi! My name is… I'm from… I'm a… This is my family. My father's name is… He's a… He works…"
          }
        />
        <p className="lesson22-section-desc" style={{ marginTop: "0.75rem" }}>
          Модель / tips:{" "}
          <a
            className="l22-external-link"
            href="https://test-english.com/writing/a1/writing-about-my-family/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Writing about my family — A1 Writing ↗
          </a>
        </p>
      </section>

      {/* Task 2 · Listening */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Listening</p>
          <h2>My family — listening test</h2>
          <p className="lesson22-section-desc">
            Відкрий посилання, послухай аудіо і виконай тільки{" "}
            <strong>Exercise 1</strong>. Після вправи натисни{" "}
            <strong>Check</strong> на сайті.
          </p>
        </div>

        <div className="l26-hw-links">
          <article className="l26-hw-link-card">
            <h3>Exercise 1 only</h3>
            <p>
              Listening A1 · <strong>My family</strong>. Не роби Exercise 2 /
              інші блоки — лише перше завдання.
            </p>
            <a
              className="l22-external-link"
              href="https://test-english.com/listening/a1/my-family-listening-test/"
              target="_blank"
              rel="noopener noreferrer"
            >
              My family — A1 Listening Test ↗
            </a>
          </article>
        </div>
      </section>

      {/* Task 3 · Flashcards */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Flashcards · L25–27</p>
          <h2>Повтори слова і фрази</h2>
          <p className="lesson22-section-desc">
            Обери блок теми або <strong>Усі картки</strong>. Переверни картку
            (Space / Enter), потім <strong>Знаю</strong> /{" "}
            <strong>Ще раз</strong>.
          </p>
        </div>
        <Hw27Flashcards />
      </section>

      {/* Task 4 · Test */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Test · L25–27</p>
          <h2>Перевірка</h2>
          <p className="lesson22-section-desc">
            Практикуй окрему тему або пройди <strong>весь тест</strong> відразу.
            Після відповіді — <strong>Наступне питання</strong>.
          </p>
        </div>

        <div className="trainer-deck-tabs hw27-fc-tabs" role="tablist">
          {hw27TestMeta.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={testId === t.id}
              className={`trainer-deck-tab ${testId === t.id ? "active" : ""}`}
              onClick={() => setTestId(t.id)}
            >
              <span className="trainer-deck-tab-title">{t.title}</span>
              <span className="trainer-deck-tab-badge">{t.badge}</span>
              <span className="trainer-deck-tab-lessons">{t.desc}</span>
            </button>
          ))}
        </div>

        <div className="progress" aria-label="Прогрес тесту HW27" style={{ marginTop: "1rem" }}>
          <span style={{ width: test.progress }} />
        </div>
        <p className="muted" style={{ margin: "0.5rem 0 1rem" }}>
          {test.answeredCount} / {test.total} · Бал: {test.score}
        </p>

        <ScoredQuizCard
          title={testMeta.title}
          subtitle={testMeta.desc}
          successText="Чудово! Цей блок добре закріплений."
          retryText="Повторіть картки цього блоку — і спробуйте ще раз."
          passScore={testMeta.passScore}
          currentTask={test.currentTask}
          finished={test.finished}
          score={test.score}
          selected={test.selected}
          locked={test.locked}
          options={test.options}
          feedback={test.feedback}
          handleAnswer={test.handleAnswer}
          nextTask={test.nextTask}
          restart={test.restart}
          total={test.total}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After homework</p>
          <h2>Done?</h2>
          <p className="lesson22-section-desc">
            Повернись до уроку або словника для додаткового повторення.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-27"
          >
            ← Lesson 27
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/vocab"
          >
            Vocab →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/trainer"
          >
            Trainer practice →
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Flashcards ─────────────────────────────────────────── */

function Hw27Flashcards() {
  const [deckId, setDeckId] = useState<Hw27DeckId>("all");
  const deckCards = useMemo(() => cardsForDeck(deckId), [deckId]);
  const [queue, setQueue] = useState<Hw27Flashcard[]>(() =>
    shuffle(cardsForDeck("all")),
  );
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQueue(shuffle(deckCards));
    setKnown(new Set());
    setFlipped(false);
  }, [deckId, deckCards]);

  useEffect(() => {
    cardRef.current?.focus();
  }, [queue.length, flipped]);

  const total = deckCards.length;
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
    setQueue((prev) => [...prev.slice(1), prev[0]]);
    setFlipped(false);
  };

  const handleRestart = () => {
    setQueue(shuffle(deckCards));
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

  return (
    <div className="fc-wrapper">
      <div className="trainer-deck-tabs hw27-fc-tabs" role="tablist">
        {hw27DeckMeta.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={deckId === d.id}
            className={`trainer-deck-tab ${deckId === d.id ? "active" : ""}`}
            onClick={() => setDeckId(d.id)}
          >
            <span className="trainer-deck-tab-title">{d.title}</span>
            <span className="trainer-deck-tab-badge">{d.badge}</span>
            <span className="trainer-deck-tab-lessons">{d.desc}</span>
          </button>
        ))}
      </div>

      {done ? (
        <div className="fc-done panel" style={{ marginTop: "1rem" }}>
          <div className="fc-done-icon">🎉</div>
          <h3 className="fc-done-title">Колоду пройдено!</h3>
          <p className="fc-done-score">
            Знаєте <strong>{knownCount}</strong> з <strong>{total}</strong>{" "}
            карток
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
                  const reviewItems = deckCards.filter((c) => !known.has(c.id));
                  setQueue(shuffle(reviewItems));
                  setKnown(new Set());
                  setFlipped(false);
                }}
              >
                Повторити невідомі ({total - knownCount})
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
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
                <span className="fc-front-label muted">{current?.deck}</span>
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
          <div className="fc-remaining muted">
            Залишилось: {queue.length}
          </div>
        </>
      )}
    </div>
  );
}
