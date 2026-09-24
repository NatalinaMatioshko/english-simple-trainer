/* Lesson 36 · ELLLO A1-04 · Present Simple verbs (content SoT) */

export const VIDEO_ID = "YZKCS60loaQ";

/** 1 · Listening quiz — four conversations from the video. */
export const listenQuiz = [
  {
    id: "1",
    prompt: "What does the woman like?",
    options: ["evenings", "mornings", "weekends"],
    correctAnswer: "mornings",
  },
  {
    id: "2",
    prompt: "What does the man fix and sell?",
    options: ["cars", "phones", "bikes"],
    correctAnswer: "bikes",
  },
  {
    id: "3",
    prompt: "Where does the man eat lunch?",
    options: ["at home", "in the park", "at school"],
    correctAnswer: "in the park",
  },
  {
    id: "4",
    prompt: "What sport does the woman play?",
    options: ["tennis", "soccer", "basketball"],
    correctAnswer: "soccer",
  },
  {
    id: "5",
    prompt: "When does the woman get up?",
    options: ["at 6", "at 8", "at 10"],
    correctAnswer: "at 6",
  },
  {
    id: "6",
    prompt: "What does the woman teach?",
    options: ["English", "math", "history"],
    correctAnswer: "math",
  },
] as const;

/** 2 · Complete the sentences from the video. */
export const videoGaps = [
  {
    id: "g1",
    before: "I",
    after: "up at 6.",
    correctAnswers: ["get"],
    options: ["get", "gets", "got"],
  },
  {
    id: "g2",
    before: "I take a shower. I",
    after: "dressed, and I eat breakfast.",
    correctAnswers: ["get"],
    options: ["get", "go", "have"],
  },
  {
    id: "g3",
    before: "I",
    after: "math.",
    correctAnswers: ["teach"],
    options: ["teach", "teaches", "work"],
  },
  {
    id: "g4",
    before: "I",
    after: "and sell bikes.",
    correctAnswers: ["fix"],
    options: ["fix", "fixes", "buy"],
  },
  {
    id: "g5",
    before: "I eat",
    after: "the park.",
    correctAnswers: ["in"],
    options: ["in", "at", "on"],
  },
  {
    id: "g6",
    before: "I like to",
    after: "on my lunch break.",
    correctAnswers: ["read"],
    options: ["read", "reads", "play"],
  },
  {
    id: "g7",
    before: "I",
    after: "at the library.",
    correctAnswers: ["study"],
    options: ["study", "studies", "work"],
  },
  {
    id: "g8",
    before: "I",
    after: "soccer with my friends.",
    correctAnswers: ["play"],
    options: ["play", "plays", "go"],
  },
] as const;

/** 3 · do / don't */
export const doDont = [
  {
    id: "d1",
    prompt: "___ you get up early?",
    options: ["Do", "Does", "Are"],
    correctAnswer: "Do",
  },
  {
    id: "d2",
    prompt: "I ___ work at a bike shop. I teach math.",
    options: ["don't", "doesn't", "am not"],
    correctAnswer: "don't",
  },
  {
    id: "d3",
    prompt: "___ you play soccer on the weekend?",
    options: ["Do", "Does", "Is"],
    correctAnswer: "Do",
  },
  {
    id: "d4",
    prompt: "He ___ eat in the park. He eats at home.",
    options: ["don't", "doesn't", "isn't"],
    correctAnswer: "doesn't",
  },
  {
    id: "d5",
    prompt: "What ___ you do in the morning?",
    options: ["do", "does", "are"],
    correctAnswer: "do",
  },
  {
    id: "d6",
    prompt: "She ___ like mornings.",
    options: ["like", "likes", "liking"],
    correctAnswer: "likes",
  },
] as const;

/** 4 · Word order questions from the video. */
export const wordOrder36 = [
  {
    scramble: "you / do / What / in / the morning / ?",
    parts: ["What", "do", "you", "do", "in", "the morning", "?"],
    answer: "What do you do in the morning?",
  },
  {
    scramble: "you / When / get up / do / ?",
    parts: ["When", "do", "you", "get up", "?"],
    answer: "When do you get up?",
  },
  {
    scramble: "lunch / Where / you / eat / do / ?",
    parts: ["Where", "do", "you", "eat", "lunch", "?"],
    answer: "Where do you eat lunch?",
  },
  {
    scramble: "you / do / What / on / the weekend / ?",
    parts: ["What", "do", "you", "do", "on", "the weekend", "?"],
    answer: "What do you do on the weekend?",
  },
] as const;

export const speakPrompts = [
  "What do you do in the morning?",
  "When do you get up?",
  "What do you do during the day?",
  "Where do you eat lunch?",
  "What do you do on the weekend?",
] as const;

/** Legacy HW36 shape aliases (answer field). */
export const listenQuizLegacy = listenQuiz.map((q) => ({
  id: Number(q.id),
  prompt: q.prompt,
  options: q.options,
  answer: q.correctAnswer,
}));

export const videoGapsLegacy = videoGaps.map((g) => ({
  id: g.id,
  before: g.before,
  after: g.after,
  answer: g.correctAnswers[0],
  options: g.options,
}));

export const doDontLegacy = doDont.map((q) => ({
  id: q.id,
  prompt: q.prompt,
  options: q.options,
  answer: q.correctAnswer,
}));
