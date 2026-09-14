/**
 * Lesson 40 — Unit 4C Dos and don'ts · Imperatives
 * Audio: public/sounds/Unit_4/RM_A1_SB_U4_R{n}.mp3
 * R9 — verbs from 2b (SB 4.9)
 * R10 — imperative sentence stress (SB 4.10)
 *
 * Photos: public/images/lesson40/
 * Warm-up HW fix: lesson40HwFix.ts
 */

export const IMG40 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson40/${file}`;

export const londonPlaces = [
  "Notting Hill",
  "Buckingham Palace",
  "The British Museum",
  "Oxford Street",
  "the London Eye",
] as const;

export const lydiaWhy = {
  question: "Why is Lydia going to London?",
  options: [
    "on holiday",
    "for a work trip",
    "to see a show",
    "to visit family",
  ] as const,
  answer: "for a work trip",
};

export const lydiaOpening =
  "I have a work trip to London next week! Have you got any dos and don'ts for London? Lydia xx";

export const adviceTexts = [
  {
    who: "Ben",
    parts: [
      { t: "Don't " },
      { t: "go to", bold: true },
      { t: " Oxford Street. It's very busy." },
    ],
  },
  {
    who: "Carla",
    parts: [
      { t: "Visit", bold: true },
      { t: " The British Museum. It's really interesting." },
    ],
  },
  {
    who: "Vitor",
    parts: [
      { t: "Don't " },
      { t: "take", bold: true },
      { t: " taxis! They're expensive." },
    ],
  },
  {
    who: "Jemima",
    parts: [
      { t: "Go to", bold: true },
      { t: " Greenwich and " },
      { t: "take", bold: true },
      { t: " photos." },
    ],
  },
  {
    who: "Juana",
    parts: [
      { t: "Try", bold: true },
      { t: " Indian food. Indian food in the UK is really good." },
    ],
  },
  {
    who: "Alexis",
    parts: [
      { t: "Drink", bold: true },
      { t: " English tea, Lydia. It's cheap x" },
    ],
  },
  {
    who: "Theresa",
    parts: [
      { t: "See", bold: true },
      { t: " a show, Lydia. There are lots of good shows in London." },
    ],
  },
  {
    who: "Toni",
    parts: [{ t: "Take", bold: true }, { t: " a coat!" }],
  },
] as const;

export const verbGaps = [
  {
    n: 1,
    example: true,
    before: "",
    after: " Japanese food, Indian food",
    answers: ["try"] as const,
    slots: [{ options: ["try", "drink", "see"] as const, answer: "try" }],
  },
  {
    n: 2,
    example: false,
    before: "",
    after: " New York, Rome, The British Museum",
    answers: ["go to", "visit"] as const,
    slots: [
      {
        options: ["go to", "take", "see", "visit"] as const,
        answer: "go to",
      },
      {
        options: ["visit", "drink", "take", "try"] as const,
        answer: "visit",
      },
    ],
  },
  {
    n: 3,
    example: false,
    before: "",
    after: " a taxi, a bus, a train, photos, a coat",
    answers: ["take"] as const,
    slots: [
      {
        options: ["take", "see", "drink", "visit"] as const,
        answer: "take",
      },
    ],
  },
  {
    n: 4,
    example: false,
    before: "",
    after: " tea, coffee",
    answers: ["drink"] as const,
    slots: [
      {
        options: ["drink", "see", "try", "take"] as const,
        answer: "drink",
      },
    ],
  },
  {
    n: 5,
    example: false,
    before: "",
    after: " a film, a show",
    answers: ["see"] as const,
    slots: [
      {
        options: ["see", "go to", "try", "drink"] as const,
        answer: "see",
      },
    ],
  },
] as const;

export const phrasePics = [
  {
    n: 1,
    file: "drink-tea.jpg",
    emoji: "🍵",
    phrase: "drink tea",
    example: true,
  },
  {
    n: 2,
    file: "see-a-show.jpg",
    emoji: "🎭",
    phrase: "see a show",
    example: false,
  },
  {
    n: 3,
    file: "go-to-new-york.jpg",
    emoji: "🏙️",
    phrase: "visit New York",
    example: false,
  },
  {
    n: 4,
    file: "try-japanese-food.jpg",
    emoji: "🍣",
    phrase: "try Japanese food",
    example: false,
  },
  {
    n: 5,
    file: "take-a-train.jpg",
    emoji: "🚆",
    phrase: "take a train",
    example: false,
  },
  {
    n: 6,
    file: "take-photos.jpg",
    emoji: "📷",
    phrase: "take photos",
    example: false,
  },
] as const;

export const phraseBank = phrasePics.map((item) => item.phrase);

/**
 * 4 · Tick good things to do in London (from 2a messages).
 * tick = true → Carla, Jemima, Juana, Alexis, Theresa, Toni (dos).
 * tick = false → Ben, Vitor (don'ts in messages).
 */
export const londonDoTicks = [
  {
    id: "1",
    label: "go to Oxford Street",
    tick: false,
    hint: "Ben: Don't go to Oxford Street.",
  },
  {
    id: "2",
    label: "visit The British Museum",
    tick: true,
    hint: "Carla: Visit The British Museum.",
  },
  {
    id: "3",
    label: "take taxis",
    tick: false,
    hint: "Vitor: Don't take taxis!",
  },
  {
    id: "4",
    label: "go to Greenwich",
    tick: true,
    hint: "Jemima: Go to Greenwich…",
  },
  {
    id: "5",
    label: "take photos",
    tick: true,
    hint: "Jemima: …take photos.",
  },
  {
    id: "6",
    label: "try Indian food",
    tick: true,
    hint: "Juana: Try Indian food.",
  },
  {
    id: "7",
    label: "drink English tea",
    tick: true,
    hint: "Alexis: Drink English tea, Lydia.",
  },
  {
    id: "8",
    label: "see a show",
    tick: true,
    hint: "Theresa: See a show, Lydia.",
  },
  {
    id: "9",
    label: "take a coat",
    tick: true,
    hint: "Toni: Take a coat!",
  },
] as const;

/** 5 · Imperatives grammar box gaps. */
export const imperativeGaps = [
  {
    id: "g1",
    options: ["Don't", "Do", "Doesn't"] as const,
    answer: "Don't",
  },
  {
    id: "g2",
    options: ["Don't", "Not", "No"] as const,
    answer: "Don't",
  },
  {
    id: "g3",
    options: ["See", "Sees", "Seeing"] as const,
    answer: "See",
  },
] as const;

/** 6a · Stress patterns (SB 4.10) — one sentence, two stress options. */
export const stressPatterns = [
  {
    n: 1,
    words: ["Don't", "go", "to", "Notting", "Hill."],
    options: [
      { id: "a", stress: [0] },
      { id: "b", stress: [3, 4] },
    ],
    answer: "b",
  },
  {
    n: 2,
    words: ["Try", "Polish", "food."],
    options: [
      { id: "a", stress: [0] },
      { id: "b", stress: [1, 2] },
    ],
    answer: "a",
  },
  {
    n: 3,
    words: ["Drink", "coffee", "in", "a", "café."],
    options: [
      { id: "a", stress: [0] },
      { id: "b", stress: [1, 4] },
    ],
    answer: "b",
  },
  {
    n: 4,
    words: ["Don't", "take", "photos."],
    options: [
      { id: "a", stress: [0] },
      { id: "b", stress: [2] },
    ],
    answer: "b",
  },
] as const;

export type StressSegment =
  | { kind: "mid"; text: string }
  | { kind: "pick"; optionId: string; text: string };

/** Group words into middle text vs clickable stress chunks (a or b). */
export function buildStressSegments(
  words: readonly string[],
  optA: { id: string; stress: readonly number[] },
  optB: { id: string; stress: readonly number[] },
): StressSegment[] {
  const pick = (wi: number) => {
    const inA = optA.stress.includes(wi);
    const inB = optB.stress.includes(wi);
    if (inA && !inB) return optA.id;
    if (inB && !inA) return optB.id;
    return null;
  };

  const segments: StressSegment[] = [];
  let i = 0;
  while (i < words.length) {
    const who = pick(i);
    if (!who) {
      let text = words[i];
      i += 1;
      while (i < words.length && !pick(i)) {
        text += ` ${words[i]}`;
        i += 1;
      }
      segments.push({ kind: "mid", text });
      continue;
    }
    let text = words[i];
    i += 1;
    while (i < words.length && pick(i) === who) {
      text += ` ${words[i]}`;
      i += 1;
    }
    segments.push({ kind: "pick", optionId: who, text });
  }
  return segments;
}

/** 7 · Trip to Rome · tick = do, cross = don't. */
export const romeTrip = [
  {
    n: 1,
    file: "rome-coffee.jpg",
    emoji: "☕",
    doIt: true,
    example: true,
    answers: ["Drink coffee.", "Drink coffee"],
  },
  {
    n: 2,
    file: "rome-pasta.jpg",
    emoji: "🍝",
    doIt: true,
    example: false,
    answers: [
      "Try Italian food.",
      "Try Italian food",
      "Try pasta.",
      "Try pasta",
    ],
  },
  {
    n: 3,
    file: "rome-colosseum.jpg",
    emoji: "🏛️",
    doIt: true,
    example: false,
    answers: [
      "Visit Rome.",
      "Visit Rome",
      "Visit the Colosseum.",
      "Visit the Colosseum",
    ],
  },
  {
    n: 4,
    file: "rome-film.jpg",
    emoji: "🎬",
    doIt: true,
    example: false,
    answers: ["See a film.", "See a film", "See a movie.", "See a movie"],
  },
  {
    n: 5,
    file: "rome-coat.jpg",
    emoji: "🧥",
    doIt: false,
    example: false,
    answers: ["Don't take a coat.", "Don't take a coat", "Do not take a coat."],
  },
  {
    n: 6,
    file: "rome-camera.jpg",
    emoji: "📷",
    doIt: false,
    example: false,
    answers: [
      "Don't take a camera.",
      "Don't take a camera",
      "Do not take a camera.",
    ],
  },
] as const;

export const citySpeakHints = [
  "Go to …",
  "Visit …",
  "Try …",
  "Drink …",
  "See …",
  "Take …",
  "Don't go to …",
  "Don't take …",
] as const;
