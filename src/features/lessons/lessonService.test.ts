import { describe, expect, it, vi, afterEach } from "vitest";
import { lessonRegistry } from "../../content/lessonRegistry";
import * as registry from "../../content/lessonRegistry";
import {
  getLessonById,
  getPublishedLessons,
  LessonServiceError,
} from "./lessonService";
import type { LessonRegistryEntry } from "../../types/lesson";

describe("lessonRegistry", () => {
  it("has unique lesson ids", () => {
    const ids = lessonRegistry.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique order and number among published lessons", () => {
    const published = lessonRegistry.filter((e) => e.status === "published");
    const orders = published.map((e) => e.order);
    const numbers = published.map((e) => e.number);
    expect(new Set(orders).size).toBe(orders.length);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("requires core fields on every published entry", () => {
    for (const entry of lessonRegistry.filter((e) => e.status === "published")) {
      expect(entry.id).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.level).toBeTruthy();
      expect(typeof entry.order).toBe("number");
      expect(entry.status).toBe("published");
      expect(typeof entry.load).toBe("function");
    }
  });
});

describe("lessonService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(["36", "37", "38", "43"])(
    "getLessonById returns published lesson %s",
    async (id) => {
      const lesson = await getLessonById(id);
      expect(lesson.id).toBe(id);
      expect(lesson.status).toBe("published");
      expect(lesson.title).toBeTruthy();
      expect(lesson.sections.length).toBeGreaterThan(0);
    },
  );

  it("getLessonById throws controlled not_found for unknown id", async () => {
    await expect(getLessonById("does-not-exist")).rejects.toEqual(
      expect.objectContaining({
        name: "LessonServiceError",
        code: "not_found",
      }),
    );
    await expect(getLessonById("does-not-exist")).rejects.toBeInstanceOf(
      LessonServiceError,
    );
  });

  it("getLessonById rejects unpublished lessons", async () => {
    const draft: LessonRegistryEntry = {
      id: "99",
      number: 99,
      title: "Draft only",
      level: "A1",
      moduleId: "a1-present",
      order: 99,
      status: "draft",
      estimatedMinutes: 10,
      hasHomework: false,
      route: "/lessons/99",
      load: vi.fn(async () => {
        throw new Error("draft load should not run");
      }),
    };
    vi.spyOn(registry, "getRegistryEntry").mockReturnValue(draft);

    await expect(getLessonById("99")).rejects.toEqual(
      expect.objectContaining({ code: "not_published" }),
    );
    expect(draft.load).not.toHaveBeenCalled();
  });

  it("getPublishedLessons returns only published entries", () => {
    const published = getPublishedLessons();
    expect(published.length).toBeGreaterThan(0);
    expect(published.every((e) => e.status === "published")).toBe(true);
    expect(published.map((e) => e.id)).toEqual(
      expect.arrayContaining(["36", "37", "38", "43"]),
    );
  });
});
