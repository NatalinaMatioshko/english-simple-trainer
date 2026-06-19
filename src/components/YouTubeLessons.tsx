import "../styles/lesson17.css";

type Video = {
  id: string;
  title: string;
  isShort?: boolean;
};

const videos: Video[] = [
  {
    id: "TY58Y2q5zDc",
    title: "YouTube Short",
    isShort: true,
  },
  {
    id: "4Q_SycFWuTs",
    title: "Lesson video",
  },
];

export default function YouTubeLessons() {
  return (
    <section className="video-stack">
      {videos.map((video) => {
        const src = video.isShort
          ? `https://www.youtube.com/embed/${video.id}`
          : `https://www.youtube.com/embed/${video.id}`;

        return (
          <article className="panel lesson-video-card" key={video.id}>
            <h2>{video.title}</h2>

            <div className={`video-wrap ${video.isShort ? "short-video" : ""}`}>
              <iframe
                src={src}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}
