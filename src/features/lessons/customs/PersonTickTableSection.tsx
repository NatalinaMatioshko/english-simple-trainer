import { useCallback, useMemo, useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "./personTickTable.css";

type Column = { id: string; label: string };
type Row = { id: string; label: string; correctTicks: string[] };

type Props = {
  columns?: Column[];
  rows?: Row[];
  /** First column header (default Who…) */
  promptHeader?: string;
};

function setsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

/** Reading table: tick one or more people per question row. */
export function PersonTickTableSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const columns = props.columns ?? [];
  const rows = props.rows ?? [];
  const promptHeader = props.promptHeader ?? "Who…";

  const correctByRow = useMemo(
    () =>
      Object.fromEntries(
        rows.map((r) => [r.id, new Set(r.correctTicks.map((id) => id.toLowerCase()))]),
      ),
    [rows],
  );

  const [ticks, setTicks] = useState<Record<string, Record<string, boolean>>>({});
  const [checked, setChecked] = useState(false);

  const toggle = useCallback((rowId: string, colId: string) => {
    setChecked(false);
    const key = colId.toLowerCase();
    setTicks((prev) => {
      const row = { ...(prev[rowId] ?? {}) };
      row[key] = !row[key];
      return { ...prev, [rowId]: row };
    });
  }, []);

  const selectedSet = (rowId: string): Set<string> => {
    const row = ticks[rowId] ?? {};
    return new Set(
      Object.entries(row)
        .filter(([, on]) => on)
        .map(([id]) => id),
    );
  };

  const isRowOk = (rowId: string) =>
    setsEqual(selectedSet(rowId), correctByRow[rowId] ?? new Set());

  const score = rows.filter((r) => isRowOk(r.id)).length;
  const incorrectCount = rows.length - score;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="ptt-scroll">
        <table className="ptt-table">
          <thead>
            <tr>
              <th scope="col" className="ptt-th ptt-th--prompt">
                {promptHeader}
              </th>
              {columns.map((col) => (
                <th key={col.id} scope="col" className="ptt-th ptt-th--person">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const ok = checked && isRowOk(row.id);
              const wrong = checked && !isRowOk(row.id);
              return (
                <tr
                  key={row.id}
                  className={`ptt-row${wrong ? " is-err" : ""}${ok ? " is-ok" : ""}`}
                >
                  <th scope="row" className="ptt-prompt">
                    <span className="ptt-num" aria-hidden="true">
                      {idx + 1}
                    </span>
                    {row.label}
                  </th>
                  {columns.map((col) => {
                    const colKey = col.id.toLowerCase();
                    const on = Boolean(ticks[row.id]?.[colKey]);
                    const cellOk =
                      checked && (correctByRow[row.id]?.has(colKey) ? on : !on);
                    const cellWrong = checked && !cellOk;
                    return (
                      <td
                        key={col.id}
                        className={`ptt-cell${cellWrong ? " is-err" : ""}${
                          cellOk && on ? " is-ok" : ""
                        }`}
                      >
                        <label className="ptt-tick">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggle(row.id, col.id)}
                            aria-label={`${idx + 1} ${row.label} · ${col.label}`}
                          />
                          <span className="ptt-tick-mark" aria-hidden="true" />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="lw-actions">
        <button type="button" className="lw-check-btn" onClick={() => setChecked(true)}>
          Check
        </button>
        {checked ? (
          <span className="lw-muted" aria-hidden="true">
            {score} / {rows.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            const next: Record<string, Record<string, boolean>> = {};
            for (const row of rows) {
              const cells: Record<string, boolean> = {};
              for (const id of row.correctTicks) cells[id.toLowerCase()] = true;
              next[row.id] = cells;
            }
            setTicks(next);
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setTicks({});
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked ? `${score} correct, ${incorrectCount} incorrect.` : ""}
      </p>
    </section>
  );
}
