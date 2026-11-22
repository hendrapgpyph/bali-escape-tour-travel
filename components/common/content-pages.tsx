"use client";

import { useState } from "react";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { ArrowRight, ArrowUpRight, Check, MapPin, ZoomIn } from "lucide-react";
import categories from "@/src/data/tour-categories.json";
import tours from "@/src/data/tours.json";
import cars from "@/src/data/cars.json";
import pages from "@/src/data/pages.json";
import site from "@/src/data/site.json";
import { SectionTitle } from "@/components/layout/site-shell";
import { categoryHref, money, tourHref, whatsappHref } from "@/lib/site-utils";
import { text, type Locale } from "@/lib/localization";
import { LazyImage } from "@/components/ui/lazy-image";
import { ImageLightbox } from "@/components/ui/image-lightbox";

export function CategoryPage({ locale, slug }: { locale: Locale; slug: string }) {
  const category = categories.find((x) => x.slug === slug);
  if (!category)
    return (
      <main className="not-found">
        <span className="eyebrow">404</span>
        <h1>{locale === "en" ? "That trail ends here." : "Jalur ini tidak ditemukan."}</h1>
        <Link className="button button-orange" href={`/${locale}`}>
          {locale === "en" ? "Back home" : "Kembali"}
        </Link>
      </main>
    );

  const list = tours.filter((t) => t.categoryId === category.id);
  return (
    <main className="inner-page">
      <div
        className="page-banner"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(5,42,61,.65),rgba(5,42,61,.12)),url('${category.thumbnail}')`,
        }}
      >
        <div className="page-banner-copy">
          <div className="breadcrumbs">
            <Link href={`/${locale}`}>{locale === "en" ? "Home" : "Beranda"}</Link>
            <span>/</span>
            {text(category.title, locale)}
          </div>
          <span className="eyebrow">BALI ESCAPE · {locale === "en" ? "TOUR COLLECTION" : "KOLEKSI TUR"}</span>
          <h1>{text(category.title, locale)}</h1>
          <p>{text(category.description, locale)}</p>
        </div>
      </div>
      <section className="section listing-section">
        <SectionTitle
          eyebrow={locale === "en" ? "FIND YOUR NEXT MOMENT" : "TEMUKAN MOMEN BERIKUTNYA"}
          title={locale === "en" ? "Experiences to remember" : "Pengalaman tak terlupakan"}
        />
        <div className="tour-grid">
          {list.map((t) => (
            <Link className="tour-card" key={t.id} href={tourHref(locale, t.slug)}>
              <div className="tour-card-img-wrap">
                <LazyImage src={t.thumbnail} alt={text(t.title, locale)} />
                {t.price && (
                  <span className="tour-price-badge">
                    {money(t.price)}
                    <small>/{t.priceUnit ? text(t.priceUnit, locale) : (locale === "en" ? "person" : "orang")}</small>
                  </span>
                )}
              </div>
              <div className="tour-card-copy">
                <span className="eyebrow">{text(category.title, locale)}</span>
                <h3>{text(t.title, locale)}</h3>
                <p>{text(t.shortDescription, locale)}</p>
                <div className="tour-card-footer">
                  <div className="tour-price-info">
                    <small>{locale === "en" ? "Starts from" : "Mulai dari"}</small>
                    <strong>{money(t.price)}</strong>
                    <span>/{t.priceUnit ? text(t.priceUnit, locale) : (locale === "en" ? "person" : "orang")}</span>
                  </div>
                  <span className="text-link">
                    {locale === "en" ? "Explore" : "Detail"}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function TourPage({ locale, slug }: { locale: Locale; slug: string }) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title?: string; description?: string } | null>(null);

  const tour = tours.find((t) => t.slug === slug);
  if (!tour)
    return (
      <main className="not-found">
        <span className="eyebrow">404</span>
        <h1>{locale === "en" ? "We couldn’t find that tour." : "Tur tidak ditemukan."}</h1>
        <Link className="button button-orange" href={`/${locale}`}>
          {locale === "en" ? "Back home" : "Kembali"}
        </Link>
      </main>
    );

  const category = categories.find((c) => c.id === tour.categoryId)!;
  const related = tours.filter((t) => t.categoryId === tour.categoryId && t.id !== tour.id).slice(0, 3);
  const safeHtml = sanitizeHtml(text(tour.content, locale), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
      a: ["href", "name", "target"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return (
    <main className="inner-page">
      <div
        className="detail-banner"
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(4,35,49,.72),rgba(4,35,49,.02)),url('${tour.banner}')`,
        }}
      >
        <div className="detail-title">
          <div className="breadcrumbs">
            <Link href={`/${locale}`}>{locale === "en" ? "Home" : "Beranda"}</Link>
            <span>/</span>
            <Link href={categoryHref(locale, category.slug)}>{text(category.title, locale)}</Link>
          </div>
          <span className="eyebrow">{text(category.title, locale)} · BALI</span>
          <h1>{text(tour.title, locale)}</h1>
          <p>{text(tour.shortDescription, locale)}</p>
          {tour.price && (
            <div className="detail-price-pill">
              <span className="detail-price-from">{locale === "en" ? "Price from" : "Harga mulai"}</span>
              <strong className="detail-price-val">{money(tour.price)}</strong>
              <span className="detail-price-unit">/{tour.priceUnit ? text(tour.priceUnit, locale) : (locale === "en" ? "person" : "orang")}</span>
            </div>
          )}
        </div>
      </div>
      <article className="article-layout">
        <div>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />
          {tour.itinerary && tour.itinerary.length > 0 && (
            <section className="tour-experience-section">
              <div className="experience-head">
                <span className="eyebrow">
                  {locale === "en" ? "WHAT'S INCLUDED & ITINERARY" : "RENCANA PERJALANAN & YANG DIDAPATKAN"}
                </span>
                <h2>{locale === "en" ? "What you'll experience" : "Yang akan Anda dapatkan"}</h2>
              </div>
              <div className="experience-grid">
                {tour.itinerary.map((item, i) => (
                  <div
                    className="experience-card clickable"
                    key={i}
                    onClick={() =>
                      setLightboxImage({
                        src: item.thumbnail,
                        title: text(item.title, locale),
                        description: text(item.description, locale),
                      })
                    }
                  >
                    <div className="experience-thumb">
                      <LazyImage src={item.thumbnail} alt={text(item.title, locale)} />
                      <span className="experience-thumb-badge" title={locale === "en" ? "Click to view photo" : "Klik untuk perbesar"}>
                        <ZoomIn size={14} />
                      </span>
                    </div>
                    <div className="experience-body">
                      <h3>{text(item.title, locale)}</h3>
                      <p>{text(item.description, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="booking-card">
          {tour.price && (
            <div className="booking-price-header">
              <span className="eyebrow">{locale === "en" ? "TOUR PRICING" : "HARGA PAKET TUR"}</span>
              <div className="booking-main-price">
                <strong>{money(tour.price)}</strong>
                <span>/{tour.priceUnit ? text(tour.priceUnit, locale) : (locale === "en" ? "person" : "orang")}</span>
              </div>
              <span className="booking-price-sub">
                {locale === "en" ? "✓ All inclusive · Professional Guide" : "✓ All inclusive · Pemandu Ahli"}
              </span>
              <div className="booking-divider" />
            </div>
          )}
          <span className="eyebrow">BALI ESCAPE</span>
          <h3>{locale === "en" ? "Make this your Bali story" : "Jadikan ini kisah Bali Anda"}</h3>
          <p>{locale === "en" ? "Let’s find the right day for your island adventure." : "Mari tentukan hari yang tepat untuk petualangan Anda."}</p>
          <a
            className="button button-orange full-button"
            href={whatsappHref(
              locale === "en"
                ? `Hello, I’m interested in booking ${text(tour.title, locale)}${tour.price ? ` (${money(tour.price)}/${tour.priceUnit ? text(tour.priceUnit, locale) : "person"})` : ""}. Could you provide more details?`
                : `Halo, saya tertarik memesan ${text(tour.title, locale)}${tour.price ? ` (${money(tour.price)}/${tour.priceUnit ? text(tour.priceUnit, locale) : "orang"})` : ""}. Bisa berikan detailnya?`
            )}
          >
            {locale === "en" ? "Book this tour" : "Pesan tur ini"}
            <ArrowUpRight size={16} />
          </a>
          <small>
            <MapPin size={13} /> Bali, Indonesia
          </small>
        </aside>
      </article>
      {related.length > 0 && (
        <section className="section related-section">
          <SectionTitle
            eyebrow={locale === "en" ? "KEEP EXPLORING" : "LANJUTKAN JELAJAH"}
            title={locale === "en" ? "You might also love" : "Mungkin Anda juga suka"}
          />
          <div className="tour-grid">
            {related.map((t) => (
              <Link className="tour-card" key={t.id} href={tourHref(locale, t.slug)}>
                <div className="tour-card-img-wrap">
                  <LazyImage src={t.thumbnail} alt={text(t.title, locale)} />
                  {t.price && (
                    <span className="tour-price-badge">
                      {money(t.price)}
                      <small>/{t.priceUnit ? text(t.priceUnit, locale) : (locale === "en" ? "person" : "orang")}</small>
                    </span>
                  )}
                </div>
                <div className="tour-card-copy">
                  <h3>{text(t.title, locale)}</h3>
                  <p>{text(t.shortDescription, locale)}</p>
                  <div className="tour-card-footer">
                    <div className="tour-price-info">
                      <small>{locale === "en" ? "Starts from" : "Mulai dari"}</small>
                      <strong>{money(t.price)}</strong>
                      <span>/{t.priceUnit ? text(t.priceUnit, locale) : (locale === "en" ? "person" : "orang")}</span>
                    </div>
                    <span className="text-link">
                      {locale === "en" ? "Discover" : "Jelajahi"}
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox / Fancybox Modal */}
      <ImageLightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        image={lightboxImage}
      />
    </main>
  );
}

export function CarRentalPage({ locale }: { locale: Locale }) {
  return (
    <main className="inner-page">
      <div className="simple-banner">
        <span className="eyebrow">
          {locale === "en" ? "BALI PRIVATE CAR PRICELIST · ALL INCLUSIVE" : "PRICELIST MOBIL BALI · SUDAH TERMASUK SUPIR"}
        </span>
        <h1>{locale === "en" ? "Car Pricelist" : "Pricelist Mobil"}</h1>
        <p>
          {locale === "en"
            ? "All prices include clean AC private car, professional local driver, fuel, and parking fees."
            : "Semua harga sudah termasuk mobil privat ber-AC, supir lokal berpengalaman, BBM, dan biaya parkir."}
        </p>
      </div>
      <section className="section listing-section">
        <div className="car-grid">
          {cars.map((car) => (
            <article className="car-card rental-card" key={car.id}>
              <div className="car-image">
                <LazyImage src={car.image} alt={text(car.title, locale)} />
              </div>
              <div className="car-info">
                <h2>{text(car.title, locale)}</h2>
                <p>{text(car.description, locale)}</p>
                <ul className="feature-list">
                  {car.features.map((f) => (
                    <li key={f.en}>
                      <Check size={15} />
                      {text(f, locale)}
                    </li>
                  ))}
                </ul>
                <div className="car-price">
                  <strong>{money(car.price)}</strong>
                  <span>/{locale === "en" ? "day (incl. driver)" : "hari (termasuk supir)"}</span>
                  <a
                    href={whatsappHref(
                      locale === "en"
                        ? `Hello, I’d like to book ${text(car.title, locale)} with driver.`
                        : `Halo, saya ingin memesan sewa ${text(car.title, locale)} termasuk supir.`
                    )}
                    aria-label={`Book ${text(car.title, locale)}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const p = pages.about;
  return (
    <main className="inner-page">
      <div
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(4,39,57,.72),rgba(4,39,57,.08)),url('${site.ctaImage}')`,
        }}
      >
        <span className="eyebrow">A LOCAL WAY TO SEE BALI</span>
        <h1>{text(p.title, locale)}</h1>
        <p>{text(p.intro, locale)}</p>
      </div>
      <section className="story-section section">
        <div className="story-image">
          <LazyImage
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1100&q=85"
            alt="Bali coastline"
          />
        </div>
        <div>
          <span className="eyebrow">{locale === "en" ? "OUR STORY" : "CERITA KAMI"}</span>
          <h2>{locale === "en" ? "A little local insight goes a long way." : "Wawasan lokal membawa perjalanan lebih jauh."}</h2>
          <p>{text(p.story, locale)}</p>
          <Link className="button button-orange" href={`/${locale}/contact`}>
            {locale === "en" ? "Let’s plan together" : "Rencanakan bersama"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const p = pages.contact;
  return (
    <main className="inner-page">
      <div className="simple-banner">
        <span className="eyebrow">WE’RE HERE TO HELP</span>
        <h1>{text(p.title, locale)}</h1>
        <p>{text(p.text, locale)}</p>
      </div>
      <section className="contact-layout section">
        <div className="contact-info">
          <a
            className="contact-row"
            href={whatsappHref(locale === "en" ? "Hello! I’d like to plan a Bali trip." : "Halo! Saya ingin merencanakan perjalanan ke Bali.")}
          >
            <span className="reason-icon">
              <MapPin />
            </span>
            <span>
              <small>WHATSAPP</small>
              <b>{site.whatsapp}</b>
            </span>
            <ArrowUpRight />
          </a>
          <a className="contact-row" href={`mailto:${site.email}`}>
            <span className="reason-icon">
              <MapPin />
            </span>
            <span>
              <small>EMAIL</small>
              <b>{site.email}</b>
            </span>
            <ArrowUpRight />
          </a>
          <div className="contact-row">
            <span className="reason-icon">
              <MapPin />
            </span>
            <span>
              <small>{locale === "en" ? "ADDRESS" : "ALAMAT"}</small>
              <b>{site.address}</b>
            </span>
          </div>
          {site.mapEmbedUrl ? (
            <iframe
              className="map-placeholder map-frame"
              title={locale === "en" ? "Bali office map" : "Peta kantor Bali"}
              src={site.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="map-placeholder">
              <MapPin size={28} />
              <span>{locale === "en" ? "Map embed can be configured in src/data/site.json" : "Peta dapat dikonfigurasi di src/data/site.json"}</span>
            </div>
          )}
        </div>
        <div className="contact-photo" style={{ backgroundImage: `url('${site.heroImage}')` }}>
          <span>{locale === "en" ? "See you in Bali" : "Sampai jumpa di Bali"}</span>
        </div>
      </section>
    </main>
  );
}
