import type { QuizTask } from "../types/trainer";

export type Hw29Flashcard = {
  id: string;
  front: string;
  back: string;
  deck: Hw29DeckId;
};

export type Hw29DeckId = "all" | "numbers" | "teens" | "questions";

export type Hw29TestId = "all" | "numbers" | "listening" | "grammar";

export type Hw29TestTask = QuizTask & { block: Exclude<Hw29TestId, "all"> };

/** Flashcards — Lesson 29 Part 2 */
export const hw29Flashcards: Hw29Flashcard[] = [
  { id: "n1", front: "1", back: "one", deck: "numbers" },
  { id: "n2", front: "2", back: "two", deck: "numbers" },
  { id: "n3", front: "3", back: "three", deck: "numbers" },
  { id: "n4", front: "4", back: "four", deck: "numbers" },
  { id: "n5", front: "5", back: "five", deck: "numbers" },
  { id: "n6", front: "6", back: "six", deck: "numbers" },
  { id: "n7", front: "7", back: "seven", deck: "numbers" },
  { id: "n8", front: "8", back: "eight", deck: "numbers" },
  { id: "n9", front: "9", back: "nine", deck: "numbers" },
  { id: "n10", front: "10", back: "ten", deck: "numbers" },
  { id: "n20", front: "20", back: "twenty", deck: "numbers" },
  { id: "n30", front: "30", back: "thirty", deck: "numbers" },
  { id: "n40", front: "40", back: "forty", deck: "numbers" },
  { id: "n50", front: "50", back: "fifty", deck: "numbers" },
  { id: "n60", front: "60", back: "sixty", deck: "numbers" },
  { id: "n70", front: "70", back: "seventy", deck: "numbers" },
  { id: "n80", front: "80", back: "eighty", deck: "numbers" },
  { id: "n90", front: "90", back: "ninety", deck: "numbers" },
  { id: "n100", front: "100", back: "one hundred / a hundred", deck: "numbers" },

  { id: "t11", front: "11", back: "eleven", deck: "teens" },
  { id: "t12", front: "12", back: "twelve", deck: "teens" },
  { id: "t13", front: "13", back: "thirteen", deck: "teens" },
  { id: "t14", front: "14", back: "fourteen", deck: "teens" },
  { id: "t15", front: "15", back: "fifteen", deck: "teens" },
  { id: "t16", front: "16", back: "sixteen", deck: "teens" },
  { id: "t17", front: "17", back: "seventeen", deck: "teens" },
  { id: "t18", front: "18", back: "eighteen", deck: "teens" },
  { id: "t19", front: "19", back: "nineteen", deck: "teens" },
  {
    id: "t13vs30",
    front: "thirteen vs thirty",
    back: "13 = thirTEEN · 30 = THIRty",
    deck: "teens",
  },
  {
    id: "t15vs50",
    front: "fifteen vs fifty",
    back: "15 = fifTEEN · 50 = FIFty",
    deck: "teens",
  },

  {
    id: "q1",
    front: "Як звати? (її)",
    back: "What’s her name?",
    deck: "questions",
  },
  {
    id: "q2",
    front: "Скільки йому років?",
    back: "How old is he?",
    deck: "questions",
  },
  {
    id: "q3",
    front: "Звідки вона?",
    back: "Where’s she from? / Where is she from?",
    deck: "questions",
  },
  {
    id: "q4",
    front: "Яка в нього робота?",
    back: "What’s his job? / What is his job?",
    deck: "questions",
  },
  {
    id: "q5",
    front: "Хто ти?",
    back: "Who are you?",
    deck: "questions",
  },
  {
    id: "q6",
    front: "Коли урок?",
    back: "When is your class?",
    deck: "questions",
  },
  {
    id: "q7",
    front: "Question word + be: порядок",
    back: "Question word → be → subject (Where is she from?)",
    deck: "questions",
  },
  {
    id: "q8",
    front: "He’s from Thailand. → питання",
    back: "Where is he from? / Where’s he from?",
    deck: "questions",
  },
];

export const hw29DeckMeta: {
  id: Hw29DeckId;
  title: string;
  badge: string;
  desc: string;
}[] = [
  { id: "all", title: "Усі картки", badge: "All", desc: "Part 2 разом" },
  {
    id: "numbers",
    title: "Numbers",
    badge: "1–100",
    desc: "one · twenty · a hundred",
  },
  {
    id: "teens",
    title: "Teens",
    badge: "11–19",
    desc: "thirteen vs thirty…",
  },
  {
    id: "questions",
    title: "Questions",
    badge: "be",
    desc: "Who / How / What / Where",
  },
];

export function cardsForDeck(deck: Hw29DeckId): Hw29Flashcard[] {
  if (deck === "all") return hw29Flashcards;
  return hw29Flashcards.filter((c) => c.deck === deck);
}

export const hw29TestTasks: Hw29TestTask[] = [
  {
    block: "numbers",
    text: "3 →",
    options: ["three", "tree", "thirty"],
    correct: "three",
  },
  {
    block: "numbers",
    text: "8 →",
    options: ["ate", "eight", "eighty"],
    correct: "eight",
  },
  {
    block: "numbers",
    text: "12 →",
    options: ["twenty", "twelve", "two"],
    correct: "twelve",
  },
  {
    block: "numbers",
    text: "15 →",
    options: ["fifty", "fifteen", "five"],
    correct: "fifteen",
  },
  {
    block: "numbers",
    text: "40 →",
    options: ["fourteen", "forty", "four"],
    correct: "forty",
  },
  {
    block: "numbers",
    text: "70 →",
    options: ["seventeen", "seventy", "seven"],
    correct: "seventy",
  },
  {
    block: "numbers",
    text: "100 →",
    options: ["one hundred", "ten", "ninety"],
    correct: "one hundred",
  },
  {
    block: "numbers",
    text: "twenty-one, twenty-two, twenty-three, … → наступне?",
    options: ["twenty-four", "thirty-one", "twenty"],
    correct: "twenty-four",
  },
  {
    block: "numbers",
    text: "eleven, twelve, thirteen, … → наступне?",
    options: ["fourteen", "thirty", "twenty"],
    correct: "fourteen",
  },
  {
    block: "numbers",
    text: "Яке написання правильне?",
    options: ["fourty", "forty", "fortie"],
    correct: "forty",
  },
  {
    block: "numbers",
    text: "ninety = ?",
    options: ["19", "90", "9"],
    correct: "90",
  },
  {
    block: "numbers",
    text: "sixteen = ?",
    options: ["16", "60", "6"],
    correct: "16",
  },

  {
    block: "listening",
    text: "Teen vs -ty: чуєш наголос на кінці (thirTEEN) →",
    options: ["13", "30"],
    correct: "13",
  },
  {
    block: "listening",
    text: "Teen vs -ty: чуєш короткий звук (THIRty) →",
    options: ["13", "30"],
    correct: "30",
  },
  {
    block: "listening",
    text: "R11 style: 14 чи 40? Якщо teen →",
    options: ["14", "40"],
    correct: "14",
  },
  {
    block: "listening",
    text: "R11 style: 15 чи 50? Якщо -ty →",
    options: ["15", "50"],
    correct: "50",
  },
  {
    block: "listening",
    text: "Anna Chubb: How old is she?",
    options: ["19", "99", "90"],
    correct: "99",
  },
  {
    block: "listening",
    text: "Anna Chubb: Where is she from?",
    options: ["Canada", "Japan", "the UK"],
    correct: "Canada",
  },
  {
    block: "listening",
    text: "Anna Chubb: What’s her job?",
    options: ["a taxi driver", "a teacher", "a football player"],
    correct: "a teacher",
  },
  {
    block: "listening",
    text: "Bill Gooch: How old is he?",
    options: ["58", "85", "51"],
    correct: "85",
  },
  {
    block: "listening",
    text: "Bill Gooch: What’s his job?",
    options: ["a taxi driver", "a teacher", "a doctor"],
    correct: "a taxi driver",
  },
  {
    block: "listening",
    text: "Satoru Goto: Where is he from?",
    options: ["Canada", "Japan", "Thailand"],
    correct: "Japan",
  },
  {
    block: "listening",
    text: "Satoru Goto: What’s his job?",
    options: ["a football player", "a student", "a farmer"],
    correct: "a football player",
  },

  {
    block: "grammar",
    text: "Question words (Who, How, What…) стоять ___ дієслова be.",
    options: ["before", "after"],
    correct: "before",
  },
  {
    block: "grammar",
    text: "Дієслово be стоїть ___ підмета (she, they…).",
    options: ["before", "after"],
    correct: "before",
  },
  {
    block: "grammar",
    text: "___ old is he?",
    options: ["How", "What", "Where", "Who"],
    correct: "How",
  },
  {
    block: "grammar",
    text: "___ is her name?",
    options: ["What", "Where", "When", "Who"],
    correct: "What",
  },
  {
    block: "grammar",
    text: "___ are they from?",
    options: ["Where", "What", "How", "When"],
    correct: "Where",
  },
  {
    block: "grammar",
    text: "___ are you?",
    options: ["Who", "What", "When", "Where"],
    correct: "Who",
  },
  {
    block: "grammar",
    text: "He’s from Thailand. → правильне питання:",
    options: [
      "Where is he from?",
      "What is he from?",
      "How old is Thailand?",
    ],
    correct: "Where is he from?",
  },
  {
    block: "grammar",
    text: "He’s a doctor. → правильне питання:",
    options: ["What is his job?", "Where is his job?", "Who is a doctor?"],
    correct: "What is his job?",
  },
  {
    block: "grammar",
    text: "Her name is Lidia. → правильне питання:",
    options: [
      "What is her name?",
      "Where is her name?",
      "How old is her name?",
    ],
    correct: "What is her name?",
  },
  {
    block: "grammar",
    text: "They’re from the US. → правильне питання:",
    options: [
      "Where are they from?",
      "Where is they from?",
      "What are they from?",
    ],
    correct: "Where are they from?",
  },
  {
    block: "grammar",
    text: "Скорочення: What is →",
    options: ["What’s", "Whats", "What’re"],
    correct: "What’s",
  },
  {
    block: "grammar",
    text: "A: How old is she?  B: ___",
    options: ["She’s 99.", "She’s Canada.", "She’s a teacher."],
    correct: "She’s 99.",
  },
];

export const hw29TestMeta: {
  id: Hw29TestId;
  title: string;
  badge: string;
  desc: string;
  passScore: number;
}[] = [
  {
    id: "all",
    title: "Увесь тест",
    badge: "All",
    desc: "numbers · listening · grammar",
    passScore: 26,
  },
  {
    id: "numbers",
    title: "Numbers",
    badge: "1",
    desc: "1–100 · forty · sequence",
    passScore: 9,
  },
  {
    id: "listening",
    title: "Listening",
    badge: "2",
    desc: "teen/ty · Anna · Bill · Satoru",
    passScore: 8,
  },
  {
    id: "grammar",
    title: "Grammar",
    badge: "3",
    desc: "question words with be",
    passScore: 9,
  },
];

export function tasksForTest(id: Hw29TestId): Hw29TestTask[] {
  if (id === "all") return hw29TestTasks;
  return hw29TestTasks.filter((t) => t.block === id);
}
