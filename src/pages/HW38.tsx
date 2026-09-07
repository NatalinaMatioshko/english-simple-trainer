import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import {
  hw38Possessives,
  hw38Questions,
  hw38Translate,
  hw38WritePrompts,
} from "../data/hw38";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson35.css";

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function textOk(value: string, answers: readonly string[]): boolean {
  const v = normText(value);
  return v !== "" && answers.some((a) => normText(a) === v);
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

function TranslateBlock({
  items,
  ans,
  setAns,
  checked,
  setChecked,
  aria,
}: {
  items: readonly { id: string; ua: string; answers: readonly string[] }[];
  ans: string[];
  setAns: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
  aria: string;
}) {
  const score = items.filter((item, i) => textOk(ans[i] ?? "", item.answers))
    .length;
  return (
    <>
      <div className="l26-drill-list">
        {items.map((item, i) => {
          const val = ans[i] ?? "";
          const ok = checked && textOk(val, item.answers);
          return (
            <div key={item.id} className="hw35-fix-row">
              <p className="hw35-fix-wrong">
                <strong>{i + 1}.</strong> {item.ua}
              </p>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  setChecked(false);
                  const next = [...ans];
                  next[i] = e.target.value;
                  setAns(next);
                }}
                className={inputCls(checked, val, ok)}
                placeholder="English…"
                aria-label={`${aria} ${i + 1}`}
              />
              {checked && !ok && (
                <span className="hw35-tip">{item.answers[0]}</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="l22-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked && (
          <span className="l22-score">
            {score} / {items.length}
          </span>
        )}
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAns(items.map((t) => t.answers[0]));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAns(Array(items.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default function HW38() {
  const [translateAns, setTranslateAns] = useState(() =>
    Array(hw38Translate.length).fill(""),
  );
  const [translateChecked, setTranslateChecked] = useState(false);
  const [qAns, setQAns] = useState(() => Array(hw38Questions.length).fill(""));
  const [qChecked, setQChecked] = useState(false);
  const [posAns, setPosAns] = useState(() =>
    Array(hw38Possessives.length).fill(""),
  );
  const [posChecked, setPosChecked] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutFriend, setAboutFriend] = useState("");

  const translateScore = hw38Translate.filter((item, i) =>
    textOk(translateAns[i] ?? "", item.answers),
  ).length;
  const qScore = hw38Questions.filter((item, i) =>
    textOk(qAns[i] ?? "", item.answers),
  ).length;
  const posScore = hw38Possessives.filter((item, i) =>
    textOk(posAns[i] ?? "", item.answers),
  ).length;
  const quizScore = translateScore + qScore + posScore;
  const writing = [aboutMe, aboutFriend].filter((s) => s.trim()).join("\n\n");

  const checks = useMemo(
    () => ({
      translate: translateChecked && translateScore === hw38Translate.length,
      questions: qChecked && qScore === hw38Questions.length,
      possessives: posChecked && posScore === hw38Possessives.length,
      writing: aboutMe.trim().length > 20 && aboutFriend.trim().length > 20,
    }),
    [
      aboutFriend,
      aboutMe,
      posChecked,
      posScore,
      qChecked,
      qScore,
      translateChecked,
      translateScore,
    ],
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
              Речення, питання і присвійні:{" "}
              <em>my, his, her, client&apos;s, mom&apos;s, brother&apos;s</em>.
              Потім напиши про себе і друга.
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
        <div className="lesson22-hero-chips">
          <span>I&apos;ve got / Has he got…?</span>
          <span>my · his · her</span>
          <span>client&apos;s hair</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw38-translate">1 Sentences</a>
          <a href="#hw38-questions">2 Questions</a>
          <a href="#hw38-possessives">3 Possessives</a>
          <a href="#hw38-write">4 Write</a>
          <a href="#hw38-submit">Submit</a>
        </div>
      </section>

      <section id="hw38-translate" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Sentences</p>
          <h2>UA → EN</h2>
          <p className="lesson22-section-desc">
            Напиши англійською. Використовуй <strong>have / has got</strong> і{" "}
            <em>I&apos;ve / He&apos;s / She&apos;s / They&apos;ve</em>.
          </p>
        </div>
        <TranslateBlock
          items={hw38Translate}
          ans={translateAns}
          setAns={setTranslateAns}
          checked={translateChecked}
          setChecked={setTranslateChecked}
          aria="Sentence"
        />
      </section>

      <section id="hw38-questions" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Questions</p>
          <h2>Ask correctly</h2>
          <p className="lesson22-section-desc">
            Зроби питання. Пам&apos;ятай порядок:{" "}
            <strong>Have / Has + особа + got…?</strong> або{" "}
            <strong>What / How old / Where + is…?</strong>
          </p>
        </div>
        <blockquote className="l23-rule-quote">
          <p>
            Have <em>you</em> got blonde hair?
            <br />
            Has <em>he</em> got a beard?
            <br />
            What&apos;s <em>her</em> name?
          </p>
        </blockquote>
        <TranslateBlock
          items={hw38Questions}
          ans={qAns}
          setAns={setQAns}
          checked={qChecked}
          setChecked={setQChecked}
          aria="Question"
        />
      </section>

      <section id="hw38-possessives" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Possessives</p>
          <h2>my / his / her / &apos;s</h2>
          <p className="lesson22-section-desc">
            Чиє це? Не <em>hair a client</em>. Правильно:{" "}
            <strong>a client&apos;s hair</strong> /{" "}
            <strong>my client&apos;s hair</strong>.
          </p>
        </div>
        <blockquote className="l23-rule-quote">
          <p>
            my hair · his eyes · her son
            <br />
            mom&apos;s name · brother&apos;s name · a friend&apos;s bag
            <br />
            I&apos;m cutting <strong>a client&apos;s hair</strong> now.
          </p>
        </blockquote>
        <TranslateBlock
          items={hw38Possessives}
          ans={posAns}
          setAns={setPosAns}
          checked={posChecked}
          setChecked={setPosChecked}
          aria="Possessive"
        />
      </section>

      <section id="hw38-write" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Write</p>
          <h2>You and a friend</h2>
          <p className="lesson22-section-desc">
            Як у вправі 9–10 на уроці. Напиши кілька речень і надішли вчителю.
          </p>
        </div>
        <ul className="l22-goals-list">
          {hw38WritePrompts.map((item) => (
            <li key={item}>{item}</li>
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
          placeholder="My name is… I'm a barber. I've got… I'm in my…"
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
          placeholder="My friend's name is… He's / She's got… We live…"
          style={{ width: "100%", margin: "0.4rem 0 0" }}
        />
      </section>

      <section id="hw38-submit" className="lesson22-block panel">
        <HomeworkSubmit
          lessonId="38"
          writing={writing}
          quizDone={allDone}
          quizScore={quizScore}
          showListeningCheck={false}
        />
      </section>
    </div>
  );
}
