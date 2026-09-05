import type { ReactNode } from "react";
import type { AppNavId } from "../../utils/appNav";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function AppNavIcon({ name }: { name: AppNavId }) {
  switch (name) {
    case "home":
      return (
        <Icon>
          <rect x="3" y="3" width="7" height="7" rx="1.2" />
          <rect x="14" y="3" width="7" height="7" rx="1.2" />
          <rect x="3" y="14" width="7" height="7" rx="1.2" />
          <rect x="14" y="14" width="7" height="7" rx="1.2" />
        </Icon>
      );
    case "roadmap":
      return (
        <Icon>
          <path d="M4 6h9" />
          <path d="M4 12h16" />
          <path d="M4 18h11" />
          <circle cx="16" cy="6" r="1.4" />
          <circle cx="8" cy="12" r="1.4" />
          <circle cx="18" cy="18" r="1.4" />
        </Icon>
      );
    case "lessons":
      return (
        <Icon>
          <path d="M4 5h7a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4V5z" />
          <path d="M20 5h-7a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h7V5z" />
        </Icon>
      );
    case "trainer":
      return (
        <Icon>
          <path d="M4 8h3v8H4zM17 8h3v8h-3z" />
          <path d="M7 12h10" />
          <path d="M2 10v4M22 10v4" />
        </Icon>
      );
    case "vocab":
      return (
        <Icon>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
        </Icon>
      );
    case "homework":
      return (
        <Icon>
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </Icon>
      );
  }
}
