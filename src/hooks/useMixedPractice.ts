import { useState } from "react";
import { mixedTasks } from "../data/tasks";
import type { Feedback } from "../types/trainer";
import { shuffle } from "../utils/array";

export function useMixedPractice() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>(() =>
    shuffle(mixedTasks[0].options),
  );

  const currentTask = mixedTasks[index];

  const handleAnswer = (option: string) => {
    if (answered) return;

    setSelected(option);
    setAnswered(true);

    if (option === currentTask.correct) {
      setFeedback({ text: "Правильно! Чудово.", type: "success" });
    } else {
      setFeedback({
        text: `Правильна відповідь: ${currentTask.correct}`,
        type: "error",
      });
    }
  };

  const nextTask = () => {
    const nextIndex = (index + 1) % mixedTasks.length;
    setIndex(nextIndex);
    setFeedback({ text: "", type: "" });
    setAnswered(false);
    setSelected(null);
    setOptions(shuffle(mixedTasks[nextIndex].options));
  };

  return {
    currentTask,
    options,
    answered,
    selected,
    feedback,
    handleAnswer,
    nextTask,
  };
}
