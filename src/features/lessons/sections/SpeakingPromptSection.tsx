import { useState } from "react";
import type { SpeakingPromptSection as SpeakingType } from "../../../types/lesson";

export function SpeakingPromptSection({ section }: { section: SpeakingType }) {
  const hideModels = Boolean(section.hideModels && section.models?.length);
  const [open, setOpen] = useState<Record<number, boolean>>({});

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
        {section.prompts.map((prompt, i) => {
          const model = section.models?.[i];
          const revealed = !hideModels || Boolean(open[i]);
          return (
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
              {model && hideModels ? (
                <>
                  <button
                    type="button"
                    className="l25-cr-mini-btn"
                    style={{ marginTop: "0.55rem" }}
                    onClick={() =>
                      setOpen((prev) => ({ ...prev, [i]: !prev[i] }))
                    }
                    aria-expanded={revealed}
                  >
                    {revealed ? "Hide · Підказка" : "Підказка"}
                  </button>
                  {revealed ? (
                    <span className="lw-muted" style={{ display: "block" }}>
                      {model}
                    </span>
                  ) : null}
                </>
              ) : model ? (
                <span className="lw-muted">{model}</span>
              ) : null}
            </div>
          );
        })}
      </div>
      {section.note ? (
        <blockquote className="lw-note">
          <p>{section.note}</p>
        </blockquote>
      ) : null}
    </section>
  );
}
