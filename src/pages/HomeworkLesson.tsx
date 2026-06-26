import { Link, useParams } from "react-router-dom";
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

export default function HomeworkLesson() {
  const { id } = useParams();
  const lesson = homeworkByLesson.find((item) => item.id === id);

  if (!lesson) {
    return (
      <div className="page-shell">
        <div className="panel">
          <h1>Homework not found</h1>
          <div className="homework-back">
            <Link className="back-link" to="/homework">
              Back to homework
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Lesson {lesson.id}</p>
        <h1>{lesson.title}</h1>
        <p className="page-subtitle">
          Complete the tasks below and open the links for extra practice.
        </p>
      </header>

      <section className="panel homework-detail-card">
        <ol className="homework-steps">
          {lesson.tasks.map((task, index) => (
            <li key={`${lesson.id}-${index}`}>
              {task.type === "link" ? (
                <a
                  href={task.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="homework-external-link"
                >
                  {task.label}
                </a>
              ) : (
                task.text
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="homework-back">
        <Link className="back-link" to="/homework">
          Back to homework
        </Link>
      </div>
    </div>
  );
}
