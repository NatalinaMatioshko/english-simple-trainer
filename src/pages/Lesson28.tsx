import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson28.css";

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson28/${file}`;

const SOUND = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_2/RM_A1_SB_U2_R${r}.mp3`;

/** ELLLO A1-06 · Present Simple third person — bridge before Part 2 */
const VIDEO_ID = "1mKeXz5Bf7c";

const videoQuiz = [
  {
    id: 1,
    prompt: "Where does his mom work?",
    options: ["in a factory", "in a shop in the mall", "at home"],
    answer: "in a shop in the mall",
  },
  {
    id: 2,
    prompt: "Does she sell clothing for teens?",
    options: ["Yes, she does.", "No, only for adults.", "We don't know."],
    answer: "No, only for adults.",
  },
  {
    id: 3,
    prompt: "What does her brother study?",
    options: ["medicine", "engineering", "art"],
    answer: "engineering",
  },
  {
    id: 4,
    prompt: "Does he live at home?",
    options: ["Yes, he does.", "No — he has a small apartment.", "With friends."],
    answer: "No — he has a small apartment.",
  },
  {
    id: 5,
    prompt: "Who watches her daughter after school?",
    options: ["her dad", "her mom / grandma", "a teacher"],
    answer: "her mom / grandma",
  },
  {
    id: 6,
    prompt: "When does the movie start?",
    options: ["in about ten minutes", "tomorrow", "it already ended"],
    answer: "in about ten minutes",
  },
] as const;

const videoGrammarQuiz = [
  {
    id: 1,
    prompt: "She ___ women’s clothing. (sell)",
    options: ["sell", "sells", "selling"],
    answer: "sells",
  },
  {
    id: 2,
    prompt: "He ___ engineering. (study)",
    options: ["study", "studys", "studies"],
    answer: "studies",
  },
  {
    id: 3,
    prompt: "___ she live at home?",
    options: ["Do", "Does", "Is"],
    answer: "Does",
  },
  {
    id: 4,
    prompt: "He ___ have much free time.",
    options: ["don't", "doesn't", "isn't"],
    answer: "doesn't",
  },
] as const;

const videoSpeakPrompts = [
  "What does your mom / dad do?",
  "Where does he / she work?",
  "Does your brother / sister live at home?",
  "Talk about a friend: He / She works… / studies… / lives…",
] as const;

type SpeakingTopic = {
  id: number;
  title: string;
  hint: string;
  questions: string[];
};

/** Word bank a–l (from the Student's Book matching task) */
const objectBank = [
  { letter: "a", en: "a book", file: "book.jpg" },
  { letter: "b", en: "a phone", file: "phone.jpg" },
  { letter: "c", en: "a desk", file: "desk.jpg" },
  { letter: "d", en: "a key", file: "key.jpg" },
  { letter: "e", en: "a table", file: "table.jpg" },
  { letter: "f", en: "a clock", file: "clock.jpg" },
  { letter: "g", en: "a photo", file: "photo.jpg" },
  { letter: "h", en: "a computer", file: "computer.jpg" },
  { letter: "i", en: "a box", file: "box.jpg" },
  { letter: "j", en: "a chair", file: "chair.jpg" },
  { letter: "k", en: "a cup", file: "cup.jpg" },
  { letter: "l", en: "a pen", file: "pen.jpg" },
] as const;

/** Pictures 1–12 (shuffled order for matching) */
const objectPictures = [
  { num: 1, letter: "j" },
  { num: 2, letter: "a" },
  { num: 3, letter: "h" },
  { num: 4, letter: "k" },
  { num: 5, letter: "d" },
  { num: 6, letter: "f" },
  { num: 7, letter: "e" },
  { num: 8, letter: "l" },
  { num: 9, letter: "b" },
  { num: 10, letter: "i" },
  { num: 11, letter: "g" },
  { num: 12, letter: "c" },
] as const;

const bankByLetter = Object.fromEntries(
  objectBank.map((item) => [item.letter, item]),
);

/** Close-up mystery photos 1–8 (What’s number…?) */
const closeupPhotos = [
  { num: 1, en: "a pen", file: "closeups/1-pen.jpg" },
  { num: 2, en: "a clock", file: "closeups/2-clock.jpg" },
  { num: 3, en: "a bench", file: "closeups/3-bench.jpg" },
  { num: 4, en: "a book", file: "closeups/4-book.jpg" },
  { num: 5, en: "coffee", file: "closeups/5-coffee.jpg" },
  { num: 6, en: "a key", file: "key.jpg" },
  { num: 7, en: "a box", file: "box.jpg" },
  { num: 8, en: "a phone", file: "closeups/8-phone.jpg" },
] as const;

/** Everyday activity verbs (poster support for Part 1 speaking) */
const dailyVerbs = [
  { en: "have breakfast", ua: "снідати" },
  { en: "go / walk", ua: "йти" },
  { en: "play", ua: "грати" },
  { en: "write", ua: "писати" },
  { en: "read", ua: "читати" },
  { en: "sleep", ua: "спати" },
  { en: "work", ua: "працювати" },
  { en: "cook", ua: "готувати" },
  { en: "draw", ua: "малювати" },
  { en: "ride / go by bike", ua: "їхати" },
] as const;

const speakingTopics: SpeakingTopic[] = [
  {
    id: 1,
    title: "Personal information",
    hint: "Початок будь-якого speaking",
    questions: [
      "What’s your name?",
      "How do you spell your name?",
      "Where are you from?",
      "What city do you live in?",
      "How old are you?",
      "Do you study or work?",
      "What do you do?",
    ],
  },
  {
    id: 2,
    title: "Family",
    hint: "Для теми family / relatives",
    questions: [
      "Do you have a family?",
      "Who is in your family?",
      "Do you have a mother, father, sister, or brother?",
      "How many brothers and sisters do you have?",
      "What does your mother do?",
      "What does your father do?",
      "Do you have any nephews or nieces?",
      "Where does your family live?",
      "Is your family big or small?",
      "Who do you live with?",
    ],
  },
  {
    id: 3,
    title: "Appearance",
    hint: "Для опису зовнішності",
    questions: [
      "What do you look like?",
      "Do you have long or short hair?",
      "What colour is your hair?",
      "Do you have blue, green, brown, or grey eyes?",
      "Are you tall or short?",
      "Are you slim or strong?",
      "Do you wear glasses?",
      "What is your favourite clothes style?",
      "Can you describe your best friend?",
      "Can you describe a family member?",
    ],
  },
  {
    id: 4,
    title: "Jobs and work",
    hint: "Для теми професій",
    questions: [
      "What is your job?",
      "Where do you work?",
      "What do you do at work?",
      "Do you like your job?",
      "Is your job interesting or boring?",
      "What does your mother/father/sister/brother do?",
      "Is your work busy?",
      "Do you work from home or in an office?",
      "What time do you start work?",
      "What time do you finish work?",
    ],
  },
  {
    id: 5,
    title: "Daily routines",
    hint: "Для present simple",
    questions: [
      "What time do you get up?",
      "What do you do in the morning?",
      "Do you drink coffee or tea?",
      "Do you have breakfast every day?",
      "What time do you go to work / study?",
      "Do you watch TV in the evening?",
      "What do you do before bed?",
      "What time do you go to sleep?",
      "Do you exercise?",
      "What do you do on weekdays?",
    ],
  },
  {
    id: 6,
    title: "Free time and hobbies",
    hint: "Для hobbies / likes",
    questions: [
      "What do you like doing in your free time?",
      "Do you like reading?",
      "Do you like cooking?",
      "Do you like watching videos on YouTube?",
      "Do you play any sports?",
      "Do you go running or hiking?",
      "Do you meet your friends?",
      "What is your favourite hobby?",
      "How often do you do it?",
      "Do you prefer quiet hobbies or active hobbies?",
    ],
  },
  {
    id: 7,
    title: "Possessions and home",
    hint: "Для have got / there is / there are",
    questions: [
      "Do you have your own room?",
      "What is in your room?",
      "Do you have a laptop, phone, or tablet?",
      "What furniture do you have at home?",
      "Is there a big kitchen in your home?",
      "How many rooms are there in your flat/house?",
      "Who has the biggest room?",
      "What is your favourite thing at home?",
      "Do you have a pet?",
      "What is your pet’s name?",
    ],
  },
  {
    id: 8,
    title: "Places and city",
    hint: "Для city / places / directions",
    questions: [
      "What city do you live in?",
      "What places are there in your city?",
      "Is there a park near your home?",
      "Is there a cafe, school, hospital, or shop near you?",
      "What places do you visit often?",
      "Do you like your city?",
      "What is your favourite place in the city?",
      "Do you know any nice places to walk?",
      "How do you go to work / school?",
      "Can you describe your neighbourhood?",
    ],
  },
  {
    id: 9,
    title: "Countries and nationalities",
    hint: "Для repeat of be + countries",
    questions: [
      "Where are you from?",
      "What nationality are you?",
      "What languages do you speak?",
      "Have you visited another country?",
      "Which countries do you know?",
      "Do you want to visit Japan / Italy / Spain / the UK?",
      "What country would you like to live in?",
      "Is your friend from Ukraine too?",
      "Do you know people from other countries?",
      "What is your favourite country?",
    ],
  },
  {
    id: 10,
    title: "People you know",
    hint: "Для mixed speaking",
    questions: [
      "Tell me about your mother.",
      "Tell me about your brother.",
      "Tell me about your friend.",
      "What does she/he do?",
      "How old is he/she?",
      "Where does he/she live?",
      "What does he/she like?",
      "Is he/she married?",
      "Does he/she have children?",
      "What is he/she like?",
    ],
  },
  {
    id: 11,
    title: "Likes and preferences",
    hint: "Для простого opinion speaking",
    questions: [
      "What do you like?",
      "What don’t you like?",
      "Do you like coffee?",
      "Do you like shopping?",
      "Do you like reading books?",
      "Do you like travelling?",
      "What is your favourite food?",
      "What is your favourite drink?",
      "Which do you prefer: tea or coffee?",
      "Why do you like it?",
    ],
  },
];

const askBackExamples = [
  {
    cue: "My name’s Natalie.",
    ask: "What’s your name?",
  },
  {
    cue: "I’m from Ukraine.",
    ask: "Where are you from?",
  },
  {
    cue: "I live in Kyiv.",
    ask: "What city do you live in?",
  },
  {
    cue: "I’m a teacher.",
    ask: "What do you do? / What’s your job?",
  },
  {
    cue: "I have a sister.",
    ask: "Do you have a sister? / Who is in your family?",
  },
  {
    cue: "I get up at seven.",
    ask: "What time do you get up?",
  },
  {
    cue: "I have a friend. Her name’s Tracy.",
    ask: "Do you have a friend? / What’s her name?",
  },
  {
    cue: "She lives in Scotland, but she isn’t Scottish.",
    ask: "Where does she live? / Is she Scottish?",
  },
];

type AudioTrackData = {
  r: number;
  exercise: string;
  title: string;
  transcript: ReactNode;
};

const trackR5: AudioTrackData = {
  r: 5,
  exercise: "Vocabulary · 1",
  title: "Match 1–12 with a–l — listen and check",
  transcript: (
    <p>
      a a book · b a phone · c a desk · d a key · e a table · f a clock · g a
      photo · h a computer · i a box · j a chair · k a cup · l a pen
    </p>
  ),
};

const trackR6: AudioTrackData = {
  r: 6,
  exercise: "Listening · 5",
  title: "Max & Carla — listen",
  transcript: (
    <p>
      M: Hi. Are you Carla?
      <br />
      C: Yes, I am.
      <br />
      M: I’m Max. Nice to meet you.
      <br />
      C: Nice to meet you, too.
      <br />
      M: Welcome to the company. This is our office. And this is your desk.
      <br />
      C: OK.
      <br />
      M: These are your keys for the office.
      <br />
      C: OK.
      <br />
      M: This is your computer and this is the password.
      <br />
      C: Great.
      <br />
      M: And that is my desk. Please ask me for help.
      <br />
      C: Thank you. Are those photos of your family?
      <br />
      M: Yes. That’s my son and that’s my daughter.
      <br />
      C: Very nice.
      <br />
      M: Thank you. OK. Any questions?
      <br />
      C: Yes, where’s my chair?
      <br />
      M: Oh. Sorry. It’s in the meeting room!
    </p>
  ),
};

const trackR7: AudioTrackData = {
  r: 7,
  exercise: "Grammar · 7",
  title: "this / these — listen and tick",
  transcript: (
    <ol>
      <li>
        These are my keys. / This is my key.
      </li>
      <li>
        This is my book. / These are my books.
      </li>
      <li>
        What’s in this box? / What’s in these boxes?
      </li>
    </ol>
  ),
};

const trackR8: AudioTrackData = {
  r: 8,
  exercise: "Grammar · 8",
  title: "Pictures 1–4 — listen and check",
  transcript: (
    <ol>
      <li>
        A: Is <em>that</em> your cup? — B: Yes, it is.
      </li>
      <li>
        A: Are <em>those</em> your books? — B: Yes, they are.
      </li>
      <li>
        A: What’s in <em>this</em> box? — B: <em>That</em>’s my new clock.
      </li>
      <li>
        A: Are <em>those</em> my pens? — B: No, <em>these</em> are Jack’s pens.
      </li>
    </ol>
  ),
};

/** Grammar · 6 — complete phrases from the key pictures */
const keyPhrasePanels = [
  {
    id: 1,
    file: "demo-this-key.png",
    noun: "key",
    answer: "this",
    alt: "Hand pointing close to one key",
  },
  {
    id: 2,
    file: "demo-that-key.png",
    noun: "key",
    answer: "that",
    alt: "Hand pointing at one key farther away",
  },
  {
    id: 3,
    file: "demo-these-keys.png",
    noun: "keys",
    answer: "these",
    alt: "Hand pointing close to a bunch of keys",
  },
  {
    id: 4,
    file: "demo-those-keys.png",
    noun: "keys",
    answer: "those",
    alt: "Hand pointing at a bunch of keys farther away",
  },
] as const;

/** Grammar · 7a — tick the sentence you hear first (R7) */
const hearFirstItems = [
  {
    id: 1,
    answer: "b",
    a: "This is my key.",
    b: "These are my keys.",
  },
  {
    id: 2,
    answer: "b",
    a: "These are my books.",
    b: "This is my book.",
  },
  {
    id: 3,
    answer: "a",
    a: "What’s in this box?",
    b: "What’s in these boxes?",
  },
] as const;

const DEMO_OPTIONS = ["this", "that", "these", "those"] as const;

type DemoLine =
  | { kind: "text"; speaker: string; text: string }
  | {
      kind: "gap";
      speaker: string;
      before: string;
      after: string;
      gapId: string;
      answer: string;
    };

type DemoCard = {
  num: number;
  file: string;
  alt: string;
  lines: DemoLine[];
};

/** Grammar · pictures 1–4 · this/that/these/those (R8) */
const demoCards: DemoCard[] = [
  {
    num: 1,
    file: "demo-1.png",
    alt: "Picture 1 — woman pointing at a cup on a desk",
    lines: [
      {
        kind: "gap",
        speaker: "A",
        before: "Is ",
        after: " your cup?",
        gapId: "1",
        answer: "that",
      },
      { kind: "text", speaker: "B", text: "Yes, it is." },
    ],
  },
  {
    num: 2,
    file: "demo-2.png",
    alt: "Picture 2 — woman pointing at books on a desk",
    lines: [
      {
        kind: "gap",
        speaker: "A",
        before: "Are ",
        after: " your books?",
        gapId: "2",
        answer: "those",
      },
      { kind: "text", speaker: "B", text: "Yes, they are." },
    ],
  },
  {
    num: 3,
    file: "demo-3.png",
    alt: "Picture 3 — woman holding a small pink box",
    lines: [
      {
        kind: "gap",
        speaker: "A",
        before: "What’s in ",
        after: " box?",
        gapId: "3a",
        answer: "this",
      },
      {
        kind: "gap",
        speaker: "B",
        before: "",
        after: "’s my new clock.",
        gapId: "3b",
        answer: "that",
      },
    ],
  },
  {
    num: 4,
    file: "demo-4.png",
    alt: "Picture 4 — man pointing at pens on another desk",
    lines: [
      {
        kind: "gap",
        speaker: "A",
        before: "Are ",
        after: " my pens?",
        gapId: "4a",
        answer: "those",
      },
      {
        kind: "gap",
        speaker: "B",
        before: "No, ",
        after: " are Jack’s pens.",
        gapId: "4b",
        answer: "these",
      },
    ],
  },
];

const demoGaps = demoCards.flatMap((card) =>
  card.lines.filter(
    (l): l is Extract<DemoLine, { kind: "gap" }> => l.kind === "gap",
  ),
);

/** 5a — office pictures A/B (answer key: Picture B) */
const officePictures = [
  {
    id: "A",
    file: "things-scene.png",
    alt: "Picture A — meeting room with clock, chair, table, pens, cup, phone",
  },
  {
    id: "B",
    file: "office-b.png",
    alt: "Picture B — office with desks, computers, photos, key, boxes, books",
  },
] as const;

const OFFICE_PIC_ANSWER = "B";

/** 5b — complete the conversation (full script with numbered gaps) */
type OfficeLine =
  | { kind: "text"; speaker: "Max" | "Carla"; text: string }
  | {
      kind: "gap";
      id: number;
      speaker: "Max" | "Carla";
      before: string;
      after: string;
      answer: string;
      options: readonly string[];
    };

const officeDialogue: OfficeLine[] = [
  { kind: "text", speaker: "Max", text: "Hi. Are you Carla?" },
  { kind: "text", speaker: "Carla", text: "Yes, I am." },
  { kind: "text", speaker: "Max", text: "I’m Max. Nice to meet you." },
  { kind: "text", speaker: "Carla", text: "Nice to meet you, too." },
  {
    kind: "gap",
    id: 1,
    speaker: "Max",
    before: "Welcome to the company. This is our office. And this is your ",
    after: ".",
    answer: "desk",
    options: ["chair", "desk", "table"],
  },
  { kind: "text", speaker: "Carla", text: "OK." },
  {
    kind: "gap",
    id: 2,
    speaker: "Max",
    before: "These are your ",
    after: " for the office.",
    answer: "keys",
    options: ["books", "keys", "photos"],
  },
  { kind: "text", speaker: "Carla", text: "OK." },
  {
    kind: "gap",
    id: 3,
    speaker: "Max",
    before: "This is your ",
    after: " and this is the password.",
    answer: "computer",
    options: ["computer", "phone", "clock"],
  },
  { kind: "text", speaker: "Carla", text: "Great." },
  {
    kind: "gap",
    id: 4,
    speaker: "Max",
    before: "And that is my ",
    after: ". Please ask me for help.",
    answer: "desk",
    options: ["chair", "desk", "phone"],
  },
  {
    kind: "gap",
    id: 5,
    speaker: "Carla",
    before: "Thank you. Are those ",
    after: " of your family?",
    answer: "photos",
    options: ["books", "keys", "photos"],
  },
  {
    kind: "text",
    speaker: "Max",
    text: "Yes. That’s my son and that’s my daughter.",
  },
  { kind: "text", speaker: "Carla", text: "Very nice." },
  { kind: "text", speaker: "Max", text: "Thank you. OK. Any questions?" },
  {
    kind: "gap",
    id: 6,
    speaker: "Carla",
    before: "Yes, where’s my ",
    after: "?",
    answer: "chair",
    options: ["box", "chair", "table"],
  },
  {
    kind: "text",
    speaker: "Max",
    text: "Oh. Sorry. It’s in the meeting room!",
  },
];

const officeDialogueGaps = officeDialogue.filter(
  (l): l is Extract<OfficeLine, { kind: "gap" }> => l.kind === "gap",
);

function AudioPlayer({ track }: { track: AudioTrackData }) {
  return (
    <div className="l25-audio-item">
      <div className="l25-audio-meta">
        <span className="l25-audio-num">R{track.r}</span>
        <div className="l25-audio-info">
          <span className="l25-audio-ex">{track.exercise}</span>
          <span className="l25-audio-title">{track.title}</span>
        </div>
      </div>
      <audio
        controls
        className="l25-audio-ctrl"
        src={SOUND(track.r)}
        preload="none"
      />
      <details className="l25-details">
        <summary className="l25-details-toggle">📄 Транскрипція</summary>
        <div className="l25-details-body">{track.transcript}</div>
      </details>
    </div>
  );
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

export default function Lesson28() {
  const [revealedAsk, setRevealedAsk] = useState<Set<number>>(() => new Set());
  const [revealedVerbs, setRevealedVerbs] = useState<Set<number>>(
    () => new Set(),
  );
  const [photoAns, setPhotoAns] = useState<string[]>(() =>
    Array(objectPictures.length).fill(""),
  );
  const [photoChecked, setPhotoChecked] = useState(false);
  const [officePic, setOfficePic] = useState("");
  const [officePicChecked, setOfficePicChecked] = useState(false);
  const [officeDlgAns, setOfficeDlgAns] = useState<Record<number, string>>({});
  const [officeDlgChecked, setOfficeDlgChecked] = useState(false);
  const [demoAns, setDemoAns] = useState<Record<string, string>>({});
  const [demoChecked, setDemoChecked] = useState(false);
  const [keyPhraseAns, setKeyPhraseAns] = useState<Record<number, string>>({});
  const [keyPhraseChecked, setKeyPhraseChecked] = useState(false);
  const [hearFirstAns, setHearFirstAns] = useState<Record<number, string>>({});
  const [hearFirstChecked, setHearFirstChecked] = useState(false);
  const [videoAns, setVideoAns] = useState<Record<number, string>>({});
  const [videoChecked, setVideoChecked] = useState(false);
  const [videoGramAns, setVideoGramAns] = useState<Record<number, string>>({});
  const [videoGramChecked, setVideoGramChecked] = useState(false);

  const toggleAsk = (index: number) => {
    setRevealedAsk((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleVerb = (index: number) => {
    setRevealedVerbs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const photoScore = photoAns.filter(
    (v, i) => v === objectPictures[i].letter,
  ).length;
  const officeDlgScore = officeDialogueGaps.filter(
    (g) => officeDlgAns[g.id] === g.answer,
  ).length;
  const demoScore = demoGaps.filter((g) => demoAns[g.gapId] === g.answer)
    .length;
  const keyPhraseScore = keyPhrasePanels.filter(
    (p) => keyPhraseAns[p.id] === p.answer,
  ).length;
  const hearFirstScore = hearFirstItems.filter(
    (item) => hearFirstAns[item.id] === item.answer,
  ).length;
  const videoScore = videoQuiz.filter((q) => videoAns[q.id] === q.answer)
    .length;
  const videoGramScore = videoGrammarQuiz.filter(
    (q) => videoGramAns[q.id] === q.answer,
  ).length;

  return (
    <div className="lesson22-page lesson28-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 28</p>
            <h1>Everyday things</h1>
            <p className="lesson22-topic-pill">
              this / that / these / those · everyday objects
            </p>
            <p className="lesson22-subtitle">
              Part 1 — speaking (ask back + tell your story). Video bridge —
              Present Simple he/she/it. Part 2 — vocabulary, listening, and
              demonstratives.
            </p>
            <div className="chips" style={{ marginTop: "0.75rem" }}>
              <span className="chip">Speaking</span>
              <span className="chip">Video</span>
              <span className="chip">Vocabulary</span>
              <span className="chip">Listening</span>
              <span className="chip">Grammar</span>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/hw-28">
              Homework → Lesson 28
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
      </section>

      <section id="l28-ask-back" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Ask the question</p>
          <h2>Listen → ask</h2>
          <p className="lesson22-section-desc">
            Вчитель розповідає про себе короткими реченнями. Учень не повторює
            інформацію — він ставить <strong>відповідне питання</strong>.
            Наприклад: вчитель каже <em>My name’s Natalie</em> → учень питає
            як її звати. Правильне питання відкрий лише після спроби —
            натисни на картку.
          </p>
        </div>

        <div className="l28-ask-examples">
          {askBackExamples.map((ex, index) => {
            const open = revealedAsk.has(index);
            return (
              <button
                key={ex.cue}
                type="button"
                className={`l28-ask-example${open ? " is-open" : ""}`}
                onClick={() => toggleAsk(index)}
                aria-expanded={open}
              >
                <p className="l28-ask-cue">
                  <span className="l28-ask-tag">Teacher</span>
                  {ex.cue}
                </p>
                <p className="l28-ask-ask">
                  <span className="l28-ask-tag l28-ask-tag--you">You ask</span>
                  {open ? (
                    <span>{ex.ask}</span>
                  ) : (
                    <span className="l28-ask-hidden">натисни, щоб відкрити</span>
                  )}
                </p>
              </button>
            );
          })}
        </div>

        <div className="l28-task-note">
          <strong>Task:</strong> Слухай живі речення від вчителя (про ім’я,
          сім’ю, роботу, рутину, хобі…). Після кожного речення постав одне
          правильне питання. Потім поміняйтесь ролями, якщо працюєте в парі.
        </div>
      </section>

      <section id="l28-speaking" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speak about yourself</p>
          <h2>Tell your story</h2>
          <p className="lesson22-section-desc">
            Обери тему нижче. Питання — лише підказки / опори. Не відповідай
            коротко «як на інтерв’ю».{" "}
            <strong>
              Розповідай про себе широко: 4–8 зв’язних речень
            </strong>
            , ніби ти знайомишся з новою людиною. Додавай деталі, причини,
            приклади з життя.
          </p>
        </div>

        <div className="l28-task-note">
          <strong>How to speak:</strong> візьми 2–3 питання з блоку і зроби з
          них одну маленьку історію про себе. Наприклад, замість{" "}
          <em>Yes. / I’m a student.</em> скажи:{" "}
          <em>
            I’m a student. I study English every day, and in the evening I
            usually watch videos or meet my friends.
          </em>
        </div>

        <div className="l28-speak-grid">
          <article className="l28-speak-card l28-speak-card--poster">
            <img
              className="l28-about-me-img"
              src={IMG("all-about-me.jpg")}
              alt="All about me worksheet: name, age, likes, favorites, fun fact"
              width={722}
              height={1024}
              loading="lazy"
            />
          </article>

          {speakingTopics.map((topic) => {
            const head = (
              <header className="l28-speak-card-head">
                <span className="l28-speak-num">{topic.id}</span>
                <div>
                  <h3 className="l28-speak-title">{topic.title}</h3>
                  <p className="l28-speak-hint">{topic.hint}</p>
                </div>
              </header>
            );
            const list = (
              <ol className="l28-speak-list">
                {topic.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            );

            if (topic.id === 1) {
              return (
                <article key={topic.id} className="l28-speak-card">
                  {head}
                  {list}
                </article>
              );
            }

            return (
              <details
                key={topic.id}
                className="l28-speak-card l28-speak-card--collapsible"
              >
                <summary className="l28-speak-summary">
                  {head}
                  <span className="l28-speak-chevron" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                {list}
              </details>
            );
          })}
        </div>
      </section>

      <section id="l28-daily-verbs" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Speaking · Verbs</p>
          <h2>Everyday activities</h2>
          <p className="lesson22-section-desc">
            Подивись на картинки. Це опори для теми{" "}
            <strong>Daily routines</strong> і{" "}
            <strong>Free time and hobbies</strong>. Під постером спочатку видно
            українське слово — натисни, щоб відкрити англійське. Потім обери
            4–6 дій і розкажи про свій день:{" "}
            <em>In the morning I have breakfast… Then I go to work…</em>
          </p>
        </div>

        <figure className="l28-poster l28-poster--wide">
          <img
            src={IMG("daily-verbs.png")}
            alt="Everyday activities: have breakfast, go, play, write, read, sleep, work, cook, draw, ride a bike"
            className="l28-poster-img l28-poster-img--wide"
            width={1024}
            height={559}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="l28-verb-bank" aria-label="Verb bank">
          {dailyVerbs.map((v, index) => {
            const open = revealedVerbs.has(index);
            return (
              <button
                key={v.ua}
                type="button"
                className={`l28-verb-chip${open ? " is-open" : ""}`}
                onClick={() => toggleVerb(index)}
                aria-expanded={open}
              >
                <strong className="l28-verb-ua">{v.ua}</strong>
                {open ? (
                  <span className="l28-verb-en">{v.en}</span>
                ) : (
                  <span className="l28-verb-hint">натисни, щоб відкрити</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="l28-task-note">
          <strong>Speak:</strong> не називай лише слова — зроби маленьку
          історію. Наприклад:{" "}
          <em>
            I usually have breakfast at home. After that I go to work. In the
            evening I cook dinner and then I read or sleep.
          </em>
        </div>
      </section>

      {/* ── Video bridge · before Part 2 ── */}
      <section id="l28-video" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Video · Present Simple · he / she / it</p>
          <h2>Listening quiz · third person singular</h2>
          <p className="lesson22-section-desc">
            Подивись відео (ELLLO A1-06). Послухай короткі діалоги з{" "}
            <strong>he / she / it + -s</strong>. Потім виконай listening quiz і
            grammar check — місток до Part 2 (everyday things).
          </p>
        </div>

        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Beginner English Listening Quiz — Present Simple third person singular"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 640, marginBottom: "1rem" }}>
          <div className="l25-conf-header">Remember</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              <strong>He / She / It</strong> + verb<strong>-s / -es</strong>: She
              sell<strong>s</strong>… · He stud<strong>ies</strong>…
              <br />
              Questions: <em>Does</em> she work…? — Yes, she <em>does</em>. /
              No, she <em>doesn't</em>.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">1 · Listening quiz</h3>
        <p className="lesson22-section-desc">
          Обери правильну відповідь за відео.
        </p>
        <div className="l26-drill-list">
          {videoQuiz.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={videoAns[q.id] ?? ""}
                onChange={(e) => {
                  setVideoChecked(false);
                  setVideoAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  videoChecked,
                  videoAns[q.id] ?? "",
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
            onClick={() => setVideoChecked(true)}
          >
            Check
          </button>
          {videoChecked && (
            <span className="l22-score">
              {videoScore} / {videoQuiz.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">2 · Grammar · third person</h3>
        <div className="l26-drill-list">
          {videoGrammarQuiz.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={videoGramAns[q.id] ?? ""}
                onChange={(e) => {
                  setVideoGramChecked(false);
                  setVideoGramAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  videoGramChecked,
                  videoGramAns[q.id] ?? "",
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
            onClick={() => setVideoGramChecked(true)}
          >
            Check
          </button>
          {videoGramChecked && (
            <span className="l22-score">
              {videoGramScore} / {videoGrammarQuiz.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">3 · Speak</h3>
        <p className="lesson22-section-desc">
          Відповідай уголос. Використай <em>he / she + -s</em> і{" "}
          <em>does / doesn't</em>.
        </p>
        <div className="lesson22-prompt-grid">
          {videoSpeakPrompts.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>

        <details className="l25-details" style={{ marginTop: "1rem" }}>
          <summary className="l25-details-toggle">📄 Sample ideas from the video</summary>
          <div className="l25-details-body">
            <p>
              <strong>Mom:</strong> She sells women’s clothing. She has a small
              shop in the mall.
            </p>
            <p>
              <strong>Brother:</strong> He studies engineering. He has a small
              apartment. He doesn't have much free time.
            </p>
            <p>
              <strong>Daughter:</strong> Grandma watches her. She walks there
              after school.
            </p>
            <p>
              <strong>Movie:</strong> It starts in about ten minutes. Brad Pitt
              plays a policeman.
            </p>
          </div>
        </details>

        <p className="l25-cr-hint" style={{ marginTop: "0.85rem" }}>
          Source:{" "}
          <a
            href={`https://youtu.be/${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            ELLLO · Beginner Listening Quiz #6 ↗
          </a>
        </p>
      </section>

      <section
        id="l28-part2"
        className="lesson22-block panel l28-part2-goals"
        aria-label="Part 2 goals"
      >
        <ul className="l28-goals-banner">
          <li>
            <span className="l28-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Goal:</strong> talk about everyday objects
            </span>
          </li>
          <li>
            <span className="l28-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Grammar:</strong>{" "}
              <em>this, that, these and those</em>
            </span>
          </li>
          <li>
            <span className="l28-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Vocabulary:</strong> everyday objects (1)
            </span>
          </li>
        </ul>
      </section>

      <section id="l28-home-office" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · Home office</p>
          <h2>Vocabulary: HOME OFFICE</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку й вивчи слова: window, plant, printer, wall
            clock, calendar, map, monitor, desk, computer, chair, drawers.
          </p>
        </div>

        <figure className="l28-poster">
          <img
            src={IMG("home-office-vocab.png")}
            alt="Vocabulary Home Office: window, plant, printer, wall clock, calendar, map, monitor, desk, computer, chair, drawers"
            className="l28-poster-img"
            width={1024}
            height={1024}
            loading="eager"
            decoding="async"
          />
        </figure>
      </section>

      <section id="l28-things-photos" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1</p>
          <h2>Match 1–12 in the pictures with a–l</h2>
          <p className="lesson22-section-desc">
            Подивись на картинки. Обери слово під кожним фото. Слова також є в
            банку нижче (a–l). Можеш спочатку послухати Unit 2 · R5.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0.75rem 0 1rem" }}>
          <AudioPlayer track={trackR5} />
        </div>

        <div className="l28-word-bank" aria-label="Word bank a–l">
          {objectBank.map((item) => (
            <span key={item.letter} className="l28-word-bank-item">
              <strong>{item.letter}</strong> {item.en}
            </span>
          ))}
        </div>

        <div className="l28-match-grid">
          {objectPictures.map((pic, i) => {
            const item = bankByLetter[pic.letter];
            const v = photoAns[i];
            const ok = v === pic.letter;
            return (
              <div key={pic.num} className="l28-match-card">
                <span className="l28-match-num">{pic.num}</span>
                <div className="l28-match-frame">
                  <img
                    className="l28-match-img"
                    src={IMG(item.file)}
                    alt={`Picture ${pic.num}`}
                    loading="lazy"
                  />
                </div>
                <select
                  value={v}
                  onChange={(e) => {
                    setPhotoChecked(false);
                    setPhotoAns((prev) => {
                      const next = [...prev];
                      next[i] = e.target.value;
                      return next;
                    });
                  }}
                  className={`l28-match-sel${
                    photoChecked
                      ? ok
                        ? " l25-cr-sel--ok"
                        : v
                          ? " l25-cr-sel--err"
                          : ""
                      : ""
                  }`}
                  aria-label={`Word for picture ${pic.num}`}
                >
                  <option value="">select…</option>
                  {objectBank.map((b) => (
                    <option key={b.letter} value={b.letter}>
                      {b.en}
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
            onClick={() => setPhotoChecked(true)}
          >
            Check answers
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setPhotoAns(Array(objectPictures.length).fill(""));
              setPhotoChecked(false);
            }}
          >
            Reset
          </button>
          {photoChecked && (
            <span className="l22-score">
              {photoScore} / {objectPictures.length}
            </span>
          )}
        </div>
      </section>

      <section id="l28-things-scene" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 2</p>
          <h2>What’s number…?</h2>
          <p className="lesson22-section-desc">
            Подивись на картинки <strong>A</strong> і <strong>B</strong>. Питай
            про номери: <strong>A:</strong> <em>What’s number 1?</em> —
            відповідь: <em>It’s a clock.</em>
          </p>
        </div>

        <div className="l28-scene-pair">
          <figure className="l28-scene">
            <figcaption className="l28-scene-cap">Picture A</figcaption>
            <img
              src={IMG("things-scene.png")}
              alt="Picture A — meeting room: clock, chair, table, pens, cup, phone"
              className="l28-scene-img"
              width={612}
              height={865}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="l28-scene">
            <figcaption className="l28-scene-cap">Picture B</figcaption>
            <img
              src={IMG("office-b.png")}
              alt="Picture B — office: photos, pin, mouse, boxes, desk, books"
              className="l28-scene-img"
              width={581}
              height={947}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section id="l28-closeups" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 3</p>
          <h2>What’s number…? · close-ups</h2>
          <p className="lesson22-section-desc">
            Подивись на макро-фото. Питай і відповідай:{" "}
            <strong>A:</strong> <em>What’s number 1?</em>{" "}
            <strong>B:</strong> <em>It’s a pen.</em>
          </p>
        </div>

        <div className="l28-closeup-grid">
          {closeupPhotos.map((item) => (
            <figure key={item.num} className="l28-closeup-card">
              <span className="l28-closeup-num">{item.num}</span>
              <img
                src={IMG(item.file)}
                alt={`Close-up ${item.num}`}
                className="l28-closeup-img"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <div className="l28-speak-prompt">
          <p className="l28-speak-prompt-task">
            <strong>Say the names of things in your room.</strong>
          </p>
          <p className="l28-speak-prompt-ex">
            <em>It’s a clock. It’s a chair.</em>
          </p>
        </div>
      </section>

      <section id="l28-listening" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Listening · 5</p>
          <h2>Listening</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R6</strong>. Де відбувається діалог і про що
            розмова? Потім зроби два кроки нижче.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0.75rem 0 1rem" }}>
          <AudioPlayer track={trackR6} />
        </div>

        <h3 className="l22-listen-subtitle">5a · Choose the picture</h3>
        <p className="lesson22-section-desc">
          Listen and choose the correct picture —{" "}
          <strong>A</strong> or <strong>B</strong> (ті самі, що у Vocabulary ·
          2).
        </p>

        <div className="l28-ab-grid" role="group" aria-label="Picture A or B">
          {officePictures.map((pic) => {
            const selected = officePic === pic.id;
            const showResult = officePicChecked && officePic !== "";
            let cls = "l28-ab-card";
            if (selected) cls += " is-selected";
            if (showResult && pic.id === OFFICE_PIC_ANSWER) cls += " is-ok";
            else if (showResult && selected && pic.id !== OFFICE_PIC_ANSWER)
              cls += " is-err";
            return (
              <button
                key={pic.id}
                type="button"
                className={cls}
                onClick={() => {
                  setOfficePicChecked(false);
                  setOfficePic(pic.id);
                }}
                aria-pressed={selected}
              >
                <span className="l28-ab-letter">Picture {pic.id}</span>
                <img
                  src={IMG(pic.file)}
                  alt={pic.alt}
                  className="l28-ab-scene"
                  width={612}
                  height={865}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setOfficePicChecked(true)}
          >
            Check 5a
          </button>
          {officePicChecked && (
            <span className="l22-score">
              {officePic === OFFICE_PIC_ANSWER ? "1 / 1" : "0 / 1"}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setOfficePic("");
              setOfficePicChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="l28-speak-prompt" style={{ marginTop: "1.15rem" }}>
          <p className="l28-speak-prompt-task">
            Ask and answer questions about the other objects in the pictures.
            Make notes.
          </p>
          <div className="l28-mini-dialogue" aria-label="Example">
            <p>
              <strong>A:</strong> <em>What’s that?</em>
            </p>
            <p>
              <strong>B:</strong> It’s a light.
            </p>
            <p>
              <strong>A:</strong> <em>What are those?</em>
            </p>
            <p>
              <strong>B:</strong> They’re plants.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.25rem" }}>
          5b · Complete the conversation
        </h3>
        <p className="lesson22-section-desc">
          Listen again and complete the conversation.
        </p>

        <div className="l25-conv-card" style={{ maxWidth: 720 }}>
          <div className="l25-conv-title">Max &amp; Carla</div>
          <div className="l25-dialogue">
            {officeDialogue.map((line, i) => (
              <div key={line.kind === "gap" ? `g${line.id}` : `t${i}`} className="l25-line">
                <span
                  className={`l25-spk ${
                    line.speaker === "Max" ? "l25-spk--a" : "l25-spk--b"
                  }`}
                >
                  {line.speaker}
                </span>
                {line.kind === "text" ? (
                  <span>{line.text}</span>
                ) : (
                  <span>
                    {line.before}
                    <select
                      value={officeDlgAns[line.id] ?? ""}
                      onChange={(e) => {
                        setOfficeDlgChecked(false);
                        setOfficeDlgAns((p) => ({
                          ...p,
                          [line.id]: e.target.value,
                        }));
                      }}
                      className={drillSelClass(
                        officeDlgChecked,
                        officeDlgAns[line.id] ?? "",
                        line.answer,
                      )}
                      aria-label={`Gap ${line.id}`}
                    >
                      <option value="">___</option>
                      {line.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {line.after}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setOfficeDlgChecked(true)}
          >
            Check 5b
          </button>
          {officeDlgChecked && (
            <span className="l22-score">
              {officeDlgScore} / {officeDialogueGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setOfficeDlgAns({});
              setOfficeDlgChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l28-grammar-keys" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar</p>
          <h2>this, that, these and those</h2>
          <p className="lesson22-section-desc">
            <strong>6</strong> Complete the phrases with <em>this</em>,{" "}
            <em>that</em>, <em>these</em> and <em>those</em>. Use the Max &amp;
            Carla dialogue to help you.
          </p>
        </div>

        <div className="l28-key-grid">
          {keyPhrasePanels.map((panel) => (
            <article key={panel.id} className="l28-key-card">
              <div className="l28-key-frame">
                <img
                  src={IMG(panel.file)}
                  alt={panel.alt}
                  className="l28-key-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <label className="l28-key-phrase">
                <span className="l28-key-num">{panel.id}</span>
                <select
                  value={keyPhraseAns[panel.id] ?? ""}
                  onChange={(e) => {
                    setKeyPhraseChecked(false);
                    setKeyPhraseAns((p) => ({
                      ...p,
                      [panel.id]: e.target.value,
                    }));
                  }}
                  className={drillSelClass(
                    keyPhraseChecked,
                    keyPhraseAns[panel.id] ?? "",
                    panel.answer,
                  )}
                  aria-label={`Phrase ${panel.id}`}
                >
                  <option value="">___</option>
                  {DEMO_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <span>{panel.noun}</span>
              </label>
            </article>
          ))}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setKeyPhraseChecked(true)}
          >
            Check 6
          </button>
          {keyPhraseChecked && (
            <span className="l22-score">
              {keyPhraseScore} / {keyPhrasePanels.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setKeyPhraseAns({});
              setKeyPhraseChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.35rem" }}>
          7a · Listen and tick
        </h3>
        <p className="lesson22-section-desc">
          Listen to <strong>R7</strong> and tick the sentence you hear{" "}
          <strong>first</strong>, a or b.
        </p>

        <div className="l25-audio-list" style={{ margin: "0.75rem 0 1rem" }}>
          <AudioPlayer track={trackR7} />
        </div>

        <div className="l28-hear-list">
          {hearFirstItems.map((item) => {
            const chosen = hearFirstAns[item.id] ?? "";
            const show = hearFirstChecked && chosen !== "";
            return (
              <div key={item.id} className="l28-hear-item">
                <span className="l28-hear-num">{item.id}</span>
                <div className="l28-hear-options" role="group">
                  {(
                    [
                      ["a", item.a],
                      ["b", item.b],
                    ] as const
                  ).map(([letter, text]) => {
                    let cls = "l28-hear-opt";
                    if (chosen === letter) cls += " is-selected";
                    if (show && letter === item.answer) cls += " is-ok";
                    else if (show && chosen === letter && letter !== item.answer)
                      cls += " is-err";
                    return (
                      <button
                        key={letter}
                        type="button"
                        className={cls}
                        onClick={() => {
                          setHearFirstChecked(false);
                          setHearFirstAns((p) => ({
                            ...p,
                            [item.id]: letter,
                          }));
                        }}
                        aria-pressed={chosen === letter}
                      >
                        <strong>{letter}</strong> {text}
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
            type="button"
            className="l22-check-btn"
            onClick={() => setHearFirstChecked(true)}
          >
            Check 7a
          </button>
          {hearFirstChecked && (
            <span className="l22-score">
              {hearFirstScore} / {hearFirstItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setHearFirstAns({});
              setHearFirstChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="l28-task-note" style={{ marginTop: "1rem" }}>
          <strong>7b</strong> Listen again and repeat.
        </div>
      </section>

      <section id="l28-demonstratives" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar · 8</p>
          <h2>Complete the conversations</h2>
          <p className="lesson22-section-desc">
            Look at pictures 1–4 and complete the conversations with{" "}
            <em>this</em>, <em>that</em>, <em>these</em> or <em>those</em>. Then
            listen to <strong>R8</strong> and check your answers.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0.75rem 0 1rem" }}>
          <AudioPlayer track={trackR8} />
        </div>

        <div className="l28-demo-grid">
          {demoCards.map((card) => (
            <article key={card.num} className="l28-demo-card">
              <div className="l28-demo-frame">
                <img
                  src={IMG(card.file)}
                  alt={card.alt}
                  className="l28-demo-img"
                  width={386}
                  height={340}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="l28-demo-dialogue">
                {card.lines.map((line, i) => (
                  <p
                    key={
                      line.kind === "gap"
                        ? line.gapId
                        : `${card.num}-t${i}`
                    }
                    className="l28-demo-line"
                  >
                    <span className="l28-demo-spk">{line.speaker}:</span>{" "}
                    {line.kind === "text" ? (
                      line.text
                    ) : (
                      <>
                        {line.before}
                        <select
                          value={demoAns[line.gapId] ?? ""}
                          onChange={(e) => {
                            setDemoChecked(false);
                            setDemoAns((p) => ({
                              ...p,
                              [line.gapId]: e.target.value,
                            }));
                          }}
                          className={drillSelClass(
                            demoChecked,
                            demoAns[line.gapId] ?? "",
                            line.answer,
                          )}
                          aria-label={`Picture ${card.num} gap`}
                        >
                          <option value="">___</option>
                          {DEMO_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        {line.after}
                      </>
                    )}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setDemoChecked(true)}
          >
            Check answers
          </button>
          {demoChecked && (
            <span className="l22-score">
              {demoScore} / {demoGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setDemoAns({});
              setDemoChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l28-demo-charts" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar · summary</p>
          <h2>Remember: this / that / these / those</h2>
          <p className="lesson22-section-desc">
            Короткі опори після вправ: singular / plural і near / far.
          </p>
        </div>

        <div className="l28-chart-pair">
          <figure className="l28-chart">
            <figcaption className="l28-chart-cap">This vs These</figcaption>
            <img
              src={IMG("this-vs-these.png")}
              alt="This vs These: singular and plural examples with pictures"
              className="l28-chart-img"
              width={720}
              height={1024}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="l28-chart">
            <figcaption className="l28-chart-cap">
              Demonstratives in English
            </figcaption>
            <img
              src={IMG("demonstratives-chart.png")}
              alt="This that these those: near and far with cat examples"
              className="l28-chart-img"
              width={682}
              height={1024}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After class</p>
          <h2>Homework link</h2>
          <p className="lesson22-section-desc">
            Домашка Lesson 28 —{" "}
            <Link className="lesson22-back-link" to="/hw-28">
              Homework · Lesson 28
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
