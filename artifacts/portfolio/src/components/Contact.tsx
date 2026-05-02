import { useState } from "react";

const links = [
  { label: "Email",       value: "technil6436@gmail.com",         href: "mailto:technil6436@gmail.com" },
  { label: "GitHub",      value: "github.com/nileshpatil6",        href: "https://github.com/nileshpatil6" },
  { label: "LinkedIn",    value: "linkedin.com/in/nileshpatil6",   href: "https://linkedin.com/in/nileshpatil6" },
  { label: "HuggingFace", value: "huggingface.co/Mr66",           href: "https://huggingface.co/Mr66" },
  { label: "Phone",       value: "+91 8431496045",                 href: "tel:+918431496045" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("technil6436@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 overflow-hidden">
      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto">

        {/* Big CTA headline */}
        <div className="mb-20">
          <p className="section-label mb-8">Let's talk</p>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--fg)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Got a project?
            <br />
            <strong style={{ fontStyle: "normal", fontWeight: 800 }}>Let's build it.</strong>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Open to freelance, collaborations, and full-time roles.
            Building remotely from Belgaum, Karnataka.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={copy}
              data-testid="button-copy-email"
              className="btn-primary"
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>
            <a href="mailto:technil6436@gmail.com" className="btn-outline">
              Send message →
            </a>
          </div>
        </div>

        {/* Links as editorial list */}
        <div>
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-testid={`link-contact-${link.label.toLowerCase()}`}
              className="group flex items-center justify-between py-5 transition-all duration-150"
              style={{
                borderTop: "1px solid var(--border-color)",
                borderBottom: i === links.length - 1 ? "1px solid var(--border-color)" : "none",
              }}
            >
              <div className="flex items-center gap-6">
                <span className="section-label w-24">{link.label}</span>
                <span
                  className="text-base font-medium transition-all duration-150 group-hover:translate-x-1"
                  style={{ color: "var(--fg)" }}
                >
                  {link.value}
                </span>
              </div>
              <span
                className="text-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ color: "var(--fg-subtle)" }}
              >
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="section-label">
            © {new Date().getFullYear()} Nilesh S. Patil · Belgaum, India
          </p>
          <p className="section-label">Built with React + Vite + Fraunces</p>
        </div>
      </div>
    </section>
  );
}
