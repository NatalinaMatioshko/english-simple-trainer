import { useEffect, useRef, useState } from "react";
import { vocabCategories, type VocabCategory, type VocabItem } from "../../data/vocab";
import { shuffle } from "../../utils/array";

type View = "table" | "cards";

export function VocabSection() {
  const [activeId, setActiveId] = useState(vocabCategories[0].id);
  const [view, setView] = useState<View>("table");
  const [practiceMode, setPracticeMode] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const category = vocabCategories.find((c) => c.id === activeId)!;

  const handleTabChange = (id: string) => {
    setActiveId(id);
    setRevealed(new Set());
  };

  const toggleReveal = (key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const revealAll = () => {
    const allKeys = category.groups.flatMap((g) => g.items.map((i) => i.en));
    setRevealed(new Set(allKeys));
  };

  const hideAll = () => setRevealed(new Set());

  return (
    <div className="vocab-section">
      <div className="vocab-header panel">
        <div className="vocab-header-top">
          <div>
            <h2 className="vocab-title">Словник</h2>
            <p className="vocab-subtitle muted">
              {view === "cards"
                ? "Флешкартки: переверни картку і познач — знаєш чи ні."
                : "Вирази та фрази. У режимі практики ховайте переклад і перевіряйте себе."}
            </p>
          </div>

          <div className="vocab-view-switcher">
            <button
              className={`vocab-view-btn ${view === "table" ? "active" : ""}`}
              onClick={() => setView("table")}
            >
              📋 Таблиця
            </button>
            <button
              className={`vocab-view-btn ${view === "cards" ? "active" : ""}`}
              onClick={() => setView("cards")}
            >
              🃏 Флешкартки
            </button>
          </div>
        </div>

        <div
          className="vocab-tabs"
          role="tablist"
          aria-label="Категорії словника"
        >
          {vocabCategories.map((cat) => (
            <button
              key={cat.id}
              className={`vocab-tab ${activeId === cat.id ? "active" : ""}`}
              onClick={() => handleTabChange(cat.id)}
              role="tab"
              aria-selected={activeId === cat.id}
            >
              <span className="vocab-tab-title">{cat.title}</span>
              <span className="vocab-tab-badge">{cat.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {view === "table" ? (
        <CategoryView
          category={category}
          practiceMode={practiceMode}
          revealed={revealed}
          onToggle={toggleReveal}
          onRevealAll={revealAll}
          onHideAll={hideAll}
          onSwitchToCards={() => setView("cards")}
          setPracticeMode={setPracticeMode}
        />
      ) : (
        <FlashcardMode category={category} key={activeId} />
      )}
    </div>
  );
}

/* ─── Table view ─────────────────────────────────────── */

type CategoryViewProps = {
  category: VocabCategory;
  practiceMode: boolean;
  revealed: Set<string>;
  onToggle: (key: string) => void;
  onRevealAll: () => void;
  onHideAll: () => void;
  onSwitchToCards: () => void;
  setPracticeMode: (v: boolean) => void;
};

function CategoryView({
  category,
  practiceMode,
  revealed,
  onToggle,
  onRevealAll,
  onHideAll,
  onSwitchToCards,
  setPracticeMode,
}: CategoryViewProps) {
  const totalItems = category.groups.reduce((acc, g) => acc + g.items.length, 0);
  const revealedCount = category.groups.reduce(
    (acc, g) => acc + g.items.filter((i) => revealed.has(i.en)).length,
    0,
  );

  return (
    <div className="vocab-category">
      {category.description && (
        <div className="vocab-rule-box">
          {category.description.split("\n").map((line, i) => (
            <p
              key={i}
              className={`vocab-rule-line ${i === 0 ? "vocab-rule-first" : ""}`}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="vocab-controls-row">
        <button
          className={`vocab-practice-toggle ${practiceMode ? "active" : ""}`}
          onClick={() => {
            setPracticeMode(!practiceMode);
          }}
          aria-pressed={practiceMode}
        >
          {practiceMode ? "📖 Показати всі" : "🧠 Режим практики"}
        </button>

        <button className="vocab-cards-cta" onClick={onSwitchToCards}>
          🃏 Вчити флешкартками
        </button>
      </div>

      {practiceMode && (
        <div className="vocab-practice-bar">
          <span className="muted">
            Відкрито: {revealedCount} / {totalItems}
          </span>
          <div className="vocab-practice-actions">
            <button className="btn secondary" onClick={onRevealAll}>
              Показати всі
            </button>
            <button className="btn secondary" onClick={onHideAll}>
              Сховати всі
            </button>
          </div>
        </div>
      )}

      <div className="vocab-groups">
        {category.groups.map((group, gi) => (
          <div key={gi} className="vocab-group">
            {group.label && !practiceMode && (
              <div className="vocab-group-label">
                <span className="vocab-group-pill">{group.label}</span>
              </div>
            )}

            <div className="vocab-table-header">
              <span>Українська</span>
              <span>English</span>
              <span>Example</span>
            </div>

            <div className="vocab-table">
              {group.items.map((item) => {
                const isRevealed = revealed.has(item.en);
                const show = !practiceMode || isRevealed;

                return (
                  <div
                    key={item.en}
                    className={`vocab-item ${practiceMode && !isRevealed ? "vocab-item-hidden" : ""}`}
                    onClick={practiceMode ? () => onToggle(item.en) : undefined}
                    role={practiceMode ? "button" : undefined}
                    tabIndex={practiceMode ? 0 : undefined}
                    onKeyDown={
                      practiceMode
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ")
                              onToggle(item.en);
                          }
                        : undefined
                    }
                    aria-expanded={practiceMode ? isRevealed : undefined}
                  >
                    <span className="vocab-ua">{item.ua}</span>
                    <span className={`vocab-en ${!show ? "vocab-en-hidden" : ""}`}>
                      {show ? item.en : <span className="vocab-reveal-hint">натисни →</span>}
                    </span>
                    <span className={`vocab-example ${!show ? "vocab-example-hidden" : ""}`}>
                      {show ? item.example : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {category.grammar && (
        <div className="vocab-grammar-box">
          <p className="vocab-grammar-title">Граматика</p>
          <ul className="vocab-grammar-list">
            {category.grammar.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Flashcard view ─────────────────────────────────── */

function FlashcardMode({ category }: { category: VocabCategory }) {
  const allItems = category.groups.flatMap((g) => g.items);
  const total = allItems.length;

  const [queue, setQueue] = useState<VocabItem[]>(() => shuffle(allItems));
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.focus();
  }, [queue.length, flipped]);

  const current = queue[0] ?? null;
  const done = queue.length === 0;
  const knownCount = known.size;
  const progress = Math.round((knownCount / total) * 100);

  const flip = () => setFlipped((f) => !f);

  const handleKnow = () => {
    if (!current) return;
    setKnown((prev) => new Set([...prev, current.en]));
    setQueue((prev) => prev.slice(1));
    setFlipped(false);
  };

  const handleReview = () => {
    setQueue((prev) => [...prev.slice(1), prev[0]]);
    setFlipped(false);
  };

  const handleRestart = () => {
    setQueue(shuffle(allItems));
    setKnown(new Set());
    setFlipped(false);
  };

  const handleShuffleRemaining = () => {
    setQueue((prev) => shuffle(prev));
    setFlipped(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (done) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!flipped) {
        flip();
      }
    }
    if (flipped) {
      if (e.key === "ArrowRight" || e.key === "k" || e.key === "K") handleKnow();
      if (e.key === "ArrowLeft" || e.key === "r" || e.key === "R") handleReview();
    }
  };

  if (done) {
    return (
      <div className="fc-done panel">
        <div className="fc-done-icon">🎉</div>
        <h3 className="fc-done-title">Колоду пройдено!</h3>
        <p className="fc-done-score">
          Знаєте <strong>{knownCount}</strong> з <strong>{total}</strong> слів
        </p>

        <div className="fc-done-bar-wrap">
          <div className="fc-done-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="fc-done-actions">
          <button className="btn" onClick={handleRestart}>
            Почати знову
          </button>
          {knownCount < total && (
            <button
              className="btn secondary"
              onClick={() => {
                const reviewItems = allItems.filter((i) => !known.has(i.en));
                setQueue(shuffle(reviewItems));
                setKnown(new Set());
                setFlipped(false);
              }}
            >
              Повторити невідомі ({total - knownCount})
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fc-wrapper">
      <div className="fc-top">
        <div className="fc-progress-wrap">
          <div className="fc-progress-bar">
            <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="fc-counter muted">
            {knownCount} / {total} знаю
          </span>
        </div>

        <button
          className="btn secondary fc-shuffle-btn"
          onClick={handleShuffleRemaining}
          title="Перемішати картки"
        >
          ⇄ Перемішати
        </button>
      </div>

      <div
        className="fc-scene"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={cardRef}
        aria-label={`Картка: ${current?.ua ?? ""}. Натисніть Enter або Пробіл щоб перевернути.`}
      >
        <div
          className={`fc-card ${flipped ? "fc-flipped" : ""}`}
          onClick={!flipped ? flip : undefined}
        >
          {/* FRONT — Ukrainian */}
          <div className="fc-face fc-front">
            <span className="fc-front-label muted">Українська</span>
            <p className="fc-front-word">{current?.ua}</p>
            <span className="fc-flip-hint muted">
              натисни або <kbd>Пробіл</kbd> щоб перевернути
            </span>
          </div>

          {/* BACK — English */}
          <div className="fc-face fc-back">
            <span className="fc-back-label">English</span>
            <p className="fc-back-word">{current?.en}</p>
            <p className="fc-back-example">{current?.example}</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="fc-actions">
          <button className="fc-btn-review" onClick={handleReview}>
            ↺ Ще раз
          </button>
          <button className="fc-btn-know" onClick={handleKnow}>
            ✓ Знаю
          </button>
        </div>
      )}

      <div className="fc-keyboard-hint muted">
        {flipped ? (
          <>
            <kbd>←</kbd> Ще раз &nbsp;·&nbsp; <kbd>→</kbd> Знаю
          </>
        ) : (
          <>
            <kbd>Space</kbd> / <kbd>Enter</kbd> — перевернути
          </>
        )}
      </div>

      <div className="fc-remaining muted">
        Залишилось: {queue.length} {queue.length !== 1 ? "карток" : "картка"}
      </div>
    </div>
  );
}
