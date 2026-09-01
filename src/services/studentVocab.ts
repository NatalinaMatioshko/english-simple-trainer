import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "../firebase";
import {
  loadCustomVocab,
  makeCustomVocabId,
  type CustomVocabWord,
} from "../utils/customVocab";

const COLLECTION = "studentVocab";

export function subscribeStudentVocab(
  user: User,
  isTeacher: boolean,
  onChange: (words: CustomVocabWord[]) => void,
  onError?: (message: string) => void,
): Unsubscribe {
  const q = isTeacher
    ? query(collection(db, COLLECTION))
    : query(collection(db, COLLECTION), where("ownerUid", "==", user.uid));

  return onSnapshot(
    q,
    (snap) => {
      const words: CustomVocabWord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          en: String(data.en ?? ""),
          ua: String(data.ua ?? ""),
          ...(typeof data.example === "string" && data.example
            ? { example: data.example }
            : {}),
          ...(typeof data.ownerName === "string" && data.ownerName
            ? { ownerName: data.ownerName }
            : {}),
        };
      });
      onChange(words.filter((w) => w.en && w.ua));
    },
    (err) => {
      console.error(err);
      onError?.(
        "Не вдалося завантажити слова з платформи. Перевір Firestore Rules.",
      );
    },
  );
}

export async function addStudentVocabWord(
  user: User,
  displayName: string,
  word: Omit<CustomVocabWord, "id">,
): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    en: word.en.trim(),
    ua: word.ua.trim(),
    example: word.example?.trim() || "",
    ownerUid: user.uid,
    ownerName: displayName.trim() || user.email || "Student",
    createdAt: serverTimestamp(),
  });
}

export async function deleteStudentVocabWord(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** Copy browser-only words to the platform once the student signs in. */
export async function migrateLocalVocabToCloud(
  user: User,
  displayName: string,
  existingCloud: CustomVocabWord[],
): Promise<number> {
  const local = loadCustomVocab();
  if (local.length === 0) return 0;
  const seen = new Set(existingCloud.map((w) => w.en.toLowerCase()));
  let added = 0;
  for (const w of local) {
    const key = w.en.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    await addStudentVocabWord(user, displayName, w);
    added += 1;
  }
  return added;
}

export function addLocalVocabWord(
  prev: CustomVocabWord[],
  word: Omit<CustomVocabWord, "id">,
): CustomVocabWord[] | null {
  const en = word.en.trim();
  if (prev.some((w) => w.en.toLowerCase() === en.toLowerCase())) {
    return null;
  }
  return [
    ...prev,
    {
      id: makeCustomVocabId(),
      en,
      ua: word.ua.trim(),
      ...(word.example ? { example: word.example } : {}),
    },
  ];
}
