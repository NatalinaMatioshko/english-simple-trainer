import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import {
  cardsForDeck,
  hw28DeckMeta,
  hw28TestMeta,
  tasksForTest,
  type Hw28DeckId,
  type Hw28Flashcard,
  type Hw28TestId,
} from "../data/hw28Review";
import { useScoredQuiz } from "../hooks/useScoredQuiz";
import { ScoredQuizCard } from "../components/practice/ScoredQuizCard";
import { shuffle } from "../utils/array";

const writingPrompts = [
  "What’s that? It’s a…",
  "What are those? They’re…",
  "This is my… / That is my…",
  "These are my… / Those are my…",
  "In my room there is a desk, a chair, a computer…",
];

export default function HW28() {
  const [draft, setDraft] = useState("");
  const [testId, setTestId] = useState<Hw28TestId>("all");
  const testTasks = useMemo(() => tasksForTest(testId), [testId]);
  const testMeta = hw28TestMeta.find((t) => t.id === testId)!;
  const test = useScoredQuiz(testTasks, `hw28-test-${testId}`);

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 28</p>
            <h1>Everyday things</h1>
            <p className="lesson22-subtitle">
              Закріплення Part 2: vocabulary · listening · grammar · quiz
              (this / that / these / those).
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-28">
              ← Lesson 28
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>objects a–l</span>
          <span>Max &amp; Carla</span>
          <span>this / that / these / those</span>
          <span>quiz</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Flashcards</p>
          <h2>Повтори слова і покажчики</h2>
          <p className="lesson22-section-desc">
            Обери колоду або <strong>Усі картки</strong>. Переверни (Space /
            Enter), потім <strong>Знаю</strong> / <strong>Ще раз</strong>.
          </p>
        </div>
        <Hw28Flashcards />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Quiz / Test</p>
          <h2>Перевірка Part 2</h2>
          <p className="lesson22-section-desc">
            Практикуй окремий блок або пройди <strong>весь тест</strong>. Кнопка{" "}
            <strong>Перемішати</strong> змінює порядок питань.
          </p>
        </div>

        <div className="trainer-deck-tabs hw27-fc-tabs" role="tablist">
          {hw28TestMeta.map((t) => (
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

        <div
          className="progress"
          aria-label="Прогрес тесту HW28"
          style={{ marginTop: "1rem" }}
        >
          <span style={{ width: test.progress }} />
        </div>
        <p className="muted" style={{ margin: "0.5rem 0 1rem" }}>
          {test.answeredCount} / {test.total} · Бал: {test.score}
        </p>

        <ScoredQuizCard
          title={testMeta.title}
          subtitle={testMeta.desc}
          successText="Чудово! Part 2 добре закріплена."
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
          shuffleQuestions={test.shuffleQuestions}
          total={test.total}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Speaking / Writing</p>
          <h2>Things in your room</h2>
          <p className="lesson22-section-desc">
            Напиши <strong>6–8 речень</strong> про речі в кімнаті. Використай{" "}
            <em>this / that / these / those</em> і слова з Part 2 (desk, chair,
            computer, phone, books…).
          </p>
        </div>

        <div
          className="l25-conf-card"
          style={{ maxWidth: 640, marginBottom: "1rem" }}
        >
          <div className="l25-conf-header">Model</div>
          <div className="l25-conf-fields">
            <p
              style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}
            >
              This is my desk. That is my chair. These are my books. Those are
              photos of my family. What’s that? It’s a lamp. What are those?
              They’re plants.
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

        <label className="lesson22-section-desc" htmlFor="hw28-writing">
          Твій текст (чернетка):
        </label>
        <textarea
          id="hw28-writing"
          className="hw27-textarea"
          rows={8}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="This is my desk. That is my computer. These are my pens…"
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After homework</p>
          <h2>Done?</h2>
          <p className="lesson22-section-desc">
            Повернись до уроку 28 (Part 2) або словника для додаткового
            повторення.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-28"
          >
            ← Lesson 28
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

function Hw28Flashcards() {
  const [deckId, setDeckId] = useState<Hw28DeckId>("all");
  const deckCards = useMemo(() => cardsForDeck(deckId), [deckId]);
  const [queue, setQueue] = useState<Hw28Flashcard[]>(() =>
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
        {hw28DeckMeta.map((d) => (
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
          <div className="fc-remaining muted">Залишилось: {queue.length}</div>
        </>
      )}
    </div>
  );
}
