import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import {
  hasHaveChoose,
  makeQuestions,
  speakFriendPrompts,
} from "../data/lesson38";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

export default function HW38() {
  const [chooseAns, setChooseAns] = useState(() =>
    Array(hasHaveChoose.length).fill(""),
  );
  const [chooseChecked, setChooseChecked] = useState(false);
  const [qRows, setQRows] = useState(() => initWordOrderRows(makeQuestions));
  const [qChecked, setQChecked] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutFriend, setAboutFriend] = useState("");

  const chooseScore = hasHaveChoose.filter(
    (item, i) => chooseAns[i] === item.answer,
  ).length;
  const writing = [aboutMe, aboutFriend].filter((s) => s.trim()).join("\n\n");

  const checks = useMemo(
    () => ({
      choose: chooseChecked && chooseScore === hasHaveChoose.length,
      questions: qChecked,
      writing: aboutMe.trim().length > 20 && aboutFriend.trim().length > 20,
    }),
    [aboutFriend, aboutMe, chooseChecked, chooseScore, qChecked],
  );
  const allDone = Object.values(checks).every(Boolean);

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 38</p>
            <h1>have / has got</h1>
            <p className="lesson22-subtitle">
              Choose the form, make questions, then write about you and a
              friend.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-38">
              ← Lesson 38
            </Link>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Choose</p>
          <h2>have or has?</h2>
        </div>
        <div className="l26-drill-list">
          {hasHaveChoose.map((item, i) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {item.prompt}
              </strong>
              <select
                value={chooseAns[i]}
                onChange={(e) => {
                  setChooseChecked(false);
                  const next = [...chooseAns];
                  next[i] = e.target.value;
                  setChooseAns(next);
                }}
                className={drillSelClass(
                  chooseChecked,
                  chooseAns[i],
                  item.answer,
                )}
              >
                <option value="">___</option>
                {item.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setChooseChecked(true)}
          >
            Check
          </button>
          {chooseChecked && (
            <span>
              {chooseScore} / {hasHaveChoose.length}
            </span>
          )}
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Questions</p>
          <h2>Have you got…?</h2>
        </div>
        <WordOrderBoard
          items={makeQuestions}
          rows={qRows}
          setRows={setQRows}
          checked={qChecked}
          setChecked={setQChecked}
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Writing</p>
          <h2>You and a friend</h2>
          <p className="lesson22-section-desc">
            Use the prompts. Send the text to your teacher.
          </p>
        </div>
        <ul className="l22-goals-list">
          {speakFriendPrompts.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <label className="lesson22-section-desc" htmlFor="hw38-me">
          About you
        </label>
        <textarea
          id="hw38-me"
          className="l22-gap-input"
          rows={5}
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="I've got… I'm in my… I live…"
          style={{ width: "100%", margin: "0.4rem 0 1rem" }}
        />
        <label className="lesson22-section-desc" htmlFor="hw38-friend">
          About a friend
        </label>
        <textarea
          id="hw38-friend"
          className="l22-gap-input"
          rows={5}
          value={aboutFriend}
          onChange={(e) => setAboutFriend(e.target.value)}
          placeholder="My friend's name is… He's / She's got…"
          style={{ width: "100%", margin: "0.4rem 0 0" }}
        />
      </section>

      <section className="lesson22-block panel">
        <HomeworkSubmit
          lessonId="38"
          writing={writing}
          quizDone={allDone}
          quizScore={chooseScore}
          showListeningCheck={false}
        />
      </section>
    </div>
  );
}
