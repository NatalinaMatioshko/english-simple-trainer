import { Link } from "react-router-dom";
import { lessons, type LessonEntry } from "../data/lessons";
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

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Course map</p>
        <h1>Lessons</h1>
        <p className="page-subtitle">
          Choose a lesson card to open the teaching page or jump to homework.
        </p>
      </header>

      <section className="cards-grid">
        {displayLessons.map((lesson) => (
          <article
            className={`lesson-card panel${lesson.practiceOnly ? " lesson-card--practice" : ""}`}
            key={lesson.id}
          >
            <div className="lesson-card-top">
              <span
                className="lesson-badge"
                aria-label={
                  lesson.practiceOnly ? "Practice" : `Lesson ${lesson.id}`
                }
              >
                {lesson.practiceOnly ? "Practice" : lesson.id}
              </span>
              <span className="lesson-badge secondary">{lesson.level}</span>
            </div>

            <h2>{lesson.title}</h2>
            <p className="lesson-topic">{lesson.topic}</p>
            <p className="lesson-desc">{lesson.description}</p>

            <div className="card-actions">
              <Link className="action-btn primary" to={lesson.lessonPath}>
                {lesson.practiceOnly ? "Start practice" : "Open lesson"}
              </Link>
              {!lesson.practiceOnly && lesson.homeworkPath && (
                <Link className="action-btn secondary" to={lesson.homeworkPath}>
                  Open homework
                </Link>
              )}
            </div>
          </article>
        ))}

        <article className="lesson-card panel lesson-card--resources">
          <div className="lesson-card-top">
            <span className="lesson-badge">Extra</span>
            <span className="lesson-badge secondary">Materials</span>
          </div>

          <h2>Extra resources</h2>
          <p className="lesson-topic">Visual materials</p>
          <p className="lesson-desc">
            16 інфографік і worksheets: phrasal verbs, idioms, WH questions,
            everyday actions, Harry Potter та ін.
          </p>

          <div className="card-actions">
            <Link className="action-btn primary" to="/extra-resources">
              Open visual materials
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
