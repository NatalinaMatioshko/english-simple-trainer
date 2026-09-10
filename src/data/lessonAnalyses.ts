export type AnalysisPair = { left: string; right: string };

export type AnalysisSection = {
  title: string;
  text: string;
  bullets?: string[];
  pairs?: AnalysisPair[];
  pairHead?: AnalysisPair;
};

export type LessonAnalysis = {
  id: string;
  title: string;
  topic: string;
  lessonPath: string;
  lead: string;
  result: string[];
  strengths: AnalysisSection[];
  gaps: AnalysisSection[];
  corrections: AnalysisSection[];
  teacherGood: string[];
  teacherImprove: string[];
  nextGoal: string;
  nextGrammar: string[];
  nextFlow: { time: string; title: string; text: string }[];
  homework: string[];
  takeaway: string;
};

export const lessonAnalyses: LessonAnalysis[] = [
  {
    id: "36",
    title: "Present Simple · daily verbs",
    topic: "listening · retelling · picture · there is/are",
    lessonPath: "/lesson-36",
    lead:
      "Сильний урок за змістом: listening, retelling, Present Simple, to + verb, опис картинки і there is/are. Петро добре зловив аудіо й описав кухню, але тем було забагато на один раз — когнітивно важко.",
    result: [
      "зрозумів короткі діалоги про routine і частково переказав їх англійською;",
      "розрізнив професії, daily activities і hobbies;",
      "описав кімнату: there is/are, рахунок предметів, люди, одяг, зовнішність;",
      "використав at the table, in the kitchen, at the library;",
      "сам помітив слабкі місця: -s, прийменники, опис людей.",
    ],
    strengths: [
      {
        title: "Listening",
        text: "Близько «5 із 5» для його A1: ловить хто / про що / робота / дія / like / місце. Деталі ще губляться — для рівня це нормально. Gist важливіший за дослівне повторення.",
      },
      {
        title: "Retelling",
        text: "Вже будує розповідь, не окремі слова: He works in a bike shop. He fixes and sells bikes. She eats lunch with her friends. He studies at the library. Закінчення й порядок слів ще падають.",
      },
      {
        title: "Питання про мову",
        text: "Сам питає: why to teach / want to share / at vs to the library / a kitchen → the kitchen / many vs much / glasses / quarter past. Пояснення давати, але дозувати.",
      },
      {
        title: "Picture description",
        text: "Пішов правильним шляхом: сцена → люди → предмети → місце → одяг → дія. I see a kitchen. There are two people. There is a fridge. She sits at the table. She wears glasses.",
      },
    ],
    gaps: [
      {
        title: "He/she/it + -s",
        text: "Знає правило, але автоматизму немає: He ask → asks, He sell → sells, She go → goes, He fix → fixes. Не пояснювати знову — 3–5 хв drill майже на кожному уроці.",
        pairHead: { left: "I", right: "He / She" },
        pairs: [
          { left: "I work", right: "He works" },
          { left: "I play", right: "She plays" },
          { left: "I fix bikes", right: "He fixes bikes" },
          { left: "I go to school", right: "She goes to school" },
          { left: "I study", right: "He studies" },
        ],
      },
      {
        title: "In / on / at / to",
        text: "Сам назвав головною проблемою. Тренувати chunks і контрастні пари, не «переклад прийменника». go to the library = рух; study at the library = дія там; in the kitchen = всередині; at the table = за столом; on the table = на поверхні.",
        pairHead: { left: "Chunk", right: "Значення" },
        pairs: [
          { left: "at home / at work / at school", right: "удома / на роботі / у школі" },
          { left: "at the library / at the table", right: "у бібліотеці / за столом" },
          { left: "in the kitchen / in the cupboard", right: "у кухні / у шафці" },
          { left: "on the table / on the wall", right: "на столі / на стіні" },
          { left: "go to work / school / bed", right: "іти на роботу / до школи / спати" },
        ],
      },
      {
        title: "To + verb vs -ing",
        text: "На уроці змішались різні «to / -ing». Розвести по уроках, не складати в одну купу.",
        bullets: [
          "Present Continuous: I am reading now.",
          "like/love + -ing: I like reading.",
          "want + to + verb: I want to read.",
          "go to + place: I go to school.",
        ],
      },
    ],
    corrections: [
      {
        title: "To не «робить слово дієсловом»",
        text: "eat уже дієслово. to eat — infinitive. I eat — Present Simple. I want to eat — want + to + verb. Не правило «що робити = to», а готові моделі.",
      },
      {
        title: "play без to — не іменник «гра»",
        text: "I play games — дієслово. a play — п’єса. game — гра. Для Петра зараз: game / play / to play. Тему не розширювати.",
      },
      {
        title: "I go to eat / I go to bed",
        text: "I go to eat без місця звучить неприродно. Краще: I go to the kitchen to eat. I have breakfast. Chunk: I go to bed at 11. (лягти) vs I go to sleep at 11. (заснути).",
      },
    ],
    teacherGood: [
      "Живий тон: жарти, ранок, кава; учень сам назвав, що хоче тренувати (-s, picture, in/on/at/to, час, adjectives).",
      "Багато типів практики: warm-up, gist/detail listening, retelling, noticing, vocab, picture, time, speaking, reflection.",
      "Граматика з контексту аудіо, професій, кухні й звичок учня — не ізольована теорія.",
      "Конкретна похвала: зрозумів аудіо, описав людей і кімнату, назвав час, ужив Present Simple.",
    ],
    teacherImprove: [
      "Звузити урок. Це був матеріал на два: 36A listening + Present Simple + -s + retell; 36B picture + there is/are + prepositions + clothes + time.",
      "Не розбирати I want you to do this / Complex Object на A1 — лише як цікавий приклад, без очікування засвоєння.",
      "У retelling дати 30–60 сек договорити, потім 2–3 помилки: he asks, she goes, he fixes bikes.",
      "Зафіксувати 5 кроків опису: In the picture I can see… → There is/are… → The people are… → They are wearing… → The objects are in/on/at…",
    ],
    nextGoal: "Describe people and pictures accurately.",
    nextGrammar: [
      "he/she/it + -s",
      "in / on / at",
      "there is / there are",
      "has got / wears",
      "прості прикметники",
      "8–10 предметів",
    ],
    nextFlow: [
      {
        time: "5 хв",
        title: "Warm-up",
        text: "I work — he works. I play — she plays. I go — he goes. I fix — she fixes. I study — he studies.",
      },
      {
        time: "8 хв",
        title: "Prepositions",
        text: "Тільки chunks: in the kitchen, on the table, at the table, at work, at home, go to work, go to the library.",
      },
      {
        time: "7 хв",
        title: "Model",
        text: "In the picture, I can see a kitchen. There are two people at the table. There is a fridge near the window. The woman has fair hair and wears glasses. The man wears a tie.",
      },
      {
        time: "10 хв",
        title: "Controlled speaking",
        text: "Інша картинка + шаблон: I can see… There is/are… has… wears… sits/stands… is in/on/at…",
      },
      {
        time: "10 хв",
        title: "Listening",
        text: "Коротке аудіо. Лише 4 речі: name, job, place, one habit.",
      },
      {
        time: "5 хв",
        title: "Reflection",
        text: "What was easy? What was difficult? What do you want to practise next time?",
      },
    ],
    homework: [
      "Одна картинка → 6–8 речень за шаблоном.",
      "Підкреслити he/she/it з -s і прийменники in/on/at.",
      "Voice message 30–45 сек з описом.",
    ],
    takeaway:
      "Петро вже розуміє контекст на слух і хоче пояснити, що почув. Далі потрібна автоматизація, не нові великі правила. Залишити listening + speaking + персоналізацію, але наступні уроки робити вужчими, щоб не тримати в голові Present Simple, infinitive, there is/are, articles, prepositions, appearance і time одночасно.",
  },
];

export function getLessonAnalysis(id: string): LessonAnalysis | undefined {
  return lessonAnalyses.find((item) => item.id === id);
}

export function hasLessonAnalysis(id: string): boolean {
  return lessonAnalyses.some((item) => item.id === id);
}
