/** Teacher-only run sheet for Lesson 49 · Yesterday */

export const lesson49TeacherScript = {
  heading: "Сценарій уроку · Yesterday",
  goal: "Петро розповідає вчорашній день (ранок → вечір) і відчуває: «Я можу сам.» Без Past Continuous і без великого списку irregular.",
  blocks: [
    {
      time: "Перед уроком",
      title: "Підготовка",
      lines: [
        "На екрані/дошці: morning → afternoon → evening → night.",
        "Не вводити: Past Continuous, 3-ю форму, довгий irregular list.",
      ],
    },
    {
      time: "0–5′",
      title: "Today → yesterday",
      lines: [
        "I am tired → I was tired · I work → I worked · I go → I went · I have → I had.",
        "Today: are you tired? / Yesterday: were you tired?",
        "Today: do you work? / Yesterday: did you work?",
        "Поки не пояснюй усі правила did.",
      ],
    },
    {
      time: "5–15′",
      title: "6 дієслів + drill",
      lines: [
        "got up · had · went · worked · played · watched (+ was).",
        "Ти: Today I go to work. Yesterday? → Yesterday you went to work.",
      ],
    },
    {
      time: "15–25′",
      title: "Timeline",
      lines: [
        "What did you do yesterday morning? Did you have breakfast?",
        "Did you work yesterday? What did you do in the evening?",
        "What time did you go to bed? Were you tired?",
        "Якщо завис: Did you play games or watch a film? Were you at home or at work?",
        "Keywords: 7:00 got up · breakfast · work · evening TV.",
      ],
    },
    {
      time: "25–35′",
      title: "Controlled story",
      lines: [
        "Gaps на екрані — спочатку форми, потім увесь текст підряд.",
      ],
    },
    {
      time: "35–43′",
      title: "Mark",
      lines: [
        "Короткий текст → quiz → Is Mark’s yesterday similar to yours?",
      ],
    },
    {
      time: "43–52′",
      title: "Attempt 1 (головне)",
      lines: [
        "Tell me your yesterday. Timeline OK. Don’t read full sentences.",
        "НЕ перебивай 45–60 секунд. Запиши максимум 3 помилки.",
      ],
    },
    {
      time: "52–56′",
      title: "Fix only 3",
      lines: [
        "I was worked → I worked",
        "I goed → I went",
        "I have breakfast yesterday → I had breakfast yesterday",
        "Він повторює правильні повні речення.",
      ],
    },
    {
      time: "56–60′",
      title: "Attempt 2",
      lines: [
        "Та сама історія без повного шаблону.",
        "Закрий: Today you used was, got up, had, went, worked, played/watched. You can tell a real story about yesterday.",
      ],
    },
    {
      time: "Extra",
      title: "1 сценарій (~5′), якщо є час",
      lines: [
        "Work day — учора на роботі + usually vs yesterday",
        "Home past — дім / Did you cook…?",
        "Food + can — сніданок/кафе + 1–2 Can you…?",
        "Weekend — was/were + 5 речень без карток",
      ],
    },
  ],
  tips: [
    "Завис → вибір A/B.",
    "Тягне в Past Continuous → Later. Today — what happened yesterday.",
    "Багато помилок → лише 3 на delayed correction.",
    "Мало часу → викинь Mark/Extra; Attempt 1+2 обов’язкові.",
  ],
  homework: [
    "6–8 речень Yesterday (підкреслити Past verbs)",
    "Voice ~45 с",
    "Відповіді на 5 питань (What time did you get up… тощо)",
  ],
} as const;
