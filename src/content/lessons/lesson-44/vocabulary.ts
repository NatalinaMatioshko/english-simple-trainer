import type { VocabularyItem } from "../../../types/lesson";
import { foodWords, frequencyAdverbs } from "./activities";

/** UA glosses for food flashcards (UA → EN). */
export const foodUa: Record<(typeof foodWords)[number], string> = {
  bread: "хліб",
  cakes: "тістечка / кекси",
  cheese: "сир",
  chicken: "курка",
  chocolate: "шоколад",
  coffee: "кава",
  eggs: "яйця",
  fish: "риба",
  meat: "м'ясо",
  milk: "молоко",
  salad: "салат",
  sandwiches: "бутерброди",
  sugar: "цукор",
  tea: "чай",
};

export const foodFlashcards = foodWords.map((en) => ({
  front: foodUa[en],
  back: en,
  speak: en,
}));

export const lesson44Vocabulary: VocabularyItem[] = [
  ...foodWords.map((term) => ({
    id: term,
    term,
    gloss: foodUa[term],
  })),
  ...frequencyAdverbs.map((term) => ({
    id: `freq-${term}`,
    term,
    gloss:
      term === "never"
        ? "0% · ніколи"
        : term === "sometimes"
          ? "іноді"
          : term === "often"
            ? "часто"
            : term === "usually"
              ? "зазвичай"
              : "100% · завжди",
  })),
];
