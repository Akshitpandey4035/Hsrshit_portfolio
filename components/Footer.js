import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-social">
          <a className="hl hl-plain" href={site.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a className="hl hl-plain" href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
        <a className="footer-email hl hl-plain" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
    </footer>
  );
}
