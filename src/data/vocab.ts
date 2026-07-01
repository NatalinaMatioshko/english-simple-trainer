export type VocabItem = {
  en: string;
  ua: string;
  example: string;
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
  groups: VocabGroup[];
};

export const vocabCategories: VocabCategory[] = [
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
