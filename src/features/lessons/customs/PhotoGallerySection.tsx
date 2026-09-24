import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { IMG38 } from "../../../data/lesson38";
import "../../../styles/lesson38.css";

type GalleryImage = {
  id: string;
  file: string;
  emoji: string;
  caption: string;
  note?: string;
  alt?: string;
  wide?: boolean;
};

type Props = {
  images?: GalleryImage[];
  wideGrid?: boolean;
};

function PhotoCard({
  file,
  emoji,
  caption,
  note,
  alt,
  wide,
}: GalleryImage) {
  const [broken, setBroken] = useState(false);
  const label = alt ?? caption;

  return (
    <figure className={`l38-photo-card${wide ? " l38-photo-card--wide" : ""}`}>
      {broken ? (
        <div className="l38-photo-face">
          <span aria-hidden="true">{emoji}</span>
          <strong>{caption}</strong>
          {note ? <small>{note}</small> : null}
        </div>
      ) : (
        <img
          src={IMG38(file)}
          alt={label}
          onError={() => setBroken(true)}
        />
      )}
      <figcaption>
        {caption}
        {note ? ` · ${note}` : ""}
      </figcaption>
    </figure>
  );
}

/** Reusable photo grid for matching / profile exercises (L38+, Unit photos). */
export function PhotoGallerySection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const images = props.images ?? [];
  const wideGrid = props.wideGrid === true;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div
        className={`l38-photo-grid${wideGrid ? " l38-photo-grid--wide" : ""}`}
      >
        {images.map((img) => (
          <PhotoCard key={img.id} {...img} />
        ))}
      </div>
    </section>
  );
}
