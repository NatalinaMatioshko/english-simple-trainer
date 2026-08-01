import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CoveredTopicsRoadmap from "../components/CoveredTopicsRoadmap";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson27.css";
import "../styles/lesson28.css";
import "../styles/lesson30.css";
import {
  canChecklist,
  correctionItems,
  daysOfWeek,
  daysWeekGrammar,
  daysWeekMatch,
  daysWeekOrder,
  daysWeekSpeak,
  familyCards,
  familyJobMatch,
  checkHorseAnswer,
  horseFunFact,
  horsePosMeta,
  horseQuestions,
  horseSentences,
  type HorsePos,
  jobCards,
  listenQs,
  profileModel,
  profileScaffold,
  readingChunks,
  reflectItems,
  speakingTour,
  topicStations,
  warmUpQs,
} from "../data/lesson30Review";

const IMG27 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson27/${file}`;

const IMG30 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson30/${file}`;

const SOUND_U2 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_2/RM_A1_SB_U2_R${r}.mp3`;

const IMG29 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson29/${file}`;

/* ── Lesson 29 Part 2 data (duplicated for review) ──────────────── */

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

const teenWords = [
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
] as const;

const tensWords = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
  "one hundred",
] as const;

const choosePairs = [
  { id: 1, options: ["13", "30"], answer: "13" },
  { id: 2, options: ["14", "40"], answer: "14" },
  { id: 3, options: ["15", "50"], answer: "50" },
  { id: 4, options: ["16", "60"], answer: "16" },
  { id: 5, options: ["17", "70"], answer: "70" },
  { id: 6, options: ["18", "80"], answer: "80" },
  { id: 7, options: ["19", "90"], answer: "19" },
] as const;

type NumProfile = {
  id: string;
  name: string;
  country: string;
  photo: string;
  fields: {
    age: { label: string; answers: string[] };
    from: { label: string; answers: string[] };
    job: { label: string; answers: string[] };
  };
};

const numProfiles: NumProfile[] = [
  {
    id: "anna",
    name: "Anna Chubb",
    country: "Canada",
    photo: "n1.svg",
    fields: {
      age: { label: "Age", answers: ["99"] },
      from: { label: "From", answers: ["canada"] },
      job: {
        label: "Job",
        answers: ["teacher", "she's a teacher", "shes a teacher"],
      },
    },
  },
  {
    id: "bill",
    name: "Bill Gooch",
    country: "the UK",
    photo: "n2.svg",
    fields: {
      age: { label: "Age", answers: ["85"] },
      from: { label: "From", answers: ["the uk", "uk"] },
      job: {
        label: "Job",
        answers: ["taxi driver", "he's a taxi driver", "hes a taxi driver"],
      },
    },
  },
  {
    id: "satoru",
    name: "Satoru Goto",
    country: "Japan",
    photo: "n3.svg",
    fields: {
      age: { label: "Age", answers: ["51"] },
      from: { label: "From", answers: ["japan"] },
      job: {
        label: "Job",
        answers: [
          "football player",
          "he's a football player",
          "hes a football player",
        ],
      },
    },
  },
];

const pronSentences = [
  "What's her name?",
  "What's his name?",
  "What's her job?",
  "What's his job?",
  "Where's she from?",
  "Where's he from?",
] as const;

type WriteItem = {
  id: number;
  prompt: string;
  answers: string[];
};

const writeItems: WriteItem[] = [
  {
    id: 1,
    prompt: "He's from Thailand.",
    answers: ["where is he from", "where's he from"],
  },
  {
    id: 2,
    prompt: "He's a doctor.",
    answers: ["what is his job", "what's his job"],
  },
  {
    id: 3,
    prompt: "Her name is Lidia Nowicki.",
    answers: ["what is her name", "what's her name"],
  },
  {
    id: 4,
    prompt: "She's from Kraków in Poland.",
    answers: ["where is she from", "where's she from"],
  },
  { id: 5, prompt: "They're from the US.", answers: ["where are they from"] },
];

const questionWordRows = [
  {
    word: "WHO",
    color: "#e67e22",
    desc: "Used to ask about a person.",
    exampleRest: " is coming to the party?",
    icon: "person",
  },
  {
    word: "WHAT",
    color: "#9b7bb8",
    desc: "Used to ask for information.",
    exampleRest: " do you want to eat?",
    icon: "info",
  },
  {
    word: "WHERE",
    color: "#27ae60",
    desc: "Used to ask about a place.",
    exampleRest: " do you live?",
    icon: "place",
  },
  {
    word: "WHEN",
    color: "#5dade2",
    desc: "Used to ask about time.",
    exampleRest: " does the movie start?",
    icon: "time",
  },
  {
    word: "WHY",
    color: "#d4ac0d",
    desc: "Used to ask for a reason.",
    exampleRest: " are you laughing?",
    icon: "reason",
  },
  {
    word: "HOW",
    color: "#e74c3c",
    desc: "Used to explain a process.",
    exampleRest: " can I get to the station?",
    icon: "how",
  },
  {
    word: "WHICH",
    color: "#5c6bc0",
    desc: "Used to ask about choices.",
    exampleRest: " dress should I wear?",
    icon: "choice",
  },
  {
    word: "WHOSE",
    color: "#58d68d",
    desc: "Used to ask about possession.",
    exampleRest: " car is parked outside?",
    icon: "own",
  },
  {
    word: "WHOM",
    color: "#1abc9c",
    desc: "Asking about the object of a verb.",
    exampleRest: " should I call for help?",
    icon: "object",
  },
] as const;

function QwIcon({ kind }: { kind: (typeof questionWordRows)[number]["icon"] }) {
  switch (kind) {
    case "person":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="14" r="8" fill="currentColor" opacity="0.85" />
          <path
            d="M8 42c2-10 10-15 16-15s14 5 16 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="36" cy="10" r="2.2" fill="currentColor" />
          <circle cx="41" cy="16" r="1.8" fill="currentColor" />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect
            x="8"
            y="10"
            width="22"
            height="28"
            rx="3"
            fill="currentColor"
            opacity="0.2"
          />
          <rect
            x="12"
            y="16"
            width="14"
            height="2.5"
            rx="1"
            fill="currentColor"
          />
          <rect
            x="12"
            y="22"
            width="10"
            height="2.5"
            rx="1"
            fill="currentColor"
          />
          <circle cx="34" cy="30" r="9" fill="currentColor" opacity="0.85" />
          <circle cx="34" cy="26" r="2" fill="#fff" />
          <rect x="32.5" y="29" width="3" height="8" rx="1.5" fill="#fff" />
        </svg>
      );
    case "place":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M24 6c-7 0-12 5.2-12 12 0 9 12 24 12 24s12-15 12-24c0-6.8-5-12-12-12z"
            fill="currentColor"
            opacity="0.85"
          />
          <circle cx="24" cy="18" r="5" fill="#fff" />
        </svg>
      );
    case "time":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="16" fill="currentColor" opacity="0.18" />
          <circle
            cx="24"
            cy="24"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M24 14v11l8 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "reason":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="20" r="12" fill="currentColor" opacity="0.85" />
          <path
            d="M18 18c1-3 4-4 6-4s5 1 6 4"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M17 26c2 3 5 4 7 4s5-1 7-4"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text
            x="38"
            y="14"
            fontSize="14"
            fontWeight="700"
            fill="currentColor"
          >
            ?
          </text>
        </svg>
      );
    case "how":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="16" r="8" fill="currentColor" opacity="0.85" />
          <path
            d="M10 42c2-10 9-15 14-15s12 5 14 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text
            x="34"
            y="14"
            fontSize="12"
            fontWeight="700"
            fill="currentColor"
          >
            ?
          </text>
          <text x="6" y="18" fontSize="11" fontWeight="700" fill="currentColor">
            ?
          </text>
        </svg>
      );
    case "choice":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="16" r="7" fill="currentColor" opacity="0.85" />
          <path
            d="M12 42c2-9 8-14 12-14s10 5 12 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M8 22h10M30 22h10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M10 22l-3 4M8 22l-3-4M38 22l3 4M40 22l3-4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "own":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect
            x="8"
            y="20"
            width="14"
            height="18"
            rx="2"
            fill="currentColor"
            opacity="0.75"
          />
          <path d="M8 20l7-8 7 8" fill="currentColor" opacity="0.9" />
          <circle
            cx="34"
            cy="28"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M34 36v6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "object":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="14" r="8" fill="currentColor" opacity="0.85" />
          <path
            d="M10 42c2-10 9-15 14-15s12 5 14 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M18 18c0 0 2 4 6 4s6-4 6-4"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function normalizeLoose(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/^(he's|she's|it's|a |an |the )/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function normalizeQuestion(s: string): string {
  return s.toLowerCase().replace(/[?.!]/g, "").replace(/\s+/g, " ").trim();
}

function inputStateClass(checked: boolean, hasValue: boolean, ok: boolean) {
  if (!checked || !hasValue) return "";
  return ok ? "is-ok" : "is-err";
}

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

function AudioBlock({
  r,
  exercise,
  title,
  transcript,
}: {
  r: number;
  exercise: string;
  title: string;
  transcript: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="l25-audio-item">
      <div className="l25-audio-meta">
        <span className="l25-audio-num">R{r}</span>
        <div className="l25-audio-info">
          <span className="l25-audio-ex">{exercise}</span>
          <span className="l25-audio-title">{title}</span>
        </div>
      </div>
      <audio
        controls
        className="l25-audio-ctrl"
        src={SOUND_U2(r)}
        preload="none"
      />
      <button
        type="button"
        className="l25-cr-mini-btn"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Hide transcript" : "Transcript"}
      </button>
      {open && <div className="l25-details-body">{transcript}</div>}
    </div>
  );
}

/* ── Part 3 · English in Action · In a shop ─────────────────── */

const shopObjects = [
  { id: "books", label: "books", price: "on the shelf" },
  { id: "dog", label: "a dog (figurine)", price: "£9.99" },
  { id: "clock", label: "a grandfather clock", price: "£120" },
  { id: "picture", label: "a picture", price: "£19.99" },
  { id: "laptop", label: "a laptop", price: "£389" },
  { id: "chair-g", label: "a green chair", price: "£45" },
  { id: "chair-b", label: "a brown chair / phone", price: "£52" },
  { id: "boxes", label: "boxes", price: "£5 / £14" },
  { id: "cups", label: "cups", price: "£2" },
  { id: "pens", label: "pens", price: "on the counter" },
] as const;

const buyAnswers = ["clock", "cups"] as const;

const customerPhrases = [
  "How much is this book?",
  "How much are those cups?",
  "How much is this?",
  "How much is that?",
  "Can I pay by card?",
  "Here you are.",
  "Here's my card.",
] as const;

const assistantPhrases = [
  "It's £12 (for four cups).",
  "That's £9.99.",
  "It's £15.99.",
  "That's £27.99, please.",
  "Cash or card?",
  "Here's your change.",
  "Here's your card.",
] as const;

const heardInR20 = new Set([
  "How much is this book?",
  "How much are those cups?",
  "How much is this?",
  "How much is that?",
  "Here you are.",
  "It's £12 (for four cups).",
  "That's £9.99.",
  "It's £15.99.",
  "That's £27.99, please.",
  "Cash or card?",
  "Here's your change.",
]);

const shopR20Transcript = (
  <div>
    <p>
      <strong>Customer:</strong> Excuse me. How much is this book?
      <br />
      <strong>Assistant:</strong> That's £9.99.
      <br />
      <strong>Customer:</strong> And how much are those cups?
      <br />
      <strong>Assistant:</strong> It's £12 for four cups.
      <br />
      <strong>Customer:</strong> And how much is that? The clock.
      <br />
      <strong>Assistant:</strong> Yes. It's £15.99.
    </p>
    <p>
      <strong>Customer:</strong> OK. The clock and the cups, please.
      <br />
      <strong>Assistant:</strong> OK.
      <br />
      <strong>Customer:</strong> Oh. And how much is this?
      <br />
      <strong>Assistant:</strong> That pen is £2.
      <br />
      <strong>Customer:</strong> Oh. OK. So how much for the clock and the cups?
      <br />
      <strong>Assistant:</strong> That's £27.99, please. Cash or card?
      <br />
      <strong>Customer:</strong> Cash, please. Here you are.
      <br />
      <strong>Assistant:</strong> Thank you. Here's your change.
      <br />
      <strong>Customer:</strong> Thank you.
    </p>
  </div>
);

const shopR21Transcript = (
  <div>
    <p>
      <strong>Customer:</strong> {customerPhrases.join(" · ")}
    </p>
    <p>
      <strong>Shop assistant:</strong> {assistantPhrases.join(" · ")}
    </p>
  </div>
);

export default function Lesson30() {
  const [openChunk, setOpenChunk] = useState(1);
  const [chunkAns, setChunkAns] = useState<Record<number, string>>({});
  const [chunkChecked, setChunkChecked] = useState(false);

  const [famAns, setFamAns] = useState<Record<number, string>>({});
  const [famChecked, setFamChecked] = useState(false);

  const [listenAns, setListenAns] = useState<Record<number, string>>({});
  const [listenChecked, setListenChecked] = useState(false);

  const [corrAns, setCorrAns] = useState<Record<number, string>>({});
  const [corrChecked, setCorrChecked] = useState(false);

  const [cardOpen, setCardOpen] = useState<Set<string>>(new Set());
  const [jobOpen, setJobOpen] = useState<Set<string>>(new Set());

  const [writing, setWriting] = useState("");
  const [reflect, setReflect] = useState<Record<number, number>>({});
  const [canDone, setCanDone] = useState<Set<number>>(new Set());

  const [topicId, setTopicId] = useState(topicStations[0].id);
  const [topicAns, setTopicAns] = useState<Record<string, string>>({});
  const [topicChecked, setTopicChecked] = useState(false);
  const [topicsDone, setTopicsDone] = useState<Set<string>>(new Set());
  const [speakDone, setSpeakDone] = useState<Set<string>>(new Set());
  const [horseAns, setHorseAns] = useState<Record<number, string>>({});
  const [horseChecked, setHorseChecked] = useState(false);
  const [horsePosFilter, setHorsePosFilter] = useState<HorsePos | null>(null);
  const [horseActiveWord, setHorseActiveWord] = useState<string | null>(null);

  const [daysMatchAns, setDaysMatchAns] = useState<Record<number, string>>({});
  const [daysMatchChecked, setDaysMatchChecked] = useState(false);
  const [daysOrderAns, setDaysOrderAns] = useState<Record<number, string>>({});
  const [daysOrderChecked, setDaysOrderChecked] = useState(false);
  const [daysGramAns, setDaysGramAns] = useState<Record<number, string>>({});
  const [daysGramChecked, setDaysGramChecked] = useState(false);

  // ── Part 2 review (Numbers, Question words) ──
  const [numAns, setNumAns] = useState<Record<number, string>>({});
  const [numChecked, setNumChecked] = useState(false);
  const [pairAns, setPairAns] = useState<Record<number, string>>({});
  const [pairChecked, setPairChecked] = useState(false);
  const [nextNumAns, setNextNumAns] = useState("");
  const [nextNumChecked, setNextNumChecked] = useState(false);
  const [profileAns, setProfileAns] = useState<Record<string, string>>({});
  const [profileChecked, setProfileChecked] = useState(false);
  const [gramAns, setGramAns] = useState({ q1: "", q2: "" });
  const [gramChecked, setGramChecked] = useState(false);
  const [writeAns, setWriteAns] = useState<Record<number, string>>({});
  const [writeChecked, setWriteChecked] = useState(false);
  const [classmateNames, setClassmateNames] = useState(["", "", ""]);

  // Part 3 · Shop
  const [seeObj, setSeeObj] = useState<Record<string, boolean>>({});
  const [buyObj, setBuyObj] = useState<Record<string, boolean>>({});
  const [buyChecked, setBuyChecked] = useState(false);
  const [phraseTick, setPhraseTick] = useState<Record<string, boolean>>({});
  const [phraseChecked, setPhraseChecked] = useState(false);

  const activeTopic = useMemo(
    () => topicStations.find((t) => t.id === topicId)!,
    [topicId],
  );

  const activeChunk = useMemo(
    () => readingChunks.find((c) => c.id === openChunk)!,
    [openChunk],
  );

  const chunkScore = readingChunks.filter(
    (c) => chunkAns[c.id] === c.answer,
  ).length;
  const famScore = familyJobMatch.filter(
    (q) => famAns[q.id] === q.answer,
  ).length;
  const listenScore = listenQs.filter(
    (q) => listenAns[q.id] === q.answer,
  ).length;
  const corrScore = correctionItems.filter(
    (q) => corrAns[q.id] === q.answer,
  ).length;
  const horseScore = horseQuestions.filter((q) =>
    checkHorseAnswer(horseAns[q.id] ?? "", q.answers),
  ).length;
  const daysMatchScore = daysWeekMatch.filter(
    (q) => daysMatchAns[q.id] === q.answer,
  ).length;
  const daysOrderScore = daysWeekOrder.filter(
    (q) => daysOrderAns[q.id] === q.answer,
  ).length;
  const daysGramScore = daysWeekGrammar.filter(
    (q) => daysGramAns[q.id] === q.answer,
  ).length;

  // Part 2 scores
  const numScore = numberPictures.filter(
    (p) => numAns[p.pos] === numberWords[p.value - 1],
  ).length;
  const pairScore = choosePairs.filter(
    (p) => pairAns[p.id] === p.answer,
  ).length;
  const nextNumOk =
    ["24", "twentyfour"].includes(normalizeLoose(nextNumAns)) &&
    nextNumAns.trim() !== "";
  const profileFieldKeys = numProfiles.flatMap((p) =>
    (Object.keys(p.fields) as (keyof NumProfile["fields"])[]).map((field) => ({
      key: `${p.id}-${field}`,
      answers: p.fields[field].answers,
    })),
  );
  const profileScore = profileFieldKeys.filter((f) =>
    f.answers.includes(normalizeLoose(profileAns[f.key] ?? "")),
  ).length;
  const writeScore = writeItems.filter((item) =>
    item.answers
      .map(normalizeQuestion)
      .includes(normalizeQuestion(writeAns[item.id] ?? "")),
  ).length;

  // Part 3 · Shop scores
  const buyScore = buyAnswers.filter((id) => buyObj[id]).length;
  const buyWrong = Object.keys(buyObj).filter(
    (id) => buyObj[id] && !(buyAnswers as readonly string[]).includes(id),
  ).length;
  const buyOk = buyChecked && buyScore === buyAnswers.length && buyWrong === 0;
  const phraseScore = [...heardInR20].filter((p) => phraseTick[p]).length;
  const phraseExtra = Object.keys(phraseTick).filter(
    (p) => phraseTick[p] && !heardInR20.has(p),
  ).length;

  const topicScore = activeTopic.quiz.filter(
    (q) => topicAns[`${topicId}-${q.id}`] === q.answer,
  ).length;

  const toggleCard = (id: string) =>
    setCardOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleJob = (en: string) =>
    setJobOpen((prev) => {
      const next = new Set(prev);
      if (next.has(en)) next.delete(en);
      else next.add(en);
      return next;
    });

  return (
    <div className="lesson22-page">
      {/* ── Hero ── */}
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 30</p>
            <h1>Check &amp; Reflect</h1>
            <p className="lesson22-topic-pill">
              Numbers review · days of the week · повна перевірка A1 (L1–29)
            </p>
            <p className="lesson22-subtitle">
              Повторення: numbers + question words з L29 · days of the week.
              Потім урок-рефлексія по <strong>усіх пройдених темах</strong>{" "}
              (L1–29): speaking tour → family/jobs → reading → listening R4 →
              writing → correction → reflect.
            </p>
            <ul className="l22-goals-list">
              <li>повторити числа 1–100 і question words (з L29);</li>
              <li>вивчити та закріпити дні тижня;</li>
              <li>пройти speaking tour по всіх темах (1–3 речення);</li>
              <li>говорити про себе, сім'ю, роботу, рутину;</li>
              <li>перевірити grammar + vocab у кожному блоці;</li>
              <li>читати / слухати / писати short profile;</li>
              <li>побачити сильні й слабкі теми для наступного циклу.</li>
            </ul>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/hw-30">
              A1 Level Test →
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>{topicStations.length} topic stations</span>
          <span>days of the week</span>
          <span>do / does</span>
          <span>have / has</span>
          <span>shop</span>
        </div>
      </section>

      <CoveredTopicsRoadmap id="l30-covered" className="lesson22-block" />

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l30-covered">Covered</a>
          <a href="#l30-grammar">Grammar</a>
          <a href="#l30-days">Days</a>
          <a href="#l30-topics">All topics</a>
          <a href="#l30-speak-tour">Speaking tour</a>
          <a href="#l30-warmup">Warm-up</a>
          <a href="#l30-profile">Profile</a>
          <a href="#l30-family">Family &amp; jobs</a>
          <a href="#l30-reading">Reading</a>
          <a href="#l30-horse">A Horse</a>
          <a href="#l30-listening">Listening</a>
          <a href="#l30-writing">Writing</a>
          <a href="#l30-correction">Correction</a>
          <a href="#l30-reflect">Reflect</a>
        </div>
      </section>

      {/* ── Grammar posters ── */}
      <section id="l30-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar warm-up · A1 essentials</p>
          <h2>Do / Does · Have / Has</h2>
          <p className="lesson22-section-desc">
            Перед speaking швидко згадай допоміжні дієслова Present Simple і
            присвійність. Постери нижче — повна опора; під ними — короткі
            правила.
          </p>
        </div>

        <div className="l28-chart-pair">
          <figure className="l28-chart">
            <figcaption className="l28-chart-cap">Do and Does</figcaption>
            <img
              src={IMG30("do-does.png")}
              alt="Do and Does: use Do with I You We They; Does with He She It; questions and negatives"
              className="l28-chart-img"
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </figure>
          <figure className="l28-chart">
            <figcaption className="l28-chart-cap">Has / Have</figcaption>
            <img
              src={IMG30("has-have.png")}
              alt="Has and Have for possession: Have with I You We They; Has with He She It"
              className="l28-chart-img"
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>

        <div className="l30-gram-boards">
          <article className="l30-gram-board l30-gram-board--do">
            <header className="l30-gram-head">
              <h3>Do</h3>
              <p>I · You · We · They</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                I <strong>do</strong> my homework.
              </li>
              <li>
                <strong>Do</strong> you like pizza?
              </li>
              <li>
                They <strong>do</strong> their chores.
              </li>
            </ul>
            <p className="l30-gram-foot">Present Simple · plural + I / you</p>
          </article>

          <article className="l30-gram-board l30-gram-board--does">
            <header className="l30-gram-head">
              <h3>Does</h3>
              <p>He · She · It</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                She <strong>does</strong> her work.
              </li>
              <li>
                <strong>Does</strong> he play football?
              </li>
              <li>
                It <strong>does</strong> not work.
              </li>
            </ul>
            <p className="l30-gram-foot">Present Simple · he / she / it</p>
          </article>

          <article className="l30-gram-board l30-gram-board--q">
            <header className="l30-gram-head">
              <h3>Questions</h3>
              <p>Do / Does + subject + verb?</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                <strong>Do</strong> you like ice cream?
              </li>
              <li>
                <strong>Does</strong> he live here?
              </li>
              <li>
                <strong>Do</strong> they go to the park?
              </li>
            </ul>
          </article>

          <article className="l30-gram-board l30-gram-board--neg">
            <header className="l30-gram-head">
              <h3>Negatives</h3>
              <p>do / does + not + verb</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                I <strong>do not</strong> (don't) understand.
              </li>
              <li>
                She <strong>doesn't</strong> like cats.
              </li>
              <li>
                We <strong>don't</strong> finish late.
              </li>
            </ul>
          </article>

          <article className="l30-gram-board l30-gram-board--have">
            <header className="l30-gram-head">
              <h3>Have</h3>
              <p>I · You · We · They</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                I <strong>have</strong> a pen.
              </li>
              <li>
                You <strong>have</strong> a new bag.
              </li>
              <li>
                We <strong>have</strong> a meeting.
              </li>
              <li>
                They <strong>have</strong> a nice house.
              </li>
            </ul>
            <p className="l30-gram-foot">Possession / ownership</p>
          </article>

          <article className="l30-gram-board l30-gram-board--has">
            <header className="l30-gram-head">
              <h3>Has</h3>
              <p>He · She · It</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                He <strong>has</strong> a watch.
              </li>
              <li>
                She <strong>has</strong> a beautiful smile.
              </li>
              <li>
                It <strong>has</strong> four legs.
              </li>
            </ul>
            <p className="l30-gram-foot">Possession · singular subjects</p>
          </article>
        </div>

        <div className="l30-gram-summary" role="note">
          <p>
            <strong>Do</strong> → I, you, we, they &nbsp;·&nbsp;{" "}
            <strong>Does</strong> → he, she, it
          </p>
          <p>
            <strong>Have</strong> → I, you, we, they &nbsp;·&nbsp;{" "}
            <strong>Has</strong> → he, she, it
          </p>
        </div>
      </section>

      {/* ── Part 2 · Numbers + Question words (review from L29) ──── */}

      <section
        id="l30-p2-goals"
        className="lesson22-block panel l29-goals"
        aria-label="Numbers review goals"
      >
        <ul className="l29-goals-list">
          <li>
            <span className="l29-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Goal:</strong> questions about other people
            </span>
          </li>
          <li>
            <span className="l29-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Grammar:</strong> question words with <em>be</em>
            </span>
          </li>
          <li>
            <span className="l29-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Vocabulary:</strong> numbers 1–100
            </span>
          </li>
        </ul>
      </section>

      <section id="l30-numbers-match" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1a</p>
          <h2>Numbers 1–10</h2>
          <p className="lesson22-section-desc">
            З'єднай цифру на картці зі словом. Обери правильне слово зі списку
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
                    src={IMG29(`n${pic.value}.svg`)}
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
          <button className="l22-check-btn" onClick={() => setNumChecked(true)}>
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

        <figure className="l29-scene" style={{ marginTop: "1.25rem" }}>
          <img
            src={IMG29("numbers-7-10.png")}
            alt="Numbers in real life: 7, 8, 9, 10 shown in everyday photos"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="l28-scene-cap" style={{ marginTop: "0.4rem" }}>
            Numbers in real life
          </figcaption>
        </figure>
      </section>

      <section id="l30-teens" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1b</p>
          <h2>Numbers 11–19</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R9</strong> і повтори числа 11–19 вголос.
          </p>
        </div>
        <div className="l29-chip-row" role="list" aria-label="Numbers 11–19">
          {teenWords.map((w, i) => (
            <span key={w} className="l29-chip l29-chip--teens" role="listitem">
              <strong>{i + 11}</strong> {w}
            </span>
          ))}
        </div>
        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioBlock
            r={9}
            exercise="Vocabulary · 1b"
            title="Numbers 11–19 — listen and repeat"
            transcript={<p>{teenWords.join(" · ")}</p>}
          />
        </div>
      </section>

      <section id="l30-tens" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1c</p>
          <h2>Tens and one hundred</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R10</strong> і повтори десятки та сто вголос.
          </p>
        </div>
        <div
          className="l29-chip-row"
          role="list"
          aria-label="Tens and one hundred"
        >
          {tensWords.map((w, i) => (
            <span key={w} className="l29-chip l29-chip--tens" role="listitem">
              <strong>{i < 8 ? (i + 2) * 10 : 100}</strong> {w}
            </span>
          ))}
        </div>
        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioBlock
            r={10}
            exercise="Vocabulary · 1c"
            title="Tens and one hundred — listen and repeat"
            transcript={<p>{tensWords.join(" · ")}</p>}
          />
        </div>
      </section>

      <section id="l30-listen-choose" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Listening · 2</p>
          <h2>Listen and choose</h2>
          <p className="lesson22-section-desc">
            Числа на -teen (13, 14…) і числа на -ty (30, 40…) звучать схоже.
            Послухай <strong>R11</strong> і обери число, яке ти чуєш.
          </p>
        </div>
        <div className="l25-audio-list" style={{ margin: "0 0 1rem" }}>
          <AudioBlock
            r={11}
            exercise="Listening · 2"
            title="Listen and choose the number you hear"
            transcript={
              <ol>
                {choosePairs.map((p) => (
                  <li key={p.id}>
                    {p.options.join(" or ")} → <strong>{p.answer}</strong>
                  </li>
                ))}
              </ol>
            }
          />
        </div>
        <div className="l29-pair-list">
          {choosePairs.map((item) => {
            const chosen = pairAns[item.id] ?? "";
            return (
              <div key={item.id} className="l29-pair-row">
                <span className="l29-pair-num">{item.id}</span>
                <div className="l29-pair-opts">
                  {item.options.map((opt) => {
                    let cls = "l29-pair-btn";
                    if (chosen === opt) cls += " is-selected";
                    if (pairChecked && opt === item.answer) cls += " is-ok";
                    else if (
                      pairChecked &&
                      chosen === opt &&
                      opt !== item.answer
                    )
                      cls += " is-err";
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={cls}
                        onClick={() => {
                          setPairChecked(false);
                          setPairAns((prev) => ({ ...prev, [item.id]: opt }));
                        }}
                        aria-pressed={chosen === opt}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setPairChecked(true)}
          >
            Check answers
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setPairAns({});
              setPairChecked(false);
            }}
          >
            Reset
          </button>
          {pairChecked && (
            <span className="l22-score">
              {pairScore} / {choosePairs.length}
            </span>
          )}
        </div>
      </section>

      <section id="l30-next-number" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 3</p>
          <h2>What comes next?</h2>
          <p className="lesson22-section-desc">
            Прочитай послідовність чисел і встав наступне число. Потім послухай{" "}
            <strong>R12</strong> і перевір себе.
          </p>
        </div>
        <p className="l29-sequence">
          twenty-one · twenty-two · twenty-three · …
        </p>
        <div className="l29-write-list">
          <div className="l29-write-row">
            <input
              type="text"
              value={nextNumAns}
              onChange={(e) => {
                setNextNumChecked(false);
                setNextNumAns(e.target.value);
              }}
              placeholder="twenty-four / 24"
              className={inputStateClass(
                nextNumChecked,
                nextNumAns.trim() !== "",
                nextNumOk,
              )}
              aria-label="What comes next?"
            />
            {nextNumChecked && !nextNumOk && (
              <p className="l29-write-answer">
                Правильна відповідь: <strong>24 / twenty-four</strong>
              </p>
            )}
          </div>
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setNextNumChecked(true)}
          >
            Check
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setNextNumAns("");
              setNextNumChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioBlock
            r={12}
            exercise="Vocabulary · 3"
            title="twenty-one, twenty-two, twenty-three… — listen and check"
            transcript={
              <p>
                twenty-one · twenty-two · twenty-three · twenty-four ·
                twenty-five …
              </p>
            }
          />
        </div>
      </section>

      <section id="l30-listening-profiles" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Listening · 4</p>
          <h2>Anna, Bill and Satoru</h2>
          <p className="lesson22-section-desc">
            Послухай діалог <strong>R13</strong>. Скільки років людям? Звідки
            вони? Ким вони працюють? Заповни профілі.
          </p>
        </div>
        <div className="l25-audio-list" style={{ margin: "0 0 1rem" }}>
          <AudioBlock
            r={13}
            exercise="Listening · 4"
            title="Anna, Bill and Satoru — listen"
            transcript={
              <div>
                <p>
                  <strong>A:</strong> Look at this. These people are great.
                  <br />
                  <strong>B:</strong> Oh yeah.
                  <br />
                  <strong>A:</strong> Yes. Look at this photo. This is Anna
                  Chubb. She's from Canada. She's a teacher.
                  <br />
                  <strong>B:</strong> How old is she?
                  <br />
                  <strong>A:</strong> She's 99.
                  <br />
                  <strong>B:</strong> Really? Wow.
                </p>
                <p>
                  <strong>A:</strong> And this is Bill Gooch. He's from the UK.
                  <br />
                  <strong>B:</strong> How old is he?
                  <br />
                  <strong>A:</strong> He's 85 years old.
                  <br />
                  <strong>B:</strong> What's his job?
                  <br />
                  <strong>A:</strong> He's a taxi driver.
                  <br />
                  <strong>B:</strong> Amazing.
                </p>
                <p>
                  <strong>A:</strong> Yeah. And what's his name? His name is
                  Satoru Goto. He's 51 and he's a football player.
                  <br />
                  <strong>B:</strong> Wow. Where's he from?
                  <br />
                  <strong>A:</strong> He's from Japan.
                </p>
              </div>
            }
          />
        </div>

        <div className="l29-profile-grid">
          {numProfiles.map((p) => (
            <article key={p.id} className="l29-profile">
              <h3>{p.name}</h3>
              {(Object.keys(p.fields) as (keyof NumProfile["fields"])[]).map(
                (field) => {
                  const key = `${p.id}-${field}`;
                  const value = profileAns[key] ?? "";
                  const ok = p.fields[field].answers.includes(
                    normalizeLoose(value),
                  );
                  return (
                    <label key={key} className="l29-profile-field">
                      {p.fields[field].label}
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setProfileChecked(false);
                          setProfileAns((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }));
                        }}
                        className={inputStateClass(
                          profileChecked,
                          value.trim() !== "",
                          ok,
                        )}
                        aria-label={`${p.name} — ${p.fields[field].label}`}
                      />
                    </label>
                  );
                },
              )}
            </article>
          ))}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setProfileChecked(true)}
          >
            Check answers
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setProfileAns({});
              setProfileChecked(false);
            }}
          >
            Reset
          </button>
          {profileChecked && (
            <span className="l22-score">
              {profileScore} / {profileFieldKeys.length}
            </span>
          )}
        </div>
      </section>

      <section id="l30-qw-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar</p>
          <h2>Question words with be</h2>
          <p className="lesson22-section-desc">
            Обери правильний варіант у правилі, використовуючи приклади з
            таблиці нижче.
          </p>
        </div>

        <div className="l29-grammar-box">
          <h3>Rule</h3>
          <p className="l29-grammar-rule">
            Question words (<em>where, what, who, how</em>…) come{" "}
            <select
              value={gramAns.q1}
              onChange={(e) => {
                setGramChecked(false);
                setGramAns((p) => ({ ...p, q1: e.target.value }));
              }}
              className={drillSelClass(gramChecked, gramAns.q1, "before")}
              aria-label="Question words come before/after be"
            >
              <option value="">___</option>
              <option value="before">before</option>
              <option value="after">after</option>
            </select>{" "}
            <em>be</em>.
          </p>
          <p className="l29-grammar-rule">
            <em>Be</em> comes{" "}
            <select
              value={gramAns.q2}
              onChange={(e) => {
                setGramChecked(false);
                setGramAns((p) => ({ ...p, q2: e.target.value }));
              }}
              className={drillSelClass(gramChecked, gramAns.q2, "before")}
              aria-label="Be comes before/after the subject"
            >
              <option value="">___</option>
              <option value="before">before</option>
              <option value="after">after</option>
            </select>{" "}
            the subject.
          </p>

          <table className="l29-grammar-table">
            <tbody>
              <tr>
                <td>
                  <strong>Where</strong>
                </td>
                <td>is</td>
                <td>he</td>
                <td>from?</td>
              </tr>
              <tr>
                <td>
                  <strong>What</strong>
                </td>
                <td>is</td>
                <td>her</td>
                <td>name?</td>
              </tr>
              <tr>
                <td>
                  <strong>Who</strong>
                </td>
                <td>is</td>
                <td>that</td>
                <td>man?</td>
              </tr>
              <tr>
                <td>
                  <strong>How old</strong>
                </td>
                <td>are</td>
                <td>they</td>
                <td>?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="l25-cr-actions">
          <button
            className="l22-check-btn"
            onClick={() => setGramChecked(true)}
          >
            Check
          </button>
          {gramChecked && (
            <span className="l22-score">
              {(gramAns.q1 === "before" ? 1 : 0) +
                (gramAns.q2 === "before" ? 1 : 0)}{" "}
              / 2
            </span>
          )}
        </div>

        <table
          className="l29-grammar-examples"
          aria-label="Question words with be — examples"
        >
          <tbody>
            <tr>
              <td>
                <strong>Who are</strong> you?
              </td>
              <td>I'm your new teacher.</td>
            </tr>
            <tr>
              <td>
                <strong>How old is</strong> he?
              </td>
              <td>He's 99 years old!</td>
            </tr>
            <tr>
              <td>
                <strong>What is</strong> her name?
              </td>
              <td>Her name is Anna Chubb.</td>
            </tr>
            <tr>
              <td>
                <strong>Where are</strong> they from?
              </td>
              <td>They're from Canada.</td>
            </tr>
            <tr>
              <td>
                <strong>When is</strong> your class?
              </td>
              <td>At 9.30 a.m.</td>
            </tr>
          </tbody>
        </table>

        <div className="l29-wh-posters" aria-label="WH questions posters">
          <figure className="l29-wh-poster">
            <img
              src={IMG29("wh-questions-meanings.png")}
              alt="WH-Questions: What — things, Who — people, When — time, Where — place, Why — reason"
              width={1126}
              height={1594}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              What / Who / When / Where / Why — коротко про значення
            </figcaption>
          </figure>
          <figure className="l29-wh-poster">
            <img
              src={IMG29("wh-questions-cards.png")}
              alt="WH Questions cards with examples"
              width={682}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <figcaption>WH questions — приклади речень</figcaption>
          </figure>
        </div>

        <div className="l29-qw-ref" aria-label="Question words reference">
          <h3 className="l29-qw-ref-title">Question words</h3>
          <div className="l29-qw-ref-table" role="table">
            {questionWordRows.map((row) => (
              <div
                key={row.word}
                className="l29-qw-ref-row"
                role="row"
                style={{ ["--qw-color" as string]: row.color }}
              >
                <div className="l29-qw-ref-word" role="cell">
                  {row.word}
                </div>
                <div className="l29-qw-ref-info" role="cell">
                  <p className="l29-qw-ref-desc">{row.desc}</p>
                  <p className="l29-qw-ref-ex">
                    <span className="l29-qw-ref-ex-word">{row.word}</span>
                    {row.exampleRest}
                  </p>
                </div>
                <div className="l29-qw-ref-icon" role="cell" aria-hidden="true">
                  <QwIcon kind={row.icon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="l30-pronunciation" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Pronunciation · 6</p>
          <h2>'s in questions</h2>
          <p className="lesson22-section-desc">
            <strong>6a.</strong> Послухай <strong>R14</strong>. Зверни увагу на
            вимову форм <em>be</em>, виділених синім (
            <span className="be">'s</span>).
            <br />
            <strong>6b.</strong> Послухай ще раз і повтори.
          </p>
        </div>
        <ol className="l29-pron-list">
          {pronSentences.map((s) => {
            const idx = s.indexOf("'s");
            if (idx === -1) return <li key={s}>{s}</li>;
            return (
              <li key={s}>
                {s.slice(0, idx)}
                <span className="be">'s</span>
                {s.slice(idx + 2)}
              </li>
            );
          })}
        </ol>
        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioBlock
            r={14}
            exercise="Pronunciation · 6"
            title="'s in questions — listen and repeat"
            transcript={
              <ol>
                {pronSentences.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            }
          />
        </div>
        <div className="l28-task-note" style={{ marginTop: "1rem" }}>
          <strong>6b:</strong> Listen again and repeat.
        </div>
      </section>

      <section id="l30-write-questions" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar · 7</p>
          <h2>Write the questions</h2>
          <p className="lesson22-section-desc">
            Прочитай речення-відповідь і напиши питання з правильним{" "}
            <em>question word</em> і <em>be</em>. Можна писати повну (
            <em>What is…?</em>) або скорочену форму (<em>What's…?</em>).
          </p>
        </div>
        <div className="l29-write-list">
          {writeItems.map((item) => {
            const value = writeAns[item.id] ?? "";
            const ok = item.answers
              .map(normalizeQuestion)
              .includes(normalizeQuestion(value));
            return (
              <div key={item.id} className="l29-write-row">
                <p>
                  <strong>{item.id}.</strong> {item.prompt}
                </p>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setWriteChecked(false);
                    setWriteAns((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }));
                  }}
                  placeholder="Write the question…"
                  className={inputStateClass(
                    writeChecked,
                    value.trim() !== "",
                    ok,
                  )}
                  aria-label={`Question ${item.id}`}
                />
                {writeChecked && !ok && (
                  <p className="l29-write-answer">
                    Наприклад: <strong>{item.answers[0]}</strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setWriteChecked(true)}
          >
            Check answers
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setWriteAns({});
              setWriteChecked(false);
            }}
          >
            Reset
          </button>
          {writeChecked && (
            <span className="l22-score">
              {writeScore} / {writeItems.length}
            </span>
          )}
        </div>
      </section>

      <section id="l30-classmates" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar · 8</p>
          <h2>Ask about people you know</h2>
          <p className="lesson22-section-desc">
            Впиши імена трьох людей з сім'ї (або вигаданих людей). Потім постав
            про кожного 2–3 питання з <em>be</em>, як у прикладі.
          </p>
        </div>
        <div className="l29-family-inputs">
          {classmateNames.map((name, i) => (
            <input
              key={i}
              type="text"
              value={name}
              onChange={(e) => {
                setClassmateNames((prev) => {
                  const next = [...prev];
                  next[i] = e.target.value;
                  return next;
                });
              }}
              placeholder={`Name ${i + 1}`}
              aria-label={`Family name ${i + 1}`}
            />
          ))}
        </div>
        <div className="l29-mini-dlg" aria-label="Example">
          <p>
            <strong>A:</strong> <em>Who's Felipe?</em>
          </p>
          <p>
            <strong>B:</strong> He's a classmate. He's from Brazil.
          </p>
          <p>
            <strong>A:</strong> <em>How old is he?</em>
          </p>
          <p>
            <strong>B:</strong> He's twenty-three.
          </p>
        </div>
      </section>

      {/* ── Part 3 · English in Action · In a shop ── */}
      <section id="l30-shop-scene" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 3 · English in Action · 1</p>
          <h2>In a shop</h2>
          <p className="lesson22-section-desc">
            <strong>Goal:</strong> pay for things in a shop. Подивись на
            картинку. Які речі ти бачиш? Відміть об'єкти зі списку.
          </p>
        </div>

        <figure className="l29-scene">
          <img
            src={IMG29("shop-scene.png")}
            alt="Second-hand shop: customer and assistant, chairs, clock, laptop, cups, boxes and price tags"
            width={919}
            height={524}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="l28-scene-cap" style={{ marginTop: "0.4rem" }}>
            Look at the picture. What objects can you see?
          </figcaption>
        </figure>

        <div className="l29-shop-checks">
          {shopObjects.map((o) => (
            <label key={o.id} className="l29-shop-check">
              <input
                type="checkbox"
                checked={!!seeObj[o.id]}
                onChange={(e) =>
                  setSeeObj((prev) => ({ ...prev, [o.id]: e.target.checked }))
                }
              />
              <span>
                {o.label} <em>({o.price})</em>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section id="l30-shop-listen" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 3 · English in Action · 2a–2b</p>
          <h2>Listen in the shop</h2>
          <p className="lesson22-section-desc">
            <strong>2a.</strong> Послухай <strong>R20</strong>. Які речі купує
            чоловік? Відміть правильні.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0 0 1rem" }}>
          <AudioBlock
            r={20}
            exercise="English in Action · 2"
            title="In a shop — listen"
            transcript={shopR20Transcript}
          />
        </div>

        <h3 className="l29-shop-subh">2a · What does he buy?</h3>
        <div className="l29-shop-checks">
          {(["book", "cups", "clock", "pen", "chair"] as const).map((id) => {
            const labels: Record<string, string> = {
              book: "a book",
              cups: "cups",
              clock: "a clock",
              pen: "a pen",
              chair: "a chair",
            };
            let cls = "l29-shop-check";
            if (buyChecked) {
              const selected = !!buyObj[id];
              const correct = (buyAnswers as readonly string[]).includes(id);
              if (selected && correct) cls += " is-ok";
              else if (selected && !correct) cls += " is-err";
              else if (!selected && correct) cls += " is-miss";
            }
            return (
              <label key={id} className={cls}>
                <input
                  type="checkbox"
                  checked={!!buyObj[id]}
                  onChange={(e) => {
                    setBuyChecked(false);
                    setBuyObj((prev) => ({ ...prev, [id]: e.target.checked }));
                  }}
                />
                <span>{labels[id]}</span>
              </label>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            className="l22-check-btn"
            type="button"
            onClick={() => setBuyChecked(true)}
          >
            Check 2a
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setBuyObj({});
              setBuyChecked(false);
            }}
          >
            Reset
          </button>
          {buyChecked && (
            <span className="l22-score">
              {buyOk
                ? "✓ clock + cups"
                : `${buyScore} correct · ${buyWrong} wrong`}
            </span>
          )}
        </div>

        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          <strong>2b.</strong> Послухай ще раз і познач у рамці{" "}
          <em>Useful phrases</em> фрази, які ти чуєш.
        </p>

        <div className="l29-phrases-box">
          <h3>Useful phrases</h3>
          <div className="l29-phrases-cols">
            <div>
              <h4>Customer</h4>
              <ul className="l29-phrases-ticklist">
                {customerPhrases.map((p) => {
                  let cls = "l29-phrases-tick";
                  if (phraseChecked) {
                    const selected = !!phraseTick[p];
                    const correct = heardInR20.has(p);
                    if (selected && correct) cls += " is-ok";
                    else if (selected && !correct) cls += " is-err";
                    else if (!selected && correct) cls += " is-miss";
                  }
                  return (
                    <li key={p}>
                      <label className={cls}>
                        <input
                          type="checkbox"
                          checked={!!phraseTick[p]}
                          onChange={(e) => {
                            setPhraseChecked(false);
                            setPhraseTick((prev) => ({
                              ...prev,
                              [p]: e.target.checked,
                            }));
                          }}
                        />
                        <span>{p}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4>Shop assistant</h4>
              <ul className="l29-phrases-ticklist">
                {assistantPhrases.map((p) => {
                  let cls = "l29-phrases-tick";
                  if (phraseChecked) {
                    const selected = !!phraseTick[p];
                    const correct = heardInR20.has(p);
                    if (selected && correct) cls += " is-ok";
                    else if (selected && !correct) cls += " is-err";
                    else if (!selected && correct) cls += " is-miss";
                  }
                  return (
                    <li key={p}>
                      <label className={cls}>
                        <input
                          type="checkbox"
                          checked={!!phraseTick[p]}
                          onChange={(e) => {
                            setPhraseChecked(false);
                            setPhraseTick((prev) => ({
                              ...prev,
                              [p]: e.target.checked,
                            }));
                          }}
                        />
                        <span>{p}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            className="l22-check-btn"
            type="button"
            onClick={() => setPhraseChecked(true)}
          >
            Check 2b
          </button>
          <button
            className="l29-reset-btn"
            type="button"
            onClick={() => {
              setPhraseTick({});
              setPhraseChecked(false);
            }}
          >
            Reset
          </button>
          {phraseChecked && (
            <span className="l22-score">
              {phraseScore} / {heardInR20.size}
              {phraseExtra ? ` · ${phraseExtra} extra` : ""}
            </span>
          )}
        </div>
      </section>

      <section id="l30-shop-repeat" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 3 · English in Action · 2c</p>
          <h2>Listen and repeat</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R21</strong> і повтори корисні фрази вголос.
          </p>
        </div>
        <div className="l25-audio-list">
          <AudioBlock
            r={21}
            exercise="English in Action · 2c"
            title="Useful phrases — listen and repeat"
            transcript={shopR21Transcript}
          />
        </div>
      </section>

      <section id="l30-shop-roleplay" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 3 · English in Action · 3b–4</p>
          <h2>Roleplay</h2>
          <p className="lesson22-section-desc">
            Попрактикуй діалог. Один — покупець, другий — продавець. Використай
            ціни з картинки.
          </p>
        </div>

        <figure className="l29-scene">
          <img
            src={IMG29("shop-scene.png")}
            alt="In a shop — objects and prices for roleplay"
            width={919}
            height={524}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="l28-scene-cap" style={{ marginTop: "0.4rem" }}>
            In a shop
          </figcaption>
        </figure>
      </section>

      {/* ── Days of the week ── */}
      <section id="l30-days" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary check · Days of the week</p>
          <h2>Days of the week</h2>
          <p className="lesson22-section-desc">
            Згадай дні тижня англійською: match UA → EN, порядок днів, і{" "}
            <strong>on Monday</strong> / <strong>at the weekend</strong>.
          </p>
        </div>

        <div className="l30-days-strip" aria-label="Days of the week">
          {daysOfWeek.map((d, i) => (
            <div key={d.en} className="l30-day-chip">
              <span className="l30-day-num">{i + 1}</span>
              <strong>{d.en}</strong>
              <span>{d.ua}</span>
            </div>
          ))}
        </div>

        <div
          className="l25-conf-card"
          style={{ maxWidth: 640, marginBottom: "1rem" }}
        >
          <div className="l25-conf-header">Remember</div>
          <div className="l25-conf-fields">
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                lineHeight: 1.55,
              }}
            >
              <strong>on</strong> + day: on Monday, on Friday, on Sundays
              <br />
              <strong>at</strong> the weekend
              <br />
              Saturday + Sunday = the <strong>weekend</strong>
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">1 · Match · UA → EN</h3>
        <div className="l26-drill-list">
          {daysWeekMatch.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={daysMatchAns[q.id] ?? ""}
                onChange={(e) => {
                  setDaysMatchChecked(false);
                  setDaysMatchAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  daysMatchChecked,
                  daysMatchAns[q.id] ?? "",
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
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setDaysMatchChecked(true)}
          >
            Check
          </button>
          {daysMatchChecked && (
            <span className="l22-score">
              {daysMatchScore} / {daysWeekMatch.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">2 · Order</h3>
        <div className="l26-drill-list">
          {daysWeekOrder.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={daysOrderAns[q.id] ?? ""}
                onChange={(e) => {
                  setDaysOrderChecked(false);
                  setDaysOrderAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  daysOrderChecked,
                  daysOrderAns[q.id] ?? "",
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
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setDaysOrderChecked(true)}
          >
            Check
          </button>
          {daysOrderChecked && (
            <span className="l22-score">
              {daysOrderScore} / {daysWeekOrder.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">3 · Grammar · on / at</h3>
        <div className="l26-drill-list">
          {daysWeekGrammar.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={daysGramAns[q.id] ?? ""}
                onChange={(e) => {
                  setDaysGramChecked(false);
                  setDaysGramAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  daysGramChecked,
                  daysGramAns[q.id] ?? "",
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
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setDaysGramChecked(true)}
          >
            Check
          </button>
          {daysGramChecked && (
            <span className="l22-score">
              {daysGramScore} / {daysWeekGrammar.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">4 · Speak</h3>
        <div className="lesson22-prompt-grid">
          {daysWeekSpeak.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* ── All topics map + stations ── */}
      <section id="l30-topics" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">All topics · Lessons 1–29</p>
          <h2>Topic stations</h2>
          <p className="lesson22-section-desc">
            Обери тему → speaking prompts → mini quiz. Пройди{" "}
            <strong>усі {topicStations.length} станції</strong> — це повна
            перевірка фундаменту A1.
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

      {/* ── Speaking tour · all topics ── */}
      <section id="l30-speak-tour" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking tour · all topics</p>
          <h2>Short speaking on every theme</h2>
          <p className="lesson22-section-desc">
            Невеличкий спікінг по <strong>кожній</strong> пройденій темі: 1
            коротке завдання → 1–3 речення вголос. Партнер слухає / ставить 1
            питання. Відміть картку, коли сказав.
          </p>
        </div>

        <p className="l30-topic-progress">
          Spoken: {speakDone.size} / {speakingTour.length}
        </p>

        <div className="l30-speak-tour">
          {speakingTour.map((card, i) => {
            const done = speakDone.has(card.id);
            return (
              <article
                key={card.id}
                className={`l30-speak-card${done ? " is-done" : ""}`}
              >
                <header className="l30-speak-card-head">
                  <span className="l30-speak-num">{i + 1}</span>
                  <span className="l30-speak-topic">{card.topic}</span>
                </header>
                <p className="l30-speak-prompt">{card.prompt}</p>
                <p className="l30-speak-model">
                  <em>Model:</em> {card.model}
                </p>
                <button
                  type="button"
                  className={`l30-speak-mark${done ? " is-on" : ""}`}
                  onClick={() =>
                    setSpeakDone((prev) => {
                      const next = new Set(prev);
                      if (next.has(card.id)) next.delete(card.id);
                      else next.add(card.id);
                      return next;
                    })
                  }
                >
                  {done ? "✓ Said" : "Mark as said"}
                </button>
              </article>
            );
          })}
        </div>

        <p className="l25-cr-hint" style={{ marginTop: "0.85rem" }}>
          Tip: 20–30 секунд на картку. Не перекладай слово-в-слово — кажи прості
          фрази.
        </p>
      </section>

      {/* ── 1 Warm-up ── */}
      <section id="l30-warmup" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Extra warm-up</p>
          <h2>Very easy questions — no script</h2>
          <p className="lesson22-section-desc">
            Додатково після tour: швидкі питання без опори на текст.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {warmUpQs.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* ── 2 Profile ── */}
      <section id="l30-profile" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speaking · personal profile</p>
          <h2>Tell me about yourself (5–7 sentences)</h2>
          <p className="lesson22-section-desc">
            З пам’яті: name, age, origin, job/studies, family, appearance,
            hobbies. Спочатку модель — потім ти.
          </p>
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 680 }}>
          <div className="l25-conf-header">Model · Olena</div>
          <div className="l25-conf-fields">
            {profileModel.map((para) => (
              <p
                key={para.slice(0, 28)}
                style={{
                  margin: 0,
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.55,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Scaffold (якщо треба)</h3>
        <div className="lesson22-prompt-grid">
          {profileScaffold.map((s) => (
            <div
              key={s}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {s}
            </div>
          ))}
        </div>

        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Partner task: A говорить 5–7 речень. B ставить 2 питання (
          <em>Where…? / What…? / How old…?</em>). Потім поміняйтесь.
        </p>
      </section>

      {/* ── 3 Family & jobs ── */}
      <section id="l30-family" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Family &amp; jobs review</p>
          <h2>Photos + job cards</h2>
          <p className="lesson22-section-desc">
            Скажи, хто на фото і ким працює. Потім — job cards: job + place of
            work. Перевір possessives у короткому quiz.
          </p>
        </div>

        <h3 className="l22-listen-subtitle">
          Family photos (Cristina's family)
        </h3>
        <div className="l27-photo-bank">
          {familyCards.map((c) => (
            <figure key={c.id} className="l27-photo-card">
              <img
                src={IMG27(c.file)}
                alt={`${c.name} — ${c.job}`}
                loading="lazy"
              />
              <figcaption>
                <strong>{c.prompt}</strong>
                <button
                  type="button"
                  className="l25-cr-mini-btn"
                  style={{ marginTop: "0.35rem" }}
                  onClick={() => toggleCard(c.id)}
                >
                  {cardOpen.has(c.id) ? "Hide" : "Model →"}
                </button>
                {cardOpen.has(c.id) && (
                  <span className="l25-cr-answer l25-cr-answer--green">
                    {c.answerWho} {c.answerJob}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">Job cards — say the job + place</h3>
        <div className="l30-job-grid">
          {jobCards.map((j) => (
            <button
              key={j.en}
              type="button"
              className={`l30-job-card${jobOpen.has(j.en) ? " is-open" : ""}`}
              onClick={() => toggleJob(j.en)}
            >
              <span className="l30-job-title">{j.en}</span>
              {jobOpen.has(j.en) ? (
                <span className="l30-job-place">
                  works {j.place}
                  <br />
                  <em>{j.example}</em>
                </span>
              ) : (
                <span className="l30-job-hint">tap → place of work</span>
              )}
            </button>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">
          Quick check · possessives &amp; be
        </h3>
        <div className="l26-drill-list">
          {familyJobMatch.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={famAns[q.id] ?? ""}
                onChange={(e) => {
                  setFamChecked(false);
                  setFamAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  famChecked,
                  famAns[q.id] ?? "",
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
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setFamChecked(true)}
          >
            Check
          </button>
          {famChecked && (
            <span className="l22-score">
              {famScore} / {familyJobMatch.length}
            </span>
          )}
        </div>
      </section>

      {/* ── 4 Reading ── */}
      <section id="l30-reading" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Reading in chunks</p>
          <h2>Marco's profile</h2>
          <p className="lesson22-section-desc">
            Читай по одному chunk (1–2 речення). Після кожного: відповідай на
            питання → повтори chunk → коротко скажи головну думку.
          </p>
        </div>

        <div className="l27-chunk-tabs" role="tablist">
          {readingChunks.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={openChunk === c.id}
              className={`l27-chunk-tab${openChunk === c.id ? " is-active" : ""}`}
              onClick={() => {
                setOpenChunk(c.id);
                setChunkChecked(false);
              }}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div className="l27-chunk-panel">
          <p>{activeChunk.text}</p>
        </div>

        <div className="l26-drill-row" style={{ marginTop: "0.75rem" }}>
          <strong className="l26-drill-prompt">{activeChunk.question}</strong>
          <select
            value={chunkAns[openChunk] ?? ""}
            onChange={(e) => {
              setChunkChecked(false);
              setChunkAns((p) => ({ ...p, [openChunk]: e.target.value }));
            }}
            className={drillSelClass(
              chunkChecked,
              chunkAns[openChunk] ?? "",
              activeChunk.answer,
            )}
            aria-label={activeChunk.question}
          >
            <option value="">___</option>
            {activeChunk.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setChunkChecked(true)}
          >
            Check this chunk
          </button>
          {chunkChecked && (
            <span className="l22-score">
              This chunk:{" "}
              {chunkAns[openChunk] === activeChunk.answer ? "✓" : "✗"} · All:{" "}
              {chunkScore} / {readingChunks.length}
            </span>
          )}
        </div>

        <details className="l25-details" style={{ marginTop: "0.75rem" }}>
          <summary className="l25-details-toggle">📄 Full text</summary>
          <div className="l25-details-body">
            {readingChunks.map((c) => (
              <p key={c.id}>{c.text}</p>
            ))}
          </div>
        </details>

        <p className="l25-cr-hint" style={{ marginTop: "0.75rem" }}>
          After all chunks: summarize Marco in{" "}
          <strong>one or two sentences</strong> (name, job, family).
        </p>
      </section>

      {/* ── Reading comprehension · A Horse ── */}
      <section id="l30-horse" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4b · Reading comprehension</p>
          <h2>Worksheet · A Horse</h2>
          <p className="lesson22-section-desc">
            Прочитай текст і напиши короткі відповіді. Потім натисни Check.
          </p>
        </div>

        <div className="l30-ws">
          <header className="l30-ws-header">
            <div
              className="l30-ws-deco l30-ws-deco--cloud"
              aria-hidden="true"
            />
            <div className="l30-ws-deco l30-ws-deco--sun" aria-hidden="true" />
            <h3 className="l30-ws-title">A Horse</h3>
            <p className="l30-ws-badge">Reading Comprehension</p>
          </header>

          <div className="l30-ws-body">
            <div className="l30-ws-left">
              <figure className="l30-ws-photo">
                <img
                  src={IMG30("horse.jpg")}
                  alt="A horse in a green field"
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="l30-ws-pos-legend" aria-label="Parts of speech">
                <p className="l30-ws-pos-hint">
                  Натисни на слово — підкреслиться частина мови (підмет,
                  присудок…). Натисни знову або на лейбл, щоб скинути / показати
                  всі такі слова.
                </p>
                <div className="l30-ws-pos-chips">
                  {(Object.keys(horsePosMeta) as HorsePos[]).map((pos) => {
                    const meta = horsePosMeta[pos];
                    const on = horsePosFilter === pos;
                    return (
                      <button
                        key={pos}
                        type="button"
                        className={`l30-ws-pos-chip${on ? " is-on" : ""}`}
                        style={
                          {
                            "--pos-color": meta.color,
                          } as CSSProperties
                        }
                        onClick={() => {
                          setHorsePosFilter((prev) =>
                            prev === pos ? null : pos,
                          );
                          setHorseActiveWord(null);
                        }}
                      >
                        <span className="l30-ws-pos-swatch" />
                        {meta.ua}
                      </button>
                    );
                  })}
                </div>
              </div>
              <article className="l30-ws-text" aria-label="Reading text">
                {horseSentences.map((sentence, si) => (
                  <p key={si} className="l30-ws-sent">
                    {sentence.tokens.map((tok, ti) => {
                      const key = `${si}-${ti}`;
                      const activePos = tok.pos;
                      const isFiltered =
                        horsePosFilter != null && activePos === horsePosFilter;
                      const isClicked = horseActiveWord === key;
                      const show = isFiltered || isClicked;
                      const color = activePos
                        ? horsePosMeta[activePos].color
                        : undefined;
                      return (
                        <span key={key} className="l30-ws-tok-wrap">
                          {tok.pos ? (
                            <button
                              type="button"
                              className={`l30-ws-word${show ? " is-marked" : ""}${isClicked ? " is-focus" : ""}`}
                              style={
                                show && color
                                  ? ({
                                      "--pos-color": color,
                                    } as CSSProperties)
                                  : undefined
                              }
                              title={`${horsePosMeta[tok.pos].ua} (${horsePosMeta[tok.pos].en})`}
                              onClick={() => {
                                if (horseActiveWord === key) {
                                  setHorseActiveWord(null);
                                  setHorsePosFilter(null);
                                  return;
                                }
                                setHorseActiveWord(key);
                                setHorsePosFilter(tok.pos ?? null);
                              }}
                            >
                              {tok.w}
                              {isClicked && tok.pos && (
                                <span className="l30-ws-word-tag">
                                  {horsePosMeta[tok.pos].ua}
                                </span>
                              )}
                            </button>
                          ) : (
                            <span>{tok.w}</span>
                          )}
                          {tok.after ?? ""}
                          {ti < sentence.tokens.length - 1 ? " " : ""}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </article>
            </div>

            <aside className="l30-ws-questions">
              <div className="l30-ws-q-head">
                <span>Questions</span>
              </div>
              <ol className="l30-ws-q-list">
                {horseQuestions.map((q) => {
                  const val = horseAns[q.id] ?? "";
                  const ok = checkHorseAnswer(val, q.answers);
                  let lineClass = "l30-ws-line";
                  if (horseChecked) {
                    lineClass += ok
                      ? " l30-ws-line--ok"
                      : val.trim()
                        ? " l30-ws-line--err"
                        : " l30-ws-line--err";
                  }
                  return (
                    <li key={q.id} className="l30-ws-q-item">
                      <div className="l30-ws-q-prompt">
                        <span
                          className={`l30-ws-num l30-ws-num--${q.id}`}
                          aria-hidden="true"
                        >
                          {q.id}
                        </span>
                        <span>{q.prompt}</span>
                      </div>
                      <input
                        type="text"
                        className={lineClass}
                        value={val}
                        onChange={(e) => {
                          setHorseChecked(false);
                          setHorseAns((p) => ({
                            ...p,
                            [q.id]: e.target.value,
                          }));
                        }}
                        placeholder="Write your answer…"
                        aria-label={q.prompt}
                        autoComplete="off"
                        spellCheck={false}
                      />
                      {horseChecked && !ok && (
                        <span className="l30-ws-hint">e.g. {q.answers[0]}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
              <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
                <button
                  type="button"
                  className="l22-check-btn"
                  onClick={() => setHorseChecked(true)}
                >
                  Check answers
                </button>
                <button
                  type="button"
                  className="l25-cr-mini-btn"
                  onClick={() => {
                    setHorseAns({});
                    setHorseChecked(false);
                  }}
                >
                  Reset
                </button>
                {horseChecked && (
                  <span className="l22-score">
                    {horseScore} / {horseQuestions.length}
                  </span>
                )}
              </div>
            </aside>
          </div>

          <footer className="l30-ws-footer">
            <span className="l30-ws-shoe" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M7 3c-2.2 0-4 2.2-4 5v4c0 1.7.7 3.2 1.8 4.2L3 21h3.2l1.3-3.5c.5.2 1 .3 1.5.3h2c.5 0 1-.1 1.5-.3L13.8 21H17l-1.8-4.8C16.3 15.2 17 13.7 17 12V8c0-2.8-1.8-5-4-5-1.2 0-2.3.6-3 1.5C9.3 3.6 8.2 3 7 3zm0 2.5c.8 0 1.5.9 1.5 2v4.2c0 .8-.3 1.4-.8 1.8L6.5 18H5.2l1.1-2.9c-.8-.8-1.3-1.9-1.3-3.1V8c0-1.5.9-2.5 2-2.5zm6 0c1.1 0 2 1 2 2.5v3.8c0 1.2-.5 2.3-1.3 3.1l1.1 2.9h-1.3l-1.2-3.5c-.5-.4-.8-1-.8-1.8V7.5c0-1.1.7-2 1.5-2z" />
              </svg>
            </span>
            <p>
              <strong>Fun fact:</strong> {horseFunFact}
            </p>
          </footer>
          <div className="l30-ws-flowers" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      {/* ── 5 Listening ── */}
      <section id="l30-listening" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Listening</p>
          <h2>Yasemin &amp; Tara — family photo</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R4</strong> (Unit 2). Лови головну думку: хто в
            сім’ї, звідки, імена. Потім 5 простих питань.
          </p>
        </div>

        <div className="l25-audio-list">
          <AudioBlock
            r={4}
            exercise="Unit 2 · 2.4"
            title="Family photo dialogue"
            transcript={
              <p>
                Y: This is a photo of my family.
                <br />
                T: Wow! Is this your mother and father? What are their names?
                <br />
                Y: My father's name is Emir. He's from Turkey. My mother's
                English. Her name's Linda.
                <br />
                T: OK. So is this your brother?
                <br />
                Y: No, it isn't. That's our friend from Ankara. This is my
                brother here. His name's Ali.
              </p>
            }
          />
        </div>

        <h3 className="l22-listen-subtitle">Check understanding</h3>
        <div className="l26-drill-list">
          {listenQs.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={listenAns[q.id] ?? ""}
                onChange={(e) => {
                  setListenChecked(false);
                  setListenAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  listenChecked,
                  listenAns[q.id] ?? "",
                  q.answer,
                )}
              >
                <option value="">___</option>
                {q.options.map((o) => (
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
            onClick={() => setListenChecked(true)}
          >
            Check
          </button>
          {listenChecked && (
            <span className="l22-score">
              {listenScore} / {listenQs.length}
            </span>
          )}
        </div>
      </section>

      {/* ── 6 Writing ── */}
      <section id="l30-writing" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Short writing</p>
          <h2>My personal profile</h2>
          <p className="lesson22-section-desc">
            Напиши 8–12 речень про себе, охопивши різні теми: name, age, from /
            nationality, job, family, appearance, routine, free time, can /
            can't. Без підказки або з мінімальною опорою.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="l30-writing-box">
          Your text:
        </label>
        <textarea
          id="l30-writing-box"
          className="hw27-textarea"
          rows={10}
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder="My name is… I'm … years old. I'm from… I live in… I'm a… / I work as… In my family… I have… hair. In my free time…"
        />
        <p className="l25-cr-hint" style={{ marginTop: "0.5rem" }}>
          Self-check: скільки речень? Чи є <em>am / is / are</em>? Чи є{" "}
          <em>my / his / her</em>?
        </p>
      </section>

      {/* ── 7 Correction ── */}
      <section id="l30-correction" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Quick correction</p>
          <h2>Common A1 mistakes</h2>
          <p className="lesson22-section-desc">
            their / they're · your / you're · its / it's · is / are · a / an ·
            jobs · nationality.
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

      {/* ── Reflect ── */}
      <section id="l30-reflect" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident are you?</h2>
          <p className="lesson22-section-desc">
            1 = not very confident · 5 = very confident. Це покаже, що вже можна
            «закривати», а що повторити в наступному циклі.
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
                    onClick={() => setReflect((prev) => ({ ...prev, [i]: n }))}
                  >
                    {n}
                  </button>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <h3 className="l22-listen-subtitle">Good A1 result — can you…?</h3>
        <div className="l30-can-list">
          {canChecklist.map((item, i) => {
            const on = canDone.has(i);
            return (
              <button
                key={item}
                type="button"
                className={`l30-can-item${on ? " is-on" : ""}`}
                onClick={() =>
                  setCanDone((prev) => {
                    const next = new Set(prev);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
              >
                <span aria-hidden="true">{on ? "✓" : "○"}</span>
                {item}
              </button>
            );
          })}
        </div>

        <div className="l30-note">
          <strong>Realistic A1:</strong> ти можеш говорити про себе і близьких,
          розуміти прості тексти й аудіо, будувати коротке усне повідомлення.
          Помилки нормальні. Не очікуй вільного мовлення чи швидкого native
          speech — фундамент важливіший.
        </div>
      </section>

      {/* ── After ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After class</p>
          <h2>What next?</h2>
          <p className="lesson22-section-desc">
            Повтори слабкі теми (family / jobs / possessives / numbers) і
            продовжуй speaking без перекладу слово-в-слово.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/hw-30"
          >
            A1 Level Test →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/hw-29"
          >
            HW29 Check &amp; Reflect →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/vocab"
          >
            Vocab bank →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-27"
          >
            ← Lesson 27 family
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-26"
          >
            ← Lesson 26 jobs
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
