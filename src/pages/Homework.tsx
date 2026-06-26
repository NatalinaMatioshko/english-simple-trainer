import { Link } from "react-router-dom";
import "../styles/pages.css";

const homeworkByLesson = [
  {
    id: "19",
    title: "Do expressions + in / on / at practice",
    tasks: [
      {
        type: "link",
        label: "Test-English — Prepositions of time (page 3)",
        href: "https://test-english.com/grammar-points/a1/at-in-on-prepositions-time/3/",
      },
      {
        type: "link",
        label: "Test-English — Prepositions of place (page 2)",
        href: "https://test-english.com/grammar-points/a1/at-in-on-prepositions-of-place/2/",
      },
      {
        type: "link",
        label: "Test-English — Prepositions of place (page 3)",
        href: "https://test-english.com/grammar-points/a1/at-in-on-prepositions-of-place/3/",
      },
      {
        type: "text",
        text: "Write 6 sentences about your real day using at / in / on, for example: at 7 o’clock, in the morning, on Monday.",
      },
      {
        type: "text",
        text: "Write 6 short collocations: 3 with do and 3 with make, then make your own 2 sentences with them.",
      },
      {
        type: "text",
        text: "Send a short voice message about your routine and use at least 3 prepositions and 2 phrases with do or make.",
      },
    ],
  },
  {
    id: "18",
    title: "in / on / at / to",
    tasks: [
      {
        type: "text",
        text: "Write 6 sentences about your real routine using in / on / at / to.",
      },
      {
        type: "text",
        text: "Make 4 short questions with time and place expressions, for example: What time do you wake up? / Are you at home in the evening?",
      },
      {
        type: "text",
        text: "Send a short voice message about your day and use at least 5 target phrases, for example: at 7 o’clock, on Monday, in the morning, at work, to the gym.",
      },
    ],
  },
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    tasks: [
      { type: "text", text: "Writing — 'My Daily Routine'" },
      { type: "text", text: "Reading test on test-english.com" },
      {
        type: "text",
        text: "Quiz in the app: complete Lesson17Quiz until Correct",
      },
    ],
  },
  {
    id: "16",
    title: "Present Simple Practice",
    tasks: [
      {
        type: "text",
        text: "Write 5 do/does questions about your routine.",
      },
      {
        type: "text",
        text: "Give short answers to each question.",
      },
      {
        type: "text",
        text: "Make 3 questions about your family or friends.",
      },
    ],
  },
  {
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    tasks: [
      {
        type: "text",
        text: "Write 5 sentences about your routine using always / usually / often / sometimes / never.",
      },
      {
        type: "text",
        text: "Record yourself answering 5 How often... questions.",
      },
      {
        type: "text",
        text: "Make a mini routine about morning, work/school, evening, and bedtime.",
      },
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
          Click a lesson card to open the homework page.
        </p>
      </header>

      <section className="homework-list">
        {homeworkByLesson.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/homework/${lesson.id}`}
            className="panel homework-card homework-card-link"
          >
            <h2>Lesson {lesson.id}</h2>
            <p className="lesson-topic">{lesson.title}</p>

            <ol className="homework-steps">
              {lesson.tasks.map((task, index) => (
                <li key={`${lesson.id}-${index}`}>
                  {task.type === "link" ? task.label : task.text}
                </li>
              ))}
            </ol>

            <span className="homework-open">Open homework</span>
          </Link>
        ))}
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
