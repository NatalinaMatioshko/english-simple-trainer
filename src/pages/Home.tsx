import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { vocabCategories } from "../data/vocab";
import { subscribeStudentVocab } from "../services/studentVocab";
import { homeworkByLesson, homeworkHref } from "../data/homeworkList";
import { lessons } from "../data/lessons";
import "../styles/pages.css";
import "../styles/dashboard.css";

function courseVocabCount(): number {
  return vocabCategories.reduce(
    (total, category) =>
      total + category.groups.reduce((sum, group) => sum + group.items.length, 0),
    0,
  );
}

export default function Home() {
  const { user, loading, displayName, isTeacher } = useAuth();
  const [ownWordCount, setOwnWordCount] = useState<number | null>(null);
  const latestLesson = useMemo(
    () => [...lessons].reverse().find((lesson) => !lesson.practiceOnly),
    [],
  );
  const latestHomework = homeworkByLesson[0];
  const lessonCount = lessons.filter((lesson) => !lesson.practiceOnly).length;
  const dictionarySize = useMemo(() => courseVocabCount(), []);

  useEffect(() => {
    if (!user || loading) return;
    return subscribeStudentVocab(user, isTeacher, (words) => {
      setOwnWordCount(words.length);
    });
  }, [user, loading, isTeacher]);

  return (
    <div className="page-shell dash">
      <section className="dash-welcome">
        <p className="dash-kicker">Навчальна платформа</p>
        <h1>
          {user ? `Привіт, ${displayName}` : "Кабінет учня"}
        </h1>
        <p>
          {user
            ? "Продовжуй урок, повтори слова або відкрий домашнє — все в одному місці."
            : "Увійди, щоб зберігати свої слова на платформі. Уроки й тренажер доступні і без входу."}
        </p>
      </section>

      <section className="dash-continue panel" aria-labelledby="dash-continue-title">
        <p className="dash-card-kicker">Продовжити навчання</p>
        {latestLesson ? (
          <>
            <h2 id="dash-continue-title">{latestLesson.title}</h2>
            <p className="dash-card-meta">
              Урок {latestLesson.id} · {latestLesson.topic}
            </p>
            <p className="dash-card-copy">{latestLesson.description}</p>
            <div className="dash-card-actions">
              <Link className="action-btn primary" to={latestLesson.lessonPath}>
                Відкрити урок
              </Link>
              {latestLesson.homeworkPath ? (
                <Link className="action-btn secondary" to={latestLesson.homeworkPath}>
                  Домашнє
                </Link>
              ) : null}
            </div>
          </>
        ) : (
          <p className="dash-empty">Уроків поки немає.</p>
        )}
      </section>

      <section className="dash-grid">
        <article className="dash-card panel">
          <p className="dash-card-kicker">Домашнє</p>
          <h2>Остання домашня в курсі</h2>
          {latestHomework ? (
            <>
              <p className="dash-card-meta">
                Lesson {latestHomework.id} · {latestHomework.title}
              </p>
              <p className="dash-card-copy">
                Це актуальне домашнє з програми, не персональний статус здачі.
              </p>
              <Link className="action-btn primary" to={homeworkHref(latestHomework)}>
                Відкрити HW {latestHomework.id}
              </Link>
            </>
          ) : (
            <p className="dash-empty">Домашніх завдань поки немає.</p>
          )}
        </article>

        <article className="dash-card panel">
          <p className="dash-card-kicker">Словник</p>
          <h2>Слова для повторення</h2>
          {user ? (
            ownWordCount === null ? (
              <p className="dash-card-copy">Завантаження слів…</p>
            ) : ownWordCount > 0 ? (
              <p className="dash-card-copy">
                На платформі збережено {ownWordCount}{" "}
                {ownWordCount === 1 ? "слово" : "слів"}.
              </p>
            ) : (
              <p className="dash-empty">
                Ще немає збережених слів. Додай перше у вкладці «Мої слова».
              </p>
            )
          ) : (
            <p className="dash-empty">
              Увійди, щоб бачити свої слова на платформі. Без входу доступний словник
              курсу ({dictionarySize} одиниць).
            </p>
          )}
          <div className="dash-card-actions">
            <Link className="action-btn primary" to="/vocab">
              Повторити слова
            </Link>
            {!user ? (
              <Link className="action-btn secondary" to="/login">
                Увійти
              </Link>
            ) : null}
          </div>
        </article>

        <article className="dash-card panel">
          <p className="dash-card-kicker">Прогрес</p>
          <h2>Уроки в курсі</h2>
          <p className="dash-card-copy">
            Зараз у програмі {lessonCount} уроків. Відміток «пройдено» ще немає —
            тому тут немає вигаданого відсотка.
          </p>
          <Link className="action-btn secondary" to="/lessons">
            Усі уроки
          </Link>
        </article>
      </section>

      <section className="dash-actions" aria-label="Швидкі дії">
        <Link className="dash-action" to="/lessons">
          Уроки
        </Link>
        <Link className="dash-action" to="/trainer">
          Тренажер
        </Link>
        <Link className="dash-action" to="/vocab">
          Словник
        </Link>
        <Link className="dash-action" to="/homework">
          Домашнє
        </Link>
        <Link className="dash-action" to="/">
          Roadmap
        </Link>
      </section>

      {isTeacher ? (
        <p className="dash-teacher">
          <Link to="/admin/submissions">Роботи учнів</Link>
        </p>
      ) : null}
    </div>
  );
}
