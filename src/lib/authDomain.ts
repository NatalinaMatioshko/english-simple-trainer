/** Production host that proxies `/__/auth` to Firebase. See vercel.json. */
export const SAME_ORIGIN_AUTH_HOST = "english-simple-trainer.vercel.app";

/**
 * iPhone Safari drops a Google redirect whose helper lives on firebaseapp.com.
 * On the Vercel production host the helper is served from this site, so the
 * auth domain must be this host. Other devices keep the configured domain,
 * and laptop sign-in stays unchanged.
 */
export function resolveAuthDomain(
  configured: string,
  hostname: string,
  appleMobile: boolean,
): string {
  if (appleMobile && hostname === SAME_ORIGIN_AUTH_HOST) return hostname;
  return configured;
}

export function usesSameOriginGoogleAuth(
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
): boolean {
  return hostname === SAME_ORIGIN_AUTH_HOST;
}
