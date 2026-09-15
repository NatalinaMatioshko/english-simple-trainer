import type { QuizTask } from "../types/trainer";

export type Hw40Flashcard = {
  id: string;
  front: string;
  back: string;
  deck: Hw40DeckId;
};

export type Hw40DeckId = "all" | "verbs" | "phrases" | "advice";

export type Hw40TestId = "all" | "vocab" | "grammar" | "london";

export type Hw40TestTask = QuizTask & { block: Exclude<Hw40TestId, "all"> };

/** Flashcards — Lesson 40 · Unit 4C */
export const hw40Flashcards: Hw40Flashcard[] = [
  { id: "v1", front: "спробувати", back: "try", deck: "verbs" },
  { id: "v2", front: "йти / їхати до (місця)", back: "go to", deck: "verbs" },
  { id: "v3", front: "відвідати", back: "visit", deck: "verbs" },
  { id: "v4", front: "брати (таксі, фото, пальто…)", back: "take", deck: "verbs" },
  { id: "v5", front: "пити", back: "drink", deck: "verbs" },
  { id: "v6", front: "дивитися (фільм, шоу)", back: "see", deck: "verbs" },

  { id: "p1", front: "пити чай", back: "drink tea", deck: "phrases" },
  { id: "p2", front: "пити каву", back: "drink coffee", deck: "phrases" },
  { id: "p3", front: "дивитися шоу", back: "see a show", deck: "phrases" },
  { id: "p4", front: "дивитися фільм", back: "see a film", deck: "phrases" },
  { id: "p5", front: "відвідати Нью-Йорк", back: "visit New York", deck: "phrases" },
  { id: "p6", front: "спробувати японську їжу", back: "try Japanese food", deck: "phrases" },
  { id: "p7", front: "спробувати італійську їжу", back: "try Italian food", deck: "phrases" },
  { id: "p8", front: "їхати потягом", back: "take a train", deck: "phrases" },
  { id: "p9", front: "робити фото", back: "take photos", deck: "phrases" },
  { id: "p10", front: "взяти пальто", back: "take a coat", deck: "phrases" },

  {
    id: "a1",
    front: "порада: Не ходь на Oxford Street",
    back: "Don't go to Oxford Street.",
    deck: "advice",
  },
  {
    id: "a2",
    front: "порада: Відвідай Британський музей",
    back: "Visit The British Museum.",
    deck: "advice",
  },
  {
    id: "a3",
    front: "порада: Не користуйся таксі",
    back: "Don't take taxis!",
    deck: "advice",
  },
  {
    id: "a4",
    front: "порада: Спробуй індійську їжу",
    back: "Try Indian food.",
    deck: "advice",
  },
  {
    id: "a5",
    front: "порада: Пий англійський чай",
    back: "Drink English tea.",
    deck: "advice",
  },
  {
    id: "a6",
    front: "порада: Подивись шоу",
    back: "See a show.",
    deck: "advice",
  },
  {
    id: "a7",
    front: "порада: Візьми пальто",
    back: "Take a coat!",
    deck: "advice",
  },
  {
    id: "a8",
    front: "порада (Рим): Не беріть камеру",
    back: "Don't take a camera.",
    deck: "advice",
  },
];

export const hw40DeckMeta: {
  id: Hw40DeckId;
  title: string;
  badge: string;
  desc: string;
}[] = [
  { id: "all", title: "Усі картки", badge: "All", desc: "verbs · phrases · advice" },
  { id: "verbs", title: "Verbs", badge: "6", desc: "try · go to · visit · take · drink · see" },
  { id: "phrases", title: "Phrases", badge: "10", desc: "drink tea · see a show…" },
  { id: "advice", title: "Advice", badge: "London", desc: "Visit… / Don't go…" },
];

export function cardsForDeck(deck: Hw40DeckId): Hw40Flashcard[] {
  if (deck === "all") return hw40Flashcards;
  return hw40Flashcards.filter((c) => c.deck === deck);
}

export const hw40TestTasks: Hw40TestTask[] = [
  {
    block: "vocab",
    text: "пити чай →",
    options: ["drink tea", "take tea", "try tea"],
    correct: "drink tea",
  },
  {
    block: "vocab",
    text: "дивитися шоу →",
    options: ["see a show", "visit a show", "take a show"],
    correct: "see a show",
  },
  {
    block: "vocab",
    text: "робити фото →",
    options: ["take photos", "drink photos", "go photos"],
    correct: "take photos",
  },
  {
    block: "vocab",
    text: "відвідати музей →",
    options: ["visit the museum", "drink the museum", "take the museum"],
    correct: "visit the museum",
  },
  {
    block: "vocab",
    text: "спробувати італійську їжу →",
    options: ["try Italian food", "drink Italian food", "see Italian food"],
    correct: "try Italian food",
  },
  {
    block: "vocab",
    text: "їхати потягом →",
    options: ["take a train", "visit a train", "try a train"],
    correct: "take a train",
  },

  {
    block: "grammar",
    text: "___ The British Museum. (порада)",
    options: ["Visit", "Visits", "Visiting"],
    correct: "Visit",
  },
  {
    block: "grammar",
    text: "___ go to Oxford Street.",
    options: ["Don't", "Doesn't", "Not"],
    correct: "Don't",
  },
  {
    block: "grammar",
    text: "___ a show, Lydia!",
    options: ["See", "Sees", "Seeing"],
    correct: "See",
  },
  {
    block: "grammar",
    text: "___ Indian food. It's really good.",
    options: ["Try", "Tries", "Trying"],
    correct: "Try",
  },
  {
    block: "grammar",
    text: "___ English tea.",
    options: ["Drink", "Drinks", "Drinking"],
    correct: "Drink",
  },
  {
    block: "grammar",
    text: "___ take taxis! They're expensive.",
    options: ["Don't", "Doesn't", "Not"],
    correct: "Don't",
  },

  {
    block: "london",
    text: "Good advice for London?",
    options: ["Visit The British Museum.", "Go to Oxford Street.", "Take taxis."],
    correct: "Visit The British Museum.",
  },
  {
    block: "london",
    text: "Ben says:",
    options: [
      "Don't go to Oxford Street.",
      "Visit Oxford Street.",
      "Take Oxford Street.",
    ],
    correct: "Don't go to Oxford Street.",
  },
  {
    block: "london",
    text: "Vitor says:",
    options: ["Don't take taxis!", "Take taxis!", "Visit taxis!"],
    correct: "Don't take taxis!",
  },
  {
    block: "london",
    text: "Juana says:",
    options: ["Try Indian food.", "Don't try Indian food.", "Take Indian food."],
    correct: "Try Indian food.",
  },
  {
    block: "london",
    text: "Toni says:",
    options: ["Take a coat!", "Don't take a coat!", "Visit a coat!"],
    correct: "Take a coat!",
  },
  {
    block: "london",
    text: "Trip to Rome — good idea?",
    options: ["Drink coffee.", "Don't take a coat.", "Don't visit Rome."],
    correct: "Drink coffee.",
  },
];

export const hw40TestMeta: {
  id: Hw40TestId;
  title: string;
  badge: string;
  desc: string;
  passScore: number;
}[] = [
  {
    id: "all",
    title: "Увесь тест",
    badge: "All",
    desc: "vocab · grammar · London",
    passScore: 14,
  },
  {
    id: "vocab",
    title: "Vocabulary",
    badge: "1",
    desc: "try · visit · take · drink · see",
    passScore: 5,
  },
  {
    id: "grammar",
    title: "Grammar",
    badge: "2",
    desc: "Visit… / Don't…",
    passScore: 5,
  },
  {
    id: "london",
    title: "London & Rome",
    badge: "3",
    desc: "dos and don'ts",
    passScore: 5,
  },
];

export function tasksForTest(id: Hw40TestId): Hw40TestTask[] {
  if (id === "all") return hw40TestTasks;
  return hw40TestTasks.filter((t) => t.block === id);
}

/** Word order — imperatives (anagram). */
export const hw40WordOrder = [
  {
    scramble: "The British Museum / Visit / .",
    parts: ["Visit", "The British Museum", "."] as const,
    answer: "Visit The British Museum.",
  },
  {
    scramble: "Oxford Street / to / go / Don't / .",
    parts: ["Don't", "go", "to", "Oxford Street", "."] as const,
    answer: "Don't go to Oxford Street.",
  },
  {
    scramble: "Indian food / Try / .",
    parts: ["Try", "Indian food", "."] as const,
    answer: "Try Indian food.",
  },
  {
    scramble: "English tea / Drink / .",
    parts: ["Drink", "English tea", "."] as const,
    answer: "Drink English tea.",
  },
  {
    scramble: "a show / See / .",
    parts: ["See", "a show", "."] as const,
    answer: "See a show.",
  },
  {
    scramble: "a coat / Take / !",
    parts: ["Take", "a coat", "!"] as const,
    answer: "Take a coat!",
  },
  {
    scramble: "taxis / take / Don't / !",
    parts: ["Don't", "take", "taxis", "!"] as const,
    answer: "Don't take taxis!",
  },
  {
    scramble: "a camera / take / Don't / .",
    parts: ["Don't", "take", "a camera", "."] as const,
    answer: "Don't take a camera.",
  },
] as const;

/** Articles check — a / an / the / — (no article). */
export const hw40ArticleOptions = ["a", "an", "the", "—"] as const;

export const hw40ArticleGaps = [
  {
    id: "a1",
    before: "Take",
    after: "coat!",
    answer: "a",
    tipUa: "одне пальто, будь-яке → a coat",
  },
  {
    id: "a2",
    before: "See",
    after: "show in London.",
    answer: "a",
    tipUa: "одне шоу (не конкретне) → a show",
  },
  {
    id: "a3",
    before: "Don't take",
    after: "camera.",
    answer: "a",
    tipUa: "одна камера → a camera",
  },
  {
    id: "a4",
    before: "Visit",
    after: "British Museum.",
    answer: "the",
    tipUa: "унікальна назва / відомий музей → the British Museum",
  },
  {
    id: "a5",
    before: "Go to",
    after: "London Eye.",
    answer: "the",
    tipUa: "відома пам’ятка → the London Eye",
  },
  {
    id: "a6",
    before: "She's",
    after: "colorist.",
    answer: "a",
    tipUa: "професія в однині → a colorist",
  },
  {
    id: "a7",
    before: "He was",
    after: "shop assistant.",
    answer: "a",
    tipUa: "професія → a shop assistant",
  },
  {
    id: "a8",
    before: "I live in",
    after: "small town.",
    answer: "a",
    tipUa: "одне маленьке місто → a small town",
  },
  {
    id: "a9",
    before: "Hanna's got",
    after: "short blonde hair.",
    answer: "—",
    tipUa: "hair як маса — без артикля: short blonde hair",
  },
  {
    id: "a10",
    before: "Don't take",
    after: "taxis!",
    answer: "—",
    tipUa: "множина загалом → без артикля: taxis",
  },
  {
    id: "a11",
    before: "Try",
    after: "Indian food.",
    answer: "—",
    tipUa: "їжа / кухня загалом → без артикля: Indian food",
  },
  {
    id: "a12",
    before: "I'm from",
    after: "UK.",
    answer: "the",
    tipUa: "the UK · the US (з the)",
  },
] as const;

/** Choose the correct sentence (articles). */
export const hw40ArticleChoose = [
  {
    id: "c1",
    prompt: "Правильна порада:",
    options: ["Take a coat!", "Take the coat!", "Take coat!"] as const,
    answer: "Take a coat!",
  },
  {
    id: "c2",
    prompt: "Правильна порада:",
    options: [
      "Visit the British Museum.",
      "Visit a British Museum.",
      "Visit British Museum.",
    ] as const,
    answer: "Visit the British Museum.",
  },
  {
    id: "c3",
    prompt: "Правильна порада:",
    options: [
      "Don't take taxis!",
      "Don't take a taxis!",
      "Don't take the taxis!",
    ] as const,
    answer: "Don't take taxis!",
  },
  {
    id: "c4",
    prompt: "Опис людини:",
    options: [
      "She's got short blonde hair.",
      "She's got a short blonde hair.",
      "She's got the short blonde hair.",
    ] as const,
    answer: "She's got short blonde hair.",
  },
  {
    id: "c5",
    prompt: "Професія:",
    options: [
      "She is a colorist.",
      "She is colorist.",
      "She is the colorist.",
    ] as const,
    answer: "She is a colorist.",
  },
  {
    id: "c6",
    prompt: "Країна:",
    options: [
      "I'm from the UK.",
      "I'm from a UK.",
      "I'm from UK.",
    ] as const,
    answer: "I'm from the UK.",
  },
] as const;

export const hw40WritingPrompts = [
  "Go to …",
  "Visit …",
  "Try …",
  "Drink …",
  "See …",
  "Take …",
  "Don't go to …",
  "Don't take …",
] as const;
