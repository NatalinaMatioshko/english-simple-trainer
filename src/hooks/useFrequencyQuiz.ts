import { useState } from "react";
import { quizTasks } from "../data/tasks";
import type { Feedback } from "../types/trainer";
import { shuffle } from "../utils/array";

export function useFrequencyQuiz() {
  const [index, setIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [options, setOptions] = useState<string[]>(() =>
    shuffle(quizTasks[0].options),
  );

  const finished = index >= quizTasks.length;
  const currentTask = !finished ? quizTasks[index] : null;
  const progress = `${(answeredCount / quizTasks.length) * 100}%`;

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
    if (index >= quizTasks.length - 1) {
      setIndex(quizTasks.length);
      return;
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);
    setSelected(null);
    setLocked(false);
    setFeedback({ text: "", type: "" });
    setOptions(shuffle(quizTasks[nextIndex].options));
  };

  const restart = () => {
    setIndex(0);
    setAnsweredCount(0);
    setScore(0);
    setFeedback({ text: "", type: "" });
    setSelected(null);
    setLocked(false);
    setOptions(shuffle(quizTasks[0].options));
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
  };
}
