export type VocabItem = {
  en: string;
  ua: string;
  example?: string;
};

export type VocabGroup = {
  label?: string;
  items: VocabItem[];
};

export type VocabCategory = {
  id: string;
  title: string;
  badge: string;
  description?: string;
  grammar?: string[];
  /** "grid" = compact visual grid (alphabet style), "table" = default row list */
  layout?: "grid" | "table";
  /** Override column headers [col1, col2, col3] */
  columnLabels?: [string, string, string];
  /** Override flashcard face labels */
  frontLabel?: string;
  backLabel?: string;
  groups: VocabGroup[];
};

export const vocabCategories: VocabCategory[] = [
  {
    id: "alphabet",
    title: "Alphabet",
    badge: "A–Z",
    layout: "grid",
    frontLabel: "Звук",
    backLabel: "Буква",
    groups: [
      {
        items: [
          { en: "Aa", ua: "[ ei ]" },
          { en: "Bb", ua: "[ biː ]" },
          { en: "Cc", ua: "[ siː ]" },
          { en: "Dd", ua: "[ diː ]" },
          { en: "Ee", ua: "[ iː ]" },
          { en: "Ff", ua: "[ ef ]" },
          { en: "Gg", ua: "[ dʒiː ]" },
          { en: "Hh", ua: "[ eitʃ ]" },
          { en: "Ii", ua: "[ ai ]" },
          { en: "Jj", ua: "[ dʒei ]" },
          { en: "Kk", ua: "[ kei ]" },
          { en: "Ll", ua: "[ el ]" },
          { en: "Mm", ua: "[ em ]" },
          { en: "Nn", ua: "[ en ]" },
          { en: "Oo", ua: "[ ou ]" },
          { en: "Pp", ua: "[ piː ]" },
          { en: "Qq", ua: "[ kjuː ]" },
          { en: "Rr", ua: "[ aː ]" },
          { en: "Ss", ua: "[ es ]" },
          { en: "Tt", ua: "[ tiː ]" },
          { en: "Uu", ua: "[ juː ]" },
          { en: "Vv", ua: "[ viː ]" },
          { en: "Ww", ua: "[ ˈdʌbl juː ]" },
          { en: "Xx", ua: "[ eks ]" },
          { en: "Yy", ua: "[ wai ]" },
          { en: "Zz", ua: "[ zed ]" },
        ],
      },
    ],
  },

  {
    id: "numbers",
    title: "Numbers",
    badge: "1–∞",
    columnLabels: ["Цифра", "Слово + звук", ""],
    frontLabel: "Слово + звук",
    backLabel: "Цифра",
    groups: [
      {
        label: "1–12",
        items: [
          { en: "1", ua: "one  [ wʌn ]" },
          { en: "2", ua: "two  [ tuː ]" },
          { en: "3", ua: "three  [ θriː ]" },
          { en: "4", ua: "four  [ fɔː ]" },
          { en: "5", ua: "five  [ faɪv ]" },
          { en: "6", ua: "six  [ sɪks ]" },
          { en: "7", ua: "seven  [ ˈsev(ə)n ]" },
          { en: "8", ua: "eight  [ eɪt ]" },
          { en: "9", ua: "nine  [ naɪn ]" },
          { en: "10", ua: "ten  [ ten ]" },
          { en: "11", ua: "eleven  [ ɪˈlev(ə)n ]" },
          { en: "12", ua: "twelve  [ twelv ]" },
        ],
      },
      {
        label: "13–19",
        items: [
          { en: "13", ua: "thirteen  [ θɜːˈtiːn ]" },
          { en: "14", ua: "fourteen  [ fɔːˈtiːn ]" },
          { en: "15", ua: "fifteen  [ ˌfɪfˈtiːn ]" },
          { en: "16", ua: "sixteen  [ ˌsɪkˈstiːn ]" },
          { en: "17", ua: "seventeen  [ ˌsev(ə)nˈtiːn ]" },
          { en: "18", ua: "eighteen  [ ˌeɪˈtiːn ]" },
          { en: "19", ua: "nineteen  [ ˌnaɪnˈtiːn ]" },
        ],
      },
      {
        label: "20–∞",
        items: [
          { en: "20", ua: "twenty  [ ˈtwentɪ ]" },
          { en: "21", ua: "twenty-one  [ ˌtwentɪˈwʌn ]" },
          { en: "60", ua: "sixty  [ ˈsɪkstɪ ]" },
          { en: "70", ua: "seventy  [ ˈsev(ə)ntɪ ]" },
          { en: "80", ua: "eighty  [ ˈeɪtɪ ]" },
          { en: "90", ua: "ninety  [ ˈnaɪntɪ ]" },
          { en: "100", ua: "one hundred  [ ˈhʌndrəd ]" },
          { en: "1 000", ua: "one thousand  [ ˈθauz(ə)nd ]" },
          { en: "1 000 000", ua: "one million  [ ˈmɪljən ]" },
          { en: "1 000 000 000", ua: "one billion  [ ˈbɪljən ]" },
        ],
      },
    ],
  },

  {
    id: "basic-words",
    title: "Basic words",
    badge: "A1",
    groups: [
      {
        items: [
          { en: "city", ua: "місто", example: "London is a big city." },
          { en: "country", ua: "країна", example: "What country are you from?" },
          {
            en: "e-mail address",
            ua: "електронна адреса",
            example: "What is your e-mail address?",
          },
          { en: "fine", ua: "добре, чудово", example: "I'm fine, thank you." },
          { en: "friend", ua: "друг", example: "She is my friend." },
          { en: "good", ua: "гарний, добрий", example: "Good morning!" },
          { en: "he", ua: "він", example: "He is a teacher." },
          { en: "her", ua: "її, їй", example: "This is her book." },
          { en: "his", ua: "його", example: "His name is Tom." },
          {
            en: "hobby",
            ua: "хобі, улюблена справа",
            example: "My hobby is reading.",
          },
          { en: "how", ua: "як", example: "How are you?" },
          { en: "I", ua: "я", example: "I am a student." },
          { en: "it", ua: "це, воно", example: "It is a good idea." },
          { en: "job", ua: "робота, професія", example: "What is your job?" },
          { en: "my", ua: "мій", example: "My name is Anna." },
          { en: "name", ua: "ім'я", example: "What is your name?" },
          { en: "nice", ua: "приємний", example: "Nice to meet you!" },
          { en: "number", ua: "номер", example: "What is your phone number?" },
          { en: "phone", ua: "телефон", example: "I have a new phone." },
          { en: "she", ua: "вона", example: "She is from Ukraine." },
          { en: "student", ua: "студент", example: "I am a student." },
          { en: "surname", ua: "прізвище", example: "What is your surname?" },
          { en: "teacher", ua: "вчитель", example: "He is a good teacher." },
          { en: "they", ua: "вони", example: "They are my friends." },
          {
            en: "visiting card",
            ua: "візитна картка",
            example: "Here is my visiting card.",
          },
          { en: "we", ua: "ми", example: "We are students." },
          { en: "what", ua: "що, який", example: "What is your name?" },
          { en: "who", ua: "хто", example: "Who is she?" },
          { en: "you", ua: "ти, ви", example: "You are my friend." },
          { en: "your", ua: "твій, ваш", example: "Your English is great!" },
        ],
      },
    ],
  },

  {
    id: "jobs",
    title: "Jobs",
    badge: "L26",
    description: "Професії та пов'язані слова (be: he/she/it).",
    grammar: [
      "He's a nurse. / She's a doctor. / It's a small hospital.",
      "He isn't from the UK. / She isn't from Canada.",
      "Is he from the UK? Yes, he is. / No, he isn't.",
      "Where's she from? She's from Spain.",
    ],
    groups: [
      {
        label: "Jobs (1b)",
        items: [
          {
            en: "football player",
            ua: "футболіст",
            example: "Santiago is a football player.",
          },
          {
            en: "doctor",
            ua: "лікар",
            example: "She's a doctor.",
          },
          {
            en: "school teacher",
            ua: "шкільний вчитель",
            example: "Mali is a school teacher.",
          },
          {
            en: "pilot",
            ua: "пілот",
            example: "Lidia is a pilot.",
          },
          {
            en: "farmer",
            ua: "фермер",
            example: "Amy is a farmer.",
          },
          {
            en: "nurse",
            ua: "медсестра / медбрат",
            example: "He's a nurse.",
          },
          {
            en: "taxi driver",
            ua: "таксист",
            example: "Josh is a taxi driver.",
          },
          {
            en: "office worker",
            ua: "офісний працівник",
            example: "Mila's an office worker.",
          },
        ],
      },
      {
        label: "Vocabulary Bank",
        items: [
          {
            en: "student",
            ua: "студент",
            example: "I'm a student.",
          },
          {
            en: "police officer",
            ua: "поліцейський / поліцейська",
            example: "He's a police officer.",
          },
          {
            en: "manager",
            ua: "менеджер, керівник",
            example: "Is the manager nice?",
          },
          {
            en: "soldier",
            ua: "солдат",
            example: "My brother is a soldier.",
          },
          {
            en: "artist",
            ua: "художник / митець",
            example: "She's an artist.",
          },
          {
            en: "writer",
            ua: "письменник",
            example: "He's a writer.",
          },
          {
            en: "tennis player",
            ua: "тенісист",
            example: "She's a tennis player.",
          },
          {
            en: "shop assistant",
            ua: "продавець / продавчиня",
            example: "He's a shop assistant.",
          },
          {
            en: "bus driver",
            ua: "водій автобуса",
            example: "She's a bus driver.",
          },
          {
            en: "waiter / waitress",
            ua: "офіціант / офіціантка",
            example: "He's a waiter. / She's a waitress.",
          },
          {
            en: "receptionist",
            ua: "адміністратор (ресепшн)",
            example: "She's a receptionist.",
          },
          {
            en: "tour guide",
            ua: "гід / екскурсовод",
            example: "He's a tour guide.",
          },
          {
            en: "engineer",
            ua: "інженер",
            example: "She's an engineer.",
          },
          {
            en: "chef",
            ua: "шеф-кухар",
            example: "He's a chef.",
          },
          {
            en: "firefighter",
            ua: "пожежник",
            example: "She's a firefighter.",
          },
          {
            en: "dentist",
            ua: "стоматолог",
            example: "He's a dentist.",
          },
        ],
      },
      {
        label: "Related words",
        items: [
          {
            en: "hospital",
            ua: "лікарня",
            example: "It's a small hospital.",
          },
          {
            en: "team",
            ua: "команда",
            example: "Is it a good team?",
          },
        ],
      },
    ],
  },

  {
    id: "do-make",
    title: "Do / Make",
    badge: "Фрази",
    description:
      "do = tasks, chores, routines (процеси, обов'язки)\nmake = create, prepare, produce (створення результату)",
    groups: [
      {
        label: "do",
        items: [
          {
            en: "do homework",
            ua: "робити домашнє завдання",
            example: "I do homework every day.",
          },
          {
            en: "do housework",
            ua: "робити хатню роботу",
            example: "I do housework on Sunday.",
          },
          {
            en: "do the dishes",
            ua: "мити посуд",
            example: "I do the dishes after dinner.",
          },
          {
            en: "do the laundry",
            ua: "прати",
            example: "I do the laundry on weekends.",
          },
          {
            en: "do exercise",
            ua: "робити вправи",
            example: "I do exercise in the morning.",
          },
          {
            en: "do business",
            ua: "вести бізнес",
            example: "They do business internationally.",
          },
          {
            en: "do research",
            ua: "проводити дослідження",
            example: "She does research at university.",
          },
          {
            en: "do a project",
            ua: "робити проєкт",
            example: "We do a project at work.",
          },
        ],
      },
      {
        label: "make",
        items: [
          {
            en: "make coffee",
            ua: "готувати каву",
            example: "I make coffee every morning.",
          },
          {
            en: "make dinner",
            ua: "готувати вечерю",
            example: "She makes dinner at 7 pm.",
          },
          {
            en: "make a cake",
            ua: "пекти торт",
            example: "He makes a cake for birthdays.",
          },
          {
            en: "make a mistake",
            ua: "робити помилку",
            example: "I sometimes make mistakes.",
          },
        ],
      },
    ],
  },

  {
    id: "prepositions-place",
    title: "Prepositions",
    badge: "Місце",
    description:
      "at = конкретне місце / активність\nin = всередині простору\non = поверхня / транспорт / дні",
    groups: [
      {
        label: "at",
        items: [
          { en: "at work", ua: "на роботі", example: "I am at work." },
          { en: "at home", ua: "вдома", example: "She is at home now." },
          { en: "at school", ua: "у школі", example: "He is at school." },
        ],
      },
      {
        label: "in",
        items: [
          {
            en: "in the box",
            ua: "у коробці",
            example: "The keys are in the box.",
          },
          {
            en: "in the room",
            ua: "у кімнаті",
            example: "They are in the room.",
          },
          {
            en: "in the car",
            ua: "в машині",
            example: "We are in the car.",
          },
        ],
      },
      {
        label: "on",
        items: [
          {
            en: "on the table",
            ua: "на столі",
            example: "The book is on the table.",
          },
          {
            en: "on the floor",
            ua: "на підлозі",
            example: "The bag is on the floor.",
          },
          {
            en: "on the wall",
            ua: "на стіні",
            example: "The picture is on the wall.",
          },
          {
            en: "on the bus",
            ua: "в автобусі",
            example: "I am on the bus.",
          },
          {
            en: "on the train",
            ua: "в поїзді",
            example: "She is on the train.",
          },
        ],
      },
    ],
  },

  {
    id: "time-expressions",
    title: "Time",
    badge: "Вирази часу",
    groups: [
      {
        items: [
          {
            en: "in the morning",
            ua: "вранці",
            example: "I run in the morning.",
          },
          {
            en: "in the afternoon",
            ua: "вдень",
            example: "I work in the afternoon.",
          },
          { en: "at midday", ua: "опівдні", example: "We eat at midday." },
          {
            en: "at midnight",
            ua: "опівночі",
            example: "He sleeps at midnight.",
          },
          {
            en: "on Monday",
            ua: "у понеділок",
            example: "I start work on Monday.",
          },
          {
            en: "in June",
            ua: "у червні",
            example: "My birthday is in June.",
          },
          { en: "in summer", ua: "влітку", example: "I travel in summer." },
          {
            en: "on Christmas",
            ua: "на Різдво",
            example: "We meet on Christmas.",
          },
        ],
      },
    ],
  },

  {
    id: "go-phrases",
    title: "Go phrases",
    badge: "Рух",
    description: "Активності з go",
    groups: [
      {
        items: [
          {
            en: "go shopping",
            ua: "ходити за покупками",
            example: "I go shopping on Saturday.",
          },
          {
            en: "go running",
            ua: "бігати",
            example: "I go running every morning.",
          },
          {
            en: "go swimming",
            ua: "плавати",
            example: "We go swimming in summer.",
          },
          {
            en: "go to work",
            ua: "йти на роботу",
            example: "I go to work at 9.",
          },
        ],
      },
    ],
  },

  {
    id: "useful",
    title: "Useful words",
    badge: "Лексика",
    groups: [
      {
        items: [
          {
            en: "few",
            ua: "мало (злічувані)",
            example: "I have few friends here.",
          },
          {
            en: "clients",
            ua: "клієнти",
            example: "We have many clients.",
          },
          {
            en: "yesterday",
            ua: "вчора",
            example: "I worked yesterday.",
          },
          {
            en: "wardrobe",
            ua: "шафа",
            example: "My clothes are in the wardrobe.",
          },
          {
            en: "fridge",
            ua: "холодильник",
            example: "The milk is in the fridge.",
          },
          {
            en: "pool",
            ua: "басейн",
            example: "We go swimming in the pool.",
          },
          {
            en: "plates",
            ua: "тарілки",
            example: "The plates are on the table.",
          },
          {
            en: "glasses",
            ua: "окуляри / склянки",
            example: "My glasses are on the desk.",
          },
        ],
      },
    ],
  },

  {
    id: "was-were",
    title: "Was / Were",
    badge: "Past be",
    description:
      "Past Simple «to be»\nI / he / she / it → was\nyou / we / they → were",
    grammar: [
      "wasn't (was not) — не був → I wasn't at work.",
      "weren't (were not) — не були → We weren't late.",
      "Was I late? — Я запізнився?",
      "Were they at home? — Вони були вдома?",
    ],
    groups: [
      {
        items: [
          {
            en: "was",
            ua: "був / була / було",
            example: "I was tired yesterday.",
          },
          { en: "were", ua: "були", example: "They were at home." },
        ],
      },
    ],
  },
];
