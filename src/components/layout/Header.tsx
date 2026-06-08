import type { Theme } from "../../types/trainer";

type HeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до тренажера
      </a>

      <header className="topbar">
        <div className="brand">
          <div className="logo" aria-label="Present Simple Trainer logo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M6 18V7.5a2.5 2.5 0 0 1 4.6-1.4L12 8l1.4-1.9A2.5 2.5 0 0 1 18 7.5V18" />
              <path d="M5 18h14" />
            </svg>
          </div>

          <div>
            <p className="muted">English A1-A2</p>
            <h1>Present Simple Trainer</h1>
          </div>
        </div>

        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label="Змінити тему"
        >
          {theme === "dark" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </header>
    </>
  );
}
