
"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";

type BookingFields = {
  passenger_name: string;
  email: string;
  phone: string;
  pickup_address: string;
  destination_address: string;
  pickup_date: string;
  pickup_time: string;
  passengers: string;
  special_requirements: string;
};

type BookingResponse = {
  reference?: string;
  status?: string;
  message?: string;
  error?: string;
};

const initialFields: BookingFields = {
  passenger_name: "",
  email: "",
  phone: "",
  pickup_address: "",
  destination_address: "",
  pickup_date: "",
  pickup_time: "",
  passengers: "1",
  special_requirements: "",
};

const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function BookingForm() {
  const [fields, setFields] =
    useState<BookingFields>(initialFields);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const turnstileRef = useRef<TurnstileInstance>(null);

  function updateField(
    field: keyof BookingFields,
    value: string
  ) {
    setFields((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submitting) return;

    setError("");

    // Cloudflare token is required.
    const token = turnstileRef.current?.getResponse();

    if (!token) {
      setError(
        "Please complete the security verification."
      );
      return;
    }

    // Convert the browser's local date/time to ISO.
    const pickup = new Date(
      `${fields.pickup_date}T${fields.pickup_time}:00`
    );

    if (
      Number.isNaN(pickup.getTime()) ||
      pickup.getTime() <= Date.now() + 15 * 60 * 1000
    ) {
      setError(
        "Please choose a pickup time at least 15 minutes from now."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          passenger_name: fields.passenger_name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          pickup_address: fields.pickup_address.trim(),
          destination_address:
            fields.destination_address.trim(),
          pickup_at: pickup.toISOString(),
          passengers: Number(fields.passengers),
          special_requirements:
            fields.special_requirements.trim(),
          turnstile_token: token,
        }),
      });

      const result =
        (await response.json()) as BookingResponse;

      if (
        response.ok &&
        result.status === "pending_review" &&
        result.reference
      ) {
        setReference(result.reference);
      } else {
        setError(
          result.error ??
            "Unable to submit your request. Please try again."
        );
      }
    } catch {
      setError(
        "We could not verify whether your request was received. Please contact our team before submitting it again."
      );
    } finally {
      turnstileRef.current?.reset();
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="booking-success" role="status">
        <div className="booking-success-icon" aria-hidden="true">
          ✓
        </div>

        <p className="eyebrow">REQUEST RECEIVED</p>

        <h2>Your journey request has been received.</h2>

        <p>
          Thank you for contacting Transport Navigator.
          Your request has been submitted for review.
        </p>

        <div className="booking-reference">
          <span>YOUR REFERENCE</span>
          <strong>{reference}</strong>
        </div>

        <p className="booking-success-note">
          This is not a confirmed booking. Transport
          Navigator must review and accept your
          journey before it is confirmed.
        </p>

        <a
          className="button button-gold"
          href="mailto:info@transportnavigator.co.uk"
        >
          Contact Us
        </a>
      </div>
    );
  }

  return (
    <form
      className="passenger-booking-form"
      onSubmit={handleSubmit}
    >
      <div className="booking-form-heading">
        <span className="booking-section-number">01</span>
        <div>
          <h2>Journey Details</h2>
          <p>Tell us where and when you need to travel.</p>
        </div>
      </div>

      <div className="booking-field">
        <label htmlFor="pickup_address">
          Pickup address <span>*</span>
        </label>
        <input
          id="pickup_address"
          name="pickup_address"
          type="text"
          autoComplete="street-address"
          placeholder="Full pickup address and postcode"
          required
          minLength={5}
          maxLength={500}
          value={fields.pickup_address}
          onChange={(e) =>
            updateField("pickup_address", e.target.value)
          }
        />
      </div>

      <div className="booking-field">
        <label htmlFor="destination_address">
          Destination <span>*</span>
        </label>
        <input
          id="destination_address"
          name="destination_address"
          type="text"
          placeholder="Full destination address and postcode"
          required
          minLength={5}
          maxLength={500}
          value={fields.destination_address}
          onChange={(e) =>
            updateField(
              "destination_address",
              e.target.value
            )
          }
        />
      </div>

      <div className="booking-form-grid">
        <div className="booking-field">
          <label htmlFor="pickup_date">
            Pickup date <span>*</span>
          </label>
          <input
            id="pickup_date"
            name="pickup_date"
            type="date"
            required
            
            value={fields.pickup_date}
            onChange={(e) =>
              updateField("pickup_date", e.target.value)
            }
          />
        </div>

        <div className="booking-field">
          <label htmlFor="pickup_time">
            Pickup time <span>*</span>
          </label>
          <input
            id="pickup_time"
            name="pickup_time"
            type="time"
            required
            value={fields.pickup_time}
            onChange={(e) =>
              updateField("pickup_time", e.target.value)
            }
          />
        </div>
      </div>

      <p className="booking-field-help">
        Pickup time is interpreted using your device's
        local time zone for this development version.
      </p>

      <div className="booking-field">
        <label htmlFor="passengers">
          Number of passengers <span>*</span>
        </label>
        <select
          id="passengers"
          name="passengers"
          required
          value={fields.passengers}
          onChange={(e) =>
            updateField("passengers", e.target.value)
          }
        >
          {Array.from({ length: 8 }, (_, index) => {
            const count = index + 1;

            return (
              <option key={count} value={count}>
                {count} {count === 1 ? "passenger" : "passengers"}
              </option>
            );
          })}
        </select>
        <p className="booking-field-help">
          Availability and suitable vehicle arrangements
          will be reviewed before confirmation.
        </p>
      </div>

      <div className="booking-form-divider" />

      <div className="booking-form-heading">
        <span className="booking-section-number">02</span>
        <div>
          <h2>Passenger Details</h2>
          <p>Provide your contact information.</p>
        </div>
      </div>

      <div className="booking-field">
        <label htmlFor="passenger_name">
          Full name <span>*</span>
        </label>
        <input
          id="passenger_name"
          name="passenger_name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          minLength={2}
          maxLength={120}
          required
          value={fields.passenger_name}
          onChange={(e) =>
            updateField("passenger_name", e.target.value)
          }
        />
      </div>

      <div className="booking-form-grid">
        <div className="booking-field">
          <label htmlFor="email">
            Email address <span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
            value={fields.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
          />
        </div>

        <div className="booking-field">
          <label htmlFor="phone">
            Telephone <span>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your contact number"
            required
            minLength={7}
            maxLength={25}
            pattern="[+()0-9 -]+"
            value={fields.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
          />
        </div>
      </div>

      <div className="booking-field">
        <label htmlFor="special_requirements">
          Additional journey requirements
        </label>
        <textarea
          id="special_requirements"
          name="special_requirements"
          rows={4}
          maxLength={1000}
          placeholder="Luggage, accessibility or other journey arrangements"
          value={fields.special_requirements}
          onChange={(e) =>
            updateField(
              "special_requirements",
              e.target.value
            )
          }
        />
        <p className="booking-field-help">
          Only provide information needed to arrange
          your journey.
        </p>
      </div>

      <div className="booking-form-divider" />

      <div className="booking-form-heading">
        <span className="booking-section-number">03</span>
        <div>
          <h2>Review and Submit</h2>
          <p>Your request is subject to review.</p>
        </div>
      </div>

      <div className="booking-notice">
        <strong>Booking requests require confirmation.</strong>
        <p>
          Submitting this form does not confirm your
          journey. Transport Navigator will review
          your request and contact you regarding
          availability, fare and acceptance.
        </p>
      </div>

      <div className="booking-security">
        <p className="booking-security-title">
          Security verification
        </p>

        {siteKey ? (
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            options={{
              action: "booking",
              theme: "light",
            }}
            onError={() =>
              setError(
                "Security verification failed. Please try again."
              )
            }
            onExpire={() =>
              setError(
                "Security verification expired. Please verify again."
              )
            }
          />
        ) : (
          <p className="booking-error" role="alert">
            Security verification is not configured.
          </p>
        )}
      </div>

      {error && (
        <p className="booking-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="button button-gold booking-submit"
        disabled={submitting || !siteKey}
      >
        {submitting
          ? "Submitting Request..."
          : "Submit Journey Request"}
      </button>

      <p className="booking-submit-help">
        For booking enquiries, email{" "}
        <a href="mailto:info@transportnavigator.co.uk">
          info@transportnavigator.co.uk
        </a>
      </p>
    </form>
  );
}
