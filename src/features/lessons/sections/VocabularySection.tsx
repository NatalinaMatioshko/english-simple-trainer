import type { VocabularySection as VocabularySectionType } from "../../../types/lesson";

export function VocabularySection({
  section,
}: {
  section: VocabularySectionType;
}) {
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
        {section.items.map((item) => (
          <div key={item.id} className="lw-prompt-card">
            <strong>{item.term}</strong>
            {item.gloss ? <> → {item.gloss}</> : null}
            {item.example ? (
              <>
                <br />
                <span className="lw-muted">{item.example}</span>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
