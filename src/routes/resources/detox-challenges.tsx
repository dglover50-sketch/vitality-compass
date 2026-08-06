import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/resources/detox-challenges")({
  component: DetoxChallengesPage,
});

type ChallengeId = "juice" | "salad" | "water" | "tea";

const CHALLENGES: { id: ChallengeId; label: string; emoji: string; color: string; duration: string; difficulty: string }[] = [
  { id: "juice", label: "3-Day Juice Reset", emoji: "🧃", color: "bg-amber-500", duration: "3 days", difficulty: "Moderate" },
  { id: "salad", label: "5-Day Salad Challenge", emoji: "🥗", color: "bg-teal-700", duration: "5 days", difficulty: "Easy-Moderate" },
  { id: "water", label: "7-Day Water Reset", emoji: "💧", color: "bg-forest-600", duration: "7 days", difficulty: "Very Easy" },
  { id: "tea", label: "7-Day Herbal Tea Ritual", emoji: "🍵", color: "bg-coral-400", duration: "7 days", difficulty: "Very Easy" },
];

const COMPARISON = {
  headers: ["Aspect", "🧃 3-Day Juice Reset", "🥗 5-Day Salad Challenge", "💧 7-Day Water Reset", "🍵 7-Day Herbal Tea Ritual"],
  rows: [
    ["Duration", "3 days", "5 days", "7 days", "7 days (or ongoing)"],
    ["Difficulty", "Moderate", "Easy-Moderate", "Very Easy", "Very Easy"],
    ["Prep time", "30 min", "45 min", "5 min", "10 min"],
    ["Still eat solid food?", "✅ At least 1 meal/day", "✅ Yes", "✅ Yes, normal eating", "✅ Yes, normal eating"],
    ["Best for", "Breaking sugar/processed food cycles", "Increasing veggie intake", "Building hydration habits", "Reducing caffeine, creating rituals"],
    ["Risk of over-restriction", "Moderate", "Low", "Very low", "Very low"],
    ["Equipment needed", "Juicer", "Large bowl + knife", "Water bottle", "Kettle + tea"],
    ["Budget", "$$", "$", "$", "$$"],
  ],
};

function DetoxChallengesPage() {
  const [activeChallenge, setActiveChallenge] = useState<ChallengeId>("juice");

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
            <Link to="/resources/meal-prep" className="font-body text-sm font-medium text-warm-700 hover:text-teal-700">Meal Prep</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-warm-200 bg-white px-4 py-1 font-body text-xs font-medium text-warm-500 shadow-sm">Resource</span>
          <h1 className="mt-4 font-heading text-4xl font-bold text-warm-900 sm:text-5xl">Detox Challenges</h1>
          <p className="mx-auto mt-4 max-w-3xl font-body text-lg text-warm-700">
            Structured resets designed to help you break patterns, hydrate deeply, eat more plants, and notice how your body feels.
          </p>
        </div>

        {/* What Detox Actually Means */}
        <div className="mb-10 rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
          <h2 className="font-heading text-xl font-semibold text-warm-900">What "Detox" Actually Means</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-warm-700">
            Your body already has a highly efficient detoxification system — your liver, kidneys, lungs, lymphatic system, and skin work 24/7.
            A "detox challenge" isn't about flushing toxins. Instead, it's about <strong className="text-warm-900">giving your body a break from processed foods, sugar, and alcohol</strong> while flooding it with the nutrients, hydration, and fiber it needs.
          </p>
          <p className="mt-3 font-body text-sm font-semibold text-teal-700">
            Think of it as a reset, not a cleanse. A chance to break unhealthy patterns and notice how your body feels when you fuel it well.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-10 rounded-xl border-2 border-amber-400 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-heading text-base font-semibold text-amber-800">Important Disclaimer</h3>
              <p className="mt-1 font-body text-sm text-amber-700">
                These challenges are designed for generally healthy adults. They are <strong>not</strong> medical treatments, weight loss programs, or cures.
                If you have a medical condition, are pregnant/nursing, have a history of disordered eating, or take prescription medications, consult your healthcare provider before starting.
              </p>
              <p className="mt-2 font-body text-sm font-semibold text-amber-800">
                Stop any challenge immediately if you feel unwell, dizzy, weak, or experience severe headaches.
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Selector */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {CHALLENGES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChallenge(c.id)}
              className={`rounded-lg px-5 py-3 font-body text-sm font-semibold transition-all ${
                activeChallenge === c.id
                  ? `${c.color} text-white shadow-md`
                  : "border border-warm-200 bg-white text-warm-700 hover:border-teal-200"
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Active Challenge Content */}
        {activeChallenge === "juice" && <JuiceChallenge />}
        {activeChallenge === "salad" && <SaladChallenge />}
        {activeChallenge === "water" && <WaterChallenge />}
        {activeChallenge === "tea" && <TeaChallenge />}

        {/* Comparison Table */}
        <div className="mb-10 rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
          <h2 className="font-heading text-xl font-semibold text-warm-900">Which Challenge Should You Choose?</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-warm-200 bg-warm-50">
                  {COMPARISON.headers.map((h, i) => (
                    <th key={i} className={`px-4 py-3 text-left font-heading text-xs font-semibold ${i === 0 ? "text-warm-900" : "text-teal-700"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 font-body text-xs ${j === 0 ? "font-semibold text-warm-900" : "text-warm-700"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Word */}
        <div className="mb-10 rounded-xl bg-brand-gradient p-8 text-white shadow-md">
          <h2 className="font-heading text-xl font-semibold">A Note from Vitality Compass</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-warm-100">
            The best "detox" is eating well, sleeping enough, moving your body, staying hydrated, and managing stress every day — all of which are covered in our meal prep plans, workout guides, and wellness plans.
          </p>
          <p className="mt-3 font-body text-sm text-warm-200">
            These challenges are not cures, not weight loss programs, and not substitutes for medical care. They are structured resets designed to help you break a pattern, try something new, and pay attention to how your body responds.
          </p>
          <p className="mt-4 font-body text-sm font-semibold text-white">
            Choose the one that feels right. Start tomorrow. Keep it simple. Notice how you feel. And when the challenge ends, keep the habits that worked.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-8 py-3 font-body text-base font-semibold text-white shadow-sm hover:bg-teal-600">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function JuiceChallenge() {
  const SCHEDULE = [
    { time: "Upon waking", action: "16 oz warm water with lemon" },
    { time: "Breakfast (8 AM)", action: "Green juice: spinach + cucumber + celery + green apple + lemon + ginger" },
    { time: "Morning snack", action: "Small handful almonds or 1 apple" },
    { time: "Lunch (12:30 PM)", action: "Solid meal: large salad with chickpeas, avocado, olive oil dressing" },
    { time: "Afternoon snack (3 PM)", action: "Carrot + orange + turmeric juice OR herbal tea" },
    { time: "Dinner (6:30 PM)", action: "Light solid meal: roasted veg bowl or veggie soup" },
    { time: "Evening", action: "Unlimited herbal tea (chamomile, peppermint, or ginger)" },
  ];

  return (
    <div className="mb-10 space-y-8">
      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h2 className="font-heading text-2xl font-bold text-warm-900">🧃 3-Day Juice Reset</h2>
        <p className="mt-2 font-body text-sm text-warm-700">Replace 1-2 meals per day with fresh juices while keeping one solid meal. <strong>You do not fast.</strong></p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-amber-100 px-3 py-1 font-body text-xs font-medium text-amber-800">3 days</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 font-body text-xs font-medium text-amber-800">Prep: 30 min</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 font-body text-xs font-medium text-amber-800">Moderate difficulty</span>
        </div>
      </div>

      <BenefitsCard benefits={[
        "Hydration boost — juices are ~90% water, supporting kidney function and skin health",
        "Antioxidant load — high levels of vitamin C, beta-carotene, and polyphenols",
        "Gut rest — replacing a heavy meal gives your digestive system a break",
        "Sugar break — swapping processed foods for veggie-heavy juices reduces added sugar",
      ]} />

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">Sample Daily Schedule</h3>
        <div className="mt-4 space-y-3">
          {SCHEDULE.map((item) => (
            <div key={item.time} className="flex gap-4 rounded-lg bg-warm-50 p-3">
              <span className="w-40 font-heading text-sm font-semibold text-teal-700 shrink-0">{item.time}</span>
              <span className="font-body text-sm text-warm-700">{item.action}</span>
            </div>
          ))}
        </div>
      </div>

      <TipsCard tips={[
        "Use a juicer (not a blender) — if using a blender, strain through a nut milk bag",
        "Drink juice within 30 minutes of making it — juice oxidizes quickly",
        "Don't juice-only — always keep at least one solid meal",
        "Green-heavy is better — limit fruit to 1 piece per juice",
        "Expect mild headaches from caffeine or sugar withdrawal — it passes after 1-2 days",
      ]} />

      <CautionsCard cautions={[
        { symptom: "Severe headache, dizziness", action: "Stop, eat a solid meal with protein, drink water" },
        { symptom: "Blood sugar crash (shaky, confused)", action: "Stop immediately, eat a balanced meal" },
        { symptom: "Extreme fatigue", action: "Try the Salad Challenge instead — this may be too restrictive" },
        { symptom: "Digestive upset", action: "Switch to the Water Challenge" },
      ]} />
    </div>
  );
}

function SaladChallenge() {
  const BUILD_TABLE = [
    { layer: "Greens", amount: "2 cups", examples: "Romaine + arugula, spinach + kale, mixed greens" },
    { layer: "Veg 1", amount: "½ cup", examples: "Cherry tomatoes, shredded carrot, roasted beets" },
    { layer: "Veg 2", amount: "½ cup", examples: "Cucumber, red bell pepper, shredded Brussels sprouts" },
    { layer: "Veg 3", amount: "½ cup", examples: "Purple cabbage, snap peas, radishes" },
    { layer: "Protein", amount: "⅓ cup", examples: "Chickpeas, grilled tempeh, lentils" },
    { layer: "Healthy fat", amount: "2 tbsp", examples: "Sliced avocado, pumpkin seeds, walnuts" },
    { layer: "Complex carb", amount: "¼ cup", examples: "Quinoa, roasted sweet potato, wild rice" },
    { layer: "Dressing", amount: "3 tbsp", examples: "Lemon tahini, balsamic vinaigrette" },
  ];

  return (
    <div className="mb-10 space-y-8">
      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h2 className="font-heading text-2xl font-bold text-warm-900">🥗 5-Day Salad Challenge</h2>
        <p className="mt-2 font-body text-sm text-warm-700">Eat at least one large, vegetable-forward salad per day while keeping other meals balanced but plant-heavy.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-teal-100 px-3 py-1 font-body text-xs font-medium text-teal-800">5 days</span>
          <span className="rounded-full bg-teal-100 px-3 py-1 font-body text-xs font-medium text-teal-800">Prep: 45 min</span>
          <span className="rounded-full bg-teal-100 px-3 py-1 font-body text-xs font-medium text-teal-800">Easy-Moderate</span>
        </div>
      </div>

      <BenefitsCard benefits={[
        "Fiber boost — 10-15g per salad, half your daily needs. Supports gut health and blood sugar stability",
        "Phytonutrient diversity — 7-10 plant types per day supports microbiome diversity",
        "Natural hydration — raw vegetables are 80-95% water",
        "Reduced processed food — the structure naturally displaces processed foods and added sugars",
      ]} />

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">Build Your Salad Formula</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-200 bg-warm-50">
                <th className="px-4 py-3 text-left font-heading text-xs font-semibold text-warm-900">Layer</th>
                <th className="px-4 py-3 text-left font-heading text-xs font-semibold text-warm-900">Amount</th>
                <th className="px-4 py-3 text-left font-heading text-xs font-semibold text-warm-900">Examples</th>
              </tr>
            </thead>
            <tbody>
              {BUILD_TABLE.map((row, i) => (
                <tr key={row.layer} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                  <td className="px-4 py-3 font-body text-sm font-semibold text-teal-700">{row.layer}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.amount}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TipsCard tips={[
        "Massage kale with olive oil and salt for 2 minutes to break down tough fibers",
        "Variety is the point — different colors = different phytonutrients",
        "Add warmth — use roasted vegetables or warm grains if cold salads feel unappealing",
        "Eat slowly and thoroughly — salads take more chewing",
      ]} />

      <CautionsCard cautions={[
        { symptom: "Bloating, gas", action: "Switch to cooked vegetables for 1-2 days" },
        { symptom: "Feeling too full", action: "Reduce portion size" },
        { symptom: "Hunger between meals", action: "Add more protein or healthy fat to your salad" },
      ]} />
    </div>
  );
}

function WaterChallenge() {
  const DAILY_STRUCTURE = [
    { time: "Upon waking", amount: "16 oz", drink: "Warm water with lemon" },
    { time: "Mid-morning", amount: "12 oz", drink: "Plain or infused water (cucumber + mint)" },
    { time: "Before lunch", amount: "8 oz", drink: "Water — helps regulate appetite" },
    { time: "Afternoon", amount: "16 oz", drink: "Herbal iced tea or sparkling water with lime" },
    { time: "Before dinner", amount: "8 oz", drink: "Water" },
    { time: "Evening", amount: "8 oz", drink: "Herbal tea (chamomile, peppermint)" },
  ];

  const WEEKLY_FOCUS = [
    { day: "Day 1", focus: "Baseline", infusion: "Plain water only" },
    { day: "Day 2", focus: "Citrus", infusion: "Lemon + lime water" },
    { day: "Day 3", focus: "Cucumber + mint", infusion: "Cucumber + mint + water" },
    { day: "Day 4", focus: "Berry", infusion: "Strawberry + basil water" },
    { day: "Day 5", focus: "Herbal iced tea", infusion: "Brewed hibiscus or rooibos, chilled" },
    { day: "Day 6", focus: "Coconut water", infusion: "1 cup coconut water + water rest of day" },
    { day: "Day 7", focus: "Sparkling", infusion: "Sparkling water + lime + splash pomegranate juice" },
  ];

  return (
    <div className="mb-10 space-y-8">
      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h2 className="font-heading text-2xl font-bold text-warm-900">💧 7-Day Hydration Reset</h2>
        <p className="mt-2 font-body text-sm text-warm-700">Reach optimal daily water intake through structured timing, infused waters, and hydrating foods.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-forest-100 px-3 py-1 font-body text-xs font-medium text-forest-700">7 days</span>
          <span className="rounded-full bg-forest-100 px-3 py-1 font-body text-xs font-medium text-forest-700">Prep: 5 min</span>
          <span className="rounded-full bg-forest-100 px-3 py-1 font-body text-xs font-medium text-forest-700">Very Easy</span>
        </div>
      </div>

      <BenefitsCard benefits={[
        "Improved energy — even 1-2% dehydration reduces focus and mood",
        "Headache reduction — dehydration is a common trigger for tension headaches",
        "Better digestion — adequate water supports nutrient absorption and regular bowel movements",
        "Kidney function — proper hydration reduces kidney stone risk by 50%+",
        "Skin health — hydrated skin appears plumper and more elastic",
      ]} />

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">Daily Structure</h3>
        <p className="font-body text-sm text-warm-500 mt-1">Total target: ~68 oz (2 liters) minimum</p>
        <div className="mt-4 space-y-2">
          {DAILY_STRUCTURE.map((item) => (
            <div key={item.time} className="flex gap-4 rounded-lg bg-warm-50 p-3">
              <span className="w-32 font-heading text-sm font-semibold text-teal-700 shrink-0">{item.time}</span>
              <span className="w-16 font-body text-sm font-medium text-warm-900 shrink-0">{item.amount}</span>
              <span className="font-body text-sm text-warm-700">{item.drink}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">Weekly Focus Themes</h3>
        <div className="mt-4 space-y-2">
          {WEEKLY_FOCUS.map((item) => (
            <div key={item.day} className="flex gap-4 rounded-lg bg-warm-50 p-3">
              <span className="w-16 font-heading text-sm font-semibold text-teal-700 shrink-0">{item.day}</span>
              <span className="w-28 font-body text-sm font-medium text-warm-900 shrink-0">{item.focus}</span>
              <span className="font-body text-sm text-warm-700">{item.infusion}</span>
            </div>
          ))}
        </div>
      </div>

      <TipsCard tips={[
        "Use a marked water bottle with time marks — finish 3 fills = done",
        "Set a phone reminder every hour from 9 AM to 5 PM",
        "Eat your water — cucumber (96%), watermelon (92%), strawberries (91%)",
        "Replace one sugary drink per day with water or sparkling water",
        "If you don't like plain water — infuse it, chill it, carbonate it",
      ]} />
    </div>
  );
}

function TeaChallenge() {
  const TEA_GUIDE = [
    { tea: "Peppermint", best: "Digestion, bloating", flavor: "Cool, minty", time: "Afternoon", key: "Menthol" },
    { tea: "Chamomile", best: "Sleep, relaxation", flavor: "Floral, gentle", time: "Evening", key: "Apigenin" },
    { tea: "Ginger", best: "Nausea, immunity", flavor: "Spicy, warming", time: "Morning", key: "Gingerols" },
    { tea: "Rooibos", best: "Antioxidants", flavor: "Earthy, nutty", time: "Any time", key: "Aspalathin" },
    { tea: "Hibiscus", best: "Heart health", flavor: "Tart, floral", time: "Afternoon/iced", key: "Anthocyanins" },
    { tea: "Lemon balm", best: "Stress, anxiety", flavor: "Lemony, calming", time: "Evening", key: "Rosmarinic acid" },
    { tea: "Fennel", best: "Bloating, digestion", flavor: "Licorice-like", time: "After meals", key: "Anethole" },
    { tea: "Turmeric + ginger", best: "Inflammation, immunity", flavor: "Spicy, earthy", time: "Morning", key: "Curcumin" },
  ];

  const TEA_SCHEDULE = [
    { day: "Day 1", morning: "Peppermint", afternoon: "Rooibos", evening: "Chamomile + lavender" },
    { day: "Day 2", morning: "Ginger + lemon", afternoon: "Hibiscus iced", evening: "Lemon balm" },
    { day: "Day 3", morning: "Peppermint", afternoon: "Rooibos", evening: "Chamomile" },
    { day: "Day 4", morning: "Turmeric + ginger", afternoon: "Hibiscus iced", evening: "Fennel" },
    { day: "Day 5", morning: "Ginger + lemon", afternoon: "Peppermint", evening: "Lemon balm" },
    { day: "Day 6", morning: "Rooibos", afternoon: "Peppermint", evening: "Chamomile" },
    { day: "Day 7", morning: "Tea flight", afternoon: "— sample 3 teas", evening: "Pick your favorite" },
  ];

  return (
    <div className="mb-10 space-y-8">
      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h2 className="font-heading text-2xl font-bold text-warm-900">🍵 7-Day Herbal Tea Ritual</h2>
        <p className="mt-2 font-body text-sm text-warm-700">Replace caffeinated and sugary beverages with herbal teas, creating a calming daily ritual.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-coral-100 px-3 py-1 font-body text-xs font-medium text-coral-700">7 days</span>
          <span className="rounded-full bg-coral-100 px-3 py-1 font-body text-xs font-medium text-coral-700">Prep: 10 min</span>
          <span className="rounded-full bg-coral-100 px-3 py-1 font-body text-xs font-medium text-coral-700">Very Easy</span>
        </div>
      </div>

      <BenefitsCard benefits={[
        "Hydration — herbal tea is flavored water that counts toward daily fluid intake",
        "Digestive support — peppermint, ginger, and fennel aid digestion and reduce bloating",
        "Stress reduction — the ritual of brewing and sipping tea is inherently calming",
        "Sleep quality — chamomile and lavender have mild sedative properties",
        "Reduced caffeine dependency — replacing caffeinated drinks eases withdrawal over time",
      ]} />

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">Herbal Tea Guide by Function</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-200 bg-warm-50">
                {["Tea", "Best For", "Flavor", "Best Time", "Key Compounds"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-heading text-xs font-semibold text-warm-900">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEA_GUIDE.map((row, i) => (
                <tr key={row.tea} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                  <td className="px-4 py-3 font-body text-sm font-semibold text-teal-700">{row.tea}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.best}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.flavor}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.time}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">Sample 7-Day Schedule</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-200 bg-warm-50">
                {["Day", "Morning (11 AM)", "Afternoon (3 PM)", "Evening (8 PM)"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-heading text-xs font-semibold text-warm-900">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEA_SCHEDULE.map((row, i) => (
                <tr key={row.day} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                  <td className="px-4 py-3 font-body text-sm font-semibold text-teal-700">{row.day}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.morning}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.afternoon}</td>
                  <td className="px-4 py-3 font-body text-sm text-warm-700">{row.evening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
        <h3 className="font-heading text-lg font-semibold text-warm-900">The 5-Minute Tea Ritual</h3>
        <ol className="mt-4 space-y-3">
          {["Boil fresh water (not microwaved — use a kettle)", "Pour over your tea (1 tsp loose leaf or 1 bag per 8 oz)", "Steep 5-7 minutes (cover to keep in volatile oils)", "Breathe — inhale the steam, notice the aroma", "Sip slowly — no phone, no screen. Just you and the tea."].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-teal-700 font-heading text-xs font-bold text-white shrink-0">{i + 1}</span>
              <span className="font-body text-sm text-warm-700">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <TipsCard tips={[
        "Buy loose leaf — higher quality, fresher, less waste than tea bags",
        "Stock 3-4 varieties and rotate based on mood and time of day",
        "Iced is valid — brew double-strength, pour over ice, add citrus",
        "Don't add sugar — use a cinnamon stick or a drop of stevia if needed",
        "Watch for caffeine — some herbal blends include actual tea leaves",
      ]} />
    </div>
  );
}

function BenefitsCard({ benefits }: { benefits: string[] }) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
      <h3 className="font-heading text-lg font-semibold text-warm-900">Science-Backed Benefits</h3>
      <div className="mt-4 space-y-3">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700 shrink-0">✓</span>
            <span className="font-body text-sm text-warm-700">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipsCard({ tips }: { tips: string[] }) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
      <h3 className="font-heading text-lg font-semibold text-warm-900">Practical Tips</h3>
      <ul className="mt-4 space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 font-body text-sm text-warm-700">
            <span className="text-teal-700 mt-0.5">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CautionsCard({ cautions }: { cautions: { symptom: string; action: string }[] }) {
  return (
    <div className="rounded-xl border-2 border-coral-400 bg-coral-50 p-6">
      <h3 className="font-heading text-base font-semibold text-coral-800">Cautions & When to Stop</h3>
      <div className="mt-4 space-y-3">
        {cautions.map((c) => (
          <div key={c.symptom} className="flex gap-3">
            <span className="font-body text-sm font-semibold text-coral-800 w-48 shrink-0">{c.symptom}</span>
            <span className="font-body text-sm text-coral-700">{c.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}