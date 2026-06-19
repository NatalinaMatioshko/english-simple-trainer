import { Link } from "react-router-dom";
import "../styles/pages.css";

const homeworkByLesson = [
  {
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    tasks: [
      "Write 5 sentences about your routine using always / usually / often / sometimes / never.",
      "Record yourself answering 5 How often... questions.",
      "Make a mini routine about morning, work/school, evening, and bedtime.",
    ],
  },
  {
    id: "16",
    title: "Present Simple Practice",
    tasks: [
      "Write 5 do/does questions about your routine.",
      "Give short answers to each question.",
      "Make 3 questions about your family or friends.",
    ],
  },
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    tasks: [
      "Watch the video and repeat the questions aloud.",
      "Make 3 short answers about your routine.",
      "Record one minute of speaking about your day.",
    ],
  },
];

export default function Homework() {
  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Practice</p>
        <h1>Homework</h1>
        <p className="page-subtitle">
          Extra practice tasks for the current lessons.
        </p>
      </header>

      <section className="homework-list">
        {homeworkByLesson.map((lesson) => (
          <article className="panel homework-card" key={lesson.id}>
            <h2>Lesson {lesson.id}</h2>
            <p className="lesson-topic">{lesson.title}</p>

            <ol className="homework-steps">
              {lesson.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <div style={{ marginTop: "1.5rem" }}>
        <Link className="back-link" to="/lessons">
          Back to lessons
        </Link>
      </div>
    </div>
  );
}
