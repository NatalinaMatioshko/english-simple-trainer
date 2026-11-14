import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  browserPopupRedirectResolver,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  type Auth,
  type UserCredential,
} from "firebase/auth";

/**
 * Mobile Safari/Chrome and in-app browsers block or immediately close
 * `signInWithPopup`. A same-tab redirect survives that. Laptops stay on popup.
 */
const MOBILE_UA =
  /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Mobile/i;

const EMBEDDED_UA =
  /FBAN|FBAV|Instagram|Line\/|TikTok|musical_ly|BytedanceWebview|Telegram|Snapchat|MicroMessenger|(?:^|[\s;])wv(?:\)|\s|;)/i;

const POPUP_FALLBACK_CODES = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
]);

export type GoogleSignInEnv = {
  userAgent: string;
  platform: string;
  maxTouchPoints: number;
};

const googleProvider = new GoogleAuthProvider();

let redirectResult: Promise<UserCredential | null> | null = null;

export function readGoogleSignInEnv(): GoogleSignInEnv {
  if (typeof navigator === "undefined") {
    return { userAgent: "", platform: "", maxTouchPoints: 0 };
  }
  return {
    userAgent: navigator.userAgent || "",
    platform: navigator.platform || "",
    maxTouchPoints: navigator.maxTouchPoints || 0,
  };
}

export function isEmbeddedWebView(
  env: GoogleSignInEnv = readGoogleSignInEnv(),
): boolean {
  return EMBEDDED_UA.test(env.userAgent);
}

export function prefersGoogleRedirect(
  env: GoogleSignInEnv = readGoogleSignInEnv(),
): boolean {
  // iPadOS 13+ (and iPhone "Request Desktop Website") reports a Mac UA.
  const ipadOsDesktop = /Macintosh/i.test(env.userAgent) && env.maxTouchPoints > 1;
  return MOBILE_UA.test(env.userAgent) || ipadOsDesktop || isEmbeddedWebView(env);
}

export function shouldRetryGoogleWithRedirect(err: unknown): boolean {
  const code = err instanceof FirebaseError ? err.code : "";
  return POPUP_FALLBACK_CODES.has(code);
}

export async function signInWithGoogleAccount(auth: Auth): Promise<void> {
  if (prefersGoogleRedirect()) {
    await signInWithRedirect(auth, googleProvider, browserPopupRedirectResolver);
    return;
  }

  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    if (!shouldRetryGoogleWithRedirect(err)) throw err;
    await signInWithRedirect(auth, googleProvider, browserPopupRedirectResolver);
  }
}

/** Call once on startup. A second call (React Strict Mode) reuses the same result. */
export function completeGoogleRedirect(auth: Auth): Promise<UserCredential | null> {
  if (!redirectResult) {
    redirectResult = getRedirectResult(auth, browserPopupRedirectResolver);
  }
  return redirectResult;
}
