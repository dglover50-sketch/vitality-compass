import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ASSESSMENT_QUESTIONS, type LikertScore } from "~/content/implement/assessment-questions";
import { ONBOARDING_BY_SCREEN, type OnboardingQuestion } from "~/content/implement/onboarding-questions";
import { runFullPipeline } from "~/content/implement/scoring-algorithm";
import type { AssessmentResult, PlanRecommendation, OnboardingData } from "~/content/implement/scoring-algorithm";
import templates from "~/content/implement/plan-templates.json";

export const Route = createFileRoute("/assessment")({
  component: AssessmentPage,
});

type Step = 1 | 2 | 3;

const LIKERT_LABELS = ["", "Never", "Rarely", "Sometimes", "Often", "Always"];

function AssessmentPage() {
  const [step, setStep] = useState<Step>(1);
  const [onboardingAnswers, setOnboardingAnswers] = useState<Record<string, string | string[]>>({});
  const [assessmentResponses, setAssessmentResponses] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ assessment: AssessmentResult; recommendation: PlanRecommendation } | null>(null);

  const handleOnboardingChange = (id: string, value: string | string[]) => {
    setOnboardingAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleAssessmentChange = (id: string, value: number) => {
    setAssessmentResponses((prev) => ({ ...prev, [id]: value }));
  };

  const allOnboardingAnswered = () => {
    const required = ONBOARDING_BY_SCREEN[1]
      .concat(ONBOARDING_BY_SCREEN[2])
      .concat(ONBOARDING_BY_SCREEN[3])
      .filter((q) => q.required);
    return required.every((q) => {
      const val = onboardingAnswers[q.id];
      if (q.type === "multi-select") return Array.isArray(val) && val.length > 0;
      return typeof val === "string" && val.trim() !== "";
    });
  };

  const allAssessmentAnswered = () => {
    return ASSESSMENT_QUESTIONS.every((q) => assessmentResponses[q.id] !== undefined);
  };

  const buildOnboardingData = (): OnboardingData => ({
    primaryGoal: onboardingAnswers["onb-01"] as string | undefined,
    successDefinition: onboardingAnswers["onb-02"] as string | undefined,
    experienceLevel: onboardingAnswers["onb-03"] as string | undefined,
    biggestBarrier: onboardingAnswers["onb-04"] as string | undefined,
    timeAvailability: onboardingAnswers["onb-05"] as string | undefined,
    workType: onboardingAnswers["onb-06"] as string | undefined,
    stressLevel: onboardingAnswers["onb-07"] as string | undefined,
    sleepEnvironment: onboardingAnswers["onb-08"] as string | undefined,
    movementPreferences: onboardingAnswers["onb-09"] as string[] | undefined,
    dietaryPreferences: onboardingAnswers["onb-10"] as string[] | undefined,
    tonePreference: onboardingAnswers["onb-11"] as string | undefined,
    additionalNotes: onboardingAnswers["onb-12"] as string | undefined,
  });

  const handleSubmit = () => {
    const data = buildOnboardingData();
    const scores: Record<string, number> = {};
    for (const q of ASSESSMENT_QUESTIONS) {
      if (assessmentResponses[q.id] !== undefined) {
        scores[q.id] = assessmentResponses[q.id];
      }
    }
    const pipelineResult = runFullPipeline(scores, data);
    setResult(pipelineResult);
    setStep(3);
  };

  const getPillarScore = (pillar: string) => {
    if (!result) return null;
    return result.assessment.pillars.find((p) => p.pillar === pillar);
  };

  const getPlanTitle = () => {
    if (!result) return "";
    const plan = templates.templates.find((t) => t.id === result.recommendation.planTemplateId);
    return plan?.title ?? result.recommendation.planTemplateId;
  };

  const getVariation = () => {
    if (!result) return null;
    const plan = templates.templates.find((t) => t.id === result.recommendation.planTemplateId);
    if (!plan) return null;
    return plan.variations.find((v) => v.category === result.assessment.category) ?? null;
  };

  return (
    <div className="min-h-dvh bg-warm-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white shadow-sm">VC</span>
            <span className="font-heading text-base font-semibold text-warm-900">Vitality Compass</span>
          </Link>
          <div className="flex items-center gap-2">
            {([1, 2, 3] as const).map((s) => (
              <div
                key={s}
                className={`size-2.5 rounded-full transition-colors ${
                  s === step ? "bg-teal-700" : s < step ? "bg-teal-300" : "bg-warm-200"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* ── Screen 1: Onboarding ── */}
        {step === 1 && (
          <div>
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full border border-warm-200 bg-white px-4 py-1 font-body text-xs font-medium text-warm-500 shadow-sm">
                Step 1 of 3
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold text-warm-900">Let's get to know you</h1>
              <p className="mt-2 font-body text-warm-700">Tell us about your goals and lifestyle.</p>
            </div>

            {([1, 2, 3] as const).map((screenNum) => (
              <div key={screenNum} className="mb-10">
                {screenNum > 1 && <hr className="mb-8 border-warm-200" />}
                <h2 className="mb-6 font-heading text-xl font-semibold text-warm-900">
                  {screenNum === 1 ? "Goals & Motivation" : screenNum === 2 ? "Your Lifestyle" : "Preferences & Constraints"}
                </h2>
                {ONBOARDING_BY_SCREEN[screenNum].map((q) => (
                  <div key={q.id} className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200">
                    <label className="block font-body text-base font-medium text-warm-900">
                      {q.text}
                      {q.required && <span className="ml-1 text-teal-700">*</span>}
                    </label>
                    {q.subtitle && <p className="mt-1 font-body text-sm text-warm-500">{q.subtitle}</p>}

                    {q.type === "free-text" ? (
                      <textarea
                        value={(onboardingAnswers[q.id] as string) || ""}
                        onChange={(e) => handleOnboardingChange(q.id, e.target.value)}
                        className="mt-3 w-full rounded-lg border border-warm-200 bg-white p-3 font-body text-sm text-warm-900 placeholder-warm-500 outline-none ring-teal-200 focus:border-teal-500 focus:ring-2"
                        rows={3}
                        placeholder="Share anything that will help us personalize your plan..."
                      />
                    ) : q.type === "multi-select" ? (
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {(q.options || []).map((opt) => {
                          const selected = (onboardingAnswers[q.id] as string[]) || [];
                          const isChecked = selected.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                const next = isChecked
                                  ? selected.filter((v) => v !== opt.value)
                                  : [...selected, opt.value];
                                handleOnboardingChange(q.id, next);
                              }}
                              className={`rounded-lg border p-3 text-left font-body text-sm transition-all ${
                                isChecked
                                  ? "border-teal-700 bg-teal-50 text-teal-800"
                                  : "border-warm-200 bg-white text-warm-700 hover:border-teal-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-3 space-y-2">
                        {(q.options || []).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleOnboardingChange(q.id, opt.value)}
                            className={`w-full rounded-lg border p-3 text-left font-body text-sm transition-all ${
                              onboardingAnswers[q.id] === opt.value
                                ? "border-teal-700 bg-teal-50 text-teal-800"
                                : "border-warm-200 bg-white text-warm-700 hover:border-teal-200"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <button
              type="button"
              disabled={!allOnboardingAnswered()}
              onClick={() => setStep(2)}
              className="w-full rounded-lg bg-teal-700 py-3 font-body text-base font-semibold text-white shadow-sm transition-all hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to Assessment
            </button>
          </div>
        )}

        {/* ── Screen 2: Assessment Questions ── */}
        {step === 2 && (
          <div>
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full border border-warm-200 bg-white px-4 py-1 font-body text-xs font-medium text-warm-500 shadow-sm">
                Step 2 of 3
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold text-warm-900">Wellness Assessment</h1>
              <p className="mt-2 font-body text-warm-700">
                Answer 20 quick questions about your daily habits.
              </p>
            </div>

            {(["nutrition", "movement", "sleep", "mindset"] as const).map((pillar) => {
              const pillarQuestions = ASSESSMENT_QUESTIONS.filter((q) => q.pillar === pillar);
              const labels: Record<string, string> = {
                nutrition: "Nutrition",
                movement: "Movement",
                sleep: "Sleep & Recovery",
                mindset: "Mindset",
              };
              return (
                <div key={pillar} className="mb-10">
                  <h2 className="mb-4 font-heading text-xl font-semibold text-teal-700">{labels[pillar]}</h2>
                  {pillarQuestions.map((q) => (
                    <div key={q.id} className="mb-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200">
                      <p className="mb-4 font-body text-base font-medium text-warm-900">{q.text}</p>
                      <div className="flex gap-1 sm:gap-2">
                        {([1, 2, 3, 4, 5] as LikertScore[]).map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleAssessmentChange(q.id, val)}
                            className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-2 transition-all ${
                              assessmentResponses[q.id] === val
                                ? "border-teal-700 bg-teal-50 text-teal-800"
                                : "border-warm-200 bg-white text-warm-700 hover:border-teal-200"
                            }`}
                          >
                            <span className="font-heading text-lg font-bold">{val}</span>
                            <span className="hidden text-[10px] leading-tight sm:block">{LIKERT_LABELS[val]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg border border-warm-200 bg-white py-3 font-body text-base font-semibold text-warm-700 transition-all hover:border-teal-200 hover:text-teal-700"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!allAssessmentAnswered()}
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-teal-700 py-3 font-body text-base font-semibold text-white shadow-sm transition-all hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                See My Results
              </button>
            </div>
          </div>
        )}

        {/* ── Screen 3: Results ── */}
        {step === 3 && result && (
          <div>
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full border border-warm-200 bg-white px-4 py-1 font-body text-xs font-medium text-warm-500 shadow-sm">
                Your Results
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold text-warm-900">Your Wellness Profile</h1>
              <p className="mt-2 font-body text-warm-700">
                Here's your personalized roadmap to better health.
              </p>
            </div>

            {/* Category Badge */}
            <div className="mb-8 text-center">
              <span className={`inline-block rounded-full px-6 py-2 font-heading text-lg font-bold text-white shadow-md ${
                result.assessment.category === "Beginner" ? "bg-teal-700" :
                result.assessment.category === "Maintainer" ? "bg-forest-600" : "bg-amber-500"
              }`}>
                {result.assessment.category}
              </span>
              <p className="mt-2 font-body text-sm text-warm-500">
                {result.assessment.category === "Beginner" && "Building foundations — small steps, big impact"}
                {result.assessment.category === "Maintainer" && "Good habits with room to grow — let's level up"}
                {result.assessment.category === "Optimizer" && "Strong foundation — fine-tuning for peak wellness"}
              </p>
            </div>

            {/* Pillar Scores */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {result.assessment.pillars.map((p) => (
                <div key={p.pillar} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-base font-semibold text-warm-900">{p.label}</h3>
                    <span className={`rounded-full px-3 py-0.5 font-body text-xs font-medium ${
                      p.flagged ? "bg-red-50 text-red-600" : "bg-teal-50 text-teal-700"
                    }`}>
                      {p.flagged ? "Priority" : "On track"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-3xl font-bold text-warm-900">{p.average.toFixed(1)}</span>
                      <span className="font-body text-sm text-warm-500">/ 5</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-warm-100">
                      <div
                        className={`h-full rounded-full transition-all ${
                          p.flagged ? "bg-coral-400" : "bg-teal-700"
                        }`}
                        style={{ width: `${(p.average / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Plan */}
            <div className="mb-8 rounded-xl bg-brand-gradient p-8 text-white shadow-md">
              <h2 className="font-heading text-xl font-semibold">Recommended Plan</h2>
              <p className="mt-2 font-body text-2xl font-bold">{getPlanTitle()}</p>
              {getVariation() && (
                <>
                  <p className="mt-2 font-body text-warm-200">{getVariation()!.description}</p>
                  <p className="mt-4 font-body text-sm text-warm-200">
                    Time: {getVariation()!.timeCommitment} &middot; {result.recommendation.estimatedMinutesPerDay} min/day
                  </p>
                  <div className="mt-4 space-y-3">
                    {getVariation()!.weeks.map((w) => (
                      <div key={w.week} className="rounded-lg bg-white/10 p-4">
                        <p className="font-heading text-sm font-semibold">Week {w.week}: {w.focus}</p>
                        <ul className="mt-2 space-y-1">
                          {w.actionItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 font-body text-sm text-warm-200">
                              <span className="mt-0.5 text-teal-300">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Next Steps */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/dashboard"
                className="flex-1 rounded-lg bg-teal-700 py-3 text-center font-body text-base font-semibold text-white shadow-sm transition-all hover:bg-teal-600"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/"
                className="flex-1 rounded-lg border border-warm-200 bg-white py-3 text-center font-body text-base font-semibold text-warm-700 transition-all hover:border-teal-200 hover:text-teal-700"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}