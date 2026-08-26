/* ── Lesson 35 · Unit 3D · English in action: directions ──────── */

export const lesson35Images = {
  townMap: "town-map.png",
  welcomeToMyTown: "welcome-to-my-town.png",
  goStraightOn: "go-straight-on.png",
  turnLeft: "turn-left.png",
  turnRight: "turn-right.png",
  goPastTheHotel: "go-past-the-hotel.png",
  nextToABank: "next-to-a-bank.png",
  goDownStationRoad: "go-down-station-road.png",
} as const;

/** 1 · Which buildings are on the map? (deliberately mixed with extras) */
export const mapPlaces = [
  { en: "Thai restaurant", onMap: true },
  { en: "Supermarket", onMap: true },
  { en: "Bookshop", onMap: true },
  { en: "Polish restaurant", onMap: true },
  { en: "Bank", onMap: true },
  { en: "Turkish restaurant", onMap: true },
  { en: "Hotel", onMap: true },
  { en: "Café", onMap: true },
  { en: "Cinema", onMap: true },
  { en: "Big house", onMap: true },
  { en: "Train station", onMap: true },
  { en: "Park", onMap: true },
  { en: "School", onMap: true },
  { en: "Hospital", onMap: false },
  { en: "Museum", onMap: false },
  { en: "Post office", onMap: false },
  { en: "Airport", onMap: false },
  { en: "Church", onMap: false },
] as const;

export const mapStreets = [
  "Market Street",
  "Bank Road",
  "Station Road",
  "Main Street",
  "Park Street",
] as const;

/** 2a · Listen (R14) and answer the questions. */
export const listenWhere = [
  {
    id: "l1",
    q: "Where is the woman?",
    options: [
      "She's at the train station.",
      "She's in the park.",
      "She's at the hotel.",
    ],
    answer: "She's at the train station.",
  },
  {
    id: "l2",
    q: "Where is her friend, David?",
    options: [
      "He's at the Polish restaurant, next to the bank.",
      "He's at the Turkish restaurant, on Station Road.",
      "He's at the café, on Main Street.",
    ],
    answer: "He's at the Polish restaurant, next to the bank.",
  },
] as const;

/** 2b · Match each picture A–F with the phrase you hear. */
export const directionPics = [
  {
    letter: "A",
    file: lesson35Images.goStraightOn,
    alt: "Blue arrow going straight across a crossroads",
    answer: "Go straight on.",
    ua: "Іди прямо.",
  },
  {
    letter: "B",
    file: lesson35Images.turnLeft,
    alt: "Red arrow turning left at a junction",
    answer: "Turn left.",
    ua: "Поверни ліворуч.",
  },
  {
    letter: "C",
    file: lesson35Images.turnRight,
    alt: "Car turning right at a junction",
    answer: "Turn right.",
    ua: "Поверни праворуч.",
  },
  {
    letter: "D",
    file: lesson35Images.goPastTheHotel,
    alt: "Arrow passing a building marked Hotel",
    answer: "Go past the hotel.",
    ua: "Пройди повз готель.",
  },
  {
    letter: "E",
    file: lesson35Images.nextToABank,
    alt: "Polish restaurant next to a bank",
    answer: "The restaurant is next to a bank.",
    ua: "Ресторан поряд із банком.",
  },
  {
    letter: "F",
    file: lesson35Images.goDownStationRoad,
    alt: "Arrow going up along Station Road",
    answer: "Go down Station Road.",
    ua: "Іди вздовж Station Road.",
  },
] as const;

export const directionPhraseOptions = [
  "Go straight on.",
  "Turn left.",
  "Turn right.",
  "Go past the hotel.",
  "The restaurant is next to a bank.",
  "Go down Station Road.",
] as const;

/** 3 · Useful phrases box (R15). */
export const usefulPhrases = [
  {
    group: "Ask",
    items: [
      { en: "Is there a supermarket near here?", ua: "Тут поблизу є супермаркет?" },
      { en: "Excuse me. Where's the cinema, please?", ua: "Перепрошую. Де кінотеатр?" },
    ],
  },
  {
    group: "Say where it is",
    items: [
      { en: "Yes, there's one on Station Road.", ua: "Так, один є на Station Road." },
      { en: "It's on Park Street.", ua: "Він на Park Street." },
      { en: "It's next to a restaurant.", ua: "Це поряд із рестораном." },
      { en: "It's on the right.", ua: "Це праворуч." },
      { en: "The supermarket is on the right.", ua: "Супермаркет праворуч." },
    ],
  },
  {
    group: "Give directions",
    items: [
      { en: "Go straight on.", ua: "Іди прямо." },
      { en: "Go down Main Street.", ua: "Іди вздовж Main Street." },
      { en: "Go past the bank.", ua: "Пройди повз банк." },
      { en: "Turn left at the bookshop.", ua: "Поверни ліворуч біля книгарні." },
      { en: "Turn right after the big house.", ua: "Поверни праворуч після великого будинку." },
    ],
  },
] as const;

/** 3b · Complete the useful phrases. */
export const phraseGaps = [
  { id: "p1", before: "Go", after: "on.", answer: "straight" },
  { id: "p2", before: "Go", after: "the bank.", answer: "past" },
  { id: "p3", before: "Go", after: "Main Street.", answer: "down" },
  { id: "p4", before: "Turn left", after: "the bookshop.", answer: "at" },
  { id: "p5", before: "It's", after: "to a restaurant.", answer: "next" },
  { id: "p6", before: "It's", after: "the right.", answer: "on" },
  { id: "p7", before: "Is", after: "a supermarket near here?", answer: "there" },
  { id: "p8", before: "", after: "me. Where's the cinema, please?", answer: "Excuse" },
] as const;

export const phraseGapBank = [
  "at",
  "down",
  "Excuse",
  "next",
  "on",
  "past",
  "straight",
  "there",
] as const;

/** 4a · Complete the conversations (R16). */
export type ConvSeg =
  | { kind: "text"; text: string }
  | {
      kind: "gap";
      id: string;
      answer: string;
      options: readonly string[];
    };

export type ConvLine = {
  who: "A" | "B";
  /** hide the speaker label — same speaker continues */
  cont?: boolean;
  segs: readonly ConvSeg[];
};

export const conversations: readonly {
  id: string;
  place: string;
  lines: readonly ConvLine[];
}[] = [
  {
    id: "conv1",
    place: "Supermarket",
    lines: [
      {
        who: "A",
        segs: [
          { kind: "text", text: "Excuse me." },
          {
            kind: "gap",
            id: "c1g1",
            answer: "Is there a supermarket near here?",
            options: [
              "Is there a supermarket near here?",
              "Is there a bookshop near here?",
              "Where are you from?",
            ],
          },
        ],
      },
      {
        who: "B",
        segs: [
          { kind: "text", text: "Yes, there's one on Station Road." },
          {
            kind: "gap",
            id: "c1g2",
            answer: "Go straight on",
            options: [
              "Go straight on",
              "Go down Station Road",
              "Turn right at the hotel",
            ],
          },
          {
            kind: "text",
            text: ", go past the Turkish restaurant and the supermarket is on the left.",
          },
        ],
      },
      { who: "A", segs: [{ kind: "text", text: "Thank you." }] },
      { who: "B", segs: [{ kind: "text", text: "You're welcome." }] },
    ],
  },
  {
    id: "conv2",
    place: "Cinema",
    lines: [
      {
        who: "A",
        segs: [
          { kind: "text", text: "Excuse me." },
          {
            kind: "gap",
            id: "c2g1",
            answer: "Where's the cinema, please?",
            options: [
              "Where's the cinema, please?",
              "Where's the bank, please?",
              "Is there a café near here?",
            ],
          },
        ],
      },
      {
        who: "B",
        segs: [
          { kind: "text", text: "It's on Park Street." },
          {
            kind: "gap",
            id: "c2g2",
            answer: "Go past the park",
            options: [
              "Go past the park",
              "Turn left at the bank",
              "Go down Market Street",
            ],
          },
          {
            kind: "text",
            text: ", go past the school and the cinema is on the left.",
          },
        ],
      },
      { who: "A", segs: [{ kind: "text", text: "Thanks." }] },
      { who: "B", segs: [{ kind: "text", text: "No problem." }] },
    ],
  },
  {
    id: "conv3",
    place: "Bookshop",
    lines: [
      {
        who: "A",
        segs: [
          { kind: "text", text: "Excuse me. Is there a bookshop near here?" },
        ],
      },
      {
        who: "B",
        segs: [
          { kind: "text", text: "Yes, there's one on Market Street." },
          {
            kind: "gap",
            id: "c3g1",
            answer: "Go down Station Road",
            options: [
              "Go down Station Road",
              "Go down Park Street",
              "Turn left at the park",
            ],
          },
          { kind: "text", text: "," },
          {
            kind: "gap",
            id: "c3g2",
            answer: "go past the hotel",
            options: [
              "go past the hotel",
              "go past the train station",
              "turn left at the café",
            ],
          },
          { kind: "text", text: "and turn right onto Market Street." },
        ],
      },
      { who: "A", segs: [{ kind: "text", text: "Thank you." }] },
      { who: "B", segs: [{ kind: "text", text: "No problem." }] },
    ],
  },
];

/** Wrap-up · Welcome to My Town poster (There is / There are revision). */
export const myTownFacts = [
  { place: "parks", note: "4", model: "There are four parks." },
  { place: "cafés", note: "6", model: "There are six cafés." },
  { place: "hospital", note: "1", model: "There is one hospital." },
  { place: "schools", note: "not many", model: "There aren't many schools." },
  { place: "stadium", note: "✗", model: "There isn't a stadium." },
  { place: "shops", note: "a lot", model: "There are a lot of shops." },
  { place: "river", note: "1", model: "There is one river." },
  { place: "bridges", note: "2", model: "There are two bridges." },
  { place: "airport", note: "✗", model: "There isn't an airport." },
] as const;

/** 5a · Choose a place and prepare directions from the train station. */
export const speakingPlaces = [
  "the bookshop",
  "the café",
  "the cinema",
  "the hotel",
  "the bank",
  "the Polish restaurant",
  "the Turkish restaurant",
  "the Thai restaurant",
  "the supermarket",
  "the big house",
  "the school",
] as const;
