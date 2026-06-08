export function normalize(str: string): string {
  return str.trim().replace(/\s+/g, " ").toLowerCase();
}
