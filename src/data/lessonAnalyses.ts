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
  {
    id: "39",
    title: "Have you got it?",
    topic: "have / has got · travel · short answers · possessives",
    lessonPath: "/lesson-39",
    lead:
      "Урок 39 був корисним і достатньо розмовним: ви повторили have got, питання та короткі відповіді, лексику для подорожей, possessive ’s і зв’язок між граматикою та професійним контекстом барбера. Але урок місцями розпадався на багато мікротем, тому Петро почав втрачати опору — особливо в have got, has got, артиклях і possessives.",
    result: [
      "головна тема have got / has got підібрана вдало: зовнішність, family, речі в сумці, подорож, предмети в роботі, питання про наявність;",
      "працював із моделями: I’ve got…, She’s got…, Have you got…?, Yes, I have / No, I haven’t, Has he got…?, What have you got in your bag?;",
      "це саме той функціональний рівень, який потрібен йому зараз.",
    ],
    strengths: [
      {
        title: "Базове значення have got",
        text: "Одразу згадав, що have got = «У мене є». Розуміє використання для зовнішності, сім’ї, речей, сумки, подорожі. Приклади: I’ve got green eyes and brown curly hair. I’ve got a mother. I’ve got a job. Sam has got a passport / a phone / money / tickets. Хороший фундамент.",
      },
      {
        title: "Питання Have you got…?",
        text: "Впізнав структуру з аудіо: Have you got your passport / camera / tickets? Has it got a restaurant? Поступово почав розуміти короткі відповіді: Yes, I have. No, I haven’t. Yes, he has. No, she hasn’t. Короткі відповіді — одна з найкращих вправ на автоматизацію have/has.",
      },
      {
        title: "Лексика для подорожей",
        text: "Практична: bottle of water, camera, coat, credit card, food, money, passport, phone, sunglasses, tickets, bag. Добре для speaking — може уявити себе в поїздці, а не лише механічно називати предмети.",
      },
      {
        title: "Просить більше питань",
        text: "Сам сказав, що хоче більше питань, перемішаних завдань, менш передбачуваної домашки й практики без очевидних підказок. Хороший знак: уже не хоче лише «впізнати» відповідь, а перевірити, чи може сам обрати структуру.",
      },
    ],
    gaps: [
      {
        title: "Have got, have і got змішуються",
        text: "Казав: Yes, I have ticket. Yes, I got phone. I got a water. I got a client’s hair. Структура ще не закріпилась як цілісний блок. На уроці не давати поруч I have / I have got / I’ve got / I got / I take / I will take / I would take — для A1 це легко змішується.",
        pairHead: { left: "Значення", right: "Форма" },
        pairs: [
          {
            left: "У мене є",
            right: "I have got a ticket. / I’ve got a ticket.",
          },
          { left: "Чи в тебе є?", right: "Have you got a ticket?" },
          { left: "Так (I)", right: "Yes, I have." },
          { left: "Ні (I)", right: "No, I haven’t." },
          {
            left: "У нього є",
            right: "He has got a ticket. / He’s got a ticket.",
          },
          { left: "Чи в нього є?", right: "Has he got a ticket?" },
          { left: "Так (he)", right: "Yes, he has." },
          { left: "Ні (he)", right: "No, he hasn’t." },
        ],
      },
      {
        title: "I got ≠ I’ve got",
        text: "I’ve got a phone. = У мене є телефон. I got a phone. = Я отримав / купив телефон у минулому. На Have you got a phone? не можна Yes, I got a phone. Краще: Yes, I have. / Yes, I’ve got a phone. Зробити окремою короткою вправою на наступному уроці.",
      },
      {
        title: "Would, will і Present Simple в одному блоці",
        text: "У travel speaking з’явились I would take / I will take / I take — усі можуть бути правильними, але означають різне. Для A1 не вводити умовність через would. Простіше: For a trip, I take a passport, money and my phone. або I need a passport, money and tickets.",
        pairHead: { left: "Форма", right: "Значення" },
        pairs: [
          {
            left: "I take a passport on trips.",
            right: "Я зазвичай беру паспорт у поїздки",
          },
          { left: "I will take a passport.", right: "Я візьму паспорт" },
          { left: "I would take a passport.", right: "Я б взяв паспорт" },
        ],
      },
      {
        title: "Have got не означає «взяти»",
        text: "Учень інтерпретував Have you got your ticket? як «Ти взяв квиток?». У контексті подорожі українською так іноді перекладають, але граматично: «У тебе є квиток із собою?» Розрізнити: Have you got…? / Did you take…? / Did you buy…? Для A1 один переклад: Have you got your ticket? = «Квиток із собою є?»",
      },
    ],
    corrections: [
      {
        title: "Hair — незлічуваний іменник",
        text: "Не тому що «множина», а тому що hair — маса волосся (як water). I’ve got brown hair. She has got long hair. I am cutting a client’s hair. Але: There is a hair on my shirt. I found two hairs on the table. — окремі волосини.",
      },
      {
        title: "A job vs a favourite job",
        text: "I have got a favourite job. граматично можливо, але неприродно. Краще: I have got a job. / I like my job. / I love my job. Мрія: My dream job is a barber.",
      },
      {
        title: "I have got a mother",
        text: "Граматично правильно, але в розмові звучить дивно. Краще: My mother’s name is… I have got one brother. I haven’t got any children. My mother is retired.",
      },
      {
        title: "Money і bottle of water",
        text: "Money — незлічуване: I have got money. I haven’t got any money. Have you got any money? Не a water, а a bottle of water (окрім замовлення напою в кафе).",
      },
      {
        title: "Possessive ’s — три моделі",
        text: "У блоці your sister / your sister’s camera / my mom’s cup учню стало складно через неоднозначні формулювання. Розділити: (1) possessive adjective — your sister; (2) possessive ’s — your sister’s camera; (3) question about possession — Has your sister got a camera? У родинному контексті природніше my/your/his/her sister.",
      },
    ],
    teacherGood: [
      "Почала з реальних помилок: написав → розібрали → зрозумів → повторив. Повернулась до I am cutting a client’s hair now і How many clients do you see every day? — професійно значущі речення.",
      "Listening у коротких блоках: passport, money, camera, phone, tickets — коротке, з повторюваною структурою, прогнозованою темою, простими питаннями й короткими відповідями.",
      "Багато speaking prompts і travel role-play: Have you got your passport / tickets / money / a bottle of water? What have you got in your bag?",
    ],
    teacherImprove: [
      "Не змішувати всі форми have на одному уроці. Обрати одну модель Have got = have і працювати лише з I’ve got… / Have you got…? / Yes, I have / No, I haven’t / Has he got…? Не додавати I got / I take / I will take / I would take / I want to take на тому самому занятті.",
      "Скоротити pronunciation focus: порівняння BE/AmE beard/girl/got цікаве, але відтягує фокус. Максимум два chunks: Have you got…? Yes, I have. / I’ve got… a bottle of water.",
      "Давати менш неоднозначні word-order tasks: you / got / a / ticket → Have you got a ticket? your sister / got / a / camera → Has your sister got a camera? what / you / got / in / your bag → What have you got in your bag?",
    ],
    nextGoal: "Have got consolidation — не нова граматика, а коротка автоматизація.",
    nextGrammar: [
      "I’ve got… / I haven’t got…",
      "Have you got…?",
      "Yes, I have / No, I haven’t",
      "Has he/she got…?",
      "Yes, he has / No, she hasn’t",
      "What have you got in your bag?",
    ],
    nextFlow: [
      {
        time: "5 хв",
        title: "Quick review",
        text: "I’ve got… / I haven’t got…",
      },
      {
        time: "10 хв",
        title: "Have you got…?",
        text: "Короткі відповіді: Yes, I have / No, I haven’t.",
      },
      {
        time: "10 хв",
        title: "Has he/she got…?",
        text: "Yes, he has / No, she hasn’t.",
      },
      {
        time: "10 хв",
        title: "What have you got in your bag?",
        text: "Учень говорить 4–5 речень. Обмежений словник: passport, phone, ticket, money, camera, bag, bottle of water, sunglasses.",
      },
      {
        time: "10 хв",
        title: "Travel role-play",
        text: "Airport / train station check.",
      },
      {
        time: "5 хв",
        title: "Exit check",
        text: "Без підказок: 4 твердження, 2 питання, 2 короткі відповіді.",
      },
    ],
    homework: [
      "8 слів: passport, phone, ticket, money, camera, bag, bottle of water, sunglasses.",
      "Написати 6–8 речень: I’ve got… / I haven’t got…",
      "3 питання Have you got…? і відповіді Yes, I have / No, I haven’t.",
      "Voice message 30–45 сек: What have you got in your bag?",
    ],
    takeaway:
      "Урок 39 мав хорошу основу й практичну тему. Учень уже розуміє, що have got — це «мати», може впізнати питання в аудіо і починає відповідати короткими формами. Але зараз йому потрібна не нова граматика, а багато коротких повторів однієї моделі: I’ve got… / I haven’t got… / Have you got…? / Yes, I have / No, I haven’t / Has he got…? / Yes, he has / No, he hasn’t. Якщо ця система стане автоматичною, він значно впевненіше описуватиме себе, сім’ю, зовнішність, речі, сумку, роботу й поїздки.",
  },
];

export function getLessonAnalysis(id: string): LessonAnalysis | undefined {
  return lessonAnalyses.find((item) => item.id === id);
}

export function hasLessonAnalysis(id: string): boolean {
  return lessonAnalyses.some((item) => item.id === id);
}
