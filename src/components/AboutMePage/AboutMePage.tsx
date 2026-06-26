import { useMemo, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link } from "react-router-dom";
import "./AboutMePage.css";
import { fillInBlankTasks, profiles, sentenceOrderTasks } from "./data";
import { saveAboutMeSubmission } from "../../services/writingSubmissions";
import type { WritingSubmission } from "./types";

type WordToken = { word: string; uid: number };
type TaskState = { pool: WordToken[]; placed: WordToken[] };

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function initTaskStates(): Record<number, TaskState> {
  return Object.fromEntries(
    sentenceOrderTasks.map((task) => {
      const pool = shuffleArray(
        task.words.map((word, idx) => ({ word, uid: task.id * 100 + idx })),
      );
      return [task.id, { pool, placed: [] }];
    }),
  );
}

type FormState = {
  name: string;
  age: string;
  country: string;
  city: string;
  hair: string;
  eyes: string;
  text: string;
};

const initialForm: FormState = {
  name: "",
  age: "",
  country: "",
  city: "",
  hair: "",
  eyes: "",
  text: "",
};

export const AboutMePage = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [taskStates, setTaskStates] = useState<Record<number, TaskState>>(initTaskStates);
  const [haveEx1, setHaveEx1] = useState<Record<number, string>>({});
  const [haveEx3, setHaveEx3] = useState<Record<number, string>>({});
  const [showHaveAnswers, setShowHaveAnswers] = useState(false);

  const WORD_BANK = ["I'm", "live", "years old", "I've got", "from", "name"];
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillSelected, setFillSelected] = useState<number | null>(null);

  const usedWords = Object.values(fillAnswers);
  const availableWords = WORD_BANK.filter((w) => !usedWords.includes(w));
  const fillAllDone = fillInBlankTasks.every((t) => fillAnswers[t.id]);

  const handleBlankClick = (taskId: number) => {
    if (fillAnswers[taskId]) {
      setFillAnswers((p) => {
        const next = { ...p };
        delete next[taskId];
        return next;
      });
      setFillSelected(null);
    } else {
      setFillSelected((prev) => (prev === taskId ? null : taskId));
    }
  };

  const handleWordPick = (word: string) => {
    if (fillSelected === null) return;
    setFillAnswers((p) => ({ ...p, [fillSelected]: word }));
    setFillSelected(null);
  };

  const resetFill = () => {
    setFillAnswers({});
    setFillSelected(null);
  };

  const placeWord = (taskId: number, token: WordToken) => {
    setTaskStates((prev) => {
      const t = prev[taskId];
      return {
        ...prev,
        [taskId]: {
          pool: t.pool.filter((w) => w.uid !== token.uid),
          placed: [...t.placed, token],
        },
      };
    });
  };

  const returnWord = (taskId: number, token: WordToken) => {
    setTaskStates((prev) => {
      const t = prev[taskId];
      return {
        ...prev,
        [taskId]: {
          pool: [...t.pool, token],
          placed: t.placed.filter((w) => w.uid !== token.uid),
        },
      };
    });
  };

  const resetTask = (taskId: number) => {
    setTaskStates((prev) => {
      const task = sentenceOrderTasks.find((t) => t.id === taskId)!;
      const pool = shuffleArray(
        task.words.map((word, idx) => ({ word, uid: taskId * 100 + idx })),
      );
      return { ...prev, [taskId]: { pool, placed: [] } };
    });
  };

  const generatedPreview = useMemo(() => {
    const parts = [];

    if (form.name.trim()) {
      parts.push(`My name is ${form.name.trim()}.`);
    }

    if (form.age.trim()) {
      parts.push(`I am ${form.age.trim()} years old.`);
    }

    if (form.country.trim()) {
      parts.push(`I am from ${form.country.trim()}.`);
    }

    if (form.city.trim()) {
      parts.push(`I live in ${form.city.trim()}.`);
    }

    if (form.hair.trim()) {
      parts.push(`I've got ${form.hair.trim()}.`);
    }

    if (form.eyes.trim()) {
      parts.push(`I've got ${form.eyes.trim()}.`);
    }

    return parts.join(" ");
  }, [form]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fillTemplate = () => {
    const text = generatedPreview.trim();
    setForm((prev) => ({
      ...prev,
      text,
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveError("");
    setSuccessMessage("");

    const finalText = form.text.trim() || generatedPreview.trim();

    if (!form.name.trim() || !finalText) {
      setSaveError("Please add at least your name and your text.");
      return;
    }

    const payload: WritingSubmission = {
      name: form.name.trim(),
      age: form.age.trim(),
      country: form.country.trim(),
      city: form.city.trim(),
      hair: form.hair.trim(),
      eyes: form.eyes.trim(),
      text: finalText,
      createdAt: new Date().toISOString(),
      page: "about-me",
    };

    try {
      setIsSaving(true);
      await saveAboutMeSubmission(payload);
      setSuccessMessage("Your writing has been saved.");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setSaveError("Something went wrong while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="about-me-page">
      <section className="about-me-page__hero">
        <div className="about-me-page__hero-badge">Level 1 writing</div>
        <h1>About me</h1>
        <p className="about-me-page__hero-desc">
          Practise key phrases to describe yourself — your name, age, country,
          family and appearance. Read examples, do exercises and write about
          yourself.
        </p>
        <div className="about-me-page__hero-nav">
          <Link className="about-me-page__nav-btn" to="/lesson-20">
            ← Lesson 20
          </Link>
          <Link className="about-me-page__nav-btn about-me-page__nav-btn--ghost" to="/">
            Home
          </Link>
        </div>
      </section>

      <section className="about-me-page__card">
        <div className="about-me-page__section-head">
          <h2>Preparation</h2>
          <button
            type="button"
            className="about-me-page__ghost-btn"
            onClick={() => setShowAnswers((prev) => !prev)}
          >
            {showAnswers ? "Hide answers" : "Show answers"}
          </button>
        </div>

        <p className="about-me-page__section-text">
          Put the words in the correct order.
        </p>

        <div className="about-me-page__tasks">
          {sentenceOrderTasks.map((task) => {
            const ts = taskStates[task.id];
            const isDone = ts.pool.length === 0 && ts.placed.length > 0;
            const isCorrect =
              isDone &&
              ts.placed.map((w) => w.word).join(" ") === task.answer;

            return (
              <article key={task.id} className="about-me-page__task">
                <div className="about-me-page__task-number">{task.id}</div>
                <div className="about-me-page__task-content">

                  <div className="about-me-page__chips">
                    {ts.pool.map((token) => (
                      <button
                        key={token.uid}
                        type="button"
                        className="about-me-page__chip about-me-page__chip--btn"
                        onClick={() => placeWord(task.id, token)}
                      >
                        {token.word}
                      </button>
                    ))}
                    {ts.pool.length === 0 && ts.placed.length === 0 && (
                      <span className="about-me-page__chip-placeholder">
                        —
                      </span>
                    )}
                  </div>

                  <div className="about-me-page__placed-zone">
                    {ts.placed.length === 0 && (
                      <span className="about-me-page__placed-hint">
                        Tap words above to build the sentence
                      </span>
                    )}
                    {ts.placed.map((token) => (
                      <button
                        key={token.uid}
                        type="button"
                        className="about-me-page__chip about-me-page__chip--placed"
                        onClick={() => returnWord(task.id, token)}
                      >
                        {token.word}
                      </button>
                    ))}
                  </div>

                  {isDone && (
                    <div
                      className={`about-me-page__task-result ${isCorrect ? "about-me-page__task-result--ok" : "about-me-page__task-result--bad"}`}
                    >
                      {isCorrect ? "✓ Correct!" : "✗ Not quite — try again"}
                      <button
                        type="button"
                        className="about-me-page__reset-btn"
                        onClick={() => resetTask(task.id)}
                      >
                        Reset
                      </button>
                    </div>
                  )}

                  {showAnswers && (
                    <p className="about-me-page__answer">{task.answer}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-me-page__card">
        <h2>Reading text</h2>
        <div className="about-me-page__profiles">
          {profiles.map((profile) => (
            <article key={profile.id} className="about-me-page__profile-card">
              <div className="about-me-page__avatar" aria-hidden="true">
                {profile.name.charAt(0)}
              </div>

              <div>
                <h3>{profile.name}</h3>
                <p>{profile.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-me-page__card">
        <div className="about-me-page__section-head">
          <h2>I have vs I've got</h2>
          <button
            type="button"
            className="about-me-page__ghost-btn"
            onClick={() => setShowHaveAnswers((p) => !p)}
          >
            {showHaveAnswers ? "Hide answers" : "Show answers"}
          </button>
        </div>

        <blockquote className="about-me-page__rule-quote">
          <p>
            <strong>I have</strong> краще для нейтрального, формального або
            ділового стилю, а <strong>I've got</strong> — для розмовного стилю,
            особливо в описах «що в мене є». Обидві форми в Present Simple
            можуть означати «мати», але <em>have</em> звучить офіційніше, а{" "}
            <em>have got</em> — живіше й більш природно в побутовій англійській.
          </p>
          <footer>
            <strong>Have</strong> — більш формально.&ensp;
            <strong>Have got</strong> — більш розмовно.&ensp; Обидві форми
            означають «мати» в теперішньому часі.
          </footer>
        </blockquote>

        <div className="about-me-page__rule-grid">
          <div className="about-me-page__rule-col">
            <h3>I have — коли?</h3>
            <ul className="about-me-page__list">
              <li>Формальні тексти</li>
              <li>Ділове листування</li>
              <li>Анкети, офіційні описи</li>
              <li>Навчальні або нейтральні повідомлення</li>
            </ul>
          </div>
          <div className="about-me-page__rule-col">
            <h3>I've got — коли?</h3>
            <ul className="about-me-page__list">
              <li>Розмова, повсякденні діалоги</li>
              <li>Прості описи себе, сім'ї, зовнішності</li>
              <li>Речі, хвороби</li>
              <li>Have got не вживають у минулому чи майбутньому</li>
            </ul>
          </div>
        </div>

        <h3 className="about-me-page__ex-title">
          Вправа 1 — Обери правильний варіант
        </h3>
        <p className="about-me-page__section-text">
          Вибери <em>have</em> або <em>have got</em> / <em>has got</em>.
        </p>

        {[
          { id: 1, text: "I ___ a meeting at 3 p.m.", answer: "have" },
          { id: 2, text: "She ___ two brothers.", answer: "has got" },
          { id: 3, text: "We ___ an important deadline today.", answer: "have" },
          { id: 4, text: "He ___ dark-brown eyes.", answer: "has got" },
          { id: 5, text: "I ___ a question about the project.", answer: "have" },
        ].map((item) => {
          const chosen = haveEx1[item.id];
          const isCorrect = chosen === item.answer;
          return (
            <div key={item.id} className="about-me-page__ex1-row">
              <span className="about-me-page__ex1-text">{item.text}</span>
              <div className="about-me-page__chips">
                {["have", "has got", "have got"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`about-me-page__chip about-me-page__chip--btn ${chosen === opt ? "about-me-page__chip--chosen" : ""}`}
                    onClick={() =>
                      setHaveEx1((p) => ({ ...p, [item.id]: opt }))
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {chosen && (
                <span
                  className={`about-me-page__inline-result ${isCorrect ? "about-me-page__inline-result--ok" : "about-me-page__inline-result--bad"}`}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
              )}
              {showHaveAnswers && (
                <span className="about-me-page__answer">→ {item.answer}</span>
              )}
            </div>
          );
        })}

        <h3 className="about-me-page__ex-title">
          Вправа 2 — Перепиши у двох варіантах
        </h3>
        <p className="about-me-page__section-text">
          Перетвори речення так, щоб було і з <em>have</em>, і з{" "}
          <em>have got</em>.
        </p>

        {[
          { id: 1, text: "I have a laptop.", got: "I've got a laptop." },
          { id: 2, text: "She has a dog.", got: "She's got a dog." },
          { id: 3, text: "We have new phones.", got: "We've got new phones." },
        ].map((item) => (
          <div key={item.id} className="about-me-page__ex2-row">
            <span className="about-me-page__ex2-have">{item.text}</span>
            <span className="about-me-page__ex2-sep">=</span>
            {showHaveAnswers ? (
              <span className="about-me-page__ex2-got">{item.got}</span>
            ) : (
              <span className="about-me-page__ex2-blank">?</span>
            )}
          </div>
        ))}

        <h3 className="about-me-page__ex-title">
          Вправа 3 — Обери стиль
        </h3>
        <p className="about-me-page__section-text">
          Що краще для кожної ситуації: <em>have</em> чи <em>have got</em>?
        </p>

        {[
          { id: 1, text: "Email to a client.", answer: "have" },
          { id: 2, text: "Talking to a friend.", answer: "have got" },
          {
            id: 3,
            text: "School self-introduction.",
            answer: "have got",
          },
          { id: 4, text: "CV / resume.", answer: "have" },
        ].map((item) => {
          const chosen = haveEx3[item.id];
          const isCorrect = chosen === item.answer;
          return (
            <div key={item.id} className="about-me-page__ex1-row">
              <span className="about-me-page__ex1-text">{item.text}</span>
              <div className="about-me-page__chips">
                {["have", "have got"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`about-me-page__chip about-me-page__chip--btn ${chosen === opt ? "about-me-page__chip--chosen" : ""}`}
                    onClick={() =>
                      setHaveEx3((p) => ({ ...p, [item.id]: opt }))
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {chosen && (
                <span
                  className={`about-me-page__inline-result ${isCorrect ? "about-me-page__inline-result--ok" : "about-me-page__inline-result--bad"}`}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
              )}
              {showHaveAnswers && (
                <span className="about-me-page__answer">→ {item.answer}</span>
              )}
            </div>
          );
        })}
      </section>

      <section className="about-me-page__grid">
        <article className="about-me-page__card">
          <h2>Top tips</h2>
          <ul className="about-me-page__list">
            <li>Use a capital I in I'm.</li>
            <li>Write: My name is ..., My name's ... or I'm ...</li>
            <li>Write: I'm ... years old, not I have ...</li>
            <li>Write: I'm from ... or I live in ...</li>
            <li>Write: I've got long hair / brown eyes.</li>
          </ul>
        </article>

        <article className="about-me-page__card">
          <div className="about-me-page__section-head">
            <h2>Fill in the blanks</h2>
            <button
              type="button"
              className="about-me-page__ghost-btn"
              onClick={resetFill}
            >
              Reset
            </button>
          </div>
          <p className="about-me-page__section-text">
            Click a blank, then click a word from the box to fill it. Click a
            filled word to return it.
          </p>

          <div className="about-me-page__word-bank">
            {availableWords.map((word) => (
              <button
                key={word}
                type="button"
                className={`about-me-page__chip about-me-page__chip--btn ${fillSelected !== null ? "about-me-page__chip--pickable" : ""}`}
                onClick={() => handleWordPick(word)}
              >
                {word}
              </button>
            ))}
            {availableWords.length === 0 && (
              <span className="about-me-page__chip-placeholder">
                All words placed
              </span>
            )}
          </div>

          <div className="about-me-page__fill-list">
            {fillInBlankTasks.map((task) => {
              const filled = fillAnswers[task.id];
              const isSelected = fillSelected === task.id;
              const isCorrect = filled === task.answer;
              const parts = task.sentence.split("___");

              return (
                <div key={task.id} className="about-me-page__fill-item">
                  <span className="about-me-page__fill-num">{task.id}.</span>
                  <p className="about-me-page__fill-sentence">
                    {parts[0]}
                    <button
                      type="button"
                      className={`about-me-page__blank ${isSelected ? "about-me-page__blank--active" : ""} ${filled ? (fillAllDone ? (isCorrect ? "about-me-page__blank--ok" : "about-me-page__blank--bad") : "about-me-page__blank--filled") : ""}`}
                      onClick={() => handleBlankClick(task.id)}
                    >
                      {filled || "___"}
                    </button>
                    {parts[1]}
                  </p>
                </div>
              );
            })}
          </div>

          {fillAllDone && (
            <div className="about-me-page__fill-score">
              {fillInBlankTasks.filter((t) => fillAnswers[t.id] === t.answer).length} / {fillInBlankTasks.length} correct
            </div>
          )}
        </article>
      </section>

      <section className="about-me-page__card">
        <div className="about-me-page__section-head">
          <div>
            <h2>Task 2: Write about yourself</h2>
            <p className="about-me-page__section-text">
              What's your name? Where are you from? Tell us about yourself.
            </p>
          </div>
          <button
            type="button"
            className="about-me-page__secondary-btn"
            onClick={fillTemplate}
          >
            Generate text from fields
          </button>
        </div>

        <form className="about-me-page__form" onSubmit={handleSubmit}>
          <div className="about-me-page__form-grid">
            <label>
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Natalie"
              />
            </label>

            <label>
              <span>Age</span>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
              />
            </label>

            <label>
              <span>Country</span>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Ukraine"
              />
            </label>

            <label>
              <span>City</span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Kyiv"
              />
            </label>

            <label>
              <span>Hair</span>
              <input
                name="hair"
                value={form.hair}
                onChange={handleChange}
                placeholder="long brown hair"
              />
            </label>

            <label>
              <span>Eyes</span>
              <input
                name="eyes"
                value={form.eyes}
                onChange={handleChange}
                placeholder="brown eyes"
              />
            </label>
          </div>

          <label className="about-me-page__textarea-field">
            <span>Your text</span>
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              rows={8}
              placeholder="My name is ... I am ... years old..."
            />
          </label>

          <div className="about-me-page__preview">
            <h3>Live preview</h3>
            <p>{generatedPreview || "Your preview will appear here."}</p>
          </div>

          {saveError && (
            <p className="about-me-page__message about-me-page__message--error">
              {saveError}
            </p>
          )}
          {successMessage && (
            <p className="about-me-page__message about-me-page__message--success">
              {successMessage}
            </p>
          )}

          <div className="about-me-page__actions">
            <button
              type="submit"
              className="about-me-page__primary-btn"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save writing"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
