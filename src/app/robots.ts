import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://relevefacile.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/compte", "/historique", "/abonnement", "/api-keys"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
