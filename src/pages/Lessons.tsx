import { Link } from "react-router-dom";
import {
  lessonCovers,
  lessonCubeLabel,
  lessons,
  type LessonEntry,
} from "../data/lessons";
import "../styles/pages.css";

export default function Lessons() {
  const practiceLesson = lessons.find(
    (lesson): lesson is Extract<LessonEntry, { practiceOnly: true }> =>
      Boolean(lesson.practiceOnly),
  );
  const regularLessons = [...lessons.filter((lesson) => !lesson.practiceOnly)].reverse();
  const insertAfterIdx = regularLessons.findIndex((l) => l.id === "23");
  const displayLessons =
    practiceLesson && insertAfterIdx !== -1
      ? [
          ...regularLessons.slice(0, insertAfterIdx + 1),
          practiceLesson,
          ...regularLessons.slice(insertAfterIdx + 1),
        ]
      : practiceLesson
        ? [practiceLesson, ...regularLessons]
        : regularLessons;

  const currentLessonId = [...lessons]
    .filter((lesson) => !lesson.practiceOnly && /^\d+$/.test(lesson.id))
    .at(-1)?.id;

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Course map</p>
        <h1>Lessons</h1>
        <p className="page-subtitle">
          Обери картку, щоб відкрити урок.
        </p>
      </header>

      <section className="catalog-cubes" aria-label="Lesson cards">
        {displayLessons.map((lesson) => {
          const cover = lessonCovers[lesson.id];
          const isCurrent = lesson.id === currentLessonId;
          return (
            <Link
              key={lesson.id}
              to={lesson.lessonPath}
              className={`catalog-cube${lesson.practiceOnly ? " is-practice" : ""}${isCurrent ? " is-current" : " is-past"}`}
              aria-current={isCurrent ? "true" : undefined}
            >
              <span className="catalog-cube-media" aria-hidden="true">
                {cover ? (
                  <img src={cover} alt="" />
                ) : (
                  <span className="catalog-cube-fallback">
                    {lesson.practiceOnly ? "P" : lesson.id}
                  </span>
                )}
              </span>
              <span className="catalog-cube-body">
                <span className="catalog-cube-title">
                  {lessonCubeLabel(lesson)}
                </span>
              </span>
            </Link>
          );
        })}

        <Link to="/extra-resources" className="catalog-cube is-extra is-past">
          <span className="catalog-cube-media" aria-hidden="true">
            <img src={lessonCovers.extra} alt="" />
          </span>
          <span className="catalog-cube-body">
            <span className="catalog-cube-title">Extra. Visual materials</span>
          </span>
        </Link>
      </section>
    </div>
  );
}
