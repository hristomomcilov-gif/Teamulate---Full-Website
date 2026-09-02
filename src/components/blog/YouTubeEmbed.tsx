type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

/** 16:9 YouTube embed. Playback starts only when the visitor presses play. */
export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="overflow-hidden rounded-(--tm-radius-md) border border-line bg-navy-950 shadow-card">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
