import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson20.css";

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const prepItems = [
  { id: 1, before: "I wake up", after: "7 o'clock.", answer: "at" },
  { id: 2, before: "I study English", after: "Monday.", answer: "on" },
  { id: 3, before: "She lives", after: "Kyiv.", answer: "in" },
  { id: 4, before: "We relax", after: "the weekend.", answer: "at" },
];

const toPlaces = [
  { id: 1, word: "work", correct: true },
  { id: 2, word: "school", correct: true },
  { id: 3, word: "the gym", correct: true },
  { id: 4, word: "home", correct: false },
  { id: 5, word: "the cinema", correct: true },
  { id: 6, word: "here", correct: false },
  { id: 7, word: "the office", correct: true },
  { id: 8, word: "there", correct: false },
];

const doMakeItems = [
  { id: 1, word: "a mistake", answer: "make" },
  { id: 2, word: "homework", answer: "do" },
  { id: 3, word: "a cake", answer: "make" },
  { id: 4, word: "yoga", answer: "do" },
  { id: 5, word: "friends", answer: "make" },
  { id: 6, word: "exercise", answer: "do" },
  { id: 7, word: "the dishes", answer: "do" },
  { id: 8, word: "noise", answer: "make" },
  { id: 9, word: "a decision", answer: "make" },
  { id: 10, word: "sport", answer: "do" },
];

const flashcards = [
  { id: 1,  img: "wake-up.webp",        ua: "прокидатися",       i: "I wake up",        she: "She wakes up" },
  { id: 2,  img: "get-up.webp",         ua: "вставати",          i: "I get up",         she: "He gets up" },
  { id: 3,  img: "take-a-shower.jfif",  ua: "приймати душ",      i: "I take a shower",  she: "She takes a shower" },
  { id: 4,  img: "brush-teeth.webp",    ua: "чистити зуби",      i: "I brush my teeth", she: "He brushes his teeth" },
  { id: 5,  img: "get-dressed.webp",    ua: "одягатися",         i: "I get dressed",    she: "She gets dressed" },
  { id: 6,  img: "have-breakfast.webp", ua: "снідати",           i: "I have breakfast", she: "He has breakfast" },
  { id: 7,  img: "go-to-work.webp",     ua: "іти на роботу",     i: "I go to work",     she: "She goes to work" },
  { id: 8,  img: "work.jpg",            ua: "працювати",         i: "I work",           she: "He works" },
  { id: 9,  img: "have-lunch.webp",     ua: "обідати",           i: "I have lunch",     she: "She has lunch" },
  { id: 10, img: "cook.webp",           ua: "готувати їжу",      i: "I cook",           she: "He cooks" },
  { id: 11, img: "at-the-gym.webp",     ua: "робити вправи",     i: "I do exercises",   she: "She does exercises" },
  { id: 12, img: "do-homework.webp",    ua: "вчитися",           i: "I study",          she: "He studies" },
  { id: 13, img: "have-dinner.webp",    ua: "вечеряти",          i: "I have dinner",    she: "She has dinner" },
  { id: 14, img: "watch-tv.webp",       ua: "дивитися телевізор", i: "I watch TV",      she: "He watches TV" },
  { id: 15, img: "read.jpg",            ua: "читати",            i: "I read",           she: "She reads" },
  { id: 16, img: "sleep.webp",          ua: "спати",             i: "I sleep",          she: "He sleeps" },
];

const verbExercise = [
  { id: 1,  base: "go",     options: ["goes", "gos", "go", "going"],             answer: "goes" },
  { id: 2,  base: "watch",  options: ["watchs", "watches", "watch", "watched"],  answer: "watches" },
  { id: 3,  base: "study",  options: ["studys", "studies", "study", "studed"],   answer: "studies" },
  { id: 4,  base: "have",   options: ["have", "haves", "has", "having"],         answer: "has" },
  { id: 5,  base: "brush",  options: ["brushs", "brush", "brushes", "brushed"],  answer: "brushes" },
  { id: 6,  base: "drink",  options: ["drink", "drinks", "drinkes", "drinking"], answer: "drinks" },
  { id: 7,  base: "work",   options: ["workes", "working", "work", "works"],     answer: "works" },
  { id: 8,  base: "do",     options: ["do", "doos", "doing", "does"],            answer: "does" },
  { id: 9,  base: "sleep",  options: ["sleepes", "sleeping", "sleeps", "sleep"], answer: "sleeps" },
  { id: 10, base: "get up", options: ["get ups", "gets up", "get up", "getting up"], answer: "gets up" },
];

const drills = [
  { i: "I work in a bank.",             she: "He works in a bank." },
  { i: "I go to school at 8.",          she: "She goes to school at 8." },
  { i: "I watch TV in the evening.",    she: "He watches TV in the evening." },
  { i: "I study English on Monday.",    she: "She studies English on Monday." },
  { i: "I don't like coffee.",          she: "He doesn't like coffee." },
  { i: "Do you play tennis?",           she: "Does she play tennis?" },
];

const speakingLines = [
  "My mother works in a hospital.",
  "She gets up at 6 o'clock.",
  "She likes coffee.",
  "She doesn't like cold weather.",
  "She speaks Ukrainian and English.",
];

export default function Lesson20() {
  // Flashcards
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggleFlip = (id: number) =>
    setFlipped((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // Verb exercise
  const [verbAnswers, setVerbAnswers] = useState<Record<number, string>>({});
  const [showVerbAnswers, setShowVerbAnswers] = useState(false);
  const verbAllDone = verbExercise.every((i) => verbAnswers[i.id]);
  const verbScore = useMemo(
    () => verbExercise.filter((i) => verbAnswers[i.id] === i.answer).length,
    [verbAnswers],
  );

  // Review: prepositions
  const [prepSelected, setPrepSelected] = useState<Record<number, string>>({});
  const prepAllDone = prepItems.every((item) => prepSelected[item.id]);
  const prepScore = useMemo(
    () => prepItems.filter((item) => prepSelected[item.id] === item.answer).length,
    [prepSelected],
  );

  // Review: "to" places
  const [toSelected, setToSelected] = useState<number[]>([]);
  const [toChecked, setToChecked] = useState(false);
  const toggleTo = (id: number) => {
    setToChecked(false);
    setToSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Review: do / make
  const [doMake, setDoMake] = useState<Record<number, "do" | "make" | "">>(() =>
    Object.fromEntries(doMakeItems.map((i) => [i.id, ""])),
  );
  const [showDoMakeAnswers, setShowDoMakeAnswers] = useState(false);
  const cycleDoMake = (id: number) => {
    setShowDoMakeAnswers(false);
    setDoMake((prev) => {
      const cur = prev[id];
      return { ...prev, [id]: cur === "" ? "do" : cur === "do" ? "make" : "" };
    });
  };
  const doMakeAllDone = doMakeItems.every((i) => doMake[i.id] !== "");
  const doMakeScore = useMemo(
    () => doMakeItems.filter((i) => doMake[i.id] === i.answer).length,
    [doMake],
  );

  // Drills: show/hide she form
  const [drillRevealed, setDrillRevealed] = useState<number[]>([]);
  const toggleDrill = (idx: number) =>
    setDrillRevealed((p) => (p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx]));

  return (
    <div className="lesson20-page">

      {/* ── Hero ── */}
      <section className="lesson20-hero panel">
        <div className="lesson20-hero-top">
          <div>
            <p className="page-kicker">Lesson 20</p>
            <h1>He / She / It + Present Simple</h1>
            <p className="lesson20-subtitle">
              Move from talking about your own routine to describing another
              person — a friend, family member, or colleague.
            </p>
          </div>
          <div className="lesson20-nav">
            <Link className="lesson20-back-link" to="/lessons">← Lessons</Link>
            <Link className="lesson20-back-link lesson20-back-link--ghost" to="/">Home</Link>
          </div>
        </div>
        <div className="lesson20-hero-chips">
          <span>He works</span>
          <span>She doesn't</span>
          <span>Does he…?</span>
          <span>She lives</span>
          <span>He goes</span>
        </div>
      </section>

      {/* ── Warm-up ── */}
      <section className="lesson20-block panel">
        <div className="lesson20-section-head">
          <div>
            <p className="page-kicker">Warm-up</p>
            <h2>How are you? How do you feel?</h2>
            <p className="lesson20-section-desc">
              Start with a short chat about your day, your feelings, and your family.
            </p>
          </div>
          <Link className="lesson20-back-link" to="/about-me">About Me →</Link>
        </div>
        <div className="lesson20-prompt-grid">
          {["How are you today?", "How do you feel today?", "Tell me about your family.", "Who do you live with?"].map((q) => (
            <div key={q} className="lesson20-prompt-card">{q}</div>
          ))}
        </div>
      </section>

      {/* ── Review 19 ── */}
      <section className="lesson20-block panel">
        <div className="lesson20-section-head">
          <div>
            <p className="page-kicker">Review 19</p>
            <h2>Quick prepositions + do/make recap</h2>
          </div>
        </div>

        <h3 className="l20-ex-title">1. Choose at, in, or on</h3>
        <div className="l20-prep-list">
          {prepItems.map((item) => {
            const chosen = prepSelected[item.id];
            const isCorrect = chosen === item.answer;
            return (
              <div key={item.id} className="l20-prep-row">
                <span className="l20-prep-text">
                  {item.before}{" "}
                  <span className={`l20-blank ${chosen ? (prepAllDone ? (isCorrect ? "l20-blank--ok" : "l20-blank--bad") : "l20-blank--filled") : ""}`}>
                    {chosen || "___"}
                  </span>{" "}
                  {item.after}
                </span>
                <div className="l20-choices">
                  {["at", "in", "on"].map((opt) => (
                    <button key={opt} type="button"
                      className={`l20-choice-btn ${chosen === opt ? "l20-choice-btn--on" : ""}`}
                      onClick={() => setPrepSelected((p) => ({ ...p, [item.id]: opt }))}
                    >{opt}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {prepAllDone && <p className="l20-score">Score: {prepScore} / {prepItems.length}</p>}

        <h3 className="l20-ex-title">2. Select places that go with "to"</h3>
        <p className="l20-hint">Click the words you can say "go to ___".</p>
        <div className="l20-chips">
          {toPlaces.map((item) => {
            const selected = toSelected.includes(item.id);
            const rc = toChecked
              ? selected && item.correct ? "l20-chip--ok"
                : selected && !item.correct ? "l20-chip--bad"
                : !selected && item.correct ? "l20-chip--missed" : ""
              : selected ? "l20-chip--on" : "";
            return (
              <button key={item.id} type="button" className={`l20-chip ${rc}`} onClick={() => toggleTo(item.id)}>
                {item.word}
              </button>
            );
          })}
        </div>
        <div className="l20-actions">
          <button type="button" className="l20-btn" onClick={() => setToChecked(true)} disabled={toSelected.length === 0}>Check</button>
          <button type="button" className="l20-btn l20-btn--ghost" onClick={() => { setToSelected([]); setToChecked(false); }}>Reset</button>
        </div>

        <h3 className="l20-ex-title">3. Do or make?</h3>
        <p className="l20-hint">Click each word to cycle: <strong>do</strong> → <strong>make</strong> → unassigned.</p>
        <div className="l20-chips">
          {doMakeItems.map((item) => {
            const val = doMake[item.id];
            const isCorrect = val === item.answer;
            const rc = showDoMakeAnswers && val
              ? isCorrect ? "l20-chip--ok" : "l20-chip--bad"
              : val === "do" ? "l20-chip--do" : val === "make" ? "l20-chip--make" : "";
            return (
              <button key={item.id} type="button" className={`l20-chip ${rc}`} onClick={() => cycleDoMake(item.id)}>
                {val ? <span className="l20-chip-label">{val}</span> : null}
                {item.word}
              </button>
            );
          })}
        </div>
        <div className="l20-actions">
          <button type="button" className="l20-btn" onClick={() => setShowDoMakeAnswers(true)} disabled={!doMakeAllDone}>Check</button>
          <button type="button" className="l20-btn l20-btn--ghost" onClick={() => { setDoMake(Object.fromEntries(doMakeItems.map((i) => [i.id, ""]))); setShowDoMakeAnswers(false); }}>Reset</button>
        </div>
        {showDoMakeAnswers && <p className="l20-score">Score: {doMakeScore} / {doMakeItems.length}</p>}
      </section>

      {/* ── Grammar input ── */}
      <section className="lesson20-block panel">
        <div className="lesson20-section-head">
          <div>
            <p className="page-kicker">Grammar input</p>
            <h2>He / She / It + -s / -es</h2>
            <p className="lesson20-section-desc">
              In the present simple, add <strong>-s</strong> or <strong>-es</strong> to the verb with he, she, or it.
            </p>
          </div>
        </div>

        <div className="l20-rule-row">
          <div className="l20-rule-box">
            <p className="l20-rule-label">Rule</p>
            <p>I work → <strong>He works</strong></p>
            <p>I go → <strong>She goes</strong></p>
            <p>I watch → <strong>He watches</strong></p>
            <p>I study → <strong>She studies</strong></p>
            <p>I have → <strong>He has</strong></p>
          </div>
          <div className="l20-rule-box">
            <p className="l20-rule-label">Sentences</p>
            <p>She <strong>works</strong> every day.</p>
            <p>She <strong>doesn't</strong> work on Sunday.</p>
            <p><strong>Does</strong> she work in the city?</p>
          </div>
        </div>

        {/* Spelling table */}
        <div className="l20-spell-table">
          <div className="l20-spell-head l20-spell-head--inf">Infinitive</div>
          <div className="l20-spell-head l20-spell-head--she">He / She / It</div>
          <div className="l20-spell-head l20-spell-head--rule">Spelling</div>

          <div className="l20-spell-cell">play<br />work</div>
          <div className="l20-spell-cell l20-spell-cell--she">play<strong>s</strong><br />work<strong>s</strong></div>
          <div className="l20-spell-cell l20-spell-rule">general rule — add <strong>-s</strong></div>

          <div className="l20-spell-cell">watch<br />miss</div>
          <div className="l20-spell-cell l20-spell-cell--she">watch<strong>es</strong><br />miss<strong>es</strong></div>
          <div className="l20-spell-rule">after <strong>-s, -ch, -sh, -z</strong> — add <strong>-es</strong></div>

          <div className="l20-spell-cell">study<br />try</div>
          <div className="l20-spell-cell l20-spell-cell--she">studi<strong>es</strong><br />tri<strong>es</strong></div>
          <div className="l20-spell-rule">consonant + <strong>-y</strong> → delete <em>y</em>, add <strong>-ies</strong></div>

          <div className="l20-spell-cell">do<br />go</div>
          <div className="l20-spell-cell l20-spell-cell--she">do<strong>es</strong><br />go<strong>es</strong></div>
          <div className="l20-spell-rule">after <strong>-o</strong> — add <strong>-es</strong></div>

          <div className="l20-spell-cell">have</div>
          <div className="l20-spell-cell l20-spell-cell--she"><strong>has</strong></div>
          <div className="l20-spell-rule">irregular form</div>
        </div>

        <div className="l20-spell-note">
          <p className="l20-spell-note-title">
            Use <strong>DOES</strong> or <strong>DOESN'T</strong> + infinitive (no -s) in questions and negatives
          </p>
          <div className="l20-spell-examples">
            <div className="l20-spell-ex l20-spell-ex--bad">
              <span className="l20-spell-icon">✗</span> The hotel doesn't <u>has</u> a spa.
            </div>
            <div className="l20-spell-ex l20-spell-ex--bad">
              <span className="l20-spell-icon">✗</span> Does Suzan <u>works</u> in your office?
            </div>
            <div className="l20-spell-ex l20-spell-ex--ok">
              <span className="l20-spell-icon">✓</span> The hotel doesn't <strong>have</strong> a spa.
            </div>
            <div className="l20-spell-ex l20-spell-ex--ok">
              <span className="l20-spell-icon">✓</span> Does Suzan <strong>work</strong> in your office?
            </div>
          </div>
        </div>

        <h3 className="l20-ex-title">Visual flashcards</h3>
        <p className="l20-hint">Tap a card — front shows the picture, back shows I… and She/He…</p>
        <div className="l20-flashcard-grid">
          {flashcards.map((card) => {
            const isFlipped = flipped.includes(card.id);
            return (
              <button key={card.id} type="button"
                className={`l20-flashcard ${isFlipped ? "l20-flashcard--flipped" : ""}`}
                onClick={() => toggleFlip(card.id)}
              >
                <div className="l20-flashcard-inner">
                  <div className="l20-flashcard-face l20-flashcard-front">
                    <img src={IMG(card.img)} alt={card.i} />
                    <span className="l20-fc-ua">{card.ua}</span>
                  </div>
                  <div className="l20-flashcard-face l20-flashcard-back">
                    <span className="l20-fc-i">{card.i}</span>
                    <span className="l20-fc-arrow">→</span>
                    <span className="l20-fc-she">{card.she}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lesson20-section-head" style={{ marginTop: "1.8rem" }}>
          <div>
            <h3 className="l20-ex-title" style={{ margin: 0 }}>Practice: I → She / He</h3>
            <p className="l20-hint" style={{ margin: "4px 0 0" }}>Choose the correct form.</p>
          </div>
          <div className="l20-actions" style={{ margin: 0 }}>
            <button type="button" className="l20-btn" onClick={() => setShowVerbAnswers(true)} disabled={!verbAllDone}>Check</button>
            <button type="button" className="l20-btn l20-btn--ghost" onClick={() => { setVerbAnswers({}); setShowVerbAnswers(false); }}>Reset</button>
          </div>
        </div>
        <div className="l20-verb-list">
          {verbExercise.map((item) => {
            const chosen = verbAnswers[item.id];
            const isCorrect = chosen === item.answer;
            return (
              <div key={item.id} className="l20-verb-row">
                <span className="l20-verb-prompt">I <strong>{item.base}</strong> → She</span>
                <div className="l20-choices">
                  {item.options.map((opt) => {
                    const picked = chosen === opt;
                    const rc = showVerbAnswers && picked
                      ? isCorrect ? "l20-choice-btn--ok" : "l20-choice-btn--bad"
                      : picked ? "l20-choice-btn--on" : "";
                    return (
                      <button key={opt} type="button" className={`l20-choice-btn ${rc}`}
                        onClick={() => setVerbAnswers((p) => ({ ...p, [item.id]: opt }))}
                      >{opt}</button>
                    );
                  })}
                </div>
                {showVerbAnswers && !isCorrect && chosen && (
                  <span className="l20-verb-hint">→ {item.answer}</span>
                )}
              </div>
            );
          })}
        </div>
        {showVerbAnswers && <p className="l20-score">Score: {verbScore} / {verbExercise.length}</p>}
      </section>

      {/* ── Guided practice ── */}
      <section className="lesson20-block panel">
        <div className="lesson20-section-head">
          <div>
            <p className="page-kicker">Guided practice</p>
            <h2>Sentence transformation drills</h2>
            <p className="lesson20-section-desc">Read the I-sentence, then tap to reveal the She/He form.</p>
          </div>
        </div>
        <div className="l20-drill-list">
          {drills.map((item, idx) => (
            <button key={idx} type="button" className={`l20-drill-row ${drillRevealed.includes(idx) ? "l20-drill-row--open" : ""}`}
              onClick={() => toggleDrill(idx)}
            >
              <span className="l20-drill-i">{item.i}</span>
              <span className="l20-drill-sep">→</span>
              <span className="l20-drill-she">
                {drillRevealed.includes(idx) ? item.she : "tap to see"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Speaking ── */}
      <section className="lesson20-block panel">
        <div className="lesson20-section-head">
          <div>
            <p className="page-kicker">Speaking block</p>
            <h2>Describe a friend or family member</h2>
            <p className="lesson20-section-desc">Use these sentences as a model. Change the person and details.</p>
          </div>
        </div>
        <div className="lesson20-prompt-grid">
          {speakingLines.map((line) => (
            <div key={line} className="lesson20-prompt-card lesson20-prompt-card--white">{line}</div>
          ))}
        </div>
      </section>

    </div>
  );
}
