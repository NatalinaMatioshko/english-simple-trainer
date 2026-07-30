import { Link, useLocation } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import "../../styles/mobileNav.css";

type MobileNavItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

const mobileNavItems: MobileNavItem[] = [
  {
    to: "/",
    label: "Roadmap",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    ),
  },
  {
    to: "/trainer",
    label: "Trainer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M4 8h3v8H4zM17 8h3v8h-3z" />
        <path d="M7 12h10" />
        <path d="M2 10v4M22 10v4" />
      </svg>
    ),
  },
  {
    to: "/lessons",
    label: "Lessons",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M4 5h7a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4V5z" />
        <path d="M20 5h-7a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h7V5z" />
      </svg>
    ),
  },
  {
    to: "/vocab",
    label: "Словник",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8M8 11h6" />
      </svg>
    ),
  },
  {
    to: "/homework",
    label: "Homework",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
];

function isNavActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function MobileNav() {
  const { pathname } = useLocation();
  const activeIndex = Math.max(
    0,
    mobileNavItems.findIndex((item) => isNavActive(pathname, item.to)),
  );

  return (
    <nav className="mobile-nav" aria-label="Мобільна навігація">
      <ul className="mobile-nav-list">
        {mobileNavItems.map((item, index) => {
          const active = index === activeIndex;
          return (
            <li
              key={item.to}
              className={`mobile-nav-item${active ? " is-active" : ""}`}
            >
              <Link
                to={item.to}
                className="mobile-nav-link"
                aria-current={active ? "page" : undefined}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-title">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li
          className="mobile-nav-indicator"
          aria-hidden="true"
          style={
            {
              "--mobile-nav-index": activeIndex,
            } as CSSProperties
          }
        />
      </ul>
    </nav>
  );
}
