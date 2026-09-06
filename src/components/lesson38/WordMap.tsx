import { wordMapExtra } from "../../data/lesson38";
import "../../styles/lesson38.css";

type Bin = "colours" | "body";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  hub?: boolean;
  bin: Bin;
};

const HUBS: Record<Bin, { x: number; y: number }> = {
  colours: { x: 26, y: 50 },
  body: { x: 74, y: 50 },
};

const FIXED: Node[] = [
  { id: "hub-colours", label: "colours", x: 26, y: 50, hub: true, bin: "colours" },
  { id: "blue", label: "blue", x: 8, y: 18, bin: "colours" },
  { id: "brown", label: "brown", x: 6, y: 52, bin: "colours" },
  { id: "green", label: "green", x: 10, y: 84, bin: "colours" },
  { id: "hub-body", label: "the body", x: 74, y: 50, hub: true, bin: "body" },
  { id: "hair", label: "hair", x: 92, y: 18, bin: "body" },
  { id: "beard", label: "a beard", x: 58, y: 82, bin: "body" },
  { id: "eyes", label: "eyes", x: 92, y: 82, bin: "body" },
];

const EXTRA_SLOTS: Record<Bin, { x: number; y: number }[]> = {
  colours: [
    { x: 42, y: 22 },
    { x: 44, y: 50 },
    { x: 40, y: 80 },
  ],
  body: [
    { x: 56, y: 18 },
    { x: 54, y: 48 },
    { x: 62, y: 90 },
  ],
};

type Props = {
  pick: string | null;
  bins: Record<string, Bin>;
  playKey: number;
  onPickHub: (bin: Bin) => void;
};

export function WordMap({ pick, bins, playKey, onPickHub }: Props) {
  const extras: Node[] = wordMapExtra.flatMap((item) => {
    const bin = bins[item.word];
    if (!bin) return [];
    const used = wordMapExtra.filter((w) => bins[w.word] === bin);
    const slot = EXTRA_SLOTS[bin][used.indexOf(item)] ?? EXTRA_SLOTS[bin][0];
    return [
      {
        id: `extra-${item.word}`,
        label: item.word,
        x: slot.x,
        y: slot.y,
        bin,
      },
    ];
  });

  const nodes = [...FIXED, ...extras];
  const sats = nodes.filter((n) => !n.hub);

  return (
    <div className="l38-mind" key={playKey}>
      <svg
        className="l38-mind-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {sats.map((node, i) => {
          const hub = HUBS[node.bin];
          return (
            <line
              key={node.id}
              className={`l38-mind-line l38-tone-${toneOf(node.label)}`}
              x1={hub.x}
              y1={hub.y}
              x2={node.x}
              y2={node.y}
              style={{ animationDelay: `${0.12 + i * 0.1}s` }}
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => (
        <button
          key={node.id}
          type="button"
          className={`l38-node l38-tone-${toneOf(node.label)}${
            node.hub ? " l38-node--hub" : " l38-node--sat"
          }${node.hub && pick ? " is-target" : ""}`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${i * 0.11}s`,
          }}
          onClick={() => {
            if (node.hub) onPickHub(node.bin);
          }}
        >
          {node.label}
        </button>
      ))}
    </div>
  );
}

function toneOf(label: string): string {
  const key = label.toLowerCase().replace(/\s+/g, "-");
  if (
    [
      "colours",
      "the-body",
      "blue",
      "brown",
      "green",
      "red",
      "blonde",
      "grey",
      "hair",
      "eyes",
      "a-beard",
      "short",
      "long",
    ].includes(key)
  ) {
    return key;
  }
  return "mix";
}

