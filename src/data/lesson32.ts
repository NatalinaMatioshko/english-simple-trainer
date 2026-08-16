/** Lesson 32 · Part 1: WH-questions (do / does / to be) · Part 2: was / were */

/* ── Правила · порядок слів у питаннях ─────────────────────────── */

export type QChartRow = {
  qw: string;
  aux: string;
  subject: string;
  tail: string;
};

/** QWASI: (Question Word) + Auxiliary + Subject + Infinitive */
export const qwasiExamples = ["What do you do?", "Where do they live?"] as const;

export const yesNoExamples = [
  "Do you speak English?",
  "Does she live here?",
] as const;

export const beChartRows: readonly QChartRow[] = [
  { qw: "", aux: "Is", subject: "Sharon", tail: "from the US?" },
  { qw: "How old", aux: "are", subject: "you?", tail: "" },
  { qw: "What", aux: "is", subject: "this?", tail: "" },
  { qw: "Where", aux: "are", subject: "you", tail: "from?" },
];

export const doChartRows: readonly QChartRow[] = [
  { qw: "", aux: "Do", subject: "you", tail: "like pizza?" },
  { qw: "Where", aux: "do", subject: "you", tail: "work?" },
  { qw: "What time", aux: "does", subject: "he", tail: "get up?" },
  { qw: "How often", aux: "do", subject: "they", tail: "go out?" },
  { qw: "What", aux: "do", subject: "you", tail: "do?" },
];

/** Конструктор питання: Wh + helping verb + subject + main verb + ? */
export const qBuilderWh = [
  "Who",
  "When",
  "What",
  "Where",
  "Why",
  "How",
] as const;

export const qBuilderRows = [
  { aux: "Do", auxTail: "", subjects: ["I", "you"] },
  { aux: "Do", auxTail: "es", subjects: ["he", "she", "it"] },
  { aux: "Do", auxTail: "", subjects: ["you", "we", "they"] },
] as const;

export const qBuilderVerbs = [
  "go",
  "work",
  "sleep",
  "write",
  "study",
  "live",
  "have",
  "eat",
] as const;

export const qBuilderExamples = [
  "Do you study English?",
  "What do you eat for breakfast?",
  "Does she live in London?",
  "Where does he work?",
  "Do we have pets?",
] as const;

/** ✓ правильно / ✗ помилка — інфінітив після підмета */
export const doDoesPairs = [
  { ok: "What does she do?", err: "What does she does?" },
  { ok: "Where does he work?", err: "Where does he works?" },
] as const;

export const questionWordCards = [
  {
    word: "Who",
    ua: "хто",
    cat: "людина",
    q: "Who is that man?",
    a: "That's Peter.",
  },
  {
    word: "Where",
    ua: "де / куди",
    cat: "місце",
    q: "Where do you live?",
    a: "In London.",
  },
  {
    word: "When",
    ua: "коли",
    cat: "час",
    q: "When does the film start?",
    a: "In the afternoon.",
  },
  {
    word: "What time",
    ua: "о котрій годині",
    cat: "година",
    q: "What time does he get up?",
    a: "At seven.",
  },
  {
    word: "Why",
    ua: "чому",
    cat: "причина",
    q: "Why do you study English?",
    a: "Because I need it for work.",
  },
  {
    word: "What",
    ua: "що / який",
    cat: "річ · дія",
    q: "What do you need?",
    a: "I need your car.",
  },
  {
    word: "How",
    ua: "як · яким чином",
    cat: "спосіб",
    q: "How do you go to work?",
    a: "By car.",
  },
  {
    word: "How often",
    ua: "як часто",
    cat: "частота",
    q: "How often do you play sports?",
    a: "Every day.",
  },
  {
    word: "How old",
    ua: "скільки років",
    cat: "вік",
    q: "How old is your sister?",
    a: "She's 27.",
  },
] as const;

export const whatNounExamples = [
  { q: "What colour is your jacket?", hl: "What colour" },
  { q: "What size do you want?", hl: "What size" },
  { q: "What car does he have?", hl: "What car" },
] as const;

export const howAdjExamples = [
  { q: "How fast is your car?", hl: "How fast" },
  { q: "How big is her house?", hl: "How big" },
  { q: "How often do you play sports?", hl: "How often" },
] as const;

export const whWords = [
  { en: "Who", ua: "хто", tip: "people", example: "Who is he?" },
  { en: "What", ua: "що / який", tip: "things / jobs", example: "What does she do?" },
  { en: "Where", ua: "де / куди", tip: "places", example: "Where does he live?" },
  { en: "When", ua: "коли", tip: "time", example: "When does the lesson start?" },
  { en: "Why", ua: "чому", tip: "reason", example: "Why do you study English?" },
  {
    en: "How often",
    ua: "як часто",
    tip: "frequency",
    example: "How often do you work?",
  },
] as const;

export const coreQuestions = [
  { q: "Who is he?", a: "He's my brother. / He's Tom.", kind: "be" as const },
  {
    q: "What does she do?",
    a: "She's a teacher. / She works in a school.",
    kind: "do" as const,
  },
  {
    q: "Where does he live?",
    a: "He lives in Kyiv.",
    kind: "do" as const,
  },
  {
    q: "When does the lesson start?",
    a: "It starts at 10 o'clock.",
    kind: "do" as const,
  },
  {
    q: "Why do you study English?",
    a: "Because I need it for work. / Because I like it.",
    kind: "do" as const,
  },
  {
    q: "How often do you work?",
    a: "I work every day. / Five days a week.",
    kind: "do" as const,
  },
] as const;

/** Choose: be or do/does */
export const beOrDoDrill = [
  {
    prompt: "Who ___ she?",
    options: ["is", "does", "do"],
    answer: "is",
  },
  {
    prompt: "What ___ he do?",
    options: ["does", "is", "do"],
    answer: "does",
  },
  {
    prompt: "Where ___ you live?",
    options: ["do", "does", "is"],
    answer: "do",
  },
  {
    prompt: "When ___ the film start?",
    options: ["does", "do", "is"],
    answer: "does",
  },
  {
    prompt: "Why ___ they study English?",
    options: ["do", "does", "are"],
    answer: "do",
  },
  {
    prompt: "How often ___ she work?",
    options: ["does", "do", "is"],
    answer: "does",
  },
  {
    prompt: "Who ___ your teacher?",
    options: ["is", "does", "do"],
    answer: "is",
  },
  {
    prompt: "What ___ your job?",
    options: ["is", "does", "do"],
    answer: "is",
  },
] as const;

/** Scramble → correct question */
export const scrambleQs = [
  {
    scramble: "he / Who / is / ?",
    options: ["Who is he?", "Who he is?", "Is who he?"],
    answer: "Who is he?",
  },
  {
    scramble: "she / What / do / does / ?",
    options: ["What does she do?", "What she does do?", "What do she does?"],
    answer: "What does she do?",
  },
  {
    scramble: "live / Where / he / does / ?",
    options: ["Where does he live?", "Where he does live?", "Where do he live?"],
    answer: "Where does he live?",
  },
  {
    scramble: "the lesson / When / start / does / ?",
    options: [
      "When does the lesson start?",
      "When the lesson does start?",
      "When do the lesson start?",
    ],
    answer: "When does the lesson start?",
  },
  {
    scramble: "you / Why / English / study / do / ?",
    options: [
      "Why do you study English?",
      "Why you do study English?",
      "Why does you study English?",
    ],
    answer: "Why do you study English?",
  },
  {
    scramble: "often / How / work / you / do / ?",
    options: [
      "How often do you work?",
      "How often you do work?",
      "How often does you work?",
    ],
    answer: "How often do you work?",
  },
] as const;

/** Match answer → question */
export const matchAnswerQ = [
  {
    answer: "He's my friend.",
    options: ["Who is he?", "What does he do?", "Where does he live?"],
    correct: "Who is he?",
  },
  {
    answer: "She's a doctor.",
    options: ["What does she do?", "Who is she?", "When does she work?"],
    correct: "What does she do?",
  },
  {
    answer: "In Lviv.",
    options: ["Where does he live?", "When does he live?", "Why does he live?"],
    correct: "Where does he live?",
  },
  {
    answer: "At nine o'clock.",
    options: [
      "When does the lesson start?",
      "Where does the lesson start?",
      "Why does the lesson start?",
    ],
    correct: "When does the lesson start?",
  },
  {
    answer: "Because I like languages.",
    options: [
      "Why do you study English?",
      "How often do you study English?",
      "What do you study?",
    ],
    correct: "Why do you study English?",
  },
  {
    answer: "Every day.",
    options: [
      "How often do you work?",
      "When do you work?",
      "Where do you work?",
    ],
    correct: "How often do you work?",
  },
] as const;

/** Fix the mistake */
export const fixWhLines = [
  {
    id: "f1",
    wrong: "Who he is?",
    answers: ["Who is he?", "Who is he"],
    tipUa: "З to be: Who + is + he?",
  },
  {
    id: "f2",
    wrong: "What she does?",
    answers: ["What does she do?", "What does she do"],
    tipUa: "Present Simple: What + does + she + do?",
  },
  {
    id: "f3",
    wrong: "Where he live?",
    answers: ["Where does he live?", "Where does he live"],
    tipUa: "he/she/it → does + інфінітив (live).",
  },
  {
    id: "f4",
    wrong: "When the lesson starts?",
    answers: [
      "When does the lesson start?",
      "When does the lesson start",
    ],
    tipUa: "Питання: does + start (не starts).",
  },
  {
    id: "f5",
    wrong: "Why you study English?",
    answers: ["Why do you study English?", "Why do you study English"],
    tipUa: "you/we/they → do + інфінітив.",
  },
  {
    id: "f6",
    wrong: "How often she work?",
    answers: ["How often does she work?", "How often does she work"],
    tipUa: "she → does + work.",
  },
] as const;

export const speakPrompts = [
  "Ask your teacher: Who is your favourite singer / actor?",
  "Ask: What does he/she do? (job or free time)",
  "Ask: Where do you live? Where does your friend live?",
  "Ask: When does your lesson / work start?",
  "Ask: Why do you study English?",
  "Ask: How often do you work / study / go to the gym?",
] as const;

export const interviewGrid = [
  "Who…?",
  "What…?",
  "Where…?",
  "When…?",
  "Why…?",
  "How often…?",
] as const;

/* ── Part 2 · Was / Were ───────────────────────────────────────── */

/** Featured examples — Past of to be */
export const wasWereExamples = [
  {
    en: "I was tired yesterday.",
    ua: "Я був/була втомлений/втомлена вчора.",
    form: "affirmative" as const,
  },
  {
    en: "She was at work.",
    ua: "Вона була на роботі.",
    form: "affirmative" as const,
  },
  {
    en: "They were at home.",
    ua: "Вони були вдома.",
    form: "affirmative" as const,
  },
  {
    en: "Was he at the gym?",
    ua: "Він був у спортзалі?",
    form: "yesno" as const,
  },
  {
    en: "Where were you yesterday?",
    ua: "Де ти був/була вчора?",
    form: "wh" as const,
  },
] as const;

/** Choose was / were */
export const wasWereDrill = [
  {
    prompt: "I ___ tired yesterday.",
    options: ["was", "were"],
    answer: "was",
  },
  {
    prompt: "She ___ at work.",
    options: ["was", "were"],
    answer: "was",
  },
  {
    prompt: "They ___ at home.",
    options: ["was", "were"],
    answer: "were",
  },
  {
    prompt: "You ___ at the gym last week.",
    options: ["was", "were"],
    answer: "were",
  },
  {
    prompt: "He ___ happy yesterday.",
    options: ["was", "were"],
    answer: "was",
  },
  {
    prompt: "We ___ late.",
    options: ["was", "were"],
    answer: "were",
  },
  {
    prompt: "It ___ cold yesterday.",
    options: ["was", "were"],
    answer: "was",
  },
  {
    prompt: "___ he at the gym?",
    options: ["Was", "Were"],
    answer: "Was",
  },
  {
    prompt: "___ you at home yesterday?",
    options: ["Was", "Were"],
    answer: "Were",
  },
  {
    prompt: "Where ___ they last week?",
    options: ["was", "were"],
    answer: "were",
  },
] as const;

/** Scramble → correct was/were sentence or question */
export const wasWereScramble = [
  {
    scramble: "tired / I / was / yesterday / .",
    options: [
      "I was tired yesterday.",
      "I were tired yesterday.",
      "Was I tired yesterday.",
    ],
    answer: "I was tired yesterday.",
  },
  {
    scramble: "at work / She / was / .",
    options: ["She was at work.", "She were at work.", "Was she at work."],
    answer: "She was at work.",
  },
  {
    scramble: "at home / They / were / .",
    options: ["They were at home.", "They was at home.", "Were they at home."],
    answer: "They were at home.",
  },
  {
    scramble: "he / at the gym / Was / ?",
    options: ["Was he at the gym?", "Was he at the gym.", "He was at the gym?"],
    answer: "Was he at the gym?",
  },
  {
    scramble: "you / Where / yesterday / were / ?",
    options: [
      "Where were you yesterday?",
      "Where was you yesterday?",
      "Where you were yesterday?",
    ],
    answer: "Where were you yesterday?",
  },
  {
    scramble: "last week / we / Were / at home / ?",
    options: [
      "Were we at home last week?",
      "Was we at home last week?",
      "We were at home last week?",
    ],
    answer: "Were we at home last week?",
  },
] as const;

/** Match answer → question (was/were) */
export const wasWereMatch = [
  {
    answer: "Yes, he was. / No, he wasn't.",
    options: [
      "Was he at the gym?",
      "Where were you yesterday?",
      "Were they at home?",
    ],
    correct: "Was he at the gym?",
  },
  {
    answer: "I was at home.",
    options: [
      "Where were you yesterday?",
      "Was she at work?",
      "Were you tired?",
    ],
    correct: "Where were you yesterday?",
  },
  {
    answer: "Yes, they were. / No, they weren't.",
    options: [
      "Were they at home?",
      "Was he tired?",
      "Where was she?",
    ],
    correct: "Were they at home?",
  },
  {
    answer: "She was at work.",
    options: [
      "Where was she yesterday?",
      "Was he at the gym?",
      "Were you late?",
    ],
    correct: "Where was she yesterday?",
  },
  {
    answer: "Yes, I was. / No, I wasn't.",
    options: [
      "Were you tired yesterday?",
      "Where were they?",
      "Was it cold?",
    ],
    correct: "Were you tired yesterday?",
  },
] as const;

export const wasWereSpeakPrompts = [
  "Say where you were yesterday (at home / at work / at the gym / …).",
  "Ask your teacher: Where were you yesterday? / last week?",
  "Ask: Were you at home yesterday? Was he/she at work?",
  "Ask: Was it cold / hot / rainy yesterday?",
  "Talk about last week: I was… / We were… / They were…",
  "Ask WH: Where was your friend? When were you at the gym?",
] as const;

export const exitChecks = [
  "I can ask Who / What / Where / When / Why / How often…",
  "I use is/are with be (Who is he? What is your job?).",
  "I use do/does + verb (What does she do? Where do you live?).",
  "I can answer WH-questions in a dialogue.",
  "I know: I/he/she/it → was; you/we/they → were.",
  "I can make affirmative, Yes/No and WH questions with was/were.",
  "I can talk about yesterday / last week with was and were.",
] as const;
