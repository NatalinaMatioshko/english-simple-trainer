/** Lesson 56 — You had a bad day (Unit 8B)
 * Past Simple irregular verbs. One student + one teacher.
 * Pictures: public/images/lesson56/
 * Audio: Unit_8 R5 (verbs), R6 (didn't), R7 (Saturday).
 */

export const IMG56 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson56/${file}`;

export const AUDIO56 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_8/RM_A1_SB_U8_R${track}.mp3`;

export const VIDEO56 = (file: string) =>
  `${import.meta.env.BASE_URL}videos/lesson56/${file}`;

/* ------------------------------------------------------------------ */
/* Review · Lesson 55 regular -ed                                     */
/* ------------------------------------------------------------------ */

export const reviewPastGaps = [
  {
    id: "r1",
    before: "Last year I",
    after: "(study) English every day.",
    answers: ["studied", "Studied"],
  },
  {
    id: "r2",
    before: "She",
    after: "(walk) to school.",
    answers: ["walked", "Walked"],
  },
  {
    id: "r3",
    before: "I didn't",
    after: "(live) in a city.",
    answers: ["live", "Live"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* 1 · Pictures A–D (book art) · story A–L                            */
/* ------------------------------------------------------------------ */

export const storyPhotos = [
  {
    id: "A",
    src: IMG56("panel-a.png"),
    alt: "A woman in a taxi. The meter shows 80.00.",
    sentence: "I took a taxi to work. It was expensive.",
  },
  {
    id: "B",
    src: IMG56("panel-b.png"),
    alt: "A woman running into the office. She is late.",
    sentence: "I arrived at work. I was late for a meeting with my boss. I ran!",
  },
  {
    id: "C",
    src: IMG56("panel-c.png"),
    alt: "A woman in bed. The clock says 08:00.",
    sentence: "Yesterday, I got up at eight. I was late for work!",
  },
  {
    id: "D",
    src: IMG56("panel-d.png"),
    alt: "Two women outside a cinema. The sign says CLOSED.",
    sentence:
      "After work I met my friend at the cinema, but it was closed. I had a bad, bad day!",
  },
  {
    id: "E",
    src: IMG56("panel-e.png"),
    alt: "A woman eating a sandwich at her desk.",
    sentence: "I ate the sandwich at my desk. It was really bad.",
  },
  {
    id: "F",
    src: IMG56("panel-f.png"),
    alt: "A woman at her computer while a meeting goes on without her.",
    sentence: "and I forgot an important meeting.",
  },
  {
    id: "G",
    src: IMG56("panel-g.png"),
    alt: "A woman outside a crowded restaurant.",
    sentence: "I went to a restaurant for lunch, but I saw lots of people there.",
  },
  {
    id: "H",
    src: IMG56("panel-h.png"),
    alt: "A woman buying a hot sandwich at a shop.",
    sentence: "I didn't have lunch at the restaurant. I bought a sandwich.",
  },
  {
    id: "I",
    src: IMG56("panel-i.png"),
    alt: "An unhappy boss talking to a woman about papers.",
    sentence: "He wasn't happy. I felt bad.",
  },
  {
    id: "J",
    src: IMG56("panel-j.png"),
    alt: "A woman with her hands up. The computer is smoking.",
    sentence: "… my computer broke …",
  },
  {
    id: "K",
    src: IMG56("panel-k.png"),
    alt: "A woman thinking about a missing phone.",
    sentence: "In the afternoon, there were more bad things: I lost my phone.",
  },
  {
    id: "L",
    src: IMG56("panel-l.png"),
    alt: "A boss with folded arms speaking to a woman.",
    sentence: "My boss spoke to me about my work.",
  },
] as const;

export const storyPhotoPrompts = [
  "Look at pictures A–L with your teacher.",
  "Is this a good day or a bad day? Why?",
] as const;

export const storyPhotoModels = [
  "She got up late. She ran to work. The cinema was closed.",
  "It was a bad day.",
] as const;

export const carlaPhotos = [
  {
    id: "A",
    src: IMG56("carla-a.png"),
    alt: "A woman on the phone beside a car with the bonnet open.",
  },
  {
    id: "B",
    src: IMG56("carla-b.png"),
    alt: "A woman at a laptop in an office, looking stressed. Two colleagues are behind her.",
  },
  {
    id: "C",
    src: IMG56("carla-c.png"),
    alt: "A woman on the street, looking inside her bag.",
  },
] as const;

export const badDayPanels = [
  {
    id: "A",
    label: "A",
    caption: "I took a taxi to work. It was expensive.",
    bold: ["took"],
  },
  {
    id: "B",
    label: "B",
    caption: "I arrived at work. I was late for a meeting with my boss. I ran!",
    bold: ["ran"],
  },
  {
    id: "C",
    label: "C",
    caption: "Yesterday, I got up at eight. I was late for work!",
    bold: ["got up"],
  },
  {
    id: "D",
    label: "D",
    caption:
      "After work I met my friend at the cinema, but it was closed. I had a bad, bad day!",
    bold: ["met", "had"],
  },
  {
    id: "E",
    label: "E",
    caption: "I ate the sandwich at my desk. It was really bad.",
    bold: ["ate"],
  },
  {
    id: "F",
    label: "F",
    caption: "and I forgot an important meeting.",
    bold: ["forgot"],
  },
  {
    id: "G",
    label: "G",
    caption: "I went to a restaurant for lunch, but I saw lots of people there.",
    bold: ["went", "saw"],
  },
  {
    id: "H",
    label: "H",
    caption: "I didn't have lunch at the restaurant. I bought a sandwich.",
    bold: ["didn't have", "bought"],
  },
  {
    id: "I",
    label: "I",
    caption: "He wasn't happy. I felt bad.",
    bold: ["felt"],
  },
  {
    id: "J",
    label: "J",
    caption: "… my computer broke …",
    bold: ["broke"],
  },
  {
    id: "K",
    label: "K",
    caption: "In the afternoon, there were more bad things: I lost my phone.",
    bold: ["lost"],
  },
  {
    id: "L",
    label: "L",
    caption: "My boss spoke to me about my work.",
    bold: ["spoke"],
  },
] as const;

/** Ex.1b · picture order. C is given. */
export const storyOrder = [
  { id: "C", order: 1, text: "C · I got up at eight. I was late for work!" },
  { id: "A", order: 2, text: "A · I took a taxi to work. It was expensive." },
  { id: "B", order: 3, text: "B · I arrived at work. I was late. I ran!" },
  { id: "L", order: 4, text: "L · My boss spoke to me about my work." },
  { id: "I", order: 5, text: "I · He wasn't happy. I felt bad." },
  { id: "G", order: 6, text: "G · I went to a restaurant, but I saw lots of people." },
  { id: "H", order: 7, text: "H · I didn't have lunch there. I bought a sandwich." },
  { id: "E", order: 8, text: "E · I ate the sandwich at my desk. It was really bad." },
  { id: "K", order: 9, text: "K · I lost my phone." },
  { id: "J", order: 10, text: "J · My computer broke." },
  { id: "F", order: 11, text: "F · I forgot an important meeting." },
  { id: "D", order: 12, text: "D · The cinema was closed. I had a bad, bad day!" },
] as const;

export const pastVerbBox = [
  "ate",
  "bought",
  "broke",
  "felt",
  "forgot",
  "got up",
  "had",
  "lost",
  "met",
  "ran",
  "saw",
  "spoke",
  "took",
  "went",
] as const;

/** Unit 8 Recording 5 · Ex.1c. Speaker says these past forms, in this order. */
export const verbListenTranscript = [...pastVerbBox] as const;

/** Unit 8 Recording 6 · Ex.5. */
export const didntListenTranscript = [
  "I didn't buy lunch.",
  "I didn't take the train.",
  "I didn't go to work today.",
  "I didn't feel good.",
] as const;

/** Unit 8 Recording 7 · Ex.6. Wording is what the recording says. */
export const saturdayTranscript = [
  "I didn't get up at seven o'clock today.",
  "I stayed in bed.",
  "I had a cup of coffee and I felt really good.",
  "I left my house at twelve o'clock and met a friend.",
  "We went to the park and we ran for half an hour.",
  "Then we had lunch and we spoke about our holidays.",
  "I didn't take the bus.",
  "I didn't go to work.",
  "I didn't see my boss.",
  "It was a nice Saturday.",
] as const;

export const didntSentences = [
  { id: "d1", text: "I didn't buy lunch.", highlight: ["didn't"] },
  { id: "d2", text: "I didn't take the train.", highlight: ["didn't"] },
  { id: "d3", text: "I didn't go to work today.", highlight: ["didn't"] },
  { id: "d4", text: "I didn't feel good.", highlight: ["didn't"] },
] as const;

/* ------------------------------------------------------------------ */
/* 2 · Match infinitive → past · complete sentences                   */
/* ------------------------------------------------------------------ */

export const infinitiveMatch = [
  { id: "1", prompt: "get up", answer: "got up" },
  { id: "2", prompt: "break", answer: "broke" },
  { id: "3", prompt: "take", answer: "took" },
  { id: "4", prompt: "buy", answer: "bought" },
  { id: "5", prompt: "meet", answer: "met" },
  { id: "6", prompt: "lose", answer: "lost" },
  { id: "7", prompt: "feel", answer: "felt" },
  { id: "8", prompt: "speak", answer: "spoke" },
  { id: "9", prompt: "have", answer: "had" },
  { id: "10", prompt: "go", answer: "went" },
  { id: "11", prompt: "run", answer: "ran" },
  { id: "12", prompt: "eat", answer: "ate" },
  { id: "13", prompt: "forget", answer: "forgot" },
  { id: "14", prompt: "see", answer: "saw" },
] as const;

/** Bank order is mixed so it is not the same as the prompt list. */
export const pastFormBank = [
  "met",
  "broke",
  "saw",
  "ate",
  "went",
  "lost",
  "spoke",
  "forgot",
  "bought",
  "ran",
  "felt",
  "took",
  "had",
  "got up",
] as const;

export const sentenceGaps = [
  {
    id: "g1",
    before: "1 I",
    after: "an advert for one online.",
    answers: ["saw", "Saw"],
  },
  {
    id: "g2",
    before: "2 I",
    after: "really bad because I was late.",
    answers: ["felt", "Felt"],
  },
  {
    id: "g3",
    before: "3 We",
    after: "the train back home in the evening.",
    answers: ["took", "Took"],
  },
  {
    id: "g4",
    before: "4 She",
    after: "to Tokyo last summer.",
    answers: ["went", "Went"],
  },
  {
    id: "g5",
    before: "5 You",
    after: "a lot of food at the party!",
    answers: ["ate", "Ate"],
  },
  {
    id: "g6",
    before: "6 I",
    after: "my wife at a work party.",
    answers: ["met", "Met"],
  },
  {
    id: "g7",
    before: "7 I",
    after: "my dad's birthday again!",
    answers: ["forgot", "Forgot"],
  },
  {
    id: "g8",
    before: "8 I",
    after: "my keys on the way to work.",
    answers: ["lost", "Lost"],
  },
  {
    id: "g9",
    before: "9 She",
    after: "to her teacher about it yesterday.",
    answers: ["spoke", "Spoke"],
  },
  {
    id: "g10",
    before: "10 He",
    after: "me a cup of coffee from the cafe next door.",
    answers: ["bought", "Bought"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* 3 · Carla                                                          */
/* ------------------------------------------------------------------ */

export const carlaStory =
  "Yesterday I was busy. I didn't have time for breakfast. I didn't speak to my colleagues about football or the weekend. I didn't buy lunch. I didn't eat anything! I worked and worked and worked. " +
  "I usually walk home from work, but yesterday I felt very tired and I took the train. I arrived home. It was nine o'clock. I ate chips and I watched TV. The really bad thing? I forgot my mum's birthday.";

/** Tick = she did it. */
export const carlaDidTicks = [
  { id: "worked", label: "She worked.", correct: true },
  { id: "train", label: "She took the train.", correct: true },
  { id: "home", label: "She arrived home.", correct: true },
  { id: "chips", label: "She ate chips.", correct: true },
  { id: "tv", label: "She watched TV.", correct: true },
  { id: "birthday", label: "She forgot her mum's birthday.", correct: true },
  { id: "breakfast", label: "She had time for breakfast.", correct: false },
  { id: "colleagues", label: "She spoke to her colleagues.", correct: false },
  { id: "lunch", label: "She bought lunch.", correct: false },
  { id: "ate-work", label: "She ate something at work.", correct: false },
] as const;

/* ------------------------------------------------------------------ */
/* 6 · Saturday text                                                  */
/* ------------------------------------------------------------------ */

export const saturdayGaps = [
  {
    id: "s1",
    before: "I",
    after: "(not get up) at 7 o'clock today. I stayed in bed.",
    answers: ["didn't get up", "Didn't get up", "did not get up", "didnt get up"],
  },
  {
    id: "s2",
    before: "I",
    after: "(have) a cup of coffee and",
    answers: ["had", "Had"],
  },
  {
    id: "s3",
    before: "I",
    after: "(feel) really good.",
    answers: ["felt", "Felt"],
  },
  {
    id: "s4",
    before: "I left my house at 12 o'clock and I",
    after: "(meet) a friend.",
    answers: ["met", "Met"],
  },
  {
    id: "s5",
    before: "We",
    after: "(go) to the park and",
    answers: ["went", "Went"],
  },
  {
    id: "s6",
    before: "we",
    after: "(run) for half an hour.",
    answers: ["ran", "Ran"],
  },
  {
    id: "s7",
    before: "Then we",
    after: "(have) lunch and",
    answers: ["had", "Had"],
  },
  {
    id: "s8",
    before: "we",
    after: "(speak) about our holidays.",
    answers: ["spoke", "Spoke"],
  },
  {
    id: "s9",
    before: "I",
    after: "(not take) the bus.",
    answers: ["didn't take", "Didn't take", "did not take", "didnt take"],
  },
  {
    id: "s10",
    before: "I",
    after: "(not go) to work.",
    answers: ["didn't go", "Didn't go", "did not go", "didnt go"],
  },
  {
    id: "s11",
    before: "I",
    after: "(not see) my boss. It was a nice Saturday!",
    answers: ["didn't see", "Didn't see", "did not see", "didnt see"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Homework                                                           */
/* ------------------------------------------------------------------ */

export const hwPastType = infinitiveMatch;

export const hwSentenceGaps = [
  sentenceGaps[0],
  sentenceGaps[1],
  sentenceGaps[3],
  sentenceGaps[6],
  sentenceGaps[7],
  sentenceGaps[9],
] as const;

export const hwCarlaChoices = [
  {
    id: "c1",
    prompt: "She ___ time for breakfast.",
    options: ["had", "didn't have"],
    answer: "didn't have",
  },
  {
    id: "c2",
    prompt: "She ___ to her colleagues.",
    options: ["spoke", "didn't speak"],
    answer: "didn't speak",
  },
  {
    id: "c3",
    prompt: "She ___ lunch.",
    options: ["bought", "didn't buy"],
    answer: "didn't buy",
  },
  {
    id: "c4",
    prompt: "She ___ and worked.",
    options: ["worked", "didn't work"],
    answer: "worked",
  },
  {
    id: "c5",
    prompt: "She ___ the train.",
    options: ["took", "didn't take"],
    answer: "took",
  },
  {
    id: "c6",
    prompt: "She ___ chips and watched TV.",
    options: ["ate", "didn't eat"],
    answer: "ate",
  },
  {
    id: "c7",
    prompt: "She ___ her mum's birthday.",
    options: ["forgot", "didn't forget"],
    answer: "forgot",
  },
] as const;
