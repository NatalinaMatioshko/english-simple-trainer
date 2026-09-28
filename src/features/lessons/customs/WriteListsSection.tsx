import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";

type ListItem = {
  id: string;
  label: string;
  example?: string;
  placeholder?: string;
  /** How many blank bullet lines to show (default 5) */
  slots?: number;
};

type Props = {
  lists?: ListItem[];
};

/** Labeled bullet lists with one input per line (“make a list” tasks). */
export function WriteListsSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const lists = props.lists ?? [];
  const [vals, setVals] = useState<Record<string, string[]>>({});

  function linesFor(item: ListItem): string[] {
    const n = Math.max(1, item.slots ?? 5);
    const current = vals[item.id] ?? [];
    return Array.from({ length: n }, (_, i) => current[i] ?? "");
  }

  function setLine(listId: string, index: number, value: string, slots: number) {
    setVals((prev) => {
      const next = Array.from({ length: slots }, (_, i) => prev[listId]?.[i] ?? "");
      next[index] = value;
      return { ...prev, [listId]: next };
    });
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
      <div className="lw-write-lists">
        {lists.map((item) => {
          const slots = Math.max(1, item.slots ?? 5);
          const lines = linesFor(item);
          return (
            <div key={item.id} className="lw-write-list">
              <p className="lw-write-list-label">
                {item.label}
                {item.example ? (
                  <>
                    {" "}
                    <em className="lw-write-list-eg">e.g. {item.example}</em>
                  </>
                ) : null}
              </p>
              <ul className="lw-write-list-bullets" aria-label={item.label}>
                {lines.map((line, i) => (
                  <li key={`${item.id}-${i}`}>
                    <span className="lw-write-list-dot" aria-hidden="true">
                      •
                    </span>
                    <input
                      type="text"
                      className="lw-write-list-input"
                      value={line}
                      onChange={(e) =>
                        setLine(item.id, i, e.target.value, slots)
                      }
                      placeholder={
                        i === 0 && item.placeholder
                          ? item.placeholder
                          : "…"
                      }
                      aria-label={`${item.label} item ${i + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="lw-actions">
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => setVals({})}
        >
          Reset
        </button>
      </div>
      {section.note ? (
        <p className="lw-section-desc" style={{ marginTop: "0.75rem" }}>
          <strong>Model.</strong> {section.note}
        </p>
      ) : null}
    </section>
  );
}
