import { useMemo, useState } from "react";
import "./app.css";

type Mode = "study" | "practice";
type Theme = "light" | "dark";
type Filter = "all" | "daily" | "study" | "home" | "social";

type Verb = {
  base: string;
  third: string;
  ua: string;
  cat: Exclude<Filter, "all">;
};

type ConjugationTask = {
  sentence: string;
  answer: string;
  hint: string;
};

type QuestionTask = {
  prompt: string;
  answer: string;
};

type MixedTask = {
  text: string;
  options: string[];
  correct: string;
};

type QuizTask = {
  text: string;
  options: string[];
  correct: string;
};

const verbs: Verb[] = [
  { base: "wake up", third: "wakes up", ua: "прокидатися", cat: "daily" },
  { base: "get up", third: "gets up", ua: "вставати", cat: "daily" },
  { base: "wash", third: "washes", ua: "мити", cat: "daily" },
  { base: "brush", third: "brushes", ua: "чистити", cat: "daily" },
  { base: "eat", third: "eats", ua: "їсти", cat: "daily" },
  { base: "drink", third: "drinks", ua: "пити", cat: "daily" },
  { base: "cook", third: "cooks", ua: "готувати", cat: "home" },
  {
    base: "go to work",
    third: "goes to work",
    ua: "йти на роботу",
    cat: "daily",
  },
  {
    base: "go to school",
    third: "goes to school",
    ua: "йти до школи",
    cat: "study",
  },
  { base: "study", third: "studies", ua: "вчитися", cat: "study" },
  { base: "read", third: "reads", ua: "читати", cat: "study" },
  { base: "write", third: "writes", ua: "писати", cat: "study" },
  { base: "learn", third: "learns", ua: "вчити", cat: "study" },
  { base: "speak", third: "speaks", ua: "говорити", cat: "social" },
  { base: "listen", third: "listens", ua: "слухати", cat: "social" },
  { base: "watch", third: "watches", ua: "дивитися", cat: "daily" },
  { base: "play", third: "plays", ua: "грати", cat: "daily" },
  { base: "walk", third: "walks", ua: "гуляти", cat: "daily" },
  { base: "run", third: "runs", ua: "бігати", cat: "daily" },
  { base: "sleep", third: "sleeps", ua: "спати", cat: "daily" },
  { base: "work", third: "works", ua: "працювати", cat: "daily" },
  { base: "live", third: "lives", ua: "жити", cat: "daily" },
  {
    base: "come home",
    third: "comes home",
    ua: "приходити додому",
    cat: "daily",
  },
  { base: "clean", third: "cleans", ua: "прибирати", cat: "home" },
  { base: "open", third: "opens", ua: "відкривати", cat: "home" },
  { base: "close", third: "closes", ua: "закривати", cat: "home" },
  { base: "help", third: "helps", ua: "допомагати", cat: "social" },
  { base: "call", third: "calls", ua: "телефонувати", cat: "social" },
  { base: "talk", third: "talks", ua: "розмовляти", cat: "social" },
  { base: "meet", third: "meets", ua: "зустрічати", cat: "social" },
  { base: "visit", third: "visits", ua: "відвідувати", cat: "social" },
  { base: "buy", third: "buys", ua: "купувати", cat: "daily" },
  { base: "make", third: "makes", ua: "робити / готувати", cat: "home" },
  {
    base: "have breakfast",
    third: "has breakfast",
    ua: "снідати",
    cat: "daily",
  },
  { base: "have lunch", third: "has lunch", ua: "обідати", cat: "daily" },
  { base: "have dinner", third: "has dinner", ua: "вечеряти", cat: "daily" },
  { base: "drive", third: "drives", ua: "водити", cat: "daily" },
  {
    base: "ride",
    third: "rides",
    ua: "їхати на велосипеді / верхи",
    cat: "daily",
  },
  { base: "take", third: "takes", ua: "брати", cat: "daily" },
  { base: "bring", third: "brings", ua: "приносити", cat: "home" },
  { base: "put", third: "puts", ua: "класти", cat: "home" },
  {
    base: "wash dishes",
    third: "washes dishes",
    ua: "мити посуд",
    cat: "home",
  },
  { base: "answer", third: "answers", ua: "відповідати", cat: "study" },
  { base: "ask", third: "asks", ua: "запитувати", cat: "study" },
  { base: "use", third: "uses", ua: "використовувати", cat: "study" },
  { base: "start", third: "starts", ua: "починати", cat: "daily" },
  { base: "finish", third: "finishes", ua: "закінчувати", cat: "daily" },
  { base: "need", third: "needs", ua: "потребувати", cat: "daily" },
  { base: "like", third: "likes", ua: "подобатися", cat: "daily" },
  { base: "love", third: "loves", ua: "любити", cat: "daily" },
];

const conjugationTasks: ConjugationTask[] = [
  {
    sentence: "She ___ coffee every morning.",
    answer: "drinks",
    hint: "drink",
  },
  { sentence: "He ___ English at home.", answer: "studies", hint: "study" },
  { sentence: "My brother ___ up at 7 a.m.", answer: "gets", hint: "get" },
  { sentence: "Anna ___ TV in the evening.", answer: "watches", hint: "watch" },
  { sentence: "Tom ___ to work by bus.", answer: "goes", hint: "go" },
  {
    sentence: "My mother ___ dinner every day.",
    answer: "makes",
    hint: "make",
  },
  { sentence: "It ___ a lot of water.", answer: "needs", hint: "need" },
  { sentence: "She ___ books before bed.", answer: "reads", hint: "read" },
];

const questionTasks: QuestionTask[] = [
  { prompt: "you / play / chess ?", answer: "Do you play chess?" },
  { prompt: "she / like / coffee ?", answer: "Does she like coffee?" },
  { prompt: "they / study / every day ?", answer: "Do they study every day?" },
  {
    prompt: "he / go to school / by bus ?",
    answer: "Does he go to school by bus?",
  },
  {
    prompt: "your friend / watch / films at night ?",
    answer: "Does your friend watch films at night?",
  },
  { prompt: "we / need / a break ?", answer: "Do we need a break?" },
];

const mixedTasks: MixedTask[] = [
  {
    text: "He ___ to school by bus.",
    options: ["go", "goes", "does"],
    correct: "goes",
  },
  {
    text: "They ___ English on Monday.",
    options: ["study", "studies", "does"],
    correct: "study",
  },
  {
    text: "She ___ breakfast at 8 o’clock.",
    options: ["have", "has", "do"],
    correct: "has",
  },
  {
    text: "___ your sister like pizza?",
    options: ["Do", "Does", "Is"],
    correct: "Does",
  },
  {
    text: "My cat ___ in the kitchen.",
    options: ["sleep", "sleeps", "sleepes"],
    correct: "sleeps",
  },
  {
    text: "We ___ our teacher every week.",
    options: ["meet", "meets", "meeting"],
    correct: "meet",
  },
];

const quizTasks: QuizTask[] = [
  {
    text: "I ___ drink tea in the morning. (100%)",
    options: ["always", "sometimes", "never", "usually"],
    correct: "always",
  },
  {
    text: "She ___ goes to bed at 11 p.m. (most days)",
    options: ["never", "usually", "sometimes", "always"],
    correct: "usually",
  },
  {
    text: "We ___ play tennis on Sundays. (from time to time)",
    options: ["sometimes", "always", "never", "usually"],
    correct: "sometimes",
  },
  {
    text: "He ___ eats meat. (0%)",
    options: ["always", "usually", "sometimes", "never"],
    correct: "never",
  },
  {
    text: "They ___ watch TV after dinner. (many days, but not every day)",
    options: ["usually", "always", "sometimes", "never"],
    correct: "usually",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalize(str: string): string {
  return str.trim().replace(/\s+/g, " ").toLowerCase();
}

type Feedback = {
  text: string;
  type: "success" | "error" | "";
};

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mode, setMode] = useState<Mode>("study");
  const [filter, setFilter] = useState<Filter>("all");
  const [revealedVerbs, setRevealedVerbs] = useState<string[]>([]);

  const [conjugationIndex, setConjugationIndex] = useState(0);
  const [conjugationValue, setConjugationValue] = useState("");
  const [conjugationFeedback, setConjugationFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionValue, setQuestionValue] = useState("");
  const [questionFeedback, setQuestionFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });

  const [mixedIndex, setMixedIndex] = useState(0);
  const [mixedFeedback, setMixedFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [mixedAnswered, setMixedAnswered] = useState(false);
  const [mixedSelected, setMixedSelected] = useState<string | null>(null);
  const [mixedShuffledOptions, setMixedShuffledOptions] = useState<string[]>(
    () => shuffle(mixedTasks[0].options),
  );

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnsweredCount, setQuizAnsweredCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<Feedback>({
    text: "",
    type: "",
  });
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizLocked, setQuizLocked] = useState(false);
  const [quizShuffledOptions, setQuizShuffledOptions] = useState<string[]>(() =>
    shuffle(quizTasks[0].options),
  );

  const filteredVerbs = useMemo(() => {
    return filter === "all"
      ? verbs
      : verbs.filter((verb) => verb.cat === filter);
  }, [filter]);

  const currentConjugation = conjugationTasks[conjugationIndex];
  const currentQuestion = questionTasks[questionIndex];
  const currentMixed = mixedTasks[mixedIndex];
  const currentQuiz = quizTasks[quizIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleVerbReveal = (base: string) => {
    setRevealedVerbs((prev) =>
      prev.includes(base)
        ? prev.filter((item) => item !== base)
        : [...prev, base],
    );
  };

  const checkConjugation = () => {
    const value = normalize(conjugationValue);
    const answer = currentConjugation.answer.toLowerCase();

    if (value === answer) {
      setConjugationFeedback({ text: "Так, правильно!", type: "success" });
    } else {
      setConjugationFeedback({
        text: `Правильна форма: ${currentConjugation.answer}`,
        type: "error",
      });
    }
  };

  const nextConjugation = () => {
    setConjugationIndex((prev) => (prev + 1) % conjugationTasks.length);
    setConjugationValue("");
    setConjugationFeedback({ text: "", type: "" });
  };

  const checkQuestion = () => {
    const value = normalize(questionValue);
    const answer = normalize(currentQuestion.answer);

    if (value === answer) {
      setQuestionFeedback({
        text: "Питання складено правильно.",
        type: "success",
      });
    } else {
      setQuestionFeedback({
        text: `Правильний варіант: ${currentQuestion.answer}`,
        type: "error",
      });
    }
  };

  const nextQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % questionTasks.length);
    setQuestionValue("");
    setQuestionFeedback({ text: "", type: "" });
  };

  const handleMixedAnswer = (option: string) => {
    if (mixedAnswered) return;

    setMixedSelected(option);
    setMixedAnswered(true);

    if (option === currentMixed.correct) {
      setMixedFeedback({ text: "Правильно! Чудово.", type: "success" });
    } else {
      setMixedFeedback({
        text: `Правильна відповідь: ${currentMixed.correct}`,
        type: "error",
      });
    }
  };

  const nextMixed = () => {
    const nextIndex = (mixedIndex + 1) % mixedTasks.length;
    setMixedIndex(nextIndex);
    setMixedFeedback({ text: "", type: "" });
    setMixedAnswered(false);
    setMixedSelected(null);
    setMixedShuffledOptions(shuffle(mixedTasks[nextIndex].options));
  };

  const handleQuizAnswer = (option: string) => {
    if (quizLocked || !currentQuiz) return;

    setQuizSelected(option);
    setQuizLocked(true);
    setQuizAnsweredCount((prev) => prev + 1);

    if (option === currentQuiz.correct) {
      setQuizScore((prev) => prev + 1);
      setQuizFeedback({ text: "Правильно!", type: "success" });
    } else {
      setQuizFeedback({
        text: `Правильний варіант: ${currentQuiz.correct}`,
        type: "error",
      });
    }
  };

  const nextQuiz = () => {
    if (quizIndex >= quizTasks.length - 1) {
      setQuizIndex(quizTasks.length);
      return;
    }

    const nextIndex = quizIndex + 1;
    setQuizIndex(nextIndex);
    setQuizSelected(null);
    setQuizLocked(false);
    setQuizFeedback({ text: "", type: "" });
    setQuizShuffledOptions(shuffle(quizTasks[nextIndex].options));
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizAnsweredCount(0);
    setQuizScore(0);
    setQuizFeedback({ text: "", type: "" });
    setQuizSelected(null);
    setQuizLocked(false);
    setQuizShuffledOptions(shuffle(quizTasks[0].options));
  };

  const quizFinished = quizIndex >= quizTasks.length;
  const quizProgress = `${(quizAnsweredCount / quizTasks.length) * 100}%`;

  return (
    <div className="app" data-theme={theme}>
      <a className="skip-link" href="#main-content">
        Перейти до тренажера
      </a>

      <header className="topbar">
        <div className="brand">
          <div className="logo" aria-label="Present Simple Trainer logo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M6 18V7.5a2.5 2.5 0 0 1 4.6-1.4L12 8l1.4-1.9A2.5 2.5 0 0 1 18 7.5V18" />
              <path d="M5 18h14" />
            </svg>
          </div>

          <div>
            <p className="muted">English A1-A2</p>
            <h1>Present Simple Trainer</h1>
          </div>
        </div>

        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Змінити тему"
        >
          {theme === "dark" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </header>

      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="chips">
              <span className="chip">50 дієслів</span>
              <span className="chip">he / she / it</span>
              <span className="chip">do / does</span>
              <span className="chip">adverbs of frequency</span>
            </div>

            <p className="subtitle" style={{ marginTop: "1rem" }}>
              Тренажер допомагає швидко повторити форму Present Simple, одразу
              попрактикувати питання та перевірити знання прислівників частоти.
            </p>

            <div
              className="mode-switch"
              role="tablist"
              aria-label="Перемикання режиму"
            >
              <button
                className={`mode-btn ${mode === "study" ? "active" : ""}`}
                onClick={() => setMode("study")}
                role="tab"
                aria-selected={mode === "study"}
              >
                Режим вивчення
              </button>

              <button
                className={`mode-btn ${mode === "practice" ? "active" : ""}`}
                onClick={() => setMode("practice")}
                role="tab"
                aria-selected={mode === "practice"}
              >
                Режим практики
              </button>
            </div>
          </div>

          <div className="stats">
            <div className="mini-card">
              <span className="muted">Фокус</span>
              <strong>Present Simple</strong>
              <span>Щоденні дії та звички</span>
            </div>

            <div className="mini-card">
              <span className="muted">Підходить для</span>
              <strong>A1-A2</strong>
              <span>Початковий та базовий рівень</span>
            </div>

            <div className="mini-card">
              <span className="muted">Формат</span>
              <strong>Study + Practice</strong>
              <span>Пояснення, вправи і мінітест</span>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content" className="main-layout">
        <aside className="sidebar">
          <section className="panel">
            <h2>Фільтр дієслів</h2>
            <p className="muted">
              Обирайте тему, щоб швидше повторити лексику.
            </p>

            <div className="controls" style={{ marginTop: "1rem" }}>
              {[
                { key: "all", label: "Усі" },
                { key: "daily", label: "Рутина" },
                { key: "study", label: "Навчання" },
                { key: "home", label: "Дім" },
                { key: "social", label: "Спілкування" },
              ].map((item) => (
                <button
                  key={item.key}
                  className={`filter-btn ${filter === item.key ? "active" : ""}`}
                  onClick={() => setFilter(item.key as Filter)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <section className="panel">
            <h2>Підказка</h2>
            <ul className="rules">
              <li>Для he / she / it зазвичай додаємо -s.</li>
              <li>Після do / does використовуємо базову форму дієслова.</li>
              <li>
                Always, usually, sometimes, never часто стоять перед основним
                дієсловом.
              </li>
            </ul>
          </section>

          <section className="panel">
            <h2>Прогрес тесту</h2>
            <div className="progress" aria-label="Прогрес частотного тесту">
              <span style={{ width: quizProgress }} />
            </div>
            <p className="muted" style={{ marginTop: "0.75rem" }}>
              {quizAnsweredCount} / {quizTasks.length} завершено · Бал:{" "}
              {quizScore}
            </p>
          </section>
        </aside>

        <section className="content">
          {mode === "study" && (
            <div className="study-layout">
              <section className="panel">
                <h2>50 базових дієслів</h2>
                <p className="muted">
                  Натисніть на картку, щоб побачити форму для he / she / it.
                </p>

                <div className="card-grid">
                  {filteredVerbs.map((verb) => {
                    const isShown = revealedVerbs.includes(verb.base);

                    return (
                      <button
                        key={verb.base}
                        className="verb-card"
                        type="button"
                        onClick={() => toggleVerbReveal(verb.base)}
                      >
                        <span className="base">{verb.base}</span>
                        <span className="muted">{verb.ua}</span>
                        {isShown && (
                          <span className="heform">
                            he / she / it: {verb.third}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="study-grid">
                <section className="panel">
                  <h2>Відмінювання he / she / it</h2>

                  <div className="exercise-box">
                    <p className="sentence">
                      {currentConjugation.sentence} ({currentConjugation.hint})
                    </p>

                    <input
                      className="input"
                      type="text"
                      placeholder="Наприклад: drinks"
                      value={conjugationValue}
                      onChange={(e) => setConjugationValue(e.target.value)}
                    />

                    <div className="controls" style={{ marginTop: "1rem" }}>
                      <button className="btn" onClick={checkConjugation}>
                        Перевірити
                      </button>
                      <button
                        className="btn secondary"
                        onClick={nextConjugation}
                      >
                        Наступне
                      </button>
                    </div>

                    <div className={`feedback ${conjugationFeedback.type}`}>
                      {conjugationFeedback.text}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <h2>Генератор питань do / does</h2>

                  <div className="exercise-box">
                    <p className="question-line">{currentQuestion.prompt}</p>

                    <input
                      className="input"
                      type="text"
                      placeholder="Наприклад: Do you play chess?"
                      value={questionValue}
                      onChange={(e) => setQuestionValue(e.target.value)}
                    />

                    <div className="controls" style={{ marginTop: "1rem" }}>
                      <button className="btn" onClick={checkQuestion}>
                        Перевірити
                      </button>
                      <button className="btn secondary" onClick={nextQuestion}>
                        Нове питання
                      </button>
                    </div>

                    <div className={`feedback ${questionFeedback.type}`}>
                      {questionFeedback.text}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {mode === "practice" && (
            <div className="practice-layout">
              <div className="practice-grid">
                <section className="panel">
                  <h2>Швидка практика</h2>

                  <div className="exercise-box">
                    <h3>Оберіть правильну форму</h3>
                    <p className="sentence">{currentMixed.text}</p>

                    <div className="answers">
                      {mixedShuffledOptions.map((option) => {
                        const isCorrect =
                          mixedAnswered && option === currentMixed.correct;
                        const isWrong =
                          mixedAnswered &&
                          mixedSelected === option &&
                          option !== currentMixed.correct;

                        return (
                          <button
                            key={option}
                            className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                            onClick={() => handleMixedAnswer(option)}
                            disabled={mixedAnswered}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    <div className={`feedback ${mixedFeedback.type}`}>
                      {mixedFeedback.text}
                    </div>

                    <div className="controls" style={{ marginTop: "1rem" }}>
                      <button className="btn secondary" onClick={nextMixed}>
                        Наступне завдання
                      </button>
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <h2>Тест: прислівники частоти</h2>

                  <div className="exercise-box">
                    {!quizFinished ? (
                      <>
                        <p className="question-line">{currentQuiz.text}</p>

                        <div className="answers">
                          {quizShuffledOptions.map((option) => {
                            const isCorrect =
                              quizLocked && option === currentQuiz.correct;
                            const isWrong =
                              quizLocked &&
                              quizSelected === option &&
                              option !== currentQuiz.correct;

                            return (
                              <button
                                key={option}
                                className={`option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                                onClick={() => handleQuizAnswer(option)}
                                disabled={quizLocked}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        <div className={`feedback ${quizFeedback.type}`}>
                          {quizFeedback.text}
                        </div>

                        <div className="controls" style={{ marginTop: "1rem" }}>
                          <button className="btn secondary" onClick={nextQuiz}>
                            Наступне питання
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="question-line">
                          Тест завершено! Результат: {quizScore} /{" "}
                          {quizTasks.length}
                        </p>

                        <div
                          className={`feedback ${quizScore >= 4 ? "success" : "error"}`}
                        >
                          {quizScore >= 4
                            ? "Супер! Ви добре знаєте adverbs of frequency."
                            : "Непогано. Повторіть always / usually / sometimes / never і спробуйте ще раз."}
                        </div>

                        <div className="controls" style={{ marginTop: "1rem" }}>
                          <button
                            className="btn secondary"
                            onClick={restartQuiz}
                          >
                            Почати тест знову
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
