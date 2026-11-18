import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { resolveAuthDomain } from "./lib/authDomain";
import { isAppleMobileWebKit } from "./lib/googleSignIn";

function requiredEnv(name: string): string {
  const value = import.meta.env[name] as string | undefined;
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `Missing ${name}. Copy .env.example → .env.local and fill Firebase values.`,
    );
  }
  return value;
}

const firebaseConfig = {
  apiKey: requiredEnv("VITE_FIREBASE_API_KEY"),
  authDomain: resolveAuthDomain(
    requiredEnv("VITE_FIREBASE_AUTH_DOMAIN"),
    typeof window === "undefined" ? "" : window.location.hostname,
    typeof navigator !== "undefined" && isAppleMobileWebKit(),
  ),
  projectId: requiredEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: requiredEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: requiredEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: requiredEnv("VITE_FIREBASE_APP_ID"),
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
