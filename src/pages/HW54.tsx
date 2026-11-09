import { useCallback, useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { Hw54CheckReflect, type Hw54CrStats } from "../components/Hw54CheckReflect";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  BOARD_ALT,
  IMG54,
  hwBoardGaps,
  hwDialogueGaps,
  hwDialogueOptions,
  hwQuestions,
} from "../content/lessons/lesson-54/activities";
import { ticketFlashcards } from "../content/lessons/lesson-54/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

/** Homework for Lesson 54 — ticket words · board · dialogue · questions · writing. */
export default function HW54() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(ticketFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [boardAns, setBoardAns] = useState<Record<string, string>>({});
  const [boardChecked, setBoardChecked] = useState(false);
  const boardScore = hwBoardGaps.filter((g) =>
    matchesAnyAnswer(boardAns[g.id] ?? "", g.answers),
  ).length;

  const [dlgAns, setDlgAns] = useState<Record<string, string>>({});
  const [dlgChecked, setDlgChecked] = useState(false);
  const dlgScore = hwDialogueGaps.filter((d) => (dlgAns[d.id] ?? "") === d.answer).length;

  const [qAns, setQAns] = useState<Record<string, string>>({});
  const [qChecked, setQChecked] = useState(false);
  const qScore = hwQuestions.filter((q) =>
    matchesAnyAnswer(qAns[q.id] ?? "", q.answers),
  ).length;

  const [writing, setWriting] = useState("");
  const [cr, setCr] = useState<Hw54CrStats>({
    allChecked: false,
    reflectDone: false,
    score: 0,
    total: 0,
  });
  const onCrStats = useCallback((stats: Hw54CrStats) => setCr(stats), []);

  const lessonQuizDone = boardChecked && dlgChecked && qChecked;
  const lessonScore = boardScore + dlgScore + qScore;
  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 54</p>
        <h1>Buy travel tickets</h1>
        <p className="lead">
          Слова для квитків · табло · діалог · питання · письмо · Check and
          reflect (Unit 7).
        </p>
        <p className="l22-muted" style={{ marginTop: "0.5rem" }}>
          <a href="#hw54-cr">Jump to Check and reflect →</a>
        </p>

        <section id="hw54-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Words for the station</h2>
            <p className="lead">Спочатку скажи англійською, потім натисни, щоб перевірити.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {ticketFlashcards.map((card, idx) => {
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

        <section id="hw54-board" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · The board</p>
            <h2>Read the board and complete the sentences</h2>
          </div>
          <img
            src={IMG54("paddington-board.svg")}
            alt={BOARD_ALT}
            style={{ display: "block", width: "100%", maxWidth: "40rem", margin: "0.65rem 0" }}
          />
          <ol className="l22-gap-list">
            {hwBoardGaps.map((g) => {
              const val = boardAns[g.id] ?? "";
              const ok = matchesAnyAnswer(val, g.answers);
              return (
                <li key={g.id}>
                  <span>{g.before} </span>
                  <input
                    className={gapInputClass(boardChecked, val, ok)}
                    style={{ width: "min(100%, 8rem)" }}
                    value={val}
                    onChange={(e) => {
                      setBoardChecked(false);
                      setBoardAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                    aria-label={`${g.before} …`}
                  />
                  <span>{g.after}</span>
                  {boardChecked && val.trim() && !ok ? (
                    <p className="l22-muted">→ {g.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={boardChecked}
            score={boardScore}
            total={hwBoardGaps.length}
            onCheck={() => setBoardChecked(true)}
            onReset={() => {
              setBoardAns({});
              setBoardChecked(false);
            }}
          />
        </section>

        <section id="hw54-dialogue" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · A ticket to Oxford</p>
            <h2>Complete the conversation</h2>
            <p className="lead">Кожне слово — один раз.</p>
          </div>
          <ol className="l22-gap-list">
            {hwDialogueGaps.map((d) => {
              const value = dlgAns[d.id] ?? "";
              return (
                <li key={d.id}>
                  <label>
                    <span>{d.before} </span>
                    <select
                      value={value}
                      className={drillSelClass(dlgChecked, value, d.answer)}
                      onChange={(e) => {
                        setDlgChecked(false);
                        setDlgAns((prev) => ({ ...prev, [d.id]: e.target.value }));
                      }}
                      aria-label={`${d.before} … ${d.after}`}
                    >
                      <option value="">—</option>
                      {hwDialogueOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <span> {d.after}</span>
                  </label>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={dlgChecked}
            score={dlgScore}
            total={hwDialogueGaps.length}
            onCheck={() => setDlgChecked(true)}
            onReset={() => {
              setDlgAns({});
              setDlgChecked(false);
            }}
          />
        </section>

        <section id="hw54-questions" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Sentences</p>
            <h2>Make sentences using the prompts</h2>
            <p className="lead">
              Example:{" "}
              <strong>what time / it / leave? → What time does it leave?</strong>
            </p>
          </div>
          <ol className="l22-gap-list">
            {hwQuestions.map((q) => {
              const val = qAns[q.id] ?? "";
              const ok = matchesAnyAnswer(val, q.answers);
              return (
                <li key={q.id}>
                  <span>{q.prompt} → </span>
                  <input
                    className={gapInputClass(qChecked, val, ok)}
                    style={{ width: "min(100%, 24rem)" }}
                    value={val}
                    onChange={(e) => {
                      setQChecked(false);
                      setQAns((prev) => ({ ...prev, [q.id]: e.target.value }));
                    }}
                    aria-label={`Sentence: ${q.prompt}`}
                  />
                  {qChecked && val.trim() && !ok ? (
                    <p className="l22-muted">→ {q.hint}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={qChecked}
            score={qScore}
            total={hwQuestions.length}
            onCheck={() => setQChecked(true)}
            onReset={() => {
              setQAns({});
              setQChecked(false);
            }}
          />
        </section>

        <section id="hw54-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Write</p>
            <h2>A ticket to Swansea</h2>
            <p className="lead">
              Write a conversation at the station, 8–10 lines. Use the board in
              Task 2. Ask about the time, the arrival, the ticket and the
              platform. Choose your own price.
            </p>
          </div>
          <textarea
            className="l22-textarea"
            rows={8}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder={
              "You: Excuse me. What time is the next train to Swansea, please?\nAssistant: …"
            }
          />
        </section>

        <Hw54CheckReflect onStats={onCrStats} />

        <HomeworkSubmit
          lessonId="54"
          writing={writing}
          quizDone={lessonQuizDone && cr.allChecked && cr.reflectDone}
          quizScore={lessonScore + cr.score}
          description="Перевір урок (tasks 1–4), Check and reflect, reflect 1–5, напиши діалог — потім надішли."
        />
      </div>
    </div>
  );
}
