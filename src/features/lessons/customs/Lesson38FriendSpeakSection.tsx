import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { IMG38 } from "../../../data/lesson38";
import "../../../styles/lesson22.css";
import "../../../styles/lesson26.css";
import "../../../styles/lesson38.css";

type PrepareItem = { id: string; label: string };
type SpeakPrompt = { id: string; label: string; text: string; model?: string };
type Photo = {
  file: string;
  emoji: string;
  caption: string;
  alt?: string;
  wide?: boolean;
};

type Props = {
  prepare?: PrepareItem[];
  photo?: Photo;
  prompts?: SpeakPrompt[];
};

export function Lesson38FriendSpeakSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const prepare = props.prepare ?? [];
  const prompts = props.prompts ?? [];
  const photo = props.photo;
  const [notes, setNotes] = useState(() => Array(prepare.length).fill(""));
  const [broken, setBroken] = useState(false);

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
      </div>
      <p className="l38-speak-banner l38-speak-banner--prep">Prepare</p>
      <p className="lw-section-desc">
        <strong>9</strong> You&apos;re going to talk about a friend. Think
        about:
      </p>
      <ul className="lw-goals-list">
        {prepare.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
      <div className="lw-drill-list">
        {prepare.map((item, i) => (
          <div key={item.id} className="lw-drill-row">
            <strong className="lw-drill-prompt">{item.label}</strong>
            <input
              className="lw-gap-input"
              value={notes[i] ?? ""}
              onChange={(e) => {
                const next = [...notes];
                next[i] = e.target.value;
                setNotes(next);
              }}
              aria-label={item.label}
            />
          </div>
        ))}
      </div>
      <p className="l38-speak-banner">Speak</p>
      {photo ? (
        <figure
          className={`l38-photo-card${photo.wide ? " l38-photo-card--wide" : ""}`}
        >
          {broken ? (
            <div className="l38-photo-face">
              <span aria-hidden="true">{photo.emoji}</span>
              <strong>{photo.caption}</strong>
            </div>
          ) : (
            <img
              src={IMG38(photo.file)}
              alt={photo.alt ?? photo.caption}
              onError={() => setBroken(true)}
            />
          )}
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ) : null}
      {prompts.map((p) => (
        <div key={p.id} style={{ marginTop: "1rem" }}>
          <p className="lw-section-desc">
            <strong>{p.label}</strong> {p.text}
          </p>
          {p.model ? (
            <blockquote className="lw-note">
              <p>
                <em>{p.model}</em>
              </p>
            </blockquote>
          ) : null}
        </div>
      ))}
    </section>
  );
}
