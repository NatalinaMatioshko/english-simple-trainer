import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

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
              <p className="site-header-title">English Simple Trainer</p>
            </div>
          </Link>

          <nav className="site-nav" aria-label="Головна навігація">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`site-nav-link ${isNavActive(pathname, item.to) ? "active" : undefined}`}
                aria-current={isNavActive(pathname, item.to) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="topbar-actions">
            <ThemeToggle />
          </div>
        </header>
      </div>
    </>
  );
}
