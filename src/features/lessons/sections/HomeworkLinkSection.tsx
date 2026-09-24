import { Link } from "react-router-dom";
import type { HomeworkLinkSection as HwType } from "../../../types/lesson";

export function HomeworkLinkSection({ section }: { section: HwType }) {
  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      {section.summary ? (
        <p className="lw-section-desc">{section.summary}</p>
      ) : null}
      <div className="lw-actions">
        <Link className="lw-check-btn" to={section.path}>
          {section.label}
        </Link>
      </div>
    </section>
  );
}
