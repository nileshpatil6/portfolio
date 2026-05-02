const achievements = [
  {
    index: "01",
    title: "8× Hackathon Winner",
    body: "GDG, CodeBharat (₹50K), ONEST (₹25K), and 5 more competitions.",
  },
  {
    index: "02",
    title: "NASA SpaceApps 1st Place",
    body: "Local round champion — competed globally with top engineers worldwide.",
  },
  {
    index: "03",
    title: "₹2L Government Funded",
    body: "NAIN 2.0 Grant by Govt. of Karnataka. Co-founded MediAssist AI for real patients.",
  },
  {
    index: "04",
    title: "IIT Bombay Internship",
    body: "Prestigious internship at India's premier technical institute.",
  },
  {
    index: "05",
    title: "7 Live Production Products",
    body: "TripOnBuddy, Unyfiny, CMN Services, Prasan Hom, AK Car Rentals, DataVerseAI, Text2DB.",
  },
  {
    index: "06",
    title: "Freelance — India, USA, Japan",
    body: "Clients across 3 countries. Real-world impact in multiple domains.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 px-6 md:px-16 overflow-hidden">
      <div className="divider mb-20" />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">05 / 05</span>
          <div className="w-8 h-px" style={{ background: "var(--border-color)" }} />
          <span className="section-label">Recognition</span>
        </div>

        <h2
          className="font-serif mb-16"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--fg)",
            lineHeight: 1.1,
          }}
        >
          The <strong style={{ fontStyle: "normal", fontWeight: 800 }}>receipts.</strong>
        </h2>

        {/* Timeline list — editorial style */}
        <div>
          {achievements.map((ach, i) => (
            <div
              key={ach.index}
              className="group flex gap-8 py-8 cursor-default transition-all duration-200"
              style={{
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <span
                className="font-mono flex-shrink-0 mt-0.5"
                style={{ fontSize: "0.65rem", color: "var(--fg-subtle)", letterSpacing: "0.1em", paddingTop: "0.1rem" }}
              >
                {ach.index}
              </span>
              <div className="flex-1">
                <h3
                  className="font-serif transition-all duration-200"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    fontWeight: 600,
                    color: "var(--fg)",
                    lineHeight: 1.2,
                  }}
                >
                  {ach.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {ach.body}
                </p>
              </div>
              <span
                className="self-center text-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "var(--fg-subtle)" }}
              >
                →
              </span>
            </div>
          ))}
          {/* Bottom border */}
          <div className="divider" />
        </div>

        {/* Education block */}
        <div
          className="mt-16 p-8 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ border: "1px solid var(--border-color)", background: "var(--bg-elevated)" }}
        >
          <div>
            <p className="section-label mb-2">Education</p>
            <h3
              className="font-serif text-2xl"
              style={{ color: "var(--fg)", fontWeight: 600 }}
            >
              B.E. in AI & Data Science
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
              S.G. Balekundari Institute of Technology · 2023 – 2027
            </p>
          </div>
          <span
            className="font-mono text-xs px-4 py-2 rounded-full flex-shrink-0"
            style={{
              border: "1px solid var(--border-color)",
              color: "var(--fg-muted)",
              background: "var(--bg)",
            }}
          >
            In Progress
          </span>
        </div>
      </div>
    </section>
  );
}
