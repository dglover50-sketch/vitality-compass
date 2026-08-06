import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/resources/meal-prep")({
  component: MealPrepPage,
});

type Tab = "meal-prep" | "workout" | "recipes";

const TIERS = [
  { id: "beginner", emoji: "🟢", label: "Beginner", color: "bg-teal-700", time: "~30 min/week", daily: "~10 min/day" },
  { id: "maintainer", emoji: "🟡", label: "Maintainer", color: "bg-amber-500", time: "~60 min/week", daily: "~15 min/day" },
  { id: "optimizer", emoji: "🔵", label: "Optimizer", color: "bg-forest-600", time: "~90 min/week", daily: "~20 min/day" },
];

const WORKOUT_TIERS = [
  { id: "beginner", emoji: "🟢", label: "Beginner: Bodyweight & Basics", desc: "~20-30 min/day. No equipment needed.", color: "bg-teal-700" },
  { id: "maintainer", emoji: "🟡", label: "Maintainer: Light Weights & Cardio", desc: "~30-45 min/day. Dumbbells or bands.", color: "bg-amber-500" },
  { id: "optimizer", emoji: "🔵", label: "Optimizer: Progressive Overload", desc: "~45-60 min/day. Gym access.", color: "bg-forest-600" },
];

const WEEKLY_PLANS: Record<string, { day: string; meals: string[] }[]> = {
  beginner: [
    { day: "Monday", meals: ["Greek yogurt + berries + granola", "Mason jar salad", "Sheet pan salmon + broccoli + sweet potato", "Apple + peanut butter"] },
    { day: "Tuesday", meals: ["Same as Mon", "Mason jar salad #2", "15-min black bean tacos", "Handful almonds"] },
    { day: "Wednesday", meals: ["Overnight oats", "Mason jar salad #3", "Leftover tacos", "Greek yogurt + berries"] },
    { day: "Thursday", meals: ["Greek yogurt + berries", "Leftover salmon bowl", "20-min veggie stir-fry + tofu", "Carrot sticks + hummus"] },
    { day: "Friday", meals: ["Overnight oats", "Quick tuna + avocado wrap", "DIY Buddha bowl", "Dark chocolate square"] },
    { day: "Saturday", meals: ["Scrambled eggs + spinach", "Out or leftovers", "Chicken + veggie sheet pan", "Mixed nuts"] },
  ],
  maintainer: [
    { day: "Monday", meals: ["Protein smoothie", "Quinoa bowl with chickpeas", "Lemon herb chicken + asparagus", "Apple + almond butter"] },
    { day: "Tuesday", meals: ["Same smoothie", "Quinoa bowl #2", "Salmon + avocado salsa", "Cottage cheese + berries"] },
    { day: "Wednesday", meals: ["Greek yogurt parfait", "Quinoa bowl #3", "Leftover chicken + farro", "Roasted chickpeas"] },
    { day: "Thursday", meals: ["Smoothie", "Tuna + white bean salad", "Turkey stir-fry + brown rice", "Celery + peanut butter"] },
    { day: "Friday", meals: ["Scrambled eggs + spinach + toast", "Leftover stir-fry", "Pantry cleanout bowl", "Dark chocolate + almonds"] },
    { day: "Saturday", meals: ["Protein pancakes", "Out or leftovers", "Shrimp + zucchini noodles", "Edamame pods"] },
  ],
  optimizer: [
    { day: "Monday", meals: ["Egg muffins + 1/2 avocado", "Salmon poke bowl", "Beef + sweet potato hash + kale", "Bone broth + collagen"] },
    { day: "Tuesday", meals: ["Protein smoothie (kefir)", "Poke bowl #2", "Garlic shrimp + Brussels sprouts", "Turkey + avocado roll-ups"] },
    { day: "Wednesday", meals: ["Egg muffins", "Poke bowl #3", "Leftover beef hash + salad", "Full-fat Greek yogurt"] },
    { day: "Thursday", meals: ["Smoothie", "Leftover shrimp + wild rice", "Baked cod + beets + lentils", "Apple + sunflower seed butter"] },
    { day: "Friday", meals: ["Chia pudding", "Leftover cod + lentils", "Turkey wraps + cauliflower rice", "Walnuts + dark chocolate"] },
    { day: "Saturday", meals: ["Smoked salmon + avocado + rye", "Farmers market bowl", "Lamb chops + roasted carrots", "Kefir + berries"] },
  ],
};

const WORKOUT_PLANS: Record<string, { day: string; workout: string; intensity: string; duration: string; details: string }[]> = {
  beginner: [
    { day: "Monday", workout: "Full-body bodyweight", intensity: "🔵 Moderate-High", duration: "20-30 min", details: "3 rounds: 10 squats, 8 push-ups, 10 glute bridges, 30-sec plank" },
    { day: "Tuesday", workout: "Brisk walk", intensity: "🟢 Low-Moderate", duration: "20-25 min", details: "Conversation pace walk outdoors or treadmill." },
    { day: "Wednesday", workout: "Upper body + core", intensity: "🔵 Moderate-High", duration: "20-30 min", details: "3 rounds: 10 lunges, 8 incline push-ups, 10 seated rows, 30-sec side plank" },
    { day: "Thursday", workout: "Yoga / stretching", intensity: "🟢 Low", duration: "15-20 min", details: "Beginner yoga flow or static stretching routine." },
    { day: "Friday", workout: "Full-body + cardio bursts", intensity: "🔵 High", duration: "20-30 min", details: "3 rounds: 20 jumping jacks, 10 squats, 8 push-ups, 15 high knees" },
    { day: "Saturday", workout: "Fun movement", intensity: "🟢 Any", duration: "30-40 min", details: "Walk, hike, bike ride, or recreational sport." },
    { day: "Sunday", workout: "Active recovery", intensity: "🟢 Low", duration: "15-20 min", details: "Gentle stretching or walking while meal prepping." },
  ],
  maintainer: [
    { day: "Monday", workout: "Full-body strength", intensity: "🔵 Moderate-High", duration: "30-45 min", details: "3x10-12: goblet squats, dumbbell bench press, rows, overhead press, deadlifts" },
    { day: "Tuesday", workout: "Jog or cycle", intensity: "🟢 Low-Moderate", duration: "25-30 min", details: "Steady-state cardio. Slightly breathless but can talk." },
    { day: "Wednesday", workout: "Upper body + core", intensity: "🔵 Moderate-High", duration: "30-45 min", details: "3x10-12: chest press, rows, lateral raises, curls. 10 min core." },
    { day: "Thursday", workout: "Active recovery", intensity: "🟢 Low", duration: "20 min", details: "Mobility flow: cat-cow, hip circles, hamstring stretches, pigeon pose." },
    { day: "Friday", workout: "Lower body + HIIT", intensity: "🔵 High", duration: "30-45 min", details: "3x12: goblet squats, lunges, deadlifts, calf raises. Then 10 min HIIT." },
    { day: "Saturday", workout: "Fun movement", intensity: "🟢 Any", duration: "40-60 min", details: "Hike, bike, swim, sport, or dance class." },
    { day: "Sunday", workout: "Active recovery", intensity: "🟢 Low", duration: "20 min", details: "Yoga or gentle stretching. Walk while meal prepping." },
  ],
  optimizer: [
    { day: "Monday", workout: "Push day", intensity: "🔵 Moderate-High", duration: "45-60 min", details: "4x8-10: bench press, incline press, overhead press, lateral raises, tricep pushdowns" },
    { day: "Tuesday", workout: "Cardio + abs", intensity: "🟢 Low-Moderate", duration: "40-50 min", details: "30-40 min zone 2 cardio. 10 min core circuit." },
    { day: "Wednesday", workout: "Pull day", intensity: "🔵 Moderate-High", duration: "45-60 min", details: "4x8-10: pull-ups, barbell rows, face pulls, cable rows, bicep curls" },
    { day: "Thursday", workout: "Active recovery", intensity: "🟢 Low", duration: "25 min", details: "Mobility work + foam rolling. Hips, thoracic spine, ankles." },
    { day: "Friday", workout: "Leg day + HIIT", intensity: "🔵 High", duration: "45-60 min", details: "4x8-10: squats, deadlifts, lunges, leg press. 10 min HIIT finisher." },
    { day: "Saturday", workout: "Fun or sport-specific", intensity: "🟢 Any", duration: "45-60 min", details: "Sport practice, trail run, long hike, or favorite activity." },
    { day: "Sunday", workout: "Active recovery", intensity: "🟢 Low", duration: "20 min", details: "Yoga + gentle walk. Prep meals for the week." },
  ],
};

const PRE_WORKOUT_NUTRITION = {
  "non-vegan": [
    { snack: "Banana + 1 tbsp peanut butter", timing: "30 min before", cals: "~200", why: "Quick carbs + steady energy" },
    { snack: "Greek yogurt (½ cup) + berries", timing: "45 min before", cals: "~150", why: "Protein + carbs, gentle on stomach" },
    { snack: "1 slice whole grain toast + honey", timing: "30 min before", cals: "~140", why: "Fast-digesting carbs" },
    { snack: "Small whey protein shake (½ scoop)", timing: "45 min before", cals: "~60", why: "Rapid amino acid delivery" },
  ],
  vegan: [
    { snack: "Banana (1 medium)", timing: "30 min before", cals: "~105", why: "Perfect fast carbs, zero prep" },
    { snack: "Dates (2-3) + almond butter", timing: "30 min before", cals: "~180", why: "Natural sugar + healthy fat" },
    { snack: "Oatmeal (½ cup) + maple syrup", timing: "45-60 min before", cals: "~150", why: "Sustained energy release" },
    { snack: "Small pea protein shake (½ scoop)", timing: "45 min before", cals: "~55", why: "Plant-based amino acids" },
  ],
};

const POST_WORKOUT_NUTRITION = {
  "non-vegan": [
    { snack: "Chocolate milk (1 cup)", prep: "1 min", protein: "8g", why: "DIY recovery drink — the classic" },
    { snack: "Greek yogurt (1 cup) + berries + honey", prep: "2 min", protein: "20g", why: "Perfect 3:1 carb-to-protein ratio" },
    { snack: "Tuna salad on rice cakes", prep: "3 min", protein: "22g", why: "Lean protein + quick carbs" },
    { snack: "Egg muffin cups (prepped — R9) + toast", prep: "2 min", protein: "18g", why: "Grab from meal prep, heat and eat" },
    { snack: "Whey protein shake + banana", prep: "2 min", protein: "25g", why: "Fastest possible protein delivery" },
  ],
  vegan: [
    { snack: "Pea protein shake + banana + oat milk", prep: "2 min", protein: "22g", why: "Complete plant protein, fast" },
    { snack: "Tofu scramble (prepped — R9 vegan) + toast", prep: "2 min", protein: "16g", why: "Grab from meal prep, reheat" },
    { snack: "Chickpea salad + pita", prep: "3 min", protein: "15g", why: "Carbs + fiber + protein" },
    { snack: "Soy milk (1 cup) + granola", prep: "2 min", protein: "12g", why: "Convenient, shelf-stable" },
    { snack: "Hummus + whole grain crackers + veg", prep: "2 min", protein: "10g", why: "Easy, no cooking required" },
  ],
};

const PREP_STEPS = [
  { title: "Choose Your Tier", desc: "Pick the category that matches your experience. If new to meal prep, start with Beginner for 2-3 weeks before leveling up." },
  { title: "Shop (Sunday Morning)", desc: "Use the shopping list to buy everything for the week. Stick to the list — this saves time and money." },
  { title: "Prep (Sunday Afternoon)", desc: "Block 30-90 minutes. Batch cook versatile ingredients (grains, proteins, roasted veg, dressings) that can be mixed and matched." },
  { title: "Assemble (Daily, 10-20 min)", desc: "Quickly assemble meals from prepped components. Most meals take 5 minutes — just reheat protein, add grain, top with veg and dressing." },
];

const PRINCIPLES = [
  "Cook once, eat 3-4 times — every ingredient you prep should be used in at least 3 meals",
  "Protein first — always prep your protein source; it's the hardest to cook quickly",
  "Color = nutrients — aim for 3+ colors on every plate",
  "Dressing is king — a good dressing makes simple ingredients taste like a real meal",
  "Forgiveness, not perfection — if you skip a prep day, eat simply. Don't quit",
];

const RECIPES = [
  { id: "R1", title: "Sheet Pan Roasted Veg + Protein", difficulty: "🟢 Beginner", time: "35 min", vegan: "Tofu", nonVegan: "Salmon", desc: "Broccoli, sweet potato, lemon, herbs — one pan, minimal cleanup." },
  { id: "R2", title: "Mason Jar Salad (Customizable)", difficulty: "🟢 Beginner", time: "15 min", vegan: "Chickpeas", nonVegan: "Chicken", desc: "Layer dressing, veg, protein, grain, greens. Shake and eat all week." },
  { id: "R3", title: "Quick Black Bean Tacos", difficulty: "🟢 Beginner", time: "15 min", vegan: "Extra avocado", nonVegan: "Grilled chicken", desc: "Mashed black beans with spices. Fast, filling, and customizable." },
  { id: "R4", title: "Lemon Herb Grain Bowl", difficulty: "🟡 Maintainer", time: "35 min", vegan: "Marinated tempeh", nonVegan: "Chicken breast", desc: "Farro or quinoa with asparagus, lemon, and herbs." },
  { id: "R5", title: "20-Min Veggie Stir-Fry", difficulty: "🟢 Beginner", time: "20 min", vegan: "Tofu or tempeh", nonVegan: "Chicken or shrimp", desc: "Mixed veg with tamari, sesame, garlic, ginger." },
  { id: "R6", title: "Protein Smoothie (3 Ways)", difficulty: "🟢 Beginner", time: "5 min", vegan: "Pea protein + oat milk", nonVegan: "Whey + dairy milk", desc: "Green Power, Berry Bliss, or Chocolate PB." },
  { id: "R7", title: "Lettuce Wrap Bowls", difficulty: "🟡 Maintainer", time: "20 min", vegan: "Lentil-walnut crumbles", nonVegan: "Ground turkey", desc: "Low-carb, gluten-free. Butter lettuce cups with fresh toppings." },
  { id: "R8", title: "Overnight Oats (3 Ways)", difficulty: "🟢 Beginner", time: "5 min prep", vegan: "Oat milk + coconut yogurt", nonVegan: "Dairy milk + Greek yogurt", desc: "Berry Almond, Apple Cinnamon, or Chocolate PB." },
  { id: "R9", title: "Egg Muffin Cups / Tofu Scramble Cups", difficulty: "🟢 Beginner", time: "30 min", vegan: "Tofu scramble cups", nonVegan: "Egg muffin cups", desc: "Two separate versions. Perfect make-ahead breakfast." },
  { id: "R10", title: "One-Pan Roasted Veg + Grain Bowl", difficulty: "🟢 Beginner", time: "40 min", vegan: "Chickpea & avocado", nonVegan: "Chicken thighs", desc: "Sheet pan veg + protein over quinoa or rice." },
];

const DAY_PAIRING: Record<string, { workout: string; pre: string; post: string; dinner: string }> = {
  Monday: { workout: "Strength Day", pre: "Banana + peanut butter", post: "Greek yogurt + berries (nv) / pea protein shake (v)", dinner: "Sheet pan salmon/chickpea bowl (R10)" },
  Tuesday: { workout: "Cardio Day", pre: "Overnight oats (R8)", post: "Mason jar salad (R2) + extra protein", dinner: "Black bean tacos (R3)" },
  Wednesday: { workout: "Upper Body", pre: "Small smoothie (R6, half)", post: "Egg muffins / tofu scramble cups (R9)", dinner: "Grain bowl with chicken or tempeh (R4)" },
  Thursday: { workout: "Active Recovery", pre: "Normal meals, no special fueling", post: "Mason jar salad (R2) for lunch", dinner: "Veggie stir-fry (R5)" },
  Friday: { workout: "Lower Body + HIIT", pre: "Dates + almond butter", post: "Chocolate milk (nv) / soy milk + granola (v)", dinner: "Lettuce wraps (R7)" },
  Saturday: { workout: "Fun Movement", pre: "Flexible — match your activity", post: "Pack a salad (R2) + overnight oats (R8)", dinner: "Enjoyable, flexible eating" },
  Sunday: { workout: "Prep Day + Active Recovery", pre: "No special fueling needed", post: "Focus on prepping meals for the week", dinner: "Hydrate well while cooking" },
};

function MealPrepPage() {
  const [tab, setTab] = useState<Tab>("meal-prep");
  const [activeTier, setActiveTier] = useState("beginner");
  const [workoutTier, setWorkoutTier] = useState("beginner");
  const [nutritionDiet, setNutritionDiet] = useState<"non-vegan" | "vegan">("non-vegan");

  return (
    <div className="min-h-dvh bg-warm-50">
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white shadow-sm">VC</span>
            <span className="font-heading text-lg font-semibold text-warm-900">Vitality Compass</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="font-body text-sm font-medium text-warm-700 hover:text-teal-700">Dashboard</Link>
            <Link to="/assessment" className="rounded-lg bg-teal-700 px-4 py-2 font-body text-sm font-medium text-white hover:bg-teal-600">Assessment</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-warm-200 bg-white px-4 py-1 font-body text-xs font-medium text-warm-500 shadow-sm">Resource</span>
          <h1 className="mt-4 font-heading text-4xl font-bold text-warm-900 sm:text-5xl">Meal Prep & Workout Guide</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-warm-700">
            A complete system pairing weekly meal prep with a movement plan. Vegan and non-vegan options for every recipe.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {[
            { id: "meal-prep" as Tab, label: "🥗 Meal Prep" },
            { id: "workout" as Tab, label: "🏋️ Workout Plan" },
            { id: "recipes" as Tab, label: "📖 Recipes" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-6 py-3 font-body text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-teal-700 text-white shadow-md"
                  : "border border-warm-200 bg-white text-warm-700 hover:border-teal-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: MEAL PREP ── */}
        {tab === "meal-prep" && (
          <>
            {/* Tier Selector */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setActiveTier(tier.id)}
                  className={`rounded-lg px-5 py-2.5 font-body text-sm font-semibold transition-all ${
                    activeTier === tier.id
                      ? `${tier.color} text-white shadow-md`
                      : "border border-warm-200 bg-white text-warm-700 hover:border-teal-200"
                  }`}
                >
                  {tier.emoji} {tier.label} — {tier.time}
                </button>
              ))}
            </div>

            {/* Weekly Menu Table */}
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-warm-200">
              <div className="bg-brand-gradient px-6 py-4">
                <h2 className="font-heading text-lg font-semibold text-white">
                  {TIERS.find((t) => t.id === activeTier)?.emoji} {TIERS.find((t) => t.id === activeTier)?.label} Weekly Menu
                </h2>
                <p className="font-body text-sm text-warm-200">{TIERS.find((t) => t.id === activeTier)?.daily}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warm-200 bg-warm-50">
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Day</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Breakfast</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Lunch</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Dinner</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Snack</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEEKLY_PLANS[activeTier]?.map((day, i) => (
                      <tr key={day.day} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                        <td className="px-4 py-3 font-heading text-sm font-semibold text-teal-700">{day.day}</td>
                        {day.meals.map((meal, j) => (
                          <td key={j} className="px-4 py-3 font-body text-sm text-warm-700">{meal}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prep Method */}
            <div className="mb-10 rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-xl font-semibold text-warm-900">The Meal Prep Method</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {PREP_STEPS.map((step, i) => (
                  <div key={step.title} className="rounded-lg bg-warm-50 p-5">
                    <span className="flex size-8 items-center justify-center rounded-full bg-teal-700 font-heading text-sm font-bold text-white">{i + 1}</span>
                    <h3 className="mt-3 font-heading text-base font-semibold text-warm-900">{step.title}</h3>
                    <p className="mt-1 font-body text-sm text-warm-700">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Principles */}
            <div className="mb-10 rounded-xl bg-brand-gradient p-8 text-white shadow-md">
              <h2 className="font-heading text-xl font-semibold">Core Principles</h2>
              <ul className="mt-6 space-y-4">
                {PRINCIPLES.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-sm text-warm-100">
                    <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-teal-200">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* ── TAB: WORKOUT PLAN ── */}
        {tab === "workout" && (
          <>
            {/* Workout Philosophy */}
            <div className="mb-8 rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-xl font-semibold text-warm-900">Fuel, Move, Recover</h2>
              <p className="mt-2 font-body text-sm text-warm-700">Your meal prep provides the fuel. Your movement plan provides the stimulus. Together they create a sustainable wellness rhythm.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["Prep day = active recovery", "Hard training days = higher carb meals", "Rest days = lighter meals", "Pre/post workout nutrition matters"].map((item) => (
                  <div key={item} className="rounded-lg bg-teal-50 p-3 font-body text-sm text-teal-800">{item}</div>
                ))}
              </div>
            </div>

            {/* Workout Tier Selector */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {WORKOUT_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setWorkoutTier(tier.id)}
                  className={`rounded-lg px-5 py-2.5 font-body text-sm font-semibold transition-all ${
                    workoutTier === tier.id
                      ? `${tier.color} text-white shadow-md`
                      : "border border-warm-200 bg-white text-warm-700 hover:border-teal-200"
                  }`}
                >
                  {tier.emoji} {tier.label}
                </button>
              ))}
            </div>

            {/* Weekly Schedule */}
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-warm-200">
              <div className="bg-brand-gradient px-6 py-4">
                <h2 className="font-heading text-lg font-semibold text-white">
                  {WORKOUT_TIERS.find((t) => t.id === workoutTier)?.emoji} Weekly Movement Schedule
                </h2>
                <p className="font-body text-sm text-warm-200">{WORKOUT_TIERS.find((t) => t.id === workoutTier)?.desc}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warm-200 bg-warm-50">
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Day</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Workout</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Intensity</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Duration</th>
                      <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-warm-900">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WORKOUT_PLANS[workoutTier]?.map((day, i) => (
                      <tr key={day.day} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                        <td className="px-4 py-3 font-heading text-sm font-semibold text-teal-700">{day.day}</td>
                        <td className="px-4 py-3 font-body text-sm font-medium text-warm-900">{day.workout}</td>
                        <td className="px-4 py-3 font-body text-sm text-warm-700">{day.intensity}</td>
                        <td className="px-4 py-3 font-body text-sm text-warm-700">{day.duration}</td>
                        <td className="px-4 py-3 font-body text-sm text-warm-700">{day.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pre/Post Workout Nutrition */}
            <div className="mb-10">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold text-warm-900">Pre & Post Workout Nutrition</h2>
                <div className="flex gap-2">
                  {(["non-vegan", "vegan"] as const).map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setNutritionDiet(diet)}
                      className={`rounded-lg px-4 py-2 font-body text-xs font-semibold transition-all ${
                        nutritionDiet === diet
                          ? "bg-teal-700 text-white"
                          : "border border-warm-200 bg-white text-warm-700 hover:border-teal-200"
                      }`}
                    >
                      {diet === "non-vegan" ? "🥩 Non-Vegan" : "🌱 Vegan"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Pre-Workout */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200">
                  <h3 className="font-heading text-base font-semibold text-teal-700">Pre-Workout (30-60 min before)</h3>
                  <p className="mt-1 font-body text-xs text-warm-500">Easy-to-digest carbs + a little protein</p>
                  <div className="mt-4 space-y-3">
                    {(nutritionDiet === "non-vegan" ? PRE_WORKOUT_NUTRITION["non-vegan"] : PRE_WORKOUT_NUTRITION["vegan"]).map((item) => (
                      <div key={item.snack} className="rounded-lg bg-warm-50 p-3">
                        <p className="font-body text-sm font-medium text-warm-900">{item.snack}</p>
                        <p className="font-body text-xs text-warm-500">{item.timing} &middot; {item.cals} cal &middot; {item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post-Workout */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200">
                  <h3 className="font-heading text-base font-semibold text-teal-700">Post-Workout (within 30-60 min)</h3>
                  <p className="mt-1 font-body text-xs text-warm-500">Protein for repair + carbs for replenishment</p>
                  <div className="mt-4 space-y-3">
                    {(nutritionDiet === "non-vegan" ? POST_WORKOUT_NUTRITION["non-vegan"] : POST_WORKOUT_NUTRITION["vegan"]).map((item) => (
                      <div key={item.snack} className="rounded-lg bg-warm-50 p-3">
                        <p className="font-body text-sm font-medium text-warm-900">{item.snack}</p>
                        <p className="font-body text-xs text-warm-500">{item.prep} prep &middot; {item.protein} protein &middot; {item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Day-by-Day Pairing */}
            <div className="mb-10 rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
              <h2 className="font-heading text-xl font-semibold text-warm-900">Day-by-Day Pairing Guide</h2>
              <p className="mt-1 font-body text-sm text-warm-500">How your meal prep and workout plans work together</p>
              <div className="mt-6 space-y-4">
                {Object.entries(DAY_PAIRING).map(([day, info]) => (
                  <div key={day} className="rounded-lg bg-warm-50 p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-sm font-bold text-teal-700 w-20">{day}</span>
                      <span className="rounded-full bg-teal-100 px-3 py-0.5 font-body text-xs font-medium text-teal-800">{info.workout}</span>
                    </div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <div><span className="font-body text-xs font-medium text-warm-500">Pre:</span> <span className="font-body text-xs text-warm-700">{info.pre}</span></div>
                      <div><span className="font-body text-xs font-medium text-warm-500">Post:</span> <span className="font-body text-xs text-warm-700">{info.post}</span></div>
                      <div><span className="font-body text-xs font-medium text-warm-500">Dinner:</span> <span className="font-body text-xs text-warm-700">{info.dinner}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── TAB: RECIPES ── */}
        {tab === "recipes" && (
          <>
            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {RECIPES.map((r) => (
                <div key={r.id} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-teal-100 px-3 py-0.5 font-body text-xs font-semibold text-teal-800">{r.id}</span>
                    <span className="font-body text-xs text-warm-500">{r.difficulty}</span>
                  </div>
                  <h3 className="mt-3 font-heading text-base font-semibold text-warm-900">{r.title}</h3>
                  <p className="mt-1 font-body text-sm text-warm-700">{r.desc}</p>
                  <p className="mt-2 font-body text-xs text-warm-500">{r.time}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 font-body text-[10px] font-medium text-green-700">🌱 {r.vegan}</span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 font-body text-[10px] font-medium text-amber-700">🥩 {r.nonVegan}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        {tab === "meal-prep" && (
          <div className="text-center">
            <Link to="/resources/meal-prep?tab=recipes" onClick={() => setTab("recipes")} className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-8 py-3 font-body text-base font-semibold text-white shadow-sm hover:bg-teal-600">
              View All Recipes
            </Link>
          </div>
        )}
        {tab === "workout" && (
          <div className="text-center">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-8 py-3 font-body text-base font-semibold text-white shadow-sm hover:bg-teal-600">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}