/** Lesson 51 · A nice place — flashcards */
import { IMG51, placePhotoMatch } from "./activities";

/** Picture → English (photos A–O, one compass card for directions) */
export const placePictureCards = placePhotoMatch
  .filter((p) => p.file !== "place-compass.png")
  .map((p): { src: string; alt: string; back: string } => ({
    src: IMG51(p.file),
    alt: p.alt,
    back: p.answer,
  }))
  .concat([
    {
      src: IMG51("place-compass.png"),
      alt: "A compass with four letters",
      back: "north · south · east · west",
    },
  ]);

/** UA → EN (places + question words) */
export const placeFlashcards = [
  { front: "море", back: "the sea", speak: "the sea" },
  { front: "гора", back: "a mountain", speak: "a mountain" },
  { front: "острів", back: "an island", speak: "an island" },
  { front: "озеро", back: "a lake", speak: "a lake" },
  { front: "пагорб", back: "a hill", speak: "a hill" },
  { front: "річка", back: "a river", speak: "a river" },
  { front: "поле", back: "a field", speak: "a field" },
  { front: "небо", back: "the sky", speak: "the sky" },
  { front: "хмари", back: "clouds", speak: "clouds" },
  { front: "дерева", back: "trees", speak: "trees" },
  { front: "квіти", back: "flowers", speak: "flowers" },
  { front: "північ", back: "north", speak: "north" },
  { front: "південь", back: "south", speak: "south" },
  { front: "схід", back: "east", speak: "east" },
  { front: "захід", back: "west", speak: "west" },
  { front: "на півночі країни", back: "in the north of my country", speak: "in the north of my country" },
] as const;
