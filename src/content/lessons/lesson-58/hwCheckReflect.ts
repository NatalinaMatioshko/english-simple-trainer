/** Unit 8 Check and reflect, added to HW58 as separate send blocks. */

export const aboutYouVerbs = [
  {
    id: "live",
    before: "I",
    after: "in a village / in a town / in a city.",
    answers: ["live"],
  },
  {
    id: "play",
    before: "I",
    after: "tennis / video games with friends / football.",
    answers: ["play"],
  },
  {
    id: "talk",
    before: "I",
    after: "to my parents every day / to my neighbour about the weather / my friends every week.",
    answers: ["talk", "speak"],
  },
  {
    id: "watch",
    before: "I",
    after: "a film once or twice a week / TV every day.",
    answers: ["watch"],
  },
  {
    id: "go",
    before: "I",
    after: "to work / by bus / to my parents' house every weekend.",
    answers: ["go"],
  },
] as const;

export const schoolPastGaps = [
  {
    id: "travel",
    before: "but my friends",
    after: "(travel) by bus.",
    answers: ["travelled", "traveled"],
  },
  {
    id: "cycle",
    before: "One or two children",
    after: "(cycle) to school.",
    answers: ["cycled"],
  },
  {
    id: "arrive",
    before: "I usually",
    after: "(arrive) at 8.45",
    answers: ["arrived"],
  },
  {
    id: "start",
    before: "and lessons",
    after: "(start) at 9 o'clock.",
    answers: ["started"],
  },
  {
    id: "study",
    before: "We",
    after: "(study) all day",
    answers: ["studied"],
  },
  {
    id: "play",
    before: "and",
    after: "(play) sports on Wednesday afternoon.",
    answers: ["played"],
  },
  {
    id: "like",
    before: "I",
    after: "(like) my lessons",
    answers: ["liked"],
  },
  {
    id: "not-like",
    before: "but I",
    after: "(not like) the sports.",
    answers: ["didn't like", "did not like"],
  },
  {
    id: "finish",
    before: "Lessons",
    after: "(finish) at 3.45.",
    answers: ["finished"],
  },
] as const;

export const irregularGrid = [
  "XFATEKRANM",
  "QOSHKSPOKE",
  "RRWKWLJGJT",
  "BGPGEITOOK",
  "ROJONHKKLF",
  "OTNTTAOBOE",
  "KLMUHDDFSL",
  "EOUPHTEKTT",
];

export const irregularWords: { word: string; cells: [number, number][] }[] = [
  { word: "ate", cells: [[0, 2], [0, 3], [0, 4]] },
  { word: "broke", cells: [[3, 0], [4, 0], [5, 0], [6, 0], [7, 0]] },
  { word: "felt", cells: [[4, 9], [5, 9], [6, 9], [7, 9]] },
  { word: "forgot", cells: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]] },
  { word: "got up", cells: [[3, 3], [4, 3], [5, 3], [6, 3], [7, 3]] },
  { word: "had", cells: [[4, 5], [5, 5], [6, 5]] },
  { word: "lost", cells: [[4, 8], [5, 8], [6, 8], [7, 8]] },
  { word: "met", cells: [[0, 9], [1, 9], [2, 9]] },
  { word: "ran", cells: [[0, 6], [0, 7], [0, 8]] },
  { word: "spoke", cells: [[1, 5], [1, 6], [1, 7], [1, 8], [1, 9]] },
  { word: "took", cells: [[3, 6], [3, 7], [3, 8], [3, 9]] },
  { word: "went", cells: [[2, 4], [3, 4], [4, 4], [5, 4]] },
];

export const verbBox = ["broke", "bought", "forgot", "got up", "met", "spoke"];

export const verbBoxGaps = [
  {
    id: "sandwiches",
    before: "Yesterday, I",
    after: "my sandwiches. I wasn't happy!",
    answer: "forgot",
  },
  {
    id: "phone",
    before: "I",
    after: "to my parents on the phone last night.",
    answer: "spoke",
  },
  {
    id: "house",
    before: "They",
    after: "a big house in the mountains.",
    answer: "bought",
  },
  {
    id: "late",
    before: "He",
    after: "at 11.00 a.m. today!",
    answer: "got up",
  },
  {
    id: "university",
    before: "My wife and I",
    after: "at university.",
    answer: "met",
  },
  {
    id: "cup",
    before: "She",
    after: "another cup last night.",
    answer: "broke",
  },
] as const;

export const morningGaps = [
  {
    id: "have",
    before: "I",
    after: "(have) a shower.",
    answers: ["had"],
  },
  {
    id: "make",
    before: "I",
    after: "(make) my breakfast.",
    answers: ["made"],
  },
  {
    id: "eat",
    before: "I",
    after: "(eat) breakfast.",
    answers: ["ate"],
  },
  {
    id: "drink",
    before: "I",
    after: "(drink) two cups of tea with my breakfast.",
    answers: ["drank"],
  },
  {
    id: "buy",
    before: "I",
    after: "(buy) coffee in a coffee shop.",
    answers: ["bought"],
  },
  {
    id: "read",
    before: "I",
    after: "(read) a book.",
    answers: ["read"],
  },
  {
    id: "take",
    before: "I",
    after: "(take) a bus to work.",
    answers: ["took"],
  },
] as const;

export const morningTicks = [
  { id: "got-up", label: "I got up at 7.30." },
  { id: "have", label: "I had a shower." },
  { id: "make", label: "I made my breakfast." },
  { id: "eat", label: "I ate breakfast." },
  { id: "drink", label: "I drank two cups of tea with my breakfast." },
  { id: "buy", label: "I bought coffee in a coffee shop." },
  { id: "read", label: "I read a book." },
  { id: "take", label: "I took a bus to work." },
] as const;

export const infinitiveGaps = [
  {
    id: "sea",
    after: "in the sea",
    answers: ["swim"],
  },
  {
    id: "museum",
    after: "a museum",
    answers: ["visit"],
  },
  {
    id: "go",
    after: "for a walk / shopping / to restaurants",
    answers: ["go"],
  },
  {
    id: "time",
    after: "a good time",
    answers: ["have"],
  },
  {
    id: "hotel",
    after: "in a hotel",
    answers: ["stay"],
  },
] as const;

export const holidayQuestionGaps = [
  {
    id: "shower",
    before: "Q:",
    after: "a shower this morning?",
    reply: "No, I didn't. I had a shower last night.",
    answers: ["Did you have"],
  },
  {
    id: "work",
    before: "Q: How",
    after: "to work?",
    reply: "I travelled by bus.",
    answers: ["did you travel", "did you get", "did you go"],
  },
  {
    id: "tv",
    before: "Q:",
    after: "TV last night?",
    reply: "No, I didn't. I read a book.",
    answers: ["Did you watch"],
  },
  {
    id: "phone",
    before: "Q:",
    after: "to anyone on the phone?",
    reply: "Yes, I did. I spoke to my friend.",
    answers: ["Did you speak", "Did you talk"],
  },
  {
    id: "dinner",
    before: "Q: Where",
    after: "dinner?",
    reply: "I ate dinner at home.",
    answers: ["did you eat", "did you have"],
  },
] as const;

export const ownAnswerPrompts = [
  { id: "get-up", prompt: "What time did you get up this morning?" },
  { id: "shower", prompt: "Did you have a shower this morning?" },
  { id: "work", prompt: "How did you travel to work?" },
  { id: "tv", prompt: "Did you watch TV last night?" },
  { id: "phone", prompt: "Did you speak to anyone on the phone?" },
  { id: "dinner", prompt: "Where did you eat dinner?" },
] as const;

export const reflectStatements58 = [
  "I can give a talk about when I was young.",
  "I can talk about a bad day.",
  "I can talk about a holiday.",
  "I can greet people.",
];
