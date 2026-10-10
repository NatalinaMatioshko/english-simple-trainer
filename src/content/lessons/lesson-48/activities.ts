/** Lesson 48 — Review: My week (Present Simple speaking project)
 * Outcome: 8–10 sentences about your week + 3–4 questions to the teacher.
 * ~70% speaking · ~30% form drills. No Past / no big PC / no phonetics.
 */

/** Warm-up · day-by-day Yes/No */
export const dayWarmUpPrompts = [
  "Do you work on Monday?",
  "Do you work on Tuesday?",
  "Do you work on Wednesday?",
  "Do you work on Thursday?",
  "Do you work on Friday?",
  "Do you work on Saturday?",
  "Do you work on Sunday?",
  "What time do you start work on Tuesday?",
] as const;

/** Quick drill · make the question */
export const doDoesDrill = [
  {
    id: "d1",
    cue: "you / work",
    answer: "Do you work?",
    options: ["Do you work?", "Does you work?", "Are you work?"],
  },
  {
    id: "d2",
    cue: "he / work",
    answer: "Does he work?",
    options: ["Does he work?", "Do he work?", "Is he work?"],
  },
  {
    id: "d3",
    cue: "your friend / play games",
    answer: "Does your friend play games?",
    options: [
      "Does your friend play games?",
      "Do your friend play games?",
      "Does your friend plays games?",
    ],
  },
  {
    id: "d4",
    cue: "you / study English",
    answer: "Do you study English?",
    options: [
      "Do you study English?",
      "Does you study English?",
      "Are you study English?",
    ],
  },
  {
    id: "d5",
    cue: "your mother / drink coffee",
    answer: "Does your mother drink coffee?",
    options: [
      "Does your mother drink coffee?",
      "Do your mother drink coffee?",
      "Does your mother drinks coffee?",
    ],
  },
  {
    id: "d6",
    cue: "you / work on Sundays",
    answer: "Do you work on Sundays?",
    options: [
      "Do you work on Sundays?",
      "Does you work on Sundays?",
      "Do you works on Sundays?",
    ],
  },
  {
    id: "d7",
    cue: "your friend / work at a barbershop",
    answer: "Does your friend work at a barbershop?",
    options: [
      "Does your friend work at a barbershop?",
      "Do your friend work at a barbershop?",
      "Does your friend works at a barbershop?",
    ],
  },
  {
    id: "d8",
    cue: "she / get up early",
    answer: "Does she get up early?",
    options: [
      "Does she get up early?",
      "Do she get up early?",
      "Does she gets up early?",
    ],
  },
] as const;

/** Short answers after Does…? */
export const shortAnswerGaps = [
  {
    id: "sa1",
    before: "Do you work on Sundays? —",
    after: "",
    answers: ["No, I don't.", "No, I don’t."],
    options: ["No, I don't.", "No, I doesn't.", "Yes, I does."],
  },
  {
    id: "sa2",
    before: "Does your friend work at a barbershop? —",
    after: "",
    answers: ["No, he doesn't.", "No, he doesn’t."],
    options: ["No, he doesn't.", "No, he don't.", "No, he isn't."],
  },
  {
    id: "sa3",
    before: "Do you study English every week? —",
    after: "",
    answers: ["Yes, I do.", "No, I don't.", "No, I don’t."],
    options: ["Yes, I do.", "Yes, I does.", "Yes, I am."],
  },
] as const;

/** Schedule build · prompts (teacher fills table with keywords) */
export const scheduleBuildPrompts = [
  "Monday — work or day off? What do you usually do?",
  "Tuesday — What time do you start work? Where do you work?",
  "Wednesday — What time do you finish work?",
  "Thursday — What do you usually do in the evening?",
  "Friday — day off? What do you do?",
  "Saturday / Sunday — work or free? What do you do at the weekend?",
] as const;

/** Frequency · 5 true sentences */
export const frequencySpeakPrompts = [
  "I always … in the morning.",
  "I usually work at …",
  "I often … in the evening.",
  "I sometimes … at the weekend.",
  "I never … on Mondays.",
] as const;

export const frequencySpeakModels = [
  "I always drink water in the morning.",
  "I usually work at a barbershop.",
  "I often play video games in the evening.",
  "I sometimes study English at the weekend.",
  "I never work on Mondays.",
] as const;

/** be + frequency contrast */
export const beFreqChoices = [
  {
    id: "bf1",
    before: "",
    after: "",
    options: ["I often work after lunch.", "I am often work after lunch."],
    answer: "I often work after lunch.",
  },
  {
    id: "bf2",
    before: "",
    after: "",
    options: ["I am often tired after work.", "I often am tired after work."],
    answer: "I am often tired after work.",
  },
  {
    id: "bf3",
    before: "",
    after: "",
    options: [
      "My clients are usually friendly.",
      "My clients usually are friendly.",
    ],
    answer: "My clients are usually friendly.",
  },
] as const;

/** Role-play · teacher asks student */
export const colleagueAskYou = [
  "What days do you work?",
  "Where do you work?",
  "What time do you start work?",
  "What time do you finish work?",
  "When are your days off?",
  "What do you do at the weekend?",
  "Do you study English every week?",
  "How often do you play games?",
] as const;

/** Role-play · student asks teacher (min 3) */
export const youAskTeacher = [
  "What days do you work?",
  "What time do you start work?",
  "Do you work at the weekend?",
  "What do you usually do after work?",
] as const;

/** Maria mini-text */
export const mariaWeekText = [
  "Maria works from Monday to Friday.",
  "She starts work at nine.",
  "She works at a café.",
  "She usually has lunch at one.",
  "On Saturdays, she meets friends.",
  "She never works on Sunday.",
] as const;

export const mariaQuiz = [
  {
    id: "m1",
    prompt: "What days does Maria work?",
    options: [
      "Monday to Friday",
      "Saturday and Sunday",
      "Tuesday to Thursday",
    ],
    correctAnswer: "Monday to Friday",
  },
  {
    id: "m2",
    prompt: "What time does she start work?",
    options: ["At nine", "At one", "At five"],
    correctAnswer: "At nine",
  },
  {
    id: "m3",
    prompt: "Where does she work?",
    options: ["At a café", "At a barbershop", "At home"],
    correctAnswer: "At a café",
  },
  {
    id: "m4",
    prompt: "What does she do on Saturday?",
    options: ["She meets friends", "She works", "She studies English"],
    correctAnswer: "She meets friends",
  },
  {
    id: "m5",
    prompt: "Does she work on Sunday?",
    options: ["No, she doesn’t", "Yes, she does", "Sometimes"],
    correctAnswer: "No, she doesn’t",
  },
] as const;

/** Final output rails */
export const weekFinalPrompts = [
  "I work from … to …",
  "I work at …",
  "I start work at …",
  "I finish work at …",
  "My days off are …",
  "I usually …",
  "I often …",
  "At the weekend, I …",
] as const;

export const weekFinalModels = [
  "I work from Tuesday to Thursday.",
  "I work at a barbershop.",
  "I start work at ten.",
  "I finish work at seven.",
  "My days off are Monday and Friday.",
  "I usually drink coffee in the morning.",
  "I often play video games in the evening.",
  "At the weekend, I rest / see my family.",
] as const;

/**
 * Extra speaking scenarios · recycle L30–47 (Present focus).
 * Teacher + student; one-to-one. Keep each scenario ~4–6 minutes.
 */
export const scenarioTownPrompts = [
  "You live in a small town. Tell your teacher: Is there a café / supermarket / park / station near you?",
  "Ask your teacher: Is there a gym near your home? Are there any good cafés?",
  "Describe your town in 4 sentences: There is… There isn’t… There are… There aren’t…",
  "Give simple directions: From the station, go straight on. Turn left. The café is next to…",
] as const;

export const scenarioTownModels = [
  "There is a supermarket near my house. There isn’t a big station.",
  "Is there a café near you? — Yes, there is. / No, there isn’t.",
  "Are there any parks? — Yes, there are two parks.",
  "Go straight on. Turn right. It’s next to the supermarket.",
] as const;

export const scenarioFriendPrompts = [
  "Describe a friend or client: He’s got… / She’s got… (hair, eyes, age).",
  "Ask your teacher: Have you got a brother / sister / pet?",
  "What have you got in your bag today? Ask and answer: Have you got your phone / keys / water?",
  "One sentence with can: Can he/she speak English? Can you cut hair well?",
] as const;

export const scenarioFriendModels = [
  "He’s got short dark hair. He’s in his 30s.",
  "Have you got a sister? — Yes, I have. / No, I haven’t.",
  "I’ve got my phone and my keys in my bag.",
  "Can you swim? — Yes, I can. / No, I can’t.",
] as const;

export const scenarioCafePrompts = [
  "Talk about food habits: I usually drink… I never eat… In the morning, I…",
  "Ask about your teacher: What do you usually have for breakfast? Do you drink coffee?",
  "Café role-play: You are the customer. Order a drink and food: I’d like… / Can I have…?",
  "Teacher is the waiter. Then swap: you are the waiter — ask What would you like?",
] as const;

export const scenarioCafeModels = [
  "I usually drink coffee in the morning. I never drink coffee at night.",
  "What do you usually have for breakfast?",
  "I’d like a coffee and a sandwich, please.",
  "What would you like? — I’d like tea, please.",
] as const;

export const scenarioHomePrompts = [
  "What jobs do you do around the house? I usually… I sometimes… I never…",
  "Ask your teacher: Do you cook dinner? Does your husband/friend clean the kitchen?",
  "Picture in your head: Right now somebody is cleaning. Say: She cleans every Saturday. Now she is cleaning.",
  "Ask 2 Does…? questions about a friend: Does he work on Sunday? Does she get up early?",
] as const;

export const scenarioHomeModels = [
  "I usually cook dinner. I sometimes do the dishes. I never do the laundry.",
  "Do you cook every day? — Yes, I do. / No, I don’t.",
  "Does she clean the bathroom? — Yes, she does. / No, she doesn’t.",
  "Every Saturday I clean. Now I am cleaning.",
] as const;
