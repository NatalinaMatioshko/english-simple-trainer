import { useMemo, useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "./clubNotebook.css";

type NotebookLine = {
  id: string;
  placeholder?: string;
  /** Pre-filled example (e.g. Can you run?) */
  preset?: string;
};

type NotebookGroup = {
  id: string;
  title: string;
  lines: NotebookLine[];
};

type Props = {
  heading?: string;
  intro?: string;
  groups?: NotebookGroup[];
};

/**
 * Spiral notepad for Ex.7 — write Can you…? questions for club teachers.
 * Top spiral binding + lined paper; each line is editable.
 */
export function ClubNotebookSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const heading = props.heading ?? "Questions for club teachers";
  const intro =
    props.intro ?? "Ask these questions to choose good teachers:";
  const groups = props.groups ?? [];

  const initial = useMemo(() => {
    const map: Record<string, string> = {};
    for (const g of groups) {
      for (const line of g.lines) {
        map[line.id] = line.preset ?? "";
      }
    }
    return map;
  }, [groups]);

  const [values, setValues] = useState<Record<string, string>>(initial);

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="l47-notebook" role="region" aria-label={heading}>
        <div className="l47-notebook-spiral" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} className="l47-notebook-ring" />
          ))}
        </div>
        <div className="l47-notebook-page">
          <h3 className="l47-notebook-title">{heading}</h3>
          <p className="l47-notebook-intro">{intro}</p>

          {groups.map((group) => (
            <div key={group.id} className="l47-notebook-group">
              <p className="l47-notebook-club">{group.title}</p>
              <ol className="l47-notebook-lines">
                {group.lines.map((line, idx) => (
                  <li key={line.id} className="l47-notebook-line">
                    <span className="l47-notebook-num" aria-hidden="true">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      className="l47-notebook-input"
                      value={values[line.id] ?? ""}
                      placeholder={line.placeholder ?? "Can you…?"}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [line.id]: e.target.value,
                        }))
                      }
                      aria-label={`${group.title} question ${idx + 1}`}
                    />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
