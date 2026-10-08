/** Lesson 47 — Skills (Unit 6C)
 * Images: public/images/lesson47/
 * Audio: public/sounds/Unit_6/RM_A1_SB_U6_R{13–16}.mp3
 *
 * Goal: ask and answer about things you can and can’t do.
 * Grammar: can / can’t for ability.
 * Vocabulary: skills.
 */

export const SOUND_U6 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_6/RM_A1_SB_U6_R${r}.mp3`;

export const IMG47 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson47/${file}`;

/** Ex.1a · match photos A–L → skill numbers 1–12 */
export const skillPhotoMatch = [
  {
    id: "A",
    file: "skill-a-draw.png",
    alt: "A man draws a portrait on a large canvas",
    answer: "3",
  },
  {
    id: "B",
    file: "skill-b-sleep-train.png",
    alt: "A woman sleeps on a train by the window",
    answer: "10",
  },
  {
    id: "C",
    file: "skill-c-languages.png",
    alt: "People speak in a business meeting",
    answer: "11",
  },
  {
    id: "D",
    file: "skill-d-fly.png",
    alt: "A woman in a plane cockpit",
    answer: "4",
  },
  {
    id: "E",
    file: "skill-e-football.png",
    alt: "Boys play football on a green field",
    answer: "7",
  },
  {
    id: "F",
    file: "skill-f-clothes.png",
    alt: "A woman makes clothes on a sewing machine",
    answer: "6",
  },
  {
    id: "G",
    file: "skill-g-sing.png",
    alt: "A girl sings into a microphone",
    answer: "9",
  },
  {
    id: "H",
    file: "skill-h-website.png",
    alt: "A man draws a website layout on glass",
    answer: "1",
  },
  {
    id: "I",
    file: "skill-i-cake.png",
    alt: "Hands decorate a cake with raspberries",
    answer: "5",
  },
  {
    id: "J",
    file: "skill-j-horse.png",
    alt: "A person rides a brown horse",
    answer: "8",
  },
  {
    id: "K",
    file: "skill-k-swim.png",
    alt: "A swimmer in open water",
    answer: "12",
  },
  {
    id: "L",
    file: "skill-l-dance.png",
    alt: "A man and a woman dance outdoors",
    answer: "2",
  },
] as const;

export const skillMatchPhrases = [
  { value: "1", label: "build a website" },
  { value: "2", label: "dance" },
  { value: "3", label: "draw pictures" },
  { value: "4", label: "fly a plane" },
  { value: "5", label: "make a cake" },
  { value: "6", label: "make clothes" },
  { value: "7", label: "play football" },
  { value: "8", label: "ride a horse" },
  { value: "9", label: "sing" },
  { value: "10", label: "sleep on a train" },
  { value: "11", label: "speak two languages" },
  { value: "12", label: "swim" },
] as const;

/** 1b · 6.13 listen and repeat */
export const skillsR13Transcript = skillMatchPhrases.map(
  (p) => `${p.value}. ${p.label}`,
);

/**
 * 1c · 6.14 — which activities do you hear?
 * SFX: play football, ride a horse, swim, sing, fly a plane, make clothes
 */
export const skillsHeardTicks = [
  { id: "h1", label: "play football", correct: true },
  { id: "h2", label: "ride a horse", correct: true },
  { id: "h3", label: "swim", correct: true },
  { id: "h4", label: "sing", correct: true },
  { id: "h5", label: "fly a plane", correct: true },
  { id: "h6", label: "make clothes", correct: true },
  { id: "h7", label: "build a website", correct: false },
  { id: "h8", label: "sleep on a train", correct: false },
  { id: "h9", label: "draw pictures", correct: false },
  { id: "h10", label: "make a cake", correct: false },
] as const;

/** 2b–2c · Gloria’s skills (ChooseYourJob.com · Recording 15) */
export const gloriaSkillTicks = [
  { id: "g1", label: "use a computer", correct: true },
  { id: "g2", label: "build a website", correct: false },
  { id: "g3", label: "speak two languages", correct: true },
  { id: "g4", label: "drive", correct: false },
  { id: "g5", label: "cook", correct: true },
  { id: "g6", label: "draw", correct: true },
  { id: "g7", label: "sing", correct: true },
  { id: "g8", label: "dance", correct: true },
] as const;

export const gloriaR15Transcript = [
  "G = Gloria · Y = Yusuf",
  "G: What’s that website?",
  "Y: This is ChooseYourJob.com. You answer questions about your skills and it chooses a good job for you.",
  "G: Wow! Ask me the questions.",
  "Y: OK. Can you use a computer?",
  "G: Yes, I can.",
  "Y: OK. Can you build a website?",
  "G: Er, no, I can’t.",
  "Y: Can you speak two languages?",
  "G: Yes, I can. I can speak English and Spanish.",
  "Y: OK. Can you drive?",
  "G: No, I can’t.",
  "Y: Ah. Can you cook?",
  "G: Yes, I can.",
  "Y: What can you cook?",
  "G: Um… I can cook fish. Oh, and chicken!",
  "Y: Hmm. Can you draw?",
  "G: Yes, I can.",
  "Y: Can you sing?",
  "G: Yes, I can.",
  "Y: Can you dance?",
  "G: Yes, I can.",
  "Y: OK. The website says a good job for you is teacher.",
  "G: Wow!",
] as const;

/** Ex.3 · grammar box gaps */
export const canGrammarGaps = [
  {
    id: "cg1",
    before: "I / You / He / She / It / We / They can",
    after: ".",
    answers: ["sing"],
    options: ["sing", "sings"],
  },
  {
    id: "cg2",
    before: "I / You / He / She / It / We / They can’t",
    after: ".",
    answers: ["drive"],
    options: ["drive", "drives"],
  },
  {
    id: "cg3",
    before: "Can you",
    after: "a computer?",
    answers: ["use"],
    options: ["use", "uses"],
  },
  {
    id: "cg4",
    before: "Can he",
    after: "football?",
    answers: ["play"],
    options: ["play", "plays"],
  },
  {
    id: "cg5",
    before: "What can you",
    after: "?",
    answers: ["cook"],
    options: ["cook", "cooks"],
  },
  {
    id: "cg6",
    before: "How many languages can you",
    after: "?",
    answers: ["speak"],
    options: ["speak", "speaks"],
  },
] as const;

/** Ex.4a · can / can’t same or different (6.16) */
export const canSoundPairs = [
  {
    id: "s1",
    a: "I can't speak Spanish, can you?",
    b: "No, I can't.",
    blueA: "can't",
    blueB: "can't",
    answer: "same" as const,
  },
  {
    id: "s2",
    a: "Can you drive?",
    b: "Yes, I can.",
    blueA: "Can",
    blueB: "can",
    answer: "different" as const,
  },
  {
    id: "s3",
    a: "Can he swim?",
    b: "Yes, he can.",
    blueA: "Can",
    blueB: "can",
    answer: "different" as const,
  },
] as const;

export const canR16Transcript = [
  "1. A: I can’t speak Spanish, can you?  B: No, I can’t.",
  "2. A: Can you drive?  B: Yes, I can.",
  "3. A: Can he swim?  B: Yes, he can.",
] as const;

/** Ex.5 · Sara & Rodrigo interview */
export const saraRodrigoChoices = [
  {
    id: "sr1",
    before: "Sara:",
    after: "use a computer?",
    options: ["Can you", "You can"],
    answer: "Can you",
  },
  {
    id: "sr2",
    before: "Rodrigo: Yes,",
    after: ". I use my computer every day.",
    options: ["can", "I can"],
    answer: "I can",
  },
  {
    id: "sr3",
    before: "Sara:",
    after: "build a website?",
    options: ["You can", "Can you"],
    answer: "Can you",
  },
  {
    id: "sr4",
    before: "Rodrigo: Yes,",
    after: ".",
    options: ["I can", "I can build"],
    answer: "I can",
  },
  {
    id: "sr5",
    before: "Sara:",
    after: "speak two languages?",
    options: ["You can", "Can you"],
    answer: "Can you",
  },
  {
    id: "sr6",
    before: "Rodrigo:",
    after: "speak three languages.",
    options: ["Can I", "I can"],
    answer: "I can",
  },
  {
    id: "sr7",
    before: "Sara: What languages",
    after: "speak?",
    options: ["can you", "you can"],
    answer: "can you",
  },
  {
    id: "sr8",
    before: "Rodrigo:",
    after: "speak English, Spanish and Japanese.",
    options: ["I am", "I can"],
    answer: "I can",
  },
  {
    id: "sr9",
    before: "Sara:",
    after: "work at the weekend?",
    options: ["Can you", "Can"],
    answer: "Can you",
  },
  {
    id: "sr10",
    before: "Rodrigo: Yes, I",
    after: ".",
    options: ["can", "can work"],
    answer: "can",
  },
] as const;

/** Ex.6a · model questions for jobs */
export const jobCanModels = [
  {
    job: "taxi driver",
    models: [
      "Can you drive?",
      "Can you speak two languages?",
      "Can you use a computer?",
    ],
  },
  {
    job: "office worker",
    models: [
      "Can you use a computer?",
      "Can you build a website?",
      "Can you speak two languages?",
    ],
  },
  {
    job: "hotel worker",
    models: [
      "Can you speak two languages?",
      "Can you cook?",
      "Can you work at the weekend?",
    ],
  },
] as const;

/** Ex.7 · notebook clubs */
export const clubNotebookGroups = [
  {
    id: "sports",
    title: "Sports club",
    lines: [
      { id: "sp1", placeholder: "Can you run?", preset: "Can you run?" },
      { id: "sp2", placeholder: "Can you…?" },
      { id: "sp3", placeholder: "Can you…?" },
    ],
  },
  {
    id: "food",
    title: "Food club",
    lines: [
      { id: "fd1", placeholder: "Can you…?" },
      { id: "fd2", placeholder: "Can you…?" },
      { id: "fd3", placeholder: "Can you…?" },
    ],
  },
  {
    id: "travel",
    title: "Travel club",
    lines: [
      { id: "tr1", placeholder: "Can you…?" },
      { id: "tr2", placeholder: "Can you…?" },
      { id: "tr3", placeholder: "Can you…?" },
    ],
  },
  {
    id: "computer",
    title: "Computer club",
    lines: [
      { id: "cp1", placeholder: "Can you…?" },
      { id: "cp2", placeholder: "Can you…?" },
      { id: "cp3", placeholder: "Can you…?" },
    ],
  },
] as const;

export const skillSpeakPrompts = [
  "Ask your teacher: Can you swim?",
  "Ask: Can you cook? What can you cook?",
  "Ask: Can you speak two languages?",
  "Tell your teacher three things you can do and two things you can’t do.",
] as const;

/** Extra · ELLLO #9 Beginner Listening Quiz · Subject Pronouns */
export const VIDEO_ID = "o4fIGY9cWVc";

export const videoDiscussPrompts = [
  "Watch again if you need to. Who do you hear — I, you, he, she, we, they?",
  "Tell your teacher three sentences from the video. Use he or she.",
  "Ask your teacher: Who is he? Who is she? What do they do?",
  "Now about you: What can you do? What can’t you do? Tell your teacher.",
] as const;
