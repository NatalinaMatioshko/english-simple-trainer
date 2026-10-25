import { describe, expect, it } from "vitest";
import { shuffle } from "./array";

describe("shuffle", () => {
  it("does not mutate the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });

  it("returns a new array with the same elements", () => {
    const input = ["a", "b", "c", "d", "e"];
    const result = shuffle(input);
    expect(result).not.toBe(input);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("returns an empty array for an empty input", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("returns the single element for a one-item array", () => {
    expect(shuffle(["only"])).toEqual(["only"]);
  });

  it("produces all six permutations of three items about equally often", () => {
    const runs = 6000;
    const expected = runs / 6;
    const counts = new Map<string, number>();
    for (let i = 0; i < runs; i += 1) {
      const key = shuffle([1, 2, 3]).join("");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    expect(counts.size).toBe(6);
    for (const count of counts.values()) {
      expect(count).toBeGreaterThan(expected * 0.8);
      expect(count).toBeLessThan(expected * 1.2);
    }
  });
});
