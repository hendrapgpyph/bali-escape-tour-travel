"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, CarFront, ChevronDown, Compass, Heart, Menu, MessageCircle, Palmtree, X } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileTourOpen, setMobileTourOpen] = useState(true);
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

  // Close any open menus immediately whenever route/pathname changes
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    AOS.init({
      duration: 550,
      once: true,
      offset: 50,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const saved = window.localStorage.getItem("tour-travel-locale");
    if (!pathname.startsWith(`/${locale}/`) && (saved === "id" || saved === "en") && saved !== locale) {
      router.replace(`/${saved}`);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [locale, pathname, router]);

  const switchLocale = (next: Locale) => {
    window.localStorage.setItem("tour-travel-locale", next);
    if (pathname === "/" || pathname === `/${locale}`) router.push(`/${next}`);
    else router.push(pathname.replace(`/${locale}`, `/${next}`));
  };

  const base = `/${locale}`;
  // Navbar items (About Us is excluded from header navbar per user request)
  const labels = navData.items;
  const paths = [base, `${base}/tours`, `${base}/car-rental`, `${base}/contact`];

  // Footer items (includes About Us for full site exploration)
  const footerLabels = navData.footerItems || navData.items;
  const footerPaths = footerLabels.map((item) => (item.href === "/" ? base : `${base}${item.href}`));

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
          <Link className="brand" href={base} onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
            <span className="brand-mark">
              <Palmtree size={29} />
            </span>
            <span>
              <b>Bali Escape</b>
              <small>Tours & Experiences</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href={paths[0]} onClick={() => setDropdownOpen(false)}>
              {text(labels[0].label, locale)}
            </Link>

            {/* Tour Packages dropdown with instant-hide on click */}
            <div
              className={`nav-dropdown ${dropdownOpen ? "is-open" : ""}`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href={paths[1]}
                onClick={() => {
                  setDropdownOpen(false);
                  setMenuOpen(false);
                }}
              >
                {text(labels[1].label, locale)} <ChevronDown size={13} />
              </Link>
              <div className="dropdown-panel">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={categoryHref(locale, c.slug)}
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {text(c.title, locale)}
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Car Pricelist & Contact */}
            {labels.slice(2).map((item, i) => (
              <Link
                key={item.href}
                href={paths[i + 2]}
                onClick={() => setDropdownOpen(false)}
              >
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
            {labels.map((item, i) => {
              const isTourPackages = item.href === "/tours";
              if (isTourPackages) {
                return (
                  <div key={item.href} className="mobile-nav-group">
                    <div className="mobile-nav-item-with-sub">
                      <Link
                        onClick={() => {
                          setMenuOpen(false);
                          setDropdownOpen(false);
                        }}
                        href={paths[i]}
                      >
                        {text(item.label, locale)}
                      </Link>
                      <button
                        type="button"
                        className={`mobile-sub-toggle ${mobileTourOpen ? "is-open" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileTourOpen(!mobileTourOpen);
                        }}
                        aria-label={mobileTourOpen ? "Collapse submenu" : "Expand submenu"}
                      >
                        <ChevronDown size={17} />
                      </button>
                    </div>
                    {mobileTourOpen && (
                      <div className="mobile-subnav">
                        {categories.map((c) => (
                          <Link
                            key={c.id}
                            onClick={() => {
                              setMenuOpen(false);
                              setDropdownOpen(false);
                            }}
                            href={categoryHref(locale, c.slug)}
                          >
                            <span>{text(c.title, locale)}</span>
                            <ArrowRight size={13} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                  href={paths[i]}
                >
                  {text(item.label, locale)}
                </Link>
              );
            })}
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
            {footerLabels.map((item, i) => (
              <Link key={item.href} href={footerPaths[i]}>
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

            {/* Social Links with Beautiful Modern Icons */}
            <div className="social-links">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon-btn"
              >
                <FacebookIcon size={18} />
              </a>
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
