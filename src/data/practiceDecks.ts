import type { MixedTask, QuizTask } from "../types/trainer";

export type PracticeDeckId =
  | "present-simple"
  | "to-be-jobs"
  | "family"
  | "articles-countries"
  | "can";

export type PracticeDeck = {
  id: PracticeDeckId;
  title: string;
  badge: string;
  lessons: string;
  hint: string;
  tasks: MixedTask[];
};

/** Present Simple — Lessons 15–22 */
const presentSimpleTasks: MixedTask[] = [
  {
    text: "He ___ to school by bus.",
    options: ["go", "goes", "does"],
    correct: "goes",
  },
  {
    text: "They ___ English on Monday.",
    options: ["study", "studies", "does"],
    correct: "study",
  },
  {
    text: "She ___ breakfast at 8 o'clock.",
    options: ["have", "has", "do"],
    correct: "has",
  },
  {
    text: "___ your sister like pizza?",
    options: ["Do", "Does", "Is"],
    correct: "Does",
  },
  {
    text: "My cat ___ in the kitchen.",
    options: ["sleep", "sleeps", "sleepes"],
    correct: "sleeps",
  },
  {
    text: "We ___ our teacher every week.",
    options: ["meet", "meets", "meeting"],
    correct: "meet",
  },
  {
    text: "She ___ TV every evening.",
    options: ["watch", "watches", "watching"],
    correct: "watches",
  },
  {
    text: "___ they live near the park?",
    options: ["Do", "Does", "Are"],
    correct: "Do",
  },
];

/** to be + jobs — Lessons 23, 26 */
const toBeJobsTasks: MixedTask[] = [
  {
    text: "She ___ a doctor.",
    options: ["am", "is", "are"],
    correct: "is",
  },
  {
    text: "I ___ a student.",
    options: ["am", "is", "are"],
    correct: "am",
  },
  {
    text: "They ___ office workers.",
    options: ["am", "is", "are"],
    correct: "are",
  },
  {
    text: "He ___ a nurse. He works in a hospital.",
    options: ["am", "is", "are"],
    correct: "is",
  },
  {
    text: "___ she a teacher?",
    options: ["Am", "Is", "Are"],
    correct: "Is",
  },
  {
    text: "No, he ___. He's a taxi driver.",
    options: ["isn't", "aren't", "am not"],
    correct: "isn't",
  },
  {
    text: "What's his job? — He's a ___.",
    options: ["football player", "play football", "football"],
    correct: "football player",
  },
  {
    text: "She works ___ a hospital.",
    options: ["in", "at", "on"],
    correct: "in",
  },
  {
    text: "He works ___ a school.",
    options: ["in", "at", "on"],
    correct: "at",
  },
  {
    text: "___ you a pilot?",
    options: ["Am", "Is", "Are"],
    correct: "Are",
  },
];

/** Family + possessives — Lesson 27 */
const familyTasks: MixedTask[] = [
  {
    text: "This is ___ family.",
    options: ["my", "I", "me"],
    correct: "my",
  },
  {
    text: "___ name is Rafael.",
    options: ["He", "His", "Him"],
    correct: "His",
  },
  {
    text: "___ name is Maria.",
    options: ["She", "Her", "Hers"],
    correct: "Her",
  },
  {
    text: "___ children are students.",
    options: ["They", "Them", "Their"],
    correct: "Their",
  },
  {
    text: "Rafael is Cristina's ___.",
    options: ["husband", "wife", "brother"],
    correct: "husband",
  },
  {
    text: "Alonzo is Sierra's ___.",
    options: ["sister", "brother", "father"],
    correct: "brother",
  },
  {
    text: "___ from Turkey. (He is)",
    options: ["He's", "His", "He"],
    correct: "He's",
  },
  {
    text: "___ mother is English.",
    options: ["They're", "Their", "There"],
    correct: "Their",
  },
  {
    text: "My ___ name is Emir.",
    options: ["father", "father's", "fathers"],
    correct: "father's",
  },
  {
    text: "What's your ___ name?",
    options: ["friend", "friends", "friend's"],
    correct: "friend's",
  },
];

/** Articles + countries / nationalities — Lessons 23, 25 */
const articlesCountriesTasks: MixedTask[] = [
  {
    text: "She's ___ doctor.",
    options: ["a", "an", "the"],
    correct: "a",
  },
  {
    text: "He's ___ office worker.",
    options: ["a", "an", "the"],
    correct: "an",
  },
  {
    text: "I'm from ___ UK.",
    options: ["a", "an", "the"],
    correct: "the",
  },
  {
    text: "She's from ___ Spain.",
    options: ["a", "the", "(no article)"],
    correct: "(no article)",
  },
  {
    text: "He's from ___ US.",
    options: ["a", "an", "the"],
    correct: "the",
  },
  {
    text: "Anna is ___. (Poland)",
    options: ["Poland", "Polish", "the Poland"],
    correct: "Polish",
  },
  {
    text: "Tom is ___. (the UK)",
    options: ["England", "English", "British Isles"],
    correct: "English",
  },
  {
    text: "We are from ___.",
    options: ["Ukrainian", "Ukraine", "the Ukraine"],
    correct: "Ukraine",
  },
  {
    text: "Is she ___ nurse?",
    options: ["a", "an", "the"],
    correct: "a",
  },
  {
    text: "It's ___ small hospital.",
    options: ["a", "an", "the"],
    correct: "a",
  },
];

/** Can / can't — Lesson 21 */
const canTasks: MixedTask[] = [
  {
    text: "She ___ swim.",
    options: ["can", "cans", "is can"],
    correct: "can",
  },
  {
    text: "He ___ drive. (no)",
    options: ["can", "can't", "doesn't can"],
    correct: "can't",
  },
  {
    text: "___ you speak English?",
    options: ["Can", "Do", "Are"],
    correct: "Can",
  },
  {
    text: "They ___ cook very well.",
    options: ["can", "cans", "are can"],
    correct: "can",
  },
  {
    text: "I ___ play the piano. (no)",
    options: ["can", "can't", "don't can"],
    correct: "can't",
  },
  {
    text: "___ he ride a bike?",
    options: ["Can", "Does", "Is"],
    correct: "Can",
  },
];

export const practiceDecks: PracticeDeck[] = [
  {
    id: "present-simple",
    title: "Present Simple",
    badge: "L15–22",
    lessons: "he/she/it · do/does · routine",
    hint: "Для he/she/it додаємо -s. У питаннях: Do/Does + base form.",
    tasks: presentSimpleTasks,
  },
  {
    id: "to-be-jobs",
    title: "To be · Jobs",
    badge: "L23 · 26",
    lessons: "am/is/are · jobs · place of work",
    hint: "I'm / He's / They're + a/an + job. Work in a hospital / at a school.",
    tasks: toBeJobsTasks,
  },
  {
    id: "family",
    title: "Family",
    badge: "L27",
    lessons: "my/his/her/their · 's · family words",
    hint: "my/your/his/her/their + noun. Cristina's husband. They're ≠ Their.",
    tasks: familyTasks,
  },
  {
    id: "articles-countries",
    title: "Articles · Countries",
    badge: "L23 · 25",
    lessons: "a/an/the · countries · nationalities",
    hint: "a + consonant, an + vowel sound. the UK / the US. Spain — без the.",
    tasks: articlesCountriesTasks,
  },
  {
    id: "can",
    title: "Can / Can't",
    badge: "L21",
    lessons: "ability · questions",
    hint: "can/can't + base verb. Can you…? — Yes, I can. / No, I can't.",
    tasks: canTasks,
  },
];

/** Mixed checkpoint across recent lessons (scored quiz) */
export const checkpointTasks: QuizTask[] = [
  {
    text: "She ___ a nurse.",
    options: ["am", "is", "are"],
    correct: "is",
  },
  {
    text: "___ your brother a student?",
    options: ["Am", "Is", "Are"],
    correct: "Is",
  },
  {
    text: "I'm from ___ UK.",
    options: ["a", "an", "the"],
    correct: "the",
  },
  {
    text: "He's ___ office worker.",
    options: ["a", "an", "the"],
    correct: "an",
  },
  {
    text: "___ name is Alonzo.",
    options: ["He", "His", "Him"],
    correct: "His",
  },
  {
    text: "This is my sister. ___ name is Sierra.",
    options: ["She", "Her", "Hers"],
    correct: "Her",
  },
  {
    text: "Rafael is Cristina's ___.",
    options: ["wife", "husband", "son"],
    correct: "husband",
  },
  {
    text: "She ___ swim very well.",
    options: ["can", "cans", "is can"],
    correct: "can",
  },
  {
    text: "He ___ to work by bus every day.",
    options: ["go", "goes", "going"],
    correct: "goes",
  },
  {
    text: "___ they like coffee?",
    options: ["Do", "Does", "Are"],
    correct: "Do",
  },
  {
    text: "She works ___ a hospital.",
    options: ["in", "at", "on"],
    correct: "in",
  },
  {
    text: "Anna is ___. (Spain)",
    options: ["Spain", "Spanish", "Spaniard country"],
    correct: "Spanish",
  },
];
