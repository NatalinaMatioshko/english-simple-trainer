import type { Filter, Mode } from "../../types/trainer";

type SidebarProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  mode: Mode;
  deckHint: string;
  quizProgress: string;
  quizAnsweredCount: number;
  quizScore: number;
  totalQuizQuestions: number;
  quizLabel: string;
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
  mode,
  deckHint,
  quizProgress,
  quizAnsweredCount,
  quizScore,
  totalQuizQuestions,
  quizLabel,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      {mode === "study" ? (
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
      ) : (
        <section className="panel">
          <h2>Практика зараз</h2>
          <p className="muted">Підказка до обраної колоди:</p>
          <p className="trainer-side-hint">{deckHint}</p>
        </section>
      )}

      <section className="panel">
        <h2>Швидкі правила</h2>
        <ul className="rules">
          <li>he / she / it → +s у Present Simple; питання з Does + base.</li>
          <li>to be: am / is / are · isn't / aren't.</li>
          <li>a + consonant, an + vowel · the UK / the US.</li>
          <li>my / his / her / their · Cristina's husband.</li>
          <li>can / can't + base verb.</li>
        </ul>
      </section>

      <section className="panel">
        <h2>Прогрес тесту</h2>
        <p className="muted" style={{ marginBottom: "0.5rem" }}>
          {quizLabel}
        </p>
        <div className="progress" aria-label="Прогрес тесту">
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
