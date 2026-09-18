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

/** 5a · Write the questions (words given as a hint) */
export const wordOrder41 = [
  {
    scramble: "you / got / a / Have / phone?",
    answer: "Have you got a phone?",
  },
  {
    scramble: "Has / your / green / teacher / eyes / got?",
    answer: "Has your teacher got green eyes?",
  },
  {
    scramble: "Have / blonde / your / hair / parents / got?",
    answer: "Have your parents got blonde hair?",
  },
  {
    scramble: "you / food / your / bag / in / Have / got?",
    answer: "Have you got food in your bag?",
  },
  {
    scramble: "camera / good / your / phone / Has / a / got?",
    answer: "Has your phone got a good camera?",
  },
  {
    scramble: "bottle / of / Have / a / got / water / you?",
    answer: "Have you got a bottle of water?",
  },
  {
    scramble: "How / credit cards / you / many / got / have?",
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

/**
 * 8 · Grammar review — UA → EN translate
 * (Present Simple · Present Continuous · articles)
 */
export type Hw41WriteTopic = "ps" | "pc" | "articles";

export const writeGrammar41: {
  id: number;
  topic: Hw41WriteTopic;
  ua: string;
  answers: readonly string[];
}[] = [
  {
    id: 1,
    topic: "ps",
    ua: "Я працюю щодня.",
    answers: ["I work every day.", "I work every day"],
  },
  {
    id: 2,
    topic: "ps",
    ua: "Вона зазвичай їсть сніданок.",
    answers: [
      "She usually eats breakfast.",
      "She usually eats breakfast",
      "She eats breakfast usually.",
      "She eats breakfast usually",
    ],
  },
  {
    id: 3,
    topic: "ps",
    ua: "Вони не п'ють каву щоранку.",
    answers: [
      "They don't drink coffee every morning.",
      "They don't drink coffee every morning",
      "They do not drink coffee every morning.",
      "They do not drink coffee every morning",
    ],
  },
  {
    id: 4,
    topic: "ps",
    ua: "Він живе в Лондоні?",
    answers: ["Does he live in London?", "Does he live in London"],
  },
  {
    id: 5,
    topic: "pc",
    ua: "Я зараз працюю.",
    answers: [
      "I am working now.",
      "I am working now",
      "I'm working now.",
      "I'm working now",
    ],
  },
  {
    id: 6,
    topic: "pc",
    ua: "Вона зараз їсть.",
    answers: [
      "She is eating now.",
      "She is eating now",
      "She's eating now.",
      "She's eating now",
      "She is eating at the moment.",
      "She is eating at the moment",
      "She's eating at the moment.",
      "She's eating at the moment",
    ],
  },
  {
    id: 7,
    topic: "pc",
    ua: "Вони зараз не розмовляють.",
    answers: [
      "They aren't talking now.",
      "They aren't talking now",
      "They are not talking now.",
      "They are not talking now",
      "They're not talking now.",
      "They're not talking now",
    ],
  },
  {
    id: 8,
    topic: "pc",
    ua: "Ти зараз читаєш?",
    answers: [
      "Are you reading now?",
      "Are you reading now",
      "Are you reading?",
      "Are you reading",
    ],
  },
  {
    id: 9,
    topic: "articles",
    ua: "Відвідай Британський музей.",
    answers: [
      "Visit the British Museum.",
      "Visit the British Museum",
      "Visit The British Museum.",
      "Visit The British Museum",
    ],
  },
  {
    id: 10,
    topic: "articles",
    ua: "Візьми пальто.",
    answers: ["Take a coat.", "Take a coat", "Take a coat!"],
  },
  {
    id: 11,
    topic: "articles",
    ua: "Не бери таксі.",
    answers: [
      "Don't take taxis.",
      "Don't take taxis",
      "Don't take taxis!",
      "Don't take a taxi.",
      "Don't take a taxi",
      "Don't take a taxi!",
      "Do not take taxis.",
      "Do not take taxis",
      "Do not take a taxi.",
      "Do not take a taxi",
    ],
  },
  {
    id: 12,
    topic: "articles",
    ua: "Спробуй індійську їжу.",
    answers: ["Try Indian food.", "Try Indian food"],
  },
  {
    id: 13,
    topic: "articles",
    ua: "У неї світле волосся.",
    answers: [
      "She has got blonde hair.",
      "She has got blonde hair",
      "She's got blonde hair.",
      "She's got blonde hair",
      "She has blonde hair.",
      "She has blonde hair",
      "She's got fair hair.",
      "She's got fair hair",
      "She has got fair hair.",
      "She has got fair hair",
    ],
  },
  {
    id: 14,
    topic: "articles",
    ua: "Поїдь до Великобританії.",
    answers: [
      "Go to the UK.",
      "Go to the UK",
      "Go to the U.K.",
      "Go to the U.K",
      "Go to the United Kingdom.",
      "Go to the United Kingdom",
    ],
  },
];

export const writeGrammarTopicLabel: Record<Hw41WriteTopic, string> = {
  ps: "Present Simple",
  pc: "Present Continuous",
  articles: "Articles (a / an / the / —)",
};
