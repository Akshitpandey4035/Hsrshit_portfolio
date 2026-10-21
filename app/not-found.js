import Link from "next/link";

export const metadata = { title: "NOT FOUND" };

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "120px 0" }}>
      <h1 className="project-title">Page not found</h1>
      <Link href="/" style={{ color: "var(--link)", fontWeight: 600 }}>
        BACK TO WORK
      </Link>
    </div>
  );
}
