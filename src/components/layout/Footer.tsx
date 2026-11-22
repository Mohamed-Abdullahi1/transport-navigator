import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* COMPANY INFORMATION */}
        <div>
          <h2>TRANSPORT NAVIGATOR</h2>

          <p className="footer-tagline">
            {siteConfig.tagline}
          </p>

          <p>
            Pre-booked private hire journeys in London.
            Contact our team to enquire about your
            next journey.
          </p>
        </div>

        {/* QUICK LINKS AND PASSENGER INFORMATION */}
        <div>
          <h3>Quick Links</h3>

          <nav
            className="footer-links"
            aria-label="Footer navigation"
          >
            <Link href="/">Home</Link>
            <Link href="/#journeys">Journey Options</Link>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/book">Journey Enquiries</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>

          <h3
            className="footer-policy-heading"
            style={{ marginTop: "32px", marginBottom: "16px" }}
          >
            Passenger Information
          </h3>

          <nav
            className="footer-links"
            aria-label="Passenger information"
          >
            <Link href="/privacy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Booking Terms &amp; Conditions
            </Link>

            <Link href="/voice-contact">
              Passenger Voice Contact
            </Link>
          </nav>
        </div>

        {/* CONTACT INFORMATION */}
        <div>
          <h3>Contact Us</h3>

          <p>
            For journey enquiries and general assistance,
            email our team or contact us by telephone.
          </p>

          <div style={{ marginTop: "24px" }}>
            <a
              href={siteConfig.emailHref}
              className="footer-email-primary"
            >
              {siteConfig.email}
            </a>
          </div>

          <div style={{ marginTop: "20px" }}>
            <a
              href={siteConfig.emailHref}
              className="footer-email-button"
            >
              Email Us
              <span aria-hidden="true"> →</span>
            </a>
          </div>

          <div style={{ marginTop: "32px" }}>
            <h3 style={{ marginBottom: "12px" }}>
              Telephone
            </h3>

            <a
              href={siteConfig.phoneHref}
              className="vcr-phone"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div style={{ marginTop: "32px" }}>
            <h3 style={{ marginBottom: "12px" }}>
              Our Address
            </h3>

            <p className="footer-contact-label">
              684B High Road, Tottenham,
              London, N17 0AE
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © 2026 Transport Navigator Ltd.
            All rights reserved.
          </p>

          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
