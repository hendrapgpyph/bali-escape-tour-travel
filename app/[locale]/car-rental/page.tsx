import { CarRentalPage } from "@/components/common/content-pages";
import type { Locale } from "@/components/layout/site-shell";
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
    title: isId ? "Pricelist Sewa Mobil & Supir Bali" : "Bali Car Pricelist with Driver",
    description: isId
      ? "Daftar harga sewa mobil harian di Bali termasuk sopir ramah berpengalaman dan BBM. Pilihan armada Avanza, Innova Zenix, dan HiAce Commuter terawat & ber-AC dingin."
      : "Transparent daily private car rental pricelist in Bali. Includes professional local driver, clean AC vehicles, and fuel. Toyota Avanza, Innova Zenix, and HiAce.",
    path: `/${locale}/car-rental`,
    locale: locale as Locale,
    keywords: [
      "Bali car rental",
      "Bali car pricelist",
      "Bali private driver",
      "sewa mobil bali",
      "pricelist mobil bali",
      "rental mobil supir bbm bali",
      "Innova Zenix Bali",
      "Toyota HiAce Bali",
    ],
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
          { name: isId ? "Pricelist Mobil" : "Car Pricelist", url: `/${locale}/car-rental` },
        ]}
      />
      <CarRentalPage locale={locale as Locale} />
    </>
  );
}
