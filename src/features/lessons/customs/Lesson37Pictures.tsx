import Lesson31Figure from "../../../components/lesson31/Lesson31Figure";
import type { CustomSection } from "../../../types/lesson";

const IMG37 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson37/${file}`;

/** Registered as componentKey: "lesson37-pictures" */
export function Lesson37Pictures({ section }: { section: CustomSection }) {
  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="lw-figure-row">
        <Lesson31Figure
          src={IMG37("speaking-card.png")}
          alt="Speaking card: a family cooking in the kitchen. Questions: Where are the people? What are they doing? What food can you see?"
          caption="Speaking card · tap to zoom"
          variant="worksheet"
        />
        <Lesson31Figure
          src={IMG37("present-continuous.jpg")}
          alt="Present continuous worksheet: ten pictures — play football, sing, read, jump, make a cake, play guitar, cook, ride a bike, fly, make a snowman"
          caption="Present continuous · tap to zoom"
          variant="worksheet"
        />
      </div>
      {section.note ? (
        <blockquote className="lw-note">
          <p>{section.note}</p>
        </blockquote>
      ) : null}
    </section>
  );
}
