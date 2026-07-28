import type { QuizTask } from "../types/trainer";

export type Hw27Flashcard = {
  id: string;
  front: string;
  back: string;
  deck: Hw27DeckId;
};

/** Logical flashcard decks (plus "all") */
export type Hw27DeckId =
  | "all"
  | "countries"
  | "from-be"
  | "jobs"
  | "be-jobs"
  | "family"
  | "possessives";

export type Hw27TestId =
  | "all"
  | "countries"
  | "jobs-be"
  | "family"
  | "possessives";

export type Hw27TestTask = QuizTask & { block: Exclude<Hw27TestId, "all"> };

/** Flashcards for Lessons 25–27 review */
export const hw27Flashcards: Hw27Flashcard[] = [
  /* Countries & nationalities */
  { id: "c1", front: "Іспанія", back: "Spain", deck: "countries" },
  { id: "c1b", front: "іспанець / іспанка", back: "Spanish", deck: "countries" },
  { id: "c2", front: "Велика Британія", back: "the UK", deck: "countries" },
  {
    id: "c2b",
    front: "англієць / англійка",
    back: "English / British",
    deck: "countries",
  },
  { id: "c3", front: "США", back: "the US", deck: "countries" },
  { id: "c3b", front: "американець / американка", back: "American", deck: "countries" },
  { id: "c4", front: "Польща", back: "Poland", deck: "countries" },
  { id: "c4b", front: "поляк / полька", back: "Polish", deck: "countries" },
  { id: "c5", front: "Україна", back: "Ukraine", deck: "countries" },
  {
    id: "c5b",
    front: "українець / українка",
    back: "Ukrainian",
    deck: "countries",
  },
  { id: "c6", front: "Аргентина", back: "Argentina", deck: "countries" },
  {
    id: "c6b",
    front: "аргентинець / аргентинка",
    back: "Argentinian",
    deck: "countries",
  },

  /* From + be (L25) */
  {
    id: "fb1",
    front: "Я з Іспанії.",
    back: "I'm from Spain.",
    deck: "from-be",
  },
  {
    id: "fb2",
    front: "Вона з the UK.",
    back: "She's from the UK.",
    deck: "from-be",
  },
  {
    id: "fb3",
    front: "Ми з України.",
    back: "We're from Ukraine. / We are from Ukraine.",
    deck: "from-be",
  },
  {
    id: "fb4",
    front: "Вони з Польщі.",
    back: "They're from Poland.",
    deck: "from-be",
  },
  {
    id: "fb5",
    front: "the UK / the US — артикль?",
    back: "the UK · the US (з the)",
    deck: "from-be",
  },
  {
    id: "fb6",
    front: "Spain / Ukraine — артикль?",
    back: "без the (Spain, Ukraine…)",
    deck: "from-be",
  },

  /* Jobs vocab (L26) */
  { id: "j1", front: "лікар", back: "doctor", deck: "jobs" },
  { id: "j2", front: "медсестра / медбрат", back: "nurse", deck: "jobs" },
  { id: "j3", front: "шкільний вчитель", back: "school teacher", deck: "jobs" },
  { id: "j4", front: "офісний працівник", back: "office worker", deck: "jobs" },
  { id: "j5", front: "таксист", back: "taxi driver", deck: "jobs" },
  { id: "j6", front: "футболіст", back: "football player", deck: "jobs" },
  { id: "j7", front: "пілот", back: "pilot", deck: "jobs" },
  { id: "j8", front: "фермер", back: "farmer", deck: "jobs" },
  { id: "j9", front: "студент", back: "student", deck: "jobs" },

  /* be + jobs + place (L26) */
  {
    id: "bj1",
    front: "Він лікар.",
    back: "He's a doctor.",
    deck: "be-jobs",
  },
  {
    id: "bj2",
    front: "Вона медсестра?",
    back: "Is she a nurse?",
    deck: "be-jobs",
  },
  {
    id: "bj3",
    front: "a чи an? office worker",
    back: "an office worker",
    deck: "be-jobs",
  },
  {
    id: "bj4",
    front: "працювати в лікарні",
    back: "work in a hospital",
    deck: "be-jobs",
  },
  {
    id: "bj5",
    front: "працювати в школі",
    back: "work at a school",
    deck: "be-jobs",
  },
  {
    id: "bj6",
    front: "Ні, він не лікар.",
    back: "No, he isn't. / He isn't a doctor.",
    deck: "be-jobs",
  },

  /* Family members (L27) — separate words */
  { id: "f1", front: "мати / мама", back: "mother / mum", deck: "family" },
  { id: "f2", front: "батько / тато", back: "father / dad", deck: "family" },
  { id: "f3", front: "батьки", back: "parents", deck: "family" },
  { id: "f4", front: "брат", back: "brother", deck: "family" },
  { id: "f5", front: "сестра", back: "sister", deck: "family" },
  { id: "f6", front: "чоловік (у шлюбі)", back: "husband", deck: "family" },
  { id: "f7", front: "дружина", back: "wife", deck: "family" },
  { id: "f8", front: "син", back: "son", deck: "family" },
  { id: "f9", front: "дочка", back: "daughter", deck: "family" },
  { id: "f10", front: "діти", back: "children", deck: "family" },

  /* Possessives (L27) */
  { id: "p1", front: "I → ___", back: "my", deck: "possessives" },
  { id: "p2", front: "you → ___", back: "your", deck: "possessives" },
  { id: "p3", front: "he → ___", back: "his", deck: "possessives" },
  { id: "p4", front: "she → ___", back: "her", deck: "possessives" },
  { id: "p5", front: "they → ___", back: "their", deck: "possessives" },
  {
    id: "p6",
    front: "чоловік Крістіни",
    back: "Cristina's husband",
    deck: "possessives",
  },
  {
    id: "p7",
    front: "ім'я батька",
    back: "father's name / my father's name",
    deck: "possessives",
  },
  {
    id: "p8",
    front: "They're ≠ Their",
    back: "They're = They are · Their = possessive",
    deck: "possessives",
  },
  {
    id: "p9",
    front: "He's ≠ His",
    back: "He's = He is · His = possessive",
    deck: "possessives",
  },
];

export const hw27DeckMeta: {
  id: Hw27DeckId;
  title: string;
  badge: string;
  desc: string;
}[] = [
  {
    id: "all",
    title: "Усі картки",
    badge: "All",
    desc: "L25–27 разом",
  },
  {
    id: "countries",
    title: "Countries",
    badge: "L25",
    desc: "країни · національності",
  },
  {
    id: "from-be",
    title: "From · be",
    badge: "L25",
    desc: "I'm from… · the UK",
  },
  {
    id: "jobs",
    title: "Jobs",
    badge: "L26",
    desc: "професії",
  },
  {
    id: "be-jobs",
    title: "be + jobs",
    badge: "L26",
    desc: "He's a… · in/at",
  },
  {
    id: "family",
    title: "Family",
    badge: "L27",
    desc: "члени сім'ї",
  },
  {
    id: "possessives",
    title: "Possessives",
    badge: "L27",
    desc: "my/his/her · 's",
  },
];

export function cardsForDeck(deck: Hw27DeckId): Hw27Flashcard[] {
  if (deck === "all") return hw27Flashcards;
  return hw27Flashcards.filter((c) => c.deck === deck);
}

/** Test tasks tagged by topic block */
export const hw27TestTasks: Hw27TestTask[] = [
  /* Countries · articles · nationalities */
  {
    block: "countries",
    text: "She's from ___ Spain.",
    options: ["a", "the", "(no article)"],
    correct: "(no article)",
  },
  {
    block: "countries",
    text: "I'm from ___ UK.",
    options: ["a", "an", "the"],
    correct: "the",
  },
  {
    block: "countries",
    text: "He's from ___ US.",
    options: ["a", "an", "the"],
    correct: "the",
  },
  {
    block: "countries",
    text: "Tom is ___. (the UK)",
    options: ["England", "English", "the England"],
    correct: "English",
  },
  {
    block: "countries",
    text: "Anna is ___. (Spain)",
    options: ["Spain", "Spanish", "Spaniard"],
    correct: "Spanish",
  },
  {
    block: "countries",
    text: "We ___ from Ukraine.",
    options: ["am", "is", "are"],
    correct: "are",
  },

  /* Jobs · be · place · a/an */
  {
    block: "jobs-be",
    text: "She ___ a doctor.",
    options: ["am", "is", "are"],
    correct: "is",
  },
  {
    block: "jobs-be",
    text: "He's ___ office worker.",
    options: ["a", "an", "the"],
    correct: "an",
  },
  {
    block: "jobs-be",
    text: "___ she a nurse?",
    options: ["Am", "Is", "Are"],
    correct: "Is",
  },
  {
    block: "jobs-be",
    text: "No, he ___. He's a pilot.",
    options: ["isn't", "aren't", "am not"],
    correct: "isn't",
  },
  {
    block: "jobs-be",
    text: "She works ___ a hospital.",
    options: ["in", "at", "on"],
    correct: "in",
  },
  {
    block: "jobs-be",
    text: "He works ___ a school.",
    options: ["in", "at", "on"],
    correct: "at",
  },
  {
    block: "jobs-be",
    text: "I ___ a student.",
    options: ["am", "is", "are"],
    correct: "am",
  },

  /* Family words · relationships */
  {
    block: "family",
    text: "Rafael is Cristina's ___.",
    options: ["wife", "husband", "brother"],
    correct: "husband",
  },
  {
    block: "family",
    text: "Alonzo is Sierra's ___.",
    options: ["sister", "brother", "mother"],
    correct: "brother",
  },
  {
    block: "family",
    text: "Umberto and Maria are Cristina's ___.",
    options: ["children", "parents", "friends"],
    correct: "parents",
  },
  {
    block: "family",
    text: "Rosalyn and Esteban are José and Luisa's ___.",
    options: ["parents", "children", "brothers"],
    correct: "children",
  },
  {
    block: "family",
    text: "Cristina is Umberto's ___.",
    options: ["son", "daughter", "wife"],
    correct: "daughter",
  },

  /* Possessives · my/his/her/their · 's · sound pairs */
  {
    block: "possessives",
    text: "___ name is Rafael.",
    options: ["He", "His", "Him"],
    correct: "His",
  },
  {
    block: "possessives",
    text: "This is my sister. ___ name is Sierra.",
    options: ["She", "Her", "Hers"],
    correct: "Her",
  },
  {
    block: "possessives",
    text: "___ children are students.",
    options: ["They", "Them", "Their"],
    correct: "Their",
  },
  {
    block: "possessives",
    text: "My ___ name is Emir.",
    options: ["father", "father's", "fathers"],
    correct: "father's",
  },
  {
    block: "possessives",
    text: "___ from Turkey. (He is)",
    options: ["He's", "His", "He"],
    correct: "He's",
  },
  {
    block: "possessives",
    text: "___ mother is English. (possessive)",
    options: ["They're", "Their", "There"],
    correct: "Their",
  },
  {
    block: "possessives",
    text: "This is a photo of ___ family.",
    options: ["my", "I", "me"],
    correct: "my",
  },
];

export const hw27TestMeta: {
  id: Hw27TestId;
  title: string;
  badge: string;
  desc: string;
  passScore: number;
}[] = [
  {
    id: "all",
    title: "Увесь тест",
    badge: "All",
    desc: "L25–27 разом",
    passScore: 16,
  },
  {
    id: "countries",
    title: "Countries",
    badge: "L25",
    desc: "from · the UK · nationalities",
    passScore: 4,
  },
  {
    id: "jobs-be",
    title: "Jobs · be",
    badge: "L26",
    desc: "am/is/are · a/an · in/at",
    passScore: 5,
  },
  {
    id: "family",
    title: "Family",
    badge: "L27",
    desc: "mother · husband · children…",
    passScore: 4,
  },
  {
    id: "possessives",
    title: "Possessives",
    badge: "L27",
    desc: "my/his/her/their · 's",
    passScore: 5,
  },
];

export function tasksForTest(id: Hw27TestId): Hw27TestTask[] {
  if (id === "all") return hw27TestTasks;
  return hw27TestTasks.filter((t) => t.block === id);
}
