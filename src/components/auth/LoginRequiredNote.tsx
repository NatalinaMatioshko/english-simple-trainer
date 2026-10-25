import { Link } from "react-router-dom";

/**
 * Shown instead of a submit action when nobody is signed in.
 * Login opens in a new tab so unsent work on this page is not lost;
 * Firebase Auth syncs the sign-in back to this tab automatically.
 */
export function LoginRequiredNote({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <p className={className} role="status">
      {message}{" "}
      <Link to="/login" target="_blank" rel="noopener noreferrer">
        Увійти →
      </Link>
    </p>
  );
}
