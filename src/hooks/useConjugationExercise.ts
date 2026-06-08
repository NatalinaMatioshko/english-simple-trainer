import { useState } from "react";
import { conjugationTasks } from "../data/tasks";
import type { Feedback } from "../types/trainer";
import { normalize } from "../utils/text";

export function useConjugationExercise() {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });

  const currentTask = conjugationTasks[index];

  const checkAnswer = () => {
    const userValue = normalize(value);
    const answer = currentTask.answer.toLowerCase();

    if (userValue === answer) {
      setFeedback({ text: "Так, правильно!", type: "success" });
    } else {
      setFeedback({
        text: `Правильна форма: ${currentTask.answer}`,
        type: "error",
      });
    }
  };

  const nextTask = () => {
    setIndex((prev) => (prev + 1) % conjugationTasks.length);
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
