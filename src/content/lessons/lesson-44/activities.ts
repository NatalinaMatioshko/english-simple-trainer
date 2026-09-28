/** Lesson 44 — Unit 5C Food and drink + Unit 5D English in action
 * Audio: public/sounds/Unit_5/RM_A1_SB_U5_R{10–16}.mp3
 * Images: public/images/lesson44/ (Wikimedia/Unsplash stand-ins + menu.png — see SOURCES.md).
 *   Not textbook page scans. Photo→word map follows SB numbers 1–14 visually.
 *
 * Evidence notes (do not invent beyond textbook pages + audio files on disk):
 * - Vocab list + photo numbers 1–14: from SB pages.
 * - Photo→word map: visual match to textbook photos (tea vs coffee: #1 milky mug = tea, #14 black coffee).
 * - Pronunciation pair 1 marked “different” in SB; pairs 2–7 = BrE vowel check (not in printed key).
 * - Blue letters follow SB screenshot (coffee ee/tea ea; sugar ar; chocolate a / cakes a).
 * - Frequency scale (lesson Ex.5): gaps never / sometimes / always; often & usually printed.
 *   HW44 asks students to write all five adverbs on the scale.
 * - Tom R12: full Basil+Tom audioscript; ticks include sugar + chicken (named in audio).
 * - R10 transcript: food words in photo order 1–14. R11 transcript: word pairs.
 * - p.154 survey table: NOT in materials → soft speaking only.
 * - Unit 5D: menu from SB page; Ela R14 = cheese sandwich + white bread + coffee + milk? + £4.75;
 *   phrase match 1a/2d/3c/4b/5e; R16 order g-c-e-f-i-b-d-h-a.
 */

export const SOUND_U5 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_5/RM_A1_SB_U5_R${r}.mp3`;

export const IMG44 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson44/${file}`;

export const VIDEO44 = (file: string) =>
  `${import.meta.env.BASE_URL}videos/lesson44/${file}`;

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

/** Foods named in R12 (order as on SB page columns) */
export const tomFoodTicks = [
  { id: "tea", label: "tea", correct: true },
  { id: "coffee", label: "coffee", correct: true },
  { id: "sandwiches", label: "sandwiches", correct: false },
  { id: "sugar", label: "sugar", correct: true },
  { id: "bread", label: "bread", correct: false },
  { id: "cakes", label: "cakes", correct: true },
  { id: "chocolate", label: "chocolate", correct: true },
  { id: "eggs", label: "eggs", correct: false },
  { id: "meat", label: "meat", correct: true },
  { id: "fish", label: "fish", correct: true },
  { id: "cheese", label: "cheese", correct: false },
  { id: "salad", label: "salad", correct: true },
  { id: "chicken", label: "chicken", correct: true },
  { id: "milk", label: "milk", correct: false },
] as const;

/**
 * Unit 5 Recording 12 — full audioscript (Basil + Tom).
 * Source: Roadmap A1 Students’ Book audio scripts.
 */
export const tomR12Transcript = [
  "B: Hello everyone, I'm Basil Bainbridge, and this is RadioTalk. OK, today we ask the question Are you healthy? Our first caller is Tom. Tom, are you there?",
  "T: Hi Basil, I'm here.",
  "B: So, Tom, I've got some questions for you about food and drink, OK?",
  "T: Sure, Basil.",
  "B: So, Tom, how often do you drink tea or coffee? Never, sometimes, often, usually or always?",
  "T: I never drink coffee, I don't like it, but I always drink tea in the morning. Hmm, so 'always'.",
  "B: OK. How often do you have sugar in your tea or coffee?",
  "T: I never have sugar in my tea. I drink green tea. It's not good with sugar.",
  "B: And … how often do you eat cakes?",
  "T: I often eat cakes. Chocolate cakes are sooooo good!",
  "B: Hmm I see. And do you often eat chocolate?",
  "T: I usually eat chocolate at work. Maybe three times a week? Maybe four …",
  "B: Last question. How often do you eat meat?",
  "T: Hmm. Well, Basil, I sometimes eat fish or salad, but I often eat meat. Meat is great. I love meat, especially chicken.",
  "B: Hmm, not good Tom. You often eat unhealthy food, Tom. OK, so the next caller is …",
] as const;

/** Ex.5 · sentences a–d from the radio programme (printed page; bold = gap answers) */
export const radioSentences5 = [
  {
    id: "a",
    text: "I never drink coffee, I don't like it, but I always drink tea in the morning.",
    bold: ["never", "always"],
  },
  {
    id: "b",
    text: "I often eat cakes. Chocolate cakes are so good!",
    bold: [],
  },
  {
    id: "c",
    text: "I usually eat chocolate at work. Maybe three times a week?",
    bold: [],
  },
  {
    id: "d",
    text: "Well, Basil, I sometimes eat fish or salad, but I often eat meat.",
    bold: ["sometimes"],
  },
] as const;

/** Tom’s key frequency lines (aligned with printed a–d + sugar from audio) */
export const tomModelLines = radioSentences5.map((s) => s.text);

/**
 * HW frequency scale — write all five adverbs (0% → 100%).
 * Lesson page Ex.5 keeps often/usually printed; HW asks for the full scale.
 */
export const frequencyScaleGaps = [
  { id: "1", percent: "0%", answer: "never" },
  { id: "2", percent: "50%", answer: "sometimes" },
  { id: "3", percent: "70%", answer: "often" },
  { id: "4", percent: "80%", answer: "usually" },
  { id: "5", percent: "100%", answer: "always" },
] as const;

export const frequencyAdverbs = [
  "never",
  "sometimes",
  "often",
  "usually",
  "always",
] as const;

/**
 * Ex.6 · grammar box examples (*word* = frequency adverb in bold).
 * Includes be + adverb (I'm sometimes…) for the “after be” rule.
 */
export const frequencyGrammarExamples = [
  { id: "e1", text: "I *always* drink tea in the morning." },
  { id: "e2", text: "I'm *sometimes* late home for dinner." },
  { id: "e3", text: "I *often* eat sandwiches for lunch." },
  { id: "e4", text: "I *usually* have lunch in a café." },
  { id: "e5", text: "I *never* drink coffee." },
] as const;

export const frequencyGrammarQuestions = [
  { id: "q1", text: "*How often* do you eat meat?" },
  { id: "q2", text: "*How often* are you late for work?" },
] as const;

/** Ex.6 · choose the correct alternatives (SB grammar box) */
export const frequencyGrammarChoices = [
  {
    id: "g1",
    before: "Frequency adverbs go",
    after: "most verbs (e.g. eat, have, drink).",
    options: ["before", "after"],
    answer: "before",
  },
  {
    id: "g2",
    before: "Frequency adverbs go",
    after: "the verb be (e.g. am, is, are).",
    options: ["before", "after"],
    answer: "after",
  },
  {
    id: "g3",
    before: "Ask questions about frequency with",
    after: ".",
    options: ["How often", "How many"],
    answer: "How often",
  },
] as const;

/** Ex.7a · sentences with blue frequency adverbs (tap stressed syllables) */
export const frequencyStressItems = [
  {
    id: "1",
    before: "I ",
    syllables: ["nev", "er"],
    stressed: [0],
    after: " drink tea.",
  },
  {
    id: "2",
    before: "I'm ",
    syllables: ["some", "times"],
    stressed: [0],
    after: " late home for dinner.",
  },
  {
    id: "3",
    before: "I ",
    syllables: ["of", "ten"],
    stressed: [0],
    after: " eat sandwiches for lunch.",
  },
  {
    id: "4",
    before: "I ",
    syllables: ["u", "su", "al", "ly"],
    stressed: [0],
    after: " have lunch in a café.",
  },
  {
    id: "5",
    before: "I ",
    syllables: ["al", "ways"],
    stressed: [0],
    after: " have milk and sugar in my coffee.",
  },
] as const;

/** Ex.7 model sentences (printed) — also R13 transcript */
export const frequencyStressLines = frequencyStressItems.map(
  (item) => `${item.before}${item.syllables.join("")}${item.after}`,
);

/** Ex.8a personal sentences — any frequency adverb is OK (true for you) */
export const personalFrequencyGaps = [
  { id: "1", before: "I", after: "eat meat." },
  { id: "2", before: "I", after: "have chocolate at work." },
  { id: "3", before: "I", after: "drink milk." },
  { id: "4", before: "I", after: "have sugar in my coffee or tea." },
  { id: "5", before: "I", after: "have cakes for breakfast." },
  { id: "6", before: "I", after: "have fish for dinner." },
  { id: "7", before: "I", after: "eat cheese and bread." },
  { id: "8", before: "I", after: "eat sandwiches for dinner." },
] as const;

/** @deprecated use personalFrequencyGaps */
export const personalFrequencyStems = personalFrequencyGaps.map(
  (g) => `${g.before} _____ ${g.after}`,
);

/* ═══════════════════════════════════════════════════════════════
 * Part 2 · Unit 5D English in action — order food and a drink
 * Audio: R14–R16. Menu: public/images/lesson44/menu.png (user asset).
 * Café photo: Unsplash stand-in (see SOURCES.md).
 * ═══════════════════════════════════════════════════════════════ */

/** Menu items visible on the illustrated café menu (Exercise 1) */
export const cafeMenuItems = [
  { id: "chicken-sandwich", label: "chicken sandwich", price: "£3.50", kind: "food" as const },
  { id: "egg-sandwich", label: "egg sandwich", price: "£3.25", kind: "food" as const },
  { id: "cheese-sandwich", label: "cheese sandwich", price: "£3.25", kind: "food" as const },
  { id: "fish", label: "fish", price: "£4.95", kind: "food" as const },
  { id: "cake", label: "cake", price: "£2.50", kind: "food" as const },
  { id: "chocolate-cake", label: "chocolate cake", price: "£2.50", kind: "food" as const },
  { id: "tea", label: "tea", price: "£1.50", kind: "drink" as const },
  { id: "coffee", label: "coffee", price: "£1.50", kind: "drink" as const },
  { id: "water", label: "water / a bottle of water", price: "£1.50", kind: "drink" as const },
] as const;

/** 2 · Tick Ela’s food and drink (R14) — cheese sandwich + coffee */
export const elaFoodTicks = cafeMenuItems.map((item) => ({
  id: item.id,
  label: `${item.label} (${item.price})`,
  correct: item.id === "cheese-sandwich" || item.id === "coffee",
}));

/**
 * Unit 5 Recording 14 — Ela in the café.
 * Source: Roadmap A1 Students’ Book audio scripts (+ SB gap dialogue).
 */
export const elaR14Transcript = [
  "W: What would you like?",
  "E: A cheese sandwich, please.",
  "W: Would you like white bread or brown bread?",
  "E: White bread, please.",
  "W: Here you are. Would you like a drink?",
  "E: Yes. I’d like a cup of coffee, please.",
  "W: Would you like milk?",
  "E: No, thank you. How much is that?",
  "W: That’s £4.75, please.",
  "E: Thank you.",
  "W: You’re welcome.",
] as const;

/** 3 · Complete the conversation (SB gaps 1–6) */
export const elaDialogueGaps = [
  {
    id: "1",
    before: "Ela: A",
    after: "sandwich, please.",
    correctAnswers: ["cheese"],
  },
  {
    id: "2",
    before: "Café worker: Would you like white bread or brown",
    after: "?",
    correctAnswers: ["bread"],
  },
  {
    id: "3",
    before: "Ela:",
    after: "bread, please.",
    correctAnswers: ["White", "white"],
  },
  {
    id: "4",
    before: "Ela: Yes. I’d like a cup of",
    after: ", please.",
    correctAnswers: ["coffee"],
  },
  {
    id: "5",
    before: "Café worker: Would you like",
    after: "?",
    correctAnswers: ["milk"],
  },
  {
    id: "6",
    before: "Café worker: That’s",
    after: ", please.",
    correctAnswers: ["£4.75", "4.75"],
  },
] as const;

/** 4a · Useful phrases — café worker (1–5) */
export const cafeWorkerPhrases = [
  { id: "1", prompt: "What would you like?", answer: "a" },
  {
    id: "2",
    prompt: "Would you like (black coffee) or (white coffee)?",
    answer: "d",
  },
  { id: "3", prompt: "Would you like (a drink)?", answer: "c" },
  { id: "4", prompt: "Would you like (sugar)?", answer: "b" },
  { id: "5", prompt: "That’s (£5.50), please.", answer: "e" },
] as const;

/** 4a · Useful phrases — customer (a–e) */
export const cafeCustomerPhrases = [
  { id: "a", label: "I’d like (a chicken sandwich), please." },
  { id: "b", label: "No, thank you." },
  { id: "c", label: "Yes, please. I’d like (a bottle of water)." },
  { id: "d", label: "(Black), please." },
  { id: "e", label: "How much is that?" },
] as const;

/**
 * Unit 5 Recording 15 — useful phrases check (model answers only).
 * Full paired lines for listen-and-repeat transcript.
 */
export const usefulPhrasesR15Transcript = [
  "1. W: What would you like? C: I’d like a chicken sandwich, please.",
  "2. W: Would you like black coffee or white coffee? C: Black, please.",
  "3. W: Would you like a drink? C: Yes, please. I’d like a bottle of water.",
  "4. W: Would you like sugar? C: No, thank you.",
  "5. C: How much is that? W: That’s £5.50, please.",
] as const;

/**
 * 5a · Put the conversation in the correct order (R16).
 * Printed order key: g → c → e → f → i → b → d → h → a
 */
export const cafeConversationOrder = [
  {
    id: "g",
    text: "Café worker: What would you like?",
    order: 1,
  },
  {
    id: "c",
    text: "Customer: I’d like a chocolate cake, please.",
    order: 2,
  },
  {
    id: "e",
    text: "Café worker: OK, great. And would you like a drink?",
    order: 3,
  },
  {
    id: "f",
    text: "Customer: Yes, please. I’d like a cup of black coffee.",
    order: 4,
  },
  {
    id: "i",
    text: "Café worker: OK. Here’s your cake and your coffee.",
    order: 5,
  },
  {
    id: "b",
    text: "Customer: Thank you. How much is that?",
    order: 6,
  },
  {
    id: "d",
    text: "Café worker: That’s £4.00, please.",
    order: 7,
  },
  {
    id: "h",
    text: "Customer: Here you are.",
    order: 8,
  },
  {
    id: "a",
    text: "Café worker: Thank you.",
    order: 9,
  },
] as const;

/** R16 transcript in correct order */
export const cafeR16Transcript = cafeConversationOrder
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((line) => line.text);

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
