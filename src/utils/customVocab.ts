/** Student-added vocabulary words (persisted in localStorage). */

export const CUSTOM_VOCAB_KEY = "vocab-custom-words";

export type CustomVocabWord = {
  id: string;
  en: string;
  ua: string;
  example?: string;
};

function isCustomVocabWord(value: unknown): value is CustomVocabWord {
  if (!value || typeof value !== "object") return false;
  const w = value as CustomVocabWord;
  return (
    typeof w.id === "string" &&
    typeof w.en === "string" &&
    typeof w.ua === "string" &&
    (w.example === undefined || typeof w.example === "string")
  );
}

export function loadCustomVocab(): CustomVocabWord[] {
  try {
    const raw = localStorage.getItem(CUSTOM_VOCAB_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCustomVocabWord);
  } catch {
    return [];
  }
}

export function saveCustomVocab(words: CustomVocabWord[]): void {
  localStorage.setItem(CUSTOM_VOCAB_KEY, JSON.stringify(words));
}

export function makeCustomVocabId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
