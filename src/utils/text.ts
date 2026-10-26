export function normalize(str: string): string {
  return str.trim().replace(/\s+/g, " ").toLowerCase();
}

/**
 * Normalise a typed answer for comparison: trim, lowercase,
 * curly apostrophes → ', collapse spaces, drop trailing . ! ?
 */
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

/** True when a non-empty value matches any accepted answer after normalizeAnswer. */
export function matchesAnyAnswer(
  value: string,
  answers: readonly string[],
): boolean {
  const v = normalizeAnswer(value);
  return v !== "" && answers.some((a) => normalizeAnswer(a) === v);
}
