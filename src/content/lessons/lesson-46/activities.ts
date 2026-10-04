/** Lesson 46 — Jobs around the house (Unit 6B)
 * Images: public/images/lesson46/
 * Audio: public/sounds/Unit_6/RM_A1_SB_U6_R*.mp3
 *
 * Goal: ask and answer about things people often do.
 * Grammar: Present Simple questions he/she/it (Does…?).
 * Vocabulary: jobs around the house.
 */

export const SOUND_U6 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_6/RM_A1_SB_U6_R${r}.mp3`;

export const IMG46 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson46/${file}`;

/** Ex.1a · match pictures A–H → phrase numbers 1–8 */
export const chorePhotoMatch = [
  {
    id: "A",
    file: "chore-a-cook.png",
    alt: "A young man cooks dinner on the stove",
    answer: "2",
  },
  {
    id: "B",
    file: "chore-b-beds.png",
    alt: "A woman makes the beds",
    answer: "5",
  },
  {
    id: "C",
    file: "chore-c-bathroom.png",
    alt: "A man cleans the bathroom sink",
    answer: "1",
  },
  {
    id: "D",
    file: "chore-d-feed-dog.png",
    alt: "A woman feeds a small dog",
    answer: "3",
  },
  {
    id: "E",
    file: "chore-e-dishes.png",
    alt: "A man washes the dishes",
    answer: "8",
  },
  {
    id: "F",
    file: "chore-f-walk-dog.png",
    alt: "A woman walks the dog in the park",
    answer: "6",
  },
  {
    id: "G",
    file: "chore-g-washing.png",
    alt: "A woman does the washing at a washing machine",
    answer: "7",
  },
  {
    id: "H",
    file: "chore-h-supermarket.png",
    alt: "A young man goes to the supermarket with a trolley",
    answer: "4",
  },
] as const;

export const choreMatchPhrases = [
  { value: "1", label: "clean the bathroom" },
  { value: "2", label: "cook dinner" },
  { value: "3", label: "feed the dog" },
  { value: "4", label: "go to the supermarket" },
  { value: "5", label: "make the beds" },
  { value: "6", label: "walk the dog" },
  { value: "7", label: "do the washing" },
  { value: "8", label: "wash the dishes" },
] as const;

/** Ex.2 · who does which jobs (from the pictures) */
export const peopleJobs = [
  {
    id: "thomas",
    name: "Thomas",
    file: "chore-c-bathroom.png",
    model: "Thomas cleans the bathroom and washes the dishes.",
  },
  {
    id: "masaru",
    name: "Masaru",
    file: "chore-a-cook.png",
    model: "Masaru cooks dinner and goes to the supermarket.",
  },
  {
    id: "isabella",
    name: "Isabella",
    file: "chore-b-beds.png",
    model: "Isabella makes the beds and does the washing.",
  },
  {
    id: "milada",
    name: "Milada",
    file: "chore-d-feed-dog.png",
    model: "Milada feeds the dog and walks the dog.",
  },
] as const;

/** Ex.3 · complete the phrases with verbs from 1a */
export const collocationGaps = [
  {
    id: "c1",
    before: "",
    after: "the bath / the toilet / the house",
    answers: ["clean"],
  },
  {
    id: "c2",
    before: "",
    after: "chicken / fish / dinner",
    answers: ["cook"],
  },
  {
    id: "c3",
    before: "",
    after: "the children / the dog",
    answers: ["feed"],
  },
  {
    id: "c4",
    before: "",
    after: "the car / the cups / the dishes",
    answers: ["wash"],
  },
] as const;

/**
 * Ex.4a · Who does the jobs? Albert or Bella
 * (Roadmap A1 · Unit 6B · Recording 5)
 */
export const albertBellaJobs = [
  {
    id: "ab1",
    prompt: "cleans the bathroom",
    options: ["Albert", "Bella"],
    correctAnswer: "Bella",
  },
  {
    id: "ab2",
    prompt: "cooks dinner",
    options: ["Albert", "Bella"],
    correctAnswer: "Bella",
  },
  {
    id: "ab3",
    prompt: "washes the dishes",
    options: ["Albert", "Bella"],
    correctAnswer: "Bella",
  },
  {
    id: "ab4",
    prompt: "does the washing",
    options: ["Albert", "Bella"],
    correctAnswer: "Albert",
  },
  {
    id: "ab5",
    prompt: "walks the dog",
    options: ["Albert", "Bella"],
    correctAnswer: "Albert",
  },
] as const;

/** 1b · 6.4 — listen and repeat (housework phrases) */
export const choreR4Transcript = [
  "1. clean the bathroom",
  "2. cook dinner",
  "3. feed the dog",
  "4. go to the supermarket",
  "5. make the beds",
  "6. walk the dog",
  "7. do the washing",
  "8. wash the dishes",
] as const;

/** 4a · 6.5 — Melina & Bella about Albert */
export const albertBellaR5Transcript = [
  "M = Melina · B = Bella",
  "M: Do you live with your family, Bella?",
  "B: Well, yes, I live with my brother, Albert.",
  "M: Not good?",
  "B: It’s OK, but he doesn’t help around the house. He never cleans the bathroom. I always clean it.",
  "M: Ah, OK. Well, does he cook dinner?",
  "B: Umm, no, no he doesn’t. I cook dinner.",
  "M: OK, but does he wash the dishes?",
  "B: No, he doesn’t, I do that.",
  "M: What does Albert do? Does he do the washing? Or do you wash his clothes?",
  "B: No, I don’t! He does the washing. And he walks the dog. He loves the dog.",
] as const;

/** 6 · 6.6 — strong and weak does */
export const doesR6Transcript = [
  "1. A: Does she clean the bathroom?  B: Yes, she does.",
  "2. A: When does he go to the supermarket?  B: On Saturdays.",
  "3. A: What jobs around the house does he do?  B: He makes the beds.",
] as const;

/** Ex.4b · complete the questions (Do / does) */
export const listenQuestionGaps = [
  {
    id: "q1",
    before: "",
    after: "you live with your family, Bella?",
    answers: ["Do"],
  },
  {
    id: "q2",
    before: "Well,",
    after: "he cook dinner?",
    answers: ["does"],
  },
  {
    id: "q3",
    before: "OK, but",
    after: "he wash the dishes?",
    answers: ["does"],
  },
  {
    id: "q4",
    before: "What",
    after: "Albert do?",
    answers: ["does"],
  },
  {
    id: "q5",
    before: "Or",
    after: "you wash his clothes?",
    answers: ["do"],
  },
] as const;

/** Ex.5 · Present simple questions: he / she / it */
export const doesGrammarGaps = [
  {
    id: "g1",
    before: "",
    after: "she clean the bathroom?",
    answers: ["Does"],
  },
  {
    id: "g2",
    before: "Yes, she",
    after: ".",
    answers: ["does"],
  },
  {
    id: "g3",
    before: "No, she",
    after: ".",
    answers: ["doesn't", "does not"],
  },
  {
    id: "g4",
    before: "What jobs",
    after: "he do around the house?",
    answers: ["does"],
  },
  {
    id: "g5",
    before: "Where",
    after: "he walk the dog?",
    answers: ["does"],
  },
  {
    id: "g6",
    before: "When",
    after: "she do the washing?",
    answers: ["does"],
  },
  {
    id: "g7",
    before: "Who",
    after: "he live with?",
    answers: ["does"],
  },
  {
    id: "g8",
    before: "How often",
    after: "she cook dinner?",
    answers: ["does"],
  },
] as const;

/** Ex.7 · Nicholas & Chloe dialogue · choose the correct form */
export const chloeDialogueChoices = [
  {
    id: "d1",
    before: "",
    after: "you walk him every day?",
    options: ["Do", "Does"],
    answer: "Do",
  },
  {
    id: "d2",
    before: "Do you",
    after: "him every day?",
    options: ["walk", "walks"],
    answer: "walk",
  },
  {
    id: "d3",
    before: "My dad usually",
    after: "him in the morning.",
    options: ["walk", "walks"],
    answer: "walks",
  },
  {
    id: "d4",
    before: "Where",
    after: "he walk the dog?",
    options: ["do", "does"],
    answer: "does",
  },
  {
    id: "d5",
    before: "He",
    after: "to the park.",
    options: ["go", "goes"],
    answer: "goes",
  },
  {
    id: "d6",
    before: "What time",
    after: "Ronaldo have dinner?",
    options: ["do", "does"],
    answer: "does",
  },
] as const;

/** Ex.8a · make questions from prompts */
export const questionPrompts = [
  {
    id: "p1",
    scramble: "Where / your friend / live",
    parts: ["Where", "does", "your", "friend", "live?"],
    answer: "Where does your friend live?",
  },
  {
    id: "p2",
    scramble: "your friend / live / in a house or a flat",
    parts: ["Does", "your", "friend", "live", "in", "a", "house", "or", "a", "flat?"],
    answer: "Does your friend live in a house or a flat?",
  },
  {
    id: "p3",
    scramble: "Who / your friend / live with",
    parts: ["Who", "does", "your", "friend", "live", "with?"],
    answer: "Who does your friend live with?",
  },
  {
    id: "p4",
    scramble: "Where / your friend / work",
    parts: ["Where", "does", "your", "friend", "work?"],
    answer: "Where does your friend work?",
  },
  {
    id: "p5",
    scramble: "your friend / have / a dog",
    parts: ["Does", "your", "friend", "have", "a", "dog?"],
    answer: "Does your friend have a dog?",
  },
  {
    id: "p6",
    scramble: "How often / you / talk to / your friend",
    parts: ["How", "often", "do", "you", "talk", "to", "your", "friend?"],
    answer: "How often do you talk to your friend?",
  },
] as const;

export const houseworkSpeakPrompts = [
  "Ask your teacher: Does he/she cook dinner?",
  "Ask: Who cleans the bathroom in your family?",
  "Ask: How often does he/she walk the dog / do the washing?",
  "Tell your teacher two jobs you do around the house.",
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
