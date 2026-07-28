import { useEffect, useState } from "react";
import type { Feedback, QuizTask } from "../types/trainer";
import { shuffle } from "../utils/array";

function buildQueue(tasks: QuizTask[]) {
  const queue = shuffle(tasks);
  return {
    queue,
    options: shuffle(queue[0]?.options ?? []),
  };
}

export function useScoredQuiz(tasks: QuizTask[], quizKey: string) {
  const [queue, setQueue] = useState<QuizTask[]>([]);
  const [index, setIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({ text: "", type: "" });
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const resetWith = (nextQueue: QuizTask[]) => {
    setQueue(nextQueue);
    setIndex(0);
    setAnsweredCount(0);
    setScore(0);
    setFeedback({ text: "", type: "" });
    setSelected(null);
    setLocked(false);
    setOptions(shuffle(nextQueue[0]?.options ?? []));
    setReady(true);
  };

  useEffect(() => {
    resetWith(buildQueue(tasks).queue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizKey]);

  const finished = ready && index >= queue.length;
  const currentTask = ready && !finished ? queue[index] : null;
  const progress =
    ready && queue.length
      ? `${(answeredCount / queue.length) * 100}%`
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
    if (index >= queue.length - 1) {
      setIndex(queue.length);
      return;
    }

    const nextIndex = index + 1;
    setIndex(nextIndex);
    setSelected(null);
    setLocked(false);
    setFeedback({ text: "", type: "" });
    setOptions(shuffle(queue[nextIndex].options));
  };

  /** Restart with the same question order */
  const restart = () => {
    resetWith([...queue]);
  };

  /** Shuffle all questions and start from the beginning */
  const shuffleQuestions = () => {
    resetWith(buildQueue(tasks).queue);
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
    shuffleQuestions,
    total: queue.length,
  };
}
