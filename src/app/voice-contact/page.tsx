
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passenger Voice Contact | Transport Navigator",
  description:
    "Speak to Transport Navigator about your private hire booking, journey or passenger concern.",
};

export default function VoiceContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9fc]">
      <section className="bg-[#1c1040] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#f7b548]">
            Passenger Support
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Passenger Voice Contact
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/80">
            Contact Transport Navigator directly to speak
            with a member of our team about your booking,
            ongoing journey or any concerns regarding
            your transport service.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f7b548]/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1040"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.04 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.68A2 2 0 0 1 22 16.92Z" />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl font-bold text-[#1c1040]">
            Speak to Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600">
            Our passenger voice contact facility allows you
            to raise concerns, discuss an accepted booking
            or seek assistance regarding your journey.
          </p>

          <a
            href="tel:+442080582750"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#1c1040] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#32225b]"
          >
            Call 020 8058 2750
          </a>

          <p className="mt-4 text-sm text-gray-500">
            Tap the button to call us directly.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Booking Assistance",
              description:
                "Speak to our team about an accepted booking or collection arrangements.",
            },
            {
              title: "Journey Concerns",
              description:
                "Report concerns involving your driver, vehicle or ongoing journey.",
            },
            {
              title: "Complaints & Lost Property",
              description:
                "Contact us about a complaint or an item you may have left behind.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-bold text-[#1c1040]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 sm:p-9">
          <h2 className="text-xl font-bold text-[#1c1040]">
            Voice Contact Availability
          </h2>

          <p className="mt-4 text-sm leading-8 text-gray-600">
            Our passenger voice contact facility is provided
            during our operating hours and whenever a journey
            arranged by Transport Navigator is being undertaken,
            in accordance with applicable private hire operator
            requirements.
          </p>

          <p className="mt-4 text-sm leading-8 text-gray-600">
            This facility is intended to enable passengers
            to speak directly with a person about an accepted
            booking or transport-related concern.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 sm:p-9">
          <h2 className="text-xl font-bold text-[#1c1040]">
            Other Ways to Contact Us
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            For non-urgent general enquiries, you can also
            contact Transport Navigator by email.
          </p>

          <a
            href="mailto:info@transportnavigator.co.uk"
            className="mt-5 inline-block font-semibold text-[#1c1040] underline underline-offset-4"
          >
            info@transportnavigator.co.uk
          </a>

          <p className="mt-5 text-sm leading-7 text-gray-600">
            Transport Navigator Ltd
            <br />
            684B High Road, Tottenham
            <br />
            London, N17 0AE
          </p>
        </div>
      </section>
    </main>
  );
}
