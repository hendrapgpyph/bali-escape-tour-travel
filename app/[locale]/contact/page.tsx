import { ContactPage } from "@/components/common/content-pages";
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
    title: isId ? "Hubungi Kami — Konsultasi Tur Bali" : "Contact Us — Plan Your Bali Trip",
    description: isId
      ? "Hubungi tim Bali Escape melalui WhatsApp atau Email untuk konsultasi rencana perjalanan, pemesanan tur kustom, atau reservasi mobil dengan supir."
      : "Get in touch with our friendly local Bali team. We’re here to help you plan custom itineraries, private tours, or airport car transfers.",
    path: `/${locale}/contact`,
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
          { name: isId ? "Kontak" : "Contact", url: `/${locale}/contact` },
        ]}
      />
      <ContactPage locale={locale as Locale} />
    </>
  );
}
