import type { Metadata, Viewport } from "next";
import Providers from "./providers";
import "@/index.css";

const SITE_URL = "https://www.nileshpatil6.com";
const SITE_NAME = "Nilesh Patil";
const TITLE = "Nilesh Patil | Full Stack & Gen AI Developer";
const DESCRIPTION =
  "Nilesh Patil is a Full Stack and Generative AI Developer building production AI agents, RAG systems, and LLM apps. 8x hackathon winner. 5+ PRs merged into OpenAI, Google, and Hugging Face. Available for freelance and full-time roles. Based in Belgaum, Karnataka, India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Nilesh Patil",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Nilesh Patil", url: SITE_URL }],
  creator: "Nilesh Patil",
  publisher: "Nilesh Patil",
  generator: "Next.js",
  keywords: [
    "Nilesh Patil",
    "Nilesh S. Patil",
    "nileshpatil6",
    "Full Stack Developer",
    "Gen AI Developer",
    "Generative AI Engineer",
    "AI Engineer",
    "LLM Developer",
    "RAG Developer",
    "AI Agents Developer",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "FastAPI Developer",
    "Freelance Full Stack Developer",
    "Freelance AI Developer India",
    "Belgaum Developer",
    "Karnataka Developer",
    "India AI Engineer",
    "Hire Full Stack Developer",
    "Hire AI Developer",
    "Hackathon Winner India",
    "NASA SpaceApps",
    "MediAssist AI",
    "TripOnBuddy",
  ],
  category: "Technology",
  classification: "Personal Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    firstName: "Nilesh",
    lastName: "Patil",
    username: "nileshpatil6",
    gender: "male",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nilesh Patil | Full Stack & Gen AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
    creator: "@nileshpatil6",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add the Google Search Console verification token here when you receive it.
    // Get it at: https://search.google.com/search-console (HTML tag method).
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nilesh Patil",
  alternateName: ["Nilesh S. Patil", "nileshpatil6"],
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  email: "mailto:technil6436@gmail.com",
  telephone: "+91-8431496045",
  jobTitle: "Full Stack & Gen AI Developer",
  description: DESCRIPTION,
  gender: "Male",
  nationality: "Indian",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgaum",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "S.G. Balekundari Institute of Technology",
  },
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "Retrieval Augmented Generation",
    "AI Agents",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "MCP Protocol",
    "Full Stack Development",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "Node.js",
    "Flutter",
    "PostgreSQL",
    "Supabase",
    "Vector Databases",
    "Pinecone",
    "Web3",
    "Solidity",
    "Smart Contracts",
  ],
  sameAs: [
    "https://github.com/nileshpatil6",
    "https://linkedin.com/in/nileshpatil6",
    "https://huggingface.co/Mr66",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Nilesh Patil" },
  inLanguage: "en",
};

const jsonLdProfessional = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Nilesh Patil | Full Stack & Gen AI Developer",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description:
    "Freelance Full Stack and Generative AI development. Production AI agents, RAG systems, LLM apps, custom Next.js and React platforms.",
  provider: { "@type": "Person", name: "Nilesh Patil" },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Japan" },
    "Worldwide",
  ],
  serviceType: [
    "Full Stack Web Development",
    "Generative AI Development",
    "AI Agent Development",
    "RAG System Development",
    "LLM Application Development",
    "Next.js Development",
    "Mobile App Development",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfessional) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
