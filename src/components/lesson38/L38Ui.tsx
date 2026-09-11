import { useState } from "react";
import { IMG38 } from "../../data/lesson38";

export function ImgOrFace({
  file,
  emoji,
  label,
}: {
  file: string;
  emoji: string;
  label: string;
}) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <span className="l38-obj-face" aria-hidden="true">
        {emoji}
      </span>
    );
  }
  return (
    <img src={IMG38(file)} alt={label} onError={() => setBroken(true)} />
  );
}

export function PhotoCard({
  file,
  emoji,
  caption,
  note,
  wide,
}: {
  file: string;
  emoji: string;
  caption: string;
  note?: string;
  wide?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className={`l38-photo-card${wide ? " l38-photo-card--wide" : ""}`}>
      {broken ? (
        <div className="l38-photo-face">
          <span aria-hidden="true">{emoji}</span>
          <strong>{caption}</strong>
          {note && <small>{note}</small>}
        </div>
      ) : (
        <img src={IMG38(file)} alt={caption} onError={() => setBroken(true)} />
      )}
      <figcaption>
        {caption}
        {note ? ` · ${note}` : ""}
      </figcaption>
    </figure>
  );
}

export function CheckBar({
  checked,
  score,
  total,
  onCheck,
  onReset,
}: {
  checked: boolean;
  score: number;
  total: number;
  onCheck: () => void;
  onReset?: () => void;
}) {
  return (
    <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
      <button type="button" className="l22-check-btn" onClick={onCheck}>
        Check
      </button>
      {checked && (
        <span>
          {score} / {total}
        </span>
      )}
      {onReset && (
        <button type="button" className="l25-cr-mini-btn" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
