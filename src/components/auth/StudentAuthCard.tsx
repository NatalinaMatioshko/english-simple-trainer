import { useState } from "react";
import { authErrorMessage, useAuth } from "../../context/AuthContext";
import { isEmbeddedWebView } from "../../lib/googleSignIn";
import "../../styles/studentAuth.css";

type Mode = "login" | "register";

export function StudentAuthCard({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { registerWithEmail, signInWithEmail, signInWithGoogle, googleSignInError } =
    useAuth();
  const embeddedHint = isEmbeddedWebView()
    ? "Вхід через Google часто не працює у браузері всередині Telegram, Instagram чи Facebook. Відкрий це посилання в Safari або Chrome."
    : "";
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const shownError =
    error || (googleSignInError ? authErrorMessage(googleSignInError) : "");

  const run = async (fn: () => Promise<void>) => {
    setError("");
    setBusy(true);
    try {
      await fn();
      onSuccess?.();
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="student-auth panel" id="login">
      <div className="student-auth-tabs" role="tablist">
        <button
          type="button"
          className={mode === "login" ? "is-active" : ""}
          onClick={() => setMode("login")}
        >
          Увійти
        </button>
        <button
          type="button"
          className={mode === "register" ? "is-active" : ""}
          onClick={() => setMode("register")}
        >
          Реєстрація
        </button>
      </div>
      <p className="student-auth-lead">
        {mode === "register"
          ? "Створи акаунт учня, щоб зберігати свої слова на платформі. Вчитель теж їх побачить."
          : "Увійди, щоб твої слова в словнику зберігались не лише в цьому браузері."}
      </p>
      <form
        className="student-auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (mode === "register") {
            if (name.trim().length < 2) {
              setError("Вкажи ім'я (мінімум 2 літери).");
              return;
            }
            void run(() => registerWithEmail(name, email, password));
          } else {
            void run(() => signInWithEmail(email, password));
          }
        }}
      >
        {mode === "register" && (
          <label>
            <span>Ім'я</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </label>
        )}
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
            minLength={6}
            required
          />
        </label>
        {shownError && <p className="student-auth-error">{shownError}</p>}
        <button type="submit" className="action-btn primary" disabled={busy}>
          {busy
            ? "Зачекай…"
            : mode === "register"
              ? "Зареєструватись"
              : "Увійти"}
        </button>
      </form>
      {embeddedHint && <p className="student-auth-lead">{embeddedHint}</p>}
      <button
        type="button"
        className="action-btn secondary student-auth-google"
        disabled={busy}
        onClick={() => void run(() => signInWithGoogle())}
      >
        Увійти з Google
      </button>
    </section>
  );
}
