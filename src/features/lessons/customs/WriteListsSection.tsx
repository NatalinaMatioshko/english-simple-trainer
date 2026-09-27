import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";

type ListItem = {
  id: string;
  label: string;
  example?: string;
  placeholder?: string;
};

type Props = {
  lists?: ListItem[];
};

/** Two (or more) labeled textareas for “make a list” tasks. */
export function WriteListsSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const lists = props.lists ?? [];
  const [vals, setVals] = useState<Record<string, string>>({});

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
        {lists.map((item) => (
          <label key={item.id} className="lw-write-list">
            <span className="lw-write-list-label">
              {item.label}
              {item.example ? (
                <>
                  {" "}
                  <em className="lw-write-list-eg">{item.example}</em>
                </>
              ) : null}
            </span>
            <textarea
              className="lw-textarea"
              rows={3}
              value={vals[item.id] ?? ""}
              onChange={(e) =>
                setVals((prev) => ({ ...prev, [item.id]: e.target.value }))
              }
              placeholder={item.placeholder ?? "Write here…"}
              aria-label={item.label}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
