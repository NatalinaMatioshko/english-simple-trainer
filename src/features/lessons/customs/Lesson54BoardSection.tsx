import type { CustomSection } from "../../../types/lesson";

type Props = {
  src?: string;
  alt?: string;
};

/** L54 information board: one image at full width, readable on a phone. */
export function Lesson54BoardSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <img
        src={props.src}
        alt={props.alt ?? ""}
        style={{ display: "block", width: "100%", maxWidth: "42rem" }}
      />
    </section>
  );
}
