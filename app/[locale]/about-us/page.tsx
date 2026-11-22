import { AboutPage } from "@/components/common/content-pages";
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
    title: isId ? "Tentang Kami — Cerita Bali Escape" : "About Us — The Bali Escape Story",
    description: isId
      ? "Kenali tim lokal di balik Bali Escape. Kami hadir dengan komitmen menghadirkan pengalaman liburan autentik, nyaman, dan berkesan di Pulau Dewata."
      : "Learn more about Bali Escape, our local storytelling team, and our commitment to thoughtful itineraries and genuine island hospitality.",
    path: `/${locale}/about-us`,
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
          { name: isId ? "Tentang Kami" : "About Us", url: `/${locale}/about-us` },
        ]}
      />
      <AboutPage locale={locale as Locale} />
    </>
  );
}
