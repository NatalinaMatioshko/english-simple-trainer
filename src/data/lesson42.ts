/**
 * Lesson 42 — Unit 5A My week (+ soft start of 5B travel)
 * Audio: public/sounds/Unit_5/RM_A1_SB_U5_R{n}.mp3
 * Images: public/images/lesson42/
 */

export const SOUND_U5 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_5/RM_A1_SB_U5_R${r}.mp3`;

export const IMG42 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson42/${file}`;

/** Roadmap A1 SB · Unit 5 audio scripts (for Transcript buttons) */
export const u5Scripts = {
  1: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  2: [
    "On Mondays, I work in a bookshop.",
    "On Tuesdays, I go to university.",
    "On Wednesdays, I have lunch with my class.",
    "On Thursdays, I have dinner at my mum's house.",
    "On Fridays, I study at home.",
    "On Saturdays, I get up late.",
    "On Sundays, I watch TV.",
  ],
  3: [
    "On Fridays, I have breakfast at ten.",
    "I go to work at eight thirty.",
    "At twelve o'clock, I have lunch.",
    "I watch TV from seven thirty to eight thirty.",
    "From ten to twelve, I play football with my friends.",
  ],
  4: [
    "I go to work by bus.",
    "I take a boat to work.",
    "I cycle to work. I love my bike!",
    "I drive to my parents' house.",
    "I travel to work by taxi.",
    "I go to the office by train.",
    "I walk home.",
  ],
  5: [
    { who: "Donna", text: "Nice bike, Tim!" },
    { who: "Tim", text: "Thanks, Donna!" },
    { who: "Donna", text: "Do you cycle to work every day?" },
    { who: "Tim", text: "Yes, I do." },
    { who: "Donna", text: "Wow. What time do you leave home?" },
    { who: "Tim", text: "At 6." },
    {
      who: "Donna",
      text: "6?! And you arrive at 8?? Wow. That's a really long journey to work…",
    },
    { who: "Tim", text: "Yes, but I like it. How do you travel to work?" },
    { who: "Donna", text: "I take the bus. I leave home at 7.30." },
    { who: "Tim", text: "Oh, 7.30, OK. Do you cycle to work sometimes?" },
    { who: "Donna", text: "Umm, no. No, I don't." },
    { who: "Tim", text: "Oh, OK. Well, see you later!" },
  ],
  6: [
    { who: "A", text: "Do you go to work by bus?" },
    { who: "B", text: "Yes, I do." },
    { who: "A", text: "Do they walk to work?" },
    { who: "B", text: "Yes, they do." },
  ],
  7: [
    { who: "A", text: "Excuse me. What time is the London train?" },
    { who: "B", text: "It's at three o'clock." },
    { who: "A", text: "Three o'clock. Great. Thanks." },
    { who: "B", text: "You're welcome." },
    { who: "A", text: "Oh, sorry, and what time does it arrive in London?" },
    { who: "B", text: "At five o'clock." },
  ],
  8: [
    { who: "A", text: "Excuse me. Where is the bank?" },
    { who: "B", text: "It's next to the hotel." },
    { who: "A", text: "Thank you." },
    { who: "B", text: "You're welcome." },
  ],
} as const;

/** Warm-up · picture → choose the part of the day (TTS on correct) */
export const partDayQuiz = [
  {
    id: "morning",
    file: "part-day-morning.png",
    answer: "morning",
    options: ["morning", "noon"] as const,
    alt: "Sunrise, rooster and alarm clock",
  },
  {
    id: "noon",
    file: "part-day-noon.png",
    answer: "noon",
    options: ["afternoon", "noon"] as const,
    alt: "Sun high overhead and clock at 12:00",
  },
  {
    id: "afternoon",
    file: "part-day-afternoon.png",
    answer: "afternoon",
    options: ["afternoon", "evening"] as const,
    alt: "Park in soft light and clock at 5:00",
  },
  {
    id: "evening",
    file: "part-day-evening.png",
    answer: "evening",
    options: ["morning", "evening"] as const,
    alt: "Evening lights and clock at about 8:00",
  },
  {
    id: "night",
    file: "part-day-night.png",
    answer: "night",
    options: ["night", "afternoon"] as const,
    alt: "Dark sky with moon and stars, clock late evening",
  },
  {
    id: "midnight",
    file: "part-day-midnight.png",
    answer: "midnight",
    options: ["noon", "midnight"] as const,
    alt: "Dark midnight sky and clock at 12:00",
  },
] as const;

/** 1 · Match pictures A–J with sentences 1–10 */
export const everydaySentences = [
  { n: 1, text: "I get up at six thirty.", verb: "get up" },
  { n: 2, text: "I have breakfast at 7 o'clock.", verb: "have breakfast" },
  { n: 3, text: "I go to work at seven forty-five.", verb: "go to work" },
  { n: 4, text: "I work from nine to five thirty.", verb: "work" },
  { n: 5, text: "I have lunch at twelve thirty.", verb: "have lunch" },
  { n: 6, text: "I go home at half past five.", verb: "go home" },
  { n: 7, text: "I have dinner at 7 o'clock.", verb: "have dinner" },
  { n: 8, text: "I watch TV at seven thirty.", verb: "watch TV" },
  { n: 9, text: "I study at 9 o'clock.", verb: "study" },
  { n: 10, text: "I go to bed at half past ten.", verb: "go to bed" },
] as const;

/** Keep for vocab / week gaps reference */
export const everydayActivities = everydaySentences.map((s) => ({
  id: s.n,
  verb: s.verb,
  ua: "",
  full: s.text.replace(/^I /, "").replace(/\.$/, ""),
  example: s.text,
}));

/**
 * Pictures A–J → sentence numbers (Unit 5A ex.1)
 * A work · B dinner · C lunch · D bed 10:30 · E get up ·
 * F leave/go to work · G walk/go home · H breakfast · I TV · J study
 */
export const activityPics = [
  { id: "A", file: "pic-a-work.png", label: "at the computer", answer: 4 },
  { id: "B", file: "pic-b-dinner.png", label: "eating dinner", answer: 7 },
  { id: "C", file: "pic-c-lunch.png", label: "eating lunch", answer: 5 },
  { id: "D", file: "pic-d-getup-late.png", label: "in bed · 10:30", answer: 10 },
  { id: "E", file: "pic-e-getup.png", label: "getting up", answer: 1 },
  { id: "F", file: "pic-f-leave.png", label: "leaving home", answer: 3 },
  { id: "G", file: "pic-g-walk.png", label: "walking", answer: 6 },
  { id: "H", file: "pic-h-breakfast.png", label: "breakfast", answer: 2 },
  { id: "I", file: "pic-tv.png", label: "watching TV", answer: 8 },
  { id: "J", file: "pic-study.png", label: "studying", answer: 9 },
] as const;

export const picMatchOptions = everydaySentences.map((s) => ({
  n: s.n,
  label: s.text,
})) as readonly { n: number; label: string }[];

/** 3a · Week schedule (R1 / 5.1) */
export const weekSchedule = [
  { day: "Monday", cue: "bookshop", answer: "work in a bookshop" },
  { day: "Tuesday", cue: "university", answer: "go to university" },
  { day: "Wednesday", cue: "lunch with class", answer: "have lunch with my class" },
  {
    day: "Thursday",
    cue: "dinner at my mum's house",
    answer: "have dinner at my mum's house",
  },
  { day: "Friday", cue: "English homework", answer: "study at home" },
  { day: "Saturday", cue: "sleep until midday!", answer: "get up late" },
  { day: "Sunday", cue: "TV", answer: "watch TV" },
] as const;

/** 3b · Complete with verbs from ex.1 (R2 / 5.2) */
export const weekGaps = [
  {
    day: "Mondays",
    dayLabel: "On Mondays,",
    after: "in a bookshop.",
    answers: ["work", "Work"],
  },
  {
    day: "Tuesdays",
    dayLabel: "On Tuesdays,",
    after: "university.",
    answers: ["go to", "Go to"],
  },
  {
    day: "Wednesdays",
    dayLabel: "On Wednesdays,",
    after: "lunch with my class.",
    answers: ["have", "Have"],
  },
  {
    day: "Thursdays",
    dayLabel: "On Thursdays,",
    after: "dinner at my mum's house.",
    answers: ["have", "Have"],
  },
  {
    day: "Fridays",
    dayLabel: "On Fridays,",
    after: "at home.",
    answers: ["study", "Study"],
  },
  {
    day: "Saturdays",
    dayLabel: "On Saturdays,",
    after: "late.",
    answers: ["get up", "Get up"],
  },
  {
    day: "Sundays",
    dayLabel: "On Sundays,",
    after: "TV.",
    answers: ["watch", "Watch"],
  },
] as const;

/** 5 · Mari's week — reading */
export const mariText = {
  paragraphs: [
    "From Monday to Friday, I get up at 7 o'clock. I have breakfast at seven thirty and I go to work at 8 o'clock by bus. I'm a nurse in the San Juan Hospital. I have lunch at 1 o'clock and I go home at five forty-five. In the evening, I have dinner at home and watch TV or study English. I go to bed at eleven.",
    "At the weekend, I don't work. On Saturdays, I get up at 10 o'clock. I have breakfast and go to my sister's flat. We have lunch and talk. Later, I go to the shops. At 6 or 7 o'clock, I have dinner with friends at a restaurant. I go to bed at 12. I love the weekend!",
  ],
  underlines: [
    "7 o'clock",
    "seven thirty",
    "work",
    "8 o'clock",
    "by bus",
    "nurse in the San Juan Hospital",
    "1 o'clock",
    "five forty-five",
    "watch TV",
    "study English",
    "eleven",
    "don't work",
    "10 o'clock",
    "go to my sister's flat",
    "We have lunch and talk",
    "go to the shops",
    "have dinner with friends at a restaurant",
    "12",
  ],
} as const;

export const mariQuestions = [
  {
    id: 1,
    q: "What is her job?",
    answers: [
      "She's a nurse.",
      "She's a nurse",
      "She is a nurse.",
      "She is a nurse",
      "a nurse",
      "nurse",
      "She's a nurse in the San Juan Hospital.",
      "She's a nurse in the San Juan Hospital",
      "She is a nurse in the San Juan Hospital.",
      "She is a nurse in the San Juan Hospital",
    ],
  },
  {
    id: 2,
    q: "Are the week and the weekend very different for her?",
    answers: [
      "Yes.",
      "Yes",
      "Yes, they are.",
      "Yes, they are",
      "Yes. She works in the week and she doesn't work at the weekend.",
      "Yes. She works from Monday to Friday and she doesn't work at the weekend.",
    ],
  },
] as const;

/** Speak prompts — change Mari's text so it's true for you */
export const personalizePrompts = [
  "From Monday to Friday, I get up at …",
  "I go to work / university / … at … by …",
  "I'm a … / I work as a … / I'm a student.",
  "I have lunch at …",
  "I go home at …",
  "In the evening, I …",
  "I go to bed at …",
  "At the weekend, I don't … / I …",
] as const;

/** HW42 · same prompts in Ukrainian (student writes English) */
export const personalizePromptsUa = [
  "З понеділка по п'ятницю я встаю о …",
  "Я їду на роботу / університет / … о … (на / автобусом / …)",
  "Я … / Я працюю … / Я студент.",
  "Я обідаю о …",
  "Я йду / їду додому о …",
  "Увечері я …",
  "Я лягаю спати о …",
  "У вихідні я не … / Я …",
] as const;

/** Grammar · Present Simple I (textbook box · ex.6) */
export const psIForms = [
  { form: "+", example: "I / You / We / They go to work." },
  { form: "−", example: "I / You / We / They don't work." },
] as const;

/** Ex.6 · choose on / at */
export const grammarOnAt42 = [
  { id: 1, options: ["on", "at"] as const, answer: "at" },
  { id: 2, options: ["on", "at"] as const, answer: "at" },
  { id: 3, options: ["on", "at"] as const, answer: "on" },
  { id: 4, options: ["On", "At"] as const, answer: "On" },
] as const;

/**
 * Ex.7a · sentence stress (R3 / 5.3)
 * Content words: days, main verbs, nouns, numbers / times.
 * Item 1 is the book example (pre-underlined).
 */
export const stressSentences42 = [
  {
    id: 1,
    words: ["On", "Fridays,", "I", "have", "breakfast", "at", "ten."],
    stressed: [1, 4, 6] as number[],
    example: true,
  },
  {
    id: 2,
    words: ["I", "go", "to", "work", "at", "eight", "thirty."],
    stressed: [1, 3, 5, 6] as number[],
    example: false,
  },
  {
    id: 3,
    words: ["At", "twelve", "o'clock,", "I", "have", "lunch."],
    stressed: [1, 2, 5] as number[],
    example: false,
  },
  {
    id: 4,
    words: [
      "I",
      "watch",
      "TV",
      "from",
      "seven",
      "thirty",
      "to",
      "eight",
      "thirty.",
    ],
    stressed: [1, 2, 4, 5, 7, 8] as number[],
    example: false,
  },
  {
    id: 5,
    words: [
      "From",
      "ten",
      "to",
      "twelve,",
      "I",
      "play",
      "football",
      "with",
      "my",
      "friends.",
    ],
    stressed: [1, 3, 5, 6, 9] as number[],
    example: false,
  },
] as const;

/** Ex.8 · put words in order — student types the full sentence */
export const orderWrite42 = [
  {
    scramble: "get up / six / Mondays / I / at / on",
    answers: [
      "I get up at six on Mondays.",
      "I get up at six on Mondays",
      "On Mondays, I get up at six.",
      "On Mondays, I get up at six",
      "On Mondays I get up at six.",
      "On Mondays I get up at six",
    ],
  },
  {
    scramble: "breakfast / I / seven thirty / have / at",
    answers: [
      "I have breakfast at seven thirty.",
      "I have breakfast at seven thirty",
      "I have breakfast at 7.30.",
      "I have breakfast at 7.30",
      "I have breakfast at 7:30.",
      "I have breakfast at 7:30",
    ],
  },
  {
    scramble: "work / go to / I / half past eight / at",
    answers: [
      "I go to work at half past eight.",
      "I go to work at half past eight",
      "I go to work at 8.30.",
      "I go to work at 8.30",
      "I go to work at 8:30.",
      "I go to work at 8:30",
    ],
  },
  {
    scramble: "work / nine / five / to / from / I",
    answers: [
      "I work from nine to five.",
      "I work from nine to five",
      "I work from 9 to 5.",
      "I work from 9 to 5",
      "I work from nine to five o'clock.",
      "I work from nine to five o'clock",
    ],
  },
  {
    scramble: "have / dinner / with / I / at / seven / my family",
    answers: [
      "I have dinner with my family at seven.",
      "I have dinner with my family at seven",
      "I have dinner at seven with my family.",
      "I have dinner at seven with my family",
      "At seven, I have dinner with my family.",
      "At seven, I have dinner with my family",
      "At seven I have dinner with my family.",
      "At seven I have dinner with my family",
    ],
  },
  {
    scramble: "bed / late / go / I / don't / to",
    answers: [
      "I don't go to bed late.",
      "I don't go to bed late",
      "I do not go to bed late.",
      "I do not go to bed late",
    ],
  },
  {
    scramble: "Saturdays / don't / I / and / Sundays / work / on",
    answers: [
      "I don't work on Saturdays and Sundays.",
      "I don't work on Saturdays and Sundays",
      "I do not work on Saturdays and Sundays.",
      "I do not work on Saturdays and Sundays",
      "On Saturdays and Sundays, I don't work.",
      "On Saturdays and Sundays, I don't work",
      "On Saturdays and Sundays I don't work.",
      "On Saturdays and Sundays I don't work",
      "I don't work on Saturdays and on Sundays.",
      "I don't work on Saturdays and on Sundays",
    ],
  },
  {
    scramble: "watch TV / on / and read books / I / Saturdays",
    answers: [
      "I watch TV and read books on Saturdays.",
      "I watch TV and read books on Saturdays",
      "On Saturdays, I watch TV and read books.",
      "On Saturdays, I watch TV and read books",
      "On Saturdays I watch TV and read books.",
      "On Saturdays I watch TV and read books",
      "I watch TV on Saturdays and read books.",
      "I watch TV on Saturdays and read books",
    ],
  },
] as const;

/** Soft start · Part 2 A long journey · travel chunks */
export const travelChunks = [
  {
    en: "go to work by bus",
    ua: "їхати на роботу автобусом",
    example: "I go to work by bus.",
  },
  {
    en: "take the train",
    ua: "їхати поїздом",
    example: "I take the train to work.",
  },
  {
    en: "cycle to work",
    ua: "їхати на роботу велосипедом",
    example: "I cycle to work.",
  },
  {
    en: "drive to…",
    ua: "їхати машиною до…",
    example: "I drive to my parents' house.",
  },
  {
    en: "walk home",
    ua: "іти додому пішки",
    example: "I walk home.",
  },
  {
    en: "leave home",
    ua: "виходити з дому",
    example: "I leave home at about 8 o'clock.",
  },
  {
    en: "arrive at work",
    ua: "прибувати на роботу",
    example: "I arrive at work at 8.30.",
  },
] as const;

/** Part 2 · 1a Match photos A–G with sentences 1–7 */
export const travelSentences = [
  { n: 1, text: "I go to work by bus." },
  { n: 2, text: "I take a boat to work." },
  { n: 3, text: "I cycle to work. I love my bike!" },
  { n: 4, text: "I drive to my parents' house." },
  { n: 5, text: "I travel to work by taxi." },
  { n: 6, text: "I go to the office by train." },
  { n: 7, text: "I walk home." },
] as const;

export const travelPics = [
  { id: "A", file: "travel-a-bus.png", label: "buses", answer: 1 },
  { id: "B", file: "travel-b-drive.png", label: "cars in traffic", answer: 4 },
  { id: "C", file: "travel-c-taxi.png", label: "taxis", answer: 5 },
  { id: "D", file: "travel-d-cycle.png", label: "bike", answer: 3 },
  { id: "E", file: "travel-e-train.png", label: "train", answer: 6 },
  { id: "F", file: "travel-f-boat.png", label: "boat / ferry", answer: 2 },
  { id: "G", file: "travel-g-walk.png", label: "walking", answer: 7 },
] as const;

export const travelMatchOptions = travelSentences.map((s) => ({
  n: s.n,
  label: s.text,
})) as readonly { n: number; label: string }[];

/** Part 2 · 2a Complete transport phrases with verb groups a–c */
export const transportVerbGroups = [
  { id: "a", label: "cycle / drive / walk" },
  { id: "b", label: "go / travel" },
  { id: "c", label: "take" },
] as const;

export const transportPhrases2a = [
  {
    id: 1,
    after: "to work by bike / car / boat / taxi / train / bus",
    answer: "b",
    answerLabel: "go / travel",
  },
  {
    id: 2,
    after: "a boat / a train / a taxi / a bus to my house",
    answer: "c",
    answerLabel: "take",
  },
  {
    id: 3,
    after: "to work / my parents' house / the café",
    answer: "a",
    answerLabel: "cycle / drive / walk",
  },
] as const;

/** Part 2 · 2b Complete the sentences */
export const travelGaps2b = [
  {
    id: 1,
    before: "I go",
    after: "work by bus. I leave home at about 6.30.",
    answers: ["to", "To"],
  },
  {
    id: 2,
    before: "I go to work",
    after: "bus and train. I arrive at 8 o'clock.",
    answers: ["by", "By"],
  },
  {
    id: 3,
    before: "I live in Hong Kong. I",
    after: "a boat to work. I leave the house at 7.00 and arrive at work at 8.00.",
    answers: ["take", "Take"],
  },
  {
    id: 4,
    before: "I",
    after: "to work by bus. I leave home at 6.30.",
    answers: ["go", "Go", "travel", "Travel"],
  },
  {
    id: 5,
    before: "I drive",
    after: "work on Mondays and Tuesdays.",
    answers: ["to", "To"],
  },
] as const;

/** Part 2 · 2c opposite of leave */
export const leaveOpposite = {
  prompt: "What is the opposite of leave?",
  answers: ["arrive", "Arrive", "arrive at", "Arrive at"],
  tip: "arrive",
} as const;

/** Part 2 · 3a Listen and complete the table (R5) */
export const timDonnaTable = [
  {
    id: 1,
    who: "Tim",
    label: "travels to work by",
    answers: ["bike", "Bike", "bicycle", "Bicycle", "bike.", "a bike", "his bike"],
  },
  {
    id: 2,
    who: "Tim",
    label: "leaves home at",
    answers: ["6", "6.00", "6:00", "6 o'clock", "six", "at 6", "6 oclock"],
  },
  {
    id: 3,
    who: "Tim",
    label: "arrives at work at",
    answers: ["8", "8.00", "8:00", "8 o'clock", "eight", "at 8", "8 oclock"],
  },
  {
    id: 4,
    who: "Donna",
    label: "travels to work by",
    answers: ["bus", "Bus", "the bus", "a bus"],
  },
  {
    id: 5,
    who: "Donna",
    label: "leaves home at",
    answers: [
      "7.30",
      "7:30",
      "7.30.",
      "half past seven",
      "seven thirty",
      "7 30",
    ],
  },
] as const;

/** Part 2 · 3b Tick the questions you hear */
export const heardQuestions3b = [
  { id: 1, q: "Do you drive to work?", heard: false },
  { id: 2, q: "Do you cycle to work every day?", heard: true },
  { id: 3, q: "What time do you arrive at work?", heard: false },
  { id: 4, q: "What time do you leave home?", heard: true },
  { id: 5, q: "How do you travel to work?", heard: true },
] as const;

/** Part 2 · 4 Complete the grammar box */
export const grammarDoGaps = [
  {
    id: 1,
    before: "",
    after: "I / you / we / they drive to work?",
    answers: ["Do", "do"],
  },
  {
    id: 2,
    before: "Yes, I / you / we / they",
    after: ".",
    answers: ["do", "Do"],
  },
  {
    id: 3,
    before: "No, I / you / we / they",
    after: ".",
    answers: ["don't", "Don't", "do not", "Do not"],
  },
  {
    id: 4,
    before: "How",
    after: "you travel to work?",
    answers: ["do", "Do"],
  },
  {
    id: 5,
    before: "What time",
    after: "you leave home?",
    answers: ["do", "Do"],
  },
  {
    id: 6,
    before: "What time",
    after: "you arrive at work?",
    answers: ["do", "Do"],
  },
] as const;

/**
 * Part 2 · 5 Pronunciation · Do / do (R6)
 * Weak form in questions vs strong form in short answers → different.
 */
export const doSoundPairs = [
  {
    id: 1,
    a: "Do you go to work by bus?",
    b: "Yes, I do.",
    blueA: "Do",
    blueB: "do",
    answer: "different" as const,
  },
  {
    id: 2,
    a: "Do they walk to work?",
    b: "Yes, they do.",
    blueA: "Do",
    blueB: "do",
    answer: "different" as const,
  },
] as const;

export const travelQuestions = [
  "How do you travel to work / university?",
  "What time do you leave home?",
  "What time do you arrive?",
  "Do you walk to work?",
  "Do you take the bus / train?",
] as const;

/** Part 2 · 6 Choose the correct alternatives */
export const doYouAlts = [
  {
    id: 1,
    before: "How",
    options: ["you travel", "do you travel"] as const,
    answer: "do you travel",
    after: "to work?",
  },
  {
    id: 2,
    before: "I",
    options: ["cycle", "do cycle"] as const,
    answer: "cycle",
    after: ".",
  },
  {
    id: 3,
    before: "",
    options: ["Do you go", "Do you by"] as const,
    answer: "Do you go",
    after: "bike?",
  },
  {
    id: 4,
    before: "No,",
    options: ["we don't", "we aren't"] as const,
    answer: "we don't",
    after: ". We walk to work.",
  },
  {
    id: 5,
    before: "What time",
    options: ["leave", "do you leave"] as const,
    answer: "do you leave",
    after: "home?",
  },
  {
    id: 6,
    before: "At about eight o'clock.",
    options: ["I walk", "I am walk"] as const,
    answer: "I walk",
    after: "to the station",
  },
  {
    id: 7,
    before: "and",
    options: ["I take", "I do take"] as const,
    answer: "I take",
    after: "the train to work.",
  },
  {
    id: 8,
    before: "What time",
    options: ["you do", "do you arrive"] as const,
    answer: "do you arrive",
    after: "?",
  },
  {
    id: 9,
    before: "How",
    options: ["your children travel", "do your children travel"] as const,
    answer: "do your children travel",
    after: "to school?",
  },
  {
    id: 10,
    before: "",
    options: ["Go", "They go"] as const,
    answer: "They go",
    after: "by bus.",
  },
  {
    id: 11,
    before: "They",
    options: ["leave", "are leave"] as const,
    answer: "leave",
    after: "home at eight.",
  },
  {
    id: 12,
    before: "What time",
    options: ["they arrive", "do they arrive"] as const,
    answer: "do they arrive",
    after: "?",
  },
] as const;

/** Part 2 · 7a Put the words in order — student types the question */
export const writeQuestions42 = [
  {
    scramble: "do / leave home / you / What time?",
    answers: [
      "What time do you leave home?",
      "What time do you leave home",
    ],
  },
  {
    scramble: "travel to work / you / by bus / Do?",
    answers: [
      "Do you travel to work by bus?",
      "Do you travel to work by bus",
    ],
  },
  {
    scramble: "you / do / in your office / have lunch / What time?",
    answers: [
      "What time do you have lunch in your office?",
      "What time do you have lunch in your office",
    ],
  },
  {
    scramble: "travel / home / you / do / How?",
    answers: ["How do you travel home?", "How do you travel home"],
  },
  {
    scramble: "people / at your office / to work / drive / Do?",
    answers: [
      "Do people at your office drive to work?",
      "Do people at your office drive to work",
      "Do the people at your office drive to work?",
      "Do the people at your office drive to work",
    ],
  },
  {
    scramble: "cycle / on Saturdays / you / and Sundays / Do?",
    answers: [
      "Do you cycle on Saturdays and Sundays?",
      "Do you cycle on Saturdays and Sundays",
    ],
  },
] as const;

/** HW42 · places & directions chunks (student weak spots) */
export const placeDirectionChunks42 = [
  {
    en: "at work",
    ua: "на роботі",
    example: "I'm at work now.",
  },
  {
    en: "to work",
    ua: "на роботу (напрямок)",
    example: "I go to work at eight.",
  },
  {
    en: "go home",
    ua: "іти / їхати додому",
    example: "I go home at six.",
  },
  {
    en: "at school",
    ua: "у школі",
    example: "She's at school today.",
  },
  {
    en: "arrive at work",
    ua: "прибути на роботу",
    example: "I arrive at work at 9.",
  },
  {
    en: "leave home",
    ua: "виходити з дому",
    example: "I leave home at 7.30.",
  },
  {
    en: "at a bookshop",
    ua: "у книгарні (місце роботи)",
    example: "I work at a bookshop.",
  },
  {
    en: "in the bookshop",
    ua: "в книгарні (всередині)",
    example: "She's in the bookshop.",
  },
] as const;

/** HW42 · choose the correct place/direction sentence */
export const placeDirectionPick42 = [
  {
    id: 1,
    tip: "home — без to",
    options: ["I go to home at 6.", "I go home at 6."],
    answer: "I go home at 6.",
  },
  {
    id: 2,
    tip: "місце (де?) → at",
    options: ["I'm at work.", "I'm to work."],
    answer: "I'm at work.",
  },
  {
    id: 3,
    tip: "напрямок (куди?) → to",
    options: ["I go at work at 8.", "I go to work at 8."],
    answer: "I go to work at 8.",
  },
  {
    id: 4,
    tip: "arrive + at + місце",
    options: ["I arrive to work at 9.", "I arrive at work at 9."],
    answer: "I arrive at work at 9.",
  },
  {
    id: 5,
    tip: "місце навчання / роботи",
    options: ["She's at school.", "She's to school."],
    answer: "She's at school.",
  },
  {
    id: 6,
    tip: "A1 активний варіант: at a bookshop",
    options: ["I work at a bookshop.", "I work to a bookshop."],
    answer: "I work at a bookshop.",
  },
  {
    id: 7,
    tip: "leave home — без from у базовій фразі",
    options: ["I leave home at 7.30.", "I leave to home at 7.30."],
    answer: "I leave home at 7.30.",
  },
  {
    id: 8,
    tip: "walk home — без to",
    options: ["I walk to home.", "I walk home."],
    answer: "I walk home.",
  },
] as const;

/** HW42 · rapid on / in / at chunks */
export const onInAtChunks42 = [
  {
    id: 1,
    cue: "Monday",
    options: ["on Monday", "at Monday", "in Monday"],
    answer: "on Monday",
  },
  {
    id: 2,
    cue: "the morning",
    options: ["on the morning", "in the morning", "at the morning"],
    answer: "in the morning",
  },
  {
    id: 3,
    cue: "7 p.m.",
    options: ["on 7 p.m.", "in 7 p.m.", "at 7 p.m."],
    answer: "at 7 p.m.",
  },
  {
    id: 4,
    cue: "the weekend (BrE)",
    options: ["on the weekend", "at the weekend", "in the weekend"],
    answer: "at the weekend",
  },
  {
    id: 5,
    cue: "Friday evening",
    options: ["on Friday evening", "in Friday evening", "at Friday evening"],
    answer: "on Friday evening",
  },
  {
    id: 6,
    cue: "night",
    options: ["on night", "in night", "at night"],
    answer: "at night",
  },
  {
    id: 7,
    cue: "Tuesdays",
    options: ["on Tuesdays", "at Tuesdays", "in Tuesdays"],
    answer: "on Tuesdays",
  },
  {
    id: 8,
    cue: "the evening",
    options: ["on the evening", "in the evening", "at the evening"],
    answer: "in the evening",
  },
] as const;

/**
 * HW42 · stabilize 8 transport chunks
 * (student errors: go to walk, circle, go by car, drive car…)
 */
export const transportStabilizeChunks42 = [
  {
    en: "I walk to work.",
    ua: "Я йду на роботу пішки.",
  },
  {
    en: "I walk home.",
    ua: "Я йду додому пішки.",
  },
  {
    en: "I go to work by bus.",
    ua: "Я їду на роботу автобусом.",
  },
  {
    en: "I go to work by train.",
    ua: "Я їду на роботу поїздом.",
  },
  {
    en: "I cycle to work.",
    ua: "Я їду на роботу велосипедом.",
  },
  {
    en: "I drive to my parents' house.",
    ua: "Я їду машиною до батьків.",
  },
  {
    en: "I take a taxi.",
    ua: "Я беру таксі.",
  },
  {
    en: "I take a boat.",
    ua: "Я їду човном / поромом.",
  },
] as const;

export const transportPick42 = [
  {
    id: 1,
    tip: "walk = дієслово «йти пішки»",
    options: ["I go to walk.", "I walk to work."],
    answer: "I walk to work.",
  },
  {
    id: 2,
    tip: "cycle, не circle",
    options: ["I circle to work.", "I cycle to work."],
    answer: "I cycle to work.",
  },
  {
    id: 3,
    tip: "drive to + місце",
    options: ["I drive car to my parents' house.", "I drive to my parents' house."],
    answer: "I drive to my parents' house.",
  },
  {
    id: 4,
    tip: "готовий chunk: drive to…",
    options: [
      "I go by car to my parents' house.",
      "I drive to my parents' house.",
    ],
    answer: "I drive to my parents' house.",
  },
  {
    id: 5,
    tip: "go to work by + транспорт",
    options: ["I go to work by bus.", "I go by bus to work at."],
    answer: "I go to work by bus.",
  },
  {
    id: 6,
    tip: "take + a + транспорт",
    options: ["I take a taxi.", "I take taxi."],
    answer: "I take a taxi.",
  },
  {
    id: 7,
    tip: "walk home — без to",
    options: ["I walk to home.", "I walk home."],
    answer: "I walk home.",
  },
  {
    id: 8,
    tip: "take a boat",
    options: ["I take a boat.", "I go boat to work."],
    answer: "I take a boat.",
  },
] as const;
