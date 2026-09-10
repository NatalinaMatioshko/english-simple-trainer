import { Link } from "react-router-dom";
import { TeacherOnly } from "../components/auth/TeacherOnly";
import { hasLessonAnalysis } from "../data/lessonAnalyses";
import { lessonCovers, lessons } from "../data/lessons";
import "../styles/pages.css";

export default function LessonAnalyses() {
  const regularLessons = [...lessons.filter((lesson) => !lesson.practiceOnly)].reverse();

  return (
    <TeacherOnly>
      <div className="page-shell">
        <header className="page-hero panel">
          <p className="page-kicker">Вчитель</p>
          <h1>Аналізи уроків</h1>
          <p className="page-subtitle">
            Короткий підсумок після уроку: що вже вміє учень, де ще дірки, і що
            взяти на наступний раз. Поки готовий аналіз уроку 36.
          </p>
        </header>

        <section className="catalog-cubes" aria-label="Картки аналізів">
          {regularLessons.map((lesson) => {
            const cover = lessonCovers[lesson.id];
            const ready = hasLessonAnalysis(lesson.id);
            const label = `${lesson.id}. ${lesson.title}`;
            const body = (
              <>
                <span className="catalog-cube-media" aria-hidden="true">
                  {cover ? (
                    <img src={cover} alt="" />
                  ) : (
                    <span className="catalog-cube-fallback">{lesson.id}</span>
                  )}
                </span>
                <span className="catalog-cube-body">
                  <span className="catalog-cube-title">{label}</span>
                  <span className="catalog-cube-note">
                    {ready ? "Аналіз готовий" : "Ще немає"}
                  </span>
                </span>
              </>
            );

            if (ready) {
              return (
                <Link
                  key={lesson.id}
                  to={`/admin/analyses/${lesson.id}`}
                  className="catalog-cube is-current"
                >
                  {body}
                </Link>
              );
            }

            return (
              <span
                key={lesson.id}
                className="catalog-cube is-past is-empty"
                aria-disabled="true"
              >
                {body}
              </span>
            );
          })}
        </section>
      </div>
    </TeacherOnly>
  );
}
