import { BANK_SLUGS } from "@/data/banks";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://relevefacile.com";

const GUIDE_SLUGS = [
  "comment-convertir-releve-bancaire-pdf-excel",
  "importer-releve-bancaire-dans-excel",
  "format-csv-comptabilite-france",
  "releve-bancaire-comptabilite-auto-entrepreneur",
  "quel-format-export-choisir-csv-excel-ofx",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const bankPages = BANK_SLUGS.map((slug) => ({
    url: `${SITE_URL}/banques/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guidePages = GUIDE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tarifs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/banques`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...bankPages,
    { url: `${SITE_URL}/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...guidePages,
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cgu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
