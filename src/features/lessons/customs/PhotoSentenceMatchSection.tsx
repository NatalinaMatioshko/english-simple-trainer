import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { drillSelClass } from "../../../components/lesson31/drillSelClass";
import "../../../styles/lesson42.css";

type MatchOption = { value: string; label: string };
type MatchImage = {
  id: string;
  src: string;
  alt: string;
  answer: string;
};

type Props = {
  images?: MatchImage[];
  options?: MatchOption[];
};

/** Photo grid with per-image select → sentence / label match (reusable). */
export function PhotoSentenceMatchSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const images = props.images ?? [];
  const options = props.options ?? [];
  const [ans, setAns] = useState(() => Array(images.length).fill(""));
  const [checked, setChecked] = useState(false);
  const score = images.filter((img, i) => ans[i] === String(img.answer)).length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="l42-pic-grid l42-travel-pic-grid">
        {images.map((pic, i) => {
          const value = ans[i] ?? "";
          const isCorrect = value === String(pic.answer);
          const statusId = `${section.id}-match-${pic.id}-status`;
          return (
            <figure key={pic.id} className="l42-pic-card">
              <img src={pic.src} alt={pic.alt} loading="lazy" />
              <figcaption>
                <strong>{pic.id}</strong>
                <select
                  value={value}
                  onChange={(e) => {
                    setChecked(false);
                    const next = [...ans];
                    next[i] = e.target.value;
                    setAns(next);
                  }}
                  className={drillSelClass(
                    checked,
                    value,
                    String(pic.answer),
                  )}
                  aria-label={`Photo ${pic.id}: ${pic.alt}. Choose matching sentence`}
                  aria-describedby={checked ? statusId : undefined}
                >
                  <option value="">—</option>
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {checked ? (
                  <span
                    id={statusId}
                    className={
                      !value
                        ? "lw-item-status"
                        : isCorrect
                          ? "lw-item-status is-ok"
                          : "lw-item-status is-err"
                    }
                  >
                    {!value
                      ? "Not answered"
                      : isCorrect
                        ? "Correct"
                        : "Incorrect"}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="lw-actions">
        <button
          type="button"
          className="lw-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked ? (
          <span className="lw-muted" aria-hidden="true">
            {score} / {images.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(images.map((p) => String(p.answer)));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setAns(Array(images.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked
          ? `You got ${score} out of ${images.length} correct.`
          : ""}
      </p>
    </section>
  );
}
