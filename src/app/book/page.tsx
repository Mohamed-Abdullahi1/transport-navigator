
import type { Metadata } from "next";
import BookingForm from "@/components/booking/BookingForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request a Journey",
  description:
    "Request pre-booked private hire transport with Transport Navigator in London.",
};

export default function BookingPage() {
  return (
    <main className="page-main">
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow">PRIVATE HIRE BOOKING</p>

          <h1>Request a Journey</h1>

          <p>
            Provide your journey details using the form
            below. Our team will review your request
            before confirming any booking.
          </p>
        </div>
      </section>

      <section className="container booking-page-layout">
        <div className="booking-form-card">
          <BookingForm />
        </div>

        <aside className="booking-sidebar">
          <div className="booking-sidebar-card">
            <p className="eyebrow">TRANSPORT NAVIGATOR</p>

            <h2>Booking Information</h2>

            <div className="booking-sidebar-item">
              <span>01</span>
              <div>
                <strong>Submit your request</strong>
                <p>
                  Enter your journey and contact details.
                </p>
              </div>
            </div>

            <div className="booking-sidebar-item">
              <span>02</span>
              <div>
                <strong>We review the details</strong>
                <p>
                  Our team checks availability and
                  the proposed fare.
                </p>
              </div>
            </div>

            <div className="booking-sidebar-item">
              <span>03</span>
              <div>
                <strong>Receive confirmation</strong>
                <p>
                  A booking is confirmed only after
                  Transport Navigator accepts it.
                </p>
              </div>
            </div>
          </div>

          <div className="booking-sidebar-contact">
            <h2>Need assistance?</h2>

            <p>
              Email our team with your booking enquiry.
            </p>

            <a href={siteConfig.emailHref}>
              Contact Us <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
