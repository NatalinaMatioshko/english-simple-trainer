import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VocabSection } from "../components/vocab/VocabSection";
import "../styles/app.css";

export default function VocabPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="app vocab-page">
      <section className="vocab-page-hero panel">
        <div className="vocab-page-hero-top">
          <div>
            <p className="muted vocab-page-kicker">Vocabulary trainer</p>
            <h2 className="vocab-page-title">Словник</h2>
            <p className="vocab-page-subtitle muted">
              Окрема сторінка для таблиці, флешкарток і режиму практики —
              зручніше тренувати слова без відволікань від вправ.
            </p>
          </div>
          <div className="vocab-page-nav">
            <Link className="vocab-page-link" to="/trainer">
              ← Trainer
            </Link>
            <Link className="vocab-page-link vocab-page-link--ghost" to="/">
              Roadmap
            </Link>
          </div>
        </div>
        <div className="chips">
          <span className="chip">Таблиця</span>
          <span className="chip">Флешкартки</span>
          <span className="chip">Режим практики</span>
        </div>
      </section>

      <main className="vocab-page-main">
        <VocabSection />
      </main>
    </div>
  );
}
