import { Link, useLocation } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

const navItems = [
  { to: "/", label: "Roadmap" },
  { to: "/trainer", label: "Trainer" },
  { to: "/lessons", label: "Lessons" },
  { to: "/vocab", label: "Словник" },
  { to: "/homework", label: "Homework" },
];

function isNavActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Header() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>

      <div className="site-header-shell">
        <header className="topbar site-topbar">
          <Link to="/" className="brand brand-link">
            <div className="logo" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M6 18V7.5a2.5 2.5 0 0 1 4.6-1.4L12 8l1.4-1.9A2.5 2.5 0 0 1 18 7.5V18" />
                <path d="M5 18h14" />
              </svg>
            </div>

            <div>
              <p className="muted site-header-kicker">English A1-A2</p>
              <p className="site-header-title">Present Simple Trainer</p>
            </div>
          </Link>

          <nav className="site-nav" aria-label="Головна навігація">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`site-nav-link ${isNavActive(pathname, item.to) ? "active" : ""}`}
                aria-current={isNavActive(pathname, item.to) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Змінити тему"
              title={theme === "dark" ? "Світла тема" : "Темна тема"}
            >
              {theme === "dark" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </header>
      </div>
    </>
  );
}
