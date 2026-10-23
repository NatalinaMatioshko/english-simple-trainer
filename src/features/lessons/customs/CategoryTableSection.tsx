import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "./categoryTable.css";

type Category = {
  id: string;
  label: string;
  /** Built-in icon key: water · land · plants · air · directions */
  icon?: string;
};

type Word = {
  word: string;
  /** Category id */
  answer: string;
};

type Props = {
  categories?: Category[];
  words?: Word[];
};

function CategoryIcon({ icon }: { icon?: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "water":
      return (
        <svg {...common}>
          <path d="M12 3c3 4.4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-6.6 6-11z" />
          <path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" />
        </svg>
      );
    case "land":
      return (
        <svg {...common}>
          <path d="M4 19c3-1 4-4 4-8V5" />
          <path d="M8 11c2 0 3 2 6 2s4-1 6-1" />
          <path d="M4 19h16" />
        </svg>
      );
    case "plants":
      return (
        <svg {...common}>
          <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" />
          <path d="M5 19l8-8" />
        </svg>
      );
    case "air":
      return (
        <svg {...common}>
          <path d="M3 9h10a3 3 0 1 0-3-3" />
          <path d="M3 13h15a3 3 0 1 1-3 3" />
          <path d="M3 17h6" />
        </svg>
      );
    case "directions":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 6.5l2 5.5-2 5.5-2-5.5z" />
        </svg>
      );
    default:
      return null;
  }
}

/** Sort words into a table: tap a word, then tap a column. */
export function CategoryTableSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const categories = props.categories ?? [];
  const words = props.words ?? [];

  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const bank = words.filter((w) => !placed[w.word]);
  const score = words.filter((w) => placed[w.word] === w.answer).length;
  const selectedLabel = selected ? `“${selected}”` : "";

  function putInto(categoryId: string) {
    if (!selected) return;
    setPlaced((prev) => ({ ...prev, [selected]: categoryId }));
    setSelected(null);
    setChecked(false);
  }

  function takeBack(word: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      delete next[word];
      return next;
    });
    setSelected(word);
    setChecked(false);
  }

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="ct-bank" aria-label="Words">
        {bank.length === 0 ? (
          <span className="lw-muted">All words are in the table.</span>
        ) : (
          bank.map((w) => (
            <button
              key={w.word}
              type="button"
              className={`ct-word${selected === w.word ? " is-selected" : ""}`}
              aria-pressed={selected === w.word}
              onClick={() =>
                setSelected((cur) => (cur === w.word ? null : w.word))
              }
            >
              {w.word}
            </button>
          ))
        )}
      </div>

      <div className="ct-table">
        {categories.map((cat) => {
          const inCol = words.filter((w) => placed[w.word] === cat.id);
          return (
            <div key={cat.id} className="ct-col">
              <div className="ct-head">
                <span className="ct-icon">
                  <CategoryIcon icon={cat.icon} />
                </span>
                <span className="ct-label">{cat.label}</span>
              </div>
              <div className="ct-cell">
                {selected ? (
                  <button
                    type="button"
                    className="ct-drop"
                    onClick={() => putInto(cat.id)}
                    aria-label={`Put ${selectedLabel} into ${cat.label}`}
                  >
                    + here
                  </button>
                ) : null}
                {inCol.map((w) => {
                  const state = !checked
                    ? ""
                    : w.answer === cat.id
                      ? " is-ok"
                      : " is-err";
                  return (
                    <button
                      key={w.word}
                      type="button"
                      className={`ct-placed${state}`}
                      onClick={() => takeBack(w.word)}
                      aria-label={`${w.word} — tap to move`}
                    >
                      {w.word}
                    </button>
                  );
                })}
              </div>
            </div>
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
            {score} / {words.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setPlaced(Object.fromEntries(words.map((w) => [w.word, w.answer])));
            setSelected(null);
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setPlaced({});
            setSelected(null);
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked ? `${score} correct, ${words.length - score} not correct yet.` : ""}
      </p>
    </section>
  );
}
