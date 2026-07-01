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
  {
    sentence: "He ___ his teeth twice a day.",
    answer: "brushes",
    hint: "brush",
  },
  {
    sentence: "My sister ___ to music on the way to school.",
    answer: "listens",
    hint: "listen",
  },
  {
    sentence: "The dog ___ in the garden every afternoon.",
    answer: "plays",
    hint: "play",
  },
  {
    sentence: "She ___ the dishes after dinner.",
    answer: "washes",
    hint: "wash",
  },
  {
    sentence: "He ___ home at 6 p.m.",
    answer: "comes",
    hint: "come",
  },
  {
    sentence: "My father ___ the car every Sunday.",
    answer: "washes",
    hint: "wash",
  },
  {
    sentence: "She ___ yoga in the morning.",
    answer: "does",
    hint: "do",
  },
  {
    sentence: "He ___ a shower before breakfast.",
    answer: "takes",
    hint: "take",
  },
  {
    sentence: "The cat ___ on the sofa all day.",
    answer: "sleeps",
    hint: "sleep",
  },
  {
    sentence: "She ___ the window every morning.",
    answer: "opens",
    hint: "open",
  },
  {
    sentence: "He ___ chess with his grandfather.",
    answer: "plays",
    hint: "play",
  },
  {
    sentence: "My teacher ___ very fast.",
    answer: "speaks",
    hint: "speak",
  },
  {
    sentence: "She ___ her keys all the time.",
    answer: "loses",
    hint: "lose",
  },
  {
    sentence: "He ___ coffee with sugar.",
    answer: "drinks",
    hint: "drink",
  },
  {
    sentence: "The bus ___ at 8:15 every morning.",
    answer: "arrives",
    hint: "arrive",
  },
  {
    sentence: "She ___ lunch at the office.",
    answer: "has",
    hint: "have",
  },
  {
    sentence: "He ___ to the gym three times a week.",
    answer: "goes",
    hint: "go",
  },
  {
    sentence: "My mum ___ the shopping on Saturdays.",
    answer: "does",
    hint: "do",
  },
  {
    sentence: "She ___ emails in English at work.",
    answer: "writes",
    hint: "write",
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
  {
    prompt: "your brother / work / on weekends ?",
    answer: "Does your brother work on weekends?",
  },
  {
    prompt: "you / have / breakfast / every morning ?",
    answer: "Do you have breakfast every morning?",
  },
  {
    prompt: "she / speak / French ?",
    answer: "Does she speak French?",
  },
  {
    prompt: "they / live / near the school ?",
    answer: "Do they live near the school?",
  },
  {
    prompt: "he / read / books / before bed ?",
    answer: "Does he read books before bed?",
  },
  {
    prompt: "your parents / watch / TV / in the evening ?",
    answer: "Do your parents watch TV in the evening?",
  },
  {
    prompt: "she / take / the bus / to work ?",
    answer: "Does she take the bus to work?",
  },
  {
    prompt: "you / drink / tea / in the morning ?",
    answer: "Do you drink tea in the morning?",
  },
  {
    prompt: "he / help / at home ?",
    answer: "Does he help at home?",
  },
  {
    prompt: "your sister / go / to the gym ?",
    answer: "Does your sister go to the gym?",
  },
  {
    prompt: "they / eat / lunch / at school ?",
    answer: "Do they eat lunch at school?",
  },
  {
    prompt: "she / know / the answer ?",
    answer: "Does she know the answer?",
  },
  {
    prompt: "you / understand / this exercise ?",
    answer: "Do you understand this exercise?",
  },
  {
    prompt: "he / wake up / early ?",
    answer: "Does he wake up early?",
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
