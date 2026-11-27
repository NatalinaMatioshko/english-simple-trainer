/** Roadmap A1 Unit 9 — hobby tracks in public/sounds/Unit_9. */
export const AUDIO60 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_9/RM_A1_SB_U9_R${track}.mp3`;

/**
 * Listening on this page:
 * 9.4 hobby photo phrases · 9.5 phrase check · 9.6 Tania & Kristoff interviews.
 */

/** Recording 9.5 — completed phrases from 2a (listen and check). */
export const hobbyPhraseCheckLines = [
  "watch a play",
  "watch a TV programme",
  "play a game",
  "listen to the radio",
  "read a newspaper",
  "do / play some sport",
  "play a video game",
  "listen to a song",
  "read / listen to a story",
] as const;

export const hobbyPhotoMatch = [
  { id: "A", answer: "listen to music" },
  { id: "B", answer: "do exercise" },
  { id: "C", answer: "read a book" },
  { id: "D", answer: "use the internet" },
  { id: "E", answer: "watch a film" },
  { id: "F", answer: "play cards" },
] as const;

export const hobbyPhotoWords = [
  "do exercise",
  "listen to music",
  "play cards",
  "read a book",
  "use the internet",
  "watch a film",
] as const;

/** Ex.2a — complete phrases with verbs from 1a. */
export const hobbyPhraseGaps = [
  { id: "p1", before: "", after: "a play", answers: ["watch"], options: ["watch", "listen", "play", "read", "do", "use"] },
  { id: "p2", before: "", after: "a TV programme", answers: ["watch"], options: ["watch", "listen", "play", "read", "do", "use"] },
  { id: "p3", before: "", after: "a game", answers: ["play"], options: ["watch", "listen", "play", "read", "do", "use"] },
  { id: "p4", before: "", after: "the radio", answers: ["listen to", "listen"], options: ["watch", "listen to", "play", "read", "do", "use"] },
  { id: "p5", before: "", after: "a newspaper", answers: ["read"], options: ["watch", "listen", "play", "read", "do", "use"] },
  { id: "p6", before: "", after: "some sport", answers: ["do", "play"], options: ["watch", "listen", "play", "read", "do", "use"] },
  { id: "p7", before: "", after: "a video game", answers: ["play"], options: ["watch", "listen", "play", "read", "do", "use"] },
  { id: "p8", before: "", after: "a song", answers: ["listen to", "listen"], options: ["watch", "listen to", "play", "read", "do", "use"] },
  { id: "p9", before: "", after: "a story", answers: ["read", "listen to", "listen"], options: ["watch", "listen to", "play", "read", "do", "use"] },
] as const;

/** Ex.3 — complete sentences with the correct verb. */
export const hobbySentenceGaps = [
  {
    id: "s1",
    before: "I usually",
    after: "a book on the train in the morning.",
    answers: ["read"],
    options: ["read", "watch", "play", "listen", "do", "use"],
  },
  {
    id: "s2",
    before: "We usually",
    after: "to music at work.",
    answers: ["listen"],
    options: ["read", "watch", "play", "listen", "do", "use"],
  },
  {
    id: "s3",
    before: "Can you",
    after: "cards?",
    answers: ["play"],
    options: ["read", "watch", "play", "listen", "do", "use"],
  },
  {
    id: "s4",
    before: "I",
    after: "video games with my friends last Friday.",
    answers: ["played"],
    options: ["played", "watched", "read", "listened", "did", "used"],
  },
  {
    id: "s5",
    before: "I",
    after: "a good programme on TV last night.",
    answers: ["watched"],
    options: ["played", "watched", "read", "listened", "did", "used"],
  },
  {
    id: "s6",
    before: "I don't",
    after: "newspapers.",
    answers: ["read"],
    options: ["read", "watch", "play", "listen", "do", "use"],
  },
  {
    id: "s7",
    before: "She",
    after: "the internet in the evening.",
    answers: ["uses"],
    options: ["reads", "watches", "plays", "listens", "does", "uses"],
  },
  {
    id: "s8",
    before: "They",
    after: "plays every week.",
    answers: ["watch"],
    options: ["read", "watch", "play", "listen", "do", "use"],
  },
] as const;

/** Ex.4 — open stems; student completes with a hobby verb/phrase. */
export const speakFrequencyPrompts = [
  "How often do you … ?",
  "Did you … last night?",
  "Where do you usually … ?",
  "Do you sometimes … on the train?",
  "Do you usually … at dinner time?",
] as const;

/**
 * Recording 9.6 — Tania & Kristoff interviews (Whisper medium.en from R6;
 * speaker labels from turn-taking). Announcer “Unit 9. Recording 6.” omitted.
 */
export const interviewTranscript = [
  "Interviewer: Excuse me, can I ask you some questions about the weekend? It’s for my university project.",
  "Tania: Yes, OK.",
  "Interviewer: Thank you. What do you and your family like doing at the weekend?",
  "Tania: I enjoy going to restaurants with my friends. We love talking and eating.",
  "Interviewer: Do you like reading books?",
  "Tania: No, I hate it. My sister loves reading books, but I never read them.",
  "Interviewer: Do you like doing sports?",
  "Tania: Yes, I love running in the park. My sister doesn’t like running, but she likes dancing and riding her bike.",
  "Interviewer: OK, thank you.",
  "Interviewer: Excuse me, can I ask you some questions about the weekend?",
  "Kristoff: Yes, sure.",
  "Interviewer: Thank you. What do you and your family like doing at the weekend?",
  "Kristoff: I like walking the dog in the park and swimming.",
  "Interviewer: Do you like watching TV?",
  "Kristoff: No, I don’t like it. My sons love watching TV. They watch TV every day.",
  "Interviewer: Do they like playing games?",
  "Kristoff: Yes they do. They play video games. I hate them.",
  "Interviewer: Okay, thank you.",
] as const;

/** 5a · preference columns for the listening tables (Recording 9.6). */
export const preferenceColumns = [
  { id: "loves", label: "loves" },
  { id: "likes", label: "likes/enjoys" },
  { id: "doesntLike", label: "doesn't like" },
  { id: "hates", label: "hates" },
] as const;

/**
 * 5a · two interview tables. correctTicks = column id(s) after Audio 9.6
 * (Tania/Kristoff about themselves — not family).
 */
export const interviewPreferenceTables = [
  {
    id: "tania",
    label: "1 Tania",
    rows: [
      {
        id: "t-restaurants",
        label: "going to restaurants",
        correctTicks: ["likes"],
      },
      {
        id: "t-books",
        label: "reading books",
        correctTicks: ["hates"],
      },
      {
        id: "t-running",
        label: "running in the park",
        correctTicks: ["loves"],
      },
    ],
  },
  {
    id: "kristoff",
    label: "2 Kristoff",
    rows: [
      {
        id: "k-dog",
        label: "walking the dog",
        correctTicks: ["likes"],
      },
      {
        id: "k-tv",
        label: "watching TV",
        correctTicks: ["doesntLike"],
      },
      {
        id: "k-games",
        label: "playing video games",
        correctTicks: ["hates"],
      },
    ],
  },
] as const;

/** Activity labels (kept for any plain-list reuse). */
export const taniaActivities = interviewPreferenceTables[0].rows.map((r) => r.label);

export const kristoffActivities = interviewPreferenceTables[1].rows.map((r) => r.label);

/**
 * 5b · Listen again. Choose a or b (Recording 9.6).
 * Option order matches the book: first = a, second = b.
 */
export const listenMc = [
  {
    id: "m1",
    prompt: "Tania enjoys going to restaurants with her …",
    options: ["friends.", "parents."],
    correctAnswer: "friends.",
  },
  {
    id: "m2",
    prompt: "Tania likes doing …",
    options: ["homework.", "sports."],
    correctAnswer: "sports.",
  },
  {
    id: "m3",
    prompt: "Tania’s sister doesn’t like …",
    options: ["dancing.", "running."],
    correctAnswer: "running.",
  },
  {
    id: "m4",
    prompt: "Kristoff likes walking the dog …",
    options: ["in the park.", "near the sea."],
    correctAnswer: "in the park.",
  },
  {
    id: "m5",
    prompt: "Kristoff’s sons love …",
    options: ["watching TV.", "listening to music."],
    correctAnswer: "watching TV.",
  },
  {
    id: "m6",
    prompt: "Kristoff’s sons like …",
    options: ["doing exercise.", "playing video games."],
    correctAnswer: "playing video games.",
  },
] as const;

/**
 * Ex.6 · grammar box gaps (from Ex.5 / Audio 9.6 key).
 * `answer` = Show answers; `answers` = accepted variants.
 */
export const likeIngGrammarGaps = [
  { id: "gb1", answer: "walking", answers: ["walking"] },
  { id: "gb2", answer: "watching", answers: ["watching"] },
  { id: "gb3", answer: "reading", answers: ["reading"] },
  { id: "gb4", answer: "running", answers: ["running"] },
  { id: "gb5", answer: "reading", answers: ["reading"] },
  { id: "gb6", answer: "doing", answers: ["doing"] },
  { id: "gb7", answer: "doing", answers: ["doing"] },
  { id: "gb8", answer: "doing", answers: ["doing"] },
] as const;

/** Ex.7a · pronunciation sentences (Audio 9.7); highlight suffix -ing. */
export const pronounceIngSentences = [
  {
    id: "p1",
    text: "I like watching films.",
    highlight: ["ing"],
  },
  {
    id: "p2",
    text: "I don’t like reading newspapers.",
    highlight: ["ing"],
  },
  {
    id: "p3",
    text: "I hate cleaning the bathroom.",
    highlight: ["ing"],
  },
  {
    id: "p4",
    text: "I enjoy taking photos.",
    highlight: ["ing"],
  },
  {
    id: "p5",
    text: "Do you like playing football?",
    highlight: ["ing"],
  },
  {
    id: "p6",
    text: "What do you like doing at the weekend?",
    highlight: ["ing"],
  },
] as const;

export const pronounceIngTranscript = pronounceIngSentences.map((s) => s.text);

/**
 * Ex.8 · Complete with the -ing form of the verb in brackets.
 */
export const likeIngPractice = [
  {
    id: "g1",
    before: "I don’t like",
    after: "at home at the weekend. (stay)",
    answers: ["staying"],
  },
  {
    id: "g2",
    before: "I enjoy",
    after: "dinner for my friends. (make)",
    answers: ["making"],
  },
  {
    id: "g3",
    before: "I hate",
    after: "in the evening. (study)",
    answers: ["studying"],
  },
  {
    id: "g4",
    before: "I like",
    after: "my flat on Sundays. (clean)",
    answers: ["cleaning"],
  },
  {
    id: "g5",
    before: "My children don’t like",
    after: "by car, so we never go anywhere. (travel)",
    answers: ["travelling", "traveling"],
  },
  {
    id: "g6",
    before: "She loves",
    after: "food from different countries. (eat)",
    answers: ["eating"],
  },
] as const;

/** Ex.10 · starter survey questions on the clipboard. */
export const surveyStarterQuestions = [
  "Do you like reading the newspaper?",
  "Do you like listening to music?",
  "Do you like playing cards?",
] as const;

/** Ex.10 · speak after writing six more questions. */
export const speakSurveyPrompts = [
  "Ask your teacher your six survey questions.",
  "Answer your teacher’s survey questions.",
  "Take turns. Use Yes, I do. / No, I don’t. and like / enjoy / love / hate + -ing.",
] as const;

/** Short reading snippets for “A world of hobbies”. */
export const hobbyReadingBits = [
  {
    id: "r1",
    title: "Reading",
    text: "Many people enjoy reading books on the train or in bed.",
  },
  {
    id: "r2",
    title: "Sport",
    text: "Some people love doing exercise or running in the park.",
  },
  {
    id: "r3",
    title: "Games",
    text: "Other people like playing video games or cards with friends.",
  },
] as const;

/** HW60 · Mini-test · 15 questions (collocations + like + -ing). */
export const hw60TestTasks = [
  {
    text: "Complete: I ______ a film on Friday evening.",
    options: ["watch", "listen to", "do", "use"],
    correct: "watch",
  },
  {
    text: "Complete: She ______ music on the bus.",
    options: ["plays", "listens to", "reads", "does"],
    correct: "listens to",
  },
  {
    text: "Complete: They ______ cards every weekend.",
    options: ["watch", "read", "play", "use"],
    correct: "play",
  },
  {
    text: "Complete: He ______ a book in bed.",
    options: ["reads", "watches", "plays", "does"],
    correct: "reads",
  },
  {
    text: "Complete: I ______ exercise in the morning.",
    options: ["play", "watch", "do", "listen"],
    correct: "do",
  },
  {
    text: "Complete: We ______ the internet every day.",
    options: ["watch", "use", "read", "play"],
    correct: "use",
  },
  {
    text: "Choose the correct sentence.",
    options: [
      "I like watch films.",
      "I like watching films.",
      "I like to watching films.",
      "I liking watch films.",
    ],
    correct: "I like watching films.",
  },
  {
    text: "Choose the correct sentence.",
    options: [
      "She enjoys to swim.",
      "She enjoys swimming.",
      "She enjoy swimming.",
      "She enjoys swim.",
    ],
    correct: "She enjoys swimming.",
  },
  {
    text: "Choose the correct sentence.",
    options: [
      "They hate cleaning the kitchen.",
      "They hate clean the kitchen.",
      "They hates cleaning the kitchen.",
      "They hate to cleaning the kitchen.",
    ],
    correct: "They hate cleaning the kitchen.",
  },
  {
    text: "Choose the correct question.",
    options: [
      "Do you like play football?",
      "Does you like playing football?",
      "Do you like playing football?",
      "Do you liking playing football?",
    ],
    correct: "Do you like playing football?",
  },
  {
    text: "I love ______ photos at the weekend.",
    options: ["take", "taking", "to taking", "takes"],
    correct: "taking",
  },
  {
    text: "He doesn’t like ______ up early.",
    options: ["get", "getting", "gets", "to getting"],
    correct: "getting",
  },
  {
    text: "What do you enjoy ______ in the evening?",
    options: ["do", "doing", "does", "to do"],
    correct: "doing",
  },
  {
    text: "My children don’t like ______ by car.",
    options: ["travel", "travelling", "travels", "to travelling"],
    correct: "travelling",
  },
  {
    text: "She loves ______ food from different countries.",
    options: ["eat", "eating", "eats", "to eating"],
    correct: "eating",
  },
] as const;

export const hw60TestPassScore = 11;

/** HW60 · UA → EN hobby sentences. */
export const hobbyUaTranslate = [
  {
    id: "t1",
    ua: "Я люблю слухати музику.",
    answers: ["I like listening to music.", "I like listening to music"],
  },
  {
    id: "t2",
    ua: "Вона обожнює читати книги.",
    answers: ["She loves reading books.", "She loves reading books"],
  },
  {
    id: "t3",
    ua: "Вони не люблять бігати.",
    answers: [
      "They don't like running.",
      "They do not like running.",
      "They don't like running",
    ],
  },
  {
    id: "t4",
    ua: "Ти любиш дивитися фільми?",
    answers: [
      "Do you like watching films?",
      "Do you like watching movies?",
      "Do you like watching films",
    ],
  },
  {
    id: "t5",
    ua: "Ми насолоджуємося грою в карти.",
    answers: [
      "We enjoy playing cards.",
      "We enjoy playing cards",
    ],
  },
] as const;
