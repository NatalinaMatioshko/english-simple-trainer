/** Lesson 44 — Unit 5C Food and drink
 * Audio: public/sounds/Unit_5/RM_A1_SB_U5_R{10–13}.mp3
 * Images: public/images/lesson44/ (Wikimedia Commons stand-ins — see SOURCES.md).
 *   Not textbook page scans. Photo→word map follows SB numbers 1–14 visually.
 *
 * Evidence notes (do not invent beyond textbook pages + audio files on disk):
 * - Vocab list + photo numbers 1–14: from SB pages.
 * - Photo→word map: visual match to textbook photos (tea vs coffee: #1 milky mug = tea, #14 black coffee).
 * - Pronunciation pair 1 marked “different” in SB; pairs 2–7 = BrE vowel check (not in printed key).
 * - Blue letters follow SB screenshot (coffee ee/tea ea; sugar ar; chocolate a / cakes a).
 * - Frequency scale gaps 1–3 = never / sometimes / always; “often” & “usually” printed on page.
 * - Tom listening ticks: foods named in visible transcript snippets only (not full R12 transcript).
 * - R10 transcript: food words in photo order 1–14. R11 transcript: word pairs.
 * - p.154 survey table: NOT in materials → soft speaking only.
 */

export const SOUND_U5 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_5/RM_A1_SB_U5_R${r}.mp3`;

export const IMG44 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson44/${file}`;

export const foodWords = [
  "bread",
  "cakes",
  "cheese",
  "chicken",
  "chocolate",
  "coffee",
  "eggs",
  "fish",
  "meat",
  "milk",
  "salad",
  "sandwiches",
  "sugar",
  "tea",
] as const;

/** 1a · photo id → word (visual evidence from textbook photos) */
export const foodPhotoMatch = [
  {
    id: "1",
    file: "tea.jpg",
    alt: "Teapot and cup of tea",
    answer: "tea",
  },
  {
    id: "2",
    file: "milk.jpg",
    alt: "Carton and glass of milk",
    answer: "milk",
  },
  {
    id: "3",
    file: "cakes.jpg",
    alt: "Red velvet cupcake with white frosting",
    answer: "cakes",
  },
  {
    id: "4",
    file: "sugar.jpg",
    alt: "Sugar cubes",
    answer: "sugar",
  },
  {
    id: "5",
    file: "sandwiches.jpg",
    alt: "Grilled sandwiches on a plate",
    answer: "sandwiches",
  },
  {
    id: "6",
    file: "salad.jpg",
    alt: "Fresh salad with tomatoes and croutons",
    answer: "salad",
  },
  {
    id: "7",
    file: "fish.jpg",
    alt: "Two whole fish on a plate",
    answer: "fish",
  },
  {
    id: "8",
    file: "bread.jpg",
    alt: "Artisan loaves of bread",
    answer: "bread",
  },
  {
    id: "9",
    file: "eggs.jpg",
    alt: "Bowl of brown eggs",
    answer: "eggs",
  },
  {
    id: "10",
    file: "cheese.jpg",
    alt: "Wedge of Swiss cheese with holes",
    answer: "cheese",
  },
  {
    id: "11",
    file: "meat.jpg",
    alt: "Sliced cooked meat",
    answer: "meat",
  },
  {
    id: "12",
    file: "chicken.jpg",
    alt: "Whole roast chicken in a skillet",
    answer: "chicken",
  },
  {
    id: "13",
    file: "chocolate.jpg",
    alt: "Stacked pieces of chocolate",
    answer: "chocolate",
  },
  {
    id: "14",
    file: "coffee.jpg",
    alt: "Cups of coffee with latte art",
    answer: "coffee",
  },
] as const;

/** 2 · vowel same/different (5.11). Blue letters from SB screenshot.
 * Pair 1 answer printed (different); pairs 2–7 = BrE check (not in printed key).
 */
export const foodSoundPairs = [
  {
    id: "1",
    a: "meat",
    b: "bread",
    blueA: "ea",
    blueB: "ea",
    answer: "different" as const,
  },
  {
    id: "2",
    a: "salad",
    b: "sandwiches",
    blueA: "a",
    blueB: "a",
    answer: "same" as const,
  },
  {
    id: "3",
    a: "coffee",
    b: "tea",
    blueA: "ee",
    blueB: "ea",
    answer: "different" as const,
  },
  {
    id: "4",
    a: "coffee",
    b: "chocolate",
    blueA: "o",
    blueB: "o",
    answer: "same" as const,
  },
  {
    id: "5",
    a: "milk",
    b: "fish",
    blueA: "i",
    blueB: "i",
    answer: "same" as const,
  },
  {
    id: "6",
    a: "salad",
    b: "sugar",
    blueA: "a",
    blueB: "ar",
    answer: "different" as const,
  },
  {
    id: "7",
    a: "chocolate",
    b: "cakes",
    blueA: "a",
    blueB: "a",
    answer: "different" as const,
  },
] as const;

/** 1b · 5.10 listen and repeat — words in photo order 1–14 */
export const foodListenRepeatLines = foodPhotoMatch.map((p) => p.answer);

/** 2 · 5.11 transcript lines (word pairs) */
export const foodSoundTranscriptLines = foodSoundPairs.map(
  (p) => `${p.id}. ${p.a} / ${p.b}`,
);

/** Foods named in visible Tom transcript snippets (ex.4) */
export const tomFoodTicks = [
  { id: "coffee", label: "coffee", correct: true },
  { id: "tea", label: "tea", correct: true },
  { id: "cakes", label: "cakes", correct: true },
  { id: "chocolate", label: "chocolate", correct: true },
  { id: "fish", label: "fish", correct: true },
  { id: "salad", label: "salad", correct: true },
  { id: "meat", label: "meat", correct: true },
  { id: "milk", label: "milk", correct: false },
  { id: "sugar", label: "sugar", correct: false },
  { id: "bread", label: "bread", correct: false },
  { id: "eggs", label: "eggs", correct: false },
  { id: "cheese", label: "cheese", correct: false },
  { id: "chicken", label: "chicken", correct: false },
  { id: "sandwiches", label: "sandwiches", correct: false },
] as const;

/** Visible listening model lines from the page (not a full R12 transcript) */
export const tomModelLines = [
  "I never drink coffee, I don't like it, but I always drink tea in the morning.",
  "I often eat cakes. Chocolate cakes are so good!",
  "I usually eat chocolate at work. Maybe three times a week?",
  "Well, Basil, I sometimes eat fish or salad, but I often eat meat.",
] as const;

/**
 * Ex.5 frequency scale gaps (printed page shows often + usually already filled).
 * Order on scale: never (0%) → sometimes → often → usually → always (100%).
 */
export const frequencyScaleGaps = [
  { id: "1", percent: "0%", answer: "never" },
  { id: "2", percent: "", answer: "sometimes" },
  { id: "3", percent: "100%", answer: "always" },
] as const;

export const frequencyAdverbs = [
  "never",
  "sometimes",
  "often",
  "usually",
  "always",
] as const;

/** Ex.7 model sentences (printed) */
export const frequencyStressLines = [
  "I never drink tea.",
  "I'm sometimes late home for dinner.",
  "I often eat sandwiches for lunch.",
  "I usually have lunch in a café.",
  "I always have milk and sugar in my coffee.",
] as const;

/** Ex.8a personal sentences (any frequency adverb is acceptable — no single key) */
export const personalFrequencyStems = [
  "I _____ eat meat.",
  "I _____ have chocolate at work.",
  "I _____ drink milk.",
  "I _____ have sugar in my coffee or tea.",
  "I _____ have cakes for breakfast.",
  "I _____ have fish for dinner.",
  "I _____ eat cheese and bread.",
  "I _____ eat sandwiches for dinner.",
] as const;

/** Ex.9a word order — answers from printed example + clear word order */
export const howOftenWordOrder = [
  {
    id: "q1",
    scramble: "have / How often / breakfast / at work / do / you?",
    parts: ["How often", "do", "you", "have", "breakfast", "at work?"],
    answer: "How often do you have breakfast at work?",
  },
  {
    id: "q2",
    scramble: "eggs / for breakfast / How often / you / do / have?",
    parts: ["How often", "do", "you", "have", "eggs", "for breakfast?"],
    answer: "How often do you have eggs for breakfast?",
  },
  {
    id: "q3",
    scramble: "How often / you / do / buy / for lunch / sandwiches?",
    parts: ["How often", "do", "you", "buy", "sandwiches", "for lunch?"],
    answer: "How often do you buy sandwiches for lunch?",
  },
  {
    id: "q4",
    scramble: "coffee / drink / How often / do / or tea / you?",
    parts: ["How often", "do", "you", "drink", "coffee", "or tea?"],
    answer: "How often do you drink coffee or tea?",
  },
  {
    id: "q5",
    scramble: "have / dinner / at home / you / How often / do?",
    parts: ["How often", "do", "you", "have", "dinner", "at home?"],
    answer: "How often do you have dinner at home?",
  },
  {
    id: "q6",
    scramble: "How often / sweet food / do / eat / you?",
    parts: ["How often", "do", "you", "eat", "sweet food?"],
    answer: "How often do you eat sweet food?",
  },
] as const;
