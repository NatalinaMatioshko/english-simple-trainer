import type { Mode } from "../../types/trainer";
import { Link, useLocation } from "react-router-dom";

type HeroProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export function Hero({ mode, setMode }: HeroProps) {
  const { pathname } = useLocation();

  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="chips">
            <span className="chip">Present Simple</span>
            <span className="chip">to be · jobs</span>
            <span className="chip">family · 's</span>
            <span className="chip">a / an / the</span>
            <span className="chip">can / can't</span>
          </div>

          <p className="subtitle" style={{ marginTop: "1rem" }}>
            Тренажер для повторення пройденого: Present Simple, to be + jobs,
            family &amp; possessives, articles/countries і can — плюс словник
            окремо.
          </p>

          <div
            className="mode-switch"
            role="tablist"
            aria-label="Перемикання режиму"
          >
            <button
              className={`mode-btn ${mode === "study" ? "active" : ""}`}
              onClick={() => setMode("study")}
              role="tab"
              aria-selected={mode === "study"}
            >
              Вивчення
            </button>

            <button
              className={`mode-btn ${mode === "practice" ? "active" : ""}`}
              onClick={() => setMode("practice")}
              role="tab"
              aria-selected={mode === "practice"}
            >
              Практика
            </button>

            <Link
              className={`mode-btn ${pathname === "/vocab" ? "active" : ""}`}
              to="/vocab"
              role="tab"
              aria-selected={pathname === "/vocab"}
            >
              Словник
            </Link>
          </div>
        </div>

        <div className="stats">
          <div className="mini-card">
            <span className="muted">Фокус</span>
            <strong>Lessons 15–27</strong>
            <span>Від Present Simple до family profile</span>
          </div>

          <div className="mini-card">
            <span className="muted">Підходить для</span>
            <strong>A1</strong>
            <span>Повторення після уроків курсу</span>
          </div>

          <div className="mini-card">
            <span className="muted">Формат</span>
            <strong>Study + Practice + Vocab</strong>
            <span>Колоди тем + checkpoint-тест</span>
          </div>
        </div>
      </div>
    </section>
  );
}
