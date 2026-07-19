import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";
import "../styles/lesson25.css";

/* ─── Types ──────────────────────────────────────────────── */

type FillItem = {
  id: number;
  prompt: string;
  options: string[];
  answer: string;
};

type TFItem = {
  id: number;
  statement: string;
  answer: "T" | "F";
  correction?: string;
};

/* ─── Grammar practice: form of be ──────────────────────── */

const ex7aItems: FillItem[] = [
  {
    id: 1,
    prompt: "A: Hello. [1]___ you here for the conference?",
    options: ["Are", "Am", "Is"],
    answer: "Are",
  },
  {
    id: 2,
    prompt: "B: Yes, [2]___. I'm Laura.",
    options: ["I am", "you are", "I'm not"],
    answer: "I am",
  },
  {
    id: 3,
    prompt: "A: [3]___ Elif.",
    options: ["I'm", "You're", "She's"],
    answer: "I'm",
  },
  {
    id: 4,
    prompt: "A: [4]___ you from the US?",
    options: ["Are", "Am", "Is"],
    answer: "Are",
  },
  {
    id: 5,
    prompt: "B: No, [5]___ not. I'm from Toronto in Canada.",
    options: ["I'm", "you're", "he's"],
    answer: "I'm",
  },
  {
    id: 6,
    prompt: "B: Where [6]___ you from?",
    options: ["are", "am", "is"],
    answer: "are",
  },
  {
    id: 7,
    prompt: "A: [7]___ from Ankara in Turkey.",
    options: ["I'm", "You're", "He's"],
    answer: "I'm",
  },
];

/* ─── Grammar practice: fill in 're · are · aren't ─────── */

const ex6Items: FillItem[] = [
  {
    id: 1,
    prompt: "Lidia and Wiktor [1]___ my friends.",
    options: ["are", "'re", "aren't"],
    answer: "are",
  },
  {
    id: 2,
    prompt: "We [2]___ from Poland…",
    options: ["'re", "are", "aren't"],
    answer: "'re",
  },
  {
    id: 3,
    prompt: "…but Lidia and Wiktor [3]___ in Kraków at the moment.",
    options: ["aren't", "'re", "are"],
    answer: "aren't",
  },
  {
    id: 4,
    prompt: "They [4]___ at university in the UK…",
    options: ["'re", "are", "aren't"],
    answer: "'re",
  },
  {
    id: 5,
    prompt: "…and they [5]___ very happy there.",
    options: ["'re", "aren't", "are"],
    answer: "'re",
  },
  {
    id: 6,
    prompt: "My manager and I [6]___ from Chicago…",
    options: ["are", "'re", "aren't"],
    answer: "are",
  },
  {
    id: 7,
    prompt: "…but some people [7]___ American.",
    options: ["aren't", "'re", "are"],
    answer: "aren't",
  },
  {
    id: 8,
    prompt: "They [8]___ from different countries.",
    options: ["'re", "are", "aren't"],
    answer: "'re",
  },
  {
    id: 9,
    prompt: "Sally and Tim [9]___ British.",
    options: ["are", "'re", "aren't"],
    answer: "are",
  },
  {
    id: 10,
    prompt: "Hana and Kaito [10]___ Japanese.",
    options: ["'re", "are", "aren't"],
    answer: "'re",
  },
];

/* ─── Reading: True / False ──────────────────────────────── */

const trueFalseItems: TFItem[] = [
  {
    id: 1,
    statement: "Nina is from the US.",
    answer: "F",
    correction: "Nina is from the UK (London).",
  },
  {
    id: 2,
    statement: "Tessa and Julia are from Turkey.",
    answer: "F",
    correction: "Tessa is Turkish, but Julia is Polish.",
  },
  { id: 3, statement: "The office manager is Thai.", answer: "T" },
  {
    id: 4,
    statement: "Tim, Annie and Dan are in the UK now.",
    answer: "F",
    correction: "They're at an American university.",
  },
  {
    id: 5,
    statement: "Marvin is from Vancouver.",
    answer: "F",
    correction: "Marvin is from London. He's in Vancouver now.",
  },
];

/* ─── Check & Reflect data ───────────────────────────────── */

const crEx2aItems = [
  { words: "from / I / Brazil / am", answer: "I am from Brazil." },
  { words: "am / London / from / not / I", answer: "I am not from London." },
  { words: "you / class / my / in / Are?", answer: "Are you in my class?" },
  { words: "are / Where / from / you?", answer: "Where are you from?" },
  {
    words: "my / you / are / No, / in / class / not",
    answer: "No, you are not in my class.",
  },
];

const crEx3Answers = [
  "Are",
  "'m not",
  "'m",
  "Are",
  "'m not",
  "'m",
  "'m",
  "'m",
  "Am",
  "aren't",
];
const crEx3Options = [
  ["Are", "Am", "Is"],
  ["'m not", "'m", "aren't"],
  ["'m", "am", "'re"],
  ["Are", "Is", "Am"],
  ["'m not", "aren't", "'m"],
  ["'m", "am", "'re"],
  ["'m", "am", "'re"],
  ["'m", "am", "'re"],
  ["Am", "Are", "Is"],
  ["aren't", "'m not", "'re not"],
];

const crEx5Items = [
  { sentence: "Lionel Messi ___ a football player.", answer: "is" },
  { sentence: "___ Marina from Italy?", answer: "Is" },
  { sentence: "Yes, Yoko ___ in Class 5.", answer: "is" },
  { sentence: "The White House ___ in New York.", answer: "isn't" },
  { sentence: "___ Pete a doctor?", answer: "Is" },
  { sentence: "No, he ___.", answer: "isn't" },
];

const crEx6Items = [
  {
    wrong: "Jennifer Lopez is English.",
    info: "American",
    correct: "Jennifer Lopez isn't English. She's American.",
  },
  {
    wrong: "Cristiano Ronaldo is a doctor.",
    info: "football player",
    correct: "Cristiano Ronaldo isn't a doctor. He's a football player.",
  },
  {
    wrong: "The students are at a British university.",
    info: "American",
    correct:
      "The students aren't at a British university. They're at an American university.",
  },
  {
    wrong: "Celine Dion is from Spain.",
    info: "Canada",
    correct: "Celine Dion isn't from Spain. She's from Canada.",
  },
  {
    wrong: "We are from Spain.",
    info: "all over the world",
    correct: "We aren't from Spain. We're from all over the world.",
  },
];

const crEx7aData = [
  { name: "Gemma", country: "the UK", answer: "British" },
  { name: "Murat", country: "Turkey", answer: "Turkish" },
  { name: "Sonoko", country: "Japan", answer: "Japanese" },
  { name: "Jake", country: "Canada", answer: "Canadian" },
  { name: "Felipe", country: "Brazil", answer: "Brazilian" },
  { name: "Manolo", country: "Spain", answer: "Spanish" },
  { name: "Maria", country: "Argentina", answer: "Argentinian" },
  { name: "Sergio", country: "Mexico", answer: "Mexican" },
  { name: "Agnieszka", country: "Poland", answer: "Polish" },
  { name: "Anurak", country: "Thailand", answer: "Thai" },
];
const crNatOptions = [
  "",
  "British",
  "Turkish",
  "Japanese",
  "Canadian",
  "Brazilian",
  "Spanish",
  "Argentinian",
  "Mexican",
  "Polish",
  "Thai",
];

type Ex8Choice = { choices: string[]; answer: string };
type Ex8Part = string | Ex8Choice;
const crEx8Items: Ex8Part[][] = [
  [
    "Ana and Lydia are friends. ",
    { choices: ["We're", "They're"], answer: "They're" },
    " from Mexico.",
  ],
  [
    "Hey Luca, ",
    { choices: ["we are", "are we"], answer: "are we" },
    " in Classroom 2 today?",
  ],
  [
    "Mike and Sally are teachers. ",
    { choices: ["Are they", "They are"], answer: "They are" },
    " British.",
  ],
  [
    "A: Hello Yuki, hello Yumi. ",
    { choices: ["Are we", "Are you"], answer: "Are you" },
    " from Tokyo?\u2003B: ",
    { choices: ["We aren't", "They aren't"], answer: "We aren't" },
    " from Tokyo. ",
    { choices: ["You're", "We're"], answer: "We're" },
    " from Osaka.",
  ],
  [
    "Hi Jaime, hi Abdul. Don't worry! ",
    { choices: ["You aren't", "They aren't"], answer: "You aren't" },
    " late.",
  ],
];

const crEx8FlatIndices: number[][] = [];
(function () {
  let fi = 0;
  crEx8Items.forEach((parts) => {
    const row: number[] = [];
    parts.forEach((p) => {
      if (typeof p !== "string") row.push(fi++);
    });
    crEx8FlatIndices.push(row);
  });
})();

const crEx9Answers = ["'re", "aren't", "'re"];
const crEx9Options = ["", "'re", "are", "aren't"];

/* ─── Helper components ──────────────────────────────────── */

function ChooseExercise({
  items,
  answers,
  onSelect,
  showAnswers,
}: {
  items: FillItem[];
  answers: Record<number, string>;
  onSelect: (id: number, val: string) => void;
  showAnswers: boolean;
}) {
  return (
    <div className="lesson19-choose-list">
      {items.map((item) => {
        const selected = answers[item.id];
        const isCorrect = selected === item.answer;
        return (
          <article className="lesson19-choose-card" key={item.id}>
            <p className="lesson19-choose-sentence">{item.prompt}</p>
            <div className="lesson19-choice-row">
              {item.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`choice-btn ${selected === opt ? "selected" : ""}`}
                  onClick={() => onSelect(item.id, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showAnswers && (
              <div className={`lesson19-answer ${isCorrect ? "ok" : "bad"}`}>
                Correct: <strong>{item.answer}</strong>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function BeSel({
  i,
  vals,
  checked,
  answers,
  opts,
  setVals,
}: {
  i: number;
  vals: string[];
  checked: boolean;
  answers: string[];
  opts: string[][];
  setVals: (fn: (prev: string[]) => string[]) => void;
}) {
  const v = vals[i];
  const ok = v === answers[i];
  return (
    <select
      value={v}
      onChange={(e) =>
        setVals((prev) => {
          const n = [...prev];
          n[i] = e.target.value;
          return n;
        })
      }
      className={`l25-cr-sel${
        checked ? (ok ? " l25-cr-sel--ok" : v ? " l25-cr-sel--err" : "") : ""
      }`}
    >
      <option value="">___</option>
      {opts[i].map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* ─── Main component ─────────────────────────────────────── */

export default function HW25() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // Grammar practice: form of be
  const [ex7a, setEx7a] = useState<Record<number, string>>({});
  const [showEx7a, setShowEx7a] = useState(false);
  const ex7aScore = useMemo(
    () => ex7aItems.filter((i) => ex7a[i.id] === i.answer).length,
    [ex7a],
  );

  // Grammar practice: fill-in texts
  const [ex6, setEx6] = useState<Record<number, string>>({});
  const [showEx6, setShowEx6] = useState(false);
  const ex6Score = useMemo(
    () => ex6Items.filter((i) => ex6[i.id] === i.answer).length,
    [ex6],
  );

  // Reading: True / False
  const [tf, setTf] = useState<Record<number, string>>({});
  const [showTf, setShowTf] = useState(false);
  const tfScore = useMemo(
    () => trueFalseItems.filter((i) => tf[i.id] === i.answer).length,
    [tf],
  );

  // Check & Reflect
  const [crEx2aOpen, setCrEx2aOpen] = useState<Set<number>>(new Set());
  const [crEx3, setCrEx3] = useState<string[]>(Array(10).fill(""));
  const [crEx3Checked, setCrEx3Checked] = useState(false);
  const [crEx5, setCrEx5] = useState<(string | null)[]>(Array(6).fill(null));
  const [crEx6Open, setCrEx6Open] = useState<Set<number>>(new Set());
  const [crEx7, setCrEx7] = useState<string[]>(Array(10).fill(""));
  const [crEx7Checked, setCrEx7Checked] = useState(false);
  const [crEx8, setCrEx8] = useState<(string | null)[]>(Array(7).fill(null));
  const [crEx9, setCrEx9] = useState<string[]>(["", "", ""]);
  const [crEx9Checked, setCrEx9Checked] = useState(false);

  return (
    <div className="lesson22-page" ref={pageRef}>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="lesson22-hero">
        <p className="page-kicker">Homework · Lesson 25</p>
        <h1 className="lesson22-title">Unit 1 · 1A Hello</h1>
        <p className="lesson22-subtitle">
          Виконай домашні завдання. Перевір себе за допомогою кнопок "Check
          answers".
        </p>
        <Link className="lesson22-back-link" to="/lesson-25">
          ← Back to Lesson 25
        </Link>
      </section>

      {/* ── Grammar practice: form of be ────────────────────── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar practice</p>
          <h2>Complete with the correct form of be</h2>
          <p className="lesson22-section-desc">
            Обери правильну форму дієслова <strong>be</strong> для кожного
            речення з діалогу.
          </p>
        </div>

        <ChooseExercise
          items={ex7aItems}
          answers={ex7a}
          onSelect={(id, val) => setEx7a((p) => ({ ...p, [id]: val }))}
          showAnswers={showEx7a}
        />
        <button
          type="button"
          className="l22-btn"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowEx7a(true)}
        >
          Check answers
        </button>
        {showEx7a && (
          <p className="l22-score">
            Score: {ex7aScore} / {ex7aItems.length}
          </p>
        )}
      </section>

      {/* ── Grammar practice: fill-in texts ─────────────────── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar practice</p>
          <h2>Fill in: 're · are · aren't</h2>
          <p className="lesson22-section-desc">
            Обери правильну форму для кожного речення з двох текстів.
          </p>
        </div>

        <div className="l25-wordbox">
          {[
            "'re",
            "are",
            "'re",
            "aren't",
            "'re",
            "are",
            "aren't",
            "'re",
            "are",
            "'re",
          ].map((w, i) => (
            <span key={i} className="l25-wordbox-item">
              {w}
            </span>
          ))}
        </div>

        <ChooseExercise
          items={ex6Items}
          answers={ex6}
          onSelect={(id, val) => setEx6((p) => ({ ...p, [id]: val }))}
          showAnswers={showEx6}
        />
        <button
          type="button"
          className="l22-btn"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowEx6(true)}
        >
          Check answers
        </button>
        {showEx6 && (
          <p className="l22-score">
            Score: {ex6Score} / {ex6Items.length}
          </p>
        )}
      </section>

      {/* ── Reading: Me and my friends ──────────────────────── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reading</p>
          <h2>Me and my friends</h2>
          <p className="lesson22-section-desc">
            Прочитай блог вголос. Потім дай відповідь: True чи False?
          </p>
        </div>

        <div className="l25-blog">
          {[
            "Hi! I'm Nina. I'm from London. I'm a university student and an office worker.",
            "Tessa and Julia are my friends from university. Tessa is Turkish and Julia is Polish. They're student nurses.",
            "This is my office. We aren't all British. We're from all over the world. Diego is from Spain, Carlos is from Argentina and the manager is from Thailand. We're a good team.",
            "Tim, Annie and Dan are my friends from school. They aren't in the UK now. They're at an American university.",
            "And this is my friend Marvin. He's from London, but he's in Vancouver in Canada now.",
          ].map((text, i) => (
            <p key={i} className="l25-blog-p">
              <span className="l25-blog-num">{i + 1}</span>
              {text}
            </p>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">True or False?</h3>
        <div className="lesson19-choose-list">
          {trueFalseItems.map((item) => {
            const selected = tf[item.id];
            const isCorrect = selected === item.answer;
            return (
              <article className="lesson19-choose-card" key={item.id}>
                <p className="lesson19-choose-sentence">{item.statement}</p>
                <div className="lesson19-choice-row">
                  {["T", "F"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice-btn ${selected === opt ? "selected" : ""}`}
                      onClick={() => setTf((p) => ({ ...p, [item.id]: opt }))}
                    >
                      {opt === "T" ? "True" : "False"}
                    </button>
                  ))}
                </div>
                {showTf && (
                  <div
                    className={`lesson19-answer ${isCorrect ? "ok" : "bad"}`}
                  >
                    {item.answer === "T" ? (
                      <strong>True ✓</strong>
                    ) : (
                      <>
                        <strong>False.</strong> {item.correction}
                      </>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="l22-btn"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowTf(true)}
        >
          Check answers
        </button>
        {showTf && (
          <p className="l22-score">
            Score: {tfScore} / {trueFalseItems.length}
          </p>
        )}
      </section>

      {/* ── Check & Reflect ──────────────────────────────────── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check &amp; Reflect</p>
          <h2>Review exercises</h2>
          <p className="lesson22-section-desc">
            Перевір себе — виконай вправи з розділу "Check and Reflect".
          </p>
        </div>

        {/* Ex 2a — sentence ordering */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">2a</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Put the words in the correct order to make sentences.
            </p>
            <ol className="l25-cr-ol">
              {crEx2aItems.map((item, i) => (
                <li key={i} className="l25-cr-order-row">
                  <span className="l25-cr-jumbled">{item.words}</span>
                  <button
                    className="l25-cr-mini-btn"
                    onClick={() =>
                      setCrEx2aOpen((prev) => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })
                    }
                  >
                    {crEx2aOpen.has(i) ? "Hide" : "Answer"}
                  </button>
                  {crEx2aOpen.has(i) && (
                    <span className="l25-cr-answer">{item.answer}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Ex 2b */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">2b</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Rewrite three of the sentences in Exercise 2a using short forms.
            </p>
            <p className="l25-cr-hint">
              <em>I am from Brazil.</em> → <em>I'm from Brazil.</em>
            </p>
          </div>
        </div>

        {/* Ex 3 — be forms */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">3</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Complete the sentences with the correct form of <em>be</em>. Use
              short forms.
            </p>
            {/* Dialog 1 – blanks 0,1 */}
            <div className="l25-cr-dialog">
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">A:</strong>
                <BeSel
                  i={0}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" you from Spain?"}
              </div>
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">B:</strong>
                {"No, I "}
                <BeSel
                  i={1}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" from Mexico."}
              </div>
            </div>
            {/* Dialog 2 – blanks 2,3,4 */}
            <div className="l25-cr-dialog">
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">A:</strong>
                {"I "}
                <BeSel
                  i={2}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" in Class 4. "}
                <BeSel
                  i={3}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" you?"}
              </div>
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">B:</strong>
                {"No, I "}
                <BeSel
                  i={4}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" in Class 3."}
              </div>
            </div>
            {/* Dialog 3 – blanks 5,6,7 */}
            <div className="l25-cr-dialog">
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">A:</strong>
                {"Hi, I "}
                <BeSel
                  i={5}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" Tomoko. I "}
                <BeSel
                  i={6}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" from Japan."}
              </div>
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">B:</strong>
                {"Nice to meet you. I "}
                <BeSel
                  i={7}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" Burak from Turkey."}
              </div>
            </div>
            {/* Dialog 4 – blanks 8,9 */}
            <div className="l25-cr-dialog">
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">A:</strong>
                <BeSel
                  i={8}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" I late?"}
              </div>
              <div className="l25-cr-dline">
                <strong className="l25-cr-sp">B:</strong>
                {"No, you "}
                <BeSel
                  i={9}
                  vals={crEx3}
                  checked={crEx3Checked}
                  answers={crEx3Answers}
                  opts={crEx3Options}
                  setVals={setCrEx3}
                />
                {" late."}
              </div>
            </div>
            <div className="l25-cr-actions">
              <button
                className="l22-check-btn"
                onClick={() => setCrEx3Checked(true)}
              >
                Check answers
              </button>
              {crEx3Checked && (
                <span className="l22-score">
                  {crEx3.filter((v, i) => v === crEx3Answers[i]).length} /{" "}
                  {crEx3Answers.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ex 5 — add is / isn't */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">5</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Correct the sentences. Add <em>is</em> or <em>isn't</em>.
            </p>
            <ol className="l25-cr-ol">
              {crEx5Items.map((item, i) => {
                const picked = crEx5[i];
                return (
                  <li key={i} className="l25-cr-is-row">
                    <span className="l25-cr-sentence">{item.sentence}</span>
                    <span className="l25-cr-btns">
                      {["is", "Is", "isn't"].map((opt) => {
                        const isCorrect = opt === item.answer;
                        const isPicked = opt === picked;
                        return (
                          <button
                            key={opt}
                            className={`l25-cr-is-btn${isPicked && isCorrect ? " l25-cr-is-btn--ok" : isPicked && !isCorrect ? " l25-cr-is-btn--err" : ""}`}
                            onClick={() =>
                              setCrEx5((prev) => {
                                const n = [...prev];
                                n[i] = opt;
                                return n;
                              })
                            }
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Ex 6 — correct sentences */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">6</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Correct the sentences. Use the information in brackets.
            </p>
            <ol className="l25-cr-ol">
              {crEx6Items.map((item, i) => (
                <li key={i} className="l25-cr-order-row">
                  <span>
                    <span className="l25-cr-sentence">{item.wrong}</span>{" "}
                    <span className="l25-cr-bracket">({item.info})</span>
                  </span>
                  <button
                    className="l25-cr-mini-btn"
                    onClick={() =>
                      setCrEx6Open((prev) => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })
                    }
                  >
                    {crEx6Open.has(i) ? "Hide" : "Correct →"}
                  </button>
                  {crEx6Open.has(i) && (
                    <span className="l25-cr-answer l25-cr-answer--green">
                      {item.correct}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Ex 7a — nationalities */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">7a</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Complete the sentences with the correct nationalities.
            </p>
            <ol className="l25-cr-ol">
              {crEx7aData.map((item, i) => {
                const v = crEx7[i];
                const ok = v === item.answer;
                return (
                  <li key={i} className="l25-cr-nat-row">
                    <span>
                      {item.name}'s from {item.country}. {item.name}'s{" "}
                    </span>
                    <select
                      value={v}
                      onChange={(e) =>
                        setCrEx7((prev) => {
                          const n = [...prev];
                          n[i] = e.target.value;
                          return n;
                        })
                      }
                      className={`l25-cr-sel${crEx7Checked ? (ok ? " l25-cr-sel--ok" : v ? " l25-cr-sel--err" : "") : ""}`}
                    >
                      {crNatOptions.map((o) => (
                        <option key={o} value={o}>
                          {o || "___"}
                        </option>
                      ))}
                    </select>
                    {crEx7Checked && !ok && v && (
                      <span className="l25-cr-correct-nat">
                        {" "}
                        → {item.answer}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="l25-cr-actions">
              <button
                className="l22-check-btn"
                onClick={() => setCrEx7Checked(true)}
              >
                Check answers
              </button>
              {crEx7Checked && (
                <span className="l22-score">
                  {crEx7.filter((v, i) => v === crEx7aData[i].answer).length} /{" "}
                  {crEx7aData.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ex 8 — choose correct alternatives */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">8</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">Choose the correct alternatives.</p>
            <ol className="l25-cr-ol">
              {crEx8Items.map((parts, si) => {
                let choiceIdx = 0;
                return (
                  <li key={si} className="l25-cr-ex8-row">
                    {parts.map((part, pi) => {
                      if (typeof part === "string")
                        return <span key={pi}>{part}</span>;
                      const fi = crEx8FlatIndices[si][choiceIdx++];
                      const picked = crEx8[fi];
                      return (
                        <span key={pi} className="l25-cr-choice-group">
                          {part.choices.map((ch) => {
                            const isCorrect = ch === part.answer;
                            const isPicked = ch === picked;
                            return (
                              <button
                                key={ch}
                                onClick={() =>
                                  setCrEx8((prev) => {
                                    const n = [...prev];
                                    n[fi] = ch;
                                    return n;
                                  })
                                }
                                className={`l25-cr-chip${
                                  isPicked && isCorrect
                                    ? " l25-cr-chip--ok"
                                    : isPicked && !isCorrect
                                      ? " l25-cr-chip--err"
                                      : !isPicked &&
                                          picked !== null &&
                                          isCorrect
                                        ? " l25-cr-chip--missed"
                                        : ""
                                }`}
                              >
                                {ch}
                              </button>
                            );
                          })}
                        </span>
                      );
                    })}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Ex 9 — fill in 're / are / aren't */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">9</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">
              Complete the text with <em>'re</em>, <em>are</em> and{" "}
              <em>aren't</em>.
            </p>
            <p className="l25-cr-text-block">
              {"Nick and Kelly "}
              <select
                value={crEx9[0]}
                onChange={(e) =>
                  setCrEx9((prev) => {
                    const n = [...prev];
                    n[0] = e.target.value;
                    return n;
                  })
                }
                className={`l25-cr-sel${crEx9Checked ? (crEx9[0] === crEx9Answers[0] ? " l25-cr-sel--ok" : crEx9[0] ? " l25-cr-sel--err" : "") : ""}`}
              >
                {crEx9Options.map((o) => (
                  <option key={o} value={o}>
                    {o || "___"}
                  </option>
                ))}
              </select>
              {" my friends in London. I'm from the UK, but Nick and Kelly "}
              <select
                value={crEx9[1]}
                onChange={(e) =>
                  setCrEx9((prev) => {
                    const n = [...prev];
                    n[1] = e.target.value;
                    return n;
                  })
                }
                className={`l25-cr-sel${crEx9Checked ? (crEx9[1] === crEx9Answers[1] ? " l25-cr-sel--ok" : crEx9[1] ? " l25-cr-sel--err" : "") : ""}`}
              >
                {crEx9Options.map((o) => (
                  <option key={o} value={o}>
                    {o || "___"}
                  </option>
                ))}
              </select>
              {" British. They "}
              <select
                value={crEx9[2]}
                onChange={(e) =>
                  setCrEx9((prev) => {
                    const n = [...prev];
                    n[2] = e.target.value;
                    return n;
                  })
                }
                className={`l25-cr-sel${crEx9Checked ? (crEx9[2] === crEx9Answers[2] ? " l25-cr-sel--ok" : crEx9[2] ? " l25-cr-sel--err" : "") : ""}`}
              >
                {crEx9Options.map((o) => (
                  <option key={o} value={o}>
                    {o || "___"}
                  </option>
                ))}
              </select>
              {" from Canada."}
            </p>
            <div className="l25-cr-actions">
              <button
                className="l22-check-btn"
                onClick={() => setCrEx9Checked(true)}
              >
                Check answers
              </button>
              {crEx9Checked && (
                <span className="l22-score">
                  {crEx9.filter((v, i) => v === crEx9Answers[i]).length} /{" "}
                  {crEx9Answers.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Back link ─────────────────────────────────────────── */}
      <section className="lesson22-block panel" style={{ textAlign: "center" }}>
        <Link className="lesson22-back-link" to="/lesson-25">
          ← Back to Lesson 25
        </Link>
      </section>
    </div>
  );
}
