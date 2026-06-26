import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Lesson19Cards from "./Lesson19Cards";
import "../styles/lesson19.css";

type Lesson19Card = {
  en: string;
  ua: string;
  group: string;
};

type ImageCard = {
  image: string;
  phrase: string;
  hintUa: string;
  group: "in" | "on";
};

const IMG_BASE = `${import.meta.env.BASE_URL}images/`;

const getImagePath = (fileName: string) => `${IMG_BASE}${fileName}`;

const allCards: Lesson19Card[] = [
  {
    en: "do homework",
    ua: "робити домашнє завдання",
    group: "Навчання та робота",
  },
  {
    en: "do housework",
    ua: "робити роботу по дому",
    group: "Навчання та робота",
  },
  { en: "do business", ua: "вести бізнес", group: "Навчання та робота" },
  {
    en: "do research",
    ua: "проводити дослідження",
    group: "Навчання та робота",
  },
  { en: "do a project", ua: "робити проєкт", group: "Навчання та робота" },
  { en: "do a job", ua: "виконувати роботу", group: "Навчання та робота" },
  {
    en: "do paperwork",
    ua: "займатися паперовою роботою",
    group: "Навчання та робота",
  },

  { en: "do the laundry", ua: "прати білизну", group: "Догляд за домом" },
  { en: "do the dishes", ua: "мити посуд", group: "Догляд за домом" },
  {
    en: "do the shopping",
    ua: "робити покупки (продуктові)",
    group: "Догляд за домом",
  },
  { en: "do the cleaning", ua: "прибирати", group: "Догляд за домом" },

  {
    en: "do exercise",
    ua: "робити фізичні вправи",
    group: "Догляд за собою та спорт",
  },
  { en: "do yoga", ua: "займатися йогою", group: "Догляд за собою та спорт" },
  { en: "do hair", ua: "робити зачіску", group: "Догляд за собою та спорт" },
  { en: "do nails", ua: "робити манікюр", group: "Догляд за собою та спорт" },

  {
    en: "do a favor",
    ua: "зробити послугу",
    group: "Загальні та розмовні вирази",
  },
  {
    en: "do your best",
    ua: "старатися щосили",
    group: "Загальні та розмовні вирази",
  },
  {
    en: "do well",
    ua: "досягати успіху / добре справлятися",
    group: "Загальні та розмовні вирази",
  },
  {
    en: "do badly",
    ua: "погано справлятися",
    group: "Загальні та розмовні вирази",
  },
  {
    en: "do nothing",
    ua: "нічого не робити",
    group: "Загальні та розмовні вирази",
  },
  {
    en: "do something",
    ua: "зробити щось",
    group: "Загальні та розмовні вирази",
  },
];

const makeCards: Lesson19Card[] = [
  {
    en: "make coffee",
    ua: "готувати каву",
    group: "Їжа та напої",
  },
  {
    en: "make tea",
    ua: "заварювати чай",
    group: "Їжа та напої",
  },
  {
    en: "make breakfast",
    ua: "готувати сніданок",
    group: "Їжа та напої",
  },
  {
    en: "make lunch",
    ua: "готувати обід",
    group: "Їжа та напої",
  },
  {
    en: "make dinner",
    ua: "готувати вечерю",
    group: "Їжа та напої",
  },
  {
    en: "make a cake",
    ua: "робити / пекти торт",
    group: "Їжа та напої",
  },

  {
    en: "make a mistake",
    ua: "зробити помилку",
    group: "Результат / дія",
  },
  {
    en: "make a decision",
    ua: "прийняти рішення",
    group: "Результат / дія",
  },
  {
    en: "make a plan",
    ua: "скласти план",
    group: "Результат / дія",
  },
  {
    en: "make a list",
    ua: "скласти список",
    group: "Результат / дія",
  },
  {
    en: "make a phone call",
    ua: "зробити телефонний дзвінок",
    group: "Результат / дія",
  },
  {
    en: "make money",
    ua: "заробляти гроші",
    group: "Результат / дія",
  },

  {
    en: "make friends",
    ua: "подружитися / знайти друзів",
    group: "Люди та спілкування",
  },
  {
    en: "make noise",
    ua: "шуміти",
    group: "Люди та спілкування",
  },
  {
    en: "make progress",
    ua: "робити прогрес",
    group: "Люди та спілкування",
  },
  {
    en: "make time",
    ua: "знаходити час",
    group: "Люди та спілкування",
  },
];

const prepositionImageCards: ImageCard[] = [
  {
    image: "in-the-box.jpeg",
    phrase: "in the box",
    hintUa: "в коробці",
    group: "in",
  },
  {
    image: "in-the-book.jfif",
    phrase: "in the book",
    hintUa: "в книзі",
    group: "in",
  },
  {
    image: "in-the-car.webp",
    phrase: "in the car",
    hintUa: "в машині",
    group: "in",
  },
  {
    image: "in-the-house.jpg",
    phrase: "in the house",
    hintUa: "в будинку",
    group: "in",
  },
  {
    image: "in-the-office.jpg",
    phrase: "in the office",
    hintUa: "в офісі",
    group: "in",
  },
  {
    image: "in-the-room.jpg",
    phrase: "in the room",
    hintUa: "в кімнаті",
    group: "in",
  },
  {
    image: "at-the-park.jpg",
    phrase: "at the park",
    hintUa: "в парку",
    group: "in",
  },
  {
    image: "at-home.jpg",
    phrase: "at home",
    hintUa: "вдома",
    group: "in",
  },
  {
    image: "at-night.jpg",
    phrase: "at night",
    hintUa: "вночі",
    group: "in",
  },
  {
    image: "at-school.jpg",
    phrase: "at school",
    hintUa: "в школі",
    group: "in",
  },
  {
    image: "at-the-gym.webp",
    phrase: "at the gym",
    hintUa: "в спортзалі",
    group: "in",
  },
  {
    image: "at-work.webp",
    phrase: "at work",
    hintUa: "на роботі",
    group: "in",
  },
  {
    image: "in-the-bag.jpg",
    phrase: "in the bag",
    hintUa: "в сумці",
    group: "in",
  },
  {
    image: "in-the-afternoon.jfif",
    phrase: "in the afternoon",
    hintUa: "після обіду",
    group: "in",
  },
  {
    image: "in-june.jpg",
    phrase: "in June",
    hintUa: "в червні",
    group: "in",
  },
  {
    image: "in-the-evening.jpg",
    phrase: "in the evening",
    hintUa: "ввечері",
    group: "in",
  },
  {
    image: "in-the-morning.jpg",
    phrase: "in the morning",
    hintUa: "вранці",
    group: "in",
  },
  {
    image: "in-the-summer.jfif",
    phrase: "in summer",
    hintUa: "влітку",
    group: "in",
  },

  {
    image: "in-the-tablel.jpg",
    phrase: "on the table",
    hintUa: "на столі",
    group: "on",
  },
  {
    image: "on-monday.jpg",
    phrase: "on Monday",
    hintUa: "в понеділок",
    group: "on",
  },
  {
    image: "on-the-bus.jpg",
    phrase: "on the bus",
    hintUa: "в автобусі",
    group: "on",
  },
  {
    image: "on-the-chair.jpg",
    phrase: "on the chair",
    hintUa: "на стільці",
    group: "on",
  },
  {
    image: "on-the-floor.webp",
    phrase: "on the floor",
    hintUa: "на підлозі",
    group: "on",
  },
  {
    image: "on-the-sofa.jpg",
    phrase: "on the sofa",
    hintUa: "на дивані",
    group: "on",
  },
  {
    image: "on-the-wall.webp",
    phrase: "on the wall",
    hintUa: "на стіні",
    group: "on",
  },
];

export default function Lesson19() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [makeActiveGroup, setMakeActiveGroup] = useState("all");
  const [makeFlipped, setMakeFlipped] = useState<Record<string, boolean>>({});
  const [imageFilter, setImageFilter] = useState<"all" | "in" | "on">("all");
  const [imageFlipped, setImageFlipped] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => {
    const uniqueGroups = Array.from(
      new Set(allCards.map((card) => card.group)),
    );
    return ["all", ...uniqueGroups];
  }, []);

  const makeGroups = useMemo(() => {
    const uniqueGroups = Array.from(
      new Set(makeCards.map((card) => card.group)),
    );
    return ["all", ...uniqueGroups];
  }, []);

  const filteredCards = useMemo(() => {
    if (activeGroup === "all") return allCards;
    return allCards.filter((card) => card.group === activeGroup);
  }, [activeGroup]);

  const filteredMakeCards = useMemo(() => {
    if (makeActiveGroup === "all") return makeCards;
    return makeCards.filter((card) => card.group === makeActiveGroup);
  }, [makeActiveGroup]);

  const filteredImageCards = useMemo(() => {
    if (imageFilter === "all") return prepositionImageCards;
    return prepositionImageCards.filter((card) => card.group === imageFilter);
  }, [imageFilter]);

  const handleToggleCard = (key: string) => {
    setFlipped((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleMakeCard = (key: string) => {
    setMakeFlipped((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleImageCard = (key: string) => {
    setImageFlipped((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="lesson19-page">
      <div className="lesson19-shell">
        <div className="lesson19-topbar">
          <Link className="lesson19-link" to="/lessons">
            ← Back to lessons
          </Link>
          <Link className="lesson19-link" to="/lesson-18">
            Open Lesson 18
          </Link>
        </div>

        <header className="lesson19-hero">
          <span className="lesson19-badge">Lesson 19 • Do expressions</span>
          <h1>DO</h1>
          <p className="lesson19-lead">
            У цьому уроці ми вчимо типові вирази з <strong>do</strong>.
          </p>
        </header>

        <section className="lesson19-section">
          <div className="lesson19-section-head">
            <div>
              <p className="lesson19-kicker">Warm-up</p>
              <h2>Quick questions</h2>
            </div>
          </div>

          <div className="lesson19-questions-grid">
            <article className="lesson19-question-card">
              <h3>How are you today?</h3>
            </article>

            <article className="lesson19-question-card">
              <h3>How are you feeling?</h3>
            </article>

            <article className="lesson19-question-card">
              <h3>How&apos;s work?</h3>
            </article>

            <article className="lesson19-question-card">
              <h3>Anything interesting today?</h3>
            </article>

            <article className="lesson19-question-card">
              <h3>How was your morning?</h3>
            </article>
          </div>
        </section>

        <section className="lesson19-section">
          <p className="lesson19-kicker">Перша секція</p>
          <h2>Правило</h2>
          <p className="lesson19-text">
            В англійській мові дієслово <strong>do</strong> зазвичай
            використовується для позначення дій, обов&apos;язків, повторюваних
            завдань або загальної діяльності, яка не передбачає створення
            фізичного об&apos;єкта.
          </p>
          <div className="lesson19-highlight">
            Думай так: <strong>do = виконувати дію</strong>, а не створювати
            нову річ.
          </div>
        </section>

        <section className="lesson19-section">
          <div className="lesson19-section-head">
            <div>
              <p className="lesson19-kicker">DO expressions</p>
              <h2>DO cards</h2>
              <p className="lesson19-muted">
                Перша сторона — українською, зворот — англійською.
              </p>
            </div>
          </div>

          <div
            className="lesson19-filters"
            role="tablist"
            aria-label="Do card groups"
          >
            {groups.map((group) => {
              const label = group === "all" ? "Усі" : group;

              return (
                <button
                  key={group}
                  type="button"
                  className={`lesson19-filter ${activeGroup === group ? "active" : ""}`}
                  onClick={() => setActiveGroup(group)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <Lesson19Cards
            cards={filteredCards}
            flipped={flipped}
            onToggle={handleToggleCard}
          />
        </section>

        <section className="lesson19-section">
          <div className="lesson19-section-head">
            <div>
              <p className="lesson19-kicker">MAKE expressions</p>
              <h2>MAKE cards</h2>
              <p className="lesson19-muted">
                Тут вчимо типові вирази з make. Перша сторона — українською,
                зворот — англійською.
              </p>
            </div>
          </div>

          <div
            className="lesson19-filters"
            role="tablist"
            aria-label="Make card groups"
          >
            {makeGroups.map((group) => {
              const label = group === "all" ? "Усі" : group;

              return (
                <button
                  key={group}
                  type="button"
                  className={`lesson19-filter ${makeActiveGroup === group ? "active" : ""}`}
                  onClick={() => setMakeActiveGroup(group)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <Lesson19Cards
            cards={filteredMakeCards}
            flipped={makeFlipped}
            onToggle={handleToggleMakeCard}
          />
        </section>

        <section className="lesson19-section">
          <p className="lesson19-kicker">Важливе правило</p>
          <h2>Do vs Make</h2>
          <p className="lesson19-text">
            Не плутайте <strong>do</strong> з дієсловом <strong>make</strong>.
            Ми використовуємо <strong>make</strong>, коли створюємо щось нове,
            чого раніше не існувало.
          </p>

          <div className="lesson19-compare">
            <div className="lesson19-compare-card do-card">
              <h3>DO</h3>
              <p className="lesson19-muted">Дія, обов&apos;язок, процес</p>
              <ul className="lesson19-list">
                <li>do homework</li>
                <li>do the dishes</li>
                <li>do research</li>
                <li>do exercise</li>
              </ul>
            </div>

            <div className="lesson19-compare-card make-card">
              <h3>MAKE</h3>
              <p className="lesson19-muted">Створити новий результат</p>
              <ul className="lesson19-list">
                <li>make coffee</li>
                <li>make a mistake</li>
                <li>make dinner</li>
                <li>make a cake</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="lesson19-section">
          <div className="lesson19-section-head">
            <div>
              <p className="lesson19-kicker">Нова секція</p>
              <h2>IN / ON flashcards</h2>
              <p className="lesson19-muted">
                Натисни на картку: спочатку бачиш картинку, а на звороті —
                коротку правильну фразу англійською.
              </p>
            </div>
          </div>

          <div className="lesson19-highlight">
            Тут ми тренуємо готові target phrases: <strong>in the bag</strong>,
            <strong> on the table</strong>, <strong>in July</strong>,
            <strong> on Monday</strong>.
          </div>

          <div
            className="lesson19-filters"
            role="tablist"
            aria-label="Preposition image groups"
          >
            {[
              { key: "all", label: "Усі" },
              { key: "in", label: "IN / AT" },
              { key: "on", label: "ON" },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                className={`lesson19-filter ${imageFilter === item.key ? "active" : ""}`}
                onClick={() => setImageFilter(item.key as "all" | "in" | "on")}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="lesson19-image-grid">
            {filteredImageCards.map((card, index) => {
              const key = `${card.phrase}-${index}`;
              const isFlipped = !!imageFlipped[key];

              return (
                <button
                  key={key}
                  type="button"
                  className={`lesson19-image-card ${isFlipped ? "is-flipped" : ""}`}
                  onClick={() => handleToggleImageCard(key)}
                  aria-label={`Flashcard: ${card.hintUa}`}
                >
                  <span className="lesson19-image-card-inner">
                    <span className="lesson19-image-card-front">
                      <img
                        src={getImagePath(card.image)}
                        alt={card.hintUa}
                        className="lesson19-image"
                        loading="lazy"
                      />
                      <span className="lesson19-image-caption">
                        {card.hintUa}
                      </span>
                    </span>

                    <span className="lesson19-image-card-back">
                      <span className="lesson19-image-phrase">
                        {card.phrase}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="lesson19-section">
          <div className="lesson19-section-head">
            <div>
              <p className="lesson19-kicker">Extra practice</p>
              <h2>Practice and test</h2>
              <p className="lesson19-muted">
                Відкрий додаткову практику та короткий тест у новій вкладці.
              </p>
            </div>
          </div>

          <div className="lesson19-resource-grid">
            <a
              href="https://promova.com/uk/my-plan/appBJb23Byfy5g6CE/379?unit=appBJb23Byfy5g6CE6"
              target="_blank"
              rel="noopener noreferrer"
              className="lesson19-resource-card"
            >
              <div className="lesson19-resource-top">
                <span className="lesson19-resource-badge">Practice</span>
                <span className="lesson19-resource-arrow">↗</span>
              </div>
              <h3>Promova</h3>
              <p>Практика go та додаткові вправи для повторення.</p>
            </a>

            <a
              href="https://test-english.com/grammar-points/a1/at-in-on-prepositions-time/"
              target="_blank"
              rel="noopener noreferrer"
              className="lesson19-resource-card"
            >
              <div className="lesson19-resource-top">
                <span className="lesson19-resource-badge">Test</span>
                <span className="lesson19-resource-arrow">↗</span>
              </div>
              <h3>Test-English</h3>
              <p>Короткий grammar test на at / in / on для часу.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
