import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export default function Header() {
  const navigation = siteConfig.navigation.map((item) =>
    item.label.toLowerCase() === "contact"
      ? { ...item, href: "/contact" }
      : item
  );

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo */}
        <Link
          href="/"
          className="brand-link"
          aria-label="Transport Navigator homepage"
        >
          <Image
            src="/images/transport-navigator-logo.png"
            alt="Transport Navigator"
            width={540}
            height={180}
            priority
            className="brand-logo"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="desktop-navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="header-actions">
          <a
            className="header-phone"
            href="tel:+442080582750"
            aria-label="Call Transport Navigator on 020 8058 2750"
          >
            020 8058 2750
          </a>

          <Link
            href="/book"
            className="button button-gold header-book"
          >
            Book a Journey
          </Link>
        </div>

        {/* Mobile navigation */}
        <details className="mobile-menu">
          <summary aria-label="Toggle navigation menu">
            <span />
            <span />
            <span />
          </summary>

          <nav
            className="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}

            <Link
              href="/book"
              className="button button-gold"
            >
              Book a Journey
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
