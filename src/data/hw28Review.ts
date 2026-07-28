import type { QuizTask } from "../types/trainer";

export type Hw28Flashcard = {
  id: string;
  front: string;
  back: string;
  deck: Hw28DeckId;
};

export type Hw28DeckId = "all" | "objects" | "office" | "demonstratives";

export type Hw28TestId = "all" | "vocab" | "listening" | "grammar";

export type Hw28TestTask = QuizTask & { block: Exclude<Hw28TestId, "all"> };

/** Flashcards — Lesson 28 Part 2 */
export const hw28Flashcards: Hw28Flashcard[] = [
  { id: "o1", front: "книга", back: "a book", deck: "objects" },
  { id: "o2", front: "телефон", back: "a phone", deck: "objects" },
  { id: "o3", front: "письмовий стіл", back: "a desk", deck: "objects" },
  { id: "o4", front: "ключ", back: "a key", deck: "objects" },
  { id: "o5", front: "стіл", back: "a table", deck: "objects" },
  { id: "o6", front: "годинник", back: "a clock", deck: "objects" },
  { id: "o7", front: "фото", back: "a photo", deck: "objects" },
  { id: "o8", front: "комп’ютер", back: "a computer", deck: "objects" },
  { id: "o9", front: "коробка", back: "a box", deck: "objects" },
  { id: "o10", front: "стілець", back: "a chair", deck: "objects" },
  { id: "o11", front: "чашка", back: "a cup", deck: "objects" },
  { id: "o12", front: "ручка", back: "a pen", deck: "objects" },

  { id: "of1", front: "вікно", back: "a window", deck: "office" },
  { id: "of2", front: "рослина", back: "a plant", deck: "office" },
  { id: "of3", front: "принтер", back: "a printer", deck: "office" },
  { id: "of4", front: "настінний годинник", back: "a wall clock", deck: "office" },
  { id: "of5", front: "календар", back: "a calendar", deck: "office" },
  { id: "of6", front: "карта", back: "a map", deck: "office" },
  { id: "of7", front: "монітор", back: "a monitor", deck: "office" },
  { id: "of8", front: "шухляди", back: "drawers", deck: "office" },
  { id: "of9", front: "лампа / світло", back: "a light", deck: "office" },
  { id: "of10", front: "лавка", back: "a bench", deck: "office" },

  {
    id: "d1",
    front: "близько + 1 предмет",
    back: "this",
    deck: "demonstratives",
  },
  {
    id: "d2",
    front: "далеко + 1 предмет",
    back: "that",
    deck: "demonstratives",
  },
  {
    id: "d3",
    front: "близько + багато предметів",
    back: "these",
    deck: "demonstratives",
  },
  {
    id: "d4",
    front: "далеко + багато предметів",
    back: "those",
    deck: "demonstratives",
  },
  {
    id: "d5",
    front: "What’s that?",
    back: "It’s a…",
    deck: "demonstratives",
  },
  {
    id: "d6",
    front: "What are those?",
    back: "They’re…",
    deck: "demonstratives",
  },
];

export const hw28DeckMeta: {
  id: Hw28DeckId;
  title: string;
  badge: string;
  desc: string;
}[] = [
  { id: "all", title: "Усі картки", badge: "All", desc: "Part 2 разом" },
  { id: "objects", title: "Objects", badge: "a–l", desc: "book · desk · key…" },
  { id: "office", title: "Office", badge: "extra", desc: "window · plant…" },
  {
    id: "demonstratives",
    title: "This/that",
    badge: "grammar",
    desc: "this · that · these · those",
  },
];

export function cardsForDeck(deck: Hw28DeckId): Hw28Flashcard[] {
  if (deck === "all") return hw28Flashcards;
  return hw28Flashcards.filter((c) => c.deck === deck);
}

export const hw28TestTasks: Hw28TestTask[] = [
  {
    block: "vocab",
    text: "книга →",
    options: ["a book", "a box", "a desk"],
    correct: "a book",
  },
  {
    block: "vocab",
    text: "телефон →",
    options: ["a clock", "a phone", "a pen"],
    correct: "a phone",
  },
  {
    block: "vocab",
    text: "письмовий стіл →",
    options: ["a table", "a desk", "a chair"],
    correct: "a desk",
  },
  {
    block: "vocab",
    text: "ключ →",
    options: ["a cup", "a key", "a box"],
    correct: "a key",
  },
  {
    block: "vocab",
    text: "стіл (не desk) →",
    options: ["a table", "a desk", "a chair"],
    correct: "a table",
  },
  {
    block: "vocab",
    text: "годинник →",
    options: ["a clock", "a cup", "a computer"],
    correct: "a clock",
  },
  {
    block: "vocab",
    text: "фото →",
    options: ["a phone", "a photo", "a printer"],
    correct: "a photo",
  },
  {
    block: "vocab",
    text: "комп’ютер →",
    options: ["a computer", "a cup", "a calendar"],
    correct: "a computer",
  },
  {
    block: "vocab",
    text: "коробка →",
    options: ["a book", "a box", "a bench"],
    correct: "a box",
  },
  {
    block: "vocab",
    text: "стілець →",
    options: ["a chair", "a clock", "a cup"],
    correct: "a chair",
  },
  {
    block: "vocab",
    text: "чашка →",
    options: ["a cup", "a key", "a pen"],
    correct: "a cup",
  },
  {
    block: "vocab",
    text: "ручка →",
    options: ["a phone", "a pen", "a plant"],
    correct: "a pen",
  },
  {
    block: "vocab",
    text: "Close-up: What’s number 1? (ручка)",
    options: ["It’s a pen.", "It’s a key.", "It’s a book."],
    correct: "It’s a pen.",
  },
  {
    block: "vocab",
    text: "Close-up: What’s number 2? (годинник)",
    options: ["It’s a clock.", "It’s a cup.", "It’s a chair."],
    correct: "It’s a clock.",
  },
  {
    block: "vocab",
    text: "What’s number…? → правильна відповідь:",
    options: ["It’s a clock.", "I am a clock.", "This clock."],
    correct: "It’s a clock.",
  },

  {
    block: "listening",
    text: "Max & Carla: This is your ___.",
    options: ["chair", "desk", "table"],
    correct: "desk",
  },
  {
    block: "listening",
    text: "Max & Carla: These are your ___ for the office.",
    options: ["books", "keys", "photos"],
    correct: "keys",
  },
  {
    block: "listening",
    text: "Max & Carla: This is your ___ and this is the password.",
    options: ["computer", "phone", "clock"],
    correct: "computer",
  },
  {
    block: "listening",
    text: "Max & Carla: And that is my ___.",
    options: ["chair", "desk", "phone"],
    correct: "desk",
  },
  {
    block: "listening",
    text: "Carla: Are those ___ of your family?",
    options: ["books", "keys", "photos"],
    correct: "photos",
  },
  {
    block: "listening",
    text: "Carla: Yes, where’s my ___?",
    options: ["box", "chair", "table"],
    correct: "chair",
  },
  {
    block: "listening",
    text: "Listening 5a: Which picture is correct?",
    options: ["Picture A", "Picture B", "Both"],
    correct: "Picture B",
  },
  {
    block: "listening",
    text: "Max: Oh. Sorry. It’s in the ___!",
    options: ["meeting room", "kitchen", "park"],
    correct: "meeting room",
  },

  {
    block: "grammar",
    text: "Близько + 1 ключ → ___ key",
    options: ["this", "that", "these", "those"],
    correct: "this",
  },
  {
    block: "grammar",
    text: "Далеко + 1 ключ → ___ key",
    options: ["this", "that", "these", "those"],
    correct: "that",
  },
  {
    block: "grammar",
    text: "Близько + багато ключів → ___ keys",
    options: ["this", "that", "these", "those"],
    correct: "these",
  },
  {
    block: "grammar",
    text: "Далеко + багато ключів → ___ keys",
    options: ["this", "that", "these", "those"],
    correct: "those",
  },
  {
    block: "grammar",
    text: "Is ___ your cup? (далеко від тебе)",
    options: ["this", "that", "these", "those"],
    correct: "that",
  },
  {
    block: "grammar",
    text: "Are ___ your books? (далеко, багато)",
    options: ["this", "that", "these", "those"],
    correct: "those",
  },
  {
    block: "grammar",
    text: "What’s in ___ box? (близько, 1)",
    options: ["this", "that", "these", "those"],
    correct: "this",
  },
  {
    block: "grammar",
    text: "___’s my new clock. (далеко, 1)",
    options: ["This", "That", "These", "Those"],
    correct: "That",
  },
  {
    block: "grammar",
    text: "Are ___ my pens? (далеко, багато)",
    options: ["this", "that", "these", "those"],
    correct: "those",
  },
  {
    block: "grammar",
    text: "No, ___ are Jack’s pens. (близько, багато)",
    options: ["this", "that", "these", "those"],
    correct: "these",
  },
  {
    block: "grammar",
    text: "A: What’s that?  B: ___",
    options: ["It’s a light.", "They’re lights.", "This is lights."],
    correct: "It’s a light.",
  },
  {
    block: "grammar",
    text: "A: What are those?  B: ___",
    options: ["It’s a plant.", "They’re plants.", "This is a plant."],
    correct: "They’re plants.",
  },
];

export const hw28TestMeta: {
  id: Hw28TestId;
  title: string;
  badge: string;
  desc: string;
  passScore: number;
}[] = [
  {
    id: "all",
    title: "Увесь тест",
    badge: "All",
    desc: "vocab · listening · grammar",
    passScore: 24,
  },
  {
    id: "vocab",
    title: "Vocabulary",
    badge: "1",
    desc: "objects · What’s number…?",
    passScore: 11,
  },
  {
    id: "listening",
    title: "Listening",
    badge: "2",
    desc: "Max & Carla · R6",
    passScore: 6,
  },
  {
    id: "grammar",
    title: "Grammar",
    badge: "3",
    desc: "this / that / these / those",
    passScore: 9,
  },
];

export function tasksForTest(id: Hw28TestId): Hw28TestTask[] {
  if (id === "all") return hw28TestTasks;
  return hw28TestTasks.filter((t) => t.block === id);
}
