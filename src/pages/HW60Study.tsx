import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  checkReflectCollocationOptions,
  checkReflectCollocations,
  checkReflectLikeIng,
  checkReflectPrepOptions,
  checkReflectPrepositions,
  checkReflectPronounOptions,
  checkReflectPronouns,
  checkReflectSkills,
  checkReflectTrueForYou,
  selfStudyIngGaps,
  selfStudyReviewTips,
  selfStudySentenceStems,
  selfStudyUaTranslate,
} from "../content/lessons/lesson-60/selfStudy";
import {
  hobbyFlashcards,
  likeIngFlashcards,
} from "../content/lessons/lesson-60/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";

function scoreSelect(
  items: readonly { id: string; answers: readonly string[] }[],
  values: Record<string, string>,
): number {
  return items.filter((item) =>
    matchesAnyAnswer(values[item.id] ?? "", [...item.answers]),
  ).length;
}

/** Self-study homework · Unit 9 review + Hobbies, no live class. */
export default function HW60Study() {
  const [flipHobby, setFlipHobby] = useState<number[]>([]);
  const [flipLike, setFlipLike] = useState<number[]>([]);

  const toggle = (
    list: number[],
    setList: (next: number[]) => void,
    idx: number,
    speak: string,
  ) => {
    const open = list.includes(idx);
    if (!open) speakEnglish(speak);
    setList(open ? list.filter((i) => i !== idx) : [...list, idx]);
  };

  const [prep, setPrep] = useState<Record<string, string>>({});
  const [prepChecked, setPrepChecked] = useState(false);
  const prepScore = scoreSelect(checkReflectPrepositions, prep);

  const [pron, setPron] = useState<Record<string, string>>({});
  const [pronChecked, setPronChecked] = useState(false);
  const pronScore = scoreSelect(checkReflectPronouns, pron);

  const [colo, setColo] = useState<Record<string, string>>({});
  const [coloChecked, setColoChecked] = useState(false);
  const coloScore = scoreSelect(checkReflectCollocations, colo);

  const [trueForMe, setTrueForMe] = useState<string[]>([]);

  const [likeIng, setLikeIng] = useState<Record<string, string>>({});
  const [likeIngChecked, setLikeIngChecked] = useState(false);
  const likeIngScore = scoreSelect(checkReflectLikeIng, likeIng);

  const [ings, setIngs] = useState<Record<string, string>>({});
  const [ingsChecked, setIngsChecked] = useState(false);
  const ingsScore = scoreSelect(selfStudyIngGaps, ings);

  const [sentences, setSentences] = useState<Record<string, string>>({});

  const [ua, setUa] = useState<Record<string, string>>({});
  const [uaChecked, setUaChecked] = useState(false);
  const uaScore = scoreSelect(selfStudyUaTranslate, ua);

  const [freeWriting, setFreeWriting] = useState("");
  const [reflect, setReflect] = useState<Record<string, string>>({});

  const quizTotal =
    checkReflectPrepositions.length +
    checkReflectPronouns.length +
    checkReflectCollocations.length +
    checkReflectLikeIng.length +
    selfStudyIngGaps.length +
    selfStudyUaTranslate.length;
  const quizScore =
    prepScore +
    pronScore +
    coloScore +
    likeIngScore +
    ingsScore +
    uaScore;
  const quizDone =
    prepChecked &&
    pronChecked &&
    coloChecked &&
    likeIngChecked &&
    ingsChecked &&
    uaChecked;

  const writingBlock = [
    "Make sentences · About you",
    ...selfStudySentenceStems.map((stem) => {
      const value = (sentences[stem.id] ?? "").trim();
      return value ? `${stem.prompt} → ${value}` : `${stem.prompt} →`;
    }),
    "",
    "Free writing · My hobbies",
    freeWriting.trim(),
    "",
    "Reflect · confidence 1–5",
    ...checkReflectSkills.map((skill) => {
      const value = reflect[skill] ?? "";
      return `${skill}: ${value || "—"}`;
    }),
    "",
    "True for me",
    ...checkReflectTrueForYou.map((line) => {
      const mark = trueForMe.includes(line) ? "[x]" : "[ ]";
      return `${mark} ${line}`;
    }),
  ].join("\n");

  const appendix = [
    "Prepositions",
    ...checkReflectPrepositions.map((item) => {
      const value = prep[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "Object pronouns",
    ...checkReflectPronouns.map((item) => {
      const value = pron[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "Verb collocations",
    ...checkReflectCollocations.map((item) => {
      const value = colo[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "like / enjoy / love / hate + -ing (Check & reflect)",
    ...checkReflectLikeIng.map((item) => {
      const value = likeIng[item.id] ?? "";
      return `${item.prompt} → ${value}`.trim();
    }),
    "",
    "-ing practice",
    ...selfStudyIngGaps.map((item) => {
      const value = ings[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "UA → EN",
    ...selfStudyUaTranslate.map((item) => {
      const value = ua[item.id] ?? "";
      return `${item.ua} → ${value}`.trim();
    }),
  ].join("\n");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Self-study</p>
        <h1>Hobbies · самостійно</h1>
        <p className="lead">
          Немає спільного уроку — повтори Unit 9 (місце, object pronouns,
          хобі) і потренуй like / enjoy / love / hate + -ing: Check &amp;
          reflect, свої речення та UA → EN.
        </p>
        <p className="lead">
          Матеріали: <Link to="/lessons/59">Lesson 59</Link> ·{" "}
          <Link to="/lessons/60">Lesson 60</Link> ·{" "}
          <Link to="/hw-60">HW60</Link>.
        </p>

        <section id="hw60s-review" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">0 · Review</p>
            <h2>Правила коротко</h2>
          </div>
          <div className="lesson22-prompt-grid" style={{ marginTop: "0.65rem" }}>
            {selfStudyReviewTips.map((line) => (
              <div key={line} className="lesson22-prompt-card">
                <strong>{line}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="hw60s-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1a · Flashcards</p>
            <h2>Hobby phrases</h2>
            <p className="lead">Скажи англійською, потім перевір картку.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {hobbyFlashcards.map((card, idx) => {
              const isFlipped = flipHobby.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() =>
                    toggle(flipHobby, setFlipHobby, idx, card.back)
                  }
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

        <section id="hw60s-like-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1b · Flashcards</p>
            <h2>like / enjoy / love / hate + -ing</h2>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {likeIngFlashcards.map((card, idx) => {
              const isFlipped = flipLike.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => toggle(flipLike, setFlipLike, idx, card.back)}
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

        <section id="hw60s-prep" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Check &amp; reflect</p>
            <h2>Prepositions of place</h2>
            <p className="lead">
              Обери прийменник з списку. Підказка описує картинку з підручника.
            </p>
            <p className="lead">
              Words: {checkReflectPrepOptions.join(", ")}
            </p>
          </div>
          <ol className="hw57-translate">
            {checkReflectPrepositions.map((item, index) => {
              const value = prep[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. <em style={{ opacity: 0.75 }}>({item.cue})</em>{" "}
                    {item.before} ______ {item.after}
                  </span>
                  <select
                    className={gapInputClass(prepChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setPrep((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">—</option>
                    {checkReflectPrepOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {prepChecked && value && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={prepChecked}
            score={prepScore}
            total={checkReflectPrepositions.length}
            onCheck={() => setPrepChecked(true)}
            onReset={() => {
              setPrep({});
              setPrepChecked(false);
            }}
          />
        </section>

        <section id="hw60s-pron" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Check &amp; reflect</p>
            <h2>Object pronouns</h2>
            <p className="lead">
              Words: {checkReflectPronounOptions.join(", ")}
            </p>
          </div>
          <ol className="hw57-translate">
            {checkReflectPronouns.map((item, index) => {
              const value = pron[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.before} ______ {item.after}
                  </span>
                  <select
                    className={gapInputClass(pronChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setPron((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">—</option>
                    {checkReflectPronounOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {pronChecked && value && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={pronChecked}
            score={pronScore}
            total={checkReflectPronouns.length}
            onCheck={() => setPronChecked(true)}
            onReset={() => {
              setPron({});
              setPronChecked(false);
            }}
          />
        </section>

        <section id="hw60s-colo" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4a · Check &amp; reflect</p>
            <h2>Verb collocations</h2>
            <p className="lead">
              Words: {checkReflectCollocationOptions.join(", ")}
            </p>
          </div>
          <ol className="hw57-translate">
            {checkReflectCollocations.map((item, index) => {
              const value = colo[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.before} ______ {item.after}
                  </span>
                  <select
                    className={gapInputClass(coloChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setColo((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">—</option>
                    {checkReflectCollocationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {coloChecked && value && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={coloChecked}
            score={coloScore}
            total={checkReflectCollocations.length}
            onCheck={() => setColoChecked(true)}
            onReset={() => {
              setColo({});
              setColoChecked(false);
            }}
          />
        </section>

        <section id="hw60s-true" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4b · About you</p>
            <h2>Tick the sentences that are true for you</h2>
          </div>
          <ul className="hw57-translate" style={{ listStyle: "none", paddingLeft: 0 }}>
            {checkReflectTrueForYou.map((line) => {
              const checked = trueForMe.includes(line);
              return (
                <li key={line} style={{ marginBottom: "0.55rem" }}>
                  <label style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setTrueForMe((prev) =>
                          checked
                            ? prev.filter((x) => x !== line)
                            : [...prev, line],
                        )
                      }
                    />
                    <span>{line}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="hw60s-like-reflect" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Check &amp; reflect</p>
            <h2>love / hate / enjoy + -ing</h2>
            <p className="lead">
              Напиши правильну форму (наприклад: <code>love reading</code> або{" "}
              <code>do you enjoy watching</code>).
            </p>
          </div>
          <ol className="hw57-translate">
            {checkReflectLikeIng.map((item, index) => {
              const value = likeIng[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.prompt}
                  </span>
                  <input
                    className={gapInputClass(likeIngChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setLikeIng((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    autoComplete="off"
                  />
                  {likeIngChecked && value.trim() && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={likeIngChecked}
            score={likeIngScore}
            total={checkReflectLikeIng.length}
            onCheck={() => setLikeIngChecked(true)}
            onReset={() => {
              setLikeIng({});
              setLikeIngChecked(false);
            }}
          />
        </section>

        <section id="hw60s-ing" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">6 · Extra practice</p>
            <h2>Write the -ing form</h2>
            <p className="lead">
              Допиши дієслово у формі -ing. Потім натисни Check.
            </p>
          </div>
          <ol className="hw57-translate">
            {selfStudyIngGaps.map((item, index) => {
              const value = ings[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.before} ______ {item.after}
                  </span>
                  <input
                    className={gapInputClass(ingsChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setIngs((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    autoComplete="off"
                    aria-label={`${item.before} -ing ${item.after}`}
                  />
                  {ingsChecked && value.trim() && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={ingsChecked}
            score={ingsScore}
            total={selfStudyIngGaps.length}
            onCheck={() => setIngsChecked(true)}
            onReset={() => {
              setIngs({});
              setIngsChecked(false);
            }}
          />
        </section>

        <section id="hw60s-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">7 · Make sentences</p>
            <h2>About you</h2>
            <p className="lead">
              Напиши повне речення. Використовуй like / enjoy / love / hate +
              -ing.
            </p>
          </div>
          <ol className="hw57-translate">
            {selfStudySentenceStems.map((stem, index) => (
              <li key={stem.id}>
                <span>
                  {index + 1}. {stem.prompt}{" "}
                  <em style={{ opacity: 0.7 }}>({stem.hint})</em>
                </span>
                <input
                  className="l22-gap-input"
                  value={sentences[stem.id] ?? ""}
                  onChange={(e) =>
                    setSentences((prev) => ({
                      ...prev,
                      [stem.id]: e.target.value,
                    }))
                  }
                  placeholder="I like watching films."
                  autoComplete="off"
                  aria-label={stem.prompt}
                />
              </li>
            ))}
          </ol>
        </section>

        <section id="hw60s-ua" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">8 · Translate</p>
            <h2>UA → EN</h2>
            <p className="lead">
              Переклади: хобі, місце і object pronouns. Потім Check.
            </p>
          </div>
          <ol className="hw57-translate">
            {selfStudyUaTranslate.map((item, index) => {
              const value = ua[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.ua}
                  </span>
                  <input
                    className={gapInputClass(uaChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setUa((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    autoComplete="off"
                  />
                  {uaChecked && value.trim() && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={uaChecked}
            score={uaScore}
            total={selfStudyUaTranslate.length}
            onCheck={() => setUaChecked(true)}
            onReset={() => {
              setUa({});
              setUaChecked(false);
            }}
          />
        </section>

        <section id="hw60s-free" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">9 · Free writing</p>
            <h2>My hobbies</h2>
            <p className="lead">
              Напиши 4–6 речень про свої хобі (що любиш / не любиш робити).
            </p>
          </div>
          <textarea
            className="l25-writing-area"
            rows={10}
            value={freeWriting}
            onChange={(e) => setFreeWriting(e.target.value)}
            placeholder={
              "I like going swimming. I enjoy cooking at the weekend…\nI love… I don’t like…"
            }
          />
        </section>

        <section id="hw60s-reflect" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">10 · Reflect</p>
            <h2>How confident are you?</h2>
            <p className="lead">Оціни себе від 1 (важко) до 5 (легко).</p>
          </div>
          <ol className="hw57-translate">
            {checkReflectSkills.map((skill, index) => (
              <li key={skill}>
                <span>
                  {index + 1}. {skill}
                </span>
                <select
                  className="l22-gap-input"
                  value={reflect[skill] ?? ""}
                  onChange={(e) =>
                    setReflect((prev) => ({
                      ...prev,
                      [skill]: e.target.value,
                    }))
                  }
                >
                  <option value="">—</option>
                  {["1", "2", "3", "4", "5"].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ol>
        </section>

        <HomeworkSubmit
          lessonId="60-study"
          writing={writingBlock}
          appendix={appendix}
          quizDone={quizDone}
          quizScore={quizScore}
          showListeningCheck={false}
          minWritingLength={40}
          emptyMessage="Заповни речення про себе (блок 7) і вільне письмо (блок 9), потім надішли."
          description={`У лист підуть речення, письмо, reflect і відповіді Check (${quizScore}/${quizTotal}). Додай ім’я і натисни «Надіслати».`}
        />
      </div>
    </div>
  );
}
