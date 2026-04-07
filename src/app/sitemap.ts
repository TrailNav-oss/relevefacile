import { BANK_SLUGS } from "@/data/banks";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://relevefacile.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const bankPages = BANK_SLUGS.map((slug) => ({
    url: `${SITE_URL}/banques/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tarifs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/banques`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...bankPages,
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cgu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
