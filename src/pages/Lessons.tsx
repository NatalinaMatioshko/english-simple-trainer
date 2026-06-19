import { Link } from "react-router-dom";
import "../styles/pages.css";

const lessons = [
  {
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    level: "A1",
    topic: "Speaking",
    description:
      "Учень уже вміє говорити what he does, а тепер вчиться how often he does it.",
    lessonPath: "/trainer",
    homeworkPath: "/homework",
  },
  {
    id: "16",
    title: "Present Simple Practice",
    level: "A1-A2",
    topic: "Speaking drills",
    description:
      "Do / does, short answers, quick response, and routine speaking.",
    lessonPath: "/lesson-16",
    homeworkPath: "/homework",
  },
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    level: "A1-A2",
    topic: "Video lesson",
    description: "Watch the video, repeat the patterns, and speak fast.",
    lessonPath: "/lesson-17",
    homeworkPath: "/homework",
  },
];

export default function Lessons() {
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
        {lessons.map((lesson) => (
          <article className="lesson-card panel" key={lesson.id}>
            <div className="lesson-card-top">
              <span className="lesson-badge">Lesson {lesson.id}</span>
              <span className="lesson-badge secondary">{lesson.level}</span>
            </div>

            <h2>{lesson.title}</h2>
            <p className="lesson-topic">{lesson.topic}</p>
            <p className="lesson-desc">{lesson.description}</p>

            <div className="card-actions">
              <Link className="action-btn primary" to={lesson.lessonPath}>
                Open lesson
              </Link>
              <Link className="action-btn secondary" to={lesson.homeworkPath}>
                Open homework
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
