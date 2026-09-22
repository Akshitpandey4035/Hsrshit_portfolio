"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Work", match: (p) => p === "/" || p.startsWith("/work") },
  { href: "/about", label: "About", match: (p) => p === "/about" },
  { href: "/contact", label: "Contact", match: (p) => p === "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden="true" />
          {site.logo}
        </Link>

        <div className="header-right">
          <nav className="nav" aria-label="Site">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${l.match(pathname) ? "active" : ""}`}
                aria-current={l.match(pathname) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
