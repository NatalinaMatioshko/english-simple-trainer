import "../styles/loader.css";

type Props = {
  /** Full-viewport splash (default) or compact block for in-page loading */
  variant?: "page" | "inline";
  label?: string;
};

export function Loader({ variant = "page", label = "Loading…" }: Props) {
  return (
    <div
      className={
        variant === "inline" ? "app-loader app-loader--inline" : "app-loader"
      }
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="app-loader__box" aria-hidden="true">
        <div className="app-loader__ring">
          <span className="app-loader__core" />
        </div>
        <div className="app-loader__ring">
          <span className="app-loader__core" />
        </div>
        <div className="app-loader__ring">
          <i className="app-loader__dot" />
        </div>
        <div className="app-loader__ring">
          <i className="app-loader__dot" />
        </div>
      </div>
    </div>
  );
}
