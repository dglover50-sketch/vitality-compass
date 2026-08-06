import { createFileRoute, Link } from "@tanstack/react-router";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, useRef } from "react";
import { startTrial } from "~/lib/stripe-trial";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const cardElementRef = useRef<any>(null);

  // Mount Stripe Elements
  useEffect(() => {
    let mounted = true;
    stripePromise.then((stripe) => {
      if (!stripe || !mounted || !cardRef.current) return;
      const elements = stripe.elements();
      const card = elements.create("card", {
        style: {
          base: {
            fontSize: "16px",
            fontFamily: '"Inter", system-ui, sans-serif',
            color: "#44403C",
            "::placeholder": { color: "#A8A29E" },
          },
        },
      });
      card.mount(cardRef.current);
      cardElementRef.current = card;
    });
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe || !cardElementRef.current) {
        throw new Error("Stripe not initialized");
      }

      // Create payment method from card element
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElementRef.current,
        billing_details: { name, email },
      });

      if (pmError) throw new Error(pmError.message);
      if (!paymentMethod) throw new Error("Failed to create payment method");

      // Call server function to create trial subscription
      const result = await startTrial({
        data: {
          name,
          email,
          paymentMethodId: paymentMethod.id,
        },
      });

      setSuccess(true);
      // Save trial info to sessionStorage for dashboard access
      sessionStorage.setItem("vc_trial", JSON.stringify({
        inTrial: true,
        daysRemaining: 7,
        trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }));
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-dvh bg-warm-50">
        <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white shadow-sm">VC</span>
              <span className="font-heading text-base font-semibold text-warm-900">Vitality Compass</span>
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-teal-100 text-4xl">🎉</span>
          <h1 className="mt-6 font-heading text-3xl font-bold text-warm-900">Your trial has started!</h1>
          <p className="mt-4 font-body text-base text-warm-700">
            You have <strong className="text-teal-700">7 days</strong> of full access to Vitality Compass.
            Your card will be charged $19 on{" "}
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-8 py-3 font-body text-base font-medium text-white shadow-sm transition-all hover:bg-teal-600"
            >
              Go to Your Dashboard
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/assessment" className="font-body text-sm font-medium text-teal-700 hover:text-teal-600">
              Take Your Wellness Assessment →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-warm-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white shadow-sm">VC</span>
            <span className="font-heading text-base font-semibold text-warm-900">Vitality Compass</span>
          </Link>
          <Link to="/" className="font-body text-sm font-medium text-warm-700 hover:text-teal-700">Home</Link>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-2xl">🧭</span>
          <h1 className="mt-4 font-heading text-2xl font-bold text-warm-900 sm:text-3xl">
            Start Your Free Trial
          </h1>
          <p className="mt-3 font-body text-base text-warm-700">
            7 days free, then $19/month. Cancel anytime.
          </p>
        </div>

        {/* Trial info card */}
        <div className="mt-6 rounded-xl bg-teal-50 p-4 ring-1 ring-teal-100">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-sm text-white">7</span>
            <div>
              <p className="font-heading text-sm font-semibold text-teal-800">What you get:</p>
              <ul className="mt-1 space-y-1 font-body text-sm text-teal-700">
                <li>• Full wellness assessment</li>
                <li>• Personalized nutrition, movement, sleep & mindset plan</li>
                <li>• Weekly check-ins & plan adjustments</li>
                <li>• Community chat access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-warm-700" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Smith"
              className="mt-1.5 block w-full rounded-lg border border-warm-300 bg-white px-4 py-3 font-body text-sm text-warm-900 placeholder:text-warm-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-warm-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@example.com"
              className="mt-1.5 block w-full rounded-lg border border-warm-300 bg-white px-4 py-3 font-body text-sm text-warm-900 placeholder:text-warm-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-warm-700">
              Card Details
            </label>
            <div
              ref={cardRef}
              className="mt-1.5 rounded-lg border border-warm-300 bg-white px-4 py-3"
            />
            <p className="mt-1 font-body text-xs text-warm-500">
              Your card won't be charged until the trial ends. Cancel anytime.
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 font-body text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-body text-base font-medium text-white shadow-sm transition-all hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating your trial...
              </>
            ) : (
              "Start Free Trial"
            )}
          </button>

          <p className="text-center font-body text-xs text-warm-500">
            By starting your trial, you agree to our terms. Your card will be charged
            $19/month after 7 days. Cancel anytime from your dashboard.
          </p>
        </form>
      </div>
    </div>
  );
}