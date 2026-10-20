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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/haze-logo.png" alt={`${site.name} — work`} width="100" height="50" />
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
