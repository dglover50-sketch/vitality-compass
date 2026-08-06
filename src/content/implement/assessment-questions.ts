/**
 * Vitality Compass — Assessment Questions
 *
 * 20 questions across 4 wellness pillars (5 per pillar).
 * Each question uses a 5-point Likert scale.
 *
 * Import this module in the assessment UI to render questions
 * and pass user responses into the scoring algorithm.
 */

export type Pillar = 'nutrition' | 'movement' | 'sleep' | 'mindset';

export type LikertScore = 1 | 2 | 3 | 4 | 5;

export interface QuestionOption {
  /** Display label for this option */
  label: string;
  /** Numeric score value (1–5) */
  value: LikertScore;
}

export interface AssessmentQuestion {
  /** Unique question identifier (e.g., "nut-01") */
  id: string;
  /** Which pillar this question belongs to */
  pillar: Pillar;
  /** The question text shown to the user */
  text: string;
  /** The 5 Likert options */
  options: QuestionOption[];
  /** Brief scientific rationale (shown optionally in results) */
  rationale: string;
  /** Whether this question is reverse-scored (higher response = worse) */
  reverseScored: boolean;
}

const LIKERT_OPTIONS: QuestionOption[] = [
  { label: 'Never', value: 1 },
  { label: 'Rarely', value: 2 },
  { label: 'Sometimes', value: 3 },
  { label: 'Often', value: 4 },
  { label: 'Always', value: 5 },
];

/**
 * All 20 assessment questions organized by pillar.
 * Questions are listed in recommended display order (grouped by pillar).
 */
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ── Nutrition ──────────────────────────────────────────────
  {
    id: 'nut-01',
    pillar: 'nutrition',
    text: 'I eat vegetables with at least two meals per day.',
    options: LIKERT_OPTIONS,
    rationale: 'Vegetable intake is a reliable proxy for overall diet quality.',
    reverseScored: false,
  },
  {
    id: 'nut-02',
    pillar: 'nutrition',
    text: 'I drink water consistently throughout the day (6+ glasses).',
    options: LIKERT_OPTIONS,
    rationale: 'Hydration affects energy, focus, and appetite regulation.',
    reverseScored: false,
  },
  {
    id: 'nut-03',
    pillar: 'nutrition',
    text: 'I feel in control around food — I don\'t regularly eat when stressed or bored.',
    options: LIKERT_OPTIONS,
    rationale: 'Emotional eating patterns matter more than "perfect" eating.',
    reverseScored: false,
  },
  {
    id: 'nut-04',
    pillar: 'nutrition',
    text: 'I eat protein at most meals and feel satisfied after eating.',
    options: LIKERT_OPTIONS,
    rationale: 'Protein and satiety are foundational for balanced nutrition.',
    reverseScored: false,
  },
  {
    id: 'nut-05',
    pillar: 'nutrition',
    text: 'I rarely skip meals — I eat at least 3 times a day (or 4–5 smaller meals).',
    options: LIKERT_OPTIONS,
    rationale: 'Meal regularity supports blood sugar and energy stability.',
    reverseScored: false,
  },

  // ── Movement ───────────────────────────────────────────────
  {
    id: 'mov-01',
    pillar: 'movement',
    text: 'I get my heart rate up for at least 20 minutes, 3+ times per week.',
    options: LIKERT_OPTIONS,
    rationale: 'Minimum cardiovascular threshold for health benefits.',
    reverseScored: false,
  },
  {
    id: 'mov-02',
    pillar: 'movement',
    text: 'I do some form of strength or resistance training weekly.',
    options: LIKERT_OPTIONS,
    rationale: 'Strength is critical for metabolism, bone density, and longevity.',
    reverseScored: false,
  },
  {
    id: 'mov-03',
    pillar: 'movement',
    text: 'I move my body during the day (walking, stairs, stretching) outside of planned exercise.',
    options: LIKERT_OPTIONS,
    rationale: 'Non-exercise activity thermogenesis (NEAT) matters as much as workouts.',
    reverseScored: false,
  },
  {
    id: 'mov-04',
    pillar: 'movement',
    text: 'I enjoy the movement I do — exercise doesn\'t feel like a chore.',
    options: LIKERT_OPTIONS,
    rationale: 'Enjoyment predicts long-term adherence.',
    reverseScored: false,
  },
  {
    id: 'mov-05',
    pillar: 'movement',
    text: 'I rarely sit for more than 2 hours without getting up to stretch or walk.',
    options: LIKERT_OPTIONS,
    rationale: 'Sedentary time is an independent health risk factor.',
    reverseScored: false,
  },

  // ── Sleep ──────────────────────────────────────────────────
  {
    id: 'slp-01',
    pillar: 'sleep',
    text: 'I get 7–9 hours of sleep most nights.',
    options: LIKERT_OPTIONS,
    rationale: 'Duration is the primary sleep metric.',
    reverseScored: false,
  },
  {
    id: 'slp-02',
    pillar: 'sleep',
    text: 'I fall asleep within 20–30 minutes of going to bed.',
    options: LIKERT_OPTIONS,
    rationale: 'Sleep latency is a key marker of sleep quality.',
    reverseScored: false,
  },
  {
    id: 'slp-03',
    pillar: 'sleep',
    text: 'I wake up feeling rested (or close to it) most days.',
    options: LIKERT_OPTIONS,
    rationale: 'Subjective recovery is the most practical quality signal.',
    reverseScored: false,
  },
  {
    id: 'slp-04',
    pillar: 'sleep',
    text: 'I have a consistent bedtime and wake time (within 1 hour) even on weekends.',
    options: LIKERT_OPTIONS,
    rationale: 'Consistency reinforces circadian rhythm.',
    reverseScored: false,
  },
  {
    id: 'slp-05',
    pillar: 'sleep',
    text: 'I limit screens (phone, TV, laptop) in the 30–60 minutes before bed.',
    options: LIKERT_OPTIONS,
    rationale: 'Blue light exposure before bed is a modifiable sleep disruptor.',
    reverseScored: false,
  },

  // ── Mindset ────────────────────────────────────────────────
  {
    id: 'mnd-01',
    pillar: 'mindset',
    text: 'I feel able to manage daily stress without it overwhelming me.',
    options: LIKERT_OPTIONS,
    rationale: 'Perceived stress management capacity is a core resilience indicator.',
    reverseScored: false,
  },
  {
    id: 'mnd-02',
    pillar: 'mindset',
    text: 'I take at least 5–10 minutes most days to do something just for me (no screens, no obligations).',
    options: LIKERT_OPTIONS,
    rationale: 'Self-directed downtime is essential for mental recovery.',
    reverseScored: false,
  },
  {
    id: 'mnd-03',
    pillar: 'mindset',
    text: 'I speak to myself kindly — my inner critic doesn\'t run the show.',
    options: LIKERT_OPTIONS,
    rationale: 'Self-compassion correlates with sustained behavior change.',
    reverseScored: false,
  },
  {
    id: 'mnd-04',
    pillar: 'mindset',
    text: 'I feel a sense of purpose or direction in my daily life.',
    options: LIKERT_OPTIONS,
    rationale: 'Purpose is a psychological resilience factor.',
    reverseScored: false,
  },
  {
    id: 'mnd-05',
    pillar: 'mindset',
    text: 'When something goes wrong, I can usually bounce back within a day.',
    options: LIKERT_OPTIONS,
    rationale: 'Recovery time from setbacks is a practical measure of resilience.',
    reverseScored: false,
  },
];

/** Convenience lookup: questions grouped by pillar */
export const QUESTIONS_BY_PILLAR: Record<Pillar, AssessmentQuestion[]> = {
  nutrition: ASSESSMENT_QUESTIONS.filter((q) => q.pillar === 'nutrition'),
  movement: ASSESSMENT_QUESTIONS.filter((q) => q.pillar === 'movement'),
  sleep: ASSESSMENT_QUESTIONS.filter((q) => q.pillar === 'sleep'),
  mindset: ASSESSMENT_QUESTIONS.filter((q) => q.pillar === 'mindset'),
};

/** Lookup a single question by ID */
export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return ASSESSMENT_QUESTIONS.find((q) => q.id === id);
}