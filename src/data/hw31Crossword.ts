/** HW31 · Crossword from Lesson 31 (town · home · adjectives) */

export type CrosswordDir = "across" | "down";

export type CrosswordEntry = {
  num: number;
  dir: CrosswordDir;
  row: number;
  col: number;
  answer: string;
  clue: string;
  clueUa: string;
};

export const hw31CrosswordMeta = {
  rows: 14,
  cols: 17,
  title: "Town, home & review crossword",
} as const;

/**
 * A connected, traditional crossword. Every answer crosses at least one
 * other answer; dots are empty space around the drawn figure.
 *
 * HOTEL...B.L......
 * O..X...FAMILY....
 * U..P..P.N.F......
 * SUPERMARKET......
 * E..N..R....NUMBER
 * .BUSY.K.......O..
 * ...I......S...O..
 * .W.V.M....T.F.K..
 * CINEMA....A.L.S.F
 * .F...R....TEACHER
 * .I...K....I.T.O.I
 * .....E....O...P.E
 * ..RESTAURANT....N
 * .............GOOD
 */
export const hw31CrosswordEntries: readonly CrosswordEntry[] = [
  {
    num: 1,
    dir: "across",
    row: 0,
    col: 0,
    answer: "HOTEL",
    clue: "A place to stay when you travel",
    clueUa: "готель",
  },
  {
    num: 1,
    dir: "down",
    row: 0,
    col: 0,
    answer: "HOUSE",
    clue: "Not a flat — a …",
    clueUa: "будинок",
  },
  {
    num: 2,
    dir: "down",
    row: 0,
    col: 3,
    answer: "EXPENSIVE",
    clue: "Opposite of cheap",
    clueUa: "дорогий",
  },
  {
    num: 3,
    dir: "down",
    row: 0,
    col: 8,
    answer: "BANK",
    clue: "A place where people keep money",
    clueUa: "банк",
  },
  {
    num: 4,
    dir: "down",
    row: 0,
    col: 10,
    answer: "LIFT",
    clue: "It takes you to another floor",
    clueUa: "ліфт",
  },
  {
    num: 5,
    dir: "across",
    row: 1,
    col: 7,
    answer: "FAMILY",
    clue: "Parents, children, brothers and sisters",
    clueUa: "сім’я · повторення",
  },
  {
    num: 6,
    dir: "down",
    row: 2,
    col: 6,
    answer: "PARK",
    clue: "A green place in a town",
    clueUa: "парк",
  },
  {
    num: 7,
    dir: "across",
    row: 3,
    col: 0,
    answer: "SUPERMARKET",
    clue: "A large shop for food and household things",
    clueUa: "супермаркет",
  },
  {
    num: 8,
    dir: "across",
    row: 4,
    col: 11,
    answer: "NUMBER",
    clue: "One, two and three are examples of this",
    clueUa: "число · повторення",
  },
  {
    num: 9,
    dir: "down",
    row: 4,
    col: 14,
    answer: "BOOKSHOP",
    clue: "A shop where you buy books",
    clueUa: "книгарня",
  },
  {
    num: 10,
    dir: "across",
    row: 5,
    col: 1,
    answer: "BUSY",
    clue: "Opposite of quiet (a … town)",
    clueUa: "жвавий / людний",
  },
  {
    num: 11,
    dir: "down",
    row: 6,
    col: 10,
    answer: "STATION",
    clue: "Trains arrive and leave from here",
    clueUa: "вокзал / станція",
  },
  {
    num: 12,
    dir: "down",
    row: 7,
    col: 1,
    answer: "WIFI",
    clue: "Wireless internet",
    clueUa: "вайфай",
  },
  {
    num: 13,
    dir: "down",
    row: 7,
    col: 5,
    answer: "MARKET",
    clue: "You can buy fruit and vegetables here",
    clueUa: "ринок",
  },
  {
    num: 14,
    dir: "down",
    row: 7,
    col: 12,
    answer: "FLAT",
    clue: "A home in a larger building",
    clueUa: "квартира",
  },
  {
    num: 15,
    dir: "across",
    row: 8,
    col: 0,
    answer: "CINEMA",
    clue: "A place where you watch films",
    clueUa: "кінотеатр",
  },
  {
    num: 16,
    dir: "down",
    row: 8,
    col: 16,
    answer: "FRIEND",
    clue: "A person you know and like",
    clueUa: "друг / подруга · повторення",
  },
  {
    num: 17,
    dir: "across",
    row: 9,
    col: 10,
    answer: "TEACHER",
    clue: "A person who helps students learn",
    clueUa: "вчитель / вчителька · повторення",
  },
  {
    num: 18,
    dir: "across",
    row: 12,
    col: 2,
    answer: "RESTAURANT",
    clue: "A place where you sit and eat a meal",
    clueUa: "ресторан",
  },
  {
    num: 19,
    dir: "across",
    row: 13,
    col: 13,
    answer: "GOOD",
    clue: "Opposite of bad",
    clueUa: "хороший",
  },
] as const;

export function buildCrosswordCellMap(
  entries: readonly CrosswordEntry[],
  rows: number,
  cols: number,
): {
  letters: (string | null)[][];
  numbers: (number | null)[][];
} {
  const letters: (string | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  );
  const numbers: (number | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  );

  for (const e of entries) {
    if (numbers[e.row]![e.col] == null) {
      numbers[e.row]![e.col] = e.num;
    }
    for (let i = 0; i < e.answer.length; i++) {
      const r = e.dir === "down" ? e.row + i : e.row;
      const c = e.dir === "across" ? e.col + i : e.col;
      const ch = e.answer[i]!;
      const prev = letters[r]![c];
      if (prev != null && prev !== ch) {
        throw new Error(
          `Crossword clash at ${r},${c}: ${prev} vs ${ch} (${e.num}${e.dir[0]})`,
        );
      }
      letters[r]![c] = ch;
    }
  }

  return { letters, numbers };
}
