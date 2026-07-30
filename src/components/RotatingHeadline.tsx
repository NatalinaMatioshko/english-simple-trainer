import { useEffect, useRef, useState } from "react";
import "../styles/rotatingHeadline.css";

type RotatingWord = {
  text: string;
  tone: "accent" | "blue" | "red" | "teal" | "ink";
};

const DEFAULT_WORDS: RotatingWord[] = [
  { text: "Practice?", tone: "accent" },
  { text: "Grammar?", tone: "blue" },
  { text: "Confidence?", tone: "red" },
  { text: "Speaking?", tone: "teal" },
  { text: "Progress?", tone: "ink" },
];

type Props = {
  lead?: string;
  words?: RotatingWord[];
  intervalMs?: number;
};

export default function RotatingHeadline({
  lead = "Looking for",
  words = DEFAULT_WORDS,
  intervalMs = 2000,
}: Props) {
  const [currentWord, setCurrentWord] = useState(0);
  const [letterStates, setLetterStates] = useState<
    Record<number, Array<"in" | "out" | "behind">>
  >(() => {
    const initial: Record<number, Array<"in" | "out" | "behind">> = {};
    words.forEach((word, wi) => {
      initial[wi] = Array.from(word.text, () => (wi === 0 ? "in" : "behind"));
    });
    return initial;
  });
  const [visibleWord, setVisibleWord] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || words.length < 2) return;

    const clearTimers = () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };

    const runChange = (from: number) => {
      const to = from === words.length - 1 ? 0 : from + 1;
      const fromLen = words[from].text.length;
      const toLen = words[to].text.length;

      setLetterStates((prev) => {
        const next = { ...prev };
        next[from] = Array.from({ length: fromLen }, () => "in" as const);
        next[to] = Array.from({ length: toLen }, () => "behind" as const);
        return next;
      });
      setVisibleWord(to);

      for (let i = 0; i < fromLen; i++) {
        const id = window.setTimeout(() => {
          setLetterStates((prev) => {
            const copy = { ...prev, [from]: [...prev[from]] };
            copy[from][i] = "out";
            return copy;
          });
        }, i * 80);
        timers.current.push(id);
      }

      for (let i = 0; i < toLen; i++) {
        const id = window.setTimeout(() => {
          setLetterStates((prev) => {
            const copy = { ...prev, [to]: [...prev[to]] };
            copy[to][i] = "in";
            return copy;
          });
        }, 340 + i * 80);
        timers.current.push(id);
      }

      setCurrentWord(to);
    };

    const id = window.setInterval(() => {
      setCurrentWord((from) => {
        runChange(from);
        return from === words.length - 1 ? 0 : from + 1;
      });
    }, intervalMs);

    // kick first transition after interval
    return () => {
      window.clearInterval(id);
      clearTimers();
    };
  }, [intervalMs, words]);

  // Fix: the interval above double-advances currentWord. Rewrite cleaner.
  return (
    <h1 className="h-title">
      {lead}
      &nbsp;
      <span className="h-title-words" aria-live="polite">
        {words.map((word, wi) => (
          <span
            key={`${word.text}-${wi}`}
            className={`h-word h-word--${word.tone}`}
            style={{ opacity: visibleWord === wi ? 1 : 0 }}
            aria-hidden={visibleWord !== wi}
          >
            {Array.from(word.text).map((ch, li) => (
              <span
                key={`${wi}-${li}`}
                className={`h-letter ${letterStates[wi]?.[li] ?? "behind"}`}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        ))}
      </span>
      <span className="visually-hidden">
        {lead} {words[visibleWord]?.text}
      </span>
    </h1>
  );
}
