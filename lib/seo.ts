import type { Metadata } from "next";
import site from "@/src/data/site.json";
import type { Locale } from "@/lib/localization";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl || "https://baliescape.com";
  return url.replace(/\/$/, "");
}

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  path,
  locale,
  image,
  keywords,
  type = "website",
}: MetaOptions): Metadata {
  const base = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const enUrl = `${base}/en${cleanPath === "/en" || cleanPath === "/id" || cleanPath === "/" ? "" : cleanPath.replace(/^\/(en|id)/, "")}`;
  const idUrl = `${base}/id${cleanPath === "/en" || cleanPath === "/id" || cleanPath === "/" ? "" : cleanPath.replace(/^\/(en|id)/, "")}`;
  const canonicalUrl = locale === "id" ? idUrl : enUrl;

  const ogImage = image
    ? (image.startsWith("http") ? image : `${base}${image}`)
    : `${base}/images/hero-bali.png`;

  const defaultKeywords = [
    "Bali tour",
    "Bali travel packages",
    "Nusa Penida tour",
    "Kintamani volcano tour",
    "Ubud cultural tour",
    "Bali private driver",
    "Bali car rental with driver",
    "paket tour bali",
    "sewa mobil bali dengan supir",
    "wisata bali",
    "liburan bali",
  ];

  const fullTitle = `${title} | Bali Escape`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: keywords ? [...keywords, ...defaultKeywords] : defaultKeywords,
    metadataBase: new URL(base),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        id: idUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "Bali Escape — Tours & Experiences",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "id" ? "id_ID" : "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
