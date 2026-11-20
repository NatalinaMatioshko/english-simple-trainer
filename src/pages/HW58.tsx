import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  goodbyePhrases,
  greetingReplies,
  helloPhrases,
  holidayQuestions,
  presentForms,
} from "../content/lessons/lesson-58/activities";
import { greetingFlashcards, holidayFlashcards } from "../content/lessons/lesson-58/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";

const greetGaps = [
  {
    id: "g1",
    prompt: "Simon: Good morning. — You:",
    answers: helloPhrases,
  },
  {
    id: "g2",
    prompt: "How are you? — You:",
    answers: greetingReplies(),
  },
  {
    id: "g3",
    prompt: "See you later. — You:",
    answers: goodbyePhrases,
  },
];

/** Homework for Lesson 58 — holiday phrases, Did you…?, greetings, a short holiday story. */
export default function HW58() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(holidayFlashcards[idx].back);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [present, setPresent] = useState<Record<string, string>>({});
  const [presentChecked, setPresentChecked] = useState(false);
  const presentScore = presentForms.filter((item) =>
    matchesAnyAnswer(present[item.id] ?? "", item.answers),
  ).length;

  const [questions, setQuestions] = useState<Record<string, string>>({});
  const [questionsChecked, setQuestionsChecked] = useState(false);
  const questionScore = holidayQuestions.filter((item) =>
    matchesAnyAnswer(questions[item.id] ?? "", item.answers),
  ).length;

  const [greet, setGreet] = useState<Record<string, string>>({});
  const [greetChecked, setGreetChecked] = useState(false);
  const greetScore = greetGaps.filter((item) =>
    matchesAnyAnswer(greet[item.id] ?? "", item.answers),
  ).length;

  const [writing, setWriting] = useState("");

  const appendix = [
    "2 · Present forms",
    ...presentForms.map((item) => `${item.before} ${present[item.id] ?? ""}`.trim()),
    "",
    "3 · Holiday questions",
    ...holidayQuestions.map(
      (item) => `${item.prompt} ${questions[item.id] ?? ""}`.trim(),
    ),
    "",
    "4 · Greetings",
    ...greetGaps.map((item) => `${item.prompt} ${greet[item.id] ?? ""}`.trim()),
  ].join("\n");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 58</p>
        <h1>Good places</h1>
        <p className="lead">
          Фрази про відпустку, питання Did you…?, коротке вітання і розповідь
          про улюблене місце.
        </p>

        <section id="hw58-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Holiday activities</h2>
            <p className="lead">Скажи англійською, потім перевір картку.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {holidayFlashcards.map((card, idx) => {
              const isFlipped = flip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => toggleFlip(idx)}
                  aria-pressed={isFlipped}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <span className="l22-vocab-label">Українською</span>
                      <strong>{card.front}</strong>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.back}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw58-present" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Verbs</p>
            <h2>Write the present form</h2>
            <p className="lead">had → have. were → are.</p>
          </div>
          <ol className="hw57-translate">
            {presentForms.map((item, index) => (
              <li key={item.id}>
                <span>
                  {index + 1}. {item.before.replace(" →", "")}
                </span>
                <input
                  className={gapInputClass(
                    presentChecked,
                    present[item.id] ?? "",
                    matchesAnyAnswer(present[item.id] ?? "", item.answers),
                  )}
                  value={present[item.id] ?? ""}
                  onChange={(e) =>
                    setPresent((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  autoComplete="off"
                />
              </li>
            ))}
          </ol>
          <CheckBar
            checked={presentChecked}
            score={presentScore}
            total={presentForms.length}
            onCheck={() => setPresentChecked(true)}
            onReset={() => setPresentChecked(false)}
          />
        </section>

        <section id="hw58-questions" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Questions</p>
            <h2>Make questions about a holiday</h2>
            <p className="lead">Where? → Where did you go?</p>
          </div>
          <ol className="hw57-translate">
            {holidayQuestions.map((item, index) => {
              const value = questions[item.id] ?? "";
              const wrong = questionsChecked && !matchesAnyAnswer(value, item.answers);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.prompt}
                  </span>
                  <input
                    className={gapInputClass(
                      questionsChecked,
                      value,
                      matchesAnyAnswer(value, item.answers),
                    )}
                    value={value}
                    onChange={(e) =>
                      setQuestions((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    autoComplete="off"
                  />
                  {wrong ? <p className="hw57-key">{item.answers[0]}</p> : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={questionsChecked}
            score={questionScore}
            total={holidayQuestions.length}
            onCheck={() => setQuestionsChecked(true)}
            onReset={() => setQuestionsChecked(false)}
          />
        </section>

        <section id="hw58-greet" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Greetings</p>
            <h2>Answer in English</h2>
            <p className="lead">
              {greetingFlashcards.map((card) => card.back).join(" · ")}
            </p>
          </div>
          <ol className="hw57-translate">
            {greetGaps.map((item, index) => {
              const value = greet[item.id] ?? "";
              const wrong = greetChecked && !matchesAnyAnswer(value, item.answers);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.prompt}
                  </span>
                  <input
                    className={gapInputClass(
                      greetChecked,
                      value,
                      matchesAnyAnswer(value, item.answers),
                    )}
                    value={value}
                    onChange={(e) =>
                      setGreet((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    autoComplete="off"
                  />
                  {wrong ? <p className="hw57-key">{item.answers[0]}</p> : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={greetChecked}
            score={greetScore}
            total={greetGaps.length}
            onCheck={() => setGreetChecked(true)}
            onReset={() => setGreetChecked(false)}
          />
        </section>

        <section id="hw58-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Writing</p>
            <h2>A favourite holiday</h2>
            <p className="lead">
              5–7 речень: where, when, who, what you did. Одне питання Did you…?
              не обов’язкове. Напиши розповідь.
            </p>
          </div>
          <textarea
            className="l25-writing-area"
            rows={10}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="I went to … last …"
          />
        </section>

        <HomeworkSubmit
          lessonId="58"
          writing={writing}
          appendix={appendix}
          quizDone={presentChecked && questionsChecked && greetChecked}
          quizScore={presentScore + questionScore + greetScore}
          showListeningCheck={false}
        />
      </div>
    </div>
  );
}
