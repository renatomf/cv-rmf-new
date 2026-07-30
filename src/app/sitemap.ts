import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rmf-dev.com.br",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": "https://rmf-dev.com.br",
          "en-US": "https://rmf-dev.com.br/en",
        },
      },
    },
    {
      url: "https://rmf-dev.com.br/en",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": "https://rmf-dev.com.br",
          "en-US": "https://rmf-dev.com.br/en",
        },
      },
    },
  ];
}
