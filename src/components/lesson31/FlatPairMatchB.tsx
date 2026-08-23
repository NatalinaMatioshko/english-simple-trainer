import { useEffect, useState } from "react";
import {
  flatBoxRooms,
  flatBoxThings,
  flatMatchB,
  flatWordsB,
} from "../../data/lesson31";

export type FlatMatchProgress = {
  checked: boolean;
  score: number;
  total: number;
};

export default function FlatPairMatchB({
  onProgressChange,
}: {
  onProgressChange?: (progress: FlatMatchProgress) => void;
}) {
  const [flatAns, setFlatAns] = useState<Record<string, string>>({});
  const [flatChecked, setFlatChecked] = useState(false);
  const [flatPick, setFlatPick] = useState<
    | { side: "word"; word: string }
    | { side: "letter"; letter: string }
    | null
  >(null);
  const [flatShowAll, setFlatShowAll] = useState(false);
  const flatLetterOrder = flatMatchB.map((p) => p.letter);

  const flatScore = flatMatchB.filter((p) => flatAns[p.letter] === p.word)
    .length;

  useEffect(() => {
    onProgressChange?.({
      checked: flatChecked,
      score: flatScore,
      total: flatMatchB.length,
    });
  }, [flatChecked, flatScore, onProgressChange]);

  const wordToFlatLetter = Object.fromEntries(
    Object.entries(flatAns).map(([letter, word]) => [word, letter]),
  ) as Record<string, string>;

  const pairFlat = (word: string, letter: string) => {
    setFlatChecked(false);
    setFlatShowAll(false);
    setFlatAns((prev) => {
      const next = { ...prev };
      for (const [l, w] of Object.entries(next)) {
        if (w === word || l === letter) delete next[l];
      }
      next[letter] = word;
      return next;
    });
    setFlatPick(null);
  };

  const onFlatWord = (word: string) => {
    const linked = wordToFlatLetter[word];
    if (linked) {
      setFlatAns((prev) => {
        const next = { ...prev };
        delete next[linked];
        return next;
      });
      setFlatChecked(false);
      setFlatShowAll(false);
      setFlatPick(null);
      return;
    }
    if (flatPick?.side === "letter") {
      pairFlat(word, flatPick.letter);
      return;
    }
    setFlatPick(
      flatPick?.side === "word" && flatPick.word === word
        ? null
        : { side: "word", word },
    );
  };

  const onFlatLetter = (letter: string) => {
    if (flatAns[letter]) {
      setFlatAns((prev) => {
        const next = { ...prev };
        delete next[letter];
        return next;
      });
      setFlatChecked(false);
      setFlatShowAll(false);
      setFlatPick(null);
      return;
    }
    if (flatPick?.side === "word") {
      pairFlat(flatPick.word, letter);
      return;
    }
    setFlatPick(
      flatPick?.side === "letter" && flatPick.letter === letter
        ? null
        : { side: "letter", letter },
    );
  };

  return (
    <>
      <div className="l31-vocab-box" aria-label="Words in the box">
        <p className="l31-vocab-box-row">
          <span className="l31-vocab-box-label">Rooms:</span>
          <span className="l31-vocab-box-words">{flatBoxRooms.join(", ")}</span>
        </p>
        <p className="l31-vocab-box-row">
          <span className="l31-vocab-box-label">Things:</span>
          <span className="l31-vocab-box-words">{flatBoxThings.join(", ")}</span>
        </p>
      </div>

      <div className="l31-pair-match">
        <div className="l31-pair-col" aria-label="Words in the box">
          {flatWordsB.map((word) => {
            const linked = wordToFlatLetter[word];
            const key = flatMatchB.find((p) => p.word === word);
            const selected = flatPick?.side === "word" && flatPick.word === word;
            const matched = Boolean(linked);
            const correct = matched && key?.letter === linked;
            const wrong = flatChecked && matched && !correct;
            const ok = flatChecked && matched && correct;
            const cls = [
              "l31-pair-card",
              selected ? "is-selected" : "",
              matched ? "is-matched" : "",
              ok ? "is-ok" : "",
              wrong ? "is-err" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={word}
                type="button"
                className={cls}
                onClick={() => onFlatWord(word)}
                aria-pressed={selected || matched}
              >
                <span className="l31-pair-text">{word}</span>
                {matched && <span className="l31-pair-badge">{linked}</span>}
              </button>
            );
          })}
        </div>
        <div className="l31-pair-col" aria-label="Letters A–K">
          {flatLetterOrder.map((letter) => {
            const word = flatAns[letter];
            const key = flatMatchB.find((p) => p.letter === letter);
            const selected =
              flatPick?.side === "letter" && flatPick.letter === letter;
            const matched = Boolean(word);
            const correct = matched && key?.word === word;
            const wrong = flatChecked && matched && !correct;
            const ok = flatChecked && matched && correct;
            const cls = [
              "l31-pair-card",
              selected ? "is-selected" : "",
              matched ? "is-matched" : "",
              ok ? "is-ok" : "",
              wrong ? "is-err" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={letter}
                type="button"
                className={cls}
                onClick={() => onFlatLetter(letter)}
                aria-pressed={selected || matched}
              >
                <span className="l31-pair-key">{letter}.</span>
                {matched && <span className="l31-pair-text">{word}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {flatShowAll && (
        <div className="l31-fix-reveal" style={{ marginTop: "0.85rem" }}>
          <span className="l31-fix-answer">
            {flatMatchB.map((p) => `${p.letter} → ${p.word}`).join(" · ")}
          </span>
        </div>
      )}
      <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="l22-check-btn"
          onClick={() => setFlatChecked(true)}
        >
          Check
        </button>
        {flatChecked && (
          <span className="l22-score">
            {flatScore} / {flatMatchB.length}
          </span>
        )}
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            const next = !flatShowAll;
            setFlatShowAll(next);
            if (next) {
              setFlatAns(
                Object.fromEntries(
                  flatMatchB.map((p) => [p.letter, p.word]),
                ),
              );
              setFlatPick(null);
              setFlatChecked(true);
            }
          }}
        >
          {flatShowAll ? "Hide answers" : "Show answers"}
        </button>
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setFlatAns({});
            setFlatChecked(false);
            setFlatPick(null);
            setFlatShowAll(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}
