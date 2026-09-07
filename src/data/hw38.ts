/** HW38 — Lesson 38: have / has got, questions, possessives. */

export const hw38Translate = [
  {
    id: "t1",
    ua: "У мене світле волосся.",
    answers: [
      "I've got blonde hair.",
      "I have got blonde hair.",
      "I've got blond hair.",
      "I have got blond hair.",
      "I have blonde hair.",
      "I have blond hair.",
    ],
  },
  {
    id: "t2",
    ua: "У нього карі очі і борода.",
    answers: [
      "He's got brown eyes and a beard.",
      "He has got brown eyes and a beard.",
    ],
  },
  {
    id: "t3",
    ua: "Їй близько 30.",
    answers: [
      "She's in her 30s.",
      "She is in her 30s.",
      "She's in her thirties.",
      "She is in her thirties.",
      "She's about 30.",
      "She is about 30.",
      "She's 30.",
      "She is 30.",
      "She's 30 years old.",
      "She is 30 years old.",
    ],
  },
  {
    id: "t4",
    ua: "У мене немає дітей.",
    answers: [
      "I haven't got any children.",
      "I have not got any children.",
      "I haven't got children.",
    ],
  },
  {
    id: "t5",
    ua: "У неї є син.",
    answers: ["She's got a son.", "She has got a son."],
  },
  {
    id: "t6",
    ua: "У них блакитні очі.",
    answers: ["They've got blue eyes.", "They have got blue eyes."],
  },
] as const;

export const hw38Questions = [
  {
    id: "q1",
    ua: "У нього є борода?",
    answers: ["Has he got a beard?", "Does he have a beard?"],
  },
  {
    id: "q2",
    ua: "У тебе світле волосся?",
    answers: [
      "Have you got blonde hair?",
      "Have you got blond hair?",
      "Do you have blonde hair?",
      "Do you have blond hair?",
    ],
  },
  {
    id: "q3",
    ua: "Як її звати?",
    answers: ["What's her name?", "What is her name?"],
  },
  {
    id: "q4",
    ua: "Скільки йому років?",
    answers: ["How old is he?"],
  },
  {
    id: "q5",
    ua: "У неї є син?",
    answers: ["Has she got a son?", "Does she have a son?"],
  },
  {
    id: "q6",
    ua: "Звідки твій друг?",
    answers: [
      "Where is your friend from?",
      "Where's your friend from?",
      "Where does your friend come from?",
    ],
  },
] as const;

/** Fix "hair a client" → a client's hair; my / his / her / 's. */
export const hw38Possessives = [
  {
    id: "p1",
    ua: "Це моє волосся.",
    answers: ["This is my hair.", "It's my hair.", "It is my hair."],
  },
  {
    id: "p2",
    ua: "Його очі карі.",
    answers: ["His eyes are brown.", "He's got brown eyes."],
  },
  {
    id: "p3",
    ua: "Її волосся світле.",
    answers: [
      "Her hair is blonde.",
      "Her hair is blond.",
      "She's got blonde hair.",
      "She's got blond hair.",
    ],
  },
  {
    id: "p4",
    ua: "Як звати твою маму?",
    answers: [
      "What's your mom's name?",
      "What is your mom's name?",
      "What's your mum's name?",
      "What is your mum's name?",
      "What's your mother's name?",
      "What is your mother's name?",
    ],
  },
  {
    id: "p5",
    ua: "Ім'я мого брата — Андрій.",
    answers: [
      "My brother's name is Andrii.",
      "My brother's name is Andrey.",
      "My brother's name is Andriy.",
      "My brother's name is Andrei.",
    ],
  },
  {
    id: "p6",
    ua: "Я зараз стрижу волосся клієнта.",
    answers: [
      "I am cutting a client's hair now.",
      "I'm cutting a client's hair now.",
      "I am cutting my client's hair now.",
      "I'm cutting my client's hair now.",
      "I am giving a client a haircut now.",
      "I'm giving a client a haircut now.",
    ],
  },
  {
    id: "p7",
    ua: "Волосся мого клієнта коротке.",
    answers: [
      "My client's hair is short.",
      "My client's got short hair.",
      "My client has got short hair.",
    ],
  },
  {
    id: "p8",
    ua: "Це сумка мого друга.",
    answers: [
      "This is my friend's bag.",
      "It's my friend's bag.",
      "It is my friend's bag.",
    ],
  },
] as const;

export const hw38WritePrompts = [
  "your job",
  "where you are from / live",
  "your age / hair / eyes",
  "a friend's name, job, hair, eyes",
] as const;
