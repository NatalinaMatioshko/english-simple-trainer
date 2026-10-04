import type { VocabularyItem } from "../../../types/lesson";

export const choreFlashcards: Array<{
  front: string;
  back: string;
  speak: string;
}> = [
  { front: "прибирати ванну", back: "clean the bathroom", speak: "clean the bathroom" },
  { front: "готувати вечерю", back: "cook dinner", speak: "cook dinner" },
  { front: "годувати собаку", back: "feed the dog", speak: "feed the dog" },
  {
    front: "ходити в супермаркет",
    back: "go to the supermarket",
    speak: "go to the supermarket",
  },
  { front: "застеляти ліжка", back: "make the beds", speak: "make the beds" },
  { front: "вигулювати собаку", back: "walk the dog", speak: "walk the dog" },
  { front: "прати білизну", back: "do the washing", speak: "do the washing" },
  { front: "мити посуд", back: "wash the dishes", speak: "wash the dishes" },
];

export const lesson46Vocabulary: VocabularyItem[] = choreFlashcards.map(
  (card, i) => ({
    id: `v${i + 1}`,
    term: card.back,
    gloss: card.front,
  }),
);
