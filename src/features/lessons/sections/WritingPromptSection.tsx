import { useState } from "react";
import type { WritingPromptSection as WritingType } from "../../../types/lesson";

export function WritingPromptSection({ section }: { section: WritingType }) {
  const [text, setText] = useState("");
  const min = section.minChars ?? 10;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <p className="lw-section-desc">{section.prompt}</p>
      <textarea
        className="lw-textarea"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={section.placeholder ?? "Write here…"}
        aria-label={section.title}
      />
      <p className="lw-muted">
        {text.trim().length >= min
          ? "Ready to share with your teacher."
          : `Write at least ${min} characters.`}
      </p>
    </section>
  );
}
