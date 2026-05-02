import { type ProjectCategory } from "@/data/projects";

const palette = {
  "AI/Web":      { bg: "#e8f4f8", stroke: "#2563eb", accent: "#1e40af" },
  "AI/Mobile":   { bg: "#e8f8ef", stroke: "#16a34a", accent: "#15803d" },
  "Blockchain":  { bg: "#fdf3e7", stroke: "#d97706", accent: "#b45309" },
  "Freelance":   { bg: "#f3e8ff", stroke: "#7c3aed", accent: "#6d28d9" },
  "Enterprise":  { bg: "#f0f0ee", stroke: "#374151", accent: "#1f2937" },
  "AI/ML":       { bg: "#fef3f2", stroke: "#dc2626", accent: "#b91c1c" },
  "AI/RAG":      { bg: "#f0fdf4", stroke: "#0891b2", accent: "#0e7490" },
  "AI/Finance":  { bg: "#fffbeb", stroke: "#d97706", accent: "#92400e" },
};

const MockupWeb = ({ stroke, accent, bg }: { stroke: string; accent: string; bg: string }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill={bg} rx="6" />
    {/* Browser chrome */}
    <rect x="8" y="8" width="264" height="164" rx="4" fill="white" stroke={stroke} strokeOpacity="0.15" strokeWidth="1" />
    <rect x="8" y="8" width="264" height="22" rx="4" fill={stroke} fillOpacity="0.08" />
    <circle cx="22" cy="19" r="3.5" fill={stroke} fillOpacity="0.3" />
    <circle cx="33" cy="19" r="3.5" fill={stroke} fillOpacity="0.3" />
    <circle cx="44" cy="19" r="3.5" fill={stroke} fillOpacity="0.3" />
    <rect x="60" y="14" width="120" height="10" rx="5" fill={stroke} fillOpacity="0.1" />
    {/* Content */}
    <rect x="20" y="42" width="80" height="6" rx="3" fill={accent} fillOpacity="0.5" />
    <rect x="20" y="54" width="140" height="10" rx="3" fill={stroke} fillOpacity="0.15" />
    <rect x="20" y="70" width="100" height="8" rx="3" fill={stroke} fillOpacity="0.1" />
    <rect x="20" y="84" width="120" height="8" rx="3" fill={stroke} fillOpacity="0.08" />
    <rect x="20" y="100" width="60" height="22" rx="11" fill={accent} fillOpacity="0.9" />
    {/* Cards */}
    <rect x="140" y="42" width="60" height="80" rx="4" fill={stroke} fillOpacity="0.07" stroke={stroke} strokeOpacity="0.12" strokeWidth="1" />
    <rect x="148" y="50" width="44" height="28" rx="2" fill={stroke} fillOpacity="0.12" />
    <rect x="148" y="84" width="30" height="5" rx="2" fill={stroke} fillOpacity="0.2" />
    <rect x="148" y="93" width="44" height="4" rx="2" fill={stroke} fillOpacity="0.1" />
    <rect x="148" y="101" width="36" height="4" rx="2" fill={stroke} fillOpacity="0.1" />
    <rect x="208" y="42" width="56" height="80" rx="4" fill={stroke} fillOpacity="0.05" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <rect x="216" y="50" width="40" height="28" rx="2" fill={stroke} fillOpacity="0.08" />
    <rect x="216" y="84" width="26" height="5" rx="2" fill={stroke} fillOpacity="0.15" />
    {/* Bottom bar */}
    <rect x="8" y="148" width="264" height="24" fill={stroke} fillOpacity="0.04" />
    <rect x="20" y="155" width="50" height="5" rx="2" fill={stroke} fillOpacity="0.15" />
    <rect x="200" y="155" width="60" height="5" rx="2" fill={stroke} fillOpacity="0.1" />
  </svg>
);

const MockupMobile = ({ stroke, accent, bg }: { stroke: string; accent: string; bg: string }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill={bg} rx="6" />
    {/* Phone centered */}
    <rect x="95" y="10" width="90" height="160" rx="14" fill="white" stroke={stroke} strokeOpacity="0.2" strokeWidth="1.5" />
    <rect x="112" y="10" width="56" height="8" rx="4" fill={stroke} fillOpacity="0.15" />
    {/* Screen content */}
    <rect x="103" y="26" width="74" height="136" rx="6" fill={bg} />
    <rect x="111" y="34" width="58" height="6" rx="3" fill={accent} fillOpacity="0.5" />
    <rect x="111" y="44" width="44" height="4" rx="2" fill={stroke} fillOpacity="0.12" />
    <rect x="111" y="55" width="58" height="36" rx="4" fill={stroke} fillOpacity="0.1" />
    <rect x="111" y="55" width="58" height="36" rx="4" fill={stroke} fillOpacity="0.05" />
    <circle cx="140" cy="73" r="10" fill={accent} fillOpacity="0.2" />
    <rect x="111" y="98" width="26" height="18" rx="4" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.15" strokeWidth="0.8" />
    <rect x="143" y="98" width="26" height="18" rx="4" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.15" strokeWidth="0.8" />
    <rect x="111" y="122" width="58" height="6" rx="3" fill={stroke} fillOpacity="0.1" />
    <rect x="111" y="133" width="42" height="6" rx="3" fill={stroke} fillOpacity="0.07" />
    <rect x="111" y="145" width="58" height="12" rx="6" fill={accent} fillOpacity="0.8" />
    {/* Side decorations */}
    <circle cx="45" cy="60" r="25" fill={stroke} fillOpacity="0.04" />
    <circle cx="45" cy="60" r="15" fill={stroke} fillOpacity="0.04" />
    <circle cx="235" cy="120" r="20" fill={accent} fillOpacity="0.06" />
  </svg>
);

const MockupML = ({ stroke, accent, bg }: { stroke: string; accent: string; bg: string }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill={bg} rx="6" />
    {/* Neural network visualization */}
    {/* Nodes layer 1 */}
    {[45, 75, 105, 135].map((y, i) => (
      <circle key={i} cx="60" cy={y} r="10" fill="white" stroke={stroke} strokeWidth="1.5" strokeOpacity="0.5" />
    ))}
    {/* Nodes layer 2 */}
    {[55, 90, 125].map((y, i) => (
      <circle key={i} cx="140" cy={y} r="12" fill="white" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
    ))}
    {/* Nodes layer 3 */}
    {[65, 100, 135].map((y, i) => (
      <circle key={i} cx="220" cy={y} r="10" fill="white" stroke={stroke} strokeWidth="1.5" strokeOpacity="0.5" />
    ))}
    {/* Connections L1→L2 */}
    {[45,75,105,135].map((y1) =>
      [55,90,125].map((y2, j) => (
        <line key={`${y1}-${j}`} x1="70" y1={y1} x2="128" y2={y2} stroke={stroke} strokeWidth="0.6" strokeOpacity="0.2" />
      ))
    )}
    {/* Connections L2→L3 */}
    {[55,90,125].map((y1) =>
      [65,100,135].map((y2, j) => (
        <line key={`${y1}-${j}`} x1="152" y1={y1} x2="210" y2={y2} stroke={stroke} strokeWidth="0.6" strokeOpacity="0.2" />
      ))
    )}
    {/* Labels */}
    <text x="60" y="165" textAnchor="middle" fontSize="8" fill={stroke} fillOpacity="0.4" fontFamily="monospace">Input</text>
    <text x="140" y="165" textAnchor="middle" fontSize="8" fill={stroke} fillOpacity="0.4" fontFamily="monospace">Hidden</text>
    <text x="220" y="165" textAnchor="middle" fontSize="8" fill={stroke} fillOpacity="0.4" fontFamily="monospace">Output</text>
    {/* Accent highlight */}
    <circle cx="140" cy="90" r="12" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="2" />
  </svg>
);

const MockupBlockchain = ({ stroke, accent, bg }: { stroke: string; accent: string; bg: string }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill={bg} rx="6" />
    {/* Chain of blocks */}
    {[20, 90, 160, 230].map((x, i) => (
      <g key={i}>
        <rect x={x} y="65" width="50" height="50" rx="4" fill="white" stroke={stroke} strokeWidth="1.5" strokeOpacity="0.4" />
        <text x={x + 25} y="86" textAnchor="middle" fontSize="7" fill={stroke} fillOpacity="0.4" fontFamily="monospace">BLOCK</text>
        <text x={x + 25} y="97" textAnchor="middle" fontSize="8" fontWeight="bold" fill={accent} fillOpacity="0.7" fontFamily="monospace">{`#${i}`}</text>
        <rect x={x + 8} y="103" width="34" height="4" rx="2" fill={stroke} fillOpacity="0.15" />
        <rect x={x + 8} y="111" width="24" height="4" rx="2" fill={stroke} fillOpacity="0.1" />
        {i < 3 && <line x1={x + 50} y1="90" x2={x + 90} y2="90" stroke={stroke} strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 2" />}
      </g>
    ))}
    {/* Hash display */}
    <rect x="20" y="130" width="240" height="30" rx="4" fill={stroke} fillOpacity="0.05" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <text x="32" y="149" fontSize="8" fill={stroke} fillOpacity="0.5" fontFamily="monospace">0x3f8a…c4d2</text>
    {/* Top label */}
    <rect x="20" y="20" width="80" height="22" rx="11" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.2" strokeWidth="1" />
    <text x="60" y="35" textAnchor="middle" fontSize="9" fill={accent} fontFamily="monospace">Blockchain</text>
  </svg>
);

const MockupEnterprise = ({ stroke, accent, bg }: { stroke: string; accent: string; bg: string }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill={bg} rx="6" />
    {/* Sidebar */}
    <rect x="8" y="8" width="60" height="164" rx="4" fill={stroke} fillOpacity="0.06" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <rect x="18" y="20" width="40" height="8" rx="4" fill={stroke} fillOpacity="0.2" />
    {[40, 56, 72, 88, 104].map((y, i) => (
      <rect key={i} x="16" y={y} width={i === 0 ? 44 : 36} height="10" rx="5" fill={accent} fillOpacity={i === 0 ? 0.3 : 0.1} />
    ))}
    {/* Main area */}
    <rect x="76" y="8" width="196" height="44" rx="4" fill="white" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <rect x="86" y="18" width="60" height="8" rx="4" fill={stroke} fillOpacity="0.15" />
    <rect x="86" y="30" width="40" height="6" rx="3" fill={stroke} fillOpacity="0.08" />
    {/* Stats row */}
    {[76, 142, 208].map((x, i) => (
      <rect key={i} x={x} y="60" width="60" height="44" rx="4" fill="white" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    ))}
    {[76, 142, 208].map((x, i) => (
      <g key={i}>
        <rect x={x + 10} y="70" width="30" height="6" rx="3" fill={accent} fillOpacity="0.3" />
        <rect x={x + 10} y="82" width="40" height="8" rx="3" fill={stroke} fillOpacity="0.12" />
        <rect x={x + 10} y="94" width="24" height="5" rx="2" fill={stroke} fillOpacity="0.07" />
      </g>
    ))}
    {/* Table */}
    <rect x="76" y="112" width="196" height="60" rx="4" fill="white" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <rect x="76" y="112" width="196" height="18" rx="4" fill={stroke} fillOpacity="0.06" />
    {[0,1,2].map((i) => (
      <g key={i}>
        <rect x="86" y={134 + i * 12} width="50" height="6" rx="3" fill={stroke} fillOpacity="0.1" />
        <rect x="148" y={134 + i * 12} width="36" height="6" rx="3" fill={stroke} fillOpacity="0.07" />
        <rect x="218" y={134 + i * 12} width="42" height="6" rx="3" fill={i === 0 ? accent : stroke} fillOpacity={i === 0 ? 0.3 : 0.07} />
      </g>
    ))}
  </svg>
);

const MockupFinance = ({ stroke, accent, bg }: { stroke: string; accent: string; bg: string }) => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="180" fill={bg} rx="6" />
    {/* Chart area */}
    <rect x="16" y="16" width="248" height="100" rx="6" fill="white" stroke={stroke} strokeOpacity="0.12" strokeWidth="1" />
    {/* Chart line */}
    <polyline
      points="28,95 55,80 82,88 109,65 136,70 163,45 190,55 217,35 244,28"
      fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.7" strokeLinejoin="round"
    />
    <polyline
      points="28,95 55,80 82,88 109,65 136,70 163,45 190,55 217,35 244,28 244,100 28,100"
      fill={accent} fillOpacity="0.07"
      stroke="none"
    />
    {/* Grid lines */}
    {[30, 55, 80].map((y, i) => (
      <line key={i} x1="28" y1={y} x2="250" y2={y} stroke={stroke} strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="4 3" />
    ))}
    {/* Stats */}
    <rect x="16" y="126" width="76" height="38" rx="4" fill="white" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <rect x="98" y="126" width="76" height="38" rx="4" fill="white" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    <rect x="180" y="126" width="84" height="38" rx="4" fill="white" stroke={stroke} strokeOpacity="0.1" strokeWidth="1" />
    {[24, 106, 188].map((x, i) => (
      <g key={i}>
        <rect x={x} y="134" width="30" height="6" rx="3" fill={accent} fillOpacity="0.3" />
        <rect x={x} y="146" width="50" height="8" rx="3" fill={stroke} fillOpacity="0.12" />
      </g>
    ))}
  </svg>
);

const mockupComponents: Record<ProjectCategory, React.FC<{ stroke: string; accent: string; bg: string }>> = {
  "AI/Web":     MockupWeb,
  "AI/Mobile":  MockupMobile,
  "Blockchain": MockupBlockchain,
  "Freelance":  MockupWeb,
  "Enterprise": MockupEnterprise,
  "AI/ML":      MockupML,
  "AI/RAG":     MockupML,
  "AI/Finance": MockupFinance,
};

interface ProjectMockupProps {
  category: ProjectCategory;
  className?: string;
}

export default function ProjectMockup({ category, className = "" }: ProjectMockupProps) {
  const colors = palette[category] || palette["AI/Web"];
  const Component = mockupComponents[category] || MockupWeb;
  return (
    <div className={`overflow-hidden rounded-md ${className}`} style={{ background: colors.bg }}>
      <Component stroke={colors.stroke} accent={colors.accent} bg={colors.bg} />
    </div>
  );
}
