import { useState } from "react";

type QuizItem = {
  question: string;
  answers: string[];
  placeholder: string;
};

type QuizState = {
  value: string;
  checked: boolean;
  isCorrect: boolean | null;
};

const quizItems: QuizItem[] = [
  {
    question: "Do you play basketball?",
    answers: ["Yes, I play", "No, I don't play"],
    placeholder: "Type your answer",
  },
  {
    question: "Do you have a pet?",
    answers: ["Yes, I have", "No, I don't have"],
    placeholder: "Type your answer",
  },
  {
    question: "Do you cook dinner?",
    answers: ["Yes, I cook", "No, I don't cook"],
    placeholder: "Type your answer",
  },
  {
    question: "Do you buy groceries?",
    answers: ["Yes, I buy", "No, I don't buy"],
    placeholder: "Type your answer",
  },
  {
    question: "Do you live in Kyiv?",
    answers: ["Yes, I live", "No, I don't live"],
    placeholder: "Type your answer",
  },
  {
    question: "Do you drive a car?",
    answers: ["Yes, I drive", "No, I don't drive"],
    placeholder: "Type your answer",
  },
  {
    question: "Do you take the bus?",
    answers: ["Yes, I take", "No, I don't take"],
    placeholder: "Type your answer",
  },
  {
    question: "I _ basketball",
    answers: ["play"],
    placeholder: "Type the missing word",
  },
];

const normalizeAnswer = (value: string) =>
  value.trim().toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ");

const initialState: QuizState[] = quizItems.map(() => ({
  value: "",
  checked: false,
  isCorrect: null,
}));

export default function Lesson17Quiz() {
  const [items, setItems] = useState<QuizState[]>(initialState);

  const updateValue = (index: number, value: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, value, checked: false, isCorrect: null }
          : item,
      ),
    );
  };

  const checkAnswer = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        const normalized = normalizeAnswer(item.value);
        const isCorrect = quizItems[index].answers.some(
          (answer) => normalizeAnswer(answer) === normalized,
        );

        return {
          ...item,
          checked: true,
          isCorrect,
        };
      }),
    );
  };

  return (
    <section className="panel quiz-list">
      <h2>Quiz</h2>

      {quizItems.map((item, index) => {
        const state = items[index];

        return (
          <article className="quiz-item" key={item.question}>
            <p className="quiz-question">{item.question}</p>

            <input
              className="quiz-input"
              type="text"
              value={state.value}
              onChange={(e) => updateValue(index, e.target.value)}
              placeholder={item.placeholder}
            />

            <button
              className="action-btn primary quiz-check"
              onClick={() => checkAnswer(index)}
            >
              Check
            </button>

            {state.checked && (
              <p
                className={
                  state.isCorrect ? "quiz-result good" : "quiz-result bad"
                }
              >
                {state.isCorrect
                  ? "Correct"
                  : `Try again. Example: ${item.answers[0]}`}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}
