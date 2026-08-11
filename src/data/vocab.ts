export type VocabItem = {
  en: string;
  ua: string;
  /** IPA transcription (without brackets), e.g. "ˈsɪti" */
  ipa?: string;
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
];
