import Link from "next/link";
import Media from "@/components/Media";
import Parallax from "@/components/Parallax";
import Roles from "@/components/Roles";
import { site, projects } from "@/data/site";

// Freeform scatter on a 24-column grid: [columns, top offset, parallax speed].
// All tiles share one grid row and are pushed down by their offset, so they
// can sit in each other's gaps. Every 6 more projects start a new block below.
// Speed: positive drifts slower than the scroll, negative faster (try -0.6 to 0.6).
const scatter = [
  ["1 / span 6", "0px", 0.35],
  ["9 / span 4", "150px", -0.4],
  ["14 / span 6", "30px", 0.55],
  ["21 / span 4", "260px", -0.3],
  ["4 / span 5", "470px", 0.45],
  ["13 / span 7", "440px", -0.5],
];

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="sr-only">{site.name}</h1>
        <Roles roles={site.roles} />
      </section>

      <Parallax as="section" className="grid" aria-label="Work">
        {projects.map((p, i) => {
          const [col, top, speed] = scatter[i % scatter.length];
          const rowNum = 1 + Math.floor(i / scatter.length);
          return (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="card"
            data-speed={speed}
            style={{ "--col": col, "--row": rowNum, "--top": top }}
          >
            <div className="card-media" style={{ aspectRatio: p.aspect }}>
              <Media src={p.thumb} hue={p.hue} title={p.title} />
            </div>
            <div className="card-meta">
              <span className="card-index">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="card-title">{p.title}</h2>
            </div>
          </Link>
          );
        })}
      </Parallax>
    </div>
  );
}
