/**
 * Lesson 38 — Unit 4A You've got a friend + 4B Have you got it?
 * Audio: public/sounds/Unit_4/RM_A1_SB_U4_R{n}.mp3
 * R1 — describing-people vocab (SB 4.1)
 * R2 — I've / You've / He's contractions (SB 4.2)
 * R3 — travel objects vocab (SB 4.3)
 * R4 — Sam & Zara · ready for a trip (SB 4.4)
 * R5 — Have / Has in questions vs short answers (SB 4.5)
 *
 * Photos: drop files into public/images/lesson38/ using the names below.
 * The lesson shows a labelled card if a file is missing.
 */

export const SOUND_U4 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_4/RM_A1_SB_U4_R${r}.mp3`;

export const IMG38 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson38/${file}`;

export const lucaText = [
  "OK, so my name is Luca and this is my good friend, Mehmet.",
  "I'm from Italy. He's from Turkey. We live in Rome.",
  "I'm a taxi driver and Mehmet's a student here. He's got a daughter. I haven't got any children.",
  "I've got blonde hair and blue eyes. He's got brown hair, brown eyes and a beard.",
  "I'm in my 20s and Mehmet is in his 30s.",
  "We're very different, but we're good friends!",
] as const;

export const whoIsWho = [
  { id: "luca", prompt: "Which photo is Luca?", answer: "A" },
  { id: "mehmet", prompt: "Which photo is Mehmet?", answer: "B" },
] as const;

export const labelBank = [
  "a beard",
  "blonde hair",
  "blue eyes",
  "brown eyes",
  "brown hair",
  "in his 20s",
  "in his 30s",
] as const;

export const photoLabels = [
  { n: 1, photo: "A", hint: "Luca's hair", answer: "blonde hair" },
  { n: 2, photo: "A", hint: "Luca's eyes", answer: "blue eyes" },
  { n: 3, photo: "A", hint: "Luca's age", answer: "in his 20s" },
  { n: 4, photo: "B", hint: "Mehmet's hair", answer: "brown hair" },
  { n: 5, photo: "B", hint: "Mehmet's eyes", answer: "brown eyes" },
  { n: 6, photo: "B", hint: "Mehmet's face", answer: "a beard" },
  { n: 7, photo: "B", hint: "Mehmet's age", answer: "in his 30s" },
] as const;

export const profilePhotos = [
  {
    id: "A",
    file: "luca.png",
    emoji: "🚗",
    caption: "Photo A",
    note: "1 hair · 2 eyes · 3 Age",
  },
  {
    id: "B",
    file: "mehmet.png",
    emoji: "👨‍👧",
    caption: "Photo B",
    note: "4 hair · 5 eyes · 6 beard · 7 Age",
  },
] as const;

export const matchPhotos = [
  {
    id: "A",
    file: "woman-20s.png",
    emoji: "👩",
    caption: "Photo A",
  },
  {
    id: "B",
    file: "surfer.png",
    emoji: "🏄‍♂️",
    caption: "Photo B",
  },
  {
    id: "C",
    file: "grey-beard.png",
    emoji: "👴",
    caption: "Photo C",
  },
  {
    id: "D",
    file: "woman-50s.png",
    emoji: "👩",
    caption: "Photo D",
  },
] as const;

export const descMatch = [
  {
    id: "1",
    text: "She's got blonde hair and blue eyes. She's in her 50s.",
    answer: "D",
  },
  {
    id: "2",
    text: "He's got red hair. He's in his 40s.",
    answer: "B",
  },
  {
    id: "3",
    text: "She's got brown hair and green eyes. She's in her 20s.",
    answer: "A",
  },
  {
    id: "4",
    text: "He's got grey hair and a beard.",
    answer: "C",
  },
] as const;

/** Book 3c word map — these start already in the circles */
export const wordMapFixed = {
  colours: ["blue", "brown", "green"],
  body: ["hair", "eyes", "a beard"],
} as const;

/** Book: "Add more words to the word map." */
export const wordMapExtra = [
  { word: "red", bin: "colours" },
  { word: "blonde", bin: "colours" },
  { word: "grey", bin: "colours" },
  { word: "short", bin: "body" },
  { word: "long", bin: "body" },
] as const;

export const grammarPlusMinus = [
  {
    id: "g1",
    prompt: "I / You / We / They _____ got brown hair.",
    options: ["have", "has", "hasn't"] as const,
    answer: "have",
  },
  {
    id: "g2",
    prompt: "He / She / It _____ got green eyes.",
    options: ["have", "has", "haven't"] as const,
    answer: "has",
  },
  {
    id: "g3",
    prompt: "He / She / It _____ got red hair.",
    options: ["haven't", "hasn't", "have"] as const,
    answer: "hasn't",
  },
] as const;

export const contractionListen = [
  { contraction: "I've", rest: "got brown hair." },
  { contraction: "You've", rest: "got red hair." },
  { contraction: "We've", rest: "got blue eyes." },
  { contraction: "They've", rest: "got blue eyes." },
  { contraction: "He's", rest: "got a beard." },
  { contraction: "She's", rest: "got grey hair." },
] as const;

export const hasHaveChoose = [
  {
    id: "h1",
    before: "I",
    options: ["has", "have"] as const,
    after: "got red hair.",
    answer: "have",
  },
  {
    id: "h2",
    before: "My friend",
    options: ["has", "have"] as const,
    after: "got a son and a daughter.",
    answer: "has",
  },
  {
    id: "h3",
    before: "They",
    options: ["has", "have"] as const,
    after: "got two children.",
    answer: "have",
  },
  {
    id: "h4",
    before: "She",
    options: ["hasn't", "haven't"] as const,
    after: "got a dog.",
    answer: "hasn't",
  },
  {
    id: "h5",
    before: "We",
    options: ["hasn't", "haven't"] as const,
    after: "got a car.",
    answer: "haven't",
  },
  {
    id: "h6",
    before: "He",
    options: ["has", "have"] as const,
    after: "got brown hair.",
    answer: "has",
  },
  {
    id: "h7",
    before: "I",
    options: ["hasn't", "haven't"] as const,
    after: "got any children.",
    answer: "haven't",
  },
  {
    id: "h8",
    before: "They",
    options: ["has", "have"] as const,
    after: "got grey hair.",
    answer: "have",
  },
] as const;

export const sofiaSentences = [
  {
    scramble: "Sofia / be / an office worker",
    parts: ["Sofia", "is", "an", "office", "worker."],
    answer: "Sofia is an office worker.",
  },
  {
    scramble: "She / have got / a son",
    parts: ["She", "has", "got", "a", "son."],
    answer: "She has got a son.",
  },
  {
    scramble: "She / have got / blonde hair / brown eyes",
    parts: ["She", "has", "got", "blonde", "hair", "and", "brown", "eyes."],
    answer: "She has got blonde hair and brown eyes.",
  },
  {
    scramble: "She / be / 30s",
    parts: ["She", "is", "in", "her", "30s."],
    answer: "She is in her 30s.",
  },
  {
    scramble: "Her son / have got / brown hair / blue eyes",
    parts: ["Her", "son", "has", "got", "brown", "hair", "and", "blue", "eyes."],
    answer: "Her son has got brown hair and blue eyes.",
  },
  {
    scramble: "He / be / eight years old",
    parts: ["He", "is", "eight", "years", "old."],
    answer: "He is eight years old.",
  },
  {
    scramble: "They / live / in Paris",
    parts: ["They", "live", "in", "Paris."],
    answer: "They live in Paris.",
  },
] as const;

export const travelObjects = [
  { id: "1", word: "tickets", file: "tickets.jpg", emoji: "🎫" },
  { id: "2", word: "passport", file: "passport.jpg", emoji: "🛂" },
  { id: "3", word: "credit card", file: "credit-card.jpg", emoji: "💳" },
  { id: "4", word: "coat", file: "coat.jpg", emoji: "🧥" },
  { id: "5", word: "food", file: "food.jpg", emoji: "🥗" },
  { id: "6", word: "bottle of water", file: "water.jpg", emoji: "💧" },
  { id: "7", word: "camera", file: "camera.jpg", emoji: "📷" },
  { id: "8", word: "sunglasses", file: "sunglasses.jpg", emoji: "🕶️" },
  { id: "9", word: "phone", file: "phone.jpg", emoji: "📱" },
  { id: "10", word: "money", file: "money.jpg", emoji: "💷" },
  { id: "11", word: "bag", file: "bag.jpg", emoji: "👜" },
  { id: "12", word: "keys", file: "keys.jpg", emoji: "🔑" },
] as const;

export const tripScenes = [
  {
    id: "A",
    file: "beach.jpg",
    emoji: "🏖️",
    caption: "Photo A",
    answer: "a holiday in a hot country",
  },
  {
    id: "B",
    file: "snow.jpg",
    emoji: "❄️",
    caption: "Photo B",
    answer: "a holiday in a cold country",
  },
  {
    id: "C",
    file: "office.jpg",
    emoji: "🖥️",
    caption: "Photo C",
    answer: "a day in the office",
  },
  {
    id: "D",
    file: "walk.jpg",
    emoji: "🌲",
    caption: "Photo D",
    answer: "a long walk",
  },
] as const;

export const tripLabels = [
  "a day in the office",
  "a holiday in a cold country",
  "a long walk",
  "a holiday in a hot country",
] as const;

export const packSuggest: Record<string, readonly string[]> = {
  "a holiday in a hot country": [
    "sunglasses",
    "bottle of water",
    "passport",
    "tickets",
    "phone",
    "money",
    "bag",
  ],
  "a holiday in a cold country": [
    "coat",
    "passport",
    "tickets",
    "phone",
    "money",
    "bag",
    "food",
  ],
  "a day in the office": ["phone", "keys", "bag", "food", "bottle of water"],
  "a long walk": [
    "bottle of water",
    "phone",
    "keys",
    "food",
    "coat",
    "bag",
  ],
};

export const samWhere = {
  options: [
    "to the office",
    "on a long walk",
    "on holiday in a hot country",
    "on holiday in a cold country",
  ] as const,
  answer: "on holiday in a hot country",
};

export const samHasGot = [
  { id: "passport", label: "passport", answer: true },
  { id: "money", label: "money", answer: true },
  { id: "camera", label: "camera", answer: false },
  { id: "phone", label: "phone", answer: true },
  { id: "tickets", label: "tickets", answer: false },
] as const;

export const questionGrammar = [
  {
    id: "q1",
    prompt: "_____ I / we / you / they got a ticket?",
    options: ["Have", "Has", "Haven't"] as const,
    answer: "Have",
  },
  {
    id: "q2",
    prompt: "Yes, I / we / you / they _____.",
    options: ["have", "has", "hasn't"] as const,
    answer: "have",
  },
  {
    id: "q3",
    prompt: "_____ he / she / it got a phone?",
    options: ["Have", "Has", "Haven't"] as const,
    answer: "Has",
  },
  {
    id: "q4",
    prompt: "Yes, he / she / it _____.",
    options: ["have", "has", "haven't"] as const,
    answer: "has",
  },
  {
    id: "q5",
    prompt: "No, he / she / it _____.",
    options: ["haven't", "hasn't", "have"] as const,
    answer: "hasn't",
  },
] as const;

export const makeQuestions = [
  {
    scramble: "you / food / in your bag",
    parts: ["Have", "you", "got", "food", "in", "your", "bag?"],
    answer: "Have you got food in your bag?",
  },
  {
    scramble: "sister / a camera",
    parts: ["Has", "your", "sister", "got", "a", "camera?"],
    answer: "Has your sister got a camera?",
  },
  {
    scramble: "friend / a good job",
    parts: ["Has", "your", "friend", "got", "a", "good", "job?"],
    answer: "Has your friend got a good job?",
  },
  {
    scramble: "you / sunglasses",
    parts: ["Have", "you", "got", "sunglasses?"],
    answer: "Have you got sunglasses?",
  },
  {
    scramble: "you / a big family",
    parts: ["Have", "you", "got", "a", "big", "family?"],
    answer: "Have you got a big family?",
  },
  {
    scramble: "you / a new phone",
    parts: ["Have", "you", "got", "a", "new", "phone?"],
    answer: "Have you got a new phone?",
  },
] as const;

export const roseLines = [
  {
    id: "e",
    who: "Rose's mum",
    text: "Hi Rose. Are you and your brother ready for your trip?",
    order: 1,
  },
  { id: "a", who: "Rose", text: "Yes, we are.", order: 2 },
  {
    id: "c",
    who: "Rose's mum",
    text: "Have you got your tickets?",
    order: 3,
  },
  { id: "b", who: "Rose", text: "Tickets … Yes, I've got them.", order: 4 },
  { id: "f", who: "Rose's mum", text: "And your money?", order: 5 },
  { id: "d", who: "Rose", text: "Yes, we've got money.", order: 6 },
] as const;

/** Homework review — only lines that need a change. */
export const homeworkFixGroups = [
  {
    id: "must",
    title: "Потрібно виправити",
    desc: "Граматична помилка.",
  },
  {
    id: "better",
    title: "Краще переписати",
    desc: "Зрозуміло, але природніше сказати інакше.",
  },
  {
    id: "tiny",
    title: "Технічні дрібниці",
    desc: "Додай крапку або велику літеру I.",
  },
] as const;

export const homeworkFixLines = [
  {
    id: "40",
    group: "must",
    uk: "Я зараз стрижу клієнта.",
    wrong: "I am cutting hair a client now.",
    answers: [
      "I am cutting a client's hair now.",
      "I'm cutting a client's hair now.",
      "I am cutting my client's hair now.",
      "I'm cutting my client's hair now.",
      "I am giving a client a haircut now.",
      "I'm giving a client a haircut now.",
    ],
    tipUa: "чиє волосся: a client's hair. Не hair a client.",
  },
  {
    id: "45",
    group: "must",
    uk: "Що ти зараз робиш у барбершопі?",
    wrong: "What do you do in a barbershop?",
    answers: [
      "What are you doing in the barbershop now?",
      "What are you doing at the barbershop now?",
    ],
    tipUa:
      "зараз = Present Continuous: What are you doing… now? What do you do… = зазвичай.",
  },
  {
    id: "52",
    group: "must",
    uk: "Скільки клієнтів ти бачиш щодня?",
    wrong: "How many do you see clients every day?",
    answers: ["How many clients do you see every day?"],
    tipUa: "How many + іменник разом: How many clients do you see?",
  },
  {
    id: "57",
    group: "better",
    uk: "Він зараз робить стрижку.",
    wrong: "He is doing a haircut now.",
    answers: [
      "He is cutting a client's hair now.",
      "He's cutting a client's hair now.",
      "He is giving a client a haircut now.",
      "He's giving a client a haircut now.",
    ],
    tipUa: "Барбер cuts a client's hair / gives a client a haircut — не do a haircut.",
  },
  {
    id: "29",
    group: "better",
    uk: "Це хороший день.",
    wrong: "This day is good.",
    answers: [
      "It's a good day.",
      "It is a good day.",
      "Today is a good day.",
    ],
    tipUa: "Це хороший день → It's a good day / Today is a good day.",
  },
  {
    id: "44",
    group: "better",
    uk: "Клієнти часто смішні.",
    wrong: "Clients often are funny.",
    answers: [
      "Clients are often funny.",
      "My clients are often funny.",
    ],
    tipUa: "після be: are often. Зі звичайним дієсловом: often drink.",
  },
  {
    id: "53",
    group: "better",
    uk: "Ми зараз розмовляємо в барбершопі.",
    wrong: "We are talking in a barbershop.",
    answers: [
      "We are talking in the barbershop now.",
      "We're talking in the barbershop now.",
    ],
    tipUa: "зараз → now. Конкретний барбершоп → in the barbershop.",
  },
  {
    id: "55",
    group: "better",
    uk: "Я ніколи не працюю в барбершопі в неділю.",
    wrong: "I never work in a barbershop on Sunday.",
    answers: [
      "I never work at a barbershop on Sundays.",
      "I never work at the barbershop on Sundays.",
    ],
    tipUa: "місце роботи = at a barbershop. Звичка по неділях = on Sundays.",
  },
  {
    id: "59",
    group: "better",
    uk: "Клієнти дружні?",
    wrong: "Are clients friendly?",
    answers: ["Are your clients friendly?"],
    tipUa: "у контексті роботи = твої клієнти → your clients.",
  },
  {
    id: "24",
    group: "better",
    uk: "Я часто розмовляю з учителем.",
    wrong: "I often speak with a teacher.",
    answers: ["I often speak with my teacher."],
    tipUa: "a teacher = якийсь. Твоя викладачка = my teacher.",
  },
  {
    id: "49",
    group: "better",
    uk: "Я зазвичай працюю в барбершопі вранці.",
    wrong: "I usually work in a barbershop in the morning.",
    answers: [
      "I usually work at a barbershop in the morning.",
      "I usually work at the barbershop in the morning.",
    ],
    tipUa: "місце роботи природніше: at a barbershop.",
  },
  {
    id: "18",
    group: "tiny",
    uk: "Я схвильований.",
    wrong: "I am excited",
    answers: ["I am excited."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "19",
    group: "tiny",
    uk: "Вони зараз працюють.",
    wrong: "They are working now",
    answers: ["They are working now."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "20",
    group: "tiny",
    uk: "Ти добрий.",
    wrong: "You are kind",
    answers: ["You are kind."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "25",
    group: "tiny",
    uk: "Він зараз їсть.",
    wrong: "He is eating now",
    answers: ["He is eating now."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "26",
    group: "tiny",
    uk: "Вони дружні.",
    wrong: "They are friendly",
    answers: ["They are friendly."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "27",
    group: "tiny",
    uk: "Вона іноді п'є воду.",
    wrong: "She sometimes drinks water",
    answers: ["She sometimes drinks water."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "28",
    group: "tiny",
    uk: "Ми зараз сидимо.",
    wrong: "We are sitting now",
    answers: ["We are sitting now."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "35",
    group: "tiny",
    uk: "Моя мама добра.",
    wrong: "My mom is kind",
    answers: ["My mom is kind.", "My mum is kind."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "37",
    group: "tiny",
    uk: "Я барбер.",
    wrong: "I am a barber",
    answers: ["I am a barber.", "I'm a barber."],
    tipUa: "У кінці речення потрібна крапка.",
    keepPunct: true,
  },
  {
    id: "60",
    group: "tiny",
    uk: "Я люблю свою роботу. Я барбер.",
    wrong: "i love my job. i am a barber.",
    answers: [
      "I love my job. I am a barber.",
      "I love my job. I'm a barber.",
    ],
    tipUa: "I завжди з великої літери.",
    keepCase: true,
    keepPunct: true,
  },
] as const;

export const speakPrepare = [
  { id: "job", label: "their job" },
  { id: "place", label: "where they are from / live" },
  { id: "look", label: "their age / hair / eyes" },
] as const;

export const speakBagPrompts = [
  "Have you got your passport?",
  "Have you got your tickets?",
  "Have you got money / a credit card?",
  "Have you got a phone?",
  "Have you got a bottle of water?",
  "Has your teacher got a camera?",
] as const;
