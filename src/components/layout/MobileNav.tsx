import { Link, useLocation } from "react-router-dom";
import type { CSSProperties } from "react";
import { isAppNavActive, mobileNavItems } from "../../utils/appNav";
import { AppNavIcon } from "./AppNavIcon";
import "../../styles/mobileNav.css";

export function MobileNav() {
  const { pathname } = useLocation();
  const activeIndex = mobileNavItems.findIndex((item) =>
    isAppNavActive(pathname, item.to),
  );
  const hasActive = activeIndex >= 0;

  return (
    <nav className="mobile-nav" aria-label="Мобільна навігація">
      <ul className="mobile-nav-list">
        {mobileNavItems.map((item, index) => {
          const active = hasActive && index === activeIndex;
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
                <span className="mobile-nav-icon">
                  <AppNavIcon name={item.id} />
                </span>
                <span className="mobile-nav-title">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li
          className={`mobile-nav-indicator${hasActive ? "" : " is-hidden"}`}
          aria-hidden="true"
          style={
            {
              "--mobile-nav-index": Math.max(activeIndex, 0),
            } as CSSProperties
          }
        />
      </ul>
    </nav>
  );
}
