/**
 * Lesson 43 — A long journey (travel · Do you…?)
 * Moved from Lesson 42 Part 2.
 * Images: public/images/lesson42/travel-*.png
 * Audio: public/sounds/Unit_5/ (via SOUND_U5 from data/lesson42)
 */

/** Soft start · Part 2 A long journey · travel chunks */
export const travelChunks = [
  {
    en: "go to work by bus",
    ua: "їхати на роботу автобусом",
    example: "I go to work by bus.",
  },
  {
    en: "take the train",
    ua: "їхати поїздом",
    example: "I take the train to work.",
  },
  {
    en: "cycle to work",
    ua: "їхати на роботу велосипедом",
    example: "I cycle to work.",
  },
  {
    en: "drive to…",
    ua: "їхати машиною до…",
    example: "I drive to my parents' house.",
  },
  {
    en: "walk home",
    ua: "іти додому пішки",
    example: "I walk home.",
  },
  {
    en: "leave home",
    ua: "виходити з дому",
    example: "I leave home at about 8 o'clock.",
  },
  {
    en: "arrive at work",
    ua: "прибувати на роботу",
    example: "I arrive at work at 8.30.",
  },
] as const;

/** Part 2 · 1a Match photos A–G with sentences 1–7 */
export const travelSentences = [
  { n: 1, text: "I go to work by bus." },
  { n: 2, text: "I take a boat to work." },
  { n: 3, text: "I cycle to work. I love my bike!" },
  { n: 4, text: "I drive to my parents' house." },
  { n: 5, text: "I travel to work by taxi." },
  { n: 6, text: "I go to the office by train." },
  { n: 7, text: "I walk home." },
] as const;

export const travelPics = [
  { id: "A", file: "travel-a-bus.png", label: "buses", answer: 1 },
  { id: "B", file: "travel-b-drive.png", label: "cars in traffic", answer: 4 },
  { id: "C", file: "travel-c-taxi.png", label: "taxis", answer: 5 },
  { id: "D", file: "travel-d-cycle.png", label: "bike", answer: 3 },
  { id: "E", file: "travel-e-train.png", label: "train", answer: 6 },
  { id: "F", file: "travel-f-boat.png", label: "boat / ferry", answer: 2 },
  { id: "G", file: "travel-g-walk.png", label: "walking", answer: 7 },
] as const;

export const travelMatchOptions = travelSentences.map((s) => ({
  n: s.n,
  label: s.text,
})) as readonly { n: number; label: string }[];

/** Part 2 · 2a Complete transport phrases with verb groups a–c */
export const transportVerbGroups = [
  { id: "a", label: "cycle / drive / walk" },
  { id: "b", label: "go / travel" },
  { id: "c", label: "take" },
] as const;

export const transportPhrases2a = [
  {
    id: 1,
    after: "to work by bike / car / boat / taxi / train / bus",
    answer: "b",
    answerLabel: "go / travel",
  },
  {
    id: 2,
    after: "a boat / a train / a taxi / a bus to my house",
    answer: "c",
    answerLabel: "take",
  },
  {
    id: 3,
    after: "to work / my parents' house / the café",
    answer: "a",
    answerLabel: "cycle / drive / walk",
  },
] as const;

/** Part 2 · 2b Complete the sentences */
export const travelGaps2b = [
  {
    id: 1,
    before: "I go",
    after: "work by bus. I leave home at about 6.30.",
    answers: ["to", "To"],
  },
  {
    id: 2,
    before: "I go to work",
    after: "bus and train. I arrive at 8 o'clock.",
    answers: ["by", "By"],
  },
  {
    id: 3,
    before: "I live in Hong Kong. I",
    after: "a boat to work. I leave the house at 7.00 and arrive at work at 8.00.",
    answers: ["take", "Take"],
  },
  {
    id: 4,
    before: "I",
    after: "to work by bus. I leave home at 6.30.",
    answers: ["go", "Go", "travel", "Travel"],
  },
  {
    id: 5,
    before: "I drive",
    after: "work on Mondays and Tuesdays.",
    answers: ["to", "To"],
  },
] as const;

/** Part 2 · 2c opposite of leave */
export const leaveOpposite = {
  prompt: "What is the opposite of leave?",
  answers: ["arrive", "Arrive", "arrive at", "Arrive at"],
  tip: "arrive",
} as const;

/** Part 2 · 3a Listen and complete the table (R5) */
export const timDonnaTable = [
  {
    id: 1,
    who: "Tim",
    label: "travels to work by",
    answers: ["bike", "Bike", "bicycle", "Bicycle", "bike.", "a bike", "his bike"],
  },
  {
    id: 2,
    who: "Tim",
    label: "leaves home at",
    answers: ["6", "6.00", "6:00", "6 o'clock", "six", "at 6", "6 oclock"],
  },
  {
    id: 3,
    who: "Tim",
    label: "arrives at work at",
    answers: ["8", "8.00", "8:00", "8 o'clock", "eight", "at 8", "8 oclock"],
  },
  {
    id: 4,
    who: "Donna",
    label: "travels to work by",
    answers: ["bus", "Bus", "the bus", "a bus"],
  },
  {
    id: 5,
    who: "Donna",
    label: "leaves home at",
    answers: [
      "7.30",
      "7:30",
      "7.30.",
      "half past seven",
      "seven thirty",
      "7 30",
    ],
  },
] as const;

/** Part 2 · 3b Tick the questions you hear */
export const heardQuestions3b = [
  { id: 1, q: "Do you drive to work?", heard: false },
  { id: 2, q: "Do you cycle to work every day?", heard: true },
  { id: 3, q: "What time do you arrive at work?", heard: false },
  { id: 4, q: "What time do you leave home?", heard: true },
  { id: 5, q: "How do you travel to work?", heard: true },
] as const;

/** Part 2 · 4 Complete the grammar box */
export const grammarDoGaps = [
  {
    id: 1,
    before: "",
    after: "I / you / we / they drive to work?",
    answers: ["Do", "do"],
  },
  {
    id: 2,
    before: "Yes, I / you / we / they",
    after: ".",
    answers: ["do", "Do"],
  },
  {
    id: 3,
    before: "No, I / you / we / they",
    after: ".",
    answers: ["don't", "Don't", "do not", "Do not"],
  },
  {
    id: 4,
    before: "How",
    after: "you travel to work?",
    answers: ["do", "Do"],
  },
  {
    id: 5,
    before: "What time",
    after: "you leave home?",
    answers: ["do", "Do"],
  },
  {
    id: 6,
    before: "What time",
    after: "you arrive at work?",
    answers: ["do", "Do"],
  },
] as const;

/**
 * Part 2 · 5 Pronunciation · Do / do (R6)
 * Weak form in questions vs strong form in short answers → different.
 */
export const doSoundPairs = [
  {
    id: 1,
    a: "Do you go to work by bus?",
    b: "Yes, I do.",
    blueA: "Do",
    blueB: "do",
    answer: "different" as const,
  },
  {
    id: 2,
    a: "Do they walk to work?",
    b: "Yes, they do.",
    blueA: "Do",
    blueB: "do",
    answer: "different" as const,
  },
] as const;

export const travelQuestions = [
  "How do you travel to work / university?",
  "What time do you leave home?",
  "What time do you arrive?",
  "Do you walk to work?",
  "Do you take the bus / train?",
] as const;

/** Part 2 · 6 Choose the correct alternatives */
export const doYouAlts = [
  {
    id: 1,
    before: "How",
    options: ["you travel", "do you travel"] as const,
    answer: "do you travel",
    after: "to work?",
  },
  {
    id: 2,
    before: "I",
    options: ["cycle", "do cycle"] as const,
    answer: "cycle",
    after: ".",
  },
  {
    id: 3,
    before: "",
    options: ["Do you go", "Do you by"] as const,
    answer: "Do you go",
    after: "bike?",
  },
  {
    id: 4,
    before: "No,",
    options: ["we don't", "we aren't"] as const,
    answer: "we don't",
    after: ". We walk to work.",
  },
  {
    id: 5,
    before: "What time",
    options: ["leave", "do you leave"] as const,
    answer: "do you leave",
    after: "home?",
  },
  {
    id: 6,
    before: "At about eight o'clock.",
    options: ["I walk", "I am walk"] as const,
    answer: "I walk",
    after: "to the station",
  },
  {
    id: 7,
    before: "and",
    options: ["I take", "I do take"] as const,
    answer: "I take",
    after: "the train to work.",
  },
  {
    id: 8,
    before: "What time",
    options: ["you do", "do you arrive"] as const,
    answer: "do you arrive",
    after: "?",
  },
  {
    id: 9,
    before: "How",
    options: ["your children travel", "do your children travel"] as const,
    answer: "do your children travel",
    after: "to school?",
  },
  {
    id: 10,
    before: "",
    options: ["Go", "They go"] as const,
    answer: "They go",
    after: "by bus.",
  },
  {
    id: 11,
    before: "They",
    options: ["leave", "are leave"] as const,
    answer: "leave",
    after: "home at eight.",
  },
  {
    id: 12,
    before: "What time",
    options: ["they arrive", "do they arrive"] as const,
    answer: "do they arrive",
    after: "?",
  },
] as const;

/** Part 2 · 7a Put the words in order — student types the question */
export const writeQuestions42 = [
  {
    scramble: "do / leave home / you / What time?",
    answers: [
      "What time do you leave home?",
      "What time do you leave home",
    ],
  },
  {
    scramble: "travel to work / you / by bus / Do?",
    answers: [
      "Do you travel to work by bus?",
      "Do you travel to work by bus",
    ],
  },
  {
    scramble: "you / do / in your office / have lunch / What time?",
    answers: [
      "What time do you have lunch in your office?",
      "What time do you have lunch in your office",
    ],
  },
  {
    scramble: "travel / home / you / do / How?",
    answers: ["How do you travel home?", "How do you travel home"],
  },
  {
    scramble: "people / at your office / to work / drive / Do?",
    answers: [
      "Do people at your office drive to work?",
      "Do people at your office drive to work",
      "Do the people at your office drive to work?",
      "Do the people at your office drive to work",
    ],
  },
  {
    scramble: "cycle / on Saturdays / you / and Sundays / Do?",
    answers: [
      "Do you cycle on Saturdays and Sundays?",
      "Do you cycle on Saturdays and Sundays",
    ],
  },
] as const;

