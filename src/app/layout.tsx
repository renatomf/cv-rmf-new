import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rmf-dev.com.br"),
  title: "Renato Marques — Desenvolvedor Front-End Sênior",
  description:
    "Desenvolvedor Front-End Sênior e Tech Lead com +10 anos de experiência em React, Next.js e TypeScript. Certificado AWS Developer Associate.",
  keywords: [
    "Renato Marques",
    "Desenvolvedor Front-End",
    "Desenvolvedor Full Stack",
    "Front-End Sênior",
    "Tech Lead",
    "Liderança Técnica",
    "Mentoria Técnica",
    "Arquitetura de Software",
    "Arquitetura Front-End",
    "Design Systems",
    "Code Review",
    "ReactJS",
    "NextJS",
    "Angular",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "React Native",
    "Flutter",
    "Tailwind CSS",
    "Shadcn UI",
    "Bootstrap",
    "Material UI",
    "Styled Components",
    "Node.js",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Prisma",
    "Drizzle",
    "Supabase",
    "Firebase",
    "APIs RESTful",
    "Context API",
    "Zustand",
    "GraphQL",
    "tRPC",
    "Microsserviços",
    "Stripe",
    "Convex",
    "BetterAuth",
    "AWS",
    "AWS Developer Associate",
    "UI/UX",
    "Git",
    "GitFlow",
    "Scrum",
    "Kanban",
    "OAuth",
    "JWT",
    "OWASP",
    "Segurança Web",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "SSR",
    "React Server Components",
    "Monorepos",
    "Vercel",
    "Web Performance",
    "Jest",
    "Vitest",
    "Cypress",
    "Playwright",
    "Sentry",
  ],
  applicationName: "Currículo Renato Marques",
  authors: [
    { name: "Renato Marques", url: "https://www.linkedin.com/in/renatomf/" },
  ],
  creator: "Renato Marques",
  publisher: "Renato Marques",
  category: "portfolio",
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: "1_xz8MZn0iG7RZ1fOq8R_Oe7ukgOeMl97p0wyfFraxQ",
  },
  openGraph: {
    type: "website",
    url: "https://rmf-dev.com.br",
    title: "Renato Marques — Desenvolvedor Front-End Sênior",
    description:
      "Currículo online de Renato Marques — experiência como Tech Lead, habilidades técnicas, educação e contato.",
    siteName: "Currículo Renato Marques",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    images: [{ url: "/images/image-og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renato Marques — Desenvolvedor Front-End Sênior",
    description:
      "Currículo online de Renato Marques — experiência como Tech Lead, habilidades técnicas, educação e contato.",
    images: ["/images/image-og.jpg"],
  },
  alternates: {
    canonical: "https://rmf-dev.com.br",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Renato Marques",
  url: "https://rmf-dev.com.br",
  image: "https://rmf-dev.com.br/images/image-5.png",
  jobTitle: "Desenvolvedor Front-End Sênior",
  worksFor: {
    "@type": "Organization",
    name: "LINKZ Informática",
  },
  email: "mailto:renatomardev@gmail.com",
  telephone: "+5511972550341",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.linkedin.com/in/renatomf/",
    "https://github.com/renatomf",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
