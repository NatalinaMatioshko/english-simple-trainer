import { useMemo, useState } from "react";
import type { Feedback } from "../types/trainer";
import { shuffle } from "../utils/array";

const frequencyItems = [
  { word: "never", percent: "0%", label: "ніколи" },
  { word: "sometimes", percent: "50%", label: "іноді" },
  { word: "often", percent: "70%", label: "часто" },
  { word: "usually", percent: "80%", label: "зазвичай" },
  { word: "always", percent: "100%", label: "завжди" },
];

const routineVerbs = [
  "wake up",
  "get up",
  "have breakfast",
  "go to work / school",
  "brush teeth",
  "go to bed",
];

const truthOrLieCards = [
  {
    sentence: "I always wake up at 6.",
    answer: "true",
    why: "Це речення може бути правдою для деяких людей.",
  },
  {
    sentence: "She never drinks water.",
    answer: "false",
    why: "Виглядає малоймовірно для щоденної рутини.",
  },
  {
    sentence: "We usually go to school in the morning.",
    answer: "true",
    why: "Usually = most days, це логічно для routine.",
  },
  {
    sentence: "He sometimes goes to bed at 25:00.",
    answer: "false",
    why: "25:00 не існує, тому це неправда.",
  },
];

const interviewQuestions = [
  "How often do you wake up early?",
  "How often do you brush your teeth?",
  "How often do you go to bed late?",
  "How often do you drink coffee?",
  "How often do you go to work / school?",
];

const speakingPrompts = [
  {
    title: "I usually ...",
    hint: "I usually wake up at 8.",
  },
  {
    title: "He often ...",
    hint: "He often goes to work by bus.",
  },
  {
    title: "She is always ...",
    hint: "She is always tired.",
  },
  {
    title: "We never ...",
    hint: "We never go to bed late.",
  },
];

function normalize(str: string): string {
  return str.trim().replace(/\s+/g, " ").toLowerCase();
}

export default function Lesson15() {
  const [routineIndex, setRoutineIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizValue, setQuizValue] = useState("");
  const [quizFeedback, setQuizFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [truthIndex, setTruthIndex] = useState(0);
  const [truthFeedback, setTruthFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [adverbOrder, setAdverbOrder] = useState<string[]>(() =>
    shuffle(frequencyItems.map((item) => item.word)),
  );
  const [orderFeedback, setOrderFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [formAnswers, setFormAnswers] = useState<string[]>(["", "", "", ""]);

  const currentTruth = truthOrLieCards[truthIndex];
  const currentQuestion = interviewQuestions[quizIndex];
  const currentSpeaking = speakingPrompts[routineIndex];

  const orderedCorrect = useMemo(
    () => frequencyItems.map((item) => item.word),
    [],
  );

  const handleCheckTruth = (value: "true" | "false") => {
    if (value === currentTruth.answer) {
      setTruthFeedback({
        text: "Correct. Good speaking judgment.",
        type: "success",
      });
    } else {
      setTruthFeedback({
        text: `Not quite. ${currentTruth.why}`,
        type: "error",
      });
    }
  };

  const nextTruth = () => {
    const next = (truthIndex + 1) % truthOrLieCards.length;
    setTruthIndex(next);
    setTruthFeedback({ text: "", type: "" });
  };

  const checkOrder = () => {
    const user = adverbOrder.join(" > ");
    const correct = orderedCorrect.join(" > ");

    if (user === correct) {
      setOrderFeedback({ text: "Perfect order.", type: "success" });
    } else {
      setOrderFeedback({
        text: `Correct order: ${correct}`,
        type: "error",
      });
    }
  };

  const resetOrder = () => {
    setAdverbOrder(shuffle(frequencyItems.map((item) => item.word)));
    setOrderFeedback({ text: "", type: "" });
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const next = [...adverbOrder];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setAdverbOrder(next);
  };

  const handleSpeakingCheck = () => {
    const answers = formAnswers.map(normalize);
    const good = ["usually", "often", "always", "never"];
    const filled = answers.every(Boolean);

    if (!filled) {
      setQuizFeedback({
        text: "Fill all speaking examples first.",
        type: "error",
      });
      return;
    }

    const ok =
      answers[0].includes("usually") &&
      answers[1].includes("often") &&
      answers[2].includes("always") &&
      answers[3].includes("never");

    if (ok) {
      setQuizFeedback({
        text: "Nice. Your sentences use the adverbs correctly.",
        type: "success",
      });
    } else {
      setQuizFeedback({
        text: "Check the adverb position and match the hint.",
        type: "error",
      });
    }
  };

  return (
    <div className="lesson-page">
      <header className="lesson-hero panel">
        <p className="lesson-kicker">Урок 15</p>
        <h1>Present Simple + Adverbs of frequency</h1>
        <p className="lesson-subtitle">
          Говоримо про рутину, ставимо прості питання і вчимося відповідати на
          How often...?
        </p>

        <div className="lesson-meta">
          <span>Speaking lesson</span>
          <span>A1</span>
          <span>Present Simple</span>
          <span>Frequency adverbs</span>
        </div>
      </header>

      <section className="lesson-grid">
        <article className="panel lesson-card">
          <h2>What the student already knows</h2>
          <p>
            The student can already say what he does in Present Simple. Now the
            next step is to add how often he does it.
          </p>
          <p>
            Example: <strong>I usually wake up at 8.</strong> /{" "}
            <strong>She often drinks coffee.</strong> /{" "}
            <strong>We never go to bed late.</strong>
          </p>
        </article>

        <article className="panel lesson-card">
          <h2>Simple rule</h2>
          <div className="formula-box">
            <p>
              <strong>I / you / we / they</strong> + adverb + verb
            </p>
            <p>
              <strong>he / she / it</strong> + adverb + verb + s
            </p>
            <p>
              <strong>to be</strong> + adverb after verb
            </p>
          </div>
          <p>
            I usually go to work. He usually goes to work. She is always tired.
          </p>
        </article>

        <article className="panel lesson-card">
          <h2>Adverbs to learn</h2>
          <div className="frequency-list">
            {frequencyItems.map((item) => (
              <div className="frequency-pill" key={item.word}>
                <strong>{item.word}</strong>
                <span>{item.percent}</span>
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel lesson-card">
          <h2>Daily routine vocabulary</h2>
          <ul className="routine-list">
            {routineVerbs.map((verb) => (
              <li key={verb}>{verb}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="lesson-grid lesson-grid-2">
        <article className="panel lesson-card">
          <h2>Warm-up: routine review</h2>
          <p className="lesson-big">{speakingPrompts[routineIndex].title}</p>
          <p className="muted">{speakingPrompts[routineIndex].hint}</p>
          <div className="controls">
            <button
              className="btn"
              onClick={() =>
                setRoutineIndex((prev) => (prev + 1) % speakingPrompts.length)
              }
            >
              Next prompt
            </button>
          </div>
        </article>

        <article className="panel lesson-card">
          <h2>Truth or lie</h2>
          <p className="lesson-big">{currentTruth.sentence}</p>
          <div className="controls">
            <button className="btn" onClick={() => handleCheckTruth("true")}>
              True
            </button>
            <button
              className="btn secondary"
              onClick={() => handleCheckTruth("false")}
            >
              False
            </button>
            <button className="btn secondary" onClick={nextTruth}>
              Next
            </button>
          </div>
          <div className={`feedback ${truthFeedback.type}`}>
            {truthFeedback.text}
          </div>
        </article>

        <article className="panel lesson-card">
          <h2>Routine ranking</h2>
          <p>Arrange from least frequent to most frequent:</p>
          <div className="ranking-list">
            {adverbOrder.map((word, index) => (
              <div className="ranking-item" key={word}>
                <span>{word}</span>
                <div className="ranking-controls">
                  <button onClick={() => moveItem(index, -1)}>↑</button>
                  <button onClick={() => moveItem(index, 1)}>↓</button>
                </div>
              </div>
            ))}
          </div>
          <div className="controls">
            <button className="btn" onClick={checkOrder}>
              Check order
            </button>
            <button className="btn secondary" onClick={resetOrder}>
              Shuffle again
            </button>
          </div>
          <div className={`feedback ${orderFeedback.type}`}>
            {orderFeedback.text}
          </div>
        </article>

        <article className="panel lesson-card">
          <h2>How often interview</h2>
          <p className="lesson-big">{currentQuestion}</p>
          <input
            className="input"
            value={quizValue}
            onChange={(e) => setQuizValue(e.target.value)}
            placeholder="Answer with a short sentence"
          />
          <div className="controls">
            <button
              className="btn"
              onClick={() => {
                const val = normalize(quizValue);
                if (
                  val.includes("usually") ||
                  val.includes("often") ||
                  val.includes("always") ||
                  val.includes("never") ||
                  val.includes("sometimes")
                ) {
                  setQuizFeedback({ text: "Good answer.", type: "success" });
                } else {
                  setQuizFeedback({
                    text: "Add a frequency adverb.",
                    type: "error",
                  });
                }
              }}
            >
              Check
            </button>
            <button
              className="btn secondary"
              onClick={() => {
                setQuizIndex((prev) => (prev + 1) % interviewQuestions.length);
                setQuizValue("");
                setQuizFeedback({ text: "", type: "" });
              }}
            >
              Next question
            </button>
          </div>
          <div className={`feedback ${quizFeedback.type}`}>
            {quizFeedback.text}
          </div>
        </article>
      </section>

      <section className="panel lesson-card">
        <h2>Find the adverb</h2>
        <p>Complete the sentence with the correct frequency adverb.</p>

        <div className="speaking-grid">
          {formAnswers.map((answer, index) => (
            <div className="speaking-row" key={index}>
              <p>
                {index === 0 && "I ___ wake up at 8."}
                {index === 1 && "She ___ drinks coffee."}
                {index === 2 && "We ___ go to bed late."}
                {index === 3 && "He ___ gets up early."}
              </p>
              <input
                className="input"
                value={answer}
                onChange={(e) => {
                  const next = [...formAnswers];
                  next[index] = e.target.value;
                  setFormAnswers(next);
                }}
                placeholder="always / usually / often / sometimes / never"
              />
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="btn" onClick={handleSpeakingCheck}>
            Check sentences
          </button>
          <button
            className="btn secondary"
            onClick={() => {
              setFormAnswers(["", "", "", ""]);
              setQuizFeedback({ text: "", type: "" });
            }}
          >
            Clear
          </button>
        </div>

        <div className={`feedback ${quizFeedback.type}`}>
          {quizFeedback.text}
        </div>
      </section>

      <section className="panel lesson-card homework-box">
        <h2>Homework</h2>
        <ol>
          <li>
            Write 5 sentences about your routine using always / usually / often
            / sometimes / never.
          </li>
          <li>Record yourself answering 5 questions with How often...?</li>
          <li>
            Make a mini routine about morning, work/school, evening, and
            bedtime.
          </li>
        </ol>
      </section>
    </div>
  );
}
