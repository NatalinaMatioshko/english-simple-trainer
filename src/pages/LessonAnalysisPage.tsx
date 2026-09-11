import { Link, useParams } from "react-router-dom";
import { TeacherOnly } from "../components/auth/TeacherOnly";
import { getLessonAnalysis } from "../data/lessonAnalyses";
import { lessons } from "../data/lessons";
import "../styles/pages.css";
import "../styles/lessonAnalysis.css";

export default function LessonAnalysisPage() {
  const { id = "" } = useParams();
  const analysis = getLessonAnalysis(id);
  const lesson = lessons.find((item) => item.id === id);

  return (
    <TeacherOnly>
      {!analysis ? (
        <div className="page-shell">
          <header className="page-hero panel">
            <p className="page-kicker">Вчитель</p>
            <h1>
              {lesson
                ? `Урок ${lesson.id}. ${lesson.title}`
                : `Урок ${id || "?"}`}
            </h1>
            <p className="page-subtitle">Аналіз цього уроку ще не додано.</p>
          </header>
          <p>
            <Link className="back-link" to="/admin/analyses">
              ← До аналізів
            </Link>
          </p>
        </div>
      ) : (
        <div className="page-shell la">
          <header className="page-hero panel">
            <p className="page-kicker">Аналіз уроку {analysis.id}</p>
            <h1>{analysis.title}</h1>
            <p className="page-subtitle">{analysis.lead}</p>
            <div className="la-hero-actions">
              <Link className="action-btn secondary" to="/admin/analyses">
                Усі аналізи
              </Link>
              <Link className="action-btn secondary" to={analysis.lessonPath}>
                Відкрити урок
              </Link>
            </div>
          </header>

          <section className="panel la-block">
            <p className="page-kicker">Головний результат</p>
            <h2>Від окремих слів до зв’язної англійської</h2>
            <ul>
              {analysis.result.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="panel la-block">
            <p className="page-kicker">Успіхи</p>
            <h2>Що вже вміє</h2>
            <div className="la-cards">
              {analysis.strengths.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel la-block">
            <p className="page-kicker">Що ще складно</p>
            <h2>Не нові правила — автоматизація</h2>
            <ol className="la-gaps">
              {analysis.gaps.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.bullets ? (
                    <ul>
                      {item.bullets.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : null}
                  {item.pairs ? (
                    <table className="la-table">
                      {item.pairHead ? (
                        <thead>
                          <tr>
                            <th>{item.pairHead.left}</th>
                            <th>{item.pairHead.right}</th>
                          </tr>
                        </thead>
                      ) : null}
                      <tbody>
                        {item.pairs.map((row) => (
                          <tr key={row.left}>
                            <td>{row.left}</td>
                            <td>{row.right}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="panel la-block">
            <p className="page-kicker">Уточнення</p>
            <h2>Корекції до пояснень на уроці</h2>
            <div className="la-cards">
              {analysis.corrections.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="la-split">
            <article className="panel la-block">
              <p className="page-kicker">Ти як викладач</p>
              <h2>Що спрацювало</h2>
              <ul>
                {analysis.teacherGood.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="panel la-block">
              <p className="page-kicker">Ти як викладач</p>
              <h2>Що звузити</h2>
              <ul>
                {analysis.teacherImprove.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="panel la-block">
            <p className="page-kicker">Наступний урок</p>
            <h2>{analysis.nextGoal}</h2>
            <p className="la-muted">Граматичний мінімум:</p>
            <ul className="la-inline">
              {analysis.nextGrammar.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ol className="la-flow">
              {analysis.nextFlow.map((step) => (
                <li key={step.title}>
                  <strong>
                    {step.title} · {step.time}
                  </strong>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
            <p className="la-muted">Домашнє</p>
            <ul>
              {analysis.homework.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="panel la-block">
            <p className="page-kicker">Підсумок</p>
            <h2>Вужчий фокус, та сама сила</h2>
            <p>{analysis.takeaway}</p>
          </section>
        </div>
      )}
    </TeacherOnly>
  );
}
