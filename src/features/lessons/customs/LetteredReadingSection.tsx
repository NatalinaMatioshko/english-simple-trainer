import type { CustomSection } from "../../../types/lesson";
import "./letteredReading.css";

type Paragraph = {
  /** Letter shown in the side strip (A, B, …) */
  id: string;
  /** Bold opening words, e.g. a date */
  lead?: string;
  text: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  paragraphs?: Paragraph[];
};

/** Reading text as a card: title band, subtitle, lettered paragraphs. */
export function LetteredReadingSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const paragraphs = props.paragraphs ?? [];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <article className="lr-card">
        {props.heading ? <h3 className="lr-heading">{props.heading}</h3> : null}
        {props.subheading ? (
          <p className="lr-subheading">{props.subheading}</p>
        ) : null}
        <ol className="lr-list">
          {paragraphs.map((p) => (
            <li key={p.id} className="lr-row">
              <span className="lr-letter" aria-hidden="true">
                {p.id}
              </span>
              <p className="lr-text">
                <span className="lw-visually-hidden">{p.id}. </span>
                {p.lead ? <strong>{p.lead} </strong> : null}
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
