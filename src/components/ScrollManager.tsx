import { useEffect, useLayoutEffect, useRef } from "react";
import {
  NavigationType,
  useLocation,
  useNavigationType,
} from "react-router-dom";

/** Scroll Y positions keyed by React Router location.key */
const scrollPositions = new Map<string, number>();

/**
 * Forward nav (PUSH/REPLACE) → scroll to top (or hash target).
 * Back/forward (POP) → restore the saved scroll for that history entry.
 */
export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevKeyRef = useRef(location.key);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Remember scroll for the page we are leaving.
  useEffect(() => {
    const key = location.key;
    prevKeyRef.current = key;

    return () => {
      scrollPositions.set(key, window.scrollY);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    const { hash, key } = location;

    if (navigationType === NavigationType.Pop) {
      const y = scrollPositions.get(key) ?? 0;
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
      return;
    }

    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }

      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      };

      if (scrollToHash()) return;
      const t1 = window.setTimeout(scrollToHash, 80);
      const t2 = window.setTimeout(scrollToHash, 320);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.search, location.hash, location.key, navigationType]);

  return null;
}
