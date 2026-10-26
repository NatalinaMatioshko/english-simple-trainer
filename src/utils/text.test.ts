import { describe, expect, it } from "vitest";
import { matchesAnyAnswer, normalizeAnswer } from "./text";

describe("normalizeAnswer", () => {
  it("turns curly apostrophes into a straight one", () => {
    expect(normalizeAnswer("I\u2019m here")).toBe("i'm here");
    expect(normalizeAnswer("I\u2018m here")).toBe("i'm here");
    expect(normalizeAnswer("I\u02bcm here")).toBe("i'm here");
  });

  it("collapses repeated spaces and trims", () => {
    expect(normalizeAnswer("  It   is   OK  ")).toBe("it is ok");
  });

  it("drops trailing . ! ? but keeps inner punctuation", () => {
    expect(normalizeAnswer("Where is it?")).toBe("where is it");
    expect(normalizeAnswer("Great!!")).toBe("great");
    expect(normalizeAnswer("Yes, I do.")).toBe("yes, i do");
    expect(normalizeAnswer("It's 7.30.")).toBe("it's 7.30");
  });
});

describe("matchesAnyAnswer", () => {
  it("returns false for an empty or blank value", () => {
    expect(matchesAnyAnswer("", ["anything"])).toBe(false);
    expect(matchesAnyAnswer("   ", ["anything"])).toBe(false);
  });

  it("accepts a correct answer despite case, spaces and punctuation", () => {
    expect(
      matchesAnyAnswer("  where IS  it ", ["Where is it?", "Where's it?"]),
    ).toBe(true);
    expect(matchesAnyAnswer("I\u2019m late", ["I'm late!"])).toBe(true);
  });

  it("rejects a wrong answer", () => {
    expect(matchesAnyAnswer("Where are you?", ["Where is it?"])).toBe(false);
  });
});
