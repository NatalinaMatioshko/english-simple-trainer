import type { VocabularyItem } from "../../../types/lesson";
import { timeExpressions } from "./activities";

export const lesson45Vocabulary: VocabularyItem[] = [
  ...timeExpressions.map((term) => ({
    id: term,
    term,
    gloss:
      term === "in the morning"
        ? "вранці"
        : term === "in the afternoon"
          ? "вдень"
          : term === "in the evening"
            ? "увечері"
            : term === "at night"
              ? "вночі"
              : term === "at the weekend"
                ? "на вихідних"
                : term === "every day"
                  ? "щодня"
                  : "щотижня",
  })),
  { id: "habit", term: "habit", gloss: "звичка" },
  { id: "walks", term: "walks", gloss: "ходить пішки" },
  { id: "cycles", term: "cycles", gloss: "їздить на велосипеді" },
  { id: "watches", term: "watches", gloss: "дивиться" },
  { id: "studies", term: "studies", gloss: "вчиться" },
  { id: "goes", term: "goes", gloss: "ходить / їде" },
];

export const timeFlashcards = timeExpressions.map((en) => ({
  front:
    en === "in the morning"
      ? "вранці"
      : en === "in the afternoon"
        ? "вдень"
        : en === "in the evening"
          ? "увечері"
          : en === "at night"
            ? "вночі"
            : en === "at the weekend"
              ? "на вихідних"
              : en === "every day"
                ? "щодня"
                : "щотижня",
  back: en,
  speak: en,
}));
