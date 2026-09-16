/**
 * Lesson 41 — Unit 4D English in action · tell the time
 * Audio: public/sounds/Unit_4/RM_A1_SB_U4_R{11,12}.mp3
 * Images: public/images/lesson41/
 */

export const IMG41 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson41/${file}`;

/** 1 · Digital clocks A–H */
export const digitalClocks = [
  { id: "A", time: "6:45", spoken: "Six forty-five.", example: true },
  { id: "B", time: "11:30", spoken: "Eleven thirty.", example: false },
  { id: "C", time: "10:45", spoken: "Ten forty-five.", example: false },
  { id: "D", time: "12:05", spoken: "Twelve oh five.", example: false },
  { id: "E", time: "3:00", spoken: "Three o'clock.", example: false },
  { id: "F", time: "6:15", spoken: "Six fifteen.", example: false },
  { id: "G", time: "7:10", spoken: "Seven ten.", example: false },
  { id: "H", time: "11:15", spoken: "Eleven fifteen.", example: false },
] as const;

/** 2 · Listen and match conversations 1–4 → clocks from ex.1 (R11) */
export const listenMatch = [
  { n: 1, answer: "E", hint: "three o'clock" },
  { n: 2, answer: "F", hint: "quarter past six" },
  { n: 3, answer: "B", hint: "half past eleven" },
  { n: 4, answer: "C", hint: "quarter to eleven" },
] as const;

export const clockLetterOptions = digitalClocks.map((c) => c.id);

/**
 * 3 · Complete conversations (R11 again).
 * Answers accept common variants.
 */
export const dialogueGaps = [
  {
    n: 1,
    lines: [
      { who: "A", text: "Excuse me. What time is it?" },
      {
        who: "B",
        before: "It's",
        after: "o'clock.",
        answers: ["three", "Three", "3"],
        gap: true,
      },
      { who: "A", text: "Thank you." },
    ],
  },
  {
    n: 2,
    lines: [
      { who: "A", text: "What time is it?" },
      { who: "B", text: "It's quarter past six." },
      { who: "A", text: "Quarter to six?" },
      {
        who: "B",
        before: "No,",
        after: "",
        answers: [
          "quarter past six",
          "it's quarter past six",
          "It's quarter past six.",
          "It's quarter past six",
        ],
        gap: true,
      },
    ],
  },
  {
    n: 3,
    lines: [
      { who: "A", text: "What time is it, Alex?" },
      { who: "B", text: "Er, it's half past eleven." },
      {
        who: "A",
        before: "Sorry,",
        after: "?",
        answers: [
          "half past eleven",
          "Half past eleven",
          "it's half past eleven",
          "It's half past eleven",
        ],
        gap: true,
      },
      { who: "B", text: "Yeah." },
      { who: "A", text: "Oh no! I'm late." },
    ],
  },
  {
    n: 4,
    lines: [
      { who: "A", text: "What time is our train?" },
      { who: "B", text: "It's at quarter to eleven." },
      { who: "A", text: "Quarter past eleven?" },
      {
        who: "B",
        before: "No,",
        after: "",
        answers: [
          "quarter to eleven",
          "it's quarter to eleven",
          "It's quarter to eleven.",
          "It's quarter to eleven",
          "It's at quarter to eleven.",
          "It's at quarter to eleven",
        ],
        gap: true,
      },
      { who: "A", text: "Oh OK." },
    ],
  },
] as const;

/** Useful phrases box */
export const usefulPhrases = {
  askTime: ["What time is it?"],
  sayTime: [
    "It's four o'clock.",
    "It's five past four.",
    "It's quarter past four.",
    "It's half past four.",
    "It's twenty to five.",
    "It's quarter to five.",
    "It's five to five.",
  ],
  askEvent: ["What time is the (train to London)?"],
  sayEvent: ["It's at (seven forty-five)."],
} as const;

/**
 * 4 · Match digital times 1–7 with Useful phrases (all based on 4:xx).
 */
export const phraseMatch = [
  {
    n: 1,
    digital: "4.15",
    answer: "It's quarter past four.",
    options: [
      "It's quarter past four.",
      "It's quarter to four.",
      "It's half past four.",
    ],
  },
  {
    n: 2,
    digital: "4.55",
    answer: "It's five to five.",
    options: [
      "It's five to five.",
      "It's five past four.",
      "It's five to four.",
    ],
  },
  {
    n: 3,
    digital: "4.00",
    answer: "It's four o'clock.",
    options: [
      "It's four o'clock.",
      "It's half past four.",
      "It's quarter past four.",
    ],
  },
  {
    n: 4,
    digital: "4.40",
    answer: "It's twenty to five.",
    options: [
      "It's twenty to five.",
      "It's twenty past four.",
      "It's quarter to five.",
    ],
  },
  {
    n: 5,
    digital: "4.45",
    answer: "It's quarter to five.",
    options: [
      "It's quarter to five.",
      "It's quarter past four.",
      "It's half past four.",
    ],
  },
  {
    n: 6,
    digital: "4.30",
    answer: "It's half past four.",
    options: [
      "It's half past four.",
      "It's quarter past four.",
      "It's four o'clock.",
    ],
  },
  {
    n: 7,
    digital: "4.05",
    answer: "It's five past four.",
    options: [
      "It's five past four.",
      "It's five to five.",
      "It's quarter past four.",
    ],
  },
] as const;

/** 5 · Speak about clocks A–H with teacher */
export const speakClocks = digitalClocks.map((c) => ({
  id: c.id,
  time: c.time,
  model: `What time is it? — It's ${c.spoken.replace(/\.$/, "")}.`,
}));

/** Extra practice: write the time in words (digital → spoken) */
export const writeTimes = [
  {
    id: "w1",
    digital: "3:00",
    answers: ["It's three o'clock.", "It's three o'clock", "three o'clock"],
  },
  {
    id: "w2",
    digital: "6:15",
    answers: [
      "It's quarter past six.",
      "It's quarter past six",
      "quarter past six",
      "It's six fifteen.",
      "It's six fifteen",
    ],
  },
  {
    id: "w3",
    digital: "11:30",
    answers: [
      "It's half past eleven.",
      "It's half past eleven",
      "half past eleven",
      "It's eleven thirty.",
      "It's eleven thirty",
    ],
  },
  {
    id: "w4",
    digital: "10:45",
    answers: [
      "It's quarter to eleven.",
      "It's quarter to eleven",
      "quarter to eleven",
      "It's ten forty-five.",
      "It's ten forty-five",
    ],
  },
  {
    id: "w5",
    digital: "4:05",
    answers: [
      "It's five past four.",
      "It's five past four",
      "five past four",
    ],
  },
  {
    id: "w6",
    digital: "4:55",
    answers: ["It's five to five.", "It's five to five", "five to five"],
  },
] as const;
