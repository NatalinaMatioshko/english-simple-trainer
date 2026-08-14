/** HW31 · drag EN → UA match (Lesson 31 vocab), 3 rounds */

export type Hw31MatchPair = {
  id: string;
  en: string;
  ua: string;
};

export type Hw31MatchRound = {
  id: string;
  title: string;
  pairs: readonly Hw31MatchPair[];
};

export const hw31MatchRounds: readonly Hw31MatchRound[] = [
  {
    id: "places",
    title: "Places in town",
    pairs: [
      { id: "hotel", en: "hotel", ua: "готель" },
      { id: "bank", en: "bank", ua: "банк" },
      { id: "park", en: "park", ua: "парк" },
      { id: "cinema", en: "cinema", ua: "кінотеатр" },
      { id: "market", en: "market", ua: "ринок" },
      { id: "restaurant", en: "restaurant", ua: "ресторан" },
      { id: "supermarket", en: "supermarket", ua: "супермаркет" },
      { id: "flat", en: "flat", ua: "квартира" },
    ],
  },
  {
    id: "home",
    title: "Rooms & things",
    pairs: [
      { id: "bathroom", en: "bathroom", ua: "ванна кімната" },
      { id: "bedroom", en: "bedroom", ua: "спальня" },
      { id: "kitchen", en: "kitchen", ua: "кухня" },
      { id: "living-room", en: "living room", ua: "вітальня" },
      { id: "shower", en: "shower", ua: "душ" },
      { id: "toilet", en: "toilet", ua: "туалет" },
      { id: "wifi", en: "wifi", ua: "вайфай" },
      { id: "lift", en: "lift", ua: "ліфт" },
    ],
  },
  {
    id: "adjectives",
    title: "Adjectives",
    pairs: [
      { id: "busy", en: "busy", ua: "жвавий / людний" },
      { id: "quiet", en: "quiet", ua: "тихий" },
      { id: "big", en: "big", ua: "великий" },
      { id: "small", en: "small", ua: "маленький" },
      { id: "cheap", en: "cheap", ua: "дешевий" },
      { id: "expensive", en: "expensive", ua: "дорогий" },
      { id: "old", en: "old", ua: "старий" },
      { id: "new", en: "new", ua: "новий" },
    ],
  },
] as const;
