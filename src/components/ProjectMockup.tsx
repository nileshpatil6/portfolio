"use client";
import { type Project } from "@/data/projects";

/* ─── Per-project SVG illustrations ─────────────────── */

const TripOnBuddy = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#0a1628" />
    {/* Map grid */}
    {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*65} x2="400" y2={i*65} stroke="#1a3a5c" strokeWidth="0.5" />)}
    {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={i*80} y1="0" x2={i*80} y2="260" stroke="#1a3a5c" strokeWidth="0.5" />)}
    {/* Flight path */}
    <path d="M 60 200 Q 140 80 200 100 Q 260 120 340 60" stroke="#00d4ff" strokeWidth="2" strokeDasharray="8 4" fill="none" opacity="0.8" />
    {/* Plane icon */}
    <g transform="translate(330, 52) rotate(-30)">
      <polygon points="0,-8 5,6 0,3 -5,6" fill="#00d4ff" />
    </g>
    {/* Location pins */}
    <circle cx="60" cy="200" r="8" fill="#00d4ff" opacity="0.9" />
    <circle cx="60" cy="200" r="4" fill="white" />
    <circle cx="200" cy="100" r="6" fill="#00aaff" opacity="0.7" />
    <circle cx="340" cy="60" r="10" fill="#00d4ff" />
    <circle cx="340" cy="60" r="5" fill="white" />
    {/* Info card */}
    <rect x="240" y="170" width="140" height="70" rx="8" fill="#0f2a4a" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1" />
    <rect x="252" y="183" width="60" height="6" rx="3" fill="#00d4ff" fillOpacity="0.7" />
    <rect x="252" y="196" width="116" height="4" rx="2" fill="#4a8fa8" fillOpacity="0.5" />
    <rect x="252" y="206" width="90" height="4" rx="2" fill="#4a8fa8" fillOpacity="0.35" />
    <rect x="252" y="220" width="50" height="14" rx="7" fill="#00d4ff" fillOpacity="0.9" />
    {/* Stars rating */}
    {[0,1,2,3,4].map(i => <polygon key={i} points={`${310+i*12},183 ${312+i*12},189 ${318+i*12},189 ${313+i*12},193 ${315+i*12},199 ${310+i*12},195 ${305+i*12},199 ${307+i*12},193 ${302+i*12},189 ${308+i*12},189`} fill="#f59e0b" opacity="0.8" transform={`scale(0.5) translate(${310+i*12}, 180)`} />)}
    {/* Title */}
    <text x="20" y="30" fontSize="14" fontWeight="bold" fill="#00d4ff" fontFamily="monospace">TripOnBuddy</text>
    <text x="20" y="48" fontSize="9" fill="#4a8fa8" fontFamily="monospace">AI Travel Planning · triponbuddy.in</text>
  </svg>
);

const MediAssistAI = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#071a12" />
    {/* ECG line */}
    <polyline points="0,130 60,130 80,130 90,80 100,170 115,60 130,200 145,130 400,130"
      stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.6" />
    {/* Phone silhouette */}
    <rect x="160" y="20" width="80" height="140" rx="12" fill="#0d2b1e" stroke="#00ff88" strokeOpacity="0.5" strokeWidth="1.5" />
    <rect x="170" y="35" width="60" height="110" rx="6" fill="#071a12" />
    {/* Medical cross on screen */}
    <rect x="192" y="65" width="16" height="50" rx="3" fill="#00ff88" fillOpacity="0.8" />
    <rect x="178" y="79" width="44" height="16" rx="3" fill="#00ff88" fillOpacity="0.8" />
    {/* Pulse data */}
    <rect x="170" y="115" width="30" height="4" rx="2" fill="#00ff88" fillOpacity="0.3" />
    <rect x="170" y="123" width="20" height="4" rx="2" fill="#00ff88" fillOpacity="0.2" />
    {/* Govt badge */}
    <rect x="20" y="170" width="160" height="70" rx="8" fill="#0d2b1e" stroke="#00ff88" strokeOpacity="0.35" strokeWidth="1" />
    <text x="32" y="192" fontSize="8" fill="#00ff88" fontFamily="monospace" opacity="0.6">GOVT. OF KARNATAKA</text>
    <text x="32" y="208" fontSize="13" fontWeight="bold" fill="#00ff88" fontFamily="monospace">₹2L NAIN 2.0</text>
    <text x="32" y="224" fontSize="8" fill="#00cc66" fontFamily="monospace">Funded & Approved</text>
    {/* AI waves */}
    {[0,1,2].map(i => <circle key={i} cx="280" cy="130" r={30+i*25} stroke="#00ff88" strokeWidth="0.8" fill="none" strokeOpacity={0.15-i*0.04} />)}
    <circle cx="280" cy="130" r="12" fill="#00ff88" fillOpacity="0.2" />
    <circle cx="280" cy="130" r="5" fill="#00ff88" />
    <text x="270" y="185" fontSize="8" fill="#00ff88" fontFamily="monospace" opacity="0.5">AI Voice</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00ff88" fontFamily="monospace">MediAssist AI</text>
    <text x="20" y="42" fontSize="9" fill="#00aa55" fontFamily="monospace">Healthcare · Whisper + GPT-4o</text>
  </svg>
);

const YuktiAI = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#0e0818" />
    {/* Molecule */}
    <circle cx="200" cy="120" r="14" fill="#7c3aed" fillOpacity="0.8" />
    <circle cx="150" cy="80" r="10" fill="#9d5cff" fillOpacity="0.7" />
    <circle cx="250" cy="80" r="10" fill="#9d5cff" fillOpacity="0.7" />
    <circle cx="140" cy="155" r="10" fill="#6d28d9" fillOpacity="0.7" />
    <circle cx="260" cy="155" r="10" fill="#6d28d9" fillOpacity="0.7" />
    <circle cx="200" cy="60" r="8" fill="#a855f7" fillOpacity="0.6" />
    <line x1="200" y1="120" x2="150" y2="80" stroke="#7c3aed" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="200" y1="120" x2="250" y2="80" stroke="#7c3aed" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="200" y1="120" x2="140" y2="155" stroke="#7c3aed" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="200" y1="120" x2="260" y2="155" stroke="#7c3aed" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="200" y1="120" x2="200" y2="60" stroke="#7c3aed" strokeWidth="2" strokeOpacity="0.6" />
    {/* Lab flask */}
    <path d="M 310 140 L 295 110 L 295 90 L 325 90 L 325 110 L 340 140 Z" stroke="#7c3aed" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.15" />
    <rect x="305" y="88" width="10" height="4" rx="2" fill="#a855f7" fillOpacity="0.5" />
    <ellipse cx="317" cy="135" rx="12" ry="5" fill="#7c3aed" fillOpacity="0.4" />
    {/* Drag-drop UI hint */}
    <rect x="20" y="170" width="340" height="70" rx="8" fill="#1a0f2e" stroke="#7c3aed" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="32" y="183" width="50" height="40" rx="4" fill="#7c3aed" fillOpacity="0.2" stroke="#7c3aed" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="90" y="183" width="50" height="40" rx="4" fill="#6d28d9" fillOpacity="0.2" stroke="#6d28d9" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="148" y="183" width="50" height="40" rx="4" fill="#9d5cff" fillOpacity="0.2" stroke="#9d5cff" strokeOpacity="0.3" strokeWidth="1" />
    <text x="210" y="207" fontSize="9" fill="#7c3aed" fontFamily="monospace" opacity="0.7">1000+ Components</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#a855f7" fontFamily="monospace">Yukti-AI</text>
    <text x="20" y="42" fontSize="9" fill="#7c3aed" fontFamily="monospace">Visual Science Lab · CodeBharat Winner</text>
  </svg>
);

const AgenticCommerce = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#160d00" />
    {/* Hex chain */}
    {[0,1,2,3].map(i => {
      const cx = 60 + i * 80, cy = 110;
      const r = 28;
      const pts = Array.from({length:6}, (_,j) => {
        const a = j*60*(Math.PI/180);
        return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
      }).join(' ');
      return (
        <g key={i}>
          <polygon points={pts} stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.07" strokeOpacity="0.6" />
          <text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fill="#f59e0b" fontFamily="monospace" opacity="0.8">#{i}</text>
          {i < 3 && <line x1={cx+r} y1={cy} x2={cx+80-r} y2={cy} stroke="#f59e0b" strokeDasharray="4 2" strokeOpacity="0.4" strokeWidth="1" />}
        </g>
      );
    })}
    {/* AI Agent node */}
    <circle cx="340" cy="110" r="25" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.7" />
    <text x="340" y="107" textAnchor="middle" fontSize="8" fill="#f59e0b" fontFamily="monospace">AI</text>
    <text x="340" y="118" textAnchor="middle" fontSize="7" fill="#f59e0b" fontFamily="monospace">Agent</text>
    <line x1="316" y1="110" x2="302" y2="110" stroke="#f59e0b" strokeDasharray="3 2" strokeOpacity="0.5" strokeWidth="1" />
    {/* Smart contract */}
    <rect x="20" y="170" width="170" height="70" rx="6" fill="#1e1000" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" />
    <text x="32" y="190" fontSize="8" fill="#f59e0b" fontFamily="monospace" opacity="0.5">contract Agent.sol</text>
    <text x="32" y="204" fontSize="8" fill="#fbbf24" fontFamily="monospace">spendLimit: ₹500</text>
    <text x="32" y="218" fontSize="8" fill="#92400e" fontFamily="monospace">allowedMerchants[]</text>
    <text x="32" y="232" fontSize="8" fill="#fbbf24" fontFamily="monospace">✓ sessionKey valid</text>
    {/* Spending bar */}
    <rect x="210" y="185" width="160" height="10" rx="5" fill="#1e1000" />
    <rect x="210" y="185" width="95" height="10" rx="5" fill="#f59e0b" fillOpacity="0.7" />
    <text x="210" y="215" fontSize="8" fill="#f59e0b" fontFamily="monospace" opacity="0.7">Spend: ₹285 / ₹500</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">Agentic Commerce</text>
    <text x="20" y="42" fontSize="9" fill="#92400e" fontFamily="monospace">Blockchain · AI Payment Protocol</text>
  </svg>
);

const DetoxAI = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#0a0f0a" />
    {/* Phone in grayscale */}
    <rect x="140" y="15" width="120" height="210" rx="18" fill="#1a1a1a" stroke="#00ff88" strokeOpacity="0.4" strokeWidth="1.5" />
    <rect x="152" y="30" width="96" height="180" rx="10" fill="#0f0f0f" />
    {/* Grayscale home screen */}
    {[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2]].map(([col,row], i) => (
      <rect key={i} x={162+col*28} y={40+row*50} width="22" height="22" rx="6" fill="#333" />
    ))}
    {/* Lock overlay */}
    <rect x="152" y="100" width="96" height="110" rx="10" fill="#00ff88" fillOpacity="0.08" />
    <circle cx="200" cy="145" r="16" fill="none" stroke="#00ff88" strokeWidth="2" strokeOpacity="0.7" />
    <path d="M 190 145 L 197 152 L 212 137" stroke="#00ff88" strokeWidth="2.5" fill="none" strokeOpacity="0.9" />
    {/* Timer ring */}
    <circle cx="320" cy="110" r="40" fill="none" stroke="#1a1a1a" strokeWidth="8" />
    <circle cx="320" cy="110" r="40" fill="none" stroke="#00ff88" strokeWidth="8" strokeOpacity="0.6"
      strokeDasharray="180 72" strokeDashoffset="0" transform="rotate(-90 320 110)" />
    <text x="320" y="106" textAnchor="middle" fontSize="14" fill="#00ff88" fontFamily="monospace" fontWeight="bold">2h</text>
    <text x="320" y="121" textAnchor="middle" fontSize="8" fill="#00ff88" fontFamily="monospace" opacity="0.6">remaining</text>
    {/* Task earned */}
    <rect x="20" y="170" width="100" height="70" rx="8" fill="#0d1f0d" stroke="#00ff88" strokeOpacity="0.3" strokeWidth="1" />
    <text x="70" y="200" textAnchor="middle" fontSize="8" fill="#00ff88" fontFamily="monospace" opacity="0.7">Task complete</text>
    <text x="70" y="215" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#00ff88" fontFamily="monospace">+30 min</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00ff88" fontFamily="monospace">Detox AI</text>
    <text x="20" y="42" fontSize="9" fill="#00aa55" fontFamily="monospace">Digital Wellness · Gemini 2.5 Flash</text>
  </svg>
);

const RoofVisionAI = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#071828" />
    {/* Satellite grid overlay */}
    {[0,1,2,3].map(i => <line key={`h${i}`} x1="20" y1={60+i*40} x2="380" y2={60+i*40} stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.2" />)}
    {[0,1,2,3,4,5,6].map(i => <line key={`v${i}`} x1={20+i*54} y1="55" x2={20+i*54} y2="215" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.2" />)}
    {/* Building rooftops */}
    <rect x="30" y="70" width="50" height="50" rx="2" fill="#0d2a3e" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="88" y="85" width="45" height="35" rx="2" fill="#0d2a3e" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
    <rect x="141" y="65" width="55" height="55" rx="2" fill="#0d2a3e" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="204" y="80" width="40" height="40" rx="2" fill="#0d2a3e" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
    <rect x="252" y="68" width="60" height="52" rx="2" fill="#0d2a3e" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
    {/* Solar panels detected */}
    {[[35,78],[50,78],[35,90],[50,90]].map(([x,y],i) => <rect key={i} x={x} y={y} width="10" height="8" rx="1" fill="#00d4ff" fillOpacity="0.5" stroke="#00d4ff" strokeWidth="0.5" />)}
    {[[148,72],[162,72],[148,84],[162,84],[148,96],[162,96]].map(([x,y],i) => <rect key={i} x={x} y={y} width="10" height="8" rx="1" fill="#00d4ff" fillOpacity="0.6" stroke="#00d4ff" strokeWidth="0.5" />)}
    {/* Scan reticle */}
    <rect x="240" y="130" width="130" height="100" rx="4" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.7" strokeDasharray="6 3" />
    <line x1="240" y1="180" x2="370" y2="180" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.3" />
    <circle cx="282" cy="155" r="3" fill="#00ff88" />
    <text x="292" y="159" fontSize="8" fill="#00ff88" fontFamily="monospace">Detected: 94%</text>
    <circle cx="282" cy="174" r="3" fill="#ff6b6b" />
    <text x="292" y="178" fontSize="8" fill="#ff6b6b" fontFamily="monospace">Not found: 6%</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00d4ff" fontFamily="monospace">RoofVision AI</text>
    <text x="20" y="42" fontSize="9" fill="#0090bb" fontFamily="monospace">Satellite Vision · Gemini API</text>
  </svg>
);

const CollegeERP = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#0a0c10" />
    {/* Sidebar */}
    <rect x="0" y="0" width="70" height="260" fill="#111318" />
    <rect x="10" y="20" width="50" height="12" rx="6" fill="#4a5568" fillOpacity="0.5" />
    {["Admin","Students","Faculty","Courses","Reports"].map((label, i) => (
      <g key={i}>
        <rect x="8" y={44+i*28} width="54" height="20" rx="4" fill={i===0?"#7c3aed":"transparent"} fillOpacity="0.3" />
        <rect x="14" y={49+i*28} width="8" height="8" rx="2" fill="#7c3aed" fillOpacity={i===0?0.9:0.4} />
        <rect x="26" y={51+i*28} width="30" height="4" rx="2" fill="#7c3aed" fillOpacity={i===0?0.8:0.3} />
      </g>
    ))}
    {/* Header */}
    <rect x="76" y="0" width="324" height="36" fill="#111318" />
    <rect x="86" y="12" width="80" height="12" rx="6" fill="#7c3aed" fillOpacity="0.4" />
    <rect x="310" y="10" width="30" height="16" rx="8" fill="#7c3aed" fillOpacity="0.6" />
    <circle cx="358" cy="18" r="10" fill="#4a5568" fillOpacity="0.5" />
    {/* Stats */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={80+i*108} y="44" width="100" height="55" rx="6" fill="#111318" stroke="#7c3aed" strokeOpacity="0.25" strokeWidth="1" />
        <rect x={90+i*108} y="56" width="40" height="8" rx="4" fill="#7c3aed" fillOpacity={0.6-i*0.1} />
        <text x={90+i*108} y={83} fontSize="16" fontWeight="bold" fill="#a855f7" fontFamily="monospace">{["847","52","91%"][i]}</text>
        <rect x={90+i*108} y="90" width="60" height="4" rx="2" fill="#7c3aed" fillOpacity="0.2" />
      </g>
    ))}
    {/* Table */}
    <rect x="80" y="108" width="314" height="140" rx="6" fill="#111318" stroke="#7c3aed" strokeOpacity="0.2" strokeWidth="1" />
    <rect x="80" y="108" width="314" height="22" rx="6" fill="#7c3aed" fillOpacity="0.1" />
    {["Name","Roll No","Course","Grade","Status"].map((h, i) => (
      <rect key={i} x={90+i*58} y={115} width={50} height={6} rx="3" fill="#7c3aed" fillOpacity="0.5" />
    ))}
    {[0,1,2,3,4].map(row => (
      <g key={row}>
        {[0,1,2,3,4].map(col => (
          <rect key={col} x={90+col*58} y={136+row*18} width={50} height={5} rx="2" fill={col===4?"#00ff88":"#7c3aed"} fillOpacity={col===4?0.4:0.15} />
        ))}
      </g>
    ))}
    <text x="76" y="-8" fontSize="14" fontWeight="bold" fill="#a855f7" fontFamily="monospace">College ERP</text>
    <text x="76" y="-240" fontSize="9" fill="#6d28d9" fontFamily="monospace">NestJS · PostgreSQL · Docker · Redis</text>
  </svg>
);

const AISocial = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#100a00" />
    {/* Central AI brain */}
    <circle cx="200" cy="120" r="40" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="200" cy="120" r="25" fill="#f59e0b" fillOpacity="0.15" />
    <text x="200" y="116" textAnchor="middle" fontSize="10" fill="#f59e0b" fontFamily="monospace" fontWeight="bold">AI</text>
    <text x="200" y="130" textAnchor="middle" fontSize="8" fill="#f59e0b" fontFamily="monospace">Score 8.2</text>
    {/* Platform icons as circles with lines to center */}
    {[
      {label:"IG", cx:80, cy:70, color:"#e1306c"},
      {label:"YT", cx:320, cy:70, color:"#ff0000"},
      {label:"LI", cx:60, cy:170, color:"#0077b5"},
      {label:"X", cx:340, cy:170, color:"#1da1f2"},
      {label:"FB", cx:200, cy:30, color:"#1877f2"},
    ].map(({label,cx,cy,color},i) => (
      <g key={i}>
        <line x1={cx} y1={cy} x2={200} y2={120} stroke={color} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
        <circle cx={cx} cy={cy} r="22" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        <text x={cx} y={cy+4} textAnchor="middle" fontSize="9" fill={color} fontFamily="monospace" fontWeight="bold">{label}</text>
      </g>
    ))}
    {/* Generated image box */}
    <rect x="20" y="190" width="160" height="55" rx="6" fill="#1e1000" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="30" y="200" width="50" height="35" rx="4" fill="#f59e0b" fillOpacity="0.1" />
    <text x="90" y="215" fontSize="8" fill="#f59e0b" fontFamily="monospace" opacity="0.7">Ideogram v2</text>
    <text x="90" y="228" fontSize="9" fill="#fbbf24" fontFamily="monospace">Score: 8.7 ✓</text>
    {/* Post status */}
    <rect x="220" y="190" width="160" height="55" rx="6" fill="#1e1000" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" />
    <text x="232" y="210" fontSize="8" fill="#00ff88" fontFamily="monospace">✓ Posted to Instagram</text>
    <text x="232" y="224" fontSize="8" fill="#00ff88" fontFamily="monospace">✓ Posted to LinkedIn</text>
    <text x="232" y="238" fontSize="8" fill="#f59e0b" fontFamily="monospace">⋯ Queuing YouTube</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">AI Social Automation</text>
    <text x="20" y="42" fontSize="9" fill="#92400e" fontFamily="monospace">Agentic Pipeline · Multi-Platform</text>
  </svg>
);

const MindReadRL = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#080f08" />
    {/* Reward curve */}
    <polyline points="20,200 60,180 100,165 140,145 170,130 200,110 230,105 260,95 290,88 320,82 360,75"
      stroke="#00ff88" strokeWidth="2" fill="none" strokeOpacity="0.7" />
    <polyline points="20,200 60,180 100,165 140,145 170,130 200,110 230,105 260,95 290,88 320,82 360,75 360,220 20,220"
      fill="#00ff88" fillOpacity="0.05" stroke="none" />
    {/* Grid */}
    {[75,110,145,180].map((y,i) => <line key={i} x1="20" y1={y} x2="380" y2={y} stroke="#00ff88" strokeWidth="0.4" strokeOpacity="0.1" strokeDasharray="4 4" />)}
    {/* Brain outline */}
    <ellipse cx="300" cy="115" rx="55" ry="45" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeOpacity="0.4" />
    <ellipse cx="300" cy="115" rx="30" ry="42" fill="none" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.2" />
    {/* Neural sparks */}
    {[[280,90],[320,100],[295,130],[315,125],[285,110]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="#00ff88" fillOpacity="0.7" />
    ))}
    <path d="M 280 90 L 320 100 L 295 130 L 315 125" stroke="#00ff88" strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
    {/* Labels */}
    <text x="20" y="215" fontSize="8" fill="#00ff88" fontFamily="monospace" opacity="0.5">Episode 0</text>
    <text x="340" y="215" fontSize="8" fill="#00ff88" fontFamily="monospace" opacity="0.5">1000</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00ff88" fontFamily="monospace">MindRead RL</text>
    <text x="20" y="42" fontSize="9" fill="#00aa55" fontFamily="monospace">Reinforcement Learning · HuggingFace</text>
  </svg>
);

const PromptInject = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#0f080a" />
    {/* Shield */}
    <path d="M 200 40 L 265 70 L 265 140 Q 265 185 200 210 Q 135 185 135 140 L 135 70 Z"
      fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.6" />
    {/* Warning X inside shield */}
    <line x1="172" y1="110" x2="228" y2="160" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.8" />
    <line x1="228" y1="110" x2="172" y2="160" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.8" />
    {/* Injection arrow */}
    <path d="M 40 120 L 120 120" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" strokeOpacity="0.7" />
    <polygon points="120,115 135,120 120,125" fill="#ef4444" fillOpacity="0.8" />
    {/* Code terminal */}
    <rect x="20" y="175" width="170" height="70" rx="6" fill="#1a0a0d" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="20" y="175" width="170" height="18" rx="6" fill="#ef4444" fillOpacity="0.1" />
    <text x="30" y="188" fontSize="8" fill="#ef4444" fontFamily="monospace">INJECT ATTEMPT</text>
    <text x="30" y="206" fontSize="8" fill="#fbbf24" fontFamily="monospace">{">"} Ignore prev instructions</text>
    <text x="30" y="220" fontSize="8" fill="#ef4444" fontFamily="monospace">✗ BLOCKED by agent</text>
    <text x="30" y="234" fontSize="8" fill="#00ff88" fontFamily="monospace">✓ Safety layer active</text>
    {/* Research badge */}
    <rect x="220" y="175" width="160" height="70" rx="6" fill="#1a0a0d" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" />
    <text x="300" y="200" textAnchor="middle" fontSize="9" fill="#f59e0b" fontFamily="monospace">Security Research</text>
    <text x="300" y="215" textAnchor="middle" fontSize="20" fill="#f59e0b" fontFamily="monospace">🔬</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">PromptInject</text>
    <text x="20" y="42" fontSize="9" fill="#92400e" fontFamily="monospace">AI Security Research · HuggingFace</text>
  </svg>
);

const MultiagentRAG = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#08080f" />
    {/* Council agents in circle */}
    {[0,1,2,3,4].map(i => {
      const angle = i * 72 * Math.PI/180 - Math.PI/2;
      const cx = 200 + 80*Math.cos(angle), cy = 120 + 65*Math.sin(angle);
      return (
        <g key={i}>
          <circle cx={cx} cy={cy} r="18" fill="#7c3aed" fillOpacity="0.15" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.6" />
          <text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fill="#a855f7" fontFamily="monospace">{`A${i+1}`}</text>
        </g>
      );
    })}
    {/* Lines between agents */}
    {[0,1,2,3,4].map(i => {
      const a1 = i * 72 * Math.PI/180 - Math.PI/2;
      const a2 = ((i+1)%5) * 72 * Math.PI/180 - Math.PI/2;
      return <line key={i} x1={200+80*Math.cos(a1)} y1={120+65*Math.sin(a1)} x2={200+80*Math.cos(a2)} y2={120+65*Math.sin(a2)} stroke="#7c3aed" strokeWidth="0.8" strokeOpacity="0.25" />;
    })}
    {/* Consensus center */}
    <circle cx="200" cy="120" r="22" fill="#7c3aed" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
    <text x="200" y="117" textAnchor="middle" fontSize="7" fill="#a855f7" fontFamily="monospace">COUNCIL</text>
    <text x="200" y="128" textAnchor="middle" fontSize="7" fill="#a855f7" fontFamily="monospace">VOTE</text>
    {/* Document chunks */}
    {[0,1,2].map(i => <rect key={i} x={20+i*20} y={195+i*10} width="90" height="14" rx="3" fill="#7c3aed" fillOpacity={0.2-i*0.04} stroke="#7c3aed" strokeOpacity="0.3" strokeWidth="0.8" />)}
    <text x="24" y="240" fontSize="7" fill="#7c3aed" fontFamily="monospace" opacity="0.6">Retrieved chunks</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#a855f7" fontFamily="monospace">Council RAG</text>
    <text x="20" y="42" fontSize="9" fill="#6d28d9" fontFamily="monospace">Multi-Agent · Consensus Retrieval</text>
  </svg>
);

const RAGPinecone = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#060d12" />
    {/* Vector embeddings as dots */}
    {Array.from({length:24}, (_,i) => {
      const x = 30 + (i%6)*55, y = 60 + Math.floor(i/6)*40;
      const size = 2+Math.random()*4;
      return <circle key={i} cx={x} cy={y} r={size} fill="#00d4ff" fillOpacity={0.2+Math.random()*0.5} />;
    })}
    {/* Similarity lines */}
    <line x1="85" y1="60" x2="140" y2="100" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
    <line x1="85" y1="60" x2="195" y2="60" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
    <line x1="195" y1="60" x2="250" y2="100" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Query box */}
    <rect x="20" y="175" width="360" height="30" rx="6" fill="#0d2030" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1" />
    <text x="32" y="195" fontSize="10" fill="#00d4ff" fontFamily="monospace" opacity="0.8">{">"} What is the capital of AI research?</text>
    {/* Results */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x="20" y={215+i*15} width={200+i*20} height="10" rx="3" fill="#00d4ff" fillOpacity={0.3-i*0.08} />
        <text x="230" y={223+i*15} fontSize="7" fill="#00d4ff" fontFamily="monospace" opacity={0.7-i*0.15}>score: {(0.95-i*0.07).toFixed(2)}</text>
      </g>
    ))}
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00d4ff" fontFamily="monospace">RAG Pinecone</text>
    <text x="20" y="42" fontSize="9" fill="#0077aa" fontFamily="monospace">Production RAG · Vector Database</text>
  </svg>
);

const DataVerseAI = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#060812" />
    {/* Data columns chart */}
    {[0,1,2,3,4,5].map((i) => {
      const h = [80,120,60,150,90,130][i];
      return <rect key={i} x={30+i*55} y={190-h} width="40" height={h} rx="4" fill="#00d4ff" fillOpacity={0.25+i*0.04} />;
    })}
    {/* Trend line */}
    <polyline points="50,140 105,90 160,145 215,65 270,110 325,80"
      stroke="#00d4ff" strokeWidth="2" fill="none" strokeOpacity="0.7" />
    {/* Stars/universe dots */}
    {Array.from({length:30}, (_,i) => (
      <circle key={i} cx={Math.random()*400} cy={Math.random()*50+195} r={Math.random()*1.5} fill="white" opacity={Math.random()*0.3} />
    ))}
    {/* Query bar */}
    <rect x="20" y="205" width="360" height="45" rx="8" fill="#0a1020" stroke="#00d4ff" strokeOpacity="0.35" strokeWidth="1" />
    <text x="32" y="224" fontSize="9" fill="#4a8fa8" fontFamily="monospace">Ask your data...</text>
    <rect x="340" y="213" width="30" height="20" rx="5" fill="#00d4ff" fillOpacity="0.7" />
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00d4ff" fontFamily="monospace">DataVerseAI</text>
    <text x="20" y="42" fontSize="9" fill="#0077aa" fontFamily="monospace">AI Data Platform · Natural Language</text>
  </svg>
);

const Text2DB = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#071810" />
    {/* Natural language */}
    <rect x="20" y="60" width="150" height="50" rx="8" fill="#0d2b1e" stroke="#00ff88" strokeOpacity="0.4" strokeWidth="1" />
    <text x="34" y="81" fontSize="9" fill="#00ff88" fontFamily="monospace" opacity="0.8">Show me all users</text>
    <text x="34" y="96" fontSize="9" fill="#00ff88" fontFamily="monospace" opacity="0.8">from last 30 days</text>
    {/* Arrow transform */}
    <path d="M 175 85 L 225 85" stroke="#00ff88" strokeWidth="2" strokeOpacity="0.6" />
    <polygon points="225,80 240,85 225,90" fill="#00ff88" fillOpacity="0.7" />
    <text x="190" y="75" fontSize="7" fill="#00ff88" fontFamily="monospace" opacity="0.5">AI</text>
    {/* SQL */}
    <rect x="245" y="50" width="140" height="80" rx="8" fill="#0d2b1e" stroke="#00ff88" strokeOpacity="0.4" strokeWidth="1" />
    <text x="258" y="70" fontSize="8" fill="#00cc55" fontFamily="monospace">SELECT * FROM</text>
    <text x="258" y="84" fontSize="8" fill="#00cc55" fontFamily="monospace">  users</text>
    <text x="258" y="98" fontSize="8" fill="#00cc55" fontFamily="monospace">WHERE created</text>
    <text x="258" y="112" fontSize="8" fill="#00cc55" fontFamily="monospace">  {">"} NOW()-30d</text>
    {/* Results table */}
    <rect x="20" y="140" width="360" height="100" rx="8" fill="#0a1e14" stroke="#00ff88" strokeOpacity="0.25" strokeWidth="1" />
    <rect x="20" y="140" width="360" height="20" rx="8" fill="#00ff88" fillOpacity="0.08" />
    {["id","name","email","created"].map((h, i) => <rect key={i} x={30+i*85} y={147} width={70} height={6} rx="3" fill="#00ff88" fillOpacity="0.5" />)}
    {[0,1,2,3].map(row => [0,1,2,3].map(col => <rect key={`${row}-${col}`} x={30+col*85} y={168+row*16} width={70} height={5} rx="2" fill="#00ff88" fillOpacity="0.12" />))}
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00ff88" fontFamily="monospace">Text2DB AI</text>
    <text x="20" y="42" fontSize="9" fill="#00aa55" fontFamily="monospace">Natural Language → SQL · Live</text>
  </svg>
);

const FinAdviseAI = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#100d00" />
    {/* Chart */}
    <rect x="20" y="50" width="360" height="130" rx="8" fill="#1a1200" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
    <polyline points="32,160 75,140 118,148 161,115 204,122 247,88 290,96 333,68 368,58"
      stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeOpacity="0.8" strokeLinejoin="round" />
    <polyline points="32,160 75,140 118,148 161,115 204,122 247,88 290,96 333,68 368,58 368,170 32,170"
      fill="#f59e0b" fillOpacity="0.06" stroke="none" />
    {[80,110,140,170].map((y,i) => <line key={i} x1="32" y1={y} x2="368" y2={y} stroke="#f59e0b" strokeWidth="0.4" strokeOpacity="0.1" strokeDasharray="4 4" />)}
    {/* Gain badge */}
    <rect x="280" y="55" width="90" height="40" rx="6" fill="#00ff88" fillOpacity="0.1" stroke="#00ff88" strokeOpacity="0.3" strokeWidth="1" />
    <text x="325" y="72" textAnchor="middle" fontSize="8" fill="#00ff88" fontFamily="monospace">+24.8%</text>
    <text x="325" y="86" textAnchor="middle" fontSize="7" fill="#00ff88" fontFamily="monospace">YTD Return</text>
    {/* Stats row */}
    {[{v:"₹2.4L",l:"Portfolio"},{v:"8.2%",l:"Monthly"},{v:"Low",l:"Risk"}].map(({v,l},i) => (
      <g key={i}>
        <rect x={20+i*125} y={198} width="112" height="50" rx="6" fill="#1a1200" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
        <text x={76+i*125} y={220} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">{v}</text>
        <text x={76+i*125} y={236} textAnchor="middle" fontSize="8" fill="#92400e" fontFamily="monospace">{l}</text>
      </g>
    ))}
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">FinAdvise AI</text>
    <text x="20" y="42" fontSize="9" fill="#92400e" fontFamily="monospace">AI Financial Advisory · Live</text>
  </svg>
);

const PrasanHom = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#0f0b06" />
    {/* Room floor */}
    <ellipse cx="200" cy="220" rx="180" ry="40" fill="#1a1208" stroke="#f59e0b" strokeOpacity="0.1" strokeWidth="1" />
    {/* Sofa */}
    <rect x="80" y="160" width="160" height="50" rx="8" fill="#2a1f10" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="80" y="150" width="160" height="20" rx="6" fill="#332515" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
    <rect x="80" y="160" width="20" height="50" rx="4" fill="#2a1f10" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
    <rect x="220" y="160" width="20" height="50" rx="4" fill="#2a1f10" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
    {/* Plant */}
    <rect x="302" y="170" width="12" height="30" rx="3" fill="#2a1f10" />
    <ellipse cx="308" cy="165" rx="18" ry="22" fill="#1a2a0f" stroke="#2a5010" strokeWidth="1" />
    <ellipse cx="296" cy="155" rx="12" ry="15" fill="#1a2a0f" />
    <ellipse cx="320" cy="158" rx="12" ry="14" fill="#1a2a0f" />
    {/* Window */}
    <rect x="22" y="70" width="80" height="90" rx="4" fill="#0a1828" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
    <line x1="62" y1="70" x2="62" y2="160" stroke="#f59e0b" strokeOpacity="0.15" strokeWidth="1" />
    <line x1="22" y1="115" x2="102" y2="115" stroke="#f59e0b" strokeOpacity="0.15" strokeWidth="1" />
    {/* Light beam */}
    <path d="M 22 70 L 120 160 L 22 160 Z" fill="#f59e0b" fillOpacity="0.03" />
    {/* Lamp */}
    <line x1="340" y1="40" x2="340" y2="150" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1.5" />
    <path d="M 310 40 Q 340 55 370 40" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" fill="#f59e0b" fillOpacity="0.05" />
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">Prasan Hom</text>
    <text x="20" y="42" fontSize="9" fill="#92400e" fontFamily="monospace">Interior Design · Freelance · Next.js</text>
  </svg>
);

const Unyfiny = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#060c18" />
    {/* Connection network */}
    {[[100,80],[300,80],[200,160],[60,180],[340,180],[200,50]].map(([cx,cy],i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="16" fill="#00d4ff" fillOpacity="0.1" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx={cx} cy={cy} r="5" fill="#00d4ff" fillOpacity="0.7" />
      </g>
    ))}
    {[[0,1],[0,2],[1,2],[2,3],[2,4],[0,5],[1,5]].map(([a,b],i) => {
      const nodes = [[100,80],[300,80],[200,160],[60,180],[340,180],[200,50]];
      return <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.2" />;
    })}
    {/* Live badge */}
    <circle cx="380" cy="25" r="8" fill="#00ff88" fillOpacity="0.8" />
    <text x="380" y="29" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace">●</text>
    {/* Stats */}
    <rect x="20" y="210" width="340" height="40" rx="6" fill="#0a1828" stroke="#00d4ff" strokeOpacity="0.2" strokeWidth="1" />
    <text x="40" y="227" fontSize="8" fill="#00d4ff" fontFamily="monospace" opacity="0.7">Active users: 247</text>
    <text x="40" y="241" fontSize="8" fill="#00d4ff" fontFamily="monospace" opacity="0.5">Live since Jan 2025</text>
    <rect x="250" y="218" width="90" height="24" rx="6" fill="#00d4ff" fillOpacity="0.15" />
    <text x="295" y="234" textAnchor="middle" fontSize="9" fill="#00d4ff" fontFamily="monospace">unyfiny.com</text>
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00d4ff" fontFamily="monospace">Unyfiny</text>
    <text x="20" y="42" fontSize="9" fill="#0077aa" fontFamily="monospace">Live Platform · Freelance · Real Users</text>
  </svg>
);

const AKCarRentals = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#08080f" />
    {/* Car top view */}
    <rect x="140" y="80" width="120" height="60" rx="12" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="2" strokeOpacity="0.7" />
    <rect x="152" y="86" width="96" height="48" rx="8" fill="#111128" />
    {/* Wheels */}
    {[[140,88],[140,128],[260,88],[260,128]].map(([x,y],i) => (
      <ellipse key={i} cx={x} cy={y} rx="12" ry="8" fill="#7c3aed" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.6" />
    ))}
    {/* Road */}
    <line x1="200" y1="40" x2="200" y2="220" stroke="#7c3aed" strokeWidth="1" strokeDasharray="8 6" strokeOpacity="0.2" />
    {/* Booking card */}
    <rect x="20" y="170" width="150" height="75" rx="8" fill="#10102a" stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1" />
    <text x="32" y="190" fontSize="8" fill="#a855f7" fontFamily="monospace">BOOKING #4721</text>
    <text x="32" y="206" fontSize="9" fontWeight="bold" fill="#7c3aed" fontFamily="monospace">Honda City</text>
    <rect x="32" y="212" width="60" height="12" rx="6" fill="#7c3aed" fillOpacity="0.3" />
    <text x="62" y="222" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace">Confirmed</text>
    <rect x="32" y="228" width="80" height="5" rx="2" fill="#7c3aed" fillOpacity="0.2" />
    {/* Calendar */}
    <rect x="230" y="170" width="150" height="75" rx="8" fill="#10102a" stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1" />
    <rect x="230" y="170" width="150" height="20" rx="8" fill="#7c3aed" fillOpacity="0.2" />
    <text x="305" y="184" textAnchor="middle" fontSize="8" fill="#a855f7" fontFamily="monospace">May 2025</text>
    {[0,1,2,3,4,5,6].map(d => <rect key={d} x={238+d*20} y={196} width="14" height="14" rx="3" fill={d===3?"#7c3aed":"#1a1a2e"} fillOpacity={d===3?0.7:0.4} />)}
    {[0,1,2,3,4,5,6].map(d => <rect key={d} x={238+d*20} y={214} width="14" height="14" rx="3" fill="#1a1a2e" fillOpacity="0.4" />)}
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#a855f7" fontFamily="monospace">AK Car Rentals</text>
    <text x="20" y="42" fontSize="9" fill="#6d28d9" fontFamily="monospace">Car Rental Platform · Freelance · Live</text>
  </svg>
);

const CMNServices = () => (
  <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="260" fill="#060f0a" />
    {/* Building */}
    <rect x="140" y="60" width="120" height="140" rx="4" fill="#0d1f14" stroke="#00ff88" strokeOpacity="0.35" strokeWidth="1.5" />
    <rect x="140" y="60" width="120" height="20" rx="4" fill="#00ff88" fillOpacity="0.1" />
    {/* Windows */}
    {[0,1,2,3].map(row => [0,1,2].map(col => (
      <rect key={`${row}-${col}`} x={152+col*34} y={90+row*28} width="18" height="16" rx="2" fill="#00ff88" fillOpacity={0.1+Math.random()*0.15} />
    )))}
    {/* Door */}
    <rect x="182" y="165" width="36" height="35" rx="3" fill="#00ff88" fillOpacity="0.1" stroke="#00ff88" strokeOpacity="0.3" strokeWidth="1" />
    {/* Service icons */}
    {[
      {x:30, y:80, label:"Web Dev"},
      {x:30, y:140, label:"IT Consult"},
      {x:310, y:80, label:"Digital Mktg"},
      {x:310, y:140, label:"Cloud Infra"},
    ].map(({x,y,label},i) => (
      <g key={i}>
        <rect x={x} y={y} width="90" height="40" rx="6" fill="#0d1f14" stroke="#00ff88" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx={x+16} cy={y+20} r="8" fill="#00ff88" fillOpacity="0.2" />
        <rect x={x+28} y={y+13} width="48" height="5" rx="2" fill="#00ff88" fillOpacity="0.4" />
        <rect x={x+28} y={y+24} width="36" height="4" rx="2" fill="#00ff88" fillOpacity="0.2" />
        <text x={x+45} y={y+50} textAnchor="middle" fontSize="7" fill="#00ff88" fontFamily="monospace" opacity="0.5">{label}</text>
      </g>
    ))}
    {/* Globe */}
    {[0,1,2].map(i => <circle key={i} cx="200" cy="230" r={15+i*8} fill="none" stroke="#00ff88" strokeOpacity={0.1-i*0.03} strokeWidth="1" />)}
    <text x="20" y="24" fontSize="14" fontWeight="bold" fill="#00ff88" fontFamily="monospace">CMN Services India</text>
    <text x="20" y="42" fontSize="9" fill="#00aa55" fontFamily="monospace">Enterprise Platform · Freelance · Live</text>
  </svg>
);

/* ─── Project ID → SVG map ───────────────────────────── */
const projectSVGs: Record<string, React.FC> = {
  "triponbuddy":      TripOnBuddy,
  "mediassist":       MediAssistAI,
  "yukti-ai":         YuktiAI,
  "agentic-commerce": AgenticCommerce,
  "detox-ai":         DetoxAI,
  "roofvision":       RoofVisionAI,
  "college-erp":      CollegeERP,
  "ai-social":        AISocial,
  "mindread":         MindReadRL,
  "promptinject":     PromptInject,
  "multiagent-rag":   MultiagentRAG,
  "rag-pinecone":     RAGPinecone,
  "dataverseai":      DataVerseAI,
  "text2db":          Text2DB,
  "finadvise":        FinAdviseAI,
  "prasanhom":        PrasanHom,
  "unyfiny":          Unyfiny,
  "akcarrentals":     AKCarRentals,
  "cmn":              CMNServices,
};

interface ProjectMockupProps {
  projectId: string;
  className?: string;
}

export default function ProjectMockup({ projectId, className = "" }: ProjectMockupProps) {
  const SVGComponent = projectSVGs[projectId];
  if (!SVGComponent) {
    return (
      <div className={`overflow-hidden rounded-md flex items-center justify-center ${className}`} style={{ background: "#0a0a0a" }}>
        <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#0a0a0a" />
          <text x="200" y="135" textAnchor="middle" fontSize="12" fill="#333" fontFamily="monospace">{projectId}</text>
        </svg>
      </div>
    );
  }
  return (
    <div className={`overflow-hidden ${className}`}>
      <SVGComponent />
    </div>
  );
}

