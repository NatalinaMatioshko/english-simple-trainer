import { useEffect, useMemo, useState } from "react";
import "../styles/app.css";
import type { Mode } from "../types/trainer";
import { quizTasks } from "../data/tasks";
import {
  checkpointTasks,
  practiceDecks,
  type PracticeDeckId,
} from "../data/practiceDecks";
import { useVerbFilter } from "../hooks/useVerbFilter";
import { useConjugationExercise } from "../hooks/useConjugationExercise";
import { useQuestionExercise } from "../hooks/useQuestionExercise";
import { useChoicePractice } from "../hooks/useChoicePractice";
import { useScoredQuiz } from "../hooks/useScoredQuiz";
import { Hero } from "../components/layout/Hero";
import { Sidebar } from "../components/layout/Sidebar";
import { VerbList } from "../components/study/VerbList";
import { ConjugationCard } from "../components/study/ConjugationCard";
import { QuestionBuilderCard } from "../components/study/QuestionBuilderCard";
import { ChoicePracticeCard } from "../components/practice/ChoicePracticeCard";
import { ScoredQuizCard } from "../components/practice/ScoredQuizCard";

export default function TrainerPage() {
  const [mode, setMode] = useState<Mode>("study");
  const [deckId, setDeckId] = useState<PracticeDeckId>("to-be-jobs");
  const [quizId, setQuizId] = useState<"checkpoint" | "frequency">("checkpoint");

  const { filter, setFilter, filteredVerbs, revealedVerbs, toggleVerbReveal } =
    useVerbFilter();
  const conjugation = useConjugationExercise();
  const question = useQuestionExercise();

  const activeDeck = useMemo(
    () => practiceDecks.find((d) => d.id === deckId) ?? practiceDecks[0],
    [deckId],
  );
  const choice = useChoicePractice(activeDeck.tasks, deckId);

  const checkpoint = useScoredQuiz(checkpointTasks, "checkpoint");
  const frequency = useScoredQuiz(quizTasks, "frequency");
  const activeQuiz = quizId === "checkpoint" ? checkpoint : frequency;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="app">
      <Hero mode={mode} setMode={setMode} />

      <main className="main-layout">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          mode={mode}
          deckHint={activeDeck.hint}
          quizProgress={activeQuiz.progress}
          quizAnsweredCount={activeQuiz.answeredCount}
          quizScore={activeQuiz.score}
          totalQuizQuestions={activeQuiz.total}
          quizLabel={
            quizId === "checkpoint"
              ? "Checkpoint L21–27"
              : "Adverbs of frequency"
          }
        />

        <section className="content">
          {mode === "study" && (
            <div className="study-layout">
              <VerbList
                verbs={filteredVerbs}
                revealedVerbs={revealedVerbs}
                onToggleVerb={toggleVerbReveal}
              />

              <div className="study-grid">
                <ConjugationCard
                  currentTask={conjugation.currentTask}
                  value={conjugation.value}
                  setValue={conjugation.setValue}
                  feedback={conjugation.feedback}
                  checkAnswer={conjugation.checkAnswer}
                  nextTask={conjugation.nextTask}
                />

                <QuestionBuilderCard
                  currentTask={question.currentTask}
                  value={question.value}
                  setValue={question.setValue}
                  feedback={question.feedback}
                  checkAnswer={question.checkAnswer}
                  nextTask={question.nextTask}
                />
              </div>
            </div>
          )}

          {mode === "practice" && (
            <div className="practice-layout">
              <section className="panel trainer-deck-panel">
                <h2>Колоди практики</h2>
                <p className="muted">
                  Обери тему з пройдених уроків (до Lesson 27) і потренуйся.
                </p>
                <div className="trainer-deck-tabs" role="tablist">
                  {practiceDecks.map((deck) => (
                    <button
                      key={deck.id}
                      type="button"
                      role="tab"
                      aria-selected={deckId === deck.id}
                      className={`trainer-deck-tab ${deckId === deck.id ? "active" : ""}`}
                      onClick={() => setDeckId(deck.id)}
                    >
                      <span className="trainer-deck-tab-title">{deck.title}</span>
                      <span className="trainer-deck-tab-badge">{deck.badge}</span>
                      <span className="trainer-deck-tab-lessons">
                        {deck.lessons}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <div className="practice-grid">
                <ChoicePracticeCard
                  title={activeDeck.title}
                  subtitle={activeDeck.lessons}
                  hint={activeDeck.hint}
                  currentTask={choice.currentTask}
                  currentNumber={choice.currentNumber}
                  total={choice.total}
                  options={choice.options}
                  answered={choice.answered}
                  selected={choice.selected}
                  feedback={choice.feedback}
                  handleAnswer={choice.handleAnswer}
                  nextTask={choice.nextTask}
                />

                <div className="trainer-quiz-stack">
                  <div className="trainer-quiz-switch" role="tablist">
                    <button
                      type="button"
                      className={`filter-btn ${quizId === "checkpoint" ? "active" : ""}`}
                      onClick={() => setQuizId("checkpoint")}
                    >
                      Checkpoint L21–27
                    </button>
                    <button
                      type="button"
                      className={`filter-btn ${quizId === "frequency" ? "active" : ""}`}
                      onClick={() => setQuizId("frequency")}
                    >
                      Frequency
                    </button>
                  </div>

                  {quizId === "checkpoint" ? (
                    <ScoredQuizCard
                      title="Checkpoint · Lessons 21–27"
                      subtitle="to be · jobs · family · articles · can · Present Simple"
                      successText="Супер! Ти добре тримаєш матеріал останніх уроків."
                      retryText="Повторіть jobs, family possessives і a/an/the — і спробуйте ще раз."
                      passScore={8}
                      currentTask={checkpoint.currentTask}
                      finished={checkpoint.finished}
                      score={checkpoint.score}
                      selected={checkpoint.selected}
                      locked={checkpoint.locked}
                      options={checkpoint.options}
                      feedback={checkpoint.feedback}
                      handleAnswer={checkpoint.handleAnswer}
                      nextTask={checkpoint.nextTask}
                      restart={checkpoint.restart}
                      total={checkpoint.total}
                    />
                  ) : (
                    <ScoredQuizCard
                      title="Тест: прислівники частоти"
                      subtitle="always · usually · sometimes · never"
                      successText="Супер! Ви добре знаєте adverbs of frequency."
                      retryText="Непогано. Повторіть always / usually / sometimes / never і спробуйте ще раз."
                      passScore={4}
                      currentTask={frequency.currentTask}
                      finished={frequency.finished}
                      score={frequency.score}
                      selected={frequency.selected}
                      locked={frequency.locked}
                      options={frequency.options}
                      feedback={frequency.feedback}
                      handleAnswer={frequency.handleAnswer}
                      nextTask={frequency.nextTask}
                      restart={frequency.restart}
                      total={frequency.total}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
