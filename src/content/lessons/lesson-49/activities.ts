/** Lesson 49 — Review: Yesterday (Past Simple speaking project)
 * Outcome: personal yesterday story + basic past questions.
 * Core 6: get up→got up, have→had, go→went, work→worked, play→played, watch→watched.
 * No Past Continuous · no 3rd form · no Present Perfect.
 */

/** Today → yesterday bridge */
export const bridgeGaps = [
  {
    id: "b1",
    before: "I am tired. → Yesterday I",
    after: "tired.",
    answers: ["was"],
    options: ["was", "am", "were"],
  },
  {
    id: "b2",
    before: "I work. → Yesterday I",
    after: ".",
    answers: ["worked"],
    options: ["worked", "work", "working"],
  },
  {
    id: "b3",
    before: "I go to work. → Yesterday I",
    after: "to work.",
    answers: ["went"],
    options: ["went", "go", "goed"],
  },
  {
    id: "b4",
    before: "I have breakfast. → Yesterday I",
    after: "breakfast.",
    answers: ["had"],
    options: ["had", "have", "haved"],
  },
] as const;

/** Teacher cue → student past */
export const todayYesterdayDrill = [
  {
    id: "ty1",
    before: "Today I go to work. Yesterday?",
    after: "",
    options: [
      "Yesterday you went to work.",
      "Yesterday you go to work.",
      "Yesterday you goed to work.",
    ],
    answer: "Yesterday you went to work.",
  },
  {
    id: "ty2",
    before: "Today I play games. Yesterday?",
    after: "",
    options: [
      "Yesterday you played games.",
      "Yesterday you play games.",
      "Yesterday you playing games.",
    ],
    answer: "Yesterday you played games.",
  },
  {
    id: "ty3",
    before: "Today I watch TV. Yesterday?",
    after: "",
    options: [
      "Yesterday you watched TV.",
      "Yesterday you watch TV.",
      "Yesterday you watching TV.",
    ],
    answer: "Yesterday you watched TV.",
  },
  {
    id: "ty4",
    before: "Today I get up at seven. Yesterday?",
    after: "",
    options: [
      "Yesterday you got up at seven.",
      "Yesterday you get up at seven.",
      "Yesterday you gotten up at seven.",
    ],
    answer: "Yesterday you got up at seven.",
  },
  {
    id: "ty5",
    before: "Today I have breakfast. Yesterday?",
    after: "",
    options: [
      "Yesterday you had breakfast.",
      "Yesterday you have breakfast.",
      "Yesterday you haved breakfast.",
    ],
    answer: "Yesterday you had breakfast.",
  },
  {
    id: "ty6",
    before: "Today I work. Yesterday?",
    after: "",
    options: [
      "Yesterday you worked.",
      "Yesterday you work.",
      "Yesterday you was work.",
    ],
    answer: "Yesterday you worked.",
  },
] as const;

/** Timeline questions */
export const timelineAskPrompts = [
  "What did you do yesterday morning?",
  "Did you have breakfast?",
  "Where did you go in the afternoon?",
  "Did you work yesterday?",
  "What did you do in the evening?",
  "What time did you go to bed?",
  "Were you tired?",
] as const;

export const timelineChoiceHelp = [
  "Did you play games or watch a film?",
  "Did you drink tea or coffee?",
  "Were you at home or at work?",
] as const;

/** Controlled story gaps (oral) */
export const controlledStoryGaps = [
  {
    id: "cs1",
    before: "Yesterday I",
    after: "up at …",
    answers: ["got"],
    options: ["got", "get", "was"],
  },
  {
    id: "cs2",
    before: "I",
    after: "breakfast.",
    answers: ["had"],
    options: ["had", "have", "was"],
  },
  {
    id: "cs3",
    before: "Then I",
    after: "to work / home.",
    answers: ["went"],
    options: ["went", "go", "was"],
  },
  {
    id: "cs4",
    before: "I",
    after: "at the barbershop / at home.",
    answers: ["worked", "was"],
    options: ["worked", "was", "went"],
  },
  {
    id: "cs5",
    before: "In the evening, I",
    after: "TV / games.",
    answers: ["watched", "played"],
    options: ["watched", "played", "watch"],
  },
  {
    id: "cs6",
    before: "I",
    after: "to bed at …",
    answers: ["went"],
    options: ["went", "go", "was"],
  },
] as const;

/** Mark mini-text */
export const markText = [
  "Yesterday, Mark got up at eight.",
  "He had breakfast and went to work.",
  "He worked at a shop until five.",
  "In the evening, he watched a film.",
  "He went to bed at eleven.",
] as const;

export const markQuiz = [
  {
    id: "mk1",
    prompt: "What time did Mark get up?",
    options: ["At eight", "At five", "At eleven"],
    correctAnswer: "At eight",
  },
  {
    id: "mk2",
    prompt: "Where did he go?",
    options: ["To work", "To a café", "Home only"],
    correctAnswer: "To work",
  },
  {
    id: "mk3",
    prompt: "Where did he work?",
    options: ["At a shop", "At a barbershop", "At home"],
    correctAnswer: "At a shop",
  },
  {
    id: "mk4",
    prompt: "What did he do in the evening?",
    options: ["He watched a film", "He played football", "He cooked dinner"],
    correctAnswer: "He watched a film",
  },
  {
    id: "mk5",
    prompt: "What time did he go to bed?",
    options: ["At eleven", "At eight", "At five"],
    correctAnswer: "At eleven",
  },
] as const;

/** Personal story */
export const yesterdaySpeakPrompts = [
  "Yesterday I got up at …",
  "I had breakfast.",
  "I went to work. / I stayed at home.",
  "I worked … / I was at home.",
  "In the evening, I watched… / played…",
  "I went to bed at …",
] as const;

export const yesterdaySpeakModels = [
  "Yesterday I got up at seven.",
  "I had breakfast.",
  "I went to work.",
  "I worked at the barbershop.",
  "In the evening, I watched TV.",
  "I went to bed late.",
] as const;

/** Delayed correction examples */
export const delayedFixChoices = [
  {
    id: "df1",
    before: "",
    after: "",
    options: ["I worked.", "I was worked."],
    answer: "I worked.",
  },
  {
    id: "df2",
    before: "",
    after: "",
    options: ["I went to work.", "I goed to work."],
    answer: "I went to work.",
  },
  {
    id: "df3",
    before: "",
    after: "",
    options: [
      "I had breakfast yesterday.",
      "I have breakfast yesterday.",
    ],
    answer: "I had breakfast yesterday.",
  },
] as const;

/** HW translate + questions */
export const yesterdayTranslate = [
  {
    id: "t1",
    ua: "Учора я прокинувся о …",
    answers: [
      "Yesterday I got up at seven.",
      "Yesterday I got up at 7.",
      "I got up at seven yesterday.",
    ],
  },
  {
    id: "t2",
    ua: "Я поснідав.",
    answers: ["I had breakfast.", "Yesterday I had breakfast."],
  },
  {
    id: "t3",
    ua: "Я пішов на роботу.",
    answers: ["I went to work.", "Yesterday I went to work."],
  },
  {
    id: "t4",
    ua: "Я працював у барбершопі.",
    answers: [
      "I worked at the barbershop.",
      "I worked at a barbershop.",
      "Yesterday I worked at the barbershop.",
    ],
  },
  {
    id: "t5",
    ua: "Увечері я дивився телевізор.",
    answers: [
      "In the evening, I watched TV.",
      "I watched TV in the evening.",
      "Yesterday evening I watched TV.",
    ],
  },
  {
    id: "t6",
    ua: "Я ліг спати пізно.",
    answers: [
      "I went to bed late.",
      "Yesterday I went to bed late.",
    ],
  },
] as const;

export const hwPastQuestions = [
  "What time did you get up yesterday?",
  "What did you have for breakfast?",
  "Where did you go?",
  "Did you work?",
  "What did you do in the evening?",
] as const;

/**
 * Extra speaking scenarios · recycle L30–47 with Past as the spine.
 * Keep Present only as contrast (usually vs yesterday). One-to-one.
 */
export const scenarioWorkDayPrompts = [
  "Tell yesterday at work: I went to work. I was at work. I worked… I finished at…",
  "Ask your teacher: Did you work yesterday? What time did you start? Were you tired?",
  "Contrast: What do you usually do at work? What did you do yesterday at work?",
  "One client story (simple): Yesterday I had a client. He/She wanted… I cut…",
] as const;

export const scenarioWorkDayModels = [
  "Yesterday I went to work at ten. I was at work all day. I worked until seven.",
  "Did you work yesterday? — Yes, I did. / No, I didn’t.",
  "I usually start at ten. Yesterday I started at ten too.",
  "Yesterday I had three clients.",
] as const;

export const scenarioHomePastPrompts = [
  "Yesterday at home: Did you cook? Did you clean? Did you watch TV?",
  "Tell 4 sentences: Yesterday I cooked… / I didn’t clean… / I watched… / I went to bed at…",
  "Ask your teacher: What did you do at home yesterday evening?",
  "Habits vs yesterday: I usually cook. Yesterday I cooked pasta. / Yesterday I didn’t cook.",
] as const;

export const scenarioHomePastModels = [
  "Yesterday I cooked dinner. I didn’t clean the kitchen. I watched a film.",
  "Did you cook yesterday? — Yes, I did. / No, I didn’t.",
  "What did you do in the evening? — I played games.",
  "I usually cook. Yesterday I cooked chicken.",
] as const;

export const scenarioFoodSkillsPrompts = [
  "Yesterday with food: I had breakfast. I drank… I ate… In the evening I had…",
  "Ask: What did you have for breakfast yesterday? Did you drink coffee?",
  "Skills + past (light): Can you cook? Did you cook yesterday? Can you drive? Did you drive yesterday?",
  "Café memory: Yesterday I went to a café. I had… It was…",
] as const;

export const scenarioFoodSkillsModels = [
  "Yesterday I had breakfast at eight. I drank tea. I ate eggs.",
  "What did you have for breakfast? — I had coffee and bread.",
  "Can you cook? — Yes, I can. Did you cook yesterday? — Yes, I did.",
  "Yesterday I went to a café. I had a sandwich. It was good.",
] as const;

export const scenarioWeekendPastPrompts = [
  "Last weekend / yesterday evening free time: Where did you go? Who did you see?",
  "Use was/were: I was at home. I was tired. My friend was… We were…",
  "Ask your teacher 3 past questions: What did you do? Where did you go? Were you busy?",
  "Mini story (5 sentences) with no cards: got up → had → went/stayed → evening → bed.",
] as const;

export const scenarioWeekendPastModels = [
  "Yesterday evening I was at home. I was tired. I watched TV.",
  "Where did you go? — I didn’t go out. I stayed at home.",
  "Were you busy? — Yes, I was. / No, I wasn’t.",
  "Yesterday I got up late. I had breakfast. I stayed at home. In the evening I played games. I went to bed at twelve.",
] as const;
