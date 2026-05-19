import type { MetadataRoute } from "next";
import { htmlLang, routing, type Locale } from "@/i18n/routing";

const SITE_URL = "https://nefrod.no";

function urlFor(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return `${SITE_URL}${clean || "/"}`;
  return `${SITE_URL}/${locale}${clean}`;
}

function languagesFor(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of routing.locales) {
    out[htmlLang[l]] = urlFor(l, path);
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  ];

  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: languagesFor(page.path) },
    })),
  );
}
