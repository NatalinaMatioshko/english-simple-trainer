import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>English Trainer</h1>
      <p>Choose a lesson or open the trainer.</p>

      <nav style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        <Link to="/trainer">Open trainer</Link>
        <Link to="/lesson-15">
          Lesson 15: Present Simple + Adverbs of frequency
        </Link>
      </nav>
    </div>
  );
}
