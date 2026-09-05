import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { appNavItems, getPageContext, isAppNavActive } from "../../utils/appNav";

export function AppTopbar() {
  const { pathname } = useLocation();
  const { title, crumbs } = getPageContext(pathname);
  const { user, loading } = useAuth();
  const topLinks = appNavItems.filter((item) => item.id !== "home");

  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <header className="app-topbar">
        <Link to="/" className="app-topbar-brand">
          <span className="app-topbar-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 18V7.5a2.5 2.5 0 0 1 4.6-1.4L12 8l1.4-1.9A2.5 2.5 0 0 1 18 7.5V18" />
              <path d="M5 18h14" />
            </svg>
          </span>
          <span className="app-topbar-wordmark">
            simple trainer<span>.</span>
          </span>
        </Link>

        <nav className="app-topbar-nav" aria-label="Основне меню">
          {topLinks.map((item) => {
            const active = isAppNavActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`app-topbar-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

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
          <ThemeToggle />
          {!loading &&
            (user ? (
              <Link className="app-topbar-cta" to="/cabinet">
                Кабінет
              </Link>
            ) : (
              <Link className="app-topbar-cta" to="/login">
                Увійти
              </Link>
            ))}
        </div>
      </header>
    </>
  );
}
