/**
 * Lesson 39 — Unit 4B Have you got it?
 * Audio: public/sounds/Unit_4/RM_A1_SB_U4_R{n}.mp3
 * R3 — travel objects vocab (SB 4.3)
 * R4 — Sam & Zara · ready for a trip (SB 4.4)
 * R5 — Have / Has in questions vs short answers (SB 4.5)
 *
 * Photos stay in public/images/lesson38/.
 */

export const travelObjects = [
  { id: "1", word: "tickets", file: "tickets.jpg", emoji: "🎫" },
  { id: "2", word: "passport", file: "passport.jpg", emoji: "🛂" },
  { id: "3", word: "credit card", file: "credit-card.jpg", emoji: "💳" },
  { id: "4", word: "coat", file: "coat.jpg", emoji: "🧥" },
  { id: "5", word: "food", file: "food.jpg", emoji: "🥗" },
  { id: "6", word: "bottle of water", file: "water.jpg", emoji: "💧" },
  { id: "7", word: "camera", file: "camera.jpg", emoji: "📷" },
  { id: "8", word: "sunglasses", file: "sunglasses.jpg", emoji: "🕶️" },
  { id: "9", word: "phone", file: "phone.jpg", emoji: "📱" },
  { id: "10", word: "money", file: "money.jpg", emoji: "💷" },
  { id: "11", word: "bag", file: "bag.jpg", emoji: "👜" },
  { id: "12", word: "keys", file: "keys.jpg", emoji: "🔑" },
] as const;

export const tripScenes = [
  {
    id: "A",
    file: "beach.jpg",
    emoji: "🏖️",
    caption: "Photo A",
    answer: "a holiday in a hot country",
  },
  {
    id: "B",
    file: "snow.jpg",
    emoji: "❄️",
    caption: "Photo B",
    answer: "a holiday in a cold country",
  },
  {
    id: "C",
    file: "office.jpg",
    emoji: "🖥️",
    caption: "Photo C",
    answer: "a day in the office",
  },
  {
    id: "D",
    file: "walk.jpg",
    emoji: "🌲",
    caption: "Photo D",
    answer: "a long walk",
  },
] as const;

export const tripLabels = [
  "a day in the office",
  "a holiday in a cold country",
  "a long walk",
  "a holiday in a hot country",
] as const;

export const packSuggest: Record<string, readonly string[]> = {
  "a holiday in a hot country": [
    "sunglasses",
    "bottle of water",
    "passport",
    "tickets",
    "phone",
    "money",
    "bag",
  ],
  "a holiday in a cold country": [
    "coat",
    "passport",
    "tickets",
    "phone",
    "money",
    "bag",
    "food",
  ],
  "a day in the office": ["phone", "keys", "bag", "food", "bottle of water"],
  "a long walk": [
    "bottle of water",
    "phone",
    "keys",
    "food",
    "coat",
    "bag",
  ],
};

export const samWhere = {
  options: [
    "to the office",
    "on a long walk",
    "on holiday in a hot country",
    "on holiday in a cold country",
  ] as const,
  answer: "on holiday in a hot country",
};

export const samHasGot = [
  { id: "passport", label: "passport", answer: true },
  { id: "money", label: "money", answer: true },
  { id: "camera", label: "camera", answer: false },
  { id: "phone", label: "phone", answer: true },
  { id: "tickets", label: "tickets", answer: false },
] as const;

export const questionGrammar = [
  {
    id: "q1",
    prompt: "_____ I / we / you / they got a ticket?",
    options: ["Have", "Has", "Haven't"] as const,
    answer: "Have",
  },
  {
    id: "q2",
    prompt: "Yes, I / we / you / they _____.",
    options: ["have", "has", "hasn't"] as const,
    answer: "have",
  },
  {
    id: "q3",
    prompt: "_____ he / she / it got a phone?",
    options: ["Have", "Has", "Haven't"] as const,
    answer: "Has",
  },
  {
    id: "q4",
    prompt: "Yes, he / she / it _____.",
    options: ["have", "has", "haven't"] as const,
    answer: "has",
  },
  {
    id: "q5",
    prompt: "No, he / she / it _____.",
    options: ["haven't", "hasn't", "have"] as const,
    answer: "hasn't",
  },
] as const;

export const makeQuestions = [
  {
    scramble: "you / food / in your bag",
    parts: ["Have", "you", "got", "food", "in", "your", "bag?"],
    answer: "Have you got food in your bag?",
  },
  {
    scramble: "sister / a camera",
    parts: ["Has", "your", "sister", "got", "a", "camera?"],
    answer: "Has your sister got a camera?",
  },
  {
    scramble: "friend / a good job",
    parts: ["Has", "your", "friend", "got", "a", "good", "job?"],
    answer: "Has your friend got a good job?",
  },
  {
    scramble: "you / sunglasses",
    parts: ["Have", "you", "got", "sunglasses?"],
    answer: "Have you got sunglasses?",
  },
  {
    scramble: "you / a big family",
    parts: ["Have", "you", "got", "a", "big", "family?"],
    answer: "Have you got a big family?",
  },
  {
    scramble: "you / a new phone",
    parts: ["Have", "you", "got", "a", "new", "phone?"],
    answer: "Have you got a new phone?",
  },
] as const;

export const roseLines = [
  {
    id: "e",
    who: "Rose's mum",
    text: "Hi Rose. Are you and your brother ready for your trip?",
    order: 1,
  },
  { id: "a", who: "Rose", text: "Yes, we are.", order: 2 },
  {
    id: "c",
    who: "Rose's mum",
    text: "Have you got your tickets?",
    order: 3,
  },
  { id: "b", who: "Rose", text: "Tickets … Yes, I've got them.", order: 4 },
  { id: "f", who: "Rose's mum", text: "And your money?", order: 5 },
  { id: "d", who: "Rose", text: "Yes, we've got money.", order: 6 },
] as const;

export const speakBagPrompts = [
  "Have you got your passport?",
  "Have you got your tickets?",
  "Have you got money / a credit card?",
  "Have you got a phone?",
  "Have you got a bottle of water?",
  "Has your teacher got a camera?",
] as const;
