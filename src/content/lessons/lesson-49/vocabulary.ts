import type { VocabularyItem } from "../../../types/lesson";

/** Active Past Simple set for L49 · Yesterday story */
export const yesterdayFlashcards: Array<{
  front: string;
  back: string;
  speak: string;
}> = [
  { front: "був / була втомлений", back: "was tired", speak: "was tired" },
  { front: "був / була на роботі", back: "was at work", speak: "was at work" },
  { front: "був / була вдома", back: "was at home", speak: "was at home" },
  { front: "прокинувся", back: "got up", speak: "got up" },
  { front: "поснідав", back: "had breakfast", speak: "had breakfast" },
  { front: "пішов на роботу", back: "went to work", speak: "went to work" },
  { front: "працював", back: "worked", speak: "worked" },
  { front: "грав", back: "played", speak: "played" },
  { front: "дивився", back: "watched", speak: "watched" },
  { front: "ліг спати", back: "went to bed", speak: "went to bed" },
];

export const lesson49Vocabulary: VocabularyItem[] = yesterdayFlashcards.map(
  (c, i) => ({
    id: `y${i + 1}`,
    term: c.back,
    gloss: c.front,
  }),
);
