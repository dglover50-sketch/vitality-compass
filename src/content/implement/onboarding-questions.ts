/**
 * Vitality Compass — Onboarding Questions
 *
 * 12 questions across 3 screens capturing goals, lifestyle, preferences, and constraints.
 * These are collected before the assessment to personalize the plan.
 *
 * Import this module in the onboarding UI to render questions
 * and pass user responses into the scoring/plan generation pipeline.
 */

export type OnboardingScreen = 1 | 2 | 3;

export interface OnboardingOption {
  /** Value stored when this option is selected */
  value: string;
  /** Display label */
  label: string;
}

export interface OnboardingQuestion {
  /** Unique identifier (e.g., "onb-01") */
  id: string;
  /** Which screen this question appears on (1, 2, or 3) */
  screen: OnboardingScreen;
  /** The question heading shown to the user */
  text: string;
  /** Subtitle or helper text (optional) */
  subtitle?: string;
  /** Input type */
  type: 'single-select' | 'multi-select' | 'free-text';
  /** Available options (for select types). null for free-text. */
  options: OnboardingOption[] | null;
  /** Whether this question must be answered before proceeding */
  required: boolean;
  /** Which system parameter this maps to */
  mapsTo: string;
}

/**
 * All 12 onboarding questions in display order.
 * Screen 1: Goals & Motivation (Q1–Q4)
 * Screen 2: Your Lifestyle (Q5–Q8)
 * Screen 3: Preferences & Constraints (Q9–Q12)
 */
export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  // ── Screen 1: Goals & Motivation ──────────────────────────
  {
    id: 'onb-01',
    screen: 1,
    text: "What's your main wellness goal right now?",
    type: 'single-select',
    options: [
      { value: 'better-sleep', label: 'Better sleep — I want to wake up feeling rested' },
      { value: 'more-energy', label: 'More energy — I want to feel energized through the day' },
      { value: 'stress-management', label: 'Stress management — I want to feel calmer and more resilient' },
      { value: 'build-strength', label: 'Build strength / get fitter — I want to feel stronger and more capable' },
      { value: 'overall-wellness', label: 'Overall wellness — I want to improve my general health' },
      { value: 'weight-management', label: 'Weight management — I want to reach or maintain a healthy weight' },
    ],
    required: true,
    mapsTo: 'primaryGoal',
  },
  {
    id: 'onb-02',
    screen: 1,
    text: "What does success look like to you? Pick the option that resonates most.",
    type: 'single-select',
    options: [
      { value: 'feel-better', label: 'I want to feel better in my body day-to-day' },
      { value: 'more-energy-do', label: 'I want to have more energy to do the things I love' },
      { value: 'feel-proud', label: 'I want to feel proud and confident in my habits' },
      { value: 'prevent-problems', label: 'I want to prevent health problems down the road' },
      { value: 'stop-guilt', label: 'I want to stop feeling guilty about my choices' },
    ],
    required: false,
    mapsTo: 'successDefinition',
  },
  {
    id: 'onb-03',
    screen: 1,
    text: 'How long have you been working on this goal?',
    type: 'single-select',
    options: [
      { value: 'just-starting', label: 'Just starting — this feels new to me' },
      { value: 'few-weeks', label: 'A few weeks — I\'ve tried but haven\'t stuck with it' },
      { value: 'few-months', label: 'A few months — I\'ve made some progress but hit a plateau' },
      { value: 'year-plus', label: 'A year or more — I\'ve been chipping away at this for a while' },
    ],
    required: false,
    mapsTo: 'experienceLevel',
  },
  {
    id: 'onb-04',
    screen: 1,
    text: "What's the biggest thing standing in your way?",
    type: 'single-select',
    options: [
      { value: 'time', label: 'Time — I\'m too busy to prioritize my health' },
      { value: 'motivation', label: 'Motivation — I know what to do, I just don\'t do it' },
      { value: 'confusion', label: 'Confusion — There\'s too much conflicting advice online' },
      { value: 'consistency', label: 'Consistency — I start strong but always fall off' },
      { value: 'energy', label: 'Energy — I\'m too tired to make changes' },
    ],
    required: false,
    mapsTo: 'biggestBarrier',
  },

  // ── Screen 2: Your Lifestyle ──────────────────────────────
  {
    id: 'onb-05',
    screen: 2,
    text: 'How much time can you realistically dedicate to your wellness each day?',
    type: 'single-select',
    options: [
      { value: '5-10-min', label: '5–10 minutes — I\'m stretched thin but want to do something' },
      { value: '10-20-min', label: '10–20 minutes — I can carve out a little time daily' },
      { value: '20-30-min', label: '20–30 minutes — I have a decent window most days' },
      { value: '30-plus-min', label: '30+ minutes — I can commit to a full routine' },
    ],
    required: true,
    mapsTo: 'timeAvailability',
  },
  {
    id: 'onb-06',
    screen: 2,
    text: 'What does your typical work week look like?',
    type: 'single-select',
    options: [
      { value: 'desk-job', label: 'Desk job — I sit most of the day' },
      { value: 'on-feet', label: 'On my feet — I\'m moving for work (retail, healthcare, trades)' },
      { value: 'hybrid', label: 'Hybrid — Some desk, some movement' },
      { value: 'variable', label: 'Variable / unpredictable — My schedule changes a lot' },
      { value: 'caregiver', label: 'Stay-at-home parent / caregiver — My time isn\'t my own' },
    ],
    required: true,
    mapsTo: 'workType',
  },
  {
    id: 'onb-07',
    screen: 2,
    text: "How would you describe your typical stress level?",
    type: 'single-select',
    options: [
      { value: 'low', label: 'Low — I handle life\'s ups and downs pretty well' },
      { value: 'moderate', label: 'Moderate — I have stress but I manage okay' },
      { value: 'high', label: 'High — I feel stressed more days than not' },
      { value: 'very-high', label: 'Very high — Stress is affecting my health and relationships' },
    ],
    required: false,
    mapsTo: 'stressLevel',
  },
  {
    id: 'onb-08',
    screen: 2,
    text: "How's your sleep environment?",
    type: 'single-select',
    options: [
      { value: 'good', label: 'Good — dark, quiet, cool, comfortable bed' },
      { value: 'okay', label: 'Okay — some room for improvement (light, noise, temperature)' },
      { value: 'poor', label: 'Poor — I know my environment is working against me' },
      { value: 'unsure', label: 'Not sure — I haven\'t thought about it' },
    ],
    required: false,
    mapsTo: 'sleepEnvironment',
  },

  // ── Screen 3: Preferences & Constraints ──────────────────
  {
    id: 'onb-09',
    screen: 3,
    text: 'What kinds of movement do you *enjoy* or want to try?',
    subtitle: 'Select all that apply',
    type: 'multi-select',
    options: [
      { value: 'walking', label: 'Walking / hiking' },
      { value: 'running', label: 'Running / jogging' },
      { value: 'yoga', label: 'Yoga / Pilates / stretching' },
      { value: 'strength', label: 'Strength training / weights' },
      { value: 'cycling', label: 'Cycling / spinning' },
      { value: 'swimming', label: 'Swimming' },
      { value: 'dancing', label: 'Dancing' },
      { value: 'sports', label: 'Team sports / classes' },
      { value: 'home-workouts', label: 'Short home workouts / bodyweight' },
      { value: 'explore', label: 'I don\'t know — I want to explore' },
      { value: 'dislike-exercise', label: 'I don\'t enjoy exercise (help me find something tolerable)' },
    ],
    required: true,
    mapsTo: 'movementPreferences',
  },
  {
    id: 'onb-10',
    screen: 3,
    text: 'Do you have any dietary preferences or restrictions?',
    subtitle: 'Select all that apply',
    type: 'multi-select',
    options: [
      { value: 'none', label: 'No restrictions — I eat everything' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'gluten-free', label: 'Gluten-free' },
      { value: 'dairy-free', label: 'Dairy-free' },
      { value: 'low-carb', label: 'Low-carb / keto-friendly' },
      { value: 'allergies', label: 'I have allergies (please specify)' },
      { value: 'unsure', label: 'I\'m not sure what works for me' },
    ],
    required: false,
    mapsTo: 'dietaryPreferences',
  },
  {
    id: 'onb-11',
    screen: 3,
    text: 'What tone of guidance works best for you?',
    type: 'single-select',
    options: [
      { value: 'gentle', label: 'Gentle and encouraging — cheer me on with kindness' },
      { value: 'direct', label: 'Direct and practical — give me the facts, keep it simple' },
      { value: 'humorous', label: 'Humorous and light — I want to smile while I learn' },
      { value: 'scientific', label: 'Deep and science-y — I want to understand the "why"' },
    ],
    required: false,
    mapsTo: 'tonePreference',
  },
  {
    id: 'onb-12',
    screen: 3,
    text: 'Anything else you\'d like us to know?',
    subtitle: 'Optional — e.g., chronic condition, pregnancy, injury, travel',
    type: 'free-text',
    options: null,
    required: false,
    mapsTo: 'additionalNotes',
  },
];

/** Group onboarding questions by screen for step-by-step rendering */
export const ONBOARDING_BY_SCREEN: Record<number, OnboardingQuestion[]> = {
  1: ONBOARDING_QUESTIONS.filter((q) => q.screen === 1),
  2: ONBOARDING_QUESTIONS.filter((q) => q.screen === 2),
  3: ONBOARDING_QUESTIONS.filter((q) => q.screen === 3),
};

/** Get the required question IDs (must be answered before proceeding) */
export const REQUIRED_ONBOARDING_IDS: string[] = ONBOARDING_QUESTIONS
  .filter((q) => q.required)
  .map((q) => q.id);