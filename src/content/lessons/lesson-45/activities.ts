/** Lesson 45 — Good and bad habits
 * Images: public/images/lesson45/
 * Audio: public/sounds/Unit_6/RM_A1_SB_U6_R*.mp3
 *
 * Goal: talk about another person’s habits (he/she + -s).
 * Vocab: time expressions. Grammar: Present Simple he/she/it.
 */

export const SOUND_U6 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_6/RM_A1_SB_U6_R${r}.mp3`;

export const IMG45 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson45/${file}`;

export const timeExpressions = [
  "in the morning",
  "in the afternoon",
  "in the evening",
  "at night",
  "at the weekend",
  "every day",
  "every week",
] as const;

/** Ex.1 · match pictures A–G → sentence numbers 1–7 */
export const habitPhotoMatch = [
  {
    id: "A",
    file: "habit-a-tv.png",
    alt: "A woman watches TV on a sofa in the evening",
    answer: "3",
  },
  {
    id: "B",
    file: "habit-b-study.png",
    alt: "A man studies at a desk at 11 p.m.",
    answer: "6",
  },
  {
    id: "C",
    file: "habit-c-coffee.png",
    alt: "A man drinks coffee on weekdays",
    answer: "2",
  },
  {
    id: "D",
    file: "habit-d-drive.png",
    alt: "Friends sing in a car on Saturdays and Sundays",
    answer: "4",
  },
  {
    id: "E",
    file: "habit-e-gym.png",
    alt: "A calendar with GYM marked several times a month",
    answer: "7",
  },
  {
    id: "F",
    file: "habit-f-bookshop.png",
    alt: "A man at a closed bookshop at 8:30 a.m.",
    answer: "1",
  },
  {
    id: "G",
    file: "habit-g-bus.png",
    alt: "Students on a bus at 3:30 p.m.",
    answer: "5",
  },
] as const;

export const habitMatchSentences = [
  {
    value: "1",
    label: "I start work in the morning.",
  },
  {
    value: "2",
    label: "I have coffee every day.",
  },
  {
    value: "3",
    label: "I watch TV in the evening.",
  },
  {
    value: "4",
    label: "I drive to the park at the weekend.",
  },
  {
    value: "5",
    label: "I take the bus in the afternoon.",
  },
  {
    value: "6",
    label: "I study at night.",
  },
  {
    value: "7",
    label: "I go to the gym every week.",
  },
] as const;

/** Ex.3 · complete with a time expression */
export const timeExprGaps = [
  {
    id: "t1",
    before: "I don't go to work",
    after: ".",
    answers: [...timeExpressions],
  },
  {
    id: "t2",
    before: "I sometimes have dinner",
    after: ".",
    answers: [...timeExpressions],
  },
  {
    id: "t3",
    before: "I never study English",
    after: ".",
    answers: [...timeExpressions],
  },
  {
    id: "t4",
    before: "I usually see my family",
    after: ".",
    answers: [...timeExpressions],
  },
] as const;

export const ericaText =
  "My friend Erica has lots of good habits: She doesn't take the bus or the train to work in the morning, she walks or cycles. She doesn't drink tea or coffee, she drinks water. She doesn't eat chocolate or cakes and often has salad for lunch. She goes to the gym every day. She always sees a show at the weekend or meets friends for dinner.";

export const tinaText =
  "My friend Tina has lots of bad habits: She eats chocolate every day and drinks a lot of coffee. She even drinks coffee at night! She always watches TV in the evening and goes to bed at 1 o'clock in the morning. She always takes the bus. She doesn't walk or cycle. She's at university, but she never studies.";

/** Ex.5 · rewrite I → she (from the texts) */
export const iToSheGaps = [
  {
    id: "s1",
    before: "I don't take the bus. → She",
    after: ".",
    answers: ["doesn't take the bus", "does not take the bus"],
  },
  {
    id: "s2",
    before: "I walk or cycle. → She",
    after: ".",
    answers: ["walks or cycles"],
  },
  {
    id: "s3",
    before: "I drink water. → She",
    after: ".",
    answers: ["drinks water"],
  },
  {
    id: "s4",
    before: "I go to the gym every day. → She",
    after: ".",
    answers: ["goes to the gym every day"],
  },
  {
    id: "s5",
    before: "I eat chocolate every day. → She",
    after: ".",
    answers: ["eats chocolate every day"],
  },
  {
    id: "s6",
    before: "I always watch TV in the evening. → She",
    after: ".",
    answers: ["always watches TV in the evening"],
  },
  {
    id: "s7",
    before: "I never study. → She",
    after: ".",
    answers: ["never studies"],
  },
] as const;

export const heSheGrammarExamples = [
  { id: "e1", text: "He *gets up* early." },
  { id: "e2", text: "She *works* at home." },
  { id: "e3", text: "It *starts* at nine." },
  { id: "e4", text: "He *doesn't have* dinner at home." },
  { id: "e5", text: "She *doesn't work* every day." },
  { id: "e6", text: "It *doesn't leave* at 6 o'clock." },
] as const;

/** Ex.8 · complete with the correct form */
export const heSheGaps = [
  {
    id: "g1",
    before: "Carla",
    after: "to work every day.",
    answers: ["doesn't cycle", "does not cycle"],
  },
  {
    id: "g2",
    before: "She sometimes",
    after: "the bus.",
    answers: ["takes"],
  },
  {
    id: "g3",
    before: "Ethan",
    after: "coffee in the morning.",
    answers: ["drinks"],
  },
  {
    id: "g4",
    before: "He",
    after: "tea.",
    answers: ["doesn't drink", "does not drink"],
  },
  {
    id: "g5",
    before: "Ahmed",
    after: "TV every evening.",
    answers: ["watches"],
  },
  {
    id: "g6",
    before: "He",
    after: "to the gym.",
    answers: ["doesn't go", "does not go"],
  },
  {
    id: "g7",
    before: "Yuriko",
    after: "English at night.",
    answers: ["studies"],
  },
  {
    id: "g8",
    before: "She",
    after: "late.",
    answers: ["doesn't finish", "does not finish"],
  },
  {
    id: "g9",
    before: "Claudia",
    after: "to work by car.",
    answers: ["doesn't drive", "does not drive"],
  },
  {
    id: "g10",
    before: "She",
    after: "to work.",
    answers: ["walks"],
  },
] as const;

/**
 * Ex.7 · -s ending sound.
 * /s/: puts, starts, walks, wears? wears=/z/; walks=/s/; puts=/s/; starts=/s/
 * /z/: arrives, goes, studies, wears, uses?
 * /ɪz/: finishes, watches, uses
 *
 * Standard: arrives /z/, finishes /ɪz/, goes /z/, puts /s/, starts /s/,
 * studies /z/, uses /ɪz/, walks /s/, watches /ɪz/, wears /z/
 */
export const endingSoundItems = [
  { id: "arrives", prompt: "arrives", options: ["/s/", "/z/", "/ɪz/"], answer: "/z/" },
  { id: "finishes", prompt: "finishes", options: ["/s/", "/z/", "/ɪz/"], answer: "/ɪz/" },
  { id: "goes", prompt: "goes", options: ["/s/", "/z/", "/ɪz/"], answer: "/z/" },
  { id: "puts", prompt: "puts", options: ["/s/", "/z/", "/ɪz/"], answer: "/s/" },
  { id: "starts", prompt: "starts", options: ["/s/", "/z/", "/ɪz/"], answer: "/s/" },
  { id: "studies", prompt: "studies", options: ["/s/", "/z/", "/ɪz/"], answer: "/z/" },
  { id: "uses", prompt: "uses", options: ["/s/", "/z/", "/ɪz/"], answer: "/ɪz/" },
  { id: "walks", prompt: "walks", options: ["/s/", "/z/", "/ɪz/"], answer: "/s/" },
  { id: "watches", prompt: "watches", options: ["/s/", "/z/", "/ɪz/"], answer: "/ɪz/" },
  { id: "wears", prompt: "wears", options: ["/s/", "/z/", "/ɪz/"], answer: "/z/" },
] as const;

export const habitSpeakPrompts = [
  "Choose a friend or family member. Tell your teacher three good habits.",
  "Tell your teacher three bad habits for the same person.",
  "Use he or she + -s / doesn't + verb.",
] as const;

/** Extra video · third person singular (he / she + -s). */
export const VIDEO_ID = "1mKeXz5Bf7c";

export const videoQuiz = [
  {
    id: "v1",
    prompt: "Where does his mother work?",
    options: [
      "at a shop in the mall",
      "at a university",
      "at home",
    ],
    correctAnswer: "at a shop in the mall",
  },
  {
    id: "v2",
    prompt: "Who does her brother call every week?",
    options: ["his friends", "their mom", "his teacher"],
    correctAnswer: "their mom",
  },
  {
    id: "v3",
    prompt: "What sport does her daughter play?",
    options: ["football", "tennis", "volleyball"],
    correctAnswer: "volleyball",
  },
  {
    id: "v4",
    prompt: "What does Brad Pitt play in the movie?",
    options: ["a teacher", "a policeman", "a student"],
    correctAnswer: "a policeman",
  },
] as const;

