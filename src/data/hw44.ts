/** HW44 · Check and reflect (Unit 5 review) */

export const daysOfWeek = [
  { id: "1", hint: "M_______", answer: "Monday" },
  { id: "2", hint: "T_______", answer: "Tuesday" },
  { id: "3", hint: "W_______", answer: "Wednesday" },
  { id: "4", hint: "Th______", answer: "Thursday" },
  { id: "5", hint: "F_______", answer: "Friday" },
  { id: "6", hint: "Sa______", answer: "Saturday" },
  { id: "7", hint: "Su______", answer: "Sunday" },
] as const;

export const routineMatchOptions = [
  { id: "a", text: "TV / a film / football" },
  { id: "b", text: "English / at home" },
  { id: "c", text: "breakfast / lunch / dinner" },
  { id: "d", text: "to school / to work / home / to bed" },
  { id: "e", text: "in an office / at a hospital" },
  { id: "f", text: "late / early / at 6 o'clock" },
] as const;

export const routineMatchItems = [
  { id: "1", verb: "get up", answer: "f" },
  { id: "2", verb: "have", answer: "c" },
  { id: "3", verb: "go", answer: "d" },
  { id: "4", verb: "study", answer: "b" },
  { id: "5", verb: "work", answer: "e" },
  { id: "6", verb: "watch", answer: "a" },
] as const;

export const weekWordOrder = [
  {
    id: "1",
    scramble: "Sundays / late / I / up / on / get",
    answer: "I get up late on Sundays.",
    example: true,
  },
  {
    id: "2",
    scramble: "have / o'clock / We / 7 / at / breakfast",
    answer: "We have breakfast at 7 o'clock.",
  },
  {
    id: "3",
    scramble: "every / They / day / work / don't",
    answer: "They don't work every day.",
  },
  {
    id: "4",
    scramble: "on / You / Saturdays / don't / study",
    answer: "You don't study on Saturdays.",
  },
  {
    id: "5",
    scramble: "TV / Saturdays / watch / We / Sundays / and / on",
    answer: "We watch TV on Saturdays and Sundays.",
  },
  {
    id: "6",
    scramble: "5 / home / go / They / o'clock / at",
    answer: "They go home at 5 o'clock.",
  },
] as const;

export const makeNegative = [
  {
    id: "1",
    positive: "They play football on Sundays.",
    answer: "They don't play football on Sundays.",
    example: true,
  },
  {
    id: "2",
    positive: "We have lunch at one thirty.",
    answer: "We don't have lunch at one thirty.",
  },
  {
    id: "3",
    positive: "They go to bed at 10 o'clock.",
    answer: "They don't go to bed at 10 o'clock.",
  },
  {
    id: "4",
    positive: "I work from Monday to Friday.",
    answer: "I don't work from Monday to Friday.",
  },
  {
    id: "5",
    positive: "They study at home on Wednesdays.",
    answer: "They don't study at home on Wednesdays.",
  },
  {
    id: "6",
    positive: "I get up late on Mondays.",
    answer: "I don't get up late on Mondays.",
  },
] as const;

/** Crossword · seven travel / transport words (letter hints). */
export const travelCrossword = [
  { id: "1", hint: "dr_v_", clue: "go by car", answer: "drive" },
  { id: "2", hint: "c_c_e", clue: "go by bike", answer: "cycle" },
  { id: "3", hint: "_a_", clue: "four wheels · private", answer: "car" },
  { id: "4", hint: "b__t", clue: "on water", answer: "boat" },
  { id: "5", hint: "t__v__", clue: "go from A to B", answer: "travel" },
  { id: "6", hint: "t__i", clue: "yellow cab", answer: "taxi" },
  { id: "7", hint: "t___n", clue: "on rails", answer: "train" },
] as const;

export const travelVerbBox = [
  "arrive",
  "cycle",
  "drive",
  "leave",
  "take",
  "travel",
  "walk",
] as const;

export const travelVerbGaps = [
  {
    id: "1",
    before: "I've got a new bike. I",
    after: "to school.",
    answer: "cycle",
    example: true,
  },
  {
    id: "2",
    before: "My sister has got a car, but she doesn't",
    after: "to work.",
    answer: "drive",
  },
  {
    id: "3",
    before: "I usually",
    after: "the bus to university.",
    answer: "take",
  },
  {
    id: "4a",
    before: "I",
    after: "home at 8 o'clock and",
    answer: "leave",
  },
  {
    id: "4b",
    before: "",
    after: "at the office at eight forty-five.",
    answer: "arrive",
  },
  {
    id: "5",
    before: "I haven't got a car or a bike. I always",
    after: "to work.",
    answer: "walk",
  },
  {
    id: "6",
    before: "People usually",
    after: "to work by bus in my city.",
    answer: "travel",
  },
] as const;

/** 7a · five sentences need a fix; three are already correct. */
export const travelFixItems = [
  {
    id: "1",
    wrong: "How do you travel to work?",
    answer: "How do you travel to work?",
    ok: true,
  },
  {
    id: "2",
    wrong: "What time arrive you at your office?",
    answer: "What time do you arrive at your office?",
    ok: false,
  },
  {
    id: "3",
    wrong: "Do have you a big breakfast every day?",
    answer: "Do you have a big breakfast every day?",
    ok: false,
  },
  {
    id: "4",
    wrong: "Do your parents drive to work?",
    answer: "Do your parents drive to work?",
    ok: true,
  },
  {
    id: "5",
    wrong: "Do get up early Simon and Lucy?",
    answer: "Do Simon and Lucy get up early?",
    ok: false,
  },
  {
    id: "6",
    wrong: "What time leave you the house in the morning?",
    answer: "What time do you leave the house in the morning?",
    ok: false,
  },
  {
    id: "7",
    wrong: "What time do we have our English class?",
    answer: "What time do we have our English class?",
    ok: true,
  },
  {
    id: "8",
    wrong: "How do travel to university your friends?",
    answer: "How do your friends travel to university?",
    ok: false,
  },
] as const;

export const travelSpeakQs = [
  "How do you travel to work?",
  "What time do you leave home?",
  "What time do you arrive at work?",
  "How do your friends travel to university?",
] as const;

export const foodUnscramble = [
  { id: "1", letters: "hifs", start: "f", answer: "fish" },
  { id: "2", letters: "eschee", start: "c", answer: "cheese" },
  { id: "3", letters: "gasur", start: "s", answer: "sugar" },
  { id: "4", letters: "heccatolo", start: "c", answer: "chocolate" },
  { id: "5", letters: "dwinsechas", start: "s", answer: "sandwiches" },
  { id: "6", letters: "dalsa", start: "s", answer: "salad" },
  { id: "7", letters: "nekcich", start: "c", answer: "chicken" },
] as const;

/** Cross out the odd/incorrect option. */
export const foodOddOneOut = [
  {
    id: "1",
    options: ["chocolate cake", "sugar cake", "coffee cake"] as const,
    wrong: "sugar cake",
  },
  {
    id: "2",
    options: ["a cup of meat", "a cup of tea", "a cup of coffee"] as const,
    wrong: "a cup of meat",
  },
  {
    id: "3",
    options: [
      "a chicken sandwich",
      "a milk sandwich",
      "a cheese sandwich",
    ] as const,
    wrong: "a milk sandwich",
  },
  {
    id: "4",
    options: ["chicken salad", "egg salad", "bread salad"] as const,
    wrong: "bread salad",
  },
] as const;

export const freqWordOrder = [
  {
    id: "1",
    scramble: "at 8.30 / have dinner / usually / in the evening / We",
    answers: ["We usually have dinner at 8.30 in the evening."],
  },
  {
    id: "2",
    scramble: "hungry / am / I / in the morning / never",
    answers: [
      "I am never hungry in the morning.",
      "I'm never hungry in the morning.",
    ],
  },
  {
    id: "3",
    scramble: "have / I / meat or fish / for lunch / always",
    answers: ["I always have meat or fish for lunch."],
  },
  {
    id: "4",
    scramble: "chicken / eat / you / often / Do?",
    answers: ["Do you often eat chicken?"],
  },
  {
    id: "5",
    scramble: "you / do / buy / How often / in a coffee shop / coffee?",
    answers: ["How often do you buy coffee in a coffee shop?"],
  },
  {
    id: "6",
    scramble: "your / for class / Are / sometimes / late / friends?",
    answers: ["Are your friends sometimes late for class?"],
  },
  {
    id: "7",
    scramble: "parents / your / Do / always / on Mondays / work?",
    answers: ["Do your parents always work on Mondays?"],
  },
] as const;

export const reflectStatements44 = [
  "I can describe part of my week.",
  "I can talk about how I travel to work/university.",
  "I can take part in a survey about being healthy.",
  "I can order food and a drink.",
] as const;
