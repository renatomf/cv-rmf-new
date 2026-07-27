import type { Metadata } from "next";
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
  metadataBase: new URL("https://renatomf.is-a.dev"),
  title: "Currículo Renato Marques",
  description:
    "Desenvolvedor Front-End Sênior com +10 anos de experiência em React, Next.js, Angular, TypeScript, React Native e Flutter. Certificado AWS Developer Associate.",
  keywords: [
    "Renato Marques",
    "Desenvolvedor Front-End",
    "Desenvolvedor Full Stack",
    "Front-End Sênior",
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
  ],
  authors: [{ name: "Renato Marques" }],
  creator: "Renato Marques",
  publisher: "Renato Marques",
  verification: {
    google: "qaMymppOzfE3hEXNeBfSm2pQgDnQAee7hojMlTTU2Vw",
  },
  openGraph: {
    type: "website",
    url: "https://renatomf.is-a.dev",
    title: "Currículo Renato Marques",
    description:
      "Currículo online de Renato Marques — experiência, habilidades técnicas, educação e contato.",
    siteName: "Currículo Renato Marques",
    locale: "pt_BR",
    images: [{ url: "/image-4.png", width: 1240, height: 1268 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currículo Renato Marques",
    description:
      "Currículo online de Renato Marques — experiência, habilidades técnicas, educação e contato.",
    images: ["/image-4.png"],
  },
  alternates: {
    canonical: "https://renatomf.is-a.dev",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Renato Marques",
  url: "https://renatomf.is-a.dev",
  image: "https://renatomf.is-a.dev/image-4.png",
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
