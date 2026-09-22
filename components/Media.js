const VIDEO_EXT = /\.(mp4|webm|mov)$/i;
const EMBED = /(youtube\.com|youtu\.be|vimeo\.com)/i;

export function Placeholder({ hue = 200, label = "Video placeholder" }) {
  return (
    <div
      className="placeholder"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 22%), hsl(${(hue + 40) % 360} 55% 38%))`,
      }}
    >
      {label}
    </div>
  );
}

// Looping, muted preview (home grid) or full player (project page).
export default function Media({ src, hue, title, player = false }) {
  if (!src) return <Placeholder hue={hue} label={player ? "Video placeholder" : "Preview"} />;

  if (EMBED.test(src)) {
    return (
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (VIDEO_EXT.test(src)) {
    return player ? (
      <video src={src} controls playsInline preload="metadata" />
    ) : (
      <video src={src} autoPlay muted loop playsInline preload="auto" />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={title} loading="lazy" />;
}
