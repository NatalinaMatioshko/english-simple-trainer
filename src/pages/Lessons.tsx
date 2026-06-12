import { Link } from "react-router-dom";

const lessons = [
  {
    number: "15",
    title: "Present Simple + Adverbs of frequency",
    description:
      "How often he does something, where adverbs go in the sentence, and short speaking practice.",
    path: "/homework",
  },
];

export default function Lessons() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Lessons</h1>
      <p>Current lessons in this course.</p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {lessons.map((lesson) => (
          <article
            key={lesson.number}
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "12px",
            }}
          >
            <h2>Lesson {lesson.number}</h2>
            <p>{lesson.title}</p>
            <p>{lesson.description}</p>

            <Link to={lesson.path}>Open homework</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
