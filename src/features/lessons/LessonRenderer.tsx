import type { Lesson } from "../../types/lesson";
import { useAuth } from "../../context/AuthContext";
import { SectionRenderer } from "./SectionRenderer";

export function LessonRenderer({ lesson }: { lesson: Lesson }) {
  const { isTeacher } = useAuth();
  const sections = lesson.sections.filter(
    (section) => !section.teacherOnly || isTeacher,
  );

  return (
    <>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}
