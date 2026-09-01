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
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "../firebase";

const TEACHER_EMAIL = (
  import.meta.env.VITE_TEACHER_EMAIL as string | undefined
)?.trim()
  .toLowerCase();

const googleProvider = new GoogleAuthProvider();

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
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function authErrorMessage(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : "";
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
      return "Браузер заблокував вікно. Дозволь pop-up.";
    default:
      return err instanceof Error
        ? err.message.slice(0, 160)
        : "Не вдалося увійти. Спробуй ще раз.";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
    });
    return unsub;
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
      signInWithGoogle: () =>
        signInWithPopup(auth, googleProvider).then(() => undefined),
      logOut: () => signOut(auth),
    }),
    [user, loading, isTeacher, displayName],
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
