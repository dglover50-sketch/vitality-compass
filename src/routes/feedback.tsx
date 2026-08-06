import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { submitFeedback } from "~/lib/feedback";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
});

const CATEGORIES = [
  { value: "suggestion", label: "Suggestion" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
] as const;

function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<string>("suggestion");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      await submitFeedback({
        data: { name: name.trim(), email: email.trim(), category: category as any, message: message.trim() },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-dvh flex-col bg-warm-50">
        <Header />
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-teal-50">
              <svg className="size-8 text-teal-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="mt-6 font-heading text-3xl font-bold text-warm-900">Thank You!</h2>
            <p className="mt-4 font-body text-lg text-warm-700">
              Your feedback has been received. We review every submission and use it to make Vitality Compass better.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/" className="rounded-lg bg-teal-700 px-6 py-3 font-body text-sm font-semibold text-white shadow-sm hover:bg-teal-600">
                Back to Home
              </Link>
              <button
                onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); setCategory("suggestion"); }}
                className="rounded-lg border border-warm-200 bg-white px-6 py-3 font-body text-sm font-semibold text-warm-700 shadow-sm hover:border-teal-200 hover:text-teal-700"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-warm-50">
      <Header />

      <div className="mx-auto w-full max-w-2xl px-6 py-12">
        <div className="text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-2xl">💬</span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-warm-900 sm:text-4xl">Share Your Feedback</h1>
          <p className="mt-3 font-body text-base text-warm-700">
            Help us improve Vitality Compass. Your input shapes the features, content, and experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block font-body text-sm font-medium text-warm-700">
                Name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 font-body text-sm text-warm-900 outline-none ring-teal-200 placeholder-warm-500 focus:border-teal-500 focus:ring-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-body text-sm font-medium text-warm-700">
                Email <span className="text-error">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 font-body text-sm text-warm-900 outline-none ring-teal-200 placeholder-warm-500 focus:border-teal-500 focus:ring-2"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block font-body text-sm font-medium text-warm-700">
              Category <span className="text-error">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 font-body text-sm text-warm-900 outline-none ring-teal-200 focus:border-teal-500 focus:ring-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block font-body text-sm font-medium text-warm-700">
              Message <span className="text-error">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 font-body text-sm text-warm-900 outline-none ring-teal-200 placeholder-warm-500 focus:border-teal-500 focus:ring-2 resize-y"
              placeholder="Tell us what's on your mind..."
              maxLength={5000}
            />
            <p className="mt-1 text-right font-body text-xs text-warm-500">{message.length}/5000</p>
          </div>

          {error && (
            <div className="rounded-lg bg-coral-50 p-4 font-body text-sm text-coral-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-lg bg-teal-700 px-6 py-3 font-body text-base font-semibold text-white shadow-sm transition-all hover:bg-teal-600 active:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white shadow-sm">VC</span>
          <span className="font-heading text-base font-semibold text-warm-900">Vitality Compass</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="font-body text-sm font-medium text-warm-700 hover:text-teal-700">Dashboard</Link>
          <Link to="/" className="font-body text-sm font-medium text-warm-700 hover:text-teal-700">Home</Link>
        </nav>
      </div>
    </header>
  );
}