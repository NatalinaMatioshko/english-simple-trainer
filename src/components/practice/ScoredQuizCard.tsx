import type { Feedback, QuizTask } from "../../types/trainer";

type ScoredQuizCardProps = {
  title: string;
  subtitle?: string;
  successText: string;
  retryText: string;
  passScore: number;
  currentTask: QuizTask | null;
  finished: boolean;
  score: number;
  selected: string | null;
  locked: boolean;
  options: string[];
  feedback: Feedback;
  handleAnswer: (option: string) => void;
  nextTask: () => void;
  restart: () => void;
  total: number;
};

export function ScoredQuizCard({
  title,
  subtitle,
  successText,
  retryText,
  passScore,
  currentTask,
  finished,
  score,
  selected,
  locked,
  options,
  feedback,
  handleAnswer,
  nextTask,
  restart,
  total,
}: ScoredQuizCardProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}

      <div className="exercise-box">
        {!finished && currentTask ? (
          <>
            <p className="question-line">{currentTask.text}</p>

            <div className="answers">
              {options.map((option) => {
                const isCorrect = locked && option === currentTask.correct;
                const isWrong =
                  locked &&
                  selected === option &&
                  option !== currentTask.correct;

                return (
                  <button
                    key={option}
                    className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                    onClick={() => handleAnswer(option)}
                    disabled={locked}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className={`feedback ${feedback.type}`}>{feedback.text}</div>

            <div className="controls" style={{ marginTop: "1rem" }}>
              <button className="btn secondary" onClick={nextTask}>
                Наступне питання
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="question-line">
              Тест завершено! Результат: {score} / {total}
            </p>

            <div
              className={`feedback ${score >= passScore ? "success" : "error"}`}
            >
              {score >= passScore ? successText : retryText}
            </div>

            <div className="controls" style={{ marginTop: "1rem" }}>
              <button className="btn secondary" onClick={restart}>
                Почати тест знову
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
