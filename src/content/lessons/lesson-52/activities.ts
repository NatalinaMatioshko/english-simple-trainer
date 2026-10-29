/** Lesson 52 — A good day
 * Images: public/images/lesson52/ (review cards reuse public/images/lesson51/)
 * Audio: tracks 4–8 (David's year · months · ordinals · last/yesterday · wasn't/weren't)
 *
 * Order: review (cards · translate · questions · tell) → 1 David's year →
 * 2 months → 3 ordinals → 4 birthdays → 5 last / yesterday → 6 grammar →
 * 7 wasn't / weren't → 8 choose → 9 true for you → 10 prepare → 11 speak.
 */

export const AUDIO52 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_7/RM_A1_SB_U7_R${track}.mp3`;

export const IMG52 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson52/${file}`;

/** Review cards reuse the Lesson 51 photos (no duplicated files). */
const IMG51 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson51/${file}`;

/** Accept each answer with or without a final question mark. */
export function withQuestionMark(answers: readonly string[]): string[] {
  return answers.flatMap((a) => [a, `${a}?`]);
}

/* ------------------------------------------------------------------ */
/* Review · copied from Lesson 51 (independent copy)                   */
/* ------------------------------------------------------------------ */

export const reviewPictureCards = [
  { src: IMG51("place-a-sea.png"), alt: "A big blue wave", back: "the sea" },
  { src: IMG51("place-f-mountain.png"), alt: "A high snowy peak", back: "a mountain" },
  { src: IMG51("place-g-island.png"), alt: "Green land in the blue water", back: "an island" },
  {
    src: IMG51("place-h-lake.png"),
    alt: "Calm water with a small wooden pier and green hills",
    back: "a lake",
  },
  { src: IMG51("place-i-hill.png"), alt: "A round green hill with trees on top", back: "a hill" },
  { src: IMG51("place-j-river.png"), alt: "Long water going through green land", back: "a river" },
  {
    src: IMG51("place-k-field.png"),
    alt: "Long green lines of young plants and one tree",
    back: "a field",
  },
  { src: IMG51("place-l-sky.png"), alt: "The sun in a clear blue", back: "the sky" },
  { src: IMG51("place-m-clouds.png"), alt: "Big white shapes in the blue", back: "clouds" },
  {
    src: IMG51("place-n-trees.png"),
    alt: "Tall green plants from below, the sun between them",
    back: "trees",
  },
  { src: IMG51("place-o-flowers.png"), alt: "Red poppies and the sun", back: "flowers" },
  {
    src: IMG51("place-compass.png"),
    alt: "A compass with four letters",
    back: "north · south · east · west",
  },
];

/** Questions from the place prompts — student translates UA → EN */
export const reviewTranslateQuestions = [
  {
    id: "rt1",
    ua: "Як називається це місце?",
    answers: ["What is the name of the place", "What’s the name of the place"],
  },
  { id: "rt2", ua: "Де воно?", answers: ["Where is it", "Where’s it"] },
  {
    id: "rt3",
    ua: "Коли ти зазвичай туди їздиш?",
    answers: ["When do you usually go there"],
  },
  {
    id: "rt4",
    ua: "Що ти зазвичай там робиш?",
    answers: ["What do you usually do there"],
  },
  {
    id: "rt5",
    ua: "Скільки коштує квиток на потяг звідси?",
    answers: ["How much is a train ticket from here"],
  },
  {
    id: "rt6",
    ua: "Скільки там кафе?",
    answers: ["How many cafés are there", "How many cafes are there"],
  },
  { id: "rt7", ua: "Це тихе місце?", answers: ["Is it a quiet place"] },
] as const;

export const reviewUnderlinedAnswers = [
  {
    id: "u1",
    after: "→ My parents are from [Izmir, in Turkey].",
    answers: ["Where are your parents from"],
  },
  {
    id: "u2",
    after: "→ I go [with Tina].",
    answers: ["Who do you go with", "Who do you go there with"],
  },
  {
    id: "u3",
    after: "→ It’s [in the east].",
    answers: ["Where is it", "Where’s it"],
  },
  {
    id: "u4",
    after: "→ I visit [in January or February].",
    answers: ["When do you visit", "When do you visit it", "When do you go there"],
  },
  {
    id: "u5",
    after: "→ There are [five] lakes there.",
    answers: ["How many lakes are there", "How many lakes are there there"],
  },
  {
    id: "u6",
    after: "→ A ticket is [£10.50].",
    answers: ["How much is a ticket", "How much is the ticket"],
  },
  {
    id: "u7",
    after: "→ It’s [R-O-M-E].",
    answers: ["How do you spell it", "How do you spell that"],
  },
] as const;

export const reviewTellPlacePrompts = [
  "Say the name and spell it.",
  "Say where it is (north / south / east / west).",
  "Say what there is: mountains, lakes, a river, trees…",
  "Say when you go and who you go with.",
  "Say what you like about it.",
] as const;

export const reviewTellPlaceModels = [
  "My nice place is Yaremche. Y-A-R-E-M-C-H-E.",
  "It’s in the west of Ukraine.",
  "There are mountains, a river and a lot of trees.",
  "I usually go there in summer with my family.",
  "I like it because it’s quiet and very beautiful.",
] as const;

/* ------------------------------------------------------------------ */
/* 1 · David's year                                                    */
/* ------------------------------------------------------------------ */

export const davidParagraphs = [
  {
    id: "A",
    lead: "12th February",
    text: "was the first day in our new flat. It’s great. We’ve got a new table and chairs and a big sofa.",
  },
  {
    id: "B",
    lead: "5th April",
    text: "was my birthday. I was 31 this year. There was a party with great music – it was amazing!",
  },
  {
    id: "C",
    lead: "7th August",
    text: "was the first day of our holiday. We usually go to a big city, but this year was different. Our hotel was near a lake, and there were mountains and fields. There weren’t any cars or buses. It was really quiet.",
  },
  {
    id: "D",
    lead: "On 14th October",
    text: "in the evening we were at the Spanish restaurant near Liverpool Street. Mike, Junko, Wes and Trin were there. The food wasn’t cheap … but it was really good.",
  },
  {
    id: "E",
    lead: "8th December",
    text: "was my first day at my new job. I work for a video games company in London and I often travel to other countries. It’s a really good job.",
  },
] as const;

/** Ex.1a · photos 1–5 → paragraphs A–E */
export const goodDayPhotos = [
  {
    id: "1",
    file: "good-day-1-work.png",
    alt: "A smiling man at a desk with a laptop in a bright office",
    answer: "E",
  },
  {
    id: "2",
    file: "good-day-2-lake.png",
    alt: "Green mountains and a calm lake",
    answer: "C",
  },
  {
    id: "3",
    file: "good-day-3-party.png",
    alt: "Happy friends at a party with a DJ and music",
    answer: "B",
  },
  {
    id: "4",
    file: "good-day-4-paella.png",
    alt: "A big pan of paella with seafood and lemon",
    answer: "D",
  },
  {
    id: "5",
    file: "good-day-5-flat.png",
    alt: "A bright flat with a table, chairs, a kitchen and a black sofa",
    answer: "A",
  },
] as const;

/** Audio 4 · David's year (checked against several recognition passes) */
export const davidR4Transcript = [
  "David’s year. These were my five very good days this year.",
  "The 12th of February was the first day in our new flat. It’s great! We’ve got a new table and chairs and a big TV.",
  "The 5th of April was my birthday. I was 21 this year. There was a party with great music. It was amazing!",
  "The 7th of August was the first day of our holiday. We usually go to a big city, but this year was different. Our hotel was near the sea, and there were mountains and fields. There weren’t any cars or buses. It was really quiet.",
  "On the 14th of October, in the evening, we were at the Thai restaurant near Liverpool Street. Mike, Junko, Wes and Trin were there. The food wasn’t cheap, but it was really good.",
  "The 8th of December was my first day at my new job. I work for a food company in London and I often travel to other countries. It’s a really good job.",
] as const;

/** Ex.1b · five differences: text → audio */
export const davidDifferencePrompts = [
  "Paragraph A · new flat — what is different?",
  "Paragraph B · birthday — what is different?",
  "Paragraph C · holiday — what is different?",
  "Paragraph D · restaurant — what is different?",
  "Paragraph E · new job — what is different?",
] as const;

export const davidDifferenceModels = [
  "Text: a big sofa → Audio: a big TV",
  "Text: I was 31 → Audio: I was 21",
  "Text: near a lake → Audio: near the sea",
  "Text: the Spanish restaurant → Audio: the Thai restaurant",
  "Text: a video games company → Audio: a food company",
] as const;

/* ------------------------------------------------------------------ */
/* 2 · Months                                                          */
/* ------------------------------------------------------------------ */

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const monthsTranscript = [
  "January · February · March · April · May · June",
  "July · August · September · October · November · December",
] as const;

/** Ex.2b · rewrite the sentences so they are true for you */
export const trueForYouMonths = [
  { id: "m1", label: "1 My birthday is in April.", example: "My birthday is in October.", slots: 1 },
  {
    id: "m2",
    label: "2 My best friend’s birthday is in December.",
    example: "My best friend’s birthday is in March.",
    slots: 1,
  },
  {
    id: "m3",
    label: "3 My teacher’s birthday is in November.",
    example: "My teacher’s birthday is in June.",
    slots: 1,
  },
  {
    id: "m4",
    label: "4 The weather is good in my country in May.",
    example: "The weather is good in my country in August.",
    slots: 1,
  },
  { id: "m5", label: "5 My favourite month is July.", example: "My favourite month is September.", slots: 1 },
] as const;

/* ------------------------------------------------------------------ */
/* 3 · Ordinal numbers                                                 */
/* ------------------------------------------------------------------ */

/** Word box (as printed) */
export const ordinalBox = [
  "eleventh",
  "fifth",
  "fifteenth",
  "first",
  "fourth",
  "fourteenth",
  "second",
  "third",
  "thirteenth",
  "thirtieth",
  "thirty-first",
  "twelfth",
  "twentieth",
  "twenty-first",
  "twenty-fourth",
  "twenty-second",
  "twenty-third",
] as const;

export const ordinalMatch = [
  { id: "a", number: "1", answer: "first" },
  { id: "b", number: "2", answer: "second" },
  { id: "c", number: "3", answer: "third" },
  { id: "d", number: "4", answer: "fourth" },
  { id: "e", number: "5", answer: "fifth" },
  { id: "f", number: "11", answer: "eleventh" },
  { id: "g", number: "12", answer: "twelfth" },
  { id: "h", number: "13", answer: "thirteenth" },
  { id: "i", number: "14", answer: "fourteenth" },
  { id: "j", number: "15", answer: "fifteenth" },
  { id: "k", number: "20", answer: "twentieth" },
  { id: "l", number: "21", answer: "twenty-first" },
  { id: "m", number: "22", answer: "twenty-second" },
  { id: "n", number: "23", answer: "twenty-third" },
  { id: "o", number: "24", answer: "twenty-fourth" },
  { id: "p", number: "30", answer: "thirtieth" },
  { id: "q", number: "31", answer: "thirty-first" },
] as const;

export const ordinalsTranscript = ordinalMatch.map(
  (o) => `${o.id} · ${o.number} · ${o.answer}`,
);

/* ------------------------------------------------------------------ */
/* 4 · Family birthdays                                                */
/* ------------------------------------------------------------------ */

export const familyBirthdaysList = [
  {
    id: "fb",
    label: "My family’s birthdays",
    example: "My brother’s birthday is on the nineteenth of April.",
    placeholder: "My … ’s birthday is on the … of …",
    slots: 4,
  },
] as const;

export const familyBirthdayPrompts = [
  "Tell your teacher about two people in your family: whose birthday is it, and when?",
  "Ask your teacher: When is your birthday?",
] as const;

export const familyBirthdayModels = [
  "My mum’s birthday is on the third of May. My brother’s birthday is on the nineteenth of April.",
  "When is your birthday? — It’s on the twelfth of March.",
] as const;

/* ------------------------------------------------------------------ */
/* 5 · today / yesterday / last                                        */
/* ------------------------------------------------------------------ */

export const timeWordBox = ["last", "today", "week", "weekend", "yesterday"] as const;

export const timeWordGaps = [
  { id: "t1", before: "1", after: "is Wednesday 14th. (example)", answer: "today" },
  { id: "t2", before: "2", after: "was Tuesday 13th.", answer: "yesterday" },
  { id: "t3", before: "3", after: "Friday was the 9th.", answer: "last" },
  { id: "t4", before: "4 Last", after: "was Saturday 10th and Sunday 11th.", answer: "weekend" },
  { id: "t5", before: "5 Last", after: "was Monday 5th to Sunday 11th.", answer: "week" },
] as const;

export const timeWordsTranscript = [
  "1 Today is Wednesday the 14th.",
  "2 Yesterday was Tuesday the 13th.",
  "3 Last Friday was the 9th.",
  "4 Last weekend was Saturday the 10th and Sunday the 11th.",
  "5 Last week was Monday the 5th to Sunday the 11th.",
] as const;

/* ------------------------------------------------------------------ */
/* 6 · Grammar · was / were · there was / there were                   */
/* ------------------------------------------------------------------ */

export const wasWereOptions = ["was", "wasn’t", "were", "weren’t"] as const;

export const grammarBoxGaps = [
  { id: "g1", before: "+ I / He / She / It", after: "thirty-one this year. (example)", answer: "was" },
  { id: "g2", before: "− I / He / She / It", after: "quiet.", answer: "wasn’t" },
  { id: "g3", before: "+ You / We / They", after: "great.", answer: "were" },
  { id: "g4", before: "− You / We / They", after: "there.", answer: "weren’t" },
  { id: "g5", before: "+ There", after: "a party.", answer: "was" },
  { id: "g6", before: "− There", after: "a lift.", answer: "wasn’t" },
  { id: "g7", before: "+ There", after: "mountains and fields.", answer: "were" },
  { id: "g8", before: "− There", after: "any buses or cars.", answer: "weren’t" },
] as const;

/* ------------------------------------------------------------------ */
/* 7 · wasn't / weren't pronunciation                                  */
/* ------------------------------------------------------------------ */

/** Ex.7a · sentences with the words to notice highlighted */
export const wasntWerentSentences = [
  { id: "p1", text: "The food wasn’t cheap.", highlight: ["wasn’t"] },
  { id: "p2", text: "Bill and Jane weren’t there.", highlight: ["weren’t"] },
  { id: "p3", text: "There wasn’t a lift.", highlight: ["wasn’t"] },
  { id: "p4", text: "There weren’t any cars or buses.", highlight: ["weren’t"] },
];

export const wasntWerentTranscript = [
  "1 The food wasn’t cheap.",
  "2 Bill and Jane weren’t there.",
  "3 There wasn’t a lift.",
  "4 There weren’t any cars or buses.",
] as const;

/* ------------------------------------------------------------------ */
/* 8 · Choose the correct alternatives                                 */
/* ------------------------------------------------------------------ */

export const chooseWasWere = [
  { id: "c1", before: "1 My birthday party", after: "on 12th March.", options: ["was", "were"], answer: "was" },
  { id: "c2", before: "2 There", after: "a big party near the hotel last week.", options: ["was", "were"], answer: "was" },
  { id: "c3", before: "3 Our holiday", after: "from 7th July to 15th July.", options: ["was", "were"], answer: "was" },
  { id: "c4", before: "4 There", after: "six people on the train.", options: ["was", "were"], answer: "were" },
  { id: "c5", before: "5 The restaurants", after: "busy.", options: ["wasn’t", "weren’t"], answer: "weren’t" },
  { id: "c6", before: "6 The plane tickets", after: "really cheap.", options: ["was", "were"], answer: "were" },
  { id: "c7", before: "7 Norma and Shelley", after: "at the party yesterday.", options: ["was", "were"], answer: "were" },
  { id: "c8", before: "8 There", after: "a big cake in the living room.", options: ["was", "were"], answer: "was" },
] as const;

/* ------------------------------------------------------------------ */
/* 9 · True for you                                                    */
/* ------------------------------------------------------------------ */

export const trueForYouWasWere = [
  { id: "y1", label: "1 I … on the train at 8 a.m. on Monday.", example: "I wasn’t on the train at 8 a.m. on Monday.", slots: 1 },
  { id: "y2", label: "2 My bus / train … late on Tuesday.", example: "My bus was late on Tuesday.", slots: 1 },
  { id: "y3", label: "3 There … five people in my office / my class on Wednesday.", example: "There were five people in my office on Wednesday.", slots: 1 },
  { id: "y4", label: "4 Yesterday … a good day.", example: "Yesterday was a good day.", slots: 1 },
  { id: "y5", label: "5 There … fish for lunch at work / at school / at university on Friday.", example: "There wasn’t fish for lunch at work on Friday.", slots: 1 },
  { id: "y6", label: "6 My family … at home on Saturday.", example: "My family were at home on Saturday.", slots: 1 },
  { id: "y7", label: "7 My friends and I … at the cinema on Sunday evening.", example: "My friends and I weren’t at the cinema on Sunday evening.", slots: 1 },
] as const;

export const compareSentencesPrompts = [
  "Read your seven sentences to your teacher.",
  "Your teacher reads their sentences. Which ones are the same?",
] as const;

export const compareSentencesModels = [
  "My bus was late on Tuesday. Yesterday was a good day.",
  "Yesterday was a good day — the same! My bus wasn’t late — different.",
] as const;

/* ------------------------------------------------------------------ */
/* 10–11 · Speaking · five good days                                   */
/* ------------------------------------------------------------------ */

export const goodDaysNotes = [1, 2, 3, 4, 5].map((n) => ({
  id: `d${n}`,
  label: `Day ${n} — when · where · who with · what`,
  ...(n === 1 ? { example: "18th June · Paris · my friend Ulrika · on holiday" } : {}),
  placeholder: "when · where · who with · what",
  slots: 1,
}));

export const tellGoodDaysPrompts = [
  "Day 1 — when was it, where were you, who were you with, what was it?",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
] as const;

export const tellGoodDaysModels = [
  "On 18th June, I was on holiday in Paris with my friend Ulrika. There were lots of great places to visit. It was amazing!",
  "On … , I was at … with … . It was … .",
  "On … , there was a … . It was … .",
  "On … , we were at … . There were … .",
  "On … , I was … . It was really … .",
] as const;

export const teacherDaysNotes = [
  {
    id: "td",
    label: "Your teacher’s good days — notes",
    example: "18th June · Paris · friend · holiday · amazing",
    slots: 5,
  },
] as const;

export const retellPrompts = [
  "Tell your teacher’s good days back to your teacher — use he / she.",
  "Say when, where and who with for each day.",
  "Finish: It was amazing / great / really good.",
] as const;

export const retellModels = [
  "On 18th June, Gina was in Paris with her friend. They were on holiday.",
  "There were lots of great places to go to.",
  "It was amazing!",
] as const;

/* ------------------------------------------------------------------ */
/* HW52                                                                */
/* ------------------------------------------------------------------ */

export const hwWasWere = [
  { id: "w1", before: "My birthday", after: "on 3rd May, so there was a party that day.", answer: "was" },
  { id: "w2", before: "We", after: "at the cinema on Friday evening. The film was great!", answer: "were" },
  { id: "w3", before: "The hotel", after: "cheap — it was very expensive.", answer: "wasn’t" },
  { id: "w4", before: "There", after: "a big party in our flat — twenty people came!", answer: "was" },
  { id: "w5", before: "There", after: "any people in the park — it was very quiet.", answer: "weren’t" },
  { id: "w6", before: "My friends", after: "at work yesterday. They were on holiday.", answer: "weren’t" },
  { id: "w7", before: "There", after: "mountains and lakes near our hotel, so we walked every day.", answer: "were" },
  { id: "w8", before: "It", after: "a really good day — I loved it!", answer: "was" },
] as const;

/** Dates in words. Expected format: 12th March → the twelfth of March */
export const hwDates = [
  { id: "dt1", date: "12th March", answers: ["the twelfth of March"] },
  { id: "dt2", date: "1st January", answers: ["the first of January"] },
  { id: "dt3", date: "5th April", answers: ["the fifth of April"] },
  {
    id: "dt4",
    date: "22nd June",
    answers: ["the twenty-second of June", "the twenty second of June"],
  },
  { id: "dt5", date: "3rd October", answers: ["the third of October"] },
  {
    id: "dt6",
    date: "31st December",
    answers: ["the thirty-first of December", "the thirty first of December"],
  },
  { id: "dt7", date: "14th February", answers: ["the fourteenth of February"] },
  { id: "dt8", date: "20th August", answers: ["the twentieth of August"] },
] as const;
