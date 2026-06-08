import type { Feedback, MixedTask } from "../../types/trainer";

type MixedPracticeCardProps = {
  currentTask: MixedTask;
  options: string[];
  answered: boolean;
  selected: string | null;
  feedback: Feedback;
  handleAnswer: (option: string) => void;
  nextTask: () => void;
};

export function MixedPracticeCard({
  currentTask,
  options,
  answered,
  selected,
  feedback,
  handleAnswer,
  nextTask,
}: MixedPracticeCardProps) {
  return (
    <section className="panel">
      <h2>Швидка практика</h2>

      <div className="exercise-box">
        <h3>Оберіть правильну форму</h3>
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
