import Roles from "@/components/Roles";
import RichText from "@/components/RichText";
import Signature from "@/components/Signature";
import WordsStagger from "@/components/WordsStagger";
import { site } from "@/data/site";

export const metadata = { title: "About" };

export default function About() {
  return (
    <div className="container about">
      <div className="about-head">
        <p className="eyebrow">About</p>
        <h1 className="about-title">
          <WordsStagger inView by="letter" speed={0.7}>
            Haze
          </WordsStagger>
        </h1>
      </div>

      <div className="about-roles">
        <Roles roles={site.roles.slice(0, 2)} className="roles-left" animate delay={0.35} />
        <Roles roles={site.roles.slice(2)} className="roles-left" animate delay={0.8} />
      </div>

      <figure className="about-portrait">
        {site.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={site.portrait} alt={`${site.name} portrait`} />
        ) : (
          <div className="about-portrait-empty" aria-hidden="true">
            <Signature className="about-signature" text="haze" color="#fff" fontSize={16} duration={1.1} inView />
          </div>
        )}
        <figcaption>
          <span className="eyebrow">#990000</span>
          <span className="about-caption">{site.portraitCaption}</span>
        </figcaption>
      </figure>

      <div className="about-bio">
        {site.about.map((para, i) => (
          <p key={i}>
            <RichText segments={para} />
          </p>
        ))}
      </div>
    </div>
  );
}
