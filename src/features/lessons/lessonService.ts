import {
  getRegistryEntry,
  lessonRegistry,
} from "../../content/lessonRegistry";
import type { Lesson, LessonRegistryEntry } from "../../types/lesson";

export type LessonServiceErrorCode = "not_found" | "not_published" | "load_failed";

export class LessonServiceError extends Error {
  code: LessonServiceErrorCode;

  constructor(code: LessonServiceErrorCode, message: string) {
    super(message);
    this.name = "LessonServiceError";
    this.code = code;
  }
}

/**
 * Local content lesson service.
 * Swap the implementation later for Firestore without changing callers.
 */
export async function getLessonById(lessonId: string): Promise<Lesson> {
  const entry = getRegistryEntry(lessonId);
  if (!entry) {
    throw new LessonServiceError("not_found", `Lesson ${lessonId} not found`);
  }
  if (entry.status !== "published") {
    throw new LessonServiceError(
      "not_published",
      `Lesson ${lessonId} is not published`,
    );
  }
  try {
    return await entry.load();
  } catch (err) {
    console.error(err);
    throw new LessonServiceError(
      "load_failed",
      `Failed to load lesson ${lessonId}`,
    );
  }
}

/** Student-facing catalog: published only. */
export function getPublishedLessons(): LessonRegistryEntry[] {
  return lessonRegistry
    .filter((entry) => entry.status === "published")
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByModule(moduleId: string): LessonRegistryEntry[] {
  return getPublishedLessons().filter((entry) => entry.moduleId === moduleId);
}

export function isContentDrivenLessonId(lessonId: string): boolean {
  return Boolean(getRegistryEntry(lessonId));
}
