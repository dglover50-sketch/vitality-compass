import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import { useEffect, useRef, useState } from "react";
import { submitSignup } from "~/lib/signup";
import FloatingQuotes from "~/components/FloatingQuotes";

const getBusinessName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf-8"));
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [signupStatus, setSignupStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSignupStatus("idle");
    try {
      await submitSignup({ data: { email } });
      setSubmitted(true);
      setSignupStatus("success");
      setEmail("");
    } catch {
      // Graceful fallback if DB isn't connected yet
      setSubmitted(true);
      setSignupStatus("success");
      setEmail("");
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col">
      {/* ── Full-page backdrop image ── */}
      <div className="pointer-events-none fixed inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Warm overlay for readability across all sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-50/92 via-warm-50/85 to-warm-50/92" />
      </div>
      <FloatingQuotes />
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo-primary.svg"
              alt="Vitality Compass"
              className="h-11 w-11 sm:hidden"
            />
            <img
              src="/logo-header-lockup.svg"
              alt="Vitality Compass"
              className="h-10"
            />
          </a>
          <nav className="hidden items-center gap-1 sm:flex">
            {/* Mission dropdown */}
            <NavDropdown label="Mission">
              <a href="#mission" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Our Mission
              </a>
            </NavDropdown>

            {/* Pricing dropdown */}
            <NavDropdown label="Pricing">
              <Link to="/signup" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Start Free Trial — $19/mo after 7 days
              </Link>
              <a href="https://buy.stripe.com/00w4gzg4weYt0Mq4ML57W02" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Annual Plan ($169/yr)
              </a>
              <a href="https://buy.stripe.com/4gMfZhbOg3fL52Gcfd57W00" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Health Audit ($49)
              </a>
            </NavDropdown>

            {/* Wellness dropdown */}
            <NavDropdown label="Wellness">
              <Link to="/assessment" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Take Assessment
              </Link>
              <Link to="/dashboard" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Your Dashboard
              </Link>
              <Link to="/resources/meal-prep" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Meal Prep Guide
              </Link>
              <Link to="/resources/detox-challenges" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Detox Challenges
              </Link>
              <Link to="/community" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Community Chat
              </Link>
              <Link to="/feedback" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Send Feedback
              </Link>
              <Link to="/shorts" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Shorts
              </Link>
              <Link to="/android-app" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Android App
              </Link>
            </NavDropdown>

            {/* News dropdown */}
            <NavDropdown label="News">
              <Link to="/news" className="block rounded-lg px-4 py-2 font-body text-sm text-warm-700 transition-colors hover:bg-teal-50 hover:text-teal-700">
                Latest Articles
              </Link>
            </NavDropdown>

            <Link to="/community" className="ml-2 font-body text-sm font-medium text-warm-700 transition-colors hover:text-teal-700">
              Community
            </Link>
            <Link
              to="/assessment"
              className="ml-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-5 py-2.5 font-body text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-600 active:bg-teal-800"
            >
              Get Started
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 text-center sm:px-10 sm:py-28">
        {/* Real stock photo background */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Amber warmth overlay */}
        <div className="pointer-events-none absolute inset-0 bg-hero-amber-overlay" />

        {/* Dark overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-warm-900/60 via-warm-900/50 to-warm-900/70" />

        {/* Animated SVG overlay: human silhouette with veins, organs, and roots */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
          <img
            src="/hero-overlay.svg"
            alt=""
            className="h-full w-full object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Bottom fade to blend with page content */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-50 to-transparent" />

        {/* Badge */}
        <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 font-body text-base font-semibold text-white shadow-sm backdrop-blur-sm sm:text-lg">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
          </span>
          Science-backed. Personalized. Real life.
        </div>

        {/* Main heading */}
        <h1 className="relative font-heading text-balance max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Your personal compass<br />
          <span className="text-amber-400">for vitality</span>
        </h1>

        {/* Subheading */}
        <p className="relative mt-6 max-w-2xl text-balance font-body text-lg leading-relaxed text-warm-100 sm:text-xl">
          No fads, no guilt trips. Get a tailored wellness roadmap covering
          nutrition, movement, sleep, and mindset — adjusted to your goals and
          your schedule.
        </p>

        {/* CTA buttons */}
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3 font-body text-base font-medium text-white shadow-md transition-all hover:bg-amber-400 active:bg-amber-600"
          >
            Start Your Journey
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-7 py-3 font-body text-base font-medium text-white shadow-sm transition-all hover:bg-white/20 active:bg-white/5 backdrop-blur-sm"
          >
            See How It Works
          </a>
        </div>

          {/* Cancel-anytime note */}
          <p className="relative mt-5 font-body text-sm text-warm-200/80">
            Cancel anytime. No risk.
          </p>

          {/* Trust markers */}
        <div className="relative mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-body text-sm text-warm-200">
          <span className="flex items-center gap-1.5">
            <svg className="size-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Science-backed
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="size-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Personalized for you
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="size-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Fits your schedule
          </span>
        </div>
      </section>

      {/* ── Mission Statement Section ── */}
      <section id="mission" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Compass icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-teal-50 shadow-sm">
            <svg className="size-8 text-teal-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>

          {/* Badge */}
          <span className="mt-6 inline-block rounded-full border border-warm-200 bg-white px-4 py-1.5 font-body text-xs font-medium text-warm-500 shadow-sm">
            Our Mission
          </span>

          {/* Mission statement */}
          <blockquote className="mt-8 font-heading text-balance text-2xl font-semibold leading-snug tracking-tight text-warm-900 sm:text-3xl md:text-4xl">
            &ldquo;To guide you on a holistic journey toward vitality — uniting
            mind, body, and spirit through personalized wellness that
            reconnects you with nature and fits into real life. Science-backed
            wisdom, not noise.&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="mt-8 flex items-center justify-center gap-3 text-warm-500">
            <span className="h-px w-8 bg-warm-200" />
            <span className="font-body text-sm font-medium text-teal-700">Vitality Compass</span>
            <span className="h-px w-8 bg-warm-200" />
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="bg-warm-gradient px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl">
              Your complete wellness toolkit
            </h2>
            <p className="mx-auto mt-4 max-w-3xl font-body text-lg leading-relaxed text-warm-700">
              Four interconnected pillars, one personalized plan. No one-size-fits-all
              advice here.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200 transition-all hover:shadow-md"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-teal-50 text-2xl transition-colors group-hover:bg-teal-100">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-heading text-lg font-semibold text-warm-900">
                  {feature.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-warm-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section id="how-it-works" className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-3xl font-body text-lg leading-relaxed text-warm-700">
              Three simple steps to a plan that actually fits your life.
            </p>
          </div>
          <div className="mt-16 grid gap-12 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-gradient font-heading text-2xl font-bold text-white shadow-md">
                  {i + 1}
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-warm-900">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-warm-700">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          {/* Connected line on desktop */}
          <div className="mx-auto mt-8 hidden max-w-2xl justify-between sm:flex">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-0.5 w-full max-w-24 rounded-full bg-teal-200" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section id="pricing" className="bg-warm-gradient px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-3xl font-body text-lg leading-relaxed text-warm-700">
              Start with a one-time health audit, or commit to ongoing guidance.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-xl p-8 ${
                  plan.featured
                    ? "border-2 border-teal-700 bg-white shadow-md"
                    : "border border-warm-200 bg-white shadow-sm"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-700 px-4 py-1 font-body text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-semibold text-warm-900">
                  {plan.name}
                </h3>
                <p className="mt-2 font-body text-sm text-warm-700">{plan.description}</p>
                <div className="mt-6">
                  <span className="font-heading text-4xl font-bold text-warm-900">
                    ${plan.price}
                  </span>
                  <span className="ml-1 font-body text-sm text-warm-500">
                    {plan.period}
                  </span>
                </div>
                {plan.savings && (
                  <p className="mt-1 font-body text-xs font-semibold text-amber-500">
                    {plan.savings}
                  </p>
                )}
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-sm text-warm-700">
                      <svg className="mt-0.5 size-4 flex-shrink-0 text-teal-700" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block w-full rounded-lg py-3 text-center font-body text-sm font-semibold transition-all ${
                    plan.featured
                      ? "bg-teal-700 text-white shadow-sm hover:bg-teal-600 active:bg-teal-800"
                      : "border border-warm-200 bg-white text-warm-700 hover:border-teal-200 hover:text-teal-700"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email Signup Section ── */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-relaxed text-warm-700">
            Be the first to know when we launch. Get science-backed wellness tips
            straight to your inbox.
          </p>
          {submitted ? (
            <div className="mx-auto mt-10 max-w-md rounded-xl bg-teal-50 p-6 ring-1 ring-teal-100">
              <p className="font-body text-lg font-medium text-teal-800">
                You're on the list! 🎉 Check your inbox for a welcome note.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-warm-200 bg-white px-5 py-3 font-body text-sm text-warm-900 placeholder-warm-500 outline-none ring-teal-200 focus:border-teal-500 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-lg bg-teal-700 px-8 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 active:bg-teal-800"
              >
                Get Updates
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-gradient px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-primary.svg"
              alt="Vitality Compass"
              className="h-8 w-8 brightness-0 invert"
            />
            <span className="font-heading text-base font-semibold text-white">
              Vitality Compass
            </span>
          </div>
          <div className="flex items-center gap-6 font-body text-sm text-warm-200">
            <Link to="/assessment" className="transition-colors hover:text-white">
              Assessment
            </Link>
            <Link to="/dashboard" className="transition-colors hover:text-white">
              Dashboard
            </Link>
            <Link to="/community" className="transition-colors hover:text-white">
              Community
            </Link>
            <Link to="/feedback" className="transition-colors hover:text-white">
              Feedback
            </Link>
            <Link to="/news" className="transition-colors hover:text-white">
              News
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <a href="#features" className="transition-colors hover:text-white">
              Features
            </a>
          </div>
          <p className="font-body text-sm text-warm-200/70">
            &copy; {new Date().getFullYear()} Vitality Compass. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Navigation Dropdown ── */
function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 rounded-lg px-3 py-2 font-body text-sm font-medium text-warm-700 transition-colors hover:bg-warm-100 hover:text-teal-700"
      >
        {label}
        <svg className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-48 rounded-xl bg-white p-2 shadow-lg ring-1 ring-warm-200"
          onMouseLeave={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: "🥗",
    title: "Nutrition",
    description:
      "Evidence-based eating guidance tailored to your dietary preferences, allergies, and goals — not a generic meal plan.",
  },
  {
    icon: "🏃",
    title: "Movement",
    description:
      "Activity recommendations that fit your schedule and fitness level, from desk stretches to weekend workouts.",
  },
  {
    icon: "😴",
    title: "Sleep & Recovery",
    description:
      "Science-backed sleep hygiene routines and recovery protocols that actually work with your lifestyle.",
  },
  {
    icon: "🧠",
    title: "Mindset",
    description:
      "Practical stress management techniques and mindfulness practices you can weave into a busy day.",
  },
];

const steps = [
  {
    title: "Take the Assessment",
    description:
      "Answer a short, science-backed questionnaire about your habits, goals, preferences, and lifestyle. It takes about 10 minutes.",
  },
  {
    title: "Get Your Roadmap",
    description:
      "Receive a personalized wellness plan across all four pillars — nutrition, movement, sleep, and mindset — built for your life.",
  },
  {
    title: "Check In & Evolve",
    description:
      "Weekly check-ins help us adjust your plan as you progress. Your compass adapts to keep you moving forward.",
  },
];

const plans = [
  {
    name: "Health Audit",
    price: 49,
    period: "one-time",
    description: "A comprehensive one-time wellness assessment and report.",
    savings: null,
    featured: false,
    url: "https://buy.stripe.com/4gMfZhbOg3fL52Gcfd57W00",
    features: [
      "Full health assessment",
      "Personalized wellness report",
      "Nutrition, movement, sleep & mindset scores",
      "Actionable recommendations",
    ],
    cta: "Get Audited",
  },
  {
    name: "Monthly Guidance",
    price: 19,
    period: "/month",
    description: "7-day free trial, then $19/mo. Cancel anytime.",
    savings: null,
    featured: true,
    url: "/signup",
    features: [
      "7-day free trial — no charge today",
      "Everything in Health Audit",
      "Weekly check-ins & plan adjustments",
      "Unlimited plan updates",
      "Priority support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Annual Commitment",
    price: 169,
    period: "/year",
    description: "Our best value — a full year of personalized wellness guidance.",
    savings: "Save $59 vs. monthly",
    featured: false,
    url: "https://buy.stripe.com/00w4gzg4weYt0Mq4ML57W02",
    features: [
      "Everything in Monthly Guidance",
      "Two months free",
      "Quarterly deep-dive review",
      "Exclusive community access",
    ],
    cta: "Go Annual",
  },
];