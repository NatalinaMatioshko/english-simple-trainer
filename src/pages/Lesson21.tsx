import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson21.css";
import "../styles/lesson19.css";

/* ─── Third person data ─────────────────────────────── */

const warmUpPrompts = [
  "What does your brother do every day?",
  "Where does your sister work?",
  "Does he study English?",
  "Say 3 facts about a family member.",
];

const vocabCards = [
  {
    en: "backpack",
    ua: "рюкзак",
    example: "I carry my books in a backpack.",
  },
  {
    en: "book",
    ua: "книга",
    example: "I read a book every day.",
  },
  {
    en: "wallet",
    ua: "гаманець",
    example: "My wallet is in my bag.",
  },
  {
    en: "TV",
    ua: "телевізор",
    example: "I watch TV in the evening.",
  },
  {
    en: "house",
    ua: "будинок",
    example: "They live in a big house.",
  },
  {
    en: "car",
    ua: "автомобіль",
    example: "He drives a car.",
  },
  {
    en: "shoes",
    ua: "взуття",
    example: "I wear shoes every day.",
  },
  {
    en: "computer",
    ua: "комп'ютер",
    example: "I work on a computer.",
  },
  {
    en: "mobile phone",
    ua: "мобільний телефон",
    example: "I use my mobile phone a lot.",
  },
  {
    en: "umbrella",
    ua: "парасолька",
    example: "I take an umbrella when it rains.",
  },
];

const rapidDrills = [
  { i: "I work in a bank.", she: "He works in a bank." },
  { i: "I go to school.", she: "She goes to school." },
  { i: "I study English.", she: "He studies English." },
  { i: "I have coffee in the morning.", she: "She has coffee in the morning." },
  { i: "I watch TV at night.", she: "He watches TV at night." },
  { i: "I live in Kyiv.", she: "She lives in Kyiv." },
  { i: "I read books.", she: "He reads books." },
  { i: "I do homework.", she: "She does homework." },
  { i: "I brush my teeth.", she: "He brushes his teeth." },
  { i: "I try new food.", she: "She tries new food." },
];

const negativeQuestionDrills = [
  { text: "He doesn't work on Sundays.", note: "negative → doesn't + base verb" },
  { text: "Does she study French?", note: "question → Does + she + base verb?" },
  { text: "She doesn't watch TV in the morning.", note: "doesn't + watch (no -s)" },
  { text: "Does he have a brother?", note: "Does he have…? (not has)" },
];

const sortWords = [
  { word: "works", bucket: "s" },
  { word: "lives", bucket: "s" },
  { word: "reads", bucket: "s" },
  { word: "watches", bucket: "es" },
  { word: "goes", bucket: "es" },
  { word: "does", bucket: "es" },
  { word: "studies", bucket: "ies" },
  { word: "tries", bucket: "ies" },
  { word: "carries", bucket: "ies" },
  { word: "has", bucket: "has" },
];

const sortSentences: Record<string, string[]> = {
  s: ["He works every day.", "She lives in Kyiv.", "He reads a lot."],
  es: ["She watches TV.", "He goes to work.", "She does yoga."],
  ies: ["He studies English.", "She tries hard.", "He carries a bag."],
  has: ["She has a brother.", "He has coffee."],
};

const gapItems = [
  { sentence: "My brother ___ in a shop.", answer: "works" },
  { sentence: "She ___ to work at 8.", answer: "goes" },
  { sentence: "He ___ TV in the evening.", answer: "watches" },
  { sentence: "My mom ___ coffee every morning.", answer: "has" },
  { sentence: "My friend ___ English.", answer: "studies" },
];

type ListenItem = {
  sentence: string;
  verb: string;
  subject: "he" | "she" | "it";
  question: string;
  answer: string;
};

const listenItems: ListenItem[] = [
  {
    sentence: "He works in a bank.",
    verb: "works",
    subject: "he",
    question: "Who works in a bank?",
    answer: "He does. / He works in a bank.",
  },
  {
    sentence: "She lives in Kyiv.",
    verb: "lives",
    subject: "she",
    question: "Where does she live?",
    answer: "In Kyiv.",
  },
  {
    sentence: "He has a brother.",
    verb: "has",
    subject: "he",
    question: "Does he have a brother?",
    answer: "Yes, he does.",
  },
  {
    sentence: "She goes to work at 8.",
    verb: "goes",
    subject: "she",
    question: "What time does she go to work?",
    answer: "At 8.",
  },
  {
    sentence: "He watches TV in the evening.",
    verb: "watches",
    subject: "he",
    question: "When does he watch TV?",
    answer: "In the evening.",
  },
];

/* ─── Can data (from Can.tsx) ───────────────────────── */

type SortItem = { text: string; answer: "can" | "can't" };
type ChooseItem = { sentence: string; options: string[]; answer: string };

const canSortItems: SortItem[] = [
  { text: "I ___ swim.", answer: "can" },
  { text: "She ___ drive.", answer: "can" },
  { text: "He ___ fly.", answer: "can't" },
  { text: "They ___ speak French.", answer: "can" },
  { text: "I ___ play the piano.", answer: "can't" },
  { text: "We ___ see the stars.", answer: "can" },
  { text: "Dogs ___ talk.", answer: "can't" },
  { text: "Cats ___ jump high.", answer: "can" },
];

const canChooseItems: ChooseItem[] = [
  { sentence: "___ you help me?", options: ["Can", "Can't", "Does", "Do"], answer: "Can" },
  { sentence: "I ___ ride a bike.", options: ["can", "can't", "cans", "do"], answer: "can" },
  {
    sentence: "She ___ speak English very well.",
    options: ["can", "can't", "doesn't", "isn't"],
    answer: "can",
  },
  { sentence: "Fish ___ walk.", options: ["can", "can't", "don't", "isn't"], answer: "can't" },
  { sentence: "___ he cook?", options: ["Can", "Can't", "Does", "Is"], answer: "Can" },
  {
    sentence: "I ___ hear you — it's too loud.",
    options: ["can", "can't", "don't", "am not"],
    answer: "can't",
  },
];

/* ─── Page ──────────────────────────────────────────── */

function listenVerbOptions(correct: string): string[] {
  const base = correct.endsWith("ies")
    ? correct.replace(/ies$/, "y")
    : correct.replace(/es$/, "").replace(/s$/, "");
  return [...new Set([correct, base, "have"])].slice(0, 3);
}

export default function Lesson21() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [drillOpen, setDrillOpen] = useState<number[]>([]);
  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);
  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );
  const toggleDrill = (idx: number) =>
    setDrillOpen((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const [sortPlaced, setSortPlaced] = useState<Record<string, string>>({});
  const [sortSelected, setSortSelected] = useState<string | null>(null);
  const [sortChecked, setSortChecked] = useState(false);

  const placeWord = (bucket: string) => {
    if (!sortSelected || sortPlaced[sortSelected]) return;
    setSortPlaced((p) => ({ ...p, [sortSelected]: bucket }));
    setSortSelected(null);
    setSortChecked(false);
  };

  const sortScore = useMemo(
    () =>
      sortWords.filter((w) => sortPlaced[w.word] === w.bucket).length,
    [sortPlaced],
  );

  const [gapAnswers, setGapAnswers] = useState<Record<number, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = useMemo(
    () =>
      gapItems.filter(
        (item, i) =>
          gapAnswers[i]?.trim().toLowerCase() === item.answer.toLowerCase(),
      ).length,
    [gapAnswers],
  );

  const [listenState, setListenState] = useState<
    Record<number, { underlined: boolean; subject: string; verb: string; answered: boolean }>
  >({});

  const updateListen = (
    idx: number,
    patch: Partial<{ underlined: boolean; subject: string; verb: string; answered: boolean }>,
  ) => setListenState((p) => ({ ...p, [idx]: { ...p[idx], ...patch } }));

  /* Can exercises state */
  const [canSort, setCanSort] = useState<Record<string, "can" | "can't" | "">>(
    Object.fromEntries(canSortItems.map((i) => [i.text, ""])),
  );
  const canSortScore = useMemo(
    () => canSortItems.filter((i) => canSort[i.text] === i.answer).length,
    [canSort],
  );

  const [canChoose, setCanChoose] = useState<Record<number, string>>({});
  const [showCanChoose, setShowCanChoose] = useState(false);
  const canChooseScore = useMemo(
    () =>
      canChooseItems.filter((item, i) => canChoose[i] === item.answer).length,
    [canChoose],
  );

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".reveal-on-scroll");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lesson21-page" ref={pageRef}>
      {/* Hero */}
      <section className="lesson21-hero panel reveal-on-scroll is-visible">
        <div className="lesson21-hero-top">
          <div>
            <p className="page-kicker">Lesson 21</p>
            <h1>Can + Third Person Review</h1>
            <p className="lesson21-topic-pill">
              can → ability · request · permission
            </p>
            <p className="lesson21-subtitle">
              Consolidate he / she / it forms, then learn{" "}
              <strong>can / can't</strong> for ability, polite requests, and
              permission — with drills, listening, and task-based speaking.
            </p>
          </div>
          <div className="lesson21-nav">
            <Link className="lesson21-back-link" to="/">
              ← Roadmap
            </Link>
            <Link className="lesson21-back-link lesson21-back-link--ghost" to="/lessons">
              All lessons
            </Link>
          </div>
        </div>
        <div className="lesson21-hero-chips">
          <span>He works</span>
          <span>She doesn't</span>
          <span>Does she…?</span>
          <span>I can swim</span>
          <span>Can you help me?</span>
          <span>No, I can't</span>
        </div>
      </section>

      {/* Vocabulary */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Word cards</h2>
          <p className="lesson21-section-desc">
            Tap a card — front shows Ukrainian, back shows English and an example
            sentence. Read each example aloud.
          </p>
        </div>
        <div className="l21-vocab-grid">
          {vocabCards.map((card, idx) => {
            const flipped = vocabFlipped.includes(idx);
            return (
              <button
                key={card.en}
                type="button"
                className={`l21-vocab-card ${flipped ? "l21-vocab-card--flipped" : ""}`}
                onClick={() => toggleVocab(idx)}
                aria-pressed={flipped}
              >
                <div className="l21-vocab-inner">
                  <div className="l21-vocab-face l21-vocab-front">
                    <span className="l21-vocab-label">Українська</span>
                    <strong>{card.ua}</strong>
                    <span className="l21-vocab-hint">tap to flip</span>
                  </div>
                  <div className="l21-vocab-face l21-vocab-back">
                    <span className="l21-vocab-label">English</span>
                    <strong>{card.en}</strong>
                    <em>{card.example}</em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Lesson flow */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-flow">
          <span>0 Vocabulary</span>
          <span>1 Warm-up</span>
          <span>2 Review + drill</span>
          <span>3 Grammar + spelling</span>
          <span>4 Controlled practice</span>
          <span>5 Speaking</span>
          <span>6 Listening</span>
          <span>7 Can</span>
          <span>8 Homework</span>
        </div>
        <p className="lesson21-section-desc">
          Sequence: <strong>input → drill → controlled output → short listening → short speaking</strong> —
          so rules become automatic speech, not just theory.
        </p>
      </section>

      {/* Warm-up */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Warm-up</p>
          <h2>Review + quick drill</h2>
          <p className="lesson21-section-desc">
            Answer out loud. Use he / she / it and full sentences.
          </p>
        </div>
        <div className="lesson21-prompt-grid">
          {warmUpPrompts.map((q) => (
            <div key={q} className="lesson21-prompt-card">
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* Pronunciation / spelling mini block */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">3–4 minutes</p>
          <h2>Mini pronunciation & spelling block</h2>
          <p className="lesson21-section-desc">
            Read each column <strong>out loud</strong>. Then say full sentences with he / she.
          </p>
        </div>
        <div className="l21-pron-grid">
          <div className="l21-pron-col l21-pron-col--s">
            <h4>-s</h4>
            <ul>
              <li>works</li>
              <li>lives</li>
              <li>reads</li>
            </ul>
          </div>
          <div className="l21-pron-col l21-pron-col--es">
            <h4>-es</h4>
            <ul>
              <li>watches</li>
              <li>goes</li>
              <li>does</li>
            </ul>
          </div>
          <div className="l21-pron-col l21-pron-col--ies">
            <h4>-ies</h4>
            <ul>
              <li>studies</li>
              <li>tries</li>
              <li>carries</li>
            </ul>
          </div>
          <div className="l21-pron-col l21-pron-col--has">
            <h4>has</h4>
            <ul>
              <li>has</li>
            </ul>
          </div>
        </div>
        <p className="l21-pron-note">
          Say aloud: <em>He works. She watches. He studies. She has coffee.</em>
          <br />
          In questions & negatives use <strong>does / doesn't + base verb</strong> (no -s):{" "}
          <em>Does she work? She doesn't work on Sunday.</em>
        </p>
      </section>

      {/* Can grammar input */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Grammar input</p>
          <h2>Can / Can't — ability, request, permission</h2>
        </div>
        <div className="l21-can-rules">
          <div className="l21-can-rule">
            <h4>Ability</h4>
            <p>I <strong>can</strong> swim.</p>
            <p>She <strong>can't</strong> drive.</p>
            <p><strong>Can</strong> you cook?</p>
          </div>
          <div className="l21-can-rule">
            <h4>Request</h4>
            <p><strong>Can</strong> you help me, please?</p>
            <p><strong>Can</strong> you open the window?</p>
          </div>
          <div className="l21-can-rule">
            <h4>Permission</h4>
            <p><strong>Can</strong> I sit here?</p>
            <p>Yes, you can. / No, you can't.</p>
          </div>
          <div className="l21-can-rule">
            <h4>Important</h4>
            <p>After can → <strong>base verb</strong> (no -s)</p>
            <p>✓ She <strong>can speak</strong> English</p>
            <p>✗ She can speaks English</p>
          </div>
        </div>
      </section>

      {/* Controlled practice 1: Rapid transformation */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Controlled practice</p>
          <h2>1) Rapid transformation drill</h2>
          <p className="lesson21-section-desc">
            Change <strong>I → he/she</strong> instantly. Tap to check the model answer.
          </p>
        </div>
        <div className="l21-drill-list">
          {rapidDrills.map((item, idx) => (
            <button
              key={item.i}
              type="button"
              className={`l21-drill-row ${drillOpen.includes(idx) ? "l21-drill-row--open" : ""}`}
              onClick={() => toggleDrill(idx)}
            >
              <span className="l21-drill-i">{item.i}</span>
              <span className="l21-drill-sep">→</span>
              <span className="l21-drill-she">
                {drillOpen.includes(idx) ? item.she : "tap after you say it"}
              </span>
            </button>
          ))}
        </div>

        <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
          Negative & question forms
        </h3>
        <div className="l21-drill-list">
          {negativeQuestionDrills.map((item) => (
            <div key={item.text} className="l21-drill-row l21-drill-row--open" style={{ cursor: "default" }}>
              <span className="l21-drill-i">{item.text}</span>
              <span className="l21-drill-she" style={{ fontStyle: "normal", fontWeight: 600, fontSize: "0.85rem" }}>
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Controlled practice 2: Verb sorting */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <h2>2) Verb sorting</h2>
          <p className="lesson21-section-desc">
            Click a verb, then click the correct column. After sorting — read each column aloud in full sentences.
          </p>
        </div>

        <div className="l21-sort-bank">
          {sortWords.map((w) => {
            const placed = sortPlaced[w.word];
            return (
              <button
                key={w.word}
                type="button"
                className={`l21-sort-word ${sortSelected === w.word ? "selected" : ""} ${placed ? "placed" : ""}`}
                disabled={!!placed}
                onClick={() => setSortSelected(w.word)}
              >
                {w.word}
              </button>
            );
          })}
        </div>

        <div className="l21-sort-columns">
          {(["s", "es", "ies", "has"] as const).map((bucket) => (
            <div
              key={bucket}
              className={`l21-sort-col ${sortSelected ? "active" : ""}`}
              onClick={() => placeWord(bucket)}
              onKeyDown={(e) => e.key === "Enter" && placeWord(bucket)}
              role="button"
              tabIndex={0}
            >
              <h4>{bucket === "has" ? "has" : `-${bucket}`}</h4>
              <div className="l21-sort-col-items">
                {Object.entries(sortPlaced)
                  .filter(([, b]) => b === bucket)
                  .map(([word]) => (
                    <span key={word} className="l21-sort-tag">
                      {word}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" className="l21-btn" onClick={() => setSortChecked(true)}>
            Check sorting
          </button>
          <button
            type="button"
            className="l21-btn l21-btn--ghost"
            onClick={() => {
              setSortPlaced({});
              setSortChecked(false);
              setSortSelected(null);
            }}
          >
            Reset
          </button>
        </div>
        {sortChecked && (
          <p className="l21-score">
            Score: {sortScore} / {sortWords.length}
          </p>
        )}

        <h3 style={{ marginTop: "1.25rem", fontSize: "1rem" }}>Read aloud — example sentences</h3>
        <div className="l21-can-rules">
          {Object.entries(sortSentences).map(([key, sents]) => (
            <div key={key} className="l21-can-rule">
              <h4>{key === "has" ? "has" : `-${key}`}</h4>
              {sents.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Controlled practice 3: Missing verb */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <h2>3) Missing verb</h2>
          <p className="lesson21-section-desc">
            Write the correct form, then read the full sentence aloud.
          </p>
        </div>
        <div className="l21-gap-list">
          {gapItems.map((item, idx) => {
            const val = gapAnswers[idx] ?? "";
            const ok =
              gapChecked &&
              val.trim().toLowerCase() === item.answer.toLowerCase();
            const bad = gapChecked && val && !ok;
            return (
              <div key={item.sentence} className="l21-gap-row">
                <span className="l21-gap-text">{item.sentence}</span>
                <input
                  className={`l21-gap-input ${ok ? "l21-gap-ok" : bad ? "l21-gap-bad" : ""}`}
                  value={val}
                  onChange={(e) =>
                    setGapAnswers((p) => ({ ...p, [idx]: e.target.value }))
                  }
                  placeholder="verb"
                  spellCheck={false}
                />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
          <button type="button" className="l21-btn" onClick={() => setGapChecked(true)}>
            Check
          </button>
          <button
            type="button"
            className="l21-btn l21-btn--ghost"
            onClick={() => {
              setGapAnswers({});
              setGapChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        {gapChecked && (
          <p className="l21-score">
            Score: {gapScore} / {gapItems.length}
          </p>
        )}
      </section>

      {/* Speaking */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Task-based speaking</h2>
          <p className="lesson21-section-desc">
            Complete both tasks out loud — not just describe, but fulfil the brief.
          </p>
        </div>
        <div className="lesson21-prompt-grid">
          <div className="lesson21-prompt-card lesson21-prompt-card--task">
            <strong>Task 1</strong>
            Tell me <strong>5 facts</strong> about your brother, sister, or a close friend.
            <br />
            <em>Use: works, lives, likes, has, goes…</em>
          </div>
          <div className="lesson21-prompt-card lesson21-prompt-card--task">
            <strong>Task 2 — Compare</strong>
            Compare <strong>your routine</strong> with <strong>your sister's / brother's routine</strong>.
            <br />
            <em>I get up at… but she gets up at…</em>
          </div>
          <div className="lesson21-prompt-card lesson21-prompt-card--task">
            <strong>Can — ability</strong>
            Say 3 things you <strong>can</strong> do and 2 things you <strong>can't</strong> do yet.
          </div>
          <div className="lesson21-prompt-card lesson21-prompt-card--task">
            <strong>Can — request</strong>
            Ask your teacher: <em>Can you…?</em> (help me / repeat / explain)
          </div>
        </div>
      </section>

      {/* Listening */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Listening</p>
          <h2>Listen and reconstruct</h2>
          <p className="lesson21-section-desc">
            Teacher reads the sentence. Student: underline the verb → say he/she/it → repeat with correct -s → answer the question.
          </p>
        </div>
        <div className="l21-listen-list">
          {listenItems.map((item, idx) => {
            const st = listenState[idx] ?? {
              underlined: false,
              subject: "",
              verb: "",
              answered: false,
            };
            return (
              <article key={item.sentence} className="l21-listen-card">
                <p className="l21-listen-sentence">
                  {st.underlined ? (
                    <>
                      {item.sentence.split(item.verb)[0]}
                      <u>{item.verb}</u>
                      {item.sentence.split(item.verb)[1]}
                    </>
                  ) : (
                    item.sentence
                  )}
                </p>

                <div className="l21-listen-steps">
                  <span className={`l21-listen-step ${st.underlined ? "done" : ""}`}>
                    1 underline verb
                  </span>
                  <span className={`l21-listen-step ${st.subject ? "done" : ""}`}>
                    2 he/she/it
                  </span>
                  <span className={`l21-listen-step ${st.verb ? "done" : ""}`}>
                    3 repeat verb
                  </span>
                  <span className={`l21-listen-step ${st.answered ? "done" : ""}`}>
                    4 answer
                  </span>
                </div>

                <div className="l21-listen-actions">
                  {!st.underlined && (
                    <button
                      type="button"
                      className="l21-btn"
                      onClick={() => updateListen(idx, { underlined: true })}
                    >
                      Step 1: underline verb
                    </button>
                  )}
                  {st.underlined && !st.subject && (
                    <div className="l21-choice-row">
                      {(["he", "she", "it"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`l21-choice-btn ${st.subject === s ? "selected" : ""}`}
                          onClick={() => updateListen(idx, { subject: s })}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  {st.subject && !st.verb && (
                    <div className="l21-choice-row">
                      {listenVerbOptions(item.verb).map((v) => (
                        <button
                          key={v}
                          type="button"
                          className="l21-choice-btn"
                          onClick={() => updateListen(idx, { verb: v })}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  )}
                  {st.verb && st.verb !== item.verb && (
                    <p style={{ margin: 0, color: "var(--color-error)", fontWeight: 700 }}>
                      Try again → correct: <strong>{item.verb}</strong>
                      <button
                        type="button"
                        className="l21-btn l21-btn--ghost"
                        style={{ marginLeft: "0.5rem" }}
                        onClick={() => updateListen(idx, { verb: "" })}
                      >
                        Retry
                      </button>
                    </p>
                  )}
                  {st.verb === item.verb && !st.answered && (
                    <button
                      type="button"
                      className="l21-btn"
                      onClick={() => updateListen(idx, { answered: true })}
                    >
                      ✓ Repeat sentence — answer question
                    </button>
                  )}
                  {st.answered && (
                    <>
                      <p style={{ margin: 0, fontWeight: 700 }}>{item.question}</p>
                      <p style={{ margin: "0.35rem 0 0", color: "var(--color-text-muted)" }}>
                        Model: {item.answer}
                      </p>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Can exercises (from Can.tsx) */}
      <section className="lesson21-block panel reveal-on-scroll lesson21-can-wrap">
        <div className="lesson21-section-head">
          <p className="page-kicker">Can practice</p>
          <h2>Can or can't?</h2>
          <p className="lesson21-section-desc">Interactive exercises — choose the correct form.</p>
        </div>

        <div className="lesson19-sort-grid">
          {canSortItems.map((item) => {
            const selected = canSort[item.text];
            const isCorrect = selected === item.answer;
            return (
              <article className="lesson19-sort-row" key={item.text}>
                <span className="lesson19-sort-text">{item.text}</span>
                <div className="lesson19-choice-row">
                  {(["can", "can't"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice-btn ${selected === opt ? "selected" : ""}`}
                      onClick={() =>
                        setCanSort((p) => ({ ...p, [item.text]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {selected && (
                  <span className={`lesson19-check ${isCorrect ? "ok" : "bad"}`}>
                    {isCorrect ? "✓" : "Try again"}
                  </span>
                )}
              </article>
            );
          })}
        </div>
        <p className="l21-score">Score: {canSortScore} / {canSortItems.length}</p>

        <h3 style={{ marginTop: "1.5rem" }}>Choose the right word</h3>
        <div className="lesson19-choose-list">
          {canChooseItems.map((item, index) => {
            const selected = canChoose[index];
            const isCorrect = selected === item.answer;
            return (
              <article className="lesson19-choose-card" key={item.sentence}>
                <p className="lesson19-choose-sentence">{item.sentence}</p>
                <div className="lesson19-choice-row">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice-btn ${selected === opt ? "selected" : ""}`}
                      onClick={() =>
                        setCanChoose((p) => ({ ...p, [index]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showCanChoose && (
                  <div className={`lesson19-answer ${isCorrect ? "ok" : "bad"}`}>
                    Correct: <strong>{item.answer}</strong>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="l21-btn"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowCanChoose(true)}
        >
          Check can answers
        </button>
        {showCanChoose && (
          <p className="l21-score">Score: {canChooseScore} / {canChooseItems.length}</p>
        )}
      </section>

      {/* Homework */}
      <section className="lesson21-block panel reveal-on-scroll">
        <div className="lesson21-section-head">
          <p className="page-kicker">Homework</p>
          <h2>After class</h2>
        </div>
        <div className="l21-homework-grid">
          <div className="l21-homework-card">
            <h3>Third person</h3>
            <ul>
              <li>Write 8 sentences about a family member (he/she).</li>
              <li>Write 4 questions with Does…?</li>
              <li>Write 4 negative sentences with doesn't.</li>
            </ul>
          </div>
          <div className="l21-homework-card">
            <h3>Can</h3>
            <ul>
              <li>Write 5 can and 5 can't sentences.</li>
              <li>Write 3 polite Can you…? requests.</li>
            </ul>
          </div>
          <div className="l21-homework-card">
            <h3>Speak</h3>
            <ul>
              <li>Voice message: 5 facts about your brother/sister.</li>
              <li>Compare your routine with someone in your family.</li>
              <li>3 can / can't + 2 Can you…? questions.</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link className="lesson21-back-link" to="/trainer">
            Open trainer
          </Link>
          <Link className="lesson21-back-link lesson21-back-link--ghost" to="/homework">
            Homework page
          </Link>
        </div>
      </section>
    </div>
  );
}
