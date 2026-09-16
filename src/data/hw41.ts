/**
 * HW41 — Unit 4 Check and reflect
 * Images: public/images/hw41/
 */

export const IMG_HW41 = (file: string) =>
  `${import.meta.env.BASE_URL}images/hw41/${file}`;

/** 1 · Word map */
export type Hw41MapBin = "colours" | "body" | "age";

export const wordMapBank = [
  "a beard",
  "blonde",
  "brown",
  "eyes",
  "grey",
  "hair",
  "in her 20s",
  "in his 50s",
  "red",
] as const;

export const wordMapAnswers: Record<(typeof wordMapBank)[number], Hw41MapBin> =
  {
    blonde: "colours",
    brown: "colours",
    grey: "colours",
    red: "colours",
    hair: "body",
    eyes: "body",
    "a beard": "body",
    "in her 20s": "age",
    "in his 50s": "age",
  };

export const wordMapHubMeta: {
  id: Hw41MapBin;
  label: string;
  slots: number;
}[] = [
  { id: "colours", label: "colours", slots: 4 },
  { id: "body", label: "the body", slots: 3 },
  { id: "age", label: "age", slots: 2 },
];

/** 2 · Complete with the words in the box */
export const vocabGaps = [
  {
    id: 1,
    before: "No, her hair isn't red. It's",
    after: ".",
    answer: "blonde",
    options: ["a beard", "blonde", "eyes", "in his 80s", "in her 20s"] as const,
  },
  {
    id: 2,
    before: "I'm in my 30s, and my wife is",
    after: ".",
    answer: "in her 20s",
    options: ["a beard", "blonde", "eyes", "in his 80s", "in her 20s"] as const,
  },
  {
    id: 3,
    before: "My brother's got blonde hair and",
    after: ".",
    answer: "a beard",
    options: ["a beard", "blonde", "eyes", "in his 80s", "in her 20s"] as const,
  },
  {
    id: 4,
    before: "My father is",
    after: ".",
    answer: "in his 80s",
    options: ["a beard", "blonde", "eyes", "in his 80s", "in her 20s"] as const,
  },
  {
    id: 5,
    before: "My sister's got green",
    after: ".",
    answer: "eyes",
    options: ["a beard", "blonde", "eyes", "in his 80s", "in her 20s"] as const,
  },
] as const;

/** 3 · have got / hasn't got */
export const haveGotGaps = [
  {
    id: 1,
    before: "I",
    after: "a beard. (+)",
    answer: "'ve got",
    example: true,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 2,
    before: "We",
    after: "a big house. (−)",
    answer: "haven't got",
    example: true,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 3,
    before: "John",
    after: "two sisters. (+)",
    answer: "has got",
    example: false,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 4,
    before: "Sarah",
    after: "blue eyes. (−)",
    answer: "hasn't got",
    example: false,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 5,
    before: "Our flat",
    after: "a big kitchen. (−)",
    answer: "hasn't got",
    example: false,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 6,
    before: "They",
    after: "three children. (+)",
    answer: "'ve got",
    example: false,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 7,
    before: "You",
    after: "grey hair! (−)",
    answer: "haven't got",
    example: false,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
  {
    id: 8,
    before: "Our town",
    after: "two restaurants. (+)",
    answer: "has got",
    example: false,
    options: ["'ve got", "haven't got", "has got", "hasn't got"] as const,
  },
] as const;

/** 4 · True for you — free writing prompts */
export const trueForYou = [
  "I've got …",
  "My friend hasn't got …",
  "My house/flat has got …",
  "My parents have got …",
  "My teacher has got …",
  "My town has got …",
] as const;

/** 5a · Word order questions */
export const wordOrder41 = [
  {
    scramble: "you / got / a / Have / phone?",
    parts: ["Have", "you", "got", "a", "phone?"] as const,
    answer: "Have you got a phone?",
  },
  {
    scramble: "Has / your / green / teacher / eyes / got?",
    parts: ["Has", "your", "teacher", "got", "green", "eyes?"] as const,
    answer: "Has your teacher got green eyes?",
  },
  {
    scramble: "Have / blonde / your / hair / parents / got?",
    parts: ["Have", "your", "parents", "got", "blonde", "hair?"] as const,
    answer: "Have your parents got blonde hair?",
  },
  {
    scramble: "you / food / your / bag / in / Have / got?",
    parts: ["Have", "you", "got", "food", "in", "your", "bag?"] as const,
    answer: "Have you got food in your bag?",
  },
  {
    scramble: "camera / good / your / phone / Has / a / got?",
    parts: ["Has", "your", "phone", "got", "a", "good", "camera?"] as const,
    answer: "Has your phone got a good camera?",
  },
  {
    scramble: "bottle / of / Have / a / got / water / you?",
    parts: ["Have", "you", "got", "a", "bottle", "of", "water?"] as const,
    answer: "Have you got a bottle of water?",
  },
  {
    scramble: "How / credit cards / you / many / got / have?",
    parts: ["How", "many", "credit", "cards", "have", "you", "got?"] as const,
    answer: "How many credit cards have you got?",
  },
] as const;

/** 6 · Choose the correct alternatives */
export const chooseAlt41 = [
  {
    id: 1,
    options: ["Go to", "Take"] as const,
    answer: "Go to",
    after: "Spain — it's very nice.",
  },
  {
    id: 2,
    options: ["Take", "Visit"] as const,
    answer: "Visit",
    after: "Tokyo. It's amazing!",
  },
  {
    id: 3,
    options: ["Go to", "Take"] as const,
    answer: "Take",
    after: "some photos of the park.",
  },
  {
    id: 4,
    options: ["Try", "Take"] as const,
    answer: "Take",
    after: "a coat. It's cold.",
  },
  {
    id: 5,
    options: ["Don't take", "Don't go to"] as const,
    answer: "Don't take",
    after: "the bus. It's slow.",
  },
  {
    id: 6,
    options: ["Drink", "Try"] as const,
    answer: "Try",
    after: "French food.",
  },
  {
    id: 7,
    options: ["Drink", "Take"] as const,
    answer: "Drink",
    after: "coffee from Brazil, it's very good.",
  },
  {
    id: 8,
    options: ["See", "Take"] as const,
    answer: "See",
    after: "the new Star Wars film.",
  },
] as const;

/** 7 · Photos · holiday UK dos and don'ts */
export const holidayPics = [
  {
    n: 1,
    file: "passport.jpg",
    doIt: true,
    example: true,
    answers: [
      "Take your passport.",
      "Take your passport",
      "Take a passport.",
      "Take a passport",
    ],
    label: "passport",
  },
  {
    n: 2,
    file: "leicester-square.jpg",
    doIt: false,
    example: false,
    answers: [
      "Don't go to Leicester Square.",
      "Don't go to Leicester Square",
      "Don't visit Leicester Square.",
      "Don't visit Leicester Square",
    ],
    label: "Leicester Square",
  },
  {
    n: 3,
    file: "british-food.jpg",
    doIt: true,
    example: false,
    answers: [
      "Try British food.",
      "Try British food",
      "Try English food.",
      "Try English food",
      "Try fish and chips.",
      "Try fish and chips",
    ],
    label: "British food",
  },
  {
    n: 4,
    file: "coffee.jpg",
    doIt: false,
    example: false,
    answers: [
      "Don't drink coffee.",
      "Don't drink coffee",
      "Don't have coffee.",
      "Don't have coffee",
    ],
    label: "coffee",
  },
  {
    n: 5,
    file: "taxi.jpg",
    doIt: false,
    example: false,
    answers: [
      "Don't take a taxi.",
      "Don't take a taxi",
      "Don't take taxis.",
      "Don't take taxis",
      "Don't take taxis!",
    ],
    label: "taxi",
  },
  {
    n: 6,
    file: "market.jpg",
    doIt: true,
    example: false,
    answers: [
      "Go to a market.",
      "Go to a market",
      "Visit a market.",
      "Visit a market",
      "Go to the market.",
      "Go to the market",
    ],
    label: "market",
  },
] as const;

/** Reflect */
export const reflect41 = [
  "I can describe people.",
  "I can prepare for a trip.",
  "I can give advice.",
  "I can tell the time.",
] as const;
