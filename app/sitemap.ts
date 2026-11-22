import type { MetadataRoute } from "next";
import categories from "@/src/data/tour-categories.json";
import tours from "@/src/data/tours.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return ["en", "id"].flatMap((locale) => [
    { url: `${base}/${locale}`, lastModified: new Date() },
    ...categories.map((category) => ({ url: `${base}/${locale}/tours/${category.slug}`, lastModified: new Date() })),
    ...tours.map((tour) => ({ url: `${base}/${locale}/tour/${tour.slug}`, lastModified: new Date() })),
    ...["car-rental", "about-us", "contact"].map((page) => ({ url: `${base}/${locale}/${page}`, lastModified: new Date() })),
  ]);
}
