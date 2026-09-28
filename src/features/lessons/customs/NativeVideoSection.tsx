import type { CustomSection } from "../../../types/lesson";

type VideoItem = {
  id: string;
  src: string;
  title?: string;
  caption?: string;
};

type Props = {
  videos?: VideoItem[];
};

/** Local MP4 (or other) videos with native HTML5 controls. */
export function NativeVideoSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as Props;
  const videos = props.videos ?? [];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      <div className="lw-native-videos">
        {videos.map((v, i) => (
          <figure key={v.id} className="lw-native-video">
            {v.title ? (
              <p className="lw-native-video-title">
                {i + 1}. {v.title}
              </p>
            ) : null}
            <video
              className="lw-native-video-el"
              src={v.src}
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
            {v.caption ? (
              <figcaption className="lw-native-video-cap">{v.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {section.note ? (
        <blockquote className="lw-note">
          <p>{section.note}</p>
        </blockquote>
      ) : null}
    </section>
  );
}
