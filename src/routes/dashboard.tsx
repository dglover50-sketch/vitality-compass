import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function TrialBanner() {
  const [trial, setTrial] = useState<{ inTrial: boolean; daysRemaining: number } | null>(null);

  useEffect(() => {
    // Check if trial info is in sessionStorage (set after signup)
    const stored = sessionStorage.getItem("vc_trial");
    if (stored) {
      try {
        setTrial(JSON.parse(stored));
      } catch {}
    }
  }, []);

  if (!trial?.inTrial) return null;

  const daysLeft = trial.daysRemaining;
  const urgencyClass = daysLeft <= 2 ? "bg-amber-50 ring-amber-200" : "bg-teal-50 ring-teal-200";
  const textClass = daysLeft <= 2 ? "text-amber-800" : "text-teal-800";

  return (
    <div className={`mb-8 rounded-xl ${urgencyClass} p-5 ring-1`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex size-10 items-center justify-center rounded-lg text-lg font-bold ${daysLeft <= 2 ? "bg-amber-100 text-amber-700" : "bg-teal-100 text-teal-700"}`}>
            {daysLeft}
          </span>
          <div>
            <p className={`font-heading text-sm font-semibold ${textClass}`}>
              {daysLeft <= 1 ? "Trial ending today!" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining in your trial`}
            </p>
            <p className="mt-0.5 font-body text-xs text-warm-600">
              {daysLeft <= 2
                ? "Your card will be charged soon. Update payment method or cancel anytime."
                : "Enjoy full access — nutrition, movement, sleep & mindset guidance."}
            </p>
          </div>
        </div>
        {daysLeft <= 2 && (
          <Link
            to="/signup"
            className="rounded-lg bg-teal-700 px-4 py-2 font-body text-xs font-medium text-white hover:bg-teal-600"
          >
            Manage
          </Link>
        )}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-dvh bg-warm-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white shadow-sm">
              VC
            </span>
            <span className="font-heading text-lg font-semibold text-warm-900">
              Vitality Compass
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/community"
              className="font-body text-sm font-medium text-warm-700 transition-colors hover:text-teal-700"
            >
              Community
            </Link>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 font-body text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-600"
            >
              Take Assessment
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="font-heading text-3xl font-bold text-warm-900 sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-2 font-body text-lg text-warm-700">
            Your personalized wellness hub — track progress, access your plan, and stay on course.
          </p>
          <TrialBanner />
        </div>

        {/* Quick Status Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🥗",
              title: "Nutrition",
              value: "Not started",
              color: "text-warm-500",
            },
            {
              icon: "🏃",
              title: "Movement",
              value: "Not started",
              color: "text-warm-500",
            },
            {
              icon: "😴",
              title: "Sleep",
              value: "Not started",
              color: "text-warm-500",
            },
            {
              icon: "🧠",
              title: "Mindset",
              value: "Not started",
              color: "text-warm-500",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-teal-50 text-xl">
                {pillar.icon}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-warm-900">
                {pillar.title}
              </h3>
              <p className={`mt-1 font-body text-sm ${pillar.color}`}>
                {pillar.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Plan */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Plan Section */}
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-xl font-semibold text-warm-900">
                Your Wellness Plan
              </h2>
              <p className="mt-2 font-body text-sm text-warm-500">
                Complete the assessment to unlock your personalized 4-week plan.
              </p>
              <div className="mt-6 rounded-lg bg-warm-50 p-8 text-center">
                <span className="text-4xl">📋</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-warm-900">
                  No plan yet
                </h3>
                <p className="mt-2 font-body text-sm text-warm-700">
                  Take our science-backed wellness assessment to get a tailored
                  roadmap across nutrition, movement, sleep, and mindset.
                </p>
                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-body text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-600"
                >
                  Start Assessment
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Weekly Check-ins Section */}
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-xl font-semibold text-warm-900">
                Weekly Check-ins
              </h2>
              <p className="mt-2 font-body text-sm text-warm-500">
                Regular check-ins help us adjust your plan as you progress.
              </p>
              <div className="mt-6 space-y-4">
                {[1, 2, 3, 4].map((week) => (
                  <div
                    key={week}
                    className="flex items-center gap-4 rounded-lg border border-warm-200 p-4"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-warm-100 font-heading text-sm font-semibold text-warm-500">
                      {week}
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm font-medium text-warm-900">
                        Week {week} Check-in
                      </p>
                      <p className="font-body text-xs text-warm-500">
                        {week === 1 ? "Complete your assessment first" : "Complete previous check-ins first"}
                      </p>
                    </div>
                    <span className="rounded-full bg-warm-100 px-3 py-1 font-body text-xs font-medium text-warm-500">
                      Locked
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Info */}
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-xl font-semibold text-warm-900">
                Your Progress
              </h2>
              <div className="mt-6 text-center">
                <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-warm-100">
                  <span className="font-heading text-2xl font-bold text-warm-500">0%</span>
                </div>
                <p className="mt-4 font-body text-sm text-warm-700">
                  Complete the assessment<br />to start tracking your progress.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-xl bg-brand-gradient p-8 text-white shadow-md">
              <h2 className="font-heading text-lg font-semibold">Ready to begin?</h2>
              <p className="mt-2 font-body text-sm text-warm-200">
                Your journey starts with a single step. Take the assessment and
                get your personalized wellness compass.
              </p>
              <Link
                to="/assessment"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-body text-sm font-medium text-teal-700 shadow-sm transition-all hover:bg-warm-50"
              >
                Start Your Journey
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Meal Prep Guide */}
            <Link to="/resources/meal-prep" className="block">
              <div className="rounded-xl bg-brand-gradient p-8 text-white shadow-sm transition-all hover:shadow-md">
                <h2 className="font-heading text-lg font-semibold">🥗 Meal Prep Guide</h2>
                <p className="mt-2 font-body text-sm text-warm-200">
                  Save time, eat better. Our science-backed meal prep system with 3 tiers — from beginner to optimizer.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-teal-200">
                  View guide <span>&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Detox Challenges */}
            <Link to="/resources/detox-challenges" className="block">
              <div className="rounded-xl bg-warm-50 p-8 shadow-sm ring-1 ring-warm-200 transition-all hover:shadow-md">
                <h2 className="font-heading text-lg font-semibold text-warm-900">🧃 Detox Challenges</h2>
                <p className="mt-2 font-body text-sm text-warm-700">
                  Structured resets to break patterns — juice, salad, water, or herbal tea challenges.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-teal-700">
                  Explore challenges <span>&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Community Chat */}
            <Link to="/community" className="block">
              <div className="rounded-xl bg-warm-50 p-8 shadow-sm ring-1 ring-warm-200 transition-all hover:shadow-md">
                <h2 className="font-heading text-lg font-semibold text-warm-900">💬 Community Chat</h2>
                <p className="mt-2 font-body text-sm text-warm-700">
                  Connect with fellow members — share wins, ask questions, and stay accountable.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-teal-700">
                  Join the conversation <span>&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Tips */}
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-lg font-semibold text-warm-900">
                Daily Wellness Tip
              </h2>
              <div className="mt-4 rounded-lg bg-teal-50 p-4">
                <p className="font-body text-sm text-teal-800">
                  "Start your morning with a glass of water before coffee.
                  Hydration first helps your body wake up naturally."
                </p>
              </div>
              <p className="mt-3 font-body text-xs text-warm-500">
                More tips appear once you complete the assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white">
              VC
            </span>
            <span className="font-heading text-sm font-semibold text-warm-900">
              Vitality Compass
            </span>
          </div>
          <p className="font-body text-xs text-warm-500">
            &copy; {new Date().getFullYear()} Vitality Compass. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}