
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  points?: string[];
};

export type Policy = {
  title: string;
  description: string;
  sections: PolicySection[];
};

export default function PolicyPage({
  policy,
}: {
  policy: Policy;
}) {
  return (
    <main className="page-main">
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow">
            TRANSPORT NAVIGATOR | PASSENGER INFORMATION
          </p>

          <h1>{policy.title}</h1>
          <p>{policy.description}</p>
        </div>
      </section>

      <div className="container policy-layout">
        <article className="policy-article">
          <div className="policy-metadata">
            <span>Version 1.0</span>
            <span>Prepared: 20 November 2026</span>
          </div>

          <div className="policy-review-notice">
            <strong>Policy undergoing final review</strong>
            <p>
              This document is a draft pending confirmation
              of Transport Navigator's legal and operational
              details. It does not replace the specific terms
              agreed when a journey is accepted.
            </p>
          </div>

          {policy.sections.map((section, index) => (
            <section
              key={section.heading}
              className="policy-section"
            >
              <h2>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="policy-contact-box">
            <h2>Contact Transport Navigator</h2>
            <p>
              For written enquiries, please email our team.
              For an existing booking or active journey,
              you can also speak to us by telephone.
            </p>

            <a href={siteConfig.emailHref}>
              {siteConfig.email}
            </a>

            <a href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
          </div>
        </article>

        <aside className="policy-sidebar">
          <h2>Passenger Information</h2>
          <nav aria-label="Passenger policies">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Booking Terms</Link>
            <Link href="/cancellations">Cancellations & Refunds</Link>
            <Link href="/complaints">Complaints Procedure</Link>
            <Link href="/passenger-safety">Passenger Safety</Link>
            <Link href="/voice-contact">Voice Contact</Link>
          </nav>
        </aside>
      </div>
    </main>
  );
}
