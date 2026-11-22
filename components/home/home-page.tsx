import Link from "next/link";
import { ArrowRight, Clock3, Compass, HeartHandshake, MoveUpRight, Palmtree, ShieldCheck, Sparkles, Star } from "lucide-react";
import categories from "@/src/data/tour-categories.json";
import cars from "@/src/data/cars.json";
import pages from "@/src/data/pages.json";
import site from "@/src/data/site.json";
import { ReasonIcon, SectionTitle } from "@/components/layout/site-shell";
import { categoryHref, money, whatsappHref } from "@/lib/site-utils";
import { text, type Locale } from "@/lib/localization";
import { LazyImage } from "@/components/ui/lazy-image";

export default function HomePage({ locale }: { locale: Locale }) {
  const copy = pages.home;

  const trustHighlights = [
    {
      icon: Palmtree,
      title: locale === "en" ? "Handpicked Tours" : "Tur Pilihan Terbaik",
      desc: locale === "en" ? "100% Curated Experiences" : "Pengalaman Terkurasi",
    },
    {
      icon: ShieldCheck,
      title: locale === "en" ? "Private Fleet" : "Armada Privat",
      desc: locale === "en" ? "Clean AC Cars & Drivers" : "Mobil Bersih & Sopir Ahli",
    },
    {
      icon: Star,
      title: locale === "en" ? "4.9/5 Guest Rating" : "Rating 4.9/5 Bintang",
      desc: locale === "en" ? "Trusted by Travelers" : "Dipercaya Wisatawan",
    },
    {
      icon: HeartHandshake,
      title: locale === "en" ? "Direct WhatsApp" : "Respon WhatsApp",
      desc: locale === "en" ? "Instant Booking Support" : "Bantuan Cepat & Ramah",
    },
  ];

  return (
    <main>
      {/* Immersive Panoramic Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5, 42, 61, 0.62) 0%, rgba(5, 42, 61, 0.15) 75%), url('${site.heroImage}')`,
        }}
      >
        <div className="hero-content hero-fade-in" suppressHydrationWarning>
          <span className="hero-kicker">
            <Sparkles size={14} />
            {text(copy.eyebrow, locale)}
          </span>
          <h1>
            {text(copy.heroLine1, locale)}
            <br />
            <em>{text(copy.heroLine2, locale)}</em>
          </h1>
          <p>{text(copy.heroDescription, locale)}</p>
          <div className="hero-cta-group">
            <Link className="button button-orange" href={categoryHref(locale, categories[0].slug)}>
              {text(copy.browse, locale)}
              <ArrowRight size={16} />
            </Link>
            <a
              className="button button-glass"
              href={whatsappHref(locale === "en" ? "Hello! Let’s plan my custom Bali trip." : "Halo! Saya ingin merencanakan tur kustom di Bali.")}
            >
              {locale === "en" ? "Chat on WhatsApp" : "Tanya via WhatsApp"}
            </a>
          </div>
        </div>

        <div className="hero-note">
          <span>08° 20′ S</span>
          <i />
        </div>
        <div className="hero-bottom-label">BALI · INDONESIA</div>
      </section>

      {/* Floating Trust & Highlights Bar bridging Hero and Tour Grid */}
      <div className="hero-highlights-wrapper hero-fade-in-up" suppressHydrationWarning>
        <div className="hero-highlights-strip">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="hero-highlight-item">
                <span className="highlight-icon">
                  <Icon size={18} />
                </span>
                <div className="highlight-text">
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Tours Section with Modern Floating Overlap Grid */}
      <section className="section categories-section categories-overlap" id="tours">
        <div className="section-head">
          <SectionTitle
            eyebrow={locale === "en" ? "FIND YOUR KIND OF BALI" : "TEMUKAN BALI VERSI ANDA"}
            title={text(copy.popular, locale)}
          />
          <Link className="text-link" href={categoryHref(locale, categories[0].slug)}>
            {text(copy.viewAll, locale)}
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              className="category-card"
              data-aos="fade-up"
              data-aos-delay={i * 100}
              suppressHydrationWarning
              href={categoryHref(locale, c.slug)}
              key={c.id}
            >
              <div className="category-image">
                <LazyImage src={c.thumbnail} alt={text(c.title, locale)} />
                <span className="image-number">0{i + 1}</span>
              </div>
              <div className="category-info">
                <div>
                  <span className="card-overline">{locale === "en" ? "CURATED EXPERIENCES" : "PENGALAMAN PILIHAN"}</span>
                  <h3>{text(c.title, locale)}</h3>
                  <p>{text(c.description, locale)}</p>
                </div>
                <span className="circle-arrow">
                  <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section section">
        <div className="why-copy">
          <span className="eyebrow">{locale === "en" ? "A LITTLE MORE LOCAL" : "LEBIH DEKAT DENGAN LOKAL"}</span>
          <h2>{text(copy.why, locale)}</h2>
          <p>{text(copy.whyText, locale)}</p>
          <Link className="button button-orange" href={`/${locale}/about-us`}>
            {locale === "en" ? "Our story" : "Cerita kami"}
            <ArrowRight size={15} />
          </Link>
          <div className="why-metrics">
            <div className="why-metric-item">
              <strong>10k+</strong>
              <small>{locale === "en" ? "Happy Guests" : "Wisatawan Puas"}</small>
            </div>
            <div className="why-metric-item">
              <strong>4.9★</strong>
              <small>{locale === "en" ? "Guest Rating" : "Rating Ulasan"}</small>
            </div>
            <div className="why-metric-item">
              <strong>100%</strong>
              <small>{locale === "en" ? "Private Tours" : "Tur Privat"}</small>
            </div>
          </div>
        </div>
        <div className="reason-grid">
          {copy.reasons.map((r, i) => (
            <article className="reason-card" data-aos="fade-up" data-aos-delay={i * 70} suppressHydrationWarning key={r.icon}>
              <span className="reason-icon">
                <ReasonIcon name={r.icon} />
              </span>
              <h3>{text(r.title, locale)}</h3>
              <p>{text(r.text, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Car Rental / Pricelist Section */}
      <section className="section cars-section">
        <div className="section-head">
          <SectionTitle
            eyebrow={locale === "en" ? "ALL-INCLUSIVE FLEET & PRICELIST" : "PRICELIST LENGKAP & SUPIR"}
            title={text(copy.cars, locale)}
          />
          <Link className="text-link" href={`/${locale}/car-rental`}>
            {locale === "en" ? "View car pricelist" : "Lihat semua pricelist"}
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="car-grid">
          {cars.map((car, i) => (
            <article className="car-card" data-aos="fade-up" data-aos-delay={i * 100} suppressHydrationWarning key={car.id}>
              <div className="car-image">
                <LazyImage src={car.image} alt={text(car.title, locale)} />
                <span className="car-tag">
                  <Clock3 size={12} />
                  {locale === "en" ? "INCL. DRIVER & FUEL" : "TERMASUK DRIVER & BBM"}
                </span>
              </div>
              <div className="car-info">
                <h3>{text(car.title, locale)}</h3>
                <p>{text(car.description, locale)}</p>
                <div className="car-price">
                  <strong>{money(car.price)}</strong>
                  <span>/{locale === "en" ? "day (incl. driver)" : "hari (termasuk supir)"}</span>
                  <a
                    href={whatsappHref(
                      locale === "en"
                        ? `Hello, I’m interested in renting the ${text(car.title, locale)} with private driver.`
                        : `Halo, saya tertarik dengan ${text(car.title, locale)} lengkap dengan supir.`
                    )}
                    aria-label={`Book ${text(car.title, locale)}`}
                  >
                    <MoveUpRight size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="cta-section"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(4, 43, 61, 0.76), rgba(4, 43, 61, 0.2)), url('${site.ctaImage}')`,
        }}
      >
        <div className="cta-content" data-aos="fade-up" suppressHydrationWarning>
          <span className="eyebrow">BALI IS CALLING</span>
          <h2>{text(copy.cta, locale)}</h2>
          <p>{text(copy.ctaText, locale)}</p>
          <a
            className="button button-orange"
            href={whatsappHref(locale === "en" ? "Hello! Let’s plan my Bali adventure." : "Halo! Mari rencanakan petualangan Bali saya.")}
          >
            {locale === "en" ? "Let’s talk on WhatsApp" : "Hubungi via WhatsApp"}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
