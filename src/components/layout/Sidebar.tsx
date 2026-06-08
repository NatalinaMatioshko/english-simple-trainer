import type { Filter } from "../../types/trainer";

type SidebarProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  quizProgress: string;
  quizAnsweredCount: number;
  quizScore: number;
  totalQuizQuestions: number;
};

const filterOptions: { key: Filter; label: string }[] = [
  { key: "all", label: "Усі" },
  { key: "daily", label: "Рутина" },
  { key: "study", label: "Навчання" },
  { key: "home", label: "Дім" },
  { key: "social", label: "Спілкування" },
];

export function Sidebar({
  filter,
  setFilter,
  quizProgress,
  quizAnsweredCount,
  quizScore,
  totalQuizQuestions,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <section className="panel">
        <h2>Фільтр дієслів</h2>
        <p className="muted">Обирайте тему, щоб швидше повторити лексику.</p>

        <div className="controls" style={{ marginTop: "1rem" }}>
          {filterOptions.map((item) => (
            <button
              key={item.key}
              className={`filter-btn ${filter === item.key ? "active" : ""}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Підказка</h2>
        <ul className="rules">
          <li>Для he / she / it зазвичай додаємо -s.</li>
          <li>Після do / does використовуємо базову форму дієслова.</li>
          <li>
            Always, usually, sometimes, never часто стоять перед основним
            дієсловом.
          </li>
        </ul>
      </section>

      <section className="panel">
        <h2>Прогрес тесту</h2>
        <div className="progress" aria-label="Прогрес частотного тесту">
          <span style={{ width: quizProgress }} />
        </div>
        <p className="muted" style={{ marginTop: "0.75rem" }}>
          {quizAnsweredCount} / {totalQuizQuestions} завершено · Бал:{" "}
          {quizScore}
        </p>
      </section>
    </aside>
  );
}
