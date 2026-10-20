import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import RichText from "@/components/RichText";
import WordsStagger from "@/components/WordsStagger";
import { projects, getProject } from "@/data/site";

// Projects that have their own page (noPage ones only appear on the home grid).
const pages = projects.filter((p) => !p.noPage);

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Not found" };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.noPage) notFound();

  const i = pages.indexOf(project);
  const prev = pages[(i - 1 + pages.length) % pages.length];
  const next = pages[(i + 1) % pages.length];

  return (
    <article className="container project">
      <header className="project-head">
        <h1 className="project-title">
          {project.titleHref ? (
            <a className="project-title-link hl hl-plain" href={project.titleHref} target="_blank" rel="noopener noreferrer">
              <WordsStagger by="letter" inView speed={0.7}>
                {project.title}
              </WordsStagger>
            </a>
          ) : (
            <WordsStagger by="letter" inView speed={0.7}>
              {project.title}
            </WordsStagger>
          )}
        </h1>
        <p className="project-sub">
          {project.category} · {project.year}
        </p>
      </header>

      <div
        className="project-presentation"
        style={{ "--video-w": `${project.videoWidth}px`, "--info-w": `${project.infoWidth}px` }}
      >
        <div
          className={`project-video${project.rounded ? " is-rounded" : ""}`}
          style={{ aspectRatio: project.aspect }}
        >
          {project.poster && project.externalHref ? (
            <a
              className="project-poster"
              href={project.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.poster} alt={project.title} />
            </a>
          ) : (
            <Media src={project.video} hue={project.hue} title={project.title} player />
          )}
        </div>

        <div className="project-info">
          <div className="project-desc">
            {project.description.map((para, n) => (
              <p key={n}>
                <RichText segments={para} />
              </p>
            ))}
          </div>
          <dl className="credits">
            {project.credits.map(([role, who]) => (
              <div key={role}>
                <dt>{role}</dt>
                <dd>{who}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <nav className="project-nav" aria-label="More work">
        <Link className="hl hl-plain" href={`/work/${prev.slug}`}>⟵ {prev.title}</Link>
        <Link className="hl hl-plain" href={`/work/${next.slug}`}>{next.title} ⟶</Link>
      </nav>
    </article>
  );
}
