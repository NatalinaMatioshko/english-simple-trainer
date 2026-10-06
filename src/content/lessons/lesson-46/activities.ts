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

/** HW46 · picture → English phrase flashcards */
export const chorePhotoFlashcards = chorePhotoMatch.map((pic) => {
  const phrase =
    choreMatchPhrases.find((p) => p.value === pic.answer)?.label ?? "";
  return {
    id: pic.id,
    file: pic.file,
    alt: pic.alt,
    phrase,
    speak: phrase,
  };
});

/** HW46 · household chores poster · picture → English phrase */
export const posterChoreMatch = [
  {
    id: "1",
    file: "poster-make-the-bed.png",
    alt: "A boy makes the bed",
    answer: "make the bed",
  },
  {
    id: "2",
    file: "poster-do-the-laundry.png",
    alt: "A man does the laundry at a washing machine",
    answer: "do the laundry",
  },
  {
    id: "3",
    file: "poster-do-the-dishes.png",
    alt: "A woman washes a plate at the sink",
    answer: "do the dishes",
  },
  {
    id: "4",
    file: "poster-do-the-ironing.png",
    alt: "A woman irons clothes on an ironing board",
    answer: "do the ironing",
  },
  {
    id: "5",
    file: "poster-fold-the-laundry.png",
    alt: "A man folds a t-shirt",
    answer: "fold the laundry",
  },
  {
    id: "6",
    file: "poster-vacuum.png",
    alt: "A boy vacuums the floor",
    answer: "vacuum",
  },
  {
    id: "7",
    file: "poster-hang-out-the-clothes.png",
    alt: "A girl hangs clothes on a clothesline",
    answer: "hang out the clothes",
  },
  {
    id: "8",
    file: "poster-take-out-the-rubbish.png",
    alt: "A boy takes out the rubbish to a recycling bin",
    answer: "take out the rubbish",
  },
  {
    id: "9",
    file: "poster-water-the-plants.png",
    alt: "A boy waters a plant with a watering can",
    answer: "water the plants",
  },
  {
    id: "10",
    file: "poster-mop-the-floor.png",
    alt: "A woman mops the floor",
    answer: "mop the floor",
  },
  {
    id: "11",
    file: "poster-sweep-the-floor.png",
    alt: "Two children sweep the floor with brooms",
    answer: "sweep the floor",
  },
  {
    id: "12",
    file: "poster-mow-the-lawn.png",
    alt: "A man mows the lawn",
    answer: "mow the lawn",
  },
  {
    id: "13",
    file: "poster-feed-the-dog.png",
    alt: "A boy feeds a dog",
    answer: "feed the dog",
  },
  {
    id: "14",
    file: "poster-rake-the-leaves.png",
    alt: "A boy rakes autumn leaves",
    answer: "rake the leaves",
  },
  {
    id: "15",
    file: "poster-dust-the-furniture.png",
    alt: "A boy dusts a dresser with a duster",
    answer: "dust the furniture",
  },
] as const;

export const posterChorePhrases = [
  { value: "make the bed", label: "make the bed" },
  { value: "do the laundry", label: "do the laundry" },
  { value: "do the dishes", label: "do the dishes" },
  { value: "do the ironing", label: "do the ironing" },
  { value: "fold the laundry", label: "fold the laundry" },
  { value: "vacuum", label: "vacuum" },
  { value: "hang out the clothes", label: "hang out the clothes" },
  { value: "take out the rubbish", label: "take out the rubbish" },
  { value: "water the plants", label: "water the plants" },
  { value: "mop the floor", label: "mop the floor" },
  { value: "sweep the floor", label: "sweep the floor" },
  { value: "mow the lawn", label: "mow the lawn" },
  { value: "feed the dog", label: "feed the dog" },
  { value: "rake the leaves", label: "rake the leaves" },
  { value: "dust the furniture", label: "dust the furniture" },
] as const;

/** HW46 · poster picture → English phrase flashcards */
export const posterChoreFlashcards = posterChoreMatch.map((pic) => ({
  id: pic.id,
  file: pic.file,
  alt: pic.alt,
  phrase: pic.answer,
  speak: pic.answer,
}));

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
 * HW46 · go / make / do + articles (a / the / —)
 * Short learner note + interactive practice.
 */
export const goMakeDoArticleNotes = [
  {
    label: "do the + chore",
    text: "do the laundry, do the dishes, do the ironing, do the washing — the = звичайна домашня робота (відома справа), не “a laundry”.",
  },
  {
    label: "a / an",
    text: "один / якийсь: make a coffee, wash a plate. Порівняй: wash a plate vs do the dishes (увесь посуд).",
  },
  {
    label: "Фіксовані фрази",
    text: "go shopping (часто без артикля —), make coffee / make the bed, vacuum, mop the floor, take out the rubbish.",
  },
] as const;

/** Options for article gaps: a / the / no article */
export const goMakeDoArticleOptions = ["a", "the", "—"] as const;

/** Choose a / the / — (no article) */
export const goMakeDoArticleGaps = [
  {
    id: "art1",
    before: "I do",
    after: "laundry on Sundays.",
    answer: "the",
    tipUa: "звичайна домашня робота → do the laundry",
  },
  {
    id: "art2",
    before: "She does",
    after: "dishes after dinner.",
    answer: "the",
    tipUa: "увесь посуд як робота → do the dishes",
  },
  {
    id: "art3",
    before: "He makes",
    after: "bed every morning.",
    answer: "the",
    tipUa: "фіксована фраза → make the bed",
  },
  {
    id: "art4",
    before: "Can you make",
    after: "coffee, please?",
    answer: "—",
    tipUa: "часто без артикля → make coffee",
  },
  {
    id: "art5",
    before: "I’d like",
    after: "coffee, please.",
    answer: "a",
    tipUa: "одна порція / один напій → a coffee",
  },
  {
    id: "art6",
    before: "We go",
    after: "shopping at the weekend.",
    answer: "—",
    tipUa: "go shopping — без артикля",
  },
  {
    id: "art7",
    before: "Please mop",
    after: "floor.",
    answer: "the",
    tipUa: "конкретна підлога в домі → the floor",
  },
  {
    id: "art8",
    before: "Wash",
    after: "plate for the baby.",
    answer: "a",
    tipUa: "одна тарілка → a plate (не do the dishes)",
  },
  {
    id: "art9",
    before: "Can you take out",
    after: "rubbish?",
    answer: "the",
    tipUa: "сміття як звичайна робота → take out the rubbish",
  },
  {
    id: "art10",
    before: "Mum does",
    after: "ironing in the evening.",
    answer: "the",
    tipUa: "звичайна робота → do the ironing",
  },
] as const;

/** Complete with go / make / do */
export const goMakeDoVerbGaps = [
  {
    id: "gmd1",
    before: "",
    after: "shopping",
    answers: ["go"],
  },
  {
    id: "gmd2",
    before: "",
    after: "coffee",
    answers: ["make"],
  },
  {
    id: "gmd3",
    before: "",
    after: "the bed",
    answers: ["make"],
  },
  {
    id: "gmd4",
    before: "",
    after: "the laundry",
    answers: ["do"],
  },
  {
    id: "gmd5",
    before: "",
    after: "the dishes",
    answers: ["do"],
  },
  {
    id: "gmd6",
    before: "",
    after: "the ironing",
    answers: ["do"],
  },
  {
    id: "gmd7",
    before: "",
    after: "the washing",
    answers: ["do"],
  },
] as const;

/** Choose the correct housework phrase */
export const goMakeDoChoose = [
  {
    id: "ch1",
    prompt: "I need clean clothes.",
    options: ["go shopping", "do the laundry", "make coffee"],
    answer: "do the laundry",
  },
  {
    id: "ch2",
    prompt: "The kitchen sink is full of plates.",
    options: ["do the dishes", "make the bed", "go shopping"],
    answer: "do the dishes",
  },
  {
    id: "ch3",
    prompt: "The bed is messy.",
    options: ["do the bed", "make the bed", "go the bed"],
    answer: "make the bed",
  },
  {
    id: "ch4",
    prompt: "We need food from the shops.",
    options: ["do shopping", "make shopping", "go shopping"],
    answer: "go shopping",
  },
  {
    id: "ch5",
    prompt: "Would you like a hot drink?",
    options: ["make coffee", "do coffee", "go coffee"],
    answer: "make coffee",
  },
  {
    id: "ch6",
    prompt: "The floor is dirty.",
    options: ["mop the floor", "make the floor", "do the floor"],
    answer: "mop the floor",
  },
  {
    id: "ch7",
    prompt: "The bin is full.",
    options: [
      "take out the rubbish",
      "make the rubbish",
      "do the rubbish",
    ],
    answer: "take out the rubbish",
  },
  {
    id: "ch8",
    prompt: "There is dust on the carpet.",
    options: ["vacuum", "make vacuum", "do vacuum"],
    answer: "vacuum",
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
