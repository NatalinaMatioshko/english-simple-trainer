import { grammarBoxB } from "../../data/lesson31";
import { drillSelClass } from "./drillSelClass";

export default function GrammarBoxThereB({
  answers,
  setAnswers,
  checked,
  setChecked,
}: {
  answers: string[];
  setAnswers: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
}) {
  const setGap = (index: number, value: string) => {
    setChecked(false);
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

  const score = grammarBoxB.filter((g, i) => answers[i] === g.answer).length;

  return (
    <>
      <div className="l31-there-box">
        <div className="l31-there-head">
          Is there a/an …? / Are there any …?
        </div>
        <div className="l31-there-cols">
          <div className="l31-there-col-h">Singular</div>
          <div className="l31-there-col-h">Plural</div>
        </div>

        <div className="l31-there-row">
          <div className="l31-there-sign">?</div>
          <div className="l31-there-cell">
            <p>
              <strong className="l31-ab-n">1</strong>{" "}
              <select
                value={answers[0]}
                onChange={(e) => setGap(0, e.target.value)}
                className={drillSelClass(checked, answers[0], grammarBoxB[0].answer)}
                aria-label="Gap 1"
              >
                <option value="">______</option>
                {grammarBoxB[0].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              there a shower?
            </p>
          </div>
          <div className="l31-there-cell">
            <p>
              <strong className="l31-ab-n">2</strong>{" "}
              <select
                value={answers[1]}
                onChange={(e) => setGap(1, e.target.value)}
                className={drillSelClass(checked, answers[1], grammarBoxB[1].answer)}
                aria-label="Gap 2"
              >
                <option value="">______</option>
                {grammarBoxB[1].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              there any flats?
            </p>
          </div>
        </div>

        <div className="l31-there-row">
          <div className="l31-there-sign l31-there-sign--pos">+</div>
          <div className="l31-there-cell">
            <p>
              Yes, there <strong className="l31-ab-n">3</strong>{" "}
              <select
                value={answers[2]}
                onChange={(e) => setGap(2, e.target.value)}
                className={drillSelClass(checked, answers[2], grammarBoxB[2].answer)}
                aria-label="Gap 3"
              >
                <option value="">______</option>
                {grammarBoxB[2].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              .
            </p>
          </div>
          <div className="l31-there-cell">
            <p>Yes, there are.</p>
          </div>
        </div>

        <div className="l31-there-row">
          <div className="l31-there-sign l31-there-sign--neg">−</div>
          <div className="l31-there-cell">
            <p>
              No, there <strong className="l31-ab-n">4</strong>{" "}
              <select
                value={answers[3]}
                onChange={(e) => setGap(3, e.target.value)}
                className={drillSelClass(checked, answers[3], grammarBoxB[3].answer)}
                aria-label="Gap 4"
              >
                <option value="">______</option>
                {grammarBoxB[3].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              .{" "}
              <span className="l31-there-note">(= No, there is not.)</span>
            </p>
          </div>
          <div className="l31-there-cell">
            <p>
              No, there <strong className="l31-ab-n">5</strong>{" "}
              <select
                value={answers[4]}
                onChange={(e) => setGap(4, e.target.value)}
                className={drillSelClass(checked, answers[4], grammarBoxB[4].answer)}
                aria-label="Gap 5"
              >
                <option value="">______</option>
                {grammarBoxB[4].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              .{" "}
              <span className="l31-there-note">(= No, there are not.)</span>
            </p>
          </div>
        </div>

        <p className="l31-there-but">BUT <em>Is there wifi?</em></p>

        <div className="l31-there-how">
          <strong>with How many</strong>
          <p>
            How many bedrooms <strong className="l31-ab-n">6</strong>{" "}
            <select
              value={answers[5]}
              onChange={(e) => setGap(5, e.target.value)}
              className={drillSelClass(checked, answers[5], grammarBoxB[5].answer)}
              aria-label="Gap 6"
            >
              <option value="">______</option>
              {grammarBoxB[5].options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>{" "}
            there?
          </p>
          <p>
            There <strong className="l31-ab-n">7</strong>{" "}
            <select
              value={answers[6]}
              onChange={(e) => setGap(6, e.target.value)}
              className={drillSelClass(checked, answers[6], grammarBoxB[6].answer)}
              aria-label="Gap 7"
            >
              <option value="">______</option>
              {grammarBoxB[6].options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>{" "}
            one. / There <strong className="l31-ab-n">8</strong>{" "}
            <select
              value={answers[7]}
              onChange={(e) => setGap(7, e.target.value)}
              className={drillSelClass(checked, answers[7], grammarBoxB[7].answer)}
              aria-label="Gap 8"
            >
              <option value="">______</option>
              {grammarBoxB[7].options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>{" "}
            two.
          </p>
        </div>
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
            {score} / {grammarBoxB.length}
          </span>
        )}
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAnswers(grammarBoxB.map((g) => g.answer));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAnswers(Array(grammarBoxB.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}
