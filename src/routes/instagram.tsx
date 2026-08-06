import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/instagram")({
  component: InstagramGallery,
});

const POSTS = [
  { id: 1, title: "Build Your Salad in 5 Layers", caption: "Your salad should be a meal, not a sad bowl of leaves 🥗\n\nBuild a salad that actually satisfies with this 5-layer formula:\n\n1️⃣ Greens — 2 cups (spinach, romaine, arugula)\n2️⃣ Veggies — ½ cup (color = nutrients!)\n3️⃣ Protein — ⅓ cup (chickpeas, tofu, chicken, tuna)\n4️⃣ Crunch — ¼ cup (seeds, nuts, quinoa)\n5️⃣ Dressing — 3 tbsp (tahini, vinaigrette)\n\nPro tip: Layer dressing at the bottom, hard veg in the middle, greens on top — stays fresh for 3 days in a jar.\n\nGet the full recipe at the link in bio 🥗\n\n#HealthyEating #MealPrep #SaladLover #WellnessTips #VitalityCompass" },
  { id: 2, title: "3-Day Juice Reset Schedule", caption: "A juice reset isn't about starving — it's about giving your digestive system a break 🧃\n\nHere's a day on our 3-Day Juice Reset:\n🌅 Upon waking: 16 oz warm lemon water\n🥤 Breakfast: Green juice (spinach + cucumber + green apple + ginger)\n🥗 Lunch: Solid meal — large salad with chickpeas + avocado\n🥕 Snack: Carrot-orange-turmeric juice\n🍲 Dinner: Light roasted veg bowl\n🍵 Evening: Herbal tea\n\nNo fasting. No extreme calorie restriction. Just more plants.\n\nGet the full guide + shopping list at the link in bio 🌿\n\n#JuiceReset #Detox #WellnessJourney #VitalityCompass" },
  { id: 3, title: "5 Morning Wellness Tips", caption: "Your morning sets the tone 🌅\n\n5 wellness tips that take under 5 minutes:\n\n1️⃣ Start with water — 16 oz before coffee\n2️⃣ Let the light in — open curtains, get natural light\n3️⃣ One deep breath — inhale 4 sec, hold 4, exhale 6\n4️⃣ Name one intention — \"Today I'll move my body once\"\n5️⃣ Stretch for 60 seconds — reach for the sky\n\nSmall steps, done daily, become the path.\n\n#MorningRoutine #WellnessTips #HealthyHabits #VitalityCompass" },
  { id: 4, title: "Pre-Workout Snacks", caption: "Fuel your workout right 🏃\n\nPre-workout snacks for everyone:\n\n🥜 Non-vegan:\n• Banana + peanut butter (~200 cal, quick carbs)\n• Greek yogurt + berries (~150 cal, protein + carbs)\n\n🌱 Vegan:\n• Banana (~105 cal, perfect fast carbs)\n• Dates + almond butter (~180 cal, natural sugar)\n\nEat 30-45 min before moving. That's it.\n\n#PreWorkout #FitnessFuel #VeganFitness #VitalityCompass" },
  { id: 5, title: "The 5-Minute Tea Ritual", caption: "Meditation without the pressure 🍵\n\nThe 5-Minute Tea Ritual:\n\n1️⃣ Boil fresh water (use a kettle, not microwave)\n2️⃣ Pour over 1 tsp loose leaf or 1 bag\n3️⃣ Steep 5-7 minutes (cover your cup)\n4️⃣ Breathe — inhale the steam, notice the aroma\n5️⃣ Sip slowly — no phone, no screen\n\nTry it with: chamomile (evening), peppermint (afternoon), or ginger (morning)\n\n#TeaRitual #Mindfulness #Wellness #VitalityCompass" },
  { id: 6, title: "Meal Prep in 30 Minutes", caption: "30 minutes on Sunday = 5 days of better eating ⏰\n\nWhat 30 minutes of meal prep looks like:\n\n🕐 First 10 min: Cook 1 cup quinoa + roast a tray of veg (broccoli, sweet potato)\n🕑 Second 10 min: Prep protein — grill chicken or marinate tofu\n🕒 Third 10 min: Portion into 5 containers + make one dressing\n\nThat's it. You now have 5 lunches or dinners ready to go.\n\nGet our full meal prep guide at the link in bio 🥗\n\n#MealPrep #HealthyEating #WeeklyPrep #VitalityCompass" },
  { id: 7, title: "The 2-Minute Movement Rule", caption: "The hardest part of exercise is starting 🏃\n\nThe 2-minute rule: commit to just 2 minutes of movement. If you want to stop after that, you can. You almost never will.\n\nTry it:\n• 2 min walk\n• 10 squats + 10 lunges\n• 30 sec plank\n• Stretch for 120 seconds\n\nMovement is a celebration of what your body can do.\n\n#Movement #Exercise #FitnessMotivation #VitalityCompass" },
  { id: 8, title: "Which Detox Challenge?", caption: "Not all resets are the same. Pick the one that fits your life:\n\n🧃 3-Day Juice Reset — Best for breaking a sugar/processed food cycle\n🥗 5-Day Salad Challenge — Best for increasing veggie intake\n💧 7-Day Water Reset — Best for building hydration habits\n🍵 7-Day Herbal Tea Ritual — Best for reducing caffeine & creating calm\n\nNo extreme fasting. No magic. Just more plants and more water.\n\nRead the full guide at the link in bio 🌿\n\n#Detox #WellnessReset #HealthyHabits #VitalityCompass" },
  { id: 9, title: "3 Supplements Worth Considering", caption: "Before you buy supplements, know what actually works 💊\n\nThree with the strongest evidence:\n\n🥇 Vitamin D — Bone health, immunity, mood. Most in northern climates need it.\n🥇 Omega-3 (EPA/DHA) — Heart and brain health. Vegans: algal oil.\n🥇 Magnesium — Sleep quality, muscle relaxation, stress.\n\nRule: Food first, supplements second. Always consult a doctor.\n\nRead our full supplements guide at the link in bio 📖\n\n#Supplements #WellnessTips #EvidenceBased #VitalityCompass" },
  { id: 10, title: "7-Day Hydration Reset", caption: "The most underrated wellness habit? Drinking enough water 💧\n\nA simple daily hydration schedule:\n🌅 Upon waking: 16 oz warm lemon water\n☀️ Mid-morning: 12 oz\n🌤️ Before lunch: 8 oz\n🌇 Afternoon: 16 oz infused water\n🌆 Before dinner: 8 oz\n🌙 Evening: 8 oz herbal tea\n\nTotal: ~68 oz (2 liters). Use a marked water bottle — 3 fills = done.\n\nGet the full schedule at the link in bio 💧\n\n#Hydration #WaterChallenge #DrinkMoreWater #VitalityCompass" },
];

function InstagramGallery() {
  return (
    <div className="min-h-dvh bg-warm-50">
      <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white shadow-sm">VC</span>
            <span className="font-heading text-base font-semibold text-warm-900">Vitality Compass</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="font-body text-sm font-medium text-warm-700 hover:text-teal-700">Home</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-warm-900 sm:text-4xl">Instagram Posts</h1>
          <p className="mt-3 font-body text-base text-warm-700">
            Right-click any image to save, then copy the caption below it.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {POSTS.map((post) => (
            <div key={post.id} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-warm-200 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-warm-900">{post.title}</h2>
              <div className="mt-4">
                <img
                  src={`/post-${post.id}.png`}
                  alt={post.title}
                  className="w-full max-w-md rounded-lg shadow-sm"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-heading text-sm font-semibold text-warm-700">Caption:</h3>
                <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-warm-50 p-4 font-body text-sm text-warm-700 leading-relaxed">{post.caption}</pre>
                <button
                  onClick={() => navigator.clipboard.writeText(post.caption)}
                  className="mt-3 rounded-lg bg-teal-700 px-4 py-2 font-body text-xs font-semibold text-white hover:bg-teal-600"
                >
                  Copy Caption
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}