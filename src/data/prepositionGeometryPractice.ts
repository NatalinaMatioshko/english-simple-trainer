export type PrepPick = {
  id: number;
  tip: string;
  options: readonly string[];
  answer: string;
};

export type PrepPicture = {
  id: number;
  file: string;
  prompt: string;
  options: readonly ["in", "on", "at"];
  answer: "in" | "on" | "at";
  example: string;
};

export type PrepGap = {
  id: number;
  before: string;
  after: string;
  options: readonly ["in", "on", "at"];
  answer: "in" | "on" | "at";
};

/** 1 · Picture → in / on / at (geometry) */
export const prepGeoPictures: PrepPicture[] = [
  {
    id: 1,
    file: "in-the-box.jpg",
    prompt: "The toys are ___ the box.",
    options: ["in", "on", "at"],
    answer: "in",
    example: "in the box",
  },
  {
    id: 2,
    file: "on-the-table.jpg",
    prompt: "The book is ___ the table.",
    options: ["in", "on", "at"],
    answer: "on",
    example: "on the table",
  },
  {
    id: 3,
    file: "at-school.jpg",
    prompt: "The children are ___ school.",
    options: ["in", "on", "at"],
    answer: "at",
    example: "at school",
  },
  {
    id: 4,
    file: "on-the-wall.webp",
    prompt: "The picture is ___ the wall.",
    options: ["in", "on", "at"],
    answer: "on",
    example: "on the wall",
  },
  {
    id: 5,
    file: "in-the-car.webp",
    prompt: "She is ___ the car.",
    options: ["in", "on", "at"],
    answer: "in",
    example: "in the car",
  },
  {
    id: 6,
    file: "at-work.webp",
    prompt: "He is ___ work now.",
    options: ["in", "on", "at"],
    answer: "at",
    example: "at work",
  },
  {
    id: 7,
    file: "on-the-floor.webp",
    prompt: "The bag is ___ the floor.",
    options: ["in", "on", "at"],
    answer: "on",
    example: "on the floor",
  },
  {
    id: 8,
    file: "in-the-room.jpg",
    prompt: "They are ___ the room.",
    options: ["in", "on", "at"],
    answer: "in",
    example: "in the room",
  },
];

/** 2 · Geometry logic: container / surface / point */
export const prepGeoLogic: PrepPick[] = [
  {
    id: 1,
    tip: "всередині (контейнер / простір) →",
    options: ["in", "on", "at"],
    answer: "in",
  },
  {
    id: 2,
    tip: "на поверхні →",
    options: ["in", "on", "at"],
    answer: "on",
  },
  {
    id: 3,
    tip: "точка / місце як пункт →",
    options: ["in", "on", "at"],
    answer: "at",
  },
  {
    id: 4,
    tip: "a box, a bag, a room →",
    options: ["in", "on", "at"],
    answer: "in",
  },
  {
    id: 5,
    tip: "a table, a wall, the floor →",
    options: ["in", "on", "at"],
    answer: "on",
  },
  {
    id: 6,
    tip: "work, school, the door, the bus stop →",
    options: ["in", "on", "at"],
    answer: "at",
  },
];

/** 3 · Complete with in / on / at */
export const prepGeoGaps: PrepGap[] = [
  {
    id: 1,
    before: "The keys are",
    after: "the bag.",
    options: ["in", "on", "at"],
    answer: "in",
  },
  {
    id: 2,
    before: "My phone is",
    after: "the table.",
    options: ["in", "on", "at"],
    answer: "on",
  },
  {
    id: 3,
    before: "I'm",
    after: "work today.",
    options: ["in", "on", "at"],
    answer: "at",
  },
  {
    id: 4,
    before: "She's",
    after: "school.",
    options: ["in", "on", "at"],
    answer: "at",
  },
  {
    id: 5,
    before: "We are",
    after: "the park.",
    options: ["in", "on", "at"],
    answer: "in",
  },
  {
    id: 6,
    before: "There's a photo",
    after: "the wall.",
    options: ["in", "on", "at"],
    answer: "on",
  },
  {
    id: 7,
    before: "I work",
    after: "a bookshop.",
    options: ["in", "on", "at"],
    answer: "at",
  },
  {
    id: 8,
    before: "The cat is",
    after: "the sofa.",
    options: ["in", "on", "at"],
    answer: "on",
  },
];

/**
 * 4 · Choose the correct sentence
 * (typical place mistakes from lesson analysis)
 */
export const prepGeoChoose: PrepPick[] = [
  {
    id: 1,
    tip: "місце роботи зараз",
    options: ["I'm at work.", "I'm to work.", "I'm on work."],
    answer: "I'm at work.",
  },
  {
    id: 2,
    tip: "навчання як пункт",
    options: ["She's at school.", "She's on school.", "She's to school."],
    answer: "She's at school.",
  },
  {
    id: 3,
    tip: "всередині кімнати",
    options: ["They're in the room.", "They're at the room.", "They're on the room."],
    answer: "They're in the room.",
  },
  {
    id: 4,
    tip: "поверхня столу",
    options: ["The cup is on the table.", "The cup is in the table.", "The cup is at the table."],
    answer: "The cup is on the table.",
  },
  {
    id: 5,
    tip: "A1: місце роботи як заклад",
    options: [
      "I work at a bookshop.",
      "I work to a bookshop.",
      "I work on a bookshop.",
    ],
    answer: "I work at a bookshop.",
  },
  {
    id: 6,
    tip: "всередині машини",
    options: ["He's in the car.", "He's on the car.", "He's at the car."],
    answer: "He's in the car.",
  },
  {
    id: 7,
    tip: "картина на стіні",
    options: [
      "The picture is on the wall.",
      "The picture is in the wall.",
      "The picture is at the wall.",
    ],
    answer: "The picture is on the wall.",
  },
  {
    id: 8,
    tip: "біля дверей / у точці",
    options: ["She's at the door.", "She's on the door.", "She's in the door."],
    answer: "She's at the door.",
  },
];
