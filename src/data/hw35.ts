/* ── Homework 35 · Unit 3 · Check and reflect ─────────────────── */

/** 1a · Complete the places in town. */
export const placeWords = [
  { n: 1, hint: "t _ _ _ n   s _ _ _ _ _ _ n", answers: ["train station"] },
  { n: 2, hint: "c _ n _ _ _ a", answers: ["cinema"] },
  { n: 3, hint: "c _ _ _ é", answers: ["café", "cafe"] },
  { n: 4, hint: "s _ p _ _ _ _ _ k _ _ _", answers: ["supermarket"] },
  { n: 5, hint: "p _ _ k", answers: ["park"] },
  { n: 6, hint: "h _ _ _ l", answers: ["hotel"] },
  { n: 7, hint: "h _ u _ _", answers: ["house"] },
  { n: 8, hint: "f _ _ t", answers: ["flat"] },
  { n: 9, hint: "b _ _ k", answers: ["bank"] },
  { n: 10, hint: "r _ _ _ a _ _ a _ t", answers: ["restaurant"] },
  { n: 11, hint: "m _ _ k _ _", answers: ["market"] },
  { n: 12, hint: "b _ _ _ s _ _ p", answers: ["bookshop"] },
] as const;

/** 2 · is / isn't / are / aren't (short forms). */
export type ThereBeGap = {
  n: number;
  before: string;
  after: string;
  answer: string;
  example?: boolean;
};

export const thereBeGaps: readonly ThereBeGap[] = [
  {
    n: 1,
    before: "There",
    after: "six good cafés in this town.",
    answer: "are",
    example: true,
  },
  { n: 2, before: "There", after: "a hotel in Baker Street.", answer: "is" },
  {
    n: 3,
    before: "Sorry, no, there",
    after: "a bank near here.",
    answer: "isn't",
  },
  {
    n: 4,
    before: "There",
    after: "two football teams in our town.",
    answer: "are",
  },
  { n: 5, before: "No, there", after: "any shops near here.", answer: "aren't" },
  {
    n: 6,
    before: "No, there",
    after: "no expensive restaurants.",
    answer: "are",
  },
  {
    n: 7,
    before: "There",
    after: "three or four supermarkets in the centre.",
    answer: "are",
  },
  {
    n: 8,
    before: "Oh no, there",
    after: "a lift in our hotel!",
    answer: "isn't",
  },
];

export const thereBeOptions = ["is", "isn't", "are", "aren't"] as const;

/** 3 · Correct the mistakes. */
export const fixMistakes = [
  {
    n: 1,
    wrong: "There aren't no dogs in the park today.",
    answers: [
      "There aren't any dogs in the park today.",
      "There are no dogs in the park today.",
    ],
    tipUa: "aren't + any (не «aren't no»)",
  },
  {
    n: 2,
    wrong: "There's three keys in the kitchen.",
    answers: ["There are three keys in the kitchen."],
    tipUa: "множина → there are",
  },
  {
    n: 3,
    wrong: "There's box in the living room.",
    answers: [
      "There's a box in the living room.",
      "There is a box in the living room.",
    ],
    tipUa: "перед однинним іменником потрібен a / an",
  },
  {
    n: 4,
    wrong: "There aren't a teacher in our class today!",
    answers: [
      "There isn't a teacher in our class today!",
      "There is not a teacher in our class today!",
    ],
    tipUa: "однина → there isn't",
  },
] as const;

/** 4 · Choose the correct alternatives. */
export const chooseAlt = [
  {
    n: 1,
    before: "The oven is in the",
    after: ".",
    options: ["kitchen", "bedroom"],
    answer: "kitchen",
  },
  {
    n: 2,
    before: "There's a table in the",
    after: ".",
    options: ["living room", "bathroom"],
    answer: "living room",
  },
  {
    n: 3,
    before: "There are three",
    after: "in our house.",
    options: ["kitchens", "bathrooms"],
    answer: "bathrooms",
  },
  {
    n: 4,
    before: "There are two",
    after: "in my bedroom.",
    options: ["beds", "ovens"],
    answer: "beds",
  },
  {
    n: 5,
    before: "There's a",
    after: "in the bathroom.",
    options: ["shower", "lift"],
    answer: "shower",
  },
  {
    n: 6,
    before: "There's a big",
    after: "in the bathroom!",
    options: ["wifi", "TV"],
    answer: "TV",
  },
] as const;

/** 5a · Questions about your classroom. */
export type ClassroomSeg =
  | { kind: "gap"; answer: string }
  | { kind: "text"; text: string };

export const classroomQs: readonly {
  n: number;
  example?: boolean;
  segs: readonly ClassroomSeg[];
}[] = [
  {
    n: 1,
    example: true,
    segs: [
      { kind: "gap", answer: "Is" },
      { kind: "gap", answer: "there" },
      { kind: "text", text: "a TV in our classroom?" },
    ],
  },
  {
    n: 2,
    segs: [
      { kind: "gap", answer: "Are" },
      { kind: "gap", answer: "there" },
      { kind: "gap", answer: "any" },
      { kind: "text", text: "books?" },
    ],
  },
  {
    n: 3,
    segs: [
      { kind: "gap", answer: "How" },
      { kind: "gap", answer: "many" },
      { kind: "text", text: "desks" },
      { kind: "gap", answer: "are" },
      { kind: "gap", answer: "there" },
      { kind: "text", text: "?" },
    ],
  },
  {
    n: 4,
    segs: [
      { kind: "gap", answer: "Is" },
      { kind: "gap", answer: "there" },
      { kind: "text", text: "a computer?" },
    ],
  },
  {
    n: 5,
    segs: [
      { kind: "gap", answer: "Are" },
      { kind: "gap", answer: "there" },
      { kind: "gap", answer: "any" },
      { kind: "text", text: "photos?" },
    ],
  },
  {
    n: 6,
    segs: [
      { kind: "gap", answer: "How" },
      { kind: "gap", answer: "many" },
      { kind: "text", text: "chairs" },
      { kind: "gap", answer: "are" },
      { kind: "gap", answer: "there" },
      { kind: "text", text: "?" },
    ],
  },
];

export const classroomWordBank = [
  "any",
  "Are",
  "are",
  "How",
  "Is",
  "many",
  "there",
] as const;

/** 6 · Complete the sentences with an adjective. */
export type AdjGap = {
  n: number;
  before: string;
  after: string;
  hint: string;
  answer: string;
  example?: boolean;
};

export const adjGaps: readonly AdjGap[] = [
  {
    n: 1,
    before: "It's a",
    after: "town. There are no hotels or restaurants.",
    hint: "s _ _ _ _",
    answer: "small",
    example: true,
  },
  {
    n: 2,
    before: "My flat isn't new. It's",
    after: ".",
    hint: "o _ _",
    answer: "old",
  },
  {
    n: 3,
    before: "There are five bedrooms. It's a",
    after: "house.",
    hint: "b _ _",
    answer: "big",
  },
  {
    n: 4,
    before: "There aren't any people in the café. It's",
    after: ".",
    hint: "q _ _ _ _",
    answer: "quiet",
  },
  {
    n: 5,
    before: "The flat in Berlin is £500 per night. It's",
    after: ".",
    hint: "e _ _ _ _ _ _ _ _",
    answer: "expensive",
  },
  {
    n: 6,
    before: "This is a",
    after: "town. There are big shops, a market and a train station.",
    hint: "b _ _ _",
    answer: "busy",
  },
  {
    n: 7,
    before: "This clock isn't expensive. It's",
    after: ".",
    hint: "c _ _ _ _",
    answer: "cheap",
  },
];

/** 7 · Rewrite the sentences. */
export type RewriteItem = {
  n: number;
  given: string;
  start: string;
  answers: readonly string[];
  example?: boolean;
};

export const rewriteItems: readonly RewriteItem[] = [
  {
    n: 1,
    given: "This is a busy café.",
    start: "This",
    answers: ["This café is busy.", "This cafe is busy."],
    example: true,
  },
  {
    n: 2,
    given: "This car is expensive.",
    start: "This",
    answers: ["This is an expensive car."],
    example: true,
  },
  {
    n: 3,
    given: "This is a cheap shop.",
    start: "This",
    answers: ["This shop is cheap."],
  },
  {
    n: 4,
    given: "The houses are new.",
    start: "They",
    answers: ["They are new houses.", "They're new houses."],
  },
  {
    n: 5,
    given: "This is a quiet street.",
    start: "This",
    answers: ["This street is quiet."],
  },
  {
    n: 6,
    given: "The station is busy.",
    start: "It",
    answers: ["It is a busy station.", "It's a busy station."],
  },
  {
    n: 7,
    given: "They are new computers.",
    start: "The",
    answers: ["The computers are new."],
  },
  {
    n: 8,
    given: "The man is old.",
    start: "He",
    answers: ["He is an old man.", "He's an old man."],
  },
];

/** 8a · Put the words in the correct order to make questions. */
export const wordOrder35 = [
  {
    scramble: "your / computer / Is / new / ?",
    parts: ["Is", "your", "computer", "new", "?"] as const,
    answer: "Is your computer new?",
  },
  {
    scramble: "busy / town / Is / your / ?",
    parts: ["Is", "your", "town", "busy", "?"] as const,
    answer: "Is your town busy?",
  },
  {
    scramble: "park / Is / a / there / near / house / quiet / your / ?",
    parts: [
      "Is",
      "there",
      "a",
      "quiet",
      "park",
      "near",
      "your",
      "house",
      "?",
    ] as const,
    answer: "Is there a quiet park near your house?",
  },
  {
    scramble: "your / big / Is / small / house / or / ?",
    parts: ["Is", "your", "house", "big", "or", "small", "?"] as const,
    answer: "Is your house big or small?",
  },
  {
    scramble: "in / expensive / hotels / Are / town / your / or / cheap / ?",
    parts: [
      "Are",
      "hotels",
      "in",
      "your",
      "town",
      "expensive",
      "or",
      "cheap",
      "?",
    ] as const,
    answer: "Are hotels in your town expensive or cheap?",
  },
] as const;

/** Reflect · 1–5 self-assessment. */
export const reflectStatements = [
  "I can say what's in a town.",
  "I can talk about a flat.",
  "I can describe a town or a city.",
  "I can ask for and give directions.",
] as const;
