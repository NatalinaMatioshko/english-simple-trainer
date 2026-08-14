import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson29.css";
import {
  hw29TestMeta,
  tasksForTest,
  type Hw29TestId,
} from "../data/hw29Review";
import {
  cardsForDeck,
  hw28DeckMeta,
  hw28TestMeta,
  tasksForTest as tasksForTest28,
  type Hw28DeckId,
  type Hw28Flashcard,
  type Hw28TestId,
} from "../data/hw28Review";
import { useScoredQuiz } from "../hooks/useScoredQuiz";
import { ScoredQuizCard } from "../components/practice/ScoredQuizCard";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import Hw29CheckReflect, {
  type Hw29CheckReflectResult,
} from "../components/Hw29CheckReflect";
import { shuffle } from "../utils/array";

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson29/${file}`;

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
] as const;

const numberBank = numberWords.map((word, i) => ({ value: i + 1, word }));

/** Same shuffled order as Lesson 29 · Vocabulary · 1a */
const numberPictures = [
  { pos: 1, value: 7 },
  { pos: 2, value: 3 },
  { pos: 3, value: 10 },
  { pos: 4, value: 1 },
  { pos: 5, value: 8 },
  { pos: 6, value: 4 },
  { pos: 7, value: 9 },
  { pos: 8, value: 2 },
  { pos: 9, value: 6 },
  { pos: 10, value: 5 },
] as const;

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

type ShopGap = {
  id: number;
  before: string;
  after: string;
  options: string[];
  answer: string;
  speaker: "Rosa" | "Assistant";
};

const shopDialogueGaps: ShopGap[] = [
  {
    id: 1,
    speaker: "Rosa",
    before: "Excuse me.",
    after: "that chair?",
    options: ["How much is", "How much are", "What’s"],
    answer: "How much is",
  },
  {
    id: 2,
    speaker: "Assistant",
    before: "",
    after: "£45.",
    options: ["It’s", "They’re", "Here’s"],
    answer: "It’s",
  },
  {
    id: 3,
    speaker: "Rosa",
    before: "And",
    after: "this box?",
    options: ["how much is", "how much are", "where’s"],
    answer: "how much is",
  },
  {
    id: 4,
    speaker: "Rosa",
    before: "OK.",
    after: "these cups?",
    options: ["How much are", "How much is", "What are"],
    answer: "How much are",
  },
  {
    id: 5,
    speaker: "Assistant",
    before: "",
    after: "£6, please.",
    options: ["That’s", "They’re", "Here’s"],
    answer: "That’s",
  },
  {
    id: 6,
    speaker: "Assistant",
    before: "",
    after: "?",
    options: ["Cash or card", "Here you are", "Thank you"],
    answer: "Cash or card",
  },
  {
    id: 7,
    speaker: "Rosa",
    before: "Card, please.",
    after: "",
    options: ["Here’s my card.", "Here’s your change.", "That’s £6."],
    answer: "Here’s my card.",
  },
  {
    id: 8,
    speaker: "Assistant",
    before: "Thank you.",
    after: "",
    options: ["Here’s your card.", "Here’s my card.", "Cash, please."],
    answer: "Here’s your card.",
  },
];

const SOUND = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_2/RM_A1_SB_U2_R${r}.mp3`;

const writingPrompts = [
  "How old is…? He’s / She’s…",
  "Where is he / she from?",
  "What’s his / her job?",
  "What’s her name? Her name is…",
  "thirteen / thirty · fifteen / fifty",
];

export default function HW29() {
  const [draft, setDraft] = useState("");
  const [restDraft, setRestDraft] = useState("");
  const [checkResult, setCheckResult] =
    useState<Hw29CheckReflectResult | null>(null);
  const [numAns, setNumAns] = useState<Record<number, string>>({});
  const [numChecked, setNumChecked] = useState(false);
  const [shopGaps, setShopGaps] = useState<Record<number, string>>({});
  const [shopGapsChecked, setShopGapsChecked] = useState(false);
  const [testId, setTestId] = useState<Hw29TestId>("all");

  // HW28 quiz (this / that / these / those)
  const [test28Id, setTest28Id] = useState<Hw28TestId>("all");
  const test28Tasks = useMemo(() => tasksForTest28(test28Id), [test28Id]);
  const test28Meta = hw28TestMeta.find((t) => t.id === test28Id)!;
  const test28 = useScoredQuiz(test28Tasks, `hw28-test-${test28Id}`);
  const testTasks = useMemo(() => tasksForTest(testId), [testId]);
  const testMeta = hw29TestMeta.find((t) => t.id === testId)!;
  const test = useScoredQuiz(testTasks, `hw29-test-${testId}`);

  const onCheckResult = useCallback((r: Hw29CheckReflectResult) => {
    setCheckResult(r);
  }, []);

  const numScore = numberPictures.filter(
    (p) => numAns[p.pos] === numberWords[p.value - 1],
  ).length;

  const shopGapScore = shopDialogueGaps.filter(
    (g) => shopGaps[g.id] === g.answer,
  ).length;

  const reviewWriting = [
    checkResult?.summary ?? "— Check & Reflect (Unit review): not started —",
    ...(restDraft.trim() ? ["", "— Notes —", restDraft.trim()] : []),
  ].join("\n");

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 29</p>
            <h1>Numbers</h1>
            <p className="lesson22-subtitle">
              Закріплення: matching 1–10 · shop dialogue · quiz · Check &amp;
              Reflect (Unit 2).
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-29">
              ← Lesson 29
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>L28 flashcards</span>
          <span>this / that / these / those</span>
          <span>match 1–10</span>
          <span>in a shop</span>
          <span>quiz</span>
          <span>Check &amp; Reflect</span>
        </div>
      </section>

      {/* ── HW28 · Flashcards (everyday objects + this/that/these/those) ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Flashcards · Lesson 28</p>
          <h2>Повтори слова і покажчики</h2>
          <p className="lesson22-section-desc">
            Обери колоду або <strong>Усі картки</strong>. Переверни (Space /
            Enter), потім <strong>Знаю</strong> / <strong>Ще раз</strong>.
          </p>
        </div>
        <Hw28Flashcards />
      </section>

      {/* ── HW28 · Quiz ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Quiz · Lesson 28</p>
          <h2>Перевірка: everyday objects + this / that / these / those</h2>
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
              aria-selected={test28Id === t.id}
              className={`trainer-deck-tab ${test28Id === t.id ? "active" : ""}`}
              onClick={() => setTest28Id(t.id)}
            >
              <span className="trainer-deck-tab-title">{t.title}</span>
              <span className="trainer-deck-tab-badge">{t.badge}</span>
              <span className="trainer-deck-tab-lessons">{t.desc}</span>
            </button>
          ))}
        </div>

        <div className="progress" aria-label="Прогрес тесту HW28" style={{ marginTop: "1rem" }}>
          <span style={{ width: test28.progress }} />
        </div>
        <p className="muted" style={{ margin: "0.5rem 0 1rem" }}>
          {test28.answeredCount} / {test28.total} · Бал: {test28.score}
        </p>

        <ScoredQuizCard
          title={test28Meta.title}
          subtitle={test28Meta.desc}
          successText="Чудово! Part 2 добре закріплена."
          retryText="Повторіть картки цього блоку — і спробуйте ще раз."
          passScore={test28Meta.passScore}
          currentTask={test28.currentTask}
          finished={test28.finished}
          score={test28.score}
          selected={test28.selected}
          locked={test28.locked}
          options={test28.options}
          feedback={test28.feedback}
          handleAnswer={test28.handleAnswer}
          nextTask={test28.nextTask}
          restart={test28.restart}
          shuffleQuestions={test28.shuffleQuestions}
          total={test28.total}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Vocabulary · Match</p>
          <h2>Numbers 1–10</h2>
          <p className="lesson22-section-desc">
            З’єднай цифру на картці зі словом. Обери правильне слово зі списку
            під кожною карткою.
          </p>
        </div>

        <div className="l29-match-grid">
          {numberPictures.map((pic) => {
            const chosen = numAns[pic.pos] ?? "";
            const answer = numberWords[pic.value - 1];
            return (
              <div key={pic.pos} className="l29-match-card">
                <div className="l29-match-frame">
                  <span className="l29-match-num">{pic.pos}</span>
                  <img
                    className="l29-match-img"
                    src={IMG(`n${pic.value}.svg`)}
                    alt={`Number card ${pic.pos}`}
                    loading="lazy"
                  />
                </div>
                <select
                  value={chosen}
                  onChange={(e) => {
                    setNumChecked(false);
                    setNumAns((prev) => ({
                      ...prev,
                      [pic.pos]: e.target.value,
                    }));
                  }}
                  className={drillSelClass(numChecked, chosen, answer)}
                  aria-label={`Word for card ${pic.pos}`}
                >
                  <option value="">select…</option>
                  {numberBank.map((n) => (
                    <option key={n.word} value={n.word}>
                      {n.word}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            className="l22-check-btn"
            type="button"
            onClick={() => setNumChecked(true)}
          >
            Check answers
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setNumAns({});
              setNumChecked(false);
            }}
          >
            Reset
          </button>
          {numChecked && (
            <span className="l22-score">
              {numScore} / {numberPictures.length}
            </span>
          )}
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · English in Action · 3a</p>
          <h2>Complete the conversation</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R20</strong> і заповни діалог. Обери правильний
            варіант у кожному пропуску.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0 0 1rem" }}>
          <div className="l25-audio-item">
            <div className="l25-audio-meta">
              <span className="l25-audio-num">R20</span>
              <div className="l25-audio-info">
                <span className="l25-audio-ex">English in Action · 3a</span>
                <span className="l25-audio-title">In a shop — listen</span>
              </div>
            </div>
            <audio
              controls
              className="l25-audio-ctrl"
              src={SOUND(20)}
              preload="none"
            />
          </div>
        </div>

        <div className="l29-shop-dlg">
          {shopDialogueGaps.map((g) => (
            <div key={g.id} className="l29-shop-dlg-line">
              <strong>{g.speaker}:</strong>{" "}
              {g.before && <span>{g.before} </span>}
              <select
                value={shopGaps[g.id] ?? ""}
                onChange={(e) => {
                  setShopGapsChecked(false);
                  setShopGaps((prev) => ({
                    ...prev,
                    [g.id]: e.target.value,
                  }));
                }}
                className={drillSelClass(
                  shopGapsChecked,
                  shopGaps[g.id] ?? "",
                  g.answer,
                )}
                aria-label={`Gap ${g.id}`}
              >
                <option value="">({g.id}) …</option>
                {g.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>{" "}
              {g.after && <span>{g.after}</span>}
            </div>
          ))}
          <p className="l29-shop-dlg-line">
            <strong>Rosa:</strong> Thank you.
          </p>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            className="l22-check-btn"
            type="button"
            onClick={() => setShopGapsChecked(true)}
          >
            Check answers
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setShopGaps({});
              setShopGapsChecked(false);
            }}
          >
            Reset
          </button>
          {shopGapsChecked && (
            <span className="l22-score">
              {shopGapScore} / {shopDialogueGaps.length}
            </span>
          )}
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Quiz / Test</p>
          <h2>Перевірка Part 2</h2>
          <p className="lesson22-section-desc">
            Практикуй окремий блок або пройди <strong>весь тест</strong>. Для
            таблиці Question words обери вкладку <strong>WH words</strong> —
            значення (person / place / time…) і приклади речень. Кнопка{" "}
            <strong>Перемішати</strong> змінює порядок питань.
          </p>
        </div>

        <div className="trainer-deck-tabs hw27-fc-tabs" role="tablist">
          {hw29TestMeta.map((t) => (
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
          aria-label="Прогрес тесту HW29"
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
          successText="Чудово! Numbers і question words закріплені."
          retryText="Подивіться таблицю Question words у Lesson 29 — і спробуйте ще раз."
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
          <p className="page-kicker">6 · Speaking / Writing</p>
          <h2>People you know</h2>
          <p className="lesson22-section-desc">
            Напиши про <strong>3 людей</strong> (сім’я / друзі). Для кожного:
            ім’я, вік, звідки, робота. Використай питання з{" "}
            <em>How old / Where / What</em>.
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
              Her name is Olena. How old is she? She’s 42. Where is she from?
              She’s from Kyiv. What’s her job? She’s a teacher. His name is
              Taras. He’s 19. He’s a student.
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

        <label className="lesson22-section-desc" htmlFor="hw29-writing">
          Твій текст (чернетка):
        </label>
        <textarea
          id="hw29-writing"
          className="hw27-textarea"
          rows={8}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Her name is… How old is she? She’s… Where is she from?…"
        />

        <HomeworkSubmit
          lessonId="29"
          writing={draft}
          quizDone={test.finished}
          quizScore={test.finished ? test.score : undefined}
          showListeningCheck={false}
          title="Надіслати Writing"
          description="Текст береться з поля вище (People you know). Решту вправ надішли окремою кнопкою внизу сторінки."
        />
      </section>

      <Hw29CheckReflect onResultChange={onCheckResult} />

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit · Check &amp; Reflect</p>
          <h2>Send Unit review to teacher</h2>
          <p className="lesson22-section-desc">
            Надішли відповіді з <strong>Check &amp; Reflect (Unit review)</strong>{" "}
            вище — усі вправи й самооцінку Reflect. Writing іде окремою формою.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw29-review-notes">
          Notes (optional):
        </label>
        <textarea
          id="hw29-review-notes"
          className="hw27-textarea"
          rows={4}
          value={restDraft}
          onChange={(e) => setRestDraft(e.target.value)}
          placeholder="What was hard in the Unit review? …"
        />
        <HomeworkSubmit
          lessonId="29-review"
          writing={reviewWriting}
          quizDone={!!checkResult?.reflectDone}
          quizScore={
            checkResult?.reflectDone &&
            typeof checkResult.reflectAvg === "number"
              ? Math.round(checkResult.reflectAvg)
              : undefined
          }
          showListeningCheck={false}
          title="Надіслати Check &amp; Reflect"
          description="До вчителя підуть відповіді Unit review і Reflect. Додай ім’я і натисни «Надіслати»."
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After homework</p>
          <h2>Done?</h2>
          <p className="lesson22-section-desc">
            Повернись до уроку 29 (Part 2) або словника для додаткового
            повторення.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-29"
          >
            ← Lesson 29
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

/* ─── HW28 Flashcards (moved from HW28) ─────────────────────── */

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
      if (e.key === "ArrowRight" || e.key === "k" || e.key === "K") handleKnow();
      if (e.key === "ArrowLeft" || e.key === "r" || e.key === "R") handleReview();
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
            Знаєте <strong>{knownCount}</strong> з <strong>{total}</strong> карток
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
                <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="fc-counter muted">{knownCount} / {total} знаю</span>
            </div>
            <button
              type="button"
              className="btn secondary fc-shuffle-btn"
              onClick={() => { setQueue((prev) => shuffle(prev)); setFlipped(false); }}
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
                <span className="fc-flip-hint muted">натисни або <kbd>Space</kbd></span>
              </div>
              <div className="fc-face fc-back">
                <span className="fc-back-label">English</span>
                <p className="fc-back-word">{current?.back}</p>
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
              <><kbd>←</kbd> Ще раз &nbsp;·&nbsp; <kbd>→</kbd> Знаю</>
            ) : (
              <><kbd>Space</kbd> / <kbd>Enter</kbd> — перевернути</>
            )}
          </div>
          <div className="fc-remaining muted">Залишилось: {queue.length}</div>
        </>
      )}
    </div>
  );
}
