import HomePage from "@/components/home/home-page";
import type { Locale } from "@/components/layout/site-shell";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { TravelAgencySchema } from "@/components/seo/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";

  return buildMetadata({
    title: isId
      ? "Paket Tour & Sewa Mobil Bali Terbaik"
      : "Authentic Bali Tours & Private Car Rental",
    description: isId
      ? "Temukan keindahan Bali bersama Bali Escape. Paket tur Nusa Penida, Kintamani, Ubud, ATV & Rafting terpercaya, serta sewa mobil privat termasuk supir dan BBM."
      : "Discover unforgettable Bali day tours, Nusa Penida island trips, Ubud culture, and private car rentals with dedicated local drivers.",
    path: `/${locale}`,
    locale: locale as Locale,
    keywords: [
      "Bali tours",
      "Bali private driver",
      "Nusa Penida tour",
      "Kintamani volcano trip",
      "Ubud rice terrace tour",
      "Ayung rafting",
      "Bali ATV adventure",
      "paket liburan bali",
      "sewa mobil bali supir",
    ],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <TravelAgencySchema locale={locale as Locale} />
      <HomePage locale={locale as Locale} />
    </>
  );
}
