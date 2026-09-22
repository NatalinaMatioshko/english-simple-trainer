import { Link } from "react-router-dom";
import { reviewMaterials } from "../data/reviewHub";
import "../styles/pages.css";
import "../styles/reviewHub.css";

export default function ReviewHub() {
  return (
    <div className="page-shell review-hub">
      <header className="page-hero panel">
        <p className="page-kicker">Review &amp; rules</p>
        <h1>Повторення та правила</h1>
        <p className="page-subtitle">
          Сюди можна зайти будь-коли: подивитись правило, пройти презентацію або
          закріпити слабке місце без нового уроку.
        </p>
        <div className="review-hub-actions">
          <Link className="action-btn secondary" to="/self-study">
            Self-study drills
          </Link>
          <Link className="action-btn secondary" to="/extra-resources">
            Visual materials
          </Link>
          <Link className="action-btn secondary" to="/hw-42">
            HW42 practice
          </Link>
        </div>
      </header>

      <section className="review-hub-grid" aria-label="Review materials">
        {reviewMaterials.map((item) => (
          <article key={item.id} className="panel review-hub-card">
            <p className="page-kicker">{item.level}</p>
            <h2>{item.title}</h2>
            <p className="review-hub-topic">{item.topic}</p>
            <p className="review-hub-blurb">{item.blurb}</p>
            <ul className="review-hub-tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="review-hub-meta">{item.pages} slides · PDF · practice</p>
            <div className="review-hub-card-actions">
              <Link className="action-btn primary" to={`/review/${item.id}`}>
                Відкрити
              </Link>
              {item.relatedHw ? (
                <Link className="action-btn secondary" to={item.relatedHw}>
                  Related HW
                </Link>
              ) : null}
            </div>
          </article>
        ))}

        <article className="panel review-hub-card review-hub-card--soon">
          <p className="page-kicker">Soon</p>
          <h2>Більше правил</h2>
          <p className="review-hub-blurb">
            Сюди можна додавати інші презентації та шпаргалки: Past Simple,
            articles, time expressions…
          </p>
        </article>
      </section>
    </div>
  );
}
