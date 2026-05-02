import { motion } from "framer-motion";

const achievements = [
  {
    title: "8x Hackathon Winner",
    items: [
      "GDG (Google Developer Group)",
      "CodeBharat — Rs.50,000 prize",
      "ONEST — Rs.25,000 prize",
      "And 5 more competitions",
    ],
    color: "#f59e0b",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b22" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "NASA SpaceApps 1st Place",
    items: [
      "Local Round Champion",
      "Competed globally with top engineers",
      "Built a real-world space technology solution",
    ],
    color: "#00d4ff",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="1.5" fill="#00d4ff11" />
        <path d="M12 2C12 2 8 8 8 12s4 10 4 10" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
        <path d="M2 12h20" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
        <path d="M4.93 4.93C4.93 4.93 8 8 8 12s-3.07 7.07-3.07 7.07" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
        <path d="M19.07 4.93C19.07 4.93 16 8 16 12s3.07 7.07 3.07 7.07" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
        <circle cx="12" cy="12" r="2" fill="#00d4ff" />
      </svg>
    ),
  },
  {
    title: "Rs.2L Government Funding",
    items: [
      "NAIN 2.0 Grant — Govt. of Karnataka",
      "Co-founded MediAssist AI",
      "Dual healthcare app serving real patients",
    ],
    color: "#00ff88",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="14" rx="2" stroke="#00ff88" strokeWidth="1.5" fill="#00ff8811" />
        <path d="M2 10h20" stroke="#00ff88" strokeWidth="1.5" />
        <circle cx="8" cy="15" r="1.5" fill="#00ff88" />
        <rect x="12" y="14" width="6" height="2" rx="1" fill="#00ff8866" />
      </svg>
    ),
  },
  {
    title: "IIT Bombay Internship",
    items: [
      "India's premier technical institute",
      "Completed prestigious internship",
      "One of India's top engineering programs",
    ],
    color: "#7c3aed",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#7c3aed" strokeWidth="1.5" fill="#7c3aed11" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="#7c3aed" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Live Production Products",
    items: [
      "TripOnBuddy — AI travel, live users",
      "Unyfiny, CMN Services, Prasan Hom",
      "AK Car Rentals, DataVerseAI, Text2DB",
    ],
    color: "#f472b6",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f472b6" strokeWidth="1.5" fill="#f472b611" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Freelance — 3 Countries",
    items: [
      "Clients in India, USA, Japan",
      "Real estate diagnostics (Next.js)",
      "Restaurant booking automation (Go)",
    ],
    color: "#34d399",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#34d399" strokeWidth="1.5" fill="#34d39911" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#34d399" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Pulsing dots grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00d4ff]"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 33}%`,
              opacity: 0.15 + (i % 3) * 0.1,
              animation: `pulse ${2 + (i % 3)}s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-px bg-[#00d4ff]" />
          <span className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase">Achievements</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          The <span className="gradient-text-blue">receipts.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#a0aec0] mb-16 max-w-2xl"
        >
          Not just claiming it — got the prizes, the funding, and the internship letter to prove it.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative p-6 rounded-2xl border border-[#1e1e2e] bg-[#111118] overflow-hidden group cursor-none transition-all duration-300"
              style={{ "--ach-color": ach.color } as React.CSSProperties}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top left, ${ach.color}08 0%, transparent 60%)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }}
              />

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-2.5 rounded-xl flex-shrink-0"
                  style={{ background: `${ach.color}10`, border: `1px solid ${ach.color}25` }}
                >
                  {ach.icon}
                </div>
                <h3 className="text-white font-bold text-base leading-tight pt-1">{ach.title}</h3>
              </div>

              <ul className="space-y-2">
                {ach.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#a0aec0]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ach.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Education block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl border border-[#7c3aed]/30 bg-gradient-to-br from-[#7c3aed]/5 to-transparent"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[#7c3aed] font-mono text-xs uppercase tracking-widest mb-2">Education</div>
              <h3 className="text-white text-xl font-bold">B.E. in Artificial Intelligence & Data Science</h3>
              <p className="text-[#a0aec0] mt-1">S.G. Balekundari Institute of Technology &nbsp;·&nbsp; 2023 – 2027</p>
            </div>
            <div className="flex-shrink-0 px-4 py-2 border border-[#7c3aed]/30 rounded-xl font-mono text-sm text-[#7c3aed] bg-[#7c3aed]/5">
              In Progress
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
