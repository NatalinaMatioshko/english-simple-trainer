import { useEffect, useRef, useState, type CSSProperties } from "react";
import "../styles/rotatingWord.css";

export type RotatingWordItem = {
  text: string;
  tone: "primary" | "accent" | "success" | "error" | "night";
};

type Props = {
  words: RotatingWordItem[];
  intervalMs?: number;
  className?: string;
  /** Match project mobile breakpoint — no flip animation below this width */
  desktopMinWidth?: number;
};

/** Letter-flip cycle — timing/classes match the original CodePen animation. */
export function RotatingWord({
  words,
  intervalMs = 2000,
  className = "",
  desktopMinWidth = 901,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      window.matchMedia(`(min-width: ${desktopMinWidth}px)`).matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    const desktopMq = window.matchMedia(`(min-width: ${desktopMinWidth}px)`);
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setAnimate(desktopMq.matches && !reduceMq.matches);
    };

    sync();
    desktopMq.addEventListener("change", sync);
    reduceMq.addEventListener("change", sync);
    return () => {
      desktopMq.removeEventListener("change", sync);
      reduceMq.removeEventListener("change", sync);
    };
  }, [desktopMinWidth]);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root || words.length === 0 || !animate) return;

    const wordEls = Array.from(root.querySelectorAll<HTMLElement>(".word"));
    const wordArray: HTMLElement[][] = [];
    let currentWord = 0;
    const timers: number[] = [];

    const splitLetters = (word: HTMLElement) => {
      const content = word.dataset.word ?? word.textContent ?? "";
      word.textContent = "";
      const letters: HTMLElement[] = [];
      for (let i = 0; i < content.length; i += 1) {
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }
      wordArray.push(letters);
    };

    wordEls.forEach((el, i) => {
      splitLetters(el);
      el.style.opacity = i === 0 ? "1" : "0";
    });

    if (wordEls[0]) wordEls[0].style.opacity = "1";

    const animateLetterOut = (cw: HTMLElement[], i: number) => {
      timers.push(
        window.setTimeout(() => {
          cw[i].className = "letter out";
        }, i * 80),
      );
    };

    const animateLetterIn = (nw: HTMLElement[], i: number) => {
      timers.push(
        window.setTimeout(() => {
          nw[i].className = "letter in";
        }, 340 + i * 80),
      );
    };

    const changeWord = () => {
      if (wordArray.length < 2) return;

      const cw = wordArray[currentWord];
      const nw =
        currentWord === words.length - 1
          ? wordArray[0]
          : wordArray[currentWord + 1];

      for (let i = 0; i < cw.length; i += 1) {
        animateLetterOut(cw, i);
      }

      for (let i = 0; i < nw.length; i += 1) {
        nw[i].className = "letter behind";
        nw[0].parentElement!.style.opacity = "1";
        animateLetterIn(nw, i);
      }

      currentWord = currentWord === wordArray.length - 1 ? 0 : currentWord + 1;
    };

    changeWord();
    const intervalId = window.setInterval(changeWord, intervalMs);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(intervalId);
    };
  }, [words, intervalMs, animate]);

  const longest = words.reduce((n, w) => Math.max(n, w.text.length), 0);
  const first = words[0];

  if (!animate) {
    return (
      <span
        className={`rw-slot rw-slot--static ${className}`.trim()}
        style={{ "--rw-ch": first?.text.length ?? longest } as CSSProperties}
      >
        <span className={`word word--${first?.tone ?? "primary"} is-static`}>
          {first?.text ?? "Trainer"}
        </span>
      </span>
    );
  }

  return (
    <span
      ref={wrapRef}
      className={`rw-slot ${className}`.trim()}
      style={{ "--rw-ch": longest } as CSSProperties}
      aria-live="polite"
    >
      {words.map((word) => (
        <span
          key={word.text}
          className={`word word--${word.tone}`}
          data-word={word.text}
        >
          {word.text}
        </span>
      ))}
    </span>
  );
}
