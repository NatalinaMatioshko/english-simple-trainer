import { useId, useRef, useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import "../../../styles/lesson25.css";

type Props = {
  src?: string;
  trackLabel?: string;
  exercise?: string;
  title?: string;
  ariaLabel?: string;
  transcriptLines?: string[];
};

/**
 * Reusable native <audio> block (public/Storage URL — never Firestore binary).
 * Browser controls provide play/pause; no autoplay.
 */
export function NativeAudioSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const src = props.src ?? "";
  const trackLabel = props.trackLabel ?? "Audio";
  const exercise = props.exercise ?? "";
  const title = props.title ?? section.title;
  const ariaLabel =
    props.ariaLabel ?? `${trackLabel}: ${title || section.title}`;
  const transcriptLines = props.transcriptLines ?? [];
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const labelId = useId();

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="l25-audio-item">
        <div className="l25-audio-meta" id={labelId}>
          <span className="l25-audio-num">{trackLabel}</span>
          <div className="l25-audio-info">
            {exercise ? (
              <span className="l25-audio-ex">{exercise}</span>
            ) : null}
            <span className="l25-audio-title">{title}</span>
          </div>
        </div>
        {src ? (
          <audio
            ref={audioRef}
            controls
            className="l25-audio-ctrl"
            src={src}
            preload="none"
            aria-labelledby={labelId}
            aria-label={ariaLabel}
          />
        ) : (
          <p className="lw-section-desc" role="status">
            Audio file unavailable. Ask your teacher for track {trackLabel}.
          </p>
        )}
        {transcriptLines.length > 0 ? (
          <>
            <button
              type="button"
              className="l25-cr-mini-btn"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Hide transcript" : "Transcript"}
            </button>
            {open ? (
              <div className="l25-details-body">
                <ol>
                  {transcriptLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
