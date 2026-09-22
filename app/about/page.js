import Roles from "@/components/Roles";
import { site } from "@/data/site";

export const metadata = { title: "About" };

export default function About() {
  return (
    <div className="container about">
      <figure className="about-portrait">
        {site.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={site.portrait} alt={`${site.name} portrait`} />
        ) : (
          <div className="about-portrait-empty">Portrait</div>
        )}
      </figure>

      <div className="about-text">
        <p className="eyebrow">About</p>
        <h1 className="about-title">{site.name}</h1>
        <Roles roles={site.roles} className="roles-left" />
        {site.about.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
