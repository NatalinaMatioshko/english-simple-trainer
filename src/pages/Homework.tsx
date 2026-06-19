import { Link } from "react-router-dom";
import "../styles/pages.css";

const homeworkByLesson = [
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    tasks: [
      "Writing — 'My Daily Routine'",
      "Reading test on test-english.com",
      "Quiz in the app: complete Lesson17Quiz until Correct",
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
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    tasks: [
      "Write 5 sentences about your routine using always / usually / often / sometimes / never.",
      "Record yourself answering 5 How often... questions.",
      "Make a mini routine about morning, work/school, evening, and bedtime.",
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
          Click a lesson card to open the homework page and complete tasks
          there.
        </p>
      </header>

      <section className="homework-list">
        {homeworkByLesson.map((lesson) => (
          <Link
            to={`/homework/${lesson.id}`}
            className="panel homework-card homework-card-link"
            key={lesson.id}
          >
            <h2>Lesson {lesson.id}</h2>
            <p className="lesson-topic">{lesson.title}</p>

            <ol className="homework-steps">
              {lesson.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>

            <span className="homework-open">Open homework</span>
          </Link>
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
