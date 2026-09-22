import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import { projects, getProject } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Not found" };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="container project">
      <header className="project-head">
        <span className="card-index">{String(i + 1).padStart(2, "0")}</span>
        <h1 className="project-title">{project.title}</h1>
        <p className="project-sub">
          {project.category} · {project.year}
        </p>
      </header>

      <div
        className="project-video"
        style={{ "--ar": project.aspect.split("/").reduce((w, h) => w / h), aspectRatio: project.aspect }}
      >
        <Media src={project.video} hue={project.hue} title={project.title} player />
      </div>

      <div className="project-body">
        <p className="project-desc">{project.description}</p>
        <dl className="credits">
          {project.credits.map(([role, who]) => (
            <div key={role}>
              <dt>{role}</dt>
              <dd>{who}</dd>
            </div>
          ))}
        </dl>
      </div>

      <nav className="project-nav" aria-label="More work">
        <Link href={`/work/${prev.slug}`}>← {prev.title}</Link>
        <Link href={`/work/${next.slug}`}>{next.title} →</Link>
      </nav>
    </article>
  );
}
