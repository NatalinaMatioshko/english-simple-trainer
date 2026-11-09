/** Lesson 53 — How was it? (Unit 7C)
 * Images: public/images/lesson53/ (Ex.5a photos A–C)
 * Audio: tracks 12–14 (adjectives · three conversations · was / were questions)
 *
 * Transcripts R12–R13: automatic speech recognition (Whisper small.en), DRAFT —
 * not yet checked by ear. R14 follows the printed dialogues in Ex.7a.
 *
 * Order: review L52 (ordinals · was / were) → 1 adjectives → 2 listen and repeat →
 * 3 complete → 4 your sentences → 5 listening → 6 grammar → 7 pronunciation →
 * 8 choose → 9 questions → 10 prepare → 11 speak.
 */

export const AUDIO53 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_7/RM_A1_SB_U7_R${track}.mp3`;

export const IMG53 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson53/${file}`;

/** Accept each answer with or without a final question mark. */
export function withQuestionMark(answers: readonly string[]): string[] {
  return answers.flatMap((a) => [a, `${a}?`]);
}

/* ------------------------------------------------------------------ */
/* Review · copied from Lesson 52 (independent copy)                   */
/* ------------------------------------------------------------------ */

/** L52 Ex.3a word box (as printed) */
export const reviewOrdinalBox = [
  "eleventh",
  "fifth",
  "fifteenth",
  "first",
  "fourth",
  "fourteenth",
  "second",
  "third",
  "thirteenth",
  "thirtieth",
  "thirty-first",
  "twelfth",
  "twentieth",
  "twenty-first",
  "twenty-fourth",
  "twenty-second",
  "twenty-third",
] as const;

export const reviewOrdinals = [
  { id: "a", number: "1", answer: "first" },
  { id: "b", number: "2", answer: "second" },
  { id: "c", number: "3", answer: "third" },
  { id: "d", number: "4", answer: "fourth" },
  { id: "e", number: "5", answer: "fifth" },
  { id: "f", number: "11", answer: "eleventh" },
  { id: "g", number: "12", answer: "twelfth" },
  { id: "h", number: "13", answer: "thirteenth" },
  { id: "i", number: "14", answer: "fourteenth" },
  { id: "j", number: "15", answer: "fifteenth" },
  { id: "k", number: "20", answer: "twentieth" },
  { id: "l", number: "21", answer: "twenty-first" },
  { id: "m", number: "22", answer: "twenty-second" },
  { id: "n", number: "23", answer: "twenty-third" },
  { id: "o", number: "24", answer: "twenty-fourth" },
  { id: "p", number: "30", answer: "thirtieth" },
  { id: "q", number: "31", answer: "thirty-first" },
] as const;

/** L52 Ex.8 */
export const reviewChooseWasWere = [
  { id: "c1", before: "My birthday party", after: "on 12th March.", options: ["was", "were"], answer: "was" },
  { id: "c2", before: "There", after: "a big party near the hotel last week.", options: ["was", "were"], answer: "was" },
  { id: "c3", before: "Our holiday", after: "from 7th July to 15th July.", options: ["was", "were"], answer: "was" },
  { id: "c4", before: "There", after: "six people on the train.", options: ["was", "were"], answer: "were" },
  { id: "c5", before: "The restaurants", after: "busy.", options: ["wasn’t", "weren’t"], answer: "weren’t" },
  { id: "c6", before: "The plane tickets", after: "really cheap.", options: ["was", "were"], answer: "were" },
  { id: "c7", before: "Norma and Shelley", after: "at the party yesterday.", options: ["was", "were"], answer: "were" },
  { id: "c8", before: "There", after: "a big cake in the living room.", options: ["was", "were"], answer: "was" },
] as const;

/* ------------------------------------------------------------------ */
/* 1–4 · Adjectives                                                    */
/* ------------------------------------------------------------------ */

/** Ex.1 · adjectives 1–8 → opposites (book key: 1c 2h 3a 4f 5b 6g 7e 8d) */
export const adjectiveItems = [
  { id: "1", prompt: "cold", answer: "hot" },
  { id: "2", prompt: "dark", answer: "light" },
  { id: "3", prompt: "difficult", answer: "easy" },
  { id: "4", prompt: "fast", answer: "slow" },
  { id: "5", prompt: "happy", answer: "sad" },
  { id: "6", prompt: "high", answer: "low" },
  { id: "7", prompt: "long", answer: "short" },
  { id: "8", prompt: "old", answer: "young" },
] as const;

/** Word box in the printed a–h order */
export const oppositeWords = ["easy", "sad", "hot", "young", "short", "slow", "low", "light"] as const;

/** Ex.2 · R12 order (auto transcription, draft): pairs 1–8 as in Ex.1 */
export const adjectivePairs = [
  ["cold", "hot"],
  ["dark", "light"],
  ["difficult", "easy"],
  ["fast", "slow"],
  ["happy", "sad"],
  ["high", "low"],
  ["long", "short"],
  ["old", "young"],
] as const;

export const adjectivePairSentences = adjectivePairs.map(([a, b], i) => ({
  id: `p${i + 1}`,
  text: `${a} · ${b}`,
  highlight: [a, b],
}));

export const adjectivesTranscript = adjectivePairs.map(
  ([a, b], i) => `${i + 1} ${a} · ${b}`,
);

/** All 16 words from Ex.1 (select options for Ex.3) */
export const allAdjectives = adjectivePairs.flat().sort();

/** Ex.3 · complete the sentences with words from Exercise 1 */
export const completeAdjectives = [
  { id: "s1", before: "In December, I don’t have lunch in the park. It’s", after: ".", answer: "cold" },
  { id: "s2", before: "A: Has that building got a lift? B: Yes! The building is very", after: ".", answer: "high" },
  { id: "s3", before: "It’s her ninety-seventh birthday today. She’s", after: ".", answer: "old" },
  {
    id: "s4",
    before: "Don’t take the bus. It’s",
    after: ". It arrives at 9. Take the train. It arrives at 8.30.",
    answer: "slow",
  },
  { id: "s5", before: "This book is", after: ". The words are long.", answer: "difficult" },
  { id: "s6", before: "There aren’t any lights here. It’s really", after: "at night.", answer: "dark" },
  {
    id: "s7",
    before: "My daughter hasn’t got homework this week. She’s really",
    after: ".",
    answer: "happy",
  },
  { id: "s8", before: "It’s a", after: "film. It’s only an hour!", answer: "short" },
] as const;

/** Ex.4 · the words not used in Ex.3 */
export const otherAdjectives = allAdjectives.filter(
  (w) => !completeAdjectives.some((s) => s.answer === w),
);

export const similarSentencesList = [
  {
    id: "sim",
    label: `Use: ${otherAdjectives.join(" · ")}`,
    example: "In August, I have lunch in the park. It’s hot.",
    slots: 6,
  },
] as const;

export const similarSentencesPrompts = [
  "Прочитай учителю свої речення.",
] as const;

export const similarSentencesModels = [
  "In June, it’s light at 10 p.m. · My son is ten. He’s young. · The lift isn’t working. I’m sad.",
] as const;

/* ------------------------------------------------------------------ */
/* 5 · Listening · three conversations (R13)                           */
/* ------------------------------------------------------------------ */

/** Ex.5a · photos A–C → conversations 1–3 */
export const conversationPhotos = [
  {
    id: "A",
    file: "listen-a-mountain.png",
    alt: "Two people with backpacks look at a high snowy mountain",
    answer: "2",
  },
  {
    id: "B",
    file: "listen-b-meeting.png",
    alt: "People at a table with laptops in a meeting",
    answer: "1",
  },
  {
    id: "C",
    file: "listen-c-train.png",
    alt: "A lot of hands holding the bars in a busy train",
    answer: "3",
  },
] as const;

export const conversationOptions = [
  { value: "1", label: "Conversation 1" },
  { value: "2", label: "Conversation 2" },
  { value: "3", label: "Conversation 3" },
] as const;

/** R13 · auto transcription, DRAFT (not checked by ear). Name in 3 is unclear. */
export const conversationsTranscript = [
  "1 A: How was work? B: It was OK. A: Was there a meeting today? B: Yes. About the new computers. A: Was it a good meeting? B: No, it wasn’t. It was long. A: Were there cakes? B: Yes, there were.",
  "2 A: How was the mountain? B: It was OK. A: Was it difficult? B: Yes, it was. It was really high! A: Were you cold? B: Yes, we were.",
  "3 A: How was the train, [ім’я нерозбірливе]? B: It was bad. A: Was it busy? B: Yes, it was. And it was slow! A: Why? B: The train was really old.",
] as const;

/** Ex.5b · keys from R13 draft transcript */
export const listenAlternatives = [
  { id: "l1a", before: "Conversation 1 · The meeting today was about new", after: ".", options: ["computers", "phones"], answer: "computers" },
  { id: "l1b", before: "Conversation 1 · It was a", after: "meeting.", options: ["difficult", "long"], answer: "long" },
  { id: "l2a", before: "Conversation 2 · The mountain was really", after: ".", options: ["high", "short"], answer: "high" },
  { id: "l2b", before: "Conversation 2 · They were", after: ".", options: ["slow", "cold"], answer: "cold" },
  { id: "l3a", before: "Conversation 3 · The train was", after: ".", options: ["dark", "busy"], answer: "busy" },
  { id: "l3b", before: "Conversation 3 · It was really slow and", after: ".", options: ["hot", "old"], answer: "old" },
] as const;

/* ------------------------------------------------------------------ */
/* 6 · Grammar · was / were questions                                  */
/* ------------------------------------------------------------------ */

export const grammarQuestionGaps = [
  {
    id: "g1",
    before: "",
    after: "he / she / it OK? — Yes, he / she / it was. / No, he / she / it wasn’t.",
    options: ["Was", "Were"],
    answer: "Was",
  },
  {
    id: "g2",
    before: "Were you cold? — Yes, I was. / No, I",
    after: ".",
    options: ["weren’t", "wasn’t"],
    answer: "wasn’t",
  },
  { id: "g3", before: "Where", after: "they?", options: ["was", "were"], answer: "were" },
  { id: "g4", before: "How much", after: "it?", options: ["was", "were"], answer: "was" },
  {
    id: "g5",
    before: "Was there a meeting? — Yes, there",
    after: ". / No, there wasn’t.",
    options: ["was", "wasn’t"],
    answer: "was",
  },
  {
    id: "g6",
    before: "",
    after: "there a lot of people? — Yes, there were. / No, there weren’t.",
    options: ["Was", "Were"],
    answer: "Were",
  },
] as const;

/* ------------------------------------------------------------------ */
/* 7 · Pronunciation · was / were (R14 = printed dialogues)            */
/* ------------------------------------------------------------------ */

export const wasWereDialogueSentences = [
  { id: "d1a", text: "Was the hotel good?", highlight: ["Was"] },
  { id: "d1b", text: "Yes, it was. It was great.", highlight: ["was"] },
  { id: "d2a", text: "Were they expensive?", highlight: ["Were"] },
  { id: "d2b", text: "Yes, they were. They were about £50.", highlight: ["were"] },
  { id: "d3a", text: "Were there drinks?", highlight: ["Were"] },
  { id: "d3b", text: "Yes, there were. There were cups of tea and coffee.", highlight: ["were"] },
  { id: "d4a", text: "Was there a restaurant?", highlight: ["Was"] },
  { id: "d4b", text: "Yes, there was. It was really good.", highlight: ["was"] },
];

export const wasWereTranscript = [
  "1 A: Was the hotel good? B: Yes, it was. It was great.",
  "2 A: Were they expensive? B: Yes, they were. They were about £50.",
  "3 A: Were there drinks? B: Yes, there were. There were cups of tea and coffee.",
  "4 A: Was there a restaurant? B: Yes, there was. It was really good.",
] as const;

/* ------------------------------------------------------------------ */
/* 8 · Hank and Donna                                                  */
/* ------------------------------------------------------------------ */

export const hankDonnaGaps = [
  { id: "h1", before: "Hank: How", after: "your weekend?", options: ["was", "were"], answer: "was" },
  {
    id: "h2",
    before: "Donna: Great. It",
    after: "my dad’s sixtieth birthday party on Saturday night.",
    options: ["was", "were"],
    answer: "was",
  },
  { id: "h3", before: "Hank:", after: "it good? — Donna: Yes, it was.", options: ["Was", "Were"], answer: "Was" },
  { id: "h4", before: "Hank: Where", after: "the party?", options: ["was", "were"], answer: "was" },
  { id: "h5", before: "Donna: It", after: "in the restaurant near the park.", options: ["was", "were"], answer: "was" },
  {
    id: "h6",
    before: "Hank: How many people",
    after: "there? — Donna: About 50.",
    options: ["was", "were"],
    answer: "were",
  },
  { id: "h7", before: "Hank: Wow!", after: "there a cake?", options: ["Was", "Were"], answer: "Was" },
  {
    id: "h8",
    before: "Donna: No, there",
    after: ". Dad doesn’t like it!",
    options: ["wasn’t", "weren’t"],
    answer: "wasn’t",
  },
] as const;

export const hankDonnaPrompts = [
  "Прочитай діалог з учителем. Ти — Donna.",
  "Now change: you are Hank.",
] as const;

/* ------------------------------------------------------------------ */
/* 9 · Make questions                                                  */
/* ------------------------------------------------------------------ */

export const makeQuestions = [
  { id: "q1", prompt: "your last test / easy or difficult?", answers: ["Was your last test easy or difficult"] },
  { id: "q2", prompt: "you / at home / on Saturday night?", answers: ["Were you at home on Saturday night"] },
  {
    id: "q3",
    prompt: "you / at 10.00 p.m. last night?",
    answers: [
      "Where were you at 10.00 p.m. last night",
      "Where were you at 10 p.m. last night",
      "Where were you at 10.00 pm last night",
      "Where were you at 10 pm last night",
    ],
  },
  {
    id: "q4",
    prompt: "there / a swimming pool / at your school?",
    answers: ["Was there a swimming pool at your school"],
  },
  { id: "q5", prompt: "it / cold / this morning?", answers: ["Was it cold this morning"] },
  {
    id: "q6",
    prompt: "your favourite / class at school?",
    answers: ["What was your favourite class at school"],
  },
] as const;

export const askAnswerPrompts = [
  "Задай учителю шість питань з вправи 9a.",
  "Тепер учитель питає тебе. Дай коротку відповідь і ще одне речення.",
] as const;

export const askAnswerModels = [
  "A: Was your last test easy or difficult?",
  "B: It was difficult.",
] as const;

/* ------------------------------------------------------------------ */
/* 10–11 · Speaking · past events                                      */
/* ------------------------------------------------------------------ */

export const pastEventNotes = [
  { id: "day", label: "Your day — good or bad? · where? · who with?", placeholder: "good or bad? · where? · who with?", slots: 3 },
  {
    id: "weekend",
    label: "Your weekend — good or bad? · where? · who with?",
    placeholder: "good or bad? · where? · who with?",
    slots: 3,
  },
  {
    id: "holiday",
    label: "Your holiday — good or bad? · where? · who with?",
    placeholder: "good or bad? · where? · who with?",
    slots: 3,
  },
] as const;

export const teacherQuestionsList = [
  {
    id: "qs",
    label: "Питання учителю про день / вихідні / відпустку",
    example: "How was your holiday? · Was it hot? · Was it expensive?",
    slots: 5,
  },
] as const;

export const pastEventsPrompts = [
  "Запитай учителя про день, вихідні й відпустку. Використай питання з вправи 10b.",
  "Тепер учитель питає тебе. Відповідай з нотатками з вправи 10a.",
] as const;

export const pastEventsModels = [
  "A: How was your holiday? B: It was great. I was in Spain. A: Was it hot? B: Yes, it was. A: Was it expensive? B: No, it wasn’t. It was cheap.",
  "How was your weekend? — It was good. I was at home with my family.",
] as const;

/* ------------------------------------------------------------------ */
/* HW53                                                                */
/* ------------------------------------------------------------------ */

/** Write the opposite — context decides the word. */
export const hwOpposites = [
  { id: "o1", before: "This test isn’t difficult. It’s", after: ".", answer: "easy" },
  { id: "o2", before: "The room isn’t dark. It’s", after: ".", answer: "light" },
  { id: "o3", before: "My grandad isn’t young. He’s", after: ".", answer: "old" },
  { id: "o4", before: "The film wasn’t long. It was", after: ".", answer: "short" },
  { id: "o5", before: "The bus isn’t fast. It’s", after: ".", answer: "slow" },
  { id: "o6", before: "The soup wasn’t hot. It was", after: ".", answer: "cold" },
  { id: "o7", before: "She isn’t sad today. She’s", after: ".", answer: "happy" },
  { id: "o8", before: "The chairs aren’t high. They’re", after: ".", answer: "low" },
] as const;

/** Mini-dialogues — the second line decides was / wasn’t / were / weren’t. */
export const hwMiniDialogues = [
  {
    id: "m1",
    before: "A:",
    after: "the concert good? B: Yes, it was. The music was great.",
    options: ["Was", "Were"],
    answer: "Was",
  },
  {
    id: "m2",
    before: "A: Were your parents at home? B: No, they",
    after: ". They were at the cinema.",
    options: ["was", "wasn’t", "were", "weren’t"],
    answer: "weren’t",
  },
  {
    id: "m3",
    before: "A:",
    after: "there many people on the bus? B: Yes, there were. It was very busy.",
    options: ["Was", "Were"],
    answer: "Were",
  },
  {
    id: "m4",
    before: "A: Was the restaurant expensive? B: No, it",
    after: ". It was cheap.",
    options: ["was", "wasn’t", "were", "weren’t"],
    answer: "wasn’t",
  },
  {
    id: "m5",
    before: "A: Where",
    after: "you on Saturday? B: I was at my friend’s house.",
    options: ["was", "were"],
    answer: "were",
  },
  {
    id: "m6",
    before: "A: Was there a lift in the hotel? B: Yes, there",
    after: ". Our room was on the tenth floor.",
    options: ["was", "wasn’t", "were", "weren’t"],
    answer: "was",
  },
  {
    id: "m7",
    before: "A:",
    after: "the shops open on Sunday? B: No, they weren’t. It was a holiday.",
    options: ["Was", "Were"],
    answer: "Were",
  },
  {
    id: "m8",
    before: "A: Were there any cakes at the meeting? B: No, there",
    after: ". There was only coffee.",
    options: ["was", "wasn’t", "were", "weren’t"],
    answer: "weren’t",
  },
] as const;

export const hwQuestions = [
  { id: "hq1", prompt: "your weekend / good?", answers: ["Was your weekend good"] },
  { id: "hq2", prompt: "you / at work / on Monday?", answers: ["Were you at work on Monday"] },
  { id: "hq3", prompt: "the weather / hot / yesterday?", answers: ["Was the weather hot yesterday"] },
  {
    id: "hq4",
    prompt: "there / a lot of people / at the party?",
    answers: ["Were there a lot of people at the party"],
  },
  { id: "hq5", prompt: "where / you / last Saturday?", answers: ["Where were you last Saturday"] },
  { id: "hq6", prompt: "how much / the tickets?", answers: ["How much were the tickets"] },
  {
    id: "hq7",
    prompt: "what / your favourite film / last year?",
    answers: ["What was your favourite film last year"],
  },
] as const;
