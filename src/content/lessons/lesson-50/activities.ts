/** Lesson 50 — English in action · Make requests (Unit 6D)
 * Images: public/images/lesson50/
 * Audio: public/sounds/Unit_6/RM_A1_SB_U6_R{17,18}.mp3
 *
 * Book order: 1 pictures → 2 listen+match → 3 Tom/Ana → 4 phrases+count →
 * 4b repeat → 5a dialogues → 5b practise → 6a situations.
 */

export const SOUND_U6 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_6/RM_A1_SB_U6_R${r}.mp3`;

export const IMG50 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson50/${file}`;

/** Ex.1 · pictures A–F → housework jobs (optional check) */
export const requestPhotoMatch = [
  {
    id: "A",
    file: "req-a-dishes.png",
    alt: "A sink full of dirty dishes, pots and pans",
    answer: "1",
  },
  {
    id: "B",
    file: "req-b-fridge.png",
    alt: "An almost empty fridge with one green apple",
    answer: "2",
  },
  {
    id: "C",
    file: "req-c-dog.png",
    alt: "A dog holding a leash next to red sneakers",
    answer: "3",
  },
  {
    id: "D",
    file: "req-d-laundry.png",
    alt: "A yellow basket overflowing with dirty clothes",
    answer: "4",
  },
  {
    id: "E",
    file: "req-e-bathroom.png",
    alt: "A muddy bathroom with footprints and a dirty tub",
    answer: "5",
  },
  {
    id: "F",
    file: "req-f-bed.png",
    alt: "An unmade bed with a blue checkered blanket",
    answer: "6",
  },
] as const;

export const requestMatchPhrases = [
  { value: "1", label: "wash the dishes" },
  { value: "2", label: "go shopping" },
  { value: "3", label: "walk the dog" },
  { value: "4", label: "do the washing" },
  { value: "5", label: "clean the bathroom" },
  { value: "6", label: "make the bed" },
] as const;

/** Ex.1 · speak: what jobs can you see? */
export const pictureJobsSpeak = [
  "Picture A — what job?",
  "Picture B — what job?",
  "Picture C — what job?",
  "Picture D — what job?",
  "Picture E — what job?",
  "Picture F — what job?",
] as const;

export const pictureJobsModels = [
  "wash the dishes",
  "go shopping / go to the supermarket",
  "walk the dog",
  "do the washing",
  "clean the bathroom",
  "make the bed",
] as const;

/** 6.17 transcript (teacher / optional student reveal) */
export const requestR17Transcript = [
  "1. Look at the dog! — Yeah… — Can you walk him, please? — Sure!",
  "2. Ugh! The bathroom! — Yeah. — Can you clean it? — I’m sorry, I can’t. I’m late! — OK. I can clean it later. — Thank you.",
  "3. Are you busy? — No, not really. — Can you do the washing? — Sure, I can do that.",
  "4. We haven’t got any food. — Can you go to the supermarket? — Sure. — Can I use your bike, please? — I’m sorry, you can’t. It’s at my office. — No problem.",
  "5. My taxi is here. — Can you make the bed, please? — Yes, I can. — See you later. Bye.",
  "6. Can I cook dinner this evening? — Yes, you can. — Great. — Can you wash the dishes? — Sure. No problem.",
] as const;

export const requestR18Transcript = [
  "Making requests: Can I use your bike, please? · Can you walk the dog, please?",
  "Saying yes: Yes, you can. · Yes, I can. · Sure. · No problem.",
  "Saying no: I’m sorry, I can’t. · I’m sorry, you can’t.",
] as const;

/**
 * Ex.2 · Listen 6.17 · match conversations 1–6 → pictures A–F
 * From audio: 1 dog, 2 bathroom, 3 washing, 4 supermarket, 5 bed, 6 dishes
 */
export const listenMatchConversations = [
  {
    id: "lm1",
    prompt: "Conversation 1 → picture",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "C",
  },
  {
    id: "lm2",
    prompt: "Conversation 2 → picture",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "E",
  },
  {
    id: "lm3",
    prompt: "Conversation 3 → picture",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "D",
  },
  {
    id: "lm4",
    prompt: "Conversation 4 → picture",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "B",
  },
  {
    id: "lm5",
    prompt: "Conversation 5 → picture",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "F",
  },
  {
    id: "lm6",
    prompt: "Conversation 6 → picture",
    options: ["A", "B", "C", "D", "E", "F"],
    correctAnswer: "A",
  },
] as const;

/**
 * Ex.3 · Who agrees to do the job? Tom (T) or Ana (A)
 * Keys follow the audio roles as in the Pearson track (requester / person who says yes).
 * Bathroom: nobody says yes to the request — Tom says he will do it later → T.
 */
export const tomAnaWhoAgrees = [
  {
    id: "ta1",
    prompt: "1 · walk the dog — who agrees?",
    options: ["T", "A"],
    correctAnswer: "A",
  },
  {
    id: "ta2",
    prompt: "2 · clean the bathroom — who does it (later)?",
    options: ["T", "A"],
    correctAnswer: "T",
  },
  {
    id: "ta3",
    prompt: "3 · do the washing — who agrees?",
    options: ["T", "A"],
    correctAnswer: "A",
  },
  {
    id: "ta4",
    prompt: "4 · go to the supermarket — who agrees?",
    options: ["T", "A"],
    correctAnswer: "A",
  },
  {
    id: "ta5",
    prompt: "5 · make the bed — who agrees?",
    options: ["T", "A"],
    correctAnswer: "T",
  },
  {
    id: "ta6",
    prompt: "6 · wash the dishes — who agrees?",
    options: ["T", "A"],
    correctAnswer: "T",
  },
] as const;

/** Ex.4a · How many requests? (6× Can you + 2× Can I = 8) */
export const howManyRequestsQuiz = [
  {
    id: "hm1",
    prompt: "How many requests do the speakers make in 6.17?",
    options: ["4", "6", "8", "10"],
    correctAnswer: "8",
  },
  {
    id: "hm2",
    prompt: "How many Can you…? requests?",
    options: ["2", "4", "6", "8"],
    correctAnswer: "6",
  },
  {
    id: "hm3",
    prompt: "How many Can I…? requests?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
] as const;

/** Ex.5a · complete the dialogues */
export const requestDialogueGaps = [
  {
    id: "d1a",
    before: "A: ",
    after: " clean the living room, please?",
    options: ["Can you", "Can I", "I can"],
    answer: "Can you",
  },
  {
    id: "d1b",
    before: "B: ",
    after: ". I can do it now.",
    options: ["Sure", "I’m sorry, I can’t", "I’m sorry, you can’t"],
    answer: "Sure",
  },
  {
    id: "d2a",
    before: "A: ",
    after: " use your computer, please?",
    options: ["Can I", "Can you", "I can"],
    answer: "Can I",
  },
  {
    id: "d2b",
    before: "B: ",
    after: ". It’s on my desk.",
    options: ["Yes, you can", "I’m sorry, you can’t", "I’m sorry, I can’t"],
    answer: "Yes, you can",
  },
  {
    id: "d3a",
    before: "A: ",
    after: " watch TV at 8 o’clock?",
    options: ["Can I", "Can you", "I can"],
    answer: "Can I",
  },
  {
    id: "d3b",
    before: "B: ",
    after: ". I study in the living room from seven to nine.",
    options: ["I’m sorry, you can’t", "Sure", "Yes, I can"],
    answer: "I’m sorry, you can’t",
  },
  {
    id: "d4a",
    before: "A: ",
    after: " cook dinner on Monday, please? I can’t do it.",
    options: ["Can you", "Can I", "Yes, I can"],
    answer: "Can you",
  },
  {
    id: "d4b",
    before: "B: ",
    after: ". I play football on Monday evening.",
    options: ["I’m sorry, I can’t", "Sure", "Yes, you can"],
    answer: "I’m sorry, I can’t",
  },
] as const;

/** Ex.5b · practise dialogues with teacher */
export const practiseDialoguePrompts = [
  "Dialogue 1: You are A. Ask your teacher to clean the living room.",
  "Dialogue 2: You are A. Ask to use the computer.",
  "Dialogue 3: You are A. Ask to watch TV at 8.",
  "Dialogue 4: You are A. Ask your teacher to cook on Monday.",
  "Now swap: you are B. Answer your teacher’s requests.",
] as const;

/** Ex.6a · situations (one student + teacher) */
export const roleplayPrompts = [
  "A teacher and a student",
  "A customer and a café worker",
  "A customer and a shop assistant",
  "Two friends in their flat",
  "An office worker and a manager",
] as const;

export const roleplayModels = [
  "Can you help me with this exercise, please? — Sure.",
  "Can I have some water, please? — Yes, of course.",
  "Can I try this jacket, please? — Sure.",
  "Can you wash the dishes, please? — I’m sorry, I can’t. I’m late.",
  "Can I leave at four today, please? — Yes, you can. / I’m sorry, you can’t today.",
] as const;

/** Final speaking */
export const finalRequestPrompts = [
  "Make 3 Can you…? requests (from the pictures or class).",
  "Make 2 Can I…? requests (permission).",
  "Answer your teacher’s 3 requests: Sure / No problem / I’m sorry, I can’t / I’m sorry, you can’t.",
] as const;

export const finalRequestModels = [
  "Can you walk the dog, please? Can you do the washing, please? Can you wash the dishes, please?",
  "Can I use your bike, please? Can I cook dinner this evening?",
  "Sure. · No problem. · I’m sorry, I can’t. · I’m sorry, you can’t.",
] as const;
