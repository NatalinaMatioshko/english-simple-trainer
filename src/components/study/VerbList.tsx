import type { Verb } from "../../types/trainer";

type VerbListProps = {
  verbs: Verb[];
  revealedVerbs: string[];
  onToggleVerb: (base: string) => void;
};

export function VerbList({
  verbs,
  revealedVerbs,
  onToggleVerb,
}: VerbListProps) {
  return (
    <section className="panel">
      <h2>50 базових дієслів</h2>
      <p className="muted">
        Натисніть на картку, щоб побачити форму для he / she / it.
      </p>

      <div className="card-grid">
        {verbs.map((verb) => {
          const isShown = revealedVerbs.includes(verb.base);

          return (
            <button
              key={verb.base}
              className="verb-card"
              type="button"
              onClick={() => onToggleVerb(verb.base)}
            >
              <span className="base">{verb.base}</span>
              <span className="muted">{verb.ua}</span>
              {isShown && (
                <span className="heform">he / she / it: {verb.third}</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
