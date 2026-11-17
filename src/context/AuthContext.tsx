import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  completeGoogleRedirect,
  signInWithGoogleAccount,
} from "../lib/googleSignIn";

const TEACHER_EMAIL = (
  import.meta.env.VITE_TEACHER_EMAIL as string | undefined
)?.trim()
  .toLowerCase();

export function isTeacherEmail(email: string | null | undefined): boolean {
  if (!email || !TEACHER_EMAIL) return false;
  return email.trim().toLowerCase() === TEACHER_EMAIL;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isTeacher: boolean;
  displayName: string;
  registerWithEmail: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  /** Set when a Google redirect returns without a user (mobile sign-in). */
  googleSignInError: unknown;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function authErrorMessage(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : "";
  const haystack = `${code} ${err instanceof Error ? err.message : ""}`.toLowerCase();
  if (
    haystack.includes("disallowed_useragent") ||
    haystack.includes("disallowed-useragent")
  ) {
    return "Google не дозволяє вхід у вбудованому браузері. Відкрий сайт у Safari або Chrome.";
  }
  if (
    haystack.includes("referer") ||
    haystack.includes("referrer") ||
    haystack.includes("are-blocked")
  ) {
    const origin =
      typeof window !== "undefined" ? `${window.location.origin}/*` : "http://localhost:5174/*";
    return `Цей адрес заблокований у Google API key (HTTP referrers). У Google Cloud Console → Credentials → Browser key додай ${origin} (або відкрий сайт на http://localhost:5173/).`;
  }
  switch (code) {
    case "auth/email-already-in-use":
      return "Цей email уже зареєстрований. Увійди або обери інший.";
    case "auth/invalid-email":
      return "Некоректний email.";
    case "auth/weak-password":
      return "Пароль має бути щонайменше 6 символів.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Невірний email або пароль.";
    case "auth/operation-not-allowed":
      return "Email/пароль вимкнені. Увімкни Email/Password у Firebase Authentication.";
    case "auth/unauthorized-domain":
      return "Цей домен не дозволений у Firebase Auth → Authorized domains.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Вікно входу закрито. Спробуй ще раз.";
    case "auth/popup-blocked":
      return "Браузер заблокував вікно входу. Дозволь pop-up або відкрий сайт у Safari чи Chrome.";
    case "auth/redirect-cancelled-by-user":
      return "Вхід скасовано. Спробуй ще раз.";
    case "auth/redirect-operation-pending":
      return "Вхід уже відкривається. Зачекай або онови сторінку.";
    case "auth/web-storage-unsupported":
      return "Браузер не зберігає вхід. Вимкни приватний режим або відкрий сайт у Safari чи Chrome.";
    case "auth/redirect-result-missing":
      return "Google повернув на сторінку входу, але сесію не зберіг. На iPhone натисни «Увійти з Google» ще раз: має відкритись вікно, не нова сторінка. Якщо вікна немає, дозволь спливаючі вікна для цього сайту.";
    default:
      return err instanceof Error
        ? err.message.slice(0, 160)
        : "Не вдалося увійти. Спробуй ще раз.";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleSignInError, setGoogleSignInError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    let sawAuth = false;
    let redirectSettled = false;

    const unsub = onAuthStateChanged(auth, (next) => {
      if (!alive) return;
      sawAuth = true;
      setUser(next);
      if (next) setGoogleSignInError(null);
      if (redirectSettled) setLoading(false);
    });

    // Phones return here after Google. Wait for that result before showing
    // a signed-out screen, or the redirect login looks like it failed.
    void completeGoogleRedirect(auth)
      .catch((err) => {
        if (alive) setGoogleSignInError(err);
      })
      .finally(() => {
        redirectSettled = true;
        if (alive && sawAuth) setLoading(false);
      });

    return () => {
      alive = false;
      unsub();
    };
  }, []);

  const isTeacher = isTeacherEmail(user?.email);
  const displayName =
    user?.displayName?.trim() ||
    user?.email?.split("@")[0] ||
    (isTeacher ? "Teacher" : "Student");

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      isTeacher,
      displayName,
      registerWithEmail: async (name, email, password) => {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );
        const trimmed = name.trim();
        if (trimmed) {
          await updateProfile(cred.user, { displayName: trimmed });
          setUser({ ...cred.user, displayName: trimmed });
        }
      },
      signInWithEmail: (email, password) =>
        signInWithEmailAndPassword(auth, email.trim(), password).then(() => undefined),
      signInWithGoogle: async () => {
        setGoogleSignInError(null);
        await signInWithGoogleAccount(auth);
      },
      googleSignInError,
      logOut: () => signOut(auth),
    }),
    [user, loading, isTeacher, displayName, googleSignInError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
