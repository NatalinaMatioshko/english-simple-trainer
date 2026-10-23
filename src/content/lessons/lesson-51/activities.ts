/** Lesson 51 — Questions · A nice place
 * Images: public/images/lesson51/
 * Audio: tracks 1–3 (words · a nice place · intonation)
 *
 * Order: 1 photos → 1b repeat → 2 table → 3 choose → 4 my town →
 * 5 listen → 6 grammar → 7 intonation → 8 questions → 9 questions →
 * 10 prepare + ask → final: tell your teacher.
 */

export const AUDIO51 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_7/RM_A1_SB_U7_R${track}.mp3`;

export const IMG51 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson51/${file}`;

/** Ex.1a · photos A–O → words from the box */
export const placePhotoMatch = [
  { id: "A", file: "place-a-sea.png", alt: "A big blue wave", answer: "the sea" },
  {
    id: "B",
    file: "place-compass.png",
    alt: "A compass — letter B at the top",
    answer: "north",
  },
  {
    id: "C",
    file: "place-compass.png",
    alt: "A compass — letter C on the left",
    answer: "west",
  },
  {
    id: "D",
    file: "place-compass.png",
    alt: "A compass — letter D on the right",
    answer: "east",
  },
  {
    id: "E",
    file: "place-compass.png",
    alt: "A compass — letter E at the bottom",
    answer: "south",
  },
  {
    id: "F",
    file: "place-f-mountain.png",
    alt: "A high snowy peak",
    answer: "a mountain",
  },
  {
    id: "G",
    file: "place-g-island.png",
    alt: "Green land in the blue water",
    answer: "an island",
  },
  {
    id: "H",
    file: "place-h-lake.png",
    alt: "Calm water with a small wooden pier and green hills",
    answer: "a lake",
  },
  {
    id: "I",
    file: "place-i-hill.png",
    alt: "A round green hill with trees on top",
    answer: "a hill",
  },
  {
    id: "J",
    file: "place-j-river.png",
    alt: "Long water going through green land",
    answer: "a river",
  },
  {
    id: "K",
    file: "place-k-field.png",
    alt: "Long green lines of young plants and one tree",
    answer: "a field",
  },
  {
    id: "L",
    file: "place-l-sky.png",
    alt: "The sun in a clear blue",
    answer: "the sky",
  },
  {
    id: "M",
    file: "place-m-clouds.png",
    alt: "Big white shapes in the blue",
    answer: "clouds",
  },
  {
    id: "N",
    file: "place-n-trees.png",
    alt: "Tall green plants from below, the sun between them",
    answer: "trees",
  },
  {
    id: "O",
    file: "place-o-flowers.png",
    alt: "Red poppies and the sun",
    answer: "flowers",
  },
] as const;

/** Word box (alphabetical, as the student sees it) */
export const placeWordBox = [
  "clouds",
  "east",
  "a field",
  "flowers",
  "a hill",
  "an island",
  "a lake",
  "a mountain",
  "north",
  "a river",
  "the sea",
  "the sky",
  "south",
  "trees",
  "west",
] as const;

/** Ex.2 · complete the table */
export const placeCategories = [
  "water",
  "land",
  "plants",
  "air",
  "directions",
] as const;

export const placeTableQuiz = [
  { id: "t1", prompt: "a lake", correctAnswer: "water" },
  { id: "t2", prompt: "a river", correctAnswer: "water" },
  { id: "t3", prompt: "the sea", correctAnswer: "water" },
  { id: "t4", prompt: "a field", correctAnswer: "land" },
  { id: "t5", prompt: "a hill", correctAnswer: "land" },
  { id: "t6", prompt: "an island", correctAnswer: "land" },
  { id: "t7", prompt: "a mountain", correctAnswer: "land" },
  { id: "t8", prompt: "flowers", correctAnswer: "plants" },
  { id: "t9", prompt: "trees", correctAnswer: "plants" },
  { id: "t10", prompt: "clouds", correctAnswer: "air" },
  { id: "t11", prompt: "the sky", correctAnswer: "air" },
  { id: "t12", prompt: "north", correctAnswer: "directions" },
  { id: "t13", prompt: "south", correctAnswer: "directions" },
  { id: "t14", prompt: "east", correctAnswer: "directions" },
  { id: "t15", prompt: "west", correctAnswer: "directions" },
] as const;

/** Ex.3 · choose the correct alternatives (one tap per gap) */
export const chooseAlternatives = [
  {
    id: "c1a",
    before: "1 There are three black",
    after: "in the … .",
    options: ["clouds", "sky"],
    answer: "clouds",
  },
  {
    id: "c1b",
    before: "There are three black clouds in the",
    after: ".",
    options: ["clouds", "sky"],
    answer: "sky",
  },
  {
    id: "c2",
    before: "2 I live in the",
    after: "of my country.",
    options: ["south", "flowers"],
    answer: "south",
  },
  {
    id: "c3a",
    before: "3 We have a",
    after: "and a … near my house. We swim a lot.",
    options: ["river", "hill"],
    answer: "river",
  },
  {
    id: "c3b",
    before: "We have a river and a",
    after: "near my house. We swim a lot.",
    options: ["lake", "mountain"],
    answer: "lake",
  },
  {
    id: "c4a",
    before: "4 People take photos of the red",
    after: "and the high … .",
    options: ["flowers", "trees"],
    answer: "flowers",
  },
  {
    id: "c4b",
    before: "People take photos of the red flowers and the high",
    after: ".",
    options: ["fields", "mountains"],
    answer: "fields",
  },
  {
    id: "c5",
    before: "5 People sit on the",
    after: "and eat lunch.",
    options: ["river", "hill"],
    answer: "hill",
  },
  {
    id: "c6",
    before: "6 Milan is in the",
    after: "of Italy.",
    options: ["north", "hill"],
    answer: "north",
  },
] as const;

/** Ex.4 · sentences about your town / city */
export const myTownFrames = [
  {
    id: "t1",
    label: "1 My city / town is in the … of my country.",
    example: "My town is in the south of my country.",
    slots: 1,
  },
  {
    id: "t2",
    label: "2 There are beautiful … there.",
    example: "There are beautiful hills there.",
    slots: 1,
  },
  {
    id: "t3",
    label: "3 There aren’t any … there.",
    example: "There aren’t any mountains there.",
    slots: 1,
  },
  {
    id: "t4",
    label: "4 There is a famous … – its name is … .",
    example: "There is a famous river – its name is the Dnipro.",
    slots: 1,
  },
] as const;

/** Ex.5a · where is the place that Dan talks about? */
export const danPlaceQuiz = [
  {
    id: "dp1",
    prompt: "Where is the place that Dan talks about?",
    options: [
      "In the north of England",
      "In the south of England",
      "In the north of Italy",
    ],
    correctAnswer: "In the north of England",
  },
] as const;

/** Ex.5b · match questions 1–8 with answers a–h */
export const placeAnswers = [
  { value: "a", label: "a In June or July." },
  { value: "b", label: "b In the north of England." },
  { value: "c", label: "c L-A-K-E D-I-S-T-R-I-C-T." },
  { value: "d", label: "d The Lake District." },
  { value: "e", label: "e Sometimes with my friends, sometimes with my wife." },
  { value: "f", label: "f There are mountains and lakes. It’s very beautiful." },
  { value: "g", label: "g Ah, quite expensive!" },
  { value: "h", label: "h Um, sixteen, I think." },
] as const;

export const placeQuestionsMatch = [
  { id: "m1", prompt: "1 What’s the name of the place?", correctAnswer: "d" },
  { id: "m2", prompt: "2 How do you spell that?", correctAnswer: "c" },
  { id: "m3", prompt: "3 Where is it?", correctAnswer: "b" },
  { id: "m4", prompt: "4 What do you like about it?", correctAnswer: "f" },
  { id: "m5", prompt: "5 How many lakes are there?", correctAnswer: "h" },
  { id: "m6", prompt: "6 When do you usually go there?", correctAnswer: "a" },
  { id: "m7", prompt: "7 Who do you go with?", correctAnswer: "e" },
  {
    id: "m8",
    prompt: "8 How much is a train ticket from London?",
    correctAnswer: "g",
  },
] as const;

/** Ex.6 · Wh-questions box — choose the correct alternative */
export const whGrammarBox = [
  {
    id: "g1",
    before: "Use what for",
    after: "→ What’s the name of the place?",
    options: ["things", "people"],
    answer: "things",
  },
  {
    id: "g2",
    before: "Use how for the",
    after: "you do something. → How do you spell that?",
    options: ["way", "time"],
    answer: "way",
  },
  {
    id: "g3",
    before: "Use when for",
    after: "→ When do you usually go there?",
    options: ["places", "days, months and times"],
    answer: "days, months and times",
  },
  {
    id: "g4",
    before: "Use who for",
    after: "→ Who do you go with?",
    options: ["prices", "people"],
    answer: "people",
  },
  {
    id: "g5",
    before: "Use where for",
    after: "→ Where is it?",
    options: ["places", "times"],
    answer: "places",
  },
  {
    id: "g6",
    before: "Use how much for",
    after: "→ How much is a ticket?",
    options: ["prices", "people"],
    answer: "prices",
  },
  {
    id: "g7",
    before: "Use how many for",
    after: "→ How many lakes are there?",
    options: ["prices", "the number of things"],
    answer: "the number of things",
  },
] as const;

/** Ex.7a · intonation ↑ / ↓ */
export const intonationTranscript = [
  "1 When do you go there?",
  "2 Do you go there in June?",
  "3 How much is it?",
  "4 Is it £10?",
  "5 Is it old?",
] as const;

export const intonationQuiz = [
  { id: "i1", prompt: "1 When do you go there?", correctAnswer: "↓ down" },
  { id: "i2", prompt: "2 Do you go there in June?", correctAnswer: "↑ up" },
  { id: "i3", prompt: "3 How much is it?", correctAnswer: "↓ down" },
  { id: "i4", prompt: "4 Is it £10?", correctAnswer: "↑ up" },
  { id: "i5", prompt: "5 Is it old?", correctAnswer: "↑ up" },
] as const;

/** Ex.8a · make questions using the prompts */
export const promptQuestions = [
  {
    scramble: "What / name of the place?",
    parts: ["What", "is", "the name", "of the place?"],
    answer: "What is the name of the place?",
  },
  {
    scramble: "Where / it?",
    parts: ["Where", "is", "it?"],
    answer: "Where is it?",
  },
  {
    scramble: "When / you / usually / go there?",
    parts: ["When", "do", "you", "usually", "go there?"],
    answer: "When do you usually go there?",
  },
  {
    scramble: "What / you / usually / do / there?",
    parts: ["What", "do", "you", "usually", "do", "there?"],
    answer: "What do you usually do there?",
  },
  {
    scramble: "How much / a train ticket / from here?",
    parts: ["How much", "is", "a train ticket", "from here?"],
    answer: "How much is a train ticket from here?",
  },
  {
    scramble: "How many / cafés / there?",
    parts: ["How many", "cafés", "are", "there?"],
    answer: "How many cafés are there?",
  },
  {
    scramble: "it / a quiet place?",
    parts: ["Is", "it", "a quiet place?"],
    answer: "Is it a quiet place?",
  },
] as const;

/** Ex.8b · teacher asks, student answers about a nice place */
export const askPlacePrompts = [
  "What is the name of the place?",
  "Where is it?",
  "When do you usually go there?",
  "What do you usually do there?",
  "How much is a train ticket from here?",
  "How many cafés are there?",
  "Is it a quiet place?",
] as const;

export const askPlaceModels = [
  "It’s … (name).",
  "It’s in the west / north / … of Ukraine.",
  "I usually go there in summer / in July.",
  "I usually walk / swim / take photos / eat in cafés.",
  "It’s about … hryvnias. / It’s quite expensive.",
  "There are about … cafés. / I don’t know — maybe ten.",
  "Yes, it is. / No, it isn’t. It’s very busy.",
] as const;

/** Ex.9 · make questions for the underlined answers */
export const underlinedAnswers = [
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

/** Accept each answer with or without a final question mark. */
export function withQuestionMark(answers: readonly string[]): string[] {
  return answers.flatMap((a) => [a, `${a}?`]);
}

/** Ex.10a · prepare notes about another nice place */
export const placeNotesLists = [
  {
    id: "n1",
    label: "Name · where is it?",
    example: "Yaremche · in the west of Ukraine",
    slots: 2,
  },
  {
    id: "n2",
    label: "What is there? (nature words)",
    example: "mountains, a river, trees, beautiful flowers",
    slots: 3,
  },
  {
    id: "n3",
    label: "When · who with · what do you do there?",
    example: "in summer · with my family · walk, take photos",
    slots: 3,
  },
  {
    id: "n4",
    label: "How much · how many?",
    example: "a train ticket — about 600 hryvnias · many cafés",
    slots: 2,
  },
] as const;

/** Ex.10b · ask and answer with the teacher (both directions) */
export const placeInterviewPrompts = [
  "What (is the name of the place)?",
  "Where (is it)?",
  "When (do you visit)?",
  "Who (do you go with)?",
  "How many (rivers are there)?",
  "How much (is a train ticket)?",
  "How do you spell (it)?",
] as const;

export const placeInterviewModels = [
  "What is the name of the place?",
  "Where is it?",
  "When do you visit?",
  "Who do you go with?",
  "How many rivers are there?",
  "How much is a train ticket?",
  "How do you spell it?",
] as const;

/** Final · tell your teacher about your place (no notes) */
export const tellPlacePrompts = [
  "Say the name and spell it.",
  "Say where it is (north / south / east / west).",
  "Say what there is: mountains, lakes, a river, trees…",
  "Say when you go and who you go with.",
  "Say what you like about it.",
] as const;

export const tellPlaceModels = [
  "My nice place is Yaremche. Y-A-R-E-M-C-H-E.",
  "It’s in the west of Ukraine.",
  "There are mountains, a river and a lot of trees.",
  "I usually go there in summer with my family.",
  "I like it because it’s quiet and very beautiful.",
] as const;

/** HW51 · choose the question word */
export const hwQuestionWords = [
  { id: "w1", before: "", after: "is the lake? — In the north of my country.", answer: "Where" },
  { id: "w2", before: "", after: "do you go there? — In August.", answer: "When" },
  { id: "w3", before: "", after: "do you go with? — With my brother.", answer: "Who" },
  { id: "w4", before: "", after: "is a bus ticket? — About 300 hryvnias.", answer: "How much" },
  { id: "w5", before: "", after: "rivers are there? — Two.", answer: "How many" },
  { id: "w6", before: "", after: "do you spell it? — L-V-I-V.", answer: "How" },
  { id: "w7", before: "", after: "is the name of the island? — Khortytsia.", answer: "What" },
] as const;

export const hwQuestionWordOptions = [
  "What",
  "Where",
  "When",
  "Who",
  "How",
  "How much",
  "How many",
] as const;

/** HW51 · make questions for the answers in [brackets] */
export const hwMakeQuestions = [
  {
    id: "q1",
    after: "→ The place is [in the west of Ukraine].",
    answers: ["Where is the place", "Where is it", "Where’s the place"],
  },
  {
    id: "q2",
    after: "→ I usually go there [in summer].",
    answers: ["When do you usually go there", "When do you go there"],
  },
  {
    id: "q3",
    after: "→ I go [with my family].",
    answers: ["Who do you go with", "Who do you go there with"],
  },
  {
    id: "q4",
    after: "→ There are [three] lakes.",
    answers: ["How many lakes are there"],
  },
  {
    id: "q5",
    after: "→ A train ticket is [500 hryvnias].",
    answers: ["How much is a train ticket", "How much is the train ticket"],
  },
  {
    id: "q6",
    after: "→ Its name is [Shatsk].",
    answers: ["What is its name", "What’s its name", "What is the name of the place", "What’s the name of the place"],
  },
] as const;
