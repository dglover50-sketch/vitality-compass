import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  component: NewsPage,
});

interface Article {
  id: string;
  headline: string;
  source: string;
  url: string;
  summary: string;
  category: string;
}

const ARTICLES: Article[] = [
  // ── High Blood Pressure ──────────────────────────────────────────────
  {
    id: "bp-1",
    headline: "DASH diet: Healthy eating to lower your blood pressure",
    source: "Mayo Clinic",
    url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/dash-diet/art-20048456",
    summary:
      "Mayo Clinic explains the DASH (Dietary Approaches to Stop Hypertension) diet, one of the most extensively studied eating patterns for blood pressure management. Rich in fruits, vegetables, whole grains, and low-fat dairy while limiting sodium, saturated fat, and added sugars. Studies show it can lower systolic blood pressure by 8–14 points.",
    category: "Blood Pressure",
  },
  {
    id: "bp-2",
    headline: "How to reduce sodium in your diet",
    source: "American Heart Association",
    url: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium/how-to-reduce-sodium",
    summary:
      "The American Heart Association provides evidence-based guidance on reducing sodium intake to the recommended limit of 1,500–2,300 mg per day. Includes practical strategies for reading nutrition labels, cooking with herbs instead of salt, and choosing low-sodium options when eating out.",
    category: "Blood Pressure",
  },
  {
    id: "bp-3",
    headline: "Exercise: A drug-free approach to lowering high blood pressure",
    source: "Harvard Health Publishing",
    url: "https://www.health.harvard.edu/heart-health/exercise-a-drug-free-approach-to-lowering-high-blood-pressure",
    summary:
      "Harvard Medical School explains how regular aerobic exercise (walking, jogging, cycling, swimming) can lower resting blood pressure by 5–10 mmHg — comparable to some medications. The effect is mediated through improved vascular function, reduced arterial stiffness, and better autonomic nervous system regulation.",
    category: "Blood Pressure",
  },

  // ── Diabetes (Type 2) ────────────────────────────────────────────────
  {
    id: "diabetes-1",
    headline:
      "Diabetes Prevention Program (DPP) — Lifestyle change prevents diabetes",
    source: "NIH / NIDDK",
    url: "https://www.niddk.nih.gov/about-niddk/research-areas/diabetes/diabetes-prevention-program-dpp",
    summary:
      "The landmark NIH Diabetes Prevention Program study demonstrated that lifestyle intervention (7% weight loss, 150 min/week of physical activity) reduced the risk of developing type 2 diabetes by 58% — nearly twice the effect of metformin medication (31%). The results have shaped national diabetes prevention guidelines worldwide.",
    category: "Diabetes",
  },
  {
    id: "diabetes-2",
    headline: "Diabetes diet: Create your healthy-eating plan",
    source: "Mayo Clinic",
    url: "https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-diet/art-20044295",
    summary:
      "Mayo Clinic's comprehensive guide to building a diabetes-friendly eating plan centered on fiber-rich carbohydrates, lean proteins, healthy fats, and consistent meal timing. Emphasizes carbohydrate counting, glycemic index awareness, and the importance of regular meals to maintain stable blood glucose levels throughout the day.",
    category: "Diabetes",
  },
  {
    id: "diabetes-3",
    headline: "Physical activity/exercise and diabetes",
    source: "American Diabetes Association",
    url: "https://diabetes.org/healthy-living/fitness",
    summary:
      "The American Diabetes Association outlines how regular physical activity improves insulin sensitivity, helps manage blood glucose levels, and reduces cardiovascular risk in people with type 2 diabetes. Recommends 150+ minutes of moderate-to-vigorous activity per week, plus resistance training twice weekly.",
    category: "Diabetes",
  },

  // ── Weight Loss ──────────────────────────────────────────────────────
  {
    id: "wl-1",
    headline: "Weight loss: 6 strategies for success",
    source: "Mayo Clinic",
    url: "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/weight-loss/art-20047752",
    summary:
      "Mayo Clinic outlines six evidence-based strategies for sustainable weight loss: setting realistic goals, understanding eating patterns, focusing on nutrient-dense foods, increasing physical activity, changing your mindset, and building a support system. Emphasizes slow, steady loss of 1–2 pounds per week for long-term success.",
    category: "Weight Loss",
  },
  {
    id: "wl-2",
    headline: "Keeping weight off",
    source: "NIH / NIDDK",
    url: "https://www.niddk.nih.gov/health-information/weight-management/keeping-weight-off",
    summary:
      "NIH's evidence-based guide on the most challenging phase of weight management — maintenance. Covers the importance of regular physical activity (60+ min most days), self-monitoring, maintaining a lower-calorie eating pattern, and the behavioral strategies that distinguish successful long-term maintainers.",
    category: "Weight Loss",
  },
  {
    id: "wl-3",
    headline: "Counting calories: Get back to weight-loss basics",
    source: "Mayo Clinic",
    url: "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/calories/art-20048065",
    summary:
      "A practical guide to understanding calorie balance for weight management. Covers how to estimate daily calorie needs, the role of portion control, and the importance of nutrient density over calorie density. Notes that a 500–750 calorie daily deficit typically leads to sustainable weight loss of 1–2 pounds per week.",
    category: "Weight Loss",
  },

  // ── Disease Prevention ───────────────────────────────────────────────
  {
    id: "prev-1",
    headline: "Physical activity and your heart: What you need to know",
    source: "Mayo Clinic",
    url: "https://www.mayoclinic.org/diseases-conditions/heart-disease/in-depth/exercise/art-20047489",
    summary:
      "Mayo Clinic cardiologists explain how regular physical activity strengthens the heart muscle, lowers blood pressure, improves cholesterol profiles, and reduces heart disease risk by 30–40%. Recommends at least 150 minutes of moderate aerobic activity per week for cardiovascular health.",
    category: "Disease Prevention",
  },
  {
    id: "prev-2",
    headline: "The role of exercise in reducing inflammation",
    source: "Harvard Health Publishing",
    url: "https://www.health.harvard.edu/staying-healthy/exercise-and-inflammation",
    summary:
      "Harvard Medical School explains how regular moderate exercise triggers an anti-inflammatory response in the body, reducing chronic low-grade inflammation that underlies heart disease, diabetes, arthritis, and certain cancers. Exercise also supports immune function and may reduce the risk of upper respiratory infections by 25–50%.",
    category: "Disease Prevention",
  },
  {
    id: "prev-3",
    headline: "Mediterranean diet for heart health",
    source: "Mayo Clinic",
    url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/mediterranean-diet/art-20047801",
    summary:
      "Mayo Clinic details the Mediterranean diet, one of the most extensively studied eating patterns for disease prevention. Research shows it reduces the risk of heart disease, stroke, type 2 diabetes, and cognitive decline while supporting healthy weight management. The diet emphasizes vegetables, fruits, whole grains, legumes, nuts, olive oil, and fish.",
    category: "Disease Prevention",
  },
];

function NewsPage() {
  return (
    <div className="min-h-dvh bg-warm-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white shadow-sm">
              VC
            </span>
            <span className="font-heading text-base font-semibold text-warm-900">
              Vitality Compass
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="font-body text-sm font-medium text-warm-700 hover:text-teal-700"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="font-body text-sm font-medium text-warm-700 hover:text-teal-700"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-2xl">
            📰
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-warm-900 sm:text-4xl">
            Wellness News
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base text-warm-700">
            Curated, evidence-based articles from trusted medical sources — Mayo Clinic,
            Harvard Health, NIH, the American Heart Association, and more.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", "Blood Pressure", "Diabetes", "Weight Loss", "Disease Prevention"].map(
            (cat) => (
              <a
                key={cat}
                href={cat === "All" ? "#" : `#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full bg-white px-4 py-1.5 font-body text-xs font-medium text-warm-700 shadow-sm ring-1 ring-warm-200 transition-colors hover:bg-teal-50 hover:text-teal-700 hover:ring-teal-200"
              >
                {cat}
              </a>
            ),
          )}
        </div>

        {/* Article list */}
        <div className="mt-8 space-y-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              id={article.category.toLowerCase().replace(/\s+/g, "-")}
              className="group scroll-mt-24 rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200 transition-all hover:shadow-md sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-teal-50 px-3 py-1 font-body text-xs font-medium text-teal-700">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 font-body text-xs text-warm-400">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ongoing reference
                </span>
              </div>

              <h2 className="mt-3 font-heading text-xl font-semibold text-warm-900 group-hover:text-teal-700 sm:text-2xl">
                {article.headline}
              </h2>

              <p className="mt-3 font-body text-sm leading-relaxed text-warm-700">
                {article.summary}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-body text-xs font-medium text-warm-500">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                  {article.source}
                </span>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-body text-sm font-medium text-teal-700 transition-colors hover:text-teal-600"
                >
                  Read Article
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-xl bg-brand-gradient p-6 text-center text-white shadow-md sm:p-8">
          <p className="font-heading text-lg font-semibold">
            Evidence you can trust
          </p>
          <p className="mt-2 font-body text-sm text-warm-100">
            All articles are from reputable, science-backed sources including Mayo Clinic,
            Harvard Health, NIH, CDC, the American Heart Association, the American Diabetes
            Association, and the WHO. Curated July 2026.
          </p>
        </div>
      </div>
    </div>
  );
}