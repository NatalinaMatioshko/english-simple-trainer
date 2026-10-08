import type { VocabularyItem } from "../../../types/lesson";
import { IMG47, skillMatchPhrases } from "./activities";

export const skillFlashcards: Array<{
  front: string;
  back: string;
  speak: string;
}> = [
  { front: "створити сайт", back: "build a website", speak: "build a website" },
  { front: "танцювати", back: "dance", speak: "dance" },
  { front: "малювати", back: "draw pictures", speak: "draw pictures" },
  { front: "керувати літаком", back: "fly a plane", speak: "fly a plane" },
  { front: "спекти торт", back: "make a cake", speak: "make a cake" },
  { front: "шити одяг", back: "make clothes", speak: "make clothes" },
  { front: "грати у футбол", back: "play football", speak: "play football" },
  { front: "їздити верхи", back: "ride a horse", speak: "ride a horse" },
  { front: "співати", back: "sing", speak: "sing" },
  {
    front: "спати в поїзді",
    back: "sleep on a train",
    speak: "sleep on a train",
  },
  {
    front: "говорити двома мовами",
    back: "speak two languages",
    speak: "speak two languages",
  },
  { front: "плавати", back: "swim", speak: "swim" },
  { front: "вміти / можу", back: "can", speak: "can" },
  { front: "не вмію / не можу", back: "can't", speak: "can't" },
];

/** Extra · clothes (UA → EN) */
export const clothesFlashcards: Array<{
  front: string;
  back: string;
  speak: string;
}> = [
  { front: "одяг", back: "clothes", speak: "clothes" },
  { front: "носити (одяг)", back: "wear", speak: "wear" },
  { front: "футболка", back: "T-shirt", speak: "T-shirt" },
  { front: "сорочка", back: "shirt", speak: "shirt" },
  { front: "светр", back: "jumper", speak: "jumper" },
  { front: "куртка", back: "jacket", speak: "jacket" },
  { front: "пальто", back: "coat", speak: "coat" },
  { front: "джинси", back: "jeans", speak: "jeans" },
  { front: "штани", back: "trousers", speak: "trousers" },
  { front: "спідниця", back: "skirt", speak: "skirt" },
  { front: "сукня", back: "dress", speak: "dress" },
  { front: "шорти", back: "shorts", speak: "shorts" },
  { front: "взуття / туфлі", back: "shoes", speak: "shoes" },
  { front: "кросівки", back: "trainers", speak: "trainers" },
  { front: "чоботи", back: "boots", speak: "boots" },
  { front: "шкарпетки", back: "socks", speak: "socks" },
  { front: "шапка / капелюх", back: "hat", speak: "hat" },
  { front: "шарф", back: "scarf", speak: "scarf" },
  { front: "рукавички", back: "gloves", speak: "gloves" },
  { front: "краватка", back: "tie", speak: "tie" },
];

/** Wearable items only — picture → English (skips abstract clothes / wear). */
const clothesPictureItems: Array<{
  file: string;
  back: string;
  alt: string;
  speak: string;
}> = [
  { file: "t-shirt.jpg", back: "T-shirt", alt: "A white T-shirt", speak: "T-shirt" },
  { file: "shirt.jpg", back: "shirt", alt: "A blue shirt", speak: "shirt" },
  { file: "jumper.jpg", back: "jumper", alt: "A green jumper", speak: "jumper" },
  { file: "jacket.jpg", back: "jacket", alt: "A black jacket", speak: "jacket" },
  { file: "coat.jpg", back: "coat", alt: "A long coat", speak: "coat" },
  { file: "jeans.jpg", back: "jeans", alt: "Blue jeans", speak: "jeans" },
  { file: "trousers.jpg", back: "trousers", alt: "Beige trousers", speak: "trousers" },
  { file: "skirt.jpg", back: "skirt", alt: "A black skirt", speak: "skirt" },
  { file: "dress.jpg", back: "dress", alt: "A red dress", speak: "dress" },
  { file: "shorts.jpg", back: "shorts", alt: "Denim shorts", speak: "shorts" },
  { file: "shoes.jpg", back: "shoes", alt: "Black leather shoes", speak: "shoes" },
  { file: "trainers.jpg", back: "trainers", alt: "Red trainers", speak: "trainers" },
  { file: "boots.jpg", back: "boots", alt: "Brown boots", speak: "boots" },
  { file: "socks.jpg", back: "socks", alt: "A pair of socks", speak: "socks" },
  { file: "hat.jpg", back: "hat", alt: "A grey hat", speak: "hat" },
  { file: "scarf.jpg", back: "scarf", alt: "A checked scarf", speak: "scarf" },
  { file: "gloves.jpg", back: "gloves", alt: "Red gloves", speak: "gloves" },
  { file: "tie.jpg", back: "tie", alt: "A patterned tie", speak: "tie" },
];

export const clothesPictureFlashcards = clothesPictureItems.map((item) => ({
  src: IMG47(`clothes/${item.file}`),
  alt: item.alt,
  back: item.back,
  speak: item.speak,
}));

export const lesson47Vocabulary: VocabularyItem[] = [
  ...skillMatchPhrases.map((p, i) => ({
    id: `v${i + 1}`,
    term: p.label,
    gloss: skillFlashcards[i]?.front ?? p.label,
  })),
  { id: "v13", term: "can", gloss: "вміти / можу" },
  { id: "v14", term: "can't", gloss: "не вмію / не можу" },
  ...clothesFlashcards.map((c, i) => ({
    id: `c${i + 1}`,
    term: c.back,
    gloss: c.front,
  })),
];
