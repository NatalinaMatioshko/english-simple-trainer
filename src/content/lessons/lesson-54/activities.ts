/** Lesson 54 — English in action · Buy travel tickets (Unit 7D)
 * Images: public/images/lesson54/ — board and tickets drawn as SVG from the SB page;
 * trains-to-heathrow.png is the user's asset.
 * Audio: tracks 15–17 (Jeff · useful phrases · Helena)
 *
 * Transcripts R15–R17: automatic speech recognition (Whisper small.en), DRAFT —
 * not checked by ear. Speaker labels are inferred from the text.
 * Times, platforms and prices agree with the printed board and tickets.
 *
 * Ex.5 (Student A p.157 / Student B p.158) is not included: pages not provided.
 *
 * Order: review L53 (opposites · questions) → 1 board → 2 Jeff and his ticket →
 * 3 useful phrases → 4 Helena → practise.
 */

export const AUDIO54 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_7/RM_A1_SB_U7_R${track}.mp3`;

export const IMG54 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson54/${file}`;

/** Accept each answer with or without a final question mark. */
export function withQuestionMark(answers: readonly string[]): string[] {
  return answers.flatMap((a) => [a, `${a}?`]);
}

/* ------------------------------------------------------------------ */
/* Review · copied from Lesson 53 (independent copy)                   */
/* ------------------------------------------------------------------ */

/** L53 Ex.1 */
export const reviewOpposites = [
  { id: "1", prompt: "cold", answer: "hot" },
  { id: "2", prompt: "dark", answer: "light" },
  { id: "3", prompt: "difficult", answer: "easy" },
  { id: "4", prompt: "fast", answer: "slow" },
  { id: "5", prompt: "happy", answer: "sad" },
  { id: "6", prompt: "high", answer: "low" },
  { id: "7", prompt: "long", answer: "short" },
  { id: "8", prompt: "old", answer: "young" },
] as const;

export const reviewOppositeWords = ["easy", "sad", "hot", "young", "short", "slow", "low", "light"] as const;

/** L53 Ex.9a */
export const reviewQuestions = [
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

/* ------------------------------------------------------------------ */
/* 1 · Information board                                               */
/* ------------------------------------------------------------------ */

export const BOARD_ALT =
  "Departure board, Welcome to Paddington Station. " +
  "Train 1: 9.13, Cardiff, platform 3, arrives 10.25. " +
  "Train 2: 9.17, Oxford, platform 2, arrives 10.05. " +
  "Train 3: 9.20, Bath, platform 7, arrives 12.15. " +
  "Train 4: 9.25, Heathrow, platform 5, arrives 10.25. " +
  "Train 5: 9.30, Bath, platform 7, arrives 10.55. " +
  "Train 6: 9.45, Swansea, platform 1, arrives 12.25. " +
  "Train 7: 9.53, Heathrow, platform 5, arrives 10.15.";

export const POSTER_ALT = "Poster: Trains to Heathrow. Single: £15. Return: £27.50.";

export const boardPrompts = [
  "Look at the information board. What information can you see?",
] as const;

export const boardModels = [
  "The time the train leaves · the platform · where it goes · the time it arrives.",
] as const;

/* ------------------------------------------------------------------ */
/* 2 · Jeff buys a ticket (R15)                                        */
/* ------------------------------------------------------------------ */

export const jeffTranscript = [
  "1 Jeff: Excuse me. What time is the next train to Bath, please?",
  "2 Assistant: The next train leaves at 9.20. It’s a slow train.",
  "3 Jeff: What time does it arrive in Bath?",
  "4 Assistant: It arrives at 12.15. The fast train leaves at 9.30 and arrives at 10.55.",
  "5 Jeff: OK. A ticket for the fast train to Bath, please.",
  "6 Assistant: Is that a single or a return?",
  "7 Jeff: A return, please.",
  "8 Assistant: OK. That’s £68.20, please.",
  "9 Jeff: Thank you. Which platform is the fast train to Bath, please?",
  "10 Assistant: It leaves from Platform 7.",
  "11 Jeff: Thank you.",
] as const;

/** Ex.2a · key from R15 draft: fast train 9.30 → 10.55 */
export const trainOptions = ["Train 1", "Train 2", "Train 3", "Train 4", "Train 5", "Train 6", "Train 7"];

/** Ex.2b · key from R15 draft: a return, £68.20 */
export const tickets = [
  { id: "A", file: "ticket-a.svg", alt: "Ticket A: return, £68.20" },
  { id: "B", file: "ticket-b.svg", alt: "Ticket B: single, £16.80" },
  { id: "C", file: "ticket-c.svg", alt: "Ticket C: return, £107.00" },
  { id: "D", file: "ticket-d.svg", alt: "Ticket D: single, £15" },
] as const;

/* ------------------------------------------------------------------ */
/* 3 · Useful phrases (printed box)                                    */
/* ------------------------------------------------------------------ */

export const customerPhrases = [
  "A ticket (for the fast train) to (Bath), please.",
  "What time is the next train to (Bath), please?",
  "What time does it arrive in (Bath)?",
  "Which platform is the (fast) train to (Bath), please?",
  "How much is a ticket to (Bath), please?",
] as const;

export const assistantPhrases = [
  "Is that a single or a return?",
  "The next train leaves at (9.20).",
  "It arrives at (12.15).",
  "It leaves from platform (7).",
  "That’s (£68.20), please.",
] as const;

/** Ex.3a · the one sentence the speakers do not use (R15 draft) */
export const NOT_USED_PHRASE = "How much is a ticket to (Bath), please?";

/** Ex.3a · order heard in R15 (draft) */
export const heardOrder = [
  { id: "h1", text: "What time is the next train to (Bath), please?", order: 1 },
  { id: "h2", text: "The next train leaves at (9.20).", order: 2 },
  { id: "h3", text: "What time does it arrive in (Bath)?", order: 3 },
  { id: "h4", text: "It arrives at (12.15).", order: 4 },
  { id: "h5", text: "A ticket (for the fast train) to (Bath), please.", order: 5 },
  { id: "h6", text: "Is that a single or a return?", order: 6 },
  { id: "h7", text: "That’s (£68.20), please.", order: 7 },
  { id: "h8", text: "Which platform is the (fast) train to (Bath), please?", order: 8 },
  { id: "h9", text: "It leaves from platform (7).", order: 9 },
];

export const phrasesTranscript = [
  "Customer",
  "A ticket for the fast train to Bath, please.",
  "What time is the next train to Bath, please?",
  "What time does it arrive in Bath?",
  "Which platform is the fast train to Bath, please?",
  "How much is a ticket to Bath, please?",
  "Assistant",
  "Is that a single or a return?",
  "The next train leaves at 9.20.",
  "It arrives at 12.15.",
  "It leaves from Platform 7.",
  "That’s £68.20, please.",
] as const;

/* ------------------------------------------------------------------ */
/* 4 · Helena (R17)                                                    */
/* ------------------------------------------------------------------ */

/** Ex.4a · printed prompts */
export const helenaPrompts = [
  "Helena: (next train time?)",
  "Assistant: (answer)",
  "Helena: (when arrive at Heathrow?)",
  "Assistant: (answer, give information about fast train)",
  "Helena: (ask for ticket)",
  "Assistant: (single or return?)",
  "Helena: (single)",
  "Assistant: (say the price)",
  "Helena: (say thank you; platform for fast train?)",
  "Assistant: (answer)",
  "Helena: (say thank you)",
] as const;

/** R17 · auto transcription, DRAFT */
export const helenaModels = [
  "Excuse me. What time is the next train to Heathrow, please?",
  "The next train leaves at 9.25. It’s a slow train.",
  "What time does it arrive at Heathrow?",
  "It arrives at 10.25. The fast train leaves at 9.53 and arrives at 10.15.",
  "OK. A ticket for the fast train to Heathrow, please.",
  "Is that a single or a return?",
  "A single, please.",
  "OK. That’s £15, please.",
  "Thank you. Which platform is the fast train to Heathrow, please?",
  "It leaves from Platform 5.",
  "Thank you.",
] as const;

export const helenaTranscript = helenaModels.map(
  (line, i) => `${i + 1} ${i % 2 === 0 ? "Helena" : "Assistant"}: ${line}`,
);

export const practisePrompts = [
  "Practise the conversation with your teacher. You are Helena.",
  "Now change: you are the assistant.",
] as const;

/* ------------------------------------------------------------------ */
/* HW54 · new tasks, not copies of the lesson exercises                */
/* ------------------------------------------------------------------ */

/** Read the board — trains and facts the lesson audio does not use. */
export const hwBoardGaps = [
  { id: "b1", before: "The Oxford train leaves at", after: ".", answers: ["9.17", "9:17"] },
  { id: "b2", before: "The Cardiff train leaves from platform", after: ".", answers: ["3", "three"] },
  { id: "b3", before: "The 9.45 train goes to", after: ".", answers: ["Swansea"] },
  { id: "b4", before: "The Swansea train arrives at", after: ".", answers: ["12.25", "12:25"] },
  { id: "b5", before: "The Oxford train arrives at", after: ".", answers: ["10.05", "10:05"] },
  { id: "b6", before: "The Cardiff train arrives at", after: ".", answers: ["10.25", "10:25"] },
  { id: "b7", before: "The Swansea train leaves from platform", after: ".", answers: ["1", "one"] },
  { id: "b8", before: "The train at platform 2 goes to", after: ".", answers: ["Oxford"] },
] as const;

export const hwDialogueOptions = [
  "arrive",
  "arrives",
  "How much",
  "leaves",
  "platform",
  "return",
  "single",
  "ticket",
] as const;

/** A new conversation: a ticket to Oxford. The price is made up for this task. */
export const hwDialogueGaps = [
  {
    id: "d1",
    before: "Customer: What time is the next train to Oxford, please? Assistant: The next train",
    after: "at 9.17.",
    answer: "leaves",
  },
  { id: "d2", before: "Customer: What time does it", after: "in Oxford?", answer: "arrive" },
  { id: "d3", before: "Assistant: It", after: "at 10.05.", answer: "arrives" },
  { id: "d4", before: "Customer: A", after: "to Oxford, please.", answer: "ticket" },
  { id: "d5", before: "Assistant: Is that a", after: "or a return?", answer: "single" },
  { id: "d6", before: "Customer: I want to come back today, so a", after: ", please.", answer: "return" },
  {
    id: "d7",
    before: "Customer:",
    after: "is a ticket to Oxford, please? Assistant: It’s £24.50.",
    answer: "How much",
  },
  {
    id: "d8",
    before: "Customer: Which",
    after: "is the train to Oxford, please? Assistant: It leaves from platform 2.",
    answer: "platform",
  },
] as const;

/** Accept a customer’s request with or without “please” and with or without “?”. */
function withPlease(answer: string): string[] {
  return withQuestionMark([answer, `${answer}, please`, `${answer} please`]);
}

/** Prompts → sentences. `hint` is the sentence shown after a wrong answer. */
export const hwQuestions = [
  {
    id: "q1",
    prompt: "what time / next train / Cardiff?",
    answers: withPlease("What time is the next train to Cardiff"),
    hint: "What time is the next train to Cardiff, please?",
  },
  {
    id: "q2",
    prompt: "what time / it / arrive / Swansea?",
    answers: withPlease("What time does it arrive in Swansea"),
    hint: "What time does it arrive in Swansea?",
  },
  {
    id: "q3",
    prompt: "which platform / train / Oxford?",
    answers: withPlease("Which platform is the train to Oxford"),
    hint: "Which platform is the train to Oxford, please?",
  },
  {
    id: "q4",
    prompt: "how much / a ticket / Cardiff?",
    answers: withPlease("How much is a ticket to Cardiff"),
    hint: "How much is a ticket to Cardiff, please?",
  },
  {
    id: "q5",
    prompt: "that / a single or a return?",
    answers: withQuestionMark(["Is that a single or a return"]),
    hint: "Is that a single or a return?",
  },
  {
    id: "q6",
    prompt: "a ticket / fast train / Swansea",
    answers: withPlease("A ticket for the fast train to Swansea"),
    hint: "A ticket for the fast train to Swansea, please.",
  },
] as const;
