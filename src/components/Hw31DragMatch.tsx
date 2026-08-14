import { useEffect, useMemo, useState } from "react";
import {
  hw31MatchRounds,
  type Hw31MatchPair,
} from "../data/hw31Match";
import { shuffle } from "../utils/array";
import "../styles/hw31.css";

/** Prefer match.mp3 if present; fall back to match.wav / Web Audio beep. */
const MATCH_SOUNDS = [
  `${import.meta.env.BASE_URL}sounds/match.mp3`,
  `${import.meta.env.BASE_URL}sounds/match.wav`,
] as const;

const PILL_COLORS = [
  "#e85d4c",
  "#e8a838",
  "#2a9d8f",
  "#3d7ea6",
  "#c45c26",
  "#5b8c5a",
  "#d4a017",
  "#4a6fa5",
];

function playMatchSound() {
  const tryPlay = (i: number) => {
    if (i >= MATCH_SOUNDS.length) {
      try {
        const ctx = new AudioContext();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 880;
        g.gain.value = 0.12;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        o.stop(ctx.currentTime + 0.2);
      } catch {
        /* ignore */
      }
      return;
    }
    const audio = new Audio(MATCH_SOUNDS[i]);
    audio.play().catch(() => tryPlay(i + 1));
  };
  tryPlay(0);
}

type RoundState = {
  /** slotIndex → English word id */
  slots: Record<number, string>;
  checked: boolean;
};

function emptyRound(): RoundState {
  return { slots: {}, checked: false };
}

export type Hw31DragMatchResult = {
  roundScores: number[];
  totalCorrect: number;
  totalPairs: number;
  summary: string;
};

type Props = {
  onResultChange?: (result: Hw31DragMatchResult) => void;
};

export default function Hw31DragMatch({ onResultChange }: Props) {
  const [page, setPage] = useState(0);
  const [roundStates, setRoundStates] = useState<RoundState[]>(() =>
    hw31MatchRounds.map(() => emptyRound()),
  );
  const [bankOrder, setBankOrder] = useState<string[][]>(() =>
    hw31MatchRounds.map((r) => shuffle(r.pairs.map((p) => p.id))),
  );
  const [slotOrder, setSlotOrder] = useState<number[][]>(() =>
    hw31MatchRounds.map((r) =>
      shuffle(r.pairs.map((_, i) => i)),
    ),
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const round = hw31MatchRounds[page]!;
  const state = roundStates[page]!;
  const pairsById = useMemo(() => {
    const m = new Map<string, Hw31MatchPair>();
    for (const p of round.pairs) m.set(p.id, p);
    return m;
  }, [round]);

  const placedIds = new Set(Object.values(state.slots));
  const bankIds = (bankOrder[page] ?? []).filter((id) => !placedIds.has(id));

  const colorFor = (id: string) => {
    const idx = round.pairs.findIndex((p) => p.id === id);
    return PILL_COLORS[(idx >= 0 ? idx : 0) % PILL_COLORS.length]!;
  };

  useEffect(() => {
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!onResultChange) return;
    const scores = hw31MatchRounds.map((r, ri) => {
      const st = roundStates[ri]!;
      const order = slotOrder[ri] ?? r.pairs.map((_, i) => i);
      let ok = 0;
      order.forEach((pairIdx, row) => {
        if (st.slots[row] === r.pairs[pairIdx]!.id) ok += 1;
      });
      return ok;
    });
    const totalCorrect = scores.reduce((a, b) => a + b, 0);
    const totalPairs = hw31MatchRounds.reduce((n, r) => n + r.pairs.length, 0);
    const summary = [
      "HW31 · Drag match EN → UA",
      `Time: ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`,
      `Score: ${totalCorrect}/${totalPairs}`,
      "",
      ...hw31MatchRounds.map((r, ri) => {
        const st = roundStates[ri]!;
        const order = slotOrder[ri] ?? r.pairs.map((_, i) => i);
        const lines = order.map((pairIdx, row) => {
          const need = r.pairs[pairIdx]!;
          const gotId = st.slots[row];
          const got = gotId
            ? (r.pairs.find((p) => p.id === gotId)?.en ?? gotId)
            : "—";
          const mark = gotId === need.id ? "✓" : "✗";
          return `  ${need.ua} ← ${got} ${mark}`;
        });
        return `${ri + 1}. ${r.title} (${scores[ri]}/${r.pairs.length})\n${lines.join("\n")}`;
      }),
    ].join("\n");
    onResultChange({
      roundScores: scores,
      totalCorrect,
      totalPairs,
      summary,
    });
  }, [roundStates, slotOrder, seconds, onResultChange]);

  const placeInSlot = (row: number, wordId: string) => {
    setRoundStates((prev) => {
      const next = prev.map((s) => ({ ...s, slots: { ...s.slots } }));
      const cur = next[page]!;
      // remove word from any other slot
      for (const [k, v] of Object.entries(cur.slots)) {
        if (v === wordId) delete cur.slots[Number(k)];
      }
      // if slot had another word, it returns to bank automatically
      cur.slots[row] = wordId;
      cur.checked = false;
      next[page] = cur;
      return next;
    });
    setDraggingId(null);
    setSelectedId(null);
    playMatchSound();
  };

  const clearSlot = (row: number) => {
    setRoundStates((prev) => {
      const next = prev.map((s) => ({ ...s, slots: { ...s.slots } }));
      delete next[page]!.slots[row];
      next[page]!.checked = false;
      return next;
    });
  };

  const onCheck = () => {
    setRoundStates((prev) => {
      const next = [...prev];
      next[page] = { ...next[page]!, checked: true };
      return next;
    });
  };

  const onResetRound = () => {
    setRoundStates((prev) => {
      const next = [...prev];
      next[page] = emptyRound();
      return next;
    });
    setBankOrder((prev) => {
      const next = [...prev];
      next[page] = shuffle(round.pairs.map((p) => p.id));
      return next;
    });
    setSlotOrder((prev) => {
      const next = [...prev];
      next[page] = shuffle(round.pairs.map((_, i) => i));
      return next;
    });
    setSelectedId(null);
  };

  const order = slotOrder[page] ?? round.pairs.map((_, i) => i);
  const roundScore = order.filter(
    (pairIdx, row) => state.slots[row] === round.pairs[pairIdx]!.id,
  ).length;
  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="hw31-drag">
      <div className="hw31-drag-bar">
        <span className="hw31-drag-timer" aria-label="Timer">
          {mm}:{ss}
        </span>
        <div className="hw31-drag-pager">
          <button
            type="button"
            className="hw31-drag-page-btn"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span>
            {page + 1} з {hw31MatchRounds.length}
          </span>
          <button
            type="button"
            className="hw31-drag-page-btn"
            disabled={page >= hw31MatchRounds.length - 1}
            onClick={() =>
              setPage((p) => Math.min(hw31MatchRounds.length - 1, p + 1))
            }
            aria-label="Next page"
          >
            ›
          </button>
        </div>
        <span className="hw31-drag-round-title">{round.title}</span>
      </div>

      <p className="lesson22-section-desc" style={{ marginTop: "0.65rem" }}>
        Перетягни англійське слово в комірку біля українського (або тапни слово
        → тапни комірку).
      </p>

      <div className="hw31-drag-layout">
        <div className="hw31-drag-bank" aria-label="English words">
          {bankIds.map((id) => {
            const p = pairsById.get(id)!;
            return (
              <button
                key={id}
                type="button"
                className={`hw31-drag-pill${selectedId === id ? " is-selected" : ""}${draggingId === id ? " is-dragging" : ""}`}
                style={{ background: colorFor(id) }}
                draggable
                onDragStart={() => {
                  setDraggingId(id);
                  setSelectedId(id);
                }}
                onDragEnd={() => setDraggingId(null)}
                onClick={() =>
                  setSelectedId((cur) => (cur === id ? null : id))
                }
              >
                {p.en}
              </button>
            );
          })}
          {bankIds.length === 0 && (
            <span className="hw31-drag-bank-empty">Усі слова в комірках</span>
          )}
        </div>

        <div className="hw31-drag-rows" aria-label="Match rows">
          {order.map((pairIdx, row) => {
            const target = round.pairs[pairIdx]!;
            const placedId = state.slots[row];
            const placed = placedId ? pairsById.get(placedId) : null;
            const correct = placedId === target.id;
            let slotCls = "hw31-drag-slot";
            if (state.checked && placedId) {
              slotCls += correct ? " is-ok" : " is-err";
            } else if (placedId) {
              slotCls += " is-filled";
            }
            if (selectedId && !placedId) slotCls += " is-target";

            return (
              <div key={`${round.id}-${row}`} className="hw31-drag-row">
                <div
                  className={slotCls}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = draggingId ?? selectedId;
                    if (id) placeInSlot(row, id);
                  }}
                  onClick={() => {
                    if (placedId && !selectedId) {
                      clearSlot(row);
                      return;
                    }
                    if (selectedId) placeInSlot(row, selectedId);
                  }}
                >
                  {placed ? (
                    <span
                      className="hw31-drag-pill hw31-drag-pill--in-slot"
                      style={{ background: colorFor(placed.id) }}
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        setDraggingId(placed.id);
                        setSelectedId(placed.id);
                      }}
                      onDragEnd={() => setDraggingId(null)}
                    >
                      {placed.en}
                    </span>
                  ) : (
                    <span className="hw31-drag-slot-hint">↓</span>
                  )}
                </div>
                <div className="hw31-drag-ua">{target.ua}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
        <button type="button" className="l22-check-btn" onClick={onCheck}>
          Здати відповіді
        </button>
        {state.checked && (
          <span className="l22-score">
            {roundScore} / {round.pairs.length}
          </span>
        )}
        <button type="button" className="l25-cr-mini-btn" onClick={onResetRound}>
          Reset page
        </button>
      </div>
    </div>
  );
}
