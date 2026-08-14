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
  rows: 8,
  cols: 9,
  title: "Town & home crossword",
} as const;

/**
 * Hand-checked grid (rows × cols):
 * 0: H O T E L . . . .
 * 1: O W I F I . . . .
 * 2: U . . . F L A T .
 * 3: S . . . T G O O D
 * 4: E X P E N S I V E
 * 5: . B A N K . . . .
 * 6: M A R K E T . . .
 * 7: . . K . B U S Y .
 *        ↑ PARK down ends on K
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
    col: 4,
    answer: "LIFT",
    clue: "Elevator in a building",
    clueUa: "ліфт",
  },
  {
    num: 3,
    dir: "across",
    row: 1,
    col: 1,
    answer: "WIFI",
    clue: "Internet in the flat (no cable)",
    clueUa: "вайфай",
  },
  {
    num: 4,
    dir: "across",
    row: 2,
    col: 4,
    answer: "FLAT",
    clue: "Apartment",
    clueUa: "квартира",
  },
  {
    num: 5,
    dir: "across",
    row: 3,
    col: 5,
    answer: "GOOD",
    clue: "Opposite of bad",
    clueUa: "хороший",
  },
  {
    num: 6,
    dir: "across",
    row: 4,
    col: 0,
    answer: "EXPENSIVE",
    clue: "Opposite of cheap",
    clueUa: "дорогий",
  },
  {
    num: 7,
    dir: "down",
    row: 4,
    col: 2,
    answer: "PARK",
    clue: "A green place in a town",
    clueUa: "парк",
  },
  {
    num: 8,
    dir: "across",
    row: 5,
    col: 1,
    answer: "BANK",
    clue: "A place for money",
    clueUa: "банк",
  },
  {
    num: 9,
    dir: "across",
    row: 6,
    col: 0,
    answer: "MARKET",
    clue: "Buy fruit and vegetables here",
    clueUa: "ринок",
  },
  {
    num: 10,
    dir: "across",
    row: 7,
    col: 4,
    answer: "BUSY",
    clue: "Opposite of quiet (a … town)",
    clueUa: "жвавий / людний",
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
