/** Lesson 31 — Unit 3 A–C: My town · Is there wifi? · It's expensive! */

/**
 * Unit 3 audio → sections (files: public/sounds/Unit_3/RM_A1_SB_U3_R{n}.mp3)
 * Mapped from Roadmap A1 SB audioscripts (Unit 3 Recordings 1–16).
 * R1  — places vocab listen & repeat (A2)
 * R2  — Jack / Diana / Yuki town descriptions → photo match A–C (A5)
 * R3  — There's / There are pronunciation (A3 Notice the sound)
 * R4  — rooms + home things vocab (B2)
 * R5  — William & Jakub holiday-flat dialogue (B6)
 * R6  — Is there / Are there intonation (B5)
 * R7  — match flat descriptions a–d (B4)
 * R8  — Flat 2 listening follow-up (B4 optional)
 * R9  — What is there…? practice (B3 / speak)
 * R10 — furniture / flat detail questions (Review extras)
 * R11 — Flat 1 description (Review extras)
 * R12 — adjective sentences It's busy/quiet… (C2)
 * R13 — adjective + noun sentence stress (C4)
 * R14 — directions dialogue (Mary / David) (Review extras)
 * R15 — asking the way · cinema / supermarket (Review extras)
 * R16 — directions practice dialogues (Review extras)
 */

/** Extra Unit 3 tracks shown in Review (core Listen buttons use R1–R9, R12–R13). */
export const lesson31ExtraAudio = [
  {
    r: 10,
    exercise: "3B · Extra",
    title: "Furniture / flat detail questions",
  },
  {
    r: 11,
    exercise: "3B · Extra",
    title: "Flat 1 — rooms & town",
  },
  {
    r: 14,
    exercise: "3A · Extra",
    title: "Directions dialogue — Mary & David",
  },
  {
    r: 15,
    exercise: "3A · Extra",
    title: "Asking the way — cinema / supermarket",
  },
  {
    r: 16,
    exercise: "3A · Extra",
    title: "Directions practice dialogues",
  },
] as const;

/** Images live in public/images/lesson31/ */
export const lesson31Images = {
  townMapAg: "town-map-ag.png",
  townStreetCl: "town-street-cl.png",
  photosAbc: "photos-abc.png",
  brightonFlat: "brighton-flat.png",
  tokyoFuji: "tokyo-fuji.png",
  adjBusy: "adj-busy.png",
  adjQuiet: "adj-quiet.png",
  adjBig: "adj-big.png",
  adjSmall: "adj-small.png",
  adjOld: "adj-old.png",
  adjNew: "adj-new.png",
  adjCheap: "adj-cheap.png",
  adjExpensive: "adj-expensive.png",
  adjGood: "adj-good.png",
  adjBad: "adj-bad.png",
} as const;

/* ── Warm-up · Friend & family error correction ───────────────── */

export type WarmupFixOkLine = {
  id: string;
  kind: "ok";
  text: string;
};

export type WarmupFixEditLine = {
  id: string;
  kind: "fix";
  wrong: string;
  answers: readonly string[];
  /** Short UA tip (for {?} / {not is!} notes) */
  tipUa?: string;
};

export type WarmupFixLine = WarmupFixOkLine | WarmupFixEditLine;

export const warmupFixGroups: readonly {
  id: string;
  title: string;
  lines: readonly WarmupFixLine[];
}[] = [
  {
    id: "friend",
    title: "Friend",
    lines: [
      { id: "f1", kind: "ok", text: "I have a friend." },
      {
        id: "f2",
        kind: "ok",
        text: "What's her name? Her name is Hanna.",
      },
      {
        id: "f3",
        kind: "fix",
        wrong: "Where's she from? She is from Doneck.",
        answers: [
          "Where's she from? She is from Donetsk.",
          "Where's she from? She's from Donetsk.",
          "Where is she from? She is from Donetsk.",
          "Where is she from? She's from Donetsk.",
        ],
      },
      {
        id: "f4",
        kind: "fix",
        wrong: "Where is she live? She lives in Kyiv now.",
        answers: [
          "Where does she live? She lives in Kyiv now.",
          "Where does she live? She lives in Kyiv.",
        ],
      },
      {
        id: "f5",
        kind: "ok",
        text: "What is her job? She is a colorist. She loves her job.",
      },
      {
        id: "f6",
        kind: "fix",
        wrong: "How old is she? Hanna is thirty seven years old.",
        answers: [
          "How old is she? Hanna is thirty-seven years old.",
          "How old is she? Hanna is thirty seven years old.",
          "How old is she? She is thirty-seven years old.",
          "How old is she? She's thirty-seven years old.",
        ],
      },
      {
        id: "f7",
        kind: "fix",
        wrong: "What is she wear? She wears a glasses.",
        answers: ["What does she wear? She wears glasses."],
        tipUa:
          "{?} Питання в Present Simple з дієсловом wear → does: What does she wear? (не is). glasses — без a.",
      },
    ],
  },
  {
    id: "family",
    title: "Family",
    lines: [
      {
        id: "m1",
        kind: "fix",
        wrong: "What's Mom name? Mom name is Natali.",
        answers: [
          "What's Mom's name? Mom's name is Natali.",
          "What is Mom's name? Mom's name is Natali.",
          "What's your mom's name? My mom's name is Natali.",
          "What is your mom's name? My mom's name is Natali.",
        ],
      },
      {
        id: "m2",
        kind: "fix",
        wrong: "Where's she live? She lives is Sevastopol, Crimea.",
        answers: [
          "Where does she live? She lives in Sevastopol, Crimea.",
          "Where does she live? She lives in Sevastopol.",
        ],
      },
      {
        id: "m3",
        kind: "fix",
        wrong:
          "What year is she born? She was born in nineteen fifty four (1954).",
        answers: [
          "What year was she born? She was born in nineteen fifty-four (1954).",
          "What year was she born? She was born in nineteen fifty four (1954).",
          "When was she born? She was born in nineteen fifty-four (1954).",
          "When was she born? She was born in nineteen fifty four (1954).",
          "What year was she born? She was born in 1954.",
          "When was she born? She was born in 1954.",
        ],
        tipUa:
          "{not is!} was born — минулий час (was), не is. Також: When was she born?",
      },
      {
        id: "m4",
        kind: "fix",
        wrong:
          "Where's her job? She doesn't have a job, she is a pensioner.",
        answers: [
          "What's her job? She doesn't have a job, she is a pensioner.",
          "What is her job? She doesn't have a job, she is a pensioner.",
          "What's her job? She doesn't have a job. She is a pensioner.",
          "What does she do? She doesn't have a job, she is a pensioner.",
        ],
      },
      {
        id: "m5",
        kind: "fix",
        wrong:
          "What does she like do? She likes crocheting and knitting.",
        answers: [
          "What does she like doing? She likes crocheting and knitting.",
          "What does she like doing? She likes knitting and crocheting.",
        ],
        tipUa:
          "{?} like + -ing: What does she like doing? / She likes crocheting.",
      },
      {
        id: "b1",
        kind: "fix",
        wrong: "What is your brother name? My brother name is Andrii.",
        answers: [
          "What is your brother's name? My brother's name is Andrii.",
          "What's your brother's name? My brother's name is Andrii.",
        ],
      },
      {
        id: "b2",
        kind: "fix",
        wrong: "How old is he? He is fourty five years old (45).",
        answers: [
          "How old is he? He is forty-five years old (45).",
          "How old is he? He is forty five years old (45).",
          "How old is he? He's forty-five years old (45).",
          "How old is he? He is forty-five (45).",
          "How old is he? He is 45 years old.",
        ],
      },
      {
        id: "b3",
        kind: "fix",
        wrong:
          "What's he like doing? He likes surfing and drive a trucking",
        answers: [
          "What's he like doing? He likes surfing and driving a truck.",
          "What does he like doing? He likes surfing and driving a truck.",
          "What's he like doing? He likes surfing and he drives a truck.",
          "What's he like doing? He likes surfing and driving a truck",
        ],
      },
    ],
  },
] as const;

export function normalizeWarmupFix(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .trim()
    .replace(/\.+$/, ".")
    .replace(/\?+$/, "?");
}

export function isWarmupFixCorrect(
  value: string,
  answers: readonly string[],
): boolean {
  const n = normalizeWarmupFix(value);
  return answers.some((a) => {
    const na = normalizeWarmupFix(a);
    return n === na || n === na.replace(/\.$/, "") || `${n}.` === na;
  });
}

/* ── Part A · My town ─────────────────────────────────────────── */

export const placesVocab = [
  { en: "a train station", ua: "вокзал / станція" },
  { en: "a hotel", ua: "готель" },
  { en: "a café", ua: "кафе" },
  { en: "a bank", ua: "банк" },
  { en: "a restaurant", ua: "ресторан" },
  { en: "a supermarket", ua: "супермаркет" },
  { en: "a cinema", ua: "кінотеатр" },
  { en: "a park", ua: "парк" },
  { en: "a market", ua: "ринок" },
  { en: "a bookshop", ua: "книгарня" },
  { en: "a house", ua: "будинок" },
  { en: "a flat", ua: "квартира" },
] as const;

export const warmUpA = [
  "What city do you live in?",
  "Is there a park near your home?",
  "Is there a supermarket in your street?",
  "What places do you visit often?",
] as const;

export const grammarDrillA = [
  {
    cue: "park · singular · +",
    options: ["There's a park.", "There are a park.", "There isn't park."],
    answer: "There's a park.",
  },
  {
    cue: "three cafés · plural · +",
    options: [
      "There's three cafés.",
      "There are three cafés.",
      "There aren't three café.",
    ],
    answer: "There are three cafés.",
  },
  {
    cue: "bank · singular · −",
    options: [
      "There isn't a bank.",
      "There aren't a bank.",
      "There are no a bank.",
    ],
    answer: "There isn't a bank.",
  },
  {
    cue: "hotels · plural · −",
    options: [
      "There isn't any hotels.",
      "There aren't any hotels.",
      "There's no hotels.",
    ],
    answer: "There aren't any hotels.",
  },
  {
    cue: "supermarket · singular · +",
    options: [
      "There are a supermarket.",
      "There's a supermarket.",
      "There isn't supermarket.",
    ],
    answer: "There's a supermarket.",
  },
  {
    cue: "train station · singular · −",
    options: [
      "There isn't a train station.",
      "There aren't a train station.",
      "There are no train station.",
    ],
    answer: "There isn't a train station.",
  },
] as const;

export const gapDrillA = [
  {
    prompt: "___ a cinema in my town.",
    options: ["There's", "There are", "There aren't"],
    answer: "There's",
  },
  {
    prompt: "___ two parks near my house.",
    options: ["There's", "There are", "There isn't"],
    answer: "There are",
  },
  {
    prompt: "___ a hotel here. (−)",
    options: ["There isn't", "There aren't", "There are"],
    answer: "There isn't",
  },
  {
    prompt: "___ any bookshops in this street. (−)",
    options: ["There isn't", "There aren't", "There's"],
    answer: "There aren't",
  },
  {
    prompt: "___ no restaurants near the station.",
    options: ["There is", "There are", "There's"],
    answer: "There are",
  },
] as const;

export const noticeSoundsA = [
  "There's a park.",
  "There are three cafés.",
  "There isn't a bank.",
  "There are no supermarkets.",
  "There aren't any cinemas.",
] as const;

export const altDrillA = [
  {
    prompt: "There ___ two nice cafés.",
    options: ["is", "are"],
    answer: "are",
  },
  {
    prompt: "There is ___ hotel.",
    options: ["a", "any"],
    answer: "a",
  },
  {
    prompt: "There ___ a big market.",
    options: ["is", "are"],
    answer: "is",
  },
  {
    prompt: "There aren't ___ supermarkets here.",
    options: ["any", "a"],
    answer: "any",
  },
  {
    prompt: "There are ___ hotels in the city.",
    options: ["no", "a"],
    answer: "no",
  },
  {
    prompt: "There are ___.",
    options: ["a bookshop", "two bookshops"],
    answer: "two bookshops",
  },
  {
    prompt: "___ train station.",
    options: ["There's a", "There a"],
    answer: "There's a",
  },
  {
    prompt: "There are ___ banks here.",
    options: ["no", "any"],
    answer: "no",
  },
] as const;

export const pluralListsA = [
  {
    prompt: "one park; two parks; three ___",
    options: ["parks", "park", "parkes"],
    answer: "parks",
  },
  {
    prompt: "one ___; two cafés; three cafés",
    options: ["café", "cafés", "cafees"],
    answer: "café",
  },
  {
    prompt: "one restaurant; two restaurants; three ___",
    options: ["restaurants", "restaurant", "restaurantes"],
    answer: "restaurants",
  },
] as const;

export const uvoGaps = [
  {
    prompt: "Uvo is a good town. There ___ two parks, Thorpe Park and Stanley Park.",
    options: ["are", "is", "aren't"],
    answer: "are",
  },
  {
    prompt: "There are no restaurants, but there's ___ café – it's really good!",
    options: ["a", "an", "any"],
    answer: "a",
  },
  {
    prompt: "___ a train station and",
    options: ["There's", "There are", "There"],
    answer: "There's",
  },
  {
    prompt: "___ are two bookshops.",
    options: ["there", "There's", "There aren't"],
    answer: "there",
  },
  {
    prompt: "There ___ no cinemas, no hotels and",
    options: ["are", "is", "isn't"],
    answer: "are",
  },
  {
    prompt: "___ banks, but I love my town!",
    options: ["no", "any", "a"],
    answer: "no",
  },
] as const;

/** Town map A–L labels (book 3A · match letters to places 1–12) */
export const placesListA = [
  "a train station",
  "a hotel",
  "a café",
  "a bank",
  "a restaurant",
  "a supermarket",
  "a cinema",
  "a park",
  "a market",
  "a bookshop",
  "a house",
  "a flat",
] as const;

/** 1b · tap syllables to underline stress (R1) */
export const placeStressItems = [
  {
    n: 1,
    en: "train station",
    parts: ["train", "sta", "tion"],
    stressed: [0],
    breakAfter: [0],
  },
  {
    n: 2,
    en: "hotel",
    parts: ["ho", "tel"],
    stressed: [1],
    breakAfter: [] as number[],
  },
  {
    n: 3,
    en: "café",
    parts: ["ca", "fé"],
    stressed: [1],
    breakAfter: [] as number[],
  },
  {
    n: 4,
    en: "bank",
    parts: ["bank"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 5,
    en: "restaurant",
    parts: ["res", "tau", "rant"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 6,
    en: "supermarket",
    parts: ["su", "per", "mar", "ket"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 7,
    en: "cinema",
    parts: ["ci", "ne", "ma"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 8,
    en: "park",
    parts: ["park"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 9,
    en: "market",
    parts: ["mar", "ket"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 10,
    en: "bookshop",
    parts: ["book", "shop"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 11,
    en: "house",
    parts: ["house"],
    stressed: [0],
    breakAfter: [] as number[],
  },
  {
    n: 12,
    en: "flat",
    parts: ["flat"],
    stressed: [0],
    breakAfter: [] as number[],
  },
] as const;

export const mapPlacesA = [
  { letter: "A", place: "a café", tipUa: "BEAN — кафе" },
  { letter: "B", place: "a train station", tipUa: "GRAND CENTRAL — вокзал" },
  { letter: "C", place: "a hotel", tipUa: "Royal Plaza — готель" },
  { letter: "D", place: "a cinema", tipUa: "ROXY — кінотеатр" },
  { letter: "E", place: "a bookshop", tipUa: "Reading Corner — книгарня" },
  { letter: "F", place: "a market", tipUa: "прилавки з навісами — ринок" },
  { letter: "G", place: "a park", tipUa: "фонтан і дерева — парк" },
  { letter: "H", place: "a flat", tipUa: "балкони / навіси — квартира" },
  { letter: "I", place: "a restaurant", tipUa: "Three Amigos — ресторан" },
  { letter: "J", place: "a bank", tipUa: "RSB — банк" },
  { letter: "K", place: "a house", tipUa: "синій будинок — будинок" },
  { letter: "L", place: "a supermarket", tipUa: "Food Fresh — супермаркет" },
] as const;

/** Listening 3 · match speakers 1–3 with photos A–C (R2) */
export const matchSpeakersA = [
  {
    id: "1",
    speaker: "Jack",
    photo: "B",
    tipUa: "Jack: supermarket + bookshop → фото з книгами.",
  },
  {
    id: "2",
    speaker: "Diana",
    photo: "A",
    tipUa: "Diana: There's a market → вуличний ринок.",
  },
  {
    id: "3",
    speaker: "Yuki",
    photo: "C",
    tipUa: "Yuki: train station → вокзал.",
  },
] as const;

/** @deprecated use matchSpeakersA */
export const matchPlacesA = [
  { photo: "A", place: "a market", hint: "fruit & vegetables" },
  { photo: "B", place: "a bookshop", hint: "books on shelves" },
  { photo: "C", place: "a train station", hint: "trains & platform" },
] as const;

/** Listening 4 · Listen again. Choose a or b. */
export const listenChooseA = [
  {
    id: "1",
    who: "Jack",
    n: 1,
    options: [
      { key: "a", text: "There are three restaurants." },
      { key: "b", text: "There are three cafés." },
    ],
    answer: "b",
  },
  {
    id: "2",
    who: "Jack",
    n: 2,
    options: [
      { key: "a", text: "There is a supermarket." },
      { key: "b", text: "There is a market." },
    ],
    answer: "a",
  },
  {
    id: "3",
    who: "Diana",
    n: 3,
    options: [
      { key: "a", text: "There are three hotels." },
      { key: "b", text: "There aren't any hotels." },
    ],
    answer: "a",
  },
  {
    id: "4",
    who: "Diana",
    n: 4,
    options: [
      { key: "a", text: "There's a supermarket." },
      { key: "b", text: "There's a market." },
    ],
    answer: "b",
  },
  {
    id: "5",
    who: "Yuki",
    n: 5,
    options: [
      { key: "a", text: "There aren't any shops." },
      { key: "b", text: "There are two restaurants." },
    ],
    answer: "a",
  },
  {
    id: "6",
    who: "Yuki",
    n: 6,
    options: [
      { key: "a", text: "There isn't a train station." },
      { key: "b", text: "There isn't a bank." },
    ],
    answer: "b",
  },
] as const;

/** Grammar box gaps (book ex 5) — answers for blanks ¹ ² ³ */
export const grammarBoxA = [
  {
    id: "g1",
    n: 1,
    options: ["There is", "There are", "There's"] as const,
    answer: "There is",
  },
  {
    id: "g2",
    n: 2,
    options: ["There are", "There is", "There's"] as const,
    answer: "There are",
  },
  {
    id: "g3",
    n: 3,
    options: ["There are", "There is", "There aren't"] as const,
    answer: "There are",
  },
] as const;

export const speakA = [
  "There's a … in my town.",
  "There are … cafés / parks / shops.",
  "There isn't a … near my home.",
  "There aren't any … in my street.",
  "My favourite place is the …",
] as const;

export const differencePrompts = [
  "Student A: There are two cafés in my town.",
  "Student B: There are three cafés in my town.",
  "Student A: That's different!",
  "Find nine differences about the town.",
] as const;

/* ── Part B · Is there wifi? ──────────────────────────────────── */

export const homeVocab = [
  { en: "bathroom", ua: "ванна кімната" },
  { en: "bedroom", ua: "спальня" },
  { en: "kitchen", ua: "кухня" },
  { en: "living room", ua: "вітальня" },
  { en: "beds", ua: "ліжка" },
  { en: "lift", ua: "ліфт" },
  { en: "oven", ua: "духовка / піч" },
  { en: "shower", ua: "душ" },
  { en: "toilet", ua: "туалет" },
  { en: "TV", ua: "телевізор" },
  { en: "wifi", ua: "вайфай" },
] as const;

export const warmUpB = [
  "Where do you live — in a house or a flat?",
  "How many rooms are there?",
  "Is there a kitchen?",
  "Is there wifi?",
] as const;

export const photoQsB = [
  {
    q: "Where is the clock?",
    options: ["in the living room", "in the bathroom", "in the bedroom"],
    answer: "in the living room",
  },
  {
    q: "What is in the bathroom?",
    options: ["a shower and a toilet", "two beds", "an oven"],
    answer: "a shower and a toilet",
  },
  {
    q: "Where is the oven?",
    options: ["in the kitchen", "in the bedroom", "in the living room"],
    answer: "in the kitchen",
  },
  {
    q: "What is in the living room?",
    options: ["a table, a lamp and a TV", "two beds", "a shower"],
    answer: "a table, a lamp and a TV",
  },
  {
    q: "What is in the bedroom?",
    options: ["two beds", "an oven", "a lift"],
    answer: "two beds",
  },
] as const;

export const iconMatchB = [
  { icon: "E", thing: "toilet", hint: "WC" },
  { icon: "F", thing: "shower", hint: "water spray" },
  { icon: "G", thing: "beds", hint: "sleep" },
  { icon: "H", thing: "oven", hint: "cook" },
  { icon: "I", thing: "lift", hint: "elevator" },
  { icon: "J", thing: "TV", hint: "screen" },
  { icon: "K", thing: "wifi", hint: "internet" },
] as const;

export const flatsB = [
  {
    id: "1",
    label: "Flat 1",
    points: [
      "rooms: two bedrooms, kitchen, living room, bathroom",
      "shower",
      "oven",
      "no wifi",
    ],
  },
  {
    id: "2",
    label: "Flat 2",
    points: [
      "rooms: bedroom, bathroom",
      "two beds",
      "TV",
      "wifi",
      "no shower",
    ],
  },
  {
    id: "3",
    label: "Flat 3",
    points: [
      "rooms: bedroom, bathroom",
      "two beds",
      "shower",
      "TV",
      "no wifi",
    ],
  },
] as const;

export const articleGapsB = [
  { blank: "There is ___ bathroom", options: ["a", "an", "any"], answer: "a" },
  { blank: "___ shower", options: ["a", "an", "any"], answer: "a" },
  { blank: "and ___ TV.", options: ["a", "an", "any"], answer: "a" },
  {
    blank: "There isn't ___ oven.",
    options: ["a", "an", "any"],
    answer: "an",
  },
] as const;

export const grammarGapsB = [
  {
    prompt: "(?) ___ there a shower?",
    options: ["Is", "Are", "Do"],
    answer: "Is",
  },
  {
    prompt: "(?) ___ there any flats?",
    options: ["Is", "Are", "Do"],
    answer: "Are",
  },
  {
    prompt: "(+) Yes, there ___.",
    options: ["is", "are", "isn't"],
    answer: "is",
  },
  {
    prompt: "(−) No, there ___. (= is not)",
    options: ["isn't", "aren't", "is"],
    answer: "isn't",
  },
  {
    prompt: "(−) No, there ___. (= are not)",
    options: ["isn't", "aren't", "are"],
    answer: "aren't",
  },
  {
    prompt: "How many bedrooms ___ there?",
    options: ["is", "are", "do"],
    answer: "are",
  },
  {
    prompt: "There ___ one.",
    options: ["is", "are", "aren't"],
    answer: "is",
  },
  {
    prompt: "There ___ two.",
    options: ["is", "are", "isn't"],
    answer: "are",
  },
] as const;

export const dialogueGapsB = [
  {
    who: "Jakub",
    prompt: "Great! How many rooms ___?",
    options: ["are there", "is there", "there are"],
    answer: "are there",
  },
  {
    who: "William",
    prompt:
      "___ five rooms: two bedrooms, a living room, a kitchen and a bathroom.",
    options: ["There are", "There is", "Are there"],
    answer: "There are",
  },
  {
    who: "Jakub",
    prompt: "Wow! ___ a shower?",
    options: ["Is there", "Are there", "There is"],
    answer: "Is there",
  },
  {
    who: "William",
    prompt: "Yes, ___.",
    options: ["there is", "there are", "there isn't"],
    answer: "there is",
  },
  {
    who: "Jakub",
    prompt: "___ wifi?",
    options: ["Is there", "Are there", "There is"],
    answer: "Is there",
  },
  {
    who: "William",
    prompt: "Yes, ___.",
    options: ["there is", "there are", "there isn't"],
    answer: "there is",
  },
  {
    who: "Jakub",
    prompt: "___ TVs in the bedrooms?",
    options: ["Are there any", "Is there a", "There are"],
    answer: "Are there any",
  },
  {
    who: "William",
    prompt: "No, ___.",
    options: ["there aren't", "there isn't", "there are"],
    answer: "there aren't",
  },
  {
    who: "William",
    prompt: "___ a TV in the living room.",
    options: ["There's", "There are", "Are there"],
    answer: "There's",
  },
  {
    who: "Jakub",
    prompt: "___ a lift?",
    options: ["Is there", "Are there", "There is"],
    answer: "Is there",
  },
  {
    who: "William",
    prompt: "No, ___.",
    options: ["there isn't", "there aren't", "there is"],
    answer: "there isn't",
  },
] as const;

export const wordOrderB = [
  {
    scramble: "your house or flat / is / Where?",
    options: [
      "Where is your house or flat?",
      "Where your house or flat is?",
      "Is where your house or flat?",
    ],
    answer: "Where is your house or flat?",
  },
  {
    scramble: "are / many / How / there / rooms?",
    options: [
      "How many rooms are there?",
      "How rooms many are there?",
      "Are how many rooms there?",
    ],
    answer: "How many rooms are there?",
  },
  {
    scramble: "a / Is / shower / there?",
    options: [
      "Is there a shower?",
      "Is a shower there?",
      "There is a shower?",
    ],
    answer: "Is there a shower?",
  },
  {
    scramble: "there / are / TVs / many / How?",
    options: [
      "How many TVs are there?",
      "How TVs many are there?",
      "Are there how many TVs?",
    ],
    answer: "How many TVs are there?",
  },
  {
    scramble: "wifi / there / Is?",
    options: ["Is there wifi?", "Is wifi there?", "There is wifi?"],
    answer: "Is there wifi?",
  },
] as const;

export const flatCompareRows = [
  "price per night",
  "number of rooms",
  "number of bedrooms",
  "number of beds",
  "bathroom",
  "shower / toilet",
  "living room",
  "TV",
  "wifi",
  "kitchen",
  "oven",
  "lift",
] as const;

export const speakB = [
  "How many rooms are there?",
  "Is there a shower?",
  "Is there wifi?",
  "Are there any TVs?",
  "Is there a lift / an oven?",
  "Choose a flat for your holiday.",
] as const;

/* ── Part C · It's expensive! ─────────────────────────────────── */

export const oppositePairs = [
  {
    a: "busy",
    b: "quiet",
    uaA: "жвавий / людний",
    uaB: "тихий",
    imgA: "adj-busy.png",
    imgB: "adj-quiet.png",
  },
  {
    a: "big",
    b: "small",
    uaA: "великий",
    uaB: "маленький",
    imgA: "adj-big.png",
    imgB: "adj-small.png",
  },
  {
    a: "old",
    b: "new",
    uaA: "старий",
    uaB: "новий",
    imgA: "adj-old.png",
    imgB: "adj-new.png",
  },
  {
    a: "cheap",
    b: "expensive",
    uaA: "дешевий",
    uaB: "дорогий",
    imgA: "adj-cheap.png",
    imgB: "adj-expensive.png",
  },
  {
    a: "good",
    b: "bad",
    uaA: "хороший",
    uaB: "поганий",
    imgA: "adj-good.png",
    imgB: "adj-bad.png",
  },
] as const;

export const adjSentences = [
  { en: "It's busy.", ua: "Тут людно." },
  { en: "It's quiet.", ua: "Тут тихо." },
  { en: "It's big.", ua: "Воно велике." },
  { en: "It's small.", ua: "Воно маленьке." },
  { en: "It's old.", ua: "Воно старе." },
  { en: "It's new.", ua: "Воно нове." },
  { en: "It's cheap.", ua: "Воно дешеве." },
  { en: "It's expensive.", ua: "Воно дороге." },
  { en: "It's good.", ua: "Воно хороше." },
  { en: "It's bad.", ua: "Воно погане." },
] as const;

export const warmUpC = [
  "Is your town busy or quiet?",
  "Is there a big supermarket?",
  "Are the cafés cheap or expensive?",
  "Is there an old cinema?",
] as const;

export const oppositeGaps = [
  {
    prompt: "This supermarket isn't good. It's ___.",
    options: ["bad", "busy", "cheap"],
    answer: "bad",
  },
  {
    prompt: "This bank isn't small. It's ___.",
    options: ["big", "quiet", "new"],
    answer: "big",
  },
  {
    prompt: "This park isn't new. It's ___.",
    options: ["old", "expensive", "good"],
    answer: "old",
  },
  {
    prompt: "This hotel isn't cheap. It's ___.",
    options: ["expensive", "quiet", "small"],
    answer: "expensive",
  },
  {
    prompt: "This café isn't busy. It's ___.",
    options: ["quiet", "bad", "new"],
    answer: "quiet",
  },
] as const;

export const northNorfolk = [
  {
    place: "West Runton",
    text: "This is a quiet town. There is a café, a good restaurant and six small shops. There are no hotels. There is a small train station.",
  },
  {
    place: "Sheringham",
    text: "This town is busy. It's big! There is a good market on Saturdays, and there are coffee shops, cheap bookshops and more small shops. There are hotels, restaurants and cafés. There is also a park.",
  },
  {
    place: "Cromer",
    text: "This town is good for holidays. It isn't expensive. There are cheap shops and restaurants here. There is an old cinema and there is a big hotel in the centre.",
  },
] as const;

export const photoMatchC = [
  {
    photo: "A",
    hint: "rural train station platform",
    place: "West Runton",
  },
  {
    photo: "B",
    hint: "big Victorian-style hotel",
    place: "Cromer",
  },
  {
    photo: "C",
    hint: "busy town square / clock tower",
    place: "Sheringham",
  },
] as const;

export const tfItems = [
  {
    statement: "Sheringham is a small town.",
    answer: "F" as const,
    tip: "Sheringham is busy and big.",
  },
  {
    statement: "There are six hotels in West Runton.",
    answer: "F" as const,
    tip: "There are no hotels. There are six small shops.",
  },
  {
    statement: "The shops in Cromer are not expensive.",
    answer: "T" as const,
    tip: "There are cheap shops.",
  },
  {
    statement: "There are cheap bookshops in Sheringham.",
    answer: "T" as const,
    tip: "Yes — cheap bookshops.",
  },
  {
    statement: "The restaurant in West Runton is bad.",
    answer: "F" as const,
    tip: "There is a good restaurant.",
  },
  {
    statement: "The cinema in Cromer isn't new.",
    answer: "T" as const,
    tip: "There is an old cinema.",
  },
] as const;

export const wordOrderC = [
  {
    scramble: "expensive / This / restaurant / is",
    options: [
      "This restaurant is expensive.",
      "This is restaurant expensive.",
      "Expensive is this restaurant.",
    ],
    answer: "This restaurant is expensive.",
  },
  {
    scramble: "small / park / is / There / a",
    options: [
      "There is a small park.",
      "There a small park is.",
      "Is there a small park.",
    ],
    answer: "There is a small park.",
  },
  {
    scramble: "are / hotels / cheap / not / These",
    options: [
      "These hotels are not cheap.",
      "These are hotels not cheap.",
      "Not these hotels are cheap.",
    ],
    answer: "These hotels are not cheap.",
  },
  {
    scramble: "busy / This / station / a / is",
    options: [
      "This is a busy station.",
      "This station is a busy.",
      "A busy this is station.",
    ],
    answer: "This is a busy station.",
  },
  {
    scramble: "big / not / is / supermarket / It / a",
    options: [
      "It is not a big supermarket.",
      "It not is a big supermarket.",
      "A big supermarket it is not.",
    ],
    answer: "It is not a big supermarket.",
  },
  {
    scramble: "bank / new / Is / this / a ?",
    options: [
      "Is this a new bank?",
      "Is a new this bank?",
      "This is a new bank?",
    ],
    answer: "Is this a new bank?",
  },
  {
    scramble: "Is / your / a / station / big / town / in / there ?",
    options: [
      "Is there a big station in your town?",
      "Is a big station there in your town?",
      "There is a big station in your town?",
    ],
    answer: "Is there a big station in your town?",
  },
  {
    scramble: "restaurants / good / town / your / there / any / in / Are ?",
    options: [
      "Are there any good restaurants in your town?",
      "Are any good restaurants there in your town?",
      "There are any good restaurants in your town?",
    ],
    answer: "Are there any good restaurants in your town?",
  },
] as const;

export const speakC = [
  "Is there a big hotel?",
  "Is the cinema good?",
  "Are there any cheap shops?",
  "Is your town busy or quiet?",
  "Describe three towns/cities to the class.",
] as const;

export const questionStartersC = [
  "Is there a __________?",
  "Is the __________?",
  "Is there a __________?",
  "Are there any __________ in your town?",
  "Is your town's __________?",
  "Is the __________ in your town __________?",
] as const;

export const exitQs = [
  "Name 5 places in a town.",
  "There's / There are / isn't / aren't",
  "Ask: Is there a/an …? / Are there any …?",
  "Name 4 rooms + 4 things in a home.",
  "Say 5 opposite adjective pairs.",
  "be + adj / adj + noun — one example each.",
  "Describe your town in 4–6 sentences.",
] as const;

/* ── Warm-up · Fix the mistakes (Friend & Family) ─────────────── */

export type FixMistakeLine = {
  id: string;
  group: "friend" | "family";
  wrong: string;
  /** Accepted corrections (compared after normalize) */
  answers: readonly string[];
  /** Short UA tip under the line */
  tipUa?: string;
  /** If true, line has no required change (context only) */
  okAsIs?: boolean;
};

export const fixMistakeGroups = [
  { id: "friend" as const, title: "Friend", titleUa: "Друг / подруга" },
  { id: "family" as const, title: "Family", titleUa: "Сім'я" },
] as const;

export const fixMistakeLines: readonly FixMistakeLine[] = [
  {
    id: "f1",
    group: "friend",
    wrong: "I have a friend.",
    answers: ["I have a friend."],
    okAsIs: true,
  },
  {
    id: "f2",
    group: "friend",
    wrong: "What's her name? Her name is Hanna.",
    answers: [
      "What's her name? Her name is Hanna.",
      "What is her name? Her name is Hanna.",
    ],
    okAsIs: true,
  },
  {
    id: "f3",
    group: "friend",
    wrong: "Where's she from? She is from Doneck.",
    answers: [
      "Where's she from? She is from Donetsk.",
      "Where's she from? She's from Donetsk.",
      "Where is she from? She is from Donetsk.",
      "Where is she from? She's from Donetsk.",
    ],
    tipUa: "Назва міста англійською: Donetsk (не Doneck).",
  },
  {
    id: "f4",
    group: "friend",
    wrong: "Where is she live? She lives in Kyiv now.",
    answers: [
      "Where does she live? She lives in Kyiv now.",
      "Where does she live? She lives in Kiev now.",
    ],
    tipUa: "Питання в Present Simple: Where does she live? (не is).",
  },
  {
    id: "f5",
    group: "friend",
    wrong: "What is her job? She is a colorist. She loves her job.",
    answers: [
      "What is her job? She is a colorist. She loves her job.",
      "What's her job? She's a colorist. She loves her job.",
      "What is her job? She is a colourist. She loves her job.",
    ],
    okAsIs: true,
  },
  {
    id: "f6",
    group: "friend",
    wrong: "How old is she? Hanna is thirty seven years old.",
    answers: [
      "How old is she? Hanna is thirty-seven years old.",
      "How old is she? Hanna is thirty seven years old.",
      "How old is she? Hanna is 37 years old.",
    ],
    tipUa: "Можна з дефісом: thirty-seven (необов'язково).",
  },
  {
    id: "f7",
    group: "friend",
    wrong: "What is she wear?",
    answers: ["What does she wear?", "What does she wear"],
    tipUa: "What does she wear? — do/does + інфінітив (не is).",
  },
  {
    id: "f8",
    group: "friend",
    wrong: "She wears a glasses.",
    answers: ["She wears glasses.", "She wears glasses"],
    tipUa: "glasses — без a (окуляри вже «множина»).",
  },

  {
    id: "m1",
    group: "family",
    wrong: "What's Mom name? Mom name is Natali.",
    answers: [
      "What's Mom's name? Mom's name is Natali.",
      "What's Mom's name? My mom's name is Natali.",
      "What is your mom's name? My mom's name is Natali.",
      "What's Mum's name? Mum's name is Natali.",
      "What is Mom's name? Mom's name is Natali.",
    ],
    tipUa: "Присвійний відмінок: Mom's name / your mom's name.",
  },
  {
    id: "m2",
    group: "family",
    wrong: "Where's she live? She lives is Sevastopol, Crimea.",
    answers: [
      "Where does she live? She lives in Sevastopol, Crimea.",
      "Where does she live? She lives in Sevastopol, Crimea",
    ],
    tipUa: "Where does she live? + lives in (не lives is).",
  },
  {
    id: "m3",
    group: "family",
    wrong:
      "What year is she born? She was born in nineteen fifty four (1954).",
    answers: [
      "What year was she born? She was born in nineteen fifty-four (1954).",
      "What year was she born? She was born in nineteen fifty four (1954).",
      "When was she born? She was born in nineteen fifty-four (1954).",
      "When was she born? She was born in nineteen fifty four (1954).",
      "What year was she born? She was born in 1954.",
      "When was she born? She was born in 1954.",
    ],
    tipUa: "born → was (не is): What year was she born? / When was she born?",
  },
  {
    id: "m4",
    group: "family",
    wrong: "Where's her job? She doesn't have a job, she is a pensioner.",
    answers: [
      "What's her job? She doesn't have a job, she is a pensioner.",
      "What is her job? She doesn't have a job, she is a pensioner.",
      "What does she do? She doesn't have a job, she is a pensioner.",
      "What's her job? She doesn't have a job, she's a pensioner.",
      "What does she do? She doesn't have a job, she's a pensioner.",
    ],
    tipUa: "What's her job? / What does she do? (не Where's her job?).",
  },
  {
    id: "m5",
    group: "family",
    wrong: "What does she like do? She likes crocheting and knitting.",
    answers: [
      "What does she like doing? She likes crocheting and knitting.",
      "What does she like doing? She likes crocheting and knitting",
    ],
    tipUa: "like + -ing: like doing / likes crocheting.",
  },
  {
    id: "m6",
    group: "family",
    wrong: "What is your brother name? My brother name is Andrii.",
    answers: [
      "What is your brother's name? My brother's name is Andrii.",
      "What's your brother's name? My brother's name is Andrii.",
      "What is your brother's name? My brother's name is Andrey.",
    ],
    tipUa: "brother's name — присвійний 's.",
  },
  {
    id: "m7",
    group: "family",
    wrong: "How old is he? He is fourty five years old (45).",
    answers: [
      "How old is he? He is forty-five years old (45).",
      "How old is he? He is forty five years old (45).",
      "How old is he? He's forty-five years old (45).",
      "How old is he? He is 45 years old.",
      "How old is he? He's 45 years old.",
    ],
    tipUa: "forty (не fourty); можна forty-five.",
  },
  {
    id: "m8",
    group: "family",
    wrong: "What's he like doing? He likes surfing and drive a trucking",
    answers: [
      "What's he like doing? He likes surfing and driving a truck.",
      "What does he like doing? He likes surfing and driving a truck.",
      "What's he like doing? He likes surfing and he drives a truck.",
      "What does he like doing? He likes surfing and he drives a truck.",
      "What's he like doing? He likes surfing and driving a truck",
      "What does he like doing? He likes surfing and driving a truck",
    ],
    tipUa: "like + -ing: driving a truck (не drive a trucking).",
  },
] as const;
