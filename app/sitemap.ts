import type { MetadataRoute } from "next";
import categories from "@/src/data/tour-categories.json";
import tours from "@/src/data/tours.json";
import site from "@/src/data/site.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl || "https://baliescape.com").replace(/\/$/, "");
  const now = new Date();

  const locales = ["en", "id"] as const;

  const entries: MetadataRoute.Sitemap = [];

  // Root domain
  entries.push({
    url: `${base}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
    alternates: {
      languages: {
        en: `${base}/en`,
        id: `${base}/id`,
        "x-default": `${base}/en`,
      },
    },
  });

  // Homepages (/en, /id)
  locales.forEach((locale) => {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${base}/en`,
          id: `${base}/id`,
          "x-default": `${base}/en`,
        },
      },
    });
  });

  // Tour Directory (/en/tours, /id/tours)
  locales.forEach((locale) => {
    entries.push({
      url: `${base}/${locale}/tours`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${base}/en/tours`,
          id: `${base}/id/tours`,
          "x-default": `${base}/en/tours`,
        },
      },
    });
  });

  // Tour Categories (/en/tours/[slug], /id/tours/[slug])
  categories.forEach((cat) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${base}/${locale}/tours/${cat.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: {
            en: `${base}/en/tours/${cat.slug}`,
            id: `${base}/id/tours/${cat.slug}`,
            "x-default": `${base}/en/tours/${cat.slug}`,
          },
        },
      });
    });
  });

  // Individual Tours (/en/tour/[slug], /id/tour/[slug])
  tours.forEach((tour) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${base}/${locale}/tour/${tour.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: {
            en: `${base}/en/tour/${tour.slug}`,
            id: `${base}/id/tour/${tour.slug}`,
            "x-default": `${base}/en/tour/${tour.slug}`,
          },
        },
      });
    });
  });

  // Car Rental / Car Pricelist (/en/car-rental, /id/car-rental)
  locales.forEach((locale) => {
    entries.push({
      url: `${base}/${locale}/car-rental`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${base}/en/car-rental`,
          id: `${base}/id/car-rental`,
          "x-default": `${base}/en/car-rental`,
        },
      },
    });
  });

  // About Us (/en/about-us, /id/about-us)
  locales.forEach((locale) => {
    entries.push({
      url: `${base}/${locale}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${base}/en/about-us`,
          id: `${base}/id/about-us`,
          "x-default": `${base}/en/about-us`,
        },
      },
    });
  });

  // Contact (/en/contact, /id/contact)
  locales.forEach((locale) => {
    entries.push({
      url: `${base}/${locale}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${base}/en/contact`,
          id: `${base}/id/contact`,
          "x-default": `${base}/en/contact`,
        },
      },
    });
  });

  return entries;
}
