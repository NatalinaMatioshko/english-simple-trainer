import { Link } from "react-router-dom";
import YouTubeLessons from "../components/YouTubeLessons";
import Lesson17Dialogues from "../components/Lesson17Dialogues";
import Lesson17Quiz from "../components/Lesson17Quiz";
import "../styles/lesson17.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import VocabularyFlashcards from "../components/VocabularyFlashcards";
import VocabularyMatchGame from "../components/VocabularyMatchGame";

export default function Lesson17() {
  return (
    <div className="page-shell">
      <header className="page-hero panel lesson-hero">
        <div className="lesson-topbar">
          <Link className="back-home-link" to="/">
            ← Home
          </Link>
        </div>

        <p className="page-kicker">Lesson 17</p>
        <h1>Present Simple + Speaking</h1>
        <p className="page-subtitle">
          Watch the video, repeat the patterns, and speak fast.
        </p>
      </header>

      <article className="panel lesson-card">
        <h2>Вечірні справи</h2>
        <a
          href="https://promova.com/uk/my-plan/appBJb23Byfy5g6CE/374?unit=appBJb23Byfy5g6CE6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Повторити "Вечірні справи"
        </a>
      </article>

      <YouTubeLessons />
      <Lesson17Dialogues />
      <Lesson17Quiz />
      <section className="cards-grid lesson17-grid">
        <article className="panel lesson-card">
          <h2>English Reading Test</h2>
          <div>
            <a
              href="https://test-english.com/reading/a1/top-things-that-i-do-a1-english-reading-test/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open reading test
            </a>
          </div>
        </article>

        {/*  <article className="panel lesson-card">
          <h2>Do / Does</h2>
          <p>I → Do I work?</p>
          <p>He → Does he play?</p>
          <p>They → Do they watch?</p>
        </article>

        <article className="panel lesson-card">
          <h2>Short answers</h2>
          <p>Yes, I do.</p>
          <p>No, she doesn’t.</p>
        </article>

        <article className="panel lesson-card">
          <h2>Final speaking</h2>
          <p>Make 3 questions about your routine.</p>
          <p>Answer them with short answers.</p>
        </article> */}
      </section>
      <section>
        <VocabularyFlashcards />
        <VocabularyMatchGame />
      </section>

      <ScrollToTopButton />
    </div>
  );
}
