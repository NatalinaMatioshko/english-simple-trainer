import type { QuizTask } from "../types/trainer";

export type Hw29TestId = "all" | "numbers" | "listening" | "grammar" | "qw";

export type Hw29TestTask = QuizTask & { block: Exclude<Hw29TestId, "all"> };

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

  /* ── Question words table (WHO…WHOM) ───────────────────── */
  {
    block: "qw",
    text: "Used to ask about a person. →",
    options: ["WHO", "WHAT", "WHERE", "WHOM"],
    correct: "WHO",
  },
  {
    block: "qw",
    text: "Used to ask for information. →",
    options: ["WHAT", "WHEN", "WHICH", "WHO"],
    correct: "WHAT",
  },
  {
    block: "qw",
    text: "Used to ask about a place. →",
    options: ["WHERE", "WHEN", "WHY", "WHOSE"],
    correct: "WHERE",
  },
  {
    block: "qw",
    text: "Used to ask about time. →",
    options: ["WHEN", "WHERE", "HOW", "WHAT"],
    correct: "WHEN",
  },
  {
    block: "qw",
    text: "Used to ask for a reason. →",
    options: ["WHY", "HOW", "WHICH", "WHO"],
    correct: "WHY",
  },
  {
    block: "qw",
    text: "Used to explain a process / manner. →",
    options: ["HOW", "WHY", "WHICH", "WHEN"],
    correct: "HOW",
  },
  {
    block: "qw",
    text: "Used to ask about choices. →",
    options: ["WHICH", "WHAT", "WHOSE", "WHO"],
    correct: "WHICH",
  },
  {
    block: "qw",
    text: "Used to ask about possession. →",
    options: ["WHOSE", "WHO", "WHOM", "WHICH"],
    correct: "WHOSE",
  },
  {
    block: "qw",
    text: "Asking about the object of a verb. →",
    options: ["WHOM", "WHO", "WHOSE", "WHAT"],
    correct: "WHOM",
  },
  {
    block: "qw",
    text: "___ is coming to the party?",
    options: ["Who", "What", "Where", "Whose"],
    correct: "Who",
  },
  {
    block: "qw",
    text: "___ do you want to eat?",
    options: ["What", "Which", "Who", "Why"],
    correct: "What",
  },
  {
    block: "qw",
    text: "___ do you live?",
    options: ["Where", "When", "Who", "How"],
    correct: "Where",
  },
  {
    block: "qw",
    text: "___ does the movie start?",
    options: ["When", "Where", "Why", "Which"],
    correct: "When",
  },
  {
    block: "qw",
    text: "___ are you laughing?",
    options: ["Why", "How", "Who", "What"],
    correct: "Why",
  },
  {
    block: "qw",
    text: "___ can I get to the station?",
    options: ["How", "Where", "Why", "Which"],
    correct: "How",
  },
  {
    block: "qw",
    text: "___ dress should I wear?",
    options: ["Which", "What", "Whose", "Who"],
    correct: "Which",
  },
  {
    block: "qw",
    text: "___ car is parked outside?",
    options: ["Whose", "Who", "Whom", "Which"],
    correct: "Whose",
  },
  {
    block: "qw",
    text: "___ should I call for help?",
    options: ["Whom", "Whose", "Which", "Where"],
    correct: "Whom",
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
    desc: "numbers · listening · grammar · WH words",
    passScore: 40,
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
  {
    id: "qw",
    title: "WH words",
    badge: "4",
    desc: "Who / What / Where / When / Why…",
    passScore: 14,
  },
];

export function tasksForTest(id: Hw29TestId): Hw29TestTask[] {
  if (id === "all") return hw29TestTasks;
  return hw29TestTasks.filter((t) => t.block === id);
}
