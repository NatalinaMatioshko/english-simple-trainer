import type { LessonRegistryEntry } from "../types/lesson";

/**
 * Single source of truth for content-driven lesson metadata.
 * Full section bodies live under src/content/lessons/lesson-XX/.
 */
export const lessonRegistry: LessonRegistryEntry[] = [
  {
    id: "36",
    number: 36,
    title: "Present Simple · daily verbs",
    level: "A1",
    moduleId: "a1-present",
    order: 36,
    status: "published",
    estimatedMinutes: 50,
    hasHomework: true,
    topic: "I wake up · do / don't · morning, work, lunch, weekend",
    description:
      "ELLLO A1-04: відео Present Simple, listening quiz, complete the sentences, do/don't і speaking про свою рутину з викладачем.",
    legacyRoute: "/lesson-36",
    route: "/lessons/36",
    homeworkPath: "/hw-36",
    load: async () => {
      const mod = await import("./lessons/lesson-36/lesson");
      return mod.lesson36;
    },
  },
  {
    id: "37",
    number: 37,
    title: "Present continuous · now vs every day",
    level: "A1",
    moduleId: "a1-present",
    order: 37,
    status: "published",
    estimatedMinutes: 45,
    hasHomework: true,
    topic: "I work every day · I am working now",
    description:
      "Контраст every day vs now: work/eat/drink/read/talk/sit, маркери часу, speaking з викладачем і дві picture cards.",
    legacyRoute: "/lesson-37",
    route: "/lessons/37",
    homeworkPath: "/hw-37",
    load: async () => {
      const mod = await import("./lessons/lesson-37/lesson");
      return mod.lesson37;
    },
  },
  {
    id: "38",
    number: 38,
    title: "You've got a friend",
    level: "A1",
    moduleId: "a1-present",
    order: 38,
    status: "published",
    estimatedMinutes: 55,
    hasHomework: true,
    topic: "have / has got · describe people",
    description:
      "Unit 4A: describe people with have/has got, match photos, and talk about a friend.",
    legacyRoute: "/lesson-38",
    route: "/lessons/38",
    homeworkPath: "/hw-38",
    load: async () => {
      const mod = await import("./lessons/lesson-38/lesson");
      return mod.lesson38;
    },
  },
];

export function getRegistryEntry(
  lessonId: string,
): LessonRegistryEntry | undefined {
  return lessonRegistry.find((entry) => entry.id === lessonId);
}
