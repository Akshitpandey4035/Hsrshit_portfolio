import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {site.logo}</span>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">
          Instagram ↗
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </footer>
  );
}
