import { useEffect, useState } from "react";
import type { Feedback, MixedTask } from "../types/trainer";
import { shuffle } from "../utils/array";

export function useChoicePractice(tasks: MixedTask[], deckKey: string) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({ text: "", type: "" });
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>(() =>
    shuffle(tasks[0]?.options ?? []),
  );

  useEffect(() => {
    setIndex(0);
    setFeedback({ text: "", type: "" });
    setAnswered(false);
    setSelected(null);
    setOptions(shuffle(tasks[0]?.options ?? []));
    // Reset when the deck changes; tasks come from the same render as deckKey.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckKey]);

  const currentTask = tasks[index] ?? tasks[0];

  const handleAnswer = (option: string) => {
    if (answered || !currentTask) return;

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
    if (!tasks.length) return;
    const nextIndex = (index + 1) % tasks.length;
    setIndex(nextIndex);
    setFeedback({ text: "", type: "" });
    setAnswered(false);
    setSelected(null);
    setOptions(shuffle(tasks[nextIndex].options));
  };

  return {
    currentTask,
    options,
    answered,
    selected,
    feedback,
    handleAnswer,
    nextTask,
    total: tasks.length,
    currentNumber: index + 1,
  };
}
