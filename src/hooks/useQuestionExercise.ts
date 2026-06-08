import { useState } from "react";
import { questionTasks } from "../data/tasks";
import type { Feedback } from "../types/trainer";
import { normalize } from "../utils/text";

export function useQuestionExercise() {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });

  const currentTask = questionTasks[index];

  const checkAnswer = () => {
    const userValue = normalize(value);
    const answer = normalize(currentTask.answer);

    if (userValue === answer) {
      setFeedback({
        text: "Питання складено правильно.",
        type: "success",
      });
    } else {
      setFeedback({
        text: `Правильний варіант: ${currentTask.answer}`,
        type: "error",
      });
    }
  };

  const nextTask = () => {
    setIndex((prev) => (prev + 1) % questionTasks.length);
    setValue("");
    setFeedback({ text: "", type: "" });
  };

  return {
    currentTask,
    value,
    setValue,
    feedback,
    checkAnswer,
    nextTask,
  };
}
