
import Link from "next/link";
import { journeyTypes, siteConfig } from "@/lib/constants";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">
              London Private Hire
            </p>

            <h1>
              Your journey,
              <span> professionally arranged.</span>
            </h1>

            <p className="hero-description">
              Book your next journey with Transport Navigator.
              Whether you're travelling locally, heading to
              the airport or planning a longer journey,
              arrange your transport through our online
              booking service.
            </p>

            <div className="button-row">
              <Link
                href="/book"
                className="button button-gold"
              >
                Book a Journey
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="mailto:info@transportnavigator.co.uk"
                className="button button-outline"
              >
                Contact Us
              </a>
            </div>

            <p className="hero-small">
              All journeys are subject to booking confirmation.
            </p>
          </div>

          {/* BRANDED HERO PANEL */}
          <div className="hero-panel">
            <div className="panel-accent" />

            <p className="panel-eyebrow">
              TRANSPORT NAVIGATOR
            </p>

            <h2>
              Safe Rides,
              <br />
              Smarter Journeys.
            </h2>

            <div className="panel-divider" />

            <p className="panel-description">
              Pre-booked passenger journeys, arranged
              through our online booking service.
            </p>

            <ul className="hero-features">
              <li>
                <span>✓</span>
                Local journeys
              </li>
              <li>
                <span>✓</span>
                Airport transfers
              </li>
              <li>
                <span>✓</span>
                Long-distance travel
              </li>
            </ul>

            
<div className="panel-bottom">
  <a
    href="mailto:info@transportnavigator.co.uk"
    className="panel-contact"
  >
    <span className="panel-contact-copy">
      <span className="panel-contact-label">
        NEED ASSISTANCE?
      </span>
      <span className="panel-contact-title">
        Get in touch with our team
      </span>
    </span>

    <span className="panel-contact-arrow" aria-hidden="true">
      ↗
    </span>
  </a>
</div>

          </div>
        </div>
      </section>

      {/* JOURNEY OPTIONS */}
      <section id="journeys" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              JOURNEY OPTIONS
            </p>

            <h2>
              Where can we take you?
            </h2>

            <p>
              From local journeys to longer-distance travel,
              enter your journey details through our
              online booking service.
            </p>
          </div>

          <div className="journey-grid">
            {journeyTypes.map((journey) => (
              <article
                className="journey-card"
                key={journey.number}
              >
                <span className="card-number">
                  {journey.number}
                </span>

                <div>
                  <h3>{journey.title}</h3>
                  <p>{journey.description}</p>
                </div>

                <Link
                  href="/book"
                  className="card-link"
                >
                  Book this journey
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="section section-muted"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              ONLINE BOOKING
            </p>

            <h2>
              Booking your journey
            </h2>

            <p>
              Arrange your journey in three straightforward
              steps.
            </p>
          </div>

          <div className="steps-grid">
            <article className="step">
              <span className="step-number">
                01
              </span>

              <h3>Enter your journey details</h3>

              <p>
                Provide your pickup location, destination,
                date, time and passenger information.
              </p>
            </article>

            <article className="step">
              <span className="step-number">
                02
              </span>

              <h3>Submit your booking</h3>

              <p>
                Review your journey details and submit
                them through our booking system.
              </p>
            </article>

            <article className="step">
              <span className="step-number">
                03
              </span>

              <h3>Receive confirmation</h3>

              <p>
                Your journey is confirmed when Transport
                Navigator accepts the booking.
              </p>
            </article>
          </div>

          <Link
            href="/book"
            className="button button-gold steps-button"
          >
            Start Your Booking
          </Link>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="section">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">
              ABOUT US
            </p>

            <h2>
              Passenger transport with a straightforward
              booking process.
            </h2>
          </div>

          <div className="about-content">
            <p>
              Transport Navigator is a London-based
              private hire operator providing pre-booked
              passenger journeys.
            </p>

            <p>
              Our online booking service allows passengers
              to arrange transport in advance by providing
              their journey details.
            </p>

            <p>
              For assistance with a booking or a general
              enquiry, you can contact our team directly
              by email.
            </p>

            <a
              href="mailto:info@transportnavigator.co.uk"
              className="text-link"
            >
              info@transportnavigator.co.uk
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-banner">
        <div className="container contact-banner-inner">
          <div>
            <p className="eyebrow eyebrow-light">
              CONTACT US
            </p>

            <h2>
              Need help arranging your journey?
            </h2>

            <p>
              Email our team for booking assistance,
              enquiries or help with an existing journey.
            </p>
          </div>

          <div className="button-row">
            <a
              href="mailto:info@transportnavigator.co.uk"
              className="button button-white-outline"
            >
              Contact Us
            </a>

            <Link
              href="/book"
              className="button button-gold"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
