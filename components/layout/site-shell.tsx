"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, CarFront, ChevronDown, Compass, Heart, Menu, MessageCircle, Palmtree, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import site from "@/src/data/site.json";
import categories from "@/src/data/tour-categories.json";
import navData from "@/src/data/navigation.json";
import pages from "@/src/data/pages.json";

import { text, type Locale } from "@/lib/localization";
import { categoryHref, whatsappHref } from "@/lib/site-utils";
import { NavigationProgress } from "@/components/ui/navigation-progress";

export type { Locale } from "@/lib/localization";

export function SiteShell({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Pages that feature a dark hero or full-bleed banner where the navbar starts transparent
  const isHeroPage =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname.includes("/about-us") ||
    pathname.includes("/tour/") ||
    (pathname.startsWith(`/${locale}/tours/`) && pathname.split("/").filter(Boolean).length > 2);

  useEffect(() => {
    // Delay AOS init slightly so React 19 finishes DOM hydration cleanly without attribute mismatches
    const timer = setTimeout(() => {
      AOS.init({
        duration: 650,
        once: true,
        offset: 60,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
      AOS.refresh();
    }, 150);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Check initial scroll on mount
    onScroll();

    const saved = window.localStorage.getItem("tour-travel-locale");
    if (!pathname.startsWith(`/${locale}/`) && (saved === "id" || saved === "en") && saved !== locale) {
      router.replace(`/${saved}`);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [locale, pathname, router]);

  const switchLocale = (next: Locale) => {
    window.localStorage.setItem("tour-travel-locale", next);
    if (pathname === "/" || pathname === `/${locale}`) router.push(`/${next}`);
    else router.push(pathname.replace(`/${locale}`, `/${next}`));
  };

  const base = `/${locale}`;
  const labels = navData.items;
  const paths = [base, `${base}/tours`, `${base}/car-rental`, `${base}/about-us`, `${base}/contact`];

  return (
    <>
      {/* Top UX Loading Bar for Fast Navigation Feedback */}
      <NavigationProgress />

      <header
        className={`site-header ${
          scrolled
            ? "is-scrolled"
            : isHeroPage
            ? "is-transparent"
            : "is-solid"
        } ${menuOpen ? "menu-is-open" : ""}`}
      >
        <div className="nav-inner">
          <Link className="brand" href={base}>
            <span className="brand-mark">
              <Palmtree size={29} />
            </span>
            <span>
              <b>Bali Escape</b>
              <small>Tours & Experiences</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href={paths[0]}>{text(labels[0].label, locale)}</Link>
            <div className="nav-dropdown">
              <Link href={paths[1]}>
                {text(labels[1].label, locale)} <ChevronDown size={13} />
              </Link>
              <div className="dropdown-panel">
                {categories.map((c) => (
                  <Link key={c.id} href={categoryHref(locale, c.slug)}>
                    {text(c.title, locale)}
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
            {labels.slice(2).map((item, i) => (
              <Link key={item.href} href={paths[i + 2]}>
                {text(item.label, locale)}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="language-switch">
              <button aria-label="English" className={locale === "en" ? "active" : ""} onClick={() => switchLocale("en")}>
                EN
              </button>
              <span>|</span>
              <button aria-label="Bahasa Indonesia" className={locale === "id" ? "active" : ""} onClick={() => switchLocale("id")}>
                ID
              </button>
            </div>
            <a
              className="button button-orange nav-book"
              href={whatsappHref(locale === "en" ? "Hello! I’d love to plan a Bali trip." : "Halo! Saya ingin merencanakan perjalanan ke Bali.")}
            >
              {locale === "en" ? "Book Now" : "Pesan Sekarang"}
              <ArrowRight size={15} />
            </a>
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {labels.map((item, i) => (
              <Link key={item.href} onClick={() => setMenuOpen(false)} href={paths[i]}>
                {text(item.label, locale)}
              </Link>
            ))}
            <div className="mobile-subnav">
              {categories.map((c) => (
                <Link key={c.id} onClick={() => setMenuOpen(false)} href={categoryHref(locale, c.slug)}>
                  {text(c.title, locale)}
                </Link>
              ))}
            </div>
            <div className="mobile-languages">
              <button onClick={() => switchLocale("en")}>English</button>
              <button onClick={() => switchLocale("id")}>Bahasa Indonesia</button>
            </div>
          </nav>
        )}
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link className="brand" href={base}>
              <span className="brand-mark">
                <Palmtree size={28} />
              </span>
              <span>
                <b>Bali Escape</b>
                <small>Tours & Experiences</small>
              </span>
            </Link>
            <p>{text(pages.footer.description, locale)}</p>
          </div>
          <div>
            <h3>{locale === "en" ? "Explore" : "Jelajahi"}</h3>
            {labels.map((item, i) => (
              <Link key={item.href} href={paths[i]}>
                {text(item.label, locale)}
              </Link>
            ))}
          </div>
          <div>
            <h3>{locale === "en" ? "Our tours" : "Tur kami"}</h3>
            {categories.map((c) => (
              <Link key={c.id} href={categoryHref(locale, c.slug)}>
                {text(c.title, locale)}
              </Link>
            ))}
          </div>
          <div>
            <h3>{locale === "en" ? "Say hello" : "Hubungi kami"}</h3>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>{site.address}</p>
            <a href={whatsappHref(locale === "en" ? "Hello!" : "Halo!")}>WhatsApp</a>
            <div className="social-links">
              <a href={site.social.instagram}>Instagram</a>
              <a href={site.social.facebook}>Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Bali Escape. {text(pages.footer.copyright, locale)}
          </span>
          <span>{locale === "en" ? "Island time, thoughtfully planned." : "Waktu di pulau, direncanakan dengan sepenuh hati."}</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappHref(locale === "en" ? "Hello! I’d love to know more about Bali tours." : "Halo! Saya ingin mengetahui lebih lanjut tentang tur Bali.")}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={21} />
      </a>
      {showTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
          <ArrowUp size={19} />
        </button>
      )}
    </>
  );
}

export function SectionTitle({ eyebrow, title, centered = false }: { eyebrow: string; title: string; centered?: boolean }) {
  return (
    <div className={`section-title ${centered ? "centered" : ""}`} data-aos="fade-up" suppressHydrationWarning>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export const ReasonIcon = ({ name }: { name: string }) =>
  name === "compass" ? <Compass /> : name === "car" ? <CarFront /> : name === "heart" ? <Heart /> : <MessageCircle />;
