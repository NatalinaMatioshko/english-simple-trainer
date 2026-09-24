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
  ["work", "worked", "працювати → працював / працювала"],
  ["watch", "watched", "дивитися → дивився / дивилася"],
  ["play", "played", "грати → грав / грала"],
  ["walk", "walked", "гуляти / ходити → гуляв / гуляла"],
  ["cook", "cooked", "готувати → готував / готувала"],
  ["study", "studied", "вчитися → вчився / вчилася"],
  ["visit", "visited", "відвідувати → відвідав / відвідала"],
  ["talk", "talked", "розмовляти → розмовляв / розмовляла"],
  ["clean", "cleaned", "прибирати → прибирав / прибирала"],
  ["wash", "washed", "мити → мив / мила"],
  ["start", "started", "починати → почав / почала"],
  ["finish", "finished", "закінчувати → закінчив / закінчила"],
  ["relax", "relaxed", "відпочивати → відпочивав / відпочивала"],
  ["arrive", "arrived", "прибувати → прибув / прибула"],
  ["ask", "asked", "запитувати → запитав / запитала"],
  ["call", "called", "телефонувати → зателефонував / зателефонувала"],
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
  ["be", "was / were", "бути → був / була / були"],
  ["go", "went", "іти / їхати → пішов / поїхав"],
  ["have", "had", "мати → мав / мала"],
  ["do", "did", "робити → зробив / зробила"],
  ["get", "got", "отримати / дістатися → отримав / дістався"],
  ["eat", "ate", "їсти → їв / їла"],
  ["drink", "drank", "пити → пив / пила"],
  ["wake up", "woke up", "прокидатися → прокинувся / прокинулася"],
  ["get up", "got up", "вставати → встав / встала"],
  ["feel", "felt", "почуватися → почувався / почувалася"],
  ["make", "made", "робити / створювати → зробив / зробила"],
  ["take", "took", "брати → взяв / взяла"],
  ["see", "saw", "бачити → побачив / побачила"],
  ["come", "came", "приходити / приїжджати → прийшов / приїхав"],
  ["buy", "bought", "купувати → купив / купила"],
  ["meet", "met", "зустрічати → зустрів / зустріла"],
  ["read", "read", "читати → читав / читала"],
  ["leave", "left", "залишати / виходити → залишив / вийшов"],
  ["sleep", "slept", "спати → спав / спала"],
  ["sit", "sat", "сидіти → сидів / сиділа"],
] as const;

export const pastChunks = [
  {
    id: "c1",
    term: "I was tired yesterday.",
    gloss: "Учора я був / була втомлений.",
  },
  { id: "c2", term: "I was at work.", gloss: "Я був / була на роботі." },
  { id: "c3", term: "I was at home.", gloss: "Я був / була вдома." },
  {
    id: "c4",
    term: "I went to work.",
    gloss: "Я пішов / поїхав на роботу.",
  },
  {
    id: "c5",
    term: "I got up at ten.",
    gloss: "Я встав / встала о десятій.",
  },
  { id: "c6", term: "I had breakfast.", gloss: "Я поснідав / поснідала." },
  { id: "c7", term: "I drank coffee.", gloss: "Я випив / випила каву." },
  {
    id: "c8",
    term: "I worked at the barbershop.",
    gloss: "Я працював / працювала в барбершопі.",
  },
  {
    id: "c9",
    term: "I cut a client's hair.",
    gloss: "Я підстриг / підстригла волосся клієнта.",
  },
  {
    id: "c10",
    term: "I played video games.",
    gloss: "Я грав / грала у відеоігри.",
  },
  {
    id: "c11",
    term: "I watched a film.",
    gloss: "Я дивився / дивилася фільм.",
  },
  {
    id: "c12",
    term: "I went to bed late.",
    gloss: "Я ліг / лягла спати пізно.",
  },
  { id: "c13", term: "I slept well.", gloss: "Я добре спав / спала." },
  {
    id: "c14",
    term: "I felt better.",
    gloss: "Я почувався / почувалася краще.",
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
