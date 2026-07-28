import { useEffect, useState } from "react";
import type { Feedback, QuizTask } from "../types/trainer";
import { shuffle } from "../utils/array";

export function useScoredQuiz(tasks: QuizTask[], quizKey: string) {
  const [index, setIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({ text: "", type: "" });
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [options, setOptions] = useState<string[]>(() =>
    shuffle(tasks[0]?.options ?? []),
  );

  useEffect(() => {
    setIndex(0);
    setAnsweredCount(0);
    setScore(0);
    setFeedback({ text: "", type: "" });
    setSelected(null);
    setLocked(false);
    setOptions(shuffle(tasks[0]?.options ?? []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizKey]);

  const finished = index >= tasks.length;
  const currentTask = !finished ? tasks[index] : null;
  const progress = tasks.length
    ? `${(answeredCount / tasks.length) * 100}%`
    : "0%";

  const handleAnswer = (option: string) => {
    if (locked || !currentTask) return;

    setSelected(option);
    setLocked(true);
    setAnsweredCount((prev) => prev + 1);

    if (option === currentTask.correct) {
      setScore((prev) => prev + 1);
      setFeedback({ text: "Правильно!", type: "success" });
    } else {
      setFeedback({
        text: `Правильний варіант: ${currentTask.correct}`,
        type: "error",
      });
    }
  };

  const nextTask = () => {
    if (index >= tasks.length - 1) {
      setIndex(tasks.length);
      return;
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);
    setSelected(null);
    setLocked(false);
    setFeedback({ text: "", type: "" });
    setOptions(shuffle(tasks[nextIndex].options));
  };

  const restart = () => {
    setIndex(0);
    setAnsweredCount(0);
    setScore(0);
    setFeedback({ text: "", type: "" });
    setSelected(null);
    setLocked(false);
    setOptions(shuffle(tasks[0]?.options ?? []));
  };

  return {
    currentTask,
    finished,
    progress,
    score,
    answeredCount,
    selected,
    locked,
    options,
    feedback,
    handleAnswer,
    nextTask,
    restart,
    total: tasks.length,
  };
}
