import { CategoryPage } from "@/components/common/content-pages";
import categories from "@/src/data/tour-categories.json";
import { text, type Locale } from "@/lib/localization";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/structured-data";

type Params = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = categories.find((x) => x.slug === slug);
  if (!category) return { title: "Tour Collection Not Found" };

  const language = locale as Locale;
  const title = text(category.title, language);
  const description = text(category.description, language);

  return buildMetadata({
    title,
    description,
    path: `/${locale}/tours/${slug}`,
    locale: language,
    image: category.thumbnail,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const category = categories.find((x) => x.slug === slug);
  const isId = locale === "id";

  return (
    <>
      {category && (
        <BreadcrumbSchema
          items={[
            { name: isId ? "Beranda" : "Home", url: `/${locale}` },
            { name: isId ? "Paket Tur" : "Tour Packages", url: `/${locale}/tours` },
            { name: text(category.title, locale as Locale), url: `/${locale}/tours/${slug}` },
          ]}
        />
      )}
      <CategoryPage locale={locale as Locale} slug={slug} />
    </>
  );
}
