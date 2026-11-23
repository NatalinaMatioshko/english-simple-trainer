/** Roadmap A1 Unit 9 files already in public/sounds/Unit_9. */
export const AUDIO59 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_9/RM_A1_SB_U9_R${track}.mp3`;

/**
 * Listening on this page:
 * 9.1 preposition sentences · 9.2 Tony and Camilla · 9.3 weak object pronouns.
 */

export const placePhotoMatch = [
  { id: "A", answer: "The bag is on the table." },
  { id: "B", answer: "The flowers are in the bag." },
  { id: "C", answer: "The man is at the hotel." },
  { id: "D", answer: "The bag is next to the chair." },
  { id: "E", answer: "The picture is above the table." },
  { id: "F", answer: "The table is below the picture." },
  { id: "G", answer: "The clock is between the computer and the books." },
  { id: "H", answer: "The cup is in front of the cake." },
  { id: "I", answer: "The cake is behind the cup." },
] as const;

export const placePhotoWords = [
  "The bag is next to the chair.",
  "The bag is on the table.",
  "The cake is behind the cup.",
  "The clock is between the computer and the books.",
  "The cup is in front of the cake.",
  "The flowers are in the bag.",
  "The man is at the hotel.",
  "The picture is above the table.",
  "The table is below the picture.",
];

/**
 * Recording 9.1 — full spoken sentences from RM_A1_SB_U9_R1.mp3 (Whisper medium.en).
 * Announcer "Unit 9. Recording 1." and letter labels A-I omitted; order follows the audio.
 */
export const placeTranscript = [
  "The bag is on the table.",
  "The flowers are in the bag.",
  "The man is at the hotel.",
  "The bag is next to the chair.",
  "The picture is above the table.",
  "The table is below the picture.",
  "The clock is between the computer and the books.",
  "The cup is in front of the cake.",
  "The cake is behind the cup.",
] as const;

/**
 * Recording 9.2 — full spoken dialogue (Whisper from RM_A1_SB_U9_R2.mp3;
 * speaker labels from turn-taking). Announcer “Unit 9. Recording 2.” omitted.
 */
export const familyTranscript = [
  "Camilla: Is that a photo of your family, Tony?",
  "Tony: Yes. This is us at our home in Thanet.",
  "Camilla: Great! So, who were the people in the photo?",
  "Tony: Well, that's me behind the chair next to my wife, Carol.",
  "Camilla: Yeah, I know that's you!",
  "Tony: And my daughter, Agnes, is between me and my wife in the photo.",
  "Camilla: Your daughter is so lovely.",
  "Tony: Thanks. And in front of us, that's my sister and her family. Her husband and her two sons.",
  "Camilla: Does your sister live in Thanet too?",
  "Tony: No. She lives in Australia. Her husband Pat is Australian.",
  "Camilla: Wow! How often do you see her?",
  "Tony: We visit them once a year. But Pat comes to the UK for work sometimes, so we see him three times a year, maybe.",
] as const;

export const whoSays = [
  {
    id: "a",
    text: "Well, that's me behind the chair, next to my wife, Carol.",
    answer: "T",
  },
  {
    id: "b",
    text: "Yeah, I know that's you!",
    answer: "C",
  },
  {
    id: "c",
    text: "And, in front of us, that's my sister and her family.",
    answer: "T",
  },
  {
    id: "d",
    text: "Wow, how often do you see her?",
    answer: "C",
  },
  {
    id: "e",
    text: "We visit them once a year, but Pat comes to the UK for work sometimes, so we see him three times a year, maybe.",
    answer: "T",
  },
] as const;

export const pronounPeople = [
  { id: "me", before: "me →", after: "", answers: ["Tony"] },
  { id: "you", before: "you →", after: "", answers: ["Tony"] },
  {
    id: "us",
    before: "us →",
    after: "",
    answers: [
      "Tony, Agnes and Carol",
      "Tony, Agnes, and Carol",
      "Tony Agnes and Carol",
      "Tony's family",
      "Tony and Carol",
      "Tony & Carol",
    ],
  },
  {
    id: "her",
    before: "her →",
    after: "",
    answers: ["Tony's sister", "his sister", "Tony sister"],
  },
  {
    id: "them",
    before: "them →",
    after: "",
    answers: [
      "Tony's sister and her family",
      "his sister and her family",
      "sister and her family",
    ],
  },
  { id: "him", before: "him →", after: "", answers: ["Pat"] },
] as const;

export const grammarRules = [
  {
    id: "subject",
    before: "Use subject pronouns",
    after: "the verb: I live in London.",
    options: ["before", "after"],
    answer: "before",
  },
  {
    id: "object",
    before: "Use object pronouns",
    after: "the verb: My parents visit me at the weekend.",
    options: ["before", "after"],
    answer: "after",
  },
] as const;

/** Recording 9.3 — object pronouns are usually weak / unstressed. */
export const stressTranscript = [
  "Do you often visit them?",
  "Who's next to him?",
  "He works with her.",
] as const;

export const stressItems = [
  {
    id: "s1",
    prompt: "Do you often visit them?",
    options: ["stressed", "unstressed"],
    answer: "unstressed",
  },
  {
    id: "s2",
    prompt: "Who's next to him?",
    options: ["stressed", "unstressed"],
    answer: "unstressed",
  },
  {
    id: "s3",
    prompt: "He works with her.",
    options: ["stressed", "unstressed"],
    answer: "unstressed",
  },
] as const;

export const dialogueGaps = [
  {
    id: "d1",
    before: "Miguel:",
    after: "live in Acapulco in Mexico.",
    options: ["They", "Them"],
    answer: "They",
  },
  {
    id: "d2",
    before: "Jenna: Wow! Do you often talk to",
    after: "?",
    options: ["they", "them"],
    answer: "them",
  },
  {
    id: "d3",
    before: "Miguel:",
    after: "often talk to my mum.",
    options: ["I", "Me"],
    answer: "I",
  },
  {
    id: "d4",
    before: "",
    after: "talk to",
    options: ["I", "Me"],
    answer: "I",
  },
  {
    id: "d5",
    before: "",
    after: "on my computer every weekend.",
    options: ["she", "her"],
    answer: "her",
  },
  {
    id: "d6",
    before: "My dad doesn't like computers, so I don't often talk to",
    after: ".",
    options: ["he", "him"],
    answer: "him",
  },
  {
    id: "d7",
    before: "Miguel: Yeah, I've got a photo of",
    after: "on my phone.",
    options: ["we", "us"],
    answer: "us",
  },
  {
    id: "d8",
    before: "Jenna: Who's this in front of",
    after: "?",
    options: ["him", "he"],
    answer: "him",
  },
  {
    id: "d9",
    before: "Miguel: That's my sister.",
    after: "is a teacher.",
    options: ["She", "Her"],
    answer: "She",
  },
  {
    id: "d10",
    before: "",
    after: "sometimes calls",
    options: ["She", "Her"],
    answer: "She",
  },
  {
    id: "d11",
    before: "",
    after: ",",
    options: ["me", "I"],
    answer: "me",
  },
  {
    id: "d12",
    before: "but",
    after: "usually just send emails.",
    options: ["we", "us"],
    answer: "we",
  },
] as const;

export const speakQuestions = [
  "Do you often talk to your parents?",
  "Do you often send emails to your family?",
  "Do you like family parties?",
  "How often do you visit your grandmother?",
  "Do you always meet your friends at the weekend?",
  "Who always calls you at the weekend?",
] as const;

/** Extra practice — THERE IS / THERE ARE fridge worksheet. */
export const fridgeQuiz = [
  {
    id: "f1",
    prompt: "1. How many eggs are there in the carton?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6",
  },
  {
    id: "f2",
    prompt: "2. Is there a milk bottle in the fridge?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    id: "f3",
    prompt: "3. How many red apples can you count?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
  },
  {
    id: "f4",
    prompt: "4. There is some cheese on the shelf. Yes / No?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    id: "f5",
    prompt: "5. Are there any carrots in the vegetable drawer?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
  {
    id: "f6",
    prompt: "6. How many yogurt pots are there?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6",
  },
  {
    id: "f7",
    prompt: "7. There is a jug of juice on the top shelf. True or False?",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: "f8",
    prompt: "8. How many water bottles are in the door?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    id: "f9",
    prompt: "9. Are there any tomatoes on a shelf?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
  },
  {
    id: "f10",
    prompt: "10. There is a banana on a shelf. Yes / No?",
    options: ["Yes", "No"],
    correctAnswer: "No",
  },
] as const;

/** at vs in phrase cards (front = cue, back = full phrase). */
export const atInCards = [
  { front: "home", back: "at home", speak: "at home" },
  { front: "noon", back: "at noon", speak: "at noon" },
  { front: "the door", back: "at the door", speak: "at the door" },
  { front: "the park", back: "at the park", speak: "at the park" },
  { front: "the corner", back: "at the corner", speak: "at the corner" },
  { front: "school", back: "at school", speak: "at school" },
  { front: "the top", back: "at the top", speak: "at the top" },
  { front: "the end", back: "at the end", speak: "at the end" },
  { front: "bed", back: "in bed", speak: "in bed" },
  { front: "June", back: "in June", speak: "in June" },
  { front: "the room", back: "in the room", speak: "in the room" },
  { front: "summer", back: "in summer", speak: "in summer" },
  { front: "the car", back: "in the car", speak: "in the car" },
  { front: "London", back: "in London", speak: "in London" },
  { front: "the middle", back: "in the middle", speak: "in the middle" },
  { front: "the water", back: "in the water", speak: "in the water" },
] as const;

/** Quick at / in choice practice. */
export const atInPractice = [
  {
    id: "ai1",
    before: "I am",
    after: "home now.",
    options: ["at", "in"],
    answer: "at",
  },
  {
    id: "ai2",
    before: "She is",
    after: "bed.",
    options: ["at", "in"],
    answer: "in",
  },
  {
    id: "ai3",
    before: "We meet",
    after: "noon.",
    options: ["at", "in"],
    answer: "at",
  },
  {
    id: "ai4",
    before: "They live",
    after: "London.",
    options: ["at", "in"],
    answer: "in",
  },
  {
    id: "ai5",
    before: "He is",
    after: "school today.",
    options: ["at", "in"],
    answer: "at",
  },
  {
    id: "ai6",
    before: "We go swimming",
    after: "summer.",
    options: ["at", "in"],
    answer: "in",
  },
] as const;

/** ng digraph words — highlight “ng”, speak whole word. */
export const ngWordSentences = [
  { id: "king", text: "king", highlight: ["ng"] },
  { id: "sing", text: "sing", highlight: ["ng"] },
  { id: "song", text: "song", highlight: ["ng"] },
  { id: "gang", text: "gang", highlight: ["ng"] },
  { id: "lung", text: "lung", highlight: ["ng"] },
  { id: "swing", text: "swing", highlight: ["ng"] },
  { id: "bring", text: "bring", highlight: ["ng"] },
  { id: "ring", text: "ring", highlight: ["ng"] },
  { id: "wing", text: "wing", highlight: ["ng"] },
  { id: "long", text: "long", highlight: ["ng"] },
  { id: "fang", text: "fang", highlight: ["ng"] },
  { id: "rung", text: "rung", highlight: ["ng"] },
  { id: "sting", text: "sting", highlight: ["ng"] },
  { id: "thing", text: "thing", highlight: ["ng"] },
] as const;

/** Prepositions Classroom — 6 MC gaps from the worksheet. */
export const classroomPrepGaps = [
  {
    id: "pc1",
    before: "The book is",
    after: "the desk.",
    options: ["in", "under", "on"],
    answer: "on",
  },
  {
    id: "pc2",
    before: "The pencil is",
    after: "the cup.",
    options: ["on", "next to", "in"],
    answer: "in",
  },
  {
    id: "pc3",
    before: "The bin is",
    after: "the table.",
    options: ["under", "between", "on"],
    answer: "under",
  },
  {
    id: "pc4",
    before: "The bag is",
    after: "the chair.",
    options: ["in front of", "between", "next to"],
    answer: "next to",
  },
  {
    id: "pc5",
    before: "The boy is",
    after: "the board.",
    options: ["behind", "in front of", "between"],
    answer: "in front of",
  },
  {
    id: "pc6",
    before: "The clock is",
    after: "the board.",
    options: ["under", "between", "above"],
    answer: "above",
  },
] as const;

/** Prepositions of place poster — 12 example sentences. */
export const placePosterCards = [
  {
    front: "IN",
    back: "The teddy bear is in the box.",
    speak: "The teddy bear is in the box.",
  },
  {
    front: "ON",
    back: "The apple is on the book.",
    speak: "The apple is on the book.",
  },
  {
    front: "UNDER",
    back: "The ball is under the table.",
    speak: "The ball is under the table.",
  },
  {
    front: "BEHIND",
    back: "The boy is behind the tree.",
    speak: "The boy is behind the tree.",
  },
  {
    front: "IN FRONT OF",
    back: "The dog is in front of the chair.",
    speak: "The dog is in front of the chair.",
  },
  {
    front: "BETWEEN",
    back: "The teddy bear is between the two plants.",
    speak: "The teddy bear is between the two plants.",
  },
  {
    front: "NEXT TO",
    back: "The clock is next to the lamp.",
    speak: "The clock is next to the lamp.",
  },
  {
    front: "NEAR",
    back: "The tree is near the house.",
    speak: "The tree is near the house.",
  },
  {
    front: "FAR FROM",
    back: "The tree is far from the house.",
    speak: "The tree is far from the house.",
  },
  {
    front: "ABOVE",
    back: "The lamp is above the table.",
    speak: "The lamp is above the table.",
  },
  {
    front: "BELOW",
    back: "The cat is below the shelf.",
    speak: "The cat is below the shelf.",
  },
  {
    front: "INSIDE",
    back: "The fish is inside the bowl.",
    speak: "The fish is inside the bowl.",
  },
] as const;
