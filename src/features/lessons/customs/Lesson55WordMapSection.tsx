import type { CustomSection } from "../../../types/lesson";
import {
  VerbPhraseWordMap,
  type WordMapHub,
} from "../../../components/lesson55/VerbPhraseWordMap";
import { wordMap2aHubs } from "../../../content/lessons/lesson-55/activities";

type Props = {
  hubs?: readonly WordMapHub[];
};

/** 8A Ex.2a — textbook-style verb word map (display only). */
export function Lesson55WordMapSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const hubs = props.hubs ?? wordMap2aHubs;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <VerbPhraseWordMap hubs={hubs} />
    </section>
  );
}
