import type { CustomSection } from "../../../types/lesson";
import { useAuth } from "../../../context/AuthContext";
import "./teacherScript.css";

type ScriptBlock = {
  time?: string;
  title: string;
  /** What you do (setup, write, listen…) */
  do?: string[];
  /** Exact lines / questions to say */
  say?: string[];
  /** What to expect from the student / target answers */
  expect?: string[];
  /** Extra notes (fallback / misc) */
  lines?: string[];
};

type Props = {
  heading?: string;
  goal?: string;
  speakingTopics?: string[];
  outcome?: string[];
  focus?: string[];
  avoid?: string[];
  blocks?: ScriptBlock[];
  tips?: string[];
  homework?: string[];
};

function LineList({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={className}>
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

/** Teacher-only lesson run sheet. Hidden for students. */
export function TeacherScriptSection({ section }: { section: CustomSection }) {
  const { isTeacher, loading } = useAuth();
  const props = (section.props ?? {}) as Props;

  if (loading || !isTeacher) return null;

  const heading = props.heading ?? section.title;
  const goal = props.goal;
  const speakingTopics = props.speakingTopics ?? [];
  const outcome = props.outcome ?? [];
  const focus = props.focus ?? [];
  const avoid = props.avoid ?? [];
  const blocks = props.blocks ?? [];
  const tips = props.tips ?? [];
  const homework = props.homework ?? [];

  return (
    <section
      id={section.id}
      className="lw-block panel l48-teacher-script"
      data-teacher-only="true"
    >
      <div className="lw-section-head">
        <p className="page-kicker">
          {section.kicker ?? "Тільки для вчителя"}
        </p>
        <h2>{heading}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>

      {goal ? (
        <p className="l48-teacher-goal">
          <strong>Ціль уроку:</strong> {goal}
        </p>
      ) : null}

      {speakingTopics.length > 0 ? (
        <div className="l48-teacher-meta">
          <p className="l48-teacher-subhead">Speaking сьогодні</p>
          <LineList items={speakingTopics} />
        </div>
      ) : null}

      {outcome.length > 0 ? (
        <div className="l48-teacher-meta">
          <p className="l48-teacher-subhead">Наприкінці Петро вміє</p>
          <LineList items={outcome} />
        </div>
      ) : null}

      {focus.length > 0 ? (
        <div className="l48-teacher-meta">
          <p className="l48-teacher-subhead">Мовний фокус</p>
          <LineList items={focus} />
        </div>
      ) : null}

      {avoid.length > 0 ? (
        <div className="l48-teacher-meta l48-teacher-avoid">
          <p className="l48-teacher-subhead">Не вводити сьогодні</p>
          <LineList items={avoid} />
        </div>
      ) : null}

      <ol className="l48-teacher-blocks">
        {blocks.map((block) => {
          const doItems = block.do ?? [];
          const sayItems = block.say ?? [];
          const expectItems = block.expect ?? [];
          const extra = block.lines ?? [];
          return (
            <li key={`${block.time ?? ""}-${block.title}`}>
              <div className="l48-teacher-block-head">
                {block.time ? (
                  <span className="l48-teacher-time">{block.time}</span>
                ) : null}
                <strong>{block.title}</strong>
              </div>

              {doItems.length > 0 ? (
                <div className="l48-teacher-part">
                  <p className="l48-teacher-part-label">Ти робиш</p>
                  <LineList items={doItems} />
                </div>
              ) : null}

              {sayItems.length > 0 ? (
                <div className="l48-teacher-part">
                  <p className="l48-teacher-part-label">Ти кажеш</p>
                  <LineList items={sayItems} className="l48-teacher-say" />
                </div>
              ) : null}

              {expectItems.length > 0 ? (
                <div className="l48-teacher-part">
                  <p className="l48-teacher-part-label">Він / очікуй</p>
                  <LineList items={expectItems} />
                </div>
              ) : null}

              {extra.length > 0 ? (
                <div className="l48-teacher-part">
                  {doItems.length + sayItems.length + expectItems.length > 0 ? (
                    <p className="l48-teacher-part-label">Нотатка</p>
                  ) : null}
                  <LineList items={extra} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {tips.length > 0 ? (
        <div className="l48-teacher-tips">
          <p className="l48-teacher-subhead">Якщо…</p>
          <LineList items={tips} />
        </div>
      ) : null}

      {homework.length > 0 ? (
        <div className="l48-teacher-hw">
          <p className="l48-teacher-subhead">ДЗ (скажи вголос)</p>
          <LineList items={homework} />
        </div>
      ) : null}
    </section>
  );
}
