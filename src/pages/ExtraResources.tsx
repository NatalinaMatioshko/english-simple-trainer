import { Link } from "react-router-dom";
import "../styles/pages.css";

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const visualMaterials = [
  {
    id: "new-words",
    title: "New Words",
    file: "new-words.png",
    caption: "journal thoughts, cuddle up with a cozy book, to step outside",
  },
  {
    id: "book-words",
    title: "Book Words",
    file: "book-words.png",
    caption: "author, chapter, cover, pages, shelf, title та ін.",
  },
  {
    id: "wizarding-world",
    title: "Welcome to the Wizarding World",
    file: "wizarding-world.png",
    caption:
      "Harry Potter — vocabulary, true/false, fill in the blanks, creative tasks",
  },
  {
    id: "ways-to-smile",
    title: "Ways to Smile and Laugh",
    file: "ways-to-smile-and-laugh.png",
    caption: "titter, smirk, grin, beam, howl, snort, roar, burst out laughing",
  },
  {
    id: "color-idioms",
    title: "Color Idioms",
    file: "color-idioms.png",
    caption: "feel blue, see red, green with envy, tickled pink та ін.",
  },
  {
    id: "phrasal-take",
    title: "Phrasal Verbs: Take",
    file: "phrasal-verbs-take.png",
    caption: "take off, take up, take in",
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs",
    file: "phrasal-verbs.png",
    caption: "break down, calm down, cheer up, look up, get on/off та ін.",
  },
  {
    id: "everyday-actions",
    title: "Everyday Actions",
    file: "everyday-actions.png",
    caption: "wring, pull, crush, stir, squeeze, pour, wipe, fold…",
  },
  {
    id: "ways-to-say-ok",
    title: "Ways to Say OK",
    file: "ways-to-say-ok.png",
    caption: "okay, all right, sure, no problem, absolutely, sounds good…",
  },
  {
    id: "verbs-sleeping",
    title: "8 Verbs for Sleeping",
    file: "verbs-for-sleeping.png",
    caption: "sleep, doze, nap, snooze, snore, oversleep, rest, dream",
  },
  {
    id: "injury-vocabulary",
    title: "Injury Vocabulary",
    file: "injury-vocabulary.png",
    caption: "cut, burn, bruise, sprain, fracture, blister та ін.",
  },
  {
    id: "although-despite",
    title: "Although vs. Despite",
    file: "although-vs-despite.png",
    caption: "clause vs noun / -ing form",
  },
  {
    id: "more-everyday-actions",
    title: "More Everyday Actions",
    file: "more-everyday-actions.png",
    caption: "brush teeth, rinse, chop, iron, vacuum, mend, scoop…",
  },
  {
    id: "wh-questions",
    title: "WH Questions",
    file: "wh-questions.png",
    caption: "who, what, where, when, why, how, how many/much/old/often…",
  },
  {
    id: "fall-verbs",
    title: "Fall Down / Off / Over",
    file: "fall-down-off-over.png",
    caption: "різниця між fall down, fall off, fall over",
  },
  {
    id: "present-simple-hp",
    title: "Present Simple with Harry Potter",
    file: "present-simple-harry-potter.png",
    caption: "правила Present Simple + вправи з Harry Potter",
  },
] as const;

export default function ExtraResources() {
  return (
    <div className="page-shell">
      <div className="page-top-actions">
        <Link className="back-link back-home-btn" to="/lessons">
          ← Lessons
        </Link>
      </div>

      <header className="page-hero panel">
        <p className="page-kicker">Extra resources</p>
        <h1>Visual materials</h1>
        <p className="page-subtitle">
          Infographics and worksheets for vocabulary, grammar, and speaking
          practice.
        </p>
      </header>

      <section className="lessons-materials-grid">
        {visualMaterials.map((item) => (
          <figure className="lessons-material-card panel" key={item.id}>
            <img
              src={IMG(item.file)}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
