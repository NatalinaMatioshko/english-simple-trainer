import type { FillInBlankTask, Profile, SentenceOrderTask } from "./types";

export const profiles: Profile[] = [
  {
    id: "linh",
    name: "Linh",
    age: 12,
    country: "Viet Nam",
    city: "Ho Chi Minh City",
    hair: "long hair",
    eyes: "dark-brown eyes",
    text: "My name's Linh. I'm twelve years old. I'm from Ho Chi Minh City, in Viet Nam. I've got long hair and I've got dark-brown eyes.",
  },
  {
    id: "antoni",
    name: "Antoni",
    age: 7,
    country: "Poland",
    city: "Gdansk",
    hair: "short, blond hair",
    eyes: "blue eyes",
    text: "I'm Antoni. I'm seven. I'm from Poland. I live in Gdansk. I've got short, blond hair and blue eyes.",
  },
  {
    id: "sofia",
    name: "Sofia",
    age: 9,
    country: "Peru",
    city: "Lima",
    hair: "long, brown hair",
    eyes: "brown eyes",
    text: "My name is Sofia and I live in Lima, in Peru. I'm nine years old. I've got long, brown hair and brown eyes.",
  },
];

export const sentenceOrderTasks: SentenceOrderTask[] = [
  {
    id: 1,
    words: ["Lucas.", "name's", "My"],
    answer: "My name's Lucas.",
  },
  {
    id: 2,
    words: ["years", "ten", "old.", "I'm"],
    answer: "I'm ten years old.",
  },
  {
    id: 3,
    words: ["France.", "I'm", "from"],
    answer: "I'm from France.",
  },
  {
    id: 4,
    words: ["live", "I", "Paris.", "in"],
    answer: "I live in Paris.",
  },
  {
    id: 5,
    words: ["got", "I've", "hair.", "short"],
    answer: "I've got short hair.",
  },
  {
    id: 6,
    words: ["eyes.", "brown", "I've", "got"],
    answer: "I've got brown eyes.",
  },
  {
    id: 7,
    words: ['a', 'mum,', 'I', 'have', 'a', 'dad,', 'a', 'brother', 'and', 'a', 'sister.'],
    answer: "I have a mum, a dad, a brother and a sister.",
  },
  {
    id: 8,
    words: ['a', 'I', 'am', 'teacher.'],
    answer: "I am a teacher.",
  },
  {
    id: 9,
    words: ['dogs.', 'love', 'I'],
    answer: "I love dogs.",
  },
  {
    id: 10,
    words: ['have', 'I', 'a', 'best', 'friend.'],
    answer: "I have a best friend.",
  },
  {
    id: 11,
    words: ['like', 'We', 'shopping.', 'go'],
    answer: "We like go shopping.",
  },
];

export const fillInBlankTasks: FillInBlankTask[] = [
  { id: 1, sentence: "My ___ is Linh.", answer: "name" },
  { id: 2, sentence: "I'm twelve ___.", answer: "years old" },
  { id: 3, sentence: "___ Antoni. I'm seven.", answer: "I'm" },
  { id: 4, sentence: "I'm ___ Poland.", answer: "from" },
  { id: 5, sentence: "My name is Sofia. I ___ in Lima.", answer: "live" },
  { id: 6, sentence: "___ long, brown hair.", answer: "I've got" },
];
