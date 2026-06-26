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
    lessonPath: "/lesson-15",
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
  {
    id: "18",
    title: "in / on / at / to",
    level: "A1-A2",
    topic: "Prepositions",
    description:
      "Practice prepositions in time, place, and movement through pictures, quick tasks, and speaking.",
    lessonPath: "/lesson-18",
    homeworkPath: "/homework",
  },
  {
    id: "19",
    title: "Do expressions",
    level: "A1-A2",
    topic: "Vocabulary + speaking",
    description:
      "Learn common phrases with do, compare do vs make, and practise useful everyday expressions with cards and picture tasks.",
    lessonPath: "/lesson-19",
    homeworkPath: "/homework",
  },
  {
    id: "19.1",
    title: "about",
    level: "A1",
    topic: "about",
    description: "about.",
    lessonPath: "/about-me",
    homeworkPath: "/homework",
  },
  {
    id: "20",
    title: "Lesson 20",
    level: "A1",
    topic: "Coming soon",
    description: "Coming soon.",
    lessonPath: "/lesson-20",
    homeworkPath: "/homework",
  },
  {
    id: "21",
    title: "Lesson 21",
    level: "A1",
    topic: "Coming soon",
    description: "Coming soon.",
    lessonPath: "/lesson-21",
    homeworkPath: "/homework",
  },
];

export default function Lessons() {
  const reversedLessons = [...lessons].reverse();

  return (
    <div className="page-shell">
      <div className="page-top-actions">
        <Link className="action-btn secondary back-home-btn" to="/">
          ← Roadmap
        </Link>
      </div>

      <header className="page-hero panel">
        <p className="page-kicker">Course map</p>
        <h1>Lessons</h1>
        <p className="page-subtitle">
          Choose a lesson card to open the teaching page or jump to homework.
        </p>
      </header>

      <section className="cards-grid">
        {reversedLessons.map((lesson) => (
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
