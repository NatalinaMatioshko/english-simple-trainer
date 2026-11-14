export type VocabItem = {
  en: string;
  ua: string;
  /** IPA transcription (without brackets), e.g. "ˈsɪti" */
  ipa?: string;
  example?: string;
  /** Firestore / local id for student-added words */
  customId?: string;
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
    description:
      "Натисніть на букву, щоб почути вимову назви літери (англійська, en-GB).",
    groups: [
      {
        items: [
          { en: "Aa", ua: "[ ei ]", ipa: "eɪ" },
          { en: "Bb", ua: "[ biː ]", ipa: "biː" },
          { en: "Cc", ua: "[ siː ]", ipa: "siː" },
          { en: "Dd", ua: "[ diː ]", ipa: "diː" },
          { en: "Ee", ua: "[ iː ]", ipa: "iː" },
          { en: "Ff", ua: "[ ef ]", ipa: "ef" },
          { en: "Gg", ua: "[ dʒiː ]", ipa: "dʒiː" },
          { en: "Hh", ua: "[ eitʃ ]", ipa: "eɪtʃ" },
          { en: "Ii", ua: "[ ai ]", ipa: "aɪ" },
          { en: "Jj", ua: "[ dʒei ]", ipa: "dʒeɪ" },
          { en: "Kk", ua: "[ kei ]", ipa: "keɪ" },
          { en: "Ll", ua: "[ el ]", ipa: "el" },
          { en: "Mm", ua: "[ em ]", ipa: "em" },
          { en: "Nn", ua: "[ en ]", ipa: "en" },
          { en: "Oo", ua: "[ ou ]", ipa: "əʊ" },
          { en: "Pp", ua: "[ piː ]", ipa: "piː" },
          { en: "Qq", ua: "[ kjuː ]", ipa: "kjuː" },
          { en: "Rr", ua: "[ aː ]", ipa: "ɑː" },
          { en: "Ss", ua: "[ es ]", ipa: "es" },
          { en: "Tt", ua: "[ tiː ]", ipa: "tiː" },
          { en: "Uu", ua: "[ juː ]", ipa: "juː" },
          { en: "Vv", ua: "[ viː ]", ipa: "viː" },
          { en: "Ww", ua: "[ ˈdʌbl juː ]", ipa: "ˈdʌbl juː" },
          { en: "Xx", ua: "[ eks ]", ipa: "eks" },
          { en: "Yy", ua: "[ wai ]", ipa: "waɪ" },
          { en: "Zz", ua: "[ zed ]", ipa: "zed" },
        ],
      },
    ],
  },

  {
    id: "numbers",
    title: "Numbers",
    badge: "1–∞",
    columnLabels: ["Цифра", "Слово + звук", ""],
    frontLabel: "Цифра",
    backLabel: "Слово + звук",
    groups: [
      {
        label: "1–12",
        items: [
          { en: "1", ua: "one", ipa: "wʌn" },
          { en: "2", ua: "two", ipa: "tuː" },
          { en: "3", ua: "three", ipa: "θriː" },
          { en: "4", ua: "four", ipa: "fɔː" },
          { en: "5", ua: "five", ipa: "faɪv" },
          { en: "6", ua: "six", ipa: "sɪks" },
          { en: "7", ua: "seven", ipa: "ˈsev(ə)n" },
          { en: "8", ua: "eight", ipa: "eɪt" },
          { en: "9", ua: "nine", ipa: "naɪn" },
          { en: "10", ua: "ten", ipa: "ten" },
          { en: "11", ua: "eleven", ipa: "ɪˈlev(ə)n" },
          { en: "12", ua: "twelve", ipa: "twelv" },
        ],
      },
      {
        label: "13–19",
        items: [
          { en: "13", ua: "thirteen", ipa: "θɜːˈtiːn" },
          { en: "14", ua: "fourteen", ipa: "fɔːˈtiːn" },
          { en: "15", ua: "fifteen", ipa: "ˌfɪfˈtiːn" },
          { en: "16", ua: "sixteen", ipa: "ˌsɪkˈstiːn" },
          { en: "17", ua: "seventeen", ipa: "ˌsev(ə)nˈtiːn" },
          { en: "18", ua: "eighteen", ipa: "ˌeɪˈtiːn" },
          { en: "19", ua: "nineteen", ipa: "ˌnaɪnˈtiːn" },
        ],
      },
      {
        label: "20–∞",
        items: [
          { en: "20", ua: "twenty", ipa: "ˈtwentɪ" },
          { en: "21", ua: "twenty-one", ipa: "ˌtwentɪˈwʌn" },
          { en: "30", ua: "thirty", ipa: "ˈθɜːti" },
          { en: "40", ua: "forty", ipa: "ˈfɔːti" },
          { en: "50", ua: "fifty", ipa: "ˈfɪfti" },
          { en: "60", ua: "sixty", ipa: "ˈsɪkstɪ" },
          { en: "70", ua: "seventy", ipa: "ˈsev(ə)ntɪ" },
          { en: "80", ua: "eighty", ipa: "ˈeɪtɪ" },
          { en: "90", ua: "ninety", ipa: "ˈnaɪntɪ" },
          { en: "100", ua: "one hundred", ipa: "wʌn ˈhʌndrəd" },
          { en: "1 000", ua: "one thousand", ipa: "wʌn ˈθaʊz(ə)nd" },
          { en: "1 000 000", ua: "one million", ipa: "wʌn ˈmɪljən" },
          { en: "1 000 000 000", ua: "one billion", ipa: "wʌn ˈbɪljən" },
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
          {
            en: "city",
            ua: "місто",
            ipa: "ˈsɪti",
            example: "London is a big city.",
          },
          {
            en: "country",
            ua: "країна",
            ipa: "ˈkʌntri",
            example: "What country are you from?",
          },
          {
            en: "e-mail address",
            ua: "електронна адреса",
            ipa: "ˈiːmeɪl əˈdres",
            example: "What is your e-mail address?",
          },
          {
            en: "fine",
            ua: "добре, чудово",
            ipa: "faɪn",
            example: "I'm fine, thank you.",
          },
          {
            en: "friend",
            ua: "друг",
            ipa: "frend",
            example: "She is my friend.",
          },
          {
            en: "good",
            ua: "гарний, добрий",
            ipa: "ɡʊd",
            example: "Good morning!",
          },
          { en: "he", ua: "він", ipa: "hiː", example: "He is a teacher." },
          {
            en: "her",
            ua: "її, їй",
            ipa: "hɜː",
            example: "This is her book.",
          },
          { en: "his", ua: "його", ipa: "hɪz", example: "His name is Tom." },
          {
            en: "hobby",
            ua: "хобі, улюблена справа",
            ipa: "ˈhɒbi",
            example: "My hobby is reading.",
          },
          { en: "how", ua: "як", ipa: "haʊ", example: "How are you?" },
          { en: "I", ua: "я", ipa: "aɪ", example: "I am a student." },
          {
            en: "it",
            ua: "це, воно",
            ipa: "ɪt",
            example: "It is a good idea.",
          },
          {
            en: "job",
            ua: "робота, професія",
            ipa: "dʒɒb",
            example: "What is your job?",
          },
          { en: "my", ua: "мій", ipa: "maɪ", example: "My name is Anna." },
          {
            en: "name",
            ua: "ім'я",
            ipa: "neɪm",
            example: "What is your name?",
          },
          {
            en: "nice",
            ua: "приємний",
            ipa: "naɪs",
            example: "Nice to meet you!",
          },
          {
            en: "number",
            ua: "номер",
            ipa: "ˈnʌmbə",
            example: "What is your phone number?",
          },
          {
            en: "phone",
            ua: "телефон",
            ipa: "fəʊn",
            example: "I have a new phone.",
          },
          {
            en: "she",
            ua: "вона",
            ipa: "ʃiː",
            example: "She is from Ukraine.",
          },
          {
            en: "student",
            ua: "студент",
            ipa: "ˈstjuːd(ə)nt",
            example: "I am a student.",
          },
          {
            en: "surname",
            ua: "прізвище",
            ipa: "ˈsɜːneɪm",
            example: "What is your surname?",
          },
          {
            en: "teacher",
            ua: "вчитель",
            ipa: "ˈtiːtʃə",
            example: "He is a good teacher.",
          },
          {
            en: "they",
            ua: "вони",
            ipa: "ðeɪ",
            example: "They are my friends.",
          },
          {
            en: "visiting card",
            ua: "візитна картка",
            ipa: "ˈvɪzɪtɪŋ kɑːd",
            example: "Here is my visiting card.",
          },
          { en: "we", ua: "ми", ipa: "wiː", example: "We are students." },
          {
            en: "what",
            ua: "що, який",
            ipa: "wɒt",
            example: "What is your name?",
          },
          { en: "who", ua: "хто", ipa: "huː", example: "Who is she?" },
          {
            en: "you",
            ua: "ти, ви",
            ipa: "juː",
            example: "You are my friend.",
          },
          {
            en: "your",
            ua: "твій, ваш",
            ipa: "jɔː",
            example: "Your English is great!",
          },
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
            ipa: "ˈfʊtbɔːl ˌpleɪə",
            example: "Santiago is a football player.",
          },
          {
            en: "doctor",
            ua: "лікар",
            ipa: "ˈdɒktə",
            example: "She's a doctor.",
          },
          {
            en: "school teacher",
            ua: "шкільний вчитель",
            ipa: "skuːl ˈtiːtʃə",
            example: "Mali is a school teacher.",
          },
          {
            en: "pilot",
            ua: "пілот",
            ipa: "ˈpaɪlət",
            example: "Lidia is a pilot.",
          },
          {
            en: "farmer",
            ua: "фермер",
            ipa: "ˈfɑːmə",
            example: "Amy is a farmer.",
          },
          {
            en: "nurse",
            ua: "медсестра / медбрат",
            ipa: "nɜːs",
            example: "He's a nurse.",
          },
          {
            en: "taxi driver",
            ua: "таксист",
            ipa: "ˈtæksi ˌdraɪvə",
            example: "Josh is a taxi driver.",
          },
          {
            en: "office worker",
            ua: "офісний працівник",
            ipa: "ˈɒfɪs ˌwɜːkə",
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
            ipa: "ˈstjuːd(ə)nt",
            example: "I'm a student.",
          },
          {
            en: "police officer",
            ua: "поліцейський / поліцейська",
            ipa: "pəˈliːs ˌɒfɪsə",
            example: "He's a police officer.",
          },
          {
            en: "manager",
            ua: "менеджер, керівник",
            ipa: "ˈmænɪdʒə",
            example: "Is the manager nice?",
          },
          {
            en: "soldier",
            ua: "солдат",
            ipa: "ˈsəʊldʒə",
            example: "My brother is a soldier.",
          },
          {
            en: "artist",
            ua: "художник / митець",
            ipa: "ˈɑːtɪst",
            example: "She's an artist.",
          },
          {
            en: "writer",
            ua: "письменник",
            ipa: "ˈraɪtə",
            example: "He's a writer.",
          },
          {
            en: "tennis player",
            ua: "тенісист",
            ipa: "ˈtenɪs ˌpleɪə",
            example: "She's a tennis player.",
          },
          {
            en: "shop assistant",
            ua: "продавець / продавчиня",
            ipa: "ʃɒp əˈsɪst(ə)nt",
            example: "He's a shop assistant.",
          },
          {
            en: "bus driver",
            ua: "водій автобуса",
            ipa: "bʌs ˌdraɪvə",
            example: "She's a bus driver.",
          },
          {
            en: "waiter / waitress",
            ua: "офіціант / офіціантка",
            ipa: "ˈweɪtə / ˈweɪtrəs",
            example: "He's a waiter. / She's a waitress.",
          },
          {
            en: "receptionist",
            ua: "адміністратор (ресепшн)",
            ipa: "rɪˈsepʃ(ə)nɪst",
            example: "She's a receptionist.",
          },
          {
            en: "tour guide",
            ua: "гід / екскурсовод",
            ipa: "tʊə ɡaɪd",
            example: "He's a tour guide.",
          },
          {
            en: "engineer",
            ua: "інженер",
            ipa: "ˌendʒɪˈnɪə",
            example: "She's an engineer.",
          },
          {
            en: "chef",
            ua: "шеф-кухар",
            ipa: "ʃef",
            example: "He's a chef.",
          },
          {
            en: "firefighter",
            ua: "пожежник",
            ipa: "ˈfaɪəfaɪtə",
            example: "She's a firefighter.",
          },
          {
            en: "dentist",
            ua: "стоматолог",
            ipa: "ˈdentɪst",
            example: "He's a dentist.",
          },
          {
            en: "barber",
            ua: "барбер / перукар (чоловічий)",
            ipa: "ˈbɑːbə",
            example: "He's a barber.",
          },
        ],
      },
      {
        label: "Related words",
        items: [
          {
            en: "hospital",
            ua: "лікарня",
            ipa: "ˈhɒspɪtl",
            example: "It's a small hospital.",
          },
          {
            en: "team",
            ua: "команда",
            ipa: "tiːm",
            example: "Is it a good team?",
          },
          {
            en: "haircut",
            ua: "стрижка",
            ipa: "ˈheəkʌt",
            example: "I need a haircut.",
          },
          {
            en: "hairstyle",
            ua: "зачіска",
            ipa: "ˈheəstaɪl",
            example: "I like your hairstyle.",
          },
          {
            en: "hair",
            ua: "волосся",
            ipa: "heə",
            example: "He has short hair.",
          },
          {
            en: "beard",
            ua: "борода",
            ipa: "bɪəd",
            example: "He has a beard.",
          },
          {
            en: "barbershop",
            ua: "барбершоп",
            ipa: "ˈbɑːbəʃɒp",
            example: "He works in a barbershop.",
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
            ipa: "duː ˈhəʊmwɜːk",
            example: "I do homework every day.",
          },
          {
            en: "do housework",
            ua: "робити хатню роботу",
            ipa: "duː ˈhaʊswɜːk",
            example: "I do housework on Sunday.",
          },
          {
            en: "do the dishes",
            ua: "мити посуд",
            ipa: "duː ðə ˈdɪʃɪz",
            example: "I do the dishes after dinner.",
          },
          {
            en: "do the laundry",
            ua: "прати",
            ipa: "duː ðə ˈlɔːndri",
            example: "I do the laundry on weekends.",
          },
          {
            en: "do exercise",
            ua: "робити вправи",
            ipa: "duː ˈeksəsaɪz",
            example: "I do exercise in the morning.",
          },
          {
            en: "do business",
            ua: "вести бізнес",
            ipa: "duː ˈbɪznəs",
            example: "They do business internationally.",
          },
          {
            en: "do research",
            ua: "проводити дослідження",
            ipa: "duː rɪˈsɜːtʃ",
            example: "She does research at university.",
          },
          {
            en: "do a project",
            ua: "робити проєкт",
            ipa: "duː ə ˈprɒdʒekt",
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
            ipa: "meɪk ˈkɒfi",
            example: "I make coffee every morning.",
          },
          {
            en: "make dinner",
            ua: "готувати вечерю",
            ipa: "meɪk ˈdɪnə",
            example: "She makes dinner at 7 pm.",
          },
          {
            en: "make a cake",
            ua: "пекти торт",
            ipa: "meɪk ə keɪk",
            example: "He makes a cake for birthdays.",
          },
          {
            en: "make a mistake",
            ua: "робити помилку",
            ipa: "meɪk ə mɪˈsteɪk",
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
          {
            en: "at work",
            ua: "на роботі",
            ipa: "ət wɜːk",
            example: "I am at work.",
          },
          {
            en: "at home",
            ua: "вдома",
            ipa: "ət həʊm",
            example: "She is at home now.",
          },
          {
            en: "at school",
            ua: "у школі",
            ipa: "ət skuːl",
            example: "He is at school.",
          },
        ],
      },
      {
        label: "in",
        items: [
          {
            en: "in the box",
            ua: "у коробці",
            ipa: "ɪn ðə bɒks",
            example: "The keys are in the box.",
          },
          {
            en: "in the room",
            ua: "у кімнаті",
            ipa: "ɪn ðə ruːm",
            example: "They are in the room.",
          },
          {
            en: "in the car",
            ua: "в машині",
            ipa: "ɪn ðə kɑː",
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
            ipa: "ɒn ðə ˈteɪbl",
            example: "The book is on the table.",
          },
          {
            en: "on the floor",
            ua: "на підлозі",
            ipa: "ɒn ðə flɔː",
            example: "The bag is on the floor.",
          },
          {
            en: "on the wall",
            ua: "на стіні",
            ipa: "ɒn ðə wɔːl",
            example: "The picture is on the wall.",
          },
          {
            en: "on the bus",
            ua: "в автобусі",
            ipa: "ɒn ðə bʌs",
            example: "I am on the bus.",
          },
          {
            en: "on the train",
            ua: "в поїзді",
            ipa: "ɒn ðə treɪn",
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
        label: "Parts of the day",
        items: [
          {
            en: "morning",
            ua: "ранок",
            ipa: "ˈmɔːnɪŋ",
            example: "I get up in the morning.",
          },
          {
            en: "noon",
            ua: "полудень / 12:00",
            ipa: "nuːn",
            example: "It's noon.",
          },
          {
            en: "afternoon",
            ua: "день (після полудня)",
            ipa: "ˌɑːftəˈnuːn",
            example: "I work in the afternoon.",
          },
          {
            en: "evening",
            ua: "вечір",
            ipa: "ˈiːvnɪŋ",
            example: "I watch TV in the evening.",
          },
          {
            en: "night",
            ua: "ніч",
            ipa: "naɪt",
            example: "Good night!",
          },
          {
            en: "midnight",
            ua: "опівніч / 00:00",
            ipa: "ˈmɪdnaɪt",
            example: "I go to bed before midnight.",
          },
          {
            en: "in the morning",
            ua: "вранці",
            ipa: "ɪn ðə ˈmɔːnɪŋ",
            example: "I run in the morning.",
          },
          {
            en: "in the afternoon",
            ua: "вдень",
            ipa: "ɪn ðiː ˌɑːftəˈnuːn",
            example: "I work in the afternoon.",
          },
          {
            en: "in the evening",
            ua: "ввечері",
            ipa: "ɪn ði ˈiːvnɪŋ",
            example: "I watch TV in the evening.",
          },
          {
            en: "at night",
            ua: "вночі",
            ipa: "ət naɪt",
            example: "I sleep at night.",
          },
          {
            en: "at midday",
            ua: "опівдні",
            ipa: "ət ˌmɪdˈdeɪ",
            example: "We eat at midday.",
          },
          {
            en: "at midnight",
            ua: "опівночі",
            ipa: "ət ˈmɪdnaɪt",
            example: "He sleeps at midnight.",
          },
        ],
      },
      {
        label: "Days of the week",
        items: [
          {
            en: "Monday",
            ua: "понеділок",
            ipa: "ˈmʌndeɪ",
            example: "I work on Monday.",
          },
          {
            en: "Tuesday",
            ua: "вівторок",
            ipa: "ˈtjuːzdeɪ",
            example: "We meet on Tuesday.",
          },
          {
            en: "Wednesday",
            ua: "середа",
            ipa: "ˈwenzdeɪ",
            example: "She studies on Wednesday.",
          },
          {
            en: "Thursday",
            ua: "четвер",
            ipa: "ˈθɜːzdeɪ",
            example: "I finish work on Thursday.",
          },
          {
            en: "Friday",
            ua: "п'ятниця",
            ipa: "ˈfraɪdeɪ",
            example: "We go out on Friday.",
          },
          {
            en: "Saturday",
            ua: "субота",
            ipa: "ˈsætədeɪ",
            example: "I go shopping on Saturday.",
          },
          {
            en: "Sunday",
            ua: "неділя",
            ipa: "ˈsʌndeɪ",
            example: "I rest on Sunday.",
          },
          {
            en: "on Monday",
            ua: "у понеділок",
            ipa: "ɒn ˈmʌndeɪ",
            example: "I start work on Monday.",
          },
          {
            en: "at the weekend",
            ua: "на вихідних",
            ipa: "ət ðə ˌwiːkˈend",
            example: "We go shopping at the weekend.",
          },
        ],
      },
      {
        label: "How often",
        items: [
          {
            en: "always",
            ua: "завжди",
            ipa: "ˈɔːlweɪz",
            example: "I always wake up early.",
          },
          {
            en: "usually",
            ua: "зазвичай",
            ipa: "ˈjuːʒuəli",
            example: "I usually have breakfast at home.",
          },
          {
            en: "often",
            ua: "часто",
            ipa: "ˈɒf(ə)n",
            example: "He often goes by bus.",
          },
          {
            en: "sometimes",
            ua: "іноді",
            ipa: "ˈsʌmtaɪmz",
            example: "I sometimes cook.",
          },
          {
            en: "never",
            ua: "ніколи",
            ipa: "ˈnevə",
            example: "She never goes to bed late.",
          },
          {
            en: "every week",
            ua: "щотижня",
            ipa: "ˈevri wiːk",
            example: "I go to the gym every week.",
          },
          {
            en: "habit",
            ua: "звичка",
            ipa: "ˈhæbɪt",
            example: "She has good habits.",
          },
        ],
      },
      {
        label: "Other",
        items: [
          {
            en: "today",
            ua: "сьогодні",
            ipa: "təˈdeɪ",
            example: "Today is Monday.",
          },
          {
            en: "tomorrow",
            ua: "завтра",
            ipa: "təˈmɒrəʊ",
            example: "I work tomorrow.",
          },
          {
            en: "in June",
            ua: "у червні",
            ipa: "ɪn dʒuːn",
            example: "My birthday is in June.",
          },
          {
            en: "in summer",
            ua: "влітку",
            ipa: "ɪn ˈsʌmə",
            example: "I travel in summer.",
          },
          {
            en: "on Christmas",
            ua: "на Різдво",
            ipa: "ɒn ˈkrɪsməs",
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
    description:
      "Фрази з go. Зазвичай go to + місце (go to work). Але go home — без to. Також без to: go shopping, go out, go by bus, go on foot, go for a walk.",
    grammar: [
      "go to + place → go to work / school / the park",
      "go home (no to)",
      "go + -ing → go shopping / swimming / running",
      "go by bus / go on foot / go for a walk",
    ],
    groups: [
      {
        label: "go to + place",
        items: [
          {
            en: "go to work",
            ua: "йти на роботу",
            ipa: "ɡəʊ tə wɜːk",
            example: "I go to work at 9.",
          },
          {
            en: "go to school",
            ua: "йти до школи",
            ipa: "ɡəʊ tə skuːl",
            example: "I go to school every day.",
          },
          {
            en: "go to bed",
            ua: "лягати спати",
            ipa: "ɡəʊ tə bed",
            example: "I go to bed at 11.",
          },
          {
            en: "go to the park",
            ua: "йти в парк",
            ipa: "ɡəʊ tə ðə pɑːk",
            example: "Do they go to the park?",
          },
          {
            en: "go to the gym",
            ua: "йти в спортзал",
            ipa: "ɡəʊ tə ðə dʒɪm",
            example: "I go to the gym on Friday.",
          },
          {
            en: "go to the cinema",
            ua: "йти в кіно",
            ipa: "ɡəʊ tə ðə ˈsɪnəmə",
            example: "We go to the cinema on Saturday.",
          },
        ],
      },
      {
        label: "Without to",
        items: [
          {
            en: "go home",
            ua: "йти додому",
            ipa: "ɡəʊ həʊm",
            example: "I go home at 6. (not go to home)",
          },
          {
            en: "go out",
            ua: "виходити / гуляти містом",
            ipa: "ɡəʊ aʊt",
            example: "We go out on Saturday evening.",
          },
          {
            en: "go shopping",
            ua: "ходити за покупками",
            ipa: "ɡəʊ ˈʃɒpɪŋ",
            example: "I go shopping on Saturday.",
          },
          {
            en: "go running",
            ua: "бігати",
            ipa: "ɡəʊ ˈrʌnɪŋ",
            example: "I go running every morning.",
          },
          {
            en: "go swimming",
            ua: "плавати",
            ipa: "ɡəʊ ˈswɪmɪŋ",
            example: "We go swimming in summer.",
          },
          {
            en: "go by bus",
            ua: "їхати автобусом",
            ipa: "ɡəʊ baɪ bʌs",
            example: "I go to work by bus.",
          },
          {
            en: "go by car",
            ua: "їхати машиною",
            ipa: "ɡəʊ baɪ kɑː",
            example: "She goes by car.",
          },
          {
            en: "go by train",
            ua: "їхати поїздом",
            ipa: "ɡəʊ baɪ treɪn",
            example: "They go by train.",
          },
          {
            en: "go on foot",
            ua: "йти пішки",
            ipa: "ɡəʊ ɒn fʊt",
            example: "I go to school on foot.",
          },
          {
            en: "go for a walk",
            ua: "піти погуляти",
            ipa: "ɡəʊ fər ə wɔːk",
            example: "I go for a walk after dinner.",
          },
          {
            en: "go abroad",
            ua: "їхати за кордон",
            ipa: "ɡəʊ əˈbrɔːd",
            example: "We go abroad in summer.",
          },
        ],
      },
    ],
  },

  {
    id: "countries-nationalities",
    title: "Countries & nationalities",
    badge: "L25",
    description:
      "Країна і національність. I'm from Spain. I'm Spanish.\nЗ the: the UK, the US.",
    grammar: [
      "I'm from + country → I'm from Japan.",
      "I'm + nationality → I'm Japanese.",
      "the UK / the US (with the)",
    ],
    groups: [
      {
        label: "Countries",
        items: [
          {
            en: "Spain",
            ua: "Іспанія",
            ipa: "speɪn",
            example: "I'm from Spain.",
          },
          {
            en: "Canada",
            ua: "Канада",
            ipa: "ˈkænədə",
            example: "She's from Canada.",
          },
          {
            en: "Japan",
            ua: "Японія",
            ipa: "dʒəˈpæn",
            example: "He's from Japan.",
          },
          {
            en: "the US",
            ua: "США",
            ipa: "ðə ˌjuː ˈes",
            example: "They're from the US.",
          },
          {
            en: "Poland",
            ua: "Польща",
            ipa: "ˈpəʊlənd",
            example: "She's from Poland.",
          },
          {
            en: "Argentina",
            ua: "Аргентина",
            ipa: "ˌɑːdʒənˈtiːnə",
            example: "He's from Argentina.",
          },
          {
            en: "Thailand",
            ua: "Таїланд",
            ipa: "ˈtaɪlænd",
            example: "She's from Thailand.",
          },
          {
            en: "the UK",
            ua: "Велика Британія",
            ipa: "ðə ˌjuː ˈkeɪ",
            example: "I'm from the UK.",
          },
          {
            en: "Turkey",
            ua: "Туреччина",
            ipa: "ˈtɜːki",
            example: "He's from Turkey.",
          },
          {
            en: "Mexico",
            ua: "Мексика",
            ipa: "ˈmeksɪkəʊ",
            example: "She's from Mexico.",
          },
          {
            en: "Brazil",
            ua: "Бразилія",
            ipa: "brəˈzɪl",
            example: "They're from Brazil.",
          },
          {
            en: "Italy",
            ua: "Італія",
            ipa: "ˈɪtəli",
            example: "I'm from Italy.",
          },
          {
            en: "Ukraine",
            ua: "Україна",
            ipa: "juˈkreɪn",
            example: "I'm from Ukraine.",
          },
          {
            en: "Crimea",
            ua: "Крим",
            ipa: "kraɪˈmiːə",
            example: "I'm from Crimea.",
          },
          {
            en: "Germany",
            ua: "Німеччина",
            ipa: "ˈdʒɜːməni",
            example: "He's from Germany.",
          },
          {
            en: "France",
            ua: "Франція",
            ipa: "frɑːns",
            example: "She's from France.",
          },
          {
            en: "China",
            ua: "Китай",
            ipa: "ˈtʃaɪnə",
            example: "They're from China.",
          },
          {
            en: "India",
            ua: "Індія",
            ipa: "ˈɪndiə",
            example: "I'm from India.",
          },
          {
            en: "Australia",
            ua: "Австралія",
            ipa: "ɒˈstreɪliə",
            example: "She's from Australia.",
          },
          {
            en: "Egypt",
            ua: "Єгипет",
            ipa: "ˈiːdʒɪpt",
            example: "He's from Egypt.",
          },
          {
            en: "Greece",
            ua: "Греція",
            ipa: "ɡriːs",
            example: "They're from Greece.",
          },
          {
            en: "Portugal",
            ua: "Португалія",
            ipa: "ˈpɔːtʃʊɡəl",
            example: "I'm from Portugal.",
          },
          {
            en: "Ireland",
            ua: "Ірландія",
            ipa: "ˈaɪələnd",
            example: "She's from Ireland.",
          },
          {
            en: "South Korea",
            ua: "Південна Корея",
            ipa: "ˌsaʊθ kəˈriːə",
            example: "He's from South Korea.",
          },
        ],
      },
      {
        label: "Nationalities",
        items: [
          {
            en: "Spanish",
            ua: "іспанець / іспанка",
            ipa: "ˈspænɪʃ",
            example: "She's Spanish.",
          },
          {
            en: "Canadian",
            ua: "канадець / канадка",
            ipa: "kəˈneɪdiən",
            example: "He's Canadian.",
          },
          {
            en: "Japanese",
            ua: "японець / японка",
            ipa: "ˌdʒæpəˈniːz",
            example: "She's Japanese.",
          },
          {
            en: "American",
            ua: "американець / американка",
            ipa: "əˈmerɪkən",
            example: "He's American.",
          },
          {
            en: "Polish",
            ua: "поляк / полька",
            ipa: "ˈpəʊlɪʃ",
            example: "She's Polish.",
          },
          {
            en: "Argentinian",
            ua: "аргентинець / аргентинка",
            ipa: "ˌɑːdʒənˈtɪniən",
            example: "He's Argentinian.",
          },
          {
            en: "Thai",
            ua: "таєць / тайка",
            ipa: "taɪ",
            example: "She's Thai.",
          },
          {
            en: "British",
            ua: "британець / британка",
            ipa: "ˈbrɪtɪʃ",
            example: "I'm British.",
          },
          {
            en: "English",
            ua: "англієць / англійка",
            ipa: "ˈɪŋɡlɪʃ",
            example: "She's English. (also: British)",
          },
          {
            en: "Turkish",
            ua: "турок / туркеня",
            ipa: "ˈtɜːkɪʃ",
            example: "He's Turkish.",
          },
          {
            en: "Mexican",
            ua: "мексиканець / мексиканка",
            ipa: "ˈmeksɪkən",
            example: "She's Mexican.",
          },
          {
            en: "Brazilian",
            ua: "бразилець / бразилійка",
            ipa: "brəˈzɪliən",
            example: "He's Brazilian.",
          },
          {
            en: "Italian",
            ua: "італієць / італійка",
            ipa: "ɪˈtæliən",
            example: "She's Italian.",
          },
          {
            en: "Ukrainian",
            ua: "українець / українка",
            ipa: "juˈkreɪniən",
            example: "I'm Ukrainian.",
          },
          {
            en: "Crimean",
            ua: "кримчанин / кримчанка",
            ipa: "kraɪˈmiːən",
            example: "I'm Crimean.",
          },
          {
            en: "German",
            ua: "німець / німкеня",
            ipa: "ˈdʒɜːmən",
            example: "He's German.",
          },
          {
            en: "French",
            ua: "француз / француженка",
            ipa: "frentʃ",
            example: "She's French.",
          },
          {
            en: "Chinese",
            ua: "китаєць / китаянка",
            ipa: "ˌtʃaɪˈniːz",
            example: "They're Chinese.",
          },
          {
            en: "Indian",
            ua: "індієць / індійка",
            ipa: "ˈɪndiən",
            example: "I'm Indian.",
          },
          {
            en: "Australian",
            ua: "австралієць / австралійка",
            ipa: "ɒˈstreɪliən",
            example: "She's Australian.",
          },
          {
            en: "Egyptian",
            ua: "єгиптянин / єгиптянка",
            ipa: "ɪˈdʒɪpʃən",
            example: "He's Egyptian.",
          },
          {
            en: "Greek",
            ua: "грек / грекиня",
            ipa: "ɡriːk",
            example: "They're Greek.",
          },
          {
            en: "Portuguese",
            ua: "португалець / португалка",
            ipa: "ˌpɔːtʃʊˈɡiːz",
            example: "I'm Portuguese.",
          },
          {
            en: "Irish",
            ua: "ірландець / ірландка",
            ipa: "ˈaɪrɪʃ",
            example: "She's Irish.",
          },
          {
            en: "Korean",
            ua: "кореєць / кореянка",
            ipa: "kəˈriːən",
            example: "He's Korean.",
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
            en: "wake up",
            ua: "прокидатися",
            ipa: "weɪk ʌp",
            example: "I wake up at 7.",
          },
          {
            en: "get up",
            ua: "вставати",
            ipa: "ɡet ʌp",
            example: "I get up at 7.30.",
          },
          {
            en: "have lunch",
            ua: "обідати",
            ipa: "hæv lʌntʃ",
            example: "I have lunch at 1.",
          },
          {
            en: "have dinner",
            ua: "вечеряти",
            ipa: "hæv ˈdɪnə",
            example: "We have dinner at 7.",
          },
          {
            en: "few",
            ua: "мало (злічувані)",
            ipa: "fjuː",
            example: "I have few friends here.",
          },
          {
            en: "clients",
            ua: "клієнти",
            ipa: "ˈklaɪənts",
            example: "We have many clients.",
          },
          {
            en: "yesterday",
            ua: "вчора",
            ipa: "ˈjestədeɪ",
            example: "I worked yesterday.",
          },
          {
            en: "wardrobe",
            ua: "шафа",
            ipa: "ˈwɔːdrəʊb",
            example: "My clothes are in the wardrobe.",
          },
          {
            en: "fridge",
            ua: "холодильник",
            ipa: "frɪdʒ",
            example: "The milk is in the fridge.",
          },
          {
            en: "pool",
            ua: "басейн",
            ipa: "puːl",
            example: "We go swimming in the pool.",
          },
          {
            en: "plates",
            ua: "тарілки",
            ipa: "pleɪts",
            example: "The plates are on the table.",
          },
          {
            en: "glasses",
            ua: "окуляри / склянки",
            ipa: "ˈɡlɑːsɪz",
            example: "My glasses are on the desk.",
          },
        ],
      },
    ],
  },

  {
    id: "adjectives",
    title: "Adjectives",
    badge: "L23–24",
    description:
      "Прикметники для опису людей і почуттів.\nShe is tall. / He is happy. / They are friendly.",
    grammar: [
      "be + adjective → She is tall. / I am tired.",
      "has got + noun → She has got long hair. / He has got glasses.",
      "opposites → tall ↔ short, happy ↔ sad, big ↔ small",
    ],
    groups: [
      {
        label: "Appearance",
        items: [
          {
            en: "tall",
            ua: "високий",
            ipa: "tɔːl",
            example: "She is tall.",
          },
          {
            en: "short",
            ua: "низький / короткий",
            ipa: "ʃɔːt",
            example: "He is short.",
          },
          {
            en: "thin",
            ua: "худий",
            ipa: "θɪn",
            example: "He is thin.",
          },
          {
            en: "slim",
            ua: "стрункий",
            ipa: "slɪm",
            example: "She is slim.",
          },
          {
            en: "strong",
            ua: "сильний",
            ipa: "strɒŋ",
            example: "He is strong.",
          },
          {
            en: "young",
            ua: "молодий",
            ipa: "jʌŋ",
            example: "She is young.",
          },
          {
            en: "old",
            ua: "старий",
            ipa: "əʊld",
            example: "My grandfather is old.",
          },
          {
            en: "long",
            ua: "довгий",
            ipa: "lɒŋ",
            example: "She has got long hair.",
          },
          {
            en: "curly",
            ua: "кучерявий",
            ipa: "ˈkɜːli",
            example: "He has got curly hair.",
          },
          {
            en: "straight",
            ua: "прямий",
            ipa: "streɪt",
            example: "She has got straight hair.",
          },
          {
            en: "dark",
            ua: "темний",
            ipa: "dɑːk",
            example: "He has got dark hair.",
          },
          {
            en: "fair",
            ua: "світлий (волосся)",
            ipa: "feə",
            example: "She has got fair hair.",
          },
          {
            en: "blonde",
            ua: "білявий",
            ipa: "blɒnd",
            example: "She has got blonde hair.",
          },
          {
            en: "beautiful",
            ua: "красива",
            ipa: "ˈbjuːtɪfl",
            example: "She is beautiful.",
          },
          {
            en: "handsome",
            ua: "вродливий (про чоловіка)",
            ipa: "ˈhænsəm",
            example: "He is handsome.",
          },
        ],
      },
      {
        label: "Mood / feelings",
        items: [
          {
            en: "happy",
            ua: "щасливий",
            ipa: "ˈhæpi",
            example: "I am happy today.",
          },
          {
            en: "sad",
            ua: "сумний",
            ipa: "sæd",
            example: "She is sad.",
          },
          {
            en: "tired",
            ua: "втомлений",
            ipa: "ˈtaɪəd",
            example: "I am tired.",
          },
          {
            en: "angry",
            ua: "злий",
            ipa: "ˈæŋɡri",
            example: "He is angry.",
          },
          {
            en: "scared",
            ua: "наляканий",
            ipa: "skeəd",
            example: "The child is scared.",
          },
          {
            en: "nervous",
            ua: "знервований",
            ipa: "ˈnɜːvəs",
            example: "I am nervous before the test.",
          },
          {
            en: "shy",
            ua: "сором'язливий",
            ipa: "ʃaɪ",
            example: "He is shy.",
          },
          {
            en: "excited",
            ua: "схвильований (радісно)",
            ipa: "ɪkˈsaɪtɪd",
            example: "We are excited!",
          },
          {
            en: "bored",
            ua: "нудьгує",
            ipa: "bɔːd",
            example: "She is bored.",
          },
          {
            en: "hungry",
            ua: "голодний",
            ipa: "ˈhʌŋɡri",
            example: "I am hungry.",
          },
          {
            en: "thirsty",
            ua: "спраглий",
            ipa: "ˈθɜːsti",
            example: "He is thirsty.",
          },
          {
            en: "cold",
            ua: "замерзлий / холодний",
            ipa: "kəʊld",
            example: "I am cold.",
          },
          {
            en: "hot",
            ua: "спекотно / гарячий",
            ipa: "hɒt",
            example: "It is hot today.",
          },
          {
            en: "fine",
            ua: "добре, нормально",
            ipa: "faɪn",
            example: "I'm fine, thank you.",
          },
        ],
      },
      {
        label: "Useful",
        items: [
          {
            en: "friendly",
            ua: "дружній",
            ipa: "ˈfrendli",
            example: "She is friendly.",
          },
          {
            en: "funny",
            ua: "смішний",
            ipa: "ˈfʌni",
            example: "He is funny.",
          },
          {
            en: "quiet",
            ua: "тихий",
            ipa: "ˈkwaɪət",
            example: "The room is quiet.",
          },
          {
            en: "noisy",
            ua: "шумний",
            ipa: "ˈnɔɪzi",
            example: "The street is noisy.",
          },
          {
            en: "kind",
            ua: "добрий",
            ipa: "kaɪnd",
            example: "My teacher is kind.",
          },
          {
            en: "nice",
            ua: "приємний",
            ipa: "naɪs",
            example: "Nice to meet you!",
          },
          {
            en: "big",
            ua: "великий",
            ipa: "bɪɡ",
            example: "It's a big city.",
          },
          {
            en: "small",
            ua: "маленький",
            ipa: "smɔːl",
            example: "It's a small room.",
          },
          {
            en: "fast",
            ua: "швидкий",
            ipa: "fɑːst",
            example: "He is fast.",
          },
          {
            en: "slow",
            ua: "повільний",
            ipa: "sləʊ",
            example: "The bus is slow.",
          },
          {
            en: "clean",
            ua: "чистий",
            ipa: "kliːn",
            example: "The kitchen is clean.",
          },
          {
            en: "dirty",
            ua: "брудний",
            ipa: "ˈdɜːti",
            example: "My shoes are dirty.",
          },
          {
            en: "easy",
            ua: "легкий (про завдання)",
            ipa: "ˈiːzi",
            example: "This exercise is easy.",
          },
          {
            en: "difficult",
            ua: "складний",
            ipa: "ˈdɪfɪkəlt",
            example: "English is sometimes difficult.",
          },
          {
            en: "important",
            ua: "важливий",
            ipa: "ɪmˈpɔːtnt",
            example: "Family is important.",
          },
          {
            en: "interesting",
            ua: "цікавий",
            ipa: "ˈɪntrəstɪŋ",
            example: "This book is interesting.",
          },
          {
            en: "boring",
            ua: "нудний",
            ipa: "ˈbɔːrɪŋ",
            example: "The film is boring.",
          },
          {
            en: "busy",
            ua: "зайнятий",
            ipa: "ˈbɪzi",
            example: "I am busy today.",
          },
          {
            en: "new",
            ua: "новий",
            ipa: "njuː",
            example: "This is a new bank.",
          },
          {
            en: "cheap",
            ua: "дешевий",
            ipa: "tʃiːp",
            example: "The cafés are cheap.",
          },
          {
            en: "expensive",
            ua: "дорогий",
            ipa: "ɪkˈspensɪv",
            example: "This hotel is expensive.",
          },
          {
            en: "bad",
            ua: "поганий",
            ipa: "bæd",
            example: "This restaurant isn't good. It's bad.",
          },
        ],
      },
      {
        label: "Opposites · L53",
        items: [
          {
            en: "high",
            ua: "високий (рівень, ціна, гора)",
            ipa: "haɪ",
            example: "The mountain is high.",
          },
          {
            en: "low",
            ua: "низький (рівень, ціна)",
            ipa: "ləʊ",
            example: "The price is low.",
          },
          {
            en: "light",
            ua: "світлий",
            ipa: "laɪt",
            example: "The room is light. It isn't dark.",
          },
        ],
      },
    ],
  },

  {
    id: "everyday-things",
    title: "Everyday things",
    badge: "L28",
    description:
      "Предмети щодня, home office та this / that / these / those.",
    grammar: [
      "What's that? It's a pen. / What are those? They're keys.",
      "this / these = near · that / those = far",
      "Is this your cup? Yes, it is. / No, it isn't.",
    ],
    groups: [
      {
        label: "Objects (a–l)",
        items: [
          {
            en: "book",
            ua: "книга",
            ipa: "bʊk",
            example: "That's my book.",
          },
          {
            en: "phone",
            ua: "телефон",
            ipa: "fəʊn",
            example: "Is this your phone?",
          },
          {
            en: "desk",
            ua: "письмовий стіл",
            ipa: "desk",
            example: "This is your desk.",
          },
          {
            en: "key",
            ua: "ключ",
            ipa: "kiː",
            example: "Where are my keys?",
          },
          {
            en: "table",
            ua: "стіл",
            ipa: "ˈteɪbl",
            example: "The book is on the table.",
          },
          {
            en: "clock",
            ua: "годинник",
            ipa: "klɒk",
            example: "Look at the clock.",
          },
          {
            en: "photo",
            ua: "фото",
            ipa: "ˈfəʊtəʊ",
            example: "That's a photo of my family.",
          },
          {
            en: "computer",
            ua: "комп'ютер",
            ipa: "kəmˈpjuːtə",
            example: "This is your computer.",
          },
          {
            en: "box",
            ua: "коробка",
            ipa: "bɒks",
            example: "What's in this box?",
          },
          {
            en: "chair",
            ua: "стілець",
            ipa: "tʃeə",
            example: "Please sit on the chair.",
          },
          {
            en: "cup",
            ua: "чашка",
            ipa: "kʌp",
            example: "Is that your cup?",
          },
          {
            en: "pen",
            ua: "ручка",
            ipa: "pen",
            example: "Can I use your pen?",
          },
        ],
      },
      {
        label: "Home office",
        items: [
          {
            en: "window",
            ua: "вікно",
            ipa: "ˈwɪndəʊ",
            example: "Open the window, please.",
          },
          {
            en: "plant",
            ua: "рослина",
            ipa: "plɑːnt",
            example: "There's a plant on the desk.",
          },
          {
            en: "printer",
            ua: "принтер",
            ipa: "ˈprɪntə",
            example: "The printer is next to the computer.",
          },
          {
            en: "wall clock",
            ua: "настінний годинник",
            ipa: "wɔːl klɒk",
            example: "The wall clock is above the map.",
          },
          {
            en: "calendar",
            ua: "календар",
            ipa: "ˈkælɪndə",
            example: "Look at the calendar.",
          },
          {
            en: "map",
            ua: "карта",
            ipa: "mæp",
            example: "There's a map on the wall.",
          },
          {
            en: "monitor",
            ua: "монітор",
            ipa: "ˈmɒnɪtə",
            example: "The monitor is on the desk.",
          },
          {
            en: "drawers",
            ua: "шухляди",
            ipa: "ˈdrɔːəz",
            example: "The pens are in the drawers.",
          },
          {
            en: "light",
            ua: "лампа / світло",
            ipa: "laɪt",
            example: "It's a light.",
          },
          {
            en: "bench",
            ua: "лавка",
            ipa: "bentʃ",
            example: "There's a bench in the park.",
          },
          {
            en: "coffee",
            ua: "кава",
            ipa: "ˈkɒfi",
            example: "Do you like coffee?",
          },
          {
            en: "password",
            ua: "пароль",
            ipa: "ˈpɑːswɜːd",
            example: "This is the password.",
          },
        ],
      },
      {
        label: "this / that / these / those",
        items: [
          {
            en: "this",
            ua: "це (близько, 1)",
            ipa: "ðɪs",
            example: "What's this? It's a key.",
          },
          {
            en: "that",
            ua: "те (далеко, 1)",
            ipa: "ðæt",
            example: "What's that? It's a clock.",
          },
          {
            en: "these",
            ua: "ці (близько, багато)",
            ipa: "ðiːz",
            example: "What are these? They're pens.",
          },
          {
            en: "those",
            ua: "ті (далеко, багато)",
            ipa: "ðəʊz",
            example: "What are those? They're books.",
          },
        ],
      },
      {
        label: "Daily verbs",
        items: [
          {
            en: "have breakfast",
            ua: "снідати",
            ipa: "hæv ˈbrekfəst",
            example: "I usually have breakfast at home.",
          },
          {
            en: "go / walk",
            ua: "йти / гуляти",
            ipa: "ɡəʊ / wɔːk",
            example: "I walk to work.",
          },
          {
            en: "play",
            ua: "грати",
            ipa: "pleɪ",
            example: "I play football.",
          },
          {
            en: "write",
            ua: "писати",
            ipa: "raɪt",
            example: "I write emails at work.",
          },
          {
            en: "read",
            ua: "читати",
            ipa: "riːd",
            example: "I read books in the evening.",
          },
          {
            en: "sleep",
            ua: "спати",
            ipa: "sliːp",
            example: "I sleep at 11 o'clock.",
          },
          {
            en: "work",
            ua: "працювати",
            ipa: "wɜːk",
            example: "I work in an office.",
          },
          {
            en: "cook",
            ua: "готувати",
            ipa: "kʊk",
            example: "I cook dinner at home.",
          },
          {
            en: "draw",
            ua: "малювати",
            ipa: "drɔː",
            example: "My daughter likes to draw.",
          },
          {
            en: "ride / go by bike",
            ua: "їхати на велосипеді",
            ipa: "raɪd / ɡəʊ baɪ baɪk",
            example: "I go by bike to school.",
          },
        ],
      },
    ],
  },

  {
    id: "question-words",
    title: "Question words",
    badge: "L29",
    description: "Питальні слова (Who…Whom) — значення та приклади.",
    grammar: [
      "Question word + be + subject → Where is she from?",
      "What's her name? / How old is he? / What's his job?",
    ],
    groups: [
      {
        label: "WH words",
        items: [
          {
            en: "who",
            ua: "хто (людина)",
            ipa: "huː",
            example: "Who is coming to the party?",
          },
          {
            en: "what",
            ua: "що / який (інформація)",
            ipa: "wɒt",
            example: "What do you want to eat?",
          },
          {
            en: "where",
            ua: "де (місце)",
            ipa: "weə",
            example: "Where do you live?",
          },
          {
            en: "when",
            ua: "коли (час)",
            ipa: "wen",
            example: "When does the movie start?",
          },
          {
            en: "why",
            ua: "чому (причина)",
            ipa: "waɪ",
            example: "Why are you laughing?",
          },
          {
            en: "how",
            ua: "як (спосіб / процес)",
            ipa: "haʊ",
            example: "How can I get to the station?",
          },
          {
            en: "which",
            ua: "який (вибір)",
            ipa: "wɪtʃ",
            example: "Which dress should I wear?",
          },
          {
            en: "whose",
            ua: "чий (власність)",
            ipa: "huːz",
            example: "Whose car is parked outside?",
          },
          {
            en: "whom",
            ua: "кого (об'єкт дії)",
            ipa: "huːm",
            example: "Whom should I call for help?",
          },
        ],
      },
      {
        label: "Useful with be",
        items: [
          {
            en: "What's your name?",
            ua: "Як тебе звати?",
            ipa: "wɒts jɔː neɪm",
            example: "What's your name? My name is Anna.",
          },
          {
            en: "How old are you?",
            ua: "Скільки тобі років?",
            ipa: "haʊ əʊld ɑː juː",
            example: "How old are you? I'm 25.",
          },
          {
            en: "Where are you from?",
            ua: "Звідки ти?",
            ipa: "weər ɑː juː frɒm",
            example: "Where are you from? I'm from Ukraine.",
          },
          {
            en: "What's his / her job?",
            ua: "Яка в нього / неї робота?",
            ipa: "wɒts hɪz / hɜː dʒɒb",
            example: "What's her job? She's a teacher.",
          },
        ],
      },
    ],
  },

  {
    id: "in-a-shop",
    title: "In a shop",
    badge: "L29",
    description: "Корисні фрази та слова для діалогу в магазині.",
    grammar: [
      "How much is this / that…? → It's £…",
      "How much are these / those…? → They're £… / It's £… for four.",
      "Cash or card?",
    ],
    groups: [
      {
        label: "Customer",
        items: [
          {
            en: "Excuse me.",
            ua: "Перепрошую.",
            ipa: "ɪkˈskjuːz miː",
            example: "Excuse me. How much is this book?",
          },
          {
            en: "How much is this / that?",
            ua: "Скільки це коштує? (однина)",
            ipa: "haʊ mʌtʃ ɪz ðɪs / ðæt",
            example: "How much is that clock?",
          },
          {
            en: "How much are these / those?",
            ua: "Скільки це коштує? (множина)",
            ipa: "haʊ mʌtʃ ɑː ðiːz / ðəʊz",
            example: "How much are those cups?",
          },
          {
            en: "Can I pay by card?",
            ua: "Можна карткою?",
            ipa: "kæn aɪ peɪ baɪ kɑːd",
            example: "Can I pay by card?",
          },
          {
            en: "Here you are.",
            ua: "Ось, будь ласка.",
            ipa: "hɪə juː ɑː",
            example: "Cash, please. Here you are.",
          },
          {
            en: "Here's my card.",
            ua: "Ось моя картка.",
            ipa: "hɪəz maɪ kɑːd",
            example: "Here's my card.",
          },
        ],
      },
      {
        label: "Shop assistant",
        items: [
          {
            en: "It's £…",
            ua: "Це коштує £…",
            ipa: "ɪts",
            example: "It's £15.99.",
          },
          {
            en: "That's £…, please.",
            ua: "Разом £…, будь ласка.",
            ipa: "ðæts",
            example: "That's £27.99, please.",
          },
          {
            en: "Cash or card?",
            ua: "Готівка чи картка?",
            ipa: "kæʃ ɔː kɑːd",
            example: "Cash or card?",
          },
          {
            en: "Here's your change.",
            ua: "Ось ваша решта.",
            ipa: "hɪəz jɔː tʃeɪndʒ",
            example: "Thank you. Here's your change.",
          },
          {
            en: "Here's your card.",
            ua: "Ось ваша картка.",
            ipa: "hɪəz jɔː kɑːd",
            example: "Here's your card.",
          },
        ],
      },
      {
        label: "Shop words",
        items: [
          {
            en: "cash",
            ua: "готівка",
            ipa: "kæʃ",
            example: "Cash, please.",
          },
          {
            en: "card",
            ua: "картка",
            ipa: "kɑːd",
            example: "Can I pay by card?",
          },
          {
            en: "change",
            ua: "решта",
            ipa: "tʃeɪndʒ",
            example: "Here's your change.",
          },
          {
            en: "laptop",
            ua: "ноутбук",
            ipa: "ˈlæptɒp",
            example: "How much is this laptop?",
          },
          {
            en: "picture",
            ua: "картина / малюнок",
            ipa: "ˈpɪktʃə",
            example: "I like that picture.",
          },
          {
            en: "shelf",
            ua: "полиця",
            ipa: "ʃelf",
            example: "The books are on the shelf.",
          },
          {
            en: "counter",
            ua: "прилавок",
            ipa: "ˈkaʊntə",
            example: "The pens are on the counter.",
          },
        ],
      },
    ],
  },

  {
    id: "my-town",
    title: "My town & home",
    badge: "L31",
    description:
      "Unit 3: місця в місті, There is / There are, кімнати й речі вдома, прикметники-антоніми.",
    grammar: [
      "There's / There is + singular → There's a park.",
      "There are + plural → There are three cafés.",
      "There isn't a… / There aren't any…",
      "Is there a/an…? → Yes, there is. / No, there isn't.",
      "Are there any…? → Yes, there are. / No, there aren't.",
      "be + adjective → It's busy. / The hotel is expensive.",
      "adjective + noun → a small park / a new bank",
    ],
    groups: [
      {
        label: "Places in town",
        items: [
          {
            en: "train station",
            ua: "вокзал / станція",
            ipa: "treɪn ˈsteɪʃ(ə)n",
            example: "There's a train station in my town.",
          },
          {
            en: "hotel",
            ua: "готель",
            ipa: "həʊˈtel",
            example: "There are three hotels.",
          },
          {
            en: "café",
            ua: "кафе",
            ipa: "ˈkæfeɪ",
            example: "There's a good café near my house.",
          },
          {
            en: "bank",
            ua: "банк",
            ipa: "bæŋk",
            example: "There isn't a bank in this street.",
          },
          {
            en: "restaurant",
            ua: "ресторан",
            ipa: "ˈrestrɒnt",
            example: "There are two restaurants.",
          },
          {
            en: "supermarket",
            ua: "супермаркет",
            ipa: "ˈsuːpəmɑːkɪt",
            example: "Is there a supermarket near your home?",
          },
          {
            en: "cinema",
            ua: "кінотеатр",
            ipa: "ˈsɪnəmə",
            example: "There aren't any cinemas.",
          },
          {
            en: "park",
            ua: "парк",
            ipa: "pɑːk",
            example: "There's a park near my flat.",
          },
          {
            en: "market",
            ua: "ринок",
            ipa: "ˈmɑːkɪt",
            example: "There's a market on Saturdays.",
          },
          {
            en: "bookshop",
            ua: "книгарня",
            ipa: "ˈbʊkʃɒp",
            example: "There are two bookshops.",
          },
          {
            en: "house",
            ua: "будинок",
            ipa: "haʊs",
            example: "I live in a house.",
          },
          {
            en: "flat",
            ua: "квартира",
            ipa: "flæt",
            example: "We live in a flat.",
          },
        ],
      },
      {
        label: "There is / There are",
        items: [
          {
            en: "There's a…",
            ua: "Є (один)…",
            ipa: "ðeəz ə",
            example: "There's a park.",
          },
          {
            en: "There are…",
            ua: "Є (багато)…",
            ipa: "ðeər ɑː",
            example: "There are three cafés.",
          },
          {
            en: "There isn't a…",
            ua: "Немає (одного)…",
            ipa: "ðeər ˈɪznt ə",
            example: "There isn't a bank.",
          },
          {
            en: "There aren't any…",
            ua: "Немає (жодних)…",
            ipa: "ðeər ˈɑːnt ˈeni",
            example: "There aren't any hotels.",
          },
          {
            en: "Is there a…?",
            ua: "Чи є (один)…?",
            ipa: "ɪz ðeər ə",
            example: "Is there a shower?",
          },
          {
            en: "Are there any…?",
            ua: "Чи є (якісь)…?",
            ipa: "ɑː ðeər ˈeni",
            example: "Are there any TVs?",
          },
          {
            en: "How many … are there?",
            ua: "Скільки … є?",
            ipa: "haʊ ˈmeni ɑː ðeə",
            example: "How many rooms are there?",
          },
          {
            en: "Yes, there is. / No, there isn't.",
            ua: "Так, є. / Ні, немає.",
            ipa: "jes ðeər ɪz / nəʊ ðeər ˈɪznt",
            example: "Is there wifi? Yes, there is.",
          },
          {
            en: "Yes, there are. / No, there aren't.",
            ua: "Так, є. / Ні, немає. (мн.)",
            ipa: "jes ðeər ɑː / nəʊ ðeər ˈɑːnt",
            example: "Are there any shops? No, there aren't.",
          },
        ],
      },
      {
        label: "Rooms & home",
        items: [
          {
            en: "bathroom",
            ua: "ванна кімната",
            ipa: "ˈbɑːθruːm",
            example: "There's a bathroom.",
          },
          {
            en: "bedroom",
            ua: "спальня",
            ipa: "ˈbedruːm",
            example: "How many bedrooms are there?",
          },
          {
            en: "kitchen",
            ua: "кухня",
            ipa: "ˈkɪtʃɪn",
            example: "Is there a kitchen?",
          },
          {
            en: "living room",
            ua: "вітальня",
            ipa: "ˈlɪvɪŋ ruːm",
            example: "There's a TV in the living room.",
          },
          {
            en: "bed",
            ua: "ліжко",
            ipa: "bed",
            example: "There are two beds.",
          },
          {
            en: "lift",
            ua: "ліфт",
            ipa: "lɪft",
            example: "Is there a lift?",
          },
          {
            en: "oven",
            ua: "духовка / піч",
            ipa: "ˈʌv(ə)n",
            example: "There isn't an oven.",
          },
          {
            en: "shower",
            ua: "душ",
            ipa: "ˈʃaʊə",
            example: "Is there a shower?",
          },
          {
            en: "toilet",
            ua: "туалет",
            ipa: "ˈtɔɪlət",
            example: "There's a toilet in the bathroom.",
          },
          {
            en: "TV",
            ua: "телевізор",
            ipa: "ˌtiː ˈviː",
            example: "There's a TV in the living room.",
          },
          {
            en: "wifi",
            ua: "вайфай",
            ipa: "ˈwaɪfaɪ",
            example: "Is there wifi?",
          },
        ],
      },
      {
        label: "Adjectives (opposites)",
        items: [
          {
            en: "busy",
            ua: "жвавий / людний",
            ipa: "ˈbɪzi",
            example: "This town is busy.",
          },
          {
            en: "quiet",
            ua: "тихий",
            ipa: "ˈkwaɪət",
            example: "This is a quiet town.",
          },
          {
            en: "big",
            ua: "великий",
            ipa: "bɪɡ",
            example: "There's a big supermarket.",
          },
          {
            en: "small",
            ua: "маленький",
            ipa: "smɔːl",
            example: "There is a small park.",
          },
          {
            en: "old",
            ua: "старий",
            ipa: "əʊld",
            example: "There is an old cinema.",
          },
          {
            en: "new",
            ua: "новий",
            ipa: "njuː",
            example: "Is this a new bank?",
          },
          {
            en: "cheap",
            ua: "дешевий",
            ipa: "tʃiːp",
            example: "There are cheap bookshops.",
          },
          {
            en: "expensive",
            ua: "дорогий",
            ipa: "ɪkˈspensɪv",
            example: "This restaurant is expensive.",
          },
          {
            en: "good",
            ua: "хороший",
            ipa: "ɡʊd",
            example: "There's a good restaurant.",
          },
          {
            en: "bad",
            ua: "поганий",
            ipa: "bæd",
            example: "This supermarket isn't good. It's bad.",
          },
        ],
      },
    ],
  },

  {
    id: "directions",
    title: "Directions",
    badge: "L35",
    description:
      "Unit 3D: спитати дорогу і дати вказівки — go straight on, turn left/right, go past, next to.",
    grammar: [
      "Excuse me. Where's the…, please?",
      "Is there a… near here?",
      "Go straight on. / Turn left. / Turn right.",
      "Go past the bank. / It's next to a restaurant.",
      "It's on the right. / It's on Park Street.",
    ],
    groups: [
      {
        label: "Ask the way",
        items: [
          {
            en: "Excuse me.",
            ua: "Перепрошую.",
            ipa: "ɪkˈskjuːz miː",
            example: "Excuse me. Where's the cinema, please?",
          },
          {
            en: "Where's the…, please?",
            ua: "Де …, будь ласка?",
            ipa: "weəz ðə pliːz",
            example: "Where's the train station, please?",
          },
          {
            en: "Is there a… near here?",
            ua: "Чи є … поблизу?",
            ipa: "ɪz ðeər ə nɪə hɪə",
            example: "Is there a supermarket near here?",
          },
        ],
      },
      {
        label: "Give directions",
        items: [
          {
            en: "Go straight on.",
            ua: "Іди прямо.",
            ipa: "ɡəʊ streɪt ɒn",
            example: "Go straight on, then turn left.",
          },
          {
            en: "Turn left.",
            ua: "Поверни ліворуч.",
            ipa: "tɜːn left",
            example: "Turn left at the bookshop.",
          },
          {
            en: "Turn right.",
            ua: "Поверни праворуч.",
            ipa: "tɜːn raɪt",
            example: "Turn right after the big house.",
          },
          {
            en: "Go past…",
            ua: "Пройди повз…",
            ipa: "ɡəʊ pɑːst",
            example: "Go past the hotel.",
          },
          {
            en: "Go down…",
            ua: "Іди вздовж…",
            ipa: "ɡəʊ daʊn",
            example: "Go down Station Road.",
          },
          {
            en: "next to",
            ua: "поряд із",
            ipa: "neks tə",
            example: "It's next to a bank.",
          },
          {
            en: "on the right",
            ua: "праворуч",
            ipa: "ɒn ðə raɪt",
            example: "The supermarket is on the right.",
          },
          {
            en: "on the left",
            ua: "ліворуч",
            ipa: "ɒn ðə left",
            example: "The café is on the left.",
          },
        ],
      },
    ],
  },

  {
    id: "present-continuous",
    title: "Present continuous",
    badge: "L37",
    description:
      "now vs every day: I work every day. / I am working now. Шість дієслів + маркери часу.",
    grammar: [
      "Present Simple (звичай): I work every day.",
      "Present Continuous (зараз): I am working now.",
      "am / is / are + verb-ing",
      "usually / often — перед дієсловом; every day — в кінці; now / right now / at the moment — Present Continuous",
    ],
    groups: [
      {
        label: "Six verbs",
        items: [
          {
            en: "work → working",
            ua: "працювати → працюю (зараз)",
            ipa: "wɜːk → ˈwɜːkɪŋ",
            example: "I work every day. I am working now.",
          },
          {
            en: "eat → eating",
            ua: "їсти → їм (зараз)",
            ipa: "iːt → ˈiːtɪŋ",
            example: "I usually eat at home. I am eating now.",
          },
          {
            en: "drink → drinking",
            ua: "пити → п'ю (зараз)",
            ipa: "drɪŋk → ˈdrɪŋkɪŋ",
            example: "I never drink coffee. I am drinking tea now.",
          },
          {
            en: "read → reading",
            ua: "читати → читаю (зараз)",
            ipa: "riːd → ˈriːdɪŋ",
            example: "I often read. I am reading now.",
          },
          {
            en: "talk → talking",
            ua: "розмовляти → розмовляю (зараз)",
            ipa: "tɔːk → ˈtɔːkɪŋ",
            example: "I sometimes talk. I am talking now.",
          },
          {
            en: "sit → sitting",
            ua: "сидіти → сиджу (зараз)",
            ipa: "sɪt → ˈsɪtɪŋ",
            example: "I always sit here. I am sitting now.",
          },
        ],
      },
      {
        label: "Time markers",
        items: [
          {
            en: "every day",
            ua: "щодня",
            ipa: "ˈevri deɪ",
            example: "I work every day.",
          },
          {
            en: "usually",
            ua: "зазвичай",
            ipa: "ˈjuːʒuəli",
            example: "I usually eat.",
          },
          {
            en: "often",
            ua: "часто",
            ipa: "ˈɒf(ə)n",
            example: "I often read.",
          },
          {
            en: "now / right now",
            ua: "зараз / просто зараз",
            ipa: "naʊ / raɪt naʊ",
            example: "I am working now.",
          },
          {
            en: "at the moment",
            ua: "у цей момент",
            ipa: "ət ðə ˈməʊmənt",
            example: "I am sitting at the moment.",
          },
        ],
      },
    ],
  },

  {
    id: "have-got-people",
    title: "Have got · people",
    badge: "L38",
    description:
      "Unit 4A: опис людини — have/has got, волосся, очі, борода, вік (in his/her 20s).",
    grammar: [
      "I / you / we / they have got… → I've got brown hair.",
      "he / she / it has got… → He's got blue eyes.",
      "haven't got / hasn't got → I haven't got any children.",
      "in his/her 20s / 30s → He's in his 30s.",
    ],
    groups: [
      {
        label: "have / has got",
        items: [
          {
            en: "have got",
            ua: "мати (I/you/we/they)",
            ipa: "həv ɡɒt",
            example: "I have got blonde hair.",
          },
          {
            en: "has got",
            ua: "мати (he/she/it)",
            ipa: "həz ɡɒt",
            example: "She has got brown eyes.",
          },
          {
            en: "I've got…",
            ua: "У мене є…",
            ipa: "aɪv ɡɒt",
            example: "I've got blue eyes.",
          },
          {
            en: "He's / She's got…",
            ua: "У нього / неї є…",
            ipa: "hiːz / ʃiːz ɡɒt",
            example: "He's got a beard.",
          },
          {
            en: "haven't got",
            ua: "не мати (I/you/we/they)",
            ipa: "ˈhævnt ɡɒt",
            example: "I haven't got any children.",
          },
          {
            en: "hasn't got",
            ua: "не мати (he/she/it)",
            ipa: "ˈhæznt ɡɒt",
            example: "She hasn't got a dog.",
          },
        ],
      },
      {
        label: "Appearance",
        items: [
          {
            en: "blonde hair",
            ua: "біляве волосся",
            ipa: "blɒnd heə",
            example: "I've got blonde hair.",
          },
          {
            en: "brown hair",
            ua: "каштанове волосся",
            ipa: "braʊn heə",
            example: "He's got brown hair.",
          },
          {
            en: "red hair",
            ua: "руде волосся",
            ipa: "red heə",
            example: "He's got red hair.",
          },
          {
            en: "grey hair",
            ua: "сиве волосся",
            ipa: "ɡreɪ heə",
            example: "He's got grey hair and a beard.",
          },
          {
            en: "short / long hair",
            ua: "коротке / довге волосся",
            ipa: "ʃɔːt / lɒŋ heə",
            example: "She's got long hair.",
          },
          {
            en: "blue eyes",
            ua: "блакитні очі",
            ipa: "bluː aɪz",
            example: "I've got blue eyes.",
          },
          {
            en: "brown eyes",
            ua: "карі очі",
            ipa: "braʊn aɪz",
            example: "He's got brown eyes.",
          },
          {
            en: "green eyes",
            ua: "зелені очі",
            ipa: "ɡriːn aɪz",
            example: "She's got green eyes.",
          },
          {
            en: "a beard",
            ua: "борода",
            ipa: "ə bɪəd",
            example: "He's got a beard.",
          },
          {
            en: "in his / her 20s",
            ua: "йому / їй за 20",
            ipa: "ɪn hɪz / hɜː ˈtwentiz",
            example: "She's in her 20s.",
          },
          {
            en: "in his / her 30s",
            ua: "йому / їй за 30",
            ipa: "ɪn hɪz / hɜː ˈθɜːtiz",
            example: "Mehmet is in his 30s.",
          },
        ],
      },
    ],
  },

  {
    id: "travel-pack",
    title: "Travel · pack a bag",
    badge: "L39",
    description:
      "Unit 4B: речі в дорогу + Have you got…? / Has she got…?",
    grammar: [
      "Have you got your passport? → Yes, I have. / No, I haven't.",
      "Has she got the tickets? → Yes, she has. / No, she hasn't.",
    ],
    groups: [
      {
        label: "Travel objects",
        items: [
          {
            en: "tickets",
            ua: "квитки",
            ipa: "ˈtɪkɪts",
            example: "Have you got your tickets?",
          },
          {
            en: "passport",
            ua: "паспорт",
            ipa: "ˈpɑːspɔːt",
            example: "I've got my passport.",
          },
          {
            en: "credit card",
            ua: "кредитна картка",
            ipa: "ˈkredɪt kɑːd",
            example: "Have you got a credit card?",
          },
          {
            en: "coat",
            ua: "пальто / куртка",
            ipa: "kəʊt",
            example: "Take a coat!",
          },
          {
            en: "food",
            ua: "їжа",
            ipa: "fuːd",
            example: "Have you got food in your bag?",
          },
          {
            en: "bottle of water",
            ua: "пляшка води",
            ipa: "ˈbɒtl əv ˈwɔːtə",
            example: "I've got a bottle of water.",
          },
          {
            en: "camera",
            ua: "камера / фотоапарат",
            ipa: "ˈkæmərə",
            example: "Has Fifi got a camera?",
          },
          {
            en: "sunglasses",
            ua: "сонцезахисні окуляри",
            ipa: "ˈsʌnɡlɑːsɪz",
            example: "Have you got sunglasses?",
          },
          {
            en: "phone",
            ua: "телефон",
            ipa: "fəʊn",
            example: "I've got my phone.",
          },
          {
            en: "money",
            ua: "гроші",
            ipa: "ˈmʌni",
            example: "Yes, we've got money.",
          },
          {
            en: "bag",
            ua: "сумка / рюкзак",
            ipa: "bæɡ",
            example: "Have you got food in your bag?",
          },
          {
            en: "keys",
            ua: "ключі",
            ipa: "kiːz",
            example: "Have you got your keys?",
          },
        ],
      },
      {
        label: "Questions",
        items: [
          {
            en: "Have you got…?",
            ua: "У тебе є…?",
            ipa: "həv ju ɡɒt",
            example: "Have you got your passport?",
          },
          {
            en: "Has she / he got…?",
            ua: "У неї / нього є…?",
            ipa: "həz ʃi / hi ɡɒt",
            example: "Has Fifi got your tickets?",
          },
          {
            en: "Yes, I have. / No, I haven't.",
            ua: "Так, є. / Ні, немає.",
            ipa: "jes aɪ həv / nəʊ aɪ ˈhævnt",
            example: "Have you got a camera? No, I haven't.",
          },
          {
            en: "Yes, she has. / No, she hasn't.",
            ua: "Так, є. / Ні, немає. (she)",
            ipa: "jes ʃi həz / nəʊ ʃi ˈhæznt",
            example: "Has she got the tickets? Yes, she has.",
          },
        ],
      },
    ],
  },

  {
    id: "dos-donts",
    title: "Dos and don'ts",
    badge: "L40",
    description:
      "Unit 4C: імператив — Visit… / Don't go…, та дієслова try, go to, visit, take, drink, see, arrive.",
    grammar: [
      "Imperative (+): Visit The British Museum. / Take a coat!",
      "Imperative (−): Don't go to Oxford Street. / Don't take taxis.",
      "try + food · go to / visit + place · take + transport/photos/coat · drink + tea · see + a show · arrive",
    ],
    groups: [
      {
        label: "Key verbs",
        items: [
          {
            en: "try",
            ua: "спробувати",
            ipa: "traɪ",
            example: "Try Indian food.",
          },
          {
            en: "go to",
            ua: "піти / поїхати до",
            ipa: "ɡəʊ tə",
            example: "Go to Greenwich.",
          },
          {
            en: "visit",
            ua: "відвідати",
            ipa: "ˈvɪzɪt",
            example: "Visit The British Museum.",
          },
          {
            en: "take",
            ua: "брати / їхати (на транспорті)",
            ipa: "teɪk",
            example: "Take a train. / Take photos.",
          },
          {
            en: "drink",
            ua: "пити",
            ipa: "drɪŋk",
            example: "Drink English tea.",
          },
          {
            en: "see",
            ua: "дивитися / бачити",
            ipa: "siː",
            example: "See a show.",
          },
          {
            en: "arrive",
            ua: "прибувати",
            ipa: "əˈraɪv",
            example: "What time does the train arrive?",
          },
        ],
      },
      {
        label: "Useful phrases",
        items: [
          {
            en: "try Japanese food",
            ua: "спробувати японську їжу",
            ipa: "traɪ ˌdʒæpəˈniːz fuːd",
            example: "Try Japanese food in London.",
          },
          {
            en: "visit New York",
            ua: "відвідати Нью-Йорк",
            ipa: "ˈvɪzɪt njuː ˈjɔːk",
            example: "Visit New York next year.",
          },
          {
            en: "drink tea",
            ua: "пити чай",
            ipa: "drɪŋk tiː",
            example: "Drink English tea.",
          },
          {
            en: "see a show",
            ua: "подивитися шоу / виставу",
            ipa: "siː ə ʃəʊ",
            example: "See a show in London.",
          },
          {
            en: "take a train",
            ua: "їхати поїздом",
            ipa: "teɪk ə treɪn",
            example: "Don't take taxis — take a train.",
          },
          {
            en: "take photos",
            ua: "фотографувати",
            ipa: "teɪk ˈfəʊtəʊz",
            example: "Go to Greenwich and take photos.",
          },
          {
            en: "take a coat",
            ua: "взяти пальто",
            ipa: "teɪk ə kəʊt",
            example: "Take a coat!",
          },
        ],
      },
      {
        label: "Imperatives",
        items: [
          {
            en: "Visit…",
            ua: "Відвідай…",
            ipa: "ˈvɪzɪt",
            example: "Visit The British Museum.",
          },
          {
            en: "Don't go to…",
            ua: "Не ходи до…",
            ipa: "dəʊnt ɡəʊ tə",
            example: "Don't go to Oxford Street.",
          },
          {
            en: "Don't take…",
            ua: "Не бери / не їдь…",
            ipa: "dəʊnt teɪk",
            example: "Don't take taxis!",
          },
          {
            en: "dos and don'ts",
            ua: "що варто / не варто робити",
            ipa: "duːz ənd dəʊnts",
            example: "Have you got any dos and don'ts for London?",
          },
          {
            en: "work trip",
            ua: "робоча поїздка",
            ipa: "wɜːk trɪp",
            example: "I have a work trip to London.",
          },
        ],
      },
    ],
  },

  {
    id: "tell-the-time",
    title: "What's the time?",
    badge: "L41",
    description:
      "Unit 4D: питати і казати час — o'clock, past, to, quarter, half.",
    grammar: [
      "What time is it? — It's three o'clock. / It's quarter past six.",
      "past = після години · to = до наступної години",
      "quarter = 15 хв · half = 30 хв",
      "What time is the train? — It's at quarter to eleven.",
    ],
    groups: [
      {
        label: "Ask & answer",
        items: [
          {
            en: "What time is it?",
            ua: "Котра година?",
            ipa: "wɒt taɪm ɪz ɪt",
            example: "What time is it? — It's four o'clock.",
          },
          {
            en: "It's … o'clock",
            ua: "Рівно … годин",
            ipa: "ɪts … əˈklɒk",
            example: "It's three o'clock.",
          },
          {
            en: "What time is the…?",
            ua: "О котрій …?",
            ipa: "wɒt taɪm ɪz ðə",
            example: "What time is the train to London?",
          },
          {
            en: "It's at…",
            ua: "О … (про подію)",
            ipa: "ɪts ət",
            example: "It's at seven forty-five.",
          },
        ],
      },
      {
        label: "Past & to",
        items: [
          {
            en: "five past four",
            ua: "чотири нуль п'ять / п'ять хвилин по четвертій",
            ipa: "faɪv pɑːst fɔː",
            example: "It's five past four.",
          },
          {
            en: "quarter past four",
            ua: "чверть на п'яту / 4:15",
            ipa: "ˈkwɔːtə pɑːst fɔː",
            example: "It's quarter past four.",
          },
          {
            en: "half past four",
            ua: "пів на п'яту / 4:30",
            ipa: "hɑːf pɑːst fɔː",
            example: "It's half past four.",
          },
          {
            en: "twenty to five",
            ua: "без двадцяти п'ята / 4:40",
            ipa: "ˈtwenti tə faɪv",
            example: "It's twenty to five.",
          },
          {
            en: "quarter to five",
            ua: "без чверті п'ята / 4:45",
            ipa: "ˈkwɔːtə tə faɪv",
            example: "It's quarter to five.",
          },
          {
            en: "five to five",
            ua: "без п'яти п'ята / 4:55",
            ipa: "faɪv tə faɪv",
            example: "It's five to five.",
          },
        ],
      },
    ],
  },

  {
    id: "my-week",
    title: "My week",
    badge: "L42–43",
    description:
      "Unit 5A–5B: everyday activities, days of the week, Present Simple I, travel (by bus / leave / arrive).",
    grammar: [
      "I work from Monday to Friday. / I don't work at the weekend.",
      "Do you work on Saturdays? — Yes, I do. / No, I don't.",
      "What time do you leave home? / How do you travel to work?",
      "go to work by bus · take the train · leave home · arrive at work",
    ],
    groups: [
      {
        label: "Everyday activities",
        items: [
          {
            en: "get up",
            ua: "вставати",
            ipa: "ɡet ʌp",
            example: "I get up at seven o'clock.",
          },
          {
            en: "get up late",
            ua: "вставати пізно",
            ipa: "ɡet ʌp leɪt",
            example: "On Saturdays, I get up late.",
          },
          {
            en: "have breakfast",
            ua: "снідати",
            ipa: "hæv ˈbrekfəst",
            example: "I have breakfast at seven thirty.",
          },
          {
            en: "go to work",
            ua: "іти на роботу",
            ipa: "ɡəʊ tə wɜːk",
            example: "I go to work at eight.",
          },
          {
            en: "work",
            ua: "працювати",
            ipa: "wɜːk",
            example: "I work from nine to five thirty.",
          },
          {
            en: "have lunch",
            ua: "обідати",
            ipa: "hæv lʌntʃ",
            example: "I have lunch at one o'clock.",
          },
          {
            en: "go home",
            ua: "іти додому",
            ipa: "ɡəʊ həʊm",
            example: "I go home at half past five.",
          },
          {
            en: "have dinner",
            ua: "вечеряти",
            ipa: "hæv ˈdɪnə",
            example: "I have dinner at seven.",
          },
          {
            en: "watch TV",
            ua: "дивитися телевізор",
            ipa: "wɒtʃ ˌtiːˈviː",
            example: "I watch TV in the evening.",
          },
          {
            en: "study",
            ua: "вчитись",
            ipa: "ˈstʌdi",
            example: "I study English on Thursday evening.",
          },
          {
            en: "go to bed",
            ua: "лягати спати",
            ipa: "ɡəʊ tə bed",
            example: "I go to bed at eleven.",
          },
          {
            en: "go to university",
            ua: "іти в університет",
            ipa: "ɡəʊ tə ˌjuːnɪˈvɜːsəti",
            example: "On Tuesdays, I go to university.",
          },
        ],
      },
      {
        label: "Days & time phrases",
        items: [
          {
            en: "from Monday to Friday",
            ua: "з понеділка по п'ятницю",
            ipa: "frəm ˈmʌndeɪ tə ˈfraɪdeɪ",
            example: "I work from Monday to Friday.",
          },
          {
            en: "on Mondays",
            ua: "по понеділках",
            ipa: "ɒn ˈmʌndeɪz",
            example: "On Mondays, I work in a bookshop.",
          },
          {
            en: "at the weekend",
            ua: "на вихідних (BrE)",
            ipa: "ət ðə ˌwiːkˈend",
            example: "I don't work at the weekend.",
          },
          {
            en: "in the evening",
            ua: "увечері",
            ipa: "ɪn ði ˈiːvnɪŋ",
            example: "In the evening, I watch TV.",
          },
          {
            en: "from … to …",
            ua: "з … до …",
            ipa: "frəm … tə …",
            example: "I work from nine to five thirty.",
          },
        ],
      },
      {
        label: "Transport",
        items: [
          {
            en: "bus",
            ua: "автобус",
            ipa: "bʌs",
            example: "I go to work by bus.",
          },
          {
            en: "train",
            ua: "поїзд",
            ipa: "treɪn",
            example: "I go to the office by train.",
          },
          {
            en: "taxi",
            ua: "таксі",
            ipa: "ˈtæksi",
            example: "I travel to work by taxi.",
          },
          {
            en: "boat",
            ua: "човен / пором",
            ipa: "bəʊt",
            example: "I take a boat to work.",
          },
          {
            en: "bike",
            ua: "велосипед",
            ipa: "baɪk",
            example: "I love my bike!",
          },
          {
            en: "car",
            ua: "машина",
            ipa: "kɑː",
            example: "I drive to my parents' house.",
          },
          {
            en: "office",
            ua: "офіс",
            ipa: "ˈɒfɪs",
            example: "I go to the office by train.",
          },
        ],
      },
      {
        label: "Travel phrases",
        items: [
          {
            en: "travel",
            ua: "їхати / подорожувати",
            ipa: "ˈtrævl",
            example: "How do you travel to work?",
          },
          {
            en: "journey",
            ua: "поїздка / дорога",
            ipa: "ˈdʒɜːni",
            example: "That's a really long journey to work.",
          },
          {
            en: "by bus",
            ua: "автобусом",
            ipa: "baɪ bʌs",
            example: "I go to work by bus.",
          },
          {
            en: "by train",
            ua: "поїздом",
            ipa: "baɪ treɪn",
            example: "I go to the office by train.",
          },
          {
            en: "by taxi",
            ua: "на таксі",
            ipa: "baɪ ˈtæksi",
            example: "I travel to work by taxi.",
          },
          {
            en: "by bike",
            ua: "на велосипеді",
            ipa: "baɪ baɪk",
            example: "I go to work by bike.",
          },
          {
            en: "take the train",
            ua: "їхати поїздом",
            ipa: "teɪk ðə treɪn",
            example: "I take the train to work.",
          },
          {
            en: "take a taxi",
            ua: "брати таксі",
            ipa: "teɪk ə ˈtæksi",
            example: "I take a taxi.",
          },
          {
            en: "take a boat",
            ua: "їхати човном / поромом",
            ipa: "teɪk ə bəʊt",
            example: "I take a boat to work.",
          },
          {
            en: "take the bus",
            ua: "їхати автобусом",
            ipa: "teɪk ðə bʌs",
            example: "I take the bus. I leave home at 7.30.",
          },
          {
            en: "cycle",
            ua: "їхати велосипедом",
            ipa: "ˈsaɪkl",
            example: "I cycle to work.",
          },
          {
            en: "drive",
            ua: "їхати машиною",
            ipa: "draɪv",
            example: "I drive to my parents' house.",
          },
          {
            en: "walk",
            ua: "іти пішки",
            ipa: "wɔːk",
            example: "I walk home.",
          },
          {
            en: "leave home",
            ua: "виходити з дому",
            ipa: "liːv həʊm",
            example: "I leave home at eight.",
          },
          {
            en: "arrive at work",
            ua: "прибувати на роботу",
            ipa: "əˈraɪv ət wɜːk",
            example: "I arrive at work at 8.30.",
          },
          {
            en: "leave",
            ua: "виходити / залишати",
            ipa: "liːv",
            example: "What time do you leave home?",
          },
          {
            en: "arrive",
            ua: "прибувати",
            ipa: "əˈraɪv",
            example: "What time do you arrive at work?",
          },
          {
            en: "How do you travel to work?",
            ua: "Як ти добираєшся на роботу?",
            ipa: "haʊ də ju ˈtrævl tə wɜːk",
            example: "How do you travel to work? — By bus.",
          },
          {
            en: "What time do you leave home?",
            ua: "О котрій ти виходиш з дому?",
            ipa: "wɒt taɪm də ju liːv həʊm",
            example: "What time do you leave home? — At 7.30.",
          },
        ],
      },
    ],
  },

  {
    id: "past-simple",
    title: "Past Simple",
    badge: "L43–56",
    description:
      "Минулий час: yesterday. Правильні дієслова (-ed, L55), неправильні (L43 і L56), часові маркери, didn't + дієслово.",
    grammar: [
      "Present: I work every day. → Past: I worked yesterday.",
      "Правильні: work → worked (додаємо -ed). Форма однакова для всіх осіб.",
      "-e → -d: like → liked. consonant + y → -ied: study → studied.",
      "Подвоєння: travel → travelled (vowel + consonant).",
      "Звуки -ed: /t/ worked · /d/ played · /ɪd/ started.",
      "Неправильні: go → went (форму треба запам'ятати).",
      "Заперечення: didn't + початкова форма. I didn't go. / I didn't like school.",
      "Markers: yesterday, last night, last week, … ago.",
    ],
    frontLabel: "Українською",
    backLabel: "Present → Past",
    groups: [
      {
        label: "Time markers",
        items: [
          {
            en: "yesterday",
            ua: "вчора",
            ipa: "ˈjestədeɪ",
            example: "I worked yesterday.",
          },
          {
            en: "yesterday morning",
            ua: "учора вранці",
            ipa: "ˈjestədeɪ ˈmɔːnɪŋ",
            example: "I got up late yesterday morning.",
          },
          {
            en: "yesterday afternoon",
            ua: "учора вдень",
            ipa: "ˈjestədeɪ ˌɑːftəˈnuːn",
            example: "I studied yesterday afternoon.",
          },
          {
            en: "yesterday evening",
            ua: "учора ввечері",
            ipa: "ˈjestədeɪ ˈiːvnɪŋ",
            example: "I watched a film yesterday evening.",
          },
          {
            en: "last night",
            ua: "минулої ночі / учора ввечері",
            ipa: "lɑːst naɪt",
            example: "I slept well last night.",
          },
          {
            en: "last weekend",
            ua: "минулими вихідними",
            ipa: "lɑːst ˌwiːkˈend",
            example: "I visited my parents last weekend.",
          },
          {
            en: "last week",
            ua: "минулого тижня",
            ipa: "lɑːst wiːk",
            example: "I started a new job last week.",
          },
          {
            en: "two days ago",
            ua: "два дні тому",
            ipa: "tuː deɪz əˈɡəʊ",
            example: "I met her two days ago.",
          },
          {
            en: "… ago",
            ua: "… тому",
            ipa: "əˈɡəʊ",
            example: "I finished work an hour ago.",
          },
        ],
      },
      {
        label: "Regular verbs (-ed)",
        items: [
          {
            en: "worked",
            ua: "працювати → працював / працювала",
            example: "work → worked · I worked yesterday.",
          },
          {
            en: "watched",
            ua: "дивитися → дивився / дивилася",
            example: "watch → watched · I watched a film.",
          },
          {
            en: "played",
            ua: "грати → грав / грала",
            example: "play → played · I played video games.",
          },
          {
            en: "walked",
            ua: "гуляти / ходити → гуляв / гуляла",
            example: "walk → walked · I walked in the park.",
          },
          {
            en: "cooked",
            ua: "готувати → готував / готувала",
            example: "cook → cooked · I cooked dinner.",
          },
          {
            en: "studied",
            ua: "вчитися → вчився / вчилася",
            example: "study → studied · I studied English.",
          },
          {
            en: "visited",
            ua: "відвідувати → відвідав / відвідала",
            example: "visit → visited · I visited my friend.",
          },
          {
            en: "talked",
            ua: "розмовляти → розмовляв / розмовляла",
            example: "talk → talked · I talked to my mum.",
          },
          {
            en: "cleaned",
            ua: "прибирати → прибирав / прибирала",
            example: "clean → cleaned · I cleaned my room.",
          },
          {
            en: "washed",
            ua: "мити → мив / мила",
            example: "wash → washed · I washed the dishes.",
          },
          {
            en: "started",
            ua: "починати → почав / почала",
            example: "start → started · I started work at nine.",
          },
          {
            en: "finished",
            ua: "закінчувати → закінчив / закінчила",
            example: "finish → finished · I finished at five.",
          },
          {
            en: "relaxed",
            ua: "відпочивати → відпочивав / відпочивала",
            example: "relax → relaxed · I relaxed at home.",
          },
          {
            en: "arrived",
            ua: "прибувати → прибув / прибула",
            example: "arrive → arrived · I arrived at eight.",
          },
          {
            en: "asked",
            ua: "запитувати → запитав / запитала",
            example: "ask → asked · I asked a question.",
          },
          {
            en: "called",
            ua: "телефонувати → зателефонував / зателефонувала",
            example: "call → called · I called my friend.",
          },
          {
            en: "liked",
            ua: "подобатися → подобався / подобалася",
            example: "like → liked · I liked my teacher.",
          },
          {
            en: "stayed",
            ua: "залишатися → залишався / залишалася",
            example: "stay → stayed · I stayed in bed.",
          },
          {
            en: "helped",
            ua: "допомагати → допоміг / допомогла",
            example: "help → helped · I helped my dad.",
          },
          {
            en: "wanted",
            ua: "хотіти → хотів / хотіла",
            example: "want → wanted · I wanted a sandwich.",
          },
          {
            en: "needed",
            ua: "потребувати → потребував / потребувала",
            example: "need → needed · I needed a ticket.",
          },
          {
            en: "lived",
            ua: "жити → жив / жила",
            example: "live → lived · I lived in a small town.",
          },
          {
            en: "travelled",
            ua: "подорожувати → подорожував / подорожувала",
            example: "travel → travelled · I travelled to school by train.",
          },
          {
            en: "listened",
            ua: "слухати → слухав / слухала",
            example: "listen → listened · I listened to music.",
          },
          {
            en: "loved",
            ua: "любити → любив / любила",
            example: "love → loved · I loved football.",
          },
          {
            en: "cycled",
            ua: "їздити на велосипеді → їздив / їздила",
            example: "cycle → cycled · I cycled to school.",
          },
          {
            en: "used",
            ua: "використовувати → використовував / використовувала",
            example: "use → used · I used a computer at school.",
          },
          {
            en: "opened",
            ua: "відкривати → відкрив / відкрила",
            example: "open → opened · I opened the window.",
          },
          {
            en: "closed",
            ua: "закривати → закрив / закрила",
            example: "close → closed · I closed the door.",
          },
          {
            en: "answered",
            ua: "відповідати → відповів / відповіла",
            example: "answer → answered · I answered the question.",
          },
          {
            en: "looked",
            ua: "дивитися → дивився / дивилася",
            example: "look → looked · I looked at the photo.",
          },
          {
            en: "waited",
            ua: "чекати → чекав / чекала",
            example: "wait → waited · I waited for the train.",
          },
          {
            en: "stopped",
            ua: "зупинятися → зупинився / зупинилася",
            example: "stop → stopped · The bus stopped.",
          },
          {
            en: "planned",
            ua: "планувати → планував / планувала",
            example: "plan → planned · I planned a trip.",
          },
          {
            en: "tried",
            ua: "пробувати → пробував / пробувала",
            example: "try → tried · I tried the cake.",
          },
          {
            en: "enjoyed",
            ua: "насолоджуватися → насолоджувався / насолоджувалася",
            example: "enjoy → enjoyed · I enjoyed the film.",
          },
          {
            en: "danced",
            ua: "танцювати → танцював / танцювала",
            example: "dance → danced · I danced with my friends.",
          },
          {
            en: "smiled",
            ua: "посміхатися → посміхнувся / посміхнулася",
            example: "smile → smiled · She smiled.",
          },
          {
            en: "changed",
            ua: "змінювати → змінив / змінила",
            example: "change → changed · I changed my ticket.",
          },
          {
            en: "moved",
            ua: "переїжджати → переїхав / переїхала",
            example: "move → moved · I moved to a new city.",
          },
          {
            en: "invited",
            ua: "запрошувати → запросив / запросила",
            example: "invite → invited · I invited my friend.",
          },
          {
            en: "decided",
            ua: "вирішувати → вирішив / вирішила",
            example: "decide → decided · I decided to stay home.",
          },
          {
            en: "remembered",
            ua: "пам'ятати → пам'ятав / пам'ятала",
            example: "remember → remembered · I remembered her name.",
          },
          {
            en: "practised",
            ua: "практикувати → практикував / практикувала",
            example: "practise → practised · I practised English.",
          },
          {
            en: "missed",
            ua: "пропускати → пропустив / пропустила",
            example: "miss → missed · I missed the train.",
          },
          {
            en: "hoped",
            ua: "сподіватися → сподівався / сподівалася",
            example: "hope → hoped · I hoped for good weather.",
          },
          {
            en: "shared",
            ua: "ділитися → поділився / поділилася",
            example: "share → shared · I shared my lunch.",
          },
          {
            en: "checked",
            ua: "перевіряти → перевірив / перевірила",
            example: "check → checked · I checked the time.",
          },
          {
            en: "booked",
            ua: "бронювати → забронював / забронювала",
            example: "book → booked · I booked a ticket.",
          },
          {
            en: "packed",
            ua: "пакувати → спакував / спакувала",
            example: "pack → packed · I packed my bag.",
          },
          {
            en: "ordered",
            ua: "замовляти → замовив / замовила",
            example: "order → ordered · I ordered a coffee.",
          },
          {
            en: "returned",
            ua: "повертатися → повернувся / повернулася",
            example: "return → returned · I returned home.",
          },
          {
            en: "jumped",
            ua: "стрибати → стрибнув / стрибнула",
            example: "jump → jumped · The dog jumped.",
          },
          {
            en: "climbed",
            ua: "підніматися → піднявся / піднялася",
            example: "climb → climbed · I climbed the hill.",
          },
          {
            en: "happened",
            ua: "траплятися → трапилося",
            example: "happen → happened · It happened yesterday.",
          },
          {
            en: "noticed",
            ua: "помічати → помітив / помітила",
            example: "notice → noticed · I noticed the sign.",
          },
          {
            en: "joined",
            ua: "приєднуватися → приєднався / приєдналася",
            example: "join → joined · I joined the class.",
          },
        ],
      },
      {
        label: "Irregular verbs",
        items: [
          {
            en: "was / were",
            ua: "бути → був / була / були",
            example: "be → was / were · I was tired yesterday.",
          },
          {
            en: "went",
            ua: "іти / їхати → пішов / поїхав",
            example: "go → went · I went to work.",
          },
          {
            en: "had",
            ua: "мати → мав / мала",
            example: "have → had · I had breakfast.",
          },
          {
            en: "did",
            ua: "робити → зробив / зробила",
            example: "do → did · I did my homework.",
          },
          {
            en: "got",
            ua: "отримати / дістатися → отримав / дістався",
            example: "get → got · I got home late.",
          },
          {
            en: "ate",
            ua: "їсти → їв / їла",
            example: "eat → ate · I ate lunch.",
          },
          {
            en: "drank",
            ua: "пити → пив / пила",
            example: "drink → drank · I drank coffee.",
          },
          {
            en: "woke up",
            ua: "прокидатися → прокинувся / прокинулася",
            example: "wake up → woke up · I woke up at ten.",
          },
          {
            en: "got up",
            ua: "вставати → встав / встала",
            example: "get up → got up · I got up at ten.",
          },
          {
            en: "felt",
            ua: "почуватися → почувався / почувалася",
            example: "feel → felt · I felt better.",
          },
          {
            en: "made",
            ua: "робити / створювати → зробив / зробила",
            example: "make → made · I made tea.",
          },
          {
            en: "took",
            ua: "брати → взяв / взяла",
            example: "take → took · I took a taxi.",
          },
          {
            en: "saw",
            ua: "бачити → побачив / побачила",
            example: "see → saw · I saw a film.",
          },
          {
            en: "came",
            ua: "приходити / приїжджати → прийшов / приїхав",
            example: "come → came · I came home late.",
          },
          {
            en: "bought",
            ua: "купувати → купив / купила",
            example: "buy → bought · I bought coffee.",
          },
          {
            en: "met",
            ua: "зустрічати → зустрів / зустріла",
            example: "meet → met · I met my friend.",
          },
          {
            en: "read",
            ua: "читати → читав / читала",
            ipa: "red",
            example: "read → read · I read a book. (past = /red/)",
          },
          {
            en: "left",
            ua: "залишати / виходити → залишив / вийшов",
            example: "leave → left · I left home at 8.",
          },
          {
            en: "slept",
            ua: "спати → спав / спала",
            example: "sleep → slept · I slept well.",
          },
          {
            en: "sat",
            ua: "сидіти → сидів / сиділа",
            example: "sit → sat · I sat at home.",
          },
          {
            en: "broke",
            ua: "ламати → зламав / зламала",
            example: "break → broke · My computer broke.",
          },
          {
            en: "lost",
            ua: "губити → загубив / загубила",
            example: "lose → lost · I lost my phone.",
          },
          {
            en: "spoke",
            ua: "говорити → говорив / говорила",
            example: "speak → spoke · My boss spoke to me.",
          },
          {
            en: "ran",
            ua: "бігти → біг / бігла",
            example: "run → ran · I ran to work.",
          },
          {
            en: "forgot",
            ua: "забувати → забув / забула",
            example: "forget → forgot · I forgot the meeting.",
          },
          {
            en: "wrote",
            ua: "писати → писав / писала",
            example: "write → wrote · I wrote an email.",
          },
          {
            en: "drove",
            ua: "їхати машиною → їхав / їхала",
            example: "drive → drove · I drove to work.",
          },
          {
            en: "flew",
            ua: "літати → летів / летіла",
            example: "fly → flew · I flew to London.",
          },
          {
            en: "swam",
            ua: "плавати → плавав / плавала",
            example: "swim → swam · I swam in the sea.",
          },
          {
            en: "sang",
            ua: "співати → співав / співала",
            example: "sing → sang · I sang a song.",
          },
          {
            en: "gave",
            ua: "давати → дав / дала",
            example: "give → gave · I gave her a book.",
          },
          {
            en: "found",
            ua: "знаходити → знайшов / знайшла",
            example: "find → found · I found my phone.",
          },
          {
            en: "knew",
            ua: "знати → знав / знала",
            example: "know → knew · I knew the answer.",
          },
          {
            en: "thought",
            ua: "думати → думав / думала",
            example: "think → thought · I thought about it.",
          },
          {
            en: "told",
            ua: "розповідати → розповів / розповіла",
            example: "tell → told · I told my friend.",
          },
          {
            en: "said",
            ua: "казати → сказав / сказала",
            example: "say → said · I said hello.",
          },
          {
            en: "paid",
            ua: "платити → заплатив / заплатила",
            example: "pay → paid · I paid for the ticket.",
          },
          {
            en: "wore",
            ua: "носити → носив / носила",
            example: "wear → wore · I wore a jacket.",
          },
          {
            en: "put",
            ua: "класти → поклав / поклала",
            example: "put → put · I put the book on the table.",
          },
          {
            en: "cut",
            ua: "різати → порізав / порізала",
            example: "cut → cut · I cut the cake.",
          },
          {
            en: "heard",
            ua: "чути → чув / чула",
            example: "hear → heard · I heard a noise.",
          },
          {
            en: "taught",
            ua: "навчати → навчав / навчала",
            example: "teach → taught · She taught English.",
          },
          {
            en: "caught",
            ua: "встигати (на транспорт) → встиг / встигла",
            example: "catch → caught · I caught the bus.",
          },
          {
            en: "brought",
            ua: "приносити → приніс / принесла",
            example: "bring → brought · I brought a cake.",
          },
          {
            en: "sent",
            ua: "надсилати → надіслав / надіслала",
            example: "send → sent · I sent a message.",
          },
          {
            en: "spent",
            ua: "проводити (час) → провів / провела",
            example: "spend → spent · I spent the day at home.",
          },
          {
            en: "stood",
            ua: "стояти → стояв / стояла",
            example: "stand → stood · I stood at the door.",
          },
          {
            en: "understood",
            ua: "розуміти → зрозумів / зрозуміла",
            example: "understand → understood · I understood the question.",
          },
          {
            en: "began",
            ua: "починати → почав / почала",
            example: "begin → began · The lesson began at nine.",
          },
          {
            en: "chose",
            ua: "вибирати → вибрав / вибрала",
            example: "choose → chose · I chose a seat.",
          },
          {
            en: "drew",
            ua: "малювати → малював / малювала",
            example: "draw → drew · I drew a picture.",
          },
          {
            en: "fell",
            ua: "падати → упав / упала",
            example: "fall → fell · I fell.",
          },
          {
            en: "kept",
            ua: "тримати / зберігати → тримав / тримала",
            example: "keep → kept · I kept the ticket.",
          },
          {
            en: "rode",
            ua: "їздити → їхав / їхала",
            example: "ride → rode · I rode a bike.",
          },
          {
            en: "sold",
            ua: "продавати → продав / продала",
            example: "sell → sold · I sold my old phone.",
          },
        ],
      },
      {
        label: "didn't",
        items: [
          {
            en: "didn't",
            ua: "не (минулий час)",
            ipa: "ˈdɪdnt",
            example: "didn't + verb · I didn't go to work. / I didn't like school.",
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
            ipa: "wɒz",
            example: "I was tired yesterday.",
          },
          {
            en: "were",
            ua: "були",
            ipa: "wɜː",
            example: "They were at home.",
          },
        ],
      },
    ],
  },

  {
    id: "food",
    title: "Food",
    badge: "L44",
    description: "Їжа з уроку про звички: що їдять і п'ють.",
    groups: [
      {
        items: [
          { en: "bread", ua: "хліб", ipa: "bred", example: "I eat bread." },
          { en: "cakes", ua: "тістечка / кекси", ipa: "keɪks", example: "She doesn't eat cakes." },
          { en: "cheese", ua: "сир", ipa: "tʃiːz", example: "I like cheese." },
          { en: "chicken", ua: "курка", ipa: "ˈtʃɪkɪn", example: "We have chicken for dinner." },
          { en: "chocolate", ua: "шоколад", ipa: "ˈtʃɒklət", example: "She eats chocolate every day." },
          { en: "coffee", ua: "кава", ipa: "ˈkɒfi", example: "He drinks coffee at night." },
          { en: "eggs", ua: "яйця", ipa: "eɡz", example: "I have eggs for breakfast." },
          { en: "fish", ua: "риба", ipa: "fɪʃ", example: "Do you eat fish?" },
          { en: "meat", ua: "м'ясо", ipa: "miːt", example: "I don't eat meat." },
          { en: "milk", ua: "молоко", ipa: "mɪlk", example: "I drink milk." },
          { en: "salad", ua: "салат", ipa: "ˈsæləd", example: "She often has salad for lunch." },
          { en: "sandwiches", ua: "бутерброди", ipa: "ˈsænwɪdʒɪz", example: "I bought a sandwich." },
          { en: "sugar", ua: "цукор", ipa: "ˈʃʊɡə", example: "There is sugar in my tea." },
          { en: "tea", ua: "чай", ipa: "tiː", example: "I don't drink tea." },
        ],
      },
    ],
  },

  {
    id: "chores",
    title: "Chores & requests",
    badge: "L46 · L50",
    description: "Хатні справи і прохання: Can I…? / Can you…?",
    grammar: [
      "Can I…? — можна мені…?",
      "Can you…? — чи можеш ти…?",
      "Sure. / No problem. — так, звичайно.",
      "I'm sorry, I can't. / I'm sorry, you can't.",
    ],
    groups: [
      {
        label: "Chores",
        items: [
          { en: "clean the bathroom", ua: "прибрати ванну", ipa: "kliːn ðə ˈbɑːθruːm", example: "Can you clean the bathroom?" },
          { en: "cook dinner", ua: "готувати вечерю", ipa: "kʊk ˈdɪnə", example: "I cook dinner." },
          { en: "feed the dog", ua: "годувати собаку", ipa: "fiːd ðə dɒɡ", example: "Can you feed the dog?" },
          { en: "go to the supermarket", ua: "ходити в супермаркет", ipa: "ɡəʊ tə ðə ˈsuːpəmɑːkɪt", example: "I go to the supermarket." },
          { en: "go shopping", ua: "ходити за покупками", ipa: "ɡəʊ ˈʃɒpɪŋ", example: "Can you go shopping?" },
          { en: "make the bed", ua: "застелити ліжко", ipa: "meɪk ðə bed", example: "Can you make the bed?" },
          { en: "make the beds", ua: "застеляти ліжка", ipa: "meɪk ðə bedz", example: "I make the beds." },
          { en: "walk the dog", ua: "вигуляти собаку", ipa: "wɔːk ðə dɒɡ", example: "Can you walk the dog?" },
          { en: "do the washing", ua: "попрати білизну", ipa: "duː ðə ˈwɒʃɪŋ", example: "I do the washing." },
          { en: "wash the dishes", ua: "мити посуд", ipa: "wɒʃ ðə ˈdɪʃɪz", example: "Can you wash the dishes?" },
        ],
      },
      {
        label: "Requests",
        items: [
          { en: "Can I…?", ua: "можна мені…?", ipa: "kən aɪ", example: "Can I go out?" },
          { en: "Can you…?", ua: "чи можеш ти…?", ipa: "kən ju", example: "Can you wash the dishes?" },
          { en: "please", ua: "будь ласка", ipa: "pliːz", example: "Can you help me, please?" },
          { en: "Sure.", ua: "так / звичайно", ipa: "ʃʊə", example: "Can you help? — Sure." },
          { en: "No problem.", ua: "без проблем", ipa: "nəʊ ˈprɒbləm", example: "Can I sit here? — No problem." },
          { en: "I'm sorry, I can't.", ua: "вибач, я не можу", ipa: "aɪm ˈsɒri aɪ kɑːnt", example: "Can you come? — I'm sorry, I can't." },
          { en: "I'm sorry, you can't.", ua: "вибач, не можна", ipa: "aɪm ˈsɒri ju kɑːnt", example: "Can I go? — I'm sorry, you can't." },
        ],
      },
    ],
  },

  {
    id: "skills",
    title: "Skills",
    badge: "L47",
    description: "Вміння: can / can't.",
    grammar: [
      "I can swim. — Я вмію плавати.",
      "I can't fly a plane. — Я не вмію керувати літаком.",
      "Can you sing? — Ти вмієш співати?",
    ],
    groups: [
      {
        items: [
          { en: "can", ua: "вміти / можу", ipa: "kæn", example: "I can swim." },
          { en: "can't", ua: "не вмію / не можу", ipa: "kɑːnt", example: "I can't fly a plane." },
          { en: "build a website", ua: "створити сайт", ipa: "bɪld ə ˈwebsaɪt", example: "She can build a website." },
          { en: "dance", ua: "танцювати", ipa: "dɑːns", example: "I can dance." },
          { en: "draw pictures", ua: "малювати", ipa: "drɔː ˈpɪktʃəz", example: "He can draw pictures." },
          { en: "fly a plane", ua: "керувати літаком", ipa: "flaɪ ə pleɪn", example: "I can't fly a plane." },
          { en: "make a cake", ua: "спекти торт", ipa: "meɪk ə keɪk", example: "She can make a cake." },
          { en: "make clothes", ua: "шити одяг", ipa: "meɪk kləʊðz", example: "He can make clothes." },
          { en: "play football", ua: "грати у футбол", ipa: "pleɪ ˈfʊtbɔːl", example: "I can play football." },
          { en: "ride a horse", ua: "їздити верхи", ipa: "raɪd ə hɔːs", example: "Can you ride a horse?" },
          { en: "sing", ua: "співати", ipa: "sɪŋ", example: "She can sing." },
          { en: "sleep on a train", ua: "спати в поїзді", ipa: "sliːp ɒn ə treɪn", example: "I can sleep on a train." },
          { en: "speak two languages", ua: "говорити двома мовами", ipa: "spiːk tuː ˈlæŋɡwɪdʒɪz", example: "I can speak two languages." },
          { en: "swim", ua: "плавати", ipa: "swɪm", example: "I can swim." },
        ],
      },
    ],
  },

  {
    id: "clothes",
    title: "Clothes",
    badge: "L47",
    description: "Одяг. I wear a jacket.",
    groups: [
      {
        items: [
          { en: "clothes", ua: "одяг", ipa: "kləʊðz", example: "I like these clothes." },
          { en: "wear", ua: "носити (одяг)", ipa: "weə", example: "I wear a jacket." },
          { en: "T-shirt", ua: "футболка", ipa: "ˈtiː ʃɜːt", example: "I wear a T-shirt." },
          { en: "shirt", ua: "сорочка", ipa: "ʃɜːt", example: "He wears a shirt." },
          { en: "jumper", ua: "светр", ipa: "ˈdʒʌmpə", example: "It's a green jumper." },
          { en: "jacket", ua: "куртка", ipa: "ˈdʒækɪt", example: "Take a jacket." },
          { en: "coat", ua: "пальто", ipa: "kəʊt", example: "I wear a coat in winter." },
          { en: "jeans", ua: "джинси", ipa: "dʒiːnz", example: "I wear jeans." },
          { en: "trousers", ua: "штани", ipa: "ˈtraʊzəz", example: "These trousers are black." },
          { en: "skirt", ua: "спідниця", ipa: "skɜːt", example: "She wears a skirt." },
          { en: "dress", ua: "сукня", ipa: "dres", example: "It's a red dress." },
          { en: "shorts", ua: "шорти", ipa: "ʃɔːts", example: "I wear shorts in summer." },
          { en: "shoes", ua: "взуття / туфлі", ipa: "ʃuːz", example: "These shoes are black." },
          { en: "trainers", ua: "кросівки", ipa: "ˈtreɪnəz", example: "I wear trainers." },
          { en: "boots", ua: "чоботи", ipa: "buːts", example: "I wear boots." },
          { en: "socks", ua: "шкарпетки", ipa: "sɒks", example: "Where are my socks?" },
          { en: "hat", ua: "шапка / капелюх", ipa: "hæt", example: "I wear a hat." },
          { en: "scarf", ua: "шарф", ipa: "skɑːf", example: "It's a warm scarf." },
          { en: "gloves", ua: "рукавички", ipa: "ɡlʌvz", example: "I wear gloves." },
          { en: "tie", ua: "краватка", ipa: "taɪ", example: "He wears a tie." },
        ],
      },
    ],
  },

  {
    id: "places-nature",
    title: "A nice place",
    badge: "L51",
    description: "Природа і сторони світу.",
    groups: [
      {
        label: "Places",
        items: [
          { en: "the sea", ua: "море", ipa: "ðə siː", example: "I live near the sea." },
          { en: "a mountain", ua: "гора", ipa: "ə ˈmaʊntɪn", example: "The mountain is high." },
          { en: "an island", ua: "острів", ipa: "ən ˈaɪlənd", example: "It's a small island." },
          { en: "a lake", ua: "озеро", ipa: "ə leɪk", example: "There is a lake." },
          { en: "a hill", ua: "пагорб", ipa: "ə hɪl", example: "We walked up a hill." },
          { en: "a river", ua: "річка", ipa: "ə ˈrɪvə", example: "The river is long." },
          { en: "a field", ua: "поле", ipa: "ə fiːld", example: "There is a green field." },
          { en: "the sky", ua: "небо", ipa: "ðə skaɪ", example: "The sky is blue." },
          { en: "clouds", ua: "хмари", ipa: "klaʊdz", example: "There are clouds in the sky." },
          { en: "trees", ua: "дерева", ipa: "triːz", example: "There are trees." },
          { en: "flowers", ua: "квіти", ipa: "ˈflaʊəz", example: "I like the flowers." },
        ],
      },
      {
        label: "Directions",
        items: [
          { en: "north", ua: "північ", ipa: "nɔːθ", example: "It's in the north." },
          { en: "south", ua: "південь", ipa: "saʊθ", example: "It's in the south." },
          { en: "east", ua: "схід", ipa: "iːst", example: "It's in the east." },
          { en: "west", ua: "захід", ipa: "west", example: "It's in the west." },
          { en: "in the north of my country", ua: "на півночі країни", ipa: "ɪn ðə nɔːθ əv maɪ ˈkʌntri", example: "I live in the north of my country." },
        ],
      },
    ],
  },

  {
    id: "months-dates",
    title: "Months & dates",
    badge: "L52",
    description: "Місяці і порядкові числівники для дат. My birthday is on the 21st of March.",
    grammar: [
      "Місяці: in January, in June.",
      "Дати: on the first of May · on 21st March.",
      "1st first · 2nd second · 3rd third · 4th fourth.",
    ],
    groups: [
      {
        label: "Months",
        items: [
          { en: "January", ua: "січень", ipa: "ˈdʒænjuəri", example: "My birthday is in January." },
          { en: "February", ua: "лютий", ipa: "ˈfebruəri", example: "We meet in February." },
          { en: "March", ua: "березень", ipa: "mɑːtʃ", example: "Spring starts in March." },
          { en: "April", ua: "квітень", ipa: "ˈeɪprəl", example: "It's April." },
          { en: "May", ua: "травень", ipa: "meɪ", example: "My birthday is in May." },
          { en: "June", ua: "червень", ipa: "dʒuːn", example: "School finishes in June." },
          { en: "July", ua: "липень", ipa: "dʒuˈlaɪ", example: "I travel in July." },
          { en: "August", ua: "серпень", ipa: "ˈɔːɡəst", example: "It's hot in August." },
          { en: "September", ua: "вересень", ipa: "sepˈtembə", example: "School starts in September." },
          { en: "October", ua: "жовтень", ipa: "ɒkˈtəʊbə", example: "It's October." },
          { en: "November", ua: "листопад", ipa: "nəʊˈvembə", example: "It's cold in November." },
          { en: "December", ua: "грудень", ipa: "dɪˈsembə", example: "Christmas is in December." },
        ],
      },
      {
        label: "Ordinal numbers",
        items: [
          { en: "first", ua: "1st · перший", ipa: "fɜːst", example: "the first of May" },
          { en: "second", ua: "2nd · другий", ipa: "ˈsekənd", example: "the second of June" },
          { en: "third", ua: "3rd · третій", ipa: "θɜːd", example: "the third of July" },
          { en: "fourth", ua: "4th · четвертий", ipa: "fɔːθ", example: "the fourth of April" },
          { en: "fifth", ua: "5th · п'ятий", ipa: "fɪfθ", example: "the fifth of May" },
          { en: "eleventh", ua: "11th · одинадцятий", ipa: "ɪˈlevnθ", example: "the eleventh of June" },
          { en: "twelfth", ua: "12th · дванадцятий", ipa: "twelfθ", example: "the twelfth of March" },
          { en: "thirteenth", ua: "13th · тринадцятий", ipa: "ˌθɜːˈtiːnθ", example: "the thirteenth of April" },
          { en: "fourteenth", ua: "14th · чотирнадцятий", ipa: "ˌfɔːˈtiːnθ", example: "the fourteenth of May" },
          { en: "fifteenth", ua: "15th · п'ятнадцятий", ipa: "ˌfɪfˈtiːnθ", example: "the fifteenth of June" },
          { en: "twentieth", ua: "20th · двадцятий", ipa: "ˈtwentiəθ", example: "the twentieth of July" },
          { en: "twenty-first", ua: "21st · двадцять перший", ipa: "ˌtwenti ˈfɜːst", example: "the twenty-first of March" },
          { en: "twenty-second", ua: "22nd · двадцять другий", ipa: "ˌtwenti ˈsekənd", example: "the twenty-second of May" },
          { en: "twenty-third", ua: "23rd · двадцять третій", ipa: "ˌtwenti ˈθɜːd", example: "the twenty-third of June" },
          { en: "twenty-fourth", ua: "24th · двадцять четвертий", ipa: "ˌtwenti ˈfɔːθ", example: "the twenty-fourth of December" },
          { en: "thirtieth", ua: "30th · тридцятий", ipa: "ˈθɜːtiəθ", example: "the thirtieth of April" },
          { en: "thirty-first", ua: "31st · тридцять перший", ipa: "ˌθɜːti ˈfɜːst", example: "the thirty-first of December" },
        ],
      },
    ],
  },

  {
    id: "tickets",
    title: "Buy travel tickets",
    badge: "L54",
    description: "Квитки на потяг: single, return, platform.",
    groups: [
      {
        items: [
          { en: "a ticket", ua: "квиток", ipa: "ə ˈtɪkɪt", example: "I need a ticket." },
          { en: "a single", ua: "квиток в один бік", ipa: "ə ˈsɪŋɡl", example: "A single to London, please." },
          { en: "a return", ua: "квиток туди й назад", ipa: "ə rɪˈtɜːn", example: "A return to Oxford, please." },
          { en: "a platform", ua: "платформа", ipa: "ə ˈplætfɔːm", example: "The train is on platform 3." },
          { en: "the next train", ua: "наступний потяг", ipa: "ðə nekst treɪn", example: "When is the next train?" },
          { en: "a fast train", ua: "швидкий потяг", ipa: "ə fɑːst treɪn", example: "It's a fast train." },
          { en: "a slow train", ua: "повільний потяг", ipa: "ə sləʊ treɪn", example: "It's a slow train." },
          { en: "an information board", ua: "табло, інформаційна дошка", ipa: "ən ˌɪnfəˈmeɪʃn bɔːd", example: "Look at the information board." },
          { en: "How much is a ticket to…?", ua: "Скільки коштує квиток до…?", ipa: "haʊ mʌtʃ ɪz ə ˈtɪkɪt tuː", example: "How much is a ticket to London?" },
        ],
      },
    ],
  },

  {
    id: "verb-phrases",
    title: "Verb phrases",
    badge: "L55",
    description: "Дієслівні сполучення для розповіді про школу і дитинство.",
    groups: [
      {
        items: [
          { en: "travel by bus", ua: "подорожувати автобусом", ipa: "ˈtrævl baɪ bʌs", example: "I travelled by bus." },
          { en: "travel to work", ua: "їхати на роботу", ipa: "ˈtrævl tə wɜːk", example: "How do you travel to work?" },
          { en: "watch TV", ua: "дивитися телевізор", ipa: "wɒtʃ ˌtiːˈviː", example: "I watched TV every day." },
          { en: "live with my parents", ua: "жити з батьками", ipa: "lɪv wɪð maɪ ˈpeərənts", example: "I lived with my parents." },
          { en: "live in a city", ua: "жити в місті", ipa: "lɪv ɪn ə ˈsɪti", example: "I didn't live in a city." },
          { en: "play games", ua: "грати в ігри", ipa: "pleɪ ɡeɪmz", example: "I played games." },
          { en: "play with friends", ua: "грати з друзями", ipa: "pleɪ wɪð frendz", example: "I played with friends." },
          { en: "talk about the weather", ua: "розмовляти про погоду", ipa: "tɔːk əˈbaʊt ðə ˈweðə", example: "We talked about the weather." },
          { en: "talk to my parents", ua: "розмовляти з батьками", ipa: "tɔːk tə maɪ ˈpeərənts", example: "I talked to my parents." },
          { en: "study", ua: "вчитися / займатися", ipa: "ˈstʌdi", example: "I studied in a café." },
          { en: "clean", ua: "прибирати", ipa: "kliːn", example: "I cleaned my dad's car." },
          { en: "start", ua: "починати", ipa: "stɑːt", example: "Lessons started at 9 o'clock." },
        ],
      },
    ],
  },
];
