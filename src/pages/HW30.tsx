import { Link } from "react-router-dom";
import "../styles/app.css";
import "../styles/lesson22.css";
import "../styles/lesson30.css";
import {
  a1LevelBands,
  a1LevelTasks,
  a1PassScore,
  getA1LevelBand,
  type Hw30LevelTask,
} from "../data/hw30LevelTest";
import { useScoredQuiz } from "../hooks/useScoredQuiz";

export default function HW30() {
  const quiz = useScoredQuiz(a1LevelTasks, "hw30-a1-level");
  const passScore = a1PassScore(quiz.total);
  const { band, percent } = getA1LevelBand(quiz.score, quiz.total);
  const currentTask = quiz.currentTask as Hw30LevelTask | null;
  const qNumber = quiz.finished
    ? quiz.total
    : quiz.locked
      ? quiz.answeredCount
      : quiz.answeredCount + 1;
  const isLastQuestion = quiz.answeredCount >= quiz.total && quiz.locked;
  const a1Confirmed = quiz.score >= passScore;

  return (
    <div className="hw30-immersive">
      <header className="hw30-immersive-bar">
        <div className="hw30-immersive-bar-top">
          <div>
            <p className="hw30-immersive-kicker">A1 Level Test</p>
            <p className="hw30-immersive-meta">
              {quiz.finished
                ? `Готово · ${quiz.score} / ${quiz.total}`
                : quiz.total > 0
                  ? `Питання ${qNumber} / ${quiz.total}`
                  : "Завантаження…"}
            </p>
          </div>
          <Link className="hw30-immersive-exit" to="/lesson-30">
            ← Lesson 30
          </Link>
        </div>
        <div
          className="progress hw30-immersive-progress"
          aria-label="Прогрес тесту"
        >
          <span style={{ width: quiz.progress }} />
        </div>
      </header>

      <main className="hw30-immersive-main">
        {quiz.total === 0 ? (
          <section className="hw30-immersive-card">
            <p className="hw30-immersive-hint">Готуємо тест…</p>
          </section>
        ) : !quiz.finished && currentTask ? (
          <section className="hw30-immersive-card" aria-live="polite">
            <p className="hw30-immersive-topic">{currentTask.topic}</p>
            <h1 className="hw30-immersive-question">{currentTask.text}</h1>

            <div className="hw30-immersive-answers">
              {quiz.options.map((option) => {
                const isCorrect =
                  quiz.locked && option === currentTask.correct;
                const isWrong =
                  quiz.locked &&
                  quiz.selected === option &&
                  option !== currentTask.correct;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`hw30-immersive-option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                    onClick={() => quiz.handleAnswer(option)}
                    disabled={quiz.locked}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {quiz.feedback.text ? (
              <p className={`hw30-immersive-feedback ${quiz.feedback.type}`}>
                {quiz.feedback.text}
              </p>
            ) : (
              <p className="hw30-immersive-hint">Обери одну відповідь</p>
            )}

            <button
              type="button"
              className="btn hw30-immersive-next"
              onClick={quiz.nextTask}
              disabled={!quiz.locked}
            >
              {isLastQuestion ? "Показати результат →" : "Наступне питання →"}
            </button>
          </section>
        ) : (
          <section
            className="hw30-immersive-card hw30-immersive-result"
            aria-live="polite"
          >
            <p className="hw30-immersive-topic">Визначення рівня</p>
            <h1 className="hw30-immersive-question hw30-result-headline">
              Твій результат:{" "}
              <span style={{ color: band.color }}>{band.labelUa}</span>
            </h1>
            <p className="hw30-result-scoreline">
              {quiz.score} з {quiz.total} правильних · <strong>{percent}%</strong>
            </p>

            <div
              className={`hw30-verdict ${a1Confirmed ? "pass" : "fail"}`}
              style={{ borderColor: band.color }}
            >
              <p className="hw30-verdict-label">
                {a1Confirmed ? "A1 підтверджено" : "A1 ще не підтверджено"}
              </p>
              <p className="hw30-verdict-cefr">
                CEFR: <strong>{band.cefr}</strong>
                {a1Confirmed
                  ? ` · поріг пройдено (${passScore}+ балів)`
                  : ` · потрібно ${passScore}+ балів (65%)`}
              </p>
              <p className="hw30-level-advice">{band.advice}</p>
            </div>

            <div className="hw30-scale" aria-label="Шкала рівнів A1">
              <p className="hw30-scale-title">Де ти на шкалі</p>
              <div className="hw30-scale-track">
                <div
                  className="hw30-scale-fill"
                  style={{
                    width: `${percent}%`,
                    background: band.color,
                  }}
                />
                <div
                  className="hw30-scale-marker"
                  style={{ left: `${percent}%`, borderColor: band.color }}
                  title={`${percent}%`}
                />
              </div>
              <ul className="hw30-scale-bands">
                {a1LevelBands.map((b) => {
                  const active = b.id === band.id;
                  return (
                    <li
                      key={b.id}
                      className={`hw30-scale-band ${active ? "active" : ""}`}
                      style={
                        active
                          ? { borderColor: b.color, background: `${b.color}14` }
                          : undefined
                      }
                    >
                      <span style={{ color: b.color }}>{b.minPercent}%+</span>
                      <strong>{b.labelUa}</strong>
                      <em>{b.cefr}</em>
                      {active ? (
                        <span className="hw30-scale-you">← твій рівень</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hw30-immersive-actions">
              <button
                type="button"
                className="btn"
                onClick={quiz.shuffleQuestions}
              >
                Пройти ще раз
              </button>
              <Link className="btn secondary" to="/lesson-30">
                ← Lesson 30
              </Link>
              <Link className="btn secondary" to="/vocab">
                Vocabulary →
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
