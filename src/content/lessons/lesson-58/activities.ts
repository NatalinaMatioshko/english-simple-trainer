/** Roadmap A1 Unit 8 files already used by lessons 55–57. */
export const AUDIO58 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_8/RM_A1_SB_U8_R${track}.mp3`;

/**
 * Listening on this page, from the lesson notes (not scored keys):
 * 8.8 holiday phrases · 8.9 Megan, then the holiday questions ·
 * 8.10 did you linking · 8.15 greeting conversations · 8.16 useful phrases.
 */

const GREETING_REPLIES = [
  "I'm OK, thank you",
  "I'm not bad, thanks",
  "I'm great, thanks",
  "I'm very well, thank you",
  "I'm fine, thanks",
  "I'm good, thank you",
  "OK, thank you",
  "not bad, thanks",
  "great, thanks",
  "very well, thank you",
  "fine, thanks",
  "good, thank you",
];

/** Phrases from the Useful phrases box. Several answers are correct. */
export function greetingReplies(): string[] {
  return GREETING_REPLIES.flatMap((line) => [
    line,
    `${line}. And you?`,
    `${line}, and you?`,
  ]);
}

export const helloPhrases = [
  "Good morning",
  "Hello",
  "Hi",
  "Good afternoon",
  "Good evening",
];

export const goodbyePhrases = ["Bye", "Goodbye", "See you", "See you later"];

export const photoMatch = [
  { id: "A", prompt: "Photo A", answer: "have a good time" },
  { id: "B", prompt: "Photo B", answer: "relax" },
  { id: "C", prompt: "Photo C", answer: "go shopping" },
  { id: "D", prompt: "Photo D", answer: "visit a museum" },
  { id: "E", prompt: "Photo E", answer: "stay in a hotel" },
  { id: "F", prompt: "Photo F", answer: "go for a walk" },
  { id: "G", prompt: "Photo G", answer: "go to restaurants" },
  { id: "H", prompt: "Photo H", answer: "swim in the sea" },
];

export const photoMatchWords = [
  "visit a museum",
  "go for a walk",
  "have a good time",
  "swim in the sea",
  "go shopping",
  "stay in a hotel",
  "relax",
  "go to restaurants",
];

export const greeceText =
  "We had a good time in Greece last month. Sometimes we relaxed at the beach and swam in the sea. Some days we were very busy — we visited museums, we went to a restaurant for lunch or dinner or we went shopping. One day we went for a nice walk outside the city. It was very hot! We stayed in a good hotel — it was called The Lux.";

/** Past Simple verbs in `greeceText`, shown in bold on the lesson page. */
export const greecePastVerbs = [
  "had",
  "relaxed",
  "swam",
  "were",
  "visited",
  "went",
  "was",
  "stayed",
];

export const presentForms = [
  {
    id: "had",
    before: "had →",
    after: "",
    answers: ["have"],
    example: "We had a good time in Greece last month.",
  },
  {
    id: "relaxed",
    before: "relaxed →",
    after: "",
    answers: ["relax"],
    example: "Sometimes we relaxed at the beach.",
  },
  {
    id: "swam",
    before: "swam →",
    after: "",
    answers: ["swim"],
    example: "We swam in the sea.",
  },
  {
    id: "were",
    before: "were →",
    after: "",
    answers: ["are", "be"],
    example: "Some days we were very busy.",
  },
  {
    id: "visited",
    before: "visited →",
    after: "",
    answers: ["visit"],
    example: "We visited museums.",
  },
  {
    id: "went",
    before: "went →",
    after: "",
    answers: ["go"],
    example: "We went to a restaurant.",
  },
  {
    id: "stayed",
    before: "stayed →",
    after: "",
    answers: ["stay"],
    example: "We stayed in a good hotel.",
  },
  {
    id: "was",
    before: "was →",
    after: "",
    answers: ["is", "be"],
    example: "It was very hot!",
  },
];

export const irregularTicks = [
  { id: "had", label: "had", correct: true },
  { id: "relaxed", label: "relaxed", correct: false },
  { id: "swam", label: "swam", correct: true },
  { id: "were", label: "were", correct: true },
  { id: "visited", label: "visited", correct: false },
  { id: "went", label: "went", correct: true },
  { id: "stayed", label: "stayed", correct: false },
  { id: "was", label: "was", correct: true },
];

export const grammarGaps = [
  {
    id: "weekend",
    before: "",
    after: "you have a good weekend?",
    answers: ["Did"],
  },
  {
    id: "fun",
    before: "",
    after: "they have fun?",
    answers: ["Did"],
  },
  {
    id: "where",
    before: "Where",
    after: "Emily go?",
    answers: ["did"],
  },
  {
    id: "when",
    before: "When",
    after: "she visit Tokyo?",
    answers: ["did"],
  },
  {
    id: "how",
    before: "How",
    after: "you get there?",
    answers: ["did"],
  },
  {
    id: "what",
    before: "What",
    after: "you do?",
    answers: ["did"],
  },
];

export const madeQuestions = [
  {
    id: "q1",
    prompt: "you / have a good weekend?",
    answers: ["Did you have a good weekend?"],
  },
  {
    id: "q2",
    prompt: "what time / you get up / on Saturday?",
    answers: ["What time did you get up on Saturday?"],
  },
  {
    id: "q3",
    prompt: "where / you go?",
    answers: ["Where did you go?"],
  },
  {
    id: "q4",
    prompt: "who / you go with?",
    answers: ["Who did you go with?"],
  },
  {
    id: "q5",
    prompt: "where / you have lunch / on Sunday?",
    answers: ["Where did you have lunch on Sunday?"],
  },
  {
    id: "q6",
    prompt: "what / you eat?",
    answers: ["What did you eat?"],
  },
  {
    id: "q7",
    prompt: "what / do / in the evening?",
    answers: ["What did you do in the evening?"],
  },
  {
    id: "q8",
    prompt: "you / study English?",
    answers: ["Did you study English?"],
  },
  {
    id: "q9",
    prompt: "your best friend / text you?",
    answers: ["Did your best friend text you?"],
  },
];

export const holidayQuestions = [
  {
    id: "where",
    prompt: "Where?",
    answers: ["Where did you go?", "Where did you go on holiday?"],
  },
  {
    id: "when",
    prompt: "When?",
    answers: ["When did you go?", "When did you go there?"],
  },
  {
    id: "how",
    prompt: "How / get there?",
    answers: ["How did you get there?"],
  },
  {
    id: "who",
    prompt: "Who / go with?",
    answers: ["Who did you go with?"],
  },
  {
    id: "food",
    prompt: "What food / eat?",
    answers: ["What food did you eat?"],
  },
  {
    id: "do",
    prompt: "What / do?",
    answers: ["What did you do?"],
  },
];

export const linkedQuestions = [
  "Did you have a good holiday?",
  "Where did you go?",
  "What did you do?",
  "Who did you go with?",
  "Did you have lunch there?",
  "When did you leave?",
];

/**
 * Unit 8 Recording 8. Spoken phrase list (not the photo order).
 * Wording is what RM_A1_SB_U8_R8.mp3 says.
 */
export const holidayPhraseTranscript = [
  "Go for a walk.",
  "Go shopping.",
  "Go to restaurants.",
  "Have a good time.",
  "Relax.",
  "Stay in a hotel.",
  "Swim in the sea.",
  "Visit a museum.",
] as const;

/**
 * Unit 8 Recording 9. Megan’s holiday. Same file on 3a and 3b.
 * Wording is what RM_A1_SB_U8_R9.mp3 says. He interrupts the hotel name.
 */
export const meganTranscript = [
  "Interviewer: Hey, did you have a nice holiday, Megan?",
  "Megan: Yes, we had a really good time. We went to the south of France.",
  "Interviewer: Oh, that's great! How did you get there? Did you fly?",
  "Megan: No, we took the train. It was amazing!",
  "Interviewer: Wow! And what did you do there?",
  "Megan: Well, we relaxed. We went shopping. We visited a museum.",
  "Interviewer: Wow! Was the weather good?",
  "Megan: The weather was great. We went to the beach every day and Josh swam in the sea every day. Oh, and we ate in amazing restaurants.",
  "Interviewer: Uh-huh. And who's Josh?",
  "Megan: He's a friend. He's my boyfriend. And we went for walks in the evening.",
  "Interviewer: Right.",
  "Megan: And we stayed in this lovely hotel. It was called.",
  "Interviewer: Wow, is that the time? I have a meeting, Megan. See you later.",
  "Megan: Oh, OK. Bye.",
] as const;

/** Unit 8 Recording 10. The six questions, with the numbers the speaker says. */
export const linkedTranscript = [
  "1. Did you have a good holiday?",
  "2. Where did you go?",
  "3. What did you do?",
  "4. Who did you go with?",
  "5. Did you have lunch there?",
  "6. When did you leave?",
] as const;

/**
 * Unit 8 Recording 15. Two greetings. Names are the ones in the file
 * (not the Simon/Magda and Cassie/Jun gap-fill).
 */
export const greetTranscript = [
  "1",
  "Sarah: Hi, Mike.",
  "Mike: Hi, Sarah. How are you?",
  "Sarah: Fine, thanks. And you?",
  "Mike: Great, thanks. How was your weekend?",
  "Sarah: Good. I studied for the test all day on Saturday and in the evening I went to a restaurant with friends. How about you?",
  "Mike: I studied for that too. And I watched the football with my dad.",
  "Sarah: Sounds good. See you later.",
  "Mike: Yes, see you.",
  "2",
  "Duncan: Good morning, Erica.",
  "Erica: Good morning, Duncan.",
  "Duncan: How are things?",
  "Erica: Fine, thank you. And you?",
  "Duncan: I'm very well, thank you. Did you have a good weekend?",
  "Erica: Yes, thanks. I went to the park with my family. How about you?",
  "Duncan: I went to the cinema.",
  "Erica: What did you see?",
  "Duncan: The Difficult Mountain.",
  "Erica: Was it good?",
  "Duncan: Yes, it was.",
  "Erica: Great. Oh, well, I'm a bit late for a meeting. Goodbye, Duncan.",
] as const;

/** Unit 8 Recording 16. Useful phrases, with the headings the speaker says. */
export const phrasesTranscript = [
  "Useful phrases",
  "Starting a conversation",
  "Hello, Mike.",
  "Hi, Mike.",
  "Good morning, Erika.",
  "Good afternoon, Erika.",
  "Good evening, Erika.",
  "Questions for greetings",
  "How are you?",
  "How are things?",
  "Are you OK?",
  "Answers for greetings",
  "I'm OK, thank you. And you?",
  "I'm not bad, thanks. And you?",
  "I'm great, thanks. And you?",
  "I'm very well, thank you. And you?",
  "I'm fine, thanks. And you?",
  "I'm good, thank you. And you?",
  "Ending a conversation",
  "Goodbye.",
  "Bye.",
  "See you.",
  "See you later.",
] as const;
