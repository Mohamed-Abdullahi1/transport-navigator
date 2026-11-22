
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Transport Navigator for private hire booking assistance and enquiries.",
};

export default function ContactPage() {
  return (
    <main className="page-main">
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow">CONTACT</p>
          <h1>Contact Transport Navigator</h1>
          <p>
            For booking enquiries or help arranging your
            journey, contact our team.
          </p>
        </div>
      </section>

      <section className="container contact-page-grid section">
        <div className="contact-detail">
          <p className="eyebrow">TELEPHONE</p>
          <h2>Speak to our team</h2>
          <a
            href={siteConfig.phoneHref}
            className="contact-number"
          >
            {siteConfig.phone}
          </a>
          <p>
            Call for passenger booking enquiries and
            assistance with your journey.
          </p>
        </div>

        <div className="contact-detail">
          <p className="eyebrow">ONLINE BOOKINGS</p>
          <h2>Arrange a journey</h2>
          <p>
            Provide your pickup location, destination
            and journey details through our booking page.
          </p>
          <Link href="/book" className="button button-gold">
            Book a Journey
          </Link>
        </div>
      </section>
    </main>
  );
}
