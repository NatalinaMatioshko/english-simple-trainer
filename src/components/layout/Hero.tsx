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
            <span className="chip">50 дієслів</span>
            <span className="chip">he / she / it</span>
            <span className="chip">do / does</span>
            <span className="chip">adverbs of frequency</span>
          </div>

          <p className="subtitle" style={{ marginTop: "1rem" }}>
            Тренажер допомагає швидко повторити форму Present Simple, одразу
            попрактикувати питання та перевірити знання прислівників частоти.
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
            <strong>Present Simple</strong>
            <span>Щоденні дії та звички</span>
          </div>

          <div className="mini-card">
            <span className="muted">Підходить для</span>
            <strong>A1-A2</strong>
            <span>Початковий та базовий рівень</span>
          </div>

          <div className="mini-card">
            <span className="muted">Формат</span>
            <strong>Study + Practice + Vocab</strong>
            <span>Пояснення, вправи, словник окремо</span>
          </div>
        </div>
      </div>
    </section>
  );
}
