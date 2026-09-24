import type { CustomSection } from "../../../types/lesson";

type ContrastCard = { label: string; example: string; gloss?: string };
type RuleCard = { title: string; body: string; example?: string };

type Props = {
  lead?: string;
  contrast?: ContrastCard[];
  rules?: RuleCard[];
  note?: string;
};

/** Visual tense preview: lead + contrast cards + rule cards (not a wall of text). */
export function TensePreviewSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const lead = props.lead ?? "";
  const contrast = props.contrast ?? [];
  const rules = props.rules ?? [];
  const note = props.note ?? section.note;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      {lead ? (
        <div className="lw-preview-lead" role="note">
          <p>{lead}</p>
        </div>
      ) : null}

      {contrast.length > 0 ? (
        <div className="lw-contrast-row lw-preview-contrast">
          {contrast.map((card) => (
            <article key={card.label} className="lw-conf-card">
              <div className="lw-conf-header">{card.label}</div>
              <p className="lw-conf-body">
                <strong>{card.example}</strong>
              </p>
              {card.gloss ? (
                <p className="lw-preview-gloss">{card.gloss}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {rules.length > 0 ? (
        <div className="lw-preview-rules">
          {rules.map((rule) => (
            <article key={rule.title} className="lw-preview-rule">
              <h3 className="lw-preview-rule-title">{rule.title}</h3>
              <p className="lw-preview-rule-body">{rule.body}</p>
              {rule.example ? (
                <p className="lw-preview-rule-ex">
                  <em>{rule.example}</em>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {note ? (
        <blockquote className="lw-note">
          <p>
            <strong>Note.</strong> {note}
          </p>
        </blockquote>
      ) : null}
    </section>
  );
}
