import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import translations from "@/data/translations.json";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

type Lang = "pt" | "en";

export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = translations[lang === "en" ? "en" : "pt"].meta;

  return {
    metadataBase: new URL("https://rmf-dev.com.br"),
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    applicationName: c.applicationName,
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
      url: c.canonical,
      title: c.title,
      description: c.description,
      siteName: c.siteName,
      locale: c.ogLocale,
      alternateLocale: [c.alternateOgLocale],
      images: [{ url: c.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: [c.ogImage],
    },
    alternates: {
      canonical: c.canonical,
      languages: {
        "pt-BR": "https://rmf-dev.com.br",
        "en-US": "https://rmf-dev.com.br/en",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale: Lang = lang === "en" ? "en" : "pt";
  const c = translations[locale].meta;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Renato Marques",
    url: c.canonical,
    image: "https://rmf-dev.com.br/images/image-5.png",
    jobTitle: c.jobTitle,
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

  return (
    <html
      lang={c.htmlLang}
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
