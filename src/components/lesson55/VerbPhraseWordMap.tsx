import "../../styles/lesson55-wordmap.css";

export type WordMapPhrase = {
  text: string;
  x: number;
  y: number;
};

export type WordMapHub = {
  id: string;
  number: number;
  verb: string;
  x: number;
  y: number;
  phrases: readonly WordMapPhrase[];
};

type Props = {
  hubs: readonly WordMapHub[];
};

/** SB 8A · Ex.2a — read-only verb phrase word map (five hubs). */
export function VerbPhraseWordMap({ hubs }: Props) {
  const lines = hubs.flatMap((hub) =>
    hub.phrases.map((p) => ({
      id: `${hub.id}-${p.text}`,
      x1: hub.x,
      y1: hub.y,
      x2: p.x,
      y2: p.y,
    })),
  );

  return (
    <div className="l55-wordmap" role="img" aria-label="Verb phrase word map">
      <svg
        className="l55-wordmap-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {lines.map((ln) => (
          <line
            key={ln.id}
            className="l55-wordmap-line"
            x1={ln.x1}
            y1={ln.y1}
            x2={ln.x2}
            y2={ln.y2}
          />
        ))}
      </svg>
      {hubs.map((hub) => (
        <div
          key={hub.id}
          className="l55-wordmap-hub"
          style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
        >
          <span className="l55-wordmap-num">{hub.number}</span>
          <span className="l55-wordmap-verb">{hub.verb}</span>
        </div>
      ))}
      {hubs.flatMap((hub) =>
        hub.phrases.map((p) => (
          <span
            key={`${hub.id}-${p.text}`}
            className="l55-wordmap-label"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.text}
          </span>
        )),
      )}
    </div>
  );
}
