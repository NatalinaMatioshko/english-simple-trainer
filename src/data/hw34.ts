/* ── Homework 34 · check: WH-questions + Present continuous ───── */

/** Обери правильне питальне слово за відповіддю. */
export const hw34WhWord = [
  {
    id: "w1",
    prompt: "___ is that man? — He's my brother.",
    options: ["Who", "What", "Where"],
    answer: "Who",
  },
  {
    id: "w2",
    prompt: "___ do you live? — In Kyiv.",
    options: ["Where", "When", "Why"],
    answer: "Where",
  },
  {
    id: "w3",
    prompt: "___ does the film start? — At eight o'clock.",
    options: ["When", "How", "Who"],
    answer: "When",
  },
  {
    id: "w4",
    prompt: "___ does she do? — She's a nurse.",
    options: ["What", "Who", "Where"],
    answer: "What",
  },
  {
    id: "w5",
    prompt: "___ do you study English? — Because I want a good job.",
    options: ["Why", "What", "When"],
    answer: "Why",
  },
  {
    id: "w6",
    prompt: "___ do you go to the gym? — Twice a week.",
    options: ["How often", "How old", "How much"],
    answer: "How often",
  },
  {
    id: "w7",
    prompt: "___ colour is your car? — It's red.",
    options: ["What", "Who", "Why"],
    answer: "What",
  },
  {
    id: "w8",
    prompt: "___ were you yesterday? — I was at home.",
    options: ["Where", "What", "How often"],
    answer: "Where",
  },
] as const;

/** Обери граматично правильне питання (порядок слів + do / does / be). */
export const hw34WhForm = [
  {
    id: "f1",
    scramble: "he / Who / is / ?",
    options: ["Who is he?", "Who he is?", "Who does he is?"],
    answer: "Who is he?",
  },
  {
    id: "f2",
    scramble: "live / Where / you / do / ?",
    options: ["Where do you live?", "Where you live?", "Where are you live?"],
    answer: "Where do you live?",
  },
  {
    id: "f3",
    scramble: "does / What / she / do / ?",
    options: ["What does she do?", "What does she does?", "What she does?"],
    answer: "What does she do?",
  },
  {
    id: "f4",
    scramble: "the lesson / When / start / does / ?",
    options: [
      "When does the lesson start?",
      "When the lesson starts?",
      "When does the lesson starts?",
    ],
    answer: "When does the lesson start?",
  },
  {
    id: "f5",
    scramble: "your town / big / Is / ?",
    options: ["Is your town big?", "Does your town big?", "Your town is big?"],
    answer: "Is your town big?",
  },
  {
    id: "f6",
    scramble: "you / How old / are / ?",
    options: ["How old are you?", "How old you are?", "How old do you are?"],
    answer: "How old are you?",
  },
] as const;

/** am / is / are перед -ing. */
export const hw34PcBe = [
  { id: "b1", before: "I", after: "working now.", answer: "am" },
  { id: "b2", before: "She", after: "studying English.", answer: "is" },
  { id: "b3", before: "They", after: "watching TV.", answer: "are" },
  { id: "b4", before: "We", after: "having lunch.", answer: "are" },
  { id: "b5", before: "He", after: "not sleeping.", answer: "is" },
  { id: "b6", before: "It", after: "raining today.", answer: "is" },
] as const;

/** Напиши -ing форму (spelling rules). */
export const hw34PcIng = [
  { id: "i1", verb: "work", answer: "working" },
  { id: "i2", verb: "run", answer: "running" },
  { id: "i3", verb: "write", answer: "writing" },
  { id: "i4", verb: "sit", answer: "sitting" },
  { id: "i5", verb: "have", answer: "having" },
  { id: "i6", verb: "study", answer: "studying" },
  { id: "i7", verb: "swim", answer: "swimming" },
  { id: "i8", verb: "make", answer: "making" },
] as const;

/** Present simple чи Present continuous? */
export const hw34PcVsSimple = [
  {
    id: "c1",
    before: "Look! The baby",
    after: ".",
    options: ["is crying", "cries"],
    answer: "is crying",
    tipUa: "Look! → зараз",
  },
  {
    id: "c2",
    before: "I usually",
    after: "coffee in the morning.",
    options: ["drink", "am drinking"],
    answer: "drink",
    tipUa: "usually → рутина",
  },
  {
    id: "c3",
    before: "She",
    after: "TV every evening.",
    options: ["watches", "is watching"],
    answer: "watches",
    tipUa: "every evening → рутина",
  },
  {
    id: "c4",
    before: "Be quiet! He",
    after: ".",
    options: ["is sleeping", "sleeps"],
    answer: "is sleeping",
    tipUa: "зараз, у цей момент",
  },
  {
    id: "c5",
    before: "They",
    after: "to school by bus every day.",
    options: ["go", "are going"],
    answer: "go",
    tipUa: "every day → рутина",
  },
  {
    id: "c6",
    before: "Right now we",
    after: "in the park.",
    options: ["are walking", "walk"],
    answer: "are walking",
    tipUa: "right now → зараз",
  },
] as const;
