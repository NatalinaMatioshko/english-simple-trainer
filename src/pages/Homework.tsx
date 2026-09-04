import { Link } from "react-router-dom";
import {
  homeworkByLesson,
  homeworkCovers,
  homeworkHref,
} from "../data/homeworkList";
import "../styles/pages.css";

export default function Homework() {
  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Practice</p>
        <h1>Homework</h1>
        <p className="page-subtitle">
          Обери картку, щоб відкрити домашнє завдання.
        </p>
      </header>

      <section className="homework-cubes" aria-label="Homework cards">
        {homeworkByLesson.map((lesson) => {
          const cover = homeworkCovers[lesson.id];
          const taskCount = lesson.tasks.length;
          return (
            <Link
              key={lesson.id}
              to={homeworkHref(lesson)}
              className="homework-cube"
            >
              <span className="homework-cube-media" aria-hidden="true">
                {cover ? (
                  <img src={cover} alt="" />
                ) : (
                  <span className="homework-cube-fallback">{lesson.id}</span>
                )}
              </span>
              <span className="homework-cube-body">
                <span className="homework-cube-title">
                  {lesson.id}. {lesson.title}
                </span>
                <span className="homework-cube-meta">
                  {taskCount} {taskCount === 1 ? "task" : "tasks"}
                </span>
              </span>
            </Link>
          );
        })}
      </section>

      <div className="homework-actions">
        <Link className="back-link" to="/lessons">
          Back to lessons
        </Link>

        <Link className="home-link" to="/">
          Go to home
        </Link>
      </div>
    </div>
  );
}
