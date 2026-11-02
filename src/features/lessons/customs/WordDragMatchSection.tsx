import { useState } from "react";
import type { DragEvent } from "react";
import type { CustomSection } from "../../../types/lesson";
import "./wordDragMatch.css";

type MatchItem = {
  /** Number shown before the prompt (1, 2, …) */
  id: string;
  prompt: string;
  answer: string;
};

type Props = {
  items?: MatchItem[];
  /** Word bank order; defaults to the answers in item order */
  words?: string[];
};

const DRAG_TYPE = "text/plain";

function slotClass(checked: boolean, value: string | undefined, answer: string): string {
  if (!value) return "wdm-slot";
  if (!checked) return "wdm-slot is-filled";
  return value === answer ? "wdm-slot is-filled is-ok" : "wdm-slot is-filled is-err";
}

/** Word bank + one slot per prompt: drag a word onto a slot, or tap word then slot. */
export function WordDragMatchSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const items = props.items ?? [];
  const words = props.words ?? items.map((it) => it.answer);

  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const used = new Set(Object.values(placed));
  const bank = words.filter((w) => !used.has(w));
  const score = items.filter((it) => placed[it.id] === it.answer).length;

  /** Put a word into a slot; the word leaves any other slot, the old word goes back. */
  function place(itemId: string, word: string) {
    setChecked(false);
    setSelected(null);
    setPlaced((prev) => {
      const next: Record<string, string> = {};
      for (const [id, w] of Object.entries(prev)) if (w !== word) next[id] = w;
      next[itemId] = word;
      return next;
    });
  }

  function clearSlot(itemId: string) {
    setChecked(false);
    setPlaced((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  }

  function onSlotClick(itemId: string) {
    if (selected) place(itemId, selected);
    else if (placed[itemId]) clearSlot(itemId);
  }

  function onDrop(e: DragEvent, itemId: string) {
    e.preventDefault();
    const word = e.dataTransfer.getData(DRAG_TYPE);
    if (word) place(itemId, word);
  }

  function onBankDrop(e: DragEvent) {
    e.preventDefault();
    const word = e.dataTransfer.getData(DRAG_TYPE);
    const from = Object.entries(placed).find(([, w]) => w === word)?.[0];
    if (from) clearSlot(from);
  }

  const startDrag = (word: string) => (e: DragEvent) => {
    e.dataTransfer.setData(DRAG_TYPE, word);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div
        className="wdm-bank"
        aria-label="Word box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onBankDrop}
      >
        {bank.length === 0 ? (
          <span className="lw-muted">All words are placed.</span>
        ) : (
          bank.map((w) => (
            <button
              key={w}
              type="button"
              draggable
              onDragStart={startDrag(w)}
              className={selected === w ? "wdm-chip is-selected" : "wdm-chip"}
              aria-pressed={selected === w}
              onClick={() => setSelected((cur) => (cur === w ? null : w))}
            >
              {w}
            </button>
          ))
        )}
      </div>

      <ol className="wdm-list">
        {items.map((it) => {
          const value = placed[it.id];
          return (
            <li key={it.id} className="wdm-row">
              <span className="wdm-id">{it.id}</span>
              <span className="wdm-prompt">{it.prompt}</span>
              <span className="wdm-arrow" aria-hidden="true">
                ↔
              </span>
              <button
                type="button"
                className={slotClass(checked, value, it.answer)}
                draggable={Boolean(value)}
                onDragStart={value ? startDrag(value) : undefined}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, it.id)}
                onClick={() => onSlotClick(it.id)}
                aria-label={`${it.prompt}: ${value ?? "empty"}`}
              >
                {value ?? "…"}
              </button>
              {checked && value && value !== it.answer ? (
                <span className="lw-tip">{it.answer}</span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="lw-actions">
        <button type="button" className="lw-check-btn" onClick={() => setChecked(true)}>
          Check
        </button>
        {checked ? (
          <span className="lw-muted" aria-hidden="true">
            {score} / {items.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setPlaced(Object.fromEntries(items.map((it) => [it.id, it.answer])));
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
        {checked ? `${score} correct, ${items.length - score} not correct yet.` : ""}
      </p>
    </section>
  );
}
