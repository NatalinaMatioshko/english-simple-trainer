import { useEffect, useMemo, useRef, useState } from "react";
import {
  vocabCategories,
  type VocabCategory,
  type VocabItem,
} from "../../data/vocab";
import { shuffle } from "../../utils/array";
import {
  loadCustomVocab,
  makeCustomVocabId,
  saveCustomVocab,
  type CustomVocabWord,
} from "../../utils/customVocab";
import {
  letterSpeakText,
  speakEnglish,
  vocabSpeakText,
  warmUpSpeechVoices,
} from "../../utils/speech";

type View = "table" | "cards";

const ALL_WORDS_ID = "__all__";
const MY_WORDS_ID = "my-words";

function buildMyWordsCategory(words: CustomVocabWord[]): VocabCategory {
  const items: VocabItem[] = words.map(({ en, ua, example }) => ({
    en,
    ua,
    ...(example ? { example } : {}),
  }));

  return {
    id: MY_WORDS_ID,
    title: "Мої слова",
    badge: words.length > 0 ? String(words.length) : "+",
    description:
      "Ваші власні слова. Зберігаються в цьому браузері (localStorage).",
    groups: [{ label: "Мої слова", items }],
  };
}

function buildAllWordsCategory(customWords: CustomVocabWord[]): VocabCategory {
  const seen = new Set<string>();
  const groups = vocabCategories
    .filter((c) => c.id !== "alphabet")
    .map((cat) => {
      const items: VocabItem[] = [];
      for (const g of cat.groups) {
        for (const item of g.items) {
          if (seen.has(item.en)) continue;
          seen.add(item.en);
          items.push(item);
        }
      }
      return { label: cat.title, items };
    })
    .filter((g) => g.items.length > 0);

  if (customWords.length > 0) {
    const customItems: VocabItem[] = [];
    for (const w of customWords) {
      if (seen.has(w.en)) continue;
      seen.add(w.en);
      customItems.push({
        en: w.en,
        ua: w.ua,
        ...(w.example ? { example: w.example } : {}),
      });
    }
    if (customItems.length > 0) {
      groups.push({ label: "Мої слова", items: customItems });
    }
  }

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return {
    id: ALL_WORDS_ID,
    title: "Усі слова",
    badge: String(total),
    description:
      "Усі категорії словника, крім Alphabet. Зручно для загального повторення.",
    groups,
  };
}

export function VocabSection() {
  const [customWords, setCustomWords] = useState<CustomVocabWord[]>(() =>
    loadCustomVocab(),
  );
  const myWordsCategory = useMemo(
    () => buildMyWordsCategory(customWords),
    [customWords],
  );
  const allWordsCategory = useMemo(
    () => buildAllWordsCategory(customWords),
    [customWords],
  );
  const [activeId, setActiveId] = useState(vocabCategories[0].id);
  const [view, setView] = useState<View>("table");
  const [practiceMode, setPracticeMode] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    saveCustomVocab(customWords);
  }, [customWords]);

  const category =
    activeId === ALL_WORDS_ID
      ? allWordsCategory
      : activeId === MY_WORDS_ID
        ? myWordsCategory
        : vocabCategories.find((c) => c.id === activeId)!;

  const handleTabChange = (id: string) => {
    setActiveId(id);
    setRevealed(new Set());
    setPracticeMode(false);
  };

  const addCustomWord = (word: Omit<CustomVocabWord, "id">): boolean => {
    const en = word.en.trim();
    const ua = word.ua.trim();
    const example = word.example?.trim();
    if (!en || !ua) return false;
    if (customWords.some((w) => w.en.toLowerCase() === en.toLowerCase())) {
      return false;
    }

    setCustomWords((prev) => {
      if (prev.some((w) => w.en.toLowerCase() === en.toLowerCase())) {
        return prev;
      }
      return [
        ...prev,
        {
          id: makeCustomVocabId(),
          en,
          ua,
          ...(example ? { example } : {}),
        },
      ];
    });
    return true;
  };

  const deleteCustomWord = (en: string) => {
    setCustomWords((prev) => prev.filter((w) => w.en !== en));
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

  const isGrid = category.layout === "grid";

  return (
    <div className="vocab-section">
      <div className="vocab-header panel">
        <div className="vocab-header-top">
          <div>
            <h2 className="vocab-title">Словник</h2>
            <p className="vocab-subtitle muted">
              {view === "cards"
                ? "Флешкартки: переверни картку і познач — знаєш чи ні. Можна одну категорію або всі слова."
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
          <button
            className={`vocab-tab vocab-tab--all ${activeId === ALL_WORDS_ID ? "active" : ""}`}
            onClick={() => handleTabChange(ALL_WORDS_ID)}
            role="tab"
            aria-selected={activeId === ALL_WORDS_ID}
          >
            <span className="vocab-tab-title">{allWordsCategory.title}</span>
            <span className="vocab-tab-badge">{allWordsCategory.badge}</span>
          </button>
          <button
            className={`vocab-tab vocab-tab--mine ${activeId === MY_WORDS_ID ? "active" : ""}`}
            onClick={() => handleTabChange(MY_WORDS_ID)}
            role="tab"
            aria-selected={activeId === MY_WORDS_ID}
          >
            <span className="vocab-tab-title">{myWordsCategory.title}</span>
            <span className="vocab-tab-badge">{myWordsCategory.badge}</span>
          </button>
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
        isGrid ? (
          <GridView category={category} key={activeId} />
        ) : (
          <CategoryView
            category={category}
            practiceMode={practiceMode}
            revealed={revealed}
            onToggle={toggleReveal}
            onRevealAll={revealAll}
            onHideAll={hideAll}
            onSwitchToCards={() => setView("cards")}
            setPracticeMode={setPracticeMode}
            onAddCustomWord={
              activeId === MY_WORDS_ID ? addCustomWord : undefined
            }
            onDeleteCustomWord={
              activeId === MY_WORDS_ID ? deleteCustomWord : undefined
            }
            customWordCount={
              activeId === MY_WORDS_ID ? customWords.length : undefined
            }
          />
        )
      ) : (
        <FlashcardMode category={category} key={activeId} />
      )}
    </div>
  );
}

/* ─── Alphabet / special grid view ──────────────────── */

function GridView({ category }: { category: VocabCategory }) {
  const items = category.groups.flatMap((g) => g.items);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    warmUpSpeechVoices();
  }, []);

  const playLetter = (item: VocabItem) => {
    const text = letterSpeakText(item.en);
    setPlaying(item.en);
    speakEnglish(text, 0.85);
    window.setTimeout(() => setPlaying(null), 700);
  };

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

      <div className="vocab-grid-layout">
        {items.map((item) => (
          <button
            key={item.en}
            type="button"
            className={`vocab-grid-card vocab-grid-card--audio${
              playing === item.en ? " is-playing" : ""
            }`}
            onClick={() => playLetter(item)}
            title={`Почути: ${letterSpeakText(item.en)}`}
            aria-label={`Почути вимову букви ${item.en}`}
          >
            <span className="vocab-grid-main">{item.en}</span>
            <span className="vocab-grid-sub">{item.ua}</span>
            <span className="vocab-grid-sound" aria-hidden="true">
              ♪
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Standard table view ────────────────────────────── */

type CategoryViewProps = {
  category: VocabCategory;
  practiceMode: boolean;
  revealed: Set<string>;
  onToggle: (key: string) => void;
  onRevealAll: () => void;
  onHideAll: () => void;
  onSwitchToCards: () => void;
  setPracticeMode: (v: boolean) => void;
  onAddCustomWord?: (word: Omit<CustomVocabWord, "id">) => boolean;
  onDeleteCustomWord?: (en: string) => void;
  customWordCount?: number;
};

function CustomWordForm({
  onAdd,
}: {
  onAdd: (word: Omit<CustomVocabWord, "id">) => boolean;
}) {
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [example, setExample] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enTrim = en.trim();
    const uaTrim = ua.trim();
    if (!enTrim || !uaTrim) {
      setError("Заповніть англійське і українське слово.");
      return;
    }
    const ok = onAdd({
      en: enTrim,
      ua: uaTrim,
      example: example.trim() || undefined,
    });
    if (!ok) {
      setError("Таке англійське слово вже є у вашому списку.");
      return;
    }
    setEn("");
    setUa("");
    setExample("");
    setError("");
  };

  return (
    <form className="vocab-custom-form panel" onSubmit={handleSubmit}>
      <p className="vocab-custom-form-title">Додати своє слово</p>
      <div className="vocab-custom-form-fields">
        <label className="vocab-custom-field">
          <span>English</span>
          <input
            type="text"
            value={en}
            onChange={(e) => setEn(e.target.value)}
            placeholder="e.g. bakery"
            autoComplete="off"
          />
        </label>
        <label className="vocab-custom-field">
          <span>Українська</span>
          <input
            type="text"
            value={ua}
            onChange={(e) => setUa(e.target.value)}
            placeholder="напр. пекарня"
            autoComplete="off"
          />
        </label>
        <label className="vocab-custom-field vocab-custom-field--wide">
          <span>Example (необовʼязково)</span>
          <input
            type="text"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="There's a bakery near my house."
            autoComplete="off"
          />
        </label>
      </div>
      {error && <p className="feedback error">{error}</p>}
      <button type="submit" className="btn vocab-custom-submit">
        Додати слово
      </button>
    </form>
  );
}

function CategoryView({
  category,
  practiceMode,
  revealed,
  onToggle,
  onRevealAll,
  onHideAll,
  onSwitchToCards,
  setPracticeMode,
  onAddCustomWord,
  onDeleteCustomWord,
  customWordCount,
}: CategoryViewProps) {
  const [playing, setPlaying] = useState<string | null>(null);
  const isMyWords = category.id === MY_WORDS_ID;
  const canDelete = Boolean(onDeleteCustomWord);

  useEffect(() => {
    warmUpSpeechVoices();
  }, []);

  const totalItems = category.groups.reduce(
    (acc, g) => acc + g.items.length,
    0,
  );
  const revealedCount = category.groups.reduce(
    (acc, g) => acc + g.items.filter((i) => revealed.has(i.en)).length,
    0,
  );

  const [col1, col2, col3] = category.columnLabels ?? [
    "Українська",
    "English",
    "Example",
  ];
  const hasThirdCol = col3 !== "";

  const playItem = (e: React.MouseEvent, item: VocabItem) => {
    e.stopPropagation();
    const text = vocabSpeakText(item, category.id);
    setPlaying(item.en);
    speakEnglish(text, 0.9);
    window.setTimeout(() => setPlaying(null), 900);
  };

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

      {onAddCustomWord && <CustomWordForm onAdd={onAddCustomWord} />}

      {isMyWords && customWordCount === 0 && (
        <p className="vocab-custom-empty muted">
          Поки що порожньо — додайте перше слово формою вище.
        </p>
      )}

      {totalItems > 0 && (
        <div className="vocab-controls-row">
          <button
            className={`vocab-practice-toggle ${practiceMode ? "active" : ""}`}
            onClick={() => setPracticeMode(!practiceMode)}
            aria-pressed={practiceMode}
          >
            {practiceMode ? "📖 Показати всі" : "🧠 Режим практики"}
          </button>

          <button className="vocab-cards-cta" onClick={onSwitchToCards}>
            🃏 Вчити флешкартками
          </button>
        </div>
      )}

      {practiceMode && totalItems > 0 && (
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

      {totalItems > 0 && (
        <div className="vocab-groups">
          {category.groups.map((group, gi) => (
            <div key={gi} className="vocab-group">
              {group.label && !practiceMode && (
                <div className="vocab-group-label">
                  <span className="vocab-group-pill">{group.label}</span>
                </div>
              )}

              <div
                className={`vocab-table-header ${!hasThirdCol ? "vocab-table-header--2col" : ""} ${canDelete ? "vocab-table-header--with-delete" : ""}`}
              >
                <span>{col1}</span>
                <span>{col2}</span>
                {hasThirdCol && <span>{col3}</span>}
                {canDelete && <span className="vocab-col-actions"> </span>}
              </div>

              <div className="vocab-table">
                {group.items.map((item) => {
                  const isRevealed = revealed.has(item.en);
                  const show = !practiceMode || isRevealed;

                  return (
                    <div
                      key={item.en}
                      className={`vocab-item ${!hasThirdCol ? "vocab-item--2col" : ""} ${canDelete ? "vocab-item--with-delete" : ""} ${practiceMode && !isRevealed ? "vocab-item-hidden" : ""}`}
                      onClick={
                        practiceMode ? () => onToggle(item.en) : undefined
                      }
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
                      {/* Col 1: always shown (col1 = Ukrainian by default) */}
                      <span className="vocab-ua">
                        {item.ua}
                        {category.id === "numbers" && item.ipa && (
                          <span className="vocab-ipa">[ {item.ipa} ]</span>
                        )}
                      </span>

                      {/* Col 2: hidden in practice mode */}
                      <span
                        className={`vocab-en ${!show ? "vocab-en-hidden" : ""}`}
                      >
                        {show ? (
                          <span className="vocab-en-row">
                            <span className="vocab-en-text">
                              <span className="vocab-en-word">{item.en}</span>
                              {category.id !== "numbers" &&
                                category.id !== "alphabet" &&
                                item.ipa && (
                                  <span className="vocab-ipa">
                                    [ {item.ipa} ]
                                  </span>
                                )}
                            </span>
                            <button
                              type="button"
                              className={`vocab-speak-btn${
                                playing === item.en ? " is-playing" : ""
                              }`}
                              onClick={(e) => playItem(e, item)}
                              title={`Почути: ${vocabSpeakText(item, category.id)}`}
                              aria-label={`Почути вимову: ${vocabSpeakText(item, category.id)}`}
                            >
                              ♪
                            </button>
                          </span>
                        ) : (
                          <span className="vocab-reveal-hint">натисни →</span>
                        )}
                      </span>

                      {/* Col 3: example (only shown when hasThirdCol) */}
                      {hasThirdCol && (
                        <span
                          className={`vocab-example ${!show ? "vocab-example-hidden" : ""}`}
                        >
                          {show ? (item.example ?? "—") : "—"}
                        </span>
                      )}

                      {canDelete && onDeleteCustomWord && (
                        <button
                          type="button"
                          className="vocab-delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteCustomWord(item.en);
                          }}
                          title="Видалити слово"
                          aria-label={`Видалити слово ${item.en}`}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

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
  const isNumbers = category.id === "numbers";

  const frontLabel = category.frontLabel ?? "Українська";
  const backLabel = category.backLabel ?? "English";

  const [queue, setQueue] = useState<VocabItem[]>(() => shuffle(allItems));
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.focus();
  }, [queue.length, flipped]);

  if (total === 0) {
    return (
      <div className="fc-done panel">
        <h3 className="fc-done-title">Немає слів для карток</h3>
        <p className="muted">
          Додайте слова в категорії «Мої слова» (режим таблиці) або оберіть
          іншу категорію.
        </p>
      </div>
    );
  }

  const current = queue[0] ?? null;
  const done = queue.length === 0;
  const knownCount = known.size;
  const progress = Math.round((knownCount / total) * 100);

  const flip = () => setFlipped((f) => !f);

  // Numbers: front = digit, back = word + IPA
  const frontWord = isNumbers ? current?.en : current?.ua;
  const backWord = isNumbers ? current?.ua : current?.en;

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
      if (!flipped) flip();
    }
    if (flipped) {
      if (e.key === "ArrowRight" || e.key === "k" || e.key === "K")
        handleKnow();
      if (e.key === "ArrowLeft" || e.key === "r" || e.key === "R")
        handleReview();
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
            <div
              className="fc-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="fc-counter muted">{knownCount} / {total} знаю</span>
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
        aria-label={`Картка: ${frontWord ?? ""}. Натисніть Enter або Пробіл щоб перевернути.`}
      >
        <div
          key={current?.en ?? "empty"}
          className={`fc-card ${flipped ? "fc-flipped" : ""}`}
          onClick={!flipped ? flip : undefined}
        >
          {/* FRONT */}
          <div className="fc-face fc-front">
            <span className="fc-front-label muted">{frontLabel}</span>
            <p className="fc-front-word">{frontWord}</p>
            <span className="fc-flip-hint muted">
              натисни або <kbd>Пробіл</kbd> щоб перевернути
            </span>
          </div>

          {/* BACK */}
          <div className="fc-face fc-back">
            <span className="fc-back-label">{backLabel}</span>
            <p className="fc-back-word">{backWord}</p>
            {current?.ipa && category.id !== "alphabet" && (
              <p className="fc-back-ipa">[ {current.ipa} ]</p>
            )}
            {current?.example && (
              <p className="fc-back-example">{current.example}</p>
            )}
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
        Залишилось: {queue.length}{" "}
        {queue.length !== 1 ? "карток" : "картка"}
      </div>
    </div>
  );
}
