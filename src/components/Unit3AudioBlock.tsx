import { useState, type ReactNode } from "react";

const SOUND_U3 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_3/RM_A1_SB_U3_R${r}.mp3`;

export default function Unit3AudioBlock({
  r,
  exercise,
  title,
  transcript,
}: {
  r: number;
  exercise: string;
  title: string;
  transcript?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="l25-audio-item" style={{ marginTop: "0.85rem" }}>
      <div className="l25-audio-meta">
        <span className="l25-audio-num">R{r}</span>
        <div className="l25-audio-info">
          <span className="l25-audio-ex">{exercise}</span>
          <span className="l25-audio-title">{title}</span>
        </div>
      </div>
      <audio
        controls
        className="l25-audio-ctrl"
        src={SOUND_U3(r)}
        preload="none"
      />
      {transcript && (
        <>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide transcript" : "Transcript"}
          </button>
          {open && <div className="l25-details-body">{transcript}</div>}
        </>
      )}
    </div>
  );
}
