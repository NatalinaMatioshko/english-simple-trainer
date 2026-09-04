import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { getPageContext } from "../../utils/appNav";

export function AppTopbar() {
  const { pathname } = useLocation();
  const { title, crumbs } = getPageContext(pathname);
  const { user, loading, displayName, isTeacher, logOut } = useAuth();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <header className="app-topbar">
        <div className="app-topbar-copy">
          <nav className="app-breadcrumb" aria-label="Навігаційний шлях">
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <span key={`${crumb.label}-${index}`} className="app-breadcrumb-item">
                  {index > 0 ? (
                    <span className="app-breadcrumb-sep" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {crumb.to && !last ? (
                    <Link to={crumb.to}>{crumb.label}</Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
          <p className="app-topbar-title">{title}</p>
        </div>

        <div className="app-topbar-actions">
          {!loading &&
            (user ? (
              <div className="app-topbar-account">
                <span>
                  {displayName}
                  {isTeacher ? " · вчитель" : ""}
                </span>
                <button type="button" onClick={() => void logOut()}>
                  Вийти
                </button>
              </div>
            ) : (
              <Link className="app-topbar-login" to="/login">
                Увійти
              </Link>
            ))}
          <div className="app-topbar-theme">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
