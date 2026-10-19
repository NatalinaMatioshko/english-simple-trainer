/** Full teacher run sheet for Lesson 50 · Make requests (book 6D) */

export const lesson50TeacherScript = {
  heading: "Сценарій уроку · Make requests · 6D (55–60′)",
  goal:
    "Петро робить і відповідає на ввічливі прохання за книгою: слухає Tom & Ana (6.17), повторює фрази (6.18), закриває фінал Can I / Can you.",
  speakingTopics: [
    "1 · Pictures A–F · назвати jobs",
    "2 · 6.17 · match conversations → pictures",
    "3 · Tom or Ana? who agrees",
    "4 · Useful phrases + how many requests",
    "4b · 6.18 · listen and repeat",
    "5a–b · dialogues + practise with teacher",
    "6a · 2–3 situations",
    "Final · 3 Can you + 2 Can I + answers",
  ],
  outcome: [
    "Can you wash the dishes / walk the dog / do the washing, please?",
    "Can I use your bike / cook dinner, please?",
    "Sure. · No problem. · I’m sorry, I can’t. · I’m sorry, you can’t.",
  ],
  focus: [
    "Can you + base verb + (please)?",
    "Can I + base verb + (please)?",
    "Yes: Sure / No problem / Yes, I/you can",
    "No: I’m sorry, I can’t / I’m sorry, you can’t",
  ],
  avoid: [
    "Could you…? / Would you mind…?",
    "пропускати 6.17 / 6.18",
    "усі 5 situations — обери 2–3",
    "Past Simple як нову тему",
  ],
  blocks: [
    {
      time: "Перед уроком",
      title: "Підготовка",
      do: [
        "Перевір аудіо: public/sounds/Unit_6/RM_A1_SB_U6_R17.mp3 і R18.mp3.",
        "Ключ Ex.2: 1C · 2E · 3D · 4B · 5F · 6A.",
        "Ex.4a: 8 requests (6× Can you + 2× Can I).",
      ],
    },
    {
      time: "0–3′",
      title: "Goal",
      say: [
        "Today’s goal: make requests. Can you help me? Can I use your pen?",
        "We listen to Tom and Ana, then you practise with me.",
      ],
    },
    {
      time: "3–12′",
      title: "1 · Pictures",
      do: [
        "Галерея A–F → усно назвати jobs → match для перевірки.",
      ],
      say: [
        "Look at Tom and Ana’s flat. What jobs around the house can you see?",
        "Picture A — what job?",
      ],
      expect: [
        "wash the dishes · go shopping · walk the dog · do the washing · clean the bathroom · make the bed",
      ],
    },
    {
      time: "12–25′",
      title: "2–3 · Listen 6.17",
      do: [
        "Програй 6.17 цілком. Match 1–6 → A–F. Потім ще раз для Tom/Ana.",
        "Якщо T/A спірно на слух — звіряйся з транскриптом у блоці Transcript; головне хто сказав Sure / Yes.",
      ],
      say: [
        "Listen. Match conversations one to six with pictures A to F.",
        "Listen again. Who agrees — Tom or Ana? Write T or A.",
      ],
      expect: [
        "Match: 1C 2E 3D 4B 5F 6A",
      ],
    },
    {
      time: "25–35′",
      title: "4 · Phrases + 6.18",
      do: [
        "Прочитай Useful phrases. Питання: How many requests? → 8.",
        "Потім 6.18 listen and repeat хором / по одному.",
      ],
      say: [
        "Read the box. Listen again. How many requests?",
        "Now repeat after the audio: Can you walk the dog, please?",
      ],
    },
    {
      time: "35–48′",
      title: "5 · Dialogues",
      do: [
        "Gaps 5a. Потім 5b: ти ↔ він, діалоги 1–4.",
      ],
      say: [
        "Complete with Can I / Can you / Sure / I’m sorry…",
        "Now you are A. I am B. … Swap.",
      ],
    },
    {
      time: "48–55′",
      title: "6 · Situations",
      do: [
        "Обери 2–3 з п’яти. Міняйтесь ролями.",
      ],
      say: [
        "You are the customer. I am the café worker. Make two requests.",
      ],
    },
    {
      time: "55–60′",
      title: "Final",
      do: [
        "3 Can you + 2 Can I без карток. Ти ставиш 3 прохання — він відповідає.",
        "Correction лише 3: Can I/you · please · I’m sorry I/you can’t.",
      ],
      say: [
        "No pictures. Three Can you…? Two Can I…? Then answer me.",
        "Good. Now you can make requests.",
      ],
    },
  ],
  tips: [
    "Немає звуку → перевір шлях sounds/Unit_6/…R17.mp3.",
    "Плутає Can I / Can you → жест на себе / на співрозмовника.",
    "Can you to wash → прибери to.",
    "Мало часу → скороти situations; 6.17 + Final обов’язкові.",
  ],
  homework: [
    "For homework: flashcards and the four dialogues.",
    "Write six requests: three Can you and three Can I.",
    "Record a voice message — ask for help at home.",
  ],
} as const;
