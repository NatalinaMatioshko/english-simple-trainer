import { useState } from "react";
import type { CustomSection } from "../../../types/lesson";
import { IMG38 } from "../../../data/lesson38";
import "../../../styles/lesson38.css";

type GalleryImage = {
  id: string;
  /** Legacy L38: filename under images/lesson38/ */
  file?: string;
  /** Full URL (preferred for other lessons) */
  src?: string;
  emoji?: string;
  caption: string;
  note?: string;
  alt?: string;
  wide?: boolean;
  /** `contain` = show full image (menus); default cover crops to fill */
  fit?: "cover" | "contain";
};

type Props = {
  images?: GalleryImage[];
  wideGrid?: boolean;
  /** Smaller cards that do not stretch to full panel width */
  compact?: boolean;
};

function resolveSrc(img: GalleryImage): string | undefined {
  if (img.src) return img.src;
  if (img.file) return IMG38(img.file);
  return undefined;
}

function PhotoCard({
  file,
  src,
  emoji = "📷",
  caption,
  note,
  alt,
  wide,
  fit = "cover",
}: GalleryImage) {
  const [broken, setBroken] = useState(false);
  const label = alt ?? caption;
  const url = resolveSrc({ id: "", file, src, caption });
  const classes = [
    "l38-photo-card",
    wide ? "l38-photo-card--wide" : "",
    fit === "contain" ? "l38-photo-card--contain" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={classes}>
      {broken || !url ? (
        <div className="l38-photo-face">
          <span aria-hidden="true">{emoji}</span>
          <strong>{caption}</strong>
          {note ? <small>{note}</small> : null}
        </div>
      ) : (
        <img
          src={url}
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
  const compact = props.compact === true;
  const gridClass = [
    "l38-photo-grid",
    wideGrid ? "l38-photo-grid--wide" : "",
    compact ? "l38-photo-grid--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className={gridClass}>
        {images.map((img) => (
          <PhotoCard key={img.id} {...img} />
        ))}
      </div>
    </section>
  );
}
