import type {
  ConjugationTask,
  QuestionTask,
  MixedTask,
  QuizTask,
} from "../types/trainer";

export const conjugationTasks: ConjugationTask[] = [
  {
    sentence: "She ___ coffee every morning.",
    answer: "drinks",
    hint: "drink",
  },
  {
    sentence: "He ___ English at home.",
    answer: "studies",
    hint: "study",
  },
  {
    sentence: "My brother ___ up at 7 a.m.",
    answer: "gets",
    hint: "get",
  },
  {
    sentence: "Anna ___ TV in the evening.",
    answer: "watches",
    hint: "watch",
  },
  {
    sentence: "Tom ___ to work by bus.",
    answer: "goes",
    hint: "go",
  },
  {
    sentence: "My mother ___ dinner every day.",
    answer: "makes",
    hint: "make",
  },
  {
    sentence: "It ___ a lot of water.",
    answer: "needs",
    hint: "need",
  },
  {
    sentence: "She ___ books before bed.",
    answer: "reads",
    hint: "read",
  },
];

export const questionTasks: QuestionTask[] = [
  {
    prompt: "you / play / chess ?",
    answer: "Do you play chess?",
  },
  {
    prompt: "she / like / coffee ?",
    answer: "Does she like coffee?",
  },
  {
    prompt: "they / study / every day ?",
    answer: "Do they study every day?",
  },
  {
    prompt: "he / go to school / by bus ?",
    answer: "Does he go to school by bus?",
  },
  {
    prompt: "your friend / watch / films at night ?",
    answer: "Does your friend watch films at night?",
  },
  {
    prompt: "we / need / a break ?",
    answer: "Do we need a break?",
  },
];

export const mixedTasks: MixedTask[] = [
  {
    text: "He ___ to school by bus.",
    options: ["go", "goes", "does"],
    correct: "goes",
  },
  {
    text: "They ___ English on Monday.",
    options: ["study", "studies", "does"],
    correct: "study",
  },
  {
    text: "She ___ breakfast at 8 o’clock.",
    options: ["have", "has", "do"],
    correct: "has",
  },
  {
    text: "___ your sister like pizza?",
    options: ["Do", "Does", "Is"],
    correct: "Does",
  },
  {
    text: "My cat ___ in the kitchen.",
    options: ["sleep", "sleeps", "sleepes"],
    correct: "sleeps",
  },
  {
    text: "We ___ our teacher every week.",
    options: ["meet", "meets", "meeting"],
    correct: "meet",
  },
];

export const quizTasks: QuizTask[] = [
  {
    text: "I ___ drink tea in the morning. (100%)",
    options: ["always", "sometimes", "never", "usually"],
    correct: "always",
  },
  {
    text: "She ___ goes to bed at 11 p.m. (most days)",
    options: ["never", "usually", "sometimes", "always"],
    correct: "usually",
  },
  {
    text: "We ___ play tennis on Sundays. (from time to time)",
    options: ["sometimes", "always", "never", "usually"],
    correct: "sometimes",
  },
  {
    text: "He ___ eats meat. (0%)",
    options: ["always", "usually", "sometimes", "never"],
    correct: "never",
  },
  {
    text: "They ___ watch TV after dinner. (many days, but not every day)",
    options: ["usually", "always", "sometimes", "never"],
    correct: "usually",
  },
];
