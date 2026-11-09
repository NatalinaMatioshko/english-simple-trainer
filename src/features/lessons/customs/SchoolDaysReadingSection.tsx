import type { CustomSection } from "../../../types/lesson";
import "./schoolDaysReading.css";

type Person = {
  id: string;
  name: string;
  text: string;
  photo: string;
  alt: string;
};

type Props = {
  bannerTitle?: string;
  people?: Person[];
};

/** 8A Ex.5 · School days reading — banner + name / text / portrait rows. */
export function SchoolDaysReadingSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const people = props.people ?? [];
  const bannerTitle = props.bannerTitle ?? "School days";

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <article className="sdr-card" aria-label={bannerTitle}>
        <h3 className="sdr-banner">{bannerTitle}</h3>
        <ul className="sdr-list">
          {people.map((person) => (
            <li key={person.id} className="sdr-row">
              <div className="sdr-body">
                <p className="sdr-name">{person.name}</p>
                <p className="sdr-text">{person.text}</p>
              </div>
              <figure className="sdr-photo">
                <img src={person.photo} alt={person.alt} loading="lazy" decoding="async" />
              </figure>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
