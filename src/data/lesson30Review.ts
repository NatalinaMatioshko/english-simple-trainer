/** Lesson 30 — A1 foundation check & reflect (data) */

export const warmUpQs = [
  "What's your name?",
  "Where are you from?",
  "What do you do?",
  "Where do you work / study?",
  "Tell me about your family.",
  "Describe yourself.",
  "Tell me about your hobbies.",
] as const;

export const profileScaffold = [
  "My name is… I'm … years old.",
  "I'm from… I live in…",
  "I'm a student / I work as a…",
  "I work / study in…",
  "In my family I have…",
  "I'm tall / short. I have… hair.",
  "In my free time I…",
] as const;

export const profileModel = [
  "My name is Olena. I'm 28 years old. I'm from Ukraine. I live in Kyiv.",
  "I'm a teacher. I work in a school. I like my job — it's interesting.",
  "I have a small family: my mother, my father and my brother. My brother's name is Taras. He's a student.",
  "I'm not very tall. I have dark hair and brown eyes. I wear glasses.",
  "In my free time I read books and cook. I also meet my friends.",
] as const;

export type FamilyCard = {
  id: string;
  file: string;
  name: string;
  relation: string;
  job: string;
  prompt: string;
  answerWho: string;
  answerJob: string;
};

export const familyCards: FamilyCard[] = [
  {
    id: "maria",
    file: "maria.jpg",
    name: "Maria",
    relation: "mother / mum",
    job: "office worker",
    prompt: "Who is she? What's her job?",
    answerWho: "She's Maria. She's my mother / mum.",
    answerJob: "She's an office worker.",
  },
  {
    id: "jose",
    file: "jose.jpg",
    name: "José",
    relation: "brother",
    job: "football player",
    prompt: "Who is he? What's his job?",
    answerWho: "He's José. He's my brother.",
    answerJob: "He's a football player.",
  },
  {
    id: "luisa",
    file: "luisa.jpg",
    name: "Luisa",
    relation: "brother's wife",
    job: "nurse",
    prompt: "Who is she? What's her job?",
    answerWho: "She's Luisa. She's my brother's wife.",
    answerJob: "She's a nurse.",
  },
  {
    id: "alonzo",
    file: "alonzo.jpg",
    name: "Alonzo",
    relation: "son",
    job: "student",
    prompt: "Who is he? What does he do?",
    answerWho: "He's Alonzo. He's my son.",
    answerJob: "He's a student.",
  },
];

export const jobCards = [
  { en: "teacher", place: "in a school", example: "She's a teacher. She works in a school." },
  { en: "doctor", place: "in a hospital", example: "He's a doctor. He works in a hospital." },
  { en: "nurse", place: "in a hospital", example: "She's a nurse. She works in a hospital." },
  { en: "pilot", place: "for an airline", example: "He's a pilot." },
  { en: "farmer", place: "on a farm", example: "She's a farmer. She works on a farm." },
  { en: "taxi driver", place: "in a city", example: "He's a taxi driver." },
  { en: "office worker", place: "in an office", example: "She's an office worker." },
  { en: "police officer", place: "in a police station", example: "He's a police officer." },
] as const;

export type MatchItem = {
  id: number;
  prompt: string;
  options: string[];
  answer: string;
};

export const familyJobMatch: MatchItem[] = [
  {
    id: 1,
    prompt: "Maria is my mother. ___ name is Maria.",
    options: ["His", "Her", "Their"],
    answer: "Her",
  },
  {
    id: 2,
    prompt: "José is a football player. ___ works in a team.",
    options: ["He", "She", "They"],
    answer: "He",
  },
  {
    id: 3,
    prompt: "Luisa is José's ___ .",
    options: ["wife", "husband", "brother"],
    answer: "wife",
  },
  {
    id: 4,
    prompt: "Alonzo and Sierra are students. ___ are from Spain.",
    options: ["He", "She", "They"],
    answer: "They",
  },
  {
    id: 5,
    prompt: "This is ___ family photo. (I)",
    options: ["my", "your", "their"],
    answer: "my",
  },
  {
    id: 6,
    prompt: "___ name is Aki. (the dog)",
    options: ["His", "Its", "Their"],
    answer: "Its",
  },
];

export const readingChunks = [
  {
    id: 1,
    title: "Chunk 1",
    text: "Hi! My name is Marco. I'm 32 years old. I'm from Italy, but I live in London.",
    question: "Where does Marco live?",
    options: ["Italy", "London", "Spain"],
    answer: "London",
  },
  {
    id: 2,
    title: "Chunk 2",
    text: "I'm a chef. I work in a small restaurant. I like my job — it's exciting, but I'm often tired.",
    question: "What's Marco's job?",
    options: ["teacher", "chef", "doctor"],
    answer: "chef",
  },
  {
    id: 3,
    title: "Chunk 3",
    text: "I have a small family. My wife's name is Anna. She's Polish. She's a nurse.",
    question: "Where is Anna from?",
    options: ["Italy", "Poland", "the UK"],
    answer: "Poland",
  },
  {
    id: 4,
    title: "Chunk 4",
    text: "We have one daughter. Her name is Sofia. She's eight years old. She's a student.",
    question: "How old is Sofia?",
    options: ["eight", "eighteen", "thirty-two"],
    answer: "eight",
  },
  {
    id: 5,
    title: "Chunk 5",
    text: "I'm tall and I have short dark hair. In my free time I cook at home and walk in the park.",
    question: "What does Marco do in his free time?",
    options: ["He plays football", "He cooks and walks", "He drives a taxi"],
    answer: "He cooks and walks",
  },
] as const;

export const listenQs: MatchItem[] = [
  {
    id: 1,
    prompt: "Yasemin shows a photo of her…",
    options: ["friends", "family", "school"],
    answer: "family",
  },
  {
    id: 2,
    prompt: "Her father's name is…",
    options: ["Ali", "Emir", "Jon"],
    answer: "Emir",
  },
  {
    id: 3,
    prompt: "Her father is from…",
    options: ["the UK", "Canada", "Turkey"],
    answer: "Turkey",
  },
  {
    id: 4,
    prompt: "Her mother's name is…",
    options: ["Linda", "Lily", "Anna"],
    answer: "Linda",
  },
  {
    id: 5,
    prompt: "Ali is Yasemin's…",
    options: ["friend", "father", "brother"],
    answer: "brother",
  },
];

export type CorrectionItem = {
  id: number;
  wrong: string;
  options: string[];
  answer: string;
  tip: string;
};

export const correctionItems: CorrectionItem[] = [
  {
    id: 1,
    wrong: "There from Spain.",
    options: ["They're from Spain.", "Their from Spain.", "There from Spain."],
    answer: "They're from Spain.",
    tip: "they're = they are",
  },
  {
    id: 2,
    wrong: "Your a teacher.",
    options: ["Your a teacher.", "You're a teacher.", "You a teacher."],
    answer: "You're a teacher.",
    tip: "you're = you are",
  },
  {
    id: 3,
    wrong: "The dog — it's name is Aki.",
    options: ["its name is Aki", "it's name is Aki", "it name is Aki"],
    answer: "its name is Aki",
    tip: "its = possessive · it's = it is",
  },
  {
    id: 4,
    wrong: "My parents is from Canada.",
    options: ["is", "are", "am"],
    answer: "are",
    tip: "parents = plural → are",
  },
  {
    id: 5,
    wrong: "She's ___ office worker.",
    options: ["a", "an", "the"],
    answer: "an",
    tip: "an + vowel sound (office)",
  },
  {
    id: 6,
    wrong: "He's a ___ . (лікар)",
    options: ["doctor", "nurse", "farmer"],
    answer: "doctor",
    tip: "jobs review",
  },
  {
    id: 7,
    wrong: "She's from Japan. She's…",
    options: ["Japanese", "Japan", "Spanish"],
    answer: "Japanese",
    tip: "nationality",
  },
  {
    id: 8,
    wrong: "She ___ to work every day.",
    options: ["go", "goes", "going"],
    answer: "goes",
    tip: "he/she/it + -s",
  },
  {
    id: 9,
    wrong: "I ___ play the piano. (не вмію)",
    options: ["can", "can't", "don't can"],
    answer: "can't",
    tip: "can / can't + base verb",
  },
  {
    id: 10,
    wrong: "I ___ homework every evening.",
    options: ["make", "do", "does"],
    answer: "do",
    tip: "do homework",
  },
  {
    id: 11,
    wrong: "I get up ___ 7 o'clock.",
    options: ["in", "on", "at"],
    answer: "at",
    tip: "at + clock time",
  },
  {
    id: 12,
    wrong: "___ pens on the table are mine. (близько)",
    options: ["This", "These", "Those"],
    answer: "These",
    tip: "these = near + plural",
  },
  {
    id: 13,
    wrong: "___ old is your brother?",
    options: ["What", "How", "Where"],
    answer: "How",
    tip: "How old…?",
  },
  {
    id: 14,
    wrong: "How much ___ those cups?",
    options: ["is", "are", "do"],
    answer: "are",
    tip: "How much are + plural",
  },
];

export const reflectItems = [
  "I can introduce myself (name, age, from, job).",
  "I can talk about my family with my / his / her / 's.",
  "I can say countries and nationalities.",
  "I can talk about jobs and place of work.",
  "I can describe appearance and personality.",
  "I can talk about my daily routine (Present Simple).",
  "I can use do / does in questions and negatives.",
  "I can use always / usually / sometimes / never.",
  "I can use in / on / at / to with time and place.",
  "I can use do / make collocations.",
  "I can use can / can't for ability and requests.",
  "I can use a / an / the in basic cases.",
  "I can name everyday objects and use this/that/these/those.",
  "I can use numbers and WH questions (Who / What / Where / How old).",
  "I can pay for things in a shop (How much…?).",
  "I can understand a short listening about people.",
  "I can read a short profile in chunks.",
  "I can write a short text about myself.",
] as const;

export const canChecklist = [
  "represent myself in 5–7 simple sentences",
  "describe my family in 4–5 sentences",
  "say 3–5 sentences about work or studies",
  "describe a person from a photo",
  "talk about my daily routine",
  "ask and answer basic questions (do/does + WH)",
  "use can / can't",
  "name everyday objects and say prices",
  "answer simple listening questions",
  "read a short text phrase by phrase",
] as const;

/** All A1 foundation topics covered by Lessons 1–29 */
export type TopicStation = {
  id: string;
  title: string;
  lessons: string;
  speak: string[];
  quiz: MatchItem[];
};

export const topicStations: TopicStation[] = [
  {
    id: "me-be",
    title: "Me · to be",
    lessons: "L1–2 · L23 · L25",
    speak: [
      "Hello! What's your name?",
      "How are you?",
      "Are you a student?",
      "Where are you from?",
    ],
    quiz: [
      {
        id: 1,
        prompt: "I ___ from Ukraine.",
        options: ["am", "is", "are"],
        answer: "am",
      },
      {
        id: 2,
        prompt: "___ you from Spain? — Yes, I ___.",
        options: ["Are / am", "Is / am", "Am / are"],
        answer: "Are / am",
      },
      {
        id: 3,
        prompt: "They ___ not in class today.",
        options: ["am", "is", "aren't"],
        answer: "aren't",
      },
    ],
  },
  {
    id: "family",
    title: "Family · possessives",
    lessons: "L3 · L27",
    speak: [
      "Who is in your family?",
      "What's your mother's name?",
      "Tell me about your brother or sister.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "This is my sister. ___ name is Oksana.",
        options: ["His", "Her", "Their"],
        answer: "Her",
      },
      {
        id: 2,
        prompt: "the brother of Anna →",
        options: ["Anna brother", "Anna's brother", "Annas' brother"],
        answer: "Anna's brother",
      },
      {
        id: 3,
        prompt: "We have two children. ___ names are…",
        options: ["Our", "Their", "His"],
        answer: "Our",
      },
    ],
  },
  {
    id: "nationalities",
    title: "Countries · nationalities",
    lessons: "L4 · L25",
    speak: [
      "Where are you from?",
      "What nationality are you?",
      "Name three countries and nationalities.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "She's from Japan. She's…",
        options: ["Japan", "Japanese", "Spanish"],
        answer: "Japanese",
      },
      {
        id: 2,
        prompt: "He's from the UK. He's…",
        options: ["British", "American", "England"],
        answer: "British",
      },
      {
        id: 3,
        prompt: "They're from Brazil. They're…",
        options: ["Brazil", "Brazilian", "Spanish"],
        answer: "Brazilian",
      },
    ],
  },
  {
    id: "jobs",
    title: "Jobs · place of work",
    lessons: "L4 · L26–27",
    speak: [
      "What do you do?",
      "Where do you work / study?",
      "What's your mother's / father's job?",
    ],
    quiz: [
      {
        id: 1,
        prompt: "A doctor works…",
        options: ["in a hospital", "in a school", "on a farm"],
        answer: "in a hospital",
      },
      {
        id: 2,
        prompt: "She's ___ nurse.",
        options: ["a", "an", "the"],
        answer: "a",
      },
      {
        id: 3,
        prompt: "He's a ___ . He works in an office.",
        options: ["pilot", "office worker", "farmer"],
        answer: "office worker",
      },
    ],
  },
  {
    id: "appearance",
    title: "Appearance · adjectives",
    lessons: "L22 · L24",
    speak: [
      "Describe yourself (tall/short, hair, eyes).",
      "Describe a friend or family member.",
      "Are you quiet or friendly?",
    ],
    quiz: [
      {
        id: 1,
        prompt: "She ___ tall and she ___ dark hair.",
        options: ["is / has", "has / is", "are / have"],
        answer: "is / has",
      },
      {
        id: 2,
        prompt: "Opposite of tall →",
        options: ["thin", "short", "curly"],
        answer: "short",
      },
      {
        id: 3,
        prompt: "He wears ___ .",
        options: ["beard", "glasses", "blond"],
        answer: "glasses",
      },
    ],
  },
  {
    id: "routine",
    title: "Routine · Present Simple",
    lessons: "L5–10 · L15–17 · L20",
    speak: [
      "What time do you get up?",
      "What do you do in the morning?",
      "Tell me about your day (5 sentences).",
    ],
    quiz: [
      {
        id: 1,
        prompt: "She ___ breakfast at 8.",
        options: ["have", "has", "having"],
        answer: "has",
      },
      {
        id: 2,
        prompt: "___ he work on Sundays?",
        options: ["Do", "Does", "Is"],
        answer: "Does",
      },
      {
        id: 3,
        prompt: "I ___ drink coffee. (ніколи)",
        options: ["always", "never", "usually"],
        answer: "never",
      },
    ],
  },
  {
    id: "do-does",
    title: "Do / does · questions",
    lessons: "L7 · L16 · posters",
    speak: [
      "Do you like English?",
      "Does your friend live near you?",
      "Ask your partner 3 do/does questions.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "___ you like pizza?",
        options: ["Do", "Does", "Are"],
        answer: "Do",
      },
      {
        id: 2,
        prompt: "She ___ like cats.",
        options: ["don't", "doesn't", "isn't"],
        answer: "doesn't",
      },
      {
        id: 3,
        prompt: "Does he live here? — Yes, he ___.",
        options: ["do", "does", "is"],
        answer: "does",
      },
    ],
  },
  {
    id: "prepositions",
    title: "in / on / at / to",
    lessons: "L8–9 · L18",
    speak: [
      "Where are you now? (at home / at work…)",
      "When do you study English? (on Monday / in the evening…)",
      "Where do you go at the weekend?",
    ],
    quiz: [
      {
        id: 1,
        prompt: "I get up ___ 7 o'clock.",
        options: ["in", "on", "at"],
        answer: "at",
      },
      {
        id: 2,
        prompt: "I work ___ Monday.",
        options: ["in", "on", "at"],
        answer: "on",
      },
      {
        id: 3,
        prompt: "I go ___ school every day.",
        options: ["in", "at", "to"],
        answer: "to",
      },
      {
        id: 4,
        prompt: "She's ___ home now.",
        options: ["in", "at", "to"],
        answer: "at",
      },
    ],
  },
  {
    id: "do-make",
    title: "Do / make",
    lessons: "L19",
    speak: [
      "What homework do you do?",
      "Do you make dinner at home?",
      "What plans do you make for the weekend?",
    ],
    quiz: [
      {
        id: 1,
        prompt: "I ___ my homework after dinner.",
        options: ["make", "do", "have"],
        answer: "do",
      },
      {
        id: 2,
        prompt: "She ___ dinner for her family.",
        options: ["does", "makes", "goes"],
        answer: "makes",
      },
      {
        id: 3,
        prompt: "We ___ a plan for Saturday.",
        options: ["do", "make", "does"],
        answer: "make",
      },
    ],
  },
  {
    id: "can",
    title: "Can / can't",
    lessons: "L21–22",
    speak: [
      "What can you do well?",
      "Can you swim / drive / cook?",
      "Ask: Can you help me, please?",
    ],
    quiz: [
      {
        id: 1,
        prompt: "I ___ speak English. (вмію)",
        options: ["can", "cans", "can't"],
        answer: "can",
      },
      {
        id: 2,
        prompt: "He ___ drive. (не вміє)",
        options: ["can", "can't", "doesn't can"],
        answer: "can't",
      },
      {
        id: 3,
        prompt: "___ you open the window, please?",
        options: ["Do", "Are", "Can"],
        answer: "Can",
      },
    ],
  },
  {
    id: "articles",
    title: "a / an / the",
    lessons: "L23",
    speak: [
      "Name 3 things with a / an in your bag.",
      "Talk about the sun / the door in this room.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "I have ___ apple.",
        options: ["a", "an", "the"],
        answer: "an",
      },
      {
        id: 2,
        prompt: "Open ___ door, please. (конкретні двері)",
        options: ["a", "an", "the"],
        answer: "the",
      },
      {
        id: 3,
        prompt: "She's ___ engineer.",
        options: ["a", "an", "the"],
        answer: "an",
      },
    ],
  },
  {
    id: "objects",
    title: "Objects · this / that",
    lessons: "L28",
    speak: [
      "What's that on the table?",
      "What are these / those?",
      "Name 5 everyday objects in this room.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "___ is my phone. (близько, 1)",
        options: ["This", "These", "Those"],
        answer: "This",
      },
      {
        id: 2,
        prompt: "___ are my keys. (далеко)",
        options: ["This", "These", "Those"],
        answer: "Those",
      },
      {
        id: 3,
        prompt: "книга →",
        options: ["a box", "a book", "a cup"],
        answer: "a book",
      },
    ],
  },
  {
    id: "numbers-wh",
    title: "Numbers · WH questions",
    lessons: "L29",
    speak: [
      "How old are you?",
      "What's her job? Where is he from?",
      "Count from 10 to 20 · say thirty / thirteen.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "15 →",
        options: ["fifty", "fifteen", "five"],
        answer: "fifteen",
      },
      {
        id: 2,
        prompt: "___ is she from?",
        options: ["Who", "Where", "When"],
        answer: "Where",
      },
      {
        id: 3,
        prompt: "___ old is your phone?",
        options: ["What", "How", "Which"],
        answer: "How",
      },
    ],
  },
  {
    id: "shop",
    title: "In a shop",
    lessons: "L29 Part 3",
    speak: [
      "How much is this book?",
      "How much are those cups?",
      "Cash or card? — Card, please.",
    ],
    quiz: [
      {
        id: 1,
        prompt: "How much ___ this chair?",
        options: ["is", "are", "do"],
        answer: "is",
      },
      {
        id: 2,
        prompt: "How much ___ those pens?",
        options: ["is", "are", "does"],
        answer: "are",
      },
      {
        id: 3,
        prompt: "Assistant: ___ or card?",
        options: ["Cash", "Change", "Cup"],
        answer: "Cash",
      },
    ],
  },
  {
    id: "have-has",
    title: "Have / has",
    lessons: "posters · L3 · L20",
    speak: [
      "What have you got in your bag?",
      "Does your friend have a car / a bike?",
      "She has… / I have…",
    ],
    quiz: [
      {
        id: 1,
        prompt: "I ___ a new phone.",
        options: ["has", "have", "am"],
        answer: "have",
      },
      {
        id: 2,
        prompt: "She ___ a brother.",
        options: ["have", "has", "is"],
        answer: "has",
      },
      {
        id: 3,
        prompt: "They ___ a nice house.",
        options: ["has", "have", "are"],
        answer: "have",
      },
    ],
  },
];
