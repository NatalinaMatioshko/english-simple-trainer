import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { vocabCategories } from "../data/vocab";
import { subscribeStudentVocab } from "../services/studentVocab";
import {
  fetchTeacherInbox,
  type TeacherInboxSummary,
} from "../services/teacherInbox";
import { homeworkByLesson, homeworkHref } from "../data/homeworkList";
import { lessons } from "../data/lessons";
import type { CustomVocabWord } from "../utils/customVocab";
import "../styles/pages.css";
import "../styles/dashboard.css";

function courseVocabCount(): number {
  return vocabCategories.reduce(
    (total, category) =>
      total + category.groups.reduce((sum, group) => sum + group.items.length, 0),
    0,
  );
}

function vocabByStudent(words: CustomVocabWord[]): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const word of words) {
    const name = word.ownerName?.trim() || "Учень";
    map.set(name, (map.get(name) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "uk"));
}

function TeacherCabinet({
  displayName,
  latestLesson,
  latestHomework,
}: {
  displayName: string;
  latestLesson: (typeof lessons)[number] | undefined;
  latestHomework: (typeof homeworkByLesson)[number] | undefined;
}) {
  const { user, loading, isTeacher } = useAuth();
  const [words, setWords] = useState<CustomVocabWord[] | null>(null);
  const [inbox, setInbox] = useState<TeacherInboxSummary | null>(null);
  const [inboxError, setInboxError] = useState("");
  const [inboxLoading, setInboxLoading] = useState(true);

  const studentGroups = useMemo(
    () => (words ? vocabByStudent(words) : []),
    [words],
  );

  useEffect(() => {
    if (!user || loading) return;
    return subscribeStudentVocab(user, isTeacher, (next) => {
      setWords(next);
    });
  }, [user, loading, isTeacher]);

  useEffect(() => {
    if (!user || loading) return;
    let cancelled = false;
    setInboxLoading(true);
    setInboxError("");
    void fetchTeacherInbox()
      .then((summary) => {
        if (cancelled) return;
        setInbox(summary);
        if (summary.homeworkDenied && summary.writingDenied) {
          setInboxError(
            "Не вдалося прочитати роботи. Перевір Firestore Rules для вчителя.",
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInboxError("Не вдалося завантажити роботи учнів.");
        }
      })
      .finally(() => {
        if (!cancelled) setInboxLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  const newItems = inbox?.items.filter((item) => !item.reviewed).slice(0, 4) ?? [];

  return (
    <div className="page-shell dash">
      <section className="dash-welcome">
        <p className="dash-kicker">Кабінет вчителя</p>
        <h1>Привіт, {displayName}</h1>
        <p>
          Тут нові роботи учня, його слова і поточний урок. Уроки лишаються тими
          самими — цей екран лише для тебе після входу.
        </p>
      </section>

      <section className="dash-continue panel" aria-labelledby="dash-continue-title">
        <p className="dash-card-kicker">Поточний урок</p>
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
              {"homeworkPath" in latestLesson && latestLesson.homeworkPath ? (
                <Link className="action-btn secondary" to={latestLesson.homeworkPath}>
                  Домашнє до уроку
                </Link>
              ) : null}
              <Link className="action-btn secondary" to="/admin/analyses">
                Аналізи уроків
              </Link>
            </div>
          </>
        ) : (
          <p className="dash-empty">Уроків поки немає.</p>
        )}
      </section>

      <section className="dash-grid">
        <article className="dash-card panel">
          <p className="dash-card-kicker">Роботи учнів</p>
          <h2>
            {inboxLoading
              ? "Завантаження…"
              : inbox
                ? inbox.newCount > 0
                  ? `${inbox.newCount} нових`
                  : "Усі переглянуті"
                : "Роботи"}
          </h2>
          {inboxError ? (
            <p className="dash-empty">{inboxError}</p>
          ) : inboxLoading ? (
            <p className="dash-card-copy">Читаю домашні й writing…</p>
          ) : newItems.length > 0 ? (
            <ul className="dash-inbox">
              {newItems.map((item) => (
                <li key={item.key}>
                  <span>{item.title}</span>
                  {item.meta ? (
                    <small>{item.meta}</small>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">
              Нових здач немає. Старі роботи лишаються в архіві.
            </p>
          )}
          <div className="dash-card-actions">
            <Link className="action-btn primary" to="/admin/submissions">
              Відкрити роботи
            </Link>
          </div>
        </article>

        <article className="dash-card panel">
          <p className="dash-card-kicker">Слова учня</p>
          <h2>
            {words === null
              ? "Завантаження…"
              : words.length > 0
                ? `${words.length} на платформі`
                : "Поки порожньо"}
          </h2>
          {words && words.length > 0 ? (
            <ul className="dash-inbox">
              {studentGroups.map((group) => (
                <li key={group.name}>
                  <span>{group.name}</span>
                  <small>
                    {group.count}{" "}
                    {group.count === 1 ? "слово" : "слів"}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">
              Коли учень додасть слова після свого входу, вони з’являться тут і в
              словнику.
            </p>
          )}
          <div className="dash-card-actions">
            <Link className="action-btn primary" to="/vocab">
              Слова учня
            </Link>
          </div>
        </article>

        <article className="dash-card panel">
          <p className="dash-card-kicker">Домашнє в курсі</p>
          <h2>
            {latestHomework
              ? `HW ${latestHomework.id}`
              : "Домашніх немає"}
          </h2>
          {latestHomework ? (
            <>
              <p className="dash-card-meta">{latestHomework.title}</p>
              <p className="dash-card-copy">
                Актуальне завдання з програми. Здані тексти — у «Роботах учнів».
              </p>
              <Link
                className="action-btn secondary"
                to={homeworkHref(latestHomework)}
              >
                Відкрити HW {latestHomework.id}
              </Link>
            </>
          ) : (
            <p className="dash-empty">Домашніх завдань поки немає.</p>
          )}
        </article>
      </section>

      <section className="dash-actions" aria-label="Швидкі дії вчителя">
        <Link className="dash-action" to="/admin/submissions">
          Роботи учнів
        </Link>
        <Link className="dash-action" to="/admin/analyses">
          Аналізи уроків
        </Link>
        <Link className="dash-action" to="/vocab">
          Словник учня
        </Link>
        <Link className="dash-action" to="/lessons">
          Уроки
        </Link>
        <Link className="dash-action" to="/homework">
          Домашнє
        </Link>
        <Link className="dash-action" to="/">
          Roadmap
        </Link>
      </section>
    </div>
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
    if (!user || loading || isTeacher) return;
    return subscribeStudentVocab(user, isTeacher, (words) => {
      setOwnWordCount(words.length);
    });
  }, [user, loading, isTeacher]);

  if (!loading && user && isTeacher) {
    return (
      <TeacherCabinet
        displayName={displayName}
        latestLesson={latestLesson}
        latestHomework={latestHomework}
      />
    );
  }

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
    </div>
  );
}
