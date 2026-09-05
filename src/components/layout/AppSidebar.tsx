import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appNavItems, isAppNavActive } from "../../utils/appNav";
import { AppNavIcon } from "./AppNavIcon";

export function AppSidebar({ pathname }: { pathname: string }) {
  const { user, loading, displayName, isTeacher, logOut } = useAuth();

  return (
    <aside className="app-sidebar" aria-label="Навігація платформи">
      <p className="app-sidebar-heading">Меню</p>

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
      </div>
    </aside>
  );
}
