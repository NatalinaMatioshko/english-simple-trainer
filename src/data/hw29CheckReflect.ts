/** Check & Reflect — Unit 2 review (family → shop / numbers) */

export const cr1FamilyBank = [
  "brother",
  "daughter",
  "father",
  "husband",
  "parents",
  "sister",
  "son",
  "wife",
] as const;

export const cr1Family = [
  {
    prompt: "Catherine is Michael's wife. Michael is Catherine's",
    answer: "husband",
    example: true,
  },
  {
    prompt: "Jim is Hayley's husband. Hayley is Jim's",
    answer: "wife",
  },
  {
    prompt: "Hector is Joe's father. Joe is Hector's",
    answer: "son",
  },
  {
    prompt: "Jill is Jane's mother. Jane is Jill's",
    answer: "daughter",
  },
  {
    prompt: "Sally is David's sister. David is Sally's",
    answer: "brother",
  },
  {
    prompt:
      "Sam and Ellie are Martin and Kate's children. Martin and Kate are Sam and Ellie's",
    answer: "parents",
  },
  {
    prompt: "Andrew is Beth's brother. Beth is Andrew's",
    answer: "sister",
  },
  {
    prompt: "Pedro is Paulo's son. Paulo is Pedro's",
    answer: "father",
  },
] as const;

export const cr2Possessive = [
  { from: "the sister of Peter", answer: "Peter's sister", example: true },
  { from: "the family of Julie", answer: "Julie's family" },
  { from: "the parents of Martin", answer: "Martin's parents" },
  { from: "the dog of my friend", answer: "my friend's dog" },
  { from: "the pen of my teacher", answer: "my teacher's pen" },
  { from: "the book of my brother", answer: "my brother's book" },
] as const;

export type CrChoicePart = { choices: string[]; answer: string };
export type CrChoiceLine = (string | CrChoicePart)[];

export const cr3PossessiveAdj: CrChoiceLine[] = [
  [
    "We're in Room 211 today. ",
    { choices: ["Our", "Their"], answer: "Our" },
    " teacher is Joanna.",
  ],
  [
    "This is a photo of my sister. ",
    { choices: ["His", "Her"], answer: "Her" },
    " name is Amanda.",
  ],
  [
    "This is my brother with ",
    { choices: ["his", "her"], answer: "his" },
    " girlfriend, Lucy.",
  ],
  [
    "Misha and Roxana aren't here today. They're with ",
    { choices: ["their", "its"], answer: "their" },
    " mum in London.",
  ],
  [
    "Your dog is nice. What's ",
    { choices: ["our", "its"], answer: "its" },
    " name?",
  ],
  [
    "This is a photo of ",
    { choices: ["my", "their"], answer: "my" },
    " father. ",
    { choices: ["His", "Its"], answer: "His" },
    " name is Andrea and he's a doctor.",
  ],
];

export const cr4Mistakes = [
  {
    wrong: "Is this a photo of you're mum?",
    correct: "Is this a photo of your mum?",
  },
  {
    wrong: "They're sisters. They're names are Lulu and Beth.",
    correct: "They're sisters. Their names are Lulu and Beth.",
  },
  {
    wrong: "Is your fathers name Eric?",
    correct: "Is your father's name Eric?",
  },
  {
    wrong: "Your from Spain. Your friend is from Mexico.",
    correct: "You're from Spain. Your friend is from Mexico.",
  },
] as const;

export const cr5Scramble = [
  { letters: "blate", hint: "t", answer: "table", example: true },
  { letters: "haric", hint: "c", answer: "chair" },
  { letters: "nophe", hint: "p", answer: "phone" },
  { letters: "enp", hint: "p", answer: "pen" },
  { letters: "sked", hint: "d", answer: "desk" },
  { letters: "petrumoc", hint: "c", answer: "computer" },
  { letters: "yek", hint: "k", answer: "key" },
  { letters: "hotop", hint: "p", answer: "photo" },
  { letters: "puc", hint: "c", answer: "cup" },
  { letters: "kobo", hint: "b", answer: "book" },
  { letters: "oxb", hint: "b", answer: "box" },
  { letters: "lkocc", hint: "c", answer: "clock" },
] as const;

export const cr6Demonstratives: CrChoiceLine[] = [
  [
    "Is ",
    { choices: ["this", "that"], answer: "this" },
    " our classroom here?",
  ],
  [
    { choices: ["That's", "Those are"], answer: "That's" },
    " my husband. His name's Hugo.",
  ],
  [
    "Are ",
    { choices: ["this", "these"], answer: "these" },
    " your pens on my table?",
  ],
  [
    "Are ",
    { choices: ["that", "those"], answer: "those" },
    " your keys on the teacher's desk?",
  ],
];

export const cr7aNumbers = [
  { expr: "5 × 5 =", answer: "twenty-five", example: true },
  { expr: "6 + 7 =", answer: "thirteen" },
  { expr: "3 × 10 =", answer: "thirty" },
  { expr: "42 + 14 =", answer: "fifty-six" },
  { expr: "10 + 3 + 2 =", answer: "fifteen" },
  { expr: "2 × 25 =", answer: "fifty" },
  { expr: "25 + 17 =", answer: "forty-two" },
  { expr: "8 × 7 =", answer: "fifty-six" },
  { expr: "17 + 12 =", answer: "twenty-nine" },
  { expr: "9 × 9 =", answer: "eighty-one" },
  { expr: "15 + 15 + 6 =", answer: "thirty-six" },
  { expr: "9 × 7 =", answer: "sixty-three" },
] as const;

export const cr7bAges = [
  {
    first: "My son's 10.",
    secondStart: "He's",
    answer: "ten years old",
    example: true,
  },
  {
    first: "My mother's 58.",
    secondStart: "She's",
    answer: "fifty-eight years old",
  },
  {
    first: "My sister's 19.",
    secondStart: "She's",
    answer: "nineteen years old",
  },
  {
    first: "My mum's brother is 33.",
    secondStart: "He's",
    answer: "thirty-three years old",
  },
] as const;

export const cr8aQuestions = [
  {
    words: "father's / is / What / your / job?",
    answer: "What is your father's job?",
  },
  {
    words: "is / from / Where / teacher / your?",
    answer: "Where is your teacher from?",
  },
  {
    words: "old / phone / How / is / your?",
    answer: "How old is your phone?",
  },
  {
    words: "old / How / your / parents / are?",
    answer: "How old are your parents?",
  },
  {
    words: "Maradona / are / Messi / Where / from / and?",
    answer: "Where are Messi and Maradona from?",
  },
] as const;

export const crReflectItems = [
  "I can talk about my family.",
  "I can talk about everyday objects.",
  "I can ask questions about other people.",
  "I can pay for things in a shop.",
] as const;

/** Flat index map for choice-line exercises */
export function buildChoiceFlatIndices(items: CrChoiceLine[]): number[][] {
  const result: number[][] = [];
  let fi = 0;
  items.forEach((parts) => {
    const row: number[] = [];
    parts.forEach((p) => {
      if (typeof p !== "string") row.push(fi++);
    });
    result.push(row);
  });
  return result;
}

export const cr3FlatIndices = buildChoiceFlatIndices(cr3PossessiveAdj);
export const cr6FlatIndices = buildChoiceFlatIndices(cr6Demonstratives);

export function countChoiceSlots(items: CrChoiceLine[]): number {
  return items.reduce(
    (n, parts) => n + parts.filter((p) => typeof p !== "string").length,
    0,
  );
}

export function normalizeCrAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['’‘`]/g, "'")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\.$/, "");
}
