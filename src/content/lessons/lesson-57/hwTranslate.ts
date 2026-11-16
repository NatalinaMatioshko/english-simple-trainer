export type TranslateItem = {
  id: string;
  prompt: string;
  answers: readonly string[];
};

function didnt(sentence: string): string[] {
  return [
    sentence,
    sentence.replace("didn't", "did not"),
    sentence.replace("didn't", "didnt"),
  ];
}

/** Lesson 57 · 2b, written from Ukrainian into the textbook sentence. */
export const hw57SentenceTranslate: TranslateItem[] = [
  {
    id: "g1",
    prompt: "Я побачив оголошення про це в інтернеті.",
    answers: ["I saw an advert for one online."],
  },
  {
    id: "g2",
    prompt: "Мені було дуже погано, бо я запізнився.",
    answers: ["I felt really bad because I was late."],
  },
  {
    id: "g3",
    prompt: "Увечері ми поїхали додому поїздом.",
    answers: ["We took the train back home in the evening."],
  },
  {
    id: "g4",
    prompt: "Минулого літа вона поїхала в Токіо.",
    answers: ["She went to Tokyo last summer."],
  },
  {
    id: "g5",
    prompt: "Ти з’їв багато їжі на вечірці!",
    answers: ["You ate a lot of food at the party!"],
  },
  {
    id: "g6",
    prompt: "Я зустрів свою дружину на робочій вечірці.",
    answers: ["I met my wife at a work party."],
  },
  {
    id: "g7",
    prompt: "Я знову забув день народження тата!",
    answers: ["I forgot my dad's birthday again!"],
  },
  {
    id: "g8",
    prompt: "Я загубив ключі по дорозі на роботу.",
    answers: ["I lost my keys on the way to work."],
  },
  {
    id: "g9",
    prompt: "Вчора вона поговорила про це зі своєю вчителькою.",
    answers: ["She spoke to her teacher about it yesterday."],
  },
  {
    id: "g10",
    prompt: "Він купив мені каву в кафе поруч.",
    answers: [
      "He bought me a cup of coffee from the cafe next door.",
      "He bought me a cup of coffee from the café next door.",
    ],
  },
];

/** Lesson 57 · 4b. */
export const hw57PastTranslate: TranslateItem[] = [
  {
    id: "p1",
    prompt: "Я встав о восьмій.",
    answers: ["I got up at eight."],
  },
  {
    id: "p2",
    prompt: "Вона пішла на роботу.",
    answers: ["She went to work."],
  },
  {
    id: "p3",
    prompt: "Ми подивилися фільм.",
    answers: ["We saw a film."],
  },
  {
    id: "p4",
    prompt: "Він купив сендвіч.",
    answers: ["He bought a sandwich."],
  },
  {
    id: "p5",
    prompt: "Вони пообідали.",
    answers: ["They had lunch."],
  },
  {
    id: "p6",
    prompt: "Я загубив свої ключі.",
    answers: ["I lost my keys."],
  },
  {
    id: "p7",
    prompt: "Вона взяла таксі.",
    answers: ["She took a taxi."],
  },
  {
    id: "p8",
    prompt: "Ми зустріли друга.",
    answers: ["We met a friend."],
  },
];

/** Lesson 57 · 4c. The English sentence needs a, an or the. */
export const hw57ArticleTranslate: TranslateItem[] = [
  {
    id: "a1",
    prompt: "Я взяв таксі на роботу.",
    answers: ["I took a taxi to work."],
  },
  {
    id: "a2",
    prompt: "Вона з’їла яблуко за своїм столом.",
    answers: ["She ate an apple at her desk."],
  },
  {
    id: "a3",
    prompt: "Він купив парасольку.",
    answers: ["He bought an umbrella."],
  },
  {
    id: "a4",
    prompt: "У мене був поганий день.",
    answers: ["I had a bad day."],
  },
  {
    id: "a5",
    prompt: "Ми пішли в кіно, але воно було зачинене.",
    answers: ["We went to the cinema, but it was closed."],
  },
  {
    id: "a6",
    prompt: "Вона поговорила з босом.",
    answers: ["She spoke to the boss."],
  },
  {
    id: "a7",
    prompt: "Я забув важливу зустріч.",
    answers: ["I forgot an important meeting."],
  },
  {
    id: "a8",
    prompt: "Вони зустріли друга на вокзалі.",
    answers: ["They met a friend at the station."],
  },
];

/** Lesson 57 · 4d. */
export const hw57NegativeTranslate: TranslateItem[] = [
  {
    id: "n1",
    prompt: "Я не ходив на роботу.",
    answers: didnt("I didn't go to work."),
  },
  {
    id: "n2",
    prompt: "Вона не снідала.",
    answers: didnt("She didn't have breakfast."),
  },
  {
    id: "n3",
    prompt: "Він не їв сендвіч.",
    answers: didnt("He didn't eat a sandwich."),
  },
  {
    id: "n4",
    prompt: "Ми не бачили цей фільм.",
    answers: didnt("We didn't see the film."),
  },
  {
    id: "n5",
    prompt: "Вони не купили парасольку.",
    answers: didnt("They didn't buy an umbrella."),
  },
  {
    id: "n6",
    prompt: "Я не брав таксі.",
    answers: didnt("I didn't take a taxi."),
  },
  {
    id: "n7",
    prompt: "Вона не говорила з босом.",
    answers: didnt("She didn't speak to the boss."),
  },
  {
    id: "n8",
    prompt: "Він не забув важливу зустріч.",
    answers: didnt("He didn't forget an important meeting."),
  },
  {
    id: "n9",
    prompt: "Ми не зустріли друга.",
    answers: didnt("We didn't meet a friend."),
  },
  {
    id: "n10",
    prompt: "Я не загубив ці ключі.",
    answers: didnt("I didn't lose the keys."),
  },
  {
    id: "n11",
    prompt: "Вона не пішла в кіно.",
    answers: didnt("She didn't go to the cinema."),
  },
  {
    id: "n12",
    prompt: "У них не було поганого дня.",
    answers: didnt("They didn't have a bad day."),
  },
];
