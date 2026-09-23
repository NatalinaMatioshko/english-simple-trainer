import type { TextSection as TextSectionType } from "../../../types/lesson";

export function TextSection({ section }: { section: TextSectionType }) {
  const contrastPair =
    section.bullets?.length === 2 && section.id.includes("contrast")
      ? [
          { label: "every day", text: section.bullets[0] },
          { label: "now", text: section.bullets[1] },
        ]
      : null;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      {section.body ? <p className="lw-section-desc">{section.body}</p> : null}
      {contrastPair ? (
        <div className="lw-contrast-row">
          {contrastPair.map((card) => (
            <article key={card.label} className="lw-conf-card">
              <div className="lw-conf-header">{card.label}</div>
              <p className="lw-conf-body">{card.text}</p>
            </article>
          ))}
        </div>
      ) : section.bullets && section.bullets.length > 0 ? (
        <ul className="lw-goals-list">
          {section.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
      {section.note ? (
        <blockquote className="lw-note">
          <p>
            <strong>Note.</strong> {section.note}
          </p>
        </blockquote>
      ) : null}
    </section>
  );
}
