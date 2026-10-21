import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

export const metadata = {
  // Tab title is just the page: WORK (home), ABOUT, CONTACT or the project title. Pages set their own.
  title: "WORK",
  description: `${site.name} — ${site.roles.join(", ")}`,
};

// Runs before paint so the saved/system theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
