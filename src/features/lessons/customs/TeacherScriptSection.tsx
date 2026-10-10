import type { CustomSection } from "../../../types/lesson";
import { useAuth } from "../../../context/AuthContext";
import "./teacherScript.css";

type ScriptBlock = {
  time?: string;
  title: string;
  lines: string[];
};

type Props = {
  heading?: string;
  goal?: string;
  blocks?: ScriptBlock[];
  tips?: string[];
  homework?: string[];
};

/** Teacher-only lesson run sheet. Hidden for students. */
export function TeacherScriptSection({ section }: { section: CustomSection }) {
  const { isTeacher, loading } = useAuth();
  const props = (section.props ?? {}) as Props;

  if (loading || !isTeacher) return null;

  const heading = props.heading ?? section.title;
  const goal = props.goal;
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

      <ol className="l48-teacher-blocks">
        {blocks.map((block) => (
          <li key={`${block.time ?? ""}-${block.title}`}>
            <div className="l48-teacher-block-head">
              {block.time ? (
                <span className="l48-teacher-time">{block.time}</span>
              ) : null}
              <strong>{block.title}</strong>
            </div>
            <ul>
              {block.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {tips.length > 0 ? (
        <div className="l48-teacher-tips">
          <p className="l48-teacher-subhead">Якщо…</p>
          <ul>
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {homework.length > 0 ? (
        <div className="l48-teacher-hw">
          <p className="l48-teacher-subhead">ДЗ (скажи вголос)</p>
          <ul>
            {homework.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
