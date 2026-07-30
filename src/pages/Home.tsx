import { Link } from "react-router-dom";
import "../styles/pages.css";
import RoadmapSection from "../components/RoadmapSection";
import CoveredTopicsRoadmap from "../components/CoveredTopicsRoadmap";
import { RotatingWord, type RotatingWordItem } from "../components/RotatingWord";
import "../styles/roadmap.css";

const heroRotateWords: RotatingWordItem[] = [
  { text: "Trainer", tone: "primary" },
  { text: "Speaking", tone: "accent" },
  { text: "Listening", tone: "success" },
  { text: "Reading", tone: "error" },
  { text: "Progress", tone: "night" },
];

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

        <h1 className="home-hero-title">
          English Simple{" "}
          <RotatingWord words={heroRotateWords} className="home-hero-rotate" />
        </h1>
        <p className="page-subtitle">
          A simple learning hub for routines, questions, adverbs of frequency,
          and speaking practice.
        </p>
      </header>

      <blockquote className="home-quote panel">
        <p>«Циклічне повторення в різних контекстах»</p>
      </blockquote>

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
      <section className="home-covered-roadmap">
        <CoveredTopicsRoadmap id="home-a1-covered" />
      </section>
    </div>
  );
}
