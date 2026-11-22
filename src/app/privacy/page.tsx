
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Transport Navigator",
  description:
    "Read Transport Navigator Ltd's Privacy Policy, including how we collect, use, store and protect personal information.",
};

const pdfUrl =
  "/Transport%20Navigator%20Privacy%20Policy.pdf";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9fc]">
      <section className="bg-[#1c1040] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#f7b548]">
            Legal Information
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/80">
            Your privacy matters to us. This policy explains
            how Transport Navigator Ltd collects, uses,
            stores and protects your personal information
            in accordance with UK data protection law.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-[#1c1040]">
            Transport Navigator Ltd
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Our full Privacy Policy explains how we handle
            personal information relating to passenger
            enquiries, booking administration, journey
            records, data security, retention and your
            rights under the UK GDPR.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#1c1040] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#32225b]"
            >
              Open Full Privacy Policy
            </a>

            <a
              href={pdfUrl}
              download="Transport-Navigator-Privacy-Policy.pdf"
              className="inline-flex items-center justify-center rounded-lg border border-[#1c1040] px-6 py-3 text-sm font-semibold text-[#1c1040] transition hover:bg-gray-50"
            >
              Download PDF
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-[#1c1040]">
                Full Privacy Policy
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                258-page document
              </p>
            </div>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#1c1040] underline underline-offset-4"
            >
              View in new tab
            </a>
          </div>

          <iframe
            src={`${pdfUrl}#toolbar=1`}
            title="Transport Navigator Privacy Policy"
            className="h-[75vh] min-h-[550px] w-full border-0 sm:h-[85vh]"
          />
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#1c1040]">
            Privacy Enquiries
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            If you have questions about how we handle
            personal information or wish to exercise your
            data protection rights, please contact us.
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Email: </strong>
              <a
                href="mailto:info@transportnavigator.co.uk"
                className="text-[#1c1040] underline"
              >
                info@transportnavigator.co.uk
              </a>
            </p>

            <p>
              <strong>Telephone: </strong>
              <a
                href="tel:+442080582750"
                className="text-[#1c1040] underline"
              >
                020 8058 2750
              </a>
            </p>

            <p>
              <strong>Address: </strong>
              684B High Road, Tottenham, London,
              N17 0AE, United Kingdom
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
