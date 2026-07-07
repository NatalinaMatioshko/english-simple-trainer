import { useEffect, useRef } from "react";
import type { Feedback, ConjugationTask } from "../../types/trainer";

type ConjugationCardProps = {
  currentTask: ConjugationTask;
  value: string;
  setValue: (value: string) => void;
  feedback: Feedback;
  checkAnswer: () => void;
  nextTask: () => void;
};

export function ConjugationCard({
  currentTask,
  value,
  setValue,
  feedback,
  checkAnswer,
  nextTask,
}: ConjugationCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const skipInitialFocus = useRef(true);

  useEffect(() => {
    if (skipInitialFocus.current) {
      skipInitialFocus.current = false;
      return;
    }
    inputRef.current?.focus();
  }, [currentTask]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (feedback.text) {
        nextTask();
      } else {
        checkAnswer();
      }
    }
  };

  return (
    <section className="panel">
      <h2>Відмінювання he / she / it</h2>

      <div className="exercise-box">
        <p className="sentence">
          {currentTask.sentence}{" "}
          <span className="task-hint">({currentTask.hint})</span>
        </p>

        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="Наприклад: drinks"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />

        <div className="controls" style={{ marginTop: "1rem" }}>
          <button className="btn" onClick={checkAnswer} disabled={!value.trim()}>
            Перевірити
          </button>
          <button className="btn secondary" onClick={nextTask}>
            Наступне
          </button>
        </div>

        <div className={`feedback ${feedback.type}`}>{feedback.text}</div>
      </div>
    </section>
  );
}
