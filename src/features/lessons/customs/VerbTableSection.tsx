import type { CustomSection } from "../../../types/lesson";
import "../lessonWorkspace.css";

type Props = {
  columns?: string[];
  rows?: string[][];
};

/**
 * Small readable table for verb lists / gloss grids.
 * Mobile: horizontal scroll container (no page overflow).
 */
export function VerbTableSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const columns = props.columns ?? [];
  const rows = props.rows ?? [];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="lw-table-scroll">
        <table className="lw-verb-table">
          {columns.length > 0 ? (
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row[0] ?? i}-${i}`}>
                {row.map((cell, j) => (
                  <td key={`${i}-${j}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.note ? (
        <blockquote className="lw-note">
          <p>
            <strong>Note.</strong> {section.note}
          </p>
        </blockquote>
      ) : null}
    </section>
  );
}
