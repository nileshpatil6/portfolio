import { motion } from "framer-motion";
import { useState } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "technil6436@gmail.com",
    href: "mailto:technil6436@gmail.com",
    color: "#00d4ff",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/nileshpatil6",
    href: "https://github.com/nileshpatil6",
    color: "#e2e8f0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/nileshpatil6",
    href: "https://linkedin.com/in/nileshpatil6",
    color: "#0a66c2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "HuggingFace",
    value: "huggingface.co/Mr66",
    href: "https://huggingface.co/Mr66",
    color: "#f59e0b",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 8431496045",
    href: "tel:+918431496045",
    color: "#00ff88",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
];

function CircuitLines() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <path d="M0 200 H100 V100 H300 V150 H500 V50 H700 V200 H800" stroke="#00d4ff" strokeWidth="1" fill="none" />
      <path d="M0 300 H150 V250 H350 V300 H600 V200 H800" stroke="#7c3aed" strokeWidth="1" fill="none" />
      <path d="M100 400 V300 H200 V350 H400 V300 H500 V400" stroke="#00ff88" strokeWidth="1" fill="none" />
      <circle cx="100" cy="200" r="3" fill="#00d4ff" />
      <circle cx="300" cy="100" r="3" fill="#00d4ff" />
      <circle cx="500" cy="150" r="3" fill="#00d4ff" />
      <circle cx="700" cy="50" r="3" fill="#00d4ff" />
      <circle cx="350" cy="300" r="3" fill="#7c3aed" />
      <circle cx="600" cy="200" r="3" fill="#7c3aed" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("technil6436@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <CircuitLines />

      {/* Glow orbs */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#00d4ff]/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-[#7c3aed]/8 rounded-full blur-[80px]" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-[#00d4ff]" />
          <span className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase">Contact</span>
          <div className="w-8 h-px bg-[#00d4ff]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          Let's build something{" "}
          <span className="glitch-text gradient-text-blue" data-text="insane.">
            insane.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#a0aec0] text-lg mb-12 max-w-xl mx-auto"
        >
          Open to freelance projects, collaborations, and full-time roles.
          Based in Belgaum, Karnataka — building remotely everywhere.
        </motion.p>

        {/* Quick copy email */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,212,255,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={copyEmail}
          data-testid="button-copy-email"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-[#0a0a0f] font-bold text-sm rounded-full mb-12 transition-all cursor-none"
        >
          {copied ? (
            <>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy Email Address
            </>
          )}
        </motion.button>

        {/* Links grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-testid={`link-contact-${link.label.toLowerCase()}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: link.color }}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#1e1e2e] bg-[#111118] group transition-all cursor-none"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                style={{ color: link.color, background: `${link.color}12`, border: `1px solid ${link.color}25` }}
              >
                {link.icon}
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-mono text-[#a0aec0] mb-0.5">{link.label}</div>
                <div className="text-white text-sm font-medium truncate group-hover:text-[#00d4ff] transition-colors">
                  {link.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-[#a0aec0]/50 text-sm font-mono"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Belgaum, Karnataka, India
        </motion.div>
      </div>
    </section>
  );
}
