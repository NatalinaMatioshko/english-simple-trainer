import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { ScoredQuizCard } from "../components/practice/ScoredQuizCard";
import {
  cardsForDeck,
  hw40ArticleChoose,
  hw40ArticleGaps,
  hw40ArticleOptions,
  hw40DeckMeta,
  hw40TestMeta,
  hw40WordOrder,
  hw40WritingPrompts,
  tasksForTest,
  type Hw40DeckId,
  type Hw40Flashcard,
  type Hw40TestId,
} from "../data/hw40";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { useScoredQuiz } from "../hooks/useScoredQuiz";
import { shuffle } from "../utils/array";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

function wordOrderScore(
  items: typeof hw40WordOrder,
  rows: ReturnType<typeof initWordOrderRows>,
) {
  return items.filter((item, i) => {
    const built = rows[i]?.built ?? [];
    const joined = built
      .join(" ")
      .replace(/\s+\?/g, "?")
      .replace(/\s+\./g, ".")
      .replace(/\s+!/g, "!")
      .trim();
    return joined === item.answer && (rows[i]?.pool.length ?? 0) === 0;
  }).length;
}

export default function HW40() {
  const [testId, setTestId] = useState<Hw40TestId>("all");
  const testTasks = useMemo(() => tasksForTest(testId), [testId]);
  const testMeta = hw40TestMeta.find((t) => t.id === testId)!;
  const test = useScoredQuiz(testTasks, `hw40-test-${testId}`);

  const [orderRows, setOrderRows] = useState(() =>
    initWordOrderRows(hw40WordOrder),
  );
  const [orderChecked, setOrderChecked] = useState(false);
  const orderScore = wordOrderScore(hw40WordOrder, orderRows);

  const [articleAns, setArticleAns] = useState(() =>
    Array(hw40ArticleGaps.length).fill(""),
  );
  const [articleChecked, setArticleChecked] = useState(false);
  const articleScore = hw40ArticleGaps.filter(
    (item, i) => articleAns[i] === item.answer,
  ).length;

  const [articleChooseAns, setArticleChooseAns] = useState(() =>
    Array(hw40ArticleChoose.length).fill(""),
  );
  const [articleChooseChecked, setArticleChooseChecked] = useState(false);
  const articleChooseScore = hw40ArticleChoose.filter(
    (item, i) => articleChooseAns[i] === item.answer,
  ).length;

  const [writing, setWriting] = useState("");

  const testPassed = test.finished && test.score >= testMeta.passScore;
  const orderDone =
    orderChecked && orderScore >= Math.ceil(hw40WordOrder.length * 0.75);
  const articlesDone =
    articleChecked &&
    articleChooseChecked &&
    articleScore >= Math.ceil(hw40ArticleGaps.length * 0.75) &&
    articleChooseScore >= Math.ceil(hw40ArticleChoose.length * 0.75);
  const writingDone = writing.trim().length > 30;
  const allDone = testPassed && orderDone && articlesDone && writingDone;

  const submitText = [
    writing.trim(),
    "",
    `Test: ${test.finished ? `${test.score}/${test.total}` : "not finished"}`,
    `Word order: ${orderChecked ? `${orderScore}/${hw40WordOrder.length}` : "not finished"}`,
    `Articles gaps: ${articleChecked ? `${articleScore}/${hw40ArticleGaps.length}` : "not finished"}`,
    `Articles choose: ${articleChooseChecked ? `${articleChooseScore}/${hw40ArticleChoose.length}` : "not finished"}`,
  ].join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 40</p>
            <h1>Dos and don&apos;ts</h1>
            <p className="lesson22-subtitle">
              Flashcards · test · word order · articles · write dos and
              don&apos;ts for your city.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-40">
              ← Lesson 40
            </Link>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Visit / Don&apos;t go</span>
          <span>London · Rome</span>
          <span>try · visit · take · drink · see</span>
          <span>a / an / the</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Flashcards</p>
          <h2>Verbs · phrases · advice</h2>
          <p className="lesson22-section-desc">
            Обери колоду або <strong>Усі картки</strong>. Переверни (Space /
            Enter), потім <strong>Знаю</strong> / <strong>Ще раз</strong>.
          </p>
        </div>

        <div
          className="l25-conf-card"
          style={{ maxWidth: 640, marginBottom: "1.25rem" }}
        >
          <div className="l25-conf-header">Imperatives · give advice</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              <strong>Do:</strong> Visit the museum. · Try Italian food. · Drink
              coffee. · See a show. · Take a coat.
              <br />
              <strong>Don&apos;t:</strong> Don&apos;t go to Oxford Street. ·
              Don&apos;t take taxis.
            </p>
          </div>
        </div>

        <Hw40Flashcards />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Test</p>
          <h2>Imperatives · London &amp; Rome</h2>
          <p className="lesson22-section-desc">
            Практикуй окремий блок або пройди <strong>весь тест</strong>.
          </p>
        </div>

        <div className="trainer-deck-tabs hw27-fc-tabs" role="tablist">
          {hw40TestMeta.map((t) => (
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
          aria-label="Прогрес тесту HW40"
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
          successText="Чудово! Imperatives добре закріплені."
          retryText="Повторіть картки — і спробуйте ще раз."
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
          <p className="page-kicker">3 · Anagram · Word order</p>
          <h2>Put the words in order</h2>
          <p className="lesson22-section-desc">
            Склади речення-поради: <strong>Visit…</strong> /{" "}
            <strong>Don&apos;t go…</strong> Перетягни слова або натискай на
            них.
          </p>
        </div>
        <WordOrderBoard
          items={hw40WordOrder}
          rows={orderRows}
          setRows={setOrderRows}
          checked={orderChecked}
          setChecked={setOrderChecked}
        />
        {orderChecked && (
          <p className="l22-score" style={{ marginTop: "0.75rem" }}>
            {orderScore} / {hw40WordOrder.length}
          </p>
        )}
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Articles</p>
          <h2>a · an · the · —</h2>
          <p className="lesson22-section-desc">
            Перевір артиклі з порад і опису людей.{" "}
            <strong>—</strong> = без артикля.
          </p>
        </div>

        <div
          className="l25-conf-card"
          style={{ maxWidth: 640, marginBottom: "1.25rem" }}
        >
          <div className="l25-conf-header">Remember</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              <strong>a / an</strong> — один предмет / професія:{" "}
              <em>a coat</em>, <em>a show</em>, <em>a colorist</em>.
              <br />
              <strong>the</strong> — конкретне / відоме:{" "}
              <em>the British Museum</em>, <em>the UK</em>.
              <br />
              <strong>—</strong> — множина загалом, їжа, hair:{" "}
              <em>taxis</em>, <em>Indian food</em>, <em>short hair</em>.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">4a · Choose a / an / the / —</h3>
        <div className="l26-drill-list">
          {hw40ArticleGaps.map((item, i) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {item.before}{" "}
                <select
                  value={articleAns[i]}
                  onChange={(e) => {
                    setArticleChecked(false);
                    const next = [...articleAns];
                    next[i] = e.target.value;
                    setArticleAns(next);
                  }}
                  className={drillSelClass(
                    articleChecked,
                    articleAns[i],
                    item.answer,
                  )}
                  aria-label={`Article ${i + 1}`}
                >
                  <option value="">___</option>
                  {hw40ArticleOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>{" "}
                {item.after}
              </strong>
              {articleChecked && articleAns[i] !== item.answer && (
                <span className="hw35-tip" style={{ display: "block" }}>
                  {item.tipUa} → <strong>{item.answer}</strong>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setArticleChecked(true)}
          >
            Check
          </button>
          {articleChecked && (
            <span className="l22-score">
              {articleScore} / {hw40ArticleGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setArticleAns(hw40ArticleGaps.map((item) => item.answer));
              setArticleChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setArticleAns(Array(hw40ArticleGaps.length).fill(""));
              setArticleChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.5rem" }}>
          4b · Choose the correct sentence
        </h3>
        <div className="l26-drill-list">
          {hw40ArticleChoose.map((item, i) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {item.prompt}
              </strong>
              <select
                value={articleChooseAns[i]}
                onChange={(e) => {
                  setArticleChooseChecked(false);
                  const next = [...articleChooseAns];
                  next[i] = e.target.value;
                  setArticleChooseAns(next);
                }}
                className={drillSelClass(
                  articleChooseChecked,
                  articleChooseAns[i],
                  item.answer,
                )}
                aria-label={`Choose sentence ${i + 1}`}
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
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setArticleChooseChecked(true)}
          >
            Check
          </button>
          {articleChooseChecked && (
            <span className="l22-score">
              {articleChooseScore} / {hw40ArticleChoose.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setArticleChooseAns(hw40ArticleChoose.map((item) => item.answer));
              setArticleChooseChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setArticleChooseAns(Array(hw40ArticleChoose.length).fill(""));
              setArticleChooseChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Writing</p>
          <h2>Dos and don&apos;ts for your city</h2>
          <p className="lesson22-section-desc">
            Напиши <strong>4 dos</strong> і <strong>4 don&apos;ts</strong> для
            свого міста. Використай imperative: Visit… / Don&apos;t go… / Try… /
            Take…
          </p>
        </div>
        <ul className="l22-goals-list">
          {hw40WritingPrompts.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
        <blockquote className="l23-rule-quote" style={{ marginBottom: "1rem" }}>
          <p>
            <em>
              Go to the Eiffel Tower. Take photos. Don&apos;t have coffee there.
              It&apos;s expensive!
            </em>
          </p>
        </blockquote>
        <label className="lesson22-section-desc" htmlFor="hw40-writing">
          My city — dos and don&apos;ts
        </label>
        <textarea
          id="hw40-writing"
          className="hw27-textarea"
          rows={10}
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder="Kyiv — dos and don'ts&#10;&#10;Do: Visit… Try… Drink… See…&#10;Don't: Don't go to… Don't take…"
          style={{ width: "100%", marginTop: "0.4rem" }}
        />
      </section>

      <section className="lesson22-block panel">
        <HomeworkSubmit
          lessonId="40"
          writing={submitText}
          quizDone={allDone}
          quizScore={test.finished ? test.score : undefined}
          showListeningCheck={false}
        />
      </section>
    </div>
  );
}

function Hw40Flashcards() {
  const [deckId, setDeckId] = useState<Hw40DeckId>("all");
  const deckCards = useMemo(() => cardsForDeck(deckId), [deckId]);
  const [queue, setQueue] = useState<Hw40Flashcard[]>(() =>
    shuffle(cardsForDeck("all")),
  );
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const deckLabel = (id: Hw40DeckId) =>
    hw40DeckMeta.find((d) => d.id === id)?.badge ?? id;

  useEffect(() => {
    setQueue(shuffle(deckCards));
    setKnown(new Set());
    setFlipped(false);
  }, [deckId, deckCards]);

  useEffect(() => {
    cardRef.current?.focus({ preventScroll: true });
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
    setQueue((prev) => [...prev.slice(1), prev[0]!]);
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
        {hw40DeckMeta.map((d) => (
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
                <span className="fc-front-label muted">
                  {current ? deckLabel(current.deck) : ""}
                </span>
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
