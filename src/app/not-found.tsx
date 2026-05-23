import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="text-center">
        <p className="font-serif text-8xl" style={{ color: "var(--fg)" }}>404</p>
        <p className="mt-4 text-sm" style={{ color: "var(--fg-muted)" }}>Page not found</p>
        <Link href="/" className="mt-6 inline-block btn-outline">Go home</Link>
      </div>
    </div>
  );
}
