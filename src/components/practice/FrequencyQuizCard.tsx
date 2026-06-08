import type { Feedback, QuizTask } from "../../types/trainer";

type FrequencyQuizCardProps = {
  currentTask: QuizTask | null;
  finished: boolean;
  progress: string;
  score: number;
  answeredCount: number;
  selected: string | null;
  locked: boolean;
  options: string[];
  feedback: Feedback;
  handleAnswer: (option: string) => void;
  nextTask: () => void;
  restart: () => void;
  total: number;
};

export function FrequencyQuizCard({
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
}: FrequencyQuizCardProps) {
  return (
    <section className="panel">
      <h2>Тест: прислівники частоти</h2>

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

            <div className={`feedback ${score >= 4 ? "success" : "error"}`}>
              {score >= 4
                ? "Супер! Ви добре знаєте adverbs of frequency."
                : "Непогано. Повторіть always / usually / sometimes / never і спробуйте ще раз."}
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
