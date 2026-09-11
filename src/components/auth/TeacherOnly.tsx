import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "../Loader";
import "../../styles/pages.css";

export function TeacherOnly({ children }: { children: ReactNode }) {
  const { user, loading, isTeacher, displayName, logOut } = useAuth();

  if (loading) {
    return <Loader label="Перевіряю вхід…" />;
  }

  if (!user) {
    return (
      <div className="page-shell">
        <header className="page-hero panel">
          <p className="page-kicker">Вчитель</p>
          <h1>Потрібен вхід</h1>
          <p className="page-subtitle">
            Аналізи уроків бачить лише вчитель. Увійди своїм Google-акаунтом.
          </p>
        </header>
        <section className="panel">
          <Link className="action-btn primary" to="/login">
            Увійти
          </Link>
        </section>
      </div>
    );
  }

  if (!isTeacher) {
    return (
      <div className="page-shell">
        <header className="page-hero panel">
          <p className="page-kicker">Вчитель</p>
          <h1>Немає доступу</h1>
          <p className="page-subtitle">
            Зараз відкритий акаунт <strong>{displayName}</strong>. Ця сторінка лише
            для вчительського входу.
          </p>
        </header>
        <section className="panel" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link className="action-btn secondary" to="/cabinet">
            До кабінету
          </Link>
          <button
            type="button"
            className="action-btn secondary"
            onClick={() => void logOut()}
          >
            Вийти і спробувати інший акаунт
          </button>
        </section>
      </div>
    );
  }

  return children;
}
