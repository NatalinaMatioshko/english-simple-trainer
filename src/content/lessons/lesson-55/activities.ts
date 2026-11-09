/** Lesson 55 — When I was young (Unit 8A)
 * Audio: Unit_8 RM_A1_SB_U8_R1 (word map), R7 (Ex.7a · -ed endings)
 * Images: public/images/lesson55/
 */

export const AUDIO55 = (track: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_8/RM_A1_SB_U8_R${track}.mp3`;

export const IMG55 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson55/${file}`;

export function withQuestionMark(answers: readonly string[]): string[] {
  return answers.flatMap((a) => [a, `${a}?`]);
}

/* ------------------------------------------------------------------ */
/* Review · Lesson 54 (ticket chunk) + L43 regular -ed                */
/* ------------------------------------------------------------------ */

export const reviewTicketPhrase = {
  ua: "Квиток в один кінець",
  answers: ["A single ticket", "a single ticket", "One single ticket"],
} as const;

export const reviewPastGaps = [
  { id: "r1", before: "Last year I", after: "English every day.", answers: ["studied", "Studied"] },
  { id: "r2", before: "We", after: "a film last night.", answers: ["watched", "Watched"] },
  { id: "r3", before: "She", after: "to school by bus.", answers: ["travelled", "traveled", "Travelled", "Traveled"] },
] as const;

/* ------------------------------------------------------------------ */
/* 1 · Photos A–C · Norway text                                       */
/* ------------------------------------------------------------------ */

/** Ex.1b · full reading (SB p.62) */
export const norwayStoryFull =
  "When I was young, I lived in a village in Norway — its name was Nostrum. " +
  "I travelled to school by bus every day. The school bus was old, but I liked it. " +
  "On the bus I talked to my friends about football. Every week I watched a game on the computer. " +
  "I loved Manchester United and I wanted to play for them! I played football every day with my friends after school. " +
  "I was happy then.";

/** Three parts of the text → match photos A–C by meaning (village / bus / free time). */
export const norwayStoryParts = [
  {
    id: "1",
    text: "When I was young, I lived in a village in Norway — its name was Nostrum.",
    photo: "A",
  },
  {
    id: "2",
    text:
      "I travelled to school by bus every day. The school bus was old, but I liked it. " +
      "On the bus I talked to my friends about football.",
    photo: "B",
  },
  {
    id: "3",
    text:
      "Every week I watched a game on the computer. I loved Manchester United and I wanted to play for them! " +
      "I played football every day with my friends after school. I was happy then.",
    photo: "C",
  },
] as const;

export const childhoodPhotos = [
  {
    id: "A",
    src: IMG55("photo-a-bike.png"),
    alt: "A girl riding a bicycle with a purple backpack",
    answer: "s1",
  },
  {
    id: "B",
    src: IMG55("photo-b-bus.png"),
    alt: "A boy on a bus looking back at the camera",
    answer: "s2",
  },
  {
    id: "C",
    src: IMG55("photo-c-beach.png"),
    alt: "A boy by the sea holding a starfish",
    answer: "s3",
  },
] as const;

export const norwayTextOptions = norwayStoryParts.map((p) => ({
  value: `s${p.id}`,
  label: `${p.id}. ${p.text}`,
}));

export const photoDescribePrompts = [
  "In photo A, what can you see?",
  "In photo B, what can you see?",
  "In photo C, what can you see?",
] as const;

export const photoDescribeModels = [
  "In this photo, there’s a girl on a bike.",
  "In this photo, there’s a boy on a bus.",
  "In this photo, there’s a boy by the sea.",
] as const;

/* ------------------------------------------------------------------ */
/* 2 · Word map verbs → phrases                                       */
/* ------------------------------------------------------------------ */

/** SB 8A Ex.2a layout (hub + phrase positions in %). */
export const wordMap2aHubs = [
  {
    id: "travel",
    number: 1,
    verb: "travel",
    x: 18,
    y: 44,
    phrases: [
      { text: "to work", x: 10, y: 24 },
      { text: "by bus", x: 28, y: 64 },
    ],
  },
  {
    id: "watch",
    number: 2,
    verb: "watch",
    x: 50,
    y: 16,
    phrases: [{ text: "TV", x: 74, y: 12 }],
  },
  {
    id: "live",
    number: 3,
    verb: "live",
    x: 84,
    y: 40,
    phrases: [
      { text: "with my parents", x: 90, y: 22 },
      { text: "in a city", x: 70, y: 56 },
    ],
  },
  {
    id: "play",
    number: 4,
    verb: "play",
    x: 24,
    y: 82,
    phrases: [
      { text: "games", x: 44, y: 68 },
      { text: "with friends", x: 10, y: 92 },
    ],
  },
  {
    id: "talk",
    number: 5,
    verb: "talk",
    x: 78,
    y: 82,
    phrases: [
      { text: "about the weather", x: 84, y: 66 },
      { text: "to my parents", x: 92, y: 92 },
    ],
  },
] as const;

export const wordMapCategories = [
  { id: "travel", label: "travel", icon: "travel" },
  { id: "watch", label: "watch", icon: "watch" },
  { id: "live", label: "live", icon: "live" },
  { id: "play", label: "play", icon: "play" },
  { id: "talk", label: "talk", icon: "talk" },
] as const;

/** Exercise 3a · add phrases to the word map */
export const wordMap3aWords = [
  { word: "in a town", answer: "live" },
  { word: "to my teacher", answer: "talk" },
  { word: "a film", answer: "watch" },
  { word: "tennis", answer: "play" },
  { word: "to my grandparents' house", answer: "travel" },
  { word: "by car", answer: "travel" },
  { word: "about my weekend", answer: "talk" },
  { word: "with my family", answer: "live" },
  { word: "in a house", answer: "live" },
] as const;

/** Unit 8 Recording 1 · Ex.2b (Pearson audioscript) */
export const wordMapTranscript = [
  "1 · travel",
  "travel to work",
  "travel by bus",
  "travel to school",
  "2 · watch",
  "watch TV",
  "watch a game",
  "3 · live",
  "live with my parents",
  "live in a city",
  "live in a village",
  "4 · play",
  "play games",
  "play with friends",
  "play football",
  "5 · talk",
  "talk about the weather",
  "talk to my parents",
  "talk to my friends",
  "talk about football",
] as const;

/* ------------------------------------------------------------------ */
/* 4 · Sentences about yourself (models)                              */
/* ------------------------------------------------------------------ */

export const presentPhraseModels = [
  "I often play football.",
  "I sometimes watch TV in the evening.",
  "I travel to work by bus.",
  "I live with my family.",
  "I talk to my teacher about my weekend.",
] as const;

/* ------------------------------------------------------------------ */
/* 5 · School days reading · table                                      */
/* ------------------------------------------------------------------ */

export const schoolDayPeople = [
  {
    id: "nanami",
    name: "Nanami",
    photo: IMG55("nanami.png"),
    alt: "Nanami, short dark hair",
    text:
      "When I was young, I lived in a small town. I walked to school every day with my friends, and we usually talked about the other girls in our class. " +
      "We studied every day. I didn't like my school, but I liked my friends. We lived in Hokkaido, in the north, but every year my family travelled to Fukuoka in the south. " +
      "We played games on the beach there. It was a happy time.",
  },
  {
    id: "michal",
    name: "Michal",
    photo: IMG55("michal.png"),
    alt: "Michal, short beard",
    text:
      "My first school was in Poland – my parents are Polish. I lived in Poland for six years in a village. Later, we lived in a big city in the UK because of my dad's job. " +
      "In Poland I walked to school, but in England I travelled to school by bus. My English was not good, and I didn't understand British children. " +
      "School was very difficult, too. I didn't like it.",
  },
  {
    id: "lucy",
    name: "Lucy",
    photo: IMG55("lucy.png"),
    alt: "Lucy, light brown hair",
    text:
      "I lived in a town called Uxbridge when I was young. I travelled to school by train every day with my best friend, Josh. School was great. " +
      "My teacher was called Mrs Harrison. She played games with us, but she also helped us a lot. I lived with my parents and my sister. At night we watched TV together.",
  },
] as const;

/** 8A Ex.5 · tick Nanami / Michal / Lucy per row */
export const schoolDaysTableColumns = [
  { id: "nanami", label: "Nanami" },
  { id: "michal", label: "Michal" },
  { id: "lucy", label: "Lucy" },
] as const;

export const schoolDaysTableRows = [
  { id: "t1", label: "liked school?", correctTicks: ["lucy"] },
  { id: "t2", label: "travelled every year?", correctTicks: ["nanami"] },
  { id: "t3", label: "went to a new country?", correctTicks: ["michal"] },
  { id: "t4", label: "lived in a small place?", correctTicks: ["nanami", "michal"] },
  { id: "t5", label: "doesn't talk about games?", correctTicks: ["michal"] },
] as const;

/* ------------------------------------------------------------------ */
/* 6–7 · Past simple regular · -ed sounds                             */
/* ------------------------------------------------------------------ */

export const pastRegularRulesRows = [
  ["Most verbs", "add -ed", "walk → walked"],
  ["Ends in -e", "add -d", "like → liked"],
  ["consonant + -y", "→ -ied", "study → studied"],
  ["vowel + consonant", "double + -ed", "travel → travelled"],
] as const;

export const edSoundGroups = [
  { id: "t", label: "/t/ · worked", words: ["worked", "watched", "cooked", "helped"] },
  { id: "d", label: "/d/ · stayed", words: ["stayed", "played", "cleaned", "lived"] },
  { id: "id", label: "/ɪd/ · started", words: ["started", "wanted", "visited", "needed"] },
] as const;

/** 7b · sort verbs */
export const edSortWords = [
  { word: "visited", answer: "id" },
  { word: "played", answer: "d" },
  { word: "watched", answer: "t" },
  { word: "cooked", answer: "t" },
  { word: "wanted", answer: "id" },
  { word: "cleaned", answer: "d" },
  { word: "worked", answer: "t" },
  { word: "started", answer: "id" },
] as const;

/** Unit 8 Recording 7 · Ex.7a (-ed endings) — Pearson audioscript */
export const edSoundTranscript = [
  "1 visited",
  "2 played",
  "3 watched",
  "4 cooked",
  "5 wanted",
  "6 cleaned",
  "7 worked",
  "8 started",
] as const;

/* ------------------------------------------------------------------ */
/* 8 · Past sentences (school)                                        */
/* ------------------------------------------------------------------ */

export const schoolPastGaps = [
  {
    id: "8a1",
    before: "At school my lessons",
    after: "at 9 o'clock in the morning.",
    answers: ["started", "Started"],
  },
  {
    id: "8a2",
    before: "I",
    after: "to school by train.",
    answers: ["travelled", "traveled", "Travelled", "Traveled"],
  },
  {
    id: "8a3",
    before: "I",
    after: "my dad's car every weekend.",
    answers: ["cleaned", "Cleaned"],
  },
  {
    id: "8a4",
    before: "I",
    after: "my English teacher at school.",
    answers: ["didn't like", "Didn't like", "did not like", "Did not like"],
  },
  {
    id: "8a5",
    before: "At school I",
    after: "sports every day.",
    answers: ["played", "Played"],
  },
  {
    id: "8a6",
    before: "I often",
    after: "in a café after school.",
    answers: ["studied", "Studied"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* 9 · True / false childhood                                         */
/* ------------------------------------------------------------------ */

export const childhoodWordBank = [
  "arrive",
  "clean",
  "cycle",
  "finish",
  "listen to",
  "like",
  "live",
  "love",
  "play",
  "study",
  "talk to",
  "travel",
  "use",
  "visit",
  "walk",
  "watch",
  "work",
] as const;

export const trueFalseExample =
  "I watched Pokémon on TV every day. — true or false?";

/* ------------------------------------------------------------------ */
/* 10–11 · Speaking                                                   */
/* ------------------------------------------------------------------ */

export const prepareChildhoodBullets = [
  "Village, town or city when you were young?",
  "Big school or small school?",
  "Did you travel to school by bus, by train, or did you walk?",
  "Did you like school? Did you like your teacher?",
  "What did you watch on TV? Did you play games?",
  "Did you travel with your family?",
  "Who were your friends?",
] as const;

export const speakChildhoodPrompts = [
  "Розкажи учителю про те, яким ти був/була малим (5–8 речень).",
  "Скажи, де ти жив/жила й як їздив/їздила до школи.",
  "Скажи одне, що подобалось, і одне, що не подобалось у школі.",
] as const;

export const speakChildhoodModels = [
  "When I was young, I lived in a small town. I walked to school. I liked my teacher. I played football with my friends.",
  "I went to a big school. I travelled by bus. I didn’t like maths. I watched cartoons every evening.",
] as const;

/* ------------------------------------------------------------------ */
/* Homework                                                           */
/* ------------------------------------------------------------------ */

export const hwEdSort = edSortWords.map((w) => ({ ...w }));

export const hwSchoolGaps = schoolPastGaps.map((g) => ({
  id: `hw-${g.id}`,
  before: g.before,
  after: g.after,
  answers: [...g.answers],
}));

export const hwTrueFalsePrompts = [
  {
    id: "tf1",
    hint: "Використай watch / play / live / study…",
    example: "I watched cartoons every day.",
  },
  {
    id: "tf2",
    hint: "Одне правдиве, одне неправдиве",
    example: "I lived in a big city. (change if not true)",
  },
  {
    id: "tf3",
    hint: "Past Simple -ed",
    example: "I cleaned my room every Saturday.",
  },
  {
    id: "tf4",
    hint: "Школа",
    example: "I didn't like English at school.",
  },
] as const;
