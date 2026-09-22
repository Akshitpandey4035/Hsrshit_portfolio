import { site } from "@/data/site";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="container contact">
      <p className="eyebrow">Contact</p>
      <h1 className="contact-heading">
        Have a project in mind?
        <br />
        <em>Let&apos;s talk.</em>
      </h1>
      <a className="contact-email" href={`mailto:${site.email}`}>
        {site.email} <span aria-hidden="true">→</span>
      </a>
      <ul className="contact-list">
        <li>
          <span className="eyebrow">Instagram</span>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            {site.instagram.replace(/^https?:\/\/(www\.)?/, "")} ↗
          </a>
        </li>
        <li>
          <span className="eyebrow">Location</span>
          <span>{site.location}</span>
        </li>
      </ul>
    </div>
  );
}
