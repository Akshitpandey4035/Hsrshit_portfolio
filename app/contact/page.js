import { site } from "@/data/site";
import GradientWaveText from "@/components/GradientWaveText";

export const metadata = { title: "CONTACT" };

export default function Contact() {
  return (
    <div className="container contact">
      <p className="contact-label">Contact</p>
      <h1 className="contact-heading">Inquiries</h1>
      <div className="contact-row">
        <a className="contact-email" href={`mailto:${site.email}?subject=Project%20inquiry`}>
          <GradientWaveText speed={1.5} playOnHover>{site.email}</GradientWaveText>
        </a>
        <svg className="contact-arrow" width="14" height="14" viewBox="0 0 13.5684 13.5684" fill="none" aria-hidden="true">
          <path
            d="M13.5684 13.0684C13.5681 13.3442 13.3442 13.5682 13.0684 13.5684C12.7925 13.5683 12.5686 13.3442 12.5684 13.0684V1.70703L0.853516 13.4219C0.65831 13.6168 0.341676 13.6168 0.146484 13.4219C-0.0486032 13.2266 -0.0486917 12.9091 0.146484 12.7139L11.8613 1H0.5C0.223947 0.999894 0 0.776077 0 0.5C7.05534e-05 0.223983 0.223991 0.000105584 0.5 0H13.5684V13.0684Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
