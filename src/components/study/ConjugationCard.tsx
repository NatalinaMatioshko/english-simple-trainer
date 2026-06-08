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
  return (
    <section className="panel">
      <h2>Відмінювання he / she / it</h2>

      <div className="exercise-box">
        <p className="sentence">
          {currentTask.sentence} ({currentTask.hint})
        </p>

        <input
          className="input"
          type="text"
          placeholder="Наприклад: drinks"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="controls" style={{ marginTop: "1rem" }}>
          <button className="btn" onClick={checkAnswer}>
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
