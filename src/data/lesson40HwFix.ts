/**
 * Lesson 40 warm-up — Petro's Lesson 38 writing (have/has got · describe people).
 * Interactive fix: wrong → type correct (same pattern as Lesson 38).
 */

export const petroHwMeta = {
  student: "Petro",
  lesson: "Lesson 38",
  status: "Test: Not done · Quiz: Not done · score 18 · 11.09.2026, 21:07:29",
};

export const homeworkFixGroups = [
  {
    id: "must",
    title: "Потрібно виправити",
    desc: "Граматика / правопис.",
  },
  {
    id: "better",
    title: "Краще переписати",
    desc: "Зрозуміло, але природніше інакше.",
  },
  {
    id: "tiny",
    title: "Дрібниці",
    desc: "Пунктуація, пробіл, написання місця.",
  },
] as const;

export const homeworkFixLines = [
  {
    id: "1",
    group: "must",
    uk: "Я люблю свою роботу.",
    wrong: "I lave my job.",
    answers: ["I love my job.", "I love my job"],
    tipUa: "love, не lave (помилка в написанні).",
  },
  {
    id: "2",
    group: "must",
    uk: "Мені тридцять сім років.",
    wrong: "I am therty seven years old.",
    answers: [
      "I am thirty-seven years old.",
      "I'm thirty-seven years old.",
      "I am thirty seven years old.",
      "I'm thirty seven years old.",
    ],
    tipUa: "thirty (не therty). Вік часто з дефісом: thirty-seven.",
  },
  {
    id: "3",
    group: "must",
    uk: "У мене зелені очі.",
    wrong: "I'v got green eyes.",
    answers: ["I've got green eyes.", "I have got green eyes."],
    tipUa: "I've = I have. Після апострофа: ve, не v.",
  },
  {
    id: "4",
    group: "tiny",
    uk: "Я з Севастополя, Крим.",
    wrong: "I am from Sebastopol, Crimea.",
    answers: [
      "I am from Sevastopol, Crimea.",
      "I'm from Sevastopol, Crimea.",
      "I am from Sevastopol, Crimea",
      "I'm from Sevastopol, Crimea",
    ],
    tipUa: "Англійською зараз частіше Sevastopol (не Sebastopol).",
  },
  {
    id: "5",
    group: "must",
    uk: "Зараз я живу в маленькому містечку Софіївська Борщагівка.",
    wrong: "I'm living in small town Sofiivska Borschagivka right now.",
    answers: [
      "I live in a small town, Sofiivska Borschagivka, right now.",
      "I live in a small town Sofiivska Borschagivka right now.",
      "I live in the small town of Sofiivska Borschagivka right now.",
      "I live in a small town called Sofiivska Borschagivka right now.",
    ],
    tipUa:
      "Постійне місце → I live (не I'm living). Перед small town потрібен артикль: a small town.",
  },
  {
    id: "6",
    group: "must",
    uk: "Моїх друзів звуть Ганна і Микола.",
    wrong: "My friends' name are Hanna and Mykola.",
    answers: [
      "My friends' names are Hanna and Mykola.",
      "My friends' names are Hanna and Mykola",
    ],
    tipUa: "names у множині (двоє друзів): My friends' names are…",
  },
  {
    id: "7",
    group: "must",
    uk: "Ганні тридцять шість років.",
    wrong: "Hanna is therty six years old.",
    answers: [
      "Hanna is thirty-six years old.",
      "Hanna is thirty six years old.",
      "She is thirty-six years old.",
      "She's thirty-six years old.",
    ],
    tipUa: "thirty + краще з дефісом: thirty-six.",
  },
  {
    id: "8",
    group: "must",
    uk: "У Ганни коротке світле волосся.",
    wrong: "Hanna's got a short blonde hair.",
    answers: [
      "Hanna's got short blonde hair.",
      "Hanna has got short blonde hair.",
      "She's got short blonde hair.",
      "She has got short blonde hair.",
    ],
    tipUa: "hair як маса — без a: short blonde hair (не a short … hair).",
  },
  {
    id: "9",
    group: "must",
    uk: "Вона колорист.",
    wrong: "She is colorist.",
    answers: [
      "She is a colorist.",
      "She's a colorist.",
      "She is a colourist.",
      "She's a colourist.",
    ],
    tipUa: "Професія в однині: a colorist / a colourist.",
  },
  {
    id: "10",
    group: "must",
    uk: "Миколі тридцять вісім років.",
    wrong: "Mykola is Therty eight years old.",
    answers: [
      "Mykola is thirty-eight years old.",
      "Mykola is thirty eight years old.",
      "He is thirty-eight years old.",
      "He's thirty-eight years old.",
    ],
    tipUa: "thirty (не Therty). Після is — маленька літера, якщо не початок речення.",
  },
  {
    id: "11",
    group: "must",
    uk: "У нього дуже коротке чорне волосся.",
    wrong: "He's got a very short black hair.",
    answers: [
      "He's got very short black hair.",
      "He has got very short black hair.",
    ],
    tipUa: "Знову hair без a: very short black hair.",
  },
  {
    id: "12",
    group: "must",
    uk: "Він був продавцем у магазині.",
    wrong: "He was shop assistent.",
    answers: [
      "He was a shop assistant.",
      "He was a shop assistant",
    ],
    tipUa: "assistant (подвійна s). Професія: a shop assistant.",
  },
  {
    id: "13",
    group: "better",
    uk: "Дякую за прочитання.",
    wrong: "Thank for reading.",
    answers: [
      "Thanks for reading.",
      "Thank you for reading.",
      "Thanks for reading",
      "Thank you for reading",
    ],
    tipUa: "Thanks for… або Thank you for… — не Thank for.",
  },
] as const;

/** Meaning quiz: UA prompt → choose the correct EN sentence (barber context). */
export const cuttingHairMeanings = [
  {
    id: "hair",
    ua: "Я стрижу волосся / я працюю перукарем. Загальна дія.",
    en: "I am cutting hair.",
  },
  {
    id: "my",
    ua: "Я підстригаю волосся мого конкретного клієнта.",
    en: "I am cutting my client's hair.",
  },
  {
    id: "a",
    ua: "Я підстригаю волосся одного клієнта; слухач ще не знає, якого саме.",
    en: "I am cutting a client's hair.",
  },
  {
    id: "the",
    ua: "Я підстригаю волосся того конкретного клієнта, про якого ми вже говорили або якого обоє бачимо.",
    en: "I am cutting the client's hair.",
  },
] as const;

export const cuttingHairOptions = cuttingHairMeanings.map((item) => item.en);
