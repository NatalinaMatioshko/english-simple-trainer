import type { CustomSection } from "../../../types/lesson";
import { speakEnglish } from "../../../utils/speech";
import "./monthCalendar.css";

type Props = {
  /** Month names in order (12, shown as two rows of six) */
  months?: string[];
};

/** Calendar on a screen: tap a month to hear it. */
export function MonthCalendarSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const months = props.months ?? [];
  const rows = [months.slice(0, 6), months.slice(6, 12)];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      <div className="mc-screen">
        <div className="mc-bar" aria-hidden="true" />
        <div className="mc-band" aria-hidden="true" />
        {rows.map((row, r) => (
          <div key={r} className="mc-row">
            {row.map((month) => (
              <div key={month} className="mc-month">
                <button
                  type="button"
                  className="mc-label"
                  onClick={() => speakEnglish(month)}
                  aria-label={`${month} — listen`}
                >
                  {month}
                </button>
                <div className="mc-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
