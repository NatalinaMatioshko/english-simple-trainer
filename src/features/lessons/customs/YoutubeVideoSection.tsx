import type { CustomSection } from "../../../types/lesson";

type YoutubeProps = {
  videoId?: string;
  iframeTitle?: string;
};

export function YoutubeVideoSection({ section }: { section: CustomSection }) {
  const props = (section.props ?? {}) as YoutubeProps;
  const videoId = props.videoId ?? "";
  const title = props.iframeTitle ?? section.title;

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? (
          <p className="lw-section-desc">{section.description}</p>
        ) : null}
      </div>
      {videoId ? (
        <div className="lw-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="lw-section-desc">Missing videoId in section props.</p>
      )}
      {section.note ? (
        <blockquote className="lw-note">
          <p>{section.note}</p>
        </blockquote>
      ) : null}
    </section>
  );
}
