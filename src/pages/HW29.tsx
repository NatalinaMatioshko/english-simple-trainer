import { useMemo, useState } from "react";
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
import { useScoredQuiz } from "../hooks/useScoredQuiz";
import { ScoredQuizCard } from "../components/practice/ScoredQuizCard";
import Hw29CheckReflect from "../components/Hw29CheckReflect";

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
  const [numAns, setNumAns] = useState<Record<number, string>>({});
  const [numChecked, setNumChecked] = useState(false);
  const [shopGaps, setShopGaps] = useState<Record<number, string>>({});
  const [shopGapsChecked, setShopGapsChecked] = useState(false);
  const [testId, setTestId] = useState<Hw29TestId>("all");
  const testTasks = useMemo(() => tasksForTest(testId), [testId]);
  const testMeta = hw29TestMeta.find((t) => t.id === testId)!;
  const test = useScoredQuiz(testTasks, `hw29-test-${testId}`);

  const numScore = numberPictures.filter(
    (p) => numAns[p.pos] === numberWords[p.value - 1],
  ).length;

  const shopGapScore = shopDialogueGaps.filter(
    (g) => shopGaps[g.id] === g.answer,
  ).length;

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
          <span>match 1–10</span>
          <span>in a shop</span>
          <span>quiz</span>
          <span>Check &amp; Reflect</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Vocabulary · Match</p>
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
          <p className="page-kicker">2 · English in Action · 3a</p>
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
          <p className="page-kicker">3 · Quiz / Test</p>
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
          <p className="page-kicker">4 · Speaking / Writing</p>
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
      </section>

      <Hw29CheckReflect />

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
