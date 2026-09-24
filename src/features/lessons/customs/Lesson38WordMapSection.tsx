import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { WordMap } from "../../../components/lesson38/WordMap";
import "../../../styles/lesson25.css";
import "../../../styles/lesson38.css";

type Bin = "colours" | "body";
type Extra = { word: string; bin: Bin };
type Fixed = { colours: readonly string[]; body: readonly string[] };

type Props = {
  fixed?: Fixed;
  extras?: readonly Extra[];
};

export function Lesson38WordMapSection({
  section,
}: {
  section: CustomSection;
}) {
  const props = (section.props ?? {}) as Props;
  const extras = props.extras ?? [];
  const fixed = props.fixed ?? { colours: [], body: [] };

  const [pick, setPick] = useState<string | null>(null);
  const [bins, setBins] = useState<Record<string, Bin>>({});
  const [checked, setChecked] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const score = extras.filter((item) => bins[item.word] === item.bin).length;

  const putMap = (bin: Bin) => {
    if (!pick) return;
    setChecked(false);
    setBins((prev) => ({ ...prev, [pick]: bin }));
    setPick(null);
  };

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="l38-wordmap-wrap">
        <WordMap
          pick={pick}
          bins={bins}
          playKey={playKey}
          onPickHub={putMap}
          fixed={fixed}
          extras={extras}
        />
      </div>
      <div className="l38-chip-bank">
        {extras.map((item) => (
          <button
            key={item.word}
            type="button"
            className={`l38-chip${pick === item.word ? " is-on" : ""}${
              bins[item.word] ? " is-used" : ""
            }`}
            onClick={() => setPick(item.word)}
          >
            {item.word}
          </button>
        ))}
      </div>
      <div className="lw-actions">
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => setPlayKey((n) => n + 1)}
        >
          Play animation
        </button>
        <button
          type="button"
          className="lw-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked ? (
          <span className="lw-muted">
            {score} / {extras.length}
          </span>
        ) : null}
        <button
          type="button"
          className="lw-mini-btn"
          onClick={() => {
            setBins({});
            setPick(null);
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
