/** Soft preview · Past Simple: Yesterday (end of Lesson 43) */

export const pastTimeWords = [
  { id: "y", term: "yesterday", gloss: "вчора" },
  { id: "ym", term: "yesterday morning", gloss: "учора вранці" },
  { id: "ya", term: "yesterday afternoon", gloss: "учора вдень" },
  { id: "ye", term: "yesterday evening", gloss: "учора ввечері" },
  { id: "ln", term: "last night", gloss: "минулої ночі / учора ввечері" },
  { id: "lw", term: "last weekend", gloss: "минулими вихідними" },
  { id: "lweek", term: "last week", gloss: "минулого тижня" },
  { id: "tda", term: "two days ago", gloss: "два дні тому" },
  {
    id: "at3",
    term: "at 3 p.m. yesterday",
    gloss: "учора о третій годині дня",
  },
] as const;

export const pastRegularVerbs = [
  ["work", "worked", "працювати → працював/-ла"],
  ["watch", "watched", "дивитися → дивився/-лася"],
  ["play", "played", "грати → грав/-ла"],
  ["walk", "walked", "гуляти → гуляв/-ла"],
  ["cook", "cooked", "готувати → готував/-ла"],
  ["study", "studied", "вчитися → вчився/-лася"],
  ["visit", "visited", "відвідувати → відвідав/-ла"],
  ["talk", "talked", "розмовляти → розмовляв/-ла"],
  ["clean", "cleaned", "прибирати → прибирав/-ла"],
  ["wash", "washed", "мити → мив/-ла"],
  ["start", "started", "починати → почав/-ла"],
  ["finish", "finished", "закінчувати → закінчив/-ла"],
  ["relax", "relaxed", "відпочивати → відпочивав/-ла"],
  ["arrive", "arrived", "прибувати → прибув/-ла"],
  ["ask", "asked", "запитувати → запитав/-ла"],
  ["call", "called", "телефонувати → зателефонував/-ла"],
] as const;

/** Gap-fill examples: I ___ … */
export const pastRegularExampleGaps = [
  {
    id: "ex1",
    before: "I",
    after: "yesterday.",
    answers: ["worked", "Worked"],
  },
  {
    id: "ex2",
    before: "I",
    after: "a film last night.",
    answers: ["watched", "Watched"],
  },
  {
    id: "ex3",
    before: "I",
    after: "video games yesterday evening.",
    answers: ["played", "Played"],
  },
  {
    id: "ex4",
    before: "I",
    after: "dinner.",
    answers: ["cooked", "Cooked"],
  },
  {
    id: "ex5",
    before: "I",
    after: "English.",
    answers: ["studied", "Studied"],
  },
  {
    id: "ex6",
    before: "I",
    after: "in the park.",
    answers: ["walked", "Walked"],
  },
  {
    id: "ex7",
    before: "I",
    after: "my friend.",
    answers: ["visited", "Visited"],
  },
  {
    id: "ex8",
    before: "I",
    after: "my room.",
    answers: ["cleaned", "Cleaned"],
  },
] as const;

/** @deprecated use pastRegularExampleGaps */
export const pastRegularExamples = pastRegularExampleGaps.map(
  (g) => `I ${g.answers[0].toLowerCase()} ${g.after}`,
);

export const pastIrregularVerbs = [
  ["be", "was / were", "бути → був/-ла/-ли"],
  ["go", "went", "іти → пішов/-ла"],
  ["have", "had", "мати → мав/-ла"],
  ["do", "did", "робити → зробив/-ла"],
  ["get", "got", "отримати → отримав/-ла"],
  ["eat", "ate", "їсти → їв/-ла"],
  ["drink", "drank", "пити → пив/-ла"],
  ["wake up", "woke up", "прокидатися → прокинувся/-лася"],
  ["get up", "got up", "вставати → встав/-ла"],
  ["feel", "felt", "почуватися → почувався/-лася"],
  ["make", "made", "робити → зробив/-ла"],
  ["take", "took", "брати → взяв/-ла"],
  ["see", "saw", "бачити → побачив/-ла"],
  ["come", "came", "приходити → прийшов/-ла"],
  ["buy", "bought", "купувати → купив/-ла"],
  ["meet", "met", "зустрічати → зустрів/-ла"],
  ["read", "read", "читати → читав/-ла"],
  ["leave", "left", "залишати → залишив/-ла"],
  ["sleep", "slept", "спати → спав/-ла"],
  ["sit", "sat", "сидіти → сидів/-ла"],
] as const;

export const pastChunks = [
  {
    id: "c1",
    term: "I was tired yesterday.",
    gloss: "Учора я був/-ла втомлений/-а.",
  },
  { id: "c2", term: "I was at work.", gloss: "Я був/-ла на роботі." },
  { id: "c3", term: "I was at home.", gloss: "Я був/-ла вдома." },
  {
    id: "c4",
    term: "I went to work.",
    gloss: "Я пішов/-ла на роботу.",
  },
  {
    id: "c5",
    term: "I got up at ten.",
    gloss: "Я встав/-ла о десятій.",
  },
  { id: "c6", term: "I had breakfast.", gloss: "Я поснідав/-ла." },
  { id: "c7", term: "I drank coffee.", gloss: "Я випив/-ла каву." },
  {
    id: "c8",
    term: "I worked at the barbershop.",
    gloss: "Я працював/-ла в барбершопі.",
  },
  {
    id: "c9",
    term: "I cut a client's hair.",
    gloss: "Я підстриг/-гла клієнта.",
  },
  {
    id: "c10",
    term: "I played video games.",
    gloss: "Я грав/-ла у відеоігри.",
  },
  {
    id: "c11",
    term: "I watched a film.",
    gloss: "Я дивився/-лася фільм.",
  },
  {
    id: "c12",
    term: "I went to bed late.",
    gloss: "Я ліг/-гла спати пізно.",
  },
  { id: "c13", term: "I slept well.", gloss: "Я добре спав/-ла." },
  {
    id: "c14",
    term: "I felt better.",
    gloss: "Я почувався/-лася краще.",
  },
] as const;

export const pastModelDayLines = [
  "Yesterday I got up at ten.",
  "I had breakfast.",
  "I went to work.",
  "I worked at the barbershop.",
  "I played video games in the evening.",
  "I watched a film.",
  "I went to bed late.",
] as const;

export const pastModelDay = pastModelDayLines.join(" ");

export const pastReadTaskLines = [
  "Yesterday I got up at ten.",
  "I had breakfast and drank tea.",
  "I went to work and worked at the barbershop.",
  "In the evening, I played video games and watched a film.",
  "I went to bed late.",
] as const;

export const pastReadTask = pastReadTaskLines.join(" ");
