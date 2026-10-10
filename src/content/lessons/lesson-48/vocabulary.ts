import type { VocabularyItem } from "../../../types/lesson";

/** Active chunks for L48 · My week (speaking project). */
export const weekFlashcards: Array<{
  front: string;
  back: string;
  speak: string;
}> = [
  { front: "у понеділок / по п’ятницях", back: "on Monday / on Fridays", speak: "on Monday" },
  { front: "з вівторка по четвер", back: "from Tuesday to Thursday", speak: "from Tuesday to Thursday" },
  { front: "вранці / увечері", back: "in the morning / in the evening", speak: "in the morning" },
  { front: "вночі / на вихідних", back: "at night / at the weekend", speak: "at the weekend" },
  { front: "на роботі / удома", back: "at work / at home", speak: "at work" },
  { front: "йти на роботу / додому", back: "go to work / go home", speak: "go to work" },
  { front: "прибути на роботу", back: "arrive at work", speak: "arrive at work" },
  { front: "працювати в барбершопі", back: "work at a barbershop", speak: "work at a barbershop" },
  { front: "завжди / зазвичай / часто", back: "always / usually / often", speak: "usually" },
  { front: "іноді / ніколи", back: "sometimes / never", speak: "never" },
];

export const lesson48Vocabulary: VocabularyItem[] = weekFlashcards.map(
  (c, i) => ({
    id: `w${i + 1}`,
    term: c.back,
    gloss: c.front,
  }),
);
