import { useId } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import "../../styles/themeToggle.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const rawId = useId().replace(/:/g, "");
  const btnId = `theme-toggle-${rawId}`;
  const isLight = theme === "light";

  return (
    <div
      className={`theme-toggle${isLight ? " is-on" : ""}`}
      title={isLight ? "Темна тема" : "Світла тема"}
    >
      <input
        type="checkbox"
        id={btnId}
        className="theme-toggle-input"
        checked={isLight}
        onChange={toggleTheme}
        aria-label={isLight ? "Увімкнути темну тему" : "Увімкнути світлу тему"}
      />
      <label htmlFor={btnId} className="theme-toggle-track">
        <span className="theme-toggle-thumb" aria-hidden="true" />
      </label>
      <div className="theme-toggle-lights" aria-hidden="true">
        <span className="theme-toggle-light theme-toggle-light--off" />
        <span className="theme-toggle-light theme-toggle-light--on" />
      </div>
    </div>
  );
}
