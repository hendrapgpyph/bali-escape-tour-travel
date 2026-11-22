import TourDirectory from "@/components/common/tour-directory";
import type { Locale } from "@/lib/localization";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";

  return buildMetadata({
    title: isId ? "Semua Paket Tur Bali" : "Bali Tour Packages & Day Trips",
    description: isId
      ? "Koleksi lengkap paket wisata Bali Escape: Full Day Tour, Activity Tour petualangan seru, hingga paket multi-hari 4D3N terlengkap di Bali."
      : "Explore our full collection of curated Bali tours, from scenic island day trips and cultural explorations to adrenaline outdoor adventures.",
    path: `/${locale}/tours`,
    locale: locale as Locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isId = locale === "id";

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isId ? "Beranda" : "Home", url: `/${locale}` },
          { name: isId ? "Paket Tur" : "Tour Packages", url: `/${locale}/tours` },
        ]}
      />
      <TourDirectory locale={locale as Locale} />
    </>
  );
}
