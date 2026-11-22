import Link from "next/link";
import { ArrowRight } from "lucide-react";
import categories from "@/src/data/tour-categories.json";
import { categoryHref } from "@/lib/site-utils";
import { text, type Locale } from "@/lib/localization";
import { LazyImage } from "@/components/ui/lazy-image";

export default function TourDirectory({ locale }: { locale: Locale }) {
  return (
    <main className="inner-page">
      <div className="simple-banner">
        <span className="eyebrow">BALI ESCAPE · {locale === "en" ? "TOUR COLLECTION" : "KOLEKSI TUR"}</span>
        <h1>{locale === "en" ? "Find your kind of Bali." : "Temukan Bali versi Anda."}</h1>
        <p>{locale === "en" ? "A handful of thoughtful ways to discover the island." : "Beragam cara pilihan untuk menjelajahi pulau."}</p>
      </div>
      <section className="section listing-section">
        <div className="category-grid">
          {categories.map((category, i) => (
            <Link
              className="category-card"
              data-aos="fade-up"
              data-aos-delay={i * 100}
              suppressHydrationWarning
              href={categoryHref(locale, category.slug)}
              key={category.id}
            >
              <div className="category-image">
                <LazyImage src={category.thumbnail} alt={text(category.title, locale)} />
                <span className="image-number">0{i + 1}</span>
              </div>
              <div className="category-info">
                <div>
                  <h3>{text(category.title, locale)}</h3>
                  <p>{text(category.description, locale)}</p>
                </div>
                <span className="circle-arrow">
                  <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
