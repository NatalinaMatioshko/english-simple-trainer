import { useState } from "react";
import { CheckBar } from "../lesson38/L38Ui";
import {
  prepGeoChoose,
  prepGeoGaps,
  prepGeoLogic,
  prepGeoPictures,
} from "../../data/prepositionGeometryPractice";
import { speakEnglish } from "../../utils/speech";
import "../../styles/lesson22.css";
import "../../styles/lesson25.css";
import "../../styles/lesson31.css";
import "../../styles/lesson42.css";

const IMG = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

function pickClass(
  checked: boolean,
  selected: boolean,
  opt: string,
  answer: string,
): string {
  return [
    "l42-pick-btn",
    selected ? "is-selected" : "",
    checked && opt === answer ? "is-ok" : "",
    checked && selected && opt !== answer ? "is-err" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function PrepositionGeometryPractice() {
  const [picAns, setPicAns] = useState(() =>
    Array(prepGeoPictures.length).fill(""),
  );
  const [picChecked, setPicChecked] = useState(false);
  const picScore = prepGeoPictures.filter((g, i) => picAns[i] === g.answer)
    .length;

  const [logicAns, setLogicAns] = useState(() =>
    Array(prepGeoLogic.length).fill(""),
  );
  const [logicChecked, setLogicChecked] = useState(false);
  const logicScore = prepGeoLogic.filter((g, i) => logicAns[i] === g.answer)
    .length;

  const [gapAns, setGapAns] = useState(() => Array(prepGeoGaps.length).fill(""));
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = prepGeoGaps.filter((g, i) => gapAns[i] === g.answer).length;

  const [chooseAns, setChooseAns] = useState(() =>
    Array(prepGeoChoose.length).fill(""),
  );
  const [chooseChecked, setChooseChecked] = useState(false);
  const chooseScore = prepGeoChoose.filter((g, i) => chooseAns[i] === g.answer)
    .length;

  const totalScore = picScore + logicScore + gapScore + chooseScore;
  const totalMax =
    prepGeoPictures.length +
    prepGeoLogic.length +
    prepGeoGaps.length +
    prepGeoChoose.length;
  const allChecked =
    picChecked && logicChecked && gapChecked && chooseChecked;

  return (
    <section className="panel review-practice" id="review-practice">
      <div className="review-practice-head">
        <p className="page-kicker">Practice · test yourself</p>
        <h2>Вправи на повторення · in / on / at</h2>
        <p className="review-pdf-hint">
          Спочатку глянь презентацію вище. Потім пройди 4 короткі блоки — це
          перевірка, не новий урок.
        </p>
        <div className="review-practice-nav">
          <a href="#rpg-pics">1 Pictures</a>
          <a href="#rpg-logic">2 Geometry</a>
          <a href="#rpg-gaps">3 Gaps</a>
          <a href="#rpg-choose">4 Choose</a>
        </div>
        {allChecked ? (
          <p className="review-practice-score">
            Разом: <strong>{totalScore}</strong> / {totalMax}
            {totalScore === totalMax ? " · Super!" : " · Можна Reset і ще раз."}
          </p>
        ) : null}
      </div>

      {/* 1 · Pictures */}
      <div id="rpg-pics" className="review-practice-block">
        <p className="l31-ex-line">
          <strong className="l31-ex-num">1</strong> Look &amp; choose · in / on /
          at
        </p>
        <div className="review-pic-grid">
          {prepGeoPictures.map((item, i) => (
            <article key={item.id} className="review-pic-card">
              <img src={IMG(item.file)} alt={item.example} loading="lazy" />
              <p className="review-pic-prompt">
                {item.id}. {item.prompt}
              </p>
              <div className="l42-pick-options" role="group">
                {item.options.map((opt) => {
                  const selected = picAns[i] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={pickClass(
                        picChecked,
                        selected,
                        opt,
                        item.answer,
                      )}
                      onClick={() => {
                        setPicChecked(false);
                        const next = [...picAns];
                        next[i] = opt;
                        setPicAns(next);
                        speakEnglish(`${opt} · ${item.example}`);
                      }}
                      aria-pressed={selected}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {picChecked && picAns[i] !== item.answer ? (
                <span className="hw35-tip">{item.example}</span>
              ) : null}
            </article>
          ))}
        </div>
        <CheckBar
          checked={picChecked}
          score={picScore}
          total={prepGeoPictures.length}
          onCheck={() => setPicChecked(true)}
          onReset={() => {
            setPicAns(Array(prepGeoPictures.length).fill(""));
            setPicChecked(false);
          }}
        />
      </div>

      {/* 2 · Geometry logic */}
      <div id="rpg-logic" className="review-practice-block">
        <p className="l31-ex-line">
          <strong className="l31-ex-num">2</strong> Geometry · який прийменник?
        </p>
        <div className="l42-pick-list">
          {prepGeoLogic.map((item, i) => (
            <div key={item.id} className="l42-pick-item">
              <p className="l42-pick-tip">
                {item.id}. <span>{item.tip}</span>
              </p>
              <div className="l42-pick-options" role="group">
                {item.options.map((opt) => {
                  const selected = logicAns[i] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={pickClass(
                        logicChecked,
                        selected,
                        opt,
                        item.answer,
                      )}
                      onClick={() => {
                        setLogicChecked(false);
                        const next = [...logicAns];
                        next[i] = opt;
                        setLogicAns(next);
                        speakEnglish(opt);
                      }}
                      aria-pressed={selected}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <CheckBar
          checked={logicChecked}
          score={logicScore}
          total={prepGeoLogic.length}
          onCheck={() => setLogicChecked(true)}
          onReset={() => {
            setLogicAns(Array(prepGeoLogic.length).fill(""));
            setLogicChecked(false);
          }}
        />
      </div>

      {/* 3 · Gaps */}
      <div id="rpg-gaps" className="review-practice-block">
        <p className="l31-ex-line">
          <strong className="l31-ex-num">3</strong> Complete the sentences
        </p>
        <div className="l42-pick-list">
          {prepGeoGaps.map((item, i) => (
            <div key={item.id} className="l42-pick-item">
              <p className="l42-pick-tip">
                {item.id}. {item.before}{" "}
                <strong>___</strong> {item.after}
              </p>
              <div className="l42-pick-options" role="group">
                {item.options.map((opt) => {
                  const selected = gapAns[i] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={pickClass(
                        gapChecked,
                        selected,
                        opt,
                        item.answer,
                      )}
                      onClick={() => {
                        setGapChecked(false);
                        const next = [...gapAns];
                        next[i] = opt;
                        setGapAns(next);
                        speakEnglish(`${item.before} ${opt} ${item.after}`);
                      }}
                      aria-pressed={selected}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <CheckBar
          checked={gapChecked}
          score={gapScore}
          total={prepGeoGaps.length}
          onCheck={() => setGapChecked(true)}
          onReset={() => {
            setGapAns(Array(prepGeoGaps.length).fill(""));
            setGapChecked(false);
          }}
        />
      </div>

      {/* 4 · Choose sentence */}
      <div id="rpg-choose" className="review-practice-block">
        <p className="l31-ex-line">
          <strong className="l31-ex-num">4</strong> Choose the correct sentence
        </p>
        <div className="l42-pick-list">
          {prepGeoChoose.map((item, i) => (
            <div key={item.id} className="l42-pick-item">
              <p className="l42-pick-tip">
                {item.id}. <span>{item.tip}</span>
              </p>
              <div className="l42-pick-options review-choose-options" role="group">
                {item.options.map((opt) => {
                  const selected = chooseAns[i] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={pickClass(
                        chooseChecked,
                        selected,
                        opt,
                        item.answer,
                      )}
                      onClick={() => {
                        setChooseChecked(false);
                        const next = [...chooseAns];
                        next[i] = opt;
                        setChooseAns(next);
                        speakEnglish(opt);
                      }}
                      aria-pressed={selected}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <CheckBar
          checked={chooseChecked}
          score={chooseScore}
          total={prepGeoChoose.length}
          onCheck={() => setChooseChecked(true)}
          onReset={() => {
            setChooseAns(Array(prepGeoChoose.length).fill(""));
            setChooseChecked(false);
          }}
        />
      </div>
    </section>
  );
}
