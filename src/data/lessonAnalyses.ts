export type AnalysisPair = { left: string; right: string };

export type AnalysisSection = {
  title: string;
  text: string;
  bullets?: string[];
  pairs?: AnalysisPair[];
  pairHead?: AnalysisPair;
  /** Visual accent on cards / gap blocks */
  tone?: "ok" | "warn" | "tip";
  /** Short student quote or key phrase */
  quote?: string;
};

export type LessonAnalysis = {
  id: string;
  title: string;
  topic: string;
  lessonPath: string;
  lead: string;
  /** One-line teacher signal under the lead */
  signal?: string;
  /** Topic chips: what the lesson touched */
  covered?: string[];
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
  resultHeading?: string;
  takeawayHeading?: string;
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
  {
    id: "40",
    title: "Dos and don'ts",
    topic: "articles · possessive ’s · imperatives · London · corrections",
    lessonPath: "/lesson-40",
    lead:
      "Урок 40 був корисним як урок корекції та закріплення, особливо для артиклів, possessive ’s, Present Simple/Continuous і базових imperatives. Учень добре працював із виправленням помилок і почав чіткіше розрізняти a client / the client / my client, але урок вийшов перевантаженим через різку зміну тем: corrections → article practice → imperatives → London reading → pronunciation → travel advice → професійні фрази.",
    result: [
      "почав усвідомлювати різницю: I’m cutting hair / a client’s hair / my client’s hair / the client’s hair;",
      "сам попросив більше вправ на a/an/the, де спочатку з’являється новий предмет, а далі він стає конкретним — правильний наступний крок;",
      "добре працював із error correction і почав співвідносити правило зі своїм письмом.",
    ],
    strengths: [
      {
        title: "Error correction",
        text: "Знаходив або приймав виправлення: I have got (не I hve got); She is a colourist; My friends’ names are Anna and Mykola; I love reading; I am from Sevastopol; assistant; I am a barber; They are working now; She sometimes drinks water; We are sitting now. Уже не лише слухає пояснення, а співвідносить правило з письмом.",
      },
      {
        title: "Логіка множини + possessive",
        text: "Розібрали My friends’ names are Anna and Mykola: friends — двоє; апостроф після s — імена належать багатьом; names — множина, бо два імені. Гарна інтеграція plural + possessive apostrophe + noun agreement.",
      },
      {
        title: "Have / has",
        text: "Згадав базову систему: I/you/we/they have; he/she/it has. Важливий місток від have got (урок 39) до базового have/has.",
      },
      {
        title: "Imperatives · London",
        text: "Практичні моделі: Visit the British Museum. Don’t take taxis. Go to Greenwich. Take photos. Try Indian food. Drink English tea. See a show. Take a coat. Base verb без you; негатив — don’t + base verb. Короткі ready-made chunks для travel English.",
      },
      {
        title: "Пам’ять на загальний зміст",
        text: "Повернувшись до порад для Лідії в Лондоні, згадав частину: Don’t take taxis. Go to Greenwich. Take photos. Try Indian food. Drink English tea. See a show. Тримав логіку: Lydia → London work trip → friends give travel advice.",
      },
    ],
    gaps: [
      {
        title: "Артиклі: правило знає, контекст ще ні",
        text: "Знає формулу: a/an — нове; the — конкретне; my/his/her — чий. Але важко автоматично в a client’s / my client’s / the client’s hair. Не давати десятки пояснень — одна модель за раз. Злічуваний іменник в однині не стоїть сам: потрібні a/an, the, my, his, this тощо.",
        bullets: [
          "I have a client. The client is waiting.",
          "I am cutting the client’s hair.",
          "My client has brown hair. I am cutting my client’s hair.",
          "I see a door. The door is green. / I have a phone. The phone is new.",
        ],
      },
      {
        title: "I’m living — відтінок тимчасовості",
        text: "I am living in a small town now — не помилка. Present Continuous із live можливий для тимчасової ситуації: I’m living with my sister this month. Але постійний факт природніше: I live in Sofiivska Borshchahivka. Не казати, що I’m living «не зовсім нормально» — нормально, але означає «around now».",
      },
      {
        title: "Hair знову неточно",
        text: "Hair — незлічуване, коли про волосся загалом: She has brown hair. I cut hair. A hair / two hairs — окремі волосини: There is a hair on the table. Не пов’язувати відсутність артикля з множиною — учень уже плутається в singular/plural.",
      },
      {
        title: "Work trip → business trip",
        text: "I have a work trip to London next week. зрозуміло, але природніше: I have a business trip to London next week. або I’m going to London for work next week.",
      },
      {
        title: "Pronunciation забрав забагато часу",
        text: "Багато повернень до really, taxi/taxis, there/they’re, very, museum, Greenwich, good, show, coat. Вимова конкурувала з головною метою. На одному уроці 2–3 targets, наприклад: Greenwich, museum, taxis. Решту прийняти як достатньо зрозуміле.",
      },
    ],
    corrections: [
      {
        title: "a / the / my client’s hair",
        text: "I’m cutting hair — загальна професійна дія. …a client’s hair — якогось одного клієнта. …my client’s hair — мого клієнта. …the client’s hair — того конкретного, про якого вже говоримо або якого обоє бачимо.",
      },
      {
        title: "✅ / ⚠️ / ❌ замість змішаних сигналів",
        text: "I’m living… — ✅ correct, але ⚠️ інший відтінок (тимчасовість). I have a favourite job — ⚠️ можливо, але неприродно. I work in a barbershop — ✅; at a barbershop часто природніше. Are clients friendly? — ✅; Are your clients friendly? точніше. Три позначки: Correct / Correct but different meaning or less natural / Incorrect.",
      },
      {
        title: "Imperatives — одна схема",
        text: "Пояснення розсіялося між вимовою, London vocab і перекладом. Потрібна одна таблиця: Visit the museum. / Don’t visit the museum. Take photos. / Don’t take photos. Imperative = base form без you; негатив = don’t + verb.",
        pairHead: { left: "Позитивна порада", right: "Негативна" },
        pairs: [
          { left: "Visit the museum.", right: "Don’t visit the museum." },
          { left: "Take photos.", right: "Don’t take photos." },
          { left: "Try Indian food.", right: "Don’t try it." },
          { left: "Drink tea.", right: "Don’t drink coffee." },
          { left: "Go to Greenwich.", right: "Don’t go to Oxford Street." },
        ],
      },
    ],
    teacherGood: [
      "Системно повернулась до помилок учня: Time to Fix It — помилки не «караються», а стають точками росту. Змусила побачити іменник, артикль, множину, possessive, Present Continuous, base form.",
      "Конкретний професійний контекст барбера: I cut hair. I am cutting a client’s hair. I work at a barbershop. I never work at a barbershop on Sundays. How many clients do you see every day? My clients are often funny.",
      "London text об’єднав city vocab, directions, imperatives, travel, adjectives, reading in chunks і speaking advice про Kyiv / Sofiivska Borshchahivka.",
      "Підтримувала, коли помилявся: можна пробувати й питати, не чекати «ідеальної» відповіді. Петро часто каже «не знаю» / «не можу» — йому потрібна ця безпечна атмосфера.",
    ],
    teacherImprove: [
      "Не перетворювати пояснення на довге «розмусолювання». Учень сам просив більше практики («Треба більш практики», «Можеш мені зробити пару речень?»). Після a client → the client → my client — одразу 5 коротких речень, потім підстановка client→friend, hair→beard, phone→camera.",
      "Чіткіше розділяти «правильно» і «природніше» позначками ✅ / ⚠️ / ❌, щоб він не думав, що все не-найкраще = неправильне.",
      "Imperatives подати як одну просту схему (позитив / don’t), не розсіювати між вимовою й London vocab.",
      "Не відволікатися на складні нюанси в момент втоми (the opera, capital letters, underground vs subway, uncountable, конкретний vs неконкретний barbershop). Завершити простим outcome: Give me three recommendations for Kyiv.",
    ],
    nextGoal:
      "Article + possessive practice — автоматично відрізняти a / the / my client і a/my/the client’s hair.",
    nextGrammar: [
      "a client → the client",
      "my / his / her",
      "possessive ’s",
      "a client’s / my client’s / the client’s hair",
    ],
    nextFlow: [
      {
        time: "8 хв",
        title: "Block 1: a → the",
        text: "I see a client. The client is waiting. The client has brown hair.",
      },
      {
        time: "8 хв",
        title: "Block 2: my / his / her",
        text: "My client is waiting. His hair is short. Her hair is long.",
      },
      {
        time: "10 хв",
        title: "Block 3: possessive ’s",
        text: "The client’s hair is short. My friend’s phone is new. My teacher’s bag is black. Лексика: client, hair, beard, phone, bag, ticket, friend, teacher.",
      },
      {
        time: "10 хв",
        title: "Block 4: speaking",
        text: "I have a client now. The client is sitting in the chair. I am cutting my client’s hair.",
      },
      {
        time: "5 хв",
        title: "Substitution drill",
        text: "Підставити: client → friend; hair → beard; client → sister; phone → camera.",
      },
    ],
    homework: [
      "6–8 слів: client, hair, beard, phone, bag, ticket, friend, teacher.",
      "Написати 8 речень: a → the → my / his / her.",
      "3 речення з possessive ’s: The client’s… / My friend’s… / My teacher’s…",
      "Voice message 30–45 сек: I have a client now… I am cutting my client’s hair.",
    ],
    takeaway:
      "Урок 40 добре виконав роль корекційного: учень повторив багато важливих помилок і почав бачити логіку артиклів та приналежності. Найсильніші частини — професійні фрази барбера, London imperatives і робота з already-made mistakes. Головне змінити далі: після короткого пояснення — більше швидких однотипних прикладів. Він уже не потребує ще десяти пояснень a/the; йому потрібно 15 коротких речень, де він сам вибере форму й одразу почує, чому вона правильна.",
  },
  {
    id: "41",
    title: "What's the time?",
    topic: "tell the time · days · schedules · listening · Present Simple",
    lessonPath: "/lesson-41",
    lead:
      "Урок 41 був корисним як повторення часу, днів тижня, Present Simple та розуміння коротких listening dialogues. Учень добре впорався з логікою розкладу й поступово став точніше використовувати works / doesn’t work / has, але наприкінці уроку тема змішалася з непройденими структурами на кшталт ask if / verb-ing after about, через що він закономірно заплутався.",
    result: [
      "повторив, як називати час: o’clock, past, to, half past, quarter past, quarter to;",
      "повторив What time is it? і почав розрізняти What time is it? / What time does the train leave? / What time does the lesson start/end?;",
      "повторив дні тижня; закріпив on Monday, in the morning, at night, at the weekend; краще зрозумів Monday to Friday;",
      "потренував Present Simple через work schedules; помітив has у She has history class on Wednesday;",
      "впізнавав основну інформацію у listening. Це хороший урок на закріплення A1-бази.",
    ],
    strengths: [
      {
        title: "Базова логіка часу",
        text: "Може впізнати або побудувати: It’s five past ten. It’s quarter past four. It’s half past eleven. It’s quarter to five. It’s five to five. It’s ten to seven. It’s three p.m. Розуміє орієнтири на годиннику: 12 → o’clock; 3 → quarter past; 6 → half past; 9 → quarter to. Це базова A1-система для називання часу.",
      },
      {
        title: "«Котра година?» vs «о котрій?»",
        text: "Важливий результат: What time is it? → It’s seven forty-five. What time does the train leave? → It leaves at 7:45. What time does the lesson start/end? → It starts/ends at…. Почув різницю: It’s 7:45 (поточний час) vs It’s at 7:45 (коли відбувається щось конкретне).",
      },
      {
        title: "Дні тижня",
        text: "Повторив Monday–Sunday, weekdays, the weekend. Почав використовувати on Monday / on Tuesday / on Fridays / at the weekend / Monday to Friday. Добре помітив у listening I work Monday to Friday і зрозумів: «з понеділка по п’ятницю».",
      },
      {
        title: "Третя особа в контексті",
        text: "Сильний момент: She doesn’t work on Wednesday. She sometimes works on Saturday. The woman has history class on Wednesday. Почув і відтворив doesn’t work / works / has — увага до -s зміцнюється.",
      },
      {
        title: "Listening gist",
        text: "Не завжди пам’ятав усі слова, але витягував головне: хто коли працює / навчається; хто грає в soccer; коли вихідний; чому не вчиться в неділю; що означає Monday to Friday. Добра ознака росту comprehension.",
      },
    ],
    gaps: [
      {
        title: "Час треба автоматизувати",
        text: "Знає елементи past / to / half past / quarter to, але в момент відповіді плутає порядок (11 half, ten seven…). Не додаткові пояснення — короткі швидкі drills від цифр до одного spoken variant.",
        pairHead: { left: "Цифри", right: "Сказати" },
        pairs: [
          { left: "6:15", right: "quarter past six" },
          { left: "6:30", right: "half past six" },
          { left: "6:45", right: "quarter to seven" },
          { left: "6:50", right: "ten to seven" },
        ],
      },
      {
        title: "On / in / at нестабільні",
        text: "Плутав at Tuesday, at the morning, on the morning, at weekend, on weekend. Одна стабільна таблиця + BrE at the weekend (AmE: on the weekend).",
        pairHead: { left: "Коли?", right: "Прийменник · приклад" },
        pairs: [
          { left: "День тижня", right: "on · on Monday" },
          { left: "Частина дня", right: "in · in the morning" },
          { left: "Ніч", right: "at · at night" },
          { left: "Точний час", right: "at · at 7:30" },
          { left: "Weekend (BrE)", right: "at the weekend" },
          { left: "Weekend (AmE)", right: "on the weekend" },
        ],
      },
      {
        title: "My week starts vs I work",
        text: "Намагався сказати щось на кшталт My week start at Tuesday. Розвести три моделі й питання.",
        pairHead: { left: "Питання", right: "Відповідь" },
        pairs: [
          {
            left: "When does your week start?",
            right: "My week starts on Tuesday.",
          },
          {
            left: "What days do you work?",
            right: "I work Tuesday to Thursday.",
          },
          {
            left: "When are your days off?",
            right: "My days off are Monday and Friday.",
          },
          {
            left: "When don’t you work?",
            right: "I don’t work on Mondays and Fridays.",
          },
        ],
        bullets: [
          "My week starts on Tuesday.",
          "I work from Tuesday to Thursday.",
          "I work on Tuesday and Thursday.",
          "My days off are Monday and Friday.",
        ],
      },
      {
        title: "Reported speech / -ing наприкінці",
        text: "З’явилось: He asks when she plays soccer. He asks if they can play soccer together at the weekend. He asks about playing soccer together. Це вже reported questions, if, can, gerund after about — для A1 занадто великий стрибок. Петро сказав «Незрозуміло» / «Треба більше домашки» / просив практику play / -ing. Це не провал простого правила — зіткнувся з темою, яку системно ще не проходили.",
      },
    ],
    corrections: [
      {
        title: "What time is our train?",
        text: "Фраза можлива в розмовній англійській, але для учня краще точніші моделі: What time is the train? What time does the train leave? What time does the train arrive? Для A1 найкраще: What time does the train leave? — It leaves at 7:45.",
      },
      {
        title: "the end vs the lesson ends",
        text: "Добре розвели іменник the end і дієслово the lesson ends. Але твердження «якщо немає артикля — автоматично дієслово» неточне: water / people / books / work залежать від ролі в реченні. Краще: артикль часто показує злічуваний іменник в однині; відсутність артикля ≠ автоматично дієслово — дивись роль слова.",
      },
      {
        title: "at the weekend",
        text: "Правильно дали BrE at the weekend. Корисно одразу сказати: on the weekend — AmE. Обидва зрозумілі; активним лишаємо at the weekend.",
      },
      {
        title: "on Saturday morning",
        text: "Правильно: She studies on Saturday morning — on, бо конкретний день + частина дня (on Tuesday afternoon / on Friday evening). Але: in the morning / in the evening / at night. Хороший матеріал для короткої практики наступного разу.",
      },
    ],
    teacherGood: [
      "Почала з уже знайомої теми: після articles / have got / possessives повернення до часу й days of the week дало відчуття «я вже щось знаю».",
      "Багато listening: короткі тематичні діалоги (work / study / sports schedule, days off, weekend) — Петро краще ловить мову в живому контексті, ніж у чистій таблиці.",
      "Конкретна похвала за doesn’t work / works / has — підкріплює, що він реально просувається.",
      "Адаптувала запити учня (змішана домашка, -ing, складніші речення): не кинулась у нову тему посеред уроку, але зафіксувала інтерес і 15–20 хв наступного разу.",
    ],
    teacherImprove: [
      "Менше фонетичних зупинок у середині meaning task (Tuesday, Saturday, really, taxi/taxis, there/they’re, Greenwich, together). Спочатку зміст → короткий правильний paraphrase → наприкінці 2–3 слова на вимову.",
      "Не розбирати непройдену граматику без рамки. Достатньо: «Це складніша конструкція. Сьогодні не запам’ятовуємо — лише розуміємо зміст: він питає, чи можуть вони грати разом.»",
      "На початку озвучувати один main topic: Today we have one main topic: time and schedules. Reported speech у аудіо — тільки gist, не окрема граматика.",
    ],
    nextGoal:
      "Days + time + routine speaking — без нової складної граматики. Коли працює / не працює / вихідні; о котрій починає й закінчує; що робить вранці / вдень / увечері.",
    nextGrammar: [
      "I work from… to… / on…",
      "I don’t work on…",
      "My days off are…",
      "I start / finish work at…",
      "on Thursday evening · at the weekend",
    ],
    nextFlow: [
      {
        time: "5 хв",
        title: "Warm-up · clock drills",
        text: "6:15 / 6:30 / 6:45 / 6:50 → quarter past / half past / quarter to / ten to.",
      },
      {
        time: "10 хв",
        title: "My schedule",
        text: "I work from Tuesday to Thursday. I work on Saturday and Sunday. I don’t work on Mondays and Fridays. My days off are Monday and Friday.",
      },
      {
        time: "10 хв",
        title: "Start / finish",
        text: "I start work at 10 a.m. I finish work at 8 p.m. I study English on Thursday evening. I play games at the weekend.",
      },
      {
        time: "10 хв",
        title: "Mini-dialogue",
        text: "What days do you work? When are your days off? What time do you start work? What do you do at the weekend?",
      },
      {
        time: "5 хв",
        title: "Exit check",
        text: "4 речення про свій тиждень без підказок + 2 питання What time…?",
      },
    ],
    homework: [
      "12 змішаних UA→EN речень без підказок:",
      "1. Я працюю з понеділка по п’ятницю.",
      "2. Я не працюю в неділю.",
      "3. Мої вихідні — понеділок і п’ятниця.",
      "4. Я починаю роботу о десятій.",
      "5. Я закінчую роботу о восьмій вечора.",
      "6. Я граю у відеоігри на вихідних.",
      "7. Вона навчається в суботу вранці.",
      "8. Він працює вночі.",
      "9. Ми зустрічаємося у вівторок увечері.",
      "10. О котрій починається урок?",
      "11. Урок починається о шостій п’ятнадцять.",
      "12. О котрій закінчується потяг? (учень має помітити й виправити на leave / arrive)",
    ],
    takeaway:
      "Урок 41 дав хороший результат у темах time, days, schedules і listening. Петро вже краще використовує works / doesn’t work, has, on Monday, in the morning, at night, at the weekend, Monday to Friday, starts / ends at…. Найбільший ризик — наприкінці зайшли в reported speech і -ing after prepositions раніше, ніж він готовий. Наступний урок краще використати для автоматизації вже зрозумілого: час + розклад + дні тижня + рутина.",
  },
  {
    id: "42",
    title: "My week · A long journey",
    topic: "routine · days · on/in/at · transport · listening",
    lessonPath: "/lesson-42",
    lead:
      "Урок 42 був корисним як системне повторення, але вийшов ширшим за план: час, daily routine, days, prepositions of time, reading, transport і homework. Петро добре розуміє Present Simple, але його запит зараз — не ще один великий review, а коротка автоматизація слабких місць і поступовий перехід до Past Simple.",
    signal:
      "Наприкінці він прямо сказав, що очікував Past Simple. Повторення потрібне — але компактніше, з чітким кроком у нову тему.",
    covered: [
      "telling the time",
      "o’clock · past · to · half · quarter",
      "morning · afternoon · evening · night · midnight",
      "daily routine",
      "Present Simple · he/she/it + -s",
      "days of the week",
      "on Monday · in the morning · at night · at the weekend",
      "Monday to Friday · days off",
      "Mari’s week reading",
      "short answers with are",
      "word stress",
      "go to work · walk home · cycle · drive · leave · arrive",
    ],
    result: [
      "повторив час, routine, days, on/in/at, робочий графік і транспортні chunks;",
      "сам почав помічати works / doesn’t work / has у listening;",
      "зрозумів Monday to Friday = з понеділка по п’ятницю;",
      "склав кілька справжніх речень про свій тиждень і шлях на роботу;",
      "сам назвав слабкі місця: at work / to work / go home / at school — конкретні блоки, не «все складно».",
    ],
    strengths: [
      {
        title: "Час · базова логіка",
        tone: "ok",
        text: "Упізнає й частково називає half past, quarter past / to, five to, ten to, twelve o’clock, midnight. Швидка відповідь ще плутається, але логіку «до / після» вже чує — і сам помічає, коли відповідь нелогічна (наприклад half past eleven ↔ 11:30).",
        bullets: [
          "half past seven",
          "quarter past… / quarter to…",
          "five to five · ten to seven",
          "twelve o’clock · midnight",
        ],
      },
      {
        title: "Listening · Present Simple -s",
        tone: "ok",
        quote:
          "She doesn’t work on Wednesday. · She sometimes works on Saturday. · The woman has history class on Wednesday.",
        text: "Почув doesn’t work / works / has і зрозумів, що в третій особі форми інші. Правило he/she/it + -s починає переходити зі свідомого знання в listening recognition.",
      },
      {
        title: "Monday to Friday",
        tone: "ok",
        text: "Спочатку сприйняв як «лише Monday and Friday». Після пояснення закріпив: Monday to Friday = з понеділка по п’ятницю — ключова конструкція для графіка.",
        bullets: [
          "I work Monday to Friday.",
          "I study from Tuesday to Thursday.",
          "My week starts on Tuesday and ends on Sunday.",
        ],
      },
      {
        title: "Самостійні речення",
        tone: "ok",
        text: "Уже комбінує знайомі слова, а не лише повторює готову фразу.",
        bullets: [
          "I study English on Mondays.",
          "On Tuesday, I go to university.",
          "I get up late on Saturdays.",
          "On Sundays, I watch TV.",
          "I work in a bookshop. · I go to work. · I walk home.",
          "I drive to my parents’ house.",
        ],
      },
      {
        title: "Самооцінка",
        tone: "tip",
        quote: "at work · to work · go home · at school · місця й напрямки",
        text: "Сам сформулював потребу: плутається в місцях і напрямках. Це цінно — не «мені все складно», а конкретні мовні блоки для наступного drill.",
      },
    ],
    gaps: [
      {
        title: "Час ще не автоматизований",
        tone: "warn",
        text: "Розуміє пояснення, але швидко сказати час важко: half past / quarter past / quarter to, цифри vs слова, at 7:45 vs it’s 7:45. Не великий блок теорії — 3–5 хв швидких drills на кожному уроці.",
        pairHead: { left: "Цифри", right: "Сказати" },
        pairs: [
          { left: "6:15", right: "quarter past six" },
          { left: "6:30", right: "half past six" },
          { left: "6:45", right: "quarter to seven" },
          { left: "6:50", right: "ten to seven" },
          { left: "7:00", right: "seven o’clock" },
        ],
      },
      {
        title: "In / on / at нестабільні",
        tone: "warn",
        text: "Плутав at Tuesday, on the morning, at weekend, in/at a bookshop, go home / go to home, arrive at / to work. Не одне правило «at = локація» — запам’ятовувати chunks.",
        pairHead: { left: "Chunk", right: "Значення" },
        pairs: [
          { left: "on Monday / on Fridays", right: "у понеділок / по п’ятницях" },
          { left: "in the morning / evening", right: "вранці / увечері" },
          { left: "at night · at 7 p.m.", right: "вночі · о 7 вечора" },
          { left: "at the weekend (BrE)", right: "на вихідних" },
          { left: "at work · at school", right: "на роботі · у школі" },
          { left: "in the bookshop", right: "всередині книгарні" },
          { left: "go to work · go home", right: "на роботу · додому" },
          { left: "arrive at work", right: "прибути на роботу" },
        ],
        bullets: [
          "З днями → on",
          "З частинами дня → in",
          "З точним часом і night → at",
        ],
      },
      {
        title: "go / walk / drive / cycle",
        tone: "warn",
        quote: "I go to walk. · I circle to work. · I go by car to… · I drive car…",
        text: "Спочатку стабілізувати 7–8 готових transport chunks, не просити багато власних варіантів.",
        bullets: [
          "I walk to work. · I walk home.",
          "I go to work by bus / by train.",
          "I cycle to work.",
          "I drive to my parents’ house.",
          "I take a taxi. · I take a boat.",
        ],
      },
      {
        title: "Short answers · множина",
        tone: "tip",
        quote: "Are the week and the weekend very different for her? → Yes, they are.",
        text: "Підмет — два елементи (the week + the weekend), тому they. Окремий mini-drill на are / they are / they aren’t.",
        pairHead: { left: "Питання", right: "Відповідь" },
        pairs: [
          {
            left: "Are Monday and Friday busy?",
            right: "Yes, they are.",
          },
          {
            left: "Are your days off Monday and Friday?",
            right: "Yes, they are.",
          },
          {
            left: "Are your parents at home?",
            right: "No, they aren’t.",
          },
          {
            left: "Is your week busy?",
            right: "Yes, it is.",
          },
        ],
      },
    ],
    corrections: [
      {
        title: "What time is our train?",
        tone: "tip",
        text: "Зрозуміла фраза, але для A1 кращі точні моделі: What time does the train leave? — It leaves at 7:45. What time does the train arrive? — It arrives at 10:30. What time is the train? можливе розмовно — не робити головною моделлю.",
      },
      {
        title: "the end vs the lesson ends",
        tone: "tip",
        text: "the end — іменник; the lesson ends — дієслово. Не казати «немає артикля → автоматично дієслово»: без артикля бувають water / books / Kyiv і дієслова. Краще: артикль часто показує один злічуваний іменник; роль слова видно з усього речення.",
      },
      {
        title: "in a bookshop · at a bookshop",
        tone: "ok",
        text: "Обидва правильні. at a bookshop — місце роботи як заклад; in a bookshop — робота всередині. Для A1 активний варіант: I work at a bookshop. in — правильна альтернатива, без щоразу вибирати.",
      },
      {
        title: "My week starts / ends",
        tone: "ok",
        bullets: [
          "My week starts on Tuesday.",
          "My week ends on Sunday.",
          "I work from Tuesday to Thursday.",
          "I work Tuesday to Thursday.",
          "I don’t work on Mondays and Fridays.",
        ],
        text: "Правильна модель графіка — варто тримати як готовий набір.",
      },
      {
        title: "at the weekend (BrE)",
        tone: "ok",
        text: "BrE: at the weekend. AmE: on the weekend. Для курсу активний: I play games at the weekend.",
      },
    ],
    teacherGood: [
      "Повторення прив’язане до реального життя: графік, вихідні, уроки англійської, як дістається роботи.",
      "Давала час самому думати: підмет, дієслово, works/doesn’t, прийменник, Monday to Friday — не лише копіювати фразу.",
      "Конкретна похвала за doesn’t work / works / has — мікроперемоги закріплюють прогрес.",
      "Підлаштувалась під запит: більше письма, самостійні переклади, менш передбачувані завдання без готових підказок.",
    ],
    teacherImprove: [
      "Урок занадто широкий: time + routine + days + reading + stress + short answers + transport + leave/arrive (+ preview Past). Фактично два уроки в одному. Далі: нова тема з короткого warm-up зі старого.",
      "Не пояснювати нове правило у втомі (ask if / -ing after about / indirect questions). Достатньо: «Складніша конструкція. Сьогодні не вчимо — лише зміст: він питає, чи можуть вони грати.»",
      "Після пояснення on/in/at — rapid drill (10 швидких відповідей), а не довгий теоретичний діалог: Monday → on Monday; morning → in the morning; 7 p.m. → at 7 p.m.; weekend → at the weekend; Friday evening → on Friday evening.",
    ],
    nextGoal:
      "Talk about yesterday · Past Simple of be + 5–6 regular verbs (без великого списку irregular).",
    nextGrammar: [
      "yesterday · last night · last weekend",
      "I was / I wasn’t · You were…",
      "I worked · watched · played · walked · cooked · studied · visited",
      "Today I work. → Yesterday I worked.",
    ],
    nextFlow: [
      {
        time: "5 хв",
        title: "Warm-up review",
        text: "What time is it? What days do you work? What do you do at the weekend? How do you go to work?",
      },
      {
        time: "8 хв",
        title: "Today ↔ Yesterday",
        text: "I am tired → I was tired. I work → I worked. I play games → I played games. I watch TV → I watched TV.",
      },
      {
        time: "12 хв",
        title: "Personal yesterday",
        text: "Yesterday I worked. I watched TV. I played a game. I cooked dinner. I went to bed late. Поки без складних питань із did — спершу was/were + regular.",
      },
      {
        time: "8 хв",
        title: "Speak · mini story",
        text: "Учень розповідає вчорашній день 4–6 реченнями. Учитель лише підказує chunks.",
      },
      {
        time: "5 хв",
        title: "Exit",
        text: "Yesterday: what did you do? — коротка відповідь без таблиці.",
      },
    ],
    homework: [
      "HW42: Parts of the day · day/week writing · gaps · UA→EN routine · on/at · word order · travel R4 + flashcards + 2b.",
      "Додатково (опційно): 6 речень Yesterday I… з worked / watched / played / walked / cooked / studied.",
      "Voice 30–40 сек: Yesterday I… (без вимог до did-питань).",
    ],
    resultHeading: "Що реально закріпилось",
    takeawayHeading: "Короткий review → Past Simple",
    takeaway:
      "Урок 42 був продуктивним для повторення: час, графік, дні, prepositions, listening. Але мотивація Петра вже просить рух уперед. Найкращий наступний крок: короткий review → Past Simple with yesterday → проста особиста історія. Так збережеш систему й він відчує новий рівень.",
  },
];

export function getLessonAnalysis(id: string): LessonAnalysis | undefined {
  return lessonAnalyses.find((item) => item.id === id);
}

export function hasLessonAnalysis(id: string): boolean {
  return lessonAnalyses.some((item) => item.id === id);
}
