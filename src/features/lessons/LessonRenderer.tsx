import type { Lesson } from "../../types/lesson";
import { SectionRenderer } from "./SectionRenderer";

export function LessonRenderer({ lesson }: { lesson: Lesson }) {
  return (
    <>
      {lesson.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}
