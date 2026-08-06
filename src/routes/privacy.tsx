import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const lastUpdated = "2026-07-25";

  return (
    <div className="min-h-screen bg-warm-50">
      {/* ── Header ── */}
      <header className="border-b border-warm-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo-primary.svg"
              alt="Vitality Compass"
              className="h-8 w-8"
            />
            <span className="font-heading text-lg font-semibold text-brand-700">
              Vitality Compass
            </span>
          </Link>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-heading text-4xl font-bold text-warm-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-warm-500">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-10 font-body leading-relaxed text-warm-700">
          {/* Intro */}
          <section>
            <p>
              At <strong>Vitality Compass</strong>, your privacy matters. This
              Privacy Policy explains what information we collect, how we use it,
              and the choices you have. By using our website and services, you agree
              to the terms described here.
            </p>
          </section>

          {/* What we collect */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              1. What Data We Collect
            </h2>
            <p className="mb-2">
              We only collect information that helps us provide you with
              personalized wellness guidance. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Account Information:</strong> your name and email address
                when you create an account or sign up.
              </li>
              <li>
                <strong>Wellness Assessment:</strong> your answers to our health
                assessment questionnaire, covering nutrition, movement, sleep,
                stress, and personal goals.
              </li>
              <li>
                <strong>Payment Information:</strong> credit card details,
                billing address, and transaction history — all processed securely
                by Stripe. We never store your full card number on our servers.
              </li>
              <li>
                <strong>Usage Data:</strong> pages visited, features used, and
                interaction patterns to help us improve the experience.
              </li>
            </ul>
          </section>

          {/* How we use it */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                To create and deliver your personalized wellness roadmap
                (nutrition, movement, sleep, and mindset guidance).
              </li>
              <li>
                To process subscription payments and manage your account.
              </li>
              <li>
                To send weekly check-ins, progress nudges, and relevant wellness
                content (you can opt out anytime).
              </li>
              <li>
                To improve our services by analyzing aggregated, anonymized
                usage patterns.
              </li>
              <li>
                To respond to your questions, feedback, or support requests.
              </li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell your personal data to third parties.
            </p>
          </section>

          {/* Third-party services */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              3. Third-Party Services
            </h2>
            <p className="mb-2">
              We rely on trusted service providers to operate our platform:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Stripe</strong> — processes all payments securely. Stripe
                is PCI-DSS Level 1 compliant.{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 underline hover:text-brand-700"
                >
                  Stripe Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Supabase</strong> — powers our community chat feature.
                Messages and display names are stored on Supabase servers.{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 underline hover:text-brand-700"
                >
                  Supabase Privacy Policy
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Data retention */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              4. Data Retention
            </h2>
            <p>
              We keep your personal data for as long as your account remains
              active. If you cancel your subscription, we retain your data for
              90 days in case you decide to return, after which it is permanently
              deleted. Anonymized, aggregated data may be retained indefinitely
              for analytical purposes.
            </p>
          </section>

          {/* Your rights */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              5. Your Rights
            </h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Access</strong> — request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correct</strong> — update or fix inaccurate information.
              </li>
              <li>
                <strong>Delete</strong> — request that we delete your personal
                data entirely.
              </li>
              <li>
                <strong>Opt out</strong> — unsubscribe from marketing and
                non-essential communications.
              </li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:vitality-compass-7c76c916@ctomail.io"
                className="text-brand-600 underline hover:text-brand-700"
              >
                vitality-compass-7c76c916@ctomail.io
              </a>
              . We'll respond within 30 days.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              6. Security
            </h2>
            <p>
              We use industry-standard encryption (TLS/SSL) to protect your data
              in transit, and we work with secure, SOC 2-compliant infrastructure
              providers. Payment data is never stored on our servers — it's
              handled entirely by Stripe. While we take every reasonable
              precaution, no method of online transmission is 100% secure.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              7. Cookies
            </h2>
            <p>
              We use essential cookies to keep you logged in and to remember your
              preferences. We may also use analytics cookies to understand how
              visitors use our site, but these are anonymized. You can disable
              cookies in your browser settings, though some features may not work
              as intended.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              8. Children's Privacy
            </h2>
            <p>
              Vitality Compass is intended for adults aged 18 and over. We do not
              knowingly collect personal information from children under 13. If
              you believe a child has provided us with their data, please contact
              us and we will delete it promptly.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we'll revise the "Last updated" date at the top of this page. If
              the changes are significant, we'll notify you by email or with a
              prominent notice on our site.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-warm-900 mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or how we handle
              your data, reach out to us:
            </p>
            <p className="mt-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:vitality-compass-7c76c916@ctomail.io"
                className="text-brand-600 underline hover:text-brand-700"
              >
                vitality-compass-7c76c916@ctomail.io
              </a>
            </p>
          </section>
        </div>

        {/* ── Back link ── */}
        <div className="mt-14 border-t border-warm-200 pt-8">
          <Link
            to="/"
            className="font-body text-sm text-brand-600 underline hover:text-brand-700"
          >
            &larr; Back to Vitality Compass
          </Link>
        </div>
      </main>
    </div>
  );
}
