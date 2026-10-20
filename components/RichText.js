// Renders a paragraph made of segments: plain strings, or { t, b?, href? } (see data/site.js).
export default function RichText({ segments }) {
  return segments.map((s, i) => {
    if (typeof s === "string") return s;
    const text = s.b ? <strong>{s.t}</strong> : s.t;
    return s.href ? (
      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="rich-link hl">
        {text}
      </a>
    ) : (
      <span key={i}>{text}</span>
    );
  });
}
