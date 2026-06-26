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

const prepositionImageCards: ImageCard[] = [
  {
    image: "/images/in-the-box.jpeg",
    phrase: "in the box",
    hintUa: "в коробці",
    group: "in",
  },
  {
    image: "/images/in-the-book.jfif",
    phrase: "in the book",
    hintUa: "в книзі",
    group: "in",
  },
  {
    image: "/images/in-the-car.webp",
    phrase: "in the car",
    hintUa: "в машині",
    group: "in",
  },
  {
    image: "/images/in-the-house.jpg",
    phrase: "in the house",
    hintUa: "в будинку",
    group: "in",
  },
  {
    image: "/images/in-the-office.jpg",
    phrase: "in the office",
    hintUa: "в офісі",
    group: "in",
  },
  {
    image: "/images/in-the-room.jpg",
    phrase: "in the room",
    hintUa: "в кімнаті",
    group: "in",
  },
  {
    image: "/images/at-the-park.jpg",
    phrase: "at the park",
    hintUa: "в парку",
    group: "in",
  },
  {
    image: "/images/at-home.jpg",
    phrase: "at home",
    hintUa: "вдома",
    group: "in",
  },
  {
    image: "/images/at-night.jpg",
    phrase: "at night",
    hintUa: "вночі",
    group: "in",
  },
  {
    image: "/images/at-school.jpg",
    phrase: "at school",
    hintUa: "в школі",
    group: "in",
  },
  {
    image: "/images/at-the-gym.webp",
    phrase: "at the gym",
    hintUa: "в спортзалі",
    group: "in",
  },
  {
    image: "/images/at-work.webp",
    phrase: "at work",
    hintUa: "на роботі",
    group: "in",
  },
  {
    image: "/images/in-the-bag.jpg",
    phrase: "in the bag",
    hintUa: "в сумці",
    group: "in",
  },
  {
    image: "/images/in-the-afternoon.jfif",
    phrase: "in the afternoon",
    hintUa: "після обіду",
    group: "in",
  },
  {
    image: "/images/in-june.jpg",
    phrase: "in June",
    hintUa: "в червні",
    group: "in",
  },
  {
    image: "/images/in-the-evening.jpg",
    phrase: "in the evening",
    hintUa: "ввечері",
    group: "in",
  },
  {
    image: "/images/in-the-morning.jpg",
    phrase: "in the morning",
    hintUa: "вранці",
    group: "in",
  },
  {
    image: "/images/in-the-summer.jfif",
    phrase: "in summer",
    hintUa: "влітку",
    group: "in",
  },

  {
    image: "/images/in-the-tablel.jpg",
    phrase: "on the table",
    hintUa: "на столі",
    group: "on",
  },
  {
    image: "/images/on-monday.jpg",
    phrase: "on Monday",
    hintUa: "в понеділок",
    group: "on",
  },
  {
    image: "/images/on-the-bus.jpg",
    phrase: "on the bus",
    hintUa: "в автобусі",
    group: "on",
  },
  {
    image: "/images/on-the-chair.jpg",
    phrase: "on the chair",
    hintUa: "на стільці",
    group: "on",
  },
  {
    image: "/images/on-the-floor.webp",
    phrase: "on the floor",
    hintUa: "на підлозі",
    group: "on",
  },
  {
    image: "/images/on-the-sofa.jpg",
    phrase: "on the sofa",
    hintUa: "на дивані",
    group: "on",
  },
  {
    image: "/images/on-the-wall.webp",
    phrase: "on the wall",
    hintUa: "на стіні",
    group: "on",
  },
];

export default function Lesson19() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [imageFilter, setImageFilter] = useState<"all" | "in" | "on">("all");
  const [imageFlipped, setImageFlipped] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => {
    const uniqueGroups = Array.from(
      new Set(allCards.map((card) => card.group)),
    );
    return ["all", ...uniqueGroups];
  }, []);

  const filteredCards = useMemo(() => {
    if (activeGroup === "all") return allCards;
    return allCards.filter((card) => card.group === activeGroup);
  }, [activeGroup]);

  const filteredImageCards = useMemo(() => {
    if (imageFilter === "all") return prepositionImageCards;
    return prepositionImageCards.filter((card) => card.group === imageFilter);
  }, [imageFilter]);

  const handleToggleCard = (key: string) => {
    setFlipped((prev) => ({ ...prev, [key]: !prev[key] }));
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
              <p className="lesson19-kicker">Навчання та робота</p>
              <h2>Картки</h2>
              <p className="lesson19-muted">
                Перша сторона — українською, зворот — англійською.
              </p>
            </div>
          </div>

          <div
            className="lesson19-filters"
            role="tablist"
            aria-label="Card groups"
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
              <p className="lesson19-muted">Дія, обов’язок, процес</p>
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
                        src={card.image}
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
      </div>
    </div>
  );
}
