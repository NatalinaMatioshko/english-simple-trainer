import { useEffect, useRef } from "react";
import type { Feedback, QuestionTask } from "../../types/trainer";

type QuestionBuilderCardProps = {
  currentTask: QuestionTask;
  value: string;
  setValue: (value: string) => void;
  feedback: Feedback;
  checkAnswer: () => void;
  nextTask: () => void;
};

export function QuestionBuilderCard({
  currentTask,
  value,
  setValue,
  feedback,
  checkAnswer,
  nextTask,
}: QuestionBuilderCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
      <h2>Генератор питань do / does</h2>

      <div className="exercise-box">
        <p className="question-line task-prompt">{currentTask.prompt}</p>

        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="Наприклад: Do you play chess?"
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
            Нове питання
          </button>
        </div>

        <div className={`feedback ${feedback.type}`}>{feedback.text}</div>
      </div>
    </section>
  );
}
