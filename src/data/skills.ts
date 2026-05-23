export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    color: "#00d4ff",
    skills: [
      { name: "TypeScript", level: 95, icon: "TS" },
      { name: "JavaScript", level: 95, icon: "JS" },
      { name: "Python", level: 90, icon: "PY" },
      { name: "Dart", level: 85, icon: "DT" },
      { name: "Kotlin", level: 70, icon: "KT" },
      { name: "Go", level: 65, icon: "GO" },
      { name: "Solidity", level: 75, icon: "SOL" },
      { name: "SQL", level: 85, icon: "SQL" },
    ],
  },
  {
    category: "Frontend",
    color: "#7c3aed",
    skills: [
      { name: "React", level: 95, icon: "RE" },
      { name: "Next.js", level: 92, icon: "NX" },
      { name: "Flutter", level: 88, icon: "FL" },
      { name: "Tailwind CSS", level: 95, icon: "TW" },
      { name: "ReactFlow", level: 80, icon: "RF" },
      { name: "Three.js", level: 70, icon: "3J" },
    ],
  },
  {
    category: "Backend",
    color: "#00ff88",
    skills: [
      { name: "Node.js", level: 92, icon: "NO" },
      { name: "NestJS", level: 85, icon: "NE" },
      { name: "FastAPI", level: 88, icon: "FA" },
      { name: "Flask", level: 85, icon: "FL" },
      { name: "Express.js", level: 90, icon: "EX" },
    ],
  },
  {
    category: "AI / ML",
    color: "#f59e0b",
    skills: [
      { name: "Gemini AI", level: 92, icon: "GE" },
      { name: "OpenAI API", level: 90, icon: "OA" },
      { name: "LangChain", level: 82, icon: "LC" },
      { name: "RAG Pipelines", level: 85, icon: "RA" },
      { name: "Agentic AI", level: 88, icon: "AG" },
      { name: "Computer Vision", level: 75, icon: "CV" },
    ],
  },
  {
    category: "Databases",
    color: "#00d4ff",
    skills: [
      { name: "PostgreSQL", level: 88, icon: "PG" },
      { name: "Supabase", level: 90, icon: "SB" },
      { name: "Firebase", level: 85, icon: "FB" },
      { name: "Redis", level: 78, icon: "RD" },
      { name: "Prisma", level: 85, icon: "PR" },
    ],
  },
  {
    category: "Infrastructure",
    color: "#7c3aed",
    skills: [
      { name: "Docker", level: 82, icon: "DK" },
      { name: "GitHub Actions", level: 80, icon: "GA" },
      { name: "Vercel", level: 90, icon: "VR" },
      { name: "Render", level: 78, icon: "RN" },
      { name: "Swagger/OpenAPI", level: 85, icon: "SW" },
    ],
  },
  {
    category: "Blockchain",
    color: "#f59e0b",
    skills: [
      { name: "Solidity", level: 75, icon: "SO" },
      { name: "Ethereum", level: 72, icon: "ET" },
      { name: "Hardhat", level: 70, icon: "HH" },
      { name: "Web3.js", level: 68, icon: "W3" },
    ],
  },
];

export const techLogos = [
  "React", "Next.js", "TypeScript", "Python", "Flutter", "Node.js",
  "Supabase", "PostgreSQL", "Docker", "Gemini AI", "OpenAI", "Solidity",
  "NestJS", "FastAPI", "Tailwind", "Redis", "Firebase", "Vercel",
  "LangChain", "Hardhat", "Three.js", "ReactFlow", "Prisma", "Jest",
];
