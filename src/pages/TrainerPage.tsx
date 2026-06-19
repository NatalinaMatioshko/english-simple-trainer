import { useState } from "react";
import "../styles/app.css";
import type { Mode } from "../types/trainer";
import { quizTasks } from "../data/tasks";
import { useTheme } from "../hooks/useTheme";
import { useVerbFilter } from "../hooks/useVerbFilter";
import { useConjugationExercise } from "../hooks/useConjugationExercise";
import { useQuestionExercise } from "../hooks/useQuestionExercise";
import { useMixedPractice } from "../hooks/useMixedPractice";
import { useFrequencyQuiz } from "../hooks/useFrequencyQuiz";
import { Header } from "../components/layout/Header";
import { Hero } from "../components/layout/Hero";
import { Sidebar } from "../components/layout/Sidebar";
import { VerbList } from "../components/study/VerbList";
import { ConjugationCard } from "../components/study/ConjugationCard";
import { QuestionBuilderCard } from "../components/study/QuestionBuilderCard";
import { MixedPracticeCard } from "../components/practice/MixedPracticeCard";
import { FrequencyQuizCard } from "../components/practice/FrequencyQuizCard";

export default function TrainerPage() {
  const [mode, setMode] = useState<Mode>("study");

  const { theme, toggleTheme } = useTheme();
  const { filter, setFilter, filteredVerbs, revealedVerbs, toggleVerbReveal } =
    useVerbFilter();
  const conjugation = useConjugationExercise();
  const question = useQuestionExercise();
  const mixed = useMixedPractice();
  const quiz = useFrequencyQuiz();

  return (
    <div className="app" data-theme={theme}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Hero mode={mode} setMode={setMode} />

      <main id="main-content" className="main-layout">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          quizProgress={quiz.progress}
          quizAnsweredCount={quiz.answeredCount}
          quizScore={quiz.score}
          totalQuizQuestions={quizTasks.length}
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
              <div className="practice-grid">
                <MixedPracticeCard
                  currentTask={mixed.currentTask}
                  options={mixed.options}
                  answered={mixed.answered}
                  selected={mixed.selected}
                  feedback={mixed.feedback}
                  handleAnswer={mixed.handleAnswer}
                  nextTask={mixed.nextTask}
                />

                <FrequencyQuizCard
                  currentTask={quiz.currentTask}
                  finished={quiz.finished}
                  progress={quiz.progress}
                  score={quiz.score}
                  answeredCount={quiz.answeredCount}
                  selected={quiz.selected}
                  locked={quiz.locked}
                  options={quiz.options}
                  feedback={quiz.feedback}
                  handleAnswer={quiz.handleAnswer}
                  nextTask={quiz.nextTask}
                  restart={quiz.restart}
                  total={quizTasks.length}
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
