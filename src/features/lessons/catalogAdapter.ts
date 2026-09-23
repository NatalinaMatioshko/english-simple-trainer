import { getPublishedLessons } from "./lessonService";
import type { LessonRegistryEntry } from "../../types/lesson";

/** Catalog card shape shared with legacy Lessons page (without importing data/lessons). */
export type CatalogLessonCard = {
  id: string;
  title: string;
  level: string;
  topic: string;
  description: string;
  lessonPath: string;
  homeworkPath?: string;
};

export function registryToCatalogCard(
  entry: LessonRegistryEntry,
): CatalogLessonCard {
  return {
    id: entry.id,
    title: entry.title,
    level: entry.level,
    topic: entry.topic ?? "",
    description: entry.description ?? "",
    lessonPath: entry.route,
    homeworkPath: entry.homeworkPath,
  };
}

export function getContentDrivenCatalogCards(): CatalogLessonCard[] {
  return getPublishedLessons().map(registryToCatalogCard);
}

export function contentDrivenLessonIds(): Set<string> {
  return new Set(getPublishedLessons().map((e) => e.id));
}
