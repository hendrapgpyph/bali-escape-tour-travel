import site from "@/src/data/site.json";
import { getSiteUrl } from "@/lib/seo";
import type { Locale } from "@/lib/localization";
import { text } from "@/lib/localization";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function TravelAgencySchema({ locale }: { locale: Locale }) {
  const base = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${base}/#organization`,
    name: "Bali Escape — Tours & Experiences",
    url: `${base}/${locale}`,
    logo: `${base}/icon.svg`,
    image: `${base}/images/hero-bali.png`,
    description:
      locale === "en"
        ? "Explore Bali with local experts. Curated day tours, island adventures, and private car rental with driver."
        : "Jelajahi Bali bersama tim lokal berpengalaman. Paket tur terkurasi, petualangan pulau, dan sewa mobil privat termasuk supir.",
    telephone: site.whatsapp,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Badung",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.6888,
      longitude: 115.1685,
    },
    priceRange: "IDR 350.000 - IDR 2.850.000",
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bali, Indonesia",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "22:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TourTripSchema({
  tour,
  locale,
}: {
  tour: any;
  locale: Locale;
}) {
  const base = getSiteUrl();
  const tourTitle = text(tour.title, locale);
  const tourDesc = text(tour.shortDescription, locale);
  const tourUrl = `${base}/${locale}/tour/${tour.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${tourUrl}/#trip`,
    name: tourTitle,
    description: tourDesc,
    url: tourUrl,
    image: tour.banner || tour.thumbnail,
    touristType: ["Family", "Solo Traveler", "Couples", "Adventure Seekers"],
    offers: {
      "@type": "Offer",
      price: tour.price || 500000,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: tourUrl,
      validFrom: "2024-01-01",
    },
    provider: {
      "@type": "TravelAgency",
      name: "Bali Escape",
      url: `${base}/${locale}`,
    },
    itinerary: tour.itinerary
      ? {
          "@type": "ItemList",
          numberOfItems: tour.itinerary.length,
          itemListElement: tour.itinerary.map((item: any, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: text(item.title, locale),
            description: text(item.description, locale),
            image: item.thumbnail,
          })),
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const base = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
