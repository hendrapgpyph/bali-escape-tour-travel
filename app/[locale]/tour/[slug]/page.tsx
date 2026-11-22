import { TourPage } from "@/components/common/content-pages";
import tours from "@/src/data/tours.json";
import categories from "@/src/data/tour-categories.json";
import { text, type Locale } from "@/lib/localization";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { TourTripSchema, BreadcrumbSchema } from "@/components/seo/structured-data";

type Params = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = tours.find((x) => x.slug === slug);
  if (!tour) return { title: "Tour Not Found" };

  const language = locale as Locale;
  const title = text(tour.title, language);
  const description = text(tour.shortDescription, language);

  return buildMetadata({
    title,
    description,
    path: `/${locale}/tour/${slug}`,
    locale: language,
    image: tour.banner || tour.thumbnail,
    type: "article",
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const tour = tours.find((x) => x.slug === slug);
  const category = tour ? categories.find((c) => c.id === tour.categoryId) : null;
  const isId = locale === "id";

  return (
    <>
      {tour && (
        <>
          <TourTripSchema tour={tour} locale={locale as Locale} />
          <BreadcrumbSchema
            items={[
              { name: isId ? "Beranda" : "Home", url: `/${locale}` },
              { name: isId ? "Paket Tur" : "Tour Packages", url: `/${locale}/tours` },
              ...(category
                ? [
                    {
                      name: text(category.title, locale as Locale),
                      url: `/${locale}/tours/${category.slug}`,
                    },
                  ]
                : []),
              { name: text(tour.title, locale as Locale), url: `/${locale}/tour/${slug}` },
            ]}
          />
        </>
      )}
      <TourPage locale={locale as Locale} slug={slug} />
    </>
  );
}
