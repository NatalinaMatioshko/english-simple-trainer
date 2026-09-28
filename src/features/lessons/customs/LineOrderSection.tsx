import { useMemo, useState } from "react";
import type { CustomSection } from "../../../types/lesson";

type LineItem = {
  id: string;
  text: string;
  /** 1-based correct position */
  order: number;
};

type Props = {
  items?: LineItem[];
  /** Fixed first line id (optional) — pre-placed and locked */
  startId?: string;
};

function shuffleIds(ids: string[]): string[] {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Put dialogue lines in the correct order (tap to build sequence). */
export function LineOrderSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
  const startId = props.startId;
  const byId = useMemo(() => {
    const map = new Map(items.map((item) => [item.id, item]));
    return map;
  }, [items]);

  const initialSeq = startId && byId.has(startId) ? [startId] : [];
  const [seq, setSeq] = useState<string[]>(initialSeq);
  const [checked, setChecked] = useState(false);
  const [poolOrder] = useState(() =>
    shuffleIds(
      items
        .map((item) => item.id)
        .filter((id) => !(startId && id === startId)),
    ),
  );

  const pool = poolOrder
    .filter((id) => !seq.includes(id))
    .map((id) => byId.get(id))
    .filter((item): item is LineItem => Boolean(item));
  const correctSeq = [...items]
    .sort((a, b) => a.order - b.order)
    .map((item) => item.id);
  const score =
    seq.length === correctSeq.length &&
    seq.every((id, i) => id === correctSeq[i])
      ? items.length
      : seq.filter((id, i) => id === correctSeq[i]).length;
  const complete = seq.length === items.length;
  const allOk = complete && score === items.length;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <ol className="lw-line-order-seq" aria-label="Your order">
        {seq.map((id, i) => {
          const item = byId.get(id);
          if (!item) return null;
          const locked = Boolean(startId && i === 0 && id === startId);
          const ok = checked && id === correctSeq[i];
          const bad = checked && id !== correctSeq[i];
          return (
            <li
              key={`${id}-${i}`}
              className={`lw-line-order-row${ok ? " is-ok" : ""}${
                bad ? " is-err" : ""
              }`}
            >
              <span className="lw-line-order-n">{i + 1}.</span>
              <span>{item.text}</span>
              {!locked ? (
                <button
                  type="button"
                  className="lw-mini-btn"
                  onClick={() => {
                    setChecked(false);
                    setSeq((prev) => prev.filter((_, j) => j !== i));
                  }}
                >
                  Remove
                </button>
              ) : null}
            </li>
          );
        })}
      </ol>

      {pool.length > 0 ? (
        <div className="lw-line-order-pool" role="group" aria-label="Lines to place">
          {pool.map((item) => (
            <button
              key={item.id}
              type="button"
              className="lw-line-order-chip"
              onClick={() => {
                setChecked(false);
                setSeq((prev) => [...prev, item.id]);
              }}
            >
              {item.text}
            </button>
          ))}
        </div>
      ) : null}

      <div className="lw-actions">
        <button
          type="button"
          className="lw-check-btn"
          onClick={() => setChecked(true)}
          disabled={!complete}
        >
          Check
        </button>
        {checked ? (
          <span className="lw-muted" aria-hidden="true">
            {allOk ? "Perfect!" : `${score} / ${items.length} in place`}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setSeq([...correctSeq]);
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setSeq(initialSeq);
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      <p className="lw-a11y-feedback" role="status" aria-live="polite">
        {checked
          ? allOk
            ? "All lines in the correct order."
            : `${score} correct so far.`
          : complete
            ? "Ready to check."
            : `Placed ${seq.length} of ${items.length}.`}
      </p>
    </section>
  );
}
