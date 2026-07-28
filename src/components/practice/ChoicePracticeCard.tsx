import type { Feedback, MixedTask } from "../../types/trainer";

type ChoicePracticeCardProps = {
  title: string;
  subtitle?: string;
  hint?: string;
  currentTask: MixedTask;
  currentNumber: number;
  total: number;
  options: string[];
  answered: boolean;
  selected: string | null;
  feedback: Feedback;
  handleAnswer: (option: string) => void;
  nextTask: () => void;
};

export function ChoicePracticeCard({
  title,
  subtitle,
  hint,
  currentTask,
  currentNumber,
  total,
  options,
  answered,
  selected,
  feedback,
  handleAnswer,
  nextTask,
}: ChoicePracticeCardProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
      {hint && <p className="trainer-deck-hint">{hint}</p>}

      <div className="exercise-box">
        <div className="trainer-task-meta muted">
          Завдання {currentNumber} / {total}
        </div>
        <h3>Оберіть правильний варіант</h3>
        <p className="sentence">{currentTask.text}</p>

        <div className="answers">
          {options.map((option) => {
            const isCorrect = answered && option === currentTask.correct;
            const isWrong =
              answered && selected === option && option !== currentTask.correct;

            return (
              <button
                key={option}
                className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                onClick={() => handleAnswer(option)}
                disabled={answered}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className={`feedback ${feedback.type}`}>{feedback.text}</div>

        <div className="controls" style={{ marginTop: "1rem" }}>
          <button className="btn secondary" onClick={nextTask}>
            Наступне завдання
          </button>
        </div>
      </div>
    </section>
  );
}
