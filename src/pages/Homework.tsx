import { Link } from "react-router-dom";

const homework = [
  "Write 5 sentences about your routine using always / usually / often / sometimes / never.",
  "Record yourself answering 5 How often... questions.",
  "Make a mini routine about morning, work/school, evening, and bedtime.",
];

export default function Homework() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Homework</h1>
      <p>Lesson 15 practice tasks.</p>

      <ol style={{ marginTop: "1.5rem", lineHeight: 1.8 }}>
        {homework.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/lessons">Back to lessons</Link>
      </div>
    </div>
  );
}
