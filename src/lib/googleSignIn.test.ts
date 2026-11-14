import { FirebaseError } from "firebase/app";
import { describe, expect, it } from "vitest";
import {
  isEmbeddedWebView,
  prefersGoogleRedirect,
  shouldRetryGoogleWithRedirect,
  type GoogleSignInEnv,
} from "./googleSignIn";

const iphone: GoogleSignInEnv = {
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  platform: "iPhone",
  maxTouchPoints: 5,
};

const android: GoogleSignInEnv = {
  userAgent:
    "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  platform: "Linux armv8l",
  maxTouchPoints: 5,
};

const desktop: GoogleSignInEnv = {
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  platform: "Win32",
  maxTouchPoints: 0,
};

const touchLaptop: GoogleSignInEnv = {
  ...desktop,
  maxTouchPoints: 10,
};

const mac: GoogleSignInEnv = {
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  platform: "MacIntel",
  maxTouchPoints: 0,
};

const ipadDesktopMode: GoogleSignInEnv = {
  ...mac,
  maxTouchPoints: 5,
};

const instagram: GoogleSignInEnv = {
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 320.0.0.0.0",
  platform: "iPhone",
  maxTouchPoints: 5,
};

describe("prefersGoogleRedirect", () => {
  it("uses redirect on phones, tablets, and in-app browsers", () => {
    expect(prefersGoogleRedirect(iphone)).toBe(true);
    expect(prefersGoogleRedirect(android)).toBe(true);
    expect(prefersGoogleRedirect(ipadDesktopMode)).toBe(true);
    expect(prefersGoogleRedirect(instagram)).toBe(true);
  });

  it("keeps the popup on laptops, including a touchscreen Windows laptop", () => {
    expect(prefersGoogleRedirect(desktop)).toBe(false);
    expect(prefersGoogleRedirect(touchLaptop)).toBe(false);
    expect(prefersGoogleRedirect(mac)).toBe(false);
  });
});

describe("isEmbeddedWebView", () => {
  it("flags Instagram and leaves mobile Safari alone", () => {
    expect(isEmbeddedWebView(instagram)).toBe(true);
    expect(isEmbeddedWebView(iphone)).toBe(false);
  });
});

describe("shouldRetryGoogleWithRedirect", () => {
  it("falls back only when the popup cannot open", () => {
    expect(
      shouldRetryGoogleWithRedirect(
        new FirebaseError("auth/popup-blocked", "blocked"),
      ),
    ).toBe(true);
    expect(
      shouldRetryGoogleWithRedirect(
        new FirebaseError(
          "auth/operation-not-supported-in-this-environment",
          "unsupported",
        ),
      ),
    ).toBe(true);
    expect(
      shouldRetryGoogleWithRedirect(
        new FirebaseError("auth/popup-closed-by-user", "closed"),
      ),
    ).toBe(false);
    expect(shouldRetryGoogleWithRedirect(new Error("nope"))).toBe(false);
  });
});
