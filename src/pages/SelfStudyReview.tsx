import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { saveAboutMeSubmission } from "../services/writingSubmissions";
import "../styles/selfStudy.css";

type McItem = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  tag: string;
};

const toBeItems: McItem[] = [
  {
    id: 1,
    text: "I ___ a student.",
    options: ["am", "is", "are"],
    answer: "am",
    tag: "to be",
  },
  {
    id: 2,
    text: "She ___ from Ukraine.",
    options: ["am", "is", "are"],
    answer: "is",
    tag: "to be",
  },
  {
    id: 3,
    text: "We ___ friends.",
    options: ["am", "is", "are"],
    answer: "are",
    tag: "to be",
  },
  {
    id: 4,
    text: "My brother ___ 25 years old.",
    options: ["am", "is", "are"],
    answer: "is",
    tag: "to be",
  },
  {
    id: 5,
    text: "They ___ at home now.",
    options: ["am", "is", "are"],
    answer: "are",
    tag: "to be",
  },
  {
    id: 6,
    text: "It ___ Monday today.",
    options: ["am", "is", "are"],
    answer: "is",
    tag: "to be",
  },
  {
    id: 7,
    text: "You ___ very kind.",
    options: ["am", "is", "are"],
    answer: "are",
    tag: "to be",
  },
  {
    id: 8,
    text: "I ___ tired after work.",
    options: ["am", "is", "are"],
    answer: "am",
    tag: "to be",
  },
];

const routineOrder = [
  "wake up",
  "get up",
  "have breakfast",
  "go to work",
  "have lunch",
  "go home",
  "have dinner",
  "go to bed",
];

const transformDrills = [
  { i: "I wake up at 7.", she: "She wakes up at 7." },
  { i: "I go to work at 9.", she: "He goes to work at 9." },
  { i: "I have lunch at 1.", she: "She has lunch at 1." },
  { i: "I watch TV in the evening.", she: "He watches TV in the evening." },
  { i: "I don't work on Sunday.", she: "She doesn't work on Sunday." },
  { i: "Do you study English?", she: "Does he study English?" },
  { i: "I live in Kyiv.", she: "She lives in Kyiv." },
  { i: "I brush my teeth.", she: "He brushes his teeth." },
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
  { word: "has", bucket: "has" },
];

const mixedItems: McItem[] = [
  {
    id: 1,
    text: "He ___ to work at 8.",
    options: ["go", "goes", "going"],
    answer: "goes",
    tag: "3rd person",
  },
  {
    id: 2,
    text: "I ___ breakfast at home.",
    options: ["have", "has", "haves"],
    answer: "have",
    tag: "I / you",
  },
  {
    id: 3,
    text: "She ___ TV every evening.",
    options: ["watch", "watchs", "watches"],
    answer: "watches",
    tag: "3rd person",
  },
  {
    id: 4,
    text: "___ your friend live near you?",
    options: ["Do", "Does", "Is"],
    answer: "Does",
    tag: "question",
  },
  {
    id: 5,
    text: "They ___ English on Monday.",
    options: ["study", "studies", "studys"],
    answer: "study",
    tag: "plural",
  },
  {
    id: 6,
    text: "My mother ___ dinner at 7.",
    options: ["have", "has", "haves"],
    answer: "has",
    tag: "3rd person",
  },
  {
    id: 7,
    text: "We ___ home at 6.",
    options: ["go", "goes", "going"],
    answer: "go",
    tag: "plural",
  },
  {
    id: 8,
    text: "He ___ English very well.",
    options: ["speak", "speaks", "speaking"],
    answer: "speaks",
    tag: "3rd person",
  },
  {
    id: 9,
    text: "___ you a teacher?",
    options: ["Am", "Is", "Are"],
    answer: "Are",
    tag: "to be",
  },
  {
    id: 10,
    text: "It ___ a lot in autumn.",
    options: ["rain", "rains", "raines"],
    answer: "rains",
    tag: "3rd person",
  },
];

type BuilderTask = {
  id: number;
  words: string[];
  answer: string;
  tag: string;
};

const builderTasks: BuilderTask[] = [
  {
    id: 1,
    words: ["am", "I", "student.", "a"],
    answer: "I am a student.",
    tag: "to be",
  },
  {
    id: 2,
    words: ["from", "She", "Kyiv.", "is"],
    answer: "She is from Kyiv.",
    tag: "to be",
  },
  {
    id: 3,
    words: ["up", "I", "at", "7.", "wake"],
    answer: "I wake up at 7.",
    tag: "routine",
  },
  {
    id: 4,
    words: ["work", "goes", "to", "He", "at", "9."],
    answer: "He goes to work at 9.",
    tag: "3rd person",
  },
  {
    id: 5,
    words: ["breakfast", "have", "We", "home.", "at"],
    answer: "We have breakfast at home.",
    tag: "routine",
  },
  {
    id: 6,
    words: ["bed", "go", "to", "I", "at", "11."],
    answer: "I go to bed at 11.",
    tag: "routine",
  },
];

const fixItems = [
  {
    id: 1,
    sentence: "She are from Poland.",
    wrong: "are",
    correct: "is",
    options: ["She", "are", "from", "Poland."],
  },
  {
    id: 2,
    sentence: "He go to work at 8.",
    wrong: "go",
    correct: "goes",
    options: ["He", "go", "to", "work", "at", "8."],
  },
  {
    id: 3,
    sentence: "I has breakfast at 7.",
    wrong: "has",
    correct: "have",
    options: ["I", "has", "breakfast", "at", "7."],
  },
  {
    id: 4,
    sentence: "They watches TV every day.",
    wrong: "watches",
    correct: "watch",
    options: ["They", "watches", "TV", "every", "day."],
  },
  {
    id: 5,
    sentence: "My brother work in a bank.",
    wrong: "work",
    correct: "works",
    options: ["My", "brother", "work", "in", "a", "bank."],
  },
];

const prepItems: McItem[] = [
  {
    id: 1,
    text: "I wake up ___ 7 o'clock.",
    options: ["at", "in", "on"],
    answer: "at",
    tag: "time",
  },
  {
    id: 2,
    text: "I study English ___ Monday.",
    options: ["at", "in", "on"],
    answer: "on",
    tag: "day",
  },
  {
    id: 3,
    text: "She lives ___ Kyiv.",
    options: ["at", "in", "on"],
    answer: "in",
    tag: "place",
  },
  {
    id: 4,
    text: "We have lunch ___ the afternoon.",
    options: ["at", "in", "on"],
    answer: "in",
    tag: "part of day",
  },
  {
    id: 5,
    text: "I am ___ home now.",
    options: ["at", "in", "on"],
    answer: "at",
    tag: "place",
  },
  {
    id: 6,
    text: "My birthday is ___ June.",
    options: ["at", "in", "on"],
    answer: "in",
    tag: "month",
  },
  {
    id: 7,
    text: "He works ___ Friday.",
    options: ["at", "in", "on"],
    answer: "on",
    tag: "day",
  },
  {
    id: 8,
    text: "The book is ___ the table.",
    options: ["at", "in", "on"],
    answer: "on",
    tag: "place",
  },
  {
    id: 9,
    text: "They are ___ school.",
    options: ["at", "in", "on"],
    answer: "at",
    tag: "place",
  },
  {
    id: 10,
    text: "I go to bed ___ night.",
    options: ["at", "in", "on"],
    answer: "at",
    tag: "time",
  },
];

const WRITING_STORAGE_KEY = "self-study-writing-draft";
const ABOUT_ME_MIN = 4;
const FAMILY_MIN = 3;

const aboutMePrompts = [
  "Як тебе звати? Скільки тобі років?",
  "Звідки ти? Де живеш?",
  "Чим займаєшся (робота / навчання)?",
  "Яка твоя рутина вранці?",
  "Що ти любиш робити у вільний час?",
];

const familyPrompts = [
  "Скільки людей у твоїй сім'ї?",
  "Хто вони? (мама, тато, брат, сестра…)",
  "Де вони живуть? Чим займаються?",
  "Опиши одного члена сім'ї: he/she + -s",
];

function countSentences(text: string) {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean).length;
}

function loadWritingDraft() {
  try {
    const raw = localStorage.getItem(WRITING_STORAGE_KEY);
    if (!raw) return { aboutMe: "", family: "" };
    const parsed = JSON.parse(raw) as { aboutMe?: string; family?: string };
    return {
      aboutMe: parsed.aboutMe ?? "",
      family: parsed.family ?? "",
    };
  } catch {
    return { aboutMe: "", family: "" };
  }
}

type WordToken = { word: string; uid: number };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function initBuilderStates(): Record<number, { pool: WordToken[]; placed: WordToken[] }> {
  return Object.fromEntries(
    builderTasks.map((task) => {
      const pool = shuffle(
        task.words.map((word, idx) => ({ word, uid: task.id * 100 + idx })),
      );
      return [task.id, { pool, placed: [] }];
    }),
  );
}

function McExercise({
  items,
  answers,
  setAnswers,
  checked,
}: {
  items: McItem[];
  answers: Record<number, string>;
  setAnswers: Dispatch<SetStateAction<Record<number, string>>>;
  checked: boolean;
}) {
  return (
    <div className="ss-mc-list">
      {items.map((item) => {
        const selected = answers[item.id];
        const isOk = checked && selected === item.answer;
        const isBad = checked && selected && selected !== item.answer;
        return (
          <article
            key={item.id}
            className={`ss-mc-card ${isOk ? "done-ok" : isBad ? "done-bad" : ""}`}
          >
            <p className="ss-mc-text">{item.text}</p>
            <div className="ss-choice-row">
              {item.options.map((opt) => {
                let cls = "ss-choice-btn";
                if (selected === opt) cls += " selected";
                if (checked && opt === item.answer) cls += " correct";
                if (checked && selected === opt && opt !== item.answer)
                  cls += " wrong";
                return (
                  <button
                    key={opt}
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() =>
                      setAnswers((p) => ({ ...p, [item.id]: opt }))
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <span className="ss-badge" style={{ marginTop: "0.5rem" }}>
              {item.tag}
            </span>
          </article>
        );
      })}
    </div>
  );
}

function scoreMc(items: McItem[], answers: Record<number, string>) {
  return items.filter((i) => answers[i.id] === i.answer).length;
}

export default function SelfStudyReview() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [toBeAnswers, setToBeAnswers] = useState<Record<number, string>>({});
  const [toBeChecked, setToBeChecked] = useState(false);

  const [routine, setRoutine] = useState(() => shuffle(routineOrder));
  const [routineChecked, setRoutineChecked] = useState(false);

  const [drillOpen, setDrillOpen] = useState<number[]>([]);

  const [sortPlaced, setSortPlaced] = useState<Record<string, string>>({});
  const [sortSelected, setSortSelected] = useState<string | null>(null);
  const [sortChecked, setSortChecked] = useState(false);

  const [mixedAnswers, setMixedAnswers] = useState<Record<number, string>>({});
  const [mixedChecked, setMixedChecked] = useState(false);

  const [builderStates, setBuilderStates] = useState(initBuilderStates);
  const [builderChecked, setBuilderChecked] = useState<Record<number, boolean>>(
    {},
  );

  const [fixAnswers, setFixAnswers] = useState<Record<number, string>>({});
  const [fixChecked, setFixChecked] = useState(false);

  const [prepAnswers, setPrepAnswers] = useState<Record<number, string>>({});
  const [prepChecked, setPrepChecked] = useState(false);

  const [aboutMeText, setAboutMeText] = useState(() => loadWritingDraft().aboutMe);
  const [familyText, setFamilyText] = useState(() => loadWritingDraft().family);
  const [writingSaved, setWritingSaved] = useState(false);
  const [isSavingWriting, setIsSavingWriting] = useState(false);
  const [writingError, setWritingError] = useState("");
  const [writingSuccess, setWritingSuccess] = useState("");

  const toBeScore = useMemo(
    () => scoreMc(toBeItems, toBeAnswers),
    [toBeAnswers],
  );
  const routineOk = useMemo(
    () => routine.every((step, i) => step === routineOrder[i]),
    [routine],
  );
  const sortScore = useMemo(
    () => sortWords.filter((w) => sortPlaced[w.word] === w.bucket).length,
    [sortPlaced],
  );
  const mixedScore = useMemo(
    () => scoreMc(mixedItems, mixedAnswers),
    [mixedAnswers],
  );
  const fixScore = useMemo(
    () => fixItems.filter((i) => fixAnswers[i.id] === i.wrong).length,
    [fixAnswers],
  );
  const prepScore = useMemo(
    () => scoreMc(prepItems, prepAnswers),
    [prepAnswers],
  );

  const aboutMeCount = useMemo(() => countSentences(aboutMeText), [aboutMeText]);
  const familyCount = useMemo(() => countSentences(familyText), [familyText]);
  const writingDone =
    aboutMeCount >= ABOUT_ME_MIN && familyCount >= FAMILY_MIN;

  const builderScore = useMemo(
    () =>
      builderTasks.filter((task) => {
        const st = builderStates[task.id];
        if (!st?.placed.length) return false;
        const raw = st.placed.map((t) => t.word).join(" ");
        const built = raw.endsWith(".") ? raw : `${raw}.`;
        return built === task.answer;
      }).length,
    [builderStates],
  );

  const sectionsDone = useMemo(() => {
    let done = 0;
    if (toBeChecked && toBeScore === toBeItems.length) done++;
    if (routineChecked && routineOk) done++;
    if (drillOpen.length === transformDrills.length) done++;
    if (sortChecked && sortScore === sortWords.length) done++;
    if (mixedChecked && mixedScore === mixedItems.length) done++;
    if (builderScore === builderTasks.length) done++;
    if (fixChecked && fixScore === fixItems.length) done++;
    if (prepChecked && prepScore === prepItems.length) done++;
    if (writingDone) done++;
    return done;
  }, [
    toBeChecked,
    toBeScore,
    routineChecked,
    routineOk,
    drillOpen.length,
    sortChecked,
    sortScore,
    mixedChecked,
    mixedScore,
    builderScore,
    fixChecked,
    fixScore,
    prepChecked,
    prepScore,
    writingDone,
  ]);

  const progressPct = Math.round((sectionsDone / 9) * 100);

  const moveRoutine = (from: number, to: number) => {
    if (to < 0 || to >= routine.length) return;
    setRoutineChecked(false);
    setRoutine((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const placeWord = (bucket: string) => {
    if (!sortSelected || sortPlaced[sortSelected]) return;
    setSortPlaced((p) => ({ ...p, [sortSelected]: bucket }));
    setSortSelected(null);
    setSortChecked(false);
  };

  const placeBuilderWord = (taskId: number, token: WordToken) => {
    setBuilderChecked((p) => {
      const next = { ...p };
      delete next[taskId];
      return next;
    });
    setBuilderStates((prev) => {
      const t = prev[taskId];
      return {
        ...prev,
        [taskId]: {
          pool: t.pool.filter((w) => w.uid !== token.uid),
          placed: [...t.placed, token],
        },
      };
    });
  };

  const removeBuilderWord = (taskId: number, token: WordToken) => {
    setBuilderChecked((p) => {
      const next = { ...p };
      delete next[taskId];
      return next;
    });
    setBuilderStates((prev) => {
      const t = prev[taskId];
      return {
        ...prev,
        [taskId]: {
          pool: [...t.pool, token],
          placed: t.placed.filter((w) => w.uid !== token.uid),
        },
      };
    });
  };

  const checkBuilder = (taskId: number) => {
    setBuilderChecked((p) => ({ ...p, [taskId]: true }));
  };

  const resetBuilder = (taskId: number) => {
    const task = builderTasks.find((t) => t.id === taskId)!;
    const pool = shuffle(
      task.words.map((word, idx) => ({ word, uid: taskId * 100 + idx })),
    );
    setBuilderStates((p) => ({ ...p, [taskId]: { pool, placed: [] } }));
    setBuilderChecked((p) => {
      const next = { ...p };
      delete next[taskId];
      return next;
    });
  };

  const builtSentence = (taskId: number) => {
    const st = builderStates[taskId];
    if (!st?.placed.length) return "";
    const raw = st.placed.map((t) => t.word).join(" ");
    return raw.endsWith(".") ? raw : `${raw}.`;
  };

  const handleSaveWriting = async () => {
    setWritingError("");
    setWritingSuccess("");

    if (!writingDone) {
      setWritingError(
        `Напиши щонайменше ${ABOUT_ME_MIN} речення про себе та ${FAMILY_MIN} про сім'ю.`,
      );
      return;
    }

    const combined = `About me:\n${aboutMeText.trim()}\n\nMy family:\n${familyText.trim()}`;

    try {
      setIsSavingWriting(true);
      await saveAboutMeSubmission({
        name: "Self-study",
        age: "",
        country: "",
        city: "",
        hair: "",
        eyes: "",
        text: combined,
        createdAt: new Date().toISOString(),
        page: "self-study",
      });
      setWritingSaved(true);
      setWritingSuccess("Текст збережено — вчитель побачить його.");
    } catch {
      setWritingError("Не вдалося зберегти. Спробуй ще раз.");
    } finally {
      setIsSavingWriting(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      WRITING_STORAGE_KEY,
      JSON.stringify({ aboutMe: aboutMeText, family: familyText }),
    );
    setWritingSaved(false);
  }, [aboutMeText, familyText]);

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
    <div className="self-study-page" ref={pageRef}>
      <section className="self-study-hero panel reveal-on-scroll is-visible">
        <div className="self-study-hero-top">
          <div>
            <p className="page-kicker">Self-study</p>
            <h1>To be + Present Simple + Routine + Prepositions</h1>
            <p className="self-study-topic-pill">
              Самостійна практика · A1–A2
            </p>
            <p className="self-study-subtitle">
              Повтори <strong>to be</strong>, <strong>Present Simple</strong>,
              <strong> at / in / on</strong>, щоденну <strong>рутину</strong>,
              <strong> 3-тю форму</strong> та напиши короткий текст про себе і
              сім'ю.
            </p>
            <div className="ss-progress-bar">
              <div
                className="ss-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="ss-progress-label">
              Progress: {sectionsDone} / 9 blocks · {progressPct}%
            </p>
          </div>
          <div className="self-study-nav">
            <Link className="self-study-link" to="/lessons">
              ← Lessons
            </Link>
            <Link className="self-study-link self-study-link--ghost" to="/">
              Roadmap
            </Link>
          </div>
        </div>
        <div className="self-study-chips">
          <span>I am</span>
          <span>She is</span>
          <span>I wake up</span>
          <span>He goes</span>
          <span>at 7 o'clock</span>
          <span>in Kyiv</span>
          <span>on Monday</span>
          <span>have → has</span>
        </div>
      </section>

      <section className="self-study-block panel reveal-on-scroll">
        <div className="self-study-section-head">
          <p className="page-kicker">Map</p>
          <h2>9 practice blocks</h2>
        </div>
        <div className="self-study-flow">
          <a href="#to-be">1 To be</a>
          <a href="#routine">2 Routine</a>
          <a href="#prepositions">3 at/in/on</a>
          <a href="#transform">4 I → he/she</a>
          <a href="#sorting">5 -s sorting</a>
          <a href="#mixed">6 Mixed quiz</a>
          <a href="#builder">7 Sentence builder</a>
          <a href="#fix">8 Fix mistakes</a>
          <a href="#writing">9 Writing</a>
        </div>
      </section>

      <section
        id="to-be"
        className="self-study-block panel reveal-on-scroll"
      >
        <div className="self-study-section-head">
          <p className="page-kicker">Block 1</p>
          <h2>To be — am / is / are</h2>
          <p className="self-study-section-desc">
            Обери правильну форму. Пам'ятай: I → am, he/she/it → is, you/we/they
            → are.
          </p>
        </div>
        <McExercise
          items={toBeItems}
          answers={toBeAnswers}
          setAnswers={setToBeAnswers}
          checked={toBeChecked}
        />
        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            onClick={() => setToBeChecked(true)}
          >
            Check answers
          </button>
          <button
            type="button"
            className="ss-btn ss-btn--ghost"
            onClick={() => {
              setToBeAnswers({});
              setToBeChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        {toBeChecked && (
          <p className="ss-score">
            Score: {toBeScore} / {toBeItems.length}
            {toBeScore === toBeItems.length ? " — great!" : ""}
          </p>
        )}
      </section>

      <section
        id="routine"
        className="self-study-block panel reveal-on-scroll"
      >
        <div className="self-study-section-head">
          <p className="page-kicker">Block 2</p>
          <h2>Routine timeline</h2>
          <p className="self-study-section-desc">
            Розстав кроки дня у правильному порядку. Використовуй ↑ ↓ або
            перетягни логічно: від пробудження до сну.
          </p>
        </div>
        <div className="ss-timeline">
          {routine.map((step, idx) => (
            <div key={step} className="ss-timeline-item">
              <span className="ss-timeline-num">{idx + 1}</span>
              <span className="ss-timeline-text">{step}</span>
              <div className="ss-timeline-actions">
                <button
                  type="button"
                  className="ss-icon-btn"
                  disabled={idx === 0}
                  onClick={() => moveRoutine(idx, idx - 1)}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="ss-icon-btn"
                  disabled={idx === routine.length - 1}
                  onClick={() => moveRoutine(idx, idx + 1)}
                  aria-label="Move down"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            onClick={() => setRoutineChecked(true)}
          >
            Check order
          </button>
          <button
            type="button"
            className="ss-btn ss-btn--ghost"
            onClick={() => {
              setRoutine(shuffle(routineOrder));
              setRoutineChecked(false);
            }}
          >
            Shuffle again
          </button>
        </div>
        {routineChecked && (
          <p className="ss-score">
            {routineOk
              ? "Perfect order!"
              : "Not yet — wake up comes first, go to bed comes last."}
          </p>
        )}
      </section>

      <section
        id="prepositions"
        className="self-study-block panel reveal-on-scroll"
      >
        <div className="self-study-section-head">
          <p className="page-kicker">Block 3</p>
          <h2>Prepositions of time & place — at / in / on</h2>
          <p className="self-study-section-desc">
            Швидке правило, потім — 10 питань. Без <strong>to</strong> — тільки
            at, in, on.
          </p>
        </div>
        <div className="ss-prep-rules">
          <div className="ss-prep-rule">
            <h4>at</h4>
            <p>at 7 o'clock</p>
            <p>at night</p>
            <p>at home, at school</p>
          </div>
          <div className="ss-prep-rule">
            <h4>in</h4>
            <p>in June, in 2024</p>
            <p>in the morning</p>
            <p>in Kyiv, in Ukraine</p>
          </div>
          <div className="ss-prep-rule">
            <h4>on</h4>
            <p>on Monday</p>
            <p>on my birthday</p>
            <p>on the table</p>
          </div>
        </div>
        <McExercise
          items={prepItems}
          answers={prepAnswers}
          setAnswers={setPrepAnswers}
          checked={prepChecked}
        />
        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            onClick={() => setPrepChecked(true)}
          >
            Check answers
          </button>
          <button
            type="button"
            className="ss-btn ss-btn--ghost"
            onClick={() => {
              setPrepAnswers({});
              setPrepChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        {prepChecked && (
          <p className="ss-score">
            Score: {prepScore} / {prepItems.length}
          </p>
        )}
      </section>

      <section
        id="transform"
        className="self-study-block panel reveal-on-scroll"
      >
        <div className="self-study-section-head">
          <p className="page-kicker">Block 4</p>
          <h2>I → he / she transformation</h2>
          <p className="self-study-section-desc">
            Скажи речення з he/she вголос, потім натисни, щоб перевірити
            відповідь.
          </p>
        </div>
        <div className="ss-drill-list">
          {transformDrills.map((item, idx) => (
            <button
              key={item.i}
              type="button"
              className={`ss-drill-row ${drillOpen.includes(idx) ? "ss-drill-row--open" : ""}`}
              onClick={() =>
                setDrillOpen((p) =>
                  p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
                )
              }
            >
              <span className="ss-drill-i">{item.i}</span>
              <span className="ss-drill-sep">→</span>
              <span className="ss-drill-she">
                {drillOpen.includes(idx) ? item.she : "tap after you say it"}
              </span>
            </button>
          ))}
        </div>
        <p className="ss-score">
          Revealed: {drillOpen.length} / {transformDrills.length}
        </p>
      </section>

      <section
        id="sorting"
        className="self-study-block panel reveal-on-scroll"
      >
        <div className="self-study-section-head">
          <p className="page-kicker">Block 5</p>
          <h2>Third person spelling sort</h2>
          <p className="self-study-section-desc">
            Клікни дієслово, потім — колонку: <strong>-s</strong>,{" "}
            <strong>-es</strong>, <strong>-ies</strong> або{" "}
            <strong>has</strong>.
          </p>
        </div>
        <div className="ss-sort-bank">
          {sortWords.map((w) => {
            const placed = sortPlaced[w.word];
            return (
              <button
                key={w.word}
                type="button"
                className={`ss-sort-word ${sortSelected === w.word ? "selected" : ""} ${placed ? "placed" : ""}`}
                disabled={!!placed}
                onClick={() => setSortSelected(w.word)}
              >
                {w.word}
              </button>
            );
          })}
        </div>
        <div className="ss-sort-columns">
          {(["s", "es", "ies", "has"] as const).map((bucket) => (
            <div
              key={bucket}
              className={`ss-sort-col ${sortSelected ? "active" : ""}`}
              onClick={() => placeWord(bucket)}
              onKeyDown={(e) => e.key === "Enter" && placeWord(bucket)}
              role="button"
              tabIndex={0}
            >
              <h4>{bucket === "has" ? "has" : `-${bucket}`}</h4>
              <div className="ss-sort-col-items">
                {Object.entries(sortPlaced)
                  .filter(([, b]) => b === bucket)
                  .map(([word]) => (
                    <span key={word} className="ss-sort-tag">
                      {word}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            onClick={() => setSortChecked(true)}
          >
            Check sorting
          </button>
          <button
            type="button"
            className="ss-btn ss-btn--ghost"
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
          <p className="ss-score">
            Score: {sortScore} / {sortWords.length}
          </p>
        )}
      </section>

      <section id="mixed" className="self-study-block panel reveal-on-scroll">
        <div className="self-study-section-head">
          <p className="page-kicker">Block 6</p>
          <h2>Mixed challenge</h2>
          <p className="self-study-section-desc">
            To be + Present Simple + 3-тя особа в одному квізі. Обери правильне
            слово.
          </p>
        </div>
        <McExercise
          items={mixedItems}
          answers={mixedAnswers}
          setAnswers={setMixedAnswers}
          checked={mixedChecked}
        />
        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            onClick={() => setMixedChecked(true)}
          >
            Check answers
          </button>
          <button
            type="button"
            className="ss-btn ss-btn--ghost"
            onClick={() => {
              setMixedAnswers({});
              setMixedChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        {mixedChecked && (
          <p className="ss-score">
            Score: {mixedScore} / {mixedItems.length}
          </p>
        )}
      </section>

      <section
        id="builder"
        className="self-study-block panel reveal-on-scroll"
      >
        <div className="self-study-section-head">
          <p className="page-kicker">Block 7</p>
          <h2>Sentence builder</h2>
          <p className="self-study-section-desc">
            Збери речення зі слів. Клікни слово внизу — воно з'явиться у
            рядку. Клікни в рядку — поверни слово назад.
          </p>
        </div>
        {builderTasks.map((task) => {
          const st = builderStates[task.id];
          const built = builtSentence(task.id);
          const checked = builderChecked[task.id];
          const ok = checked && built === task.answer;
          return (
            <div key={task.id} className="ss-fix-card" style={{ marginBottom: "1rem" }}>
              <span className="ss-badge">{task.tag}</span>
              <div
                className={`ss-builder-area ${st.placed.length ? "has-words" : ""}`}
              >
                {st.placed.length === 0 && (
                  <span style={{ color: "var(--color-text-muted)" }}>
                    Tap words below…
                  </span>
                )}
                {st.placed.map((token) => (
                  <button
                    key={token.uid}
                    type="button"
                    className="ss-word-chip in-area"
                    onClick={() => removeBuilderWord(task.id, token)}
                  >
                    {token.word}
                  </button>
                ))}
              </div>
              <div className="ss-builder-pool">
                {st.pool.map((token) => (
                  <button
                    key={token.uid}
                    type="button"
                    className="ss-word-chip"
                    onClick={() => placeBuilderWord(task.id, token)}
                  >
                    {token.word}
                  </button>
                ))}
              </div>
              <div className="ss-actions">
                <button
                  type="button"
                  className="ss-btn"
                  onClick={() => checkBuilder(task.id)}
                >
                  Check
                </button>
                <button
                  type="button"
                  className="ss-btn ss-btn--ghost"
                  onClick={() => resetBuilder(task.id)}
                >
                  Reset
                </button>
              </div>
              {checked && (
                <p className="ss-score" style={{ color: ok ? "#059669" : "#ef4444" }}>
                  {ok ? "Correct!" : `Model: ${task.answer}`}
                </p>
              )}
            </div>
          );
        })}
        <p className="ss-score">
          Correct sentences: {builderScore} / {builderTasks.length}
        </p>
      </section>

      <section id="fix" className="self-study-block panel reveal-on-scroll">
        <div className="self-study-section-head">
          <p className="page-kicker">Block 8</p>
          <h2>Fix the mistake</h2>
          <p className="self-study-section-desc">
            У кожному реченні одна помилка. Знайди неправильне слово.
          </p>
        </div>
        <div className="ss-mc-list">
          {fixItems.map((item) => {
            const selected = fixAnswers[item.id];
            const isOk = fixChecked && selected === item.wrong;
            const isBad = fixChecked && selected && selected !== item.wrong;
            return (
              <article
                key={item.id}
                className={`ss-fix-card ${isOk ? "done-ok" : isBad ? "done-bad" : ""}`}
              >
                <p className="ss-fix-sentence">{item.sentence}</p>
                <div className="ss-choice-row">
                  {item.options.map((opt) => {
                    let cls = "ss-choice-btn";
                    if (selected === opt) cls += " selected";
                    if (fixChecked && opt === item.wrong) cls += " correct";
                    if (fixChecked && selected === opt && opt !== item.wrong)
                      cls += " wrong";
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={cls}
                        disabled={fixChecked}
                        onClick={() =>
                          setFixAnswers((p) => ({ ...p, [item.id]: opt }))
                        }
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {fixChecked && selected === item.wrong && (
                  <p className="ss-score" style={{ marginTop: "0.5rem" }}>
                    Fix: <strong>{item.wrong}</strong> →{" "}
                    <strong>{item.correct}</strong>
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            onClick={() => setFixChecked(true)}
          >
            Check answers
          </button>
          <button
            type="button"
            className="ss-btn ss-btn--ghost"
            onClick={() => {
              setFixAnswers({});
              setFixChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        {fixChecked && (
          <p className="ss-score">
            Score: {fixScore} / {fixItems.length}
          </p>
        )}
      </section>

      <section id="writing" className="self-study-block panel reveal-on-scroll">
        <div className="self-study-section-head">
          <p className="page-kicker">Block 9</p>
          <h2>Writing — about me & my family</h2>
          <p className="self-study-section-desc">
            Напиши англійською: <strong>{ABOUT_ME_MIN}+ речення</strong> про
            себе та <strong>{FAMILY_MIN}+ речення</strong> про сім'ю. Використай
            to be, Present Simple, at/in/on.
          </p>
        </div>

        <div className="ss-writing-grid">
          <div>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Про себе</h3>
            <ul className="ss-writing-prompts">
              {aboutMePrompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="ss-writing-field" style={{ marginTop: "0.75rem" }}>
              <label htmlFor="about-me-writing">About me</label>
              <textarea
                id="about-me-writing"
                value={aboutMeText}
                onChange={(e) => setAboutMeText(e.target.value)}
                placeholder="My name is… I'm … years old. I'm from… I live in…"
                spellCheck={false}
              />
              <p
                className={`ss-writing-meta ${aboutMeCount >= ABOUT_ME_MIN ? "ok" : ""}`}
              >
                {aboutMeCount} / {ABOUT_ME_MIN} sentences
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Про сім'ю</h3>
            <ul className="ss-writing-prompts">
              {familyPrompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="ss-writing-field" style={{ marginTop: "0.75rem" }}>
              <label htmlFor="family-writing">My family</label>
              <textarea
                id="family-writing"
                value={familyText}
                onChange={(e) => setFamilyText(e.target.value)}
                placeholder="My family is small. My mother lives in… She works… My brother…"
                spellCheck={false}
              />
              <p
                className={`ss-writing-meta ${familyCount >= FAMILY_MIN ? "ok" : ""}`}
              >
                {familyCount} / {FAMILY_MIN} sentences
              </p>
            </div>
          </div>
        </div>

        <div className="ss-writing-model">
          <h4>Model example</h4>
          <p>
            My name is Olena. I'm 28 years old. I'm from Ukraine. I live in Kyiv
            and I work in an office. I wake up at 7 and have breakfast at home.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            My family is small. My mother lives in Lviv. She is a teacher. My
            brother works in IT. He lives in Kyiv too.
          </p>
        </div>

        <div className="ss-actions">
          <button
            type="button"
            className="ss-btn"
            disabled={isSavingWriting}
            onClick={handleSaveWriting}
          >
            {isSavingWriting ? "Saving…" : "Send to teacher"}
          </button>
        </div>
        {writingError && (
          <p className="ss-writing-status error">{writingError}</p>
        )}
        {writingSuccess && (
          <p className="ss-writing-status success">{writingSuccess}</p>
        )}
        {writingDone && !writingSaved && (
          <p className="ss-score">Draft ready — you can send it to your teacher.</p>
        )}
      </section>

      <section className="self-study-block panel reveal-on-scroll">
        <div className="self-study-section-head">
          <p className="page-kicker">Done?</p>
          <h2>Keep practising</h2>
          <p className="self-study-section-desc">
            Повтори складні блоки або відкрий тренажер для ще більшої
            практики.
          </p>
        </div>
        <div className="ss-badge-row">
          {[
            { label: "To be", done: toBeChecked && toBeScore === toBeItems.length },
            { label: "Routine", done: routineChecked && routineOk },
            { label: "at/in/on", done: prepChecked && prepScore === prepItems.length },
            { label: "I → he/she", done: drillOpen.length === transformDrills.length },
            { label: "Sorting", done: sortChecked && sortScore === sortWords.length },
            { label: "Mixed", done: mixedChecked && mixedScore === mixedItems.length },
            { label: "Builder", done: builderScore === builderTasks.length },
            { label: "Fix", done: fixChecked && fixScore === fixItems.length },
            { label: "Writing", done: writingDone },
          ].map((b) => (
            <span key={b.label} className={`ss-badge ${b.done ? "done" : ""}`}>
              {b.done ? "✓ " : ""}
              {b.label}
            </span>
          ))}
        </div>
        <div className="ss-actions" style={{ marginTop: "1rem" }}>
          <Link className="self-study-link" to="/trainer">
            Open trainer
          </Link>
          <Link className="self-study-link self-study-link--ghost" to="/about-me">
            About me page
          </Link>
        </div>
      </section>
    </div>
  );
}
