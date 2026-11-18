import { FirebaseError } from "firebase/app";
import { usesSameOriginGoogleAuth } from "./authDomain";
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
 * Android and in-app browsers block `signInWithPopup`, so they use a same-tab
 * redirect. iPhone does too, but only when the auth helper is on this site.
 * A popup on iPhone opens and Safari closes it immediately.
 */
const MOBILE_UA =
  /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Mobile/i;

const EMBEDDED_UA =
  /FBAN|FBAV|Instagram|Line\/|TikTok|musical_ly|BytedanceWebview|Telegram|Snapchat|MicroMessenger|(?:^|[\s;])wv(?:\)|\s|;)/i;

const POPUP_FALLBACK_CODES = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
]);

/** Set before a redirect so a silent return to the login page can be explained. */
const REDIRECT_FLAG = "google-redirect-started";

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

/** iPhone, iPad, and iPadOS "desktop" mode. */
export function isAppleMobileWebKit(
  env: GoogleSignInEnv = readGoogleSignInEnv(),
): boolean {
  const ipadOsDesktop = /Macintosh/i.test(env.userAgent) && env.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(env.userAgent) || ipadOsDesktop;
}

export function prefersGoogleRedirect(
  env: GoogleSignInEnv = readGoogleSignInEnv(),
  sameOriginAuth = usesSameOriginGoogleAuth(),
): boolean {
  // Popup on iPhone is closed by Safari before Google can finish.
  // Same-tab redirect only works when `/__/auth` is served by this site.
  if (isAppleMobileWebKit(env)) return sameOriginAuth;
  return MOBILE_UA.test(env.userAgent) || isEmbeddedWebView(env);
}

function markRedirectStarted(): void {
  try {
    sessionStorage.setItem(REDIRECT_FLAG, "1");
  } catch {
    /* private mode */
  }
}

function takeRedirectStarted(): boolean {
  try {
    const started = sessionStorage.getItem(REDIRECT_FLAG) === "1";
    sessionStorage.removeItem(REDIRECT_FLAG);
    return started;
  } catch {
    return false;
  }
}

export function shouldRetryGoogleWithRedirect(err: unknown): boolean {
  const code = err instanceof FirebaseError ? err.code : "";
  return POPUP_FALLBACK_CODES.has(code);
}

async function redirectToGoogle(auth: Auth): Promise<void> {
  markRedirectStarted();
  await signInWithRedirect(auth, googleProvider, browserPopupRedirectResolver);
}

export async function signInWithGoogleAccount(auth: Auth): Promise<void> {
  if (prefersGoogleRedirect()) {
    await redirectToGoogle(auth);
    return;
  }

  try {
    // No redirect resolver: on iPhone a failed popup must not bounce through
    // the redirect that Safari cannot finish.
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    if (!shouldRetryGoogleWithRedirect(err) || isAppleMobileWebKit()) throw err;
    await redirectToGoogle(auth);
  }
}

/** Call once on startup. A second call (React Strict Mode) reuses the same result. */
export function completeGoogleRedirect(auth: Auth): Promise<UserCredential | null> {
  if (!redirectResult) {
    redirectResult = getRedirectResult(auth, browserPopupRedirectResolver).then(
      (result) => {
        const started = takeRedirectStarted();
        if (!result && started && !auth.currentUser) {
          throw new FirebaseError(
            "auth/redirect-result-missing",
            "Google returned to the login page without a session.",
          );
        }
        return result;
      },
    );
  }
  return redirectResult;
}
