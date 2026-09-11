import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appNavItems, isAppNavActive } from "../../utils/appNav";
import { AppNavIcon } from "./AppNavIcon";

export function AppSidebar({
  pathname,
  open,
  onCollapse,
  inertWhenClosed = false,
}: {
  pathname: string;
  open: boolean;
  onCollapse: () => void;
  inertWhenClosed?: boolean;
}) {
  const { user, loading, displayName, isTeacher, logOut } = useAuth();
  const hidden = inertWhenClosed && !open;

  return (
    <aside
      id="app-sidebar"
      className={`app-sidebar${open ? " is-open" : ""}`}
      aria-label="Навігація платформи"
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
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
          <>
            <Link
              to="/admin/submissions"
              className={`app-sidebar-link${pathname.startsWith("/admin/submissions") ? " is-active" : ""}`}
              aria-current={pathname.startsWith("/admin/submissions") ? "page" : undefined}
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
            <Link
              to="/admin/analyses"
              className={`app-sidebar-link${pathname.startsWith("/admin/analyses") ? " is-active" : ""}`}
              aria-current={pathname.startsWith("/admin/analyses") ? "page" : undefined}
            >
              <span className="app-sidebar-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M8 5h12M8 12h12M8 19h8" />
                  <path d="M4 5h.01M4 12h.01M4 19h.01" />
                </svg>
              </span>
              Аналізи уроків
            </Link>
          </>
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
        <button
          type="button"
          className="app-sidebar-collapse"
          onClick={onCollapse}
        >
          <span aria-hidden="true">«</span>
          Згорнути меню
        </button>
      </div>
    </aside>
  );
}
