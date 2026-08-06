/**
 * Vitality Compass — Wellness Assessment Scoring Algorithm
 *
 * Takes user responses to the 20 assessment questions and 12 onboarding
 * questions, and produces a fully personalized wellness plan recommendation.
 *
 * Output: category (Beginner/Maintainer/Optimizer), per-pillar scores,
 * priority flags, and the recommended plan template + modifications.
 */

import { ASSESSMENT_QUESTIONS, type Pillar } from './assessment-questions';
import type { OnboardingQuestion } from './onboarding-questions';

// ── Types ─────────────────────────────────────────────────────

export type WellnessCategory = 'Beginner' | 'Maintainer' | 'Optimizer';

export type PlanTemplateId = 'better-sleep' | 'more-energy' | 'stress-management' | 'balanced-wellness';

export interface PillarScore {
  /** Pillar identifier */
  pillar: Pillar;
  /** Raw sum score (5–25) */
  rawScore: number;
  /** Average per question (1–5) */
  average: number;
  /** Whether this pillar is flagged for priority attention (rawScore <= 11) */
  flagged: boolean;
  /** Human-readable label */
  label: string;
}

export interface AssessmentResult {
  /** Per-pillar breakdown */
  pillars: PillarScore[];
  /** Overall category */
  category: WellnessCategory;
  /** Overall average score across all questions (1–5) */
  overallAverage: number;
  /** Pillars flagged for priority attention */
  flaggedPillars: Pillar[];
  /** The primary goal pillar derived from onboarding */
  primaryPillar: Pillar | 'balanced';
}

export interface OnboardingData {
  primaryGoal?: string;
  successDefinition?: string;
  experienceLevel?: string;
  biggestBarrier?: string;
  timeAvailability?: string;
  workType?: string;
  stressLevel?: string;
  sleepEnvironment?: string;
  movementPreferences?: string[];
  dietaryPreferences?: string[];
  tonePreference?: string;
  additionalNotes?: string;
}

export interface PlanRecommendation {
  /** Computed category */
  category: WellnessCategory;
  /** Which plan template to use */
  planTemplateId: PlanTemplateId;
  /** Pillars to prioritize in the plan */
  priorityPillars: Pillar[];
  /** Weekly time budget based on onboarding */
  timeBudget: 'minimal' | 'moderate' | 'generous';
  /** Tone for content delivery */
  tone: string;
  /** Movement types to include (filtered from preferences) */
  movementTypes: string[];
  /** Dietary filters to apply */
  dietaryFilters: string[];
  /** Estimated minutes per day for the plan */
  estimatedMinutesPerDay: number;
}

// ── Constants ─────────────────────────────────────────────────

const PILLAR_IDS: Pillar[] = ['nutrition', 'movement', 'sleep', 'mindset'];

const PILLAR_LABELS: Record<Pillar, string> = {
  nutrition: 'Nutrition',
  movement: 'Movement',
  sleep: 'Sleep',
  mindset: 'Mindset',
};

const GOAL_TO_PILLAR: Record<string, { primary: Pillar | 'balanced'; secondary: Pillar[] }> = {
  'better-sleep': { primary: 'sleep', secondary: ['mindset', 'nutrition'] },
  'more-energy': { primary: 'nutrition', secondary: ['movement', 'sleep'] },
  'stress-management': { primary: 'mindset', secondary: ['sleep', 'movement'] },
  'build-strength': { primary: 'movement', secondary: ['nutrition', 'sleep'] },
  'overall-wellness': { primary: 'balanced', secondary: ['nutrition', 'movement', 'sleep', 'mindset'] },
  'weight-management': { primary: 'nutrition', secondary: ['movement', 'sleep'] },
};

const CATEGORY_THRESHOLDS = {
  beginner: 2.3,
  maintainer: 3.6,
};

const TIME_BUDGET_MAP: Record<string, 'minimal' | 'moderate' | 'generous'> = {
  '5-10-min': 'minimal',
  '10-20-min': 'moderate',
  '20-30-min': 'moderate',
  '30-plus-min': 'generous',
};

const TIME_MINUTES_MAP: Record<string, number> = {
  '5-10-min': 8,
  '10-20-min': 15,
  '20-30-min': 25,
  '30-plus-min': 35,
};

// ── Core Scoring Logic ────────────────────────────────────────

/**
 * Compute per-pillar scores from assessment responses.
 *
 * @param responses - Map of questionId -> numeric score (1–5)
 * @returns Array of PillarScore objects
 */
export function computePillarScores(
  responses: Record<string, number>
): PillarScore[] {
  const scores: PillarScore[] = [];

  for (const pillar of PILLAR_IDS) {
    const pillarQuestions = ASSESSMENT_QUESTIONS.filter(
      (q) => q.pillar === pillar
    );

    let total = 0;
    let count = 0;

    for (const q of pillarQuestions) {
      const response = responses[q.id];
      if (response !== undefined && response !== null) {
        // Apply reverse scoring if needed (higher raw response = worse outcome)
        const score = q.reverseScored ? 6 - response : response;
        total += score;
        count++;
      }
    }

    // If no responses for this pillar, default to mid-range (3)
    const rawScore = count > 0 ? Math.round((total / count) * 5) : 15;

    scores.push({
      pillar,
      rawScore,
      average: count > 0 ? +(total / count).toFixed(2) : 3.0,
      flagged: rawScore <= 11,
      label: PILLAR_LABELS[pillar],
    });
  }

  return scores;
}

/**
 * Determine the overall wellness category from pillar scores.
 */
export function determineCategory(pillarScores: PillarScore[]): WellnessCategory {
  const overallAverage =
    pillarScores.reduce((sum, p) => sum + p.average, 0) / pillarScores.length;

  if (overallAverage <= CATEGORY_THRESHOLDS.beginner) {
    return 'Beginner';
  } else if (overallAverage <= CATEGORY_THRESHOLDS.maintainer) {
    return 'Maintainer';
  } else {
    return 'Optimizer';
  }
}

/**
 * Get the primary pillar based on the user's selected goal.
 */
export function getPrimaryPillar(primaryGoal?: string): Pillar | 'balanced' {
  if (!primaryGoal || !GOAL_TO_PILLAR[primaryGoal]) {
    return 'balanced';
  }
  return GOAL_TO_PILLAR[primaryGoal].primary;
}

/**
 * Full assessment pipeline: takes responses and returns the complete result.
 */
export function runAssessment(
  assessmentResponses: Record<string, number>,
  onboardingData: OnboardingData
): AssessmentResult {
  const pillars = computePillarScores(assessmentResponses);
  const category = determineCategory(pillars);
  const overallAverage = +(pillars.reduce((s, p) => s + p.average, 0) / pillars.length).toFixed(2);
  const flaggedPillars = pillars.filter((p) => p.flagged).map((p) => p.pillar);
  const primaryPillar = getPrimaryPillar(onboardingData.primaryGoal);

  return {
    pillars,
    category,
    overallAverage,
    flaggedPillars,
    primaryPillar,
  };
}

// ── Plan Recommendation Engine ────────────────────────────────

/**
 * Generate a full plan recommendation from assessment + onboarding data.
 */
export function generatePlanRecommendation(
  assessmentResult: AssessmentResult,
  onboardingData: OnboardingData
): PlanRecommendation {
  // 1. Determine plan template
  const planTemplateId = determinePlanTemplate(
    assessmentResult.primaryPillar,
    assessmentResult.flaggedPillars
  );

  // 2. Priority pillars: flagged pillars first, then primary goal pillar
  const priorityPillars = buildPriorityList(
    assessmentResult.flaggedPillars,
    assessmentResult.primaryPillar
  );

  // 3. Time budget
  const timeKey = onboardingData.timeAvailability || '10-20-min';
  const timeBudget = TIME_BUDGET_MAP[timeKey] || 'moderate';

  // 4. Tone
  const tone = onboardingData.tonePreference || 'gentle';

  // 5. Movement preferences
  const movementTypes = onboardingData.movementPreferences || ['walking'];

  // 6. Dietary filters
  const dietaryFilters = (onboardingData.dietaryPreferences || [])
    .filter((d) => d !== 'none' && d !== 'unsure');

  // 7. Estimated minutes per day
  const estimatedMinutesPerDay = TIME_MINUTES_MAP[timeKey] || 15;

  return {
    category: assessmentResult.category,
    planTemplateId,
    priorityPillars,
    timeBudget,
    tone,
    movementTypes,
    dietaryFilters,
    estimatedMinutesPerDay,
  };
}

/**
 * Determine which plan template to use.
 */
function determinePlanTemplate(
  primaryPillar: Pillar | 'balanced',
  flaggedPillars: Pillar[]
): PlanTemplateId {
  // If a flagged pillar has a matching template, use that
  if (flaggedPillars.includes('sleep')) return 'better-sleep';
  if (flaggedPillars.includes('mindset')) return 'stress-management';
  if (flaggedPillars.includes('nutrition')) return 'more-energy';

  // Otherwise use the primary goal pillar
  if (primaryPillar === 'sleep') return 'better-sleep';
  if (primaryPillar === 'mindset') return 'stress-management';
  if (primaryPillar === 'nutrition') return 'more-energy';
  if (primaryPillar === 'movement') return 'more-energy';

  // Default to balanced wellness
  return 'balanced-wellness';
}

/**
 * Build the priority pillar list (deduplicated, order: flagged > primary > others).
 */
function buildPriorityList(
  flaggedPillars: Pillar[],
  primaryPillar: Pillar | 'balanced'
): Pillar[] {
  const prioritySet = new Set<Pillar>();

  // Flagged pillars come first
  for (const p of flaggedPillars) {
    prioritySet.add(p);
  }

  // Primary pillar (if not already included)
  if (primaryPillar !== 'balanced') {
    prioritySet.add(primaryPillar);
  }

  // Add remaining pillars
  for (const p of PILLAR_IDS) {
    prioritySet.add(p);
  }

  return Array.from(prioritySet);
}

// ── Convenience: Full Pipeline ─────────────────────────────────

/**
 * Run the full pipeline: assessment → plan recommendation.
 * This is the main entry point for the app.
 */
export function runFullPipeline(
  assessmentResponses: Record<string, number>,
  onboardingData: OnboardingData
): { assessment: AssessmentResult; recommendation: PlanRecommendation } {
  const assessment = runAssessment(assessmentResponses, onboardingData);
  const recommendation = generatePlanRecommendation(assessment, onboardingData);

  return { assessment, recommendation };
}