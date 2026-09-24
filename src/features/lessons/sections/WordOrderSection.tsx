import { useState } from "react";
import WordOrderBoard, {
  initWordOrderRows,
} from "../../../components/lesson31/WordOrderBoard";
import type { WordOrderSection as WordOrderType } from "../../../types/lesson";

export function WordOrderSection({ section }: { section: WordOrderType }) {
  const [rows, setRows] = useState(() => initWordOrderRows(section.items));
  const [checked, setChecked] = useState(false);

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="lw-word-order">
        <WordOrderBoard
          items={section.items}
          rows={rows}
          setRows={setRows}
          checked={checked}
          setChecked={setChecked}
        />
      </div>
    </section>
  );
}
