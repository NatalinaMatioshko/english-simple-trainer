import { Link } from "react-router-dom";
import "../styles/pages.css";
import RoadmapSection from "../components/RoadmapSection";
import "../styles/roadmap.css";
const shortcuts = [
  {
    title: "Trainer",
    description: "Open the main Present Simple training page.",
    path: "/trainer",
    button: "Open trainer",
  },
  {
    title: "Lessons",
    description: "See current lessons in one clean overview.",
    path: "/lessons",
    button: "Open lessons",
  },
  {
    title: "Homework",
    description: "Check homework tasks for the current lessons.",
    path: "/homework",
    button: "Open homework",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <header className="page-hero panel hero-home">
        <p className="page-kicker">English practice space</p>

        <h1>Present Simple Trainer for Petro</h1>
        <p className="page-subtitle">
          A simple learning hub for routines, questions, adverbs of frequency,
          and speaking practice.
        </p>
      </header>
      <section>
        <h2>"Циклічне повторення в різних контекстах"</h2>
      </section>

      <section className="cards-grid home-grid">
        {shortcuts.map((item) => (
          <article className="lesson-card panel home-card" key={item.title}>
            <h2>{item.title}</h2>
            <p className="lesson-desc">{item.description}</p>
            <Link className="action-btn primary" to={item.path}>
              {item.button}
            </Link>
          </article>
        ))}
      </section>
      <section>
        <RoadmapSection />
      </section>
    </div>
  );
}
