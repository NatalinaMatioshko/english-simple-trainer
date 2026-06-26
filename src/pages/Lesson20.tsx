import { Link } from "react-router-dom";
import "../styles/lesson20.css";

export default function Lesson20() {
  return (
    <div className="lesson20-page">
      <div className="lesson20-shell">
        <div className="lesson20-topbar">
          <Link className="lesson20-link" to="/lessons">
            ← Back to lessons
          </Link>

          <Link className="lesson20-link home" to="/">
            Go to home
          </Link>
        </div>

        <header className="lesson20-hero">
          <span className="lesson20-badge">Lesson 20</span>
          <h1>He / She / It</h1>
          <p className="lesson20-lead">
            Third person singular in the Present Simple.
          </p>
        </header>

        <section className="lesson20-section">
          <p className="lesson20-kicker">Warm-up · 5 min</p>
          <h2>Let’s talk</h2>
          <p className="lesson20-text">
            Start with a short personal conversation and move to family
            speaking.
          </p>

          <div className="lesson20-cards">
            <div className="lesson20-card">
              <h3>Question 1</h3>
              <p>How are you?</p>
            </div>

            <div className="lesson20-card">
              <h3>Question 2</h3>
              <p>How do you feel today?</p>
            </div>

            <div className="lesson20-card">
              <h3>Question 3</h3>
              <p>Tell me about your family.</p>
            </div>
          </div>

          <div className="lesson20-highlight">
            First speak about <strong>you</strong>, then speak about your
            family.
          </div>

          <div className="lesson20-actions">
            <Link className="lesson20-button primary" to="/about-me">
              Open About Me page
            </Link>

            <Link className="lesson20-button secondary" to="/roadmap">
              Back to roadmap
            </Link>
          </div>
        </section>

        <section className="lesson20-section">
          <p className="lesson20-kicker">Bridge to grammar</p>
          <h2>From “I” to “he / she”</h2>
          <ul className="lesson20-list">
            <li>I live in Kyiv. → She lives in Kyiv.</li>
            <li>I work every day. → He works every day.</li>
            <li>I go to school at 8. → She goes to school at 8.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
