import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import Hw31DragMatch, {
  type Hw31DragMatchResult,
} from "../components/Hw31DragMatch";
import {
  buildCrosswordCellMap,
  hw31CrosswordEntries,
  hw31CrosswordMeta,
  type CrosswordEntry,
} from "../data/hw31Crossword";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/hw31.css";

function cellKey(r: number, c: number) {
  return `${r}-${c}`;
}

function entryFilled(
  entry: CrosswordEntry,
  values: Record<string, string>,
): boolean {
  for (let i = 0; i < entry.answer.length; i++) {
    const r = entry.dir === "down" ? entry.row + i : entry.row;
    const c = entry.dir === "across" ? entry.col + i : entry.col;
    const v = (values[cellKey(r, c)] ?? "").toUpperCase();
    if (v !== entry.answer[i]) return false;
  }
  return true;
}

export default function HW31() {
  const { rows, cols } = hw31CrosswordMeta;
  const { letters, numbers } = useMemo(
    () => buildCrosswordCellMap(hw31CrosswordEntries, rows, cols),
    [rows, cols],
  );

  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [matchResult, setMatchResult] = useState<Hw31DragMatchResult | null>(
    null,
  );
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const onMatchResult = useCallback((r: Hw31DragMatchResult) => {
    setMatchResult(r);
  }, []);

  const letterCells = useMemo(() => {
    const list: { r: number; c: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (letters[r]![c]) list.push({ r, c });
      }
    }
    return list;
  }, [letters, rows, cols]);

  const focusCell = (r: number, c: number) => {
    inputRefs.current[cellKey(r, c)]?.focus();
  };

  const moveFrom = (r: number, c: number, dr: number, dc: number) => {
    let nr = r + dr;
    let nc = c + dc;
    while (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      if (letters[nr]![nc]) {
        focusCell(nr, nc);
        return;
      }
      nr += dr;
      nc += dc;
    }
  };

  const setLetter = (r: number, c: number, raw: string) => {
    setChecked(false);
    const ch = raw.replace(/[^a-zA-Z]/g, "").slice(-1).toUpperCase();
    setValues((prev) => {
      const next = { ...prev };
      if (!ch) delete next[cellKey(r, c)];
      else next[cellKey(r, c)] = ch;
      return next;
    });
    if (ch) moveFrom(r, c, 0, 1);
  };

  const entryOk = (e: CrosswordEntry) => entryFilled(e, values);
  const score = hw31CrosswordEntries.filter((e) => entryOk(e)).length;
  const allOk = score === hw31CrosswordEntries.length;

  const filledCount = letterCells.filter(
    (cell) => (values[cellKey(cell.r, cell.c)] ?? "").length === 1,
  ).length;

  const across = hw31CrosswordEntries.filter((e) => e.dir === "across");
  const down = hw31CrosswordEntries.filter((e) => e.dir === "down");

  const writing = [
    "HW31 · Town & home",
    "",
    "— Crossword —",
    `Score: ${score}/${hw31CrosswordEntries.length} words · cells ${filledCount}/${letterCells.length}`,
    "",
    ...hw31CrosswordEntries.map((e) => {
      const ok = entryOk(e);
      const typed = Array.from({ length: e.answer.length }, (_, i) => {
        const r = e.dir === "down" ? e.row + i : e.row;
        const c = e.dir === "across" ? e.col + i : e.col;
        return (values[cellKey(r, c)] ?? "_").toUpperCase();
      }).join("");
      return `${e.num} ${e.dir}: ${e.answer} → ${typed}${ok ? " ✓" : ""}`;
    }),
    "",
    matchResult?.summary ?? "— Drag match: not started —",
  ].join("\n");

  const matchDone =
    Boolean(matchResult) &&
    matchResult!.totalCorrect === matchResult!.totalPairs;

  const revealAll = () => {
    const next: Record<string, string> = {};
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = letters[r]![c];
        if (ch) next[cellKey(r, c)] = ch;
      }
    }
    setValues(next);
    setChecked(true);
  };

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 31</p>
            <h1>Town &amp; home</h1>
            <p className="lesson22-subtitle">
              Кросворд + гра з перетягуванням (EN → UA). Слова з уроку 31 —
              places · home · adjectives.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-31">
              ← Lesson 31
            </Link>
            <Link className="lesson22-back-link" to="/homework">
              ← Homework
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>crossword</span>
          <span>drag match</span>
          <span>3 rounds</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Crossword</p>
          <h2>{hw31CrosswordMeta.title}</h2>
          <p className="lesson22-section-desc">
            Введи літери в клітинки. Підказки — англійською, українською знизу.
            Стрілки на клавіатурі рухають курсор.
          </p>
        </div>

        <div className="hw31-board-wrap">
          <div
            className="hw31-board"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(1.75rem, 2.15rem))`,
            }}
            role="grid"
            aria-label="Crossword grid"
          >
            {Array.from({ length: rows * cols }, (_, i) => {
              const r = Math.floor(i / cols);
              const c = i % cols;
              const answer = letters[r]![c];
              if (!answer) {
                return (
                  <div
                    key={cellKey(r, c)}
                    className="hw31-cell hw31-cell--block"
                    aria-hidden="true"
                  />
                );
              }
              const key = cellKey(r, c);
              const val = values[key] ?? "";
              const num = numbers[r]![c];
              let state = "";
              if (checked) {
                state =
                  val.toUpperCase() === answer ? " is-ok" : val ? " is-err" : " is-err";
              }
              return (
                <div
                  key={key}
                  className={`hw31-cell hw31-cell--letter${state}`}
                  role="gridcell"
                >
                  {num != null && (
                    <span className="hw31-cell-num">{num}</span>
                  )}
                  <input
                    ref={(el) => {
                      inputRefs.current[key] = el;
                    }}
                    className="hw31-cell-input"
                    value={val}
                    maxLength={1}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    aria-label={`Row ${r + 1} column ${c + 1}${num != null ? `, clue ${num}` : ""}`}
                    onChange={(e) => setLetter(r, c, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !values[key]) {
                        e.preventDefault();
                        moveFrom(r, c, 0, -1);
                        return;
                      }
                      if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        moveFrom(r, c, 0, -1);
                      } else if (e.key === "ArrowRight") {
                        e.preventDefault();
                        moveFrom(r, c, 0, 1);
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        moveFrom(r, c, -1, 0);
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        moveFrom(r, c, 1, 0);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setChecked(true)}
          >
            Check
          </button>
          {checked && (
            <span className="l22-score">
              {score} / {hw31CrosswordEntries.length} words
              {allOk ? " · complete ✓" : ""}
            </span>
          )}
          <button type="button" className="l25-cr-mini-btn" onClick={revealAll}>
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setValues({});
              setChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="hw31-clues">
          <div className="hw31-clue-col">
            <h3>Across</h3>
            <ul className="hw31-clue-list">
              {across.map((e) => (
                <li
                  key={`${e.num}-across`}
                  className={`hw31-clue${checked && entryOk(e) ? " is-ok" : ""}`}
                >
                  <span className="hw31-clue-num">{e.num}.</span>
                  {e.clue}
                  <span className="hw31-clue-ua">{e.clueUa}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hw31-clue-col">
            <h3>Down</h3>
            <ul className="hw31-clue-list">
              {down.map((e) => (
                <li
                  key={`${e.num}-down`}
                  className={`hw31-clue${checked && entryOk(e) ? " is-ok" : ""}`}
                >
                  <span className="hw31-clue-num">{e.num}.</span>
                  {e.clue}
                  <span className="hw31-clue-ua">{e.clueUa}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Drag match</p>
          <h2>Match English → Ukrainian</h2>
          <p className="lesson22-section-desc">
            Перетягни слово в комірку. Звук при падінні в слот · 3 сторінки
            (places / home / adjectives).
          </p>
        </div>
        <Hw31DragMatch onResultChange={onMatchResult} />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Submit</p>
          <h2>Send homework to teacher</h2>
          <p className="lesson22-section-desc">
            Зроби кросворд і drag-match → надішли. Вчитель побачить обидва
            результати.
          </p>
        </div>
        <HomeworkSubmit
          lessonId="31"
          writing={writing}
          quizDone={allOk || matchDone}
          quizScore={
            (allOk ? score : 0) + (matchResult?.totalCorrect ?? 0)
          }
          showListeningCheck={false}
          title="Надіслати ДЗ 31"
          description="Вкажи ім’я і натисни «Надіслати». Кросворд + drag match підуть одним повідомленням."
        />
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After homework</p>
          <h2>Done?</h2>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-31"
          >
            ← Lesson 31
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/vocab"
          >
            Vocab →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/homework"
          >
            All homework →
          </Link>
        </div>
      </section>
    </div>
  );
}
