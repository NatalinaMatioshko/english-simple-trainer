import { useMemo, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import "./AboutMePage.css";
import { fillInBlankTasks, profiles, sentenceOrderTasks } from "./data";
import { saveAboutMeSubmission } from "../../services/writingSubmissions";
import type { WritingSubmission } from "./types";

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
        <p>
          Read about the children, practise key phrases and write about
          yourself.
        </p>
      </section>

      <section className="about-me-page__card">
        <h2>Instructions</h2>
        <ul className="about-me-page__list">
          <li>Do the preparation activity first.</li>
          <li>Read the text about the children.</li>
          <li>Complete the practice task.</li>
          <li>Write about yourself and save your answer.</li>
        </ul>
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
          {sentenceOrderTasks.map((task) => (
            <article key={task.id} className="about-me-page__task">
              <div className="about-me-page__task-number">{task.id}</div>
              <div className="about-me-page__task-content">
                <div className="about-me-page__chips">
                  {task.words.map((word, index) => (
                    <span
                      key={`${task.id}-${index}`}
                      className="about-me-page__chip"
                    >
                      {word}
                    </span>
                  ))}
                </div>
                {showAnswers && (
                  <p className="about-me-page__answer">{task.answer}</p>
                )}
              </div>
            </article>
          ))}
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

      <section className="about-me-page__grid">
        <article className="about-me-page__card">
          <h2>Top tips</h2>
          <ul className="about-me-page__list">
            <li>Use a capital I in I’m.</li>
            <li>Write: My name is ..., My name’s ... or I’m ...</li>
            <li>Write: I’m ... years old, not I have ...</li>
            <li>Write: I’m from ... or I live in ...</li>
            <li>Write: I’ve got long hair / brown eyes.</li>
          </ul>
        </article>

        <article className="about-me-page__card">
          <h2>Task 1</h2>
          <p className="about-me-page__section-text">
            Complete the sentences with words from the box.
          </p>

          <div className="about-me-page__word-bank">
            <span>I’m</span>
            <span>live</span>
            <span>years old</span>
            <span>I’ve got</span>
            <span>from</span>
            <span>name</span>
          </div>

          <div className="about-me-page__fill-list">
            {fillInBlankTasks.map((task) => (
              <div key={task.id} className="about-me-page__fill-item">
                <span>{task.id}.</span>
                <p>{task.sentence}</p>
                {showAnswers && <strong>{task.answer}</strong>}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="about-me-page__card">
        <div className="about-me-page__section-head">
          <div>
            <h2>Task 2: Write about yourself</h2>
            <p className="about-me-page__section-text">
              What’s your name? Where are you from? Tell us about yourself.
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
