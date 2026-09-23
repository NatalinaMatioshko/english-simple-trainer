import type { SpeakingPromptSection as SpeakingType } from "../../../types/lesson";

export function SpeakingPromptSection({ section }: { section: SpeakingType }) {
  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="lw-prompt-grid">
        {section.prompts.map((prompt, i) => (
          <div
            key={`${section.id}-${i}`}
            className="lw-prompt-card lw-prompt-card--task"
          >
            {prompt.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            {section.models?.[i] ? (
              <span className="lw-muted">{section.models[i]}</span>
            ) : null}
          </div>
        ))}
      </div>
      {section.note ? (
        <blockquote className="lw-note">
          <p>{section.note}</p>
        </blockquote>
      ) : null}
    </section>
  );
}
