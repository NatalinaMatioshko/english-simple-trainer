import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { appNavItems, isAppNavActive } from "../../utils/appNav";
import { AppNavIcon } from "./AppNavIcon";

export function AppSidebar({ pathname }: { pathname: string }) {
  const { user, loading, displayName, isTeacher, logOut } = useAuth();

  return (
    <aside className="app-sidebar" aria-label="Навігація платформи">
      <Link to="/" className="app-sidebar-brand">
        <span className="app-sidebar-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 18V7.5a2.5 2.5 0 0 1 4.6-1.4L12 8l1.4-1.9A2.5 2.5 0 0 1 18 7.5V18" />
            <path d="M5 18h14" />
          </svg>
        </span>
        <span>
          <span className="app-sidebar-kicker">English A1–A2</span>
          <span className="app-sidebar-title">Simple Trainer</span>
        </span>
      </Link>

      <nav className="app-sidebar-nav">
        {appNavItems.map((item) => {
          const active = isAppNavActive(pathname, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`app-sidebar-link${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="app-sidebar-icon">
                <AppNavIcon name={item.id} />
              </span>
              {item.label}
            </Link>
          );
        })}
        {isTeacher && (
          <Link
            to="/admin/submissions"
            className={`app-sidebar-link${pathname.startsWith("/admin") ? " is-active" : ""}`}
            aria-current={pathname.startsWith("/admin") ? "page" : undefined}
          >
            <span className="app-sidebar-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M4 5h16v14H4z" />
                <path d="M8 9h8M8 13h5" />
              </svg>
            </span>
            Роботи учнів
          </Link>
        )}
      </nav>

      <div className="app-sidebar-footer">
        {!loading && user ? (
          <div className="app-sidebar-account">
            <p className="app-sidebar-user">
              {displayName}
              {isTeacher ? <span>вчитель</span> : null}
            </p>
            <button
              type="button"
              className="app-sidebar-auth-btn"
              onClick={() => void logOut()}
            >
              Вийти
            </button>
          </div>
        ) : !loading ? (
          <Link className="app-sidebar-auth-btn app-sidebar-auth-btn--link" to="/login">
            Увійти
          </Link>
        ) : (
          <p className="app-sidebar-user">Завантаження…</p>
        )}
        <ThemeToggle />
      </div>
    </aside>
  );
}
